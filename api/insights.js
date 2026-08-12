// Read-only proxy for the external, machine-generated Industry Watcher brief.
// No embedded news snapshot: when the source and short-lived cache are both
// unavailable, the honest state is "unavailable", not fabricated freshness.

const SOURCE_URL = 'https://ai-industry-watcher.vercel.app/data/latest.json';
const WATCHER_URL = 'https://ai-industry-watcher.vercel.app';
const FETCH_TIMEOUT_MS = 8_000;
const FRESH_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;
const ACCEPTABLE_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const CACHE_FALLBACK_MS = 24 * 60 * 60 * 1000;

let cache = { fetchedAt: 0, payload: null };

function cleanText(value, max = 600) {
  return typeof value === 'string'
    ? value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
    : '';
}

function safeUrl(value) {
  if (typeof value !== 'string') return '';
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : '';
  } catch {
    return '';
  }
}

function list(value, limit) {
  return Array.isArray(value) ? value.slice(0, limit) : [];
}

function shapeBrief(raw, now) {
  const brief = raw?.brief;
  const generatedAt = cleanText(raw?.generated_at, 80);
  const generatedMs = Date.parse(generatedAt);
  if (!brief || !Number.isFinite(generatedMs)) throw new Error('Upstream payload missing a valid brief date');

  const ageMs = Math.max(0, now - generatedMs);
  if (generatedMs > now + 24 * 60 * 60 * 1000 || ageMs > ACCEPTABLE_MAX_AGE_MS) {
    throw new Error('Upstream brief is outside the accepted date window');
  }

  const trends = list(brief.trends, 6)
    .map((item) => ({
      title: cleanText(item?.title, 160),
      signal: ['hoch', 'mittel', 'niedrig'].includes(String(item?.signal).toLowerCase()) ? String(item.signal).toLowerCase() : 'mittel',
      what: cleanText(item?.what, 500),
      why: cleanText(item?.why, 500),
    }))
    .filter((item) => item.title);

  const opportunities = list(brief.opportunities, 4)
    .map((item) => ({
      title: cleanText(item?.title, 160),
      what: cleanText(item?.what, 500),
      who: cleanText(item?.who, 220),
    }))
    .filter((item) => item.title);

  const topArticles = list(brief.top_articles, 10)
    .map((item) => ({
      title: cleanText(item?.title, 220),
      url: safeUrl(item?.url),
      source: cleanText(item?.source, 100),
      date: cleanText(item?.date, 40),
      why: cleanText(item?.why, 420),
    }))
    .filter((item) => item.title && item.url);

  const headline = cleanText(brief.headline, 240);
  if (!headline) throw new Error('Upstream brief has no headline');

  return {
    status: 'ok',
    freshness: ageMs <= FRESH_MAX_AGE_MS ? 'fresh' : 'stale',
    is_stale: ageMs > FRESH_MAX_AGE_MS,
    generated_at: new Date(generatedMs).toISOString(),
    served_at: new Date(now).toISOString(),
    source_url: WATCHER_URL,
    disclosure: 'Automatisch erzeugtes externes Briefing; Quellen und Aussagen vor Verwendung prüfen.',
    vertical: cleanText(raw?.vertical, 180),
    issue: {
      headline,
      subheadline: cleanText(brief.subheadline, 400),
      executive_summary: cleanText(brief.executive_summary || brief.executivo_summary, 1_500),
      trends,
      opportunities,
      top_articles: topArticles,
      action_items: list(brief.action_items, 4).map((item) => cleanText(item, 400)).filter(Boolean),
    },
  };
}

function sendJson(res, status, payload, cacheControl = 'no-store') {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cacheControl);
  return res.status(status).json(payload);
}

async function fetchBrief() {
  const response = await fetch(SOURCE_URL, {
    headers: { Accept: 'application/json', 'User-Agent': 'ainzigartig-insights-proxy' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Upstream ${response.status}`);
  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { status: 'error', error: 'Diese Methode wird nicht unterstützt.' });
  }

  const now = Date.now();
  try {
    const raw = await fetchBrief();
    const payload = shapeBrief(raw, now);
    cache = { fetchedAt: now, payload };
    res.setHeader('X-Insights-Source', payload.freshness === 'fresh' ? 'LIVE' : 'LIVE-STALE');
    return sendJson(res, 200, payload, 'public, s-maxage=300, stale-while-revalidate=3600');
  } catch (error) {
    if (cache.payload && now - cache.fetchedAt <= CACHE_FALLBACK_MS) {
      res.setHeader('X-Insights-Source', 'CACHE-STALE');
      return sendJson(res, 200, {
        ...cache.payload,
        freshness: 'cached',
        is_stale: true,
        served_at: new Date(now).toISOString(),
        warning: 'Die Live-Quelle war nicht erreichbar; angezeigt wird die letzte in dieser Funktionsinstanz geladene Ausgabe.',
      }, 'public, s-maxage=60');
    }

    console.error('Insights source unavailable', String(error?.message || error).slice(0, 160));
    return sendJson(res, 503, {
      status: 'unavailable',
      error: 'Das externe Briefing ist derzeit nicht verlässlich verfügbar.',
      source_url: WATCHER_URL,
    });
  }
}

export const config = { maxDuration: 10 };

// Server-side proxy for the current Industry Watcher brief.
// Deliberately no embedded editorial fallback: stale or invented market data is worse
// than a visible unavailable state for a source-led product.
const SOURCE_URL = process.env.INDUSTRY_WATCHER_URL || 'https://ai-industry-watcher.vercel.app/data/latest.json';
const CACHE_TTL_MS = 60 * 60 * 1000;
const STALE_TTL_MS = 24 * 60 * 60 * 1000;
let cache = { at: 0, data: null };

function sendJson(res, status, data, cacheControl = 'no-store') {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cacheControl);
  return res.status(status).json(data);
}

function text(value, limit = 700) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, limit) : '';
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.toString() : '';
  } catch { return ''; }
}

function shapeBrief(raw) {
  if (!raw || typeof raw !== 'object' || !raw.brief || typeof raw.brief !== 'object') return null;
  const brief = raw.brief;
  const trends = Array.isArray(brief.trends) ? brief.trends.slice(0, 9).map((trend) => ({
    title: text(trend?.title, 180), signal: text(trend?.signal, 20), what: text(trend?.what, 500), why: text(trend?.why, 500),
  })).filter((trend) => trend.title && trend.what) : [];
  const opportunities = Array.isArray(brief.opportunities) ? brief.opportunities.slice(0, 8).map((item) => ({
    title: text(item?.title, 180), what: text(item?.what, 500), who: text(item?.who, 180), how: text(item?.how, 20),
    price: text(item?.price, 100), time_to_market: text(item?.['time-to-market'] || item?.time_to_market, 100),
  })).filter((item) => item.title && item.what) : [];
  const topArticles = Array.isArray(brief.top_articles) ? brief.top_articles.slice(0, 15).map((article) => ({
    title: text(article?.title, 240), url: safeUrl(article?.url), source: text(article?.source, 100), date: text(article?.date, 40), why: text(article?.why, 500),
  })).filter((article) => article.title && article.url) : [];

  if (!text(brief.headline, 300) || (!trends.length && !topArticles.length)) return null;
  return {
    generated_at: text(raw.generated_at, 60), vertical: text(raw.vertical, 120),
    issue_url: safeUrl(raw.issue_url) || 'https://ai-industry-watcher.vercel.app',
    issue: {
      headline: text(brief.headline, 300), subheadline: text(brief.subheadline, 500), trends, opportunities, top_articles: topArticles,
      action_items: (Array.isArray(brief.action_items) ? brief.action_items : []).slice(0, 7).map((item) => text(item, 400)).filter(Boolean),
    },
  };
}

async function fetchBrief() {
  const response = await fetch(SOURCE_URL, {
    headers: { Accept: 'application/json', 'User-Agent': 'ainzigartig-insights-proxy' }, signal: AbortSignal.timeout(8000), cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Industry Watcher returned ${response.status}`);
  const shaped = shapeBrief(await response.json());
  if (!shaped) throw new Error('Industry Watcher returned an invalid brief');
  return shaped;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed' });
  const now = Date.now();
  if (cache.data && now - cache.at < CACHE_TTL_MS) {
    res.setHeader('X-Cache', 'HIT');
    return sendJson(res, 200, cache.data, 'public, s-maxage=300, stale-while-revalidate=86400');
  }
  try {
    const data = await fetchBrief();
    cache = { at: now, data };
    res.setHeader('X-Cache', 'MISS');
    return sendJson(res, 200, data, 'public, s-maxage=300, stale-while-revalidate=86400');
  } catch (error) {
    if (cache.data && now - cache.at < STALE_TTL_MS) {
      res.setHeader('X-Cache', 'STALE');
      return sendJson(res, 200, cache.data, 'public, s-maxage=60, stale-while-revalidate=300');
    }
    console.error(`Insights proxy unavailable: ${String(error).slice(0, 160)}`);
    return sendJson(res, 503, { error: 'Der aktuelle Industry-Watcher-Brief ist gerade nicht verfügbar.' });
  }
}

export const config = { maxDuration: 10 };

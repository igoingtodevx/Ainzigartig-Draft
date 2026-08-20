// Vercel Serverless Function: /api/insights
// Proxy to the Industry Watcher's latest brief JSON.
// Why proxy instead of client-side fetch:
//   1. CORS is not an issue (server-to-server is allowed)
//   2. We can cache at the edge (Vercel CDN) to insulate ainzigartig
//      from ai-industry-watcher.vercel.app outages
//   3. We can shape/trim the payload before it hits the page
//   4. We can degrade gracefully (stale cache + error object)

const SOURCE_URL = 'https://ai-industry-watcher.vercel.app/data/latest.json';
const CACHE_TTL_SEC = 60 * 60; // 1h — the brief is weekly, but we re-fetch hourly to catch corrections
// If upstream is down, we keep serving whatever real cached issue we last
// fetched — marked stale — rather than fabricated content. There is no TTL
// cutoff on this: a real but old issue is still honest data, and the client
// renders its actual generated_at, so staleness stays visible to the user.

// In-memory cache (warm function reuse; Vercel Hobby may reset)
let cache = { at: 0, data: null, stale: false };

function sendJson(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
}

async function fetchBrief() {
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'ainzigartig-insights-proxy',
  };
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 8000);
  try {
    const resp = await fetch(SOURCE_URL, { headers, signal: ctrl.signal, cache: 'no-store' });
    if (!resp.ok) throw new Error(`Upstream ${resp.status}`);
    return await resp.json();
  } finally {
    clearTimeout(to);
  }
}

function stripHtml(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function shapeBrief(raw) {
  // Slim it down for the watch-light embed: keep only what /insights needs.
  // Pass through all trends / opportunities / top_articles / action_items
  // that the LLM generated — the client component decides what to render.
  if (!raw || !raw.brief) return null;
  const b = raw.brief;
  // Upstream sends the summary as HTML and, historically, used the key
  // "executivo_summary" (typo). Emit the corrected key for the frontend and
  // keep the legacy key so existing consumers don't break.
  const summaryPlain = stripHtml(b.executive_summary);
  return {
    generated_at: raw.generated_at,
    vertical: raw.vertical,
    model: raw.model,
    tokens_used: raw.tokens_used,
    input_articles: raw.input_articles,
    input_sources: raw.input_sources,
    issue_url: 'https://ai-industry-watcher.vercel.app',
    issue: {
      headline: b.headline,
      subheadline: b.subheadline,
      executive_summary: summaryPlain,
      executivo_summary: summaryPlain,
      // All trends (7-9) — client decides how many to render
      trends: (b.trends || []).map((t) => ({
        title: t.title,
        signal: t.signal,
        what: t.what,
        why: t.why,
      })),
      // All opportunities (6-8). Upstream changed the field name from
      // "time-to-market"/"time_to_market" to "time" — accept all three.
      opportunities: (b.opportunities || []).map((o) => ({
        title: o.title,
        what: o.what,
        who: o.who,
        how: o.how,
        price: o.price,
        time_to_market: o['time-to-market'] || o.time_to_market || o.time,
      })),
      // All top_articles (up to 15) — client decides how many to show
      top_articles: (b.top_articles || []).map((a) => ({
        title: a.title,
        url: a.url,
        source: a.source,
        date: a.date,
        why: a.why,
        tags: a.tags,
      })),
      // All action_items
      action_items: b.action_items || [],
    },
    raw_articles: raw.raw_articles || [],  // up to 30 raw from pipeline
  };
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const now = Date.now();

  // Fresh cache hit
  if (cache.data && now - cache.at < CACHE_TTL_SEC * 1000) {
    res.setHeader('X-Cache', 'HIT');
    return sendJson(res, 200, cache.data);
  }

  try {
    const raw = await fetchBrief();
    const shaped = shapeBrief(raw);
    if (!shaped) throw new Error('Upstream payload missing brief');

    cache = { at: now, data: shaped, stale: false };
    res.setHeader('X-Cache', 'MISS');
    return sendJson(res, 200, shaped);
  } catch (e) {
    console.error('Insights upstream error:', e?.message || e);
    // Serve the last real issue we have, however old — honest stale data
    // beats a fabricated one. generated_at in the payload still reflects
    // its true age, so the client can (and does) show that.
    if (cache.data) {
      res.setHeader('X-Cache', 'STALE');
      res.setHeader('X-Cache-Reason', 'upstream-unavailable');
      return sendJson(res, 200, cache.data);
    }
    // No real data available at all — say so honestly instead of inventing
    // a briefing. Clients already treat `error` as an unavailable state.
    res.setHeader('X-Cache', 'UNAVAILABLE');
    return sendJson(res, 503, { error: 'upstream-unavailable' });
  }
}

export const config = {
  maxDuration: 10,
};

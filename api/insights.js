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
const STALE_TTL_SEC = 60 * 60 * 24; // 1d — if upstream is down, serve stale

// Emergency embedded snapshot — used ONLY when the Sub-Site is unreachable
// AND we have no in-memory cache. This is the last line of defense so that
// /insights and the home-page teaser always show something current instead
// of a "Verbindung fehlgeschlagen" error.
//
// Updated manually by a build script (or on first successful fetch in a
// fresh function instance) so this is rarely the path taken.
//
// Last update: 2026-06-15 04:39 UTC — W24, after PR-#1 fix.
const EMERGENCY_SNAPSHOT = {
  generated_at: "2026-06-15T04:39:12.097704+00:00",
  vertical: "German Mittelstand Digital & KI-Automation",
  model: "gpt-4o-mini",
  issue_url: "https://ai-industry-watcher.vercel.app",
  issue: {
    headline: "Google Cloud adressiert Kontextproblem von KI-Agenten mit neuem Format",
    subheadline: "Das Open Knowledge Format (OKF) könnte die Effizienz von KI-Anwendungen im Mittelstand steigern.",
    executive_summary: "Diese Woche kündigte Google Cloud an, das Open Knowledge Format (OKF) einzuführen, um das Kontextproblem von KI-Agenten zu lösen. Der Fokus auf standardisierte Wissensdarstellung könnte insbesondere für den deutschen Mittelstand von Bedeutung sein, da viele Unternehmen mit der Integration von KI kämpfen. Gleichzeitig wurden Berichte über KI in Unternehmen kritisch beleuchtet, was die Notwendigkeit von vertrauenswürdigen Datenquellen unterstreicht.",
    trends: [
      { title: "Standardisierung von KI-Wissen", signal: "hoch", what: "Google Cloud führt das Open Knowledge Format (OKF) ein, um Wissen für KI-Agenten nutzbar zu machen." },
      { title: "Vertrauen in KI-generierte Inhalte", signal: "hoch", what: "KPMG musste einen Bericht über KI zurückziehen, der gefälschte Fallstudien enthielt." },
      { title: "KI-Agenten in der Softwareentwicklung", signal: "mittel", what: "KI-Coding-Agenten haben Schwierigkeiten, relevanten Code produktiv beizutragen — die Technologie ist noch nicht reif für den autonomen Einsatz." }
    ],
    opportunities: [
      { title: "Beratung zur Einführung standardisierter Wissensformate", what: "Unternehmen benötigen Unterstützung, um das OKF-Konzept in ihre bestehenden Datenstrukturen zu integrieren.", price: "8.000-25.000€ Setup + 1.500-3.000€/Monat", how: "mittel" },
      { title: "Validierung von KI-generierten Inhalten", what: "KMUs brauchen Tools oder Beratung, um die Vertrauenswürdigkeit von KI-generierten Berichten zu prüfen.", price: "3.000-10.000€ pro Projekt", how: "hoch" }
    ]
  }
};

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

function shapeBrief(raw) {
  // Slim it down for the watch-light embed: keep only what /insights needs.
  if (!raw || !raw.brief) return null;
  const b = raw.brief;
  return {
    generated_at: raw.generated_at,
    vertical: raw.vertical,
    model: raw.model,
    issue_url: 'https://ai-industry-watcher.vercel.app',
    issue: {
      headline: b.headline,
      subheadline: b.subheadline,
      executive_summary: b.executive_summary,
      // Trends: 3 with title + signal + what
      trends: (b.trends || []).slice(0, 3).map((t) => ({
        title: t.title,
        signal: t.signal,
        what: t.what,
      })),
      // Opportunities: 2 with title + what + price
      opportunities: (b.opportunities || []).slice(0, 2).map((o) => ({
        title: o.title,
        what: o.what,
        price: o.price,
        how: o.how,
      })),
    },
  };
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
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
    // Stale cache fallback
    if (cache.data && now - cache.at < STALE_TTL_SEC * 1000) {
      res.setHeader('X-Cache', 'STALE');
      res.setHeader('X-Cache-Reason', String(e).slice(0, 120));
      return sendJson(res, 200, cache.data);
    }
    // Emergency embedded snapshot — last line of defense
    res.setHeader('X-Cache', 'EMERGENCY-SNAPSHOT');
    res.setHeader('X-Cache-Reason', String(e).slice(0, 120));
    return sendJson(res, 200, EMERGENCY_SNAPSHOT);
  }
}

export const config = {
  maxDuration: 10,
};

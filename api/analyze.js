// Vercel Serverless Function (Node.js): Website KI-Analyse
// Calls VPS scraper → sends content to OpenAI gpt-4o-mini → returns structured analysis
// Migrated from Python to Node.js to match the rest of the API surface and
// avoid the Vercel Python runtime's historical instability. Frontend contract
// is unchanged.

const SCRAPER_URL = process.env.SCRAPER_URL || 'http://138.68.96.190:8501';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const ANALYSIS_PROMPT = `Du bist ein KI-Berater für den deutschen Mittelstand. Analysiere die folgende Website und erstelle eine strukturierte KI-Potenzial-Analyse.

Website-Inhalt:
---
{markdown}
---

Metadaten:
- URL: {url}
- Titel: {title}
- Technologien: {technologies}
- Hat Kontaktformular: {has_contact}
- Hat Preisseite: {has_pricing}
- Hat Impressum: {has_imprint}
- Hat Datenschutz: {has_privacy}
- Wortanzahl: {word_count}

Antworte NUR mit validem JSON in diesem Format:
{{
  "score": <0-100, KI-Reifegrad>,
  "score_label": "<'Niedrig', 'Mittel', 'Hoch'>",
  "summary": "<2-3 Sätze Zusammenfassung>",
  "opportunities": [
    {{
      "title": "<Konkrete KI-Chance>",
      "description": "<Was genau könnte automatisiert/verbessert werden>",
      "impact": "<'Hoch', 'Mittel', 'Niedrig'>",
      "effort": "<'Gering', 'Mittel', 'Hoch'>",
      "estimated_savings": "<z.B. '10h/Woche' oder '30% weniger Tickets'>"
    }}
  ],
  "missing_basics": [
    "<Was fehlt auf der Seite (z.B. Impressum, Datenschutz, Preise)>"
  ],
  "recommendation": "<Konkrete Empfehlung: Was sollte als Erstes umgesetzt werden?>",
  "tool_suggestion": "<Welches KI-Tool passt am besten: Chatbot, Automatisierung, etc.>"
}}

Wichtig: Sei konkret und praktisch. Keine Buzzwords. Bezogen auf die ECHTE Website.`;

function sendJson(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(new Error('Ungültiges JSON')); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method === 'GET' && (req.url === '/health' || req.url === '/api/analyze/health')) {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'analyze',
      backend: 'openai-only',
      has_openai: !!OPENAI_API_KEY,
    });
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (e) {
    return sendJson(res, 400, { error: 'Ungültiges Request-Format.' });
  }

  const url = (body.url || '').toString().trim();
  if (!url) {
    return sendJson(res, 400, { error: 'URL required' });
  }

  // Step 1: Scrape website via VPS scraper
  let scrapeResp;
  try {
    scrapeResp = await fetch(`${SCRAPER_URL}/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(20000),
    });
  } catch (e) {
    const isTimeout = e?.name === 'TimeoutError' || /timeout/i.test(String(e));
    return sendJson(res, isTimeout ? 504 : 502, {
      error: isTimeout ? 'Website scraping timed out' : `Scraper unreachable: ${String(e).slice(0, 100)}`,
    });
  }

  if (!scrapeResp.ok) {
    let errorDetail = 'Scraping failed';
    try {
      const j = await scrapeResp.json();
      errorDetail = j.detail || errorDetail;
    } catch (_) { /* ignore */ }
    return sendJson(res, 502, { error: `Scraping failed: ${errorDetail}` });
  }

  const scrapeData = await scrapeResp.json();

  // Step 2: Build prompt
  const prompt = ANALYSIS_PROMPT
    .replace('{markdown}', String(scrapeData.markdown || '').slice(0, 15000))
    .replace('{url}', url)
    .replace('{title}', scrapeData.title || '')
    .replace('{technologies}', (scrapeData.technologies || []).join(', ') || 'Keine erkannt')
    .replace('{has_contact}', scrapeData.has_contact_form ? 'Ja' : 'Nein')
    .replace('{has_pricing}', scrapeData.has_pricing_page ? 'Ja' : 'Nein')
    .replace('{has_imprint}', scrapeData.has_imprint ? 'Ja' : 'Nein')
    .replace('{has_privacy}', scrapeData.has_privacy_policy ? 'Ja' : 'Nein')
    .replace('{word_count}', String(scrapeData.word_count || 0));

  // Step 3: Call OpenAI
  if (!OPENAI_API_KEY) {
    return sendJson(res, 500, { error: 'Server-Konfigurationsfehler.' });
  }

  let llmResp;
  try {
    llmResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch (e) {
    const isTimeout = e?.name === 'TimeoutError' || /timeout/i.test(String(e));
    console.error('OpenAI analyze timeout/network:', e);
    return sendJson(res, isTimeout ? 504 : 502, { error: 'LLM analysis failed' });
  }

  if (!llmResp.ok) {
    const err = await llmResp.text().catch(() => '');
    console.error(`OpenAI analyze error: ${llmResp.status} ${err.slice(0, 200)}`);
    return sendJson(res, 502, { error: 'LLM analysis failed' });
  }

  const llmJson = await llmResp.json();
  const llmResponse = llmJson?.choices?.[0]?.message?.content || '';

  // Step 4: Parse JSON — response_format=json_object guarantees validity,
  // but keep a defensive fallback for malformed edge cases.
  let analysis;
  try {
    analysis = JSON.parse(llmResponse);
  } catch (e) {
    let s = llmResponse;
    if (s.includes('```json')) s = s.split('```json', 2)[1].split('```', 1)[0];
    else if (s.includes('```')) s = s.split('```', 2)[1].split('```', 1)[0];
    try {
      analysis = JSON.parse(s.trim());
    } catch (_) {
      analysis = {
        score: 50,
        score_label: 'Mittel',
        summary: llmResponse.slice(0, 500),
        opportunities: [],
        missing_basics: [],
        recommendation: llmResponse.slice(0, 500),
        tool_suggestion: 'KI-Beratung',
      };
    }
  }

  return sendJson(res, 200, {
    url,
    scrape: {
      title: scrapeData.title,
      technologies: scrapeData.technologies,
      word_count: scrapeData.word_count,
      response_time_ms: scrapeData.response_time_ms,
    },
    analysis,
  });
}

export const config = {
  maxDuration: 30,
};

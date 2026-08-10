// Vercel Serverless Function (Node.js): Website KI-Analyse
// Scrapes the target website and analyzes it with OpenAI directly or, on
// Vercel previews/production, through AI Gateway using deployment OIDC.

const SCRAPER_URL = process.env.SCRAPER_URL || 'http://138.68.96.190:8501';

function getLLMConfig() {
  const openaiKey = process.env.OPENAI_API_KEY || '';
  if (openaiKey) {
    return {
      token: openaiKey,
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4o-mini',
      backend: 'openai-direct',
    };
  }

  const gatewayToken = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || '';
  if (gatewayToken) {
    return {
      token: gatewayToken,
      endpoint: 'https://ai-gateway.vercel.sh/v1/chat/completions',
      model: 'openai/gpt-4o-mini',
      backend: process.env.AI_GATEWAY_API_KEY ? 'vercel-ai-gateway-key' : 'vercel-ai-gateway-oidc',
    };
  }

  return null;
}

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
  "missing_basics": ["<Was auf der Seite fehlt>"],
  "recommendation": "<Konkrete Empfehlung>",
  "tool_suggestion": "<Passender KI-Ansatz>"
}}

Wichtig: Sei konkret und praktisch. Keine Buzzwords. Bezogen auf die ECHTE Website.`;

function sendJson(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');

  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch (_) { reject(new Error('Ungültiges JSON')); }
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

  if (req.method === 'GET') {
    const llm = getLLMConfig();
    return sendJson(res, 200, {
      status: 'ok',
      service: 'analyze',
      backend: llm?.backend || 'not-configured',
      has_llm: !!llm,
      has_scraper: !!SCRAPER_URL,
    });
  }

  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  let body;
  try {
    body = await readJsonBody(req);
  } catch (_) {
    return sendJson(res, 400, { error: 'Ungültiges Request-Format.' });
  }

  const url = (body.url || '').toString().trim();
  if (!url) return sendJson(res, 400, { error: 'URL required' });

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
    } catch (_) {}
    return sendJson(res, 502, { error: `Scraping failed: ${errorDetail}` });
  }

  const scrapeData = await scrapeResp.json();
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

  const llm = getLLMConfig();
  if (!llm) return sendJson(res, 503, { error: 'KI-Service ist in dieser Umgebung noch nicht aktiviert.' });

  let llmResp;
  try {
    llmResp = await fetch(llm.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${llm.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: llm.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch (e) {
    const isTimeout = e?.name === 'TimeoutError' || /timeout/i.test(String(e));
    console.error('Analyze LLM timeout/network:', llm.backend, e);
    return sendJson(res, isTimeout ? 504 : 502, { error: 'LLM analysis failed' });
  }

  if (!llmResp.ok) {
    const err = await llmResp.text().catch(() => '');
    console.error('Analyze LLM error:', llm.backend, llmResp.status, err.slice(0, 300));
    return sendJson(res, 502, { error: 'LLM analysis failed' });
  }

  const llmJson = await llmResp.json();
  const llmResponse = llmJson?.choices?.[0]?.message?.content || '';

  let analysis;
  try {
    analysis = JSON.parse(llmResponse);
  } catch (_) {
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

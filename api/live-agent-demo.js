// Vercel Serverless Function (Node.js): Live Agent Demo
// Uses direct OpenAI when configured and falls back to Vercel AI Gateway
// with deployment OIDC so preview deployments remain functional.

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

const SYSTEM_PROMPT = `Du bist der "Ainzigartig Dokument-Agent" — ein intelligenter KI-Assistent fuer den deutschen Mittelstand.
Deine Aufgabe: Eingehende Dokumente (Rechnungen, E-Mails, Angebote, Vertraege, Bestellungen, Mahnungen, Lieferscheine) lesen, verstehen, strukturieren und die naechsten Schritte vorschlagen.

WICHTIG:
- Antworte immer auf Deutsch.
- Antworte NUR mit validem JSON, kein Markdown-Wrapper, keine Erklaerungen drumherum.
- Sei konkret: echte Daten aus dem Dokument, keine generischen Platzhalter.
- Wenn ein Feld nicht erkennbar ist: weglassen, nicht raten.
- Vorgeschlagene Aktionen sollen PRAKTISCH und UMSETZBAR sein.`;

const USER_PROMPT_TEMPLATE = `Analysiere das folgende Dokument und strukturiere es.

Aufgabe:
1. Dokumenttyp erkennen
2. Wichtige Felder extrahieren
3. 2-4 konkrete naechste Schritte vorschlagen
4. Risiken/Auffaelligkeiten markieren
5. Zusammenfassung in 1-2 Saetzen
6. Kurze Begruendung wie der Agent das Dokument erkannt hat

Dokument:
---
{document_content}
---

Antworte NUR mit diesem JSON-Schema:
{{
  "document_type": "<Typ>",
  "document_type_icon": "<Material Symbols Icon Name>",
  "confidence": "<Hoch|Mittel|Niedrig>",
  "key_fields": {{ "<Feldname>": "<Wert>" }},
  "suggested_actions": [{{ "title": "<Konkrete Aktion>", "priority": "<Hoch|Mittel|Niedrig>", "details": "<Wie/wann umsetzen?>" }}],
  "risk_flags": [{{ "level": "<Hoch|Mittel|Info>", "message": "<Was ist auffaellig?>" }}],
  "summary": "<1-2 Saetze>",
  "agent_reasoning": "<1 Satz>"
}}`;

const VISION_PROMPT = `Analysiere das Dokument auf den Bildern und strukturiere es.

Aufgabe:
1. Dokumenttyp erkennen
2. Wichtige Felder extrahieren
3. 2-4 konkrete naechste Schritte vorschlagen
4. Risiken/Auffaelligkeiten markieren
5. Zusammenfassung in 1-2 Saetzen
6. Kurze Begruendung wie der Agent das Dokument erkannt hat

Antworte NUR mit diesem JSON-Schema:
{{
  "document_type": "<Typ>",
  "document_type_icon": "<Material Symbols Icon Name>",
  "confidence": "<Hoch|Mittel|Niedrig>",
  "key_fields": {{ "<Feldname>": "<Wert>" }},
  "suggested_actions": [{{ "title": "<Aktion>", "priority": "<Hoch|Mittel|Niedrig>", "details": "<Details>" }}],
  "risk_flags": [{{ "level": "<Hoch|Mittel|Info>", "message": "<Message>" }}],
  "summary": "<1-2 Saetze>",
  "agent_reasoning": "<1 Satz>"
}}`;

async function callLLM(messages) {
  const llm = getLLMConfig();
  if (!llm) return { error: 'not_configured' };

  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 10000);
    const resp = await fetch(llm.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${llm.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: llm.model,
        messages,
        temperature: 0.2,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
      }),
      signal: ctrl.signal,
    }).finally(() => clearTimeout(to));

    if (resp.ok) {
      const data = await resp.json();
      return { text: data.choices?.[0]?.message?.content || '' };
    }

    const errText = await resp.text().catch(() => '');
    console.error('Document agent LLM error:', llm.backend, resp.status, errText.slice(0, 300));
    return { error: `llm_${resp.status}` };
  } catch (e) {
    return { error: 'timeout_or_network', detail: String(e).slice(0, 200) };
  }
}

async function callLLMText(prompt) {
  return callLLM([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: prompt },
  ]);
}

async function callLLMVision(images, prompt) {
  if (!Array.isArray(images) || images.length === 0) return { error: 'no_images' };

  const content = [{ type: 'text', text: prompt }];
  for (const img of images) {
    const dataUrl = `data:${img.mime_type};base64,${img.base64}`;
    content.push({ type: 'image_url', image_url: { url: dataUrl } });
  }

  return callLLM([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content },
  ]);
}

function parseLLMJson(raw) {
  if (!raw) return {};
  let text = raw.trim();
  if (text.includes('```json')) text = text.split('```json', 2)[1].split('```', 1)[0];
  else if (text.includes('```')) text = text.split('```', 2)[1].split('```', 1)[0];
  text = text.trim();

  try { return JSON.parse(text); } catch (_) {}
  const match = text.match(/\{.*\}/s);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) {}
  }
  return {};
}

function sendJson(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
}

function validateImage(img) {
  if (!img || typeof img !== 'object') return 'Bild-Eintrag fehlt.';
  if (typeof img.base64 !== 'string' || !img.base64) return 'base64 fehlt.';
  if (typeof img.mime_type !== 'string') return 'mime_type fehlt.';
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(img.mime_type)) return `Nicht unterstuetzter Bildtyp: ${img.mime_type}`;
  const size = Math.floor(img.base64.length * 0.75);
  if (size > 4_500_000) return 'Bild zu gross (max 4 MB pro Bild).';
  return null;
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
      service: 'live-agent-demo',
      backend: llm?.backend || 'not-configured',
      has_llm: !!llm,
    });
  }

  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const mode = body.mode || '';

    if (mode === 'sample') {
      const text = (body.text || '').trim();
      if (!text) return sendJson(res, 400, { error: 'Text fehlt.' });

      const userPrompt = USER_PROMPT_TEMPLATE.replace('{document_content}', text.slice(0, 12000));
      const result = await callLLMText(userPrompt);
      if (result.error) return sendJson(res, 502, { error: 'KI-Analyse ist gerade nicht verfügbar.' });

      const analysis = parseLLMJson(result.text);
      if (!analysis || Object.keys(analysis).length === 0) return sendJson(res, 502, { error: 'Antwort konnte nicht geparst werden.' });
      return sendJson(res, 200, analysis);
    }

    if (mode === 'upload') {
      const images = body.images;
      if (!Array.isArray(images) || images.length === 0) return sendJson(res, 400, { error: 'Keine Bilder erhalten.' });
      if (images.length > 5) return sendJson(res, 400, { error: 'Maximal 5 Bilder pro Anfrage.' });

      for (let i = 0; i < images.length; i++) {
        const err = validateImage(images[i]);
        if (err) return sendJson(res, 400, { error: `Bild ${i + 1}: ${err}` });
      }

      const result = await callLLMVision(images, VISION_PROMPT);
      if (result.error) return sendJson(res, 502, { error: 'KI-Analyse ist gerade nicht verfügbar.' });

      const analysis = parseLLMJson(result.text);
      if (!analysis || Object.keys(analysis).length === 0) return sendJson(res, 502, { error: 'Antwort konnte nicht geparst werden.' });
      return sendJson(res, 200, analysis);
    }

    return sendJson(res, 400, { error: 'Unbekannter Modus.' });
  } catch (e) {
    return sendJson(res, 500, { error: `Interner Fehler: ${String(e).slice(0, 200)}` });
  }
}

export const config = {
  api: {
    bodyParser: { sizeLimit: '12mb' },
  },
  maxDuration: 10,
};

// Vercel Serverless Function (Node.js): Live Agent Demo
// Analyzes a German business document (PDF, image, or text) using multimodal LLM.
// Returns structured: document_type, key_fields, suggested_actions, risk_flags, summary.

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || '';

const SYSTEM_PROMPT = `Du bist der "Ainzigartig Dokument-Agent" — ein intelligenter KI-Assistent fuer den deutschen Mittelstand.
Deine Aufgabe: Eingehende Dokumente (Rechnungen, E-Mails, Angebote, Vertraege, Bestellungen, Mahnungen) lesen, verstehen, strukturieren und die naechsten Schritte vorschlagen.

WICHTIG:
- Antworte immer auf Deutsch.
- Antworte NUR mit validem JSON, kein Markdown-Wrapper, keine Erklaerungen drumherum.
- Sei konkret: echte Daten aus dem Dokument, keine generischen Platzhalter.
- Wenn ein Feld nicht erkennbar ist: weglassen, nicht raten.
- Vorgeschlagene Aktionen sollen PRAKTISCH und UMSETZBAR sein (was passiert Montag morgen damit?).`;

const USER_PROMPT_TEMPLATE = `Analysiere das folgende Dokument und strukturiere es.

Aufgabe:
1. Dokumenttyp erkennen (Rechnung, E-Mail, Angebot, Vertrag, Bestellung, Lieferschein, Mahnung, Reklamation, Sonstige)
2. Wichtige Felder extrahieren (je nach Typ unterschiedlich — z.B. bei Rechnung: Nr, Datum, Betraege, Fristen, Parteien; bei E-Mail: Absender, Thema, Aktion erforderlich; bei Angebot: Positionen, Summe, Gueltigkeit)
3. 2-4 konkrete naechste Schritte vorschlagen (priorisiert nach Dringlichkeit)
4. Risiken/Auffaelligkeiten markieren (Fristen, fehlende Pflichtangaben, Unstimmigkeiten)
5. Zusammenfassung in 1-2 Saetzen
6. Kurze Begruendung wie der Agent das Dokument erkannt hat (1 Satz)

Dokument:
---
{document_content}
---

Antworte NUR mit diesem JSON-Schema (keine Markdown-Codeblocks):
{{
  "document_type": "<Typ>",
  "document_type_icon": "<Material Symbols Icon Name, z.B. receipt_long, mail, request_quote, contract, inventory_2, local_shipping, warning, support_agent, description>",
  "confidence": "<Hoch|Mittel|Niedrig>",
  "key_fields": {{
    "<Feldname>": "<Wert>",
    ...
  }},
  "suggested_actions": [
    {{
      "title": "<Konkrete Aktion>",
      "priority": "<Hoch|Mittel|Niedrig>",
      "details": "<Wie/wann umsetzen?>"
    }},
    ...
  ],
  "risk_flags": [
    {{
      "level": "<Hoch|Mittel|Info>",
      "message": "<Was ist auffaellig?>"
    }},
    ...
  ],
  "summary": "<1-2 Saetze>",
  "agent_reasoning": "<1 Satz: woran wurde der Typ erkannt?>"
}}`;


async function callOpenAIText(prompt) {
  if (!OPENAI_API_KEY) return null;
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 8000);
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
      signal: ctrl.signal,
    });
    clearTimeout(to);
    if (resp.ok) {
      const data = await resp.json();
      return data.choices?.[0]?.message?.content || null;
    }
  } catch (e) {}
  return null;
}


async function callNvidiaText(prompt) {
  if (!NVIDIA_API_KEY) return null;
  try {
    const resp = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + NVIDIA_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });
    if (resp.ok) {
      const data = await resp.json();
      return data.choices?.[0]?.message?.content || null;
    }
  } catch (e) {}
  return null;
}


async function callOpenRouterText(prompt) {
  if (!OPENROUTER_API_KEY) return null;
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 8000);
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ainzigartig.de',
        'X-Title': 'Ainzigartig Live Agent Demo',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(to);
    if (resp.ok) {
      const data = await resp.json();
      return data.choices?.[0]?.message?.content || null;
    }
  } catch (e) {}
  return null;
}


async function callOpenRouterMultimodal(fileBase64, mimeType, prompt) {
  if (!OPENROUTER_API_KEY) return null;
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 8000);
    const dataUrl = `data:${mimeType};base64,${fileBase64}`;
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ainzigartig.de',
        'X-Title': 'Ainzigartig Live Agent Demo',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(to);
    if (resp.ok) {
      const data = await resp.json();
      return data.choices?.[0]?.message?.content || null;
    }
  } catch (e) {}
  return null;
}


function parseLLMJson(raw) {
  if (!raw) return {};
  let text = raw.trim();
  if (text.includes('```json')) {
    text = text.split('```json', 2)[1].split('```', 1)[0];
  } else if (text.includes('```')) {
    text = text.split('```', 2)[1].split('```', 1)[0];
  }
  text = text.trim();

  try {
    return JSON.parse(text);
  } catch (e) {}

  const match = text.match(/\{.*\}/s);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (e) {}
  }
  return {};
}


function sendJson(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
}


export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method === 'GET' && req.url === '/health') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'live-agent-demo',
      has_openai: !!OPENAI_API_KEY,
      has_openrouter: !!OPENROUTER_API_KEY,
      has_nvidia: !!NVIDIA_API_KEY,
    });
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const mode = body.mode || '';

    if (mode === 'sample') {
      const text = (body.text || '').trim();
      if (!text) return sendJson(res, 400, { error: 'Text fehlt.' });
      const userPrompt = USER_PROMPT_TEMPLATE.replace('{document_content}', text.slice(0, 12000));
      // OpenAI first (fast, reliable JSON), OpenRouter fallback (also fast)
      let raw = (await callOpenAIText(userPrompt)) || (await callOpenRouterText(userPrompt));
      if (!raw) return sendJson(res, 502, { error: 'LLM-Analyse fehlgeschlagen.' });
      const analysis = parseLLMJson(raw);
      if (!analysis) return sendJson(res, 502, { error: 'Antwort konnte nicht geparst werden.' });
      return sendJson(res, 200, analysis);
    }

    if (mode === 'upload') {
      const fileBase64 = body.file_base64 || '';
      const mimeType = body.mime_type || '';
      if (!fileBase64 || !mimeType) return sendJson(res, 400, { error: 'Datei oder MIME-Type fehlt.' });
      if (!['application/pdf', 'image/png', 'image/jpeg', 'image/webp'].includes(mimeType)) {
        return sendJson(res, 415, { error: `Nicht unterstuetzter Dateityp: ${mimeType}` });
      }
      // Decoded size sanity check (base64 = 4/3 of binary)
      const decodedSize = Math.floor(fileBase64.length * 0.75);
      if (decodedSize > 4_500_000) return sendJson(res, 413, { error: 'Datei zu gross (max 4 MB).' });

      const userPrompt = USER_PROMPT_TEMPLATE.replace('{document_content}', '[Datei-Anhang — siehe Bild/PDF]');
      let raw = await callOpenRouterMultimodal(fileBase64, mimeType, userPrompt);
      if (!raw) raw = await callOpenAIText(userPrompt);
      if (!raw) return sendJson(res, 502, { error: 'LLM-Analyse fehlgeschlagen (Multimodal).' });
      const analysis = parseLLMJson(raw);
      if (!analysis) return sendJson(res, 502, { error: 'Antwort konnte nicht geparst werden.' });
      return sendJson(res, 200, analysis);
    }

    return sendJson(res, 400, { error: 'Unbekannter Modus.' });
  } catch (e) {
    return sendJson(res, 500, { error: `Interner Fehler: ${String(e).slice(0, 200)}` });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
  maxDuration: 45,
};

// Website Opportunity Audit. Public URL analysis is deliberately opt-in:
// it fetches third-party content and therefore needs a separately deployed,
// hardened scraper. The product remains demonstrable through the sample route.
import { lookup } from 'node:dns/promises';
import net from 'node:net';

const SCRAPER_URL = process.env.SCRAPER_URL?.replace(/\/$/, '') || '';
const SCRAPER_SHARED_SECRET = process.env.SCRAPER_SHARED_SECRET || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_AUDIT_MODEL = process.env.OPENAI_AUDIT_MODEL || 'gpt-5.4-mini';
const EXTERNAL_AUDIT_ENABLED = process.env.EXTERNAL_AUDIT_ENABLED === 'true';
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map();

const SAMPLE_RESULT = {
  mode: 'sample',
  url: 'beispielbetrieb.invalid',
  scrape: {
    title: 'Beispielbetrieb – Musteranalyse',
    technologies: ['Beispieldaten'],
    word_count: 0,
    response_time_ms: 0,
  },
  analysis: {
    summary:
      'Diese Musteranalyse zeigt die Form des Audits. Sie basiert nicht auf einer realen Unternehmenswebsite und ist keine Aussage über Ihr Unternehmen.',
    opportunities: [
      {
        title: 'Anfragen strukturiert vorqualifizieren',
        evidence: 'Beispiel: Mehrere Kontaktwege und wiederkehrende Produktfragen.',
        description:
          'Ein geführter Dialog kann Bedarf, Dringlichkeit und Kontaktdaten erfassen, bevor eine zuständige Person übernimmt.',
        impact: 'Hoch',
        effort: 'Mittel',
        assumptions: 'Wirkung und Integrationsaufwand werden erst nach Prozess- und Systemcheck bewertet.',
      },
      {
        title: 'Wiederkehrende Informationen auffindbar machen',
        evidence: 'Beispiel: Inhalte liegen auf mehreren Leistungs- und FAQ-Seiten.',
        description:
          'Eine gepflegte Wissensbasis kann Antworten konsistent bereitstellen und sensible Fälle an Menschen eskalieren.',
        impact: 'Mittel',
        effort: 'Mittel',
        assumptions: 'Voraussetzung sind freigegebene Inhalte, Zuständigkeiten und ein Review-Prozess.',
      },
    ],
    missing_basics: [
      'Musterhinweis: Messpunkte und Übergaben müssen im echten Prozess gemeinsam geprüft werden.',
    ],
    recommendation:
      'Mit einem klar abgegrenzten Anfrageprozess beginnen: Eingang, Pflichtinformationen, menschliche Übergabe und Messgröße festlegen.',
    tool_suggestion: 'Vorqualifizierung mit menschlicher Übergabe',
  },
};

const ANALYSIS_PROMPT = `Du führst einen vorsichtigen Website Opportunity Audit für ein deutsches Unternehmen durch. Verwende ausschließlich die untenstehenden Inhalte als Evidenz. Eine Website zeigt nicht die internen Prozesse, Datenqualität, Kosten oder rechtliche Lage eines Unternehmens.

Website-Inhalt:
---
{markdown}
---

Metadaten:
- URL: {url}
- Titel: {title}
- Erkannte Technologien: {technologies}
- Kontaktmöglichkeit sichtbar: {has_contact}
- Preise sichtbar: {has_pricing}
- Impressum verlinkt: {has_imprint}
- Datenschutz verlinkt: {has_privacy}

Antworte ausschließlich als valides JSON:
{
  "summary": "2 kurze Sätze; klar benennen, dass dies nur eine öffentliche Website-Prüfung ist.",
  "opportunities": [{
    "title": "konkrete Chance",
    "evidence": "beobachtbarer Hinweis aus dem Inhalt, keine Vermutung als Fakt",
    "description": "mögliche Lösung mit menschlicher Übergabe oder Kontrolle, wenn sinnvoll",
    "impact": "Hoch|Mittel|Niedrig",
    "effort": "Gering|Mittel|Hoch",
    "assumptions": "welche Annahme oder Prüfung vor einer Entscheidung fehlt"
  }],
  "missing_basics": ["maximal drei sachliche, nur aus der Website ableitbare Hinweise"],
  "recommendation": "ein risikoarmer nächster Prüfschritt",
  "tool_suggestion": "eine Kategorie, keine Produkt- oder Modellwerbung"
}

Regeln: Keine Punktezahl oder Reifegrad. Keine Zahlen, Einsparungen, Umsatz-, Zeit-, Compliance- oder Rechtsversprechen. Keine Behauptungen über nicht sichtbare Systeme. Maximal drei Chancen.`;

function sendJson(res, status, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(data);
}

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown')
    .toString()
    .split(',')[0]
    .trim();
}

function withinRateLimit(req) {
  const now = Date.now();
  const key = clientKey(req);
  const active = (requestLog.get(key) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (active.length >= RATE_LIMIT_MAX_REQUESTS) return false;
  active.push(now);
  requestLog.set(key, active);
  return true;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = '';
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 4096) {
        reject(new Error('Request too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { return resolve(JSON.parse(body)); }
      catch { return reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function isPublicAddress(address) {
  const family = net.isIP(address);
  if (family === 4) {
    const [a, b] = address.split('.').map(Number);
    return !(
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 0) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  if (family === 6) {
    const normalized = address.toLowerCase();
    return !(normalized === '::1' || normalized === '::' || normalized.startsWith('fc') ||
      normalized.startsWith('fd') || normalized.startsWith('fe80:') || normalized.startsWith('::ffff:'));
  }
  return false;
}

async function validatePublicUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) throw new Error('Bitte eine gültige öffentliche HTTPS- oder HTTP-URL eingeben.');
  const normalized = /^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`;
  let parsed;
  try { parsed = new URL(normalized); }
  catch { throw new Error('Bitte eine gültige öffentliche HTTPS- oder HTTP-URL eingeben.'); }

  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password ||
      (parsed.port && !['80', '443'].includes(parsed.port))) {
    throw new Error('Diese URL kann nicht geprüft werden.');
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!hostname || hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
    throw new Error('Nur öffentliche Websites können geprüft werden.');
  }

  if (net.isIP(hostname)) {
    if (!isPublicAddress(hostname)) throw new Error('Nur öffentliche Websites können geprüft werden.');
  } else {
    let records;
    try { records = await lookup(hostname, { all: true, verbatim: true }); }
    catch { throw new Error('Die Domain konnte nicht sicher aufgelöst werden.'); }
    if (!records.length || records.some((record) => !isPublicAddress(record.address))) {
      throw new Error('Nur öffentliche Websites können geprüft werden.');
    }
  }
  return parsed.toString();
}

function cleanText(value, limit = 600) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, limit) : '';
}

function enumValue(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function normalizeAnalysis(value) {
  if (!value || typeof value !== 'object') throw new Error('Invalid analysis format');
  const opportunities = Array.isArray(value.opportunities) ? value.opportunities.slice(0, 3).map((item) => ({
    title: cleanText(item?.title, 100),
    evidence: cleanText(item?.evidence, 280),
    description: cleanText(item?.description, 500),
    impact: enumValue(item?.impact, ['Hoch', 'Mittel', 'Niedrig'], 'Mittel'),
    effort: enumValue(item?.effort, ['Gering', 'Mittel', 'Hoch'], 'Mittel'),
    assumptions: cleanText(item?.assumptions, 320),
  })).filter((item) => item.title && item.description && item.evidence) : [];

  return {
    summary: cleanText(value.summary, 700),
    opportunities,
    missing_basics: (Array.isArray(value.missing_basics) ? value.missing_basics : [])
      .slice(0, 3).map((item) => cleanText(item, 220)).filter(Boolean),
    recommendation: cleanText(value.recommendation, 600),
    tool_suggestion: cleanText(value.tool_suggestion, 120),
  };
}

export default async function handler(req, res) {
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/api/analyze/health')) {
    return sendJson(res, 200, { status: 'ok', service: 'website-opportunity-audit', external_audit_enabled: EXTERNAL_AUDIT_ENABLED });
  }
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });
  if (!withinRateLimit(req)) return sendJson(res, 429, { error: 'Zu viele Anfragen. Bitte später erneut versuchen.' });

  let body;
  try { body = await readJsonBody(req); }
  catch { return sendJson(res, 400, { error: 'Ungültiges Request-Format.' }); }

  if (body.mode === 'sample') return sendJson(res, 200, SAMPLE_RESULT);
  if (!EXTERNAL_AUDIT_ENABLED || !SCRAPER_URL || !SCRAPER_SHARED_SECRET) {
    return sendJson(res, 503, { error: 'Die Prüfung öffentlicher Websites wird gerade kontrolliert vorbereitet. Nutzen Sie bis dahin die Musteranalyse.' });
  }
  if (!OPENAI_API_KEY) return sendJson(res, 503, { error: 'Der Audit-Service ist noch nicht konfiguriert.' });

  let url;
  try { url = await validatePublicUrl(body.url); }
  catch (error) { return sendJson(res, 400, { error: error.message }); }

  let scrapeData;
  try {
    const scrapeResponse = await fetch(`${SCRAPER_URL}/scrape`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Audit-Scraper-Key': SCRAPER_SHARED_SECRET }, body: JSON.stringify({ url }), signal: AbortSignal.timeout(12000),
    });
    if (!scrapeResponse.ok) return sendJson(res, 502, { error: 'Die öffentliche Website konnte nicht geprüft werden.' });
    scrapeData = await scrapeResponse.json();
  } catch (error) {
    const status = error?.name === 'TimeoutError' ? 504 : 502;
    return sendJson(res, status, { error: 'Die öffentliche Website konnte nicht geprüft werden.' });
  }

  const prompt = ANALYSIS_PROMPT
    .replace('{markdown}', cleanText(String(scrapeData.markdown || ''), 12000))
    .replace('{url}', url).replace('{title}', cleanText(scrapeData.title, 200))
    .replace('{technologies}', (Array.isArray(scrapeData.technologies) ? scrapeData.technologies : []).join(', ') || 'Keine erkannt')
    .replace('{has_contact}', scrapeData.has_contact_form ? 'Ja' : 'Nein')
    .replace('{has_pricing}', scrapeData.has_pricing_page ? 'Ja' : 'Nein')
    .replace('{has_imprint}', scrapeData.has_imprint ? 'Ja' : 'Nein')
    .replace('{has_privacy}', scrapeData.has_privacy_policy ? 'Ja' : 'Nein');

  let response;
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OPENAI_AUDIT_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2, max_tokens: 1400, response_format: { type: 'json_object' }, store: false,
      }),
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    return sendJson(res, error?.name === 'TimeoutError' ? 504 : 502, { error: 'Die Audit-Auswertung konnte nicht abgeschlossen werden.' });
  }
  if (!response.ok) {
    console.error(`Audit model error: ${response.status}`);
    return sendJson(res, 502, { error: 'Die Audit-Auswertung konnte nicht abgeschlossen werden.' });
  }

  try {
    const payload = await response.json();
    const analysis = normalizeAnalysis(JSON.parse(payload?.choices?.[0]?.message?.content || '{}'));
    return sendJson(res, 200, {
      mode: 'external', url,
      scrape: {
        title: cleanText(scrapeData.title, 200), technologies: Array.isArray(scrapeData.technologies) ? scrapeData.technologies.slice(0, 12) : [],
        word_count: Number(scrapeData.word_count) || 0, response_time_ms: Number(scrapeData.response_time_ms) || 0,
      },
      analysis,
    });
  } catch {
    return sendJson(res, 502, { error: 'Die Audit-Auswertung lieferte kein verwertbares Format.' });
  }
}

export const config = { maxDuration: 30 };

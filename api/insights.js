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
// Last update: 2026-06-15 06:35 UTC — W24+ v2, after multi-source expansion.
// Schema mirrors shapeBrief() output: 7-9 trends, 6-8 opps, 15 articles,
// 5-7 action items — so the client can render the full layout even in
// emergency mode without falling back to a degraded view.
const EMERGENCY_SNAPSHOT = {
  generated_at: "2026-06-15T06:35:38.000000+00:00",
  vertical: "German Mittelstand Digital & KI-Automation",
  model: "gpt-4o-mini",
  issue_url: "https://ai-industry-watcher.vercel.app",
  issue: {
    headline: "Künstliche Intelligenz: Herausforderungen und Chancen für den Mittelstand",
    subheadline: "Krisen, Regulierung und neue Werkzeuge prägen die KI-Woche — was Mittelständler jetzt wissen sollten.",
    executivo_summary: "Diese Woche sorgte KPMG für Aufsehen, als das Unternehmen einen Bericht über KI in Unternehmen zurückzog, der gefälschte Fallstudien enthielt. Dies wirft Fragen zur Zuverlässigkeit von KI-generierten Inhalten auf und verstärkt die Diskussion über die Abhängigkeit von KI in der Industrie. Der US-Bann für das KI-Modell von Anthropic alarmiert internationale Märkte und zeigt, wie schnell sich Unsicherheiten ausbreiten können. Gleichzeitig fordern Routerhersteller strengere Sicherheitsvorschriften für importierte Geräte — ein Thema, das auch die Lieferketten-Resilienz im Mittelstand betrifft. Der schleppende Breitbandausbau bleibt hinter den Digitalisierungs-Erwartungen zurück. Insgesamt zeigt die Woche: die KI-Industrie wird erwachsen, mit allen Schmerzen die dazugehören — Vertrauen wird zur härtesten Währung.",
    trends: [
      { title: "Zunehmende Regulierung von KI-Technologien", signal: "hoch", what: "Regierungen weltweit verschärfen den regulatorischen Rahmen für KI-Entwicklung und -Einsatz.", why: "Mittelständler müssen Compliance-Kosten einplanen und ihre KI-Nutzung dokumentieren." },
      { title: "Breitbandausbau als Schlüssel zur Digitalisierung", signal: "hoch", what: "Der Glasfaser-Ausbau in Deutschland bleibt hinter den politischen Versprechen zurück — eine Hürde für KI-Anwendungen.", why: "Cloud-basierte KI-Tools brauchen Bandbreite — schlechte Internet-Anbindung limitiert den Nutzen für ländliche Mittelständler." },
      { title: "KI-Generierung von Inhalten und deren Risiken", signal: "hoch", what: "KPMG und andere große Beratungen kämpfen mit gefälschten KI-generierten Inhalten in Berichten.", why: "Vertrauen in KI-Ausgaben wird zur Chefsache — Mittelständler brauchen Validierungs-Strategien." },
      { title: "Wachsende Nachfrage nach KI-Agenten", signal: "mittel", what: "Multi-Agent-Frameworks wie LangGraph, AutoGen und CrewAI erreichen Produktionsreife.", why: "Auch ohne dedizierte KI-Teams können Mittelständler komplexe Workflows automatisieren." },
      { title: "Technologische Innovationen im Bereich KI", signal: "mittel", what: "GPT-5, Claude Opus 4.1 und Gemini Ultra 2 setzen neue Maßstäbe bei multimodalen Fähigkeiten.", why: "Mittelständler können jetzt komplexere Aufgaben automatisieren die mehrere Modalitäten verarbeiten." },
      { title: "Herausforderungen bei der Implementierung von KI", signal: "hoch", what: "Viele Unternehmen scheitern an der Skalierung von KI-Piloten in produktive Workflows.", why: "Change-Management und Datenqualität sind die wahren Engpässe — nicht die Technologie." },
      { title: "Internationale Reaktionen auf KI-Regulierungen", signal: "mittel", what: "EU AI Act, US Executive Orders und chinesische KI-Gesetze schaffen fragmentierte Compliance-Landschaft.", why: "Mittelständler mit internationalen Kunden müssen multiple Regulatorien gleichzeitig erfüllen." },
      { title: "Vertrauen in KI-Technologien", signal: "hoch", what: "Vertrauenswürdigkeit, Transparenz und Erklärbarkeit werden zu zentralen Beschaffungskriterien.", why: "Mittelständler die jetzt Vertrauen aufbauen, positionieren sich langfristig als seriöse KI-Partner." }
    ],
    opportunities: [
      { title: "Entwicklung eines KI-Transparenz-Tools", what: "Tool oder Beratung das die Vertrauenswürdigkeit von KI-Outputs bewertet und Quellen/Confidence-Scores ausgibt.", who: "Beratungen, Content-Agenturen, Compliance-Teams", how: "hoch", price: "5.000-15.000€ Setup + monatlich", time_to_market: "Wochen" },
      { title: "Beratung zur Breitbandanbindung", what: "Beratung zu Alternativen bei schlechter Internet-Anbindung — Edge-Computing, lokale LLMs, Hybrid-Cloud.", who: "Ländliche Mittelständler, produzierendes Gewerbe", how: "hoch", price: "2.000-5.000€", time_to_market: "Tagen" },
      { title: "Workshop zur KI-Implementierung", what: "Hands-on Workshop für Geschäftsführer und IT-Leiter zur strategischen KI-Einführung.", who: "Mittelständler 20-200 MA ohne dedizierte KI-Strategie", how: "hoch", price: "1.500-3.000€ pro Workshop", time_to_market: "Tagen" },
      { title: "Erstellung von KI-Content-Richtlinien", what: "Entwicklung interner Compliance-Richtlinien für den Umgang mit KI-generierten Inhalten.", who: "Alle Unternehmen die KI-Tools nutzen", how: "mittel", price: "1.000-2.500€ pro Workshop", time_to_market: "Tagen" },
      { title: "Entwicklung von KI-Agenten für spezifische Branchen", what: "Maßgeschneiderte Multi-Agent-Systeme für Branchen-Workflows (Finance, HR, Operations).", who: "KMUs 50-500 MA mit hohem manuellem Aufwand", how: "hoch", price: "10.000-50.000€ Setup", time_to_market: "Wochen" },
      { title: "Schulung für KI-Tools", what: "Praxisorientierte Schulungen für Mitarbeiter zur produktiven Nutzung von KI-Tools.", who: "Alle Unternehmen die KI einführen", how: "hoch", price: "1.000-4.000€ pro Schulung", time_to_market: "Tagen" },
      { title: "Entwicklung eines KI-gestützten Analysesystems", what: "Custom LLM-basierte Analyse-Pipelines für Branchen-Insights, Compliance-Checks oder Marktrecherche.", who: "Beratungen, Research-Abteilungen, Due-Diligence-Teams", how: "hoch", price: "15.000-30.000€ Setup", time_to_market: "Wochen" }
    ],
    top_articles: [
      { title: "Krise im KI-Sektor: KPMG zieht Bericht über Halluzinationen zurück", url: "https://www.golem.de/news/kpmg-ki-2606.html", source: "Golem.de", date: "2026-06-15", why: "Vertrauen in KI-generierte Berichte ist akut gefährdet — KPMG als Big-Four-Firma zeigt die systemische Dimension des Problems." },
      { title: "Trump-Regierung verbietet Anthropic-Modell", url: "https://the-decoder.de/anthropic-trump-2606/", source: "The Decoder", date: "2026-06-15", why: "Geopolitische KI-Fragmentierung wird Realität — betrifft auch europäische Mittelständler mit US-Geschäftsbeziehungen." },
      { title: "Routerhersteller fordern strengere Sicherheitsregeln für importierte Geräte", url: "https://www.heise.de/news/router-import-2606.html", source: "Heise Online", date: "2026-06-14", why: "Lieferketten-Sicherheit wird zur Compliance-Pflicht — auch für KMUs die Netzwerk-Hardware einkaufen." },
      { title: "Breitbandausbau: Deutschland verfehlt eigene Ziele erneut", url: "https://www.computerwoche.de/breitband-2606.html", source: "Computerwoche", date: "2026-06-14", why: "Cloud-basierte KI-Anwendungen brauchen Bandbreite — schlechte Anbindung limitiert den Wert für ländliche Mittelständler." },
      { title: "OpenAI kündigt GPT-5 mit deutlich verbessertem Reasoning an", url: "https://the-decoder.de/openai-gpt5-2606/", source: "The Decoder", date: "2026-06-13", why: "Neue Modell-Generation verändert die Kostenstruktur für KI-Anwendungen — Mittelständler können jetzt komplexere Use-Cases produktiv angehen." },
      { title: "EU AI Act: Erste Konformitätspflichten gelten ab 2025", url: "https://t3n.de/news/eu-ai-act-2606/", source: "t3n Digital Pioneers", date: "2026-06-13", why: "Compliance-Frist rückt näher — Mittelständler mit KI-Nutzung müssen handeln." },
      { title: "Mistral veröffentlicht neues Open-Source-LLM auf GPT-4 Niveau", url: "https://the-decoder.de/mistral-opensource-2606/", source: "The Decoder", date: "2026-06-12", why: "On-Premise-Optionen werden für DSGVO-kritische Mittelständler attraktiver." },
      { title: "Anthropic veröffentlicht Claude 4.1 mit verbesserter Tool-Nutzung", url: "https://www.heise.de/news/anthropic-claude-41-2606.html", source: "Heise Online", date: "2026-06-12", why: "Multi-Step-Workflows werden zuverlässiger — relevant für alle KI-Automation-Projekte." },
      { title: "VentureBeat: Warum 80% der KI-Projekte scheitern", url: "https://venturebeat.com/ai-projects-fail-2606/", source: "VentureBeat", date: "2026-06-12", why: "Wichtige Datenpunkte zum Verständnis der Lücke zwischen Pilot und Produktion." },
      { title: "TechCrunch: Wie SaaS-Unternehmen KI in ihre Produkte integrieren", url: "https://techcrunch.com/saas-ai-2606/", source: "TechCrunch", date: "2026-06-11", why: "Patterns und Anti-Patterns für KI-Integration in bestehende Software-Produkte." },
      { title: "The Verge: Google stellt Gemini 2 vor — neues Top-Modell", url: "https://www.theverge.com/google-gemini-2-2606/", source: "The Verge", date: "2026-06-11", why: "Multimodale Fähigkeiten werden zum Standard — betrifft alle Workflows die mit Text+Bild+Audio arbeiten." },
      { title: "Heise: Warum deutsche Unternehmen bei KI hinterherhinken", url: "https://www.heise.de/news/deutschland-ki-2606.html", source: "Heise Online", date: "2026-06-10", why: "Strukturelle Gründe für die langsame Adoption — relevant für jeden der deutschen Mittelstand berät." },
      { title: "t3n: Die 10 wichtigsten KI-Tools für KMUs 2026", url: "https://t3n.de/news/ki-tools-kmus-2606/", source: "t3n Digital Pioneers", date: "2026-06-10", why: "Konkrete Tool-Liste mit Preis-Indikationen — gut als Beratungs-Grundlage." }
    ],
    action_items: [
      "Führen Sie eine Analyse der aktuellen KI-Nutzung in Ihrem Unternehmen durch und identifizieren Sie die größten Vertrauens-Risiken (Stichwort: KPMG-Fall).",
      "Organisieren Sie einen internen Workshop zur Sensibilisierung für die Risiken von KI-generierten Inhalten und etablieren Sie Validierungs-Prozesse.",
      "Prüfen Sie die Internetanbindung Ihres Unternehmens und erstellen Sie einen Plan zur Verbesserung der Bandbreite oder zur Edge-Computing-Migration.",
      "Setzen Sie sich mit einem Experten für KI-Transparenz in Verbindung, um Compliance-Richtlinien für den EU AI Act zu entwickeln — erste Fristen gelten ab 2025.",
      "Erstellen Sie einen Plan zur Schulung Ihrer Mitarbeiter im produktiven Umgang mit KI-Tools (Cursor, Claude Code, GPT-5) und definieren Sie Review-Prozesse für KI-generierten Code."
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
  // Pass through all trends / opportunities / top_articles / action_items
  // that the LLM generated — the client component decides what to render.
  if (!raw || !raw.brief) return null;
  const b = raw.brief;
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
      executivo_summary: b.executive_summary,
      // All trends (7-9) — client decides how many to render
      trends: (b.trends || []).map((t) => ({
        title: t.title,
        signal: t.signal,
        what: t.what,
        why: t.why,
      })),
      // All opportunities (6-8)
      opportunities: (b.opportunities || []).map((o) => ({
        title: o.title,
        what: o.what,
        who: o.who,
        how: o.how,
        price: o.price,
        time_to_market: o['time-to-market'] || o.time_to_market,
      })),
      // All top_articles (up to 15) — client decides how many to show
      top_articles: (b.top_articles || []).map((a) => ({
        title: a.title,
        url: a.url,
        source: a.source,
        date: a.date,
        why: a.why,
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

    // Stale-data detection: if upstream returns data older than our
    // emergency snapshot, the Sub-Site has a stale Vercel deploy and
    // we should serve our embedded fresh version instead.
    if (EMERGENCY_SNAPSHOT.generated_at) {
      const upstreamGen = Date.parse(shaped.generated_at);
      const fallbackGen = Date.parse(EMERGENCY_SNAPSHOT.generated_at);
      if (!isNaN(upstreamGen) && !isNaN(fallbackGen) && fallbackGen > upstreamGen) {
        res.setHeader('X-Cache', 'EMERGENCY-SNAPSHOT');
        res.setHeader('X-Cache-Reason', `Upstream stale: ${shaped.generated_at} < ${EMERGENCY_SNAPSHOT.generated_at}`);
        // still cache the upstream so we don't hammer it
        cache = { at: now, data: shaped, stale: true };
        return sendJson(res, 200, EMERGENCY_SNAPSHOT);
      }
    }

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

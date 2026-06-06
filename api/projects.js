// Vercel Serverless Function: GitHub Projects
// Returns a curated list of public repos as "projects" for the Ainzigartig site.
// Filters GitHub's repo list down to ~8 flagships with human-written taglines
// (agency clients don't speak "repo" — they want to see what each thing does).

const USERNAME = 'igoingtodevx';
const CACHE_TTL_SEC = 300; // 5 min

// Curated metadata — taglines and tags we own, NOT GitHub's auto-description.
// Add/remove entries here to change what's shown on /#/projekte.
const CURATED = {
  'industry-watcher': {
    tagline: 'Wöchentliche KI-Branchen-Analyse. RSS + LLM kuratiert die wichtigsten 10 Artikel der Woche, priorisiert nach Mittelstand-Relevanz.',
    category: 'Research',
    status: 'live',
    live_url: 'https://ai-industry-watcher.vercel.app',
  },
  'ai-job-matcher': {
    tagline: 'LinkedIn-Jobs scannen, mit Lebenslauf matchen, personalisierte Bewerbungs-E-Mails generieren. LLM-basiertes Screening.',
    category: 'Automation',
    status: 'live',
    live_url: '',
  },
  'viral-script-generator': {
    tagline: 'YouTube/TikTok-Skripte aus einem Thema generieren. Hook + Story + CTA-Struktur, getuned auf Retainment.',
    category: 'Content',
    status: 'live',
    live_url: '',
  },
  'get-shit-done': {
    tagline: 'Aufgaben-Tracker mit KI-Priorisierung. Was heute, was diese Woche, was nie. Fokus statt Feature-Liste.',
    category: 'Productivity',
    status: 'beta',
    live_url: '',
  },
  'aegis-mission-control': {
    tagline: 'Operations-Dashboard für autonome KI-Agenten. Tasks, Logs, Health, Inter-Agent-Kommunikation.',
    category: 'Infrastructure',
    status: 'live',
    live_url: '',
  },
  'lukas-script-pipeline': {
    tagline: 'Skript-zu-Video Pipeline. Voice-over, B-Roll, Captions — alles aus einem Markdown-Dokument.',
    category: 'Content',
    status: 'beta',
    live_url: '',
  },
  'zuegig_omo': {
    tagline: 'Umzugs-Orchestrator. Anfrage, Angebot, Buchung, Tracking — auf einer Seite, ohne Telefon-Marathon.',
    category: 'Operations',
    status: 'beta',
    live_url: '',
  },
  'zugig-app-Undeep': {
    tagline: 'Mobility as a Service. Eine App für alle Wege — ÖPNV, Bike, Auto, Carsharing, geteilt gebucht und bezahlt.',
    category: 'Product',
    status: 'beta',
    live_url: '',
  },
};

// In-memory cache (function warm reuse — Vercel Hobby will reset)
let cache = { at: 0, data: null };

async function fetchRepos() {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'ainzigartig-projects-api',
  };
  if (process.env.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;

  const resp = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner&sort=updated`,
    { headers }
  );
  if (!resp.ok) {
    throw new Error(`GitHub API ${resp.status}`);
  }
  return await resp.json();
}

function sendJson(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(status).json(data);
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

  try {
    const now = Date.now();
    if (cache.data && now - cache.at < CACHE_TTL_SEC * 1000) {
      res.setHeader('X-Cache', 'HIT');
      return sendJson(res, 200, cache.data);
    }

    const allRepos = await fetchRepos();

    // Only public, non-fork, non-archived. Curated set only.
    const projects = allRepos
      .filter((r) => r.name in CURATED && !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushed_at: r.pushed_at,
        category: CURATED[r.name].category,
        tagline: CURATED[r.name].tagline,
        status: CURATED[r.name].status,
        live_url: CURATED[r.name].live_url,
      }))
      // Show industry-watcher first (most complete demo), then by stars
      .sort((a, b) => {
        if (a.name === 'industry-watcher') return -1;
        if (b.name === 'industry-watcher') return 1;
        return b.stars - a.stars;
      });

    cache = { at: now, data: { projects, count: projects.length } };
    res.setHeader('X-Cache', 'MISS');
    return sendJson(res, 200, cache.data);
  } catch (e) {
    return sendJson(res, 502, { error: `Projekte konnten nicht geladen werden: ${String(e).slice(0, 200)}` });
  }
}

export const config = {
  maxDuration: 10,
};

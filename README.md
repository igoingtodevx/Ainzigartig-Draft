# Ainzigartig

**KI-Beratung für den deutschen Mittelstand.** Konkret, schnell, ohne Pilotprojekte die im Nichts enden.

Live: [ainzigartig.vercel.app](https://ainzigartig.vercel.app)

---

## Was das hier ist

Eine Marketing-Website mit drei integrierten KI-Demos:

1. **Edi** — der KI-Chat-Assistent (rechts unten auf jeder Seite). Beantwortet Fragen zu Ainzigartig, mit Charakter statt Buzzword-Sprech.
2. **KI-Website-Analyse** (`/ki-analyse`) — gibt eine URL ein, kriegt einen KI-Reifegrad-Score plus konkrete Optimierungsvorschläge.
3. **Live-Dokumenten-Agent** (`/live-demo`) — lädt eine Rechnung/E-Mail/Angebot hoch, der Agent extrahiert Felder, schlägt nächste Schritte vor, markiert Risiken.

Backend: Vercel Serverless Functions. Eine AI-Abhängigkeit (OpenAI). Eine E-Mail-Abhängigkeit (Resend).

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite 6, Tailwind 3, React Router 6 |
| Hosting | Vercel (static + functions) |
| AI | OpenAI `gpt-4o-mini` (chat, vision, structured JSON) |
| Email | Resend (contact form → inbox) |
| Analytics | Vercel Analytics |
| Scraper | Standalone FastAPI auf VPS (nur für `/ki-analyse` benötigt) |

---

## Entwicklung lokal

```bash
npm install
npm run dev
```

Die Seite läuft auf `http://localhost:3000`. Für die KI-Endpunkte brauchst du entweder echte API-Keys oder du akzeptierst 500er auf `/api/chat` und `/api/analyze`.

### Build

```bash
npm run build      # Produktion in dist/
npm run preview    # dist/ lokal serven
```

---

## Environment variables (Vercel)

Drei Variablen, in den Vercel-Projekt-Einstellungen unter **Settings → Environment Variables** setzen. Production + Preview + Development gleich.

| Var | Required | Wo es verwendet wird | Was passiert ohne |
|---|---|---|---|
| `OPENAI_API_KEY` | ✅ | `api/chat.js`, `api/analyze.py`, `api/live-agent-demo.js` | Alle 3 Endpunkte → 500/502 |
| `RESEND_API_KEY` | ✅ | `api/contact.js` | Contact-Form → 500 |
| `CONTACT_EMAIL` | optional | `api/contact.js` — Empfänger der Form-Submissions. Default: `florian.schupp@student.uni-siegen.de` | Default greift |
| `GITHUB_TOKEN` | optional | `api/projects.js` — GitHub-PAT für 5000/h Rate-Limit statt 60/h. **Aktuell gesetzt** auf Vercel. | Funktioniert ohne, aber 60/h statt 5000/h |
| `CHAT_ENABLED` | optional | `api/chat.js` — setze auf `"false"` um den Chat zu killen | Chat läuft normal |
| `SCRAPER_URL` | optional | `api/analyze.py` — wo der VPS-Scraper läuft. Default: `http://138.68.96.190:8501` | Default greift |

**Nicht mehr nötig (entfernt):** `GEMINI_API_KEY`, `NVIDIA_API_KEY`, `OPENROUTER_API_KEY`.

---

## Architektur

### Routen (React Router v6)

```
/                          →  Startseite
/ki-beratung               →  Landing: Strategische KI-Beratung
/ki-kundenservice          →  Landing: KI-Chatbots für Support
/ki-recruiting             →  Landing: CV-Screening & Matching
/analytics-dashboard       →  Landing: Echtzeit-Analytics
/roi-rechner               →  ROI-Rechner (client-side, kein Backend)
/ki-schnellstart           →  Landing: 5-Tage-Setup
/ki-audit                  →  Interaktiver Reifegrad-Check (6 Fragen)
/preise                    →  Pricing-Übersicht
/ki-analyse                →  URL → KI-Analyse (POST /api/analyse)
/live-demo                 →  PDF/Image → Document-Agent (POST /api/live-agent-demo)
/projekte                  →  Eigene GitHub-Projekte (GET /api/projects)
/impressum                 →  Legal
/datenschutz               →  Legal
*                          →  404
```

### API-Endpunkte

| Endpoint | Method | Provider | Was es tut |
|---|---|---|---|
| `/api/chat` | POST | OpenAI `gpt-4o-mini` | Chat-Assistent "Edi" |
| `/api/analyze` | POST | OpenAI `gpt-4o-mini` + VPS Scraper | Website KI-Analyse |
| `/api/live-agent-demo` | POST | OpenAI `gpt-4o-mini` (text + vision) | Dokument-Analyse |
| `/api/projects` | GET | GitHub REST | Kuratierte Repo-Liste |
| `/api/contact` | POST | Resend | Kontaktformular → E-Mail |
| `/api/chat/health` | GET | – | Health check |
| `/api/live-agent-demo/health` | GET | – | Health check |
| `/api/projects/health` | GET | – | Health check |

Alle AI-Endpoints verwenden dasselbe `OPENAI_API_KEY` und denselben Provider — keine Multi-Provider-Komplexität.

### Edi — der Chat-Assistent

Persönlichkeit lebt im `SYSTEM_PROMPT` in `api/chat.js`. Persona-Details editieren ist ein One-File-Change, kein Frontend-Rebuild nötig. Wissensbasis liegt in `api/company-context.md` — das ist die einzige Quelle der Wahrheit, was Edi weiß. Updates dort sind sofort nach Redeploy live.

Edi nutzt `gpt-4o-mini` mit `temperature: 0.85`, `presence_penalty: 0.3` für abwechslungsreiche Antworten. Kein `response_format: json_object` (Edi redet frei, nicht strukturiert).

### Rate limiting

Im-memory, per IP. Heuristik: max 1 Request / 5s, max 30 Requests / Stunde. Cold-start-reset: nach einem Vercel-Function-Restart ist der Counter weg — das ist OK für die erwartete Last.

### Live-Dokumenten-Agent

PDFs werden client-seitig via `pdfjs-dist` zu Bildern gerendert (max. 5 Seiten), dann als Base64-Data-URLs an die `/api/live-agent-demo` geschickt. Der OpenAI-Aufruf nutzt `gpt-4o-mini` mit `response_format: { type: "json_object" }` für garantiert parsebares JSON. Die App hat drei Beispiel-Dokumente (Rechnung, E-Mail, Angebot) für Demo-Zwecke — siehe `SAMPLE_INVOICE`, `SAMPLE_EMAIL`, `SAMPLE_OFFER` in `components/LiveAgentDemo.tsx`.

---

## Vercel Setup

Das Projekt erwartet eine `vercel.json` mit:

- `framework: "vite"` (statisches Frontend in `dist/`)
- `functions` für `api/*.js` (Node.js Runtime) und `api/analyze.py` (Python Runtime via `vercel-python`)
- `rewrites` für SPA-Routing (siehe `vercel.json`)

Custom Domain: `ainzigartig.de`. DNS ist nicht Teil dieses Repos.

---

## Repo-Struktur

```
.
├── api/                       Vercel Serverless Functions
│   ├── chat.js                Chat-Assistent "Edi"
│   ├── analyze.py             Website KI-Analyse (mit VPS-Scraper)
│   ├── live-agent-demo.js     Dokument-Analyse (Text + Vision)
│   ├── projects.js            GitHub-Projekte
│   ├── contact.js             Kontaktformular → E-Mail
│   └── company-context.md     Edi-Wissensbasis
│
├── components/                React-Komponenten (eine pro Route + Globals)
│   ├── ChatBot.tsx            Floating Chat
│   ├── ContactForm.tsx        Form (im /#kontakt Anker)
│   ├── ErrorBoundary.tsx      Render-Crash-Fallback
│   ├── NotFound.tsx           404-Seite
│   ├── RouteMeta.tsx          Per-Route <title> + <meta> + OG
│   └── ...                    26 Komponenten total
│
├── scraper/                   Standalone VPS-Service (eigenes Deploy)
│   └── service.py             FastAPI Scraper
│
├── public/                    Statische Assets (robots.txt, sitemap.xml)
├── App.tsx                    React Router + Layout
├── index.html                 HTML-Shell (Default-Meta + OG-Fallback)
├── vercel.json                Vercel-Konfiguration
└── package.json               npm-Dependencies
```

---

## Lokale Entwicklung ohne AI-Keys

Setze in `vercel.json` die Funktionen auf Stub-Mode oder kommentiere die AI-Calls temporär aus. Für Frontend-Entwicklung reicht es, `/api/chat`, `/api/analyze`, `/api/live-agent-demo` als "kann grade nicht" zu akzeptieren — der Rest der Seite funktioniert ohne Backend.

---

## Deploy

Push auf `main` → Vercel auto-deployt. Preview-URLs gibt's für jeden Branch.

```bash
git push origin main                 # → production deploy
git push origin feature/foo          # → preview deploy
```

---

## Lizenz

Privat. © Ainzigartig.

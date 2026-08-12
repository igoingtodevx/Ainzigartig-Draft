# Ainzigartig

Ainzigartig is a React/Vite website for four service pillars aimed at small and medium-sized businesses:

1. Automatisierung & Integrationen
2. Dashboards & interne Business-Tools
3. KI-Assistenten & Wissenssysteme
4. Individuelle KI- & Softwarelösungen

The public reference origin is <https://ainzigartig.vercel.app/>. This repository is the source for the SPA and its Vercel serverless endpoints; external AI, scraper, mail, and insights services remain separate dependencies.

## Public surface

- Live demos: `/ki-analyse`, `/live-demo`, and `/ki-audit`
- Built-system proof: `/projekte`, with AutoWunsch, Zeitstempel, and a generic company knowledge assistant explicitly separated from live demos
- Scenario tool: `/roi-rechner`
- External machine-generated briefing: `/insights`, with source freshness and unavailable states
- Four service-aligned pages plus retained recruiting and quick-start use-case routes
- Legal status pages: `/impressum` and `/datenschutz`

## Commands

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run build
npm run release:check
python3 -m venv .venv
.venv/bin/pip install -r scraper/requirements.txt
.venv/bin/python -m unittest tests/test_scraper_security.py
```

Plain Vite serves the frontend only. Use a Vercel-compatible local runtime for `api/*.js`.

## Server environment

Copy `.env.example` to a local untracked env file and set secrets only in the server/deployment environment. Never use a `VITE_` prefix for model, mail, or service credentials.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_ORIGIN` / `ALLOWED_ORIGINS` | Same-origin checks for public POST endpoints |
| `OPENAI_API_KEY` | Direct server-side OpenAI-compatible requests |
| `AI_GATEWAY_API_KEY` or platform `VERCEL_OIDC_TOKEN` | AI Gateway fallback |
| `OPENAI_*_MODEL` / `AI_GATEWAY_*_MODEL` | Optional route-specific model selection |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Upstash Redis REST credentials for production-wide throttling (preferred Vercel names) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Equivalent direct-Upstash credential names |
| `AI_DAILY_BUDGET_UNITS` | Hard account-wide UTC-day budget for weighted public AI calls; defaults to `500` |
| `TRUSTED_CLIENT_IP_HEADER` | Optional non-Vercel proxy header; use only when that proxy overwrites it |
| `SCRAPER_URL`, `SCRAPER_TOKEN` | Explicit HTTPS scraper and matching server-side bearer token for `/api/analyze` and the VPS |
| `CHAT_ENABLED=false` / `AI_DEMOS_ENABLED=false` | Cost and incident kill switches |
| `CONTACT_FORM_ENABLED=true` | Explicit contact delivery activation |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM` | Required together when contact delivery is enabled |

The VPS unit reads `/etc/ainzigartig-scraper.env`; it must contain the same `SCRAPER_TOKEN` configured for the Vercel function. Keep that file outside the repository with restricted filesystem permissions. The checked-in unit expects this repository at `/home/deploy/Ainzigartig-Draft-foundation` and its virtualenv at `.venv`; install `scraper/requirements.txt` into that virtualenv before installing the unit. It runs `uvicorn` on loopback for an HTTPS reverse proxy. Then run `systemd-analyze verify scraper/ainzigartig-scraper.service` and reload systemd.

## Endpoint guardrails

The chat, website analysis, document demo, and contact endpoints reject cross-site browser requests, require JSON, enforce route-specific body and history limits, use cooldown/hourly buckets, and return `Retry-After` on throttling. In production, public AI routes fail closed unless the Redis REST store is configured. Their per-client limits are atomic across serverless instances, client keys use only platform-overwritten IP headers on Vercel, and a second distributed counter enforces a weighted account-wide UTC-day model-call budget. Chat costs 1 unit, website analysis 8, document samples 6, and document uploads 10; keep each provider/platform hard-spend alert or billing cap enabled as an independent ceiling.

Local development and tests use a bounded process-local fallback when no Redis REST credentials are present. That fallback is deliberately unavailable to the public AI routes when `NODE_ENV=production`; a store outage returns `503` before a model request is made.

Website analysis resolves every initial/redirect target once, rejects any non-global result, and passes the approved numeric address into a dedicated HTTP transport. TLS SNI and certificate checks still use the original hostname, while the TCP connection cannot trigger a second DNS lookup. Responses, redirects, content types, ports, and download size remain bounded.

## Proof boundaries

- AutoWunsch is not described as automatic marketplace matching. The documented scope is intake, checkout/order plumbing, a separate vehicle-analysis preview, and price-trend views.
- Zeitstempel is described only as the implemented browser/PWA prototype: local-first time/site/break records, offline outbox/conflicts, optional sync, totals, and CSV/PDF export.
- The knowledge assistant is generic and integrations-dependent. It is not attributed to an unnamed customer and is not presented as an anonymous live demo.
- AI outputs, insight signals, ROI scenarios, compatibility, savings, availability, hosting location, deletion, auditability, and legal conformity are not guaranteed.

## Release gate

The current repository does not contain verified legal-provider identity, a service address, or a complete controller-specific privacy notice. The public placeholder wording was removed; the two legal pages now state the missing facts cleanly and are marked `noindex`. Contact delivery defaults to disabled and is additionally locked by `content/release.js`.

`npm run release:check` intentionally fails while those real legal details are absent. Replace the legal-status pages with reviewed, factual content and configure contact delivery before treating a future build as releasable.

# Ainzigartig

Ainzigartig is a React/Vite website for an AI consultancy serving small and medium-sized businesses. The repository contains the public marketing site plus Vercel serverless functions for an AI chat assistant, website analysis, document analysis, project data, industry insights, and a contact form.

## Public deployment

The following URL was checked anonymously during this audit and returned HTTP 200:

- <https://ainzigartig.vercel.app/>

This is the only deployment URL documented here. API features may still be unavailable when their server-side environment variables are not configured.

## Evidence-backed stack

- React 19, TypeScript, React Router 6
- Vite 6, Tailwind CSS 3, PostCSS
- Vercel deployment configuration for a Vite SPA and serverless functions
- `pdfjs-dist` for client-side PDF page rendering in the document demo
- Vercel Analytics
- Server-side integrations use the OpenAI Chat Completions API directly or the Vercel AI Gateway, depending on configured credentials

## Implemented scope

- Multi-route marketing site, including `/automatisierung`, `/ki-beratung`, `/ki-kundenservice`, `/ki-recruiting`, `/analytics-dashboard`, `/roi-rechner`, `/ki-schnellstart`, `/ki-audit`, `/preise`, `/ki-analyse`, `/live-demo`, `/projekte`, `/insights`, `/impressum`, and `/datenschutz`.
- `/api/chat`: the “Edi” assistant, with input validation, a six-message history window, cooldown/hourly in-memory rate limiting, and an OpenAI/Vercel AI Gateway provider path.
- `/api/analyze`: accepts a website URL, calls the configured scraper, and asks the configured LLM for structured analysis.
- `/api/live-agent-demo`: analyzes sample text or up to five client-rendered document images and returns structured JSON.
- `/api/contact`: validates a contact request and sends it through Resend.
- `/api/projects` and `/api/insights`: server-side data endpoints used by the project and industry-insights sections.

## Status

The frontend and serverless handlers are implemented and deployed as a public demo. This repository is not a self-contained AI backend: the AI, scraper, email, GitHub, and remote-insights integrations depend on deployment configuration and external services.

## Local setup

```bash
npm install
npm run dev       # Vite development server on port 3000
npm run build
npm run preview
```

For a production-like local API environment, use a Vercel-compatible local runtime. Plain `vite` serves the frontend but does not provide the `api/*.js` functions by itself.

## Server-side environment

Set these in the deployment environment, never in client-exposed `VITE_` variables:

| Variable | Used for |
| --- | --- |
| `OPENAI_API_KEY` | Direct OpenAI calls for chat, analysis, and document analysis |
| `AI_GATEWAY_API_KEY` or the platform-provided `VERCEL_OIDC_TOKEN` | Vercel AI Gateway fallback |
| `RESEND_API_KEY` and `CONTACT_EMAIL` | Contact form delivery; set `CONTACT_EMAIL` explicitly |
| `SCRAPER_URL` | Scraper service used by `/api/analyze` |
| `GITHUB_TOKEN` | Optional authenticated GitHub metadata for `/api/projects` |
| `CHAT_ENABLED=false` | Optional kill switch for `/api/chat` |

The Vite config still reads `GEMINI_API_KEY` for a legacy build-time mapping, but the current server handlers documented above use OpenAI-compatible endpoints. Do not treat the Gemini variable as an active provider without checking the implementation.

## Limitations

- AI endpoints return an unavailable/not-configured response without valid provider credentials.
- Website analysis additionally depends on a reachable scraper service; the repository does not include that service.
- Contact delivery depends on a valid Resend configuration and an explicitly set recipient.
- Rate limiting is process-local and is not a shared production quota.
- The document demo renders PDF pages in the browser and sends images to the configured provider; it is not a durable document-processing pipeline.
- Remote project and insights data can fail independently of the frontend.

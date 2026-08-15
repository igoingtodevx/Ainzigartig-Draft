# Industry Watcher → Ainzigartig Integration Handoff

Prepared 2026-08-15 as part of the Ainzigartig production audit.
The Industry Watcher (`ai-industry-watcher.vercel.app`) gets a dedicated deep
engineering pass next. This document records what the Ainzigartig integration
(`/api/insights`) consumes today, what is broken or brittle, and what the
Watcher should expose to make the integration (and the demo) significantly
more powerful. Compatibility is preserved where possible; nothing here
requires a redesign.

## 1. Current integration (as of 2026-08-15)

- Ainzigartig's `/api/insights` fetches `https://ai-industry-watcher.vercel.app/data/latest.json`
  with an 8s abort, no-store.
- `shapeBrief()` (api/insights.js) trims it to what `/insights` renders:
  headline, subheadline, executive summary, trends (7–9), opportunities (6–8),
  top_articles (up to 15), action_items (5–7), plus `generated_at`, `issue_url`,
  and a pass-through of `raw_articles` (up to 30).
- In-memory cache: 1h fresh TTL, 1d stale window, embedded emergency snapshot
  (last update 2026-06-15) as final fallback. The endpoint always returns
  HTTP 200 (fresh / stale / snapshot) so the page never hard-fails.

## 2. Live upstream contract (observed 2026-08-15)

```jsonc
{
  "generated_at": "2026-08-14T07:13:50.676774+00:00",
  "brief": {
    "headline": "...",
    "subheadline": "...",
    "executive_summary": "<p>HTML-markup paragraph</p>",   // HTML!
    "trends":  [ { "title", "what", "why", "signal" } ],          // 9 items
    "opportunities": [ { "title", "what", "who", "how", "price", "time" } ], // 6 items, field is "time"
    "top_articles": [ { "title", "url", "source", "date", "why", "tags" } ], // 12 items
    "action_items": ["..."]                                        // 5 strings
  },
  "raw_articles": [ { "title", "url", "source", "lang", "published", "summary", "keywords" } ] // 30
}
```

## 3. Known defects in the current integration (fixed in this run where noted)

| # | Defect | Impact | Status |
|---|---|---|---|
| 1 | `shapeBrief` emits `executivo_summary` (typo); frontend reads `executive_summary` | Executive summary never renders on /insights | fixed in this run (emit both keys) |
| 2 | `brief.executive_summary` is HTML (`<p>…</p>`); snapshot copy is plain text | naive render would show literal tags | fixed (strip tags + unescape entities) |
| 3 | `shapeBrief` maps `time_to_market` from `o['time-to-market'] \|\| o.time_to_market`; upstream sends `time` | Opportunity "time to market" column silently empty | fixed (fallback to `o.time`) |
| 4 | `shapeBrief` reads top-level `raw.vertical`, `raw.model`, `raw.tokens_used`, `raw.input_articles`, `raw.input_sources` — upstream sends none of these | vertical/model header on /insights hidden; metadata dead | documented; upstream should send them top-level again (or shapeBrief stops claiming them) |
| 5 | Emergency snapshot frozen at 2026-06-15; no build script refreshes it (comment claims one exists) | if upstream is down >1d and cache is cold, visitors see a 2-month-old brief | snapshot consistency fixed; refresh needs the watcher pass |
| 6 | `raw_articles` (30 × ~0.5KB) passed through but unused by the frontend | ~half the response payload is dead weight | left for compatibility; make optional in watcher pass |
| 7 | `top_articles[].tags` exist upstream but are dropped by shapeBrief | tag chips on /insights could be rendered | carried through in this run (renderer decision left to design) |
| 8 | In-memory cache lost on container restart; `/app` is read-only so no file persistence | cold start re-fetches; worst case snapshot | documented |

## 4. What the Watcher should expose (recommendations for its deep pass)

Contract additions that make the Ainzigartig demo stronger without breaking
today's consumers (add fields; don't rename/remove existing ones):

1. **Schema/versioning & freshness metadata (top level):**
   - `schema_version` (semver) so consumers can gate on shape changes.
   - `next_update_at` or `ttl_seconds` so proxies/caches can be exact instead
     of guessing (Ainzigartig currently hardcodes 1h fresh / 1d stale).
   - `vertical`, `model`, `tokens_used`, `input_articles`, `input_sources` at
     top level (the integration already tries to forward them).
2. **Plain-text executive summary:** add `executive_summary_plain` (or stop
   sending HTML in `executive_summary`) — consumers render it directly.
3. **Stable opportunity field names:** keep `time` but also emit
   `time_to_market` (alias) so older consumers don't silently drop it.
4. **History/index endpoint:** `data/index.json` with the last N issues
   (id, generated_at, headline, issue_url). Enables an archive/pagination UI
   on /insights ("Vorherige Ausgaben") — the biggest demo upgrade available.
5. **Per-issue payload endpoint:** `data/<issue-id>.json` (or `?issue=`), so
   Ainzigartig can deep-link to a specific week.
6. **Light payload option:** `latest.json?include=raw` gating `raw_articles`
   (or a `latest-brief.json` without them) — /insights doesn't render them.
7. **Health/freshness endpoint:** `GET /health` returning `generated_at` and
   pipeline status. Ainzigartig's proxy could then distinguish "down" from
   "stale" with confidence instead of the >1d stale heuristic.
8. **Consistent types:** `action_items` as objects `{text, priority}` (additive
   only — keep the current string array valid), so the UI can sort/group.
9. **CDN/caching headers on latest.json** (e.g. `s-maxage=300,
   stale-while-revalidate=86400`) so the proxy's caching aligns with reality.
10. **CORS:** keep `Access-Control-Allow-Origin: *` on /data/* (client-side
    embeds of the watcher light exist).

## 5. Non-goals for the watcher pass

- Do not remove `executivo_summary`, `time`, or any other current key without
  a deprecation alias — the integration fixes in this run already consume the
  correct spellings where they exist, but old consumers may still exist.
- Do not move the payload behind auth.
- Do not change the brief's semantic shape (trends/opportunities/articles/
  actions) — Ainzigartig's layout depends on 7–9 / 6–8 / ≤15 / 5–7 counts.

"""
Vercel Serverless Function: Website KI-Analyse
Calls VPS scraper → sends content to OpenAI → returns structured analysis
Single-backend: OpenAI gpt-4o-mini with response_format=json_object.
"""

import os
import json
import requests
from http.server import BaseHTTPRequestHandler

SCRAPER_URL = os.environ.get("SCRAPER_URL", "http://138.68.96.190:8501")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")

ANALYSIS_PROMPT = """Du bist ein KI-Berater für den deutschen Mittelstand. Analysiere die folgende Website und erstelle eine strukturierte KI-Potenzial-Analyse.

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
  "missing_basics": [
    "<Was fehlt auf der Seite (z.B. Impressum, Datenschutz, Preise)>"
  ],
  "recommendation": "<Konkrete Empfehlung: Was sollte als Erstes umgesetzt werden?>",
  "tool_suggestion": "<Welches KI-Tool passt am besten: Chatbot, Automatisierung, etc.>"
}}

Wichtig: Sei konkret und praktisch. Keine Buzzwords. Bezogen auf die ECHTE Website."""


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(content_length))
            url = body.get("url", "").strip()

            if not url:
                self._send_json(400, {"error": "URL required"})
                return

            # Step 1: Scrape website via VPS scraper
            try:
                scrape_resp = requests.post(
                    f"{SCRAPER_URL}/scrape",
                    json={"url": url},
                    timeout=20
                )
                if scrape_resp.status_code != 200:
                    error_detail = scrape_resp.json().get("detail", "Scraping failed")
                    self._send_json(502, {"error": f"Scraping failed: {error_detail}"})
                    return
                scrape_data = scrape_resp.json()
            except requests.exceptions.Timeout:
                self._send_json(504, {"error": "Website scraping timed out"})
                return
            except Exception as e:
                self._send_json(502, {"error": f"Scraper unreachable: {str(e)[:100]}"})
                return

            # Step 2: Build prompt
            prompt = ANALYSIS_PROMPT.format(
                markdown=scrape_data["markdown"][:15000],
                url=url,
                title=scrape_data["title"],
                technologies=", ".join(scrape_data["technologies"]) or "Keine erkannt",
                has_contact="Ja" if scrape_data["has_contact_form"] else "Nein",
                has_pricing="Ja" if scrape_data["has_pricing_page"] else "Nein",
                has_imprint="Ja" if scrape_data["has_imprint"] else "Nein",
                has_privacy="Ja" if scrape_data["has_privacy_policy"] else "Nein",
                word_count=scrape_data["word_count"],
            )

            # Step 3: Call OpenAI
            if not OPENAI_API_KEY:
                self._send_json(500, {"error": "Server-Konfigurationsfehler."})
                return

            try:
                llm_resp = requests.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {OPENAI_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": "gpt-4o-mini",
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.3,
                        "max_tokens": 2000,
                        "response_format": {"type": "json_object"},
                    },
                    timeout=30,
                )
                if llm_resp.status_code != 200:
                    err = llm_resp.text[:200]
                    print(f"OpenAI analyze error: {llm_resp.status} {err}")
                    self._send_json(502, {"error": "LLM analysis failed"})
                    return
                llm_response = llm_resp.json()["choices"][0]["message"]["content"]
            except requests.exceptions.Timeout:
                self._send_json(504, {"error": "LLM analysis timed out"})
                return
            except Exception as e:
                print(f"OpenAI analyze exception: {e}")
                self._send_json(502, {"error": "LLM analysis failed"})
                return

            # Step 4: Parse JSON — response_format=json_object guarantees validity,
            # but we keep a defensive fallback for malformed edge cases.
            try:
                analysis = json.loads(llm_response)
            except json.JSONDecodeError:
                # Last-ditch: try to extract JSON from a code fence
                json_str = llm_response
                if "```json" in json_str:
                    json_str = json_str.split("```json", 2)[1].split("```", 1)[0]
                elif "```" in json_str:
                    json_str = json_str.split("```", 2)[1].split("```", 1)[0]
                try:
                    analysis = json.loads(json_str.strip())
                except json.JSONDecodeError:
                    analysis = {
                        "score": 50,
                        "score_label": "Mittel",
                        "summary": llm_response[:500],
                        "opportunities": [],
                        "missing_basics": [],
                        "recommendation": llm_response[:500],
                        "tool_suggestion": "KI-Beratung",
                    }

            result = {
                "url": url,
                "scrape": {
                    "title": scrape_data["title"],
                    "technologies": scrape_data["technologies"],
                    "word_count": scrape_data["word_count"],
                    "response_time_ms": scrape_data["response_time_ms"],
                },
                "analysis": analysis,
            }

            self._send_json(200, result)

        except Exception as e:
            self._send_json(500, {"error": f"Internal error: {str(e)[:200]}"})

    def do_OPTIONS(self):
        self._send_json(200, {}, extra_headers={
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        })

    def do_GET(self):
        if self.path == "/health":
            self._send_json(200, {
                "status": "ok",
                "service": "analyze",
                "backend": "openai-only",
                "has_openai": bool(OPENAI_API_KEY),
            })
        else:
            self._send_json(404, {"error": "Not found"})

    def _send_json(self, status, data, extra_headers=None):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        if extra_headers:
            for k, v in extra_headers.items():
                self.send_header(k, v)
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

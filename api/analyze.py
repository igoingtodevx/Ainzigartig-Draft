"""
Vercel Serverless Function: Website KI-Analyse
Calls VPS scraper → sends to LLM → returns structured analysis
"""

import os
import json
import requests
from http.server import BaseHTTPRequestHandler

SCRAPER_URL = os.environ.get("SCRAPER_URL", "http://138.68.96.190:8501")
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
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

Wichtig: Sei konkret und praktisch. Keine Buzzwords. Bezogene auf die ECHTE Website."""


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read request body
            content_length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(content_length))
            url = body.get("url", "").strip()

            if not url:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "URL required"}).encode())
                return

            # Step 1: Scrape website via VPS
            try:
                scrape_resp = requests.post(
                    f"{SCRAPER_URL}/scrape",
                    json={"url": url},
                    timeout=20
                )
                if scrape_resp.status_code != 200:
                    error_detail = scrape_resp.json().get("detail", "Scraping failed")
                    self.send_response(502)
                    self.send_header("Content-Type", "application/json")
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": f"Scraping failed: {error_detail}"}).encode())
                    return
                scrape_data = scrape_resp.json()
            except requests.exceptions.Timeout:
                self.send_response(504)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Website scraping timed out"}).encode())
                return
            except Exception as e:
                self.send_response(502)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Scraper unreachable: {str(e)[:100]}"}).encode())
                return

            # Step 2: Build prompt
            prompt = ANALYSIS_PROMPT.format(
                markdown=scrape_data["markdown"][:15000],  # Limit for context
                url=url,
                title=scrape_data["title"],
                technologies=", ".join(scrape_data["technologies"]) or "Keine erkannt",
                has_contact="Ja" if scrape_data["has_contact_form"] else "Nein",
                has_pricing="Ja" if scrape_data["has_pricing_page"] else "Nein",
                has_imprint="Ja" if scrape_data["has_imprint"] else "Nein",
                has_privacy="Ja" if scrape_data["has_privacy_policy"] else "Nein",
                word_count=scrape_data["word_count"],
            )

            # Step 3: Call LLM (NVIDIA NIM first, then OpenRouter, then OpenAI)
            llm_response = None

            if NVIDIA_API_KEY:
                try:
                    llm_resp = requests.post(
                        "https://integrate.api.nvidia.com/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {NVIDIA_API_KEY}",
                            "Content-Type": "application/json",
                        },
                        json={
                            "model": "meta/llama-3.1-8b-instruct",
                            "messages": [{"role": "user", "content": prompt}],
                            "temperature": 0.3,
                            "max_tokens": 2000,
                        },
                        timeout=30,
                    )
                    if llm_resp.status_code == 200:
                        llm_response = llm_resp.json()["choices"][0]["message"]["content"]
                except Exception:
                    pass

            if not llm_response and OPENROUTER_API_KEY:
                try:
                    llm_resp = requests.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                            "Content-Type": "application/json",
                        },
                        json={
                            "model": "google/gemini-2.5-flash",
                            "messages": [{"role": "user", "content": prompt}],
                            "temperature": 0.3,
                            "max_tokens": 2000,
                        },
                        timeout=30,
                    )
                    if llm_resp.status_code == 200:
                        llm_response = llm_resp.json()["choices"][0]["message"]["content"]
                except Exception:
                    pass

            if not llm_response and OPENAI_API_KEY:
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
                        },
                        timeout=30,
                    )
                    if llm_resp.status_code == 200:
                        llm_response = llm_resp.json()["choices"][0]["message"]["content"]
                except Exception:
                    pass

            if not llm_response:
                self.send_response(502)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "LLM analysis failed"}).encode())
                return

            # Step 4: Parse LLM response as JSON
            try:
                # Extract JSON from response (might be wrapped in markdown code block)
                json_str = llm_response
                if "```json" in json_str:
                    json_str = json_str.split("```json")[1].split("```")[0]
                elif "```" in json_str:
                    json_str = json_str.split("```")[1].split("```")[0]
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

            # Add scrape metadata
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

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"error": f"Internal error: {str(e)[:200]}"}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
        else:
            self.send_response(404)
            self.end_headers()

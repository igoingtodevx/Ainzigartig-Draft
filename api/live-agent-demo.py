"""
Vercel Serverless Function: Live Agent Demo
Analyzes a German business document (PDF, image, or text) using multimodal LLM.
Returns structured: document_type, key_fields, suggested_actions, risk_flags, summary.
"""

import os
import json
import base64
import re
import requests
from http.server import BaseHTTPRequestHandler

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")

SYSTEM_PROMPT = """Du bist der "Ainzigartig Dokument-Agent" — ein intelligenter KI-Assistent fuer den deutschen Mittelstand.
Deine Aufgabe: Eingehende Dokumente (Rechnungen, E-Mails, Angebote, Vertraege, Bestellungen, Mahnungen) lesen, verstehen, strukturieren und die naechsten Schritte vorschlagen.

WICHTIG:
- Antworte immer auf Deutsch.
- Antworte NUR mit validem JSON, kein Markdown-Wrapper, keine Erklaerungen drumherum.
- Sei konkret: echte Daten aus dem Dokument, keine generischen Platzhalter.
- Wenn ein Feld nicht erkennbar ist: weglassen, nicht raten.
- Vorgeschlagene Aktionen sollen PRAKTISCH und UMSETZBAR sein (was passiert Montag morgen damit?)."""

USER_PROMPT_TEMPLATE = """Analysiere das folgende Dokument und strukturiere es.

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
}}"""


def call_openai_text(prompt: str):
    if not OPENAI_API_KEY:
        return None
    try:
        resp = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0.2,
                "max_tokens": 2000,
                "response_format": {"type": "json_object"},
            },
            timeout=45,
        )
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
    except Exception:
        return None
    return None


def call_nvidia_text(prompt: str):
    if not NVIDIA_API_KEY:
        return None
    try:
        resp = requests.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {NVIDIA_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "meta/llama-3.1-70b-instruct",
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0.2,
                "max_tokens": 2000,
                "response_format": {"type": "json_object"},
            },
            timeout=45,
        )
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
    except Exception:
        return None
    return None


def call_openrouter_multimodal(file_b64: str, mime_type: str, prompt: str):
    """Use Gemini 2.0 Flash via OpenRouter for PDF/image analysis."""
    if not OPENROUTER_API_KEY:
        return None
    try:
        data_url = f"data:{mime_type};base64,{file_b64}"
        resp = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://ainzigartig.de",
                "X-Title": "Ainzigartig Live Agent Demo",
            },
            json={
                "model": "google/gemini-2.0-flash-001",
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {"type": "image_url", "image_url": {"url": data_url}},
                        ],
                    },
                ],
                "temperature": 0.2,
                "max_tokens": 2000,
            },
            timeout=45,
        )
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
    except Exception:
        return None
    return None


def call_openrouter_text(prompt: str):
    if not OPENROUTER_API_KEY:
        return None
    try:
        resp = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://ainzigartig.de",
                "X-Title": "Ainzigartig Live Agent Demo",
            },
            json={
                "model": "google/gemini-2.0-flash-001",
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0.2,
                "max_tokens": 2000,
            },
            timeout=45,
        )
        if resp.status_code == 200:
            return resp.json()["choices"][0]["message"]["content"]
    except Exception:
        return None
    return None


def parse_llm_json(raw):
    """Parse LLM output, handling markdown wrappers and minor noise."""
    if not raw:
        return {}
    text = raw.strip()
    if "```json" in text:
        text = text.split("```json", 1)[1].split("```", 1)[0]
    elif "```" in text:
        text = text.split("```", 1)[1].split("```", 1)[0]
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass

    return {}


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > 5_500_000:
                self._send_error(413, "Datei zu gross (max 4 MB).")
                return
            body = json.loads(self.rfile.read(content_length))
            mode = body.get("mode", "")

            if mode == "sample":
                text = (body.get("text") or "").strip()
                if not text:
                    self._send_error(400, "Text fehlt.")
                    return
                user_prompt = USER_PROMPT_TEMPLATE.format(document_content=text[:12000])
                llm_raw = call_nvidia_text(user_prompt) or call_openai_text(user_prompt)
                if not llm_raw:
                    self._send_error(502, "LLM-Analyse fehlgeschlagen.")
                    return
                analysis = parse_llm_json(llm_raw)

            elif mode == "upload":
                file_b64 = body.get("file_base64", "")
                mime_type = body.get("mime_type", "")
                if not file_b64 or not mime_type:
                    self._send_error(400, "Datei oder MIME-Type fehlt.")
                    return
                if mime_type not in ("application/pdf", "image/png", "image/jpeg", "image/webp"):
                    self._send_error(415, f"Nicht unterstuetzter Dateityp: {mime_type}")
                    return
                try:
                    decoded_size = len(base64.b64decode(file_b64))
                except Exception:
                    self._send_error(400, "Base64 ungueltig.")
                    return
                if decoded_size > 4_500_000:
                    self._send_error(413, "Datei zu gross nach Dekodierung (max 4 MB).")
                    return
                user_prompt = USER_PROMPT_TEMPLATE.format(
                    document_content="[Datei-Anhang — siehe Bild/PDF]"
                )
                llm_raw = call_openrouter_multimodal(file_b64, mime_type, user_prompt)
                if not llm_raw:
                    llm_raw = call_openai_text(user_prompt)
                if not llm_raw:
                    self._send_error(502, "LLM-Analyse fehlgeschlagen (Multimodal).")
                    return
                analysis = parse_llm_json(llm_raw)
            else:
                self._send_error(400, "Unbekannter Modus.")
                return

            if not analysis:
                analysis = {
                    "document_type": "Unbekannt",
                    "document_type_icon": "help",
                    "confidence": "Niedrig",
                    "key_fields": {},
                    "suggested_actions": [],
                    "risk_flags": [
                        {
                            "level": "Info",
                            "message": "Antwort konnte nicht als JSON geparst werden.",
                        }
                    ],
                    "summary": "",
                    "agent_reasoning": "",
                }

            self._send_json(200, analysis)

        except Exception as e:
            self._send_error(500, f"Interner Fehler: {str(e)[:200]}")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/health":
            self._send_json(200, {
                "status": "ok",
                "service": "live-agent-demo",
                "has_openai": bool(OPENAI_API_KEY),
                "has_openrouter": bool(OPENROUTER_API_KEY),
                "has_nvidia": bool(NVIDIA_API_KEY),
            })
        else:
            self._send_error(404, "Not found")

    def _send_json(self, status, data):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _send_error(self, status, message):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"error": message}).encode())

    def log_message(self, format, *args):
        return

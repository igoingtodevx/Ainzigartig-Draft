# Ainzigartig

Arbeitsstand für eine KI-Agentur-Website. Die Seite positioniert Ainzigartig entlang eines durchgängigen Weges:

1. **AI Strategy & Opportunity Design** – Prozess, Nutzen, Daten, Risiken und Priorisierung verstehen.
2. **AI Systems & Automation** – überprüfbare Systeme mit Integration, menschlicher Übergabe und Betrieb bauen.
3. **Decision Intelligence & Optimisation** – Wirkung messen und Entscheidungen verbessern.

Der Default ist bewusst **Preview**. Ohne vollständige Betreiberangaben wird kein öffentliches Angebot behauptet und die Seite setzt `noindex`.

## Lokale Entwicklung

```bash
npm install
npm run dev
npm run build
```

`npm run build` erzeugt die statische Anwendung in `dist/`. Für Vercel-Funktionen lokal eignet sich die Vercel-CLI oder ein Preview-Deploy.

## Wichtige Produktentscheidungen

- **Edi** ist ein serverseitig angebundener Gesprächsassistent. Er ersetzt keine verbindliche Fach-, Rechts- oder Datenschutzberatung.
- **Live-Agent-Demo** analysiert bei aktivierter Funktion hochgeladene PDF- oder Bilddokumente ohne persistenten Dateispeicher; die Auswertung führt nie automatisch eine Aktion aus.
- **Website Opportunity Audit** bietet eine Musteranalyse und kann nach expliziter Freischaltung öffentliche HTML-Seiten direkt, mit URL-, Redirect-, Größen- und Timeout-Schutz prüfen.
- **Industry Watcher** zeigt nur einen aktuellen, serverseitig bezogenen Brief. Bei Ausfall wird kein alter oder erfundener Inhalt ersetzt.

Die vollständige Entscheidungsmatrix steht in [SHOWCASE_AUDIT.md](SHOWCASE_AUDIT.md). Fehlende Betreiber- und Betriebsentscheidungen stehen in [OWNER_INPUT_REQUIRED.md](OWNER_INPUT_REQUIRED.md).

## Konfiguration

Kopiere `.env.example` in eine lokale, nicht eingecheckte Umgebungsdatei oder setze die Werte im Hosting. `VITE_`-Variablen werden in den Browser eingebaut; Schlüssel und Mail-Adressen ohne `VITE_` bleiben serverseitig.

| Variable | Zweck |
| --- | --- |
| `VITE_SITE_MODE` | `preview` (Standard) oder `production`; Produktion erst nach vollständigen Rechtstexten setzen. |
| `VITE_LEGAL_*` | reale Betreiber- und Kontaktangaben für Impressum/Datenschutz. |
| `OPENAI_API_KEY` | serverseitig für Edi, Live-Agent und optionalen Opportunity Audit. |
| `OPENAI_CHAT_MODEL`, `OPENAI_AUDIT_MODEL` | serverseitige Modellwahl. |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL` | Kontaktformular. `CONTACT_FROM_EMAIL` ist optional; bis zur Domain-Verifizierung wird Resends Onboarding-Absender genutzt. |
| `VITE_DOCUMENT_UPLOADS_ENABLED`, `DOCUMENT_UPLOADS_ENABLED` | schaltet die Analyse eigener Dokumente ein; die UI weist auf die Übertragung an OpenAI hin. |
| `VITE_EXTERNAL_AUDIT_ENABLED`, `EXTERNAL_AUDIT_ENABLED` | schaltet die Prüfung öffentlicher HTML-Websites ein. Beide Variablen müssen gesetzt sein. |
| `INDUSTRY_WATCHER_URL` | Quelle des aktuellen Industry-Watcher-Briefs. |

## Veröffentlichungsgate

Vor einem öffentlichen Deploy müssen mindestens diese Punkte erledigt sein:

1. Betreiber, ladungsfähige Anschrift und Kontaktangaben verbindlich eintragen.
2. Rechtsform/Impressum, Datenschutz, Auftragsverarbeitungen und Modellanbieter prüfen lassen.
3. Kontaktzustellung mit einer echten Domain-Absenderadresse testen.
4. Für Uploads oder externe Website-Audits den Datenfluss, Zugriffsschutz, Löschung, Rate Limits und Monitoring praktisch testen.
5. `VITE_SITE_MODE=production` erst danach setzen und einen Preview-Deploy prüfen.

## Verifikation

```bash
npm run build
node --check api/analyze.js
node --check api/insights.js
git diff --check
```

## Architektur

- React 19, TypeScript, Vite, Tailwind, React Router
- Vercel für statische Site und serverseitige Endpunkte
- OpenAI nur serverseitig, Resend nur für Zustellung
- separater FastAPI-Scraper ausschließlich für explizit freigegebene öffentliche Website-Audits

## Lizenz

Privat. © Ainzigartig.

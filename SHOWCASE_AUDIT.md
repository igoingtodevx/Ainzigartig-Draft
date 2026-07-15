# Showcase-Entscheidungen

Stand: Arbeitsfassung vor einer öffentlichen Veröffentlichung.

Die Website soll keine Sammlung halb fertiger KI-Demos sein. Jede sichtbare Funktion muss entweder einen echten, klar begrenzten Nutzen zeigen oder als Beispiel gekennzeichnet sein. Öffentliche Seiten dürfen keine Wirkungs-, Rechts-, Zeit- oder Datenschutzversprechen enthalten, die noch nicht betrieblich belegt sind.

## Produkte und Entscheidung

| Bereich | Entscheidung | Öffentlicher Anspruch | Voraussetzung für Live-Betrieb |
| --- | --- | --- | --- |
| Edi | Behalten, weiter schärfen | Gespräch über Bedarf und mögliche Vorgehensweise, keine verbindliche Beratung | Datenschutz, Modell-/Speicherentscheidung, Kontaktübergabe |
| Live-Agent-Demo | Behalten, als Sandbox | Erkennung, Entwurf und menschliche Freigabe; keine Aktion wird automatisch ausgeführt | Private Speicherung, Malware-Prüfung, Aufbewahrung/Löschung, Freigabeprozess |
| Website Opportunity Audit | Behalten, zunächst als Musteranalyse | Öffentliche Hinweise → Hypothese → Annahme → nächster Prüfschritt | separat gehärteter Scraper, Rate Limits, Datenfluss/DPA, Monitoring, explizite Freischaltung |
| ROI-Rechner | Umbauen oder mit Audit zusammenführen | Szenarien statt Prognosen; Annahmen sichtbar | nachvollziehbare Eingaben, keine erfundenen Benchmarks |
| KI-Audit | Mit Opportunity Audit konsolidieren | gemeinsamer Prozess- und Systemcheck, nicht automatisierte Diagnose | Angebots- und Durchführungsprozess |
| Industry Watcher | Behalten | quellenbasierter Branchenüberblick mit Datum und Links | tägliche Pipeline, Quellenprüfung, Impressum/Datenschutz |
| Arbeitsproben | Behalten | anonymisierte Umsetzungsfelder, keine Kunden- oder Erfolgsbehauptungen ohne Freigabe | geprüfte Formulierungen und ggf. Referenzfreigabe |

## Qualitätsvertrag für neue Showcase-Funktionen

1. Das Ergebnis trennt beobachtbare Evidenz von Hypothese und Annahme.
2. KI darf Vorschläge machen, aber keine kritischen Systemänderungen auslösen.
3. Der Datenfluss ist vor Aktivierung beschrieben; sensible Inhalte haben keine unklare Upload- oder Speicherroute.
4. Ein Beispiel bleibt erkennbar ein Beispiel. Eine Live-Funktion hat Limits, Fehlermeldungen und einen klaren Fallback.
5. Jede Funktion führt zu einem sinnvollen nächsten Schritt – nicht zu einem künstlichen Verkaufsversprechen.

## Nächste Konsolidierung

- Den ROI-Rechner in einen annahmenbasierten Opportunity-Check überführen.
- Die eigenständige KI-Audit-Seite auf den gemeinsamen, menschlich moderierten Audit-Prozess ausrichten.
- Erst nach den oben genannten Betriebsbedingungen `VITE_EXTERNAL_AUDIT_ENABLED` und `EXTERNAL_AUDIT_ENABLED` setzen.

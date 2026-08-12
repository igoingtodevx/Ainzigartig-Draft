export const LIVE_DEMOS = [
  {
    id: 'ki-website-analyse',
    title: 'KI-Website-Analyse',
    label: 'Live-Demo',
    route: '/ki-analyse',
    meta: 'Öffentliche Inhalte · strukturierte Auswertung',
    description: 'Liest öffentlich erreichbare Website-Inhalte aus und ordnet beobachtbare Signale, mögliche Ansatzpunkte und Grenzen der Analyse strukturiert ein.',
    limitation: 'Kein technisches, rechtliches oder wirtschaftliches Voll-Audit.',
  },
  {
    id: 'dokument-agent',
    title: 'Dokument-Agent / Live Agent',
    label: 'Live-Demo',
    route: '/live-demo',
    meta: 'Text · PDF/Bild · Prüfvorschläge',
    description: 'Extrahiert Felder aus Beispieltexten oder hochgeladenen Dokumentseiten und erzeugt Zusammenfassung, Prüfpunkte und vorgeschlagene nächste Schritte.',
    limitation: 'Führt keine Aktionen aus; Ergebnisse müssen fachlich geprüft werden.',
  },
  {
    id: 'ki-reifegrad-check',
    title: 'KI-Reifegrad-Check',
    label: 'Interaktiver Check',
    route: '/ki-audit',
    meta: '6 Fragen · Selbsteinschätzung',
    description: 'Strukturiert die eigene Ausgangslage entlang von Ziel, Prozess, Daten, Technik, Governance und Einführung.',
    limitation: 'Kein Benchmark, Audit oder Nachweis rechtlicher Konformität.',
  },
];

export const BUILT_SYSTEMS = [
  {
    id: 'autowunsch',
    title: 'AutoWunsch',
    label: 'Gebautes System',
    status: 'Funktionaler Produktprototyp',
    description: 'Anwendung für eine strukturierte Fahrzeuganfrage mit Kriterienformular, Checkout-Ablauf, separater KI-Fahrzeuganalyse-Vorschau und Preisverlaufsansicht.',
    features: ['Fahrzeugkriterien und Zusatzwünsche erfassen', 'Checkout- und Auftragsablauf technisch abbilden', 'Analyse-Vorschau und Preisverlaufsdaten bereitstellen'],
    boundary: 'Nicht als automatische Marktplatz-Suche oder eigenständiges Matching passender Inserate beschrieben.',
  },
  {
    id: 'zeitstempel',
    title: 'Zeitstempel',
    label: 'Gebautes System',
    status: 'Browser-/PWA-Prototyp',
    description: 'Local-first Arbeitszeiterfassung für Baustellen, Stempelvorgänge und Pausen mit Offline-Speicherung und optionaler Synchronisierung.',
    features: ['Arbeitszeiten, Baustellen und Pausen lokal erfassen', 'Offline-Outbox und Konfliktkopien für die Synchronisierung', 'Wochen-/Monatssummen sowie CSV- und PDF-Export'],
    boundary: 'Eine native iOS-App ist nicht Bestandteil des belegten Umfangs; Cloud-Sync benötigt ein konfiguriertes Backend.',
  },
  {
    id: 'wissensassistent',
    title: 'Unternehmens-Wissensassistent',
    label: 'Gebautes System',
    status: 'Integrationsabhängiger Prototyp',
    description: 'Generischer Assistent, der bereitgestellte Wissensdokumente semantisch durchsucht und passende Treffer als Kontext für Chat-Antworten verwendet.',
    features: ['Wissensdokumente für semantische Suche aufbereiten', 'Treffer als begrenzten Antwortkontext verwenden', 'Chat-Verlauf und Zugriffsfluss technisch abbilden'],
    boundary: 'Keine Zuordnung zu einem ungenannten Kunden und keine behauptete öffentliche Live-Demo; Betrieb hängt von den konfigurierten Daten- und Modelldiensten ab.',
  },
];

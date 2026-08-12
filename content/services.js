/**
 * The four public service pillars. Keep homepage, pricing and contact copy on
 * this shared source; the server-side chat context mirrors the same wording.
 */
export const SERVICE_PILLARS = [
  {
    id: 'automatisierung-integrationen',
    title: 'Automatisierung & Integrationen',
    eyebrow: 'Abläufe verbinden',
    description: 'Wir verbinden klar definierte Arbeitsschritte mit vorhandenen Systemen — inklusive Freigaben, Fehlerpfaden und nachvollziehbarer Übergabe.',
    to: '/ki-beratung',
    icon: 'account_tree',
    scope: ['Prozessaufnahme und Schnittstellenprüfung', 'Dokumenten- und Backoffice-Workflows', 'Freigaben, Monitoring und Übergabe'],
  },
  {
    id: 'dashboards-business-tools',
    title: 'Dashboards & interne Business-Tools',
    eyebrow: 'Daten arbeitsfähig machen',
    description: 'Wir bündeln freigegebene Datenquellen in internen Werkzeugen. Aktualität, Rollen und Kennzahlen richten sich nach den tatsächlich verfügbaren Anbindungen.',
    to: '/analytics-dashboard',
    icon: 'dashboard',
    scope: ['KPI- und Datenquellenklärung', 'Interne Oberflächen und Auswertungen', 'Rollen, Aktualisierung und Datenqualität'],
  },
  {
    id: 'ki-assistenten-wissenssysteme',
    title: 'KI-Assistenten & Wissenssysteme',
    eyebrow: 'Freigegebenes Wissen nutzen',
    description: 'Wir bauen Assistenten auf Basis definierter Inhalte und Prozesse. Antwortqualität, Quellenbezug und Eskalation werden vor einer produktiven Nutzung getestet.',
    to: '/ki-kundenservice',
    icon: 'forum',
    scope: ['Wissensbasis und Suchlogik', 'Chat- und Dokument-Assistenten', 'Qualitätstests und menschliche Eskalation'],
  },
  {
    id: 'individuelle-ki-softwareloesungen',
    title: 'Individuelle KI- & Softwarelösungen',
    eyebrow: 'Wenn Standardsoftware nicht passt',
    description: 'Wir entwickeln klar abgegrenzte Anwendungen für konkrete Anforderungen — vom prüfbaren Prototyp bis zur integrierten Lösung, wenn Scope und Datenlage tragen.',
    to: '/individuelle-ki-softwareloesungen',
    icon: 'deployed_code',
    scope: ['Use-Case- und Machbarkeitsprüfung', 'Prototypen und individuelle Anwendungen', 'Integration, Dokumentation und Betriebskonzept'],
  },
];

export const CONTACT_REASONS = [
  ...SERVICE_PILLARS.map((service) => service.title),
  'Noch unklar / Erstgespräch',
];

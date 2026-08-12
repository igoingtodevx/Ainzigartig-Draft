import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

export const KIRecruiting: React.FC = () => (
  <ServiceDetailPage
    serviceId="automatisierung-integrationen"
    headline="Recruiting-Vorarbeit strukturiert unterstützen."
    intro="Recruiting ist ein möglicher Automatisierungsfall — etwa für strukturierte Erfassung, vergleichbare Kriterien und definierte Übergaben. Auswahl- und Einstellungsentscheidungen bleiben bei verantwortlichen Menschen."
    deliverables={[
      { title: 'Eingänge strukturieren', text: 'Bewerbungsunterlagen und Formulardaten können in ein einheitliches, fachlich zu prüfendes Format überführt werden.' },
      { title: 'Kriterien nachvollziehbar anwenden', text: 'Vorab definierte Anforderungen können bei der Sichtung unterstützen, ohne eine autonome Eignungs- oder Einstellungsentscheidung zu behaupten.' },
      { title: 'Übergaben verbinden', text: 'Statusschritte, Freigaben und bestehende HR-Systeme werden nur im Rahmen tatsächlich verfügbarer Schnittstellen angebunden.' },
    ]}
    checks={[
      'Zweck, Rechtsgrundlage und zulässige Bewerberdaten',
      'Beteiligung von Datenschutz, HR und gegebenenfalls Betriebsrat',
      'Prüfung auf Fehlbewertungen und diskriminierende Effekte',
      'Menschliche Entscheidung, Löschkonzept und Zugriffsrollen',
    ]}
    boundary="Es gibt keine pauschale Zusage zu EU-Hosting, automatischer Löschung, Fairness, Auditfähigkeit oder Besetzungsdauer. Diese Punkte müssen für Anbieter, Datenfluss und Organisation konkret festgelegt werden."
    relatedTo="/live-demo"
    relatedLabel="Dokumentverarbeitung testen"
  />
);

export default KIRecruiting;

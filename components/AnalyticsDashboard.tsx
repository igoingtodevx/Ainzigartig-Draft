import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

export const AnalyticsDashboard: React.FC = () => (
  <ServiceDetailPage
    serviceId="dashboards-business-tools"
    headline="Daten in ein brauchbares Arbeitswerkzeug übersetzen."
    intro="Ein Dashboard ist nur so belastbar wie seine Quellen und Definitionen. Wir klären zuerst, welche Entscheidungen unterstützt werden sollen, welche Daten erreichbar sind und wie Aktualität und Verantwortlichkeiten sichtbar bleiben."
    deliverables={[
      { title: 'Datenquellen und Definitionen', text: 'Exporte, APIs und Kennzahlen werden geprüft; widersprüchliche Definitionen werden nicht durch eine hübsche Oberfläche verdeckt.' },
      { title: 'Interne Oberfläche', text: 'Ansichten, Filter und Hinweise werden für die tatsächlichen Nutzer und Entscheidungen gestaltet — vom kompakten Tool bis zum Dashboard.' },
      { title: 'Aktualisierung und Betrieb', text: 'Importfrequenz, Rollen, Fehleranzeigen und Datenqualitätsprüfungen werden passend zu den vorhandenen Systemen festgelegt.' },
    ]}
    checks={[
      'Verantwortete Kennzahlen und eindeutige Definitionen',
      'Erreichbare Quellen, Exporte oder dokumentierte APIs',
      'Zugriffsrollen für sensible Geschäfts- und Personaldaten',
      'Erwartete Aktualität, Qualitätskontrollen und Fehlerzustände',
    ]}
    boundary="Echtzeit, automatische Verteilung, Audit-Logs, Prognosen oder konkrete Performance-Effekte gehören nur dann zum Umfang, wenn Quellen, Anbieter und Implementierung sie tatsächlich tragen."
    relatedTo="/roi-rechner"
    relatedLabel="Business Case modellieren"
  />
);

export default AnalyticsDashboard;

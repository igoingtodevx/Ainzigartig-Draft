import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

export const KIBeratung: React.FC = () => (
  <ServiceDetailPage
    serviceId="automatisierung-integrationen"
    headline="Klare Abläufe verbinden — mit kontrollierten Übergaben."
    intro="Wir prüfen einen konkreten Arbeitsablauf, seine Ausnahmen und die vorhandenen Systeme. Erst wenn Daten, Freigaben und Schnittstellen geklärt sind, automatisieren wir die passenden Schritte."
    deliverables={[
      { title: 'Prozess und Ausnahmen', text: 'Auslöser, Eingaben, Verantwortliche, Freigaben und Fehlerfälle werden gemeinsam beschrieben, bevor Technik ausgewählt wird.' },
      { title: 'Dokumenten- und Backoffice-Flow', text: 'Wiederkehrende Erfassung, Prüfung und Übergabe werden in einem begrenzten Ablauf mit realistischen Fällen erprobt.' },
      { title: 'Schnittstellen und Betrieb', text: 'Verfügbare APIs oder Exporte werden angebunden; Monitoring, Wiederanlauf und manuelle Rückfallwege bleiben sichtbar.' },
    ]}
    checks={[
      'Ein stabiler, wiederkehrender Ablauf mit verantwortlicher Fachperson',
      'Zulässige Daten, Ausnahmen und fachliche Prüfschritte',
      'Verfügbare Exporte, APIs und Systemzuständigkeiten',
      'Fehlerpfade, manuelle Rückfalloption und messbare Abnahmekriterien',
    ]}
    boundary="Automatisierung bedeutet nicht, dass jeder Sonderfall autonom entschieden wird. Umfang, Zuverlässigkeit und Betrieb hängen von den realen Schnittstellen, Daten und Freigaben ab."
    relatedTo="/live-demo"
    relatedLabel="Dokumentverarbeitung testen"
  />
);

export default KIBeratung;

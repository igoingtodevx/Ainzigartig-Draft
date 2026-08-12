import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

export const IndividualSolutions: React.FC = () => (
  <ServiceDetailPage
    serviceId="individuelle-ki-softwareloesungen"
    headline="Individuelle Lösungen statt einer weiteren Tool-Sammlung."
    intro="Wenn ein konkreter Ablauf mit Standardsoftware nicht sauber lösbar ist, prüfen wir Nutzen, Datenlage und technische Machbarkeit. Erst danach wird aus der Idee ein begrenzter Prototyp oder eine integrierte Anwendung."
    deliverables={[
      { title: 'Anforderung und Systemgrenzen', text: 'Nutzer, Auslöser, Daten, Schnittstellen, Ausnahmen und gewünschte Entscheidung werden gemeinsam beschrieben.' },
      { title: 'Prüfbarer Prototyp', text: 'Ein kleiner Funktionsumfang wird mit realistischen Fällen getestet. Ergebnisse bleiben Hypothesen, bis Messung und fachliche Abnahme sie tragen.' },
      { title: 'Integration und Übergabe', text: 'Wenn der Test überzeugt, folgen Rollen, Fehlerbehandlung, Dokumentation und ein passendes Betriebsmodell.' },
    ]}
    checks={[
      'Ein konkretes Problem und eine verantwortliche Fachperson',
      'Zulässige Daten und realistische Testfälle',
      'Verfügbare Exporte, APIs und technische Zuständigkeiten',
      'Messkriterien, Fehlerfälle und Abbruchkriterien',
    ]}
    boundary="Ein Prototyp ist noch kein belastbarer Produktionsbetrieb. Zeitplan, Preis, Anbieterwahl, Hosting und mögliche Ergebnisse werden erst nach Scope- und Datenprüfung festgelegt."
    relatedTo="/projekte"
    relatedLabel="Gebautes ansehen"
  />
);

export default IndividualSolutions;

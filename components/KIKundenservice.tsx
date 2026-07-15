import React from 'react';
import { CapabilityPage } from './CapabilityPage';

export const KIKundenservice: React.FC = () => (
  <CapabilityPage
    metaTitle="KI-Agenten für Kundenservice | Ainzigartig"
    metaDescription="KI-Agenten, Wissenssysteme und kontrollierte Übergaben für Service, Beratung und Anfragen."
    eyebrow="Customer Interaction & Service Automation"
    title="Service-Agenten, die Wissen nutzen und Grenzen kennen."
    intro="Wir entwickeln Chat- und Service-Systeme, die Fragen auf Basis freigegebener Inhalte beantworten, Vorgänge strukturieren und komplexe Fälle mit Kontext an Menschen übergeben."
    outputs={['Website- oder Portal-Assistent', 'Freigegebene Wissensbasis', 'Anfrage- und Triage-Workflow', 'CRM- oder Ticketsystem-Anbindung', 'Qualitäts- und Review-Konzept']}
    situations={[
      { title: 'Wiederkehrende Produktfragen', text: 'Informationen liegen verteilt, Besucher müssen lange suchen und Service-Teams beantworten dieselben Fragen mehrfach.' },
      { title: 'Unstrukturierte Anfragen', text: 'E-Mails und Formulare enthalten nicht die Informationen, die für eine schnelle Bearbeitung notwendig sind.' },
      { title: 'Komplexe Produktauswahl', text: 'Kunden benötigen eine geführte Beratung, bevor ein Produkt, Tarif oder Ansprechpartner sinnvoll ausgewählt werden kann.' },
      { title: 'Wachsender Serviceaufwand', text: 'Anfragevolumen steigt, aber zusätzliche Kapazität soll gezielt für komplexe Fälle eingesetzt werden.' },
    ]}
    systems={[
      { title: 'Verstehen', text: 'Absicht, Produktbezug, Dringlichkeit und fehlende Angaben aus der Anfrage ableiten.' },
      { title: 'Antworten', text: 'Nur freigegebenes Wissen nutzen und Quellen oder Unsicherheit sichtbar machen.' },
      { title: 'Strukturieren', text: 'Pflichtinformationen erfassen und den Vorgang für CRM, Ticketing oder Fachsystem vorbereiten.' },
      { title: 'Übergeben', text: 'Sensible, unklare oder wertvolle Fälle mit Gesprächskontext an eine zuständige Person geben.' },
    ]}
    principle="Automatisieren, was eindeutig ist. Menschen stärken, wo Urteil zählt."
  />
);

export default KIKundenservice;

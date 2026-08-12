import React from 'react';
import { ServiceDetailPage } from './ServiceDetailPage';

export const KIKundenservice: React.FC = () => (
  <ServiceDetailPage
    serviceId="ki-assistenten-wissenssysteme"
    headline="Antworten aus freigegebenem Wissen — mit klaren Grenzen."
    intro="Ein Wissensassistent kann relevante Inhalte auffindbar machen und Antworten vorbereiten. Welche Kanäle, Quellen und Eskalationen sinnvoll sind, hängt vom konkreten Wissensbestand und dem Risiko falscher Antworten ab."
    deliverables={[
      { title: 'Wissensbasis und Suchlogik', text: 'Freigegebene Dokumente werden strukturiert, auffindbar gemacht und mit einem begrenzten Antwortkontext verbunden.' },
      { title: 'Assistent und Quellenbezug', text: 'Die Oberfläche, Antwortregeln und — wo technisch möglich — nachvollziehbare Quellenhinweise werden für den Anwendungsfall gestaltet.' },
      { title: 'Tests und Eskalation', text: 'Typische, schwierige und unzulässige Fragen werden getestet; Übergaben an Menschen werden nur dort versprochen, wo sie implementiert sind.' },
    ]}
    checks={[
      'Freigegebene, aktuelle und verantwortete Wissensquellen',
      'Testfragen und akzeptable Antwortgrenzen',
      'Rollen, Zugriffe und Umgang mit Gesprächsdaten',
      'Modellanbieter, Hosting, Aufbewahrung und Eskalationsweg',
    ]}
    boundary="Ein Assistent ersetzt weder fachliche Freigaben noch eine anwendungsspezifische Datenschutz- und Risikoprüfung. Lösungsrate, Verfügbarkeit und Entlastung werden nicht pauschal zugesagt."
    relatedTo="/live-demo"
    relatedLabel="Dokument-Agent testen"
  />
);

export default KIKundenservice;

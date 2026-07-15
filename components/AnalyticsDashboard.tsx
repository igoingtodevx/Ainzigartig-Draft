import React from 'react';
import { CapabilityPage } from './CapabilityPage';

export const AnalyticsDashboard: React.FC = () => (
  <CapabilityPage
    metaTitle="Decision Intelligence & Analytics | Ainzigartig"
    metaDescription="Dashboards, Entscheidungsmodelle und KI-gestützte Analysen für nachvollziehbare Unternehmensentscheidungen."
    eyebrow="Decision Intelligence & Analytics"
    title="Aus verteilten Daten wird eine belastbare Entscheidung."
    intro="Wir verbinden Datenquellen, betriebswirtschaftliche Logik und verständliche Oberflächen. So entstehen Werkzeuge, die nicht nur berichten, sondern Entscheidungen vorbereiten."
    outputs={['Management- oder Operations-Dashboard', 'Gemeinsames KPI- und Datenmodell', 'Szenario- und Budgetlogik', 'Anomalie- und Signalsystem', 'Review- und Entscheidungsprozess']}
    situations={[
      { title: 'Verteilte Zahlen', text: 'Relevante Kennzahlen liegen in Excel-Dateien, CRM, ERP und einzelnen Fachsystemen ohne gemeinsames Modell.' },
      { title: 'Rückblick statt Steuerung', text: 'Berichte erklären, was passiert ist, liefern aber zu wenig Struktur für die nächste Entscheidung.' },
      { title: 'Uneinheitliche Definitionen', text: 'Bereiche arbeiten mit unterschiedlichen Begriffen und Zahlenständen, obwohl sie dieselbe Frage beantworten sollen.' },
      { title: 'Komplexe Allokation', text: 'Budgets, Kapazitäten oder Maßnahmen müssen unter mehreren Annahmen und Zielgrößen verteilt werden.' },
    ]}
    systems={[
      { title: 'Verbinden', text: 'Datenquellen und Verantwortlichkeiten in einem nachvollziehbaren Fluss zusammenführen.' },
      { title: 'Modellieren', text: 'Begriffe, Kennzahlen, Annahmen und Entscheidungskriterien explizit abbilden.' },
      { title: 'Erklären', text: 'Abweichungen, Szenarien und Unsicherheiten in einer verständlichen Oberfläche sichtbar machen.' },
      { title: 'Steuern', text: 'Entscheidungen, Maßnahmen und Rückmeldungen in einen wiederholbaren Review-Prozess bringen.' },
    ]}
    principle="Ein gutes Dashboard zeigt nicht mehr Daten. Es macht die nächste Entscheidung klarer."
  />
);

export default AnalyticsDashboard;

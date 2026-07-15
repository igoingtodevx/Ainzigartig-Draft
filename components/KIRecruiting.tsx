import React from 'react';
import { CapabilityPage } from './CapabilityPage';

export const KIRecruiting: React.FC = () => (
  <CapabilityPage
    metaTitle="KI-Workflows für Recruiting | Ainzigartig"
    metaDescription="Strukturierte Recruiting-Workflows mit nachvollziehbaren Kriterien und menschlicher Entscheidung."
    eyebrow="Recruiting Operations"
    title="Recruiting-Prozesse strukturieren, ohne Entscheidungen zu verstecken."
    intro="Wir bauen Werkzeuge für Erfassung, Vorstrukturierung, Kommunikation und Übergaben. Kriterien bleiben nachvollziehbar, Entscheidungen bei den verantwortlichen Menschen."
    outputs={['Bewerbungs- und Intake-Flow', 'Kriterien- und Datenmodell', 'Strukturierte Vorprüfung', 'Kommunikations-Workflow', 'Review- und Übergabekonzept']}
    situations={[
      { title: 'Uneinheitliche Eingänge', text: 'Unterlagen kommen über verschiedene Kanäle und werden jedes Mal anders geprüft oder weitergegeben.' },
      { title: 'Hoher administrativer Aufwand', text: 'Termine, Rückfragen, Statuspflege und Dokumentation binden Zeit, bevor ein Fachgespräch beginnt.' },
      { title: 'Unklare Kriterien', text: 'Anforderungen sind nicht sauber operationalisiert und Bewertungen dadurch schwer vergleichbar.' },
      { title: 'Langsame Rückmeldungen', text: 'Bewerbende warten, weil Informationen zwischen Recruiting, Fachbereich und Führung verloren gehen.' },
    ]}
    systems={[
      { title: 'Erfassen', text: 'Unterlagen und Pflichtangaben einheitlich aufnehmen und Datenqualität sichtbar machen.' },
      { title: 'Strukturieren', text: 'Freigegebene Kriterien anwenden, fehlende Informationen markieren und Zusammenfassungen vorbereiten.' },
      { title: 'Koordinieren', text: 'Termine, Rückfragen, Statuswechsel und interne Zuständigkeiten zuverlässig auslösen.' },
      { title: 'Entscheiden', text: 'Bewertung und Auswahl bewusst bei den verantwortlichen Personen belassen und dokumentieren.' },
    ]}
    principle="KI darf den Prozess beschleunigen. Die Personalentscheidung bleibt menschlich."
  />
);

export default KIRecruiting;

import React from 'react';
import { Link } from 'react-router-dom';

const systems = [
  {
    field: 'Conversion & Growth',
    title: 'Experimentation & CRO Agent',
    description: 'A/B-Test-System mit PostgreSQL, Interface für Conversion-Verantwortliche und einer Kontextschicht für Auswertung und nächste Testhypothesen.',
  },
  {
    field: 'Decision Intelligence',
    title: 'Marketing-Budget-Allokation',
    description: 'Internes Werkzeug für ein börsennotiertes Unternehmen, das Marktparameter und Grenzkosten in eine nachvollziehbare Budgetentscheidung übersetzt.',
  },
  {
    field: 'Applied AI',
    title: 'Multimodale Design-Evaluation',
    description: 'Spezialisiertes multimodales Modell zur Bewertung von Produktdesigns für neue Märkte – mit Datensatz, Evaluationslogik und klaren Qualitätsgrenzen.',
  },
  {
    field: 'Revenue Operations',
    title: 'Lead Qualification System',
    description: 'Recherche, Qualifizierung, Clusterung und Content-Routing von Leads mit CRM- und Automationsanbindung als durchgängiger Datenfluss.',
  },
  {
    field: 'Digital Product',
    title: 'KI-Vertragsberater für Energie',
    description: 'Geführte Beratung für Strom- und Gasverträge, die komplexe Tariflogik in eine verständliche digitale Customer Journey übersetzt.',
  },
  {
    field: 'Customer Interaction',
    title: 'Service-Agent & Sales-Funnel',
    description: 'Startup-Website, Unterseiten und qualifizierender Funnel für einen KI-Agenten in der Service-Industrie – von der Positionierung bis zur Anfrage.',
  },
];

export const CaseStudies: React.FC = () => (
  <section className="py-20 md:py-28 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Umsetzungspraxis</p>
          <h2 className="font-editorial text-3xl md:text-5xl text-ink">Systeme, die wir bereits gebaut haben.</h2>
        </div>
        <Link to="/projekte" className="text-sm text-accent underline underline-offset-4">Alle Arbeitsproben</Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-faint/50">
        {systems.map((system, index) => (
          <article key={system.title} className="p-7 md:p-8 border-r border-b border-faint/50 min-h-[280px] flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-9">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted">{system.field}</span>
              <span className="text-[10px] text-faint tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="font-editorial text-xl md:text-2xl text-ink mb-4">{system.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{system.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

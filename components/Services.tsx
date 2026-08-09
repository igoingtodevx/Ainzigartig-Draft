import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  eyebrow: string;
  description: string;
  to: string;
  icon: string;
}

const services: ServiceItem[] = [
  {
    title: 'KI im Kundenservice',
    eyebrow: 'Assistenten',
    description: 'Chatbots und Wissensassistenten, die auf Ihrem Unternehmenswissen arbeiten und Kunden wie Teams zuverlässig unterstützen.',
    to: '/ki-kundenservice',
    icon: 'forum',
  },
  {
    title: 'KI-Website-Analyse',
    eyebrow: '60 Sekunden',
    description: 'Ihre URL wird analysiert und in konkrete KI-Potenziale, Aufwand, Wirkung und nächste Schritte übersetzt.',
    to: '/ki-analyse',
    icon: 'travel_explore',
  },
  {
    title: 'Dokument-Agent',
    eyebrow: 'Live Demo',
    description: 'PDFs, Bilder und Texte werden strukturiert verstanden, zusammengefasst und in konkrete Aktionen oder Risiken übersetzt.',
    to: '/live-demo',
    icon: 'document_scanner',
  },
  {
    title: 'KI-Reifegrad-Check',
    eyebrow: '6 Fragen',
    description: 'Ein schneller Reality-Check, wie gut Ihr Unternehmen auf konkrete KI-Projekte vorbereitet ist und wo der beste Einstieg liegt.',
    to: '/ki-audit',
    icon: 'checklist',
  },
  {
    title: 'KI-Schnellstart',
    eyebrow: '5 Tage',
    description: 'Ein klar gescoptes Einstiegsprojekt für Unternehmen, die nicht monatelang über KI sprechen, sondern etwas Nutzbares testen wollen.',
    to: '/ki-schnellstart',
    icon: 'bolt',
  },
  {
    title: 'KI-Beratung',
    eyebrow: 'Maßgeschneidert',
    description: 'Use-Case-Identifikation, Priorisierung, Toolauswahl und Umsetzungsplanung mit Fokus auf Wirtschaftlichkeit und Alltagstauglichkeit.',
    to: '/ki-beratung',
    icon: 'strategy',
  },
  {
    title: 'KI im Recruiting',
    eyebrow: 'Workflow',
    description: 'Unterstützung bei Screening, Matching und wiederkehrenden Recruiting-Aufgaben — nachvollziehbar und mit Entscheidung beim Menschen.',
    to: '/ki-recruiting',
    icon: 'group_search',
  },
  {
    title: 'Analytics Dashboard',
    eyebrow: 'Echtzeit',
    description: 'KPIs an einem Ort, ergänzt um KI-gestützte Einordnung und verständliche Hinweise auf Auffälligkeiten und Entwicklungen.',
    to: '/analytics-dashboard',
    icon: 'monitoring',
  },
  {
    title: 'ROI-Rechner',
    eyebrow: 'Kalkulation',
    description: 'Eine nachvollziehbare erste Schätzung, wo Automatisierung und KI in Ihrer Branche Zeit und Kosten reduzieren können.',
    to: '/roi-rechner',
    icon: 'calculate',
  },
];

const additional = ['Telefonassistenten', 'Lead-Generierung', 'Vertriebsautomatisierung', 'Backoffice-Automation'];

export const Services: React.FC = () => (
  <section id="services" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Was wir bauen</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Use Cases, die im Alltag funktionieren
        </h2>
        <p className="text-base md:text-lg text-muted mt-4 leading-relaxed">
          Nicht „KI um der KI willen“, sondern konkrete Lösungen für wiederkehrende Arbeit, Kundenkontakt, Wissen und Entscheidungen.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Link
            key={service.title}
            to={service.to}
            className="brand-card group min-h-[285px] p-6 md:p-7 flex flex-col bg-surface"
          >
            <div className="flex items-start justify-between gap-4 mb-10">
              <span className="w-11 h-11 rounded-full bg-accent/20 border border-accent/45 flex items-center justify-center text-ink">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{service.icon}</span>
              </span>
              <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light border border-ink/10 rounded-full px-3 py-1">
                {service.eyebrow}
              </span>
            </div>

            <div className="mt-auto">
              <h3 className="font-editorial text-[1.65rem] leading-tight text-ink mb-3">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
                Mehr erfahren
                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 md:mt-12 border-t border-ink/10 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <p className="font-editorial text-xl text-ink">Weitere typische Automatisierungsfelder</p>
          <p className="text-sm text-muted mt-1">Wir sind nicht auf diese Beispiele beschränkt.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {additional.map((item) => (
            <span key={item} className="rounded-full border border-ink/15 bg-surface/70 px-3.5 py-2 text-xs font-medium text-muted">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/preise" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent-hover transition-colors">
          Leistungen & Preise ansehen
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </div>
  </section>
);

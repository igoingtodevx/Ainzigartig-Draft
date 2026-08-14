import React from 'react';
import { Link } from 'react-router-dom';
import {
  WorkflowIcon,
  ChatIcon,
  DocumentIcon,
  DashboardIcon,
  BoltIcon,
  StrategyIcon,
  ArrowRightIcon,
} from './Icons';

interface SolutionArea {
  number: string;
  badge: string;
  title: string;
  description: string;
  highlight?: boolean;
  useCases: string[];
  to: string;
  ctaText: string;
  icon: React.ReactNode;
}

const solutionAreas: SolutionArea[] = [
  {
    number: '01',
    badge: 'Kernkompetenz · Workflows & APIs',
    title: 'Automatisierung & Integrationen',
    description:
      'Wiederkehrende Prozesse, System-zu-System-Workflows und Schnittstellen zwischen Ihren bestehenden Tools. Wir setzen auf deterministische Geschäftslogik als Fundament und schalten KI gezielt dort ein, wo sie echten Mehrwert bringt.',
    highlight: true,
    useCases: [
      'Posteingang & Beleg-Routing',
      'Lead-Enrichment & CRM-Sync',
      'Klassifizierung von Anfragen',
      'Altsystem- & Backoffice-Brücken',
    ],
    to: '/automatisierung',
    ctaText: 'Mehr zu Automatisierung',
    icon: <WorkflowIcon className="w-5 h-5" />,
  },
  {
    number: '02',
    badge: 'Dialog & Wissensbasis',
    title: 'KI-Assistenten & Chatbots',
    description:
      'Kundenservice-Assistenten und interne Wissensbots auf Basis Ihrer eigenen Dokumente und Prozesse. Schnelle, verlässliche Antworten für Kunden und spürbare Entlastung für Ihr Support-Team.',
    useCases: [
      '24/7 Kundenkontakt & First-Level-Support',
      'Interner Wissens- & Prozess-Assistent',
      'Ticket-Vorqualifizierung & Routing',
      'Mehrsprachige Kundenkommunikation',
    ],
    to: '/ki-kundenservice',
    ctaText: 'Mehr zu KI-Assistenten',
    icon: <ChatIcon className="w-5 h-5" />,
  },
  {
    number: '03',
    badge: 'Extraktion & Verständnis',
    title: 'Dokumente & Wissen',
    description:
      'Strukturierte Extraktion, Klassifizierung und multimodales Verständnis von PDFs, Scans, Rechnungen und Freitexten. Verwandelt unstrukturierte Informationen in saubere Daten und auslösbare Aktionen.',
    useCases: [
      'PDF- & Rechnungsextraktion',
      'Vertrags- & Angebotsanalyse',
      'Automatische Dokumentenablage',
      'Plausibilitäts- & Risikoprüfung',
    ],
    to: '/live-demo',
    ctaText: 'Dokument-Agent testen',
    icon: <DocumentIcon className="w-5 h-5" />,
  },
  {
    number: '04',
    badge: 'Software & Entscheidungen',
    title: 'Dashboards & interne Tools',
    description:
      'Maßgeschneiderte interne Business-Software, operative Leitstände und Entscheidungsunterstützung, passgenau um Ihre bestehenden Abläufe gebaut statt starre Standardsoftware von der Stange.',
    useCases: [
      'Operative Steuerungs-Dashboards',
      'KI-gestützte KPI-Einordnung',
      'Zentralisierung verteilter Datenquellen',
      'Individuelle Arbeitsplatz-Werkzeuge',
    ],
    to: '/analytics-dashboard',
    ctaText: 'Dashboard-Beispiel ansehen',
    icon: <DashboardIcon className="w-5 h-5" />,
  },
];

const engagementModels = [
  {
    tag: 'Fokussierter Einstieg · 2–4 Wochen',
    name: 'KI-Schnellstart',
    desc: 'Ein klar abgegrenzter erster Use Case in wenigen Wochen umgesetzt. Minimales Risiko, transparenter Festpreis und sofort sichtbare Ergebnisse im operativen Alltag.',
    to: '/ki-schnellstart',
    cta: 'Schnellstart-Details',
    icon: <BoltIcon className="w-5 h-5 text-accent-hover" />,
  },
  {
    tag: 'Strategie & Architektur · Begleitung',
    name: 'KI-Beratung & Roadmap',
    desc: 'Umfassende Prozessanalyse, Use-Case-Priorisierung und Toolauswahl. Wir entwickeln die technische Architektur und begleiten Ihr Team von der Konzeption bis zum Rollout.',
    to: '/ki-beratung',
    cta: 'Beratungs-Details',
    icon: <StrategyIcon className="w-5 h-5 text-accent-hover" />,
  },
];

export const Services: React.FC = () => (
  <section id="services" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      {/* Header */}
      <header className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Was wir bauen</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.65rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Lösungen, die im Unternehmensalltag funktionieren.
        </h2>
        <p className="text-base md:text-lg text-muted mt-4 leading-relaxed">
          Keine Spielereien und kein Buzzword-Bingo. Wir entwickeln robuste Software und Integrationen für vier konkrete Schwerpunktbereiche im Mittelstand.
        </p>
      </header>

      {/* 4 Primary Solution Areas Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {solutionAreas.map((area) => (
          <article
            key={area.title}
            className={`brand-card group p-7 md:p-8 flex flex-col justify-between transition-all duration-300 ${
              area.highlight
                ? 'bg-surface border-accent/40 shadow-card hover:border-accent'
                : 'bg-surface'
            }`}
          >
            <div>
              {/* Top row: Number, Badge & Icon */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-editorial text-2xl text-accent-mid leading-none tabular">
                    {area.number}
                  </span>
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold text-light">
                    {area.badge}
                  </span>
                </div>
                <span className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-ink shrink-0">
                  {area.icon}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-editorial text-[1.75rem] md:text-[1.95rem] leading-tight text-ink mb-3.5">
                {area.title}
              </h3>
              <p className="text-sm md:text-[0.95rem] leading-relaxed text-muted mb-6">
                {area.description}
              </p>

              {/* Subordinate Concrete Use Cases */}
              <div className="mb-8 pt-4 border-t border-ink/10">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-light mb-2.5">
                  Typische Anwendungsfälle:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {area.useCases.map((uc) => (
                    <span
                      key={uc}
                      className="text-xs text-muted flex items-center gap-1.5 py-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      <span>{uc}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link CTA */}
            <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
              <Link
                to={area.to}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-accent-hover transition-colors"
              >
                <span>{area.ctaText}</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Subordinate Entry Models / Consulting strip */}
      <div className="mt-14 md:mt-18 rounded-[24px] border border-ink/12 bg-[#F3EFEA] p-7 md:p-9">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-ink/10">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-1.5">Zusammenarbeit & Einstieg</p>
            <h3 className="font-editorial text-2xl md:text-3xl text-ink font-normal">
              Wie ein Projekt mit Ainzigartig startet
            </h3>
          </div>
          <Link
            to="/preise"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent-hover transition-colors shrink-0"
          >
            <span>Alle Leistungen & Konditionen im Detail</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {engagementModels.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="brand-card bg-surface p-6 md:p-7 flex flex-col justify-between group hover:border-ink/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-accent-hover block">
                    {item.tag}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-ink shrink-0">
                    {item.icon}
                  </span>
                </div>
                <h4 className="font-editorial text-xl md:text-2xl text-ink leading-tight mb-2.5 group-hover:text-accent-hover transition-colors">
                  {item.name}
                </h4>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-semibold text-ink">
                <span>{item.cta} ansehen</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Services;

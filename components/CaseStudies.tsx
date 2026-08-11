import React from 'react';
import { Link } from 'react-router-dom';

const demos = [
  {
    label: 'System-Demo',
    title: 'KI-Website-Analyse',
    description: 'Eine echte Website wird ausgelesen, technisch eingeordnet und in konkrete KI-Potenziale mit Wirkung, Aufwand und nächsten Schritten übersetzt.',
    to: '/ki-analyse',
    meta: 'Analyse · Scraping · LLM',
  },
  {
    label: 'Live-Demo',
    title: 'Live Agent Demo',
    description: 'PDFs, Scans und Texte werden multimodal verarbeitet und in Zusammenfassung, Risiken und konkrete Aktionen strukturiert.',
    to: '/live-demo',
    meta: 'PDF · Vision · Automation',
  },
  {
    label: 'System-Check',
    title: 'KI-Reifegrad-Check',
    description: 'Sechs Fragen ordnen ein, wie gut Prozesse, Daten und Organisation bereits für sinnvolle KI-Anwendungen vorbereitet sind.',
    to: '/ki-audit',
    meta: 'Assessment · Priorisierung · Einstieg',
  },
];

const systems = [
  {
    label: 'Gebautes System',
    title: 'AutoWunsch',
    description: 'Digitaler Automotive-Beratungs- und Sales-Funnel mit KI-Fahrzeugcheck, recherchierten Schwachstellen, historischer Preisentwicklung, eigener Forecast-Logik und integriertem 49-Euro-Beratungs-Checkout.',
    meta: 'AI Research · Price Data · Payments · Product Workflow',
  },
  {
    label: 'Business-App',
    title: 'Zeitstempel',
    description: 'Offline-first Business-App für Arbeitszeiterfassung mit lokaler Speicherung, Synchronisation, Konfliktbehandlung sowie CSV- und PDF-Export.',
    meta: 'Business App · Offline-first · Sync',
  },
  {
    label: 'Dokument-System',
    title: 'Unternehmens-Wissensassistent',
    description: 'Wissensassistent mit strukturierter Dokumentbasis, Embeddings und semantischer Suche, der relevante Inhalte als Kontext für den Chat bereitstellt.',
    meta: 'RAG · Knowledge Search · AI Assistant',
  },
];

export const CaseStudies: React.FC = () => (
  <div className="bg-[#F3EFEA] border-y border-ink/10">
    <section id="live-demos" className="py-16 md:py-28 scroll-mt-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Live-Demos</p>
            <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.35rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
              Lieber zeigen als behaupten.
            </h2>
            <p className="text-base text-muted leading-relaxed mt-4 max-w-md">
              Einige unserer Systeme können Sie direkt ausprobieren. So erleben Sie Funktionsweise und Nutzerführung, bevor wir über ein Projekt sprechen.
            </p>
          </div>

          <div className="space-y-4">
            {demos.map((item, index) => (
              <Link key={item.title} to={item.to} className="brand-card group bg-surface p-5 md:p-8 grid sm:grid-cols-[auto_1fr_auto] gap-4 md:gap-5 items-start">
                <span className="font-editorial text-4xl text-accent-mid leading-none tabular">0{index + 1}</span>
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{item.label}</span>
                    <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-[0.72rem] text-light">{item.meta}</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-ink leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mt-2 max-w-xl">{item.description}</p>
                </div>
                <span className="material-symbols-outlined text-ink/50 group-hover:text-ink group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="systeme" className="py-16 md:py-28 border-t border-ink/10 scroll-mt-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <header className="max-w-3xl mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Ausgewählte Systeme</p>
          <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.35rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
            Gebaute Systeme. Unterschiedliche Stärken.
          </h2>
          <p className="text-base text-muted leading-relaxed mt-4 max-w-2xl">
            Drei Produkt- und Systembeispiele zeigen die Bandbreite zwischen KI-Engineering, belastbarer Business-Software und vollständigen digitalen Workflows.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-5">
          {systems.map((item, index) => (
            <article key={item.title} className="brand-card bg-surface p-5 md:p-7 flex flex-col min-h-0 lg:min-h-[340px]">
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{item.label}</span>
                <span className="font-editorial text-3xl text-accent-mid leading-none tabular" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="font-editorial text-2xl text-ink leading-tight">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed mt-3">{item.description}</p>
              <p className="text-[0.72rem] text-light mt-6 lg:mt-auto lg:pt-6 border-t border-ink/10">{item.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

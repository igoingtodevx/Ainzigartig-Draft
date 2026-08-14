import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

const work = [
  {
    label: 'Live Tool',
    title: 'KI-Website-Analyse',
    description: 'Eine echte Website wird ausgelesen, technisch eingeordnet und in konkrete KI-Potenziale mit Wirkung, Aufwand und nächsten Schritten übersetzt.',
    to: '/ki-analyse',
    meta: 'Analyse · Scraping · LLM',
  },
  {
    label: 'Live Demo',
    title: 'Dokument-Agent',
    description: 'PDFs, Scans und Texte werden multimodal verarbeitet und in Zusammenfassung, Risiken und konkrete Aktionen strukturiert.',
    to: '/live-demo',
    meta: 'PDF · Vision · Automation',
  },
  {
    label: 'Interaktiver Check',
    title: 'KI-Reifegrad',
    description: 'Sechs Dimensionen zeigen, welche Voraussetzungen für einen begrenzten KI-Pilot stehen und was zuerst geklärt werden sollte.',
    to: '/ki-audit',
    meta: 'Assessment · Priorisierung · Einstieg',
  },
];

export const CaseStudies: React.FC = () => (
  <section id="demos" className="py-24 md:py-32 bg-[#F3EFEA] border-y border-ink/10 scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Ausprobieren</p>
          <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.35rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
            Lieber zeigen als behaupten.
          </h2>
          <p className="text-base text-muted leading-relaxed mt-4 max-w-md">
            Ein Teil unserer Arbeit lässt sich direkt ausprobieren. So sehen Sie, wie wir KI-Systeme denken und bauen — bevor wir über ein Projekt sprechen.
          </p>
        </div>

        <div className="space-y-4">
          {work.map((item, index) => (
            <Link key={item.title} to={item.to} className="brand-card group bg-surface p-6 md:p-8 grid sm:grid-cols-[auto_1fr_auto] gap-5 items-start">
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
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-ink/50 group-hover:text-ink transition-colors mt-1" aria-hidden="true">
                <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}

          <Link to="/insights" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-ink hover:text-accent-hover transition-colors">
            <span>Kuratierte KI-Insights ansehen</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

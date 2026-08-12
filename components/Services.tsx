import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PILLARS } from '../content/services.js';

export const Services: React.FC = () => (
  <section id="services" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Vier Leistungsfelder</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Von einem klaren Prozess zur belastbaren Lösung.
        </h2>
        <p className="text-base md:text-lg text-muted mt-4 leading-relaxed">
          Der konkrete Umfang entsteht aus Aufgabe, Datenlage, Schnittstellen und Risiko — nicht aus einer vorgefertigten KI-Paketliste.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {SERVICE_PILLARS.map((service, index) => (
          <Link key={service.id} to={service.to} className="brand-card group min-h-[340px] p-6 md:p-8 flex flex-col bg-surface">
            <div className="flex items-start justify-between gap-4 mb-9">
              <span className="w-12 h-12 rounded-full bg-accent/20 border border-accent/45 flex items-center justify-center text-ink">
                <span className="material-symbols-outlined text-[23px]" aria-hidden="true">{service.icon}</span>
              </span>
              <span className="font-editorial text-3xl text-accent-mid">0{index + 1}</span>
            </div>

            <div className="mt-auto">
              <p className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light mb-2">{service.eyebrow}</p>
              <h3 className="font-editorial text-[1.8rem] md:text-[2rem] leading-tight text-ink mb-3">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">
                Leistung einordnen
                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 md:mt-12 border-t border-ink/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <p className="font-editorial text-xl text-ink">Erst sehen, dann einordnen.</p>
          <p className="text-sm text-muted mt-1">Live-Demos und gebaute Systeme sind als zwei getrennte Belegstufen dokumentiert.</p>
        </div>
        <Link to="/projekte" className="brand-pill bg-surface text-ink text-sm shrink-0">Demos & Systeme ansehen</Link>
      </div>
    </div>
  </section>
);

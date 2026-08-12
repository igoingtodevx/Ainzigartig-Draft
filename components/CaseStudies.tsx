import React from 'react';
import { Link } from 'react-router-dom';
import { LIVE_DEMOS } from '../content/proof.js';

export const CaseStudies: React.FC = () => (
  <section className="py-24 md:py-32 bg-[#F3EFEA] border-y border-ink/10">
    <div className="max-w-[1140px] mx-auto px-6">
      <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Live ausprobieren</p>
          <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.35rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
            Lieber zeigen als behaupten.
          </h2>
          <p className="text-base text-muted leading-relaxed mt-4 max-w-md">
            Diese drei Funktionen laufen als begrenzte Demos auf der Website. Jede nennt ihren Zweck und ihre Grenzen, bevor Ergebnisse als Entscheidungshilfe dienen.
          </p>
        </div>

        <div className="space-y-4">
          {LIVE_DEMOS.map((item, index) => (
            <Link key={item.id} to={item.route} className="brand-card group bg-surface p-6 md:p-8 grid sm:grid-cols-[auto_1fr_auto] gap-5 items-start">
              <span className="font-editorial text-4xl text-accent-mid leading-none tabular">0{index + 1}</span>
              <div>
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{item.label}</span>
                  <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                  <span className="text-[0.72rem] text-light">{item.meta}</span>
                </div>
                <h3 className="font-editorial text-2xl text-ink leading-tight">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed mt-2 max-w-xl">{item.description}</p>
                <p className="text-xs text-light leading-relaxed mt-3 max-w-xl">Grenze: {item.limitation}</p>
              </div>
              <span className="material-symbols-outlined text-ink/50 group-hover:text-ink group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">arrow_forward</span>
            </Link>
          ))}

          <Link to="/projekte" className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-ink hover:text-accent-hover transition-colors">
            Alle Belege und gebauten Systeme ansehen
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

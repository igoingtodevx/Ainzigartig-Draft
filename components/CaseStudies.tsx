import React from 'react';
import { Link } from 'react-router-dom';
import { LIVE_DEMOS } from '../content/proof.js';
import documentVisual from '../Assets/run_b_asset_pack/08_document_agent_cube.png';

const DEMO_ICONS = ['language', 'document_scanner', 'account_tree'];

export const CaseStudies: React.FC = () => (
  <section id="live-demos" className="scroll-mt-24 bg-[#F3EFEA] py-20 md:py-28">
    <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
      <header className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-hover">Live ausprobieren</p>
          <h2 className="mt-3 font-editorial text-[clamp(2.45rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-ink">Nicht nur lesen.<br /><em>Selbst prüfen.</em></h2>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">Drei begrenzte Produktflächen zeigen, wie wir aus Rohinformationen strukturierte Beobachtungen, Prüfpunkte und nächste Schritte machen. Jede Demo nennt offen, was sie nicht leisten kann.</p>
      </header>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        {LIVE_DEMOS.map((item, index) => {
          const featured = index === 1;
          return (
            <Link
              key={item.id}
              to={item.route}
              className={`brand-card group relative overflow-hidden bg-surface p-5 sm:p-6 ${featured ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}`}
            >
              {featured && <img src={documentVisual} alt="" aria-hidden="true" className="absolute -right-24 -top-10 w-[330px] max-w-none opacity-[.14] sm:-right-10 sm:w-[390px]" loading="lazy" />}
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/45 bg-accent/15 text-ink"><span className="material-symbols-outlined text-[21px]" aria-hidden="true">{DEMO_ICONS[index]}</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-[.14em] text-accent-hover">{item.label} · 0{index + 1}</span>
                </div>
                <div className={featured ? 'mt-20 sm:mt-28' : 'mt-9'}>
                  <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-light">{item.meta}</p>
                  <h3 className={`mt-2 font-editorial leading-tight text-ink ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{item.description}</p>
                  <p className="mt-4 border-t border-ink/10 pt-3 text-[11px] leading-relaxed text-light"><strong className="font-semibold text-muted">Grenze:</strong> {item.limitation}</p>
                </div>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-ink underline decoration-accent-hover decoration-2 underline-offset-4 group-hover:text-accent-hover">Demo öffnen <span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-light">Die aktuelle technische Verfügbarkeit wird in jeder Demo vor der Nutzung angezeigt.</p>
    </div>
  </section>
);

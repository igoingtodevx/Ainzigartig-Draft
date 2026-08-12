import React from 'react';
import { Link } from 'react-router-dom';
import { BUILT_SYSTEMS, LIVE_DEMOS } from '../content/proof.js';
import { RouteMeta } from './RouteMeta';

export const Projects: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta title="Demos & gebaute Systeme | Ainzigartig" description="Interaktive Demo-Oberflächen mit Verfügbarkeitsstatus und klar abgegrenzte gebaute Systeme von Ainzigartig." />

    <div className="max-w-[1140px] mx-auto">
      <header className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-14 items-end mb-16 md:mb-20">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Belege statt Behauptungen</p>
          <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.035em] font-normal">
            Live-Demos.<br />Gebaute Systeme.
          </h1>
        </div>
        <div className="max-w-xl lg:pb-2">
          <p className="text-base md:text-lg text-muted leading-relaxed">
            Zwei Belegstufen, bewusst getrennt: Demos öffnen interaktive Produktflächen und zeigen dort ihren aktuellen Verfügbarkeitsstatus. Gebaute Systeme dokumentieren umgesetzten Funktionsumfang — ohne daraus Kundenwirkung oder wirtschaftliche Ergebnisse abzuleiten.
          </p>
        </div>
      </header>

      <section id="live-demos" className="scroll-mt-28 border-t border-ink/15 py-14 md:py-20">
        <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-10 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-accent-hover mb-3">Belegstufe 01</p>
            <h2 className="font-editorial text-3xl md:text-4xl leading-tight">Live-Demos</h2>
            <p className="text-sm text-muted leading-relaxed mt-3 max-w-sm">Begrenzt, interaktiv und mit sichtbaren Einschränkungen.</p>
          </div>
          <div className="space-y-4">
            {LIVE_DEMOS.map((item, index) => (
              <Link key={item.id} to={item.route} className="brand-card group bg-surface p-6 md:p-7 grid sm:grid-cols-[48px_1fr_auto] gap-4 items-start">
                <span className="font-editorial text-3xl text-accent-mid">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{item.label}</p>
                  <h3 className="font-editorial text-2xl mt-1">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mt-2">{item.description}</p>
                  <p className="text-xs text-light leading-relaxed mt-3">Grenze: {item.limitation}</p>
                </div>
                <span className="material-symbols-outlined text-ink/45 group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="gebaute-systeme" className="scroll-mt-28 border-y border-ink/15 py-14 md:py-20">
        <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-10 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-accent-hover mb-3">Belegstufe 02</p>
            <h2 className="font-editorial text-3xl md:text-4xl leading-tight">Gebaute Systeme</h2>
            <p className="text-sm text-muted leading-relaxed mt-3 max-w-sm">Umgesetzter Funktionsumfang, nicht automatisch ein Kunden- oder Erfolgscase.</p>
          </div>
          <div className="space-y-5">
            {BUILT_SYSTEMS.map((item, index) => (
              <article key={item.id} className="brand-card bg-surface p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{item.label} · {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="font-editorial text-3xl mt-1">{item.title}</h3>
                  </div>
                  <span className="rounded-full border border-accent/45 bg-accent/15 px-3 py-1.5 text-[0.68rem] font-semibold text-ink">{item.status}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed max-w-2xl">{item.description}</p>
                <ul className="grid md:grid-cols-3 gap-3 mt-6">
                  {item.features.map((feature) => (
                    <li key={feature} className="rounded-2xl bg-[#F3EFEA] border border-ink/10 p-4 text-xs text-muted leading-relaxed">
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-light leading-relaxed mt-5 pt-5 border-t border-ink/10">Abgrenzung: {item.boundary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <p className="font-editorial text-2xl max-w-xl">Sie möchten einen ähnlichen Umfang für Ihren Prozess einordnen?</p>
        <Link to="/#kontakt" className="brand-pill bg-ink text-white shrink-0">Anwendungsfall besprechen</Link>
      </div>
    </div>
  </main>
);

export default Projects;

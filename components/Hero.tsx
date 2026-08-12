import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../Assets/Add_a_minimal_animation_to_the.mp4';
import heroPoster from '../Assets/run_b_asset_pack/04_hero_tree_scene.webp';

const PRODUCT_LINES = [
  'Automatisierungen & Integrationen',
  'Dashboards & interne Tools',
  'KI-Assistenten & Wissen',
  'Individuelle KI- & Software',
];

export const Hero: React.FC = () => (
  <section className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-ink/10 pb-8 pt-28 sm:items-center sm:pb-14 md:pt-32">
    <video
      className="absolute inset-0 h-full w-full object-cover object-[32%_center] pointer-events-none motion-reduce:hidden sm:object-center"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={heroPoster}
      aria-hidden="true"
    >
      <source src={heroVideo} type="video/mp4" media="(min-width: 768px)" />
    </video>
    <img
      src={heroPoster}
      alt=""
      className="absolute inset-0 hidden h-full w-full object-cover object-[32%_center] pointer-events-none motion-reduce:block sm:object-center"
      aria-hidden="true"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-base/5 via-transparent to-base/90 sm:bg-gradient-to-r sm:from-base/5 sm:via-base/10 sm:to-base/55" />

    <div className="relative z-10 mx-auto grid w-full max-w-[1140px] px-5 sm:px-6 lg:grid-cols-[.78fr_1.22fr]">
      <div className="rounded-[24px] border border-ink/10 bg-base/95 p-5 shadow-soft sm:p-7 md:p-9 lg:col-start-2 lg:p-10">
        <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted sm:text-xs">
          <span className="h-2 w-2 rounded-full bg-accent-hover" />
          Software, Automatisierung & KI für den Mittelstand
        </p>
        <h1 className="font-editorial text-[clamp(2.65rem,6.4vw,5.45rem)] font-normal leading-[.92] tracking-[-0.047em] text-ink">
          Wir bauen Software,<br />die <em className="font-normal text-accent-hover">Arbeit abnimmt.</em>
        </h1>
        <p className="mt-5 max-w-2xl text-[clamp(.95rem,1.45vw,1.1rem)] leading-relaxed text-muted sm:mt-6">
          Automatisierungen, interne Werkzeuge, KI-Assistenten und individuelle Anwendungen — für konkrete Prozesse, mit prüfbarem Umfang und sichtbaren Grenzen.
        </p>

        <ol className="mt-6 grid grid-cols-2 border-y border-ink/15 sm:mt-7">
          {PRODUCT_LINES.map((line, index) => (
            <li key={line} className="grid grid-cols-[24px_1fr] gap-1.5 border-b border-ink/10 py-2.5 pr-2 text-[10px] font-semibold leading-snug text-ink odd:border-r odd:pr-3 even:pl-3 last:border-b-0 sm:grid-cols-[28px_1fr] sm:gap-2 sm:py-3 sm:text-xs [&:nth-last-child(-n+2)]:border-b-0">
              <span className="font-editorial text-sm text-accent-hover sm:text-base">0{index + 1}</span>
              {line}
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:gap-3">
          <Link to="/#kontakt" className="brand-pill justify-center bg-ink px-7 py-3.5 text-[.94rem] text-white hover:bg-[#33312E]">
            Projektidee prüfen
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </Link>
          <Link to="/#live-demos" className="inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm font-semibold text-ink underline decoration-accent-hover decoration-2 underline-offset-4 hover:text-accent-hover">
            Live-Demos ansehen <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

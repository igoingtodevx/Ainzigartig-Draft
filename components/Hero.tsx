import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../Assets/Add_a_minimal_animation_to_the.mp4';
import heroPoster from '../Assets/Gemini_Generated_Image_anzdlsanzdlsanzd.webp';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-14">
      <video
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        poster={heroPoster}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-transparent to-base/55 pointer-events-none" />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6 w-full text-center">
        <div className="max-w-[920px] mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-base/65 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase text-ink mb-7">
            <span className="w-2 h-2 rounded-full bg-accent" />
            KI-Beratung & Implementierung für KMU
          </p>

          <h1 className="font-editorial text-[clamp(2.7rem,7vw,5.2rem)] font-normal leading-[0.98] tracking-[-0.035em] text-ink drop-shadow-[0_2px_14px_rgba(250,248,245,0.95)]">
            Wir bauen die Software,<br className="hidden sm:block" /> die{' '}
            <span className="hand-underline font-body font-extrabold tracking-[-0.045em]">
              Arbeit abnimmt.
            </span>
          </h1>

          <p className="mt-8 text-[clamp(1rem,2vw,1.28rem)] leading-relaxed text-muted font-body max-w-[760px] mx-auto">
            Automatisierung & Integrationen, Dashboards & interne Business-Tools, KI-Assistenten & Wissenssysteme sowie individuelle KI- & Softwarelösungen für KMU.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/#kontakt"
              className="brand-pill bg-ink text-white hover:bg-[#33312E] px-7 py-3.5 text-[0.98rem] w-full sm:w-auto"
            >
              Prozess besprechen
              <span className="material-symbols-outlined text-[19px]" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link
              to="/projekte#live-demos"
              className="brand-pill bg-base/55 backdrop-blur-sm text-ink hover:bg-base/80 px-7 py-3.5 text-[0.98rem] w-full sm:w-auto"
            >
              Demos & Systeme ansehen
            </Link>
          </div>

          <p className="mt-4 text-xs text-light font-body">Konkrete Einordnung · Umfang und Voraussetzungen zuerst</p>
        </div>
      </div>
    </section>
  );
};

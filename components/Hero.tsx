import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../Assets/Add_a_minimal_animation_to_the.mp4';
import heroPoster from '../Assets/Gemini_Generated_Image_anzdlsanzdlsanzd.png';
import heroSystemIllustration from '../Assets/homepage-hero-handoff.webp';
import { ArrowRightIcon } from './Icons';

const HeroSystemPreview: React.FC = () => (
  <figure className="relative hidden h-[510px] xl:flex flex-col items-center justify-center">
    <div className="absolute inset-[16%] rounded-full bg-base/45 blur-3xl" aria-hidden="true" />
    <img
      src={heroSystemIllustration}
      alt="Illustrative Oberfläche mit Automatisierungs-Workflow, Dashboard und KI-Assistent"
      width={440}
      height={350}
      loading="eager"
      decoding="sync"
      className="relative z-10 w-full max-w-[440px] object-contain drop-shadow-[0_24px_42px_rgba(26,25,24,.10)]"
    />
    <figcaption className="relative z-10 mt-2 rounded-full border border-ink/10 bg-base/70 px-3 py-1 text-[0.6rem] tracking-[0.08em] text-muted backdrop-blur-sm">
      Illustrative Beispielansicht
    </figcaption>
  </figure>
);

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-14">
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
      <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-transparent to-base/50 pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 w-full">
        <div className="grid xl:grid-cols-[minmax(0,1fr)_420px] items-center gap-10 xl:gap-14">
          <div className="max-w-[790px] mx-auto xl:mx-0 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-base/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase text-ink mb-7">
              <span className="w-2 h-2 rounded-full bg-accent" />
              KI-Beratung & Implementierung für KMU
            </p>

            <h1 className="font-editorial text-[clamp(2.7rem,6.2vw,5.05rem)] font-normal leading-[0.98] tracking-[-0.035em] text-ink drop-shadow-[0_2px_14px_rgba(250,248,245,0.95)]">
              Wir bauen die Software,<br className="hidden sm:block" /> die{' '}
              <span className="hand-underline font-body font-extrabold tracking-[-0.045em]">
                Arbeit abnimmt.
              </span>
            </h1>

            <p className="mt-8 text-[clamp(1rem,2vw,1.22rem)] leading-relaxed text-muted font-body max-w-[660px] mx-auto">
              Automatisierungen, interne Tools, Dashboards und KI-Assistenten für KMU — vom abgegrenzten Prozess bis zur integrierten, überprüfbaren Lösung.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/#kontakt"
                className="brand-pill bg-ink text-white hover:bg-[#33312E] px-7 py-3.5 text-[0.98rem] w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <span>Prozess besprechen</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/#services"
                className="brand-pill bg-base/50 backdrop-blur-sm text-ink hover:bg-base px-7 py-3.5 text-[0.98rem] w-full sm:w-auto"
              >
                Lösungen entdecken
              </Link>
            </div>

            <p className="mt-4 text-xs text-light font-body">
              Kostenloses Erstgespräch · konkrete Einordnung statt Standard-Pitch
            </p>
          </div>

          <HeroSystemPreview />
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../Assets/Add_a_minimal_animation_to_the.mp4';
import heroPoster from '../Assets/Gemini_Generated_Image_anzdlsanzdlsanzd.png';

const HeroSystemPreview: React.FC = () => (
  <div className="relative hidden xl:block h-[510px]" aria-hidden="true">
    <div className="absolute inset-y-12 left-0 w-px bg-gradient-to-b from-transparent via-ink/10 to-transparent" />

    <div className="absolute right-2 top-2 w-[270px] rounded-[24px] border border-ink/10 bg-surface/90 backdrop-blur-xl p-4 shadow-card rotate-[0.5deg]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-[0.66rem] font-semibold tracking-[0.08em] text-ink">Automatisierungs-Workflow</p>
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="space-y-2.5">
        {[
          ['mail', 'Neue Anfrage erhalten', 'Webformular'],
          ['auto_awesome', 'Daten prüfen & anreichern', 'KI-Agent'],
          ['task_alt', 'Aufgabe erstellen', 'Projekt-Tool'],
        ].map(([icon, title, meta], index) => (
          <React.Fragment key={title}>
            <div className="rounded-[14px] border border-ink/10 bg-base/80 px-3 py-2.5 flex items-center gap-2.5 shadow-soft">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-ink">
                <span className="material-symbols-outlined text-[15px]">{icon}</span>
              </span>
              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold text-ink leading-tight">{title}</p>
                <p className="mt-0.5 text-[0.58rem] text-faint">{meta}</p>
              </div>
            </div>
            {index < 2 && (
              <div className="mx-auto h-3 w-px bg-ink/20 relative">
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] text-ink/30">⌄</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

    <div className="absolute left-0 bottom-4 w-[224px] rounded-[24px] border border-ink/10 bg-surface/90 backdrop-blur-xl p-4 shadow-card -rotate-[0.8deg]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.68rem] font-semibold text-ink">Dashboard</p>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-ink">
          <span className="material-symbols-outlined text-[14px]">monitoring</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-xl bg-base px-2.5 py-2 border border-ink/10">
          <p className="text-[0.55rem] text-faint">Offene Anfragen</p>
          <div className="mt-1 flex items-end gap-1">
            <span className="font-editorial text-[1.35rem] leading-none text-ink">24</span>
            <span className="text-[0.52rem] text-muted">↓ 12%</span>
          </div>
        </div>
        <div className="rounded-xl bg-base px-2.5 py-2 border border-ink/10">
          <p className="text-[0.55rem] text-faint">Bearbeitungszeit</p>
          <div className="mt-1 flex items-end gap-1">
            <span className="font-editorial text-[1.35rem] leading-none text-ink">2,4h</span>
            <span className="text-[0.52rem] text-muted">↓ 18%</span>
          </div>
        </div>
      </div>
      <p className="text-[0.55rem] text-faint mb-1.5">Prozessfortschritt</p>
      <svg viewBox="0 0 180 64" className="w-full h-[64px]" role="img" aria-label="Steigende Prozesskurve">
        <path d="M3 57 C25 50, 31 39, 49 42 S76 24, 91 31 S121 38, 139 19 S161 10,177 5" fill="none" stroke="#E3944C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M3 57 C25 50, 31 39, 49 42 S76 24, 91 31 S121 38, 139 19 S161 10,177 5 L177 63 L3 63 Z" fill="url(#hero-chart-fill)" />
        <defs>
          <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ECA867" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ECA867" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div className="absolute right-0 bottom-1 w-[190px] rounded-[24px] border border-ink/10 bg-surface/90 backdrop-blur-xl p-4 shadow-card rotate-[1deg]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[0.68rem] font-semibold text-ink">KI-Assistent</p>
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="ml-5 rounded-[14px] border border-ink/10 bg-base px-3 py-2.5 text-[0.59rem] leading-relaxed text-muted">
        Kannst du den Status von Anfrage #1287 prüfen?
      </div>
      <div className="mt-2 mr-4 rounded-[14px] bg-accent/10 px-3 py-2.5 text-[0.59rem] leading-relaxed text-ink border border-accent/20">
        Anfrage #1287 ist in Bearbeitung und voraussichtlich morgen abgeschlossen.
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-ink/10 bg-base px-3 py-2 text-[0.55rem] text-faint">
        <span className="truncate">Nachricht eingeben …</span>
        <span className="material-symbols-outlined ml-auto text-[13px] text-ink">send</span>
      </div>
    </div>

    <div className="absolute left-[42%] top-[44%] h-20 w-20 rounded-full bg-accent/10 blur-2xl" />
  </div>
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
                className="brand-pill bg-ink text-white hover:bg-[#33312E] px-7 py-3.5 text-[0.98rem] w-full sm:w-auto"
              >
                Prozess besprechen
                <span className="material-symbols-outlined text-[19px]" aria-hidden="true">arrow_forward</span>
              </Link>
              <Link
                to="/#services"
                className="brand-pill bg-base/50 backdrop-blur-sm text-ink hover:bg-base px-7 py-3.5 text-[0.98rem] w-full sm:w-auto"
              >
                Live-Demos testen
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

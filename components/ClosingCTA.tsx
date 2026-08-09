import React from 'react';
import { ContactForm } from './ContactForm';

export const ClosingCTA: React.FC = () => (
  <section id="kontakt" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <div className="relative overflow-hidden rounded-[32px] bg-accent px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 shadow-card">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border-[42px] border-white/20 pointer-events-none" aria-hidden="true" />
        <div className="absolute -left-16 -bottom-24 w-64 h-64 rounded-full border-[34px] border-ink/10 pointer-events-none" aria-hidden="true" />

        <div className="relative grid lg:grid-cols-[.82fr_1.18fr] gap-10 lg:gap-16 items-start">
          <div className="lg:pt-2">
            <p className="text-xs uppercase tracking-[0.14em] font-bold text-ink/65 mb-3">Erstgespräch</p>
            <h2 className="font-editorial text-[clamp(2.45rem,5vw,3.8rem)] leading-[1.02] tracking-[-0.03em] text-ink font-normal">
              30 Minuten.<br />Ihre Situation.<br />Unsere Einschätzung.
            </h2>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed mt-5 max-w-md">
              Erzählen Sie uns kurz, wo Arbeit hängen bleibt oder wo Sie KI sinnvoll einsetzen möchten. Wir sagen konkret, was machbar ist — und was nicht.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Kostenlos', 'Unverbindlich', 'Ohne Buzzwords'].map((item) => (
                <span key={item} className="rounded-full border border-ink/20 bg-base/35 px-3 py-1.5 text-xs font-semibold text-ink/75">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="brand-card bg-base/90 p-5 md:p-7 lg:p-8 backdrop-blur-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);

import React from 'react';
import { ContactForm } from './ContactForm';

export const ClosingCTA: React.FC = () => (
  <section id="kontakt" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <div className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-accent px-5 py-9 sm:px-6 md:px-12 md:py-14 lg:px-16 lg:py-16">

        <div className="relative grid lg:grid-cols-[.82fr_1.18fr] gap-10 lg:gap-16 items-start">
          <div className="lg:pt-2">
            <p className="text-xs uppercase tracking-[0.14em] font-bold text-ink/65 mb-3">Nächster Schritt</p>
            <h2 className="font-editorial text-[clamp(2.45rem,5vw,3.8rem)] leading-[1.02] tracking-[-0.03em] text-ink font-normal">
              Ihr Prozess.<br />Unsere technische Einordnung.
            </h2>
            <p className="text-sm md:text-base text-ink/70 leading-relaxed mt-5 max-w-md">
              Beschreiben Sie kurz, wo Arbeit hängen bleibt. Wir ordnen ein, welche Lösung passen könnte, welche Informationen fehlen — und ob ein Projekt sinnvoll ist.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Konkreter Prozess', 'Offene Annahmen', 'Kein KI-Zwang'].map((item) => (
                <span key={item} className="rounded-full border border-ink/20 bg-base/35 px-3 py-1.5 text-xs font-semibold text-ink/75">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="brand-card bg-base/[.92] p-5 md:p-7 lg:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>
);

import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[85vh] flex items-end md:items-center pt-16 pb-12u md:pb-0 px-6 md:px-8 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="max-w-3xl space-y-0">
          <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-6">
            KI-Systeme für den Mittelstand
          </p>

          <h1 className="font-editorial text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] text-ink">
            Von der Prozessfrage{' '}
            <br className="hidden lg:block" />
            zum nutzbaren{' '}
            <br className="hidden lg:block" />
            KI-System.
          </h1>

          <div className="w-16 h-px bg-accent mt-8 mb-6" />

          <p className="text-base text-muted font-body leading-relaxed max-w-md">
            Wir analysieren Engpässe, bauen integrierte digitale Systeme und machen Wirkung
            messbar. Für Teams, die keine KI-Spielerei, sondern einen kontrollierbaren nächsten Schritt brauchen.
          </p>

          <div className="mt-8">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-sm text-accent font-body group"
            >
              <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                Leistungsmodell ansehen
              </span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
            <p className="text-xs text-faint font-body mt-2">Verstehen → Bauen → Messen</p>
          </div>
        </div>
      </div>
    </section>
  );
};

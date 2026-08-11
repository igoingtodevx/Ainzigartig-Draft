import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[78vh] flex items-end md:items-center pt-28 pb-16u px-6 md:px-8 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="max-w-3xl space-y-0">
          <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-6">
            KI & Software für den Mittelstand
          </p>

          <h1 className="font-editorial text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] text-ink">
            Weniger Reibung im Betrieb.{' '}
            <br className="hidden lg:block" />
            Mit Software und KI,{' '}
            <br className="hidden lg:block" />
            die wirklich mitarbeiten.
          </h1>

          <div className="w-16 h-px bg-accent mt-8 mb-6" />

          <p className="text-base text-muted font-body leading-relaxed max-w-md">
            Wir entwickeln Automatisierungen, interne Tools und Wissenssysteme für konkrete Engpässe – passend zu Ihren Abläufen, Daten und bestehenden Systemen.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <Link
              to="/#kontakt"
              className="inline-flex items-center gap-2 text-sm text-accent font-body group"
            >
              <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                Engpass besprechen
              </span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
            <Link to="/#beispiele" className="text-sm text-muted hover:text-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Demos & Systeme ansehen</Link>
          </div>
          <p className="text-xs text-faint font-body mt-3">30 Minuten · kostenfrei · klare Einschätzung statt Verkaufsshow</p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';

export const ClosingCTA: React.FC = () => {
  return (
    <section className="py-16u md:py-[160px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-xl">
          <p className="font-editorial text-2xl md:text-3xl lg:text-[2.5rem] text-ink leading-[1.2]">
            30 Minuten. Ihre Situation.{' '}
            <br className="hidden md:block" />
            Unsere Einschätzung. Kein Pitch.
          </p>

          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-accent font-body group"
            >
              <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                Gespräch vereinbaren
              </span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

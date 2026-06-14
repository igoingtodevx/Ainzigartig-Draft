import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-base text-ink font-body">
      <RouteMeta
        title="404 – Seite nicht gefunden | Ainzigartig"
        description="Die gesuchte Seite existiert nicht."
      />
      <section className="pt-32 pb-24 px-6 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-editorial text-[clamp(5rem,15vw,9rem)] leading-none text-faint mb-4">
            404
          </p>
          <h1 className="font-editorial text-2xl md:text-3xl text-ink mb-4">
            Seite nicht gefunden.
          </h1>
          <p className="text-sm text-muted font-body leading-relaxed mb-10">
            Diese Seite existiert nicht oder wurde verschoben.
            Vielleicht hilft einer der folgenden Wege weiter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Zur Startseite
            </Link>
            <Link
              to="/ki-analyse"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-faint/30 text-sm text-muted hover:border-ink/30 transition-colors"
            >
              Kostenlose KI-Analyse starten
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

export const Projects: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta
      title="Projekte | Ainzigartig"
      description="Ausgewählte KI-Projekte und Experimente aus der Ainzigartig Werkstatt."
    />

    <div className="max-w-[1140px] mx-auto">
      <header className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-14 items-end mb-16 md:mb-20">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Aus der Werkstatt</p>
          <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.035em] font-normal">
            Was wir bauen,<br />bevor wir es verkaufen.
          </h1>
        </div>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl lg:pb-2">
          Dieser Bereich wird gerade neu kuratiert. Hier sollen nur Projekte stehen, die wir fachlich sauber einordnen und öffentlich auch wirklich zeigen möchten.
        </p>
      </header>

      <section className="border-y border-ink/12 py-12 md:py-16 grid md:grid-cols-[.7fr_1.3fr] gap-8 md:gap-16 items-start">
        <div>
          <span className="font-editorial text-[4rem] leading-none text-accent-mid">01</span>
        </div>
        <div className="max-w-2xl">
          <h2 className="font-editorial text-3xl md:text-4xl leading-tight mb-4">Kuratiert statt vollgestopft.</h2>
          <p className="text-base text-muted leading-relaxed mb-7">
            Die bisherige automatische Repo-Liste ist entfernt. Sobald die Auswahl feststeht, kommen hier nur nachvollziehbare eigene Tools, Experimente und veröffentlichbare Arbeiten hinein — mit korrekter Beschreibung und eindeutigem Status.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/live-demo" className="brand-pill bg-ink text-white hover:bg-[#33312E] text-sm">
              Live Demo ansehen
            </Link>
            <Link to="/ki-analyse" className="brand-pill bg-transparent text-ink text-sm">
              KI-Check testen
            </Link>
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default Projects;

import React, { useEffect, useState } from 'react';
import { RouteMeta } from './RouteMeta';

interface Project {
  name: string;
  url: string;
  language: string | null;
  stars: number;
  pushed_at: string;
  category: string;
  tagline: string;
  status: 'live' | 'beta' | 'archived';
  live_url: string;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  live: 'live',
  beta: 'beta',
  archived: 'archiviert',
};

function nameToTitle(name: string): string {
  return name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function timeAgo(iso: string): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.max(0, Math.floor(ms / 86_400_000));
  if (days < 7) return `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks} ${weeks === 1 ? 'Woche' : 'Wochen'}`;
  const months = Math.floor(days / 30);
  if (months < 18) return `${months} ${months === 1 ? 'Monat' : 'Monate'}`;
  return `${Math.floor(days / 365)} Jahre`;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/projects')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) setError(data.error);
        else setProjects(data.projects);
      })
      .catch((e) => {
        if (!cancelled) setError(`Verbindung fehlgeschlagen: ${String(e).slice(0, 120)}`);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
      <RouteMeta title="Projekte | Ainzigartig" description="Ausgewählte KI-Projekte und Experimente aus der Ainzigartig Werkstatt." />
      <div className="max-w-[1140px] mx-auto">
        <header className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 lg:gap-14 items-end mb-14 md:mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Aus der Werkstatt</p>
            <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.035em] font-normal">
              Was wir bauen,<br />bevor wir es verkaufen.
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl lg:pb-2">
            Öffentliche Tools, Experimente und Systeme aus unserer eigenen Arbeit. Der Status steht jeweils dabei — live, beta oder archiviert.
          </p>
        </header>

        {error && (
          <div className="brand-card bg-surface p-6">
            <p className="text-sm text-muted">Projekte konnten nicht geladen werden: {error}</p>
          </div>
        )}

        {!projects && !error && (
          <div className="grid md:grid-cols-2 gap-5">
            {[0, 1, 2, 3].map((index) => <div key={index} className="brand-card bg-surface-soft h-[300px] animate-pulse" />)}
          </div>
        )}

        {projects && projects.length === 0 && !error && (
          <div className="brand-card bg-surface p-6"><p className="text-sm text-muted">Aktuell keine Projekte freigegeben.</p></div>
        )}

        {projects && projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <article key={project.name} className="brand-card group bg-surface p-6 md:p-7 min-h-[310px] flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="font-editorial text-4xl text-accent-mid tabular leading-none">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{project.category}</span>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.1em] font-semibold ${project.status === 'live' ? 'border-accent/50 bg-accent/15 text-ink' : 'border-ink/15 bg-base text-muted'}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl md:text-[1.8rem] leading-tight text-ink group-hover:text-accent-hover transition-colors">
                  {nameToTitle(project.name)}
                </h2>
                <p className="text-sm text-muted leading-relaxed mt-3 flex-grow">{project.tagline}</p>

                <div className="mt-7 pt-5 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-[0.72rem] text-light">
                    {project.language && <span>{project.language}</span>}
                    <span>aktualisiert vor {timeAgo(project.pushed_at)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-ink hover:text-accent-hover transition-colors inline-flex items-center gap-1.5">
                        Demo <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <a href={project.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-muted hover:text-ink transition-colors inline-flex items-center gap-1.5">
                      Details <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-ink/10 pt-7 max-w-2xl">
          <p className="text-sm text-muted leading-relaxed">
            Keine erfundenen Kundenreferenzen: Hier zeigen wir nur Arbeit, die tatsächlich existiert, und kennzeichnen ihren aktuellen Status offen.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Projects;

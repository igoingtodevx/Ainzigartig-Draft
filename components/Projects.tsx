import React, { useEffect, useState } from 'react';
import { RouteMeta } from './RouteMeta';

/* ───────────────────────────────────────────────────────────────────────────
   Projects — Ausgewählte Projekte, im selben Anwaltskanzlei-Look wie der
   ROI-Rechner. Kein "Repo"-Jargon, agency-freundlich.

   Daten kommen von /api/projects (Vercel Function → GitHub API, kuratiert).
   Lädt einmal beim Mount, sonst stiller Static-Cache.
   ─────────────────────────────────────────────────────────────────────────── */

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
  // industry-watcher → "Industry Watcher", get-shit-done → "Get Shit Done"
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function timeAgo(iso: string): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
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
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setError(data.error);
        } else {
          setProjects(data.projects);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(`Verbindung fehlgeschlagen: ${String(e).slice(0, 120)}`);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16u md:py-24 px-6 md:px-8">
      <RouteMeta title="Projekte | Ainzigartig" description="Unsere aktuellen KI-Projekte auf GitHub." />
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mb-12u md:mb-16u">
          <p className="text-xs font-body uppercase tracking-[0.18em] text-muted mb-4u">
            Aus der Werkstatt
          </p>
          <h1 className="font-editorial text-3xl md:text-5xl text-ink leading-[1.1] mb-4u">
            Was wir bauen, bevor wir es verkaufen.
          </h1>
          <p className="text-base text-muted font-body leading-relaxed">
            Jedes Projekt entsteht aus einem realen Problem — entweder für
            unsere Kunden oder für uns selbst. Hier sind die, die wir öffentlich
            zeigen. Jedes einzelne läuft live, ist ehrlich benannt und darf
            kritisiert werden.
          </p>
        </div>

        {error && (
          <div className="border border-faint bg-surface p-6u rounded">
            <p className="text-sm text-muted font-body">
              Projekte konnten nicht geladen werden: {error}
            </p>
          </div>
        )}

        {!projects && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4u">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-faint/50 bg-surface/30 p-6u rounded h-[280px] animate-pulse"
              />
            ))}
          </div>
        )}

        {projects && projects.length === 0 && !error && (
          <p className="text-sm text-muted font-body">
            Aktuell keine Projekte freigegeben.
          </p>
        )}

        {projects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4u">
            {projects.map((p) => (
              <article
                key={p.name}
                className="group border border-faint/60 hover:border-accent/60 bg-transparent p-6u rounded transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3u">
                  <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted">
                    {p.category}
                  </span>
                  <span
                    className={`text-[10px] font-body uppercase tracking-[0.12em] px-2 py-1 rounded-sm border ${
                      p.status === 'live'
                        ? 'border-accent/40 text-accent'
                        : 'border-faint text-muted'
                    }`}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl md:text-3xl text-ink leading-tight mb-3u group-hover:text-accent transition-colors duration-300">
                  {nameToTitle(p.name)}
                </h2>

                <p className="text-sm text-muted font-body leading-relaxed mb-6u flex-grow">
                  {p.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-x-6u gap-y-2u text-xs font-body text-faint">
                  {p.language && (
                    <span className="text-muted">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-faint mr-2 align-middle" />
                      {p.language}
                    </span>
                  )}
                  <span>aktualisiert vor {timeAgo(p.pushed_at)}</span>
                </div>

                <div className="mt-4u pt-4u border-t border-faint/40 flex flex-wrap items-center gap-x-6u gap-y-2u">
                  {p.live_url && (
                    <a
                      href={p.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-accent font-body group/link inline-flex items-center gap-2"
                    >
                      <span className="underline decoration-1 underline-offset-4 group-hover/link:decoration-2 transition-all duration-200">
                        Demo ansehen
                      </span>
                      <span
                        className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </a>
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted hover:text-ink font-body inline-flex items-center gap-2 group/detail"
                  >
                    <span className="underline decoration-1 underline-offset-4 group-hover/detail:decoration-2 transition-all duration-200">
                      Mehr erfahren
                    </span>
                    <span
                      className="transition-transform duration-200 group-hover/detail:translate-x-0.5"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16u pt-6u border-t border-faint/40 max-w-xl">
          <p className="text-sm text-muted font-body leading-relaxed">
            Wir zeigen nur, was tatsächlich gebaut wurde. Keine Mockups, keine
            Konzepte, keine Versprechen. Wenn ein Projekt hier auftaucht, läuft
            es irgendwo live.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;

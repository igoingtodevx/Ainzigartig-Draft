import React, { useEffect, useState } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   InsightsTeaser — Kompakter 1-Section-Appetithappen für die Home-Page.
   Zeigt nur Headline + Issue-Nummer + 1 Trend. Link führt zu /insights
   (voller Watcher-Light-Embed) und von dort zur Sub-Site.

   Lazy-loaded via eigenem useEffect, kein Skeleton-Flicker (sanftes Fade-in).
   ─────────────────────────────────────────────────────────────────────────── */

interface Trend { title: string; signal: string; what: string; }
interface Brief { headline: string; trends: Trend[]; }
interface Payload {
  generated_at: string;
  vertical: string;
  issue: Brief;
}

function issueWeek(iso: string): string {
  if (!iso) return '?';
  const d = new Date(iso);
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const week = 1 + Math.round(
    ((target.valueOf() - firstThursday.valueOf()) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7
  );
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

function timeAgo(iso: string): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days < 1) return 'heute';
  if (days === 1) return 'gestern';
  if (days < 7) return `vor ${days} Tagen`;
  return `vor ${Math.floor(days / 7)} Wochen`;
}

const SIGNAL_DOT: Record<string, string> = {
  hoch: '●', mittel: '◐', niedrig: '○',
};

export const InsightsTeaser: React.FC = () => {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/insights')
      .then((r) => r.json())
      .then((p) => { if (!cancelled && !p.error) setData(p); })
      .catch(() => { /* silent — teaser is non-essential */ });
    return () => { cancelled = true; };
  }, []);

  if (!data) return null; // no flicker, just nothing

  const topTrend = data.issue.trends?.[0];
  const sig = (topTrend?.signal || '').toLowerCase();
  const dot = SIGNAL_DOT[sig] || '◐';

  return (
    <section className="py-12u md:py-16u px-6 md:px-8 bg-surface/40 border-y border-faint/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6u">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3u gap-y-1u mb-3u">
              <span className="text-[10px] font-body uppercase tracking-[0.18em] text-ink">
                Diese Woche · № {issueWeek(data.generated_at)}
              </span>
              <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted">
                {timeAgo(data.generated_at)}
              </span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl text-ink leading-[1.15] mb-3u max-w-3xl">
              {data.issue.headline}
            </h2>
            {topTrend && (
              <p className="text-sm text-muted font-body leading-relaxed max-w-2xl">
                <span className="text-ink mr-2" title={`Signal: ${topTrend.signal}`}>{dot}</span>
                {topTrend.title}
              </p>
            )}
          </div>
          <a
            href="/insights"
            className="text-sm text-accent font-body group inline-flex items-center gap-2 self-start md:self-end shrink-0"
          >
            <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
              Alle Trends & Opportunities
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InsightsTeaser;

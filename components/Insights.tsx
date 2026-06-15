import React, { useEffect, useState } from 'react';
import { RouteMeta } from './RouteMeta';

/* ───────────────────────────────────────────────────────────────────────────
   Insights — Watcher-Light-Embed auf ainzigartig.
   Zeigt den aktuellen Industry-Watcher-Brief als Appetithappen: Headline,
   3 Trends, 2 Opportunities. Link führt zur polierten Sub-Site.

   Daten kommen von /api/insights (Vercel Function → proxy auf
   ai-industry-watcher.vercel.app, 1h Cache, Stale-Fallback 1d).

   Visuelle Sprache:
   - Ainzigartig-Look: Fraunces (editorial), IBM Plex Sans (body),
     Cream-Background, Akzent-Grün (#1B4D3E)
   - Monochrome Signal-Hierarchie ●/◐/○ (konsistent mit Sub-Site Phase A)
   - Keine Emoji, kein JP
   ─────────────────────────────────────────────────────────────────────────── */

interface Trend {
  title: string;
  signal: string;     // "hoch" | "mittel" | "niedrig"
  what: string;
}

interface Opportunity {
  title: string;
  what: string;
  price: string;
  how: string;
}

interface Brief {
  headline: string;
  subheadline: string;
  executive_summary: string;
  trends: Trend[];
  opportunities: Opportunity[];
}

interface InsightsPayload {
  generated_at: string;
  vertical: string;
  model: string;
  issue_url: string;
  issue: Brief;
}

const SIGNAL_CLASS: Record<string, string> = {
  hoch: 'bg-ink text-base',
  mittel: 'border border-ink/40 text-ink/70',
  niedrig: 'border border-faint text-muted',
};

const SIGNAL_DOT: Record<string, string> = {
  hoch: '●',
  mittel: '◐',
  niedrig: '○',
};

function timeAgo(iso: string): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days < 1) return 'heute';
  if (days === 1) return 'gestern';
  if (days < 7) return `vor ${days} Tagen`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return 'vor 1 Woche';
  if (weeks < 8) return `vor ${weeks} Wochen`;
  const months = Math.floor(days / 30);
  return `vor ${months} ${months === 1 ? 'Monat' : 'Monaten'}`;
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

export const Insights: React.FC = () => {
  const [data, setData] = useState<InsightsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/insights')
      .then((r) => r.json())
      .then((payload) => {
        if (cancelled) return;
        if (payload.error) {
          setError(payload.error);
        } else {
          setData(payload);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(`Verbindung fehlgeschlagen: ${String(e).slice(0, 120)}`);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-16u md:py-24 px-6 md:px-8">
      <RouteMeta
        title="Insights | Ainzigartig"
        description="Wöchentliche KI-Branchen-Analyse: Trends, Opportunities und Action Items für den deutschen Mittelstand."
      />
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mb-12u md:mb-16u">
          <p className="text-xs font-body uppercase tracking-[0.18em] text-muted mb-4u">
            Intelligence Briefing
          </p>
          <h1 className="font-editorial text-3xl md:text-5xl text-ink leading-[1.1] mb-4u">
            Was diese Woche in der KI-Branche zählt.
          </h1>
          <p className="text-base text-muted font-body leading-relaxed">
            Jede Woche kuratieren wir 9 Quellen (Heise, Golem, The Decoder,
            t3n, The Verge u.a.) per LLM zu einem knappen Briefing. Hier ist
            die Kurzfassung — die volle Analyse mit Preisen, Quellen und
            Action Items liegt auf der{' '}
            <a
              href="https://ai-industry-watcher.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-accent underline decoration-1 underline-offset-4 hover:decoration-2 transition-all"
            >
              Watcher-Sub-Site
            </a>
            .
          </p>
        </div>

        {error && (
          <div className="border border-faint bg-surface p-6u rounded">
            <p className="text-sm text-muted font-body">
              Insights konnten nicht geladen werden: {error}
            </p>
            <p className="text-xs text-muted font-body mt-2u">
              Schau direkt auf{' '}
              <a
                href="https://ai-industry-watcher.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline decoration-1 underline-offset-4"
              >
                ai-industry-watcher.vercel.app
              </a>
              .
            </p>
          </div>
        )}

        {!data && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4u">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-faint/50 bg-surface/30 p-6u rounded h-[180px] animate-pulse"
              />
            ))}
          </div>
        )}

        {data && (
          <>
            {/* Headline-Block — die "Was zählt"-Story */}
            <div className="border-t-2 border-ink pt-6u pb-12u mb-12u">
              <div className="flex flex-wrap items-baseline gap-x-4u gap-y-2u mb-6u">
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-ink">
                  № {issueWeek(data.generated_at)}
                </span>
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted">
                  {data.vertical || '—'}
                </span>
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted">
                  {timeAgo(data.generated_at)}
                </span>
              </div>
              <h2 className="font-editorial text-2xl md:text-4xl text-ink leading-[1.15] mb-4u">
                {data.issue.headline}
              </h2>
              {data.issue.subheadline && (
                <p className="text-base md:text-lg text-muted font-body leading-relaxed max-w-3xl">
                  {data.issue.subheadline}
                </p>
              )}
            </div>

            {/* Trends — 3-spaltig (wraps for 7-9 trends) */}
            <div className="mb-12u">
              <div className="flex items-baseline gap-3 mb-6u">
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-ink">01</span>
                <h3 className="font-editorial text-xl md:text-2xl text-ink">
                  Trends
                </h3>
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted ml-auto">
                  {data.issue.trends.length} Trends · signalgewichtet
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4u">
                {data.issue.trends.map((t, i) => {
                  const sig = (t.signal || '').toLowerCase();
                  const cls = SIGNAL_CLASS[sig] || SIGNAL_CLASS.mittel;
                  const dot = SIGNAL_DOT[sig] || SIGNAL_DOT.mittel;
                  return (
                    <article
                      key={i}
                      className="border border-faint/60 hover:border-accent/60 bg-transparent p-5u rounded transition-colors duration-300 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3u">
                        <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted tabular">
                          Trend {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-[10px] font-body uppercase tracking-[0.12em] px-2 py-1 rounded-sm ${cls}`}
                          title={`Signal: ${t.signal}`}
                        >
                          {dot} {sig || 'mittel'}
                        </span>
                      </div>
                      <h4 className="font-editorial text-lg text-ink leading-[1.25] mb-3u flex-grow">
                        {t.title}
                      </h4>
                      <p className="text-sm text-muted font-body leading-relaxed mb-3u">
                        {t.what}
                      </p>
                      {t.why && (
                        <p className="text-xs text-ink/70 font-body leading-relaxed border-t border-faint/40 pt-3u">
                          <strong className="text-ink">Mittelstand:</strong> {t.why}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Opportunities — 2-spaltig (wraps for 6-8 opps) */}
            <div className="mb-12u">
              <div className="flex items-baseline gap-3 mb-6u">
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-ink">02</span>
                <h3 className="font-editorial text-xl md:text-2xl text-ink">
                  Opportunities
                </h3>
                <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted ml-auto">
                  {data.issue.opportunities.length} Marktbedarfe · Preisindikation
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4u">
                {data.issue.opportunities.map((o, i) => {
                  const sig = (o.how || '').toLowerCase();
                  const cls = SIGNAL_CLASS[sig] || SIGNAL_CLASS.mittel;
                  const dot = SIGNAL_DOT[sig] || SIGNAL_DOT.mittel;
                  return (
                    <article
                      key={i}
                      className="border-l-2 border-accent bg-surface/40 p-5u pl-6u"
                    >
                      <h4 className="font-editorial text-lg text-ink leading-[1.25] mb-3u">
                        {o.title}
                      </h4>
                      <p className="text-sm text-muted font-body leading-relaxed mb-3u">
                        {o.what}
                      </p>
                      {o.who && (
                        <p className="text-xs text-muted font-body leading-relaxed mb-3u">
                          <strong className="text-ink">Zielgruppe:</strong> {o.who}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-x-4u gap-y-2u pt-3u border-t border-faint/40">
                        <div className="flex-1 min-w-[120px]">
                          <span className="text-[10px] font-body uppercase tracking-[0.12em] text-muted block">
                            Preis
                          </span>
                          <span className="text-sm text-ink font-body font-medium">
                            {o.price || '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-body uppercase tracking-[0.12em] text-muted block">
                            Time-to-Market
                          </span>
                          <span className="text-sm text-ink font-body font-medium">
                            {o.time_to_market || 'Wochen'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-body uppercase tracking-[0.12em] text-muted block">
                            Umsetzbarkeit
                          </span>
                          <span
                            className={`text-[10px] font-body uppercase tracking-[0.12em] px-2 py-1 rounded-sm ${cls}`}
                          >
                            {dot} {o.how || 'mittel'}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Top Articles — numbered list */}
            {data.issue.top_articles && data.issue.top_articles.length > 0 && (
              <div className="mb-12u">
                <div className="flex items-baseline gap-3 mb-6u">
                  <span className="text-[10px] font-body uppercase tracking-[0.18em] text-ink">03</span>
                  <h3 className="font-editorial text-xl md:text-2xl text-ink">
                    Quellen & Artikel
                  </h3>
                  <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted ml-auto">
                    Top {data.issue.top_articles.length} der Woche
                  </span>
                </div>
                <div className="border-t border-ink">
                  {data.issue.top_articles.map((a, i) => (
                    <article
                      key={i}
                      className="border-b border-faint/30 py-5u grid grid-cols-[40px_1fr] gap-4u hover:bg-surface/30 transition-colors duration-200"
                    >
                      <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted tabular pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-editorial text-base text-ink leading-[1.3] mb-2u">
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors duration-200"
                          >
                            {a.title}
                          </a>
                        </h4>
                        <div className="text-[10px] font-body uppercase tracking-[0.12em] text-muted mb-2u">
                          {a.source} {a.date && `· ${a.date}`}
                        </div>
                        {a.why && (
                          <p className="text-sm text-muted font-body leading-relaxed">
                            {a.why}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Action Items */}
            {data.issue.action_items && data.issue.action_items.length > 0 && (
              <div className="mb-12u">
                <div className="flex items-baseline gap-3 mb-6u">
                  <span className="text-[10px] font-body uppercase tracking-[0.18em] text-ink">04</span>
                  <h3 className="font-editorial text-xl md:text-2xl text-ink">
                    Diese Woche tun
                  </h3>
                  <span className="text-[10px] font-body uppercase tracking-[0.18em] text-muted ml-auto">
                    {data.issue.action_items.length} konkrete Schritte
                  </span>
                </div>
                <ol className="border-t-2 border-ink">
                  {data.issue.action_items.map((a, i) => (
                    <li
                      key={i}
                      className="border-b border-faint/30 py-4u pl-12u relative font-editorial text-base text-ink leading-[1.5]"
                    >
                      <span className="absolute left-0 top-4u font-mono text-[10px] text-muted tabular">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {a}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* CTA zur Sub-Site */}
            <div className="border-t border-faint/40 pt-8u mt-12u flex flex-wrap items-center gap-x-8u gap-y-4u">
              <a
                href={data.issue_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base text-accent font-body group"
              >
                <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                  Vollständigen Brief lesen
                </span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                  →
                </span>
              </a>
              <span className="text-sm text-muted font-body">
                mit {data.issue.opportunities.length + 2} weiteren Opportunities, allen Quellen und Action Items.
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Insights;

import React, { useEffect, useState } from 'react';
import { RouteMeta } from './RouteMeta';

type Trend = {
  title: string;
  signal?: string;
  what?: string;
  why?: string;
};

type Opportunity = {
  title: string;
  what?: string;
  who?: string;
};

type Article = {
  title: string;
  url?: string;
  source?: string;
  date?: string;
  why?: string;
};

type Brief = {
  headline: string;
  subheadline?: string;
  executive_summary?: string;
  trends?: Trend[];
  opportunities?: Opportunity[];
  top_articles?: Article[];
  action_items?: string[];
};

type InsightsPayload = {
  generated_at?: string;
  vertical?: string;
  model?: string;
  issue_url?: string;
  source_url?: string;
  freshness?: 'fresh' | 'stale' | 'cached';
  is_stale?: boolean;
  warning?: string;
  disclosure?: string;
  issue: Brief;
};

const WATCHER_URL = 'https://ai-industry-watcher.vercel.app';

function formatDate(iso?: string) {
  if (!iso) return 'Aktuelle Ausgabe';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Aktuelle Ausgabe';
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function signalLabel(signal?: string) {
  const value = (signal || 'mittel').toLowerCase();
  if (value === 'hoch') return 'Hohes Signal';
  if (value === 'niedrig') return 'Frühes Signal';
  return 'Mittleres Signal';
}

export const Insights: React.FC = () => {
  const [data, setData] = useState<InsightsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/insights')
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        if (cancelled) return;
        if (!payload || payload.error || !payload.issue) {
          setFailed(true);
          return;
        }
        setData(payload);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const brief = data?.issue;
  const trends = brief?.trends || [];
  const opportunities = brief?.opportunities || [];
  const articles = brief?.top_articles || [];
  const actionItems = brief?.action_items || [];

  return (
    <main className="min-h-screen bg-base text-ink font-body pt-32 pb-24">
      <RouteMeta
        title="Insights | Ainzigartig"
        description="Das aktuelle KI-Briefing aus unserem Industry Watcher."
      />

      <section className="px-6">
        <div className="max-w-[1140px] mx-auto">
          <header className="border-b border-ink/15 pb-14 md:pb-20">
            <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-20 items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-light mb-5">
                  Intelligence Briefing
                </p>
                <p className="font-editorial text-[clamp(3.2rem,7vw,6.7rem)] leading-[.9] tracking-[-.045em] text-accent-mid">
                  AI
                </p>
                <p className="font-editorial text-[clamp(2.2rem,4.8vw,4.5rem)] leading-[.95] tracking-[-.035em] mt-1">
                  Industry Watcher
                </p>
              </div>

              <div className="max-w-2xl lg:pb-2">
                <p className="text-base md:text-lg text-muted leading-relaxed mb-6">
                  Hier zeigen wir ein automatisch erzeugtes externes Briefing. Es ist weder ein redaktionell verifizierter Ainzigartig-Report noch eine Handlungs- oder Investitionsempfehlung; Datum und Primärquellen müssen vor Verwendung geprüft werden.
                </p>
                <a
                  href={WATCHER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink border-b border-ink pb-1 hover:text-accent-hover hover:border-accent-hover transition-colors"
                >
                  Vollständigen Watcher öffnen <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </header>

          {loading && (
            <div className="py-20 border-b border-ink/15">
              <p className="text-xs uppercase tracking-[0.16em] text-light mb-6">Ausgabe wird geladen</p>
              <div className="space-y-4 max-w-4xl">
                <div className="h-12 bg-ink/5 rounded-full animate-pulse" />
                <div className="h-12 w-4/5 bg-ink/5 rounded-full animate-pulse" />
                <div className="h-5 w-2/3 bg-ink/5 rounded-full animate-pulse mt-8" />
              </div>
            </div>
          )}

          {failed && !loading && (
            <div className="py-16 md:py-20 border-b border-ink/15 grid md:grid-cols-[.7fr_1.3fr] gap-8 md:gap-16">
              <span className="font-editorial text-6xl text-accent-mid">01</span>
              <div className="max-w-2xl">
                <h1 className="font-editorial text-3xl md:text-4xl leading-tight mb-4">Der Brief ist gerade nicht eingebettet.</h1>
                <p className="text-base text-muted leading-relaxed mb-6">
                  Die Quelle konnte nicht verlässlich eingebettet werden und es liegt kein kurzer, klar gekennzeichneter Cache vor. Deshalb zeigen wir keine alte Ersatz-Ausgabe als aktuell an.
                </p>
                <a href={WATCHER_URL} target="_blank" rel="noreferrer" className="brand-pill bg-ink text-white text-sm">
                  Quelle direkt prüfen ↗
                </a>
              </div>
            </div>
          )}

          {brief && !loading && (
            <>
              {data?.is_stale && (
                <div className="mt-8 rounded-[22px] border border-[#B77A36]/35 bg-accent/12 p-5 text-sm text-muted leading-relaxed" role="status">
                  <strong className="text-ink">Aktualitätshinweis:</strong> {data.warning || `Diese Ausgabe ist als ${data.freshness === 'cached' ? 'Cache' : 'veraltet'} gekennzeichnet. Aussagen und Quellen vor Verwendung erneut prüfen.`}
                </div>
              )}
              <section className="py-16 md:py-24 border-b border-ink/15">
                <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-20">
                  <aside className="space-y-7">
                    <div>
                      <p className="text-[.68rem] uppercase tracking-[0.16em] font-semibold text-light mb-1">Ausgabe</p>
                      <p className="text-sm text-ink">{formatDate(data?.generated_at)}</p>
                    </div>
                    {data?.vertical && (
                      <div>
                        <p className="text-[.68rem] uppercase tracking-[0.16em] font-semibold text-light mb-1">Fokus</p>
                        <p className="text-sm text-ink max-w-xs">{data.vertical}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[.68rem] uppercase tracking-[0.16em] font-semibold text-light mb-1">Status</p>
                      <p className="text-sm text-ink">{data?.freshness === 'fresh' ? 'Live-Quelle · innerhalb 14 Tagen' : data?.freshness === 'cached' ? 'Zwischengespeicherte Ausgabe' : 'Ältere Live-Ausgabe'}</p>
                    </div>
                    <div>
                      <p className="text-[.68rem] uppercase tracking-[0.16em] font-semibold text-light mb-1">Umfang</p>
                      <p className="text-sm text-ink">{trends.length} Trends · {opportunities.length} Opportunities</p>
                    </div>
                  </aside>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] font-semibold text-accent-hover mb-5">Was jetzt zählt</p>
                    <h1 className="font-editorial text-[clamp(2.5rem,5vw,4.7rem)] leading-[1.02] tracking-[-.03em] mb-7">
                      {brief.headline}
                    </h1>
                    {brief.subheadline && (
                      <p className="font-editorial text-xl md:text-2xl leading-relaxed text-muted max-w-3xl mb-7">
                        {brief.subheadline}
                      </p>
                    )}
                    {brief.executive_summary && (
                      <p className="text-base md:text-lg text-muted leading-[1.8] max-w-3xl">
                        {brief.executive_summary}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {trends.length > 0 && (
                <section className="py-16 md:py-24 border-b border-ink/15">
                  <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] font-semibold text-light mb-2">01 · Signals</p>
                      <h2 className="font-editorial text-4xl md:text-5xl">Trends</h2>
                    </div>
                    <span className="hidden sm:block text-xs uppercase tracking-[0.14em] text-light">{trends.length} Beobachtungen</span>
                  </div>

                  <div className="border-t border-ink/30">
                    {trends.map((trend, index) => (
                      <article
                        key={`${trend.title}-${index}`}
                        className="grid md:grid-cols-[90px_1fr_180px] gap-4 md:gap-8 py-8 md:py-10 border-b border-ink/12 items-start group"
                      >
                        <span className="font-editorial text-3xl text-accent-mid leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="max-w-3xl">
                          <h3 className="font-editorial text-2xl md:text-[2rem] leading-tight mb-4 group-hover:text-accent-hover transition-colors">
                            {trend.title}
                          </h3>
                          {trend.what && <p className="text-sm md:text-base text-muted leading-relaxed">{trend.what}</p>}
                          {trend.why && (
                            <p className="text-sm text-ink/75 leading-relaxed mt-4 pt-4 border-t border-ink/10">
                              <strong className="font-semibold text-ink">Für den Mittelstand:</strong> {trend.why}
                            </p>
                          )}
                        </div>
                        <div className="md:text-right">
                          <span className="inline-flex rounded-full border border-ink/20 px-3 py-1.5 text-[.68rem] uppercase tracking-[0.12em] font-semibold">
                            {signalLabel(trend.signal)}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {opportunities.length > 0 && (
                <section className="py-16 md:py-24 border-b border-ink/15">
                  <div className="rounded-[32px] bg-accent px-6 py-10 md:p-14 lg:p-16 overflow-hidden relative">
                    <div className="absolute right-[-70px] top-[-90px] w-72 h-72 rounded-full border border-ink/15" aria-hidden="true" />
                    <div className="relative z-10 grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] font-semibold text-ink/60 mb-3">02 · Maschinell abgeleitete Ansatzpunkte</p>
                        <h2 className="font-editorial text-4xl md:text-5xl leading-[1.02]">Mögliche Ansätze, noch keine Empfehlung.</h2>
                      </div>

                      <div className="divide-y divide-ink/20 border-y border-ink/20">
                        {opportunities.map((opportunity, index) => (
                          <article key={`${opportunity.title}-${index}`} className="py-7 md:py-8">
                            <div className="flex items-start gap-5 md:gap-7">
                              <span className="font-editorial text-2xl text-ink/55 min-w-8">{String(index + 1).padStart(2, '0')}</span>
                              <div className="flex-1">
                                <h3 className="font-editorial text-2xl leading-tight mb-3">{opportunity.title}</h3>
                                {opportunity.what && <p className="text-sm text-ink/70 leading-relaxed">{opportunity.what}</p>}
                                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-[.72rem] uppercase tracking-[0.08em] font-semibold text-ink/70">
                                  {opportunity.who && <span>{opportunity.who}</span>}
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {articles.length > 0 && (
                <section className="py-16 md:py-24 border-b border-ink/15">
                  <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-20">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] font-semibold text-light mb-3">03 · Quellen</p>
                      <h2 className="font-editorial text-4xl md:text-5xl">Weiterlesen</h2>
                    </div>
                    <div className="border-t border-ink/30">
                      {articles.slice(0, 8).map((article, index) => (
                        <article key={`${article.title}-${index}`} className="grid grid-cols-[42px_1fr] gap-4 py-5 border-b border-ink/12">
                          <span className="text-xs text-light pt-1">{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            {article.url ? (
                              <a href={article.url} target="_blank" rel="noreferrer" className="font-editorial text-xl md:text-2xl leading-tight hover:text-accent-hover transition-colors">
                                {article.title} ↗
                              </a>
                            ) : (
                              <h3 className="font-editorial text-xl md:text-2xl leading-tight">{article.title}</h3>
                            )}
                            <p className="text-xs uppercase tracking-[0.1em] text-light mt-2">
                              {[article.source, article.date].filter(Boolean).join(' · ')}
                            </p>
                            {article.why && <p className="text-sm text-muted leading-relaxed mt-3 max-w-2xl">{article.why}</p>}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {actionItems.length > 0 && (
                <section className="py-16 md:py-24">
                  <div className="bg-ink text-white rounded-[32px] px-6 py-10 md:p-14 lg:p-16 grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] font-semibold text-white/45 mb-3">04 · Maschinell vorgeschlagene Prüfschritte</p>
                      <h2 className="font-editorial text-4xl md:text-5xl text-white">Was man als Nächstes prüfen könnte.</h2>
                    </div>
                    <div className="divide-y divide-white/15 border-y border-white/15">
                      {actionItems.map((item, index) => (
                        <div key={`${item}-${index}`} className="grid grid-cols-[42px_1fr] gap-4 py-6">
                          <span className="font-editorial text-2xl text-accent">{String(index + 1).padStart(2, '0')}</span>
                          <p className="text-sm md:text-base text-white/75 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

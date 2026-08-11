import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

interface Opportunity {
  title: string;
  description: string;
  impact: string;
  effort: string;
  estimated_savings: string;
}

interface AnalysisResult {
  url: string;
  scrape: {
    title: string;
    technologies: string[];
    word_count: number;
    response_time_ms: number;
  };
  analysis: {
    score: number;
    score_label: string;
    summary: string;
    opportunities: Opportunity[];
    missing_basics: string[];
    recommendation: string;
    tool_suggestion: string;
  };
}

function scoreTone(score: number): string {
  if (score <= 30) return 'text-[#B77A36]';
  if (score <= 60) return 'text-accent-hover';
  return 'text-ink';
}

const badge = 'rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold';

export const KIAnalyse: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const rawUrl = url.trim();
    if (!rawUrl) {
      setError('Bitte geben Sie eine Website-Adresse ein.');
      return;
    }

    let normalizedUrl: string;
    try {
      const parsed = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);
      if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname.includes('.')) throw new Error();
      normalizedUrl = parsed.toString();
    } catch {
      setError('Bitte geben Sie eine gültige Website-Adresse ein, z. B. beispiel.de.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || 'Analyse fehlgeschlagen');
        return;
      }
      setResult(data);
    } catch {
      setError('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
      <RouteMeta title="KI-Website-Analyse | Ainzigartig" description="Kostenlose KI-Analyse Ihrer Unternehmenswebseite." />
      <div className="max-w-[1000px] mx-auto">
        <header className="text-center max-w-[820px] mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Kostenlose KI-Analyse</p>
          <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.8rem)] leading-[1.02] tracking-[-0.035em] font-normal">
            Was kann KI für<br /><span className="hand-underline font-body font-extrabold">Ihre Website</span> tun?
          </h1>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed mt-7">
            Geben Sie Ihre URL ein. Wir lesen die Website aus und übersetzen den aktuellen Stand in konkrete KI-Potenziale, Aufwand und nächste Schritte.
          </p>
        </header>

        <div className="brand-card bg-surface p-4 md:p-5 max-w-[760px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ihre-website.de"
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="flex-1 rounded-2xl border border-ink/15 bg-base/60 px-4 py-3.5 text-sm text-ink placeholder:text-light focus:outline-none focus:border-accent-hover transition-colors"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !url.trim()}
              className="brand-pill bg-ink text-white hover:bg-[#33312E] px-6 py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><span className="animate-spin material-symbols-outlined text-[17px]">refresh</span> Analysiere…</>
              ) : (
                <>Analysieren <span className="material-symbols-outlined text-[17px]">arrow_forward</span></>
              )}
            </button>
          </div>
          <p className="text-[0.7rem] text-light text-center mt-3">Keine dauerhafte Speicherung der eingegebenen URL durch diese Oberfläche.</p>
        </div>

        {loading && (
          <div className="max-w-[760px] mx-auto mt-6 brand-card bg-surface p-6 space-y-4" aria-busy="true">
            <div className="h-4 w-1/2 rounded-full bg-ink/8 animate-pulse" />
            <div className="h-3 w-full rounded-full bg-ink/6 animate-pulse" />
            <div className="h-3 w-4/5 rounded-full bg-ink/6 animate-pulse" />
            <p className="text-xs text-light pt-2">Website wird ausgelesen und eingeordnet.</p>
          </div>
        )}

        {error && (
          <div className="max-w-[760px] mx-auto mt-6 rounded-[22px] border border-red-900/15 bg-red-50 p-5 text-center">
            <p className="text-sm text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="mt-2 text-xs text-red-700 underline underline-offset-4">Erneut versuchen</button>
          </div>
        )}

        {result && (
          <section className="mt-14 space-y-6">
            <div className="brand-card bg-surface p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light mb-2">Analysiert</p>
                  <p className="font-editorial text-xl md:text-2xl text-ink break-all">{result.url}</p>
                  {result.scrape.title && <p className="text-xs text-muted mt-2">{result.scrape.title}</p>}
                </div>
                <div className="md:text-right shrink-0">
                  <p className={`font-editorial text-6xl leading-none ${scoreTone(result.analysis.score)}`}>{result.analysis.score}</p>
                  <p className="text-xs text-light mt-1">{result.analysis.score_label} · Orientierungs-Score</p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] text-light">
                {result.scrape.technologies.length > 0 && <span>{result.scrape.technologies.join(' · ')}</span>}
                <span>{result.scrape.word_count.toLocaleString('de-DE')} Wörter</span>
                <span>{result.scrape.response_time_ms} ms Abrufzeit</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-6">
              <div className="brand-card bg-[#F3EFEA] p-6 md:p-7 h-fit">
                <p className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light mb-3">Kurzfazit</p>
                <p className="text-sm md:text-base text-muted leading-relaxed">{result.analysis.summary}</p>
              </div>

              <div className="space-y-4">
                {result.analysis.opportunities.length > 0 && (
                  <div>
                    <h2 className="font-editorial text-2xl md:text-3xl mb-4">KI-Chancen</h2>
                    <div className="space-y-3">
                      {result.analysis.opportunities.map((opportunity, index) => (
                        <article key={index} className="brand-card bg-surface p-5 md:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                            <h3 className="font-editorial text-xl text-ink">{opportunity.title}</h3>
                            <div className="flex gap-2 shrink-0">
                              <span className={`${badge} border-accent/40 bg-accent/15 text-ink`}>Wirkung: {opportunity.impact}</span>
                              <span className={`${badge} border-ink/12 bg-base text-muted`}>Aufwand: {opportunity.effort}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted leading-relaxed">{opportunity.description}</p>
                          {opportunity.estimated_savings && <p className="text-xs font-semibold text-accent-hover mt-3">{opportunity.estimated_savings}</p>}
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {result.analysis.missing_basics.length > 0 && (
              <div className="brand-card bg-surface p-6 md:p-7">
                <h2 className="font-editorial text-2xl mb-4">Grundlagen, die vorher geklärt werden sollten</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {result.analysis.missing_basics.map((item, index) => (
                    <li key={index} className="rounded-2xl bg-base border border-ink/10 px-4 py-3 text-sm text-muted flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[17px] text-accent-hover mt-px">priority_high</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-[28px] bg-accent p-6 md:p-9 shadow-card">
              <p className="text-[0.68rem] uppercase tracking-[0.12em] font-bold text-ink/60 mb-3">Empfehlung</p>
              <p className="font-editorial text-2xl md:text-3xl leading-tight text-ink">{result.analysis.recommendation}</p>
              {result.analysis.tool_suggestion && <p className="text-sm text-ink/70 mt-4">Möglicher Ansatz: {result.analysis.tool_suggestion}</p>}
              <Link to="/#kontakt" className="brand-pill mt-7 bg-ink text-white hover:bg-[#33312E]">Ergebnis besprechen</Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

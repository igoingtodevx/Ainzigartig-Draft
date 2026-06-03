import React, { useState } from 'react';

const mailto = 'mailto:info@ainzigartig.de?subject=KI-Analyse%20%E2%80%94%20N%C3%A4chste%20Schritte';

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

function getScoreColor(score: number): string {
  if (score <= 30) return 'text-orange-500';
  if (score <= 60) return 'text-accent';
  return 'text-green-600';
}

function getImpactColor(impact: string): string {
  if (impact === 'Hoch') return 'bg-green-100 text-green-700';
  if (impact === 'Mittel') return 'bg-yellow-100 text-yellow-700';
  return 'bg-gray-100 text-gray-600';
}

function getEffortColor(effort: string): string {
  if (effort === 'Gering') return 'bg-green-100 text-green-700';
  if (effort === 'Mittel') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

export const KIAnalyse: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

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
    <div className="min-h-screen bg-base text-ink font-body">
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-8">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
            Kostenlose KI-Analyse
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-ink mb-6">
            Was kann KI für<br />
            <span className="text-accent">Ihre Website tun?</span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Geben Sie Ihre URL ein. KI analysiert Ihre Website und zeigt konkrete
            Einsparpotenziale — in unter 60 Sekunden.
          </p>

          {/* URL Input */}
          <div className="max-w-xl mx-auto">
            <div className="flex gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ihre-website.de"
                className="flex-1 px-4 py-3 border border-faint/30 bg-transparent text-ink text-sm font-body placeholder:text-faint/50 focus:outline-none focus:border-accent transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
                className="px-6 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin material-symbols-outlined text-sm">refresh</span>
                    Analysiere…
                  </span>
                ) : (
                  'Analysieren'
                )}
              </button>
            </div>
            <p className="text-xs text-faint mt-3">
              Keine Daten gespeichert. Ergebnis nur im Browser.
            </p>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <section className="px-6 md:px-8 pb-12">
          <div className="max-w-[800px] mx-auto">
            <div className="border border-red-300 bg-red-50 p-6 text-center">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-3 text-xs text-red-500 underline cursor-pointer"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {result && (
        <section className="px-6 md:px-8 pb-20">
          <div className="max-w-[1000px] mx-auto">
            {/* Header */}
            <div className="border border-faint/30 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-faint uppercase tracking-[0.2em] mb-1">Analysiert</p>
                  <p className="text-sm text-ink font-medium">{result.url}</p>
                  {result.scrape.title && (
                    <p className="text-xs text-muted mt-1">{result.scrape.title}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className={`font-editorial text-4xl ${getScoreColor(result.analysis.score)}`}>
                    {result.analysis.score}
                  </p>
                  <p className="text-xs text-faint">{result.analysis.score_label} · KI-Reifegrad</p>
                </div>
              </div>

              {/* Tech + Meta */}
              <div className="mt-4 pt-4 border-t border-faint/20 flex flex-wrap gap-4 text-xs text-muted">
                {result.scrape.technologies.length > 0 && (
                  <span>Technologien: {result.scrape.technologies.join(', ')}</span>
                )}
                <span>{result.scrape.word_count.toLocaleString()} Wörter</span>
                <span>{result.scrape.response_time_ms}ms Antwortzeit</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <p className="text-sm text-ink leading-relaxed">{result.analysis.summary}</p>
            </div>

            {/* Opportunities */}
            {result.analysis.opportunities.length > 0 && (
              <div className="mb-8">
                <h2 className="font-editorial text-xl text-ink mb-4">KI-Chancen für Ihre Website</h2>
                <div className="space-y-4">
                  {result.analysis.opportunities.map((opp, i) => (
                    <div key={i} className="border border-faint/30 p-5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-editorial text-base text-ink">{opp.title}</h3>
                        <div className="flex gap-2 shrink-0">
                          <span className={`text-xs px-2 py-0.5 ${getImpactColor(opp.impact)}`}>
                            {opp.impact}
                          </span>
                          <span className={`text-xs px-2 py-0.5 ${getEffortColor(opp.effort)}`}>
                            {opp.effort}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted leading-relaxed mb-2">{opp.description}</p>
                      {opp.estimated_savings && (
                        <p className="text-xs text-accent font-medium">
                          → {opp.estimated_savings}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Basics */}
            {result.analysis.missing_basics.length > 0 && (
              <div className="mb-8">
                <h2 className="font-editorial text-xl text-ink mb-4">Fehlende Grundlagen</h2>
                <ul className="space-y-2">
                  {result.analysis.missing_basics.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-orange-500 mt-0.5">⚠</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            <div className="border border-accent/30 bg-accent/[0.03] p-6 mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-faint mb-3">Empfehlung</p>
              <p className="text-sm text-ink leading-relaxed mb-2">{result.analysis.recommendation}</p>
              {result.analysis.tool_suggestion && (
                <p className="text-xs text-accent font-medium mt-3">
                  Passendes Tool: {result.analysis.tool_suggestion}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-sm text-muted mb-4">
                Wollen Sie die nächste Stufe sehen? Lassen Sie uns sprechen.
              </p>
              <a
                href={mailto}
                className="inline-flex items-center gap-2 text-sm text-accent font-body group"
              >
                <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                  Kostenfreies Erstgespräch vereinbaren
                </span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

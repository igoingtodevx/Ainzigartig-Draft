import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

type Impact = 'Hoch' | 'Mittel' | 'Niedrig';
type Effort = 'Gering' | 'Mittel' | 'Hoch';
type Availability = 'checking' | 'ready' | 'unavailable';

interface Result {
  url: string;
  analyzed_at: string;
  scrape: {
    title: string;
    technologies: string[];
    word_count: number;
    response_time_ms: number;
  };
  analysis: {
    score_label: string;
    summary: string;
    observations: { label: string; finding: string; confidence: string }[];
    opportunities: {
      title: string;
      description: string;
      evidence: string;
      impact: Impact;
      effort: Effort;
      first_step: string;
    }[];
    missing_basics: string[];
    recommendation: string;
    limitations: string[];
  };
}

const BASE_LIMITATIONS = [
  'Nur öffentlich sichtbare Inhalte dieser URL; keine internen Prozesse, Nutzungsdaten oder Systemzugriffe.',
  'Technologie-Hinweise werden heuristisch erkannt und sind vor einer technischen Entscheidung zu verifizieren.',
];

const badgeClass = 'rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold whitespace-nowrap';

function normalizeUrl(value: string) {
  let candidate = value.trim();
  if (!candidate) throw new Error('Bitte geben Sie eine Website-Adresse ein.');
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  const parsed = new URL(candidate);
  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname.includes('.') || parsed.username || parsed.password) {
    throw new Error('Ungültige Website-Adresse.');
  }
  parsed.hash = '';
  return parsed.toString();
}

async function responseJson(response: Response) {
  try { return await response.json(); } catch { return {}; }
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Zeitpunkt nicht verfügbar' : date.toLocaleString('de-DE');
}

function confidenceClass(value: string) {
  if (value === 'Sicher') return 'border-emerald-900/15 bg-emerald-50 text-emerald-800';
  if (value === 'Plausibel') return 'border-amber-900/15 bg-amber-50 text-amber-900';
  return 'border-ink/10 bg-base text-muted';
}

export const KIAnalyse: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [availability, setAvailability] = useState<Availability>('checking');
  const resultRef = useRef<HTMLElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/analyze')
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data) => { if (!cancelled) setAvailability(data?.configured ? 'ready' : 'unavailable'); })
      .catch(() => { if (!cancelled) setAvailability('unavailable'); });
    return () => {
      cancelled = true;
      requestRef.current?.abort();
    };
  }, []);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (availability !== 'ready' || loading) return;

    let normalized = '';
    try {
      normalized = normalizeUrl(url);
      setUrl(normalized);
    } catch {
      setError('Bitte geben Sie eine gültige öffentliche Website-Adresse ein, z. B. beispiel.de.');
      return;
    }

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized }),
        signal: controller.signal,
      });
      const data = await responseJson(response);
      if (!response.ok) throw new Error(data.error || 'Die Analyse konnte nicht abgeschlossen werden.');
      setResult(data as Result);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (caught) {
      if ((caught as Error).name !== 'AbortError') {
        setError(caught instanceof Error ? caught.message : 'Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  };

  const cancel = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setLoading(false);
    setError('Die Analyse wurde abgebrochen. Es wurde kein Ergebnis erzeugt.');
  };

  const reset = () => {
    setResult(null);
    setError('');
    setUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limitations = result
    ? [...new Set([...(result.analysis.limitations || []), ...BASE_LIMITATIONS])]
    : [];

  const healthCopy = availability === 'checking'
    ? { title: 'Verfügbarkeit wird geprüft', text: 'Die Analyse startet erst, wenn Abruf, Modelldienst und Missbrauchsschutz als konfiguriert gemeldet sind.' }
    : { title: 'Live-Analyse in dieser Umgebung nicht aktiviert', text: 'Der Analyse-Dienst oder sein Missbrauchsschutz ist nicht vollständig konfiguriert. Die Oberfläche bleibt als transparenter Produktstand sichtbar; es wird keine Scheinanalyse gestartet.' };

  return (
    <main className="min-h-screen bg-base px-4 pb-24 pt-32 text-ink sm:px-6 md:pt-36">
      <RouteMeta title="KI-Website-Analyse | Ainzigartig" description="Konkrete, priorisierte Potenziale auf Basis öffentlich lesbarer Website-Inhalte." />
      <div className="mx-auto max-w-[1000px]">
        <header className="mx-auto mb-9 max-w-[800px] text-center md:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.14em] text-light">Website-Potenzialanalyse</p>
          <h1 className="font-editorial text-[clamp(2.5rem,7vw,4.8rem)] leading-[1.02] tracking-[-.035em]">Öffentliche Signale.<br /><span className="hand-underline font-body font-extrabold">Konkrete nächste Schritte.</span></h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">Wir lesen öffentlich erreichbare Inhalte einer URL und leiten daraus beobachtbare Signale, mögliche Ansatzpunkte und offene Fragen ab.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-[10px] font-semibold uppercase tracking-[.1em] text-muted">
            <span className="rounded-full border border-ink/10 bg-surface px-3 py-1.5">Beobachtung & Konfidenz</span>
            <span className="rounded-full border border-ink/10 bg-surface px-3 py-1.5">Wirkung & Aufwand</span>
            <span className="rounded-full border border-ink/10 bg-surface px-3 py-1.5">Prüfbarer erster Schritt</span>
          </div>
        </header>

        {availability !== 'ready' && (
          <div className={`mx-auto mb-5 max-w-[760px] rounded-[20px] border p-4 ${availability === 'checking' ? 'border-ink/10 bg-surface' : 'border-amber-900/15 bg-amber-50'}`} role="status">
            <p className={`text-sm font-semibold ${availability === 'checking' ? 'text-ink' : 'text-amber-950'}`}>{healthCopy.title}</p>
            <p className={`mt-1 text-xs leading-relaxed ${availability === 'checking' ? 'text-muted' : 'text-amber-900/75'}`}>{healthCopy.text}</p>
          </div>
        )}

        <form onSubmit={submit} noValidate className="brand-card mx-auto max-w-[760px] bg-surface p-4 md:p-5" aria-describedby="analysis-note">
          <label htmlFor="website-url" className="sr-only">Website-Adresse</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="website-url"
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              maxLength={2048}
              value={url}
              onChange={(event) => { setUrl(event.target.value); if (error) setError(''); }}
              placeholder="beispiel.de"
              aria-invalid={Boolean(error)}
              disabled={loading || availability !== 'ready'}
              className="min-w-0 flex-1 rounded-2xl border border-ink/15 bg-base/60 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-55"
            />
            <button type="submit" disabled={loading || !url.trim() || availability !== 'ready'} className="brand-pill justify-center bg-ink px-6 py-3.5 text-white disabled:cursor-not-allowed disabled:opacity-40">
              {loading ? 'Website wird geprüft…' : availability === 'ready' ? 'Analyse starten' : 'Nicht verfügbar'}
              <span className={`material-symbols-outlined text-[17px] ${loading ? 'animate-spin' : ''}`} aria-hidden="true">{loading ? 'progress_activity' : 'arrow_forward'}</span>
            </button>
          </div>
          <p id="analysis-note" className="mt-3 text-[.72rem] leading-relaxed text-light">Analysiert werden öffentlich abrufbare Inhalte genau dieser URL. Interne Prozesse, Trackingdaten und Systeme hinter der Website bleiben unbekannt. Die URL wird an den konfigurierten Analyse-Dienst übermittelt.</p>
        </form>

        <div aria-live="polite" aria-atomic="true">
          {loading && (
            <div className="brand-card mx-auto mt-6 max-w-[760px] bg-surface p-5 sm:p-6" role="status" aria-busy="true">
              <div className="flex items-center gap-3"><span className="material-symbols-outlined animate-spin text-accent-hover" aria-hidden="true">progress_activity</span><p className="text-sm font-semibold">Seitenabruf und KI-Auswertung laufen.</p></div>
              <p className="ml-8 mt-2 text-xs leading-relaxed text-light">Der Dienst prüft zuerst den öffentlichen Abruf und strukturiert danach Beobachtungen und Hypothesen. Das kann einige Sekunden dauern.</p>
              <button type="button" onClick={cancel} className="ml-8 mt-4 min-h-11 text-xs font-semibold text-muted underline decoration-1 underline-offset-4 hover:text-ink">Analyse abbrechen</button>
            </div>
          )}
          {error && !loading && (
            <div className="mx-auto mt-6 max-w-[760px] rounded-[22px] border border-red-900/15 bg-red-50 p-5" role="alert">
              <p className="text-sm font-semibold text-red-900">Analyse nicht möglich</p>
              <p className="mt-1 text-sm text-red-800">{error}</p>
              <button type="button" onClick={() => submit()} disabled={availability !== 'ready'} className="mt-3 min-h-11 text-xs text-red-800 underline underline-offset-4 disabled:opacity-40">Erneut versuchen</button>
            </div>
          )}
        </div>

        {result && (
          <section ref={resultRef} tabIndex={-1} className="mt-12 space-y-6 outline-none" aria-labelledby="result-title">
            <div className="brand-card bg-surface p-5 sm:p-6 md:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="min-w-0">
                  <p className="mb-2 text-[.68rem] font-semibold uppercase tracking-[.12em] text-light">Öffentlich analysiert</p>
                  <h2 id="result-title" className="break-words font-editorial text-2xl md:text-3xl">{result.scrape.title || new URL(result.url).hostname}</h2>
                  <p className="mt-2 break-all text-xs text-muted">{result.url}</p>
                </div>
                <div className="shrink-0 md:max-w-[300px] md:text-right">
                  <p className="text-[.64rem] font-semibold uppercase tracking-[.12em] text-light">Qualitative Einordnung</p>
                  <p className="mt-1 font-editorial text-2xl leading-tight text-accent-hover md:text-3xl">{result.analysis.score_label}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-light">Aus einer öffentlich sichtbaren Seite, kein gemessener Reifegrad.</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-3 border-t border-ink/10 pt-5 text-[.72rem] text-light sm:grid-cols-3">
                <div><dt className="font-semibold text-muted">Textbasis</dt><dd>{result.scrape.word_count.toLocaleString('de-DE')} ausgelesene Wörter</dd></div>
                <div><dt className="font-semibold text-muted">Abruf</dt><dd>{result.scrape.response_time_ms > 0 ? `${result.scrape.response_time_ms} ms serverseitig` : 'Zeit nicht verfügbar'}</dd></div>
                <div><dt className="font-semibold text-muted">Erstellt</dt><dd>{formatTimestamp(result.analyzed_at)}</dd></div>
              </dl>
              {result.scrape.technologies.length > 0 && <p className="mt-4 text-[.7rem] leading-relaxed text-light"><strong className="font-semibold text-muted">Automatisch erkannte Technik-Hinweise, ungeprüft:</strong> {result.scrape.technologies.join(' · ')}</p>}
            </div>

            <div className="rounded-[20px] border border-accent/35 bg-accent/10 p-4 text-xs leading-relaxed text-muted">
              <strong className="font-semibold text-ink">Lesart:</strong> Die folgende Einordnung ist KI-generiert. „Sicher“, „plausibel“, Wirkung und Aufwand sind strukturierte Prüfhilfen — keine verifizierten Fakten oder Kalkulationen.
            </div>

            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <div className="space-y-6">
                <article className="brand-card bg-[#F3EFEA] p-5 sm:p-6 md:p-7">
                  <p className="mb-3 text-[.68rem] font-semibold uppercase tracking-[.12em] text-light">Einordnung</p>
                  <p className="text-sm leading-relaxed text-muted md:text-base">{result.analysis.summary}</p>
                </article>
                {result.analysis.observations.length > 0 && (
                  <article className="brand-card bg-surface p-5 sm:p-6">
                    <h3 className="font-editorial text-2xl">Was sichtbar war</h3>
                    <ul className="mt-4 divide-y divide-ink/10">
                      {result.analysis.observations.map((observation, index) => (
                        <li key={`${observation.label}-${index}`} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex flex-wrap items-start justify-between gap-2"><strong className="text-sm">{observation.label}</strong><span className={`${badgeClass} ${confidenceClass(observation.confidence)}`}>{observation.confidence}</span></div>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{observation.finding}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
              </div>

              <div>
                <p className="text-[.68rem] font-semibold uppercase tracking-[.12em] text-light">Heuristische Priorisierung</p>
                <h3 className="mb-4 mt-1 font-editorial text-2xl md:text-3xl">Mögliche Ansatzpunkte</h3>
                {result.analysis.opportunities.length > 0 ? (
                  <div className="space-y-3">
                    {result.analysis.opportunities.map((opportunity, index) => (
                      <article key={`${opportunity.title}-${index}`} className="brand-card bg-surface p-5 md:p-6">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row">
                          <h4 className="font-editorial text-xl">{index + 1}. {opportunity.title}</h4>
                          <div className="flex flex-wrap gap-2"><span className={`${badgeClass} border-accent/40 bg-accent/15`}>Wirkung {opportunity.impact}</span><span className={`${badgeClass} border-ink/10`}>Aufwand {opportunity.effort}</span></div>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{opportunity.description}</p>
                        {opportunity.evidence && <p className="mt-3 text-xs leading-relaxed text-light"><strong className="font-semibold text-muted">Grundlage:</strong> {opportunity.evidence}</p>}
                        {opportunity.first_step && <p className="mt-4 rounded-xl bg-base p-3 text-sm leading-relaxed"><strong>Erster Test:</strong> {opportunity.first_step}</p>}
                      </article>
                    ))}
                  </div>
                ) : <p className="rounded-[20px] border border-ink/10 bg-surface p-5 text-sm text-muted">Aus der gelesenen Seite wurden keine ausreichend konkreten Ansatzpunkte abgeleitet.</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="brand-card bg-surface p-5 sm:p-6"><h3 className="font-editorial text-xl">Zuerst klären</h3>{result.analysis.missing_basics.length > 0 ? <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">{result.analysis.missing_basics.map((item, index) => <li key={`${item}-${index}`}>— {item}</li>)}</ul> : <p className="mt-3 text-sm leading-relaxed text-muted">Aus der Seite wurden keine konkreten Grundlagenlücken sicher erkannt; interne Voraussetzungen bleiben trotzdem ungeprüft.</p>}</article>
              <article className="brand-card bg-surface p-5 sm:p-6"><h3 className="font-editorial text-xl">Grenzen dieser Analyse</h3><ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">{limitations.map((item, index) => <li key={`${item}-${index}`}>— {item}</li>)}</ul></article>
            </div>

            <div className="rounded-[28px] bg-accent p-5 sm:p-6 md:p-9">
              <p className="mb-3 text-[.68rem] font-bold uppercase tracking-[.12em] text-ink/60">Vorgeschlagener nächster Prüfschritt</p>
              <p className="font-editorial text-2xl leading-tight md:text-3xl">{result.analysis.recommendation || 'Den stärksten Ansatzpunkt mit realen Prozessverantwortlichen, Beispieldaten und Abbruchkriterien prüfen.'}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link to="/#kontakt" className="brand-pill justify-center bg-ink text-white">Analyse einordnen lassen</Link><button type="button" onClick={reset} className="brand-pill justify-center bg-base/60">Andere Website prüfen</button></div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default KIAnalyse;

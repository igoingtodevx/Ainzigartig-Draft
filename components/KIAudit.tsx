import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

type Question = {
  id: string;
  dimension: string;
  label: string;
  hint: string;
  options: { value: number; text: string }[];
};

const scale = (texts: string[]) => texts.map((text, index) => ({ value: index + 1, text }));
const questions: Question[] = [
  { id: 'usecase', dimension: 'Zielklarheit', label: 'Wie klar ist der erste Anwendungsfall beschrieben?', hint: 'Ein guter Use Case benennt Nutzer, Auslöser, Arbeitsschritte und gewünschtes Ergebnis.', options: scale(['Noch keine Idee', 'Ein grober Themenbereich', 'Ein Prozess ist benannt', 'Ablauf und Ziel sind beschrieben', 'Ablauf, Ziel und Messgröße sind klar']) },
  { id: 'process', dimension: 'Prozess', label: 'Wie stabil läuft der heutige Prozess?', hint: 'KI und Automatisierung verstärken häufig auch Unklarheiten im bestehenden Ablauf.', options: scale(['Stark personenabhängig und unklar', 'Viele Ausnahmen, kaum dokumentiert', 'Kernablauf ist bekannt', 'Dokumentiert mit klaren Übergaben', 'Dokumentiert, gemessen und verantwortlich zugeordnet']) },
  { id: 'data', dimension: 'Daten', label: 'Wie zugänglich sind die benötigten Informationen?', hint: 'Zum Beispiel Dokumente, Wissensartikel, CRM-Felder oder historische Fälle.', options: scale(['Unbekannt oder nicht digital', 'Verteilt in Postfächern und Ordnern', 'Digital, aber uneinheitlich', 'Zentral und überwiegend gepflegt', 'Zentral, gepflegt und mit Zugriffsregeln']) },
  { id: 'systems', dimension: 'Technik', label: 'Wie gut lassen sich Ihre Systeme anbinden?', hint: 'Bewerten Sie Exporte, APIs, Rollen und verfügbare technische Betreuung.', options: scale(['Noch nicht geprüft', 'Nur manuelle Übertragung bekannt', 'Exporte sind möglich', 'Wichtige Systeme bieten Schnittstellen', 'Schnittstellen, Testzugang und Betreuung sind verfügbar']) },
  { id: 'risk', dimension: 'Governance', label: 'Wie sind Qualität, Datenschutz und Freigaben organisiert?', hint: 'Gemeint sind Verantwortliche und ein überprüfbarer Umgang mit Fehlern.', options: scale(['Noch niemand verantwortlich', 'Risiken sind bekannt, Regeln fehlen', 'Eine verantwortliche Person ist benannt', 'Regeln und menschliche Freigaben sind definiert', 'Regeln, Tests, Monitoring und Eskalation sind etabliert']) },
  { id: 'adoption', dimension: 'Einführung', label: 'Wie wird das Team in die Einführung einbezogen?', hint: 'Akzeptanz entsteht durch Beteiligung, Training und sichtbares Feedback.', options: scale(['Noch nicht geplant', 'Information nach Fertigstellung', 'Einzelne Nutzer geben Feedback', 'Pilotgruppe und Training sind geplant', 'Pilotgruppe, Training und Erfolgskriterien sind vereinbart']) },
];

const nextSteps: Record<string, string> = {
  Zielklarheit: 'Einen Prozess in Auslöser, Schritte, Ergebnis und Messgröße zerlegen.',
  Prozess: 'Den Ist-Ablauf mit Ausnahmen und Verantwortlichen auf einer Seite dokumentieren.',
  Daten: 'Für zehn echte Fälle Datenquellen, Qualität und Zugriffsrechte prüfen.',
  Technik: 'Export- und API-Möglichkeiten des wichtigsten Systems mit der IT klären.',
  Governance: 'Menschliche Freigabe, Fehlerfall und zulässige Daten schriftlich festlegen.',
  Einführung: 'Eine kleine Pilotgruppe und einen festen Feedbacktermin bestimmen.',
};

const resultCopy = (average: number) => {
  if (average < 2.4) return { label: 'Erst fokussieren', text: 'Der größte Hebel liegt vor der Technik: einen Prozess auswählen, Verantwortliche benennen und die nötigen Informationen sichtbar machen.' };
  if (average < 3.7) return { label: 'Pilot vorbereiten', text: 'Ein begrenzter Pilot könnte sinnvoll sein. Vor dem Bau sollten die schwächsten Voraussetzungen mit echten Fällen geprüft werden.' };
  return { label: 'Pilot konkret prüfen', text: 'Ihre Antworten sprechen für eine strukturierte Pilotprüfung. Ob ein Start trägt, zeigen erst reale Fälle, Messkriterien, Fehlerwege und fachliche Freigaben.' };
};

export const KIAudit: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(0);
  const question = questions[index];
  const selected = answers[question.id];
  const dimensions = useMemo(() => questions.map((item) => ({ name: item.dimension, value: answers[item.id] || 0 })), [answers]);
  const average = dimensions.reduce((sum, item) => sum + item.value, 0) / questions.length;
  const outcome = resultCopy(average);
  const weak = [...dimensions].sort((a, b) => a.value - b.value).slice(0, 3);

  useEffect(() => {
    if (previousIndexRef.current !== index) {
      previousIndexRef.current = index;
      requestAnimationFrame(() => questionRef.current?.focus());
    }
  }, [index]);

  useEffect(() => {
    if (done) requestAnimationFrame(() => resultRef.current?.focus());
  }, [done]);

  const advance = () => {
    if (!selected) return;
    if (index < questions.length - 1) setIndex((current) => current + 1);
    else setDone(true);
  };

  const restart = () => { setIndex(0); setAnswers({}); setDone(false); };

  if (done) {
    return (
      <main className="min-h-screen bg-base px-4 pb-24 pt-32 sm:px-6">
        <RouteMeta title="KI-Ausgangslage | Ainzigartig" description="Sechs Dimensionen für einen belastbaren ersten KI-Pilot." />
        <div ref={resultRef} tabIndex={-1} className="mx-auto max-w-[980px] outline-none">
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.14em] text-accent-hover">Ihre Orientierung</p>
            <h1 className="font-editorial text-[clamp(2.8rem,7vw,5rem)] leading-[.98]">{outcome.label}</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{outcome.text}</p>
            <p className="mt-3 text-xs text-light">Kein wissenschaftlicher Benchmark, kein Branchenvergleich und kein Konformitätsnachweis.</p>
          </header>

          <div className="grid gap-6 md:grid-cols-[.9fr_1.1fr]">
            <section className="brand-card bg-surface p-5 sm:p-6 md:p-8">
              <h2 className="font-editorial text-2xl">Ihre sechs Voraussetzungen</h2>
              <div className="mt-6 space-y-5">{dimensions.map((dimension) => <div key={dimension.name}><div className="mb-2 flex justify-between text-sm"><span>{dimension.name}</span><span className="tabular text-light">{dimension.value} / 5</span></div><div className="h-2 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-accent-hover" style={{ width: `${dimension.value * 20}%` }} /></div></div>)}</div>
            </section>
            <section className="rounded-[24px] bg-ink p-5 text-white sm:p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-accent">Die drei sinnvollsten nächsten Schritte</p>
              <ol className="mt-6 space-y-6">{weak.map((dimension, step) => <li key={dimension.name} className="grid grid-cols-[36px_1fr] gap-3"><span className="font-editorial text-3xl text-accent">0{step + 1}</span><div><strong className="text-sm text-white">{dimension.name}</strong><p className="mt-1 text-sm leading-relaxed text-white/62">{nextSteps[dimension.name]}</p></div></li>)}</ol>
            </section>
          </div>

          <div className="mt-6 brand-card bg-[#F3EFEA] p-5 sm:p-6"><h2 className="font-editorial text-xl">Was dieses Ergebnis nicht bewertet</h2><p className="mt-2 text-sm leading-relaxed text-muted">Rechtliche Konformität, Wirtschaftlichkeit und Modellqualität brauchen einen konkreten Prozess, echte Beispieldaten und einen begrenzten Test mit definierten Abbruchkriterien.</p></div>
          <div className="mt-4 rounded-[20px] border border-ink/10 bg-base p-4 text-xs leading-relaxed text-light"><strong className="font-semibold text-muted">So wurde ausgewertet:</strong> Jede Selbsteinschätzung zählt von 1 bis 5. Die Überschrift folgt dem einfachen arithmetischen Mittel; die nächsten Schritte beziehen sich auf die drei niedrigsten Dimensionen. Es gibt keine Branchengewichtung und keinen externen Vergleich.</div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/#kontakt" className="brand-pill justify-center bg-ink text-white">Ergebnis besprechen</Link><button type="button" onClick={restart} className="brand-pill justify-center bg-surface">Neu starten</button></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base px-4 pb-24 pt-32 sm:px-6">
      <RouteMeta title="KI-Ausgangslage | Ainzigartig" description="Sechs praxisnahe Fragen zur Ausgangslage für einen KI-Pilot." />
      <div className="mx-auto max-w-[820px]">
        <header className="mb-8 text-center md:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.14em] text-accent-hover">KI-Ausgangslage</p>
          <h1 className="font-editorial text-[clamp(2.55rem,6vw,4.25rem)] leading-[1.02]">Ist Ihr nächster KI-Pilot gut vorbereitet?</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">Sechs Voraussetzungen. Etwa drei Minuten. Eine regelbasierte Orientierung mit konkreten nächsten Schritten.</p>
        </header>

        <section className="brand-card bg-surface p-5 sm:p-6 md:p-9" aria-labelledby="audit-question">
          <div className="mb-2 flex justify-between text-xs text-light"><span>Frage {index + 1} von {questions.length}</span><span className="tabular">{Object.keys(answers).length} beantwortet</span></div>
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-label="Fortschritt im KI-Ausgangslage-Check" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={index + (selected ? 1 : 0)}><div className="h-full rounded-full bg-accent-hover transition-all duration-500" style={{ width: `${((index + (selected ? 1 : 0)) / questions.length) * 100}%` }} /></div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.12em] text-accent-hover">{question.dimension}</p>
          <h2 ref={questionRef} tabIndex={-1} id="audit-question" className="font-editorial text-2xl leading-tight outline-none md:text-3xl">{question.label}</h2>
          <p className="mb-7 mt-2 text-sm leading-relaxed text-light">{question.hint}</p>
          <fieldset className="space-y-2.5" aria-labelledby="audit-question">
            <legend className="sr-only">Antwort auswählen</legend>
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`grid min-h-[52px] w-full cursor-pointer grid-cols-[28px_1fr] items-center gap-3 rounded-2xl border p-3.5 text-left text-sm transition-colors ${selected === option.value ? 'border-accent-hover bg-accent/15' : 'border-ink/10 bg-base/50 hover:border-ink/30'}`}
              >
                <input type="radio" name={question.id} value={option.value} checked={selected === option.value} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.value }))} className="peer sr-only" />
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-hover ${selected === option.value ? 'border-accent-hover bg-accent-hover text-white' : 'border-ink/15 text-light'}`}>{option.value}</span>
                <span>{option.text}</span>
              </label>
            ))}
          </fieldset>
          <div className="mt-7 flex items-center justify-between gap-4 border-t border-ink/10 pt-5">
            <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0} className="min-h-11 text-sm text-muted hover:text-ink disabled:invisible">← Zurück</button>
            <button type="button" onClick={advance} disabled={!selected} className="brand-pill justify-center bg-ink px-6 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-35">{index === questions.length - 1 ? 'Auswertung ansehen' : 'Weiter'} <span aria-hidden="true">→</span></button>
          </div>
        </section>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-relaxed text-light">Regelbasiert und lokal im Browser ausgewertet. Die Antworten werden von diesem Check nicht an eine API gesendet.</p>
      </div>
    </main>
  );
};

export default KIAudit;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const mailto = 'mailto:info@ainzigartig.de?subject=KI-Audit%20Ergebnis%20%E2%80%94%20N%C3%A4chste%20Schritte';

interface Question {
  id: string;
  label: string;
  hint: string;
  options: { value: number; text: string }[];
}

const questions: Question[] = [
  {
    id: 'team',
    label: 'Wie groß ist Ihr Team?',
    hint: 'Mitarbeitende, die aktiv im Tagesgeschäft arbeiten.',
    options: [
      { value: 1, text: '1–3' },
      { value: 2, text: '4–10' },
      { value: 3, text: '11–25' },
      { value: 4, text: '26–50' },
      { value: 5, text: '50+' },
    ],
  },
  {
    id: 'processes',
    label: 'Wie viele wiederkehrende Prozesse haben Sie identifiziert?',
    hint: 'E-Mails beantworten, Angebote erstellen, Daten erfassen, etc.',
    options: [
      { value: 1, text: 'Keine / weiß nicht' },
      { value: 2, text: '1–2' },
      { value: 3, text: '3–5' },
      { value: 4, text: '6–10' },
      { value: 5, text: '10+' },
    ],
  },
  {
    id: 'tools',
    label: 'Welche digitalen Tools nutzen Sie bereits?',
    hint: 'CRM, E-Mail, Buchhaltung, Website, etc.',
    options: [
      { value: 1, text: 'Nur E-Mail & Office' },
      { value: 2, text: 'E-Mail + 1–2 Tools' },
      { value: 3, text: '3–5 integrierte Tools' },
      { value: 4, text: '6+ Tools, teilweise vernetzt' },
      { value: 5, text: 'Full Stack, alles vernetzt' },
    ],
  },
  {
    id: 'pain',
    label: 'Was ist Ihr größtes Bottleneck heute?',
    hint: 'Was frisst die meiste Zeit oder verursacht die meisten Fehler?',
    options: [
      { value: 1, text: 'Kundenservice / Anfragen' },
      { value: 2, text: 'Vertrieb / Lead-Qualifizierung' },
      { value: 3, text: 'Dokumente / Rechnungen / Verwaltung' },
      { value: 4, text: 'Recruiting / Personal' },
      { value: 5, text: 'Mehrere Bereiche gleichzeitig' },
    ],
  },
  {
    id: 'budget',
    label: 'Was ist Ihr Budget für den ersten KI-Einsatz?',
    hint: 'Realistische Einschätzung — kein Bewertungsmaß.',
    options: [
      { value: 1, text: 'Unter 1.000 €' },
      { value: 2, text: '1.000–3.000 €' },
      { value: 3, text: '3.000–8.000 €' },
      { value: 4, text: '8.000–20.000 €' },
      { value: 5, text: '20.000 €+' },
    ],
  },
  {
    id: 'timeline',
    label: 'Wann soll die erste KI-Lösung produktiv sein?',
    hint: 'Realistischer Zeitrahmen.',
    options: [
      { value: 5, text: 'Schnellstmöglich' },
      { value: 4, text: 'Innerhalb 1 Monat' },
      { value: 3, text: 'Innerhalb 3 Monaten' },
      { value: 2, text: '6–12 Monate' },
      { value: 1, text: 'Noch unklar' },
    ],
  },
];

function getScore(answers: Record<string, number>): number {
  const total = Object.values(answers).reduce((s, v) => s + v, 0);
  const max = questions.length * 5;
  return Math.round((total / max) * 100);
}

function getLevel(score: number): { label: string; color: string; recommendation: string } {
  if (score <= 30) return {
    label: 'KI-Neuling',
    color: 'text-orange-500',
    recommendation: 'Starten Sie mit einem KI-Schnellstart: ein konkreter Use-Case, 5 Tage, individuelles Angebot. Danach wissen Sie ob KI für Sie passt.',
  };
  if (score <= 60) return {
    label: 'KI-Bereit',
    color: 'text-accent',
    recommendation: 'Sie haben die Grundlagen. Ein KI-Audit (1–2 Tage) identifiziert die Top 3 Use-Cases mit ROI-Schätzung. Danach: gezielte Umsetzung.',
  };
  return {
    label: 'KI-Reif',
    color: 'text-green-500',
    recommendation: 'Sie sind besser aufgestellt als 80% der KMUs. Jetzt geht es um Optimierung und Skalierung. Sprechen wir über die nächsten Schritte.',
  };
}

export const KIAudit: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const q = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const score = submitted ? getScore(answers) : 0;
  const level = submitted ? getLevel(score) : null;

  const handleSelect = (value: number) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 200);
    } else {
      setTimeout(() => setSubmitted(true), 300);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted && level) {
    return (
      <div className="min-h-screen bg-base text-ink font-body">
        <RouteMeta title="KI-Audit | Ainzigartig" description="Ihr unabhängiges KI-Reifegradgutachten." />
        <section className="pt-28 pb-20 px-6 md:px-8">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
              Ihr KI-Reifegrad
            </span>

            <p className={`font-editorial text-5xl md:text-7xl mb-2 ${level.color}`}>{score}</p>
            <p className="font-editorial text-2xl text-ink mb-2">{level.label}</p>
            <p className="text-faint text-xs uppercase tracking-[0.2em] mb-10">
              KI-Reifegrad-Score · {questions.length} Fragen
            </p>

            <div className="border border-faint/30 bg-ink/[0.03] p-8 text-left mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-faint mb-3">Empfehlung</p>
              <p className="text-sm text-ink leading-relaxed">{level.recommendation}</p>
            </div>

            {/* Show answers summary */}
            <div className="text-left mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-faint mb-4">Ihre Antworten</p>
              <div className="space-y-2">
                {questions.map((question) => {
                  const answer = answers[question.id];
                  const option = question.options.find((o) => o.value === answer);
                  return (
                    <div key={question.id} className="flex justify-between items-baseline border-b border-faint/20 pb-2">
                      <span className="text-xs text-muted">{question.label}</span>
                      <span className="text-xs text-ink font-medium">{option?.text || '—'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#kontakt"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 transition-colors"
              >
                Ergebnis besprechen
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-faint/30 text-sm text-muted hover:border-ink/30 transition-colors cursor-pointer"
              >
                Neu starten
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-ink font-body">
      <RouteMeta title="KI-Audit | Ainzigartig" description="Ihr unabhängiges KI-Reifegradgutachten." />
      <section className="pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
              KI-Reifegrad-Check
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-ink mb-4">
              Wie reif ist Ihr Unternehmen für KI?
            </h1>
            <p className="text-muted text-sm max-w-lg mx-auto">
              6 Fragen. 60 Sekunden. Am Ende wissen Sie: Was ist machbar, was ist priorität, und was kostet es.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-faint tabular-nums">Frage {currentQ + 1} von {questions.length}</span>
              <span className="text-xs text-faint tabular-nums">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-faint/10 w-full">
              <div
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="font-editorial text-xl md:text-2xl text-ink mb-2">{q.label}</h2>
            <p className="text-xs text-faint">{q.hint}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-5 py-4 border transition-all duration-200 cursor-pointer ${
                  answers[q.id] === option.value
                    ? 'border-accent bg-accent/5'
                    : 'border-faint/30 hover:border-faint/60 bg-transparent'
                }`}
              >
                <span className="text-sm text-ink">{option.text}</span>
              </button>
            ))}
          </div>

          {/* Back button */}
          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ(currentQ - 1)}
              className="mt-6 text-xs text-faint hover:text-ink transition-colors cursor-pointer"
            >
              ← Zurück
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

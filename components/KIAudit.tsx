import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

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
      { value: 1, text: '1–3' }, { value: 2, text: '4–10' }, { value: 3, text: '11–25' },
      { value: 4, text: '26–50' }, { value: 5, text: '50+' },
    ],
  },
  {
    id: 'processes',
    label: 'Wie viele wiederkehrende Prozesse haben Sie identifiziert?',
    hint: 'Zum Beispiel E-Mails beantworten, Angebote erstellen oder Daten erfassen.',
    options: [
      { value: 1, text: 'Keine / weiß nicht' }, { value: 2, text: '1–2' }, { value: 3, text: '3–5' },
      { value: 4, text: '6–10' }, { value: 5, text: '10+' },
    ],
  },
  {
    id: 'tools',
    label: 'Welche digitalen Tools nutzen Sie bereits?',
    hint: 'CRM, E-Mail, Buchhaltung, Website und weitere operative Systeme.',
    options: [
      { value: 1, text: 'Nur E-Mail & Office' }, { value: 2, text: 'E-Mail + 1–2 Tools' },
      { value: 3, text: '3–5 Tools' }, { value: 4, text: '6+ Tools, teilweise vernetzt' },
      { value: 5, text: 'Viele Systeme, gut vernetzt' },
    ],
  },
  {
    id: 'pain',
    label: 'Wo liegt heute der größte Engpass?',
    hint: 'Was kostet regelmäßig Zeit oder erzeugt unnötige Fehler?',
    options: [
      { value: 1, text: 'Kundenservice / Anfragen' }, { value: 2, text: 'Vertrieb / Lead-Qualifizierung' },
      { value: 3, text: 'Dokumente / Verwaltung' }, { value: 4, text: 'Recruiting / Personal' },
      { value: 5, text: 'Mehrere Bereiche gleichzeitig' },
    ],
  },
  {
    id: 'budget',
    label: 'Welcher Rahmen ist für einen ersten KI-Einsatz realistisch?',
    hint: 'Nur zur Einordnung des sinnvollen Projektumfangs.',
    options: [
      { value: 1, text: 'Unter 1.000 €' }, { value: 2, text: '1.000–3.000 €' }, { value: 3, text: '3.000–8.000 €' },
      { value: 4, text: '8.000–20.000 €' }, { value: 5, text: '20.000 €+' },
    ],
  },
  {
    id: 'timeline',
    label: 'Wann soll die erste KI-Lösung produktiv sein?',
    hint: 'Der gewünschte Zeitrahmen hilft beim Scoping.',
    options: [
      { value: 5, text: 'Schnellstmöglich' }, { value: 4, text: 'Innerhalb 1 Monat' }, { value: 3, text: 'Innerhalb 3 Monaten' },
      { value: 2, text: '6–12 Monate' }, { value: 1, text: 'Noch unklar' },
    ],
  },
];

function getScore(answers: Record<string, number>): number {
  const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
  return Math.round((total / (questions.length * 5)) * 100);
}

function getLevel(score: number): { label: string; color: string; recommendation: string } {
  if (score <= 30) return {
    label: 'Orientierungsphase',
    color: 'text-[#B77A36]',
    recommendation: 'Ein kleiner, klar abgegrenzter Use Case ist der sinnvollste nächste Schritt. So lernen Sie schnell, welche Daten und Prozesse für KI wirklich geeignet sind.',
  };
  if (score <= 60) return {
    label: 'Gute Ausgangslage',
    color: 'text-accent-hover',
    recommendation: 'Sie haben bereits mehrere Voraussetzungen. Jetzt lohnt sich eine strukturierte Priorisierung der Use Cases nach Wirkung, Aufwand und Integrationsrisiko.',
  };
  return {
    label: 'Bereit für Umsetzung',
    color: 'text-ink',
    recommendation: 'Ihre Antworten sprechen für eine solide Ausgangslage. Der nächste Schritt ist ein konkreter Business Case mit klaren Zielgrößen, Datenquellen und Verantwortlichkeiten.',
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
    setAnswers((current) => ({ ...current, [q.id]: value }));
    if (currentQ < questions.length - 1) setTimeout(() => setCurrentQ((index) => index + 1), 180);
    else setTimeout(() => setSubmitted(true), 250);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted && level) {
    return (
      <div className="min-h-screen bg-base text-ink font-body">
        <RouteMeta title="KI-Reifegrad-Check | Ainzigartig" description="Ein kompakter Check für die Ausgangslage Ihres Unternehmens." />
        <section className="pt-36 pb-24 px-6">
          <div className="max-w-[820px] mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Ihr Ergebnis</p>
              <p className={`font-editorial text-6xl md:text-8xl leading-none ${level.color}`}>{score}</p>
              <h1 className="font-editorial text-3xl md:text-4xl mt-3">{level.label}</h1>
              <p className="text-xs text-light mt-2">Orientierungs-Score aus {questions.length} Antworten</p>
            </div>

            <div className="brand-card bg-surface p-6 md:p-8 mb-6">
              <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-3">Einordnung</p>
              <p className="text-sm md:text-base text-muted leading-relaxed">{level.recommendation}</p>
            </div>

            <div className="brand-card bg-surface p-6 md:p-8 mb-8">
              <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-5">Ihre Antworten</p>
              <div className="divide-y divide-ink/10">
                {questions.map((question) => {
                  const option = question.options.find((entry) => entry.value === answers[question.id]);
                  return (
                    <div key={question.id} className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-5">
                      <span className="text-xs text-muted">{question.label}</span>
                      <span className="text-xs text-ink font-semibold sm:text-right">{option?.text || '—'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/#kontakt" className="brand-pill bg-ink text-white hover:bg-[#33312E]">Ergebnis besprechen</Link>
              <button onClick={handleRestart} className="brand-pill bg-base text-ink hover:bg-surface">Neu starten</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-ink font-body">
      <RouteMeta title="KI-Reifegrad-Check | Ainzigartig" description="Sechs Fragen zur KI-Ausgangslage Ihres Unternehmens." />
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-[760px] mx-auto">
          <header className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">KI-Reifegrad-Check</p>
            <h1 className="font-editorial text-[clamp(2.5rem,5vw,3.9rem)] leading-[1.04] tracking-[-0.03em]">Wie gut ist Ihre Ausgangslage für KI?</h1>
            <p className="text-sm md:text-base text-muted max-w-xl mx-auto mt-4">Sechs kurze Fragen. Danach bekommen Sie eine erste Orientierung, welcher nächste Schritt zu Ihrer Situation passt.</p>
          </header>

          <div className="brand-card bg-surface p-6 md:p-9">
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-2 text-xs text-light">
                <span>Frage {currentQ + 1} von {questions.length}</span>
                <span className="tabular">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden">
                <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mb-7">
              <h2 className="font-editorial text-2xl md:text-[2rem] leading-tight">{q.label}</h2>
              <p className="text-xs md:text-sm text-light mt-2">{q.hint}</p>
            </div>

            <div className="space-y-2.5">
              {q.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl border text-sm transition-all duration-200 ${
                    answers[q.id] === option.value
                      ? 'border-accent-mid bg-accent/15 shadow-soft'
                      : 'border-ink/12 bg-base/45 hover:border-ink/30 hover:bg-base'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {currentQ > 0 && (
              <button onClick={() => setCurrentQ((index) => index - 1)} className="mt-6 text-xs text-light hover:text-ink transition-colors">← Zurück</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

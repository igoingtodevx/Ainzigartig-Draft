import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const questions = [
  {
    title: 'Wo lohnt sich KI wirklich?',
    text: 'Wir untersuchen Prozessvolumen, Reibung, Datenlage und Entscheidungsrisiko, bevor ein Tool ausgewählt wird.',
  },
  {
    title: 'Was lässt sich sinnvoll integrieren?',
    text: 'Wir prüfen vorhandene Systeme, Schnittstellen, Verantwortlichkeiten und Freigaben als Teil der Lösung.',
  },
  {
    title: 'Wie wird Nutzen messbar?',
    text: 'Wir definieren eine belastbare Ausgangslage, wenige relevante Kennzahlen und einen Review-Rhythmus.',
  },
  {
    title: 'Was darf nicht automatisch passieren?',
    text: 'Wir legen Grenzen, Kontrollpunkte und menschliche Übergaben fest, bevor der erste Workflow produktiv geht.',
  },
];

const phases = [
  {
    number: '01',
    title: 'Verstehen',
    text: 'Prozess, Ziel, Beteiligte, Datenquellen und Engpässe gemeinsam auf ein belastbares Bild bringen.',
    output: 'Prozessbild, Use-Case-Landkarte, offene Annahmen',
  },
  {
    number: '02',
    title: 'Entscheiden',
    text: 'Nutzen, Aufwand, technische Machbarkeit und Risiken so bewerten, dass eine klare Priorität entsteht.',
    output: 'Business Case, Risikologik, priorisierter Scope',
  },
  {
    number: '03',
    title: 'Bauen',
    text: 'Den ersten Einsatz als echtes System umsetzen, integrieren und mit klaren Übergaben in Betrieb nehmen.',
    output: 'Funktionsfähiger Workflow, Abnahme, Messpunkte',
  },
];

export const KIBeratung: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body">
    <RouteMeta title="KI-Strategie & Umsetzung | Ainzigartig" description="Von der Prozessanalyse bis zum produktiven KI-System: technische und wirtschaftliche Beratung mit Umsetzungskompetenz." />

    <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-14 lg:gap-20 items-end">
        <div className="lg:col-span-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">AI Strategy & Business Cases</p>
          <h1 className="font-editorial text-[clamp(3rem,6vw,5.5rem)] leading-[1] text-ink">Beratung, die in ein funktionierendes System mündet.</h1>
          <div className="w-20 h-px bg-accent mt-9 mb-7" />
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl">Wir verbinden Prozessanalyse, Controlling- und Risikologik mit praktischer KI- und Softwareentwicklung. Das Ergebnis ist kein Strategiedokument ohne Anschluss, sondern ein begründeter nächster Schritt.</p>
        </div>
        <div className="lg:col-span-4 border-t border-ink pt-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-faint mb-4">Typische Ergebnisse</p>
          <ul className="space-y-3 text-sm text-ink">
            <li>Priorisierte Use Cases</li>
            <li>Business Case und Messlogik</li>
            <li>Technischer Zielentwurf</li>
            <li>Risiken und Kontrollpunkte</li>
            <li>Umsetzbarer erster Scope</li>
          </ul>
          <Link to="/#kontakt" className="inline-block mt-7 text-sm text-accent underline underline-offset-4">Situation besprechen</Link>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 px-6 md:px-8 border-y border-faint/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-12 gap-6 mb-12 md:mb-16">
          <h2 className="font-editorial text-3xl md:text-5xl md:col-span-7">Die Fragen vor dem Modell.</h2>
          <p className="text-sm text-muted leading-relaxed md:col-span-5">Gute KI-Beratung beginnt nicht mit einem Produktnamen. Sie beginnt mit einer Entscheidung, die technisch, wirtschaftlich und organisatorisch nachvollziehbar sein muss.</p>
        </div>
        <div className="grid md:grid-cols-2 border-t border-l border-faint/50">
          {questions.map((question, index) => (
            <article key={question.title} className="min-h-[230px] p-7 md:p-9 border-r border-b border-faint/50">
              <span className="text-[10px] text-faint tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-editorial text-2xl mt-8 mb-4">{question.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{question.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 px-6 md:px-8 bg-ink/[0.025]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Arbeitsmodell</p>
        <h2 className="font-editorial text-3xl md:text-5xl mb-12 md:mb-16">Von der Frage bis zum Betrieb.</h2>
        <div className="border-t border-ink">
          {phases.map((phase) => (
            <article key={phase.number} className="grid md:grid-cols-[70px_1fr_1fr] gap-5 md:gap-12 py-7 border-b border-faint/50">
              <span className="text-[10px] text-faint tabular-nums pt-1">{phase.number}</span>
              <div><h3 className="font-editorial text-2xl mb-3">{phase.title}</h3><p className="text-sm text-muted leading-relaxed">{phase.text}</p></div>
              <div className="md:border-l md:border-faint/50 md:pl-8"><p className="text-[10px] uppercase tracking-[0.18em] text-faint mb-3">Liefergegenstand</p><p className="text-sm text-ink leading-relaxed">{phase.output}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-editorial text-3xl md:text-5xl mb-6">Erst verstehen. Dann entscheiden. Danach bauen.</h2>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl mx-auto mb-9">Wenn bereits ein konkreter Prozess oder eine Produktidee existiert, können wir direkt mit der technischen und wirtschaftlichen Einordnung beginnen.</p>
        <Link to="/#kontakt" className="inline-flex px-6 py-3 bg-ink text-base text-sm hover:bg-accent transition-colors">Gespräch anfragen</Link>
      </div>
    </section>
  </main>
);

export default KIBeratung;

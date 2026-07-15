import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const steps = [
  {
    num: '01',
    title: 'Prozess-Check',
    desc: 'Wir klären Engpass, Verantwortung, vorhandene Daten und Systemgrenzen. Daraus entsteht ein abgegrenzter nächster Schritt – oder die ehrliche Empfehlung, noch nicht zu automatisieren.',
  },
  {
    num: '02',
    title: 'Abgegrenzter Pilot',
    desc: 'Wir bauen einen ersten, überprüfbaren Workflow mit passenden Datenquellen, Integration und menschlicher Übergabe.',
  },
  {
    num: '03',
    title: 'Testen, freigeben, betreiben',
    desc: 'Sie testen mit realistischen Fällen. Erst nach klarer Freigabe wird ein System produktiv eingesetzt; Zuständigkeiten und nächste Verbesserungen bleiben sichtbar.',
  },
];

const includes = [
  'klar abgegrenzter Anwendungsfall',
  'Daten- und Zugriffscheck',
  'passender Integrationsvorschlag',
  'Testfälle und menschliche Übergabe',
  'dokumentierter nächster Entscheidungspunkt',
];

export const KISchnellstart: React.FC = () => {
  return (
    <div className="min-h-screen bg-base text-ink font-body">
      <RouteMeta title="KI-Pilot | Ainzigartig" description="Ein abgegrenzter Start in einen überprüfbaren KI-Workflow." />
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
            KI-Schnellstart
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-ink mb-6">
            Ein sinnvoll abgegrenzter<br />
            <span className="text-accent">KI-Pilot statt großer Wette.</span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Wir starten nicht mit einem Modell, sondern mit einem Prozess. Gemeinsam prüfen wir Nutzen,
            Daten, Integration, Risiken und die menschliche Übergabe – bevor etwas produktiv geht.
          </p>

          <Link
            to="/#kontakt"
            className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 transition-colors"
          >
            Jetzt Erstgespräch vereinbaren
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Preis */}
      <section className="py-16 px-6 md:px-8 bg-ink/[0.03]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-faint mb-2">Preis</p>
          <p className="font-editorial text-3xl md:text-5xl text-ink mb-2">Auf Anfrage</p>
          <p className="text-muted text-sm">Individuell nach Prozess- und Integrationsumfang</p>

          <div className="mt-10 max-w-lg mx-auto text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-faint mb-4">Enthalten</p>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink">
                  <span className="material-symbols-outlined text-accent text-base mt-0.5">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12">
            So läuft es ab
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="border-t border-faint/50 pt-6">
                <span className="text-xs text-faint font-body tabular-nums">{step.num}</span>
                <h3 className="font-editorial text-lg text-ink mt-2 mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="py-16 px-6 md:px-8 bg-ink/[0.03]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-8">
            Für wen ist das?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Geeignet', items: [
                'Ein klarer wiederkehrender Prozess (z. B. Anfragen, Dokumente, Angebotsvorbereitung)',
                'Eine verantwortliche Person für fachliche Freigaben',
                'Zugang zu den benötigten Informationen und Systemen',
                'Bereitschaft, Wirkung und Risiken zu prüfen',
              ]},
              { label: 'Nicht geeignet', items: [
                'Unklare Prozessverantwortung oder keine Testfälle',
                'Ungeklärte Daten- oder Zugriffsrechte',
                'Kritische Entscheidungen ohne menschliche Freigabe',
              ]},
            ].map((col) => (
              <div key={col.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-faint mb-4">{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-muted leading-relaxed flex items-start gap-2">
                      <span className="w-4 h-px bg-accent mt-2 flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8 text-center">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-4">
          Bereit für den ersten Schritt?
        </h2>
        <p className="text-muted text-sm mb-8 max-w-lg mx-auto">
          Ein erstes Gespräch klärt, ob ein Pilot sinnvoll ist und welche Voraussetzungen noch fehlen.
        </p>
        <Link
          to="/#kontakt"
          className="inline-flex items-center gap-2 text-sm text-accent font-body group"
        >
          <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
            Erstgespräch vereinbaren
          </span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </Link>
      </section>
    </div>
  );
};

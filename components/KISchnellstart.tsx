import React from 'react';

const mailto = 'mailto:info@ainzigartig.de?subject=KI-Schnellstart%20%E2%80%94%20Ich%20will%20starten';

const steps = [
  {
    num: '01',
    title: '30-Min-Gespräch',
    desc: 'Wir klären: Was ist Ihr größtes Engpass? Welcher Prozess frisst unnötig Zeit? Daraus entsteht ein konkreter Auftrag.',
  },
  {
    num: '02',
    title: 'Umsetzung in 5 Tagen',
    desc: 'Wir bauen Ihren ersten KI-Assistenten — trainiert auf Ihre Daten, integriert in Ihren Alltag. Keine Monate, keine Pilotprojekte.',
  },
  {
    num: '03',
    title: 'Live & nutzbar',
    desc: 'Am Tag 5 steht Ihr KI-Assistent. Sie testen, wir passen an. Danach: Entweder weiter mit uns oder vollkommen eigenständig.',
  },
];

const includes = [
  'KI-Assistent für Ihren Top-Use-Case',
  'Trainiert auf Ihren echten Daten',
  'Integration in bestehende Tools',
  '1 Woche Umsetzung',
  'Nachbesserung inklusive',
];

export const KISchnellstart: React.FC = () => {
  return (
    <div className="min-h-screen bg-base text-ink font-body">
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
            KI-Schnellstart
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-ink mb-6">
            Ihr erster KI-Assistent<br />
            <span className="text-accent">in 5 Tagen. Festpreis 2.500 €.</span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Kein 6-Monats-Projekt. Kein unendliches Beratungsgespräch.
            In 5 Tagen steht ein KI-Assistent, der Ihren Alltag wirklich entlastet —
            trainiert auf Ihre Daten, integriert in Ihre Tools.
          </p>

          <a
            href={mailto}
            className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 transition-colors"
          >
            Jetzt Erstgespräch vereinbaren
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* Preis */}
      <section className="py-16 px-6 md:px-8 bg-ink/[0.03]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-faint mb-2">Festpreis</p>
          <p className="font-editorial text-5xl md:text-7xl text-ink mb-2">2.500 €</p>
          <p className="text-muted text-sm">zzgl. MwSt. · Einmalig · 5 Tage</p>

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
              { label: '✓ Passt', items: [
                'Unternehmen mit 5–50 Mitarbeitenden',
                'Mindestens ein wiederkehrender Prozess (Kundenservice, E-Mails, Angebote)',
                'Team, das KI ausprobieren WILL',
                'Budget unter 5.000 € für den Einstieg',
              ]},
              { label: '✗ Passt nicht', items: [
                'Komplexe Enterprise-Integration (SAP, Oracle)',
                'Wunsch nach einem strategischen KI-Fahrplan (dafür: KI-Beratung)',
                'Unter 3 Mitarbeitende',
              ]},
            ].map((col) => (
              <div key={col.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-faint mb-4">{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-muted leading-relaxed flex items-start gap-2">
                      <span className="text-accent mt-0.5">{col.label === '✓ Passt' ? '→' : '→'}</span>
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
          30 Minuten. Klare Antwort ob KI für Sie passt — oder nicht. Kostenfrei, unverbindlich.
        </p>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 text-sm text-accent font-body group"
        >
          <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
            Erstgespräch vereinbaren
          </span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </a>
      </section>
    </div>
  );
};

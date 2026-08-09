import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const steps = [
  { num: '01', title: '30-Minuten-Check', desc: 'Wir klären den Engpass, die verfügbaren Daten und ob sich der Use Case für einen kompakten Schnellstart eignet.' },
  { num: '02', title: 'Umsetzung', desc: 'Wir bauen den Assistenten, verbinden die nötigen Daten und testen mit realistischen Fällen aus Ihrem Arbeitsalltag.' },
  { num: '03', title: 'Übergabe & Feinschliff', desc: 'Sie testen selbst. Wir korrigieren, dokumentieren und entscheiden gemeinsam, ob und wie es danach weitergeht.' },
];

const includes = [
  'Ein klar abgegrenzter KI-Use-Case',
  'Arbeit mit Ihren vorhandenen Daten',
  'Integration in einen bestehenden Ablauf',
  '5 Tage als Zielrahmen bei passendem Scope',
  'Feinschliff & Übergabe',
];

export const KISchnellstart: React.FC = () => (
  <div className="min-h-screen bg-base text-ink font-body">
    <RouteMeta title="KI-Schnellstart | Ainzigartig" description="In 5 Tagen zum ersten klar abgegrenzten KI-Assistenten." />

    <section className="pt-36 pb-20 px-6">
      <div className="max-w-[920px] mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">KI-Schnellstart</p>
        <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.8rem)] leading-[1.02] tracking-[-0.035em] font-normal">
          Ein erster KI-Assistent.<br />
          <span className="hand-underline font-body font-extrabold">5 Tage Zielrahmen.</span>
        </h1>
        <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed mt-7">
          Kein monatelanges Vorprojekt. Wir wählen einen kleinen, sinnvollen Scope und bauen etwas, das Sie mit echten Fällen ausprobieren können.
        </p>
        <div className="mt-9 flex justify-center">
          <Link to="/#kontakt" className="brand-pill bg-ink text-white hover:bg-[#33312E] px-7 py-3.5">
            Schnellstart besprechen
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="py-20 px-6 bg-[#F3EFEA] border-y border-ink/10">
      <div className="max-w-[1140px] mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-3">Im Scope</p>
          <h2 className="font-editorial text-3xl md:text-4xl leading-tight">Klein genug, um schnell zu lernen.</h2>
          <p className="text-sm text-muted leading-relaxed mt-4">Der Schnellstart ist bewusst kein Enterprise-Rollout. Er soll einen echten Anwendungsfall belastbar machen.</p>
        </div>
        <div className="brand-card bg-surface p-6 md:p-8">
          <ul className="space-y-4">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted">
                <span className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-ink">check</span>
                </span>
                <span className="pt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-24 px-6">
      <div className="max-w-[1140px] mx-auto">
        <header className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-3">Ablauf</p>
          <h2 className="font-editorial text-3xl md:text-4xl">So läuft der Schnellstart</h2>
        </header>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <article key={step.num} className="brand-card bg-surface p-6 md:p-7 min-h-[240px]">
              <span className="font-editorial text-4xl text-accent-mid">{step.num}</span>
              <h3 className="font-editorial text-2xl mt-8 mb-3">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-24 px-6">
      <div className="max-w-[900px] mx-auto rounded-[30px] bg-accent p-8 md:p-12 text-center shadow-card">
        <h2 className="font-editorial text-3xl md:text-4xl">Passt der Schnellstart zu Ihrem Fall?</h2>
        <p className="text-sm md:text-base text-ink/70 mt-3 max-w-xl mx-auto">Das lässt sich in einem kurzen Gespräch schnell klären. Wenn der Scope zu groß oder zu unscharf ist, sagen wir das direkt.</p>
        <Link to="/#kontakt" className="brand-pill mt-7 bg-ink text-white hover:bg-[#33312E]">Erstgespräch vereinbaren</Link>
      </div>
    </section>
  </div>
);

import React from 'react';
import analyzeIllustration from '../Assets/run_b_asset_pack/01_process_analyse_workspace_v3.webp';
import prioritizeIllustration from '../Assets/run_b_asset_pack/02_process_priorisieren_board_v3.webp';
import implementIllustration from '../Assets/run_b_asset_pack/03_process_umsetzen_implementierung_v3.webp';

const steps = [
  {
    number: '01',
    title: 'Verstehen',
    subtitle: 'Problem, Prozess, Daten',
    text: 'Wir bilden Auslöser, Arbeitsschritte, Ausnahmen, Daten und Verantwortliche ab. So wird sichtbar, ob das Problem überhaupt Software braucht — und welche Annahmen noch fehlen.',
    image: analyzeIllustration,
    alt: 'Handgezeichnete Arbeitsfläche zur Analyse von Prozessen, Daten und Zielen',
  },
  {
    number: '02',
    title: 'Priorisieren',
    subtitle: 'Wirkung, Aufwand, Risiko',
    text: 'Mögliche Lösungen werden nach Geschäftswert, Integrationsaufwand, Risiko und Testbarkeit geordnet. Ein kleiner belastbarer Scope schlägt eine lange Wunschliste.',
    image: prioritizeIllustration,
    alt: 'Handgezeichnetes Priorisierungsboard für Wirkung, Aufwand und Risiko',
  },
  {
    number: '03',
    title: 'Bauen & prüfen',
    subtitle: 'Echte Fälle, klare Grenzen',
    text: 'Wir setzen den priorisierten Kern um, testen ihn mit realistischen Fällen und dokumentieren Fehlerwege, Freigaben und die Voraussetzungen für einen möglichen Betrieb.',
    image: implementIllustration,
    alt: 'Handgezeichnete Entwicklungsumgebung zur technischen Umsetzung einer Softwarelösung',
  },
];

export const HomeProcess: React.FC = () => (
  <section id="prozess" className="scroll-mt-24 border-y border-ink/10 bg-[#F3EFEA] py-20 md:py-28">
    <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
      <header className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-accent-hover">So entsteht ein System</p>
          <h2 className="mt-3 font-editorial text-[clamp(2.45rem,5vw,4rem)] leading-[1.02] tracking-[-.03em]">Erst Klarheit.<br />Dann Code.</h2>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">Kein Transformationsprogramm und keine Tool-Lotterie. Drei nachvollziehbare Schritte vom echten Arbeitsproblem zum prüfbaren Produktstand.</p>
      </header>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {steps.map((step) => (
          <article key={step.number} className="brand-card overflow-hidden bg-surface">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-[#E9E2D9]">
              <img src={step.image} alt={step.alt} className="h-full w-full object-cover" loading="lazy" />
              <span className="absolute left-4 top-4 rounded-full border border-ink/15 bg-base/85 px-3 py-1 text-[10px] font-bold tracking-[.14em] text-ink">{step.number}</span>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-accent-hover">{step.subtitle}</p>
              <h3 className="mt-2 font-editorial text-3xl leading-tight text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-light">Welche Tests, Dokumentation und Betriebsanforderungen nötig sind, hängt vom konkreten Risiko und Systemkontext ab.</p>
    </div>
  </section>
);

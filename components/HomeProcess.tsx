import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Kennenlernen',
    text: 'Wir lernen Ihr Unternehmen, Ihre Prozesse und den konkreten Business Case kennen. Daraus entwickeln wir sinnvolle KI-Anwendungsfälle statt generischer Ideen.',
    image: '/Assets/svg/Gemini_Generated_Image_tn5b60tn5b60tn5b.svg',
    alt: 'Illustration zum Kennenlernen und Analysieren',
  },
  {
    number: '2',
    title: 'Priorisieren',
    text: 'KI muss einen klaren Nutzen haben. Deshalb priorisieren wir nach Wirkung, Aufwand, Risiko und ROI und legen offen, womit sich der Start wirklich lohnt.',
    image: '/Assets/Generated image 2.png',
    alt: 'Illustration zur Priorisierung von KI-Anwendungsfällen',
  },
  {
    number: '3',
    title: 'Umsetzen',
    text: 'Wir bauen die Lösung nah an Ihren bestehenden Prozessen und Systemen, testen mit echten Fällen und bringen sie in einen Zustand, den Ihr Team tatsächlich nutzen kann.',
    image: '/Assets/Generated image 1.png',
    alt: 'Illustration zur Umsetzung einer KI-Lösung',
  },
];

export const HomeProcess: React.FC = () => (
  <section id="prozess" className="py-24 md:py-32 bg-base border-y border-ink/10">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Unsere Methode</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Wir arbeiten gemeinsam mit Ihnen
        </h2>
      </header>

      <div className="relative max-w-[940px] mx-auto">
        <div className="hidden md:block absolute left-[19px] top-5 bottom-24 w-px bg-ink/40" aria-hidden="true" />

        <div className="space-y-16 md:space-y-24">
          {steps.map((step) => (
            <article key={step.number} className="grid md:grid-cols-[1.08fr_.92fr] gap-8 md:gap-14 items-center relative">
              <div className="flex gap-5 md:gap-7 items-start relative z-10">
                <span className="font-editorial text-[2.75rem] leading-none text-ink bg-base min-w-10 pt-0.5">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-editorial text-2xl md:text-[2rem] leading-tight text-ink mb-3">{step.title}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted max-w-xl">{step.text}</p>
                </div>
              </div>

              <div className="brand-card bg-surface-soft/70 min-h-[240px] md:min-h-[280px] p-5 md:p-7 flex items-center justify-center overflow-hidden">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full max-h-[260px] object-contain"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

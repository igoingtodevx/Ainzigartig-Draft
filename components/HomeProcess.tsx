import React, { useEffect, useRef } from 'react';
import analyzeIllustration from '../Assets/svg/Gemini_Generated_Image_tn5b60tn5b60tn5b.svg';
import prioritizeIllustration from '../Assets/Generated image 2.webp';
import implementIllustration from '../Assets/Generated image 1.webp';

const steps = [
  {
    number: '1',
    title: 'Kennenlernen',
    text: 'Wir lernen Ihren Business Case kennen und erstellen eine saubere Case-Analyse. Gemeinsam mit Ihnen entwickeln wir konkrete Use Cases für KI in Ihrem Unternehmen: ausgehend von echten Prozessen, nicht von einer generischen Tool-Liste.',
    image: analyzeIllustration,
    alt: 'Illustration zum Kennenlernen und Analysieren',
  },
  {
    number: '2',
    title: 'Priorisieren',
    text: 'KI muss einen klaren wirtschaftlichen Nutzen haben. Deshalb priorisieren wir die Use Cases nach Wirkung, Aufwand, Risiko und ROI und besprechen transparent, womit sich der Start wirklich lohnt.',
    image: prioritizeIllustration,
    alt: 'Illustration zur Priorisierung von KI-Anwendungsfällen',
  },
  {
    number: '3',
    title: 'Umsetzen',
    text: 'Aus der priorisierten Idee wird ein funktionierender Prozess. Wir bauen nah an Ihren bestehenden Systemen, testen mit realistischen Fällen und bringen die Lösung in einen Zustand, den Ihr Team tatsächlich im Alltag einsetzen kann.',
    image: implementIllustration,
    alt: 'Illustration zur Umsetzung einer KI-Lösung',
  },
];

export const HomeProcess: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll('[data-process-reveal]')) as HTMLElement[];
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 90, 270)}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="prozess" className="py-24 md:py-32 bg-base border-y border-ink/10 scroll-mt-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <header data-process-reveal className="process-reveal text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Unsere Methode</p>
          <h2 className="font-editorial text-[clamp(2.5rem,5vw,3.65rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
            Vom Problem zur Lösung.
          </h2>
          <p className="text-base md:text-lg text-muted leading-relaxed mt-5 max-w-2xl mx-auto">
            Kein sechsmonatiges Transformationsprogramm. Erst verstehen wir den relevanten Prozess, dann priorisieren wir nach Nutzen, und erst danach bauen wir.
          </p>
        </header>

        <div className="relative max-w-[980px] mx-auto">
          <div className="hidden md:block absolute left-[30px] top-7 bottom-24 w-px bg-ink/70" aria-hidden="true" />

          <div className="space-y-24 md:space-y-32">
            {steps.map((step) => (
              <article
                key={step.number}
                data-process-reveal
                className="process-reveal grid md:grid-cols-[1.02fr_.98fr] gap-10 md:gap-16 items-center relative"
              >
                <div className="flex gap-6 md:gap-8 items-start relative z-10">
                  <span className="font-editorial text-[4rem] md:text-[4.4rem] leading-[.82] text-ink bg-base min-w-[62px] pt-1">
                    {step.number}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-editorial text-[2rem] md:text-[2.55rem] leading-[1.05] text-ink mb-6">
                      {step.title}
                    </h3>
                    <p className="font-editorial text-[1.25rem] md:text-[1.45rem] leading-[1.55] text-muted max-w-[560px]">
                      {step.text}
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[250px] md:min-h-[300px] flex items-center justify-center px-3 pb-5">
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full max-w-[470px] max-h-[285px] object-contain"
                    loading="lazy"
                  />
                  <div className="absolute left-[6%] right-[6%] bottom-0 h-px bg-ink/25" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

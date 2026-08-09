import React, { useState } from 'react';

const faqItems = [
  {
    q: 'Für welche Unternehmen arbeitet ihr?',
    a: 'Vor allem mit kleinen und mittelständischen Unternehmen im deutschsprachigen Raum. Entscheidend ist weniger die Branche als ein konkreter Prozess, ein wiederkehrendes Problem oder ein klarer KI-Anwendungsfall.',
  },
  {
    q: 'Müssen wir technisches Vorwissen mitbringen?',
    a: 'Nein. Wir übersetzen technische Möglichkeiten in konkrete Entscheidungen und bauen die Lösung so, dass Ihr Team sie im Alltag nutzen kann.',
  },
  {
    q: 'Was kostet eine Zusammenarbeit?',
    a: 'Das hängt vom Scope ab. Das Erstgespräch ist kostenlos. Danach bekommen Sie eine klare Einschätzung zu Aufwand, sinnvoller Projektgröße und Kosten, bevor Sie sich entscheiden.',
  },
  {
    q: 'Arbeitet ihr herstellerunabhängig?',
    a: 'Ja. Wir wählen Modelle und Tools nach Anwendungsfall, Datenschutz, Kosten und Integrationsaufwand statt nach einem festen Hersteller-Stack.',
  },
  {
    q: 'Wie schnell sehen wir Ergebnisse?',
    a: 'Ein klar abgegrenzter Prototyp kann sehr schnell entstehen. Für produktive Integrationen hängt die Dauer von Daten, Schnittstellen, Sicherheitsanforderungen und gewünschtem Umfang ab.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[#F3EFEA] border-y border-ink/10">
      <div className="max-w-[900px] mx-auto px-6">
        <header className="text-center mb-12 md:mb-14">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">FAQ</p>
          <h2 className="font-editorial text-[clamp(2.35rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
            Häufige Fragen
          </h2>
        </header>

        <div className="brand-card bg-surface overflow-hidden divide-y divide-ink/10">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-5 md:px-7 md:py-6 text-left group"
                  aria-expanded={open}
                >
                  <span className="font-editorial text-lg md:text-xl text-ink leading-snug">{item.q}</span>
                  <span className={`w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${open ? 'rotate-45 bg-accent/25' : 'bg-base'}`}>
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-7 pb-6 text-sm md:text-[0.95rem] text-muted leading-relaxed max-w-3xl">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

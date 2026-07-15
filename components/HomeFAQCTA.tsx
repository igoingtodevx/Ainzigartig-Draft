import React, { useState } from 'react';

const faqItems = [
  {
    q: 'Für welche Unternehmen arbeitet ihr?',
    a: 'Vor allem mit Teams, die einen klaren Prozess verbessern oder ein digitales Produkt bauen wollen. Branche und Größe sind weniger wichtig als ein greifbarer Ausgangspunkt und ein verantwortlicher Ansprechpartner.',
  },
  {
    q: 'Müssen wir technisches Vorwissen mitbringen?',
    a: 'Nein. Wir erklären alles verständlich und begleiten Sie so, dass Ihr Team am Ende eigenständig mit den Lösungen umgehen kann.',
  },
  {
    q: 'Was kostet eine Zusammenarbeit?',
    a: 'Das hängt vom Scope ab. Nach einer ersten Einordnung sollten Umfang, Annahmen, Zuständigkeiten und Kosten transparent feststehen, bevor eine Umsetzung beginnt.',
  },
  {
    q: 'Arbeitet ihr herstellerunabhängig?',
    a: 'Wir wählen Werkzeuge nach Aufgabe, Datenfluss, Betrieb und Risiko aus. Eine Empfehlung wird begründet — nicht als allgemeines Tool-Versprechen verkauft.',
  },
  {
    q: 'Wie schnell sehen wir Ergebnisse?',
    a: 'Das hängt von Datenlage, Integrationen und Freigaben ab. Ein guter erster Schritt ist bewusst klein genug, um Nutzen und Risiken früh sichtbar zu machen.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16u px-6 md:px-8">
      <div className="max-w-[700px] mx-auto">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12u">
          Häufige Fragen
        </h2>

        <div className="space-y-0">
          {faqItems.map((item, i) => (
            <div key={i} className="border-t border-faint/50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between py-5 text-left cursor-pointer group"
              >
                <span className="text-sm font-body text-ink pr-8 leading-relaxed">
                  {item.q}
                </span>
                <span
                  className={`text-muted text-lg font-body flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  openIndex === i
                    ? 'max-h-40 opacity-100 pb-5'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-muted font-body leading-relaxed pr-12">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-faint/50" />
        </div>
      </div>
    </section>
  );
};

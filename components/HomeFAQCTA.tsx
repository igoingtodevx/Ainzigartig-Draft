import React, { useState } from 'react';

const faqItems = [
  {
    q: 'Für welche Unternehmen arbeitet ihr?',
    a: 'Inhabergeführt, 5 bis 150 Mitarbeiter, deutschsprachiger Raum. Branchenübergreifend, mit Schwerpunkt auf Dienstleistung, Handel und B2B.',
  },
  {
    q: 'Müssen wir technisches Vorwissen mitbringen?',
    a: 'Nein. Wir erklären alles verständlich und begleiten Sie so, dass Ihr Team am Ende eigenständig mit den Lösungen umgehen kann.',
  },
  {
    q: 'Was kostet eine Zusammenarbeit?',
    a: 'Das hängt vom Umfang ab. Das Erstgespräch ist kostenlos. Danach legen wir transparent auf den Tisch, was es kosten würde — bevor Sie sich entscheiden.',
  },
  {
    q: 'Arbeitet ihr herstellerunabhängig?',
    a: 'Ja. Keine Provisionen von Toolanbietern. Was wir empfehlen, empfehlen wir weil es für Sie das Richtige ist.',
  },
  {
    q: 'Wie schnell sehen wir Ergebnisse?',
    a: 'Erste Ergebnisse — ein laufender Chatbot, ein automatisiertes Screening — sind typischerweise in zwei bis vier Wochen sichtbar.',
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

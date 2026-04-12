import React, { useState } from 'react';

/* ───────────── FAQ ───────────── */

const faqItems = [
  {
    q: 'Für welche Unternehmen arbeitet ihr?',
    a: 'Wir arbeiten vor allem mit kleinen und mittelständischen Unternehmen – inhabergeführt, 5 bis 150 Mitarbeiter, aus dem deutschsprachigen Raum. Branchenübergreifend, mit einem Schwerpunkt auf Dienstleistung, Handel und B2B.',
  },
  {
    q: 'Müssen wir technisches Vorwissen mitbringen?',
    a: 'Nein. Das ist unser Job. Wir erklären alles verständlich, ohne Fachjargon – und begleiten Sie so, dass Ihr Team am Ende eigenständig mit den Lösungen umgehen kann.',
  },
  {
    q: 'Was kostet eine Zusammenarbeit?',
    a: 'Das kommt auf den Umfang an. Das Erstgespräch ist kostenlos. Anschließend legen wir transparent auf den Tisch, was eine Zusammenarbeit kosten würde – bevor Sie sich entscheiden.',
  },
  {
    q: 'Arbeitet ihr herstellerunabhängig?',
    a: 'Ja. Wir erhalten keine Provisionen von Toolanbietern. Unsere Empfehlungen basieren ausschließlich darauf, was für Ihr Unternehmen die beste Lösung ist.',
  },
  {
    q: 'Wie schnell sehen wir erste Ergebnisse?',
    a: 'Das hängt vom Projekt ab. Erste Ergebnisse – zum Beispiel ein laufender Chatbot oder ein automatisiertes Screening – sind typischerweise innerhalb von 2–4 Wochen sichtbar.',
  },
];

const FAQItem: React.FC<{ item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => (
  <div className="border border-gray-800 bg-terminal-bg/30">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
    >
      <span className="text-sm font-bold text-white font-display pr-4">{item.q}</span>
      <span className={`material-symbols-outlined text-neon-cyan flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
        add
      </span>
    </button>
    {isOpen && (
      <div className="px-5 pb-5 -mt-1">
        <p className="text-gray-400 text-sm leading-relaxed font-mono">{item.a}</p>
      </div>
    )}
  </div>
);

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-24 w-full max-w-3xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display text-center uppercase tracking-widest relative">
        <span className="text-neon-cyan mr-2">&gt;</span>
        Häufige Fragen
        <span className="animate-pulse ml-2 text-neon-pink">_</span>
      </h2>

      <div className="mt-10 space-y-3 text-left">
        {faqItems.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
};

/* ───────────── CTA ───────────── */

export const HomeCTA: React.FC = () => (
  <div className="mt-24 mb-8 w-full max-w-6xl mx-auto px-4">
    <div className="text-center relative overflow-hidden py-20 md:py-28 px-6">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(107,70,193,0.15)_0%,transparent_70%)] pointer-events-none" />

      <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-6 leading-tight">
        Herausfinden, ob und wie KI<br />
        <span className="text-neon-cyan text-glow-cyan">für Ihr Unternehmen Sinn macht.</span>
      </h2>

      <p className="relative text-gray-400 font-mono text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed">
        In 30 Minuten lernen wir Ihr Unternehmen kennen, verstehen Ihre Herausforderungen und sagen Ihnen ehrlich, wo KI einen echten Unterschied machen kann – und wo nicht. Keine Vorbereitung nötig, kein Commitment.
      </p>

      <a
        href="#"
        className="relative inline-flex items-center gap-2 px-10 py-4 text-sm font-bold uppercase tracking-wider bg-primary text-white rounded-lg hover:bg-primary-hover shadow-[0_4px_24px_rgba(107,70,193,0.4)] hover:shadow-[0_4px_32px_rgba(107,70,193,0.6)] transition-all duration-300 font-mono"
      >
        Kostenloses Erstgespräch buchen
      </a>

      <p className="relative mt-8 text-sm text-gray-500 font-mono">
        <span className="text-gray-600">&gt;</span> Kein Sales-Pitch. Keine Folge-E-Mail-Flut. Versprochen. <span className="animate-pulse">_</span>
      </p>
    </div>

    {/* Bottom gradient line */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
  </div>
);

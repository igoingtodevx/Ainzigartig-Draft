import React from 'react';

/* ───────────── small reusable bits ───────────── */

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-neon-pink border border-neon-pink/30 bg-neon-pink/5 px-3 py-1 mb-4 font-mono">
    {children}
  </span>
);

const SectionHeadline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl md:text-4xl font-bold text-white font-display leading-tight mb-4">
    <span className="text-neon-cyan mr-2">&gt;</span>
    {children}
  </h2>
);

const LeadText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-mono">
    {children}
  </p>
);

/* ───────────── HERO ───────────── */

const Hero: React.FC = () => (
  <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
    {/* decorative grid dots */}
    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#6B46C1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

    <div className="relative z-10 max-w-4xl mx-auto">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-neon-cyan border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 mb-8 font-mono">
        KI-Beratung für den Mittelstand
      </span>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-display leading-[1.1] mb-6">
        KI ist kein Hype –<br />
        <span className="text-neon-cyan text-glow-cyan">für Ihr Unternehmen auch nicht.</span>
      </h1>

      <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-mono mb-10">
        Wir helfen kleinen und mittelständischen Unternehmen dabei, konkrete KI-Anwendungen zu finden und umzusetzen – die wirklich Zeit sparen, Kosten senken und Ihr Team entlasten. Kein Buzzword-Bingo, kein Pilotprojekt, das im Nichts endet.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <a
          href="mailto:info@ainzigartig.de?subject=Kostenloses%20Erstgespr%C3%A4ch"
          className="relative px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center gap-2"
        >
          Kostenloses Erstgespräch buchen
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <a
          href="#problem"
          className="px-8 py-3 text-sm font-bold border-2 border-neon-cyan/40 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_downward</span>
          Wie das konkret aussieht
        </a>
      </div>

      {/* Trust bar */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-gray-400 font-mono">
        {[
          'Kein Sales-Pitch – echtes Gespräch',
          'DSGVO-konform von Anfang an',
          'Herstellerunabhängig',
          '30 Min. kostenlos',
        ].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="text-neon-cyan">✓</span> {item}
          </span>
        ))}
      </div>
    </div>

    {/* bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />
  </section>
);

/* ───────────── PROBLEM ───────────── */

const painCards = [
  {
    emoji: '😵‍💫',
    title: 'Informationsflut ohne Orientierung',
    text: 'ChatGPT, Copilot, Gemini, Make, n8n... Der Markt ist überwältigend. Was davon lohnt sich für Ihr Unternehmen wirklich?',
    color: 'cyan' as const,
  },
  {
    emoji: '💸',
    title: 'Angst vor teuren Fehlinvestitionen',
    text: 'Sie haben schon von Unternehmen gehört, die viel Geld in KI gesteckt haben und am Ende wenig davon hatten.',
    color: 'pink' as const,
  },
  {
    emoji: '⚖️',
    title: 'DSGVO & Datenschutz verunsichern',
    text: 'Darf ich Kundendaten in KI-Tools eingeben? Was ist erlaubt, was nicht? Niemand gibt Ihnen eine klare Antwort.',
    color: 'yellow' as const,
  },
  {
    emoji: '🤷',
    title: 'Kein Ansprechpartner auf Augenhöhe',
    text: 'Große Beratungen sind zu teuer, Freelancer kennen Ihre Branche nicht – und YouTube-Videos lösen Ihr konkretes Problem nicht.',
    color: 'cyan' as const,
  },
];

const painBorder: Record<string, string> = {
  cyan: 'border-neon-cyan/20 hover:border-neon-cyan/60',
  pink: 'border-neon-pink/20 hover:border-neon-pink/60',
  yellow: 'border-neon-yellow/20 hover:border-neon-yellow/60',
};

const Problem: React.FC = () => (
  <section id="problem" className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <SectionLabel>Das Problem</SectionLabel>
      <SectionHeadline>
        Alle reden über KI.<br className="hidden md:block" />
        Kaum einer sagt Ihnen, was Sie damit konkret anfangen sollen.
      </SectionHeadline>
      <LeadText>
        Als KMU haben Sie weder Zeit noch Budget, um monatelang zu experimentieren. Sie brauchen keine Theorie – Sie brauchen Ergebnisse.
      </LeadText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
        {painCards.map((c) => (
          <div
            key={c.title}
            className={`border bg-background-dark/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 ${painBorder[c.color]}`}
          >
            <span className="text-3xl mb-3 block">{c.emoji}</span>
            <h3 className="text-lg font-bold text-white font-display mb-2">{c.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-mono">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── ANGEBOT ───────────── */

const leistungen = [
  {
    title: 'KI-Potenzialanalyse',
    text: 'Wir schauen uns Ihre Prozesse an und priorisieren, wo KI den größten Unterschied macht – praxisnah, ohne Zeitverschwendung.',
    icon: 'query_stats',
  },
  {
    title: 'Use-Case-Entwicklung',
    text: 'Konkrete Anwendungsfälle für Ihr Unternehmen – nicht von der Stange, sondern aus Ihrem Alltag heraus entwickelt.',
    icon: 'build',
  },
  {
    title: 'Tool-Empfehlung & Auswahl',
    text: 'Welche Tools passen zu Ihrer Größe, Ihrem Budget und Ihren Datenschutzanforderungen? Wir kennen den Markt.',
    icon: 'category',
  },
  {
    title: 'DSGVO-Check',
    text: 'Jeder Use Case wird auf datenschutzrechtliche Compliance geprüft. Sie wissen genau, was erlaubt ist – und was nicht.',
    icon: 'verified_user',
  },
  {
    title: 'Umsetzungsbegleitung',
    text: 'Wir lassen Sie nicht allein mit einem Konzept. Auf Wunsch begleiten wir die Implementierung und schulen Ihr Team.',
    icon: 'rocket_launch',
  },
  {
    title: 'Herstellerunabhängige Beratung',
    text: 'Wir verdienen kein Geld mit Tool-Empfehlungen. Was wir empfehlen, empfehlen wir weil es für Sie das Richtige ist.',
    icon: 'balance',
  },
];

const Angebot: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <SectionLabel>Was wir anbieten</SectionLabel>
      <SectionHeadline>KI-Beratung, die sich im Alltag bezahlt macht.</SectionHeadline>
      <LeadText>
        Wir analysieren Ihr Unternehmen, identifizieren die Stellen mit dem größten Hebel – und begleiten Sie bei der Umsetzung. Schritt für Schritt.
      </LeadText>

      {/* Package box */}
      <div className="mt-14 border border-neon-cyan/20 bg-terminal-bg/60 backdrop-blur-sm text-left">
        <div className="border-b border-neon-cyan/10 px-6 py-4">
          <h3 className="text-lg font-bold text-white font-display">
            <span className="text-neon-cyan mr-2">#</span>Was im Beratungspaket steckt
          </h3>
          <p className="text-gray-500 text-xs font-mono mt-1">Kein One-Size-fits-all. Wir passen die Tiefe an Ihren Bedarf an.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          {leistungen.map((l, i) => (
            <div key={l.title} className={`p-6 ${i >= 2 ? 'border-t border-gray-800' : ''}`}>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-neon-cyan text-2xl mt-0.5">{l.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-display mb-1 flex items-center gap-2">
                    <span className="text-neon-cyan">✓</span> {l.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-mono">{l.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DSGVO strip */}
      <div className="mt-8 border border-neon-yellow/20 bg-neon-yellow/5 p-6 text-left flex flex-col md:flex-row items-start gap-4">
        <span className="text-4xl">🛡️</span>
        <div>
          <h4 className="text-sm font-bold text-neon-yellow font-display mb-2 uppercase tracking-wider">
            DSGVO-Konformität ist bei uns keine Fußnote.
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed font-mono">
            Viele Unternehmen nutzen KI-Tools, ohne sich über die Datenverarbeitung Gedanken zu machen. Wir stellen sicher, dass Ihre KI-Strategie rechtssicher ist – mit Serverstandorten in der EU, klaren Verträgen und praxistauglichen Datenschutzlösungen.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── PROZESS ───────────── */

const steps = [
  {
    num: '01',
    title: 'Kostenloses Erstgespräch (30 Min.)',
    text: 'Wir lernen Ihr Unternehmen kennen, verstehen Ihre aktuellen Herausforderungen und klären, ob und wie wir helfen können. Kein Pitch, keine versteckten Absichten.',
  },
  {
    num: '02',
    title: 'Potenzialanalyse & Priorisierung',
    text: 'Wir analysieren Ihre Prozesse, identifizieren konkrete Hebelpunkte für KI und erstellen eine priorisierte Roadmap – nach Aufwand und Wirkung sortiert.',
  },
  {
    num: '03',
    title: 'Use Cases entwickeln & validieren',
    text: 'Zusammen mit Ihnen konkretisieren wir die vielversprechendsten Anwendungsfälle, wählen die richtigen Tools aus und definieren messbare Ziele.',
  },
  {
    num: '04',
    title: 'Umsetzung & Übergabe',
    text: 'Entweder begleiten wir die Implementierung direkt oder übergeben mit klarer Dokumentation an Ihr Team. Ihr Unternehmen soll eigenständig werden – nicht dauerhaft von uns abhängig sein.',
  },
];

const Prozess: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Wie es läuft</SectionLabel>
      <SectionHeadline>Von 0 auf Umsetzung – ohne Umwege.</SectionHeadline>
      <LeadText>
        Kein endloses Onboarding. Kein Konzept, das in der Schublade landet. Wir arbeiten schnell und direkt.
      </LeadText>

      <div className="mt-14 space-y-0 text-left relative">
        {/* vertical line */}
        <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-neon-cyan via-neon-pink to-neon-yellow opacity-30 hidden sm:block" />

        {steps.map((s, i) => (
          <div key={s.num} className="relative flex gap-5 sm:gap-6 py-6 group">
            {/* step indicator */}
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border border-neon-cyan/30 bg-terminal-bg flex items-center justify-center text-neon-cyan font-bold font-display text-lg relative z-10 group-hover:border-neon-cyan group-hover:shadow-[0_0_12px_rgba(0,255,255,0.25)] transition-all duration-300">
              {s.num}
            </div>
            <div className="pt-1">
              <h3 className="text-base md:text-lg font-bold text-white font-display mb-2">
                Schritt {s.num.replace(/^0/, '')} – {s.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-mono">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="mailto:info@ainzigartig.de?subject=Kostenloses%20Erstgespr%C3%A4ch"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
        >
          Jetzt Erstgespräch vereinbaren
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>
);

/* ───────────── USE CASES ───────────── */

const useCases = [
  {
    category: 'Kundenservice',
    icon: 'support_agent',
    title: 'Eingehende Anfragen automatisch vorqualifizieren',
    text: 'E-Mails und Kontaktformulare werden automatisch kategorisiert, priorisiert und mit Antwortvorschlägen versehen – Ihr Team antwortet schneller, mit weniger Aufwand.',
    result: 'Bis zu 60% weniger Bearbeitungszeit',
    color: 'cyan' as const,
  },
  {
    category: 'Marketing & Content',
    icon: 'edit_note',
    title: 'Konsistente Inhalte in Ihrer Markenstimme',
    text: 'Social Media Posts, Newsletter, Produktbeschreibungen – KI generiert Entwürfe auf Basis Ihrer Tonalität. Ihr Team verfeinert, statt bei Null anzufangen.',
    result: '3–5x schnellere Contentproduktion',
    color: 'pink' as const,
  },
  {
    category: 'Vertrieb & CRM',
    icon: 'trending_up',
    title: 'Leads automatisch nachfassen',
    text: 'Interessenten die sich nicht melden werden zu einem definierten Zeitpunkt automatisch und personalisiert kontaktiert – ohne manuelle Arbeit Ihres Vertriebsteams.',
    result: 'Höhere Conversion, weniger Leads verloren',
    color: 'yellow' as const,
  },
  {
    category: 'Interne Prozesse',
    icon: 'menu_book',
    title: 'Wissen im Unternehmen nutzbar machen',
    text: 'Handbücher, FAQs, Verträge – ein interner KI-Assistent beantwortet Mitarbeiterfragen sofort und korrekt, ohne dass jemand suchen muss.',
    result: 'Onboarding & Support deutlich entlastet',
    color: 'cyan' as const,
  },
  {
    category: 'Buchhaltung & Verwaltung',
    icon: 'receipt_long',
    title: 'Dokumente automatisch verarbeiten',
    text: 'Eingangsrechnungen, Lieferscheine, Formulare – KI extrahiert relevante Daten und überträgt sie in Ihre Systeme. Fehlerquote sinkt, Aufwand auch.',
    result: 'Stunden pro Woche eingespart',
    color: 'pink' as const,
  },
  {
    category: 'Analyse & Reporting',
    icon: 'monitoring',
    title: 'Daten verstehen ohne Data Scientist',
    text: 'Umsatzdaten, Kundenfeedback, Website-Auswertungen – KI hilft Ihnen, relevante Muster zu erkennen und bessere Entscheidungen zu treffen.',
    result: 'Klarere Entscheidungsgrundlagen',
    color: 'yellow' as const,
  },
];

const ucBorder: Record<string, string> = {
  cyan: 'border-neon-cyan/20 hover:border-neon-cyan/60 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]',
  pink: 'border-neon-pink/20 hover:border-neon-pink/60 hover:shadow-[0_0_15px_rgba(255,0,255,0.15)]',
  yellow: 'border-neon-yellow/20 hover:border-neon-yellow/60 hover:shadow-[0_0_15px_rgba(255,255,0,0.15)]',
};

const ucCategory: Record<string, string> = {
  cyan: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
  pink: 'text-neon-pink border-neon-pink/30 bg-neon-pink/10',
  yellow: 'text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10',
};

const ucIcon: Record<string, string> = {
  cyan: 'text-neon-cyan',
  pink: 'text-neon-pink',
  yellow: 'text-neon-yellow',
};

const UseCases: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <SectionLabel>Beispiele aus der Praxis</SectionLabel>
      <SectionHeadline>Was KI für KMU konkret leisten kann.</SectionHeadline>
      <LeadText>
        Das sind reale Anwendungsfälle – keine Zukunftsmusik, keine Millionen-Budgets nötig.
      </LeadText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 text-left">
        {useCases.map((uc) => (
          <div
            key={uc.title}
            className={`border bg-background-dark/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col ${ucBorder[uc.color]}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`material-symbols-outlined text-3xl ${ucIcon[uc.color]}`}>{uc.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 border rounded font-mono ${ucCategory[uc.color]}`}>
                {uc.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-white font-display mb-2">{uc.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-mono mb-4 flex-1">{uc.text}</p>
            <div className="flex items-center gap-1.5 text-neon-cyan text-xs font-bold font-mono mt-auto">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
              {uc.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── FINAL CTA ───────────── */

const FinalCTA: React.FC = () => (
  <section className="py-24 px-4">
    <div className="max-w-3xl mx-auto text-center border border-neon-cyan/20 bg-terminal-bg/60 backdrop-blur-sm p-10 md:p-16 relative overflow-hidden">
      {/* decorative corner brackets */}
      <span className="absolute top-3 left-3 text-neon-cyan/30 text-2xl font-mono select-none" aria-hidden="true">[</span>
      <span className="absolute bottom-3 right-3 text-neon-cyan/30 text-2xl font-mono select-none" aria-hidden="true">]</span>

      <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-4">
        Bereit, KI in Ihrem Unternehmen<br className="hidden sm:block" />
        <span className="text-neon-cyan text-glow-cyan">konkret einzusetzen?</span>
      </h2>
      <p className="text-gray-400 font-mono text-sm md:text-base mb-8 max-w-xl mx-auto">
        30 Minuten, kostenlos, ohne Verpflichtung. Wir besprechen, wo KI bei Ihnen den größten Unterschied machen kann.
      </p>

      <a
        href="mailto:info@ainzigartig.de?subject=Kostenloses%20Erstgespr%C3%A4ch"
        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
      >
        Kostenloses Erstgespräch buchen
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </a>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-xs text-gray-500 font-mono">
        <span>✓ Kein Sales-Pitch</span>
        <span>✓ DSGVO-konform</span>
        <span>✓ Herstellerunabhängig</span>
      </div>
    </div>
  </section>
);

/* ───────────── PAGE COMPONENT ───────────── */

export const KIBeratung: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-mono relative">
      {/* Background effects – matching main page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#6B46C1_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-1/4 left-1/4 text-neon-yellow font-bold text-xl animate-float opacity-40">sys</div>
        <div className="absolute top-1/3 right-1/3 text-neon-pink font-bold text-2xl animate-float opacity-30 [animation-delay:1s]">[]</div>
        <div className="absolute bottom-1/4 left-1/3 text-neon-cyan font-bold text-xl animate-float opacity-40 [animation-delay:2s]">&gt;</div>
      </div>

      {/* Back link */}
      <div className="fixed top-24 left-4 sm:left-8 z-40">
        <a href="#/" className="text-neon-cyan text-sm hover:underline inline-flex items-center gap-1 font-mono bg-background-dark/80 backdrop-blur-sm px-3 py-1.5 border border-neon-cyan/20 hover:border-neon-cyan/50 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Zurück
        </a>
      </div>

      <div className="relative z-10">
        <Hero />

        {/* separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

        <Problem />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />

        <Angebot />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-yellow/30 to-transparent" />

        <Prozess />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

        <UseCases />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />

        <FinalCTA />
      </div>
    </div>
  );
};

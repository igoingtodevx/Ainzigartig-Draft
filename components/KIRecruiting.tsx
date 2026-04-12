import React, { useState } from 'react';

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

const Separator: React.FC<{ color?: string }> = ({ color = 'neon-cyan' }) => (
  <div className={`w-full h-px bg-gradient-to-r from-transparent via-${color}/30 to-transparent`} />
);

/* ───────────── HERO ───────────── */

const Hero: React.FC = () => (
  <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#6B46C1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

    <div className="relative z-10 max-w-4xl mx-auto">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-neon-yellow border border-neon-yellow/30 bg-neon-yellow/5 px-3 py-1 mb-8 font-mono">
        KI im Recruiting
      </span>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-display leading-[1.1] mb-6">
        Ihre nächste Einstellung wartet schon<br className="hidden sm:block" /> in Ihrem Posteingang.
        <br />
        <span className="text-neon-yellow" style={{ textShadow: '0 0 10px rgba(255,255,0,0.5)' }}>Sie haben nur keine Zeit, sie zu finden.</span>
      </h1>

      <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-mono mb-10">
        KI-gestütztes CV-Screening und intelligentes Kandidaten-Matching reduzieren Ihre Zeit bis zur Einstellung um bis zu 60% – ohne dass ein Bewerber durch das Raster fällt. Ihr HR-Team entscheidet, die KI übernimmt die Vorarbeit.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <a
          href="#"
          className="relative px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center gap-2"
        >
          Kostenlose Demo anfragen
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <a
          href="#problem"
          className="px-8 py-3 text-sm font-bold border-2 border-neon-yellow/40 text-neon-yellow hover:border-neon-yellow hover:bg-neon-yellow/5 transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_downward</span>
          Wie das funktioniert
        </a>
      </div>

      {/* Trust bar */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-gray-400 font-mono">
        {[
          'Screening in Minuten statt Tagen',
          'Kein Bias durch subjektive Ersteindrücke',
          'DSGVO-konform – Bewerberdaten sicher verarbeitet',
          'Integrierbar in bestehende HR-Systeme',
        ].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="text-neon-yellow">✓</span> {item}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />
  </section>
);

/* ───────────── STAT BAR ───────────── */

const stats = [
  { value: '60%', label: 'schnellere Zeit bis zur Einstellung', color: 'text-neon-yellow' },
  { value: '80%', label: 'weniger manuelle Sichtungszeit', color: 'text-neon-cyan' },
  { value: '3x', label: 'mehr Bewerbungen – gleicher Aufwand', color: 'text-neon-pink' },
  { value: 'Ø 11 Tage', label: 'bis zur qualifizierten Vorauswahl statt 4–6 Wochen', color: 'text-neon-yellow' },
];

const StatBar: React.FC = () => (
  <section className="py-12 px-4">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center border border-gray-800 bg-terminal-bg/40 backdrop-blur-sm p-5">
          <div className={`text-3xl md:text-4xl font-bold font-display mb-1 ${s.color}`}>{s.value}</div>
          <p className="text-gray-500 text-xs font-mono leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ───────────── PROBLEM ───────────── */

const painCards = [
  {
    emoji: '📬',
    title: 'Bewerbungsflut ohne System',
    text: 'Eine Stellenanzeige, 150 Bewerbungen. Davon sind vielleicht 20 wirklich relevant. Aber welche? Das herauszufinden kostet Stunden – pro Stelle, pro Runde.',
    color: 'yellow' as const,
  },
  {
    emoji: '⏳',
    title: 'Wochen bis zur ersten Rückmeldung',
    text: 'Bis HR alle Unterlagen gesichtet, priorisiert und intern abgestimmt hat, sind Topkandidaten längst woanders im Prozess. Geschwindigkeit ist heute ein Wettbewerbsvorteil.',
    color: 'cyan' as const,
  },
  {
    emoji: '🎲',
    title: 'Vorauswahl ist Bauchgefühl',
    text: 'Wer die CVs sichtet, entscheidet subjektiv – beeinflusst von Tagesform, Formulierungen und unbewussten Mustern. Passende Kandidaten fallen durch, unpassende kommen weiter.',
    color: 'pink' as const,
  },
  {
    emoji: '🔁',
    title: 'Immer wieder von vorne',
    text: 'Jede neue Stelle, dasselbe Prozedere. Keine strukturierte Wissensbasis, keine Lernkurve – obwohl sich viele Anforderungsprofile kaum unterscheiden.',
    color: 'yellow' as const,
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
        Recruiting kostet Sie Wochen.<br className="hidden md:block" />
        Die besten Kandidaten warten keine Wochen.
      </SectionHeadline>
      <LeadText>
        Der Arbeitsmarkt hat sich gedreht. Gute Bewerber entscheiden sich innerhalb von Tagen – für das Unternehmen, das zuerst antwortet und am professionellsten auftritt. Wer langsam ist, verliert.
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

/* ───────────── LÖSUNG ───────────── */

const leistungen = [
  {
    title: 'Automatisches CV-Screening',
    text: 'Jede eingehende Bewerbung wird sofort analysiert – Qualifikationen, Erfahrung, Lücken im Lebenslauf, Übereinstimmung mit dem Anforderungsprofil. Ihr Team sieht auf einen Blick, wer passt und warum.',
    icon: 'document_scanner',
  },
  {
    title: 'Intelligentes Kandidaten-Matching',
    text: 'Das System lernt, was bei Ihnen eine gute Besetzung ausmacht – und gewichtet Kriterien entsprechend. Je mehr Stellen Sie besetzen, desto präziser wird das Matching.',
    icon: 'psychology',
  },
  {
    title: 'Automatisierte Erstkommunikation',
    text: 'Eingangsbestätigungen, Statusupdates, Einladungen zur nächsten Runde – Bewerber erhalten schnelle, professionelle Rückmeldungen ohne manuellen Aufwand. Ihre Candidate Experience verbessert sich deutlich.',
    icon: 'mail',
  },
  {
    title: 'Strukturierte Kandidatenprofile',
    text: 'Statt 80 verschiedene PDF-Formate zu lesen, sieht Ihr Team einheitliche, vergleichbare Profile – mit KI-generierter Zusammenfassung und Stärken-Schwächen-Einschätzung.',
    icon: 'person_apron',
  },
  {
    title: 'Integration in Ihr ATS',
    text: 'Ob Personio, Workday, SAP SuccessFactors oder ein eigenes System – wir integrieren die KI in Ihre bestehende HR-Infrastruktur. Kein neues Tool, das parallel geführt werden muss.',
    icon: 'hub',
  },
  {
    title: 'Vollständig DSGVO-konform',
    text: 'Bewerberdaten sind besonders schützenswert. Wir verarbeiten ausschließlich auf EU-Servern, mit klaren Löschroutinen und dokumentierter Rechtsgrundlage – revision- und auditsicher.',
    icon: 'verified_user',
  },
];

const Loesung: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <SectionLabel>Die Lösung</SectionLabel>
      <SectionHeadline>
        KI übernimmt die Vorauswahl.<br className="hidden sm:block" />
        Ihr Team trifft die Entscheidungen.
      </SectionHeadline>
      <LeadText>
        Unser System liest, versteht und bewertet Bewerbungsunterlagen auf Basis Ihrer konkreten Anforderungen – nicht auf Basis von Keywords allein, sondern inhaltlich. Die besten Matches landen oben, der Rest bleibt transparent nachvollziehbar.
      </LeadText>

      {/* Leistungen grid */}
      <div className="mt-14 border border-neon-yellow/20 bg-terminal-bg/60 backdrop-blur-sm text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {leistungen.map((l, i) => (
            <div
              key={l.title}
              className={`p-6 ${i % 2 === 0 ? 'md:border-r border-gray-800' : ''} ${i >= 2 ? 'border-t border-gray-800' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-neon-yellow text-2xl mt-0.5 flex-shrink-0">{l.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-display mb-1 flex items-center gap-2">
                    <span className="text-neon-yellow">✓</span> {l.title}
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
            Bewerberdaten sind Personaldaten – und besonders schützenswert.
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed font-mono">
            Wir arbeiten ausschließlich mit EU-Servern, ohne Datenweitergabe an Dritte. Löschroutinen nach DSGVO-Vorgaben sind automatisch integriert. Jede Implementierung wird dokumentiert und ist auditfähig – für Ihren Datenschutzbeauftragten und Ihren Betriebsrat.
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
    title: 'Anforderungsanalyse (Woche 1)',
    text: 'Wir schauen uns Ihre häufigsten Stellen, Ihre bisherigen Auswahlkriterien und Ihre HR-Infrastruktur an. Was macht bei Ihnen eine gute Besetzung aus? Diese Logik übersetzen wir in das Matching-Modell.',
  },
  {
    num: '02',
    title: 'Systemaufbau & Integration (Woche 1–2)',
    text: 'Das KI-System wird an Ihren Bewerbungseingang und – falls vorhanden – Ihr ATS angebunden. Screening-Logik, Matching-Gewichtung und Kommunikationsautomation werden konfiguriert.',
  },
  {
    num: '03',
    title: 'Testlauf mit echten Bewerbungen',
    text: 'Bevor das System live geht, testen wir es anhand zurückliegender Bewerbungen – Stellen, die Sie bereits besetzt haben. So sehen Sie konkret, wie das System entschieden hätte, und wir feinjustieren wo nötig.',
  },
  {
    num: '04',
    title: 'Go-live & laufende Optimierung',
    text: 'Das System geht live. Wir beobachten die ersten Besetzungsprozesse eng, analysieren Feedback Ihres Teams und passen das Matching kontinuierlich an. Mit jeder besetzten Stelle wird es präziser.',
  },
];

const Prozess: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Wie es läuft</SectionLabel>
      <SectionHeadline>
        Aufgesetzt in zwei Wochen.<br className="hidden sm:block" />
        Ergebnisse ab der ersten Stelle.
      </SectionHeadline>
      <LeadText>
        Kein monatelanges Einführungsprojekt. Wir analysieren Ihre bestehenden Prozesse, integrieren die KI in Ihre Infrastruktur und trainieren das System auf Ihre Anforderungsprofile – schnell und ohne großen internen Aufwand.
      </LeadText>

      <div className="mt-14 space-y-0 text-left relative">
        <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-neon-yellow via-neon-pink to-neon-cyan opacity-30 hidden sm:block" />

        {steps.map((s) => (
          <div key={s.num} className="relative flex gap-5 sm:gap-6 py-6 group">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border border-neon-yellow/30 bg-terminal-bg flex items-center justify-center text-neon-yellow font-bold font-display text-lg relative z-10 group-hover:border-neon-yellow group-hover:shadow-[0_0_12px_rgba(255,255,0,0.25)] transition-all duration-300">
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
    </div>
  </section>
);

/* ───────────── USE CASES ───────────── */

const useCases = [
  {
    category: 'Volumenrecruiting',
    icon: 'groups',
    title: 'Viele Bewerbungen, viele gleiche Stellen',
    text: 'Lager, Produktion, Vertrieb, Pflege – überall wo viele ähnliche Stellen besetzt werden müssen, spart automatisches Screening am meisten Zeit.',
    result: 'Besonders wirksam bei 10+ Einstellungen pro Quartal',
    color: 'yellow' as const,
  },
  {
    category: 'Fachkräftemangel & Active Sourcing',
    icon: 'search',
    title: 'Aus wenig Bewerbungen das Maximum herausholen',
    text: 'Wenn kaum Bewerbungen kommen, zählt jeder Kandidat. KI hilft, auch unvollständige Profile richtig einzuordnen und niemanden vorschnell auszuschließen.',
    result: 'Bessere Trefferquote bei knappem Kandidatenangebot',
    color: 'cyan' as const,
  },
  {
    category: 'Führungskräfte & Fachpositionen',
    icon: 'workspace_premium',
    title: 'Komplexe Anforderungsprofile strukturiert bewerten',
    text: 'Je spezifischer eine Stelle, desto schwieriger der Vergleich. KI macht Qualifikationen, Karrierewege und Lücken auf einen Blick sichtbar und vergleichbar.',
    result: 'Bessere Entscheidungsgrundlage für Hiring Manager',
    color: 'pink' as const,
  },
  {
    category: 'Schnelle Besetzung',
    icon: 'bolt',
    title: 'Wenn eine Stelle gestern hätte besetzt sein sollen',
    text: 'KI verkürzt die Vorauswahl von Wochen auf Tage. Gerade bei dringendem Bedarf entscheidet das, ob die Stelle intern oder extern besetzt werden kann.',
    result: 'Reaktionszeit als Wettbewerbsvorteil',
    color: 'yellow' as const,
  },
  {
    category: 'Interne Talentpools',
    icon: 'database',
    title: 'Kandidaten aus alten Prozessen wieder aktivieren',
    text: 'Viele Unternehmen haben Bewerberdaten aus vergangenen Prozessen – aber kein System, um diese sinnvoll zu nutzen. KI durchsucht bestehende Pools auf neue Stellen automatisch.',
    result: 'Weniger externe Ausschreibungen nötig',
    color: 'cyan' as const,
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
      <SectionLabel>Typische Anwendungsfälle</SectionLabel>
      <SectionHeadline>Wo KI im Recruiting den größten Unterschied macht.</SectionHeadline>
      <LeadText>
        Vom Handwerksbetrieb mit saisonalem Bedarf bis zum Mittelständler mit dutzenden offenen Stellen gleichzeitig – die Hebelpunkte sind überall ähnlich.
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
            <div className={`flex items-center gap-1.5 text-xs font-bold font-mono mt-auto ${ucIcon[uc.color]}`}>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
              {uc.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── ZIELGRUPPE ───────────── */

const targetAudience = [
  { emoji: '📋', text: 'Sie regelmäßig mehr als 5 Stellen gleichzeitig offen haben' },
  { emoji: '📥', text: 'Ihr HR-Team viel Zeit mit CV-Sichtung verbringt statt mit Kandidatengesprächen' },
  { emoji: '🕐', text: 'Bewerber sich über langsame Rückmeldungen beschweren oder abspringen' },
  { emoji: '🔍', text: 'Sie das Gefühl haben, passende Kandidaten zu übersehen' },
  { emoji: '📈', text: 'Sie wachsen und Recruiting nicht mit dem Wachstum Schritt hält' },
];

const notFor = [
  'Unternehmen, die weniger als 1–2 Stellen pro Quartal besetzen – der Aufwand rechnet sich erst bei gewissem Volumen, das sagen wir Ihnen lieber offen.',
  'Wer hofft, den HR-Bereich vollständig zu automatisieren – KI übernimmt die Vorauswahl, die Entscheidung bleibt beim Menschen. Das ist auch gut so.',
  'Unternehmen ohne klare Anforderungsprofile für ihre Stellen – ohne definierte Kriterien kann kein Matching-Modell sinnvoll arbeiten. Wir helfen beim Aufbau, aber es braucht Ihre Beteiligung.',
];

const Zielgruppe: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Für wen</SectionLabel>
      <SectionHeadline>Das lohnt sich für Sie, wenn...</SectionHeadline>

      <div className="mt-10 space-y-4 text-left max-w-2xl mx-auto">
        {targetAudience.map((a) => (
          <div key={a.text} className="flex items-start gap-3 border border-neon-yellow/10 bg-terminal-bg/40 p-4 hover:border-neon-yellow/30 transition-colors">
            <span className="text-2xl flex-shrink-0">{a.emoji}</span>
            <p className="text-gray-300 text-sm font-mono leading-relaxed">{a.text}</p>
          </div>
        ))}
      </div>

      {/* Not for */}
      <div className="mt-14 max-w-2xl mx-auto text-left">
        <h3 className="text-lg font-bold text-white font-display mb-6 text-center">
          <span className="text-neon-pink mr-2">#</span>Und für wen es (noch) nicht passt.
        </h3>
        <div className="space-y-4">
          {notFor.map((item) => (
            <div key={item} className="flex items-start gap-3 border border-gray-800 bg-background-dark/60 p-4">
              <span className="text-neon-pink font-bold text-lg flex-shrink-0 mt-[-2px]">✕</span>
              <p className="text-gray-500 text-sm font-mono leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── VERGLEICH ───────────── */

const comparisonRows = [
  { label: 'CV-Sichtung', before: '2–5 Tage manuell', after: 'Minuten, automatisch' },
  { label: 'Kandidatenvergleich', before: 'Subjektiv, inkonsistent', after: 'Strukturiert, nachvollziehbar' },
  { label: 'Erste Rückmeldung', before: 'Oft nach Tagen', after: 'Automatisch innerhalb von Stunden' },
  { label: 'Parallele Stellen', before: 'Kaum skalierbar', after: 'Beliebig skalierbar' },
  { label: 'Bewerberdaten', before: 'Verteilt in E-Mail-Postfächern', after: 'Zentral, strukturiert, DSGVO-konform' },
  { label: 'Besetzungsdauer', before: 'Ø 6–10 Wochen', after: 'Ø 3–5 Wochen' },
];

const Vergleich: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Vorher / Nachher</SectionLabel>
      <SectionHeadline>Was sich konkret verändert.</SectionHeadline>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-gray-500 font-normal text-xs uppercase tracking-wider w-1/4"></th>
              <th className="py-3 px-4 text-neon-pink font-bold text-xs uppercase tracking-wider w-[37.5%]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">close</span>
                  Ohne KI
                </span>
              </th>
              <th className="py-3 px-4 text-neon-yellow font-bold text-xs uppercase tracking-wider w-[37.5%]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Mit KI
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-b border-gray-800 ${i % 2 === 0 ? 'bg-terminal-bg/20' : ''}`}
              >
                <td className="py-3 px-4 text-gray-400 font-bold text-xs uppercase tracking-wider">{row.label}</td>
                <td className="py-3 px-4 text-gray-500">{row.before}</td>
                <td className="py-3 px-4 text-neon-yellow">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

/* ───────────── FAQ ───────────── */

const faqItems = [
  {
    q: 'Trifft die KI die finale Einstellungsentscheidung?',
    a: 'Nein – und das ist Absicht. Die KI übernimmt die Vorauswahl und liefert strukturierte Entscheidungsgrundlagen. Die finale Entscheidung liegt immer beim Menschen. Das ist nicht nur ethisch richtig, sondern auch rechtlich der einzig sinnvolle Weg.',
  },
  {
    q: 'Werden Bewerber benachteiligt, weil eine KI entscheidet?',
    a: 'Das Gegenteil ist oft der Fall. KI-gestütztes Screening bewertet auf Basis definierter, transparenter Kriterien – ohne Tagesform, ohne unbewusste Muster, ohne Einfluss von Formulierungen oder Namen. Das macht den Prozess fairer, nicht weniger fair.',
  },
  {
    q: 'Wie werden Bewerberdaten verarbeitet und wann gelöscht?',
    a: 'Ausschließlich auf EU-Servern, mit automatischen Löschroutinen nach dem Ende des Bewerbungsverfahrens – entsprechend den DSGVO-Vorgaben und den Fristen, die Sie festlegen. Alles ist dokumentiert und auditfähig.',
  },
  {
    q: 'Funktioniert das auch, wenn wir kein ATS haben?',
    a: 'Ja. Wir können das System auch direkt an Ihren E-Mail-Eingang oder Ihre Karriereseite anbinden. Ein ATS ist nicht Voraussetzung, aber wenn eines vorhanden ist, integrieren wir es.',
  },
  {
    q: 'Was passiert, wenn unsere Anforderungsprofile sich ändern?',
    a: 'Das Matching-Modell kann jederzeit angepasst werden. Neue Kriterien, geänderte Gewichtungen, neue Stellentypen – wir aktualisieren das Modell und testen es, bevor es wieder live geht.',
  },
  {
    q: 'Was kostet das?',
    a: 'Der Aufbau wird auf Projektbasis abgerechnet, der laufende Betrieb optional im Retainer. Die genauen Kosten hängen von Integrationstiefe und Stellenvolumen ab. Zahlen legen wir transparent im Erstgespräch auf den Tisch – bevor Sie sich entscheiden.',
  },
];

const FAQItem: React.FC<{ item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => (
  <div className="border border-gray-800 bg-terminal-bg/30">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
    >
      <span className="text-sm font-bold text-white font-display pr-4">{item.q}</span>
      <span className={`material-symbols-outlined text-neon-yellow flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
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

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <SectionLabel>FAQ</SectionLabel>
        <SectionHeadline>Häufige Fragen</SectionHeadline>

        <div className="mt-12 space-y-3 text-left">
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
    </section>
  );
};

/* ───────────── FINAL CTA ───────────── */

const FinalCTA: React.FC = () => (
  <section className="py-24 px-4">
    <div className="max-w-3xl mx-auto text-center border border-neon-yellow/20 bg-terminal-bg/60 backdrop-blur-sm p-10 md:p-16 relative overflow-hidden">
      <span className="absolute top-3 left-3 text-neon-yellow/30 text-2xl font-mono select-none" aria-hidden="true">[</span>
      <span className="absolute bottom-3 right-3 text-neon-yellow/30 text-2xl font-mono select-none" aria-hidden="true">]</span>

      <SectionLabel>Jetzt starten</SectionLabel>

      <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-4 mt-2">
        Sehen Sie live, wie KI<br className="hidden sm:block" />
        <span className="text-neon-yellow" style={{ textShadow: '0 0 10px rgba(255,255,0,0.5)' }}>Ihre nächste Stelle schneller besetzt.</span>
      </h2>
      <p className="text-gray-400 font-mono text-sm md:text-base mb-8 max-w-xl mx-auto">
        In einer kostenlosen Demo zeigen wir Ihnen anhand einer echten Stellenbeschreibung aus Ihrer Branche, wie das Screening und Matching funktioniert. Kein generisches Beispiel – etwas, das sich nach Ihrem Unternehmen anfühlt.
      </p>

      <a
        href="#"
        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
      >
        Kostenlose Demo anfragen
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </a>

      <p className="mt-6 text-xs text-gray-600 font-mono">
        Keine Verpflichtung. Keine Folge-E-Mail-Flut. Einfach zeigen, was möglich ist.
      </p>
    </div>
  </section>
);

/* ───────────── PAGE COMPONENT ───────────── */

export const KIRecruiting: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-mono relative">
      {/* Background effects */}
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
        <StatBar />
        <Separator />
        <Problem />
        <Separator color="neon-pink" />
        <Loesung />
        <Separator color="neon-yellow" />
        <Prozess />
        <Separator />
        <UseCases />
        <Separator color="neon-pink" />
        <Zielgruppe />
        <Separator color="neon-yellow" />
        <Vergleich />
        <Separator />
        <FAQ />
        <Separator color="neon-pink" />
        <FinalCTA />
      </div>
    </div>
  );
};

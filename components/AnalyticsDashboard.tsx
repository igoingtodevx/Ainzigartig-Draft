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
      <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-neon-pink border border-neon-pink/30 bg-neon-pink/5 px-3 py-1 mb-8 font-mono">
        KI-gestützte Analytics
      </span>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-display leading-[1.1] mb-6">
        Sie haben genug Daten.<br />
        <span className="text-neon-pink text-glow-pink">Was fehlt, sind die richtigen Antworten.</span>
      </h1>

      <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-mono mb-10">
        Unser Analytics Dashboard bündelt Ihre Vertriebs- und Recruiting-Daten in einem zentralen Echtzeit-Überblick – mit KI-gestützten Analysen, die Ihnen sagen, was hinter den Zahlen steckt. Keine Tabellen mehr. Keine Kaffeesatzleserei. Nur klare Entscheidungsgrundlagen.
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
          className="px-8 py-3 text-sm font-bold border-2 border-neon-pink/40 text-neon-pink hover:border-neon-pink hover:bg-neon-pink/5 transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_downward</span>
          Was das Dashboard konkret leistet
        </a>
      </div>

      {/* Trust bar */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-gray-400 font-mono">
        {[
          'Echtzeit-Daten aus allen relevanten Quellen',
          'Keine Data-Science-Kenntnisse nötig',
          'DSGVO-konform & EU-Serverstandorte',
          'Live in 1–2 Wochen',
        ].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="text-neon-pink">✓</span> {item}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />
  </section>
);

/* ───────────── STAT BAR ───────────── */

const stats = [
  { value: 'Echtzeit', label: 'statt wöchentliche Excel-Reports', color: 'text-neon-pink' },
  { value: '1 Ort', label: 'für alle Vertriebs- und Recruiting-KPIs', color: 'text-neon-cyan' },
  { value: '3x', label: 'schnellere Entscheidungsfindung im Management', color: 'text-neon-yellow' },
  { value: 'Ø 6 Std.', label: 'pro Woche gespart durch automatisiertes Reporting', color: 'text-neon-pink' },
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
    emoji: '📊',
    title: 'Reporting ist ein Halbtagsjob',
    text: 'Jede Woche dasselbe: Daten aus verschiedenen Systemen exportieren, in Excel zusammenführen, formatieren, präsentieren. Das kostet Zeit, die niemand hat – und produziert Ergebnisse, die beim Lesen schon überholt sind.',
    color: 'pink' as const,
  },
  {
    emoji: '🔦',
    title: 'Entscheidungen im Dunkeln',
    text: 'Welcher Vertriebskanal bringt wirklich die besten Leads? Welche Stelle kostet am meisten Zeit bis zur Besetzung? Ohne strukturierte Auswertung sind das Bauchentscheidungen – keine Strategieentscheidungen.',
    color: 'cyan' as const,
  },
  {
    emoji: '🗂️',
    title: 'Daten in Silos',
    text: 'Vertrieb hat seine Zahlen, HR hat ihre Zahlen, das Management sieht etwas anderes. Niemand hat dasselbe Bild – und Abstimmungen enden in langen Diskussionen darüber, welche Zahlen die richtigen sind.',
    color: 'yellow' as const,
  },
  {
    emoji: '⏰',
    title: 'Zu spät informiert',
    text: 'Probleme werden sichtbar, wenn der Schaden schon entstanden ist. Ein Einbruch in der Pipeline, ein ungewöhnlicher Rückgang bei Bewerbungen – wer das erst im Monatsmeeting erfährt, reagiert zu spät.',
    color: 'pink' as const,
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
        Ihre Daten liegen überall.<br className="hidden md:block" />
        Und nirgendwo.
      </SectionHeadline>
      <LeadText>
        CRM, ATS, Excel, E-Mail, Controlling – Ihre relevanten Zahlen stecken in Dutzenden verschiedenen Quellen. Bis jemand alles zusammengetragen und ausgewertet hat, sind die Erkenntnisse schon wieder veraltet.
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
    title: 'Echtzeit-Datenaggregation',
    text: 'Alle relevanten Datenquellen – CRM, ATS, ERP, Marketing-Tools, Excel-Importe – werden automatisch zusammengeführt. Kein manuelles Zusammenklicken, keine veralteten Reports.',
    icon: 'sync',
  },
  {
    title: 'KI-gestützte Musterkennung',
    text: 'Das System erkennt Auffälligkeiten, Trends und Korrelationen, die im Datenwust untergehen würden. Warum ist die Conversionrate in Q3 eingebrochen? Welche Stellenprofile dauern strukturell am längsten? Die KI findet Antworten, bevor Sie die richtigen Fragen stellen.',
    icon: 'psychology',
  },
  {
    title: 'Individuell konfigurierbare Ansichten',
    text: 'Vertriebsleiter, HR-Verantwortliche und Geschäftsführung sehen jeweils das, was für sie relevant ist – keine überladenen Dashboards, keine irrelevanten Metriken, kein Information Overload.',
    icon: 'dashboard_customize',
  },
  {
    title: 'Automatisiertes Reporting',
    text: 'Wöchentliche oder monatliche Reports werden automatisch generiert und verteilt – im Format das Ihr Management erwartet. Was früher Stunden gedauert hat, passiert auf Knopfdruck.',
    icon: 'summarize',
  },
  {
    title: 'Echtzeit-Alerts',
    text: 'Definieren Sie Schwellwerte – und das System informiert Sie sofort, wenn etwas aus dem Rahmen fällt. Bevor es zum Problem wird.',
    icon: 'notifications_active',
  },
  {
    title: 'Integration in Ihre bestehende Systemlandschaft',
    text: 'Wir bauen nichts neu, was Sie schon haben. Das Dashboard sitzt auf Ihren bestehenden Daten auf – HubSpot, Salesforce, Personio, SAP, Google Sheets oder proprietäre Systeme.',
    icon: 'hub',
  },
];

const Loesung: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <SectionLabel>Die Lösung</SectionLabel>
      <SectionHeadline>
        Ein Dashboard. Alle relevanten Zahlen.<br className="hidden sm:block" />
        Und eine KI, die Ihnen erklärt, was sie bedeuten.
      </SectionHeadline>
      <LeadText>
        Wir verbinden Ihre bestehenden Systeme, bauen ein zentrales Dashboard auf das Ihre wichtigsten KPIs in Echtzeit abbildet – und ergänzen es um KI-gestützte Analysen, die nicht nur zeigen was passiert, sondern auch warum.
      </LeadText>

      {/* Leistungen grid */}
      <div className="mt-14 border border-neon-pink/20 bg-terminal-bg/60 backdrop-blur-sm text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {leistungen.map((l, i) => (
            <div
              key={l.title}
              className={`p-6 ${i % 2 === 0 ? 'md:border-r border-gray-800' : ''} ${i >= 2 ? 'border-t border-gray-800' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-neon-pink text-2xl mt-0.5 flex-shrink-0">{l.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-display mb-1 flex items-center gap-2">
                    <span className="text-neon-pink">✓</span> {l.title}
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
            Ihre Unternehmensdaten gehören zu den sensibelsten, die es gibt.
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed font-mono">
            Umsatzzahlen, Personaldaten, Bewerberdaten – alles verarbeiten wir ausschließlich auf EU-Servern, ohne Datenweitergabe an Dritte. Zugriffskontrollen, Rollenkonzepte und Audit-Logs sind standardmäßig enthalten. DSGVO-Konformität ist kein Add-on, sondern Grundvoraussetzung.
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
    title: 'Datenmapping & Zieldefinition (Woche 1)',
    text: 'Welche Systeme, welche KPIs, welche Entscheidungen sollen das Dashboard unterstützen? Wir klären, welche Daten vorhanden sind, wo sie liegen und was am Ende auf dem Bildschirm stehen soll – für jede Nutzergruppe separat.',
  },
  {
    num: '02',
    title: 'Anbindung & Aufbau (Woche 1–2)',
    text: 'Wir stellen die Datenverbindungen her, bauen die Dashboard-Struktur auf und konfigurieren die KI-Analyselogik. Sie müssen dafür keine eigene IT-Infrastruktur bereitstellen.',
  },
  {
    num: '03',
    title: 'Review & Feintuning',
    text: 'Bevor das Dashboard live geht, durchlaufen wir es gemeinsam mit Ihnen – mit echten Daten aus Ihrer Vergangenheit. Stimmt die Logik? Stimmen die Visualisierungen? Was fehlt noch?',
  },
  {
    num: '04',
    title: 'Go-live & Einführung',
    text: 'Das Dashboard geht live. Wir schulen Ihr Team in einer kompakten Session und stehen in den ersten Wochen für Rückfragen bereit. Auf Wunsch begleiten wir auch den laufenden Betrieb und erweitern das Dashboard schrittweise.',
  },
];

const Prozess: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Wie es läuft</SectionLabel>
      <SectionHeadline>
        In zwei Wochen von Datenchaos<br className="hidden sm:block" />
        zu klaren Entscheidungsgrundlagen.
      </SectionHeadline>
      <LeadText>
        Kein monatelanges BI-Projekt. Wir haben klare Prozesse für den Aufbau – und bringen Erfahrung aus vergleichbaren Implementierungen mit.
      </LeadText>

      <div className="mt-14 space-y-0 text-left relative">
        <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-neon-pink via-neon-cyan to-neon-yellow opacity-30 hidden sm:block" />

        {steps.map((s) => (
          <div key={s.num} className="relative flex gap-5 sm:gap-6 py-6 group">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border border-neon-pink/30 bg-terminal-bg flex items-center justify-center text-neon-pink font-bold font-display text-lg relative z-10 group-hover:border-neon-pink group-hover:shadow-[0_0_12px_rgba(255,0,255,0.25)] transition-all duration-300">
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
    category: 'Vertrieb & Pipeline',
    icon: 'trending_up',
    title: 'Wo hakt es im Verkaufsprozess wirklich?',
    text: 'Pipeline-Entwicklung, Conversion je Stufe, Forecasts, Performance je Mitarbeiter und Region – in Echtzeit, nicht erst im Monatsmeeting.',
    result: 'Früher eingreifen, bevor Deals verloren gehen',
    color: 'pink' as const,
  },
  {
    category: 'Recruiting-Controlling',
    icon: 'group_add',
    title: 'Welche Kanäle bringen die besten Bewerber?',
    text: 'Time-to-hire, Kosten pro Einstellung, Qualität je Quelle, Abbruchquoten im Prozess – alles auf einen Blick, vergleichbar über Stellen und Zeiträume.',
    result: 'Budget gezielter einsetzen, Prozesse optimieren',
    color: 'cyan' as const,
  },
  {
    category: 'Management-Reporting',
    icon: 'summarize',
    title: 'Überblick für die Geschäftsführung ohne Aufwand',
    text: 'Automatisch generierte Zusammenfassungen der wichtigsten Kennzahlen – wöchentlich, monatlich, quartalsweise. Kein Aufbereiten mehr, nur noch Entscheiden.',
    result: 'Meetings kürzer, Entscheidungen fundierter',
    color: 'yellow' as const,
  },
  {
    category: 'Frühwarnsystem',
    icon: 'notifications_active',
    title: 'Abweichungen erkennen bevor sie eskalieren',
    text: 'Einbruch in der Lead-Qualität, ungewöhnliche Absprungrate im Bewerbungsprozess, Umsatzausreißer in einzelnen Regionen – das System schlägt Alarm, bevor die Monatszahlen das zeigen.',
    result: 'Probleme lösen statt erklären',
    color: 'pink' as const,
  },
  {
    category: 'Cross-funktionale Auswertungen',
    icon: 'hub',
    title: 'Zusammenhänge zwischen Vertrieb und HR sichtbar machen',
    text: 'Wie wirkt sich Mitarbeiterfluktuation auf die Vertriebsperformance aus? Welche Einstellungen haben den höchsten ROI? Fragen, die bisher niemand beantworten konnte.',
    result: 'Strategische Entscheidungen auf echter Datenbasis',
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
      <SectionHeadline>Was Sie mit dem Dashboard konkret sehen – und entscheiden können.</SectionHeadline>
      <LeadText>
        Das Dashboard ist kein Selbstzweck. Es beantwortet die Fragen, die Sie sich heute mit viel Aufwand selbst zusammensuchen müssen.
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
  { emoji: '📈', text: 'Sie regelmäßig Entscheidungen treffen, die auf Daten basieren sollten – aber nicht können' },
  { emoji: '🗂️', text: 'Ihre relevanten Zahlen in mehreren Systemen oder Excel-Dateien verteilt sind' },
  { emoji: '⏳', text: 'Ihr Team Stunden pro Woche mit manueller Report-Erstellung verbringt' },
  { emoji: '🔍', text: 'Sie das Gefühl haben, Probleme zu spät zu erkennen' },
  { emoji: '👥', text: 'Verschiedene Abteilungen mit unterschiedlichen Datenperspektiven arbeiten und keine gemeinsame Grundlage haben' },
];

const notFor = [
  'Unternehmen, die noch keine strukturierten Daten haben und zunächst saubere Prozesse brauchen – ohne Datenbasis kann kein Dashboard sinnvolle Antworten liefern. Wir sagen das lieber direkt.',
  'Wer ein fertiges Standard-BI-Tool sucht – dafür gibt es günstigere Lösungen. Was wir aufbauen, ist auf Ihre Systeme, Ihre KPIs und Ihre Entscheidungslogik zugeschnitten.',
  'Unternehmen, bei denen Datentransparenz intern politisch heikel ist und nicht wirklich gewollt wird – ein Dashboard entfaltet seinen Nutzen nur, wenn die Erkenntnisse auch genutzt werden.',
];

const Zielgruppe: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Für wen</SectionLabel>
      <SectionHeadline>Das lohnt sich für Sie, wenn...</SectionHeadline>

      <div className="mt-10 space-y-4 text-left max-w-2xl mx-auto">
        {targetAudience.map((a) => (
          <div key={a.text} className="flex items-start gap-3 border border-neon-pink/10 bg-terminal-bg/40 p-4 hover:border-neon-pink/30 transition-colors">
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
  { label: 'Reporting', before: 'Manuell, wöchentlich', after: 'Automatisch, in Echtzeit' },
  { label: 'Datenbasis', before: 'Mehrere Systeme, inkonsistent', after: 'Eine Quelle, immer aktuell' },
  { label: 'Reaktionszeit', before: 'Wochen nach dem Problem', after: 'Sofort per Alert' },
  { label: 'Entscheidungsgrundlage', before: 'Bauchgefühl & Excel', after: 'KI-gestützte Analyse' },
  { label: 'Managementblick', before: 'Vergangenheit', after: 'Gegenwart & Trends' },
  { label: 'Reportingaufwand', before: 'Ø 6 Std./Woche', after: 'Unter 30 Minuten' },
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
                  Ohne Dashboard
                </span>
              </th>
              <th className="py-3 px-4 text-neon-cyan font-bold text-xs uppercase tracking-wider w-[37.5%]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Mit Dashboard
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
                <td className="py-3 px-4 text-neon-cyan">{row.after}</td>
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
    q: 'Welche Systeme können angebunden werden?',
    a: 'Die meisten gängigen CRM-, ATS-, ERP- und Marketing-Systeme lassen sich anbinden – HubSpot, Salesforce, Personio, SAP, Pipedrive, Google Analytics, und viele mehr. Auch Excel-Exporte oder CSV-Dateien können als Datenquelle dienen. Was genau möglich ist, klären wir im Erstgespräch.',
  },
  {
    q: 'Brauchen wir eine eigene IT-Abteilung oder Data Engineers?',
    a: 'Nein. Wir übernehmen den gesamten technischen Aufbau. Ihr Team muss das Dashboard am Ende nur bedienen – und das ist so gestaltet, dass keine technischen Kenntnisse nötig sind.',
  },
  {
    q: 'Wie aktuell sind die Daten im Dashboard?',
    a: 'Je nach Anbindung können Daten in Echtzeit oder in definierten Intervallen (z.B. stündlich) aktualisiert werden. Für die meisten Anwendungsfälle reicht eine stündliche Synchronisierung vollständig aus.',
  },
  {
    q: 'Können verschiedene Nutzer unterschiedliche Ansichten haben?',
    a: 'Ja. Rollenbasierte Zugriffskonzepte sind standardmäßig integriert. Der Vertriebsleiter sieht andere Metriken als die HR-Leiterin, die Geschäftsführung sieht den Gesamtüberblick. Jede Ansicht ist individuell konfigurierbar.',
  },
  {
    q: 'Was passiert, wenn sich unsere Systeme oder Anforderungen ändern?',
    a: 'Das Dashboard ist kein statisches Konstrukt. Neue Datenquellen, neue KPIs, neue Abteilungen – wir erweitern und passen an. Auf Wunsch übernehmen wir das im Rahmen eines laufenden Betreuungsmodells.',
  },
  {
    q: 'Was kostet das?',
    a: 'Der Aufbau wird auf Projektbasis abgerechnet – abhängig von der Anzahl der Datenquellen, der Komplexität der Dashboards und dem Grad der Individualisierung. Laufende Betreuung optional im Retainer. Konkrete Zahlen gibt es im Erstgespräch, transparent und ohne versteckte Posten.',
  },
];

const FAQItem: React.FC<{ item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => (
  <div className="border border-gray-800 bg-terminal-bg/30">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
    >
      <span className="text-sm font-bold text-white font-display pr-4">{item.q}</span>
      <span className={`material-symbols-outlined text-neon-pink flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
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
    <div className="max-w-3xl mx-auto text-center border border-neon-pink/20 bg-terminal-bg/60 backdrop-blur-sm p-10 md:p-16 relative overflow-hidden">
      <span className="absolute top-3 left-3 text-neon-pink/30 text-2xl font-mono select-none" aria-hidden="true">[</span>
      <span className="absolute bottom-3 right-3 text-neon-pink/30 text-2xl font-mono select-none" aria-hidden="true">]</span>

      <SectionLabel>Jetzt starten</SectionLabel>

      <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-4 mt-2">
        Sehen Sie live, wie Ihre Daten<br className="hidden sm:block" />
        <span className="text-neon-pink text-glow-pink">aussehen könnten.</span>
      </h2>
      <p className="text-gray-400 font-mono text-sm md:text-base mb-8 max-w-xl mx-auto">
        In einer kostenlosen Demo bauen wir einen exemplarischen Blick auf Ihre Datensituation – mit echten Beispielen aus Ihrer Branche. Sie sehen konkret, welche Fragen das Dashboard beantwortet und welche Daten dafür nötig wären.
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

export const AnalyticsDashboard: React.FC = () => {
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

/* ───────────── small reusable bits ───────────── */

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent-hover border border-accent/30 bg-accent/10 px-3 py-1 mb-4 font-body">
    {children}
  </span>
);

const SectionHeadline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl md:text-4xl font-bold text-ink font-editorial leading-tight mb-4">
    <span className="text-accent-hover mr-2">&gt;</span>
    {children}
  </h2>
);

const LeadText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-muted text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-body">
    {children}
  </p>
);

const Separator: React.FC<{ color?: string }> = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
);

/* ───────────── HERO ───────────── */

const Hero: React.FC = () => (
  <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ECA867_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

    <div className="relative z-10 max-w-4xl mx-auto">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent-hover border border-accent/30 bg-accent/10 px-3 py-1 mb-8 font-body">
        KI im Kundenservice
      </span>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-ink font-editorial leading-[1.1] mb-6">
        Ihr Support-Team beantwortet<br className="hidden sm:block" /> die falschen Fragen.
        <br />
        <span className="text-accent-hover ">Immer wieder. Täglich.</span>
      </h1>

      <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-body mb-10">
        Ein KI-Assistent auf Ihrer Wissensbasis kann wiederkehrende Fragen unterstützen, Inhalte auffindbar machen und bei Bedarf an Ihr Team übergeben. Welche Kanäle, Daten und Regeln sinnvoll sind, klären wir gemeinsam.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Link
          to="/#kontakt"
          className="relative px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center gap-2"
        >
          Kostenlose Demo ansehen
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
        <a
          href="#problem"
          className="px-8 py-3 text-sm font-bold border-2 border-accent/40 text-accent-hover hover:border-accent-hover hover:bg-accent/10 transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_downward</span>
          Wie das funktioniert
        </a>
      </div>

      {/* Trust bar */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-muted font-body">
        {[
          'Trainiert auf Ihren Daten – nicht auf generischem Wissen',
          'Datenschutz & Hosting passend zum Setup',
          'Längere Erreichbarkeit möglich',
          'Kein Entwickler-Team nötig',
        ].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="text-accent-hover">✓</span> {item}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base to-transparent pointer-events-none" />
  </section>
);

/* ───────────── STAT BAR ───────────── */

const stats = [
  { value: 'Fragen', label: 'auf Basis Ihrer freigegebenen Inhalte', color: 'text-accent-hover' },
  { value: 'Kanäle', label: 'passend zu Ihrem Support-Setup', color: 'text-accent-hover' },
  { value: 'Übergabe', label: 'wenn menschliche Klärung nötig ist', color: 'text-[#B77A36]' },
  { value: 'Regeln', label: 'für klare Grenzen und Zuständigkeiten', color: 'text-accent-hover' },
];

const StatBar: React.FC = () => (
  <section className="py-12 px-4">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center border border-ink/10 bg-surface/40 backdrop-blur-sm p-5">
          <div className={`text-3xl md:text-4xl font-bold font-editorial mb-1 ${s.color}`}>{s.value}</div>
          <p className="text-light text-xs font-body leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ───────────── PROBLEM ───────────── */

const painCards = [
  {
    emoji: '😤',
    title: 'Immer die gleichen Fragen',
    text: '„Wo ist meine Bestellung?", „Wie kündige ich?", „Was kostet X?" – Ihr Team beantwortet dieselben 20 Fragen hunderte Male im Monat. Das ist weder effizient noch motivierend.',
    color: 'cyan' as const,
  },
  {
    emoji: '🌙',
    title: 'Nach 17 Uhr sind Sie unerreichbar',
    text: 'Kunden haben Fragen wann sie wollen – nicht nur während Ihrer Öffnungszeiten. Wer keine Antwort bekommt, sucht sie beim Wettbewerb.',
    color: 'pink' as const,
  },
  {
    emoji: '📈',
    title: 'Skalierung über Köpfe funktioniert nicht',
    text: 'Jede Verdopplung der Anfragen bedeutet bisher eine Verdopplung des Teams. Das ist teuer, langsam und fehleranfällig.',
    color: 'yellow' as const,
  },
  {
    emoji: '😰',
    title: 'Qualität schwankt je nach Mitarbeiter und Tag',
    text: 'Ob eine Antwort gut oder schlecht ist, hängt davon ab, wer gerade Dienst hat. Ein KI-System antwortet immer auf demselben Niveau.',
    color: 'cyan' as const,
  },
];

const painBorder: Record<string, string> = {
  cyan: 'border-accent/25 hover:border-accent/50',
  pink: 'border-accent/25 hover:border-accent/50',
  yellow: 'border-accent/25 hover:border-accent-hover/60',
};

const Problem: React.FC = () => (
  <section id="problem" className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <SectionLabel>Das Problem</SectionLabel>
      <SectionHeadline>
        Ihr Support kostet Sie mehr, als er sollte –<br className="hidden md:block" />
        und trotzdem warten Kunden zu lange.
      </SectionHeadline>
      <LeadText>
        Wachstum bedeutet mehr Anfragen. Mehr Anfragen bedeuten mehr Personalaufwand. Irgendwann funktioniert das nicht mehr – weder für Ihr Team noch für Ihre Kunden.
      </LeadText>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
        {painCards.map((c) => (
          <div
            key={c.title}
            className={`border bg-base/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 ${painBorder[c.color]}`}
          >
            <span className="text-3xl mb-3 block">{c.emoji}</span>
            <h3 className="text-lg font-bold text-ink font-editorial mb-2">{c.title}</h3>
            <p className="text-muted text-sm leading-relaxed font-body">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── LÖSUNG ───────────── */

const leistungen = [
  {
    title: 'Training auf Ihre Wissensbasis',
    text: 'Handbücher, FAQs, Produktseiten, Tickethistorie – wir integrieren alles, was Ihr Team wissen muss. Der Bot antwortet auf Basis Ihrer echten Inhalte, nicht auf Basis von Vermutungen.',
    icon: 'model_training',
  },
  {
    title: 'Nahtlose Übergabe an Ihr Team',
    text: 'Komplexe oder sensible Anfragen leitet der Bot automatisch an einen menschlichen Mitarbeiter weiter – mit vollständigem Gesprächskontext. Kein Kunde muss sich zweimal erklären.',
    icon: 'swap_horiz',
  },
  {
    title: 'Mehrkanal-Integration',
    text: 'Website-Chat, WhatsApp, E-Mail-Triage – der Assistent ist dort, wo Ihre Kunden sind.',
    icon: 'devices',
  },
  {
    title: 'Datenschutz und Datenflüsse gemeinsam prüfen',
    text: 'Hosting, Modellanbieter, Auftragsverarbeitung und Datenflüsse werden vor der Umsetzung transparent festgelegt – passend zu Ihrem Einsatz und Ihren Datenschutzanforderungen.',
    icon: 'verified_user',
  },
  {
    title: 'Messbare Ergebnisse von Anfang an',
    text: 'Ticketvolumen, Lösungsrate, Kundenzufriedenheit – Sie sehen in einem Dashboard, was der Bot leistet. Kein Bauchgefühl, sondern Zahlen.',
    icon: 'monitoring',
  },
  {
    title: 'Kontinuierliche Verbesserung',
    text: 'Was der Bot nicht beantworten kann, wird protokolliert. Wir analysieren diese Lücken regelmäßig und trainieren nach – der Assistent wird mit der Zeit besser.',
    icon: 'trending_up',
  },
];

const Loesung: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <SectionLabel>Die Lösung</SectionLabel>
      <SectionHeadline>Ein Chatbot, der Ihr Unternehmen wirklich kennt.</SectionHeadline>
      <LeadText>
        Kein generischer Bot mit vorgefertigten Antworten. Wir trainieren den Assistenten auf Ihre Daten – Ihre FAQs, Ihre Produktdokumentation, Ihre internen Prozesse. Das Ergebnis: Antworten, die klingen als kämen sie von Ihrem besten Mitarbeiter.
      </LeadText>

      {/* Leistungen grid */}
      <div className="mt-14 border border-accent/25 bg-surface/60 backdrop-blur-sm text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {leistungen.map((l, i) => (
            <div
              key={l.title}
              className={`p-6 ${i % 2 === 0 ? 'md:border-r border-ink/10' : ''} ${i >= 2 ? 'border-t border-ink/10' : ''}`}
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-hover text-2xl mt-0.5 flex-shrink-0">{l.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-ink font-editorial mb-1 flex items-center gap-2">
                    <span className="text-accent-hover">✓</span> {l.title}
                  </h4>
                  <p className="text-muted text-sm leading-relaxed font-body">{l.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DSGVO strip */}
      <div className="mt-8 border border-accent/25 bg-accent/10 p-6 text-left flex flex-col md:flex-row items-start gap-4">
        <span className="text-4xl">🛡️</span>
        <div>
          <h4 className="text-sm font-bold text-[#B77A36] font-editorial mb-2 uppercase tracking-wider">
            Ihre Kundendaten gehören Ihnen – und bleiben bei Ihnen.
          </h4>
          <p className="text-muted text-sm leading-relaxed font-body">
            Das hängt von den gewählten Anbietern, Datenflüssen und Vertragsbedingungen ab. Wir prüfen gemeinsam, wo Daten verarbeitet werden und welche Datenschutzanforderungen für Ihren Einsatz gelten.
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
    title: 'Analyse & Datensichtung (Woche 1)',
    text: 'Wir schauen uns Ihr aktuelles Ticketaufkommen an, identifizieren die häufigsten Anfragen und definieren, welche Datenquellen für das Training genutzt werden. So wissen wir genau, wo der größte Hebel liegt.',
  },
  {
    num: '02',
    title: 'Aufbau & Training (Woche 2–3)',
    text: 'Wir trainieren den Assistenten auf Ihre Inhalte, bauen die Übergabelogik an Ihr Team und integrieren ihn in Ihre bestehenden Kanäle. Sie müssen dafür nichts an Ihrer Infrastruktur ändern.',
  },
  {
    num: '03',
    title: 'Testphase & Feintuning (Woche 3–4)',
    text: 'Vor dem Go-live testen wir gemeinsam mit Ihnen – mit echten Fragen aus Ihrer Tickethistorie. Was nicht stimmt, wird angepasst. Erst wenn Sie zufrieden sind, geht es live.',
  },
  {
    num: '04',
    title: 'Go-live & laufende Optimierung',
    text: 'Der Assistent ist live. Wir beobachten die ersten Wochen eng, analysieren Lücken und passen nach. Auf Wunsch übernehmen wir den laufenden Betrieb – oder übergeben an Ihr Team.',
  },
];

const Prozess: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Wie es läuft</SectionLabel>
      <SectionHeadline>
        In vier Wochen live –<br className="hidden sm:block" />
        ohne IT-Projekt.
      </SectionHeadline>
      <LeadText>
        Sie brauchen kein eigenes Entwicklerteam und keine aufwendige Infrastruktur. Wir bringen alles mit und übergeben ein fertiges, laufendes System.
      </LeadText>

      <div className="mt-14 space-y-0 text-left relative">
        {/* vertical line */}
        <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-accent via-accent-mid to-[#B77A36] opacity-30 hidden sm:block" />

        {steps.map((s) => (
          <div key={s.num} className="relative flex gap-5 sm:gap-6 py-6 group">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 border border-accent/30 bg-surface flex items-center justify-center text-accent-hover font-bold font-editorial text-lg relative z-10 group-hover:border-accent-hover group-hover:shadow-soft transition-all duration-300">
              {s.num}
            </div>
            <div className="pt-1">
              <h3 className="text-base md:text-lg font-bold text-ink font-editorial mb-2">
                Schritt {s.num.replace(/^0/, '')} – {s.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed font-body">{s.text}</p>
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
    category: 'Bestellungen & Lieferung',
    icon: 'local_shipping',
    title: 'Lieferstatus abfragen, Retouren einleiten, Lieferadressen ändern',
    text: 'Direkte Anbindung an Ihr Shopsystem möglich – der Bot antwortet mit echten Echtzeit-Daten, nicht mit Textbausteinen.',
    result: 'Häufigste Anfragekategorie im E-Commerce & Handel',
    color: 'cyan' as const,
  },
  {
    category: 'Produkt- & Servicefragen',
    icon: 'inventory_2',
    title: 'Technische Spezifikationen, Kompatibilität, Anwendungsfragen',
    text: 'Der Bot kennt Ihren Produktkatalog besser als jeder neue Mitarbeiter – und vergisst nichts.',
    result: 'Besonders wertvoll bei erklärungsbedürftigen Produkten',
    color: 'pink' as const,
  },
  {
    category: 'Vertragliches & Konditionen',
    icon: 'gavel',
    title: 'Preise, Laufzeiten, Kündigungsfristen, Zahlungsmodalitäten',
    text: 'Standardisierte, rechtlich abgestimmte Antworten – kein Mitarbeiter der „es falsch erklärt".',
    result: 'Reduziert auch Rückfragen und Beschwerden',
    color: 'yellow' as const,
  },
  {
    category: 'Onboarding neuer Kunden',
    icon: 'person_add',
    title: 'Erstkonfiguration, Zugänge, erste Schritte',
    text: 'Neue Kunden kommen schneller zum Erfolg, ohne Ihr Team zu belasten.',
    result: 'Höhere Aktivierungsrate, weniger Abbrüche',
    color: 'cyan' as const,
  },
  {
    category: 'Interne Helpdesk-Nutzung',
    icon: 'business_center',
    title: 'IT-Anfragen, HR-Fragen, Prozesswissen für Mitarbeiter',
    text: 'Der gleiche Ansatz funktioniert auch intern – als Wissensassistent für Ihr Team.',
    result: 'Onboarding und Support intern deutlich entlastet',
    color: 'pink' as const,
  },
];

const ucBorder: Record<string, string> = {
  cyan: 'border-accent/25 hover:border-accent/50 hover:shadow-soft',
  pink: 'border-accent/25 hover:border-accent/50 hover:shadow-soft',
  yellow: 'border-accent/25 hover:border-accent-hover/60 hover:shadow-soft',
};
const ucCategory: Record<string, string> = {
  cyan: 'text-accent-hover border-accent/30 bg-accent/15',
  pink: 'text-accent-hover border-accent/30 bg-accent/15',
  yellow: 'text-[#B77A36] border-accent/30 bg-accent/15',
};
const ucIcon: Record<string, string> = {
  cyan: 'text-accent-hover',
  pink: 'text-accent-hover',
  yellow: 'text-[#B77A36]',
};

const UseCases: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <SectionLabel>Typische Anwendungsfälle</SectionLabel>
      <SectionHeadline>Was Ihr Chatbot vom ersten Tag an übernimmt.</SectionHeadline>
      <LeadText>
        Das sind die Anfragen, die Ihr Team täglich von der eigentlichen Arbeit abhalten – und die ein trainierter Assistent sofort und zuverlässig beantwortet.
      </LeadText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 text-left">
        {useCases.map((uc) => (
          <div
            key={uc.title}
            className={`border bg-base/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col ${ucBorder[uc.color]}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`material-symbols-outlined text-3xl ${ucIcon[uc.color]}`}>{uc.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 border rounded font-body ${ucCategory[uc.color]}`}>
                {uc.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-ink font-editorial mb-2">{uc.title}</h3>
            <p className="text-muted text-sm leading-relaxed font-body mb-4 flex-1">{uc.text}</p>
            <div className={`flex items-center gap-1.5 text-xs font-bold font-body mt-auto ${ucIcon[uc.color]}`}>
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
  { emoji: '📬', text: 'Sie täglich mehr als 20 gleichartige Support-Anfragen erhalten' },
  { emoji: '🕐', text: 'Kunden sich über lange Antwortzeiten oder fehlende Erreichbarkeit beschweren' },
  { emoji: '👥', text: 'Ihr Support-Team mit Routineanfragen ausgelastet ist und für komplexe Fälle keine Zeit bleibt' },
  { emoji: '📦', text: 'Sie ein erklärungsbedürftiges Produkt oder eine komplexe Dienstleistung anbieten' },
  { emoji: '🚀', text: 'Sie wachsen und nicht proportional Personal aufbauen wollen' },
];

const notFor = [
  'Unternehmen mit unter 5 Support-Anfragen täglich – der Aufwand wäre größer als der Nutzen, das sagen wir Ihnen lieber direkt.',
  'Wer einen „fertigen Bot von der Stange" sucht, der morgen läuft – gute Qualität braucht 2–4 Wochen Aufbau.',
  'Unternehmen, die keine Wissensbasis haben und auch nicht bereit sind, eine aufzubauen – ohne strukturiertes Wissen kann kein Assistent gut antworten.',
];

const Zielgruppe: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Für wen</SectionLabel>
      <SectionHeadline>Das lohnt sich für Sie, wenn...</SectionHeadline>

      <div className="mt-10 space-y-4 text-left max-w-2xl mx-auto">
        {targetAudience.map((a) => (
          <div key={a.text} className="flex items-start gap-3 border border-neon-cyan/10 bg-surface/40 p-4 hover:border-accent/30 transition-colors">
            <span className="text-2xl flex-shrink-0">{a.emoji}</span>
            <p className="text-muted text-sm font-body leading-relaxed">{a.text}</p>
          </div>
        ))}
      </div>

      {/* Not for */}
      <div className="mt-14 max-w-2xl mx-auto text-left">
        <h3 className="text-lg font-bold text-ink font-editorial mb-6 text-center">
          <span className="text-accent-hover mr-2">#</span>Und für wen es (noch) nicht passt.
        </h3>
        <div className="space-y-4">
          {notFor.map((item) => (
            <div key={item} className="flex items-start gap-3 border border-ink/10 bg-base/60 p-4">
              <span className="text-accent-hover font-bold text-lg flex-shrink-0 mt-[-2px]">✕</span>
              <p className="text-light text-sm font-body leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ───────────── VERGLEICH ───────────── */

const comparisonRows = [
  { label: 'Erreichbarkeit', before: 'Mo–Fr, 9–17 Uhr', after: 'Längere Erreichbarkeit möglich' },
  { label: 'Antwortzeit', before: 'Minuten bis Stunden', after: 'Innerhalb definierter Abläufe' },
  { label: 'Routineanfragen', before: 'Manuell bearbeitet', after: 'Unterstützt durch Regeln & Wissen' },
  { label: 'Teamauslastung', before: 'Gebunden durch Routinefälle', after: 'Mehr Raum für komplexe Fälle' },
  { label: 'Skalierung', before: 'Mehr Anfragen = mehr Personal', after: 'Abhängig von Prozess & Systemgrenzen' },
  { label: 'Qualitätskonsistenz', before: 'Schwankt je nach Tag & Person', after: 'Prüfbar durch Vorgaben & Monitoring' },
];

const Vergleich: React.FC = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <SectionLabel>Vorher / Nachher</SectionLabel>
      <SectionHeadline>Was sich konkret verändert.</SectionHeadline>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left text-sm font-body border-collapse">
          <thead>
            <tr className="border-b border-ink/10">
              <th className="py-3 px-4 text-light font-normal text-xs uppercase tracking-wider w-1/4"></th>
              <th className="py-3 px-4 text-accent-hover font-bold text-xs uppercase tracking-wider w-[37.5%]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">close</span>
                  Ohne KI-Assistent
                </span>
              </th>
              <th className="py-3 px-4 text-accent-hover font-bold text-xs uppercase tracking-wider w-[37.5%]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">check</span>
                  Mit KI-Assistent
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-b border-ink/10 ${i % 2 === 0 ? 'bg-surface/20' : ''}`}
              >
                <td className="py-3 px-4 text-muted font-bold text-xs uppercase tracking-wider">{row.label}</td>
                <td className="py-3 px-4 text-light">{row.before}</td>
                <td className="py-3 px-4 text-accent-hover">{row.after}</td>
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
    q: 'Was passiert, wenn der Bot eine Frage nicht beantworten kann?',
    a: 'Der Assistent erkennt, wenn eine Anfrage außerhalb seines Wissens liegt oder eskaliert werden muss – und leitet dann automatisch an einen menschlichen Mitarbeiter weiter. Inklusive vollständigem Gesprächsverlauf, damit der Kunde nicht alles wiederholen muss.',
  },
  {
    q: 'Wo werden meine Daten verarbeitet?',
    a: 'Das hängt vom gewählten Setup ab. Hosting, Modellanbieter, Auftragsverarbeitung und Datenflüsse werden vor der Umsetzung transparent festgelegt und passend zu Ihren Datenschutzanforderungen gewählt.',
  },
  {
    q: 'Muss ich meine bestehende Software ersetzen?',
    a: 'Nein. Wir integrieren den Assistenten in Ihre bestehenden Kanäle – Website, WhatsApp, Help-Center oder E-Mail-Triage. Kein System muss ausgetauscht werden.',
  },
  {
    q: 'Was brauche ich, um loszustarten?',
    a: 'Im Idealfall eine strukturierte Wissensbasis – FAQs, Produktdokumentation, interne Prozessbeschreibungen. Falls diese noch nicht vorhanden sind, helfen wir Ihnen beim Aufbau. Das ist Teil unserer Leistung.',
  },
  {
    q: 'Wie schnell sehen wir erste Ergebnisse?',
    a: 'Bereits in der Testphase – also vor dem offiziellen Go-live – sehen Sie anhand echter Beispielanfragen, wie der Assistent antwortet. Nach dem Launch sind Kennzahlen wie Lösungsrate und Ticketreduktion ab Tag 1 messbar.',
  },
  {
    q: 'Was kostet das?',
    a: 'Das hängt von Umfang, Datenvolumen und Integrationstiefe ab. Wir arbeiten auf Projektbasis für den Aufbau und optional im Retainer für laufende Optimierung. Zahlen legen wir transparent auf den Tisch – im Erstgespräch, bevor Sie sich entscheiden.',
  },
];

const FAQItem: React.FC<{ item: typeof faqItems[0]; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => (
  <div className="border border-ink/10 bg-surface/30">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
    >
      <span className="text-sm font-bold text-ink font-editorial pr-4">{item.q}</span>
      <span className={`material-symbols-outlined text-accent-hover flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
        add
      </span>
    </button>
    {isOpen && (
      <div className="px-5 pb-5 -mt-1">
        <p className="text-muted text-sm leading-relaxed font-body">{item.a}</p>
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
    <div className="max-w-3xl mx-auto text-center border border-accent/25 bg-surface/60 backdrop-blur-sm p-10 md:p-16 relative overflow-hidden">
      <span className="absolute top-3 left-3 text-accent-hover/30 text-2xl font-body select-none" aria-hidden="true">[</span>
      <span className="absolute bottom-3 right-3 text-accent-hover/30 text-2xl font-body select-none" aria-hidden="true">]</span>

      <SectionLabel>Jetzt starten</SectionLabel>

      <h2 className="text-2xl md:text-3xl font-bold text-ink font-editorial mb-4 mt-2">
        Sehen Sie live, was ein Chatbot<br className="hidden sm:block" />
        <span className="text-accent-hover ">für Ihren Support leisten kann.</span>
      </h2>
      <p className="text-muted font-body text-sm md:text-base mb-8 max-w-xl mx-auto">
        In einer kostenlosen Demo zeigen wir Ihnen – anhand Ihrer eigenen Branche und Anfragen – wie ein trainierter Assistent antwortet. Kein generisches Beispiel, sondern etwas das sich nach Ihrem Unternehmen anfühlt.
      </p>

      <Link
        to="/#kontakt"
        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
      >
        Kostenlose Demo anfragen
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>

      <p className="mt-6 text-xs text-light font-body">
        Kein Angebot, kein Druck. Einfach zeigen, was möglich ist.
      </p>
    </div>
  </section>
);

/* ───────────── PAGE COMPONENT ───────────── */

export const KIKundenservice: React.FC = () => {
  return (
    <div className="min-h-screen bg-base text-ink font-body relative">
      <RouteMeta title="KI-Kundenservice | Ainzigartig" description="Automatisieren Sie Ihren Kundenservice mit KI." />
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ECA867_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-1/4 left-1/4 text-[#B77A36] font-bold text-xl animate-float opacity-40">sys</div>
        <div className="absolute top-1/3 right-1/3 text-accent-hover font-bold text-2xl animate-float opacity-30 [animation-delay:1s]">[]</div>
        <div className="absolute bottom-1/4 left-1/3 text-accent-hover font-bold text-xl animate-float opacity-40 [animation-delay:2s]">&gt;</div>
      </div>

      {/* Back link */}
      <div className="fixed top-24 left-4 sm:left-8 z-40">
        <Link to="/" className="text-accent-hover text-sm hover:underline inline-flex items-center gap-1 font-body bg-base/80 backdrop-blur-sm px-3 py-1.5 border border-accent/25 hover:border-accent/45 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Zurück
        </Link>
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

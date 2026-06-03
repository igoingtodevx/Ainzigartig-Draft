import React from 'react';

const mailto = 'mailto:info@ainzigartig.de?subject=Preisanfrage%20%E2%80%94%20Ainzigartig';

interface PricingItem {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  tier: 'Einstieg' | 'Kern' | 'Premium';
}

const pricing: PricingItem[] = [
  {
    name: 'KI-Schnellstart',
    price: '2.500 €',
    period: 'einmalig',
    description: 'Ihr erster KI-Assistent in 5 Tagen. Perfekt zum Reinschnuppern.',
    features: [
      'KI-Assistent für 1 Use-Case',
      'Trainiert auf Ihren Daten',
      'Integration in bestehende Tools',
      '5 Tage Umsetzung',
      'Nachbesserung inklusive',
    ],
    tier: 'Einstieg',
  },
  {
    name: 'KI-Audit',
    price: '1.500 €',
    period: 'einmalig',
    description: '1–2 Tage Analyse: Wo verbirgt sich das größte Potential?',
    features: [
      'Prozess-Analyse',
      'Top 3 Use-Cases mit ROI-Schätzung',
      'Priorisierte Umsetzungs-Roadmap',
      'Tool-Empfehlungen',
      '15–20 Seiten Bericht',
    ],
    tier: 'Einstieg',
  },
  {
    name: 'KI-Workshop',
    price: '2.000 €',
    period: 'pro Tag',
    description: 'Halber oder ganzer Tag: Ihr Team lernt KI-Tools konkret einzusetzen.',
    features: [
      'Hands-on, kein Theorie-Vortrag',
      'Mit echten Daten aus Ihrem Betrieb',
      '5–15 Teilnehmende',
      'Prompt-Library als Nachschlagewerk',
      'Vor-Workshop-Abstimmung',
    ],
    tier: 'Einstieg',
  },
  {
    name: 'KI-Kundenservice',
    price: '3.000 €',
    period: '+ 200 €/Monat',
    description: 'Chatbot oder Telefonassistent, der Ihr Unternehmen kennt.',
    features: [
      'Custom Chatbot / Voice Agent',
      'Trainiert auf Ihr Wissen',
      'Website, WhatsApp, E-Mail',
      'DSGVO-konform',
      'Monatliche Optimierung',
    ],
    tier: 'Kern',
  },
  {
    name: 'KI-Vertrieb',
    price: '4.000 €',
    period: '+ 300 €/Monat',
    description: 'Lead-Qualifizierung, Follow-ups, Angebote — automatisiert.',
    features: [
      'Lead-Scoring & Qualifizierung',
      'Automatische Follow-up-E-Mails',
      'Angebotsgenerierung',
      'CRM-Integration',
      'Performance-Dashboard',
    ],
    tier: 'Kern',
  },
  {
    name: 'Prozess-Automatisierung',
    price: '2.500–8.000 €',
    period: 'einmalig',
    description: 'Ein kompletter Workflow, der manuelle Schritte ersetzt.',
    features: [
      'Individueller Automatisierungs-Workflow',
      'n8n / Make / Zapier',
      'Dokumentation & Monitoring',
      'Retainer-Option',
    ],
    tier: 'Kern',
  },
  {
    name: 'KI-Compliance-Paket',
    price: '2.000 €',
    period: 'einmalig',
    description: 'DSGVO-konforme KI-Einführung. Keine Abmahnung, kein Risiko.',
    features: [
      'AVV & Datenschutz-Dokumentation',
      'AI-Tool-Vetting',
      'Mitarbeiter-Richtlinien',
      'Einwilligungs-Flows',
      'Checkliste für Audit',
    ],
    tier: 'Kern',
  },
  {
    name: 'KI-Beratung',
    price: 'Auf Anfrage',
    period: 'Tagessatz',
    description: 'Strategische Beratung für komplexere Fragestellungen.',
    features: [
      'KI-Strategie & Roadmap',
      'Vendor-Auswahl',
      'Implementierungs-Begleitung',
      'Workshops für Führungskräfte',
    ],
    tier: 'Premium',
  },
];

const tierColors: Record<string, string> = {
  Einstieg: 'border-accent/30 bg-accent/[0.03]',
  Kern: 'border-ink/10 bg-ink/[0.02]',
  Premium: 'border-faint/20 bg-faint/[0.02]',
};

const tierBadge: Record<string, string> = {
  Einstieg: 'text-accent border-accent/30',
  Kern: 'text-ink border-ink/20',
  Premium: 'text-muted border-faint/30',
};

export const PricingOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-base text-ink font-body">
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
            Preise & Leistungen
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-ink mb-6">
            KI muss nicht teuer sein.<br />
            <span className="text-muted">Sie muss nur passen.</span>
          </h1>

          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
           transparente Preise, klare Pakete. Kein Versteck, kein „Rufen Sie uns an".
            Wählen Sie was zu Ihnen passt — oder starten Sie mit einem unverbindlichen Gespräch.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-20 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Tier labels */}
          <div className="grid grid-cols-3 gap-4 mb-6 max-w-3xl mx-auto">
            {(['Einstieg', 'Kern', 'Premium'] as const).map((tier) => (
              <div key={tier} className="text-center">
                <span className={`inline-block text-xs font-bold uppercase tracking-[0.2em] border px-3 py-1 ${tierBadge[tier]}`}>
                  {tier}
                </span>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pricing.map((item) => (
              <div
                key={item.name}
                className={`border p-6 ${tierColors[item.tier]} flex flex-col`}
              >
                <div className="mb-4">
                  <p className="text-xs text-faint uppercase tracking-[0.15em] mb-1">{item.tier}</p>
                  <h3 className="font-editorial text-lg text-ink">{item.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="font-editorial text-2xl text-ink">{item.price}</span>
                  <span className="text-xs text-faint ml-1">{item.period}</span>
                </div>

                <p className="text-xs text-muted leading-relaxed mb-5">{item.description}</p>

                <ul className="space-y-2 mt-auto">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted">
                      <span className="material-symbols-outlined text-accent text-sm mt-px">check</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hinweis */}
      <section className="py-12 px-6 md:px-8 bg-ink/[0.03]">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-xs text-faint leading-relaxed">
            Alle Preise zzgl. MwSt. · Unverbindliche Preisauskunft · Individuelle Angebote nach Bedarf.
            <br />
            DSGVO-Konformität ist in allen Paketen enthalten.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-8 text-center">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-4">
          Nicht sicher, was Sie brauchen?
        </h2>
        <p className="text-muted text-sm mb-8 max-w-lg mx-auto">
          30 Minuten. Wir klären zusammen: Was passt zu Ihnen — und was nicht. Kostenfrei.
        </p>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 text-sm text-accent font-body group"
        >
          <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
            Erstgespräch vereinbaren
          </span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </a>
      </section>
    </div>
  );
};

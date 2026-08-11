import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

interface PricingItem {
  name: string;
  description: string;
  features: string[];
  tier: 'Einstieg' | 'Kern' | 'Strategie';
}

const pricing: PricingItem[] = [
  {
    name: 'KI-Schnellstart',
    description: 'Ein klar abgegrenzter erster KI-Assistent als pragmatischer Einstieg.',
    features: ['1 klarer Use Case', 'Arbeit mit Ihren Daten', 'Integration in vorhandene Abläufe', 'Zielrahmen nach Scope', 'Feinschliff & Übergabe'],
    tier: 'Einstieg',
  },
  {
    name: 'KI-Audit',
    description: 'Wir identifizieren, priorisieren und bewerten konkrete KI-Potenziale im Unternehmen.',
    features: ['Prozessanalyse', 'Top-Use-Cases', 'ROI-/Aufwandsschätzung', 'Priorisierte Roadmap', 'Tool-Empfehlungen'],
    tier: 'Einstieg',
  },
  {
    name: 'KI-Workshop',
    description: 'Hands-on mit konkreten Aufgaben und Daten aus Ihrem Arbeitsalltag.',
    features: ['Halber oder ganzer Tag', 'Praxis statt Folienmarathon', '5–15 Teilnehmende', 'Prompt-/Workflow-Vorlagen', 'Vorab-Abstimmung'],
    tier: 'Einstieg',
  },
  {
    name: 'KI-Kundenservice',
    description: 'Chat- oder Wissensassistenten auf Basis Ihrer Inhalte und Prozesse.',
    features: ['Custom Chatbot / Assistent', 'RAG / Wissensbasis', 'Website & weitere Kanäle', 'Messbare Qualitätsmetriken', 'Optionale laufende Optimierung'],
    tier: 'Kern',
  },
  {
    name: 'Prozess-Automatisierung',
    description: 'Wiederkehrende Arbeitsschritte werden verbunden, automatisiert und nachvollziehbar gemacht.',
    features: ['Individueller Workflow', 'n8n / Make / APIs', 'Dokumentation', 'Monitoring', 'Retainer optional'],
    tier: 'Kern',
  },
  {
    name: 'KI-Vertrieb',
    description: 'Unterstützung für Qualifizierung, Follow-ups und Informationsaufbereitung im Vertrieb.',
    features: ['Lead-Scoring', 'Follow-up-Flows', 'CRM-Integration', 'Recherche & Enrichment', 'Performance-Auswertung'],
    tier: 'Kern',
  },
  {
    name: 'KI-Governance & Datenschutz',
    description: 'Technische und organisatorische Anforderungen werden vor der Umsetzung in das Setup übersetzt.',
    features: ['Tool- und Datenfluss-Vetting', 'AVV-/Anbieter-Check', 'Rollen & Richtlinien', 'Dokumentation', 'Umsetzbare Guardrails'],
    tier: 'Strategie',
  },
  {
    name: 'KI-Beratung',
    description: 'Strategie und Umsetzungsbegleitung für komplexere KI-Vorhaben.',
    features: ['Use-Case-Portfolio', 'Roadmap', 'Vendor-Auswahl', 'Architektur-Entscheidungen', 'Begleitung der Umsetzung'],
    tier: 'Strategie',
  },
];

const tierOrder = ['Einstieg', 'Kern', 'Strategie'] as const;

export const PricingOverview: React.FC = () => (
  <div className="min-h-screen bg-base text-ink font-body">
    <RouteMeta title="Leistungen & Preise | Ainzigartig" description="Leistungspakete und Projektmodelle von Ainzigartig." />

    <section className="pt-36 pb-20 px-6">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Leistungen & Rahmen</p>
        <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.7rem)] leading-[1.02] tracking-[-0.035em] font-normal">
          Kein Paket-Zirkus.<br /><span className="text-muted">Ein Scope, der zu Ihrem Problem passt.</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto mt-6">
          Wir zeigen transparent, was enthalten ist. Den Preis nennen wir nach einem kurzen Scope-Check, weil Integrationen, Datenlage und Sicherheitsanforderungen den Aufwand stärker bestimmen als ein hübscher Paketname.
        </p>
      </div>
    </section>

    <section className="pb-24 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tierOrder.map((tier) => (
            <span key={tier} className="rounded-full border border-ink/15 bg-surface px-4 py-2 text-xs font-semibold text-muted">{tier}</span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricing.map((item) => (
            <article key={item.name} className="brand-card bg-surface p-6 md:p-7 flex flex-col min-h-[330px]">
              <div className="flex items-start justify-between gap-3 mb-5">
                <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light">{item.tier}</span>
                <span className="rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-[0.68rem] font-semibold text-ink">individuell</span>
              </div>
              <h2 className="font-editorial text-2xl text-ink leading-tight">{item.name}</h2>
              <p className="text-sm text-muted leading-relaxed mt-3 mb-6">{item.description}</p>
              <ul className="mt-auto space-y-2.5">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                    <span className="material-symbols-outlined text-[16px] text-accent-hover mt-px">check</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-24 px-6">
      <div className="max-w-[900px] mx-auto rounded-[30px] bg-ink text-white px-7 py-10 md:px-12 md:py-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] font-semibold text-white/45 mb-2">Nächster Schritt</p>
          <h2 className="font-editorial text-3xl md:text-4xl leading-tight text-white">Scope klären, dann Preis.</h2>
          <p className="text-sm text-white/60 mt-3 max-w-xl">30 Minuten reichen meistens, um einzuschätzen, ob ein Projekt Sinn ergibt und in welcher Größenordnung es liegt.</p>
        </div>
        <Link to="/#kontakt" className="brand-pill bg-accent border-accent text-ink hover:bg-accent-mid shrink-0">Erstgespräch buchen</Link>
      </div>
    </section>
  </div>
);

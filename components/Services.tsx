import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  metric: string;
  description: string;
  examples: string[];
  href: string;
}

const services: ServiceItem[] = [
  {
    title: 'AI Strategy & Opportunity Design',
    metric: 'Verstehen · Priorisieren · Absichern',
    description: 'Wir machen aus einem vagen „Wir sollten etwas mit KI machen“ eine begründete Entscheidung: Prozess, Datenlage, Nutzenhypothese, Risiken, Kontrollpunkte und ein sinnvoller erster Scope.',
    examples: ['Use-Case- und Prozessanalyse', 'Business Case, KPI- und Risikologik', 'Daten-, Rollen- und Integrationscheck'],
    href: '/ki-beratung',
  },
  {
    title: 'AI Systems & Automation',
    metric: 'Bauen · Integrieren · Übergaben sichern',
    description: 'Wir entwickeln Websites, Web-Apps und KI-gestützte Workflows, die in reale Arbeit hineinlaufen — etwa mit CRM, Dokumenten, E-Mail, ERP oder einer menschlichen Freigabe vor kritischen Aktionen.',
    examples: ['Kunden- und Serviceplattformen', 'Dokumenten-, CRM- und Operations-Workflows', 'Agenten mit klaren Grenzen und Human Handoff'],
    href: '/live-demo',
  },
  {
    title: 'Decision Intelligence & Optimisation',
    metric: 'Messen · Lernen · Verbessern',
    description: 'Wir machen aus Daten eine nachvollziehbare Entscheidungsgrundlage und bauen Feedbackschleifen, die Systeme mit der Zeit besser machen — statt nach dem Go-live unsichtbar zu werden.',
    examples: ['KPI- und Entscheidungsdashboards', 'CRO-, Lead- und Budget-Optimierung', 'Markt- und Branchenintelligenz'],
    href: '/insights',
  },
];

const ServiceRow: React.FC<{ item: ServiceItem; index: number; isOpen: boolean; onToggle: () => void }> = ({ item, index, isOpen, onToggle }) => {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div className="border-t border-faint/50 group">
      <button onClick={onToggle} aria-expanded={isOpen} className="w-full flex items-baseline justify-between py-5 px-0 text-left cursor-pointer">
        <div className="flex items-baseline gap-4 md:gap-6"><span className="text-xs text-faint font-body tabular-nums transition-transform duration-300 group-hover:-translate-x-1">{num}</span><span className="text-base md:text-lg text-ink font-editorial leading-snug">{item.title}</span></div>
        <span className="text-xs text-muted font-body tracking-wide hidden sm:block">{item.metric}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'max-h-64 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <div className="pl-8 md:pl-14 pr-4 md:pr-32">
          <p className="text-sm text-muted font-body leading-relaxed max-w-xl">{item.description}</p>
          <ul className="mt-4 space-y-1.5 text-xs text-muted font-body">{item.examples.map((example) => <li key={example} className="flex gap-2"><span className="text-accent">—</span>{example}</li>)}</ul>
          <Link to={item.href} className="inline-block mt-4 text-xs text-accent font-body underline decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200">Beispiel ansehen</Link>
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <section id="services" className="py-16u px-6 md:px-8"><div className="max-w-[1200px] mx-auto"><h2 className="font-editorial text-2xl md:text-3xl text-ink mb-4">Wie wir arbeiten</h2><p className="text-sm text-muted font-body leading-relaxed max-w-xl mb-12u">Beratung, Umsetzung und Optimierung gehören zusammen. Je nach Ausgangspunkt steigen wir in der passenden Phase ein — ohne Sie in ein Standardpaket zu drücken.</p><div>{services.map((item, index) => <ServiceRow key={item.title} item={item} index={index} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />)}<div className="border-t border-faint/50" /></div></div></section>;
};

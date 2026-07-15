import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  scope: string;
  description: string;
  examples: string[];
  href: string;
}

const services: ServiceItem[] = [
  {
    title: 'Websites & digitale Produkte',
    scope: 'Frontend · Backend · UX',
    description: 'Wir entwickeln performante Websites, Landingpages, Portale und Web-Apps als belastbare Produkte statt als statische Visitenkarten.',
    examples: ['Unternehmenswebsites und Sales-Funnels', 'Kundenportale und interne Tools', 'KI-Funktionen direkt in der Nutzeroberfläche'],
    href: '/projekte',
  },
  {
    title: 'KI-Agenten & Chatbots',
    scope: 'Wissen · Tools · Übergaben',
    description: 'Wir bauen Assistenten, die Unternehmenswissen nutzen, Werkzeuge aufrufen und komplexe Fälle kontrolliert an Menschen übergeben.',
    examples: ['Produkt- und Serviceberatung', 'Dokumenten- und E-Mail-Triage', 'Agenten für interne Recherche und Operations'],
    href: '/live-demo',
  },
  {
    title: 'Prozessautomatisierung & Integrationen',
    scope: 'CRM · ERP · APIs · Workflows',
    description: 'Wir verbinden vorhandene Systeme und automatisieren wiederkehrende Arbeit, ohne kritische Entscheidungen unkontrolliert aus der Hand zu geben.',
    examples: ['Lead-Qualifizierung und CRM-Pflege', 'Dokumente, Freigaben und Benachrichtigungen', 'Mobile Eingaben bis in bestehende Unternehmenssysteme'],
    href: '/projekte',
  },
  {
    title: 'Decision Intelligence & Analytics',
    scope: 'Daten · Modelle · Entscheidungen',
    description: 'Wir übersetzen verstreute Daten und betriebswirtschaftliche Logik in verständliche Werkzeuge für bessere Entscheidungen.',
    examples: ['Budgetallokation und Szenarien', 'KPI- und Management-Dashboards', 'Branchen-, Markt- und Risikosignale'],
    href: '/insights',
  },
  {
    title: 'AI Strategy & Business Cases',
    scope: 'Prozess · Nutzen · Risiko',
    description: 'Wir identifizieren sinnvolle Einsatzfelder, prüfen Datenlage und Integrationen und definieren einen Scope, der technisch und wirtschaftlich trägt.',
    examples: ['Use-Case- und Prozessanalyse', 'Business Case, KPI- und Risikologik', 'Technologie- und Betriebsentscheidungen'],
    href: '/ki-beratung',
  },
  {
    title: 'Growth, Conversion & Revenue Operations',
    scope: 'Experimente · Funnels · CRM',
    description: 'Wir entwickeln Systeme, die Nachfrage strukturieren, Experimente auswertbar machen und Marketing mit Vertrieb verbinden.',
    examples: ['CRO- und A/B-Test-Systeme', 'Lead-Funnels und Content-Routing', 'Marketing-Budget- und Kanalsteuerung'],
    href: '/projekte',
  },
];

const ServiceRow: React.FC<{ item: ServiceItem; index: number; isOpen: boolean; onToggle: () => void }> = ({ item, index, isOpen, onToggle }) => (
  <div className="border-t border-faint/50 group">
    <button onClick={onToggle} aria-expanded={isOpen} className="w-full grid grid-cols-[36px_1fr] md:grid-cols-[48px_1fr_auto] gap-3 md:gap-6 items-baseline py-5 text-left cursor-pointer">
      <span className="text-[10px] text-faint tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-lg md:text-xl text-ink font-editorial leading-snug">{item.title}</span>
      <span className="hidden md:block text-xs text-muted tracking-wide">{item.scope}</span>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'max-h-80 opacity-100 pb-7' : 'max-h-0 opacity-0'}`}>
      <div className="pl-12 md:pl-[72px] pr-4 grid md:grid-cols-2 gap-5 md:gap-12">
        <p className="text-sm text-muted leading-relaxed max-w-xl">{item.description}</p>
        <div>
          <ul className="space-y-2 text-xs text-muted">{item.examples.map((example) => <li key={example} className="border-l border-accent/40 pl-3">{example}</li>)}</ul>
          <Link to={item.href} className="inline-block mt-4 text-xs text-accent underline underline-offset-4">Passendes System ansehen</Link>
        </div>
      </div>
    </div>
  </div>
);

export const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-8 bg-ink/[0.025] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-12 gap-6 mb-12 md:mb-16">
          <h2 className="font-editorial text-3xl md:text-5xl text-ink md:col-span-7">Von Beratung bis Betrieb.</h2>
          <p className="text-sm text-muted leading-relaxed md:col-span-5">Ainzigartig ist bewusst breit aufgestellt: Strategie, Produktentwicklung und technische Umsetzung greifen ineinander. Wir steigen dort ein, wo die Aufgabe beginnt.</p>
        </div>
        <div>{services.map((item, index) => <ServiceRow key={item.title} item={item} index={index} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />)}<div className="border-t border-faint/50" /></div>
      </div>
    </section>
  );
};

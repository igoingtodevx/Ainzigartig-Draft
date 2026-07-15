import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const offers = [
  {
    stage: '01 · Verstehen',
    title: 'Opportunity Design',
    description: 'Wir klären Prozess, Zielbild, Beteiligte, Daten, Risiken und Messgröße. Das Ergebnis ist ein priorisierter nächster Schritt – keine generische Toolliste.',
    includes: ['Prozess- und Use-Case-Check', 'Daten- und Integrationslandkarte', 'Risiken, Verantwortungen und Erfolgskriterium'],
  },
  {
    stage: '02 · Bauen',
    title: 'KI-System oder Automatisierung',
    description: 'Wir entwerfen und bauen einen klar abgegrenzten Workflow – von der Oberfläche über Daten und Integrationen bis zur menschlichen Freigabe.',
    includes: ['Prototyp oder produktiver Workflow', 'Testfälle und Übergaben', 'Dokumentierte Betriebs- und Verbesserungslogik'],
  },
  {
    stage: '03 · Messen',
    title: 'Decision Intelligence',
    description: 'Wir machen Daten und Wirkung nutzbar: für Conversion, Leads, Budgets, Reporting oder operative Entscheidungen.',
    includes: ['Kennzahlen- und Datenmodell', 'Entscheidungsoberfläche oder Reporting', 'Mess- und Review-Rhythmus'],
  },
];

export const PricingOverview: React.FC = () => (
  <div className="min-h-screen bg-base text-ink font-body">
    <RouteMeta title="Zusammenarbeit | Ainzigartig" description="Ein klarer Rahmen für Strategie, KI-Systeme und Entscheidungsintelligenz." />
    <section className="pt-28 pb-16 px-6 md:px-8"><div className="max-w-[900px] mx-auto text-center">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">Zusammenarbeit</span>
      <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl leading-[1.08] text-ink mb-6">Kein Paket von der Stange.<br /><span className="text-accent">Ein sinnvoller nächster Schritt.</span></h1>
      <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Umfang und Preis entstehen erst, wenn Prozess, Systeme, Daten und Verantwortung klar sind. Deshalb nennen wir vorab keine Scheinpreise oder pauschalen Lieferzeiten.</p>
    </div></section>

    <section className="pb-16 px-6 md:px-8"><div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-5">
      {offers.map((offer) => <article key={offer.title} className="border border-faint/30 p-6 flex flex-col"><p className="text-xs text-accent uppercase tracking-[0.16em] mb-4">{offer.stage}</p><h2 className="font-editorial text-2xl text-ink mb-4">{offer.title}</h2><p className="text-sm text-muted leading-relaxed mb-6">{offer.description}</p><ul className="space-y-3 mt-auto">{offer.includes.map((item) => <li key={item} className="flex gap-2 text-xs text-muted"><span className="text-accent">→</span>{item}</li>)}</ul></article>)}
    </div></section>

    <section className="py-12 px-6 md:px-8 bg-ink/[0.03]"><div className="max-w-[780px] mx-auto"><h2 className="font-editorial text-2xl text-ink mb-4">Was ein Angebot konkret macht</h2><p className="text-sm text-muted leading-relaxed">Ein Angebot beschreibt Ziel, Liefergegenstände, Annahmen, Verantwortlichkeiten, Datenfluss, Abnahme, Betrieb und Preis. Rechtliche oder datenschutzrechtliche Anforderungen werden projektbezogen geprüft – sie sind kein pauschales Gütesiegel.</p></div></section>

    <section className="py-20 px-6 md:px-8 text-center"><h2 className="font-editorial text-2xl md:text-3xl text-ink mb-4">Den richtigen Einstieg gemeinsam bestimmen.</h2><p className="text-muted text-sm mb-8 max-w-lg mx-auto">Wenn die Ausgangslage klar ist, lässt sich Umfang verantwortungsvoll einschätzen.</p><Link to="/#kontakt" className="inline-flex items-center gap-2 text-sm text-accent font-body group"><span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">Gespräch anfragen</span><span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span></Link></section>
  </div>
);

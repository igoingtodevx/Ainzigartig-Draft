import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PILLARS } from '../content/services.js';
import { RouteMeta } from './RouteMeta';

const costDrivers = [
  'Anzahl und Qualität der Datenquellen',
  'Schnittstellen, Rechte und Testzugänge',
  'Risiko, Prüfbedarf und menschliche Freigaben',
  'Betrieb, Monitoring, Dokumentation und Übergabe',
];

export const PricingOverview: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24">
    <RouteMeta title="Leistungen & Projektrahmen | Ainzigartig" description="Vier Leistungsfelder und die Faktoren, die Umfang und Kosten eines Ainzigartig-Projekts bestimmen." />

    <section className="px-6 pb-16 md:pb-20">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Leistungen & Projektrahmen</p>
        <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.7rem)] leading-[1.02] tracking-[-0.035em] font-normal">
          Vier Leistungsfelder.<br /><span className="text-muted">Preis nach geklärtem Scope.</span>
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto mt-6">
          Ohne Datenlage, Schnittstellen und Prüfbedarf wäre eine öffentliche Pauschale eher Marketing als belastbare Kalkulation. Nach der Einordnung nennen wir Umfang, Annahmen und Kosten vor einer Beauftragung.
        </p>
      </div>
    </section>

    <section className="px-6 pb-20">
      <div className="max-w-[1140px] mx-auto grid md:grid-cols-2 gap-5">
        {SERVICE_PILLARS.map((service, index) => (
          <article key={service.id} className="brand-card bg-surface p-6 md:p-8 flex flex-col min-h-[350px]">
            <div className="flex items-start justify-between gap-4">
              <span className="w-11 h-11 rounded-full bg-accent/20 border border-accent/45 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{service.icon}</span>
              </span>
              <span className="font-editorial text-3xl text-accent-mid">0{index + 1}</span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl leading-tight mt-7">{service.title}</h2>
            <p className="text-sm text-muted leading-relaxed mt-3 mb-6">{service.description}</p>
            <ul className="mt-auto space-y-2.5">
              {service.scope.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                  <span className="material-symbols-outlined text-[16px] text-accent-hover mt-px" aria-hidden="true">check</span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="px-6 pb-20">
      <div className="max-w-[900px] mx-auto brand-card bg-[#F3EFEA] p-7 md:p-10">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Was die Kalkulation bestimmt</p>
        <h2 className="font-editorial text-3xl md:text-4xl leading-tight">Kein Preis ohne diese vier Antworten.</h2>
        <ul className="grid sm:grid-cols-2 gap-4 mt-7">
          {costDrivers.map((item, index) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span className="font-editorial text-xl text-accent-hover">0{index + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="px-6">
      <div className="max-w-[900px] mx-auto rounded-[30px] bg-ink text-white px-7 py-10 md:px-12 md:py-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] font-semibold text-white/45 mb-2">Nächster Schritt</p>
          <h2 className="font-editorial text-3xl md:text-4xl leading-tight text-white">Scope klären, dann kalkulieren.</h2>
          <p className="text-sm text-white/60 mt-3 max-w-xl">Im Erstgespräch prüfen wir, welches der vier Leistungsfelder passt und welche Informationen für eine belastbare Einschätzung noch fehlen.</p>
        </div>
        <Link to="/#kontakt" className="brand-pill bg-accent border-accent text-ink hover:bg-accent-mid shrink-0">Anwendungsfall einordnen</Link>
      </div>
    </section>
  </main>
);

export default PricingOverview;

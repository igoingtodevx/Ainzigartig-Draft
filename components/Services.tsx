import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Automatisierung & Integrationen',
    lead: 'Wiederkehrende Arbeit verschwindet aus dem Tagesgeschäft.',
    description: 'Wir verbinden bestehende Systeme und automatisieren klare Abläufe – etwa Dokumentenverarbeitung, Übergaben, Benachrichtigungen und Datensynchronisation. Ihr Team behält die Kontrolle; Sonderfälle bleiben sichtbar.',
    examples: 'Typisch: E-Mail- und Dokumentenprozesse, CRM-Workflows, Systemübergaben',
  },
  {
    title: 'Dashboards & interne Business-Tools',
    lead: 'Die richtigen Informationen und Werkzeuge an einem Ort.',
    description: 'Wir bauen schlanke Anwendungen für Abläufe, die in Tabellen, Postfächern oder Insellösungen feststecken. Datenquellen, Rollen und Freigaben werden passend zu Ihrem Betrieb abgebildet.',
    examples: 'Typisch: operative Dashboards, Kundenportale, interne Fachanwendungen',
  },
  {
    title: 'KI-Assistenten & Wissenssysteme',
    lead: 'Unternehmenswissen wird auffindbar und im Alltag nutzbar.',
    description: 'Assistenten beantworten Fragen auf Basis freigegebener Dokumente und zeigen ihre Quellen. Wir definieren gemeinsam, was das System wissen darf, wann es unsicher ist und wann ein Mensch übernimmt.',
    examples: 'Typisch: Dokument-Assistenten, interne Wissenssuche, Service-Unterstützung',
  },
  {
    title: 'Individuelle KI- & Softwarelösungen',
    lead: 'Wenn Standardsoftware den entscheidenden Prozess nicht abbildet.',
    description: 'Wir übersetzen einen konkreten Engpass in eine belastbare Lösung – vom ersten Prototyp bis zur integrierten Anwendung. Erst klären wir Nutzen, Daten und Grenzen; dann wird gebaut.',
    examples: 'Typisch: branchenspezifische Anwendungen, Analyse-Tools, neue digitale Angebote',
  },
];

export const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="scroll-mt-20 py-8u md:py-16u px-6 md:px-8" aria-labelledby="services-title">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-6 md:grid-cols-12 md:gap-12 mb-12u">
          <h2 id="services-title" className="font-editorial text-2xl md:text-3xl text-ink md:col-span-5">Vier Wege zu weniger Reibung</h2>
          <p className="text-sm text-muted leading-relaxed md:col-span-6 md:col-start-7">
            Keine KI um der KI willen. Wir beginnen bei einem konkreten Engpass, prüfen Daten und Systeme und bauen nur, was im Arbeitsalltag einen nachvollziehbaren Nutzen hat.
          </p>
        </div>

        <div className="border-b border-faint/50">
          {services.map((item, index) => {
            const open = openIndex === index;
            const panelId = `service-panel-${index}`;
            return (
              <article key={item.title} className="border-t border-faint/50">
                <button type="button" onClick={() => setOpenIndex(open ? null : index)} aria-expanded={open} aria-controls={panelId} className="group w-full py-5 md:py-6 flex items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-base">
                  <span className="text-xs text-faint tabular-nums mt-1">{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-editorial text-lg md:text-xl text-ink">{item.title}</span>
                    <span className="block text-xs md:text-sm text-muted mt-1 leading-relaxed">{item.lead}</span>
                  </span>
                  <span aria-hidden="true" className="text-accent text-xl leading-none mt-1">{open ? '−' : '+'}</span>
                </button>
                <div id={panelId} hidden={!open} className="pb-7 pl-8 md:pl-10 pr-2 md:pr-24">
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">{item.description}</p>
                  <p className="text-xs text-faint mt-3 max-w-2xl">{item.examples}</p>
                </div>
              </article>
            );
          })}
        </div>
        <Link to="/#kontakt" className="inline-flex mt-8 text-sm text-accent underline underline-offset-4 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Engpass im Erstgespräch einordnen →</Link>
      </div>
    </section>
  );
};

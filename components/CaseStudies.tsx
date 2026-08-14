import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';

interface WorkItem {
  label: string;
  title: string;
  description: string;
  to: string;
  meta: string;
  preview: React.ReactNode;
}

const PreviewFrame: React.FC<{
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, children }) => (
  <figure className="border-y border-ink/15 bg-surface" aria-label={`${title}, statische Vorschau`}>
    <figcaption className="flex flex-col gap-1 border-b border-ink/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-light">{eyebrow}</span>
      <span className="text-xs text-muted">{title}</span>
    </figcaption>
    {children}
  </figure>
);

const WebsiteAnalysisPreview: React.FC = () => (
  <PreviewFrame eyebrow="Öffentliche Websiteanalyse" title="Ergebnisvorschau">
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-3 border-b border-ink/10 pb-5 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1 border border-ink/15 bg-base px-4 py-3 text-sm text-muted">
          beispiel-mittelstand.de
        </div>
        <span className="shrink-0 bg-ink px-4 py-3 text-center text-xs font-semibold text-white">
          Analysiert
        </span>
      </div>

      <div className="grid gap-7 pt-6 md:grid-cols-[150px_1fr] md:gap-10">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-light">Orientierungswert</p>
          <p className="mt-2 font-editorial text-6xl leading-none text-ink">78</p>
          <p className="mt-2 text-xs text-muted">Gute Ausgangslage</p>
        </div>

        <div className="border-t border-ink/10">
          {[
            ['01', 'Angebot', 'Leistungen sind klar, der digitale Einstieg bleibt allgemein.'],
            ['02', 'Prozess', 'Kontakt und Anfrage lassen sich sauber vorqualifizieren.'],
            ['03', 'Potenzial', 'Website-Daten können direkt in Vertrieb und CRM fließen.'],
          ].map(([number, label, finding]) => (
            <div key={number} className="grid grid-cols-[28px_88px_1fr] gap-2 border-b border-ink/10 py-3 text-xs leading-relaxed">
              <span className="font-editorial text-accent-hover">{number}</span>
              <span className="font-semibold text-ink">{label}</span>
              <span className="text-muted">{finding}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PreviewFrame>
);

const DocumentAgentPreview: React.FC = () => (
  <PreviewFrame eyebrow="Dokument-Agent" title="Rechnung in strukturierter Übergabe">
    <div className="grid md:grid-cols-[0.78fr_1.22fr]">
      <div className="border-b border-ink/10 bg-base p-4 sm:p-6 md:border-b-0 md:border-r md:p-7">
        <div className="border border-ink/15 bg-surface p-5">
          <div className="flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
            <div>
              <p className="font-editorial text-2xl text-ink">Rechnung</p>
              <p className="mt-1 text-[0.62rem] text-light">RE-2025-1042 · 04.06.2025</p>
            </div>
            <span className="text-xs font-semibold text-accent-hover">PDF</span>
          </div>
          <div className="mt-5 space-y-2.5" aria-hidden="true">
            {[82, 64, 91, 72, 48].map((width) => (
              <div key={width} className="h-1.5 bg-ink/10" style={{ width: `${width}%` }} />
            ))}
          </div>
          <div className="mt-7 flex justify-between border-t border-ink/10 pt-4 text-xs">
            <span className="text-light">Gesamtbetrag</span>
            <strong className="text-ink">786,00 €</strong>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-7">
        <div className="grid gap-x-6 sm:grid-cols-2">
          {[
            ['Wichtige Daten', ['Nummer · RE-2025-1042', 'Brutto · 786,00 €', 'Zahlungsziel · 30 Tage']],
            ['Prüfhinweise', ['Fälligkeit erkannt', 'Bankdaten vorhanden', 'Kostenstelle prüfen']],
          ].map(([title, rows]) => (
            <div key={String(title)} className="border-t border-ink/15 py-4">
              <p className="text-xs font-semibold text-ink">{String(title)}</p>
              <ul className="mt-3 space-y-2 text-[0.68rem] text-muted">
                {(rows as string[]).map((row) => <li key={row}>{row}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-2 border-l-2 border-accent bg-accent/10 px-4 py-3">
          <p className="text-xs leading-relaxed text-muted">
            Übergabe vorbereitet. Kostenstelle und Freigabe bleiben beim Menschen.
          </p>
        </div>
      </div>
    </div>
  </PreviewFrame>
);

const AuditPreview: React.FC = () => (
  <PreviewFrame eyebrow="KI-Ausgangslage" title="Frage 3 von 6 · Daten">
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 text-[0.64rem] text-light">
        <span>50 % abgeschlossen</span>
        <span>Sechs Voraussetzungen</span>
      </div>
      <div className="mt-3 h-px bg-ink/10">
        <div className="h-px w-1/2 bg-accent-hover" />
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-[1fr_1.08fr] md:gap-10">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent-hover">Daten</p>
          <p className="mt-2 font-editorial text-2xl leading-tight text-ink md:text-3xl">
            Wie zugänglich sind die benötigten Informationen?
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Dokumente, Wissensartikel, CRM-Felder oder historische Fälle.
          </p>
        </div>

        <div className="border-t border-ink/10">
          {[
            'Unbekannt oder nicht digital',
            'Verteilt in Postfächern und Ordnern',
            'Digital, aber uneinheitlich',
            'Zentral und überwiegend gepflegt',
          ].map((option, index) => (
            <div
              key={option}
              className={`flex items-center gap-3 border-b py-3 text-xs ${
                index === 2
                  ? 'border-accent bg-accent/10 px-3 text-ink'
                  : 'border-ink/10 text-muted'
              }`}
            >
              <span className="font-editorial text-base text-light">{index + 1}</span>
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PreviewFrame>
);

const work: WorkItem[] = [
  {
    label: 'Live Tool',
    title: 'KI-Website-Analyse',
    description: 'Eine echte Website wird ausgelesen, technisch eingeordnet und in konkrete KI-Potenziale mit Wirkung, Aufwand und nächsten Schritten übersetzt.',
    to: '/ki-analyse',
    meta: 'Analyse · Scraping · LLM',
    preview: <WebsiteAnalysisPreview />,
  },
  {
    label: 'Live Demo',
    title: 'Dokument-Agent',
    description: 'PDFs, Scans und Texte werden multimodal verarbeitet und in Zusammenfassung, Risiken und konkrete Aktionen strukturiert.',
    to: '/live-demo',
    meta: 'PDF · Vision · Automation',
    preview: <DocumentAgentPreview />,
  },
  {
    label: 'Interaktiver Check',
    title: 'KI-Reifegrad',
    description: 'Sechs Dimensionen zeigen, welche Voraussetzungen für einen begrenzten KI-Pilot stehen und was zuerst geklärt werden sollte.',
    to: '/ki-audit',
    meta: 'Assessment · Priorisierung · Einstieg',
    preview: <AuditPreview />,
  },
];

export const CaseStudies: React.FC = () => (
  <section id="demos" className="py-24 md:py-32 bg-[#F3EFEA] border-y border-ink/10 scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="grid gap-5 border-b border-ink/15 pb-10 md:grid-cols-[0.72fr_1.28fr] md:items-end md:pb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light">Ausprobieren</p>
          <p className="mt-3 text-xs leading-relaxed text-light">Drei Werkzeuge. Drei echte Abläufe.</p>
        </div>
        <div>
          <h2 className="font-editorial text-[clamp(2.3rem,4vw,3.35rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
            Lieber zeigen als behaupten.
          </h2>
          <p className="text-base text-muted leading-relaxed mt-4 max-w-2xl">
            Ein Teil unserer Arbeit lässt sich direkt ausprobieren. So sehen Sie, wie wir KI-Systeme denken und bauen, bevor wir über ein Projekt sprechen.
          </p>
        </div>
      </header>

      <div>
        {work.map((item, index) => (
          <article key={item.title} className="grid gap-y-8 border-b border-ink/15 py-14 md:py-20 lg:grid-cols-12 lg:gap-x-12">
            <div className={`self-center lg:col-span-4 ${index % 2 === 1 ? 'lg:col-start-9' : ''}`}>
              <div className="flex items-baseline justify-between gap-4 border-t border-ink/15 pt-3">
                <span className="font-editorial text-3xl leading-none text-accent-mid tabular">0{index + 1}</span>
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-light">{item.label}</span>
              </div>
              <p className="mt-8 text-[0.68rem] uppercase tracking-[0.12em] text-light">{item.meta}</p>
              <h3 className="mt-3 font-editorial text-[clamp(2rem,3.2vw,2.8rem)] leading-[1.02] text-ink">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
              <Link
                to={item.to}
                aria-label={`${item.title} selbst ausprobieren`}
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent-hover"
              >
                <span>Selbst ausprobieren</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className={`min-w-0 lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-6'}`}>
              {item.preview}
            </div>
          </article>
        ))}

        <Link to="/insights" className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-ink hover:text-accent-hover transition-colors">
          <span>Kuratierte KI-Insights ansehen</span>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

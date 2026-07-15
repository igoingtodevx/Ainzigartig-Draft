import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    index: '01',
    status: 'Live',
    title: 'Website Opportunity Audit',
    description: 'Prüft eine öffentliche Website und leitet aus sichtbaren Signalen konkrete digitale Chancen und nächste Prüfschritte ab.',
    action: 'Website prüfen',
    to: '/ki-analyse',
  },
  {
    index: '02',
    status: 'Live',
    title: 'Dokument-Agent',
    description: 'Liest Rechnungen, Angebote, E-Mails oder Verträge, extrahiert Kerndaten und bereitet kontrollierte nächste Schritte vor.',
    action: 'Dokument analysieren',
    to: '/live-demo',
  },
  {
    index: '03',
    status: 'Aktuell',
    title: 'Industry Watcher',
    description: 'Verdichtet aktuelle KI-Signale mit Quellen, Relevanzeinordnung und konkreten Chancen für Unternehmen.',
    action: 'Briefing öffnen',
    to: '/insights',
  },
  {
    index: '04',
    status: 'Live',
    title: 'Ainzigartig Assistent',
    description: 'Beantwortet Fragen zur Zusammenarbeit auf Basis des freigegebenen Unternehmenskontexts und verweist bei offenen Punkten an einen Menschen.',
    action: 'Assistent öffnen',
    event: 'ainzigartig:open-chat',
  },
];

export const ProductShowcase: React.FC = () => (
  <section id="live-systeme" className="py-20 md:py-28 px-6 md:px-8 border-y border-faint/40 scroll-mt-16">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid md:grid-cols-12 gap-6 mb-12 md:mb-16 items-end">
        <div className="md:col-span-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Direkt ausprobieren</p>
          <h2 className="font-editorial text-3xl md:text-5xl text-ink">Echte Systeme. Keine Folien.</h2>
        </div>
        <p className="md:col-span-4 text-sm text-muted leading-relaxed">Jedes Werkzeug läuft auf einer echten Backend-Funktion. Eingaben werden verarbeitet, Ergebnisse entstehen live.</p>
      </div>

      <div className="grid md:grid-cols-2 border-t border-l border-faint/50">
        {products.map((product) => {
          const content = (
            <>
              <div className="flex items-center justify-between gap-4 mb-10">
                <span className="text-[10px] text-faint tabular-nums">{product.index}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-accent">{product.status}</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl text-ink mb-4 group-hover:text-accent transition-colors">{product.title}</h3>
              <p className="text-sm text-muted leading-relaxed max-w-md flex-grow">{product.description}</p>
              <span className="mt-8 text-sm text-ink underline underline-offset-4 decoration-faint group-hover:decoration-accent">{product.action}</span>
            </>
          );
          return product.to ? (
            <Link key={product.title} to={product.to} className="group min-h-[320px] p-7 md:p-9 border-r border-b border-faint/50 flex flex-col hover:bg-ink/[0.025] transition-colors">{content}</Link>
          ) : (
            <button key={product.title} type="button" onClick={() => window.dispatchEvent(new Event(product.event || 'ainzigartig:open-chat'))} className="group min-h-[320px] p-7 md:p-9 border-r border-b border-faint/50 flex flex-col text-left hover:bg-ink/[0.025] transition-colors">{content}</button>
          );
        })}
      </div>
    </div>
  </section>
);

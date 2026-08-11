import React from 'react';
import { Link } from 'react-router-dom';

const demos = [
  { title: 'KI-Website-Analyse', text: 'Eine öffentliche Website analysieren und mögliche Ansatzpunkte strukturiert einordnen lassen.', to: '/ki-analyse', cta: 'Website analysieren' },
  { title: 'Dokument-Agent', text: 'An Beispieldokumenten oder einem eigenen Dokument sehen, wie Felder, Risiken und nächste Schritte extrahiert werden.', to: '/live-demo', cta: 'Demo öffnen' },
  { title: 'KI-Reifegrad-Check', text: 'Sechs Fragen beantworten und eine erste, regelbasierte Orientierung für den nächsten sinnvollen Schritt erhalten.', to: '/ki-audit', cta: 'Check starten' },
];

const systems = [
  {
    title: 'AutoWunsch',
    type: 'Fahrzeuganalyse & Beratung',
    text: 'Kostenloser Fahrzeugcheck mit Webkontext, strukturierter KI-Analyse, technischen Daten, bekannten Schwächen, Wertverlustschätzung und Preisentwicklung auf Basis von PKW.de-Daten. Eine eigene deterministische Logik erstellt die Prognose; eine anschließende Beratung ist per Stripe buchbar. Die individuelle Fahrzeugauswahl erfolgt danach durch den Betreiber.',
  },
  {
    title: 'Zeitstempel',
    type: 'Local-first Arbeitszeiterfassung',
    text: 'PWA mit lokaler Offline-Nutzung in IndexedDB, persistentem Outbox-Sync, Revisionsprüfung und Konfliktkopien sowie CSV- und PDF-Export. Die lokale Demo funktioniert ohne Konto; echte Konten und Synchronisation setzen eine Convex-Bereitstellung voraus.',
  },
  {
    title: 'Unternehmens-Wissensassistent',
    type: 'Dokumentbasis & semantische Suche',
    text: 'Ein generisches Systemmuster für kuratierte Dokumentbasen, semantische Suche und RAG: Antworten werden aus freigegebenem Unternehmenswissen abgeleitet und können auf ihre Quellen zurückgeführt werden.',
  },
];

export const CaseStudies: React.FC = () => (
  <section id="beispiele" className="scroll-mt-20 py-8u md:py-16u px-6 md:px-8 bg-surface/50" aria-labelledby="proof-title">
    <div className="max-w-[1200px] mx-auto">
      <div className="max-w-2xl mb-12u">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Ausprobieren & einordnen</p>
        <h2 id="proof-title" className="font-editorial text-2xl md:text-3xl text-ink">Belege statt Versprechen</h2>
        <p className="text-sm text-muted leading-relaxed mt-4">Erst selbst testen, dann ausgewählte Systeme ansehen. Öffentliche Demos sind als Demos gekennzeichnet; die Systeme zeigen belegbare technische Substanz, keine erfundenen Erfolgskennzahlen.</p>
      </div>

      <div className="mb-16">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h3 className="font-editorial text-xl text-ink">A. Jetzt ausprobieren</h3>
          <span className="text-xs text-muted">Ainzigartig-Demos</span>
        </div>
        <div className="grid md:grid-cols-3 border-t border-faint/60">
          {demos.map((demo, index) => (
            <article key={demo.title} className={`py-6 md:px-6 border-b border-faint/60 ${index > 0 ? 'md:border-l' : ''} ${index === 0 ? 'md:pl-0' : ''}`}>
              <span className="inline-block text-[10px] uppercase tracking-[0.16em] text-accent border border-accent/30 px-2 py-1 mb-4">Demo</span>
              <h4 className="font-editorial text-lg text-ink">{demo.title}</h4>
              <p className="text-sm text-muted leading-relaxed mt-3 min-h-[4.5rem]">{demo.text}</p>
              <Link to={demo.to} className="inline-block mt-5 text-sm text-accent underline underline-offset-4 hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{demo.cta} →</Link>
            </article>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h3 className="font-editorial text-xl text-ink">B. Ausgewählte Systeme</h3>
          <span className="text-xs text-muted">Technische Einblicke</span>
        </div>
        <div className="space-y-0 border-b border-faint/60">
          {systems.map((system, index) => (
            <article key={system.title} className="grid md:grid-cols-12 gap-3 md:gap-10 py-7 border-t border-faint/60">
              <div className="md:col-span-4">
                <span className="text-xs text-faint tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <h4 className="font-editorial text-lg text-ink mt-1">{system.title}</h4>
                <p className="text-xs text-accent mt-1">{system.type}</p>
              </div>
              <p className="text-sm text-muted leading-relaxed md:col-span-8">{system.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

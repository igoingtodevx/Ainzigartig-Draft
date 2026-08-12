import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const requiredDetails = [
  'Vollständiger Name beziehungsweise Firma und Rechtsform',
  'Ladungsfähige Anschrift',
  'Direkter elektronischer Kontakt',
  'Vertretungs-, Register- und Steuerangaben, soweit anwendbar',
];

export const Impressum: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta title="Anbieterangaben | Ainzigartig" description="Status der Anbieterangaben von Ainzigartig." noIndex />
    <div className="max-w-[820px] mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors mb-10">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
        Startseite
      </Link>

      <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Rechtlicher Freigabestatus</p>
      <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.3rem)] leading-[1.02] tracking-[-0.03em] mb-8">Anbieterangaben fehlen.</h1>

      <div className="brand-card bg-surface p-6 md:p-8">
        <h2 className="font-editorial text-2xl mb-3">Nicht zur Veröffentlichung freigegeben</h2>
        <p className="text-sm text-muted leading-relaxed">
          Im aktuellen Repository liegen keine vollständigen, verifizierbaren Anbieter- und Kontaktdaten vor. Sie werden deshalb weder erraten noch durch öffentliche Platzhalter ersetzt. „Ainzigartig“ allein belegt keine Rechtsform oder ladungsfähige Anschrift.
        </p>

        <div className="mt-7 pt-6 border-t border-ink/10">
          <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-4">Erforderlich vor Freigabe</p>
          <ul className="space-y-3">
            {requiredDetails.map((item, index) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                <span className="font-editorial text-lg text-accent-hover">0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-7 pt-6 border-t border-ink/10 text-xs text-light leading-relaxed">
          Release-Gate: Diese Angaben müssen mit realen Daten ergänzt und zusammen mit der Datenschutzerklärung geprüft werden, bevor der Auftritt geschäftlich veröffentlicht oder das Kontaktformular aktiviert wird.
        </p>
      </div>
    </div>
  </main>
);

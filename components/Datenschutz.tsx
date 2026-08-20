import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

export const Datenschutz: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta title="Datenschutz | Ainzigartig" description="Datenschutzinformationen zu Ainzigartig." />
    <div className="max-w-[820px] mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors mb-10">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Startseite
      </Link>

      <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Rechtliches</p>
      <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.3rem)] leading-[1.02] tracking-[-0.03em] mb-8">Datenschutz</h1>

      <div className="rounded-[26px] border border-[#B77A36]/25 bg-accent/12 p-5 md:p-6 mb-6">
        <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#8B5A24] mb-2">Pre-Launch-Hinweis</p>
        <p className="text-sm text-muted leading-relaxed">
          Die technische Website steht bereits, die endgültigen Unternehmens-, Domain- und Vertragsdaten jedoch noch nicht. Deshalb ist diese Seite bewusst als Arbeitsstand gekennzeichnet und muss vor dem öffentlichen Livegang anhand des finalen Setups rechtlich geprüft und vervollständigt werden.
        </p>
      </div>

      <div className="brand-card bg-surface p-6 md:p-8 space-y-7">
        <section>
          <h2 className="font-editorial text-2xl mb-2">Was technisch bereits feststeht</h2>
          <ul className="space-y-3 text-sm text-muted leading-relaxed">
            <li className="flex gap-3"><span className="text-accent-hover">01</span><span>Die Website läuft auf einem eigenen, selbst betriebenen Server (VPS) hinter einem Reverse Proxy — nicht über Vercel.</span></li>
            <li className="flex gap-3"><span className="text-accent-hover">02</span><span>Der integrierte Assistent „Edi“ nutzt aktuell serverseitig die OpenAI API.</span></li>
            <li className="flex gap-3"><span className="text-accent-hover">03</span><span>Weitere KI-Demos können Inhalte an externe Modell-APIs übermitteln, wenn ein Besucher die jeweilige Funktion aktiv nutzt.</span></li>
            <li className="flex gap-3"><span className="text-accent-hover">04</span><span>Das Kontaktformular übermittelt die eingegebenen Kontaktdaten an das serverseitige Kontakt-Backend.</span></li>
          </ul>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Was vor Livegang ergänzt werden muss</h2>
          <p className="text-sm text-muted leading-relaxed">
            Verantwortliche Stelle, endgültige Hosting- und Anbieterinformationen, konkrete Datenflüsse der produktiv aktivierten KI-Funktionen, Rechtsgrundlagen, Aufbewahrungsfristen, Betroffenenrechte, Kontaktadresse und gegebenenfalls weitere eingesetzte Analyse- oder Drittanbieter-Dienste.
          </p>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Kontakt während der Preview</h2>
          <p className="text-sm text-muted leading-relaxed">
            Bis eine eigene Ainzigartig-Domain samt Geschäftsadresse final eingerichtet ist, wird auf dieser Preview keine erfundene E-Mail-Adresse angegeben.
          </p>
          <Link to="/#kontakt" className="brand-pill mt-4 bg-ink text-white hover:bg-[#33312E] text-sm">Zum Kontaktformular</Link>
        </section>
      </div>
    </div>
  </main>
);

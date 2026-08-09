import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

export const Impressum: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta title="Impressum | Ainzigartig" description="Rechtliche Angaben zu Ainzigartig." />
    <div className="max-w-[820px] mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors mb-10">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Startseite
      </Link>

      <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Rechtliches</p>
      <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.3rem)] leading-[1.02] tracking-[-0.03em] mb-8">Impressum</h1>

      <div className="rounded-[26px] border border-[#B77A36]/25 bg-accent/12 p-5 md:p-6 mb-6">
        <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#8B5A24] mb-2">Pre-Launch-Hinweis</p>
        <p className="text-sm text-muted leading-relaxed">
          Die vollständigen Anbieter- und Kontaktdaten sind noch nicht final hinterlegt. Diese Preview ist deshalb nicht als veröffentlichungsfertiges Impressum zu verstehen. Vor dem öffentlichen Livegang müssen die tatsächlichen Unternehmensdaten ergänzt und geprüft werden.
        </p>
      </div>

      <div className="brand-card bg-surface p-6 md:p-8 space-y-7">
        <section>
          <h2 className="font-editorial text-2xl mb-2">Anbieter</h2>
          <p className="text-sm text-muted leading-relaxed">Ainzigartig<br />[Rechtsform / vollständiger Name]<br />[Straße und Hausnummer]<br />[PLZ Ort]</p>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Vertretung</h2>
          <p className="text-sm text-muted">[Vertretungsberechtigte Person(en) ergänzen]</p>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Kontakt</h2>
          <p className="text-sm text-muted leading-relaxed">
            Bis die endgültige Geschäftsadresse und eigene Domain eingerichtet sind, nutzen Sie bitte das Kontaktformular der Website.
          </p>
          <Link to="/#kontakt" className="brand-pill mt-4 bg-ink text-white hover:bg-[#33312E] text-sm">Zum Kontaktformular</Link>
        </section>

        <section className="pt-6 border-t border-ink/10">
          <h2 className="font-editorial text-2xl mb-2">Weitere Pflichtangaben</h2>
          <p className="text-sm text-muted leading-relaxed">
            [Register-, Steuer- und sonstige Pflichtangaben ergänzen, soweit sie auf die endgültige Rechtsform und Tätigkeit zutreffen.]
          </p>
        </section>
      </div>
    </div>
  </main>
);

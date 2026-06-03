import React from 'react';

export const Impressum: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-mono pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <a href="#/" className="text-neon-cyan text-sm hover:underline mb-8 inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Zurück zur Startseite
        </a>

        <h1 className="text-3xl font-bold text-white font-display mb-8 mt-4">
          <span className="text-neon-cyan mr-2">&gt;</span>
          Impressum
        </h1>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed border border-gray-800 bg-[#150a26]/40 p-8 rounded-lg">
          <div className="border border-yellow-600/40 bg-yellow-900/20 p-4 rounded">
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
              ⚠️ Noch in Bearbeitung
            </p>
            <p className="text-gray-400 text-xs">
              Die folgenden Angaben werden noch durch vollständige rechtliche Angaben ersetzt.
              Für Anfragen wenden Sie sich bitte direkt an info@ainzigartig.de
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-500 italic">
              [Vollständige Angaben werden nach Rechtsprüfung ergänzt]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Vertreten durch</h2>
            <p>[Wird nach Rechtsprüfung ergänzt]</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Kontakt</h2>
            <p>
              E-Mail: info@ainzigartig.de<br />
              
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: [Wird ergänzt]<br />
              Registernummer: [Wird ergänzt]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [Wird nach Rechtsprüfung ergänzt]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              [Name einfügen]<br />
              [Adresse einfügen]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-4 mt-8">
            <p className="text-gray-500 text-xs">
              [PLATZHALTER — Bitte alle Angaben in eckigen Klammern durch echte Unternehmensdaten ersetzen.]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

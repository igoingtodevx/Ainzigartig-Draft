import React from 'react';

export const Datenschutz: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-mono pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <a href="#/" className="text-neon-cyan text-sm hover:underline mb-8 inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Zurück zur Startseite
        </a>

        <h1 className="text-3xl font-bold text-white font-display mb-8 mt-4">
          <span className="text-neon-cyan mr-2">&gt;</span>
          Datenschutzerklärung
        </h1>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed border border-gray-800 bg-[#150a26]/40 p-8 rounded-lg">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-md font-bold text-gray-200 mb-1 mt-3">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">2. Verantwortliche Stelle</h2>
            <p>
              [Firmenname einfügen]<br />
              [Straße und Hausnummer]<br />
              [PLZ Ort]<br />
              Deutschland<br /><br />
              Telefon: [Telefonnummer einfügen]<br />
              E-Mail: [E-Mail-Adresse einfügen]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-md font-bold text-gray-200 mb-1 mt-3">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-none mt-2 space-y-1 pl-4">
              <li>— Browsertyp und Browserversion</li>
              <li>— verwendetes Betriebssystem</li>
              <li>— Referrer URL</li>
              <li>— Hostname des zugreifenden Rechners</li>
              <li>— Uhrzeit der Serveranfrage</li>
              <li>— IP-Adresse</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">4. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. gehostet (San Francisco, USA). Vercel verarbeitet
              Server-Log-Dateien zur Bereitstellung der Website. Details zum Umgang mit Ihren
              Daten finden Sie in der Datenschutzerklärung von Vercel:
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline ml-1">
                https://vercel.com/legal/privacy-policy
              </a>
            </p>
            <p className="mt-2 text-xs text-gray-500 italic">
              Hinweis: Die Server-Anfragen werden über Vercels globales CDN verarbeitet. Einzelne
              Anfragen können über Knotenpunkte in der EU geroutet werden.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">5. KI-Chat-Funktion</h2>
            <p>
              Auf dieser Website verwenden wir eine KI-gestützte Chat-Funktion. Die Eingaben werden
              an Google Gemini (Google LLC) zur Verarbeitung übermittelt. Es werden keine
              personenbezogenen Daten gespeichert. Die IP-Adresse wird temporär zur Ratenbegrenzung
              verwendet und nicht dauerhaft gespeichert.
            </p>
            <p className="mt-2">
              Weitere Informationen finden Sie in der Datenschutzerklärung von Google:
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline ml-1">
                https://policies.google.com/privacy
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">6. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul className="list-none mt-2 space-y-1 pl-4">
              <li>— Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
              <li>— Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
              <li>— Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
              <li>— Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
              <li>— Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
              <li>— Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">7. Cookies</h2>
            <p>
              Diese Website verwendet keine Cookies zu Tracking- oder Analysezwecken.
              [Bitte anpassen, falls Cookies verwendet werden.]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-2">8. Änderung der Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
              aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen
              umzusetzen.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-4 mt-8">
            <p className="text-gray-500 text-xs">
              Stand: Februar 2026<br />
              Datenschutzerklärung wird laufend aktualisiert. Fragen: info@ainzigartig.de
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

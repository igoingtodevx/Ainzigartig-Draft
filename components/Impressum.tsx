import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';
import { isPublicationReady, publicationMessage, siteConfig } from '../site-config';

export const Impressum: React.FC = () => {
  const { legal } = siteConfig;

  return (
    <div className="min-h-screen bg-background-dark text-white font-mono pt-28 pb-20 px-4">
      <RouteMeta title="Impressum | Ainzigartig" description="Angaben zum Anbieter." />
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-neon-cyan text-sm hover:underline mb-8 inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>Zurück zur Startseite
        </Link>
        <h1 className="text-3xl font-bold text-white font-display mb-8 mt-4"><span className="text-neon-cyan mr-2">&gt;</span>Impressum</h1>
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed border border-gray-800 bg-[#150a26]/40 p-8 rounded-lg">
          {!isPublicationReady ? (
            <div className="border border-yellow-600/40 bg-yellow-900/20 p-4 rounded">
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">Nicht veröffentlichungsreife Vorschau</p>
              <p className="text-gray-300 text-xs">{publicationMessage} Es werden bewusst keine Platzhalter oder erfundenen Anbieterangaben angezeigt.</p>
            </div>
          ) : (
            <>
              <section>
                <h2 className="text-lg font-bold text-white mb-2">Angaben gemäß § 5 DDG</h2>
                <p>{legal.providerName}<br />{legal.address}</p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-white mb-2">Kontakt</h2>
                <p>E-Mail: <a className="text-neon-cyan hover:underline" href={`mailto:${legal.email}`}>{legal.email}</a></p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-white mb-2">Verantwortlich für journalistisch-redaktionelle Inhalte</h2>
                <p>{legal.contentResponsible}</p>
              </section>
            </>
          )}
          <p className="border-t border-gray-700 pt-4 text-gray-500 text-xs">
            Register-, Aufsichts- und Umsatzsteuerangaben werden nur veröffentlicht, wenn sie für den tatsächlichen Betreiber zutreffen.
          </p>
        </div>
      </div>
    </div>
  );
};

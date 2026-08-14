import React from 'react';
import { Link } from 'react-router-dom';

const EyeMark: React.FC = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="8" rx="11" ry="7" stroke="currentColor" strokeWidth="1.8" fill="#ECA867" />
    <circle cx="12" cy="8" r="3.5" fill="#1A1918" />
    <circle cx="10.5" cy="6.5" r="1" fill="#FFFFFF" />
  </svg>
);

export const Footer: React.FC = () => (
  <footer className="bg-ink text-white pt-14 pb-8 px-6">
    <div className="max-w-[1140px] mx-auto">
      <div className="grid md:grid-cols-[1.15fr_.85fr] gap-10 pb-12 border-b border-white/15">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5 text-white">
            <EyeMark />
            <span className="font-editorial text-2xl font-semibold tracking-[-0.02em]">Ainzigartig</span>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed mt-4 max-w-md">
            KI-Beratung, Automatisierung und individuelle KI-Lösungen für kleine und mittelständische Unternehmen.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.12em] font-semibold mb-3">Lösungen</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/automatisierung" className="text-white/70 hover:text-white transition-colors">Automatisierung</Link>
              <Link to="/ki-kundenservice" className="text-white/70 hover:text-white transition-colors">KI-Kundenservice</Link>
              <Link to="/ki-beratung" className="text-white/70 hover:text-white transition-colors">KI-Beratung</Link>
              <Link to="/ki-recruiting" className="text-white/70 hover:text-white transition-colors">KI-Recruiting</Link>
              <Link to="/analytics-dashboard" className="text-white/70 hover:text-white transition-colors">Analytics Dashboard</Link>
            </div>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.12em] font-semibold mb-3">Live-Demos</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/ki-analyse" className="text-white/70 hover:text-white transition-colors">KI-Check</Link>
              <Link to="/live-demo" className="text-white/70 hover:text-white transition-colors">Dokument-Agent</Link>
              <Link to="/ki-audit" className="text-white/70 hover:text-white transition-colors">KI-Reifegrad</Link>
              <Link to="/roi-rechner" className="text-white/70 hover:text-white transition-colors">ROI-Rechner</Link>
              <Link to="/insights" className="text-white/70 hover:text-white transition-colors">Insights</Link>
            </div>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.12em] font-semibold mb-3">Unternehmen</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/preise" className="text-white/70 hover:text-white transition-colors">Preise & Pakete</Link>
              <Link to="/ki-schnellstart" className="text-white/70 hover:text-white transition-colors">KI-Schnellstart</Link>
              <Link to="/#kontakt" className="text-white/70 hover:text-white transition-colors">Kontakt</Link>
              <Link to="/impressum" className="text-white/70 hover:text-white transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="text-white/70 hover:text-white transition-colors">Datenschutz</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
        <span>© 2026 Ainzigartig</span>
        <span>KI, die im Alltag funktioniert.</span>
      </div>
    </div>
  </footer>
);

import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-none ${
        scrolled ? 'border-b border-faint/40 bg-base' : 'border-b border-transparent bg-base'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex justify-between h-16 items-center">
          <a
            href="#/"
            className="font-editorial text-lg tracking-tight text-ink hover:text-accent transition-colors duration-200"
          >
            Ainzigartig
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
            >
              Leistungen
            </a>
            <a
              href="#/ki-analyse"
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
            >
              KI-Check
            </a>
            <a
              href="#/preise"
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
            >
              Preise
            </a>
            <a
              href="#/roi-rechner"
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
            >
              ROI-Rechner
            </a>
            <a
              href="#/live-demo"
              className="text-sm text-ink font-body underline decoration-accent decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200"
            >
              Live Demo
            </a>
            <a
              href="#/projekte"
              className="text-sm text-muted hover:text-ink transition-colors duration-200 font-body"
            >
              Projekte
            </a>
            <a
              href="mailto:info@ainzigartig.de?subject=Erstgespr%C3%A4ch%20vereinbaren%20%E2%80%94%20Ainzigartig"
              className="text-sm text-ink font-body underline decoration-accent decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200"
            >
              Gespräch vereinbaren
            </a>
          </div>

          <div className="md:hidden">
            <a
              href="mailto:info@ainzigartig.de?subject=Erstgespr%C3%A4ch%20vereinbaren%20%E2%80%94%20Ainzigartig"
              className="text-sm text-ink font-body underline decoration-accent decoration-1 underline-offset-4"
            >
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Leistungen', to: '/#services', isHash: true },
  { label: 'KI-Check', to: '/ki-analyse' },
  { label: 'Preise', to: '/preise' },
  { label: 'ROI-Rechner', to: '/roi-rechner' },
  { label: 'Live Demo', to: '/live-demo' },
  { label: 'Projekte', to: '/projekte' },
  { label: 'Insights', to: '/insights' },
  { label: 'Gespräch vereinbaren', to: '/#kontakt', isHash: true },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link
            to="/"
            className="font-editorial text-lg tracking-tight text-ink hover:text-accent transition-colors duration-200"
          >
            Ainzigartig
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  item.label === 'Live Demo' || item.label === 'Gespräch vereinbaren'
                    ? 'text-sm text-ink font-body underline decoration-accent decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200'
                    : 'text-sm text-muted hover:text-ink transition-colors duration-200 font-body'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              className="w-9 h-9 flex items-center justify-center text-ink hover:text-accent transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-faint/40 pb-4 pt-2">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-2 text-sm text-muted hover:text-ink hover:bg-surface/50 rounded transition-colors duration-200 font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Leistungen', to: '/#services' },
  { label: 'Live-Demos', to: '/#live-demos' },
  { label: 'Gebaute Systeme', to: '/#systeme' },
  { label: 'Projekte', to: '/projekte' },
];

const EyeMark: React.FC = () => (
  <span className="inline-flex items-center justify-center" aria-hidden="true">
    <svg width="26" height="18" viewBox="0 0 24 16" fill="none">
      <ellipse cx="12" cy="8" rx="11" ry="7" stroke="currentColor" strokeWidth="1.8" fill="#ECA867" />
      <circle cx="12" cy="8" r="3.5" fill="#1A1918" />
      <circle cx="10.5" cy="6.5" r="1" fill="#FFFFFF" />
    </svg>
  </span>
);

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 70);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'py-2.5 bg-base/[.98] border-b border-ink/10'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 text-ink shrink-0" aria-label="Ainzigartig Startseite">
          <EyeMark />
          <span className="font-editorial text-[1.65rem] leading-none font-semibold tracking-[-0.02em]">
            Ainzigartig
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const active = item.to.startsWith('/') && !item.to.includes('#') && location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1 text-[0.9rem] font-body font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent-mid after:transition-all after:duration-300 ${
                  active
                    ? 'text-ink after:w-full'
                    : 'text-muted hover:text-ink after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/#kontakt"
            className="!hidden sm:!inline-flex brand-pill bg-ink text-white hover:bg-[#33312E] text-sm py-2.5 px-5"
          >
            Projektidee prüfen
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden w-11 h-11 rounded-full border border-ink/30 flex items-center justify-center bg-base/85 text-ink transition-colors hover:bg-surface"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile Navigation" className="lg:hidden max-w-[1140px] mx-auto px-6 pt-4 pb-3">
          <div className="brand-card p-3 bg-base/[.98]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted hover:text-ink hover:bg-surface-soft transition-colors"
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link
              to="/preise"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-muted hover:text-ink hover:bg-surface-soft transition-colors"
            >
              Projektrahmen
              <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/#kontakt" className="brand-pill mt-2 w-full bg-ink text-white hover:bg-[#33312E] text-sm py-3">
              Projektidee prüfen
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

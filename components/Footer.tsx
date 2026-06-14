import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-faint/40 py-8 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span className="text-xs text-faint font-body">
          © 2026 Ainzigartig
        </span>
        <div className="flex gap-6 text-xs text-muted font-body">
          <Link to="/" className="hover:text-ink transition-colors duration-200">
            Startseite
          </Link>
          <Link to="/impressum" className="hover:text-ink transition-colors duration-200">
            Impressum
          </Link>
          <Link to="/datenschutz" className="hover:text-ink transition-colors duration-200">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
};

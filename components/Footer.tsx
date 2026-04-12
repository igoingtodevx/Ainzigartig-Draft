import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-gray-800 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="material-symbols-outlined text-gray-600 text-xl mr-2">terminal</span>
          <span className="text-gray-600 text-sm">© 2026 AINZIGARTIG.</span>
        </div>
        <div className="flex space-x-6 text-sm text-gray-600 font-mono">
          <a href="#/" className="hover:text-primary transition-colors">Home</a>
          <a href="#/impressum" className="hover:text-primary transition-colors">Impressum</a>
          <a href="#/datenschutz" className="hover:text-primary transition-colors">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
};
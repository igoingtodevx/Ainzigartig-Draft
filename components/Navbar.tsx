import React from 'react';
import favicon from '../Assets/favicon.svg';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background-dark/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <a href="#/" className="flex-shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <img src={favicon} alt="AINZIGARTIG Logo" className="w-8 h-8 mr-2" />
            <span className="font-bold text-xl tracking-tighter">
              <span className="text-neon-cyan">AI</span>
              <span className="text-white">NZIGARTIG</span>
            </span>
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#" 
              className="group relative px-4 py-2 text-sm font-bold border-2 border-transparent hover:border-neon-cyan text-gray-300 hover:text-primary transition-all duration-200"
            >
              <span className="absolute inset-0 w-full h-full bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">arrow_downward</span> SERVICES
              </span>
            </a>
            
            <a 
              href="#" 
              className="relative px-6 py-2 text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-primary-hover shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
            >
              WORK WITH US
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-white focus:outline-none">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
import React from 'react';

export const ValueProposition: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-24 px-4">
      <div className="relative border border-gray-700 bg-[#150a26]/60 backdrop-blur-sm p-8 md:p-12 text-center rounded-sm group hover:border-neon-pink/40 transition-colors duration-500">
        
        {/* Background grid accent */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#ff00ff_1px,transparent_1px),linear-gradient(90deg,#ff00ff_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Corner accents */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-l-2 border-t-2 border-neon-pink"></div>
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-r-2 border-t-2 border-neon-pink"></div>
        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-l-2 border-b-2 border-neon-pink"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-r-2 border-b-2 border-neon-pink"></div>

        <h3 className="relative z-10 text-xl md:text-2xl lg:text-3xl font-medium text-gray-200 font-display leading-relaxed">
          "Wir sind spezialisiert auf <span className="text-white font-bold text-glow-cyan">kleine Unternehmen</span>, <br className="hidden lg:block" />
          <span className="text-white font-bold text-glow-pink">unkomplizierte Kommunikation</span> und <span className="text-white font-bold text-glow-cyan">schnelle Projekte</span>."
        </h3>
        
        <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  );
};
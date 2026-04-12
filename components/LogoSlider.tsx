import React from 'react';

const placeholderLogos = [
  { name: 'TechCorp', initials: 'TC' },
  { name: 'MittelstandPlus', initials: 'M+' },
  { name: 'DataFlow', initials: 'DF' },
  { name: 'CloudNine', initials: 'C9' },
  { name: 'InnoVate', initials: 'IV' },
  { name: 'ScaleUp', initials: 'SU' },
  { name: 'ProzessHQ', initials: 'PQ' },
  { name: 'SmartOps', initials: 'SO' },
];

const LogoItem: React.FC<{ name: string; initials: string }> = ({ name, initials }) => (
  <div className="flex-shrink-0 flex items-center gap-2 px-6 opacity-40 hover:opacity-70 transition-opacity duration-300 select-none">
    <div className="w-8 h-8 border border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-400 bg-terminal-bg/40 rounded">
      {initials}
    </div>
    <span className="text-sm font-display text-gray-500 tracking-wider whitespace-nowrap">{name}</span>
  </div>
);

export const LogoSlider: React.FC = () => {
  // Double the logos for seamless infinite scroll
  const doubled = [...placeholderLogos, ...placeholderLogos];

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto">
      <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gray-600 font-mono mb-6">
        Vertraut von innovativen Unternehmen
      </p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused]">
          {doubled.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

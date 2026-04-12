import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-full w-full">
      <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[radial-gradient(#6B46C1_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 text-neon-yellow font-bold text-xl animate-float opacity-60">sys</div>
      <div className="absolute top-1/3 right-1/3 text-neon-pink font-bold text-2xl animate-float opacity-40 [animation-delay:1s]">[]</div>
      <div className="absolute bottom-1/4 left-1/3 text-neon-cyan font-bold text-xl animate-float opacity-50 [animation-delay:2s]">&gt;</div>
      <div className="absolute top-20 right-20 text-neon-yellow font-bold text-lg animate-float opacity-70 [animation-delay:3s]">#</div>
      <div className="absolute bottom-40 right-10 text-neon-pink font-bold text-xl animate-float opacity-40 [animation-delay:4s]">{'}'}</div>
      <div className="absolute top-1/2 left-10 text-neon-cyan font-bold text-lg animate-float opacity-60 [animation-delay:1.5s]">0x</div>

      {/* Gradient Scanline Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  );
};
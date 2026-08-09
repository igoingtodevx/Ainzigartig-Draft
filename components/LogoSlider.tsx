import React from 'react';

const technologies = [
  'OpenAI',
  'Anthropic',
  'n8n',
  'Make',
  'LangChain',
  'LlamaIndex',
  'Supabase',
  'Vercel',
];

const TechItem: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex-shrink-0 flex items-center gap-3 px-5 py-2 opacity-75 hover:opacity-100 transition-all duration-200 select-none hover:-translate-y-0.5">
    <span className="w-2 h-2 rounded-full bg-accent border border-ink/20" />
    <span className="text-[1rem] md:text-[1.08rem] font-body font-bold text-ink tracking-[-0.01em] whitespace-nowrap">
      {name}
    </span>
  </div>
);

export const LogoSlider: React.FC = () => {
  const doubled = [...technologies, ...technologies];

  return (
    <section className="py-10 md:py-12 border-b border-ink/10 bg-base relative z-10 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6">
        <p className="text-center text-[0.72rem] uppercase tracking-[0.12em] text-light font-body font-semibold mb-6">
          Wir arbeiten mit führenden KI-Technologien
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {doubled.map((name, index) => (
              <TechItem key={`${name}-${index}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

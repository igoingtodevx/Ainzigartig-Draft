import React from 'react';

const disciplines = [
  { title: 'Product & Engineering', text: 'Frontend, Backend, Datenflüsse, KI-Agenten und Integrationen aus einer Hand.' },
  { title: 'Controlling & Risk', text: 'Business Cases, Kennzahlen, Entscheidungslogik und kontrollierbare Betriebsmodelle.' },
  { title: 'Marketing & Growth', text: 'Positionierung, Funnels, Conversion-Systeme und Revenue Operations mit technischem Unterbau.' },
];

export const TeamSection: React.FC = () => (
  <section className="py-20 md:py-28 px-6 md:px-8 bg-ink text-base">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.2em] text-base/55 mb-5">Warum Ainzigartig</p>
          <h2 className="font-editorial text-3xl md:text-5xl leading-[1.08]">Technik, Betriebswirtschaft und Wachstum gehören zusammen.</h2>
        </div>
        <div className="lg:col-span-6">
          {disciplines.map((discipline, index) => (
            <div key={discipline.title} className="grid grid-cols-[34px_1fr] gap-4 border-t border-base/20 py-5">
              <span className="text-[10px] text-base/40 tabular-nums pt-1">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-editorial text-xl mb-2">{discipline.title}</h3>
                <p className="text-sm text-base/65 leading-relaxed">{discipline.text}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-base/20" />
        </div>
      </div>
    </div>
  </section>
);

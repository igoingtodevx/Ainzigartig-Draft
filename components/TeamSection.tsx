import React from 'react';
import founderImage from '../Assets/run_b_asset_pack/05_team_founder_portrait.webp';

const members = [
  { name: 'Florian Schupp', role: 'AI & Engineering' },
  { name: 'Tim Reinschmidt', role: 'Business & Vertrieb' },
  { name: 'Marvin Bertenrath', role: 'Strategy & Automation' },
];

export const TeamSection: React.FC = () => (
  <section id="team" className="scroll-mt-24 bg-base py-20 md:py-28">
    <div className="mx-auto grid max-w-[1140px] gap-9 px-5 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-accent-hover">Das Team hinter dem Code</p>
        <h2 className="mt-3 font-editorial text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-[-.03em]">Klein genug für direkte Verantwortung.</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">Sie sprechen mit den Menschen, die Problem und Scope verstehen, die Lösung bauen und ihre technischen Grenzen erklären. Keine Übergabe durch mehrere Agentur-Ebenen.</p>
        <div className="mt-9 border-y border-ink/20">
          {members.map((member) => (
            <div key={member.name} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4 last:border-b-0">
              <p className="font-editorial text-2xl text-ink sm:text-[1.7rem]">{member.name}</p>
              <p className="text-right text-[10px] font-semibold uppercase tracking-[.1em] text-light">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-h-[350px] overflow-hidden rounded-[24px] border border-ink/10 bg-[#F3EFEA] px-3 pt-7 sm:min-h-[460px] sm:px-8">
        <p className="absolute left-5 top-5 z-10 rounded-full border border-ink/15 bg-base/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-muted">Ainzigartig · 3 Personen</p>
        <img src={founderImage} alt="Stilisierte Pixel-Art-Porträts des dreiköpfigen Ainzigartig Teams" className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[760px] object-contain object-bottom" loading="lazy" />
      </div>
    </div>
  </section>
);

import React from 'react';
import founderImage from '../Assets/founder_pixelart_nobg.png';

const members = [
  { name: 'Florian Schupp', role: 'AI & Engineering', linkedin: '#' },
  { name: 'Tim Reinschmidt', role: 'Business & Vertrieb', linkedin: '#' },
  { name: 'Marvin Bertenrath', role: 'Strategy & Automation', linkedin: 'https://www.linkedin.com/in/marvin-bertenrath-909b35200/' },
];

export const TeamSection: React.FC = () => (
  <section id="team" className="py-24 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Ainzigartig</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Von Leuten aus der Praxis
        </h2>
        <p className="text-base md:text-lg text-muted mt-4 leading-relaxed">
          Technische Umsetzung, Business-Verständnis und Automatisierung in einem kleinen Team, ohne Übergaben durch fünf Agentur-Ebenen.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-stretch">
        <div className="brand-card bg-surface p-7 md:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-light mb-6">Team</p>
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {members.map((member) => (
                <div key={member.name} className="py-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-editorial text-[1.55rem] leading-tight text-ink">{member.name}</p>
                    <p className="text-xs text-light mt-1">{member.role}</p>
                  </div>
                  {member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-muted hover:text-ink hover:bg-surface-soft transition-colors"
                      aria-label={`${member.name} auf LinkedIn`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mt-7">
            Wir arbeiten direkt mit den Menschen, die das Problem verstehen, die Lösung bauen und später auch dafür geradestehen.
          </p>
        </div>

        <div className="brand-card relative overflow-hidden bg-[#F3EFEA] min-h-[420px] md:min-h-[520px] flex items-end justify-center px-6 pt-8">
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-ink">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Klein. Direkt. Technisch.
          </div>
          <img
            src={founderImage}
            alt="Das Ainzigartig Team als Pixel-Art Illustration"
            className="w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_24px_30px_rgba(26,25,24,.12)]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

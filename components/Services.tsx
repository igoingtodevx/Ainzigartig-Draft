import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PILLARS } from '../content/services.js';

export const Services: React.FC = () => {
  const [openId, setOpenId] = useState(SERVICE_PILLARS[0].id);

  return (
    <section id="services" className="scroll-mt-24 bg-base py-20 md:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <header className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.14em] text-accent-hover">Vier Leistungsfelder</p>
            <h2 className="mt-3 font-editorial text-[clamp(2.45rem,5vw,4rem)] leading-[1.02] tracking-[-.03em]">Was wir für Ihren Betrieb bauen.</h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">Nicht neun lose KI-Angebote, sondern vier technische Wege zu einem klaren Ziel: weniger manuelle Übergaben, bessere Arbeitsoberflächen und nutzbares Unternehmenswissen.</p>
        </header>

        <div className="mt-12 border-t border-ink/20">
          {SERVICE_PILLARS.map((service, index) => {
            const open = openId === service.id;
            const panelId = `service-panel-${service.id}`;
            const triggerId = `service-trigger-${service.id}`;
            return (
              <article key={service.id} className="border-b border-ink/20">
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => setOpenId(open ? '' : service.id)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group grid w-full grid-cols-[38px_1fr_auto] items-center gap-3 py-5 text-left sm:grid-cols-[56px_1fr_220px_auto] sm:gap-5 md:py-6"
                >
                  <span className="font-editorial text-xl text-accent-hover transition-transform group-hover:-translate-x-1">0{index + 1}</span>
                  <span className="font-editorial text-[1.45rem] leading-tight text-ink sm:text-[1.8rem] md:text-[2.05rem]">{service.title}</span>
                  <span className="hidden text-right text-xs font-semibold uppercase tracking-[.1em] text-light sm:block">{service.eyebrow}</span>
                  <span className={`material-symbols-outlined text-[22px] text-muted transition-transform ${open ? 'rotate-45' : ''}`} aria-hidden="true">add</span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!open}
                  inert={open ? undefined : true}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-7 pl-[51px] sm:grid-cols-[1fr_.9fr] sm:pl-[76px] md:pb-9">
                      <div><p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">{service.description}</p><Link to={service.to} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink underline decoration-accent-hover decoration-2 underline-offset-4 hover:text-accent-hover">Leistung im Detail <span aria-hidden="true">→</span></Link></div>
                      <ul className="space-y-2 border-l border-ink/15 pl-4 sm:pl-5">{service.scope.map((scope) => <li key={scope} className="flex gap-2.5 text-xs leading-relaxed text-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-hover" />{scope}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-muted">Noch unklar, welches Feld passt? Ein konkreter Prozess ist ein besserer Startpunkt als eine fertige Lösungsbezeichnung.</p>
          <Link to="/#kontakt" className="brand-pill shrink-0 justify-center bg-ink text-sm text-white">Prozess einordnen</Link>
        </div>
      </div>
    </section>
  );
};

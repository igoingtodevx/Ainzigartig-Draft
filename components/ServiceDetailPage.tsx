import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PILLARS } from '../content/services.js';
import { RouteMeta } from './RouteMeta';

interface DetailItem {
  title: string;
  text: string;
}

interface ServiceDetailPageProps {
  serviceId: string;
  headline: string;
  intro: string;
  deliverables: DetailItem[];
  checks: string[];
  boundary: string;
  relatedTo: string;
  relatedLabel: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  headline,
  intro,
  deliverables,
  checks,
  boundary,
  relatedTo,
  relatedLabel,
}) => {
  const service = SERVICE_PILLARS.find((item) => item.id === serviceId);
  if (!service) return null;

  return (
    <main className="min-h-screen bg-base text-ink font-body pt-32 pb-24">
      <RouteMeta title={`${service.title} | Ainzigartig`} description={service.description} />

      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-[1140px] mx-auto">
          <Link to="/#services" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors mb-10">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
            Alle Leistungen
          </Link>

          <div className="grid lg:grid-cols-[.76fr_1.24fr] gap-8 lg:gap-16 items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-accent-hover mb-4">{service.title}</p>
              <span className="w-14 h-14 rounded-full bg-accent/20 border border-accent/45 flex items-center justify-center">
                <span className="material-symbols-outlined text-[27px]" aria-hidden="true">{service.icon}</span>
              </span>
            </div>
            <div>
              <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.8rem)] leading-[1.01] tracking-[-0.035em]">{headline}</h1>
              <p className="text-base md:text-lg text-muted leading-relaxed mt-6 max-w-2xl">{intro}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link to="/#kontakt" className="brand-pill bg-ink text-white hover:bg-[#33312E]">Anwendungsfall einordnen</Link>
                <Link to={relatedTo} className="brand-pill bg-surface text-ink">{relatedLabel}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 bg-[#F3EFEA] border-y border-ink/10">
        <div className="max-w-[1140px] mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-10 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Möglicher Umfang</p>
            <h2 className="font-editorial text-3xl md:text-4xl leading-tight">Was wir konkret abgrenzen und bauen.</h2>
          </div>
          <div className="space-y-4">
            {deliverables.map((item, index) => (
              <article key={item.title} className="brand-card bg-surface p-6 md:p-7 grid sm:grid-cols-[52px_1fr] gap-4">
                <span className="font-editorial text-3xl text-accent-mid">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-editorial text-2xl leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mt-2">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="max-w-[900px] mx-auto">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Vor dem Start</p>
          <h2 className="font-editorial text-3xl md:text-4xl leading-tight mb-8">Was zuerst geklärt werden muss.</h2>
          <div className="brand-card bg-surface p-6 md:p-8">
            <ul className="grid md:grid-cols-2 gap-4">
              {checks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                  <span className="material-symbols-outlined text-[18px] text-accent-hover mt-0.5" aria-hidden="true">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 pt-6 border-t border-ink/10 text-xs text-light leading-relaxed">
              {boundary}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

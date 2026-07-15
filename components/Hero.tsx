import React from 'react';
import { Link } from 'react-router-dom';

const buildLayers = [
  'Websites & Web-Apps',
  'KI-Agenten & Chatbots',
  'Prozessautomatisierung',
  'CRM-, ERP- & API-Integrationen',
  'Analytics & Decision Intelligence',
];

export const Hero: React.FC = () => (
  <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-end">
      <div className="lg:col-span-8">
        <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-6">
          Strategie · Engineering · Automatisierung
        </p>
        <h1 className="font-editorial text-[clamp(3rem,6.2vw,5.8rem)] leading-[0.98] text-ink max-w-4xl">
          Wir bauen digitale Systeme, die Arbeit abnehmen.
        </h1>
        <div className="w-20 h-px bg-accent mt-9 mb-7" />
        <p className="text-base md:text-lg text-muted font-body leading-relaxed max-w-2xl">
          Von der anspruchsvollen Website bis zum KI-Agenten im Unternehmensprozess:
          Wir beraten, entwickeln und integrieren Lösungen, die im Alltag tatsächlich genutzt werden.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link to="/#live-systeme" className="inline-flex items-center gap-2 text-sm text-base bg-ink px-5 py-3 font-body hover:bg-accent transition-colors">
            Systeme live testen
          </Link>
          <Link to="/#services" className="text-sm text-accent font-body underline decoration-1 underline-offset-4 hover:decoration-2">
            Leistungsfelder ansehen
          </Link>
        </div>
      </div>

      <aside className="lg:col-span-4 border-t border-ink pt-5" aria-label="Technische Leistungsbreite">
        <p className="text-[10px] uppercase tracking-[0.2em] text-faint mb-5">Was wir umsetzen</p>
        <ol className="space-y-0">
          {buildLayers.map((layer, index) => (
            <li key={layer} className="grid grid-cols-[28px_1fr] gap-3 border-b border-faint/40 py-3 text-sm text-ink">
              <span className="text-[10px] text-faint tabular-nums pt-0.5">{String(index + 1).padStart(2, '0')}</span>
              <span>{layer}</span>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  </section>
);

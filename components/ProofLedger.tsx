import React from 'react';
import { Link } from 'react-router-dom';

const PROOF_ITEMS = [
  { count: '03', label: 'Live-Demos', text: 'mit Zweck, Status und klarer Grenze', to: '/#live-demos' },
  { count: '03', label: 'Gebaute Systeme', text: 'mit dokumentiertem Funktionsumfang', to: '/projekte#gebaute-systeme' },
  { count: '04', label: 'Leistungsfelder', text: 'von Integration bis Individualsoftware', to: '/#services' },
];

export const ProofLedger: React.FC = () => (
  <section aria-label="Produktbelege im Überblick" className="border-b border-ink/10 bg-base">
    <div className="mx-auto grid max-w-[1140px] md:grid-cols-[.9fr_1.1fr]">
      <div className="flex items-center border-b border-ink/10 px-5 py-6 sm:px-6 md:border-b-0 md:border-r">
        <p className="max-w-md font-editorial text-xl leading-snug text-ink md:text-2xl">Belegbar statt dekorativ. <em className="text-accent-hover">Erst testen, dann einordnen.</em></p>
      </div>
      <div className="grid grid-cols-3">
        {PROOF_ITEMS.map((item) => (
          <Link key={item.label} to={item.to} className="group min-w-0 border-r border-ink/10 px-3 py-5 last:border-r-0 sm:px-5 sm:py-6">
            <span className="font-editorial text-3xl text-ink sm:text-4xl">{item.count}</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[.08em] text-ink sm:text-xs">{item.label}</span>
            <span className="mt-1.5 hidden text-[10px] leading-relaxed text-light sm:block">{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ProofLedger;

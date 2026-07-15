import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

export interface CapabilityPageProps {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  outputs: string[];
  situations: Array<{ title: string; text: string }>;
  systems: Array<{ title: string; text: string }>;
  principle: string;
}

export const CapabilityPage: React.FC<CapabilityPageProps> = ({
  metaTitle,
  metaDescription,
  eyebrow,
  title,
  intro,
  outputs,
  situations,
  systems,
  principle,
}) => (
  <main className="min-h-screen bg-base text-ink font-body">
    <RouteMeta title={metaTitle} description={metaDescription} />
    <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-14 lg:gap-20 items-end">
        <div className="lg:col-span-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">{eyebrow}</p>
          <h1 className="font-editorial text-[clamp(3rem,6vw,5.5rem)] leading-[1]">{title}</h1>
          <div className="w-20 h-px bg-accent mt-9 mb-7" />
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl">{intro}</p>
        </div>
        <aside className="lg:col-span-4 border-t border-ink pt-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-faint mb-4">Mögliche Liefergegenstände</p>
          <ul className="space-y-3 text-sm">{outputs.map((output) => <li key={output}>{output}</li>)}</ul>
          <Link to="/#kontakt" className="inline-block mt-7 text-sm text-accent underline underline-offset-4">Vorhaben besprechen</Link>
        </aside>
      </div>
    </section>

    <section className="py-20 md:py-28 px-6 md:px-8 border-y border-faint/40">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-12 gap-6 mb-12 md:mb-16">
          <h2 className="font-editorial text-3xl md:text-5xl md:col-span-7">Wo das System ansetzt.</h2>
          <p className="text-sm text-muted leading-relaxed md:col-span-5">Wir beginnen bei einem konkreten Arbeitsablauf und entwerfen Technik, Übergaben und Messpunkte gemeinsam.</p>
        </div>
        <div className="grid md:grid-cols-2 border-t border-l border-faint/50">
          {situations.map((situation, index) => (
            <article key={situation.title} className="min-h-[230px] p-7 md:p-9 border-r border-b border-faint/50">
              <span className="text-[10px] text-faint tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-editorial text-2xl mt-8 mb-4">{situation.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{situation.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 px-6 md:px-8 bg-ink/[0.025]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-5">Systembausteine</p>
        <h2 className="font-editorial text-3xl md:text-5xl mb-12 md:mb-16">Vom Eingang bis zur kontrollierten Übergabe.</h2>
        <div className="border-t border-ink">
          {systems.map((system, index) => (
            <article key={system.title} className="grid md:grid-cols-[70px_1fr_1fr] gap-5 md:gap-12 py-7 border-b border-faint/50">
              <span className="text-[10px] text-faint tabular-nums pt-1">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-editorial text-2xl">{system.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{system.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="font-editorial text-3xl md:text-5xl leading-[1.08] mb-7">{principle}</p>
        <Link to="/#kontakt" className="inline-flex px-6 py-3 bg-ink text-base text-sm hover:bg-accent transition-colors">Gespräch anfragen</Link>
      </div>
    </section>
  </main>
);

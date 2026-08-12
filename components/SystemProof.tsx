import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUILT_SYSTEMS } from '../content/proof.js';

type SystemId = 'autowunsch' | 'zeitstempel' | 'wissensassistent';

const SYSTEM_ICONS: Record<SystemId, string> = {
  autowunsch: 'directions_car',
  zeitstempel: 'timer',
  wissensassistent: 'library_books',
};

const SystemPreview: React.FC<{ id: SystemId }> = ({ id }) => {
  if (id === 'autowunsch') {
    return (
      <div className="system-preview system-preview--dark" role="img" aria-label="Schematische Ansicht des AutoWunsch Produktprototyps">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">AutoWunsch</span>
          <span className="rounded-full bg-[#F47635] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">Fahrzeugcheck</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-xl border border-white/10 bg-white/[.04] p-3">
            <p className="text-[9px] uppercase tracking-[.15em] text-white/45">Anfrage</p>
            {['Budget', 'Nutzung', 'Wünsche'].map((label, index) => (
              <div key={label} className="mt-3">
                <div className="mb-1.5 flex justify-between text-[9px] text-white/65"><span>{label}</span><span>{index === 0 ? '35.000 €' : 'erfasst'}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#F47635]" style={{ width: `${82 - index * 13}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white p-3 text-[#161616]">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-[9px] uppercase tracking-[.14em] text-black/40">Analyse-Vorschau</p><p className="mt-1 text-xs font-bold">Modell & Baureihe</p></div>
              <span className="material-symbols-outlined text-[22px] text-[#F47635]" aria-hidden="true">query_stats</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {['Risiken', 'Preis', 'Details'].map((item, index) => <div key={item} className="rounded-lg bg-[#F4F1ED] p-2 text-center"><span className="block font-editorial text-lg">{index === 0 ? '04' : index === 1 ? '↗' : '12'}</span><span className="text-[8px] text-black/50">{item}</span></div>)}
            </div>
            <div className="mt-3 h-7 rounded-lg bg-[#F47635]" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'zeitstempel') {
    return (
      <div className="system-preview bg-[#F6F2EA]" role="img" aria-label="Schematische Ansicht des Zeitstempel PWA-Prototyps">
        <div className="grid gap-3 p-4 sm:grid-cols-[.78fr_1.22fr]">
          <div className="rounded-2xl bg-[#17231D] p-4 text-white">
            <div className="flex items-center justify-between"><span className="text-[10px] font-semibold">Heute</span><span className="h-2 w-2 rounded-full bg-[#7FC99B]" /></div>
            <p className="mt-7 font-editorial text-4xl leading-none">07:42</p>
            <p className="mt-2 text-[9px] text-white/50">Baustelle Nord · läuft</p>
            <div className="mt-7 rounded-xl bg-[#ECA867] px-3 py-2.5 text-center text-[9px] font-bold uppercase tracking-[.12em] text-[#17231D]">Stempelvorgang</div>
          </div>
          <div className="rounded-2xl border border-[#17231D]/10 bg-white p-4">
            <div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-[.14em] text-ink/40">Wochenübersicht</p><p className="mt-1 font-editorial text-xl">36 h 18 min</p></div><span className="rounded-full bg-[#EAF4ED] px-2 py-1 text-[8px] font-semibold text-[#315B42]">Offline bereit</span></div>
            <div className="mt-5 flex h-20 items-end gap-2 border-b border-ink/10 pb-2">
              {[58, 82, 70, 95, 45].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-[#17231D]" style={{ height: `${height}%`, opacity: .48 + index * .11 }} />)}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2"><span className="rounded-lg bg-[#F6F2EA] p-2 text-[8px] text-muted">CSV / PDF</span><span className="rounded-lg bg-[#F6F2EA] p-2 text-[8px] text-muted">Sync & Konflikte</span></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="system-preview bg-[#F1EDE7]" role="img" aria-label="Schematische Ansicht eines Unternehmens-Wissensassistenten">
      <div className="grid gap-3 p-4 sm:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-2xl border border-ink/10 bg-white p-3">
          <p className="text-[9px] uppercase tracking-[.14em] text-ink/40">Dokumentbasis</p>
          {['Handbuch.pdf', 'Prozesse.docx', 'FAQ Vertrieb'].map((file, index) => <div key={file} className="mt-3 flex items-center gap-2 rounded-lg bg-[#F6F2EA] px-2.5 py-2"><span className="material-symbols-outlined text-[15px] text-accent-hover" aria-hidden="true">description</span><span className="min-w-0 flex-1 truncate text-[9px] text-muted">{file}</span><span className="text-[8px] text-light">{index + 2} Treffer</span></div>)}
        </div>
        <div className="rounded-2xl bg-[#1A1918] p-4 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-white/40">Antwort mit Kontext</p>
          <div className="mt-4 rounded-xl bg-white/[.07] p-3 text-[10px] leading-relaxed text-white/75">Welche Freigabe braucht eine neue Bestellung?</div>
          <div className="mt-3 rounded-xl bg-[#ECA867] p-3 text-[10px] leading-relaxed text-ink">Der dokumentierte Ablauf nennt eine fachliche Freigabe vor der Übergabe …</div>
          <div className="mt-3 flex gap-2"><span className="rounded-full border border-white/15 px-2 py-1 text-[8px] text-white/55">Quelle 01</span><span className="rounded-full border border-white/15 px-2 py-1 text-[8px] text-white/55">Quelle 02</span></div>
        </div>
      </div>
    </div>
  );
};

export const SystemProof: React.FC = () => {
  const [activeId, setActiveId] = useState<SystemId>('autowunsch');
  const active = BUILT_SYSTEMS.find((item) => item.id === activeId) || BUILT_SYSTEMS[0];

  return (
    <section id="systeme" className="scroll-mt-24 border-y border-ink/10 bg-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <header className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Gebaut, nicht erfunden</p>
            <h2 className="mt-3 font-editorial text-[clamp(2.45rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-white">Drei Systeme.<br />Konkreter Umfang.</h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/62 md:text-lg">Keine anonymen Kundenlogos und keine erfundenen Erfolgszahlen. Hier zeigen wir, welche Produktflächen und technischen Abläufe tatsächlich umgesetzt wurden.</p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.76fr_1.24fr] lg:gap-8">
          <div className="touch-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible" role="group" aria-label="Gebaute Systeme auswählen">
            {BUILT_SYSTEMS.map((item, index) => {
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(item.id as SystemId)}
                  className={`min-w-[240px] snap-start rounded-2xl border p-4 text-left transition-colors lg:w-full ${selected ? 'border-accent bg-white text-ink' : 'border-white/15 bg-white/[.035] text-white hover:border-white/35'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-[22px] ${selected ? 'text-accent-hover' : 'text-accent'}`} aria-hidden="true">{SYSTEM_ICONS[item.id as SystemId]}</span>
                    <div className="min-w-0"><span className={`block text-[9px] font-semibold uppercase tracking-[.14em] ${selected ? 'text-muted' : 'text-white/40'}`}>System {String(index + 1).padStart(2, '0')}</span><span className="mt-1 block font-editorial text-xl leading-tight">{item.title}</span><span className={`mt-2 block text-[10px] ${selected ? 'text-muted' : 'text-white/50'}`}>{item.status}</span></div>
                  </div>
                </button>
              );
            })}
          </div>

          <article aria-live="polite" className="overflow-hidden rounded-[24px] border border-white/15 bg-[#F8F5F0] text-ink">
            <p className="border-b border-ink/10 bg-white px-4 py-2 text-[9px] font-semibold uppercase tracking-[.14em] text-light sm:px-5">Schematische Produktansicht · Beispielwerte</p>
            <SystemPreview id={active.id as SystemId} />
            <div className="grid gap-6 border-t border-ink/10 p-5 sm:p-6 md:grid-cols-[1fr_.9fr] md:p-8">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-accent-hover">{active.status}</p><h3 className="mt-2 font-editorial text-3xl leading-tight">{active.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{active.description}</p></div>
              <div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-light">Implementierter Umfang</p><ul className="mt-3 space-y-2.5">{active.features.map((feature) => <li key={feature} className="flex gap-2.5 text-xs leading-relaxed text-muted"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-hover" />{feature}</li>)}</ul></div>
              <p className="border-t border-ink/10 pt-4 text-[11px] leading-relaxed text-light md:col-span-2"><strong className="font-semibold text-muted">Saubere Grenze:</strong> {active.boundary}</p>
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-white/55">Technischer Nachweis statt Ergebnisbehauptung: Die Systeme belegen Produkt- und Engineering-Arbeit, nicht automatisch einen Kundenerfolg.</p>
          <Link to="/projekte#gebaute-systeme" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent">Alle Umfänge & Grenzen <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
};

export default SystemProof;

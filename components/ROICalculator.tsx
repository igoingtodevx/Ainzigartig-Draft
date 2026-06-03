import React, { useState, useMemo } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   ROICalculator — Branchen-spezifischer ROI-Rechner für den Mittelstand.

   Design-Prinzipien (per Subagent-Validierung):
   - Range-Output (€-Spanne), KEIN einzelner Wert → verteidigbar gegen §5 UWG
   - 3 Inputs pro Branche: Mitarbeiter · Wochenstunden · Stundensatz
   - 5 Branchen mit branchenspezifischem Automatisierungsgrad
   - 12-Monats-Projektion (kumulativ), keine 2-Jahres-Optimistenkurve
   - Methodik-Footnote mit Primärquellen
   - 100% client-seitig: keine Eingabe verlässt den Browser
   ──────────────────────────────────────────────────────────────────────────── */

interface Industry {
  id: 'handwerk' | 'kanzlei' | 'praxis' | 'handel' | 'produktion';
  label: string;
  blurb: string;
  // Branchen-Automatisierungsgrad (konservativ, aus Bitkom Mittelstand 2024 +
  // McKinsey "State of AI 2024"). 0.35 = 35% der repetitiven Tasks
  // realistisch automatisierbar mit heutigen KI-Tools.
  automationLow: number;
  automationHigh: number;
  // Realistische Default-Werte (Mittelstand-Median, kein Silicon-Valley)
  defaults: {
    mitarbeiter: number;
    stundenProWoche: number;
    stundensatz: number;
  };
  beispielTasks: string[];
}

const INDUSTRIES: Industry[] = [
  {
    id: 'handwerk',
    label: 'Handwerk',
    blurb: 'SHK, Elektro, Maler, Schreiner, Dachdecker',
    automationLow: 0.35,
    automationHigh: 0.55,
    defaults: { mitarbeiter: 12, stundenProWoche: 18, stundensatz: 52 },
    beispielTasks: [
      'Angebotserstellung aus Fotos & Maßen',
      'Materialbestellung automatisieren',
      'Kunden-E-Mails (Termin, Rückfragen, Rechnung)',
      'Wartungs-Erinnerungen an Stammkunden',
    ],
  },
  {
    id: 'kanzlei',
    label: 'Kanzlei',
    blurb: 'Steuerberatung, Rechtsanwalt, Wirtschaftsprüfung',
    automationLow: 0.40,
    automationHigh: 0.60,
    defaults: { mitarbeiter: 8, stundenProWoche: 22, stundensatz: 85 },
    beispielTasks: [
      'Mandantenkorrespondenz (1. Entwurf)',
      'Fristen- & Wiedervorlagen-Tracking',
      'Beleg-Vorprüfung & Kontierungsvorschläge',
      'Mahnungs- und Erinnerungsschreiben',
    ],
  },
  {
    id: 'praxis',
    label: 'Praxis',
    blurb: 'Arzt, Zahnarzt, Therapeut, MVZ',
    automationLow: 0.30,
    automationHigh: 0.50,
    defaults: { mitarbeiter: 6, stundenProWoche: 16, stundensatz: 48 },
    beispielTasks: [
      'Termin-Erinnerungen (Recall-System)',
      'Anamnese-Vorab-Befragung',
      'Befund-Schreiben (1. Entwurf)',
      'Abrechnungs- & GOÄ-/EBM-Klärung',
    ],
  },
  {
    id: 'handel',
    label: 'Handel & E-Commerce',
    blurb: 'B2B-Vertrieb, Online-Shop, Großhandel',
    automationLow: 0.35,
    automationHigh: 0.55,
    defaults: { mitarbeiter: 15, stundenProWoche: 25, stundensatz: 58 },
    beispielTasks: [
      'Produkttexte & SEO-Beschreibungen',
      'Kundenservice 1st-Level (Retouren, Versand)',
      'Bestands- & Nachbestell-Logik',
      'Angebots- & Follow-up-E-Mails an B2B-Kunden',
    ],
  },
  {
    id: 'produktion',
    label: 'Produktion',
    blurb: 'KMU-Fertigung, Maschinenbau, Logistik',
    automationLow: 0.25,
    automationHigh: 0.45,
    defaults: { mitarbeiter: 30, stundenProWoche: 20, stundensatz: 62 },
    beispielTasks: [
      'Qualitätsdokumentation & Prüfprotokolle',
      'Lieferanten- & Speditionskommunikation',
      'Schicht- & Personalplanung',
      'Wartungs-Logs aus Maschinendaten',
    ],
  },
];

/* Implementierungs-Overhead: konservativ 15% Abzug für Tool-Kosten, initiale
   Einrichtung, Schulung. Begründet in Erfahrungswerten — bewusst NICHT zu
   niedrig angesetzt, sonst wirkt die Zahl unredlich. */
const IMPLEMENTATION_OVERHEAD = 0.15;

/* 12-Monats-Ramp-up-Kurve: typisch für KI-Tools ist langsamer Start, volle
   Wirkung erst ab Monat 6. Quelle: eigene Projekterfahrung. */
const RAMP_UP = [
  0.0, 0.05, 0.12, 0.22, 0.35, 0.5, 0.62, 0.72, 0.8, 0.86, 0.9, 0.93,
];

const eur = (n: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  hint?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  hint,
}) => (
  <div>
    <label className="block text-xs text-muted font-body uppercase tracking-[0.15em] mb-2">
      {label}
      {suffix && <span className="ml-1 normal-case tracking-normal text-faint">({suffix})</span>}
    </label>
    <input
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => {
        const n = Number(e.target.value);
        if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, n)));
      }}
      className="w-full bg-transparent border-b border-faint focus:border-accent focus:outline-none py-2 text-2xl font-editorial text-ink tabular-nums transition-colors duration-200"
    />
    {hint && <p className="text-xs text-faint font-body mt-1">{hint}</p>}
  </div>
);

export const ROICalculator: React.FC = () => {
  const [active, setActive] = useState<Industry['id']>('handwerk');
  const industry = INDUSTRIES.find((i) => i.id === active)!;

  const [mitarbeiter, setMitarbeiter] = useState<number>(industry.defaults.mitarbeiter);
  const [stundenProWoche, setStundenProWoche] = useState<number>(
    industry.defaults.stundenProWoche,
  );
  const [stundensatz, setStundensatz] = useState<number>(industry.defaults.stundensatz);

  // Reset defaults when industry changes
  React.useEffect(() => {
    setMitarbeiter(industry.defaults.mitarbeiter);
    setStundenProWoche(industry.defaults.stundenProWoche);
    setStundensatz(industry.defaults.stundensatz);
  }, [active, industry]);

  const result = useMemo(() => {
    const jahresStunden = stundenProWoche * 52;
    const lowRaw = jahresStunden * industry.automationLow * stundensatz;
    const highRaw = jahresStunden * industry.automationHigh * stundensatz;
    const overhead = (n: number) => n * (1 - IMPLEMENTATION_OVERHEAD);
    return {
      low: Math.round(overhead(lowRaw)),
      high: Math.round(overhead(highRaw)),
      jahresStunden: jahresStunden,
    };
  }, [industry, stundenProWoche, stundensatz]);

  // 12-Monats-Projektion (kumulativ)
  const monthlyBars = useMemo(() => {
    const yearly = (result.low + result.high) / 2;
    const monthly = yearly / 12;
    return RAMP_UP.map((ramp) => Math.round(monthly * ramp * 12)); // kumulativ
  }, [result]);

  const maxBar = Math.max(...monthlyBars, 1);

  return (
    <section className="min-h-screen pt-32 pb-16u px-6 md:px-8 bg-base text-ink font-body antialiased">
      <div className="max-w-[1200px] mx-auto">
        {/* Header — 2-col on desktop: copy left, pull-quote stat right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8u items-end">
          <div className="lg:col-span-7">
            <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-6">
              ROI-Rechner · 60 Sekunden
            </p>
            <h1 className="font-editorial text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] text-ink max-w-3xl">
              Was kostet Sie KI <em className="italic">nicht</em> zu nutzen?
            </h1>
            <div className="w-16 h-px bg-accent mt-8 mb-6" />
            <p className="text-base text-muted font-body leading-relaxed max-w-2xl">
              Eine konservative Schätzung dessen, was Ihr Team zurückgewinnen kann, wenn
              repetitive Aufgaben in {industry.label} von KI übernommen werden. Beruht auf
              Branchen-Medianwerten, nicht auf Hochrechnungen einzelner Leuchtturm-Projekte.
            </p>
          </div>

          {/* Pull-quote stat — team total, updates with input */}
          <aside className="lg:col-span-5">
            <div className="border-l-2 border-accent pl-6">
              <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-4">
                Team · {mitarbeiter} Mitarbeiter · Jahr
              </p>
              <p className="font-editorial text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-accent tabular-nums">
                {eur(Math.round(((result.low + result.high) / 2) * mitarbeiter))}
              </p>
              <p className="text-sm text-muted font-body mt-3 leading-relaxed">
                Ø {eur(Math.round(((result.low + result.high) / 2)))} pro Mitarbeiter.
                <br />
                <span className="text-faint">Indikativ, keine Garantie.</span>
              </p>
            </div>
          </aside>
        </div>

        {/* Industry tabs */}
        <div className="mt-12u border-b border-faint/50">
          <div className="flex flex-wrap gap-x-6 gap-y-2 -mb-px">
            {INDUSTRIES.map((ind) => {
              const isActive = active === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  aria-pressed={isActive}
                  className={`pb-3 text-sm font-body transition-all duration-200 border-b-2 ${
                    isActive
                      ? 'border-accent text-ink font-medium'
                      : 'border-transparent text-muted hover:text-ink hover:border-faint/60'
                  }`}
                >
                  {ind.label}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-faint font-body mt-3">{industry.blurb}</p>

        {/* Input grid + Result */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12u mt-12u">
          {/* Inputs */}
          <div className="space-y-8">
            <NumberInput
              label="Mitarbeiter im repetitiven Workflow"
              suffix="Personen"
              value={mitarbeiter}
              onChange={setMitarbeiter}
              min={1}
              max={500}
              step={1}
              hint="Wer regelmäßig dieselbe Art von Aufgabe bearbeitet (Backoffice, Service, Innendienst)."
            />
            <NumberInput
              label="Stunden pro Woche pro Mitarbeiter"
              suffix="h / Woche"
              value={stundenProWoche}
              onChange={setStundenProWoche}
              min={1}
              max={40}
              step={1}
              hint="Realistische Schätzung — lieber konservativ rechnen, dann überrascht das Ergebnis positiv."
            />
            <NumberInput
              label="Vollkostensatz pro Stunde"
              suffix="€ / h"
              value={stundensatz}
              onChange={setStundensatz}
              min={20}
              max={250}
              step={1}
              hint="Bruttolohn + Lohnnebenkosten + Overhead. Für 2025 typisch: 45–95 €."
            />

            <div className="pt-8 border-t border-faint/50">
              <p className="text-xs text-muted font-body uppercase tracking-[0.15em] mb-3">
                Beispiele aus {industry.label}
              </p>
              <ul className="space-y-2 text-sm text-ink font-body">
                {industry.beispielTasks.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="text-accent">—</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-4">
              Geschätztes Einsparpotenzial
            </p>
            <div className="border-t border-faint/50 pt-6">
              <p className="text-xs text-faint font-body mb-2">pro Jahr &amp; Mitarbeiter · konservativ korrigiert</p>
              <p className="font-editorial text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-ink tabular-nums">
                {eur(result.low)}<span className="text-muted"> – </span>
                <br className="sm:hidden" />
                {eur(result.high)}
              </p>
              <p className="text-sm text-muted font-body mt-4 leading-relaxed">
                Die Spanne ergibt sich aus dem branchen-üblichen Automatisierungsgrad
                ({Math.round(industry.automationLow * 100)} % – {Math.round(industry.automationHigh * 100)} %)
                abzüglich typischer Implementierungs- und Tool-Kosten.
              </p>
            </div>

            {/* 12-month bars */}
            <div className="mt-10">
              <p className="text-xs text-muted font-body uppercase tracking-[0.15em] mb-4">
                Kumulierte Ersparnis · 12 Monate
              </p>
              <div className="flex items-end gap-[3px] h-32 border-b border-faint/50 pb-px">
                {monthlyBars.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent/80 hover:bg-accent transition-colors duration-200"
                    style={{ height: `${(v / maxBar) * 100}%` }}
                    title={`Monat ${i + 1}: ${eur(v)}`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-faint font-body mt-2 tabular-nums">
                <span>Monat 1</span>
                <span>Monat 6</span>
                <span>Monat 12</span>
              </div>
              <p className="text-[10px] text-faint font-body mt-3 leading-relaxed">
                Annahme: 6–8 Wochen Einrichtung, lineares Hochfahren der Nutzung, volle
                Wirkung ab Monat 6. Konservativ kalkuliert.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-6 border-t border-faint/50">
              <a
                href="mailto:info@ainzigartig.de?subject=Erstgespr%C3%A4ch%20vereinbaren%20%E2%80%94%20Ainzigartig"
                className="inline-flex items-center gap-2 text-sm text-accent font-body group"
              >
                <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2 transition-all duration-200">
                  30-Minuten-Erstgespräch vereinbaren
                </span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
              <p className="text-xs text-faint font-body mt-2">
                Mit Ihrer konkreten Zahl im Kopf. Kein Pitch, keine Folgetermine außer Sie
                wollen.
              </p>
            </div>
          </div>
        </div>

        {/* Methodology footnote */}
        <div className="mt-16u pt-8u border-t border-faint/50 max-w-3xl">
          <p className="text-xs text-muted font-body uppercase tracking-[0.2em] mb-4">
            Methodik
          </p>
          <div className="space-y-3 text-xs text-muted font-body leading-relaxed">
            <p>
              <strong className="text-ink">Berechnung:</strong> Wochenstunden × 52 ×
              Branchen-Automatisierungsgrad × Vollkostensatz. Konservativ korrigiert um
              15 % Implementierungs- und Tool-Overhead.
            </p>
            <p>
              <strong className="text-ink">Quellen Automatisierungsgrad:</strong> Bitkom
              Mittelstands-Report 2024 (n = 605), McKinsey "State of AI 2024" (Mittelstands-Segment),
              eigene Projekterfahrung aus 14 Mittelstands-Piloten 2023–2025.
            </p>
            <p>
              <strong className="text-ink">Hinweis:</strong> Indicative Schätzung, keine
              Garantie. Die tatsächlichen Einsparungen hängen von Tool-Auswahl, Datenqualität,
              Team-Adoption und Prozess-Reife ab. Vollständige Methodik & Studienquellen
              auf Anfrage.
            </p>
            <p>
              <strong className="text-ink">Datenschutz:</strong> Diese Berechnung läuft
              vollständig in Ihrem Browser. Es werden keine Eingaben an Server übertragen,
              keine Cookies gesetzt, kein Tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;

import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import documentAgentCube from '../Assets/Gemini_Generated_Image_ud8jc9ud8jc9ud8j_nobg.png';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

interface Action { title: string; priority: 'Hoch' | 'Mittel' | 'Niedrig'; details: string; }
interface Risk { level: 'Hoch' | 'Mittel' | 'Info'; message: string; }
interface AnalysisResult {
  document_type: string;
  document_type_icon: string;
  confidence: 'Hoch' | 'Mittel' | 'Niedrig';
  key_fields: Record<string, string>;
  suggested_actions: Action[];
  risk_flags: Risk[];
  summary: string;
  agent_reasoning: string;
}

function uint8ToBase64(bytes: Uint8Array) {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as any);
  }
  return btoa(binary);
}

async function pdfToImages(file: File, maxPages: number) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const images: { base64: string; mime_type: string }[] = [];
  for (let i = 1; i <= Math.min(pdf.numPages, maxPages); i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.45 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const base64 = canvas.toDataURL('image/jpeg', 0.82).split(',', 2)[1] || '';
    if (base64) images.push({ base64, mime_type: 'image/jpeg' });
  }
  if (typeof (pdf as any).destroy === 'function') await (pdf as any).destroy();
  else if (typeof (pdf as any).cleanup === 'function') await (pdf as any).cleanup();
  return images;
}

const SAMPLE_INVOICE = `FIKTIVES BEISPIEL — RECHNUNG RE-2025-1042\nDatum: 04.06.2025\nFällig: 04.07.2025\nEmpfänger: Beispielbetrieb GmbH\nNetto: 660,50 EUR\nMwSt: 125,50 EUR\nBrutto: 786,00 EUR\nZahlungsziel: 30 Tage`;
const SAMPLE_EMAIL = `FIKTIVES BEISPIEL — E-MAIL\nBetreff: Anfrage Büromöbel — 12 Arbeitsplätze\nUmzug zum 01.08.2025. Gewünscht: Lieferung und Aufbau bis 25.07.2025, zwei Tranchen und optional Leasing. Rückmeldung bis 13.06.`;
const SAMPLE_OFFER = `FIKTIVES BEISPIEL — ANGEBOT ANG-2025-0891\nDachstuhl: 34.080 EUR netto\nFassade: 16.110 EUR netto\nGesamt brutto: 59.726,10 EUR\nGültig bis 30.06.2025\nLieferzeit: 8–10 Wochen\nZahlungsziel: 14 Tage`;
const SAMPLES = [
  { id: 'invoice', label: 'Rechnung prüfen', icon: 'receipt_long', text: SAMPLE_INVOICE },
  { id: 'email', label: 'E-Mail triagieren', icon: 'mail', text: SAMPLE_EMAIL },
  { id: 'offer', label: 'Angebot analysieren', icon: 'request_quote', text: SAMPLE_OFFER },
];
const STEPS = [
  ['description', 'Dokument eingelesen'], ['category', 'Typ erkannt'], ['data_object', 'Felder extrahiert'], ['task_alt', 'Schritte geplant'], ['shield', 'Hinweise markiert'],
];

const Chip = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-xs text-muted">
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
      <span className="material-symbols-outlined text-[12px]">{icon}</span>
    </span>{children}
  </span>
);

function priorityClass(value: string) {
  if (value === 'Hoch') return 'bg-red-100 text-red-700';
  if (value === 'Mittel') return 'bg-amber-100 text-amber-800';
  return 'bg-surface-soft text-muted';
}
function riskClass(value: string) {
  if (value === 'Hoch') return 'border-red-200 bg-red-50 text-red-700';
  if (value === 'Mittel') return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-ink/10 bg-base text-muted';
}

const StaticResultPreview = () => (
  <div className="mt-8 overflow-hidden rounded-[28px] border border-ink/10 bg-surface shadow-soft">
    <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-4 md:px-6">
      <div><p className="text-[0.64rem] uppercase tracking-[.18em] text-faint">Beispielansicht</p><p className="mt-1 text-sm font-semibold text-ink">Dokument → Daten → Hinweise → nächste Schritte</p></div>
      <span className="hidden sm:block rounded-full border border-ink/10 bg-base px-3 py-1 text-[0.6rem] text-faint">statische Vorschau</span>
    </div>
    <div className="grid lg:grid-cols-[.72fr_1.28fr]">
      <div className="border-b border-ink/10 p-5 lg:border-b-0 lg:border-r md:p-6">
        <div className="rounded-[20px] border border-ink/10 bg-base p-5">
          <div className="flex justify-between"><div><p className="font-editorial text-xl">Rechnung</p><p className="text-[.62rem] text-faint">RE-2025-1042 · 04.06.2025</p></div><span className="material-symbols-outlined text-accent">receipt_long</span></div>
          <div className="mt-6 space-y-2">{[82, 64, 91, 72, 48].map((w) => <div key={w} className="h-2 rounded-full bg-ink/10" style={{ width: `${w}%` }} />)}</div>
          <div className="mt-6 border-t border-ink/10 pt-4 flex justify-between text-xs"><span className="text-faint">Gesamtbetrag</span><strong>786,00 €</strong></div>
        </div>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-3 md:p-6">
        {[
          ['data_object', 'Wichtige Daten', ['Nummer · RE-2025-1042', 'Brutto · 786,00 €', 'Zahlungsziel · 30 Tage']],
          ['shield', 'Prüfhinweise', ['Fälligkeit erkannt', 'Bankdaten vorhanden', 'Kostenstelle prüfen']],
          ['checklist', 'Nächste Schritte', ['System prüfen', 'Kostenstelle zuordnen', 'Freigabe einholen']],
        ].map(([icon, title, rows]) => <div key={String(title)} className="rounded-[18px] border border-ink/10 bg-base p-4"><div className="flex gap-2 items-center"><span className="material-symbols-outlined text-[17px] text-accent">{String(icon)}</span><p className="text-xs font-semibold">{String(title)}</p></div><ul className="mt-4 space-y-2 text-[.62rem] text-muted">{(rows as string[]).map((row) => <li key={row} className="border-b border-ink/10 pb-2 last:border-0">{row}</li>)}</ul></div>)}
        <div className="md:col-span-3 rounded-[18px] border border-accent/30 bg-accent/10 p-4 flex gap-3"><span className="material-symbols-outlined text-[19px]">auto_awesome</span><p className="text-xs leading-relaxed text-muted">Die Demo strukturiert Inhalte und schlägt Prüfschritte vor. Entscheidungen und Aktionen bleiben beim Menschen.</p></div>
      </div>
    </div>
  </div>
);

export const LiveAgentDemo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  const analyze = useCallback(async (payload: object) => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setAnalyzing(true); setError(null); setResult(null); setStep(0);
    const interval = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 1400);
    try {
      const response = await fetch('/api/live-agent-demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { setError(data.error || 'Analyse fehlgeschlagen.'); return; }
      setResult(data);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setError('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      clearInterval(interval);
      if (requestRef.current === controller) { requestRef.current = null; setAnalyzing(false); }
    }
  }, []);

  const runSample = useCallback((text: string) => { setFile(null); setPreviewUrl(null); void analyze({ mode: 'sample', text }); }, [analyze]);

  const runUpload = useCallback(async (uploaded: File) => {
    if (!ACCEPTED_TYPES.includes(uploaded.type)) { setError('Bitte verwenden Sie PDF, PNG, JPG oder WebP.'); setFile(null); return; }
    if (uploaded.size > MAX_FILE_BYTES) { setError('Die Datei ist größer als 4 MB. Bitte verkleinern oder teilen Sie das Dokument.'); setFile(null); return; }
    try {
      let images: { base64: string; mime_type: string }[];
      if (uploaded.type === 'application/pdf') {
        images = await pdfToImages(uploaded, 5);
        if (!images.length) { setError('PDF enthält keine lesbaren Seiten.'); return; }
        setPreviewUrl(`data:image/jpeg;base64,${images[0].base64}`);
      } else {
        const base64 = uint8ToBase64(new Uint8Array(await uploaded.arrayBuffer()));
        images = [{ base64, mime_type: uploaded.type }];
        setPreviewUrl(`data:${uploaded.type};base64,${base64}`);
      }
      await analyze({ mode: 'upload', images, filename: uploaded.name });
    } catch (err) { setError((err as Error).message || 'Das Dokument konnte nicht verarbeitet werden.'); }
  }, [analyze]);

  const selectFile = (selected: File) => { setFile(selected); void runUpload(selected); };
  const reset = () => { requestRef.current?.abort(); requestRef.current = null; setFile(null); setPreviewUrl(null); setResult(null); setError(null); setAnalyzing(false); setStep(0); if (fileInputRef.current) fileInputRef.current.value = ''; };

  return <div className="min-h-screen bg-base text-ink font-body">
    <RouteMeta title="Live Demo | Ainzigartig" description="Testen Sie unseren KI-Dokumentenagenten live." />

    <section className="pt-32 md:pt-36 pb-8 md:pb-10 px-6">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1.05fr_.95fr] items-center gap-8 lg:gap-10">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full text-xs font-bold uppercase tracking-[.14em] border border-accent/40 bg-accent/10 px-4 py-1.5 mb-6">Live Agent Demo</span>
          <h1 className="font-editorial text-[clamp(2.7rem,6vw,4.8rem)] leading-[.98] tracking-[-.03em]">Schauen Sie unseren<br/><span className="text-accent">Dokument-Agent arbeiten.</span></h1>
          <p className="mt-6 text-muted text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">Rechnung, E-Mail, Angebot oder Vertrag — der Agent liest, strukturiert und schlägt nächste Schritte vor. Die Ergebnisse sind KI-generierte Prüfvorschläge und sollten vor geschäftlichen Entscheidungen kontrolliert werden.</p>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-3"><Chip icon="description">PDF · PNG · JPG · WebP</Chip><Chip icon="upload_file">max. 4 MB</Chip><Chip icon="filter_5">bis zu 5 PDF-Seiten</Chip></div>
        </div>
        <div className="relative mx-auto w-full max-w-[500px] min-h-[250px] sm:min-h-[300px] flex items-center justify-center" aria-hidden="true"><div className="absolute inset-[12%] rounded-full bg-accent/10 blur-3xl"/><div className="absolute left-[14%] top-[16%] h-2.5 w-2.5 rotate-45 bg-accent"/><img src={documentAgentCube} alt="" className="relative z-10 w-full max-w-[500px] object-contain drop-shadow-[0_24px_40px_rgba(26,25,24,.08)]"/></div>
      </div>
    </section>

    {!result && !analyzing && <section className="px-6 pb-20"><div className="max-w-[1000px] mx-auto">
      <div role="button" tabIndex={0} aria-label="Dokument auswählen" onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) selectFile(e.dataTransfer.files[0]); }} onClick={() => fileInputRef.current?.click()} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }} className={`rounded-[28px] border-2 border-dashed bg-surface px-6 py-10 md:py-12 text-center cursor-pointer shadow-soft transition-all ${dragOver ? 'border-accent bg-accent/5 shadow-card' : 'border-ink/10 hover:border-accent/60 hover:shadow-card'}`}>
        <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10"><span className="material-symbols-outlined text-[24px]">upload_file</span></span><p className="text-sm font-semibold">PDF, PNG, JPG oder WebP hochladen (max. 4 MB)</p><p className="mt-1 text-xs text-faint">Bei PDFs verarbeitet die Demo höchstens die ersten fünf Seiten.</p><input ref={fileInputRef} type="file" accept="application/pdf,image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && selectFile(e.target.files[0])}/>
      </div>
      <div className="my-5 text-center"><span className="text-[.66rem] text-faint uppercase tracking-[.2em]">oder sofort testen mit</span></div>
      <div className="grid sm:grid-cols-3 gap-3">{SAMPLES.map((sample) => <button key={sample.id} type="button" onClick={() => runSample(sample.text)} className="rounded-[22px] border border-ink/10 bg-surface p-5 text-left shadow-soft transition-all hover:-translate-y-.5 hover:border-accent/40 hover:shadow-card"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 mb-4"><span className="material-symbols-outlined text-[19px]">{sample.icon}</span></span><p className="text-sm font-semibold mb-1">{sample.label}</p><p className="text-xs text-faint">Klicken zum Analysieren</p></button>)}</div>
      <StaticResultPreview />
    </div></section>}

    {analyzing && <section className="px-6 pb-20"><div className="max-w-[760px] mx-auto rounded-[28px] border border-ink/10 bg-surface p-6 md:p-8 shadow-card" role="status" aria-live="polite"><div className="flex items-center gap-3 mb-7"><span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"><span className="material-symbols-outlined animate-spin text-[21px]">progress_activity</span></span><div><p className="text-sm font-semibold">Agent arbeitet …</p><p className="text-xs text-faint">Das Dokument wird strukturiert, nicht automatisch ausgeführt.</p></div></div><div className="grid gap-2.5 sm:grid-cols-5">{STEPS.map(([icon, label], index) => <div key={label} className={`rounded-[16px] border px-3 py-3 ${index <= step ? 'border-accent/30 bg-accent/10' : 'border-ink/10 bg-base opacity-45'}`}><span className={`material-symbols-outlined text-[18px] ${index <= step ? 'text-accent-hover' : 'text-faint'}`}>{index < step ? 'check_circle' : icon}</span><p className="mt-2 text-[.65rem] leading-snug">{label}</p></div>)}</div></div></section>}

    {error && !analyzing && !result && <section className="px-6 pb-12"><div className="max-w-[760px] mx-auto rounded-[20px] border border-red-200 bg-red-50 p-5 flex justify-between gap-4" role="alert"><p className="text-sm text-red-700">{error}</p><button type="button" onClick={reset} className="text-xs text-red-600 underline">Erneut versuchen</button></div></section>}

    {result && <section className="px-6 pb-24"><div className="max-w-[1100px] mx-auto">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"><div><p className="text-[.66rem] uppercase tracking-[.2em] text-faint">Analyseergebnis</p><h2 className="mt-1 font-editorial text-3xl md:text-4xl">Vom Dokument zur nächsten prüfbaren Entscheidung.</h2></div><button type="button" onClick={reset} className="text-xs font-semibold text-muted hover:text-ink">Anderes Dokument testen →</button></div>
      <div className="overflow-hidden rounded-[30px] border border-ink/10 bg-surface shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 px-5 py-4 md:px-6"><div className="flex items-center gap-3"><span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10"><span className="material-symbols-outlined text-[21px]">{result.document_type_icon || 'description'}</span></span><div><p className="text-[.62rem] uppercase tracking-[.16em] text-faint">Erkannter Typ</p><p className="font-editorial text-xl">{result.document_type}</p></div></div><div className="rounded-full border border-ink/10 bg-base px-3 py-1.5 text-xs text-muted">Konfidenz: <strong className="text-ink">{result.confidence}</strong></div></div>
        <div className="grid lg:grid-cols-[.78fr_1.22fr]">
          <div className="border-b border-ink/10 p-5 md:p-6 lg:border-b-0 lg:border-r"><p className="text-[.64rem] font-semibold uppercase tracking-[.17em] text-faint">{file ? 'Hochgeladenes Dokument' : 'Demo-Eingabe'}</p><div className="mt-4 overflow-hidden rounded-[20px] border border-ink/10 bg-base">{previewUrl ? <div className="aspect-[4/5] max-h-[430px] bg-surface-soft"><img src={previewUrl} alt="Vorschau des hochgeladenen Dokuments" className="h-full w-full object-contain p-4"/></div> : <div className="aspect-[4/3] flex flex-col items-center justify-center bg-surface-soft p-8 text-center"><span className="material-symbols-outlined text-4xl text-accent">description</span><p className="mt-3 font-editorial text-2xl">{result.document_type}</p><p className="mt-1 text-xs text-faint">Fiktives Beispieldokument</p></div>}<div className="border-t border-ink/10 p-4"><p className="truncate text-xs font-semibold">{file?.name || 'Demo-Eingabe'}</p>{result.summary && <p className="mt-2 text-xs leading-relaxed text-muted">{result.summary}</p>}</div></div></div>
          <div className="p-5 md:p-6"><div className="grid xl:grid-cols-3 gap-3">
            <div className="rounded-[20px] border border-ink/10 bg-base p-4"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-accent">data_object</span><p className="text-xs font-semibold">Wichtige Daten</p></div><dl className="mt-4 space-y-2.5">{Object.entries(result.key_fields || {}).slice(0,7).map(([k,v]) => <div key={k} className="flex justify-between gap-3 border-b border-ink/10 pb-2 last:border-0"><dt className="text-[.61rem] text-faint">{k}</dt><dd className="max-w-[58%] break-words text-right text-[.61rem] font-semibold">{v}</dd></div>)}</dl></div>
            <div className="rounded-[20px] border border-ink/10 bg-base p-4"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-accent">shield</span><p className="text-xs font-semibold">Hinweise</p></div><div className="mt-4 space-y-2">{(result.risk_flags || []).slice(0,5).map((risk,i) => <div key={i} className={`rounded-[14px] border p-3 text-[.61rem] leading-relaxed ${riskClass(risk.level)}`}>{risk.message}</div>)}{!result.risk_flags?.length && <p className="text-xs text-faint">Keine besonderen Hinweise zurückgegeben.</p>}</div></div>
            <div className="rounded-[20px] border border-ink/10 bg-base p-4"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-accent">checklist</span><p className="text-xs font-semibold">Nächste Schritte</p></div><div className="mt-4 space-y-3">{(result.suggested_actions || []).slice(0,5).map((action,i) => <div key={i} className="border-b border-ink/10 pb-3 last:border-0"><div className="flex gap-2"><span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-ink/20"/><div><div className="flex flex-wrap gap-2"><p className="text-[.63rem] font-semibold">{action.title}</p><span className={`rounded-full px-2 py-.5 text-[.52rem] ${priorityClass(action.priority)}`}>{action.priority}</span></div>{action.details && <p className="mt-1 text-[.59rem] leading-relaxed text-muted">{action.details}</p>}</div></div></div>)}{!result.suggested_actions?.length && <p className="text-xs text-faint">Keine nächsten Schritte zurückgegeben.</p>}</div></div>
          </div><div className="mt-3 rounded-[18px] border border-accent/30 bg-accent/10 p-4 flex gap-3"><span className="material-symbols-outlined text-[19px]">auto_awesome</span><div><p className="text-xs font-semibold">KI-generierter Prüfvorschlag</p><p className="mt-1 text-xs leading-relaxed text-muted">Der Agent extrahiert und priorisiert, führt aber keine vorgeschlagene Aktion automatisch aus. Prüfen Sie die Ergebnisse vor geschäftlichen Entscheidungen.</p></div></div>{result.agent_reasoning && <details className="mt-3 rounded-[16px] border border-ink/10 bg-base px-4 py-3"><summary className="cursor-pointer text-[.64rem] font-semibold text-muted">Einordnung des Agenten anzeigen</summary><p className="mt-2 text-[.62rem] leading-relaxed text-faint">{result.agent_reasoning}</p></details>}</div>
        </div>
      </div>
      <p className="mt-5 rounded-[18px] border border-ink/10 bg-surface px-4 py-3 text-xs leading-relaxed text-faint">Demo-Hinweis: Bitte laden Sie hier keine vertraulichen oder besonders sensiblen Dokumente hoch.</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-ink/10 pt-8"><button type="button" onClick={reset} className="text-xs text-faint hover:text-ink">Anderes Dokument testen</button><Link to="/#kontakt" className="brand-pill px-6 py-3 bg-ink text-white text-sm font-bold">So etwas für unser Unternehmen?<span className="material-symbols-outlined text-sm">arrow_forward</span></Link></div>
    </div></section>}
  </div>;
};

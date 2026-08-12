import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';
import documentVisual from '../Assets/run_b_asset_pack/08_document_agent_cube.png';

// Convert a File to a base64 string (no data URL prefix).
function uint8ToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as any);
  }
  return btoa(binary);
}

// Render the first N pages of a PDF to PNG dataURLs, return base64 arrays.
// Moderate resolution keeps multi-page requests within the API body limit.
async function pdfToImages(file: File, maxPages: number): Promise<{ base64: string; mime_type: string }[]> {
  const [pdfjsLib, workerModule] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
  ]);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const pageCount = Math.min(pdf.numPages, maxPages);
  const results: { base64: string; mime_type: string }[] = [];
  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.2 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.72);
    const b64 = dataUrl.split(',', 2)[1] || '';
    if (b64) results.push({ base64: b64, mime_type: 'image/jpeg' });
  }
  // pdfjs-dist@6 removed the legacy destroy() in favor of cleanup() on PDFDocumentProxy
  if (typeof (pdf as any).destroy === 'function') {
    await (pdf as any).destroy();
  } else if (typeof (pdf as any).cleanup === 'function') {
    await (pdf as any).cleanup();
  }
  return results;
}

// Vercel Functions reject request bodies above 4.5 MB. Base64 and JSON add
// overhead, so the browser stops comfortably below the platform ceiling.
const MAX_FILE_BYTES = 2_500_000;
const MAX_ENCODED_PAYLOAD_CHARS = 3_800_000;
const ACCEPTED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

interface KeyField {
  [key: string]: string;
}

interface Action {
  title: string;
  priority: 'Hoch' | 'Mittel' | 'Niedrig';
  details: string;
}

interface Risk {
  level: 'Hoch' | 'Mittel' | 'Info';
  message: string;
}

interface AnalysisResult {
  document_type: string;
  document_type_icon: string;
  confidence: 'Hoch' | 'Mittel' | 'Niedrig';
  key_fields: KeyField;
  suggested_actions: Action[];
  risk_flags: Risk[];
  summary: string;
  agent_reasoning: string;
}

const SAMPLE_INVOICE = `FIKTIVES BEISPIELDOKUMENT — KEIN ECHTER BELEG

Buerotechnik Mueller GmbH
Musterstrasse 12, 80331 Muenchen
USt-IdNr: DE123456789

RECHNUNG Nr. RE-2025-1042
Datum: 04.06.2025
Faelligkeit: 04.07.2025 (30 Tage)

Empfaenger:
Beispielbetrieb (fiktiv)
Beispielweg 7, 50667 Koeln

Pos. | Beschreibung                              | Menge | Einzelpreis | Gesamt
1    | Toner für HP LaserJet Pro M404           |   2   |    89,00 EUR |  178,00 EUR
2    | Wartung Drucker Quartal Q2/2025           |   1   |   450,00 EUR |  450,00 EUR
3    | Premium-Papier A4 80g (5x 500 Blatt)      |   5   |     6,50 EUR |   32,50 EUR

Netto:    660,50 EUR
zzgl. 19% MwSt:  125,50 EUR
Brutto:   786,00 EUR

Zahlbar binnen 30 Tagen ohne Abzug auf folgendes Konto:
IBAN: DE89 7012 0500 0000 1234 56
BIC: BFSWDE33XXX
Bank: Stadtsparkasse Muenchen

Bei Rueckfragen: service@buerotechnik-mueller.de / Tel: 089-1234567`;

const SAMPLE_EMAIL = `FIKTIVES BEISPIELDOKUMENT — KEIN ECHTER BELEG

Von: Anna Schmidt <a.schmidt@webkontor-hamburg.de>
An: info@mustermann-gmbh.de
Datum: 05.06.2025, 09:42
Betreff: Anfrage Bueromoebel — 12 Arbeitsplaetze

Sehr geehrte Damen und Herren,

wir sind eine Digitalagentur mit 18 Mitarbeitenden und planen den Umzug in
neue Raeumlichkeiten zum 01.08.2025. Dafür benoetigen wir 12 komplette
Arbeitsplaetze (Hoehenverstellbare Tische, ergonomische Stuehle, Sideboards).

Koennten Sie uns ein Angebot zukommen lassen? Ideal waere:
- Lieferung und Aufbau bis 25.07.2025
- Aufteilung in 2 Tranchen (6 Plaetze im Juli, 6 im September)
- Leasing ueber 36 Monate ist eine Option

Bitte um Rueckmeldung bis spaetestens Freitag 13.06., damit wir in unserer
Geschaeftsleitungssitzung am Montag darueber entscheiden koennen.

Vielen Dank und beste Gruesse
Anna Schmidt
Webkontor Hamburg GmbH
+49 40 987654`;

const SAMPLE_OFFER = `FIKTIVES BEISPIELDOKUMENT — KEIN ECHTER BELEG

ANGEBOT Nr. ANG-2025-0891
Holzbau Werner GmbH | Gewerbepark 4 | 72555 Metzingen

An:
Musterbau Projekt GmbH
Herrn Dipl.-Ing. Becker
Hauptstrasse 88, 70173 Stuttgart

Sehr geehrter Herr Becker,

vielen Dank für Ihre Anfrage. Wir bieten Ihnen folgende Leistungen an:

Position 1: Dachstuhl Erweiterungsbau, 240 qm
   Material: BSH Fichte, Festigkeitsklasse C24
   Inkl. Vormontage, Lieferung, Kranstellung
   Einheitspreis: 142,00 EUR/qm
   Gesamt: 34.080,00 EUR netto

Position 2: Fassadenverkleidung Lärche, 180 qm
   Rhombus-Profil 27x68mm, geölt
   Inkl. Unterkonstruktion und Montage
   Einheitspreis: 89,50 EUR/qm
   Gesamt: 16.110,00 EUR netto

Zwischensumme netto: 50.190,00 EUR
zzgl. 19% MwSt:        9.536,10 EUR
Gesamtsumme brutto:   59.726,10 EUR

Angebot gueltig bis: 30.06.2025
Lieferzeit: 8-10 Wochen ab Auftragserteilung
Zahlungsziel: 14 Tage netto

Mit freundlichen Gruessen
Werner Holzbau GmbH
Peter Werner, Geschaeftsfuehrer`;

const SAMPLES: { id: string; label: string; icon: string; text: string }[] = [
  { id: 'invoice', label: 'Rechnung prüfen', icon: 'receipt_long', text: SAMPLE_INVOICE },
  { id: 'email', label: 'E-Mail triagieren', icon: 'mail', text: SAMPLE_EMAIL },
  { id: 'offer', label: 'Angebot analysieren', icon: 'request_quote', text: SAMPLE_OFFER },
];

function getPriorityColor(p: string): string {
  if (p === 'Hoch') return 'bg-red-100 text-red-700';
  if (p === 'Mittel') return 'bg-yellow-100 text-yellow-700';
  return 'bg-gray-100 text-gray-600';
}

function getRiskColor(l: string): string {
  if (l === 'Hoch') return 'text-red-600 border-red-300 bg-red-50';
  if (l === 'Mittel') return 'text-yellow-700 border-yellow-300 bg-yellow-50';
  return 'text-muted border-faint/30 bg-base/50';
}

function getRiskIcon(l: string): string {
  if (l === 'Hoch') return 'error';
  if (l === 'Mittel') return 'warning';
  return 'info';
}

export const LiveAgentDemo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'preparing' | 'analyzing'>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [availability, setAvailability] = useState<'checking' | 'ready' | 'unavailable'>('checking');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/live-agent-demo')
      .then(async (response) => { if (!response.ok) throw new Error(); return response.json(); })
      .then((data) => { if (!cancelled) setAvailability(data?.configured ? 'ready' : 'unavailable'); })
      .catch(() => { if (!cancelled) setAvailability('unavailable'); });
    return () => { cancelled = true; requestRef.current?.abort(); };
  }, []);

  useEffect(() => {
    if (result) requestAnimationFrame(() => resultRef.current?.focus());
  }, [result]);

  const runSample = useCallback(async (sampleText: string) => {
    if (availability !== 'ready') return;
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setAnalyzing(true);
    setError(null);
    setResult(null);
    setPhase('analyzing');
    setFile(null);

    try {
      const resp = await fetch('/api/live-agent-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'sample', text: sampleText }), signal: controller.signal,
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data.error || 'Analyse fehlgeschlagen.');
        return;
      }
      setResult(data);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      if (requestRef.current === controller) { requestRef.current = null; setAnalyzing(false); setPhase('idle'); }
    }
  }, [availability]);

  const runUpload = useCallback(async (uploadedFile: File) => {
    if (availability !== 'ready') return;
    if (!ACCEPTED_TYPES.includes(uploadedFile.type)) {
      setError('Bitte verwenden Sie PDF, PNG, JPG oder WebP.');
      setFile(null);
      return;
    }
    if (uploadedFile.size > MAX_FILE_BYTES) {
      setError('Die Datei ist größer als 2,5 MB. Bitte verkleinern oder teilen Sie das Dokument.');
      setFile(null);
      return;
    }
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setAnalyzing(true);
    setError(null);
    setResult(null);
    setPhase('preparing');

    try {
      // Convert PDF to images (browser-side) so the server can send them
      // directly to the configured vision-capable model — no server-side PDF library needed.
      let images: { base64: string; mime_type: string }[];
      if (uploadedFile.type === 'application/pdf') {
        images = await pdfToImages(uploadedFile, 3);
        if (images.length === 0) {
          setError('PDF enthaelt keine lesbaren Seiten.');
          return;
        }
      } else {
        const bytes = new Uint8Array(await uploadedFile.arrayBuffer());
        const b64 = uint8ToBase64(bytes);
        images = [{ base64: b64, mime_type: uploadedFile.type }];
      }

      const encodedPayloadChars = images.reduce((sum, image) => sum + image.base64.length, 0);
      if (encodedPayloadChars > MAX_ENCODED_PAYLOAD_CHARS) {
        setError('Das aufbereitete Dokument ist für diese Demo zu groß. Bitte weniger Seiten oder eine kleinere Datei verwenden.');
        return;
      }

      if (controller.signal.aborted) return;
      setPhase('analyzing');

      const resp = await fetch('/api/live-agent-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'upload',
          images,
          filename: uploadedFile.name,
        }), signal: controller.signal,
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data.error || 'Analyse fehlgeschlagen.');
        return;
      }
      setResult(data);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError((e as Error).message || 'Das Dokument konnte nicht verarbeitet werden.');
    } finally {
      if (requestRef.current === controller) { requestRef.current = null; setAnalyzing(false); setPhase('idle'); }
    }
  }, [availability]);

  const handleFileSelect = (selectedFile: File) => {
    if (availability !== 'ready') return;
    setFile(selectedFile);
    runUpload(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleReset = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setFile(null);
    setResult(null);
    setError(null);
    setAnalyzing(false);
    setPhase('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const cancelAnalysis = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setAnalyzing(false);
    setPhase('idle');
    setError('Die Analyse wurde abgebrochen. Es wurde kein Ergebnis erzeugt.');
  };

  return (
    <div className="min-h-screen bg-base text-ink font-body">
      <RouteMeta title="Live Demo | Ainzigartig" description="Testen Sie unseren KI-Dokumentenagenten live." />
      {/* Hero */}
      <section className="pt-32 pb-10 px-5 sm:px-6 md:pt-36 md:pb-12">
        <div className="max-w-[1000px] mx-auto grid gap-7 md:grid-cols-[1.12fr_.88fr] md:items-center md:gap-10">
          <div>
            <span className="inline-block rounded-full text-[10px] font-bold uppercase tracking-[0.14em] text-ink border border-accent/45 bg-accent/15 px-4 py-1.5 mb-5">Live-Demo · Dokument-Agent</span>
            <h1 className="font-editorial text-[clamp(2.6rem,6vw,4.8rem)] leading-[.98] tracking-[-.035em] text-ink break-words">Dokument rein.<br /><em className="text-accent-hover">Prüfbare Struktur raus.</em></h1>
            <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed mt-5">Rechnung, E-Mail oder Angebot: Der Agent extrahiert Felder, markiert Risiken und priorisiert nächste Schritte. Er führt keine Aktion selbst aus.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[.1em] text-muted"><span className="rounded-full border border-ink/10 bg-surface px-3 py-1.5">Extraktion</span><span className="rounded-full border border-ink/10 bg-surface px-3 py-1.5">Risiken</span><span className="rounded-full border border-ink/10 bg-surface px-3 py-1.5">Handlungspunkte</span></div>
          </div>
          <div className="hidden md:block relative min-h-[300px] overflow-hidden rounded-[24px] border border-ink/10 bg-surface">
            <img src={documentVisual} alt="Illustration eines modularen Dokument-Agenten" className="absolute inset-0 h-full w-full object-cover object-[58%_center]" />
          </div>
        </div>
      </section>

      {/* Input Zone */}
      {!result && !analyzing && (
        <section className="px-6 md:px-8 pb-16">
          <div className="max-w-[1000px] mx-auto">
            {availability !== 'ready' && <div className={`mb-5 rounded-[20px] border p-4 ${availability === 'checking' ? 'border-ink/10 bg-surface' : 'border-amber-900/15 bg-amber-50'}`} role="status"><p className={`text-sm font-semibold ${availability === 'checking' ? 'text-ink' : 'text-amber-950'}`}>{availability === 'checking' ? 'Verfügbarkeit wird geprüft' : 'Live-Verarbeitung in dieser Umgebung nicht aktiviert'}</p><p className={`mt-1 text-xs leading-relaxed ${availability === 'checking' ? 'text-muted' : 'text-amber-900/75'}`}>{availability === 'checking' ? 'Die Demo startet erst, wenn Modelldienst und Missbrauchsschutz als konfiguriert gemeldet sind.' : 'Der Modelldienst oder sein Missbrauchsschutz ist nicht vollständig konfiguriert. Beispiele und Upload-Oberfläche bleiben als transparenter Produktstand sichtbar; es wird keine Scheinanalyse gestartet.'}</p></div>}
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); if (availability === 'ready') setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => { if (availability === 'ready') fileInputRef.current?.click(); }}
              onKeyDown={(e) => { if (availability === 'ready' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fileInputRef.current?.click(); } }}
              role="button"
              tabIndex={availability === 'ready' ? 0 : -1}
              aria-disabled={availability !== 'ready'}
              aria-label="Dokument auswählen: PDF, PNG, JPG oder WebP bis 2,5 MB"
              className={`brand-card border-2 border-dashed bg-surface px-5 py-8 sm:p-10 text-center transition-all mb-5 rounded-[24px] ${availability === 'ready' ? 'cursor-pointer' : 'cursor-not-allowed opacity-55'} ${
                dragOver ? 'border-accent bg-accent/5' : 'border-faint/30 hover:border-faint/60'
              }`}
            >
              <span className="material-symbols-outlined text-4xl text-muted mb-3 block" aria-hidden="true">upload_file</span>
              <p className="text-sm text-ink mb-1">PDF, PNG, JPG oder WebP hochladen (max. 2,5 MB)</p>
              <p className="text-xs text-faint">Bei PDFs verarbeitet die Demo höchstens die ersten drei Seiten.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/png,image/jpeg,image/webp"
                className="hidden"
                disabled={availability !== 'ready'}
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
            </div>
            <p className="mb-8 text-center text-[11px] leading-relaxed text-light">Bitte keine vertraulichen, personenbezogenen oder besonders sensiblen Inhalte hochladen. Für einen sicheren Projektbetrieb braucht es ein eigenes Daten- und Löschkonzept.</p>

            {/* Or sample */}
            <div className="text-center mb-4">
              <span className="text-xs text-faint uppercase tracking-[0.2em]">oder sofort testen mit</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {SAMPLES.map((sample) => (
                <button
                  type="button"
                  key={sample.id}
                  onClick={() => runSample(sample.text)}
                  disabled={availability !== 'ready'}
                  className="brand-card min-h-[132px] bg-surface p-5 text-left hover:border-accent/50 transition-all cursor-pointer group rounded-[20px] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <span className="material-symbols-outlined text-2xl text-accent mb-2 block" aria-hidden="true">{sample.icon}</span>
                  <p className="text-sm text-ink font-medium mb-1">{sample.label}</p>
                  <p className="text-xs text-faint">{availability === 'ready' ? 'Klicken zum Analysieren' : 'Derzeit nicht verfügbar'}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Thinking State */}
      {analyzing && (
        <section className="px-6 md:px-8 pb-16">
          <div className="max-w-[700px] mx-auto">
            <div className="brand-card bg-surface p-6 sm:p-8 rounded-[24px]" role="status" aria-live="polite" aria-busy="true">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-accent animate-spin" aria-hidden="true">progress_activity</span>
                <p className="text-sm text-ink font-medium">{phase === 'preparing' ? 'Dokument wird im Browser vorbereitet…' : 'KI-Auswertung läuft…'}</p>
              </div>
              <div className="mt-6 space-y-3 border-y border-ink/10 py-5">
                <div className="flex items-start gap-3"><span className={`material-symbols-outlined text-base ${phase === 'analyzing' ? 'text-accent-hover' : 'animate-pulse text-accent-hover'}`} aria-hidden="true">{phase === 'analyzing' ? 'check_circle' : 'pending'}</span><div><p className="text-sm font-medium text-ink">Eingabe aufbereiten</p><p className="mt-0.5 text-xs leading-relaxed text-light">{file ? 'PDFs werden lokal auf höchstens drei Seiten gerendert; Bilder werden für die Anfrage kodiert.' : 'Das klar als fiktiv markierte Beispieldokument wird für die Anfrage vorbereitet.'}</p></div></div>
                <div className={`flex items-start gap-3 ${phase === 'analyzing' ? 'opacity-100' : 'opacity-40'}`}><span className={`material-symbols-outlined text-base ${phase === 'analyzing' ? 'animate-pulse text-accent-hover' : 'text-light'}`} aria-hidden="true">{phase === 'analyzing' ? 'pending' : 'radio_button_unchecked'}</span><div><p className="text-sm font-medium text-ink">Struktur erzeugen</p><p className="mt-0.5 text-xs leading-relaxed text-light">Der Modelldienst extrahiert Felder und erstellt Prüfvorschläge. Einzelne Teilschritte werden nicht vorgetäuscht.</p></div></div>
              </div>
              <button type="button" onClick={cancelAnalysis} className="mt-4 min-h-11 text-xs font-semibold text-light underline underline-offset-4 hover:text-ink">Analyse abbrechen</button>
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <section className="px-6 md:px-8 pb-12">
          <div className="max-w-[700px] mx-auto">
            <div className="rounded-[22px] border border-red-900/15 bg-red-50 p-6" role="alert">
              <p className="text-sm text-red-700 mb-3">{error}</p>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-11 text-xs text-red-800 underline underline-offset-4"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Result */}
      {result && (
        <section ref={resultRef} tabIndex={-1} className="px-5 sm:px-6 md:px-8 pb-20 outline-none" aria-labelledby="document-result-title">
          <div className="max-w-[1000px] mx-auto">
            {/* Header */}
            <div className="brand-card bg-surface p-6 mb-6 rounded-[24px]">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent text-3xl" aria-hidden="true">
                    {result.document_type_icon || 'description'}
                  </span>
                  <div>
                    <p className="text-xs text-faint uppercase tracking-[0.2em]">Erkannter Typ</p>
                    <h2 id="document-result-title" className="font-editorial text-2xl text-ink">{result.document_type}</h2>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-faint uppercase tracking-[0.2em] mb-1">Konfidenz</p>
                  <p className="text-sm text-ink font-medium">{result.confidence}</p>
                </div>
              </div>
              {file && (
                <p className="text-xs text-faint mt-3 pt-3 border-t border-faint/20">
                  Verarbeitet: {file.name}
                </p>
              )}
            </div>

            {/* Summary */}
            {result.summary && (
              <div className="brand-card mb-6 p-5 bg-accent/10 border-accent/35 rounded-[22px]">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-2">Zusammenfassung</p>
                <p className="text-sm text-ink leading-relaxed">{result.summary}</p>
              </div>
            )}

            {/* Key fields */}
            {Object.keys(result.key_fields || {}).length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-3">Extrahierte Felder</p>
                <div className="brand-card bg-surface divide-y divide-ink/10 overflow-hidden rounded-[22px]">
                  {Object.entries(result.key_fields).map(([k, v]) => (
                    <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[.7fr_1.3fr] sm:gap-4">
                      <span className="text-xs text-muted">{k}</span>
                      <span className="text-xs text-ink font-medium sm:text-right break-words">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested actions */}
            {result.suggested_actions && result.suggested_actions.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-3">Nächste Schritte</p>
                <div className="space-y-3">
                  {result.suggested_actions.map((a, i) => (
                    <div key={i} className="brand-card bg-surface p-4 flex gap-3 rounded-[20px]">
                      <span className="material-symbols-outlined text-accent text-xl shrink-0" aria-hidden="true">arrow_forward</span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p className="text-sm text-ink font-medium">{a.title}</p>
                          <span className={`text-xs px-2 py-0.5 shrink-0 ${getPriorityColor(a.priority)}`}>
                            {a.priority}
                          </span>
                        </div>
                        {a.details && <p className="text-xs text-muted leading-relaxed">{a.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk flags */}
            {result.risk_flags && result.risk_flags.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-3">Hinweise</p>
                <div className="space-y-2">
                  {result.risk_flags.map((r, i) => (
                    <div key={i} className={`border rounded-2xl p-3 flex items-start gap-2 ${getRiskColor(r.level)}`}>
                      <span className="material-symbols-outlined text-base mt-0.5 shrink-0" aria-hidden="true">{getRiskIcon(r.level)}</span>
                      <p className="text-xs leading-relaxed">{r.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agent reasoning */}
            {result.agent_reasoning && (
              <div className="mb-8 text-center">
                <p className="text-xs text-faint italic">
                  Erkennungsgrundlage: {result.agent_reasoning}
                </p>
              </div>
            )}

            <p className="text-xs text-faint leading-relaxed mb-8 p-4 rounded-2xl bg-surface border border-ink/10">Demo-Hinweis: Der Agent extrahiert und priorisiert, führt aber keine vorgeschlagene Aktion automatisch aus. Bitte laden Sie hier keine vertraulichen oder besonders sensiblen Dokumente hoch.</p>

            {/* CTAs */}
            <div className="border-t border-faint/30 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-faint hover:text-ink transition-colors cursor-pointer"
              >
                Anderes Dokument testen
              </button>
              <Link
                to="/#kontakt"
                className="brand-pill inline-flex items-center gap-2 px-6 py-3 bg-ink text-white text-sm font-bold hover:bg-[#33312E] transition-colors"
              >
                Dokumentprozess besprechen
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

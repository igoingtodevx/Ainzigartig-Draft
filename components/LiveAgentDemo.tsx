import React, { useState, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// pdf.js worker setup — required for PDF rendering in the browser
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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
// Renders at 2x scale for sharp OCR.
async function pdfToImages(file: File, maxPages: number): Promise<{ base64: string; mime_type: string }[]> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjsLib.getDocument({ data: bytes });
  const pdf = await loadingTask.promise;
  const pageCount = Math.min(pdf.numPages, maxPages);
  const results: { base64: string; mime_type: string }[] = [];
  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const dataUrl = canvas.toDataURL('image/png');
    const b64 = dataUrl.split(',', 2)[1] || '';
    if (b64) results.push({ base64: b64, mime_type: 'image/png' });
  }
  await pdf.destroy();
  return results;
}

const mailto = 'mailto:info@ainzigartig.de?subject=Live%20Agent%20Demo%20%E2%80%94%20fuer%20unser%20Unternehmen';

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

const SAMPLE_INVOICE = `Buerotechnik Mueller GmbH
Musterstrasse 12, 80331 Muenchen
USt-IdNr: DE123456789

RECHNUNG Nr. RE-2025-1042
Datum: 04.06.2025
Faelligkeit: 04.07.2025 (30 Tage)

Empfaenger:
Ainzigartig Demo GmbH
Beispielweg 7, 50667 Koeln

Pos. | Beschreibung                              | Menge | Einzelpreis | Gesamt
1    | Toner fuer HP LaserJet Pro M404           |   2   |    89,00 EUR |  178,00 EUR
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

const SAMPLE_EMAIL = `Von: Anna Schmidt <a.schmidt@webkontor-hamburg.de>
An: info@mustermann-gmbh.de
Datum: 05.06.2025, 09:42
Betreff: Anfrage Bueromoebel — 12 Arbeitsplaetze

Sehr geehrte Damen und Herren,

wir sind eine Digitalagentur mit 18 Mitarbeitenden und planen den Umzug in
neue Raeumlichkeiten zum 01.08.2025. Dafuer benoetigen wir 12 komplette
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

const SAMPLE_OFFER = `ANGEBOT Nr. ANG-2025-0891
Holzbau Werner GmbH | Gewerbepark 4 | 72555 Metzingen

An:
Musterbau Projekt GmbH
Herrn Dipl.-Ing. Becker
Hauptstrasse 88, 70173 Stuttgart

Sehr geehrter Herr Becker,

vielen Dank fuer Ihre Anfrage. Wir bieten Ihnen folgende Leistungen an:

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
  { id: 'invoice', label: 'Rechnung pruefen', icon: 'receipt_long', text: SAMPLE_INVOICE },
  { id: 'email', label: 'E-Mail triagieren', icon: 'mail', text: SAMPLE_EMAIL },
  { id: 'offer', label: 'Angebot analysieren', icon: 'request_quote', text: SAMPLE_OFFER },
];

const THINKING_STEPS = [
  { label: 'Dokument eingelesen', icon: 'description' },
  { label: 'Typ erkannt', icon: 'category' },
  { label: 'Schluesselfelder extrahiert', icon: 'data_object' },
  { label: 'Naechste Schritte geplant', icon: 'task_alt' },
  { label: 'Risiken markiert', icon: 'shield' },
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
  const [thinkingStep, setThinkingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runSample = useCallback(async (sampleText: string) => {
    setAnalyzing(true);
    setError(null);
    setResult(null);
    setThinkingStep(0);

    // Animate thinking steps during API call — slower cadence masks the ~7-9s LLM roundtrip
    const stepInterval = setInterval(() => {
      setThinkingStep((s) => Math.min(s + 1, THINKING_STEPS.length - 1));
    }, 1400);

    try {
      const resp = await fetch('/api/live-agent-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'sample', text: sampleText }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || 'Analyse fehlgeschlagen.');
        return;
      }
      // Let the final thinking step complete
      setTimeout(() => {
        setResult(data);
        setAnalyzing(false);
      }, 200);
    } catch (e) {
      setError('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    } finally {
      clearInterval(stepInterval);
    }
  }, []);

  const runUpload = useCallback(async (uploadedFile: File) => {
    if (uploadedFile.size > 6 * 1024 * 1024) {
      setError('Datei zu gross (max 6 MB).');
      return;
    }
    setAnalyzing(true);
    setError(null);
    setResult(null);
    setThinkingStep(0);

    const stepInterval = setInterval(() => {
      setThinkingStep((s) => Math.min(s + 1, THINKING_STEPS.length - 1));
    }, 1500);

    try {
      // Convert PDF to images (browser-side) so the server can send them
      // directly to gpt-4o-mini vision — no server-side PDF library needed.
      let images: { base64: string; mime_type: string }[];
      if (uploadedFile.type === 'application/pdf') {
        images = await pdfToImages(uploadedFile, 5);
        if (images.length === 0) {
          setError('PDF enthaelt keine lesbaren Seiten.');
          setAnalyzing(false);
          clearInterval(stepInterval);
          return;
        }
      } else {
        const bytes = new Uint8Array(await uploadedFile.arrayBuffer());
        const b64 = uint8ToBase64(bytes);
        images = [{ base64: b64, mime_type: uploadedFile.type }];
      }

      const resp = await fetch('/api/live-agent-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'upload',
          images,
          filename: uploadedFile.name,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || 'Analyse fehlgeschlagen.');
        setAnalyzing(false);
        clearInterval(stepInterval);
        return;
      }
      setTimeout(() => {
        setResult(data);
        setAnalyzing(false);
      }, 200);
    } catch (e: any) {
      setError('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.' + (e?.message ? ` (${e.message})` : ''));
      setAnalyzing(false);
    } finally {
      clearInterval(stepInterval);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
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
    setFile(null);
    setResult(null);
    setError(null);
    setAnalyzing(false);
    setThinkingStep(0);
  };

  return (
    <div className="min-h-screen bg-base text-ink font-body">
      {/* Hero */}
      <section className="pt-28 pb-12 px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent border border-accent/30 bg-accent/5 px-3 py-1 mb-6">
            Live Agent Demo
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink mb-6 break-words">
            Schauen Sie unseren<br />
            <span className="text-accent">Dokument-Agent arbeiten.</span>
          </h1>
          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Rechnung, E-Mail, Angebot oder Vertrag — der Agent liest, strukturiert und schlaegt
            naechste Schritte vor. Sie sehen den Prozess live. Keine Anmeldung, keine Daten gespeichert.
          </p>
        </div>
      </section>

      {/* Input Zone */}
      {!result && !analyzing && (
        <section className="px-6 md:px-8 pb-16">
          <div className="max-w-[1000px] mx-auto">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-10 text-center cursor-pointer transition-colors mb-8 ${
                dragOver ? 'border-accent bg-accent/5' : 'border-faint/30 hover:border-faint/60'
              }`}
            >
              <span className="material-symbols-outlined text-4xl text-muted mb-3 block">upload_file</span>
              <p className="text-sm text-ink mb-1">PDF, PNG oder JPG hochladen (max 4 MB)</p>
              <p className="text-xs text-faint">Rechnung, E-Mail-Screenshot, Angebot, Vertrag — was Sie gerade haben</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
            </div>

            {/* Or sample */}
            <div className="text-center mb-4">
              <span className="text-xs text-faint uppercase tracking-[0.2em]">oder sofort testen mit</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => runSample(sample.text)}
                  className="border border-faint/30 p-5 text-left hover:border-accent/50 hover:bg-accent/[0.02] transition-all cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-2xl text-accent mb-2 block">{sample.icon}</span>
                  <p className="text-sm text-ink font-medium mb-1">{sample.label}</p>
                  <p className="text-xs text-faint">Klicken zum Analysieren</p>
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
            <div className="border border-faint/30 bg-ink/[0.02] p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-accent animate-spin">progress_activity</span>
                <p className="text-sm text-ink font-medium">Agent arbeitet...</p>
              </div>
              <div className="space-y-3">
                {THINKING_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-opacity duration-500 ${
                      i <= thinkingStep ? 'opacity-100' : 'opacity-25'
                    }`}
                  >
                    {i < thinkingStep ? (
                      <span className="material-symbols-outlined text-accent text-base">check_circle</span>
                    ) : i === thinkingStep ? (
                      <span className="material-symbols-outlined text-accent text-base animate-pulse">pending</span>
                    ) : (
                      <span className="material-symbols-outlined text-faint text-base">radio_button_unchecked</span>
                    )}
                    <span className="material-symbols-outlined text-faint text-sm">{step.icon}</span>
                    <span className={`text-sm ${i <= thinkingStep ? 'text-ink' : 'text-faint'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <section className="px-6 md:px-8 pb-12">
          <div className="max-w-[700px] mx-auto">
            <div className="border border-red-300 bg-red-50 p-6">
              <p className="text-sm text-red-700 mb-3">{error}</p>
              <button
                onClick={handleReset}
                className="text-xs text-red-500 underline cursor-pointer"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Result */}
      {result && (
        <section className="px-6 md:px-8 pb-20">
          <div className="max-w-[900px] mx-auto">
            {/* Header */}
            <div className="border border-faint/30 p-6 mb-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent text-3xl">
                    {result.document_type_icon || 'description'}
                  </span>
                  <div>
                    <p className="text-xs text-faint uppercase tracking-[0.2em]">Erkannter Typ</p>
                    <p className="font-editorial text-2xl text-ink">{result.document_type}</p>
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
              <div className="mb-6 p-5 border-l-2 border-accent bg-accent/[0.03]">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-2">Zusammenfassung</p>
                <p className="text-sm text-ink leading-relaxed">{result.summary}</p>
              </div>
            )}

            {/* Key fields */}
            {Object.keys(result.key_fields || {}).length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-3">Extrahierte Felder</p>
                <div className="border border-faint/30 divide-y divide-faint/20">
                  {Object.entries(result.key_fields).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 px-4 py-2.5">
                      <span className="text-xs text-muted">{k}</span>
                      <span className="text-xs text-ink font-mono text-right break-all">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested actions */}
            {result.suggested_actions && result.suggested_actions.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-faint uppercase tracking-[0.2em] mb-3">Naechste Schritte</p>
                <div className="space-y-3">
                  {result.suggested_actions.map((a, i) => (
                    <div key={i} className="border border-faint/30 p-4 flex gap-3">
                      <span className="material-symbols-outlined text-accent text-xl shrink-0">arrow_forward</span>
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
                    <div key={i} className={`border p-3 flex items-start gap-2 ${getRiskColor(r.level)}`}>
                      <span className="material-symbols-outlined text-base mt-0.5 shrink-0">{getRiskIcon(r.level)}</span>
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
                  Agent-Logik: {result.agent_reasoning}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="border-t border-faint/30 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                onClick={handleReset}
                className="text-xs text-faint hover:text-ink transition-colors cursor-pointer"
              >
                Anderes Dokument testen
              </button>
              <a
                href={mailto}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 transition-colors"
              >
                So etwas fuer unser Unternehmen?
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

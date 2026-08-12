import React from 'react';
import { Link } from 'react-router-dom';
import { RouteMeta } from './RouteMeta';

const knownFlows = [
  ['Hosting & Nutzung', 'Die statische Website und Serverfunktionen sind für Vercel konfiguriert; die Anwendung bindet Vercel Analytics ein.'],
  ['Externe Schriften', 'Der Browser lädt die eingebundenen Schriftdateien über Google-Fonts-Endpunkte.'],
  ['Website-Assistent', 'Edi speichert den begrenzten Verlauf im Session Storage des Browsers. Bei Nutzung sendet die Serverfunktion Frage und begrenzten Verlauf an den konfigurierten OpenAI-kompatiblen Modelldienst.'],
  ['KI-Website-Analyse', 'Die eingegebene URL wird serverseitig an einen ausdrücklich konfigurierten Scraper und der ausgelesene Inhalt anschließend an den konfigurierten Modelldienst übertragen.'],
  ['Dokument-Agent', 'Beispieltext oder bis zu drei im Browser gerenderte Dokumentseiten werden an den konfigurierten Modelldienst gesendet. Die Oberfläche fordert ausdrücklich dazu auf, keine vertraulichen oder besonders sensiblen Dokumente hochzuladen.'],
  ['Kontakt', 'Das Formular ist technisch für eine Übermittlung über Resend vorbereitet und bleibt serverseitig deaktiviert, bis Kontakt- und Datenschutzangaben vollständig konfiguriert sind.'],
  ['Insights', 'Die Insights-Seite lädt ein maschinell erzeugtes Briefing über eine serverseitige Proxy-Funktion von einer externen Watcher-Anwendung.'],
];

export const Datenschutz: React.FC = () => (
  <main className="min-h-screen bg-base text-ink font-body pt-36 pb-24 px-6">
    <RouteMeta title="Datenschutzstatus | Ainzigartig" description="Technisch belegte Datenflüsse und offener Freigabestatus von Ainzigartig." noIndex />
    <div className="max-w-[900px] mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors mb-10">
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
        Startseite
      </Link>

      <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Technischer Datenschutzstatus</p>
      <h1 className="font-editorial text-[clamp(2.8rem,6vw,4.3rem)] leading-[1.02] tracking-[-0.03em] mb-5">Bekannte Datenflüsse.<br />Offene Pflichtangaben.</h1>
      <p className="text-base text-muted leading-relaxed max-w-2xl mb-10">
        Diese Seite dokumentiert nur, was der aktuelle Quellstand technisch belegt. Sie ist keine vollständige Datenschutzerklärung, solange verantwortliche Stelle, Kontakt und produktive Anbieter-Konfiguration fehlen.
      </p>

      <div className="brand-card bg-surface p-6 md:p-8">
        <h2 className="font-editorial text-2xl mb-6">Technisch nachvollziehbarer Stand</h2>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {knownFlows.map(([title, text], index) => (
            <section key={title} className="grid sm:grid-cols-[48px_1fr] gap-3 py-5">
              <span className="font-editorial text-xl text-accent-hover">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-editorial text-xl">{title}</h3>
                <p className="text-sm text-muted leading-relaxed mt-1">{text}</p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-6 brand-card bg-[#F3EFEA] p-6 md:p-8">
        <h2 className="font-editorial text-2xl mb-3">Release-Gate</h2>
        <p className="text-sm text-muted leading-relaxed">
          Vor einer Veröffentlichung müssen mindestens die verantwortliche Stelle und Kontaktmöglichkeit, Rechtsgrundlagen, Zwecke, Empfänger und mögliche Drittlandübermittlungen, Speicherdauern, Betroffenenrechte sowie die tatsächlich aktivierten Anbieter und Verträge vollständig und anwendungsspezifisch dokumentiert und geprüft werden.
        </p>
      </div>
    </div>
  </main>
);

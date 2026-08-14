import React from 'react';
import { Link } from 'react-router-dom';
import {
  WorkflowIcon,
  SecurityIcon,
  BoltIcon,
  SyncIcon,
  HubIcon,
  ArrowRightIcon,
  CheckIcon,
  UsersIcon,
  TuneIcon,
  MailCheckIcon,
  DocumentIcon,
  DashboardIcon,
} from './Icons';

export const Automatisierung: React.FC = () => {
  return (
    <div className="bg-base min-h-screen text-ink">
      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Leistungsbereich · Geschäftsprozesse & Schnittstellen
            </p>
            <h1 className="font-editorial text-[clamp(2.7rem,6vw,4.8rem)] leading-[1.02] tracking-[-0.03em] text-ink font-normal mb-8">
              Automatisierung &amp; Systemintegrationen
            </h1>
            <p className="font-editorial text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.45] text-muted mb-10">
              Wir verbinden Ihre bestehende Software, eliminieren manuelle Dateneingaben und bauen verlässliche Ende-zu-Ende-Workflows. Deterministische Logik als Fundament — KI nur dort, wo Sprache oder unstrukturierte Daten verarbeitet werden müssen.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/#kontakt"
                className="brand-pill bg-ink text-white hover:bg-[#33312E] px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Eigenen Prozess analysieren lassen</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/roi-rechner"
                className="brand-pill bg-surface border border-ink/15 text-ink hover:bg-base px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Automatisierungs-ROI berechnen</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 pt-8 border-t border-ink/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="font-editorial text-2xl md:text-3xl text-ink">Regelbasiert</p>
              <p className="text-xs text-muted mt-1">Nachvollziehbare Kernlogik – KI nur dort, wo sie sinnvoll ergänzt.</p>
            </div>
            <div>
              <p className="font-editorial text-2xl md:text-3xl text-ink">Iterativ</p>
              <p className="text-xs text-muted mt-1">Vom Prozess-Audit über den Prototyp bis zum kontrollierten Rollout.</p>
            </div>
            <div>
              <p className="font-editorial text-2xl md:text-3xl text-ink">Privacy by Design</p>
              <p className="text-xs text-muted mt-1">Datenflüsse, Zugriffe und Hosting werden projektspezifisch mitgedacht.</p>
            </div>
            <div>
              <p className="font-editorial text-2xl md:text-3xl text-ink">Human-in-the-Loop</p>
              <p className="text-xs text-muted mt-1">Freigaben für kritische Schritte</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Philosophy — Editorial Split */}
      <section className="py-20 md:py-28 border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Unsere Philosophie</p>
              <h2 className="font-editorial text-[clamp(2.2rem,4.2vw,3.2rem)] leading-[1.08] tracking-[-0.025em] text-ink font-normal mb-6">
                Nicht jeder Prozess braucht ein Sprachmodell. Aber jeder Prozess braucht ein stabiles Fundament.
              </h2>
              <p className="text-base text-muted leading-relaxed mb-6">
                Viele KI-Projekte scheitern, weil versucht wird, Standard-Regeln mit generativen Sprachmodellen zu lösen. Das erzeugt unnötige Kosten, Latenzen und Fehlerquellen.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Unser Ansatz: Wenn eine Schnittstelle, eine Datenbankabfrage oder eine simple Wenn-Dann-Bedingung reicht, bauen wir genau das. KI setzen wir als Spezialwerkzeug ein — z.&nbsp;B. um Freitext zu strukturieren, PDFs auszulesen oder semantische Zuordnungen zu treffen.
              </p>
            </div>

            {/* Editorial 4 Principles List with 1px Dividers */}
            <div className="border-y border-ink/10 divide-y divide-ink/10">
              <div className="py-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-ink shrink-0 mt-0.5">
                  <CheckIcon className="w-4 h-4 text-ink" />
                </span>
                <div>
                  <h3 className="font-editorial text-lg text-ink mb-1">01 / Erst deterministisch, dann KI</h3>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    Feste Geschäftsregeln bleiben feste Geschäftsregeln. KI ergänzt nur da, wo menschliche Interpretation nötig war.
                  </p>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-ink shrink-0 mt-0.5">
                  <SyncIcon className="w-4 h-4 text-ink" />
                </span>
                <div>
                  <h3 className="font-editorial text-lg text-ink mb-1">02 / Bestehende Systeme statt Neubau</h3>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    Wir ersetzen nicht Ihre ERP- oder CRM-Landschaft, sondern verbinden sie über saubere APIs und Webhooks.
                  </p>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-ink shrink-0 mt-0.5">
                  <SecurityIcon className="w-4 h-4 text-ink" />
                </span>
                <div>
                  <h3 className="font-editorial text-lg text-ink mb-1">03 / Human-in-the-Loop bei Unsicherheit</h3>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    Liegt das Konfidenzlevel unter 95 %, geht der Fall mit einem Klick zur manuellen Freigabe an Ihr Team.
                  </p>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-ink shrink-0 mt-0.5">
                  <TuneIcon className="w-4 h-4 text-ink" />
                </span>
                <div>
                  <h3 className="font-editorial text-lg text-ink mb-1">04 / Vollständige Protokollierung &amp; Audit-Trail</h3>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    Jede Aktion, jede Übergabe und jede Entscheidung ist im Fehlerfall sekundengenau nachvollziehbar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5-Step Pipeline — Process Flow */}
      <section className="py-20 md:py-28 bg-[#F3EFEA] border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <header className="max-w-3xl mb-14">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Die Workflow-Pipeline</p>
            <h2 className="font-editorial text-[clamp(2.2rem,4.5vw,3.3rem)] leading-[1.08] tracking-[-0.025em] text-ink font-normal">
              Wie moderne Workflow-Automatisierung funktioniert.
            </h2>
            <p className="text-base text-muted mt-3">
              Fünf klare Stufen von der Datenannahme bis zur protokollierten Übergabe in Ihre Zielsysteme.
            </p>
          </header>

          <div className="grid md:grid-cols-5 gap-6 relative">
            {/* Step 1 */}
            <div className="border-t-2 border-accent pt-4 flex flex-col justify-between">
              <div>
                <span className="font-editorial text-2xl text-accent-mid tabular block mb-1">01</span>
                <span className="text-[0.65rem] uppercase tracking-[0.12em] font-semibold text-light block mb-2">Auslöser</span>
                <h3 className="font-editorial text-lg text-ink leading-tight mb-2">Ereignis-Trigger</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Webhook, neue E-Mail, Formulareingang, Dateiablage oder Cron-Schedule.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-t-2 border-ink/25 pt-4 flex flex-col justify-between">
              <div>
                <span className="font-editorial text-2xl text-ink/40 tabular block mb-1">02</span>
                <span className="text-[0.65rem] uppercase tracking-[0.12em] font-semibold text-light block mb-2">Aufnahme</span>
                <h3 className="font-editorial text-lg text-ink leading-tight mb-2">Datenaufnahme</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Validierung von Payloads, Dateidownloads und Konvertierung in strukturierte Schemas.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-t-2 border-accent pt-4 flex flex-col justify-between">
              <div>
                <span className="font-editorial text-2xl text-accent-mid tabular block mb-1">03</span>
                <span className="text-[0.65rem] uppercase tracking-[0.12em] font-semibold text-light block mb-2">Verarbeitung</span>
                <h3 className="font-editorial text-lg text-ink leading-tight mb-2">Logik &amp; KI-Schritt</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Deterministische Regeln + KI-Extraktion für Freitexte oder PDF-Scans.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-t-2 border-ink/25 pt-4 flex flex-col justify-between">
              <div>
                <span className="font-editorial text-2xl text-ink/40 tabular block mb-1">04</span>
                <span className="text-[0.65rem] uppercase tracking-[0.12em] font-semibold text-light block mb-2">Übergabe</span>
                <h3 className="font-editorial text-lg text-ink leading-tight mb-2">Systemaktion</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Schreiben in DATEV, ERP, CRM, Datenbank oder Auslösen von Folge-Workflows.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border-t-2 border-accent pt-4 flex flex-col justify-between">
              <div>
                <span className="font-editorial text-2xl text-accent-mid tabular block mb-1">05</span>
                <span className="text-[0.65rem] uppercase tracking-[0.12em] font-semibold text-light block mb-2">Kontrolle</span>
                <h3 className="font-editorial text-lg text-ink leading-tight mb-2">Human-in-the-Loop</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Freigabe-Inbox bei Unsicherheit oder Schwellenwert-Überschreitung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4 Concrete KMU Use Cases */}
      <section className="py-20 md:py-28 border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <header className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Praxisbeispiele</p>
            <h2 className="font-editorial text-[clamp(2.2rem,4.5vw,3.3rem)] leading-[1.08] tracking-[-0.025em] text-ink font-normal">
              Typische Automatisierungsfälle für KMU.
            </h2>
            <p className="text-base text-muted mt-3">
              Vier erprobte Workflows, die sich innerhalb weniger Wochen amortisieren.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case 1 */}
            <article className="border border-ink/12 rounded-[20px] bg-surface p-7 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light border border-ink/10 rounded-full px-3 py-1 bg-surface-soft">
                    Eingangsverarbeitung
                  </span>
                  <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-ink">
                    <DocumentIcon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-ink leading-tight mb-3">
                  01 / Posteingang &amp; Beleg-Routing
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Eingehende Rechnungen, Lieferscheine und Verträge per E-Mail werden automatisch ausgelesen, mit ERP-Stammdaten abgeglichen und an den richtigen Sachbearbeiter oder in die Buchhaltung weitergeleitet.
                </p>
                <div className="pt-4 border-t border-ink/10 space-y-1.5 text-xs text-muted">
                  <p><strong className="text-ink">Auslöser:</strong> E-Mail an posteingang@ / Upload</p>
                  <p><strong className="text-ink">Systeme:</strong> DATEV, Lexware, ERP, Microsoft 365</p>
                  <p><strong className="text-ink">Ergebnis:</strong> Bis zu 80 % weniger manuelle Abtipp-Arbeit</p>
                </div>
              </div>
            </article>

            {/* Case 2 */}
            <article className="border border-ink/12 rounded-[20px] bg-surface p-7 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light border border-ink/10 rounded-full px-3 py-1 bg-surface-soft">
                    Vertrieb &amp; CRM
                  </span>
                  <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-ink">
                    <UsersIcon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-ink leading-tight mb-3">
                  02 / Lead-Enrichment &amp; CRM-Sync
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Neue Kontaktanfragen von der Website werden automatisiert mit Unternehmensdaten (Handelsregister, Website-Check, Branche) angereichert, priorisiert und im CRM mit fertigem Briefing angelegt.
                </p>
                <div className="pt-4 border-t border-ink/10 space-y-1.5 text-xs text-muted">
                  <p><strong className="text-ink">Auslöser:</strong> Formular-Eingang / inbound Lead</p>
                  <p><strong className="text-ink">Systeme:</strong> HubSpot, Pipedrive, Salesforce, Slack</p>
                  <p><strong className="text-ink">Ergebnis:</strong> Qualifizierte Leads in Sekunden beim Vertriebsteam</p>
                </div>
              </div>
            </article>

            {/* Case 3 */}
            <article className="border border-ink/12 rounded-[20px] bg-surface p-7 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light border border-ink/10 rounded-full px-3 py-1 bg-surface-soft">
                    Service &amp; Tickets
                  </span>
                  <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-ink">
                    <MailCheckIcon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-ink leading-tight mb-3">
                  03 / Klassifizierung &amp; Priorisierung von Support-Anfragen
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Kundennachrichten werden nach Dringlichkeit, Kategorie und Stimmung analysiert. Standardanfragen erhalten einen vorbereiteten Antwortentwurf; Notfälle werden sofort eskaliert.
                </p>
                <div className="pt-4 border-t border-ink/10 space-y-1.5 text-xs text-muted">
                  <p><strong className="text-ink">Auslöser:</strong> Neues Support-Ticket / E-Mail</p>
                  <p><strong className="text-ink">Systeme:</strong> Zendesk, Freshdesk, Jira, Helpdesk</p>
                  <p><strong className="text-ink">Ergebnis:</strong> Schnellere Erst-Reaktionszeit und strukturierte Inbox</p>
                </div>
              </div>
            </article>

            {/* Case 4 */}
            <article className="border border-ink/12 rounded-[20px] bg-surface p-7 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-light border border-ink/10 rounded-full px-3 py-1 bg-surface-soft">
                    Backoffice &amp; Legacy
                  </span>
                  <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-ink">
                    <HubIcon className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-ink leading-tight mb-3">
                  04 / Altsystem- &amp; Datenbank-Brücken
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Schnittstellen für Systeme ohne moderne REST-API: Automatischer Datenexport/-import über CSV-Verarbeitung, SFTP oder relationale Datenbank-Konnektoren.
                </p>
                <div className="pt-4 border-t border-ink/10 space-y-1.5 text-xs text-muted">
                  <p><strong className="text-ink">Auslöser:</strong> Täglicher Sync / Datenbank-Event</p>
                  <p><strong className="text-ink">Systeme:</strong> SQL Server, PostgreSQL, Legacy ERP, Excel</p>
                  <p><strong className="text-ink">Ergebnis:</strong> Nahtloser Datenfluss ohne teures System-Upgrade</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. System Integration Spec Sheet Matrix */}
      <section className="py-20 md:py-28 bg-[#F3EFEA] border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <header className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Technologie-Landschaft</p>
            <h2 className="font-editorial text-[clamp(2.2rem,4.5vw,3.3rem)] leading-[1.08] tracking-[-0.025em] text-ink font-normal">
              Systeme, die wir miteinander verbinden.
            </h2>
            <p className="text-base text-muted mt-3">
              Von etablierter Mittelstands-Software über Cloud-Tools bis zu individuellen REST- und Webhook-Endpunkten.
            </p>
          </header>

          <div className="border-t border-b border-ink/10 divide-y divide-ink/10">
            <div className="py-5 grid md:grid-cols-[220px_1fr] gap-4 items-baseline">
              <span className="font-editorial text-lg text-ink font-normal">Buchhaltung &amp; ERP</span>
              <p className="text-sm text-muted">DATEV (Connect / XML), Lexware, SevDesk, FastBill, SAP Business One, weclapp, Microsoft Dynamics</p>
            </div>
            <div className="py-5 grid md:grid-cols-[220px_1fr] gap-4 items-baseline">
              <span className="font-editorial text-lg text-ink font-normal">CRM &amp; Vertrieb</span>
              <p className="text-sm text-muted">HubSpot, Salesforce, Pipedrive, Zoho CRM, ActiveCampaign, Monday.com CRM</p>
            </div>
            <div className="py-5 grid md:grid-cols-[220px_1fr] gap-4 items-baseline">
              <span className="font-editorial text-lg text-ink font-normal">Kommunikation &amp; Mail</span>
              <p className="text-sm text-muted">Microsoft 365 / Exchange, Google Workspace, Slack, Microsoft Teams, Zendesk, Freshdesk</p>
            </div>
            <div className="py-5 grid md:grid-cols-[220px_1fr] gap-4 items-baseline">
              <span className="font-editorial text-lg text-ink font-normal">Dokumente &amp; Cloud</span>
              <p className="text-sm text-muted">SharePoint, OneDrive, Google Drive, Dropbox, DocuWare, Adobe Sign, DocuSign</p>
            </div>
            <div className="py-5 grid md:grid-cols-[220px_1fr] gap-4 items-baseline">
              <span className="font-editorial text-lg text-ink font-normal">Datenbanken &amp; APIs</span>
              <p className="text-sm text-muted">PostgreSQL, MySQL, MS SQL Server, REST-APIs, GraphQL, Webhooks, SFTP, CSV/XML-Pipelines</p>
            </div>
            <div className="py-5 grid md:grid-cols-[220px_1fr] gap-4 items-baseline">
              <span className="font-editorial text-lg text-ink font-normal">KI-Modelle &amp; Hosting</span>
              <p className="text-sm text-muted">DSGVO-konforme Endpunkte (EU-Rechenzentren), Open-Source-Modelle on-premise oder dedizierte Cloud-Infrastruktur</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How we proceed — 3 Editorial Columns */}
      <section className="py-20 md:py-28 border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-6">
          <header className="max-w-3xl mb-16 text-center mx-auto">
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Vorgehen</p>
            <h2 className="font-editorial text-[clamp(2.2rem,4.5vw,3.3rem)] leading-[1.08] tracking-[-0.025em] text-ink font-normal">
              In drei Schritten zum ersten funktionierenden Workflow.
            </h2>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-t-2 border-accent pt-6">
              <span className="font-editorial text-3xl text-accent-mid tabular block mb-2">01</span>
              <h3 className="font-editorial text-xl text-ink mb-3">Prozess-Audit &amp; Schnittstellen-Check</h3>
              <p className="text-sm text-muted leading-relaxed">
                Wir sichten Ihre aktuellen Abläufe, prüfen vorhandene Schnittstellen und Datenquellen und definieren den konkreten Business Case.
              </p>
            </div>

            <div className="border-t-2 border-accent pt-6">
              <span className="font-editorial text-3xl text-accent-mid tabular block mb-2">02</span>
              <h3 className="font-editorial text-xl text-ink mb-3">Prototyp &amp; Sandbox-Test</h3>
              <p className="text-sm text-muted leading-relaxed">
                Binnen 2 bis 3 Wochen bauen wir den Workflow in einer abgesicherten Testumgebung mit echten Testdaten auf und stimmen Feinheiten ab.
              </p>
            </div>

            <div className="border-t-2 border-accent pt-6">
              <span className="font-editorial text-3xl text-accent-mid tabular block mb-2">03</span>
              <h3 className="font-editorial text-xl text-ink mb-3">Rollout, Monitoring &amp; Übergabe</h3>
              <p className="text-sm text-muted leading-relaxed">
                Überführung in den Live-Betrieb mit Fehler-Alerting, Monitoring-Dashboard und gründlicher Einweisung für Ihr Team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Closing CTA */}
      <section className="py-24 md:py-32 bg-ink text-white">
        <div className="max-w-[860px] mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[#D4AF37] mb-4">
            Erstgespräch vereinbaren
          </p>
          <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.025em] font-normal mb-6">
            Haben Sie einen Prozess, der zu viel Zeit frisst?
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            In einem 30-minütigen Gespräch analysieren wir, ob und wie sich Ihr Ablauf deterministisch und mit gezielter KI-Unterstützung automatisieren lässt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#kontakt"
              className="brand-pill bg-white text-ink hover:bg-gray-100 px-8 py-4 text-base font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Gespräch anfragen</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              to="/preise"
              className="brand-pill bg-transparent border border-white/25 text-white hover:bg-white/10 px-8 py-4 text-base font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Preise &amp; Pakete ansehen</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Automatisierung;

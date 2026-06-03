import React, { useState } from 'react';

interface ServiceItem {
  title: string;
  metric: string;
  description: string;
  href: string;
}

const services: ServiceItem[] = [
  {
    title: 'KI-Beratung für KMU',
    metric: 'Maßgeschneidert',
    description:
      'Wir stehen als Experten an Ihrer Seite und identifizieren Anwendungsfälle, die sich im Alltag bezahlt machen — praxisnah, DSGVO-konform, ohne Buzzwords.',
    href: '#/ki-beratung',
  },
  {
    title: 'KI im Kundenservice',
    metric: '80 % weniger Tickets',
    description:
      'Chatbots, die Ihr Unternehmen kennen. Trainiert auf Ihre Daten, nicht auf generisches Wissen. Ihr Team kümmert sich um die Fälle, die wirklich Aufmerksamkeit brauchen.',
    href: '#/ki-kundenservice',
  },
  {
    title: 'KI-Telefonassistent',
    metric: '24/7 erreichbar',
    description:
      'Nimmt Anrufe entgegen, beantwortet Standardfragen, leitet weiter wenn nötig. Kein Warteschleifenmusik-Erlebnis mehr für Ihre Kunden.',
    href: '#',
  },
  {
    title: 'KI im Recruiting',
    metric: '60 % schneller besetzen',
    description:
      'Automatisches CV-Screening und Matching — auf Basis Ihrer Kriterien, nicht auf Basis von Keywords. Die Entscheidung bleibt bei Ihnen.',
    href: '#/ki-recruiting',
  },
  {
    title: 'KI-Lead-Generierung',
    metric: '500+ Leads am Tag',
    description:
      'Automatische Identifikation von Zielunternehmen mit personalisierter Erstansprache. Ihr Vertrieb spricht nur noch mit Interessenten.',
    href: '#',
  },
  {
    title: 'KI im Vertrieb',
    metric: '40 % mehr qualifizierte Leads',
    description:
      'Lead-Qualifizierung, Priorisierung und automatisierte Follow-ups — damit kein Kontakt mehr durch das Raster fällt.',
    href: '#',
  },
  {
    title: 'KI im Backoffice',
    metric: '70 % Zeitersparnis',
    description:
      'E-Mails, Dokumente, Rechnungen — automatisch verarbeitet und zugeordnet. Ihr Team arbeitet an Ergebnissen statt an Verwaltung.',
    href: '#',
  },
  {
    title: 'Analytics Dashboard',
    metric: 'Echtzeit',
    description:
      'Alle relevanten KPIs an einem Ort. Mit KI-Analysen, die nicht nur zeigen was passiert, sondern warum.',
    href: '#/analytics-dashboard',
  },
  {
    title: 'ROI-Rechner',
    metric: '60 Sekunden',
    description:
      'Wie viel Geld und Zeit spart KI in Ihrer Branche konkret? Branchen-spezifische Schätzung mit nachvollziehbarer Methodik. Keine Eingabe verlässt den Browser.',
    href: '#/roi-rechner',
  },
];

const ServiceRow: React.FC<{
  item: ServiceItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, index, isOpen, onToggle }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="border-t border-faint/50 group">
      <button
        onClick={onToggle}
        className="w-full flex items-baseline justify-between py-5 px-0 text-left cursor-pointer"
      >
        <div className="flex items-baseline gap-4 md:gap-6">
          <span
            className="text-xs text-faint font-body tabular-nums transition-transform duration-300 group-hover:-translate-x-1"
          >
            {num}
          </span>
          <span className="text-base md:text-lg text-ink font-editorial leading-snug">
            {item.title}
          </span>
        </div>
        <span className="text-xs text-muted font-body tracking-wide hidden sm:block">
          {item.metric}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-8 md:pl-14 pr-4 md:pr-32">
          <p className="text-sm text-muted font-body leading-relaxed max-w-xl">
            {item.description}
          </p>
          {item.href !== '#' && (
            <a
              href={item.href}
              className="inline-block mt-3 text-xs text-accent font-body underline decoration-1 underline-offset-4 hover:decoration-2 transition-all duration-200"
            >
              Details lesen
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-16u px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12u">
          Was wir tun
        </h2>

        <div>
          {services.map((item, i) => (
            <ServiceRow
              key={item.title}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
          <div className="border-t border-faint/50" />
        </div>
      </div>
    </section>
  );
};

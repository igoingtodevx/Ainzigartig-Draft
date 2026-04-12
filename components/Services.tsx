import React from 'react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, color, title, description, metric, href = "#" }) => {
  const colorClasses = {
    cyan: 'text-neon-cyan border-neon-cyan/20 hover:border-neon-cyan/60 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]',
    pink: 'text-neon-pink border-neon-pink/20 hover:border-neon-pink/60 hover:shadow-[0_0_15px_rgba(255,0,255,0.2)]',
    yellow: 'text-neon-yellow border-neon-yellow/20 hover:border-neon-yellow/60 hover:shadow-[0_0_15px_rgba(255,255,0,0.2)]'
  };
  
  const iconColorClasses = {
    cyan: 'text-neon-cyan group-hover:text-white',
    pink: 'text-neon-pink group-hover:text-white',
    yellow: 'text-neon-yellow group-hover:text-white'
  };

  const metricBgClasses = {
    cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
    pink: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30',
    yellow: 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30'
  };

  return (
    <a href={href} className={`block h-full p-6 border bg-background-dark/80 backdrop-blur-sm group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${colorClasses[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`material-symbols-outlined text-4xl transition-colors duration-300 ${iconColorClasses[color]}`}>
          {icon}
        </span>
        {metric && (
          <span className={`text-xs font-mono py-1 px-2 rounded border ${metricBgClasses[color]}`}>
            {metric}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-3 font-display group-hover:underline decoration-2 underline-offset-4">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-mono">{description}</p>
      
      <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
          Mehr erfahren <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </span>
      </div>
    </a>
  );
};

const servicesData: ServiceCardProps[] = [
  {
    title: "KI-Beratung (KMU)",
    metric: "maßgeschneidert",
    description: "Wir stehen als Experten an Ihrer Seite und identifizieren wertstiftende Anwedungsfälle für KI – praxisnah und DSGVO-konform.",
    icon: "lightbulb",
    color: "cyan",
    href: "#/ki-beratung"
  },
  {
    title: "KI im Kundenservice",
    metric: "80% weniger Tickets",
    description: "KI-gestützte Chatbots reduzieren das Ticketaufkommen signifikant und sichern 24/7 Erreichbarkeit.",
    icon: "support_agent",
    color: "cyan",
    href: "#/ki-kundenservice"
  },
  {
    title: "KI-Telefonassistent",
    metric: "24/7 erreichbar",
    description: "Ein KI-Telefonassistent nimmt Anrufe entgegen, beantwortet Fragen und leitet relevante Gespräche weiter.",
    icon: "phone_in_talk",
    color: "pink"
  },
  {
    title: "KI im Recruiting",
    metric: "60% schnellere Einstellung",
    description: "Automatisches CV-Screening und intelligentes Matching beschleunigen die Vorauswahl passender Kandidaten.",
    icon: "group_add",
    color: "yellow",
    href: "#/ki-recruiting"
  },
  {
    title: "KI-Lead-Generierung",
    metric: "500+ Leads pro Tag",
    description: "Automatische Identifikation von Zielunternehmen mit personalisierter Erstansprache und intelligentem Scoring.",
    icon: "person_search",
    color: "cyan"
  },
  {
    title: "KI im Vertrieb",
    metric: "40% mehr Leads",
    description: "KI unterstützt bei der Lead-Qualifizierung, Priorisierung und automatisierten Follow-ups.",
    icon: "trending_up",
    color: "pink"
  },
  {
    title: "KI im Backoffice",
    metric: "70% Zeitersparnis",
    description: "Automatisierte Verarbeitung von E-Mails, Dokumenten und Rechnungen für transparentere Prozesse.",
    icon: "admin_panel_settings",
    color: "yellow"
  },
  {
    title: "Analytics Dashboard",
    metric: "Echtzeit-Einblicke",
    description: "KI-gestützte Analysen für datengetriebene Entscheidungen in Vertrieb und Recruiting.",
    icon: "monitoring",
    color: "pink",
    href: "#/analytics-dashboard"
  },
];

export const Services: React.FC = () => {
  return (
    <div className="mt-24 w-full max-w-7xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 font-display text-center uppercase tracking-widest relative">
        <span className="text-neon-cyan mr-2">&gt;</span>
        So können wir Kunden helfen
        <span className="animate-pulse ml-2 text-neon-pink">_</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={index}
            {...service}
          />
        ))}
      </div>
    </div>
  );
};
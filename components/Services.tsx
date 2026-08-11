import React from 'react';
interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

const services: ServiceItem[] = [
  {
    title: 'Automatisierung & Integrationen',
    description: 'Wiederkehrende Abläufe verbinden, manuelle Übergaben reduzieren und bestehende Systeme sinnvoll zusammenspielen lassen.',
    icon: 'account_tree',
  },
  {
    title: 'Dashboards & interne Business-Tools',
    description: 'Übersichtliche Werkzeuge für Daten, Freigaben und operative Entscheidungen — passend zu Ihren tatsächlichen Arbeitsabläufen.',
    icon: 'dashboard',
  },
  {
    title: 'KI-Assistenten & Wissenssysteme',
    description: 'Unternehmenswissen auffindbar machen und Teams mit Assistenten unterstützen, die auf Ihren Inhalten und Regeln arbeiten.',
    icon: 'forum',
  },
  {
    title: 'Individuelle KI- & Softwarelösungen',
    description: 'Maßgeschneiderte Anwendungen für Anforderungen, die sich nicht mit Standardsoftware oder einem einzelnen Tool lösen lassen.',
    icon: 'deployed_code',
  },
];

export const Services: React.FC = () => (
  <section id="services" className="py-16 md:py-32 bg-base scroll-mt-24">
    <div className="max-w-[1140px] mx-auto px-6">
      <header className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <p className="text-xs uppercase tracking-[0.14em] font-semibold text-light mb-3">Vier Kernleistungen</p>
        <h2 className="font-editorial text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em] text-ink font-normal">
          Lösungen, die im Alltag funktionieren
        </h2>
        <p className="text-base md:text-lg text-muted mt-4 leading-relaxed">
          Von der Automatisierung bis zur individuellen Anwendung: Wir bauen konkret, anschlussfähig und nah an Ihren Prozessen.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="brand-card min-h-0 md:min-h-[260px] p-5 md:p-7 flex flex-col bg-surface"
          >
            <div className="flex items-start justify-between gap-4 mb-6 md:mb-10">
              <span className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-accent/20 border border-accent/45 flex items-center justify-center text-ink">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{service.icon}</span>
              </span>
              <span className="font-editorial text-2xl text-accent-mid tabular" aria-hidden="true">
                0{index + 1}
              </span>
            </div>

            <div className="mt-auto">
              <h3 className="font-editorial text-[1.5rem] md:text-[1.7rem] leading-tight text-ink mb-3">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

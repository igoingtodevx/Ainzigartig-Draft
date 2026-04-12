import React from 'react';

interface CaseStudy {
  title: string;
  description: string;
  status: string;
  context: string;
  result?: string;
}

const studies: CaseStudy[] = [
  {
    title: 'KI-Chatbot auf der Website',
    description:
      'Der KI-Chatbot ist die Weiterentwicklung der FAQ-Seite und skaliert individuelle Beratung, ohne dass dafür Kundenberater eingestellt werden müssen. Die KI versteht Fragen semantisch und beantwortet sie auf Basis von explizitem Unternehmenswissen.',
    status: 'Live',
    context: 'Kundenservice',
    result: 'Ticketvolumen um 80 % reduziert',
  },
  {
    title: 'HubSpot CRM Flows',
    description:
      'Implementierung von HubSpot zur automatisierten Lead-Segmentierung. Workflows, bei denen sich Kunden über einen Funnel für ein Webinar anmelden und automatisch die richtigen Daten und E-Mails erhalten — ohne manuellen Eingriff.',
    status: 'Optimiert',
    context: 'Vertrieb & Marketing',
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section className="py-16u px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-editorial text-2xl md:text-3xl text-ink mb-12u">
          Referenzen
        </h2>

        <div className="space-y-12u">
          {studies.map((study) => (
            <div
              key={study.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-t border-faint/50 pt-8"
            >
              <div className="md:col-span-7">
                <h3 className="font-editorial text-xl text-ink mb-3">
                  {study.title}
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed">
                  {study.description}
                </p>
              </div>

              <div className="md:col-span-5 space-y-4">
                <div>
                  <p className="text-[10px] text-faint font-body uppercase tracking-[0.2em] mb-0.5">
                    Status
                  </p>
                  <p className="text-sm text-ink font-body">{study.status}</p>
                </div>
                <div>
                  <p className="text-[10px] text-faint font-body uppercase tracking-[0.2em] mb-0.5">
                    Kontext
                  </p>
                  <p className="text-sm text-ink font-body">{study.context}</p>
                </div>
                {study.result && (
                  <div>
                    <p className="text-[10px] text-faint font-body uppercase tracking-[0.2em] mb-0.5">
                      Ergebnis
                    </p>
                    <p className="text-sm text-accent font-body">{study.result}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

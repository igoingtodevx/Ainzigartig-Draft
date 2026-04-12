import React from 'react';

const projects = [
  {
    title: "KI-Chatbot auf der Website",
    description: "Der KI-Chatbot ist die Weiterentwicklung der FAQ-Page und skaliert individuelle Beratung ohne die Investition in Kundenberater. Die KI ist in der Lage die Fragen von Kunden semantisch zu verstehen und mit explizitem zusätzlichen Wissen zum Unternehmen die Fragen zu beantworten.",
    icon: "smart_toy",
    status: "DEPLOYED",
    id: "LOG_01"
  },
  {
    title: "Hubspot CRM Flows",
    description: "Implementierung von Hubspot zur automatisierten Lead-Segmentierung. Einrichtung von Workflows, bei denen Kunden, die sich z.B. über einen Perspective Funnel für ein Webinar anmelden, automatisch die relevanten Daten und E-Mails erhalten.",
    icon: "hub",
    status: "OPTIMIZED",
    id: "LOG_02"
  },
  {
    title: "Platzhalter",
    description: "Daten werden geladen... Zukünftige Projektbeschreibung hier einfügen. Innovative Lösungen für komplexe technische Herausforderungen.",
    icon: "pending",
    status: "PENDING",
    id: "LOG_03"
  },
  {
    title: "Platzhalter",
    description: "Daten werden geladen... Zukünftige Projektbeschreibung hier einfügen. Skalierbare Architektur und digitale Transformation.",
    icon: "folder_open",
    status: "PENDING",
    id: "LOG_04"
  }
];

export const CaseStudies: React.FC = () => {
  return (
    <div className="mt-32 max-w-7xl mx-auto px-4 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 font-display text-center uppercase tracking-widest relative">
        <span className="text-neon-cyan mr-2">&gt;</span>
        So haben wir Kunden bereits weitergeholfen
        <span className="animate-pulse ml-2 text-neon-pink">_</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="relative group border border-gray-800 bg-[#150a26]/80 p-6 rounded overflow-hidden hover:border-gray-600 transition-all duration-300">
            {/* Tech Decoration */}
            <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:opacity-60 transition-opacity">
              <span className="text-[10px] text-neon-cyan font-mono tracking-widest">[{project.id}] :: {project.status}</span>
            </div>
            
            <div className="flex items-start gap-5 pt-2">
              <div className="mt-1 p-3 bg-white/5 rounded border border-gray-700 group-hover:border-neon-cyan/30 group-hover:bg-neon-cyan/5 transition-all">
                <span className="material-symbols-outlined text-gray-300 group-hover:text-neon-cyan transition-colors text-2xl">{project.icon}</span>
              </div>
              
              <div className="flex-1 text-left relative z-10">
                <h3 className="text-lg font-bold text-white mb-3 font-display group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                  {project.description}
                </p>
              </div>
            </div>
            
            {/* Corner accent */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50 group-hover:via-neon-cyan/50 transition-all"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
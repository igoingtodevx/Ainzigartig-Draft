import React from 'react';
import founderImage from '../Assets/founder_pixelart_nobg.png';

export const TeamSection: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-32 px-4 mb-24">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-16 font-display text-center uppercase tracking-widest relative">
        <span className="text-neon-cyan mr-2">&gt;</span>
        Mission Control
        <span className="animate-pulse ml-2 text-neon-pink">_</span>
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-12 bg-[#150a26]/40 border border-gray-800 p-8 md:p-12 rounded-lg relative overflow-hidden hover:border-gray-600 transition-colors duration-500">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-30">
             <span className="text-neon-yellow font-mono text-xs tracking-widest">SYS.ADMIN_ACCESS</span>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-cyan/5 rounded-tr-full blur-xl"></div>
        
        {/* Image Container + Names */}
        <div className="w-full lg:w-1/2">
          <div className="relative group perspective-1000">
           <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-pink opacity-30 group-hover:opacity-60 blur transition-opacity duration-500 rounded-lg"></div>
           <div className="relative border border-gray-700 bg-background-dark rounded-lg overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.01]">
             {/* Placeholder for team image - user should replace src with their actual image URL */}
             <img 
               src={founderImage} 
               alt="Unser Team" 
               className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 object-cover" 
             />
             
             {/* Cyberpunk Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40"></div>
             
             {/* Label Tag */}
             <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-neon-cyan/50 px-3 py-1 rounded text-xs font-mono text-neon-cyan">
                STATUS: ONLINE
             </div>
           </div>
          </div>

          {/* Team Member Names */}
          <div className="grid grid-cols-3 gap-2 mt-4">
             {[
               { name: 'Florian Schupp', linkedin: '#' },
               { name: 'Tim Reinschmidt', linkedin: '#' },
               { name: 'Marvin Bertenrath', linkedin: 'https://www.linkedin.com/in/marvin-bertenrath-909b35200/' },
             ].map((member) => (
               <div key={member.name} className="text-center">
                 <p className="text-white text-xs md:text-sm font-bold font-mono">{member.name}</p>
                 <a
                   href={member.linkedin}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center mt-1 text-gray-500 hover:text-neon-cyan transition-colors"
                   aria-label={`${member.name} LinkedIn`}
                 >
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                   </svg>
                 </a>
               </div>
             ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-8">
            <h3 className="text-3xl font-bold text-white font-display leading-tight">
                Die Köpfe hinter dem <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink">Code</span>
            </h3>
            
            <div className="space-y-6 text-gray-300 font-mono text-sm leading-relaxed">
                <p className="flex gap-3">
                    <span className="text-neon-pink font-bold">01</span>
                    <span>
                        Ausgebildet an <strong className="text-white">Top-Universitäten</strong> und geschmiedet in der Praxis. Unser Fundament ist akademische Exzellenz gepaart mit echtem Unternehmer-Geist.
                    </span>
                </p>
                <p className="flex gap-3">
                    <span className="text-neon-pink font-bold">02</span>
                    <span>
                        Wir bringen Erfahrung aus der Gründung mehrerer <strong className="text-white">Startups (E-Commerce & Impact)</strong> sowie der Beratung von <strong className="text-white">DAX-Konzernen</strong> mit. Wir kennen die Challenges beider Welten.
                    </span>
                </p>
                <p className="flex gap-3">
                    <span className="text-neon-pink font-bold">03</span>
                    <span>
                        Als <strong className="text-white">Digital Natives</strong> und erfahrene Manager multikultureller Teams bauen wir Brücken zwischen Technologie und Mensch.
                    </span>
                </p>
                
                <div className="bg-white/5 border-l-2 border-neon-yellow p-4 mt-2">
                    <p className="italic text-gray-400">
                        "Wir bauen schnell, halten Dinge einfach und setzen auf eine Kommunikation, die direkt, herzlich und ehrlich ist."
                    </p>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
                 {['#Startups', '#DAX', '#DigitalNatives', '#Impact'].map((tag) => (
                    <span key={tag} className="text-xs font-mono text-neon-cyan/80 bg-neon-cyan/10 px-2 py-1 rounded border border-neon-cyan/20">
                        {tag}
                    </span>
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
};
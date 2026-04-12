import React from 'react';
import founderImage from '../Assets/founder_pixelart_nobg.png';

const members = [
  { name: 'Florian Schupp', linkedin: '#' },
  { name: 'Tim Reinschmidt', linkedin: '#' },
  {
    name: 'Marvin Bertenrath',
    linkedin: 'https://www.linkedin.com/in/marvin-bertenrath-909b35200/',
  },
];

export const TeamSection: React.FC = () => {
  const [showPhoto, setShowPhoto] = React.useState(false);

  return (
    <section className="py-16u px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl">
          <div className="space-y-1 mb-10">
            {members.map((m) => (
              <p key={m.name} className="font-editorial text-2xl md:text-3xl text-ink cursor-help">
                {m.name}
                {m.linkedin !== '#' && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block ml-2 text-faint hover:text-accent transition-colors duration-200 align-middle"
                    aria-label={`${m.name} auf LinkedIn`}
                  >
                    <svg className="w-3.5 h-3.5 inline" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </p>
            ))}
          </div>

          <p className="text-base text-muted font-body leading-relaxed max-w-lg mb-6">
            Ausgebildet an Top-Universitäten, geschmiedet in Startups und DAX-Konzernen.
            Wir bauen schnell und halten Dinge einfach.
          </p>

          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className="text-xs text-faint font-body hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            {showPhoto ? 'Foto verbergen' : 'Foto anzeigen →'}
          </button>

          {showPhoto && (
            <div className="mt-6 max-w-sm">
              <img
                src={founderImage}
                alt="Das Ainzigartig Team"
                className="w-full grayscale opacity-90"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

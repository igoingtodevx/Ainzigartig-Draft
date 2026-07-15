import React from 'react';
import { ContactForm } from './ContactForm';

export const ClosingCTA: React.FC = () => {
  return (
    <section id="kontakt" className="py-16u md:py-[160px] px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-xl">
          <p className="font-editorial text-2xl md:text-3xl lg:text-[2.5rem] text-ink leading-[1.2]">
            30 Minuten. Ihr Vorhaben.{' '}
            <br className="hidden md:block" />
            Eine klare technische Einschätzung.
          </p>
          <p className="text-sm text-muted font-body leading-relaxed mt-4">
            Beschreiben Sie kurz den Prozess, das Produkt oder die Idee. Wir melden uns mit
            einer ersten Einordnung zu Machbarkeit, sinnvoller Tiefe und nächstem Schritt.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

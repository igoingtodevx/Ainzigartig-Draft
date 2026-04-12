import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AsciiHeader } from './components/AsciiHeader';
import { TerminalWindow } from './components/TerminalWindow';
import { ValueProposition } from './components/ValueProposition';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { KIBeratung } from './components/KIBeratung';
import { KIKundenservice } from './components/KIKundenservice';
import { KIRecruiting } from './components/KIRecruiting';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { LogoSlider } from './components/LogoSlider';
import { HomeFAQ, HomeCTA } from './components/HomeFAQCTA';

function getRoute(): string {
  return window.location.hash.replace('#', '') || '/';
}

const App: React.FC = () => {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case '/impressum':
        return <Impressum />;
      case '/datenschutz':
        return <Datenschutz />;
      case '/ki-beratung':
        return <KIBeratung />;
      case '/ki-kundenservice':
        return <KIKundenservice />;
      case '/ki-recruiting':
        return <KIRecruiting />;
      case '/analytics-dashboard':
        return <AnalyticsDashboard />;
      default:
        return (
          <main className="pt-20 relative flex flex-col items-center justify-start min-h-[calc(100vh-80px)]">
            <BackgroundEffects />
            
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-12 pb-24 text-center">
              <AsciiHeader />
              <TerminalWindow />
              <LogoSlider />
              <ValueProposition />
              <Services />
              <CaseStudies />
              <TeamSection />
              <HomeFAQ />
              <HomeCTA />
            </div>
            
            {/* Decorative separator line */}
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white font-mono antialiased overflow-x-hidden selection:bg-neon-pink selection:text-white">
      <Navbar />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;
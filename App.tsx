import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TeamSection } from './components/TeamSection';
import { HomeFAQ } from './components/HomeFAQCTA';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { KIBeratung } from './components/KIBeratung';
import { KIKundenservice } from './components/KIKundenservice';
import { KIRecruiting } from './components/KIRecruiting';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ROICalculator } from './components/ROICalculator';
import { KISchnellstart } from './components/KISchnellstart';
import { KIAudit } from './components/KIAudit';
import { PricingOverview } from './components/PricingOverview';

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
      case '/roi-rechner':
        return <ROICalculator />;
      case '/ki-schnellstart':
        return <KISchnellstart />;
      case '/ki-audit':
        return <KIAudit />;
      case '/preise':
        return <PricingOverview />;
      default:
        return (
          <main>
            <Hero />
            <Services />
            <CaseStudies />
            <TeamSection />
            <HomeFAQ />
            <ClosingCTA />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-base text-ink font-body antialiased overflow-x-hidden selection:bg-accent selection:text-base">
      <Navbar />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import { KIAnalyse } from './components/KIAnalyse';
import { LiveAgentDemo } from './components/LiveAgentDemo';
import { Projects } from './components/Projects';
import { ChatBot } from './components/ChatBot';
import { RouteMeta } from './components/RouteMeta';

const HomePage: React.FC = () => (
  <main>
    <RouteMeta
      title="Ainzigartig – KI-Beratung für den Mittelstand"
      description="Wir helfen Mittelstandsunternehmen, KI gewinnbringend einzusetzen."
    />
    <Hero />
    <Services />
    <CaseStudies />
    <TeamSection />
    <HomeFAQ />
    <ClosingCTA />
  </main>
);

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.replace('#', '');
    let cancelled = false;
    const tryScroll = (attempt: number) => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempt < 10) {
        setTimeout(() => tryScroll(attempt + 1), 50);
      }
    };
    tryScroll(0);
    return () => {
      cancelled = true;
    };
  }, [hash, pathname]);
  return null;
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen bg-base text-ink font-body antialiased overflow-x-hidden selection:bg-accent selection:text-base">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/ki-beratung" element={<KIBeratung />} />
          <Route path="/ki-kundenservice" element={<KIKundenservice />} />
          <Route path="/ki-recruiting" element={<KIRecruiting />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/roi-rechner" element={<ROICalculator />} />
          <Route path="/ki-schnellstart" element={<KISchnellstart />} />
          <Route path="/ki-audit" element={<KIAudit />} />
          <Route path="/preise" element={<PricingOverview />} />
          <Route path="/ki-analyse" element={<KIAnalyse />} />
          <Route path="/live-demo" element={<LiveAgentDemo />} />
          <Route path="/projekte" element={<Projects />} />
        </Routes>
        <Footer />
        <ChatBot />
      </div>
    </BrowserRouter>
  );
};

export default App;

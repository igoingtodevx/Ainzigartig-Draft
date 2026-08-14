import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeProcess } from './components/HomeProcess';
import { Services } from './components/Services';
import { CaseStudies } from './components/CaseStudies';
import { TeamSection } from './components/TeamSection';
import { HomeFAQ } from './components/HomeFAQCTA';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { InsightsTeaser } from './components/InsightsTeaser';
import { ChatBot } from './components/ChatBot';
import { RouteMeta } from './components/RouteMeta';
import { ErrorBoundary } from './components/ErrorBoundary';

const Impressum=lazy(()=>import('./components/Impressum').then(m=>({default:m.Impressum})));
const Datenschutz=lazy(()=>import('./components/Datenschutz').then(m=>({default:m.Datenschutz})));
const Automatisierung=lazy(()=>import('./components/Automatisierung').then(m=>({default:m.Automatisierung})));
const KIBeratung=lazy(()=>import('./components/KIBeratung').then(m=>({default:m.KIBeratung})));
const KIKundenservice=lazy(()=>import('./components/KIKundenservice').then(m=>({default:m.KIKundenservice})));
const KIRecruiting=lazy(()=>import('./components/KIRecruiting').then(m=>({default:m.KIRecruiting})));
const AnalyticsDashboard=lazy(()=>import('./components/AnalyticsDashboard').then(m=>({default:m.AnalyticsDashboard})));
const ROICalculator=lazy(()=>import('./components/ROICalculator').then(m=>({default:m.ROICalculator})));
const KISchnellstart=lazy(()=>import('./components/KISchnellstart').then(m=>({default:m.KISchnellstart})));
const KIAudit=lazy(()=>import('./components/KIAudit').then(m=>({default:m.KIAudit})));
const PricingOverview=lazy(()=>import('./components/PricingOverview').then(m=>({default:m.PricingOverview})));
const KIAnalyse=lazy(()=>import('./components/KIAnalyse').then(m=>({default:m.KIAnalyse})));
const LiveAgentDemo=lazy(()=>import('./components/LiveAgentDemo').then(m=>({default:m.LiveAgentDemo})));
const Projects=lazy(()=>import('./components/Projects').then(m=>({default:m.Projects})));
const Insights=lazy(()=>import('./components/Insights').then(m=>({default:m.Insights})));
const NotFound=lazy(()=>import('./components/NotFound').then(m=>({default:m.NotFound})));

const HomePage: React.FC = () => (
  <main>
    <RouteMeta
      title="Ainzigartig – KI-Beratung & Automatisierung für den Mittelstand"
      description="Ainzigartig hilft KMUs dabei, Automatisierung und generative KI praxistauglich und gewinnbringend einzusetzen."
    />
    <Hero />
    <Services />
    <HomeProcess />
    <CaseStudies />
    <TeamSection />
    <InsightsTeaser />
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
      if (attempt < 10) setTimeout(() => tryScroll(attempt + 1), 50);
    };
    tryScroll(0);
    return () => {
      cancelled = true;
    };
  }, [hash, pathname]);
  return null;
}

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToHash />
    <div className="min-h-screen bg-base text-ink font-body antialiased overflow-x-hidden selection:bg-accent selection:text-ink">
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<main className="min-h-[70vh] pt-36 px-6" role="status"><p className="max-w-[1140px] mx-auto text-sm text-muted">Seite wird geladen…</p></main>}><Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/automatisierung" element={<Automatisierung />} />
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
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<NotFound />} />
        </Routes></Suspense>
      </ErrorBoundary>
      <Footer />
      <ChatBot />
      <Analytics />
    </div>
  </BrowserRouter>
);

export default App;

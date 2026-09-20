import React, { useState, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroCompanySection } from './components/HeroCompanySection';
import { ClientContactSection } from './components/ClientContactSection';
import { CompanyFooter } from './components/CompanyFooter';
import { ErrorBoundary } from './components/ErrorBoundary';
import TechConstellationCanvas from './components/TechConstellationCanvas';
import { LegalModalType } from './types';

// Lazy loaded legal modal for performance
const LegalModal = lazy(() => import('./components/LegalModal'));

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [forceOpenForm, setForceOpenForm] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  const handleScrollToContact = () => {
    setForceOpenForm(true);
    const element = document.getElementById('contact-section');
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectCapability = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setForceOpenForm(true);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-[#1a73e8] selection:text-white flex flex-col font-sans">
            
            {/* Interactive Constellation Particle Canvas Background */}
            <TechConstellationCanvas />

          {/* Global Navigation Bar */}
          <Navbar onScrollToContact={handleScrollToContact} />

          {/* Main Content Sections */}
          <main className="flex-grow relative z-10">
            
            {/* Hero Section with Trust Metrics and Core Services */}
            <HeroCompanySection 
              onScrollToContact={handleScrollToContact}
              onSelectCapability={handleSelectCapability}
            />

            {/* Scoping Form, Direct Desks & Kolhapur Headquarters */}
            <ClientContactSection 
              selectedServiceId={selectedServiceId}
              forceOpenForm={forceOpenForm}
              onFormVisibilityChange={(visible) => {
                if (!visible) setForceOpenForm(false);
              }}
            />

          </main>

          {/* Institutional Footer */}
          <CompanyFooter onOpenLegalModal={(type) => setLegalModalType(type)} />

          {/* Legal and Security Governance Modals (Lazy Loaded on Demand) */}
          {legalModalType && (
            <Suspense fallback={null}>
              <LegalModal 
                type={legalModalType} 
                onClose={() => setLegalModalType(null)} 
              />
            </Suspense>
          )}

        </div>
      </LanguageProvider>
    </ThemeProvider>
  </ErrorBoundary>
  );
}

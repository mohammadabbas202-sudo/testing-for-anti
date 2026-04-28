import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { FeatureGrid } from './components/FeatureGrid';
import { ImpactSection } from './components/ImpactSection';
import { SavingsCalculator } from './components/SavingsCalculator';
import { PricingGuarantee } from './components/PricingGuarantee';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { BackToTop } from './components/BackToTop';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialZipCode, setInitialZipCode] = useState('');

  const handleGetYourDesign = (zipCode: string) => {
    setInitialZipCode(zipCode);
    setIsModalOpen(true);
  };

  const handleCheckEligibility = () => {
    setInitialZipCode('');
    setIsModalOpen(true);
  };

  const handleGetEstimate = () => {
    setInitialZipCode('');
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white scroll-smooth">
      <Header onCheckEligibilityClick={handleCheckEligibility} />
      <Hero onGetYourDesign={handleGetYourDesign} />
      <SocialProof />
      <SectionDivider />
      <FeatureGrid />
      <SectionDivider />
      <ImpactSection />
      <SectionDivider />
      <SavingsCalculator onGetEstimate={handleGetEstimate} />
      <SectionDivider />
      <PricingGuarantee />
      <SectionDivider />
      <FAQ />
      <Footer onRequestAssessment={() => setIsModalOpen(true)} />
      <LeadCaptureModal
        isOpen={isModalOpen}
        initialZipCode={initialZipCode}
        onClose={() => setIsModalOpen(false)}
      />
      <BackToTop />
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-solar-amber/20 to-transparent" />
    </div>
  );
}

export default App;

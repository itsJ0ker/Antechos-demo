import { useEffect } from 'react';
import HeroSection from '../components/marketplace/HeroSection';
import TrustStats from '../components/marketplace/TrustStats';
import HowItWorks from '../components/marketplace/HowItWorks';
import CategoryGrid from '../components/marketplace/CategoryGrid';
import LiveProjects from '../components/marketplace/LiveProjects';
import AIMatchingEngine from '../components/marketplace/AIMatchingEngine';
import TestimonialSection from '../components/marketplace/TestimonialSection';
import CTASection from '../components/marketplace/CTASection';
import './MarketplacePremium.css';

const MarketplacePremium = () => {
  useEffect(() => {
    document.title = 'Antechos — AI-Powered Talent Marketplace';
  }, []);

  return (
    <div className="mp-root">
      <HeroSection />
      <TrustStats />
      <HowItWorks />
      <CategoryGrid />
      <LiveProjects />
      <AIMatchingEngine />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default MarketplacePremium;

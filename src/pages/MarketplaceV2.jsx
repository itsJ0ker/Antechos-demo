import { useEffect } from 'react';
import { HeroV2 } from '../components/marketplace/v2/HeroV2';
import { TrustV2 } from '../components/marketplace/v2/TrustV2';
import { HowItWorksV2 } from '../components/marketplace/v2/HowItWorksV2';
import { CategoryGridV2 } from '../components/marketplace/v2/CategoryGridV2';
import { LiveProjectsV2 } from '../components/marketplace/v2/LiveProjectsV2';
import { AIMatchingV2 } from '../components/marketplace/v2/AIMatchingV2';
import { CTAV2 } from '../components/marketplace/v2/CTAV2';
import './MarketplaceV2.css';

const MarketplaceV2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Antechos Marketplace — Hire the World\'s Top 3% Talent';
  }, []);

  return (
    <div className="v2-root selection:bg-indigo-100 selection:text-indigo-900">
      <HeroV2 />
      <TrustV2 />
      <HowItWorksV2 />
      <CategoryGridV2 />
      <LiveProjectsV2 />
      <AIMatchingV2 />
      <CTAV2 />
    </div>
  );
};

export default MarketplaceV2;

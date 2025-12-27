import { useState } from 'react';
import HeroManager from './marketplace/HeroManager';
import PartnersManager from './marketplace/PartnersManager';
import BannerManagerMP from './marketplace/BannerManagerMP';
import FeaturesManager from './marketplace/FeaturesManager';
import SlidesManager from './marketplace/SlidesManager';
import MetricsManager from './marketplace/MetricsManager';
import ResourcesManager from './marketplace/ResourcesManager';
import BusinessDeservesManager from './marketplace/BusinessDeservesManager';
import HireBlocksManager from './marketplace/HireBlocksManager';
import ProfessionalsManager from './marketplace/ProfessionalsManager';
import TestimonialsManager from './marketplace/TestimonialsManager';
import SolutionsManager from './marketplace/SolutionsManager';
import TeamsManager from './marketplace/TeamsManager';
import BlogsManager from './marketplace/BlogsManager';

const MarketplaceRedesignManager = () => {
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Hero' },
    { id: 'partners', label: 'Partners' },
    { id: 'banner', label: 'Banner' },
    { id: 'features', label: 'Features' },
    { id: 'slides', label: 'Slides' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'resources', label: 'Resources' },
    { id: 'business', label: 'Business Deserves' },
    { id: 'hire', label: 'Hire Blocks' },
    { id: 'professionals', label: 'Professionals' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'teams', label: 'Teams' },
    { id: 'blogs', label: 'Blogs' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Marketplace Redesign Manager</h2>
        
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'hero' && <HeroManager />}
          {activeTab === 'partners' && <PartnersManager />}
          {activeTab === 'banner' && <BannerManagerMP />}
          {activeTab === 'features' && <FeaturesManager />}
          {activeTab === 'slides' && <SlidesManager />}
          {activeTab === 'metrics' && <MetricsManager />}
          {activeTab === 'resources' && <ResourcesManager />}
          {activeTab === 'business' && <BusinessDeservesManager />}
          {activeTab === 'hire' && <HireBlocksManager />}
          {activeTab === 'professionals' && <ProfessionalsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
          {activeTab === 'solutions' && <SolutionsManager />}
          {activeTab === 'teams' && <TeamsManager />}
          {activeTab === 'blogs' && <BlogsManager />}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceRedesignManager;

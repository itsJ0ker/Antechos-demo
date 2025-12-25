import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, Download, ChevronLeft, ChevronRight, X, Star, Briefcase, Code, Users, Target, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleLaserFlow from '../components/effects/SimpleLaserFlow';
import InstantLaserFlow from '../components/effects/InstantLaserFlow';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ChromaGrid from '../components/ChromaGrid/ChromaGrid';
import ChainCarousel from '../components/ChainCarousel';

const MarketplaceRedesign = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    hero: null,
    partners: [],
    banner: [],
    features: [],
    slides: [],
    metrics: [],
    resources: null,
    businessDeserves: null,
    hireBlocks: [],
    professionals: [],
    testimonials: [],
    solutions: [],
    teams: []
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProfessionalSlide, setCurrentProfessionalSlide] = useState(0);
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);

  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const testimonialsRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [
        heroRes, partnersRes, bannerRes, featuresRes, slidesRes,
        metricsRes, resourcesRes, businessRes, hireRes, profRes,
        testimonialsRes, solutionsRes, teamsRes
      ] = await Promise.all([
        supabase.from('marketplace_hero').select('*').single(),
        supabase.from('marketplace_partners').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_banner').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_features').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_slides').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_metrics').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_resources').select('*').eq('is_active', true).single(),
        supabase.from('marketplace_business_deserves').select('*').eq('is_active', true).single(),
        supabase.from('marketplace_hire_blocks').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_professionals').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_testimonials').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_solutions').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_teams').select('*').eq('is_active', true).order('order_index')
      ]);

      setData({
        hero: heroRes.data,
        partners: partnersRes.data || [],
        banner: bannerRes.data || [],
        features: featuresRes.data || [],
        slides: slidesRes.data || [],
        metrics: metricsRes.data || [],
        resources: resourcesRes.data,
        businessDeserves: businessRes.data,
        hireBlocks: hireRes.data || [],
        professionals: profRes.data || [],
        testimonials: testimonialsRes.data || [],
        solutions: solutionsRes.data || [],
        teams: teamsRes.data || []
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const DonutChart = ({ percentage, label, color = '#a855f7' }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle cx="64" cy="64" r={radius} stroke="rgba(139, 92, 246, 0.2)" strokeWidth="10" fill="none" />
            <circle
              cx="64" cy="64" r={radius} stroke={color} strokeWidth="10" fill="none"
              strokeDasharray={circumference} strokeDashoffset={offset}
              className="transition-all duration-1000 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{percentage}%</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold text-gray-300 text-center">{label}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-900">
      {/* New Hero Section with LaserFlow */}
      {data.hero && (
        <section
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            background: 'radial-gradient(circle at top, #160022 0%, #0a0014 45%, #030007 100%)'
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (revealRef.current) {
              revealRef.current.style.setProperty('--mx', `${x}px`);
              revealRef.current.style.setProperty('--my', `${y}px`);
            }
          }}
          onMouseLeave={() => {
            if (revealRef.current) {
              revealRef.current.style.setProperty('--mx', `-9999px`);
              revealRef.current.style.setProperty('--my', `-9999px`);
            }
          }}
        >
          {/* Background Image (Hover Reveal) */}
          {data.hero.background_image_url && (
            <img
              ref={revealRef}
              src={data.hero.background_image_url}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35,
                mixBlendMode: 'lighten',
                pointerEvents: 'none',
                '--mx': '-9999px',
                '--my': '-9999px',
                WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 120px, rgba(255,255,255,0.4) 220px, rgba(255,255,255,0) 320px)',
                maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.8) 120px, rgba(255,255,255,0.4) 220px, rgba(255,255,255,0) 320px)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                zIndex: 1
              }}
            />
          )}

          {/* LaserFlow Effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none'
            }}
          >
            <InstantLaserFlow
              dpr={1}
              horizontalBeamOffset={0}
              verticalBeamOffset={-0.22}
              verticalSizing={3.6}
              horizontalSizing={0.22}
              flowSpeed={0.22}
              flowStrength={0.45}
              wispDensity={1.6}
              wispSpeed={22}
              wispIntensity={7.5}
              fogIntensity={0.75}
              fogScale={0.45}
              fogFallSpeed={0.85}
              decay={1.35}
              falloffStart={1.6}
              color="#F2D9FF"
            />
          </div>

          {/* Hero Content Box */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '8%',
              transform: 'translateX(-50%)',
              width: '88%',
              maxWidth: '1200px',
              height: '58%',
              zIndex: 5
            }}
          >
            {/* Laser Contact Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-70px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '420px',
                height: '140px',
                background: 'radial-gradient(circle, rgba(230,183,255,1) 0%, rgba(230,183,255,0.45) 35%, rgba(230,183,255,0.15) 55%, transparent 70%)',
                filter: 'blur(45px)',
                zIndex: 6,
                pointerEvents: 'none'
              }}
            />

            {/* Content Box */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '26px',
                background: 'linear-gradient(180deg, rgba(10,0,20,0.92), rgba(6,0,14,0.97))',
                border: '1px solid rgba(230,183,255,0.55)',
                boxShadow: '0 0 0 1px rgba(230,183,255,0.2), 0 50px 140px rgba(180,120,255,0.35)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Inner Dotted Grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                  opacity: 0.35,
                  pointerEvents: 'none'
                }}
              />

              {/* Hero Content */}
              <div className="relative z-10 h-full w-full">
                {/* Check if we have a video URL, if so show video only, otherwise show text content */}
                {data.hero.video_url ? (
                  /* Full Box Video - No Text */
                  <iframe
                    src={data.hero.video_url}
                    title="Hero Video"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full rounded-[26px]"
                    style={{ position: 'relative', zIndex: 2 }}
                  />
                ) : (
                  /* Text Content (fallback when no video) */
                  <div className="h-full flex flex-col items-center justify-center text-center text-white p-4 sm:p-6 md:p-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      {data.hero.title}
                    </h1>
                    {data.hero.subtitle && (
                      <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 leading-relaxed max-w-4xl">
                        {data.hero.subtitle}
                      </p>
                    )}
                    {data.hero.bullet_points && data.hero.bullet_points.length > 0 && (
                      <ul className="space-y-3 text-base sm:text-lg md:text-xl max-w-2xl">
                        {data.hero.bullet_points.map((point, idx) => (
                          <li key={idx} className="flex items-center justify-center gap-3">
                            <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {data.partners.length > 0 && (
        <section className="py-8 sm:py-12 bg-gray-800 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8 text-white px-2">
              Benefit of Network of {data.partners.length}+ Partners
            </h2>
            <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 justify-center items-center flex-wrap px-2">
              {data.partners.map((partner) => (
                <div key={partner.id} className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] hover:border-purple-400/50">
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner Section */}
      {data.banner.length > 0 && (
        <section className="py-4 sm:py-6 md:py-8 bg-gray-900">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            {data.banner.map((banner) => (
              <div key={banner.id} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                <img 
                  src={banner.image_url} 
                  alt="Banner" 
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover" 
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      {data.features.length > 0 && (
        <section className="py-12 sm:py-14 md:py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-white px-2">
              Accept the change that make it grow
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {data.features.map((feature) => (
                <div key={feature.id} className="text-center px-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-purple-600/50 to-pink-600/50 flex items-center justify-center overflow-hidden border border-purple-400/30 shadow-lg shadow-purple-500/20">
                    <img 
                      src={feature.icon_url} 
                      alt={feature.title} 
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Slider Section */}
      {data.slides.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">{data.slides[currentSlide]?.heading}</h3>
                <p className="text-gray-300 leading-relaxed">{data.slides[currentSlide]?.body}</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                <img 
                  src={data.slides[currentSlide]?.image_url} 
                  alt={data.slides[currentSlide]?.heading}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length)}
                className="p-2 rounded-full bg-gray-700 shadow-md hover:bg-gray-600 text-white border border-gray-600 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {data.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-purple-500 w-8 shadow-lg shadow-purple-500/50' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % data.slides.length)}
                className="p-2 rounded-full bg-gray-700 shadow-md hover:bg-gray-600 text-white border border-gray-600 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Metrics Section */}
      {data.metrics.length > 0 && (
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12">
              {data.metrics.map((metric) => (
                <DonutChart
                  key={metric.id}
                  percentage={metric.primary_percentage}
                  label={metric.label}
                  color={metric.color}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resources Section */}
      {data.resources && (
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">{data.resources.heading}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{data.resources.description}</p>
                <a
                  href={data.resources.download_url}
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50 border border-purple-400/30"
                >
                  <Download className="w-5 h-5" />
                  {data.resources.button_text}
                </a>
              </div>
              {data.resources.image_url_9_16 && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={data.resources.image_url_9_16} 
                      alt="Resource"
                      className="rounded-2xl shadow-2xl w-80 h-[560px] object-cover border border-gray-700"
                    />
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-12 h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Business Deserves Section */}
      {data.businessDeserves && (
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">{data.businessDeserves.main_heading}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left: Numbered List */}
              <div className="space-y-4">
                {data.businessDeserves.left_points && data.businessDeserves.left_points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-purple-500/30">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300 pt-1">{point}</p>
                  </div>
                ))}
              </div>

              {/* Center: Image */}
              {data.businessDeserves.center_image_url_9_16 && (
                <div className="flex justify-center">
                  <img 
                    src={data.businessDeserves.center_image_url_9_16} 
                    alt="Business"
                    className="rounded-2xl shadow-2xl w-64 h-[448px] object-cover border border-gray-700"
                  />
                </div>
              )}

              {/* Right: Description */}
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">{data.businessDeserves.right_heading}</h3>
                <p className="text-lg text-gray-300 mb-4">{data.businessDeserves.right_subheading}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hire Blocks Section with Featured Professionals after first block */}
      {data.hireBlocks.length > 0 && (
        <>
          <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Hire the Best for your Perfect Project</h2>
              <div className="space-y-16">
                {/* First Hire Block */}
                {data.hireBlocks[0] && (
                  <div 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      data.hireBlocks[0].image_position === 'right' ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    <div className={data.hireBlocks[0].image_position === 'right' ? 'lg:col-start-2' : ''}>
                      <img 
                        src={data.hireBlocks[0].image_url} 
                        alt={data.hireBlocks[0].category_name}
                        className="rounded-2xl shadow-lg w-full h-80 object-cover border border-gray-700"
                      />
                    </div>
                    <div className={data.hireBlocks[0].image_position === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <h3 className="text-2xl font-bold mb-2 text-white">{data.hireBlocks[0].category_name}</h3>
                      <p className="text-xl text-gray-300 mb-4">{data.hireBlocks[0].description_title}</p>
                      <ul className="space-y-2">
                        {data.hireBlocks[0].bullet_points && data.hireBlocks[0].bullet_points.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Featured Professionals */}
          {data.professionals.length > 0 && (
            <section className="relative py-8 sm:py-12 md:py-16 bg-gray-900 overflow-hidden">
              {/* Subtle Effect */}
              <SimpleLaserFlow color="#8B5CF6" intensity={0.15} speed={0.5} />
              
              <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-white px-2">
                  Featured Professionals
                </h2>
                
                {/* Mobile Carousel (xs to md) */}
                <div className="block lg:hidden">
                  <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden rounded-xl">
                      <div 
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentProfessionalSlide * 100}%)` }}
                      >
                        {data.professionals.map((prof) => (
                          <div key={prof.id} className="w-full flex-shrink-0 flex justify-center px-4 sm:px-6">
                            <div className="w-full max-w-[280px] sm:max-w-[320px] h-[400px] sm:h-[450px] flex items-center justify-center">
                              <div className="w-full h-full">
                                <ProfileCard
                                  avatarUrl={prof.image_url}
                                  name={prof.name}
                                  title={prof.role}
                                  handle={prof.name.toLowerCase().replace(/\s+/g, '')}
                                  status="Available"
                                  contactText="View Details"
                                  onContactClick={() => setSelectedProfessional(prof)}
                                  behindGlowColor="rgba(139, 92, 246, 0.67)"
                                  innerGradient="linear-gradient(145deg, #60496e8c 0%, #8B5CF644 100%)"
                                  className="professional-card mobile-card"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Carousel Controls */}
                    {data.professionals.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentProfessionalSlide((prev) => 
                            prev === 0 ? data.professionals.length - 1 : prev - 1
                          )}
                          className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10 backdrop-blur-sm"
                          aria-label="Previous professional"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentProfessionalSlide((prev) => 
                            prev === data.professionals.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10 backdrop-blur-sm"
                          aria-label="Next professional"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 gap-2">
                          {data.professionals.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentProfessionalSlide(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentProfessionalSlide 
                                  ? 'bg-purple-500 w-6' 
                                  : 'bg-gray-600 hover:bg-gray-500'
                              }`}
                              aria-label={`Go to professional ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Desktop Grid (lg and up) */}
                <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {data.professionals.map((prof) => (
                    <ProfileCard
                      key={prof.id}
                      avatarUrl={prof.image_url}
                      name={prof.name}
                      title={prof.role}
                      handle={prof.name.toLowerCase().replace(/\s+/g, '')}
                      status="Available"
                      contactText="View Details"
                      onContactClick={() => setSelectedProfessional(prof)}
                      behindGlowColor="rgba(139, 92, 246, 0.67)"
                      innerGradient="linear-gradient(145deg, #60496e8c 0%, #8B5CF644 100%)"
                      className="professional-card w-full"
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Second Hire Block (Skilled Workforce) */}
          {data.hireBlocks.length > 1 && (
            <section className="py-16 bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-16">
                  <div 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      data.hireBlocks[1].image_position === 'right' ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    <div className={data.hireBlocks[1].image_position === 'right' ? 'lg:col-start-2' : ''}>
                      <img 
                        src={data.hireBlocks[1].image_url} 
                        alt={data.hireBlocks[1].category_name}
                        className="rounded-2xl shadow-lg w-full h-80 object-cover border border-gray-700"
                      />
                    </div>
                    <div className={data.hireBlocks[1].image_position === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <h3 className="text-2xl font-bold mb-2 text-white">{data.hireBlocks[1].category_name}</h3>
                      <p className="text-xl text-gray-300 mb-4">{data.hireBlocks[1].description_title}</p>
                      <ul className="space-y-2">
                        {data.hireBlocks[1].bullet_points && data.hireBlocks[1].bullet_points.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Teams Section */}
          {data.teams.length > 0 && (
            <section className="py-16 bg-gray-900">
              <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-white px-2">
                  Teams that make it possible
                </h2>
                
                {/* Mobile Carousel (xs to lg) */}
                <div className="block xl:hidden">
                  <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden rounded-xl">
                      <div 
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${(data.teams.findIndex((_, i) => i === currentTeamSlide) || 0) * 100}%)` }}
                      >
                        {data.teams.map((member, index) => {
                          const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
                          const borderColor = colors[index % colors.length];
                          
                          return (
                            <div key={member.id || index} className="w-full flex-shrink-0 flex justify-center px-4 sm:px-6">
                              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] h-[380px] sm:h-[420px] md:h-[460px] flex items-center justify-center">
                                <div 
                                  className="team-card w-full h-full rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                  style={{
                                    background: `linear-gradient(145deg, ${borderColor}22, rgb(16, 24, 40))`,
                                    border: `2px solid ${borderColor}`,
                                    boxShadow: `0 20px 40px ${borderColor}20`
                                  }}
                                >
                                  {/* Image Container */}
                                  <div className="relative h-3/5 overflow-hidden">
                                    <img 
                                      src={member.image_url || `https://i.pravatar.cc/300?img=${index + 1}`}
                                      alt={member.name}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div 
                                      className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                                      style={{
                                        background: `linear-gradient(145deg, ${borderColor}, transparent)`
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Info Container */}
                                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">
                                      {member.name}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-300 mb-2 truncate">
                                      {member.role || 'Team Member'}
                                    </p>
                                    <span 
                                      className="text-xs sm:text-sm font-medium opacity-80"
                                      style={{ color: borderColor }}
                                    >
                                      @{member.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}
                                    </span>
                                  </div>
                                  
                                  {/* Hover Effect Overlay */}
                                  <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                      background: `radial-gradient(circle at center, ${borderColor}15, transparent 70%)`
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Carousel Controls */}
                    {data.teams.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentTeamSlide((prev) => 
                            prev === 0 ? data.teams.length - 1 : prev - 1
                          )}
                          className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10 backdrop-blur-sm"
                          aria-label="Previous team member"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => setCurrentTeamSlide((prev) => 
                            prev === data.teams.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10 backdrop-blur-sm"
                          aria-label="Next team member"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 gap-2">
                          {data.teams.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentTeamSlide(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentTeamSlide 
                                  ? 'bg-blue-500 w-6' 
                                  : 'bg-gray-600 hover:bg-gray-500'
                              }`}
                              aria-label={`Go to team member ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Desktop ChromaGrid (xl and up) */}
                <div className="hidden xl:block">
                  <ChromaGrid 
                    items={data.teams.map((member, index) => {
                      // Generate a color palette for variety
                      const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
                      const borderColor = colors[index % colors.length];
                      
                      return {
                        image: member.image_url || `https://i.pravatar.cc/300?img=${index + 1}`,
                        title: member.name,
                        subtitle: member.role || 'Team Member',
                        handle: `@${member.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}`,
                        borderColor: borderColor,
                        gradient: `linear-gradient(145deg, ${borderColor}, rgb(16, 24, 40))`,
                        url: null // No URL since we don't have profile links in the schema
                      };
                    })}
                    columns={Math.min(data.teams.length, 4)}
                    radius={250}
                    damping={0.3}
                    fadeOut={0.4}
                    className="teams-chroma-grid"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Remaining Hire Blocks (3rd onwards) */}
          {data.hireBlocks.length > 2 && (
            <section className="py-16 bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-16">
                  {data.hireBlocks.slice(2).map((block) => (
                    <div 
                      key={block.id}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                        block.image_position === 'right' ? 'lg:grid-flow-dense' : ''
                      }`}
                    >
                      <div className={block.image_position === 'right' ? 'lg:col-start-2' : ''}>
                        <img 
                          src={block.image_url} 
                          alt={block.category_name}
                          className="rounded-2xl shadow-lg w-full h-80 object-cover border border-gray-700"
                        />
                      </div>
                      <div className={block.image_position === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                        <h3 className="text-2xl font-bold mb-2 text-white">{block.category_name}</h3>
                        <p className="text-xl text-gray-300 mb-4">{block.description_title}</p>
                        <ul className="space-y-2">
                          {block.bullet_points && block.bullet_points.map((point, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-300">
                              <span className="w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Testimonials Carousel */}
      {data.testimonials.length > 0 && (
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">What our clients say about us</h2>
            <div className="relative h-96 overflow-hidden">
              <div 
                ref={testimonialsRef}
                className="animate-scroll-up space-y-6"
              >
                {[...data.testimonials, ...data.testimonials].map((testimonial, idx) => (
                  <div key={`${testimonial.id}-${idx}`} className="bg-gray-700 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-600">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.avatar_url} 
                        alt={testimonial.client_name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-500"
                      />
                      <div>
                        <h4 className="font-bold text-white">{testimonial.client_name}</h4>
                        <p className="text-sm text-gray-300">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-200 italic">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comprehensive Solutions / Services */}
      {data.solutions.length > 0 && (
        <section id="services" className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Subtle Background Effect */}
          <SimpleLaserFlow color="#8B5CF6" intensity={0.15} speed={0.5} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our <span className="text-purple-400">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional services designed to accelerate your career growth
              </p>
            </div>

            {/* Chain Carousel for Services */}
            <ChainCarousel
              items={data.solutions.map((service, index) => {
                // Map service categories to appropriate icons
                const getServiceIcon = (category) => {
                  const categoryLower = (category || '').toLowerCase();
                  if (categoryLower.includes('development') || categoryLower.includes('coding')) return Code;
                  if (categoryLower.includes('business') || categoryLower.includes('consulting')) return Briefcase;
                  if (categoryLower.includes('team') || categoryLower.includes('management')) return Users;
                  if (categoryLower.includes('strategy') || categoryLower.includes('planning')) return Target;
                  if (categoryLower.includes('performance') || categoryLower.includes('optimization')) return Zap;
                  if (categoryLower.includes('security') || categoryLower.includes('protection')) return Shield;
                  return Briefcase; // Default icon
                };

                return {
                  id: service.id,
                  name: service.title,
                  icon: getServiceIcon(service.category),
                  details: service.category || 'Professional Service',
                  logo: service.image_url
                };
              })}
              scrollSpeedMs={2000}
              visibleItemCount={7}
              className="mb-16"
              onChainSelect={(serviceId, serviceName) => {
                console.log(`Selected service: ${serviceName} (ID: ${serviceId})`);
                // You can add custom logic here for service selection
              }}
            />
          </div>
        </section>
      )}

      {/* Professional Modal */}
      <AnimatePresence>
        {selectedProfessional && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProfessional(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl max-w-2xl w-full p-8 relative border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProfessional(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedProfessional.image_url} 
                  alt={selectedProfessional.name}
                  className="w-48 h-48 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">{selectedProfessional.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{selectedProfessional.role}</p>
                  <p className="text-gray-300 mb-4">{selectedProfessional.short_bio}</p>
                  {selectedProfessional.website_url && (
                    <a
                      href={selectedProfessional.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:underline"
                    >
                      Visit Website <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
        
        /* Mobile ProfileCard adjustments */
        @media (max-width: 1023px) {
          .mobile-card .pc-card {
            height: 380px !important;
            max-height: 380px !important;
            width: 100% !important;
            aspect-ratio: 0.718 !important;
          }
          
          .mobile-card .pc-user-info {
            --ui-inset: 16px !important;
            padding: 10px 12px !important;
            bottom: 16px !important;
            left: 16px !important;
            right: 16px !important;
          }
          
          .mobile-card .pc-contact-btn {
            padding: 8px 12px !important;
            font-size: 11px !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
          
          .mobile-card .pc-mini-avatar {
            width: 32px !important;
            height: 32px !important;
          }
          
          .mobile-card .pc-handle {
            font-size: 12px !important;
          }
          
          .mobile-card .pc-status {
            font-size: 10px !important;
          }
        }
        
        @media (max-width: 640px) {
          .mobile-card .pc-card {
            height: 360px !important;
            max-height: 360px !important;
          }
          
          .mobile-card .pc-user-info {
            --ui-inset: 14px !important;
            padding: 8px 10px !important;
            bottom: 14px !important;
            left: 14px !important;
            right: 14px !important;
          }
          
          .mobile-card .pc-contact-btn {
            padding: 6px 10px !important;
            font-size: 10px !important;
          }
          
          .mobile-card .pc-mini-avatar {
            width: 28px !important;
            height: 28px !important;
          }
        }
        
        @media (max-width: 480px) {
          .mobile-card .pc-card {
            height: 340px !important;
            max-height: 340px !important;
          }
          
          .mobile-card .pc-user-info {
            --ui-inset: 12px !important;
            padding: 6px 8px !important;
            bottom: 12px !important;
            left: 12px !important;
            right: 12px !important;
          }
          
          .mobile-card .pc-contact-btn {
            padding: 5px 8px !important;
            font-size: 9px !important;
          }
          
          .mobile-card .pc-mini-avatar {
            width: 24px !important;
            height: 24px !important;
          }
        }
        
        /* Team Card Mobile Styles */
        .team-card {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(145deg, var(--border-color, #4F46E5), transparent);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          pointer-events: none;
        }
        
        @media (max-width: 1279px) {
          .team-card {
            max-width: 100%;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 768px) {
          .team-card {
            height: 400px !important;
          }
        }
        
        @media (max-width: 640px) {
          .team-card {
            height: 380px !important;
          }
        }
        
        @media (max-width: 480px) {
          .team-card {
            height: 360px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketplaceRedesign;

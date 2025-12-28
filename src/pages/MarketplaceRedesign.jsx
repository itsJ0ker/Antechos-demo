import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, ChevronLeft, ChevronRight, X, Star, Briefcase, Code, Users, Target, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleLaserFlow from '../components/effects/SimpleLaserFlow';
import InstantLaserFlow from '../components/effects/InstantLaserFlow';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ChromaGrid from '../components/ChromaGrid/ChromaGrid';
import ServiceCarousel from '../components/ServiceCarousel/ServiceCarousel';
import ChainCarouselWithCards from '../components/ChainCarousel/ChainCarouselWithCards';
import Testimonials from '../components/Testimonials';
import BlogCarousel from '../components/BlogCarousel/BlogCarousel';

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
    teams: [],
    blogs: []
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProfessionalSlide, setCurrentProfessionalSlide] = useState(0);
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);
  const [selectedTeamCategory, setSelectedTeamCategory] = useState('All');
  
  // Partners carousel state
  const [isPartnersCarouselPaused, setIsPartnersCarouselPaused] = useState(false);

  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const testimonialsRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  // Reset team carousel when category changes
  useEffect(() => {
    setCurrentTeamSlide(0);
  }, [selectedTeamCategory]);

  const fetchAllData = async () => {
    try {
      // Fetch all data with individual error handling
      const heroRes = await supabase.from('marketplace_hero').select('*').single();
      const partnersRes = await supabase.from('marketplace_partners').select('*').eq('is_active', true).order('order_index');
      const bannerRes = await supabase.from('marketplace_banner').select('*').eq('is_active', true).order('order_index');
      const featuresRes = await supabase.from('marketplace_features').select('*').eq('is_active', true).order('order_index');
      const slidesRes = await supabase.from('marketplace_slides').select('*').eq('is_active', true).order('order_index');
      const metricsRes = await supabase.from('marketplace_metrics').select('*').eq('is_active', true).order('order_index');
      const businessRes = await supabase.from('marketplace_business_deserves').select('*').eq('is_active', true).single();
      const hireRes = await supabase.from('marketplace_hire_blocks').select('*').eq('is_active', true).order('order_index');
      const profRes = await supabase.from('marketplace_professionals').select('*').eq('is_active', true).order('order_index');
      const testimonialsRes = await supabase.from('marketplace_testimonials').select('*').eq('is_active', true).order('order_index');
      const solutionsRes = await supabase.from('marketplace_solutions').select('*').eq('is_active', true).order('order_index');
      const teamsRes = await supabase.from('marketplace_teams').select('*').eq('is_active', true).order('order_index');
      const blogsRes = await supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(10);

      setData({
        hero: heroRes.data,
        partners: partnersRes.data || [],
        banner: bannerRes.data || [],
        features: featuresRes.data || [],
        slides: slidesRes.data || [],
        metrics: metricsRes.data || [],
        businessDeserves: businessRes.data,
        hireBlocks: hireRes.data || [],
        professionals: profRes.data || [],
        testimonials: testimonialsRes.data || [],
        solutions: solutionsRes.data || [],
        teams: teamsRes.data || [],
        blogs: blogsRes.data || []
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const EnhancedDonutChart = ({ percentage, label, color = '#a855f7', description, icon }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    // Generate gradient colors based on the main color
    const getGradientColors = (baseColor) => {
      const colors = {
        '#a855f7': ['#a855f7', '#c084fc', '#e879f9'], // Purple gradient
        '#3b82f6': ['#3b82f6', '#60a5fa', '#93c5fd'], // Blue gradient
        '#10b981': ['#10b981', '#34d399', '#6ee7b7'], // Green gradient
        '#f59e0b': ['#f59e0b', '#fbbf24', '#fcd34d'], // Yellow gradient
        '#ef4444': ['#ef4444', '#f87171', '#fca5a5'], // Red gradient
        '#8b5cf6': ['#8b5cf6', '#a78bfa', '#c4b5fd'], // Violet gradient
      };
      return colors[baseColor] || colors['#a855f7'];
    };

    const gradientColors = getGradientColors(color);
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <motion.div 
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            transform: 'scale(1.5)'
          }}
        />
        
        {/* Main card container */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group-hover:transform group-hover:scale-105 shadow-xl">
          {/* Icon at top if provided */}
          {icon && (
            <div className="flex justify-center mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                  border: `1px solid ${color}60`
                }}
              >
                {React.createElement(icon, { 
                  className: "w-6 h-6", 
                  style: { color: color }
                })}
              </div>
            </div>
          )}

          {/* Enhanced SVG Chart */}
          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-36">
              <svg className="transform -rotate-90 w-36 h-36" viewBox="0 0 120 120">
                {/* Define gradient */}
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={gradientColors[0]} />
                    <stop offset="50%" stopColor={gradientColors[1]} />
                    <stop offset="100%" stopColor={gradientColors[2]} />
                  </linearGradient>
                  
                  {/* Glow filter */}
                  <filter id={`glow-${gradientId}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background circle */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  stroke="rgba(139, 92, 246, 0.15)" 
                  strokeWidth="8" 
                  fill="none" 
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  stroke={`url(#${gradientId})`}
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={circumference} 
                  strokeDashoffset={circumference}
                  strokeLinecap="round"
                  filter={`url(#glow-${gradientId})`}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  className="drop-shadow-lg"
                />
                
                {/* Inner decorative circle */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="25" 
                  stroke={color} 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.3"
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  className="text-3xl font-bold text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {percentage}%
                </motion.span>
                <div 
                  className="w-8 h-0.5 mt-1 rounded-full"
                  style={{ background: color }}
                />
              </div>
            </div>
          </div>

          {/* Label and description */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
              {label}
            </h3>
            {description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Animated progress bar at bottom */}
          <div className="mt-4 w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

//Benefit of Network of {data.partners.length}+ Partners

  return (
    <div className="min-h-screen bg-gray-900">
      {/* New Hero Section with LaserFlow */}
      {data.hero && (
        <section
          style={{
            position: 'relative',
            width: '100vw',
            height: '70vh',
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

          {/* LaserFlow Effect - Flows from top and connects to video box */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            {/* Desktop LaserFlow */}
            <div className="hidden md:block" style={{ width: '100%', height: '100%' }}>
              <InstantLaserFlow
                dpr={1}
                horizontalBeamOffset={0}
                verticalBeamOffset={-0.05}  // Start from very top
                verticalSizing={0.5}        // Much shorter - reduced from 3.8 to 3.0
                horizontalSizing={0.15}     // Narrower beam for precise connection
                flowSpeed={0.25}            // Smooth flowing speed
                flowStrength={0.7}          // Strong flow to show connection
                wispDensity={2.0}           // More wisps for energy effect
                wispSpeed={25}
                wispIntensity={8.5}
                fogIntensity={0.8}          // More fog for dramatic effect
                fogScale={0.35}
                fogFallSpeed={0.9}
                decay={1.2}                 // Less decay to maintain connection
                falloffStart={2.0}          // Extended falloff
                color="#F2D9FF"
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
            
            {/* Mobile LaserFlow */}
            <div className="block md:hidden" style={{ width: '100%', height: '100%' }}>
              <SimpleLaserFlow 
                color="#F2D9FF" 
                intensity={0.6} 
                speed={0.8} 
              />
            </div>
          </div>



          {/* Floating Particles */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  background: `rgba(230, 183, 255, ${Math.random() * 0.6 + 0.2})`,
                  borderRadius: '50%',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `float-${i % 3} ${Math.random() * 10 + 15}s infinite linear`,
                  boxShadow: '0 0 10px rgba(230, 183, 255, 0.5)'
                }}
              />
            ))}
          </div>

          {/* Animated Geometric Shapes */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            {/* Rotating Hexagons */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                width: '80px',
                height: '80px',
                border: '2px solid rgba(230, 183, 255, 0.3)',
                transform: 'rotate(45deg)',
                animation: 'spin 20s linear infinite',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: '8%',
                width: '60px',
                height: '60px',
                border: '1px solid rgba(230, 183, 255, 0.4)',
                transform: 'rotate(-30deg)',
                animation: 'spin-reverse 15s linear infinite',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
              }}
            />

            {/* Floating Triangles */}
            <div
              style={{
                position: 'absolute',
                top: '25%',
                left: '15%',
                width: '0',
                height: '0',
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderBottom: '35px solid rgba(230, 183, 255, 0.2)',
                animation: 'float-triangle 12s ease-in-out infinite'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '70%',
                right: '20%',
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '25px solid rgba(230, 183, 255, 0.25)',
                animation: 'float-triangle-reverse 10s ease-in-out infinite'
              }}
            />

            {/* Pulsing Circles */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                right: '25%',
                width: '100px',
                height: '100px',
                border: '1px solid rgba(230, 183, 255, 0.2)',
                borderRadius: '50%',
                animation: 'pulse-ring 8s ease-in-out infinite'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '70%',
                width: '60px',
                height: '60px',
                border: '2px solid rgba(230, 183, 255, 0.3)',
                borderRadius: '50%',
                animation: 'pulse-ring-reverse 6s ease-in-out infinite'
              }}
            />
          </div>

          {/* Subtle Grid Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              backgroundImage: `
                linear-gradient(rgba(230, 183, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(230, 183, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.4
            }}
          />

          {/* Corner Accent Glows */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(230, 183, 255, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(230, 183, 255, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <style>{`
            @keyframes float-0 {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              25% { transform: translateY(-20px) translateX(10px); }
              50% { transform: translateY(-10px) translateX(-15px); }
              75% { transform: translateY(-25px) translateX(5px); }
            }
            @keyframes float-1 {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              33% { transform: translateY(-15px) translateX(-10px); }
              66% { transform: translateY(-30px) translateX(8px); }
            }
            @keyframes float-2 {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              50% { transform: translateY(-20px) translateX(-12px); }
            }
            @keyframes spin {
              from { transform: rotate(45deg); }
              to { transform: rotate(405deg); }
            }
            @keyframes spin-reverse {
              from { transform: rotate(-30deg); }
              to { transform: rotate(-390deg); }
            }
            @keyframes float-triangle {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(180deg); }
            }
            @keyframes float-triangle-reverse {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(20px) rotate(-180deg); }
            }
            @keyframes pulse-ring {
              0%, 100% { transform: scale(1); opacity: 0.2; }
              50% { transform: scale(1.2); opacity: 0.4; }
            }
            @keyframes pulse-ring-reverse {
              0%, 100% { transform: scale(1.1); opacity: 0.3; }
              50% { transform: scale(0.9); opacity: 0.1; }
            }
          `}</style>

          {/* Hero Content Box */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '5%', // Moved down from 8% to 5%
              transform: 'translateX(-50%)',
              width: '88%',
              maxWidth: '1200px',
              height: '65%',
              zIndex: 5
            }}
          >
            {/* Laser Connection Glow - Where laser connects to video box */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '40px',
                background: 'radial-gradient(ellipse at center, rgba(242,217,255,0.9) 0%, rgba(242,217,255,0.5) 40%, transparent 70%)',
                filter: 'blur(15px)',
                zIndex: 6,
                pointerEvents: 'none'
              }}
            />

            {/* Intense connection point */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '20px',
                background: 'radial-gradient(ellipse at center, rgba(242,217,255,1) 0%, rgba(242,217,255,0.8) 30%, transparent 60%)',
                filter: 'blur(5px)',
                zIndex: 7,
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
              {/* Laser Connection Point - Top center where laser enters */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '30px',
                  background: 'linear-gradient(to bottom, rgba(242,217,255,0.6) 0%, rgba(242,217,255,0.3) 50%, transparent 100%)',
                  filter: 'blur(8px)',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}
              />

              {/* Connection entry line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(242,217,255,1) 50%, transparent 100%)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />

              {/* Inner Dotted Grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                  opacity: 0.35,
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
              {/* Hero Content */}
              <div className="relative z-10 h-full w-full">
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

      {/* Partners Section - Continuous Moving Carousel */}
      {data.partners.length > 0 && (
        <section 
          className="py-6 sm:py-8 border-t border-purple-900/30"
          style={{
            background: 'radial-gradient(ellipse at center, #160022 0%, #0a0014 50%, #030007 100%)'
          }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6 text-white px-2">
              Network & Partners
            </h2>
            
            {/* Partners Carousel Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center"
                style={{
                  width: 'fit-content',
                  animation: isPartnersCarouselPaused ? 'none' : 'scroll-left 30s linear infinite'
                }}
                onMouseEnter={() => setIsPartnersCarouselPaused(true)}
                onMouseLeave={() => setIsPartnersCarouselPaused(false)}
              >
                {/* Triple the partners for seamless infinite loop */}
                {[...data.partners, ...data.partners, ...data.partners].map((partner, index) => (
                  <div 
                    key={`partner-${partner.id}-${index}`} 
                    className="flex-shrink-0"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer group relative">
                      <img 
                        src={partner.logo_url} 
                        alt={partner.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      {/* Hover overlay with better shadow */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                           style={{
                             boxShadow: '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)',
                             border: '2px solid rgba(168, 85, 247, 0.5)'
                           }}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Subtle gradient overlays for better visual effect */}
              <div className="absolute left-0 top-0 w-8 sm:w-12 md:w-16 h-full bg-gradient-to-r from-[#160022] via-[#160022]/80 to-transparent pointer-events-none z-10"></div>
              <div className="absolute right-0 top-0 w-8 sm:w-12 md:w-16 h-full bg-gradient-to-l from-[#160022] via-[#160022]/80 to-transparent pointer-events-none z-10"></div>
            </div>
            
            {/* Optional: Pause indicator */}
            {isPartnersCarouselPaused && (
              <div className="text-center mt-2">
                <span className="text-xs text-gray-400 opacity-60">Carousel paused</span>
              </div>
            )}
          </div>
          
          {/* CSS Animation Styles */}
          <style>{`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-33.333%);
              }
            }
          `}</style>
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

      {/* Enhanced Metrics Section */}
      {data.metrics.length > 0 && (
        <section className="relative py-20 overflow-hidden">
          {/* Dynamic gradient background based on metrics */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
              `
            }}
          />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-10 w-20 h-20 border border-purple-500/20 rounded-full animate-pulse" />
            <div className="absolute top-40 right-20 w-16 h-16 border border-blue-500/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-green-500/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
            
            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Section header */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Impact</span> in Numbers
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Measurable results that showcase our commitment to excellence and innovation
              </p>
              
              {/* Decorative line */}
              <div className="flex justify-center mt-6">
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
              </div>
            </motion.div>

            {/* Enhanced metrics grid - Single line layout */}
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8 xl:gap-12">
              {data.metrics.map((metric, index) => {
                // Define enhanced metric data with icons and descriptions
                const enhancedMetrics = {
                  'Success Rate': { 
                    icon: Target, 
                    description: 'Projects completed successfully',
                    color: '#10b981'
                  },
                  'Client Satisfaction': { 
                    icon: Star, 
                    description: 'Happy clients worldwide',
                    color: '#f59e0b'
                  },
                  'Team Efficiency': { 
                    icon: Zap, 
                    description: 'Faster delivery times',
                    color: '#8b5cf6'
                  },
                  'Quality Assurance': { 
                    icon: Shield, 
                    description: 'Bug-free deployments',
                    color: '#3b82f6'
                  },
                  'Code Coverage': { 
                    icon: Code, 
                    description: 'Tested codebase',
                    color: '#ef4444'
                  },
                  'User Engagement': { 
                    icon: Users, 
                    description: 'Active user retention',
                    color: '#06b6d4'
                  }
                };

                // Get enhanced data or use defaults
                const metricKey = Object.keys(enhancedMetrics).find(key => 
                  metric.label.toLowerCase().includes(key.toLowerCase())
                ) || 'default';
                
                const enhanced = enhancedMetrics[metricKey] || {
                  icon: Briefcase,
                  description: 'Professional excellence',
                  color: metric.color || '#a855f7'
                };

                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <EnhancedDonutChart
                      percentage={metric.primary_percentage}
                      label={metric.label}
                      color={enhanced.color}
                      description={enhanced.description}
                      icon={enhanced.icon}
                    />
                  </motion.div>
                );
              })}
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

          {/* Comprehensive Solutions / Services */}
          {data.solutions.length > 0 && (
            <section id="services" className="relative bg-gray-800 overflow-hidden">
              {/* Different Background Effect for Services */}
              <SimpleLaserFlow color="#10B981" intensity={0.2} speed={0.7} />
              
              <div className="relative z-10">
                <div className="text-center mb-16 max-w-7xl mx-auto px-6 pt-20">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Our <span className="text-green-400">Services</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Professional services designed to accelerate your career growth
                  </p>
                </div>

                {/* Chain Carousel with Cards for Services */}
                <ChainCarouselWithCards
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
                      logo: service.image_url,
                      cardContent: (
                        <div className="text-gray-200 p-2">
                          <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                          <p className="text-gray-300 mb-4 text-base leading-relaxed">
                            {service.description || `Professional ${service.category} services designed to accelerate your career growth and enhance your professional capabilities.`}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-base">
                              <span className="text-gray-400 font-medium">Category:</span>
                              <span className="text-white font-semibold">{service.category}</span>
                            </div>
                            <div className="flex justify-between text-base">
                              <span className="text-gray-400 font-medium">Service Type:</span>
                              <span className="text-white font-semibold">Professional</span>
                            </div>
                            <div className="flex justify-between text-base">
                              <span className="text-gray-400 font-medium">Availability:</span>
                              <span className="text-green-400 font-semibold">Available Now</span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-600">
                              <div className="flex items-center justify-center">
                                <span className="text-gray-300 text-sm">Professional Service Excellence</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    };
                  })}
                  scrollSpeedMs={2000}
                  visibleItemCount={6}
                  width={500}
                  height={520}
                  delay={4000}
                  pauseOnHover={true}
                  onChainSelect={(service, index) => {
                    // Service selection disabled for display purposes
                    console.log(`Service viewed: ${service.name}`);
                  }}
                  // Removed onCardClick to make cards non-clickable
                />
              </div>
            </section>
          )}

          {/* Simple Service Cards Carousel */}
          {data.solutions.length > 0 && (
            <section className="relative py-16 bg-gray-800 overflow-hidden">
              {/* Same Background Effect as Our Services */}
              <SimpleLaserFlow color="#10B981" intensity={0.2} speed={0.7} />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <ServiceCarousel
                  services={data.solutions}
                  onViewDetails={(service) => {
                    console.log('View details for service:', service.title);
                    // You can add modal or navigation logic here
                    // For example: navigate to service detail page or open modal
                  }}
                />
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
            <section className="py-8 sm:py-12 lg:py-16 bg-gray-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 text-white">
                  Teams that make it possible
                </h2>
                
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  {/* Left Side - Category Selector */}
                  <div className="lg:w-1/4">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50">
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Filter by Category</h3>
                      
                      {/* Mobile: Horizontal scroll for categories */}
                      <div className="lg:hidden">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {['All', ...new Set(data.teams.map(member => member.category || 'General'))].map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedTeamCategory(category)}
                              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm transition-all duration-200 whitespace-nowrap ${
                                selectedTeamCategory === category
                                  ? 'bg-blue-600 text-white shadow-lg'
                                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                              }`}
                            >
                              {category}
                              <span className="ml-2 text-xs opacity-70">
                                {category === 'All' 
                                  ? data.teams.length 
                                  : data.teams.filter(member => (member.category || 'General') === category).length
                                }
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Desktop: Vertical list for categories */}
                      <div className="hidden lg:block space-y-2">
                        {['All', ...new Set(data.teams.map(member => member.category || 'General'))].map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedTeamCategory(category)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                              selectedTeamCategory === category
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                            }`}
                          >
                            {category}
                            <span className="float-right text-sm opacity-70">
                              {category === 'All' 
                                ? data.teams.length 
                                : data.teams.filter(member => (member.category || 'General') === category).length
                              }
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Team Cards Carousel */}
                  <div className="lg:w-3/4">
                    {(() => {
                      const filteredTeams = selectedTeamCategory === 'All' 
                        ? data.teams 
                        : data.teams.filter(member => (member.category || 'General') === selectedTeamCategory);
                      
                      // Responsive items per page
                      const getItemsPerPage = () => {
                        if (window.innerWidth < 640) return 1; // Mobile: 1 item
                        if (window.innerWidth < 1024) return 2; // Tablet: 2 items
                        return 4; // Desktop: 4 items (2x2 grid)
                      };
                      
                      const itemsPerPage = typeof window !== 'undefined' ? getItemsPerPage() : 4;
                      const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
                      const currentPage = Math.min(currentTeamSlide, totalPages - 1);
                      const startIndex = currentPage * itemsPerPage;
                      const currentPageTeams = filteredTeams.slice(startIndex, startIndex + itemsPerPage);

                      return (
                        <div className="relative">
                          {/* Team Cards Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
                            {currentPageTeams.map((member, index) => {
                              const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
                              const borderColor = colors[(startIndex + index) % colors.length];
                              
                              return (
                                <div key={member.id || index} className="flex justify-center">
                                  <div className="w-full max-w-[280px] sm:max-w-[300px] h-[180px] sm:h-[200px] lg:h-[220px]">
                                    <div 
                                      className="team-card w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                      style={{
                                        background: `linear-gradient(145deg, ${borderColor}22, rgb(16, 24, 40))`,
                                        border: `2px solid ${borderColor}`,
                                        boxShadow: `0 10px 30px ${borderColor}20`
                                      }}
                                    >
                                      {/* Image Container */}
                                      <div className="relative h-3/5 overflow-hidden">
                                        <img 
                                          src={member.image_url || `https://i.pravatar.cc/300?img=${(startIndex + index) + 1}`}
                                          alt={member.name}
                                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                          loading="lazy"
                                        />
                                        <div 
                                          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                                          style={{
                                            background: `linear-gradient(145deg, ${borderColor}, transparent)`
                                          }}
                                        />
                                      </div>
                                      
                                      {/* Info Container */}
                                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent">
                                        <h3 className="text-xs sm:text-sm font-bold text-white mb-1 truncate">
                                          {member.name}
                                        </h3>
                                        <p className="text-xs text-gray-300 mb-1 truncate">
                                          {member.role || 'Team Member'}
                                        </p>
                                        <div className="flex justify-between items-center gap-1">
                                          <span 
                                            className="text-xs font-medium opacity-80 truncate flex-1"
                                            style={{ color: borderColor }}
                                          >
                                            @{member.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}
                                          </span>
                                          <span className="text-xs text-gray-400 bg-gray-800/50 px-1.5 py-0.5 rounded text-center flex-shrink-0">
                                            {(member.category || 'General').length > 8 
                                              ? (member.category || 'General').substring(0, 8) + '...'
                                              : (member.category || 'General')
                                            }
                                          </span>
                                        </div>
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

                          {/* Carousel Controls */}
                          {totalPages > 1 && (
                            <>
                              <button
                                onClick={() => setCurrentTeamSlide((prev) => 
                                  prev === 0 ? totalPages - 1 : prev - 1
                                )}
                                className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10 backdrop-blur-sm"
                                aria-label="Previous team page"
                              >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                              <button
                                onClick={() => setCurrentTeamSlide((prev) => 
                                  prev === totalPages - 1 ? 0 : prev + 1
                                )}
                                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/90 hover:bg-gray-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all z-10 backdrop-blur-sm"
                                aria-label="Next team page"
                              >
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                              
                              {/* Dots Indicator */}
                              <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2">
                                {Array.from({ length: totalPages }, (_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentTeamSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      index === currentPage 
                                        ? 'bg-blue-500 w-4 sm:w-6' 
                                        : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                    aria-label={`Go to team page ${index + 1}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {/* No Results Message */}
                          {filteredTeams.length === 0 && (
                            <div className="flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px]">
                              <div className="text-center px-4">
                                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">No team members found</h3>
                                <p className="text-sm sm:text-base text-gray-500">Try selecting a different category</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
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

      {/* Enhanced Testimonials with 3D Scroll Effect */}
      {data.testimonials.length > 0 && (
        <Testimonials
          testimonials={data.testimonials}
          title="What our clients say about us"
        />
      )}

      {/* Blog Section */}
      {data.blogs.length > 0 && (
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Latest <span className="text-purple-400">Insights</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay updated with the latest trends, tips, and insights from our experts
              </p>
            </div>
            
            <BlogCarousel 
              blogs={data.blogs}
              autoPlay={true}
              autoPlayInterval={5000}
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

      <style>{`
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
          position: 'absolute';
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

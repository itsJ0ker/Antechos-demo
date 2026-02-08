import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Linkedin, Mail, Target, Eye, Heart, Award, Users, Rocket, Sparkles, TrendingUp, Globe, Zap, Star } from 'lucide-react';
import { LaserFlow } from '../components/effects/LaserFlow';
import { ParticleFieldEffect } from '../components/effects/ParticleFieldEffect';
import { ChromaGrid } from '../components/ChromaGrid/ChromaGrid';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Testimonials from '../components/Testimonials';
import { RippleEffect } from '../components/effects/RippleEffect';

const Aboutus = () => {
  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);
  const [stats, setStats] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeValue, setActiveValue] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamRes, valuesRes, statsRes, testimonialsRes, galleryRes] = await Promise.all([
        supabase.from('about_team').select('*').eq('is_active', true).order('display_order'),
        supabase.from('about_values').select('*').order('display_order'),
        supabase.from('about_stats').select('*').order('display_order'),
        supabase.from('testimonials').select('*').eq('is_active', true).order('display_order').limit(6),
        supabase.from('about_gallery').select('*').eq('is_active', true).order('display_order').limit(8)
      ]);
      
      setTeam(teamRes.data || []);
      setValues(valuesRes.data || []);
      setStats(statsRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setGallery(galleryRes.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-rotate values
  useEffect(() => {
    if (values.length > 0) {
      const interval = setInterval(() => {
        setActiveValue((prev) => (prev + 1) % values.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [values.length]);

  const valueIcons = {
    mission: <Rocket className="w-8 h-8" />,
    vision: <Eye className="w-8 h-8" />,
    values: <Heart className="w-8 h-8" />,
    innovation: <Sparkles className="w-8 h-8" />,
    excellence: <Award className="w-8 h-8" />,
    growth: <TrendingUp className="w-8 h-8" />
  };

  // Gallery images - use database or fallback to defaults
  const galleryImages = gallery.length > 0 ? gallery.map(img => ({
    url: img.image_url,
    caption: img.caption || 'Gallery Image'
  })) : [
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', caption: 'Team Collaboration' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', caption: 'Innovation Hub' },
    { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', caption: 'Strategic Planning' },
    { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', caption: 'Workshop Session' },
    { url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', caption: 'Creative Space' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', caption: 'Team Meeting' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', caption: 'Brainstorming' },
    { url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', caption: 'Learning Together' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with LaserFlow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* LaserFlow Background - Fixed positioning */}
        <div className="absolute inset-0 w-full h-full">
          <LaserFlow
            color="#8B5CF6"
            wispDensity={1.5}
            fogIntensity={0.6}
            flowSpeed={0.4}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8 animate-fade-in">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200 font-medium">Transforming Education Since 2020</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            We Are Innovators
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Empowering the next generation through cutting-edge education,{' '}
            <span className="text-purple-400 font-semibold">one student at a time</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg sm:text-xl text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 w-full sm:w-auto">
              <span className="relative z-10">Our Story</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button className="px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full font-bold text-lg sm:text-xl text-white hover:bg-white/20 transition-all hover:scale-105 w-full sm:w-auto">
              Join Our Team
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1.5 h-2.5 sm:w-2 sm:h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section with Particle Effect */}
      {stats.length > 0 && (
        <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="absolute inset-0 z-0 opacity-50">
            <ParticleFieldEffect color="#3B82F6" intensity={0.4} particleCount={40} />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Impact in Numbers</h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="group relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-2xl sm:rounded-3xl transition-all"></div>
                  <div className="relative">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-gray-300 font-semibold text-sm sm:text-base md:text-lg">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission, Vision, Values - Interactive Cards */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              What{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Drives Us
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Our core values shape everything we do, from how we teach to how we innovate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={value.id}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer"
                onMouseEnter={() => setActiveValue(index)}
              >
                <RippleEffect />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    {value.icon ? (
                      <span className="text-3xl sm:text-4xl">{value.icon}</span>
                    ) : (
                      valueIcons[value.type?.toLowerCase()] || <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs sm:text-sm font-semibold">
                      {value.type}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {value.description}
                  </p>

                  <div className="mt-4 sm:mt-6 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs sm:text-sm font-semibold">Learn More</span>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with ChromaGrid */}
      {team.length > 0 && (
        <section className="relative py-20 sm:py-24 bg-gradient-to-b from-black via-purple-950/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
                <Users className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200 font-medium">Meet the Dream Team</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                The Minds Behind{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Passionate educators, technologists, and visionaries working together to transform education
              </p>
            </div>

            {/* ChromaGrid for Team Display */}
            <div className="mb-16">
              <ChromaGrid
                items={team.map(member => ({
                  image: member.image_url || 'https://via.placeholder.com/400x600',
                  title: member.name,
                  subtitle: member.position,
                  handle: member.email ? `@${member.email.split('@')[0]}` : '',
                  borderColor: '#8B5CF6',
                  gradient: 'linear-gradient(145deg, #8B5CF6, #000)',
                  url: member.linkedin_url
                }))}
                radius={300}
                columns={3}
              />
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Life at{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Company
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">Moments that define our journey</p>
          </div>

          <div ref={galleryRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <p className="text-white font-semibold text-sm sm:text-base md:text-lg">{img.caption}</p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-xl sm:rounded-2xl transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              What{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                People Say
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">Hear from those who've experienced our impact</p>
          </div>
          
          <Testimonials testimonials={testimonials} title="" />
        </section>
      )}

      {/* CTA Section with LaserFlow */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* LaserFlow Background - Fixed positioning */}
        <div className="absolute inset-0 w-full h-full">
          <LaserFlow
            color="#EC4899"
            wispDensity={2}
            fogIntensity={0.7}
            flowSpeed={0.5}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-500/30 mb-6 sm:mb-8">
            <Star className="w-5 h-5 text-pink-300" />
            <span className="text-pink-200 font-medium">Join Our Mission</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-8">
            Ready to Make an{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Impact?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Whether you're a student, educator, or partner, there's a place for you in our journey to transform education
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button className="group relative px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-xl sm:text-2xl text-white overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/50 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Get Started <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </button>
            <button className="px-10 sm:px-12 py-5 sm:py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full font-bold text-xl sm:text-2xl text-white hover:bg-white/20 transition-all hover:scale-110 w-full sm:w-auto">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;

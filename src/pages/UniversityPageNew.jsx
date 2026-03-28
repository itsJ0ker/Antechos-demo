import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  GraduationCap, 
  MapPin, 
  ExternalLink, 
  Search, 
  Filter, 
  Award, 
  Building2, 
  Briefcase,
  Users,
  X,
  CheckCircle2,
  ChevronDown,
  Info,
  Lightbulb,
  Headphones,
  CreditCard,
  Rocket,
  Zap,
  ArrowRight,
  ShieldCheck,
  Globe,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { universities } from '../data/universities';

// --- PREMIUM ASSETS ---
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1523050335456-c4b4f65511ca?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop"
];

const TRUST_LOGOS = [
  { name: "UGC-DEB", label: "Approved Higher Education", icon: <ShieldCheck className="w-5 h-5" /> },
  { name: "NAAC A++", label: "Premium Accreditation", icon: <Award className="w-5 h-5" /> },
  { name: "AICTE", label: "Technical Excellence", icon: <CheckCircle2 className="w-5 h-5" /> }
];

const UNIVERSITY_LOGOS = [
  { name: "LPU Online", url: "https://www.lpuonline.com/images/logo.png", fallback: "LPU" },
  { name: "Sikkim Manipal", url: "https://www.smuniversity.edu.in/assets/logo.png", fallback: "SMU" },
  { name: "Amrita AHEAD", url: "https://onlineamrita.com/wp-content/uploads/2021/05/logo.png", fallback: "Amrita" },
  { name: "UPES ON", url: "https://www.upes.ac.in/logos/upes-logo.png", fallback: "UPES" },
  { name: "Sharda University", url: "https://www.sharda.ac.in/assets/images/logo.png", fallback: "Sharda" },
  { name: "Jain University", url: "https://www.jainuniversity.ac.in/assets/images/logo.png", fallback: "Jain" },
];

const WHY_CHOOSE_DATA = [
  {
    title: "Executive Counselling",
    desc: "Bespoke one-on-one guidance sessions with industry veterans for career path clarity.",
    icon: <Users className="w-7 h-7 text-indigo-600" />,
    color: "bg-indigo-50"
  },
  {
    title: "Institutional Analytics",
    desc: "Rigorous data comparison of ROI, placement trajectories, and global academic standings.",
    icon: <TrendingUp className="w-7 h-7 text-indigo-600" />,
    color: "bg-slate-50"
  },
  {
    title: "Compliance Support",
    desc: "End-to-end management of admission protocols and regulatory documentation.",
    icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Placement Intelligence",
    desc: "Exclusive access to corporate networking channels and specialized interview coaching.",
    icon: <Briefcase className="w-7 h-7 text-indigo-600" />,
    color: "bg-zinc-50"
  }
];

const UniversityPageNew = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All'); // Maps to uni.category (Private, Public, etc)
  const [filterStream, setFilterStream] = useState('All'); // Maps to searching in uni.programs
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  
  // Finder States
  const [finderStream, setFinderStream] = useState('All');
  
  const itemsPerPage = 12;

  // Hero background rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           uni.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'All' || uni.category === filterCategory;
      
      const academicStream = filterStream === 'All' ? finderStream : filterStream;
      const matchesStream = academicStream === 'All' || 
                           uni.programs.some(p => p.toLowerCase().includes(academicStream.toLowerCase()));
      
      const matchesPrograms = selectedPrograms.length === 0 || 
                             selectedPrograms.some(p => uni.programs.includes(p));
      
      return matchesSearch && matchesCategory && matchesStream && matchesPrograms;
    });
  }, [searchTerm, filterCategory, filterStream, finderStream, selectedPrograms]);

  const displayedUniversities = showAll 
    ? filteredUniversities 
    : filteredUniversities.slice(0, itemsPerPage);

  const handleUniversityClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      
      {/* 1. HERO SECTION: Optimized with Floating Badges & Animations */}
      <section className="relative h-[700px] md:h-[850px] overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${HERO_IMAGES[heroIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/20"></div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Trust Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[10%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">UGC DEB</p>
                <p className="text-white/60 text-[8px] font-bold">Approved Institutions</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-[15%] bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest">NAAC A++</p>
                <p className="text-white/60 text-[8px] font-bold">Top Tier Quality</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-10 shadow-2xl shadow-indigo-600/40"
            >
              <Activity className="w-4 h-4 animate-pulse" />
              Live Admission Status: Open for 2026
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-6xl md:text-[6.5rem] font-black text-white leading-[0.9] mb-12 tracking-tighter"
            >
              The Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500">Academic Standard.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-3xl text-slate-300 font-medium max-w-2xl mb-16 leading-relaxed"
            >
              Engineered pathways to North America's and India's top-tier universities. Data-backed, student-verified.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-8"
            >
              <button className="group bg-indigo-600 hover:bg-indigo-700 text-white font-black px-14 py-6 rounded-2xl shadow-2xl shadow-indigo-600/40 transition-all flex items-center gap-4 text-xl">
                <span>Start Application</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white font-black px-14 py-6 rounded-2xl transition-all text-xl">
                View Institutions
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="absolute bottom-0 left-0 w-full bg-slate-900/50 backdrop-blur-md border-t border-white/5 py-3 overflow-hidden">
           <div className="flex items-center gap-12 whitespace-nowrap animate-marquee px-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                   <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">UPES Dehradun Application Deadline: April 15th</span>
                   <span className="text-white/20 mx-4">|</span>
                   <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Sikkim Manipal Admission: 50% Scholarship Available</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 2. LOGO CAROUSEL: "Infinite Institutions" */}
      <section className="bg-white py-14 overflow-hidden relative border-b border-slate-100">
        <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
          {[...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-6 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group">
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-10 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <span className="hidden text-slate-400 font-black tracking-widest text-xs uppercase group-hover:text-indigo-600">{logo.fallback}</span>
              <span className="text-slate-900 font-black tracking-tight text-xl">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SMART FINDER: "Toolbox Interface" */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
               <Rocket className="w-96 h-96 text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                <div className="max-w-xl">
                  <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Algorithm 4.0</span>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">University Intelligence Engine</h2>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">Match your profile with thousands of institutional data points in real-time.</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                   <div className="text-right">
                      <p className="text-white font-black text-xl">18+</p>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Catalogued Units</p>
                   </div>
                   <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-indigo-400" />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Academic Vertical</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-3xl font-black focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer hover:bg-white/10 transition-all text-sm"
                    value={finderStream}
                    onChange={(e) => setFinderStream(e.target.value)}
                  >
                    <option className="bg-slate-900">All</option>
                    <option className="bg-slate-900">Management</option>
                    <option className="bg-slate-900">Engineering</option>
                    <option className="bg-slate-900">Law</option>
                    <option className="bg-slate-900">Medical</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Fee Structure</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-3xl font-black focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer hover:bg-white/10 transition-all text-sm">
                    <option className="bg-slate-900">Standard Allocation</option>
                    <option className="bg-slate-900">Premium Programs</option>
                    <option className="bg-slate-900">Government Funded</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Degree Duration</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-3xl font-black focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer hover:bg-white/10 transition-all text-sm">
                    <option className="bg-slate-900">Normal Policy</option>
                    <option className="bg-slate-900">Compressed Route</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                   <button className="w-full bg-white text-slate-900 font-black p-6 rounded-3xl shadow-xl transition-all hover:bg-slate-100 flex items-center justify-center gap-3 group active:scale-95">
                     <Zap className="w-5 h-5 text-indigo-600 fill-current group-hover:scale-125 transition-transform" />
                     <span className="uppercase tracking-widest text-xs">Analyze Selection</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIVERSITY GRID: Optimized Visibility */}
      <section className="py-24 bg-white" id="directory">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-24">
            <div className="text-center md:text-left">
              <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Archive 2026</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-0 font-display">Institution Portfolio</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100">
              {['All', 'Private', 'Public', 'Deemed'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    filterCategory === cat 
                      ? "bg-slate-900 text-white shadow-2xl" 
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedUniversities.map((uni) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 hover:border-indigo-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
              >
                 <div className="relative h-72 overflow-hidden">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                       <span className="bg-white/90 backdrop-blur-md text-slate-900 py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">{uni.category}</span>
                       <span className="bg-indigo-600 text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Top Rated</span>
                    </div>
                    <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md text-white p-2 px-4 rounded-2xl flex items-center gap-2 font-black text-xs border border-white/10">
                      <Star className="w-4 h-4 text-orange-400 fill-current" />
                      {uni.rating}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                 </div>
                 
                 <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-6">
                       <MapPin className="w-4 h-4 text-indigo-600" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{uni.location}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-6 font-display group-hover:text-indigo-600 transition-colors uppercase leading-[1.1]">{uni.name}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">{uni.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-10">
                       {uni.programs.map((p, i) => (
                         <span key={i} className="text-[9px] font-black text-slate-400 border border-slate-100 p-2 px-4 rounded-xl uppercase tracking-[0.1em]">{p}</span>
                       ))}
                    </div>

                    <div className="mt-auto">
                       <button 
                         onClick={() => handleUniversityClick(uni.link)}
                         className="w-full flex items-center justify-between group/btn bg-slate-900 hover:bg-indigo-600 text-white p-6 rounded-[2rem] transition-all duration-500"
                       >
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Full Institution Intel</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination/Load More */}
          <div className="mt-24 flex flex-col items-center gap-8">
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
              Viewing {displayedUniversities.length} of {filteredUniversities.length} Accredited Units
            </p>
            {!showAll && filteredUniversities.length > itemsPerPage && (
              <button 
                onClick={() => setShowAll(true)}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-black px-16 py-6 rounded-[2.5rem] shadow-xl transition-all active:scale-95 flex items-center gap-4 group"
              >
                <span>Synchronize All Entities</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-2 transition-transform" />
              </button>
            )}
            {showAll && (
               <button 
                onClick={() => setShowAll(false)}
                className="text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] transition-all border-b border-transparent hover:border-indigo-600 pb-1"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 5. ADVISORY PANEL */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="bg-indigo-600 rounded-[5rem] p-12 md:p-32 relative overflow-hidden flex flex-col items-center text-center text-white shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="relative z-10 max-w-4xl">
                <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-[0.9]">Transform your <br /> Academic Trajectory.</h2>
                <p className="text-indigo-100 text-xl md:text-3xl font-medium mb-16 leading-relaxed">Book a session with senior admissions engineers and secure your future in minutes.</p>
                <button className="bg-white text-indigo-600 font-black px-16 py-8 rounded-[2rem] text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Book Free Strategic Counsel
                </button>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default UniversityPageNew;

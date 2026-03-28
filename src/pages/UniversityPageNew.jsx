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
import { universities as staticUniversities } from '../data/universities';
import { getUniversities } from '../lib/supabase';

/* ─── Inline CSS ─────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  :root {
    --accent: #38BDF8;
    --accent-light: #7DD3FC;
    --dark: #0A0C0F;
    --dark-2: #0F1318;
    --dark-3: #161C24;
    --card-bg: #FFFFFF;
    --border: rgba(56,189,248,0.1);
  }

  .uni-page-new { font-family: 'DM Sans', sans-serif; background: #FFF; color: var(--dark); }
  .uni-page-new h1, .uni-page-new h2, .uni-page-new h3, .uni-page-new h4 { font-family: 'Sora', sans-serif; }
  
  .section-label {
    display: inline-flex; alignItems: center; gap: 8px;
    padding: 6px 16px; background: rgba(56,189,248,0.08);
    border: 1px solid rgba(56,189,248,0.2); borderRadius: 100px;
    fontSize: 12px; fontWeight: 700; color: var(--accent);
    letterSpacing: '0.05em'; textTransform: 'uppercase'; marginBottom: 16px;
  }

  .grid-pattern {
    position: absolute; inset: 0; 
    backgroundImage: linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), 
                     linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px);
    backgroundSize: 50px 50px; pointerEvents: none;
  }
`;

const SectionLabel = ({ children, icon: Icon }) => (
  <div className="section-label flex items-center gap-2 mb-6">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    <span className="tracking-[0.15em] font-black uppercase text-[10px]">{children}</span>
  </div>
);

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

const OFFICIAL_COURSES = [
  { name: "Online MBA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=MBAonine", icon: <Briefcase className="w-5 h-5" />, badge: "UGC Approved" },
  { name: "Online BBA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBBA", icon: <TrendingUp className="w-5 h-5" />, badge: "Industry Lead" },
  { name: "Online MCA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMCA", icon: <Zap className="w-5 h-5" />, badge: "Tech Accredited" },
  { name: "Online BCA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCA", icon: <Rocket className="w-5 h-5" />, badge: "Skill Based" },
  { name: "Online MA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-ma?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMA", icon: <GraduationCap className="w-5 h-5" />, badge: "Research Led" },
  { name: "Online BA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-ba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBA", icon: <Globe className="w-5 h-5" />, badge: "Diverse Curriculum" },
  { name: "Online M.Com", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mcom?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMCom", icon: <CreditCard className="w-5 h-5" />, badge: "Finance Focused" },
  { name: "Online B.Com", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bcom?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCom", icon: <Activity className="w-5 h-5" />, badge: "Business Foundation" },
  // PROFESSIONAL & TECH SERIES
  { name: "Block Chain (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-blockchain?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseBlockchain", icon: <ShieldCheck className="w-5 h-5" />, badge: "Web3 Mastery" },
  { name: "Cyber Security (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-cyber-security?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseCyberSecurity", icon: <ShieldCheck className="w-5 h-5" />, badge: "Security Vetting" },
  { name: "Dev Ops (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-devops?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseDEVOPS", icon: <Zap className="w-5 h-5" />, badge: "Deployment Ready" },
  { name: "AI & Machine Learning", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-ai-machine-learning?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseAInML", icon: <Lightbulb className="w-5 h-5" />, badge: "Deep Intelligence" },
  { name: "UI & UX Design", category: "Certification", link: "https://courses.universityadmission.co.in/epgp-ui-ux-design-online?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=UIUXcertification", icon: <Star className="w-5 h-5" />, badge: "Experience Strategy" },
  { name: "Generative AI (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-epg-diploma-certificate-generative-ai?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseGENERATIVEAI", icon: <Rocket className="w-5 h-5" />, badge: "Future Proof" },
  { name: "Data Science & Analytics", category: "Certification", link: "https://courses.universityadmission.co.in/online-epg-diploma-certificate-data-science-analytics?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=CourseDSA", icon: <TrendingUp className="w-5 h-5" />, badge: "Big Data Elite" },
  { name: "Gen AI & Agentic AI", category: "Certification", link: "https://courses.universityadmission.co.in/generative-ai-and-agentic-ai-programs-online?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseGenAI", icon: <Activity className="w-5 h-5" />, badge: "Advanced Agents" },

  { name: "Online M.Sc", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-msc?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMSc", icon: <Info className="w-5 h-5" />, badge: "Advanced Science" },
  { name: "Online B.Sc", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bsc?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBSc", icon: <Star className="w-5 h-5" />, badge: "Foundational Science" },
  { name: "Online Dual MBA", category: "Special", link: "https://courses.universityadmission.co.in/online-mba-dual-specialization?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=DualMBA", icon: <Briefcase className="w-5 h-5" />, badge: "Expert Specialization" },
  { name: "Integrated BBA + MBA", category: "Integrated Program", link: "https://courses.universityadmission.co.in/online-integrated-bba-mba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBBAMBA", icon: <TrendingUp className="w-5 h-5" />, badge: "Fast Track" },
  { name: "Integrated BCA + MCA", category: "Integrated Program", link: "https://courses.universityadmission.co.in/online-integrated-bca-mca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCAMCA", icon: <Zap className="w-5 h-5" />, badge: "Technical Mastery" },
  { name: "Integrated B.Com + MBA", category: "Integrated Program", link: "https://courses.universityadmission.co.in/online-integrated-bcom-mba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBComMBA", icon: <CreditCard className="w-5 h-5" />, badge: "Corporate Ready" },
  { name: "Online PGDM", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/pgdm-online?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlinePGDM", icon: <Briefcase className="w-5 h-5" />, badge: "AIMA Approved" },
  { name: "PhD for Professionals", category: "Special", link: "https://courses.universityadmission.co.in/phd-for-working-professionals?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlinePHDworkProf", icon: <Award className="w-5 h-5" />, badge: "Working Pro Specialized" },
  { name: "Pay After Placement", category: "Special", link: "https://courses.universityadmission.co.in/pay-after-placement?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlinePayAfterPlacement", icon: <Lightbulb className="w-5 h-5" />, badge: "Risk Free Education" },
];

import EnquiryPopup from '../components/sections/PopupForm';

const UniversityPageNew = () => {
  const [universities, setUniversities] = useState(staticUniversities);
  const [showAll, setShowAll] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStream, setFilterStream] = useState('All');
  const [courseType, setCourseType] = useState('All');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
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
      const matchesSearch = (uni.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filterCategory === 'All' || uni.category === filterCategory;

      const academicStream = filterStream === 'All' ? finderStream : filterStream;
      const matchesStream = academicStream === 'All' ||
        uni.programs?.some(p => p.toLowerCase().includes(academicStream.toLowerCase()));

      const matchesPrograms = selectedPrograms.length === 0 ||
        selectedPrograms.some(p => uni.programs?.includes(p));

      return matchesSearch && matchesCategory && matchesStream && matchesPrograms;
    });
  }, [universities, searchTerm, filterCategory, filterStream, finderStream, selectedPrograms]);

  const displayedUniversities = showAll
    ? filteredUniversities
    : filteredUniversities.slice(0, itemsPerPage);

  const filteredCourses = useMemo(() => {
    return OFFICIAL_COURSES.filter(course => courseType === 'All' || course.category === courseType);
  }, [courseType]);

  const handleUniversityClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

  return (
    <div className="uni-page-new min-h-screen">
      <style>{styles}</style>

      {/* 1. HERO SECTION */}
      <section className="relative h-[700px] md:h-[850px] overflow-hidden flex items-center bg-slate-900">
        <div className="grid-pattern"></div>
        
        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%) pointer-events-none"></div>
        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%) pointer-events-none"></div>

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
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <SectionLabel icon={Activity}>Strategic Academic Intelligence 2026</SectionLabel>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="text-6xl md:text-[7rem] font-black text-white leading-[0.85] mb-12 tracking-tighter"
            >
              Academic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">Transcendence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-3xl text-slate-300 font-medium max-w-2xl mb-16 leading-relaxed"
            >
              A higher standard of institutional intelligence. Engineered for leaders, curated for success.
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

        <div className="absolute bottom-0 left-0 w-full bg-slate-900/50 backdrop-blur-md border-t border-white/5 py-3 overflow-hidden">
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee px-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">UPES Dehradun Application Deadline: April 15th</span>
                <span className="text-white/20 mx-4">|</span>
                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Sikkim Manipal Admission: 50% Scholarship Available</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS (From About Page) */}
      <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '18k', label: 'Certified Leaders', suffix: '+' },
              { val: '95', label: 'Placement Trajectory', suffix: '%' },
              { val: '50', label: 'Partner Institutions', suffix: '+' },
              { val: '4.9', label: 'Average Evaluation', suffix: '/5' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group"
              >
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                  {stat.val}{stat.suffix}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LOGO CAROUSEL */}
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
              <span className="hidden text-slate-400 font-black tracking-widest text-xs uppercase group-hover:text-blue-600">{logo.fallback}</span>
              <span className="text-slate-900 font-black tracking-tight text-xl">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SMART FINDER */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <Rocket className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                <div className="max-w-xl">
                  <SectionLabel icon={Zap}>Intelligence Algorithm 4.0</SectionLabel>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">University Intelligence Engine</h2>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">Match your profile with thousands of institutional data points.</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                  <div className="text-right">
                    <p className="text-white font-black text-xl">18+</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Catalogued Units</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Academic Vertical</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-3xl font-black focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    value={finderStream}
                    onChange={(e) => setFinderStream(e.target.value)}
                  >
                    <option className="bg-slate-900">All</option>
                    <option className="bg-slate-900">Management</option>
                    <option className="bg-slate-900">Engineering</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Fee Structure</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-3xl font-black focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                    <option className="bg-slate-900">Any</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Degree Duration</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white p-6 rounded-3xl font-black focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                    <option className="bg-slate-900">Any</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <button className="w-full bg-white text-slate-900 font-black p-6 rounded-3xl shadow-xl transition-all hover:bg-slate-100 flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5 text-blue-600 fill-current" />
                    <span className="uppercase tracking-widest text-xs">Analyze Selection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OFFICIAL PROGRAM PORTFOLIOS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <SectionLabel icon={Award}>Curriculum Standards 2026</SectionLabel>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter">Strategic Program <span className="text-blue-600">Intelligence.</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100">
               {['All', 'Integrated Program', 'Certification', 'Masters (PG)', "Bachelor's (UG)", 'Special'].map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setCourseType(tab)}
                  className={`px-6 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                    courseType === tab ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
                  }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          <div className="relative">
            {!showAllPrograms && (
              <div className="flex justify-end mb-4 pr-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-2 animate-pulse">
                  <ArrowRight className="w-3 h-3" />
                  Drag to Explore Catalog
                </span>
              </div>
            )}
            {!showAllPrograms ? (
              <motion.div 
                className="flex gap-8 cursor-grab active:cursor-grabbing pb-12 overflow-x-hidden touch-pan-x"
                drag="x"
                dragConstraints={{ right: 0, left: -((filteredCourses.length - 1) * 350) }}
                whileTap={{ cursor: "grabbing" }}
              >
                {filteredCourses.map((course, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex-shrink-0 w-[350px] relative bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] hover:border-indigo-100 hover:bg-white hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 group-hover:text-indigo-600 text-slate-400 transition-all">
                      {course.icon}
                    </div>
                    <div className="mb-10">
                       <span className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">{course.badge}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight uppercase">{course.name}</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-12">{course.category} Certification</p>
                    <button 
                      onClick={() => handleUniversityClick(course.link)}
                      className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em] group"
                    >
                      <span>Secure Enrollment</span>
                      <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredCourses.map((course, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] hover:border-indigo-100 hover:bg-white hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="absolute top-6 right-6 opacity-40 text-slate-400">
                      {course.icon}
                    </div>
                    <div className="mb-10">
                       <span className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">{course.badge}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight uppercase">{course.name}</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-12">{course.category} Certification</p>
                    <button 
                      onClick={() => handleUniversityClick(course.link)}
                      className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em]"
                    >
                      <span>Secure Enrollment</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!showAllPrograms && (
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
            )}
          </div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              className="group bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-200 font-extrabold px-16 py-6 rounded-[2.5rem] shadow-xl transition-all flex items-center gap-6"
            >
              <span className="text-[10px] uppercase tracking-[0.4em]">
                {showAllPrograms ? "Reduce Master Catalog" : "Synchronize Full Portfolio"}
              </span>
              <div className={`transition-transform duration-500 ${showAllPrograms ? "rotate-180" : "group-hover:translate-y-2"}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Subtle background ornamentation */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* 6. WHY CHOOSE: "Executive Feature Set" */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 border-b border-slate-200 pb-12">
            <div className="max-w-2xl">
              <SectionLabel icon={TrendingUp}>The Antechos Advantage</SectionLabel>
              <h2 className="text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tight leading-none">Why Choose <span className="text-blue-600">Antechos</span> <br /> for Distance Learning?</h2>
            </div>
            <p className="text-slate-500 font-semibold text-lg max-w-sm leading-relaxed">Systematic engineering of educational pathways for high-potential individuals through India's premier consulting network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {WHY_CHOOSE_DATA.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -12 }}
                className="group p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className={`w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 transform group-hover:rotate-12 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 font-display">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. UNIVERSITY GRID */}
      <section className="py-24 bg-white" id="directory">
        <div className="container mx-auto px-6">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-24">
            <div className="text-center md:text-left">
              <SectionLabel icon={Building2}>Institution Archive 2026</SectionLabel>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter">Academic <span className="text-blue-600">Portfolio.</span></h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm">
              {['All', 'Private', 'Public', 'Deemed'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filterCategory === cat
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
                className="group flex flex-col bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">{uni.category}</span>
                    <span className="bg-blue-600 text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Top Rated</span>
                  </div>
                  <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md text-white p-2 px-4 rounded-2xl flex items-center gap-2 font-black text-xs border border-white/10">
                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                    {uni.rating}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{uni.location}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 font-display group-hover:text-blue-600 transition-colors uppercase leading-[1.1]">{uni.name}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">{uni.description}</p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {uni.programs.map((p, i) => (
                      <span key={i} className="text-[9px] font-black text-slate-400 border border-slate-100 p-2 px-4 rounded-xl uppercase tracking-[0.1em]">{p}</span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => handleUniversityClick(uni.link)}
                      className="w-full flex items-center justify-between group/btn bg-slate-900 hover:bg-blue-600 text-white p-6 rounded-[2rem] transition-all duration-500"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Full Institution Intel</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                className="text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] transition-all border-b border-transparent hover:border-blue-600 pb-1"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 8. ADVISORY PANEL */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[5rem] p-12 md:p-32 relative overflow-hidden flex flex-col items-center text-center text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="grid-pattern opacity-10"></div>
            
            <div className="relative z-10 max-w-4xl">
              <SectionLabel icon={Rocket}>Direct Counsel Available</SectionLabel>
              <h2 className="text-5xl md:text-[6.5rem] font-black mb-12 tracking-tighter uppercase leading-[0.85]">Transform your <br /> Academic <span className="text-blue-500">Trajectory.</span></h2>
              <button 
                onClick={() => setShowEnquiry(true)}
                className="bg-blue-600 text-white font-black px-16 py-8 rounded-[2rem] text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-blue-700"
              >
                Book Free Strategic Counsel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY MODAL */}
      <AnimatePresence>
        {showEnquiry && (
          <EnquiryPopup 
            onClose={() => setShowEnquiry(false)}
            onSubmit={() => console.log('Enquiry Sent from University Page')}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default UniversityPageNew;

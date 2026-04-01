import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Building2,
  Search,
  MapPin,
  GraduationCap,
  Star,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Zap,
  Rocket,
  ChevronDown,
  Award,
  Info,
  TrendingUp,
  Globe,
  CreditCard,
  Activity,
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  Mail,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Filter,
  Lightbulb
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

  @keyframes marquee { 
    from { transform: translateX(0); } 
    to { transform: translateX(-50%); } 
  }
  
  .animate-marquee { 
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite; 
  }

  @media (max-width: 768px) {
    .animate-marquee { 
      animation: marquee 15s linear infinite; 
    }
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
  "https://i.ibb.co/yc5sqVnw/be65068c-9959-4394-9e69-f63f9526271f.jpg",
  "https://i.ibb.co/nqScDwxV/c687a0ff-9444-4401-a677-dcfa7a83b34c.jpg",
  "https://i.ibb.co/BVt60Wzb/3f983d9b-5985-42bd-b73c-c5d4985dc100.jpg",
  "https://i.ibb.co/gZyjnbKS/d593a5d8-3a69-4a69-894d-625df826d339.jpg",
  "https://i.ibb.co/CKFBqM8k/4827edca-062f-4d88-bee2-94ccad2c0622.jpg",
  "https://i.ibb.co/rfchMpqt/9c67c950-4b88-4a48-8c99-5e92c1e82ed9.jpg",
  "https://i.ibb.co/0jG1X0Tn/76f5a1ed-52ee-4bda-a603-cd513c8bdd3c.jpg",
  "https://i.ibb.co/S4JFQLTn/07e3524e-cf9b-47a7-87fa-712a918b3e75.jpg"
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
    icon: <Users className="w-7 h-7 text-blue-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Institutional Analytics",
    desc: "Rigorous data comparison of ROI, placement trajectories, and global academic standings.",
    icon: <TrendingUp className="w-7 h-7 text-blue-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Compliance Support",
    desc: "End-to-end management of admission protocols and regulatory documentation.",
    icon: <ShieldCheck className="w-7 h-7 text-blue-600" />,
    color: "bg-blue-50"
  },
  {
    title: "Placement Intelligence",
    desc: "Exclusive access to corporate networking channels and specialized interview coaching.",
    icon: <Briefcase className="w-7 h-7 text-blue-600" />,
    color: "bg-blue-50"
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

const TESTIMONIALS = [
  {
    name: "Aditi Rao",
    details: "MBA Student • Online Batch 2024",
    img: "https://i.pravatar.cc/150?u=aditi",
    text: "I was confused between multiple online MBA programs. The comparison tool and expert career advice from Antechos made my decision crystal clear. Highly recommend their guidance!"
  },
  {
    name: "Rohan Khanna",
    details: "MCA Professional • Batch 2024",
    img: "https://i.pravatar.cc/150?u=rohan",
    text: "The technical specialization counseling helped me identify exactly which Cloud program would boost my salary. Antechos isn't just counseling; it's career engineering."
  }
];

import EnquiryPopup from '../components/sections/PopupForm';

const UniversityPageNew = () => {
  const [universities, setUniversities] = useState(staticUniversities);
  const [showAll, setShowAll] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [programIndex, setProgramIndex] = useState(0);
  const [programScroll, setProgramScroll] = useState(0);
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStream, setFilterStream] = useState('All');
  const [courseType, setCourseType] = useState('All');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [finderStream, setFinderStream] = useState('All');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const strategicIntelligenceRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToStrategicIntelligence = (e) => {
    e.preventDefault();
    strategicIntelligenceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const itemsPerPage = 12;

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
    return courseType === 'All'
      ? OFFICIAL_COURSES
      : OFFICIAL_COURSES.filter(c => c.category === courseType);
  }, [courseType]);

  // Auto-play for Program Portfolio
  useEffect(() => {
    if (showAllPrograms) return;
    const interval = setInterval(() => {
      setProgramIndex((prev) => {
        const next = prev + 1;
        return next >= filteredCourses.length ? 0 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [showAllPrograms, filteredCourses.length]);

  // Auto-play for Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleUniversityClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

  return (
    <div className="uni-page-new min-h-screen">
      <style>{styles}</style>

      {/* 1. HERO SECTION */}
      <section className="relative h-[650px] sm:h-[700px] md:h-[850px] overflow-hidden flex items-center bg-slate-900">
        <div className="grid-pattern"></div>

        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%) pointer-events-none"></div>
        <div className="absolute bottom-[-15%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%) pointer-events-none"></div>

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
            <div className="absolute inset-0 bg-slate-900/30"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 relative z-10 pt-10 sm:pt-20">
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
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-black text-white leading-[0.95] sm:leading-[0.85] mb-8 md:mb-12 tracking-tighter"
            >
              Academic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">Transcendence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg sm:text-xl md:text-3xl text-slate-300 font-medium max-w-2xl mb-12 md:mb-16 leading-relaxed"
            >
              A higher standard of institutional intelligence. Engineered for leaders, curated for success.
            </motion.p>

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
        <div className="flex items-center gap-10 md:gap-24 whitespace-nowrap animate-marquee">
          {[...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 md:h-12 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
              <span className="hidden text-slate-400 font-black tracking-widest text-[9px] md:text-xs uppercase group-hover:text-blue-600">{logo.fallback}</span>
              <span className="text-slate-900 font-black tracking-tight text-lg md:text-2xl">{logo.name}</span>
            </div>
          ))}
        </div>
      </section>



      {/* 5. STRATEGIC GUIDANCE SECTION (NEW) */}
      <section className="py-12 md:py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-purple-50 text-purple-600 rounded-full border border-purple-100 mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest font-display">Your Future Starts Here</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.2] md:leading-[1.1] tracking-tighter max-w-5xl font-display"
          >
            Best Online Colleges & <span className="text-purple-500">Career <br className="hidden md:block" /> Guidance</span> in <span className="text-orange-500 underline underline-offset-8 decoration-4 md:decoration-8 decoration-orange-500/20">India</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base md:text-xl font-medium max-w-3xl mb-12 leading-relaxed px-4"
          >
            Get personalized online degree recommendations, expert admission counselling, and clear paths to your dream career. As an independent educational guidance platform, we help you make informed decisions for your distance learning journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-16 md:mb-20 w-full md:w-auto"
          >
            <button
              onClick={() => setShowEnquiry(true)}
              className="w-full md:w-auto px-12 py-5 md:py-6 bg-orange-500 text-white font-black rounded-2xl shadow-[0_15px_40px_-10px_rgba(249,115,22,0.4)] hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-3"
            >
              Get Free Counselling
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#strategic-intelligence"
              onClick={scrollToStrategicIntelligence}
              className="w-full md:w-auto px-12 py-5 md:py-6 bg-white text-slate-900 border border-slate-200 font-black rounded-2xl hover:bg-slate-50 transition-all text-[11px] uppercase tracking-widest text-center"
            >
              Explore Courses
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {[
              { val: '50000', label: 'of Students Guided', suffix: '+' },
              { val: '500', label: 'Partner Universities', suffix: '+' },
              { val: '95', label: 'Admission Success', suffix: '+' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-rose-100/50 shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className="text-4xl md:text-6xl font-black text-slate-900 mb-4 font-display group-hover:scale-110 transition-transform">
                  {stat.val}{stat.suffix}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 6. OFFICIAL PROGRAM PORTFOLIOS */}
      <section ref={strategicIntelligenceRef} className="py-12 md:py-24 bg-white relative overflow-hidden" id="strategic-intelligence">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-20">
            <div className="max-w-2xl text-left">
              <SectionLabel icon={Award}>Curriculum Standards 2026</SectionLabel>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter">Strategic Program <span className="text-blue-600">Intelligence.</span></h2>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 bg-slate-50 p-2 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 w-full md:w-auto">
              {['All', 'Integrated Program', 'Certification', 'Masters (PG)', "Bachelor's (UG)", 'Special'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setCourseType(tab)}
                  className={`flex-grow md:flex-grow-0 px-4 md:px-6 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${courseType === tab ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
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
              <div className="overflow-hidden relative">
                <motion.div
                  className="flex gap-6 md:gap-8 pb-12 cursor-grab active:cursor-grabbing touch-pan-x"
                  animate={{ x: -(programIndex * (windowWidth < 768 ? 300 + 24 : 380 + 32)) }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  drag="x"
                  dragConstraints={{
                    right: 0,
                    left: -((filteredCourses.length - 1) * (windowWidth < 768 ? 312 + 24 : 380 + 32))
                  }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50;
                    if (offset.x < -swipeThreshold) setProgramIndex(prev => Math.min(prev + 1, filteredCourses.length - 1));
                    if (offset.x > swipeThreshold) setProgramIndex(prev => Math.max(prev - 1, 0));
                  }}
                >
                  {filteredCourses.map((course, idx) => (
                    <motion.div
                      key={idx}
                      className="flex-shrink-0 w-[300px] md:w-[380px] relative bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-700"
                    >
                      <div className="absolute top-8 right-8 opacity-40 group-hover:opacity-100 group-hover:text-blue-600 text-slate-400 transition-all">
                        {course.icon}
                      </div>
                      <div className="mb-10">
                        <span className="bg-white text-blue-600 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-50 shadow-sm">{course.badge}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight uppercase text-left">{course.name}</h3>
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-12 text-left">{course.category} Certification</p>
                      <button
                        onClick={() => handleUniversityClick(course.link)}
                        className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 md:py-6 rounded-2xl transition-all flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em] group"
                      >
                        <span>Secure Enrollment</span>
                        <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Navigation Indicators */}
                <div className="flex justify-center gap-2 mt-0">
                  {filteredCourses.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setProgramIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${programIndex === i ? "bg-blue-500 w-8" : "bg-slate-200 w-2"}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredCourses.map((course, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="absolute top-6 right-6 opacity-40 text-slate-400">
                      {course.icon}
                    </div>
                    <div className="mb-8 md:mb-10">
                      <span className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-blue-100">{course.badge}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-tight uppercase text-left">{course.name}</h3>
                    <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-10 md:mb-12 text-left">{course.category} Certification</p>
                    <button
                      onClick={() => handleUniversityClick(course.link)}
                      className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 md:py-5 rounded-2xl transition-all flex items-center justify-center gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em]"
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

          <div className="mt-12 md:mt-16 flex justify-center">
            <button
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              className="group bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-200 font-extrabold px-10 md:px-16 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] shadow-xl transition-all flex items-center gap-4 md:gap-6"
            >
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
                {showAllPrograms ? "Reduce Master Catalog" : "Synchronize Full Portfolio"}
              </span>
              <div className={`transition-transform duration-500 ${showAllPrograms ? "rotate-180" : "group-hover:translate-y-2"}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        {/* Subtle background ornamentation */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* 7. WHY CHOOSE: "Executive Feature Set" */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-20 border-b border-slate-200 pb-12">
            <div className="max-w-2xl text-left">
              <SectionLabel icon={TrendingUp}>The Antechos Advantage</SectionLabel>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tight leading-[1.1]">Why Choose <span className="text-blue-600">Antechos</span> <br className="hidden md:block" /> for Distance Learning?</h2>
            </div>
            <p className="text-slate-500 font-semibold text-base md:text-lg max-w-sm leading-relaxed text-left">Systematic engineering of educational pathways for high-potential individuals through India's premier consulting network.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {WHY_CHOOSE_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12 }}
                className="group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 md:mb-10 transform group-hover:rotate-12 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6 font-display text-left">{item.title}</h3>
                <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed text-left">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SMART FINDER */}
      <section className="py-12 md:py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[2rem] md:rounded-[4rem] p-6 sm:p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] hidden md:block">
              <Rocket className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-20">
                <div className="max-w-xl text-left">
                  <SectionLabel icon={Zap}>Intelligence Algorithm 4.0</SectionLabel>
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight">University Intelligence Engine</h2>
                  <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed">Match your profile with thousands of institutional data points.</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 w-full md:w-auto">
                  <div className="text-right flex-grow md:flex-grow-0">
                    <p className="text-white font-black text-xl">18+</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Catalogued Units</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Academic Vertical</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 text-white p-5 md:p-6 rounded-3xl font-black focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-sm"
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
                  <select className="w-full bg-white/5 border border-white/10 text-white p-5 md:p-6 rounded-3xl font-black focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-sm">
                    <option className="bg-slate-900">Any</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Degree Duration</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white p-5 md:p-6 rounded-3xl font-black focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-sm">
                    <option className="bg-slate-900">Any</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end pt-4 md:pt-0">
                  <button className="w-full bg-white text-slate-900 font-black p-5 md:p-6 rounded-3xl shadow-xl transition-all hover:bg-slate-100 flex items-center justify-center gap-3">
                    <Zap className="w-5 h-5 text-blue-600 fill-current" />
                    <span className="uppercase tracking-widest text-[10px]">Analyze Selection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. UNIVERSITY GRID */}
      <section className="py-12 md:py-24 bg-white" id="directory">
        <div className="container mx-auto px-6">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16 md:mb-24">
            <div className="text-center md:text-left">
              <SectionLabel icon={Building2}>Institution Archive 2026</SectionLabel>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter">Academic <span className="text-blue-600">Portfolio.</span></h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 bg-white p-2 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm w-full md:w-auto">
              {['All', 'Private', 'Public', 'Deemed'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`flex-grow md:flex-grow-0 px-6 md:px-10 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filterCategory === cat
                    ? "bg-slate-900 text-white shadow-2xl"
                    : "text-slate-400 hover:text-slate-900"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {displayedUniversities.map((uni) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-slate-100 hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-60 md:h-72 overflow-hidden">
                  <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 py-2 px-4 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">{uni.category}</span>
                    <span className="bg-blue-600 text-white py-2 px-4 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">Top Rated</span>
                  </div>
                  <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md text-white p-2 px-4 rounded-2xl flex items-center gap-2 font-black text-[10px] md:text-xs border border-white/10">
                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                    {uni.rating}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-grow text-left">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{uni.location}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 font-display group-hover:text-blue-600 transition-colors uppercase leading-[1.1]">{uni.name}</h3>
                  <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed mb-8 line-clamp-3">{uni.description}</p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {uni.programs.map((p, i) => (
                      <span key={i} className="text-[8px] md:text-[9px] font-black text-slate-400 border border-slate-100 p-2 px-4 rounded-xl uppercase tracking-[0.1em]">{p}</span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => handleUniversityClick(uni.link)}
                      className="w-full flex items-center justify-between group/btn bg-slate-900 hover:bg-blue-600 text-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500"
                    >
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Full Institution Intel</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 flex flex-col items-center gap-6 md:gap-8">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Viewing {displayedUniversities.length} of {filteredUniversities.length} Accredited Units
            </p>
            {!showAll && filteredUniversities.length > itemsPerPage && (
              <button
                onClick={() => setShowAll(true)}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-black px-12 md:px-16 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] shadow-xl transition-all active:scale-95 flex items-center gap-4 group"
              >
                <span className="text-[10px] uppercase tracking-widest">Synchronize All Entities</span>
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

      {/* 9. SUCCESS STORIES */}
      <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <SectionLabel icon={Users}>Student Impact Reports</SectionLabel>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tighter uppercase font-display">Students Who <span className="text-purple-600">Found Their Path</span></h2>
          <p className="text-slate-500 font-medium text-base md:text-xl mb-12 md:mb-16">Hear from students who transformed their careers with our guidance</p>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="bg-white rounded-[2rem] md:rounded-[4rem] p-6 sm:p-12 md:p-24 shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-left relative overflow-hidden"
              >
                <div className="absolute top-12 right-12 opacity-[0.05] hidden md:block">
                  <span className="text-[10rem] font-serif leading-none select-none">“</span>
                </div>

                <div className="w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0 rounded-full border-4 md:border-8 border-slate-50 overflow-hidden shadow-2xl">
                  <img
                    src={TESTIMONIALS[testimonialIndex].img}
                    className="w-full h-full object-cover"
                    alt="Student"
                  />
                </div>

                <div className="flex-grow">
                  <div className="text-slate-400 mb-6 md:mb-8 hidden md:block">
                    <span className="text-5xl font-serif">“</span>
                  </div>
                  <p className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-10 leading-relaxed italic">
                    {TESTIMONIALS[testimonialIndex].text}
                  </p>

                  <div className="mb-6">
                    <p className="text-xl md:text-2xl font-black text-slate-900 font-display">{TESTIMONIALS[testimonialIndex].name}</p>
                    <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{TESTIMONIALS[testimonialIndex].details}</p>
                  </div>

                  <div className="flex gap-1 text-orange-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-current" />)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-8 -right-2 sm:-right-8 flex justify-between pointer-events-none px-2 sm:px-0">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${testimonialIndex === i ? "bg-purple-600 w-6 md:w-8" : "bg-slate-200"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2026 TRENDING SPECIALIZATIONS */}
      <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-20">
            <div className="max-w-2xl text-left">
              <SectionLabel icon={TrendingUp}>Market Velocity 2026</SectionLabel>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tighter font-display uppercase">Best <span className="text-orange-500">Trending <br /> Specialization</span> <br className="hidden md:block" /> of 2026</h2>
              <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed">These emerging fields offer exciting opportunities for professionals to drive impactful change and lead the future of innovation.</p>
            </div>
            <div className="hidden md:flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-slate-900 font-black text-xs uppercase tracking-widest">High Volatility</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Career Surge Zones</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MBA in Project Management",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
                salary: "9-14 LPA",
                desc: "A 2-year strategic program that helps students and working professionals excel in organizational logistics and leadership."
              },
              {
                title: "Data Science & AI Intelligence",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                salary: "12-22 LPA",
                desc: "Deep-dive into predictive algorithms, neural networks, and automated intelligence pipelines."
              },
              {
                title: "Cyber Security & Defense",
                img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
                salary: "10-18 LPA",
                desc: "Master the art of digital perimeter defense, ethical hacking, and real-time threat neutralization."
              }
            ].map((spec, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className="h-60 overflow-hidden relative">
                  <img src={spec.img} alt={spec.title} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900">Specialization</div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 font-display group-hover:text-blue-600 transition-colors uppercase leading-tight text-left">{spec.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3 text-left">{spec.desc}</p>

                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 mb-8 text-left">
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Avg. Salary</p>
                    <p className="text-blue-600 font-black text-xl">₹ {spec.salary}</p>
                  </div>

                  <button className="flex items-center gap-2 group/link text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-all text-left">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover/link:animate-ping"></div>
                    Explore Intel
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. QUESTIONS? WE CAN HELP */}
      <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] hidden md:block">
              <Mail className="w-64 h-64 text-blue-600" />
            </div>

            <div className="relative z-10 max-w-2xl text-left w-full">
              <SectionLabel icon={Mail}>Strategic Liaison</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Questions? <span className="text-blue-500">We can help.</span></h2>
              <p className="text-slate-500 font-medium text-base md:text-lg mb-0 text-left">Connect with our executive advisors for a personalized analysis of your educational needs. We are here to simplify your path.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-4 relative z-10 w-full md:w-auto">
              <button
                onClick={() => setShowEnquiry(true)}
                className="w-full md:w-auto bg-slate-900 text-white font-black px-10 py-5 md:py-6 rounded-2xl flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-xl"
              >
                <span className="text-[10px] uppercase tracking-widest">Instant Strategic Connect</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-white object-cover" alt="Advisor" />
                ))}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">+12</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. ADVISORY PANEL */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] md:rounded-[5rem] p-12 md:p-32 relative overflow-hidden flex flex-col items-center text-center text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="grid-pattern opacity-10"></div>

            <div className="relative z-10 max-w-4xl">
              <SectionLabel icon={Rocket}>Direct Counsel Available</SectionLabel>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[6rem] font-black mb-10 md:mb-12 tracking-tighter uppercase leading-[1] md:leading-[0.9]">Transform your <br className="hidden md:block" /> Academic <span className="text-blue-500">Trajectory.</span></h2>
              <button
                onClick={() => setShowEnquiry(true)}
                className="w-full md:w-auto bg-blue-600 text-white font-black px-10 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-[2rem] text-lg md:text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-blue-700"
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

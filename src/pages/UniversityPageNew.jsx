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
   Lightbulb,
   Layers,
   Target
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { universities as staticUniversities } from '../data/universities';
import { getUniversities, submitEnquiry } from '../lib/supabase';
import { Phone } from 'lucide-react';
import CountUp from 'react-countup';

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

  .uni-page-new { 
    font-family: 'DM Sans', sans-serif; 
    background: #FFF; 
    color: var(--dark); 
    width: 100%; 
    max-width: 100vw; 
    overflow-x: clip; 
    contain: paint;
    position: relative;
  }
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
    will-change: transform;
  }

  .marquee-container {
    width: 100%;
    max-width: 100vw;
    overflow: hidden !important;
    overflow-x: clip !important;
    contain: layout paint;
    position: relative;
    pointer-events: auto;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
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

// --- PREMIUM ASSETS (Cloudinary Powered) ---
const CLOUDINARY_BASE = "https://res.cloudinary.com/dsflodf9l/image/upload"; // Replace with your cloud name

const getHeroUrl = (id) => ({
   desktop: `${CLOUDINARY_BASE}/w_1920,h_1080,c_fill,g_center,q_auto,f_auto/${id}`,
   mobile: `${CLOUDINARY_BASE}/w_900,h_1350,c_fill,g_center,q_auto,f_auto/${id}`,
});

const HERO_IMAGES = [
   getHeroUrl("amity_university_online_courses_and_admission_2025_image_li8tuk"), // Replace with your actual public IDs
   getHeroUrl("manipal-uni_isqpno"),
   getHeroUrl("lpu-campus_lj84zd"),
   getHeroUrl("f2071aedbd3de17ed6243f18e12c42b0_dadr6b"),
   getHeroUrl("amity_university_online_courses_and_admission_2025_image_li8tuk"),
];

const TRUST_LOGOS = [
   { name: "UGC-DEB", label: "Approved Higher Education", icon: <ShieldCheck className="w-5 h-5" /> },
   { name: "NAAC A++", label: "Premium Accreditation", icon: <Award className="w-5 h-5" /> },
   { name: "AICTE", label: "Technical Excellence", icon: <CheckCircle2 className="w-5 h-5" /> }
];

const UNIVERSITY_LOGOS = [
   "https://i.ibb.co/PvtBVM1P/Whats-App-Image-2026-04-04-at-8-38-11-PM.jpg",
   "https://i.ibb.co/Vcg8mfy2/Whats-App-Image-2026-04-04-at-8-38-12-PM-1.jpg",
   "https://i.ibb.co/4Z6KVFNs/Whats-App-Image-2026-04-04-at-8-38-12-PM.jpg",
   "https://i.ibb.co/9kdms5S3/Whats-App-Image-2026-04-04-at-8-38-13-PM.jpg",
   "https://i.ibb.co/RGvF2NjM/Whats-App-Image-2026-04-04-at-8-38-14-PM-1.jpg",
   "https://i.ibb.co/qM9fXWwY/Whats-App-Image-2026-04-04-at-8-38-14-PM.jpg",
   "https://i.ibb.co/VcS7bmxZ/Whats-App-Image-2026-04-04-at-8-38-15-PM-1.jpg",
   "https://i.ibb.co/35G78khZ/Whats-App-Image-2026-04-04-at-8-38-15-PM.jpg",
   "https://i.ibb.co/0ykRZtKm/Whats-App-Image-2026-04-04-at-8-38-16-PM-1.jpg",
   "https://i.ibb.co/zHXXVh25/Whats-App-Image-2026-04-04-at-8-38-16-PM.jpg",
   "https://i.ibb.co/7x8qWdSk/Whats-App-Image-2026-04-04-at-8-38-18-PM-1.jpg",
   "https://i.ibb.co/kVjbmWdX/Whats-App-Image-2026-04-04-at-8-38-18-PM.jpg",
   "https://i.ibb.co/Kcr4bqn4/Whats-App-Image-2026-04-04-at-8-38-19-PM.jpg",
   "https://i.ibb.co/wNjKSM0V/Whats-App-Image-2026-04-04-at-8-38-20-PM.jpg",
   "https://i.ibb.co/8g1r6psW/Whats-App-Image-2026-04-04-at-8-38-21-PM.jpg",
   "https://i.ibb.co/JFzFnBCB/Whats-App-Image-2026-04-04-at-8-38-22-PM.jpg",
   "https://i.ibb.co/RGtT7wGb/Whats-App-Image-2026-04-04-at-8-38-09-PM.jpg"
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

const HELP_CARDS = [
   {
      title: "Strategic Guidance Path.",
      desc: "Get personalized university recommendations based on your goals and budget with our AI-backed algorithm.",
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      color: "from-blue-600/20 to-transparent"
   },
   {
      title: "Decision Intelligence.",
      desc: "Stop the endless search. Compare curriculums, rankings, and faculty data side-by-side with clarity.",
      icon: <Layers className="w-8 h-8 text-blue-400" />,
      color: "from-blue-700/20 to-transparent"
   },
   {
      title: "Financial Logistics.",
      desc: "Affordable education is a priority. Find institutional partners offering premium zero-cost EMI facilities.",
      icon: <CreditCard className="w-8 h-8 text-blue-400" />,
      color: "from-blue-800/20 to-transparent"
   },
   {
      title: "Career Velocity Boost.",
      desc: "We prioritize your ROI. Explore academic programs with dedicated job portals and 100% hiring support.",
      icon: <Target className="w-8 h-8 text-blue-400" />,
      color: "from-indigo-700/20 to-transparent"
   }
];

const FEATURES_DATA = [
   { img: "https://i.ibb.co/DfBNQfmt/Whats-App-Image-2026-04-04-at-1-00-18-AM.jpg", text: "Boost your degree while keeping your job" },
   { img: "https://i.ibb.co/pr54yJQR/Whats-App-Image-2026-04-04-at-1-00-52-AM.jpg", text: "Network Anywhere Everywhere" },
   { img: "https://i.ibb.co/XfK7wCZn/Whats-App-Image-2026-04-04-at-1-02-51-AM.jpg", text: "Brand Value with Real Life Perks" },
   { img: "https://i.ibb.co/Lhhp99qh/Whats-App-Image-2026-04-04-at-1-04-34-AM.jpg", text: "Top tier faculty and Industry Experts" },
   { img: "https://i.ibb.co/tPPDQJDG/Whats-App-Image-2026-04-04-at-1-05-51-AM.jpg", text: "Practical Application with Sandbox Environment" },
   { img: "https://i.ibb.co/qFyBxPrf/Whats-App-Image-2026-04-04-at-1-08-37-AM.jpg", text: "Capstone Projects, Stimulations and Real life Case Studies" },
   { img: "https://i.ibb.co/cXktscqj/Whats-App-Image-2026-04-04-at-1-09-02-AM.jpg", text: "Campus Visit, Personalised Experience and Real Exposure" },
   { img: "https://i.ibb.co/xK7ZJ5ts/Whats-App-Image-2026-04-04-at-1-11-01-AM.jpg", text: "Scholarships and Easy EMI Options" },
   { img: "https://i.ibb.co/67DHpZ8B/Whats-App-Image-2026-04-04-at-1-12-42-AM.jpg", text: "Career services from Resume to Opportunities" },
   { img: "https://i.ibb.co/1G227gzF/Whats-App-Image-2026-04-04-at-1-13-32-AM.jpg", text: "Growth - Salary, Promotions & Switch" },
   { img: "https://i.ibb.co/nspK9xt5/Whats-App-Image-2026-04-04-at-1-14-26-AM.jpg", text: "Placement Opportunity with Virtual Hiring Drives" },
   { img: "https://i.ibb.co/3yKxXmjc/Whats-App-Image-2026-04-04-at-1-16-12-AM.jpg", text: "100% Online, Zero Travel Required" },
   { img: "https://i.ibb.co/VWHND6fQ/Whats-App-Image-2026-04-04-at-1-17-05-AM.jpg", text: "Live & Recorded Lectures, Fully Flexible Curriculum" },
   { img: "https://i.ibb.co/QvdrfLjd/Whats-App-Image-2026-04-04-at-1-19-08-AM.jpg", text: "Smart spend, World Class Degrees" },
   { img: "https://i.ibb.co/HDM7Hm9j/Whats-App-Image-2026-04-04-at-12-58-07-AM.jpg", text: "Access to Top Global Universities" }
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

const FAQ_DATA = [
   {
      question: "What is Antechos?",
      answer: "Antechos is a platform where individuals can compare 100+ online universities and find the best online program with the help of expert counsellors."
   },
   {
      question: "Does Antechos charge for counselling?",
      answer: "No, Antechos provides free expert guidance and counselling to students and professionals."
   },
   {
      question: "How can Antechos help me to apply to the best university?",
      answer: "Antechos's experts offer one-on-one counselling to guide you in selecting the best university that matches your priorities and budget."
   },
   {
      question: "What is ClikPick, and how does it help?",
      answer: "ClikPick is a smart comparison tool designed to simplify decision-making related to online programs and universities."
   },
   {
      question: "Can I get personalized advice from Antechos?",
      answer: "Yes, the counsellors analyse your priorities and goals to help you find the best program and university within your budget."
   },
   {
      question: "Is online education worth it?",
      answer: "Yes, online education is worth it for learners seeking flexibility, affordability, and recognized degrees while balancing work, family, or other commitments."
   },
   {
      question: "What is the difference between a regular MBA and an online MBA?",
      answer: "A regular MBA requires on-campus attendance, whereas an online MBA offers flexible digital learning with the same curriculum, ideal for working professionals."
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
   const [skipProgramAnimation, setSkipProgramAnimation] = useState(false);
   const [programScroll, setProgramScroll] = useState(0);
   const [showAllPrograms, setShowAllPrograms] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [filterCategory, setFilterCategory] = useState('All');
   const [filterStream, setFilterStream] = useState('All');
   const [courseType, setCourseType] = useState('All');
   const [selectedPrograms, setSelectedPrograms] = useState([]);
   const [heroIndex, setHeroIndex] = useState(0);
   const [finderStream, setFinderStream] = useState('All');
   const [helpIndex, setHelpIndex] = useState(0);
   const [featuresIndex, setFeaturesIndex] = useState(0);
   const [isFeaturesPlaying, setIsFeaturesPlaying] = useState(true);
   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
   const [isMobile, setIsMobile] = useState(false);
   const [openFaqIndex, setOpenFaqIndex] = useState(null);
   const strategicIntelligenceRef = useRef(null);

   const getVisibleFeatures = () => {
      if (typeof window === 'undefined') return 4;
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      return 4;
   };

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth);
         setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   useEffect(() => {
      let interval;
      if (isFeaturesPlaying) {
         interval = setInterval(() => {
            setFeaturesIndex((prev) => {
               const max = Math.max(0, FEATURES_DATA.length - getVisibleFeatures());
               return prev >= max ? 0 : prev + 1;
            });
         }, 3000);
      }
      return () => clearInterval(interval);
   }, [isFeaturesPlaying]);

   const handlePrevFeature = () => {
      const max = Math.max(0, FEATURES_DATA.length - getVisibleFeatures());
      setFeaturesIndex(prev => prev <= 0 ? max : prev - 1);
   };

   const handleNextFeature = () => {
      const max = Math.max(0, FEATURES_DATA.length - getVisibleFeatures());
      setFeaturesIndex(prev => prev >= max ? 0 : prev + 1);
   };


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

   useEffect(() => {
      setCurrentIndex(0);
      if (filteredCourses.length > 0) {
         setProgramIndex(filteredCourses.length);
      }
   }, [filterCategory, filterStream, searchTerm, finderStream, courseType, filteredCourses.length]);

   useEffect(() => {
      if (filteredCourses.length === 0) return;
      if (programIndex >= filteredCourses.length * 2) {
         setSkipProgramAnimation(true);
         setProgramIndex(prev => prev - filteredCourses.length);
         setTimeout(() => setSkipProgramAnimation(false), 50);
      } else if (programIndex < filteredCourses.length) {
         setSkipProgramAnimation(true);
         setProgramIndex(prev => prev + filteredCourses.length);
         setTimeout(() => setSkipProgramAnimation(false), 50);
      }
   }, [programIndex, filteredCourses.length]);

   // Auto-play for Program Portfolio
   useEffect(() => {
      if (showAllPrograms) return;
      const interval = setInterval(() => {
         setProgramIndex((prev) => {
            return prev + 1;
         });
      }, 4000);
      return () => clearInterval(interval);
   }, [showAllPrograms, filteredCourses.length]);

   // Auto-play for Hero
   useEffect(() => {
      const interval = setInterval(() => {
         setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
      }, 5000);
      return () => clearInterval(interval);
   }, []);

   const handleUniversityClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

   const handlePrevProgram = () => {
      setProgramIndex(prev => prev - 1);
   };

   const handleNextProgram = () => {
      setProgramIndex(prev => prev + 1);
   };

   return (
      <div className="uni-page-new min-h-screen overflow-x-clip max-w-[100vw] relative">
         <style>{styles}</style>

         {/* 1. HERO SECTION */}
         <section className="relative w-full bg-slate-950 overflow-hidden mt-5 md:mt-15">

            {/* IMAGE FRAME — drives height on mobile, fixed viewport height on desktop */}
            <div className="relative w-full h-[100svh] md:h-[80vh] md:max-h-[820px]">
               <AnimatePresence mode="wait">
                  <motion.img
                     key={`hero-${heroIndex}-${isMobile ? "m" : "d"}`}
                     src={isMobile ? HERO_IMAGES[heroIndex].mobile : HERO_IMAGES[heroIndex].desktop}
                     alt="University Spotlight"
                     initial={{ opacity: 0, scale: 1.05 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.05 }}
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="absolute inset-0 w-full h-full object-cover object-center"
                  />
               </AnimatePresence>

               {/* Dark gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

               {/* Grid pattern overlay */}
               <div className="grid-pattern absolute inset-0 opacity-20 pointer-events-none z-10" />

               {/* ── HERO TEXT ─────────────── */}
               <div className="absolute bottom-24 sm:bottom-28 md:bottom-24 left-0 right-0 px-5 sm:px-8 md:px-16 z-20">
                  <motion.p
                     key={`label-${heroIndex}`}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4, duration: 0.6 }}
                     className="text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-2"
                  >
                     Featured University
                  </motion.p>
                  <motion.h1
                     key={`title-${heroIndex}`}
                     initial={{ opacity: 0, y: 14 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.55, duration: 0.6 }}
                     className="text-white text-2xl sm:text-3xl md:text-5xl font-black leading-tight max-w-2xl"
                  >
                     Find Your Perfect University
                  </motion.h1>
               </div>

               {/* ── PAGINATION DOTS ──────────────────────────────────────────── */}
               <div className="absolute bottom-10 sm:bottom-12 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {HERO_IMAGES.map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setHeroIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${heroIndex === i
                           ? "w-6 sm:w-8 bg-blue-500"
                           : "w-2 bg-white/30 hover:bg-white/50"
                           }`}
                     />
                  ))}
               </div>

               {/* ── PREV / NEXT ARROWS (desktop only) ───────────────────────── */}
               <button
                  onClick={() =>
                     setHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
                  }
                  className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                     backdrop-blur-sm border border-white/20 items-center justify-center
                     transition-all duration-300"
                  aria-label="Previous slide"
               >
                  <ChevronLeft className="w-6 h-6 text-white" />
               </button>

               <button
                  onClick={() => setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
                  className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20
                     w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                     backdrop-blur-sm border border-white/20 items-center justify-center
                     transition-all duration-300"
                  aria-label="Next slide"
               >
                  <ChevronRight className="w-6 h-6 text-white" />
               </button>

               {/* ── PROGRESS BAR (auto-advance indicator) ───────────────────── */}
               <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-20">
                  <motion.div
                     key={`progress-${heroIndex}`}
                     className="h-full bg-blue-500"
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 5, ease: "linear" }}
                  />
               </div>
            </div>

            {/* BOTTOM TICKER — outside the image container so it never overlaps on small screens */}
            <div className="w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-2.5 sm:py-3 marquee-container">
               <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap animate-marquee px-4">
                  {[1, 2].map((repeat) => (
                     <React.Fragment key={repeat}>
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 px-6 sm:px-8">
                           <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-ping shrink-0" />
                           <span className="text-white/80 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                              UPES Dehradun Application Deadline: April 15th
                           </span>
                           <span className="text-white/20 ml-4 sm:ml-6 shrink-0">|</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 px-6 sm:px-8">
                           <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-ping shrink-0" />
                           <span className="text-white/80 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                              Sikkim Manipal Admission: 50% Scholarship Available
                           </span>
                           <span className="text-white/20 ml-4 sm:ml-6 shrink-0">|</span>
                        </div>
                     </React.Fragment>
                  ))}
               </div>
            </div>

         </section>

         {/* 2. IMPACT STATS (From About Page) */}
         <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                     { val: 18, label: 'Certified Leaders', suffix: 'k+' },
                     { val: 95, label: 'Placement Trajectory', suffix: '%' },
                     { val: 50, label: 'Partner Institutions', suffix: '+' },
                     { val: 4.9, label: 'Average Evaluation', suffix: '/5', decimals: 1 }
                  ].map((stat, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group"
                     >
                        <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                           <CountUp end={stat.val} decimals={stat.decimals || 0} duration={2.5} separator="," enableScrollSpy scrollSpyOnce suffix={stat.suffix} />
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 3. LOGO CAROUSEL */}
         <section className="bg-gradient-to-b from-white to-slate-50 py-14 overflow-hidden relative border-b border-indigo-50/50 contain-paint">
            <div className="marquee-container">
               <div className="flex items-center gap-10 md:gap-24 whitespace-nowrap animate-marquee">
                  {[...UNIVERSITY_LOGOS, ...UNIVERSITY_LOGOS].map((logoURL, idx) => (
                     <div key={idx} className="flex items-center opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer group">
                        <img
                           src={logoURL}
                           alt="University Partner Logo"
                           className="h-10 md:h-14 lg:h-16 w-auto object-contain mix-blend-multiply drop-shadow-sm pointer-events-none"
                        />
                     </div>
                  ))}
               </div>
            </div>
         </section>



         {/* 5. STRATEGIC GUIDANCE SECTION (NEW) */}
         <section className="py-12 md:py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 text-center flex flex-col items-center">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-8"
               >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest font-display">Your Future Starts Here</span>
               </motion.div>

               <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.2] md:leading-[1.1] tracking-tighter max-w-5xl font-display"
               >
                  Best Online Universities & <span className="text-blue-600">Top Career <br className="hidden md:block" /> Guidance</span> in <span className="text-blue-600 underline underline-offset-8 decoration-4 md:decoration-8 decoration-blue-600/20">India</span>
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
                     className="w-full md:w-auto px-12 py-5 md:py-6 bg-blue-600 text-white font-black rounded-2xl shadow-[0_15px_40px_-10px_rgba(37,99,235,0.4)] hover:scale-105 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-3"
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

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
                  {[
                     { val: 50000, label: 'of Students Guided', suffix: '+' },
                     { val: 100, label: 'Partner Universities', suffix: '+' },
                     { val: 1000, label: 'Admission Success', suffix: '+' }
                  ].map((stat, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-8 md:p-10 rounded-xl bg-white border border-blue-100/50 shadow-sm hover:shadow-2xl transition-all text-center flex flex-col items-center justify-center group ${i === 2 && 'sm:col-span-2 lg:col-span-1'}`}
                     >
                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 font-display group-hover:scale-105 transition-transform">
                           <CountUp end={stat.val} duration={2.5} separator="," enableScrollSpy scrollSpyOnce suffix={stat.suffix} />
                        </div>
                        <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 7. WHY CHOOSE: "Executive Feature Set" */}
         <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,100vw)] h-[min(800px,100vw)] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none opacity-60"></div>

            <div className="container mx-auto px-6 relative z-10">
               <div className="flex flex-col items-center mb-16 md:mb-24">
                  <SectionLabel icon={Sparkles}>Strategic Advantage</SectionLabel>
                  <motion.h2
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-3xl md:text-6xl font-black text-center font-display uppercase tracking-tighter leading-tight max-w-4xl"
                  >
                     Why Choose <span className="text-blue-600">Antechos</span> <br className="hidden md:block" /> for Online Learning?
                  </motion.h2>
               </div>

               {/* Main Layout */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 items-center">

                  {/* LEFT SIDE */}
                  <div className="flex flex-col gap-12 md:gap-16">
                     {WHY_CHOOSE_DATA.slice(0, 2).map((item, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, x: -50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2, duration: 0.8 }}
                           className="group flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right"
                        >
                           <div className="order-2 md:order-1 flex-1">
                              <h3 className="font-black text-xl md:text-2xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                           </div>
                           <div className={`order-1 md:order-2 w-16 h-16 shrink-0 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-100/50`}>
                              {item.icon}
                           </div>
                        </motion.div>
                     ))}
                  </div>

                  {/* CENTER IMAGE - High Fidelity Visual */}
                  <div className="flex justify-center items-center relative py-10">
                     {/* Orbiting Decor */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                           className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-blue-100 rounded-full opacity-40"
                        ></motion.div>
                        <motion.div
                           animate={{ rotate: -360 }}
                           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                           className="absolute w-[350px] h-[350px] md:w-[520px] md:h-[520px] border border-dashed border-blue-200 rounded-full opacity-20"
                        ></motion.div>
                     </div>

                     <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] z-10 flex items-center justify-center group"
                     >
                        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-[40px]"></div>
                        <img
                           src="https://i.ibb.co/dwGTHZ2f/unipageimage.png"
                           alt="center visual"
                           className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply"
                        />

                        {/* Decorative floating elements */}
                        <div className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-12 right-8 w-4 h-4 bg-orange-400/40 rounded-full blur-[2px]"></div>
                     </motion.div>

                     {/* Floating Badge */}
                     <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 md:right-0 bg-white shadow-xl rounded-2xl p-4 border border-blue-50 z-20 hidden md:block"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                              <Star className="w-5 h-5 fill-current" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Rating</p>
                              <p className="text-sm font-black text-slate-900">Top Rated 2026</p>
                           </div>
                        </div>
                     </motion.div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex flex-col gap-12 md:gap-16">
                     {WHY_CHOOSE_DATA.slice(2, 4).map((item, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, x: 50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2, duration: 0.8 }}
                           className="group flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left"
                        >
                           <div className={`w-16 h-16 shrink-0 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-blue-100/50`}>
                              {item.icon}
                           </div>
                           <div className="flex-1">
                              <h3 className="font-black text-xl md:text-2xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>

               </div>
            </div>
         </section>


         {/* 8. UNIVERSITY GRID */}
         <section className="py-12 md:py-24 bg-white" id="directory">
            <div className="container mx-auto px-6">
               {/* SECTION HEADER */}
               <div className="flex flex-col justify-start items-start gap-8 mb-16 md:mb-24">
                  <div className="text-left w-full">
                     <SectionLabel icon={Building2}>Institution Archive 2026</SectionLabel>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter w-full max-w-4xl">India's <span className="text-blue-600">Trusted & Prestigious</span> Online University.</h2>
                  </div>

                  <div className="flex overflow-x-auto hide-scrollbar justify-start gap-2 md:gap-3 bg-white p-2 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm w-full md:max-w-max">
                     {['All', 'Private', 'Public', 'Deemed'].map(cat => (
                        <button
                           key={cat}
                           onClick={() => setFilterCategory(cat)}
                           className={`flex-shrink-0 flex items-center justify-center whitespace-nowrap px-8 md:px-10 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filterCategory === cat
                              ? "bg-slate-900 text-white shadow-2xl"
                              : "text-slate-400 hover:text-slate-900"
                              }`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="relative">
                  {!showAll ? (
                     <div className="relative group/carousel">
                        <div className="overflow-hidden relative">
                           <div className="flex justify-end mb-4 pr-4">
                              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-2 animate-pulse">
                                 <ArrowRight className="w-3 h-3" />
                                 Drag to Explore Entities
                              </span>
                           </div>

                           <motion.div
                              className="flex gap-8 pb-12 cursor-grab active:cursor-grabbing touch-pan-x items-stretch"
                              animate={{ x: -(currentIndex * (windowWidth < 768 ? 280 + 32 : 380 + 32)) }}
                              transition={{ type: "spring", damping: 25, stiffness: 120 }}
                              drag="x"
                              dragConstraints={{
                                 right: 0,
                                 left: -((filteredUniversities.length - 1) * (windowWidth < 768 ? 280 + 32 : 380 + 32))
                              }}
                              onDragEnd={(e, { offset, velocity }) => {
                                 const swipeThreshold = 50;
                                 if (offset.x < -swipeThreshold) setCurrentIndex(prev => Math.min(prev + 1, filteredUniversities.length - 1));
                                 if (offset.x > swipeThreshold) setCurrentIndex(prev => Math.max(prev - 1, 0));
                              }}
                           >
                              {filteredUniversities.map((uni) => (
                                 <motion.div
                                    key={uni.id}
                                    className="flex-shrink-0 w-[300px] md:w-[380px] h-auto min-h-[600px] group flex flex-col bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-100 hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
                                 >
                                    <div className="relative w-full aspect-square overflow-hidden bg-slate-100 flex-shrink-0">
                                       <img src={uni.image} alt={uni.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent pointer-events-none z-10"></div>
                                       <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
                                          <span className="bg-white/90 backdrop-blur-md text-slate-900 py-1.5 px-3 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/20">{uni.category}</span>
                                          <span className="bg-blue-600 text-white py-1.5 px-3 rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-xl">Top Rated</span>
                                       </div>
                                       <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white p-1.5 px-3 rounded-xl flex items-center gap-1.5 font-black text-[9px] md:text-xs border border-white/10 z-20">
                                          <Star className="w-3.5 h-3.5 text-orange-400 fill-current" />
                                          {uni.rating}
                                       </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                                       <div className="flex items-center gap-2 mb-4">
                                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{uni.location}</span>
                                       </div>
                                       <h3 className="text-lg md:text-xl font-black text-slate-900 mb-4 font-display group-hover:text-blue-600 transition-colors uppercase leading-tight">{uni.name}</h3>
                                       <p className="text-slate-500 font-medium text-[11px] md:text-xs leading-relaxed mb-6 line-clamp-3">{uni.description}</p>

                                       <div className="flex flex-wrap gap-1.5 mb-8">
                                          {uni.programs.map((p, i) => (
                                             <span key={i} className="text-[7px] md:text-[8px] font-black text-slate-400 border border-slate-100 p-1.5 px-3 rounded-lg uppercase tracking-[0.1em]">{p}</span>
                                          ))}
                                       </div>

                                       <div className="mt-auto">
                                          <button
                                             onClick={() => handleUniversityClick(uni.link)}
                                             className="w-full flex items-center justify-between group/btn bg-slate-900 hover:bg-blue-600 text-white p-4 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] transition-all duration-500"
                                          >
                                             <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em]">Full Intel</span>
                                             <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                          </button>
                                       </div>
                                    </div>
                                 </motion.div>
                              ))}
                           </motion.div>

                           {/* Pagination Indicators */}
                           <div className="flex justify-center gap-2 mt-0">
                              {filteredUniversities.map((_, i) => (
                                 <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-1 rounded-full transition-all ${currentIndex === i ? "bg-blue-500 w-6" : "bg-slate-200 w-1.5"}`}
                                 />
                              ))}
                           </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-0 right-0 md:right-0 flex justify-between pointer-events-none z-20 px-1 md:px-2">
                           <button
                              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                              disabled={currentIndex === 0}
                              className={`w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 translate-x-4 group-hover/carousel:translate-x-0 cursor-pointer`}
                           >
                              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                           </button>
                           <button
                              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, filteredUniversities.length - 1))}
                              disabled={currentIndex === filteredUniversities.length - 1}
                              className={`w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 -translate-x-4 group-hover/carousel:translate-x-0 cursor-pointer`}
                           >
                              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredUniversities.map((uni) => (
                           <motion.div
                              key={uni.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="group flex flex-col bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-slate-100 hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] h-auto min-h-[650px]"
                           >
                              <div className="relative w-full aspect-square overflow-hidden bg-slate-100 flex-shrink-0">
                                 <img src={uni.image} alt={uni.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent pointer-events-none z-10"></div>
                                 <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                                    <span className="bg-white/90 backdrop-blur-md text-slate-900 py-2 px-4 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">{uni.category}</span>
                                    <span className="bg-blue-600 text-white py-2 px-4 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">Top Rated</span>
                                 </div>
                                 <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-md text-white p-2 px-4 rounded-2xl flex items-center gap-2 font-black text-[10px] md:text-xs border border-white/10 z-20">
                                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                                    {uni.rating}
                                 </div>
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
                  )}
               </div>

               <div className="mt-16 md:mt-24 flex flex-col items-center gap-6 md:gap-8">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                     Viewing {showAll ? filteredUniversities.length : Math.min(itemsPerPage, filteredUniversities.length)} of {filteredUniversities.length} Accredited Units
                  </p>
                  <button
                     onClick={() => setShowAll(!showAll)}
                     className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-black px-12 md:px-16 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] shadow-xl transition-all active:scale-95 flex items-center gap-4 group"
                  >
                     <span className="text-[10px] uppercase tracking-widest">
                        {showAll ? "Synchronize Portfolio Preview" : "Synchronize All Entities"}
                     </span>
                     <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${showAll ? "rotate-180" : "group-hover:translate-y-2"}`} />
                  </button>
               </div>
            </div>
         </section>

         {/* CAROUSEL FEATURES SECTION */}
         <section className="py-16 md:py-24 bg-white border-y border-slate-100 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-7xl mx-auto">
               {/* Heading */}
               <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                  <SectionLabel icon={Mail}>Institutional Support</SectionLabel>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter font-display">Questions? <span className="text-blue-600">We can help.</span></h2>
                  <p className="text-slate-500 text-xs md:text-sm max-w-2xl font-medium">
                     Connect with our executive advisors for personalized analysis and strategic academic path-finding.
                  </p>
               </div>

               <div
                  className="relative group/features px-6 md:px-12"
                  onMouseEnter={() => setIsFeaturesPlaying(false)}
                  onMouseLeave={() => setIsFeaturesPlaying(true)}
               >
                  <div className="overflow-hidden py-4 m-auto">
                     <motion.div
                        className="flex items-stretch cursor-grab active:cursor-grabbing touch-pan-x"
                        animate={{ x: `-${featuresIndex * (windowWidth < 640 ? 100 : windowWidth < 768 ? 50 : windowWidth < 1024 ? 33.333 : 25)}%` }}
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                     >
                        {FEATURES_DATA.map((feature, idx) => (
                           <div key={idx} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center text-center px-4 md:px-6 py-6 group cursor-pointer">
                              <div className="h-22 md:h-30 mb-6 flex items-center justify-center">
                                 <img src={feature.img} alt="Feature icon" className="h-full object-contain mix-blend-multiply drop-shadow-[0_15px_15px_rgba(0,0,0,0.05)] group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <h3 className="text-sm md:text-base font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{feature.text}</h3>
                           </div>
                        ))}
                     </motion.div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                     onClick={handlePrevFeature}
                     className="absolute top-1/2 -translate-y-1/2 left-0 md:left-2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-800 hover:text-blue-600 hover:bg-slate-50 transition-all active:scale-95 z-20"
                  >
                     <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                     onClick={handleNextFeature}
                     className="absolute top-1/2 -translate-y-1/2 right-0 md:right-2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-slate-800 hover:text-blue-600 hover:bg-slate-50 transition-all active:scale-95 z-20"
                  >
                     <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
               </div>
            </div>
         </section>



         {/* 6. OFFICIAL PROGRAM PORTFOLIOS */}
         <section ref={strategicIntelligenceRef} className="py-12 md:py-24 bg-white relative overflow-hidden" id="strategic-intelligence">
            <div className="container mx-auto px-6">
               <div className="flex flex-col justify-start items-start gap-8 mb-16 md:mb-20">
                  <div className="text-left w-full">
                     <SectionLabel icon={Award}>Curriculum Standards 2026</SectionLabel>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter w-full max-w-4xl">Explore Programs From <span className="text-blue-600">Top Ranked Universities</span></h2>
                  </div>
                  <div className="flex overflow-x-auto hide-scrollbar justify-start gap-2 bg-slate-50 p-2 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 w-full md:max-w-max mt-4 md:mt-0">
                     {['All', 'Integrated Program', 'Certification', 'Masters (PG)', "Bachelor's (UG)", 'Special'].map(tab => (
                        <button
                           key={tab}
                           onClick={() => setCourseType(tab)}
                           className={`flex-shrink-0 flex items-center justify-center whitespace-nowrap px-6 md:px-8 py-3 md:py-4 rounded-[1.2rem] md:rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${courseType === tab ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
                              }`}
                        >
                           {tab}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="relative">
                  {!showAllPrograms ? (
                     <div className="relative group/programs-carousel">
                        <div className="overflow-hidden py-4 m-auto">
                           <motion.div
                              className="flex w-max gap-6 md:gap-8 pb-12 cursor-grab active:cursor-grabbing touch-pan-x items-stretch"
                              animate={{ x: -(programIndex * (windowWidth < 768 ? 300 + 24 : 380 + 32)) }}
                              transition={skipProgramAnimation ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 120 }}
                              drag="x"
                              onDragStart={() => setSkipProgramAnimation(false)}
                              dragConstraints={{
                                 right: 1000,
                                 left: -5000
                              }}
                              onDragEnd={(e, { offset, velocity }) => {
                                 const swipeThreshold = 50;
                                 if (offset.x < -swipeThreshold) setProgramIndex(prev => prev + 1);
                                 if (offset.x > swipeThreshold) setProgramIndex(prev => prev - 1);
                              }}
                           >
                              {[...filteredCourses, ...filteredCourses, ...filteredCourses].map((course, idx) => (
                                 <div
                                    key={idx}
                                    className="flex-shrink-0 w-[300px] md:w-[380px] h-[400px] md:h-[420px] relative bg-white border border-slate-100 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] hover:border-blue-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-700 flex flex-col group content-start cursor-pointer"
                                 >
                                    <div className="absolute top-8 right-8 opacity-40 group-hover:opacity-100 group-hover:text-blue-600 group-hover:scale-110 text-slate-400 transition-all duration-500">
                                       {course.icon}
                                    </div>
                                    <div className="mb-10 text-left">
                                       <span className="bg-slate-50 text-blue-600 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500">{course.badge}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight uppercase text-left group-hover:text-blue-600 transition-colors">{course.name}</h3>
                                    <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-12 text-left line-clamp-1">{course.category} Certification</p>
                                    <button
                                       onClick={() => handleUniversityClick(course.link)}
                                       className="mt-auto w-full bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-800 text-slate-900 hover:text-white font-black py-4 md:py-5 rounded-2xl transition-all flex items-center justify-center gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] group/btn"
                                    >
                                       <span>Secure Enrollment</span>
                                       <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                                    </button>
                                 </div>
                              ))}
                           </motion.div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-0 right-0 md:right-0 flex justify-between pointer-events-none z-20 px-1 md:px-2">
                           <button
                              onClick={handlePrevProgram}
                              className={`w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover/programs-carousel:opacity-100 translate-x-4 group-hover/programs-carousel:translate-x-0 cursor-pointer`}
                           >
                              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                           </button>
                           <button
                              onClick={handleNextProgram}
                              className={`w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover/programs-carousel:opacity-100 -translate-x-4 group-hover/programs-carousel:translate-x-0 cursor-pointer`}
                           >
                              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                           </button>
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
                              className="relative bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-700 flex flex-col h-[400px] md:h-[420px]"
                           >
                              <div className="absolute top-6 right-6 opacity-40 text-slate-400">
                                 {course.icon}
                              </div>
                              <div className="mb-8 md:mb-10 text-left">
                                 <span className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-blue-100">{course.badge}</span>
                              </div>
                              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-tight uppercase text-left">{course.name}</h3>
                              <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-10 md:mb-12 text-left">{course.category} Certification</p>
                              <button
                                 onClick={() => handleUniversityClick(course.link)}
                                 className="mt-auto w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 md:py-5 rounded-2xl transition-all flex items-center justify-center gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] group"
                              >
                                 <span>Secure Enrollment</span>
                                 <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
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
            <div className="absolute -bottom-24 left-0 w-72 md:w-96 h-72 md:h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
         </section>



         {/* 4. SMART FINDER 
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
         </section>*/}



         {/* 9. SUCCESS STORIES */}
         <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
               <SectionLabel icon={Users}>Student Impact Reports</SectionLabel>
               <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tighter uppercase font-display max-w-4xl mx-auto">Pathways to <span className="text-blue-600">Institutional Excellence</span></h2>
               <p className="text-slate-500 font-medium text-xs md:text-base mb-12 md:mb-16 max-w-2xl mx-auto">Hear from graduates who transformed their professional trajectories through our strategic guidance.</p>

               <div className="relative max-w-6xl mx-auto px-4 sm:px-12">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={testimonialIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-12 lg:p-14 shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-14 text-left relative overflow-hidden"
                     >
                        <div className="absolute top-12 right-12 opacity-[0.05] hidden md:block">
                           <span className="text-[10rem] font-serif leading-none select-none">“</span>
                        </div>

                        <div className="w-24 h-24 sm:w-32 md:w-36 lg:w-40 flex-shrink-0 rounded-full border-4 md:border-8 border-slate-50 overflow-hidden shadow-2xl">
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
                           <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-8 md:mb-10 leading-relaxed italic">
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
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-0 right-0 sm:right-0 flex justify-between pointer-events-none px-1 sm:px-2">
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
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${testimonialIndex === i ? "bg-blue-600 w-6 md:w-8" : "bg-slate-200"}`}
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
                     <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tighter font-display uppercase">Best <span className="text-blue-600">Trending <br /> Specialization</span> <br className="hidden md:block" /> of 2026</h2>
                     <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed">These emerging fields offer exciting opportunities for professionals to drive impactful change and lead the future of innovation.</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200">
                     <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <Activity className="w-6 h-6 text-blue-600" />
                     </div>
                     <div>
                        <p className="text-slate-900 font-black text-xs uppercase tracking-widest">High Volatility</p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Career Surge Zones</p>
                     </div>
                  </div>
               </div>

               <div className="relative group/marquee marquee-container py-4">
                  <div
                     className="flex w-max gap-6 md:gap-8 animate-marquee hover:[animation-play-state:paused] pb-4"
                     style={{ animationDuration: '40s' }}
                  >
                     {[...Array(2)].flatMap(() => [
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
                     ]).map((spec, i) => (
                        <div
                           key={i}
                           className="w-[320px] md:w-[400px] flex-shrink-0 bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col group h-[580px] md:h-[620px]"
                        >
                           <div className="h-60 flex-shrink-0 overflow-hidden relative">
                              <img src={spec.img} alt={spec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900">Specialization</div>
                           </div>
                           <div className="p-10 flex flex-col flex-grow">
                              <h3 className="text-2xl font-black text-slate-900 mb-4 font-display group-hover:text-blue-600 transition-colors uppercase leading-tight text-left">{spec.title}</h3>
                              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3 text-left">{spec.desc}</p>

                              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-50 mb-8 text-left mt-auto">
                                 <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Avg. Salary</p>
                                 <p className="text-blue-600 font-black text-xl">₹ {spec.salary}</p>
                              </div>

                              <button className="flex items-center gap-2 group/link text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all text-left">
                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover/link:animate-ping"></div>
                                 Explore Intel
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>



         {/* 10. FAQ SECTION */}
         <section className="py-16 md:py-24 bg-white border-t border-slate-100 relative overflow-hidden text-left">
            <div className="container mx-auto px-6 max-w-4xl">
               <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                   <SectionLabel icon={Info}>FAQs</SectionLabel>
                   <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter font-display uppercase">
                       You've likely got a <span className="text-blue-600">few questions</span>
                   </h2>
               </div>
               
               <div className="space-y-4">
                  {FAQ_DATA.map((faq, index) => (
                     <div 
                        key={index} 
                        className={`border rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-blue-200 bg-blue-50/50 shadow-xl' : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-md'}`}
                     >
                        <button
                           onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                           className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                        >
                           <span className="font-black text-slate-900 text-base md:text-xl pr-8">{faq.question}</span>
                           <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 border ${openFaqIndex === index ? 'bg-blue-600 text-white border-blue-600 rotate-180' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-blue-50 hover:text-blue-600'}`}>
                              <ChevronDown className="w-5 h-5" />
                           </div>
                        </button>
                        <AnimatePresence>
                           {openFaqIndex === index && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                 <div className="p-6 md:p-8 pt-0 text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                                    {faq.answer}
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 11. ADVISORY PANEL - REDESIGNED HOMEPAGE INLINE FORM */}
         <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-slate-50 relative overflow-hidden mt-12 md:mt-24">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

            <div className="container mx-auto px-6 relative z-10">
               <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

                  {/* Left Column: Text and Image */}
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                     <div className="mb-6 flex flex-col items-center md:items-start">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tighter font-display leading-[1.1]">
                           Still <span className="text-blue-600">Confused?</span>
                        </h2>
                        <p className="text-slate-600 font-medium text-lg md:text-xl flex items-center justify-center md:justify-start gap-3">
                           Get 1:1 free counselling Now
                           <span className="p-2 bg-green-100 text-green-600 rounded-full animate-bounce shadow-sm">
                              <Phone className="w-5 h-5 fill-current" />
                           </span>
                        </p>
                     </div>

                     <div className="w-full max-w-sm mt-4 md:mt-8 relative hidden md:block">
                        <div className="absolute inset-0 bg-blue-200 rounded-[3rem] blur-[80px] opacity-40"></div>
                        <img
                           src="https://static.vecteezy.com/system/resources/thumbnails/010/869/741/small/faq-concept-illustration-people-looking-through-magnifying-glass-at-interrogation-point-searching-solutions-useful-information-customer-support-solving-problem-free-png.png"
                           alt="Free Counselling Support"
                           className="w-full h-auto relative z-10 mix-blend-multiply drop-shadow-xl scale-110 -translate-y-4"
                        />
                     </div>
                  </div>

                  {/* Right Column: Form */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                     <div className="w-full max-w-lg relative">
                        <EnquiryPopup isInline={true} />
                     </div>
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
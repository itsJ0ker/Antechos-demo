import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
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
   Target,
   BookOpen,
   Headphones
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { universities as staticUniversities } from '../data/universities';
import { getUniversities, submitEnquiry } from '../lib/supabase';
import { Phone } from 'lucide-react';
import CountUp from 'react-countup';
import consultantImg from '../assets/career_consultant_dark.png';

/* ─── Inline CSS ─────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  :root {
    --accent: #38BDF8;
    --accent-light: #7DD3FC;
    --dark: #0A0C0F;
    --dark-2: #0F1318;
    --dark-3: #161C24;
    --card-bg: #FFFFFF;
    --border: rgba(56,189,248,0.1);
    --font-bricolage-grotesque: 'Bricolage Grotesque', sans-serif;
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
  
  /* Custom clock wheel segments styling */
  .clock-segment-morning { fill: #fca5a5; }
  .clock-segment-afternoon { fill: #93c5fd; }
  .clock-segment-evening { fill: #3b82f6; }
  .clock-segment-night { fill: #475569; }
  
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
   { name: "Online MBA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=MBAonine", image: "https://i.ibb.co/HDTJ7jHt/mba.jpg", icon: <Briefcase className="w-5 h-5" />, badge: "UGC Approved" },
   { name: "Online BBA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBBA", image: "https://i.ibb.co/Y4CnR6PZ/bba.jpg", icon: <TrendingUp className="w-5 h-5" />, badge: "Industry Lead" },
   { name: "Online MCA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMCA", image: "https://i.ibb.co/Zk7RHXV/mca.jpg", icon: <Zap className="w-5 h-5" />, badge: "Tech Accredited" },
   { name: "Online BCA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCA", image: "https://i.ibb.co/x87fDS4F/bca.jpg", icon: <Rocket className="w-5 h-5" />, badge: "Skill Based" },
   { name: "Online MA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-ma?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMA", image: "https://i.ibb.co/cdq0cy7/ma.jpg", icon: <GraduationCap className="w-5 h-5" />, badge: "Research Led" },
   { name: "Online BA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-ba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBA", image: "https://i.ibb.co/j9hn9pwJ/ba.jpg", icon: <Globe className="w-5 h-5" />, badge: "Diverse Curriculum" },
   { name: "Online M.Com", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mcom?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMCom", image: "https://i.ibb.co/8Lrjf2Xf/mcom.jpg", icon: <CreditCard className="w-5 h-5" />, badge: "Finance Focused" },
   { name: "Online B.Com", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bcom?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCom", image: "https://i.ibb.co/GQw4bbKJ/bcom.jpg", icon: <Activity className="w-5 h-5" />, badge: "Business Foundation" },
   // PROFESSIONAL & TECH SERIES
   { name: "Block Chain (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-blockchain?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseBlockchain", icon: <ShieldCheck className="w-5 h-5" />, badge: "Web3 Mastery" },
   { name: "Cyber Security (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-cyber-security?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseCyberSecurity", icon: <ShieldCheck className="w-5 h-5" />, badge: "Security Vetting" },
   { name: "Dev Ops (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-executive-pg-diploma-certificate-devops?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseDEVOPS", icon: <Zap className="w-5 h-5" />, badge: "Deployment Ready" },
   { name: "AI & Machine Learning", category: "Certification", link: "https://i.ibb.co/C4Jv9pT/Chat-GPT-Image-Apr-28-2026-06-10-25-PM.png", icon: <Lightbulb className="w-5 h-5" />, badge: "Deep Intelligence" },
   { name: "UI & UX Design", category: "Certification", link: "https://courses.universityadmission.co.in/epgp-ui-ux-design-online?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=UIUXcertification", icon: <Star className="w-5 h-5" />, badge: "Experience Strategy" },
   { name: "Generative AI (EPGP)", category: "Certification", link: "https://courses.universityadmission.co.in/online-epg-diploma-certificate-generative-ai?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseGENERATIVEAI", icon: <Rocket className="w-5 h-5" />, badge: "Future Proof" },
   { name: "Data Science & Analytics", category: "Certification", link: "https://courses.universityadmission.co.in/online-epg-diploma-certificate-data-science-analytics?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=CourseDSA", icon: <TrendingUp className="w-5 h-5" />, badge: "Big Data Elite" },
   { name: "Gen AI & Agentic AI", category: "Certification", link: "https://courses.universityadmission.co.in/generative-ai-and-agentic-ai-programs-online?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=courseGenAI", icon: <Activity className="w-5 h-5" />, badge: "Advanced Agents" },

   { name: "Online M.Sc", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-msc?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMSc", image: "https://i.ibb.co/FLKQ4V2Z/msc.jpg", icon: <Info className="w-5 h-5" />, badge: "Advanced Science" },
   { name: "Online B.Sc", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bsc?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBSc", image: "https://i.ibb.co/kLHjBXP/bcs.jpg", icon: <Star className="w-5 h-5" />, badge: "Foundational Science" },
   { name: "Online Dual MBA", category: "Special", link: "https://i.ibb.co/99H9yywH/Whats-App-Image-2026-04-29-at-11-12-39-PM-1.jpg", icon: <Briefcase className="w-5 h-5" />, badge: "Expert Specialization" },
   { name: "Integrated BBA + MBA", category: "Integrated Program", link: "https://i.ibb.co/s92RLfSR/Whats-App-Image-2026-04-29-at-10-09-11-PM-1.jpg", icon: <TrendingUp className="w-5 h-5" />, badge: "Fast Track" },
   { name: "Integrated BCA + MCA", category: "Integrated Program", link: "https://i.ibb.co/27XB7Lsp/Whats-App-Image-2026-04-29-at-10-09-38-PM.jpg", icon: <Zap className="w-5 h-5" />, badge: "Technical Mastery" },
   { name: "Integrated B.Com + MBA", category: "Integrated Program", link: "https://i.ibb.co/vxGdvpKy/Whats-App-Image-2026-04-29-at-10-48-58-PM.jpg", icon: <CreditCard className="w-5 h-5" />, badge: "Corporate Ready" },
   { name: "Online PGDM", category: "Masters (PG)", link: "https://i.ibb.co/gbGYWtVJ/Whats-App-Image-2026-04-29-at-10-10-41-PM.jpg", icon: <Briefcase className="w-5 h-5" />, badge: "AIMA Approved" },
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

const WHY_STUDENTS_CHOOSE = [
   {
      title: "UGC Approved Universities",
      desc: "100% Recognized Degrees",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "text-blue-400"
   },
   {
      title: "Industry-Aligned Curriculum",
      desc: "Learn what companies actually need",
      icon: <BookOpen className="w-6 h-6" />,
      color: "text-blue-400"
   },
   {
      title: "Personalized Mentorship",
      desc: "One-on-one guidance at every step",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-400"
   },
   {
      title: "Placement Guarantee",
      desc: "Focused training for top career outcomes",
      icon: <Target className="w-6 h-6" />,
      color: "text-blue-400"
   },
   {
      title: "Easy EMI Options",
      desc: "Flexible payment plans for all",
      icon: <CreditCard className="w-6 h-6" />,
      color: "text-blue-400"
   }
];

const CAREER_JOURNEY_STEPS = [
   {
      id: "01",
      title: "Career Assessment",
      desc: "Discover your strengths, interests & best career paths.",
      icon: <Users className="w-8 h-8" />
   },
   {
      id: "02",
      title: "Choose the Right University",
      desc: "Get matched with top UGC-approved universities.",
      icon: <GraduationCap className="w-8 h-8" />
   },
   {
      id: "03",
      title: "Learn & Build In-Demand Skills",
      desc: "Access premium learning, tools and certifications.",
      icon: <BookOpen className="w-8 h-8" />
   },
   {
      id: "04",
      title: "Gain Real-World Experience",
      desc: "Internships, live projects & industry mentorship.",
      icon: <Briefcase className="w-8 h-8" />
   },
   {
      id: "05",
      title: "Placement Success",
      desc: "Resume building, interviews & placement support.",
      icon: <TrendingUp className="w-8 h-8" />
   }
];

const CAREER_SYSTEM_STEPS = [
   {
      id: "01",
      title: "Choose Smart",
      desc: "Top UGC-approved universities matched to your goals.",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80",
      icon: <Building2 className="w-6 h-6" />
   },
   {
      id: "02",
      title: "Build Skills",
      desc: "Learn in-demand skills with expert-led training.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
      icon: <GraduationCap className="w-6 h-6" />
   },
   {
      id: "03",
      title: "Get Experience",
      desc: "Internships, live projects & industry exposure that build your resume.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      icon: <Briefcase className="w-6 h-6" />
   }
];

const CAREER_ECOSYSTEM_DATA = [
   {
      title: "Personalized Career Guidance",
      desc: "Get expert guidance to choose the right path for your future.",
      icon: <Target className="w-10 h-10 text-blue-600" />
   },
   {
      title: "Industry-Aligned Curriculum",
      desc: "Learn skills that companies need, not just theory.",
      icon: <Activity className="w-10 h-10 text-blue-600" />
   },
   {
      title: "Internships & Live Projects",
      desc: "Gain real-world experience while you study.",
      icon: <Briefcase className="w-10 h-10 text-blue-600" />
   },
   {
      title: "Placement Assistance",
      desc: "Resume building, mock interviews & job support.",
      icon: <Users className="w-10 h-10 text-blue-600" />
   },
   {
      title: "Career Growth Support",
      desc: "Continuous support even after you get placed.",
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />
   }
];

const TESTIMONIALS = [
   {
      name: "Pawan Kumar",
      details: "MBA Student • Online Batch 2024",
      img: "https://i.ibb.co/BHjmfn0W/image.png",
      text: "I was confused between multiple online MBA programs. The comparison tool and expert career advice from Antechos made my decision crystal clear. Highly recommend their guidance!"
   },
   {
      name: "Shivam Jha",
      details: "MCA Professional • Batch 2024",
      img: "https://i.ibb.co/S7s5ncHK/image.png",
      text: "The technical specialization counseling helped me identify exactly which Cloud program would boost my salary. Antechos isn't just counseling; it's career engineering."
   },
   {
      name: "Ananya Verma",
      details: "BBA Student • Online Batch 2024",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      text: "The scholarship support I received through Antechos was life-changing. They handled all the documentation smoothly, and I'm now studying at a top-tier university with zero financial stress."
   },
   {
      name: "Rahul Sharma",
      details: "Executive MBA • Working Professional",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      text: "Balancing a high-pressure job with studies seemed impossible until I spoke to the Antechos team. Their recommendation for a flexible weekend-batch MBA was exactly what I needed."
   },
   {
      name: "Meera Reddy",
      details: "Digital Marketing Cert. • Batch 2024",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      text: "The placement intelligence reports provided by Antechos helped me switch to a high-paying role in a global tech firm. Their interview coaching is top-notch!"
   }
];

const TRUSTED_SHORTS = [
   {
      id: 1,
      title: "Got PLACEMENT SUPPORT from Antechos",
      views: "4.3K",
      thumbnail: "https://i.ibb.co/3m1gcCp7/PHOTO-2026-04-10-01-00-51.jpg",
      videoId: "dQw4w9WgXcQ"
   },
   {
      id: 2,
      title: "MAHAK KASHYAP CAREER COUNSELLING HELPED TO SHAPE MY FUTURE IN BUSINESS",
      views: "19.4K",
      thumbnail: "https://i.ibb.co/rKc1fffG/PHOTO-2026-04-10-00-55-12.jpg",
      videoId: "dQw4w9WgXcQ"
   },
   {
      id: 3,
      title: "Chain Reaction An Experiment",
      views: "9.7K",
      thumbnail: "https://i.ibb.co/WNtsqTY8/PHOTO-2026-04-10-01-00-52-1.jpg",
      videoId: "dQw4w9WgXcQ"
   },
   {
      id: 4,
      title: "SNEHA SINGH TOOK ADMISSION WITHOUT ANY HUSTLE",
      views: "6K",
      thumbnail: "https://i.ibb.co/GG1FKVj/PHOTO-2026-04-10-01-01-06.jpg",
      videoId: "dQw4w9WgXcQ"
   },
   {
      id: 5,
      title: "Student Experience Review",
      views: "7.2K",
      thumbnail: "https://i.ibb.co/TxSPY34N/PHOTO-2026-04-10-01-15-29.jpg",
      videoId: "dQw4w9WgXcQ"
   },
   {
      id: 6,
      title: "How I chose my university",
      views: "12.1K",
      thumbnail: "https://i.ibb.co/FpqxdLV/PHOTO-2026-04-10-01-15-30.jpg",
      videoId: "dQw4w9WgXcQ"
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
   const [activeSegment, setActiveSegment] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [programIndex, setProgramIndex] = useState(0);
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
   const [isFaqOpen, setIsFaqOpen] = useState(false);
   const strategicIntelligenceRef = useRef(null);
   const uniScrollRef = useRef(null);
   const [isUniHovered, setIsUniHovered] = useState(false);
   const programsScrollRef = useRef(null);
   const [isProgramsHovered, setIsProgramsHovered] = useState(false);

   const [selectedShort, setSelectedShort] = useState(null);
   const [isShortsHovered, setIsShortsHovered] = useState(false);
   const shortsScrollRef = useRef(null);

   const scrollShorts = (direction) => {
      if (shortsScrollRef.current) {
         const scrollAmount = windowWidth < 768 ? 260 : 320;
         shortsScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
   };

   useEffect(() => {
      let interval;
      if (!isShortsHovered && !selectedShort) {
         interval = setInterval(() => {
            if (shortsScrollRef.current) {
               const { scrollLeft, scrollWidth, clientWidth } = shortsScrollRef.current;
               if (scrollLeft + clientWidth >= scrollWidth - 10) {
                  shortsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
               } else {
                  const scrollAmount = windowWidth < 768 ? 260 : 320;
                  shortsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
               }
            }
         }, 3000);
      }
      return () => clearInterval(interval);
   }, [isShortsHovered, selectedShort, windowWidth]);

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

   // Auto-scroll for university carousel New (card-by-card with snap support & infinite loop)
   useEffect(() => {
      let interval;
      if (!isUniHovered && !showAll) {
         interval = setInterval(() => {
            if (uniScrollRef.current) {
               const el = uniScrollRef.current;
               const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 340;
               const gap = 32; // gap-8 is 32px
               const scrollAmount = cardWidth + gap;
               const loopWidth = filteredUniversities.length * (cardWidth + gap);

               if (loopWidth > 0 && el.scrollLeft >= loopWidth * 1.5) {
                  el.scrollLeft = el.scrollLeft - loopWidth;
               }

               el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
         }, 3500);
      }
      return () => clearInterval(interval);
   }, [isUniHovered, showAll, windowWidth, filteredUniversities.length]);

   const handleUniScroll = (e) => {
      const el = e.currentTarget;
      const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 340;
      const gap = 32;
      const loopWidth = filteredUniversities.length * (cardWidth + gap);

      if (!loopWidth || loopWidth <= 0) return;

      // Seamless infinite wrapping threshold
      if (el.scrollLeft >= loopWidth * 1.5) {
         el.scrollLeft = el.scrollLeft - loopWidth;
      } else if (el.scrollLeft < 10) {
         el.scrollLeft = el.scrollLeft + loopWidth;
      }
   };

   const scrollUni = (direction) => {
      if (uniScrollRef.current) {
         const el = uniScrollRef.current;
         const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 340;
         const gap = 32; // gap-8 is 32px
         const scrollAmount = cardWidth + gap;
         const loopWidth = filteredUniversities.length * (cardWidth + gap);

         if (direction === 'left' && el.scrollLeft < scrollAmount + 10) {
            el.scrollLeft = el.scrollLeft + loopWidth;
         }
         el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
   };

   const filteredCourses = useMemo(() => {
      return courseType === 'All'
         ? OFFICIAL_COURSES
         : OFFICIAL_COURSES.filter(c => c.category === courseType);
   }, [courseType]);

   useEffect(() => {
      setCurrentIndex(0);
   }, [filterCategory, filterStream, searchTerm, finderStream, courseType, filteredCourses.length]);

   // Auto-scroll for programs carousel (card-by-card with snap support & infinite loop)
   useEffect(() => {
      let interval;
      if (!isProgramsHovered && !showAllPrograms) {
         interval = setInterval(() => {
            if (programsScrollRef.current) {
               const el = programsScrollRef.current;
               const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 300;
               const gap = 32; // gap-8 is 32px
               const scrollAmount = cardWidth + gap;
               const loopWidth = filteredCourses.length * (cardWidth + gap);

               if (loopWidth > 0 && el.scrollLeft >= loopWidth * 1.5) {
                  el.scrollLeft = el.scrollLeft - loopWidth;
               }

               el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
         }, 4000);
      }
      return () => clearInterval(interval);
   }, [isProgramsHovered, showAllPrograms, windowWidth, filteredCourses.length]);

   const handleProgramsScroll = (e) => {
      const el = e.currentTarget;
      const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 300;
      const gap = 32;
      const loopWidth = filteredCourses.length * (cardWidth + gap);

      if (!loopWidth || loopWidth <= 0) return;

      // Seamless infinite wrapping threshold
      if (el.scrollLeft >= loopWidth * 1.5) {
         el.scrollLeft = el.scrollLeft - loopWidth;
      } else if (el.scrollLeft < 10) {
         el.scrollLeft = el.scrollLeft + loopWidth;
      }
   };

   const scrollPrograms = (direction) => {
      if (programsScrollRef.current) {
         const el = programsScrollRef.current;
         const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 300;
         const gap = 32; // gap-8 is 32px
         const scrollAmount = cardWidth + gap;
         const loopWidth = filteredCourses.length * (cardWidth + gap);

         if (direction === 'left' && el.scrollLeft < scrollAmount + 10) {
            el.scrollLeft = el.scrollLeft + loopWidth;
         }
         el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
   };

   // Auto-play for Hero
   useEffect(() => {
      const interval = setInterval(() => {
         setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
      }, 5000);
      return () => clearInterval(interval);
   }, []);

   const handleUniversityClick = (link) => window.open(link, '_blank', 'noopener,noreferrer');

   const handlePrevProgram = () => setProgramIndex(prev => Math.max(prev - 1, 0));
   const handleNextProgram = () => setProgramIndex(prev => Math.min(prev + 1, filteredCourses.length - 1));

   return (
      <div className="uni-page-new min-h-screen overflow-x-clip max-w-[100vw] relative">
         <style>{styles}</style>

         {/* 1. HERO SECTION */}
         <section className="relative w-full bg-slate-950 overflow-hidden">

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
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
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

         {/* ==================== NEW SECTION 1: ONE DEGREE. ZERO DISTINCTIONS ==================== */}
         <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#020813] via-[#051129] to-[#020813] py-20 text-white border-b border-slate-900">
            {/* Spotlight Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="grid-pattern opacity-[0.02]" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">
               {/* Heading matching the image text colors and styles */}
               <div className="flex flex-col items-center text-center w-full max-w-3xl">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-none uppercase" style={{ fontFamily: "'Sora', sans-serif" }}>
                     <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent block">Online Degree</span>
                     <span className="block text-white text-sm sm:text-base font-normal my-4 tracking-[0.3em] opacity-80">— IS EQUIVALENT TO —</span>
                     <span className="text-sky-400 block">Regular Degree</span>
                  </h2>
               </div>

               {/* Visual: Certificates and Pedestals */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 w-full max-w-4xl py-6">
                  {/* Left Certificate: Online */}
                  <div className="flex flex-col items-center">
                     <div className="relative rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 z-10">
                        {/* Certificate Card */}
                        <div className="bg-[#FAF6F0] border-[8px] border-[#0a1c30] ring-1 ring-[#c5a880] rounded-[4px] p-5 w-[16rem] h-[22rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between text-slate-800 relative">
                           {/* Intricate Inner Border */}
                           <div className="absolute inset-1 border border-[#c5a880]/30 rounded"></div>

                           {/* Header Icon */}
                           <div className="flex flex-col items-center mt-2 z-10">
                              <GraduationCap className="w-8 h-8 text-[#bfa15f] mb-1" />
                              <h4 className="font-extrabold text-[13px] text-[#0f223a] tracking-[0.1em] font-serif uppercase">ONLINE DEGREE</h4>
                           </div>

                           {/* Gold Graphic Separator */}
                           <div className="flex items-center justify-center w-24 my-1 z-10">
                              <div className="h-[1px] bg-[#bfa15f] flex-1"></div>
                              <div className="w-1.5 h-1.5 rotate-45 border border-[#bfa15f] bg-[#FAF6F0] mx-1 shrink-0"></div>
                              <div className="h-[1px] bg-[#bfa15f] flex-1"></div>
                           </div>

                           {/* Body */}
                           <div className="w-full flex-1 flex flex-col items-center justify-center text-center mt-2 z-10">
                              <p className="text-[11px] font-bold text-slate-700 font-serif italic">Bachelor of Science</p>
                              <div className="w-16 h-[1px] bg-[#bfa15f]/40 my-1.5"></div>
                              <p className="text-[9px] text-slate-500 leading-normal max-w-[12rem] font-serif font-medium">
                                 This is to certify that the degree has been awarded after successful completion of the prescribed course of study.
                              </p>
                           </div>

                           {/* Footer */}
                           <div className="w-full flex items-end justify-between mt-2 z-10 px-2">
                              <div className="flex flex-col items-start">
                                 <span className="font-serif text-[8px] text-slate-400 italic">Registrar</span>
                                 <div className="w-8 h-[1px] bg-slate-200"></div>
                              </div>
                              <div className="relative w-8 h-8 flex items-center justify-center">
                                 <Award className="w-8 h-8 text-[#bfa15f]" />
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Glowing Ring Pedestal */}
                     <div className="w-[18rem] h-6 bg-[#0a1931] border border-sky-400/50 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.9),_inset_0_1px_3px_rgba(255,255,255,0.2),_0_0_25px_rgba(56,189,248,0.7),_0_0_50px_rgba(37,99,235,0.5)] flex items-center justify-center -mt-3 z-0">
                        <div className="w-[90%] h-[70%] rounded-full bg-sky-500/5 blur-[2px]"></div>
                     </div>
                  </div>

                  {/* Gold 3D Equals Sign */}
                  <div className="flex flex-col gap-2 items-center justify-center my-6 md:my-0">
                     <div className="w-16 h-3 bg-gradient-to-b from-[#f9d976] via-[#e9b646] to-[#b37a1c] border border-[#f9d976]/30 rounded-[2px] shadow-[0_4px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.3)]"></div>
                     <div className="w-16 h-3 bg-gradient-to-b from-[#f9d976] via-[#e9b646] to-[#b37a1c] border border-[#f9d976]/30 rounded-[2px] shadow-[0_4px_10px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.3)]"></div>
                  </div>

                  {/* Right Certificate: Regular */}
                  <div className="flex flex-col items-center">
                     <div className="relative rotate-[2.5deg] hover:rotate-0 transition-transform duration-500 z-10">
                        {/* Certificate Card */}
                        <div className="bg-[#FAF6F0] border-[8px] border-[#0a1c30] ring-1 ring-[#c5a880] rounded-[4px] p-5 w-[16rem] h-[22rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between text-slate-800 relative">
                           {/* Intricate Inner Border */}
                           <div className="absolute inset-1 border border-[#c5a880]/30 rounded"></div>

                           {/* Header Icon */}
                           <div className="flex flex-col items-center mt-2 z-10">
                              <Building2 className="w-8 h-8 text-[#bfa15f] mb-1" />
                              <h4 className="font-extrabold text-[13px] text-[#0f223a] tracking-[0.1em] font-serif uppercase">REGULAR DEGREE</h4>
                           </div>

                           {/* Gold Graphic Separator */}
                           <div className="flex items-center justify-center w-24 my-1 z-10">
                              <div className="h-[1px] bg-[#bfa15f] flex-1"></div>
                              <div className="w-1.5 h-1.5 rotate-45 border border-[#bfa15f] bg-[#FAF6F0] mx-1 shrink-0"></div>
                              <div className="h-[1px] bg-[#bfa15f] flex-1"></div>
                           </div>

                           {/* Body */}
                           <div className="w-full flex-1 flex flex-col items-center justify-center text-center mt-2 z-10">
                              <p className="text-[11px] font-bold text-slate-700 font-serif italic">Bachelor of Science</p>
                              <div className="w-16 h-[1px] bg-[#bfa15f]/40 my-1.5"></div>
                              <p className="text-[9px] text-slate-500 leading-normal max-w-[12rem] font-serif font-medium">
                                 This is to certify that the degree has been awarded after successful completion of the prescribed course of study.
                              </p>
                           </div>

                           {/* Footer */}
                           <div className="w-full flex items-end justify-between mt-2 z-10 px-2">
                              <div className="flex flex-col items-start">
                                 <span className="font-serif text-[8px] text-slate-400 italic">Registrar</span>
                                 <div className="w-8 h-[1px] bg-slate-200"></div>
                              </div>
                              <div className="relative w-8 h-8 flex items-center justify-center">
                                 <Award className="w-8 h-8 text-[#bfa15f]" />
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Glowing Ring Pedestal */}
                     <div className="w-[18rem] h-6 bg-[#0a1931] border border-sky-400/50 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.9),_inset_0_1px_3px_rgba(255,255,255,0.2),_0_0_25px_rgba(56,189,248,0.7),_0_0_50px_rgba(37,99,235,0.5)] flex items-center justify-center -mt-3 z-0">
                        <div className="w-[90%] h-[70%] rounded-full bg-sky-500/5 blur-[2px]"></div>
                     </div>
                  </div>
               </div>

               {/* 4 Feature Badges with dividers like the image */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 w-full max-w-4xl mt-6 border-t border-slate-800/80 pt-12">
                  {/* Badge 1 */}
                  <div className="flex flex-col items-center text-center gap-3 px-4 border-r border-slate-800 last:border-r-0">
                     <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <Award className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-white" style={{ fontFamily: "'Sora', sans-serif" }}>UGC ENTITLED</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">&amp; RECOGNIZED</p>
                     </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="flex flex-col items-center text-center gap-3 px-4 border-none md:border-r border-slate-800 last:border-r-0">
                     <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <Briefcase className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-white" style={{ fontFamily: "'Sora', sans-serif" }}>EQUAL CAREER</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">OPPORTUNITIES</p>
                     </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="flex flex-col items-center text-center gap-3 px-4 border-r border-slate-800 last:border-r-0">
                     <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <GraduationCap className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-white" style={{ fontFamily: "'Sora', sans-serif" }}>SAME LEARNING</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">OUTCOMES</p>
                     </div>
                  </div>

                  {/* Badge 4 */}
                  <div className="flex flex-col items-center text-center gap-3 px-4 border-none last:border-none">
                     <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                        <Star className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="font-bold text-xs uppercase tracking-wider text-white" style={{ fontFamily: "'Sora', sans-serif" }}>SAME VALUE</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">SAME FUTURE</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* ==================== NEW SECTION 2: SAME DEGREE. 40-60% CHEAPER ==================== */}
         <section className="relative w-full overflow-hidden bg-slate-50 border-y border-slate-100 py-16 md:py-24">
            {/* Tech Grid Pattern */}
            <div className="grid-pattern opacity-60" />

            {/* Decorative bubbles */}
            <div className="absolute right-0 top-0 pointer-events-none overflow-hidden w-[15.625rem] z-0">
               <div className="absolute bg-[#c67133] h-[1.6875rem] left-0 opacity-[0.05] rounded-[1.25rem] top-[2.75rem] w-[15.625rem]"></div>
               <div className="absolute bg-[#c67133] h-[1.6875rem] left-[3.125rem] opacity-[0.05] rounded-[1.25rem] top-[5.6875rem] w-[12.5rem]"></div>
               <div className="absolute bg-[#c67133] h-[1.6875rem] left-[6.5rem] opacity-[0.05] rounded-[1.25rem] top-[8.625rem] w-[12.5rem]"></div>
            </div>

            <div className="relative z-10 flex flex-col gap-8 sm:gap-11 items-center w-full max-w-7xl mx-auto px-6">
               <div className="flex flex-col gap-2 items-center text-center w-full mb-12">
                  <SectionLabel icon={CreditCard}>Cost Efficiency</SectionLabel>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tighter" style={{ fontFamily: "'Sora', sans-serif" }}>
                     Same degree. <span className="text-blue-600">40–60% cheaper</span>
                  </h2>
                  <p className="font-medium text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl">
                     Pay for the degree, not the infrastructure.
                  </p>
               </div>

               {/* Mobile Layout */}
               <div className="flex sm:hidden flex-col gap-[0.375rem] relative z-10 w-full">
                  <div className="flex flex-col gap-[0.375rem] items-center justify-center relative shrink-0 w-full">
                     <div className="relative shrink-0 overflow-hidden" style={{ height: '240px', width: '350px' }}>
                        {/* ON CAMPUS */}
                        <div className="absolute bg-[rgba(255,255,255,0.8)] border-[0.5px] border-[rgba(184,77,0,0.1)] h-[5.375rem] left-0 overflow-hidden rounded-[0.75rem] top-0 w-[21.875rem]">
                           <div className="absolute flex flex-col gap-[0.75rem] items-start justify-center left-[11.5px] top-1/2 -translate-y-1/2 whitespace-nowrap text-left">
                              <p className="font-bold leading-[0.625rem] text-[0.75rem] text-[rgba(184,77,0,0.8)] tracking-[1.2px] uppercase">ON-CAMPUS — ANNUAL</p>
                              <p className="font-bold leading-[1.0625rem] text-[1.125rem] text-[#343434]" style={{ fontFamily: "'Sora', sans-serif" }}>₹4,00,000 - 1500000+</p>
                           </div>
                           <div className="absolute h-[5.375rem] left-[6.84375rem] top-0 w-[15rem] overflow-visible">
                              <div className="absolute flex h-[2.375rem] items-center justify-center left-[4.4375rem] top-[0.875rem] w-[5.4375rem]">
                                 <div className="flex-none rotate-[9.28deg]">
                                    <div className="bg-white border-[0.732px] border-[rgba(255,106,0,0.2)] flex h-[1.5625rem] items-center justify-center px-[0.71875rem] py-[0.4375rem] rounded-[1.375rem] shadow-[0px_4.4px_17.6px_0px_rgba(255,106,0,0.1)]">
                                       <p className="font-bold leading-none text-[9.7px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Tuition ₹1.2L</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="absolute flex h-[2.625rem] items-center justify-center left-[4.71875rem] top-[2.9375rem] w-[5.5rem]">
                                 <div className="flex-none rotate-[-11.57deg]">
                                    <div className="bg-white border-[0.732px] border-[rgba(255,106,0,0.2)] flex h-[1.5625rem] items-center justify-center px-[0.71875rem] py-[0.4375rem] rounded-[1.375rem] shadow-[0px_4.4px_17.6px_0px_rgba(255,106,0,0.1)]">
                                       <p className="font-bold leading-none text-[9.7px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Hostel ₹80K</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="absolute flex h-[2.1875rem] items-center justify-center left-[9.625rem] top-[1.4375rem] w-[4.9375rem]">
                                 <div className="flex-none rotate-[7.17deg]">
                                    <div className="bg-white border-[0.732px] border-[rgba(255,106,0,0.2)] flex h-[1.5625rem] items-center justify-center px-[0.71875rem] py-[0.4375rem] rounded-[1.375rem] shadow-[0px_4.4px_17.6px_0px_rgba(255,106,0,0.1)]">
                                       <p className="font-bold leading-none text-[9.7px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Food ₹50K</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="absolute flex h-[2.0625rem] items-center justify-center left-[9.875rem] top-[3.375rem] w-[5.25rem]">
                                 <div className="flex-none rotate-[-5.34deg]">
                                    <div className="bg-white border-[0.732px] border-[rgba(255,106,0,0.2)] flex h-[1.5625rem] items-center justify-center px-[0.71875rem] py-[0.4375rem] rounded-[1.375rem] shadow-[0px_4.4px_17.6px_0px_rgba(255,106,0,0.1)]">
                                       <p className="font-bold leading-none text-[9.7px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Travel ₹30K</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* ONLINE */}
                        <div className="absolute bg-[rgba(255,255,255,0.8)] border-[0.559px] border-[rgba(37,99,235,0.1)] h-[8.125rem] left-0 overflow-hidden rounded-[0.75rem] top-[6.375rem] w-[11.4375rem]">
                           <div className="absolute flex flex-col gap-[0.75rem] items-start justify-center left-[calc(50%-5.5px)] top-[calc(50%-27px)] -translate-x-1/2 -translate-y-1/2 text-left">
                              <p className="font-bold leading-[0.625rem] text-[0.75rem] text-[rgba(37,99,235,0.75)] tracking-[1.2px] uppercase w-[8.6875rem]">ONLINE — Annual</p>
                              <p className="font-bold leading-[1.0625rem] text-[1.125rem] text-[#343434] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>₹70,000-1,50,000</p>
                           </div>
                           <div className="absolute left-[calc(50%+1.14px)] top-[calc(50%+33px)] -translate-x-1/2 -translate-y-1/2 bg-white border-[0.668px] border-[rgba(37,99,235,0.15)] flex h-[1.6875rem] items-center justify-center px-[10.7px] py-[6.7px] rounded-[1.25rem] shadow-[0px_4px_16px_0px_rgba(37,99,235,0.08)]">
                              <p className="font-bold leading-none text-[10.7px] text-[rgba(37,99,235,0.75)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Tuition Fee only</p>
                           </div>
                        </div>

                        {/* SAVINGS */}
                        <div className="absolute border-[0.559px] border-emerald-100 h-[8.125rem] left-[12.4375rem] overflow-hidden rounded-[0.75rem] top-[6.375rem] w-[9.4375rem] bg-emerald-50/70">
                           <div className="absolute flex flex-col items-start justify-center left-[13.44px] top-[15.44px] text-left">
                              <p className="font-bold leading-[1.0625rem] text-[1.25rem] text-emerald-700 whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>40–60%</p>
                           </div>
                           <div className="absolute flex flex-col gap-[7.5px] items-start left-[13.44px] right-[13.44px] top-[46.44px] text-left">
                              <p className="font-bold leading-[1.2] text-[0.875rem] text-slate-900 w-full" style={{ fontFamily: "'Sora', sans-serif" }}>₹1.5–2L saved annually</p>
                              <p className="font-medium text-[0.75rem] text-emerald-600 w-full">EMI from ₹3,000/month</p>
                           </div>
                        </div>

                        {/* ARROW */}
                        <div className="absolute flex h-[2.875rem] items-center justify-center left-[9.625rem] top-[5.75rem] w-[3.625rem]">
                           <div className="-scale-y-100 flex-none rotate-[-24.81deg]">
                              <div className="relative h-[1.625rem] w-[3.25rem]">
                                 <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/ARROW_ICON_same_figma.svg" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col gap-[1.5rem] items-start w-full text-left">
                     <div className="flex flex-col gap-[0.75rem] items-start w-full">
                        <div className="bg-[rgba(255,255,255,0.6)] border border-slate-200 flex gap-[0.5rem] items-center p-[0.75rem] rounded-[0.5rem] w-full">
                           <div className="relative shrink-0 w-[1.25rem] h-[1.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/VERIFIED_same_figma.svg" />
                           </div>
                           <p className="flex-1 font-medium text-[0.875rem] leading-[1.2] text-[#343434]">Add certifications from Google, AWS &amp; more</p>
                        </div>
                        <div className="bg-[rgba(255,255,255,0.6)] border border-slate-200 flex gap-[0.5rem] items-center p-[0.75rem] rounded-[0.5rem] w-full">
                           <div className="relative shrink-0 w-[1.25rem] h-[1.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/VERIFIED_same_figma.svg" />
                           </div>
                           <p className="flex-1 font-medium text-[0.875rem] leading-[1.2] text-[#343434]">Build a cushion. Graduate debt-free.</p>
                        </div>
                        <div className="bg-[rgba(255,255,255,0.6)] border border-slate-200 flex gap-[0.5rem] items-center p-[0.75rem] rounded-[0.5rem] w-full">
                           <div className="relative shrink-0 w-[1.25rem] h-[1.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/VERIFIED_same_figma.svg" />
                           </div>
                           <p className="flex-1 font-medium text-[0.875rem] leading-[1.2] text-[#343434]">Travel. Explore. Learn. Live your 20s fully.</p>
                        </div>
                     </div>
                     <button
                        type="button"
                        onClick={() => setShowEnquiry(true)}
                        className="bg-slate-900 hover:bg-blue-600 flex gap-[0.5rem] items-center justify-center w-full overflow-hidden pl-[1.25rem] pr-[1rem] py-[0.75rem] rounded-[2.5rem] text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-95"
                     >
                        <span className="whitespace-nowrap">Still waiting? Start today</span>
                        <div className="relative shrink-0 w-[0.4375rem] h-[0.8125rem]">
                           <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/ARROW_FWD_same_figma.svg" />
                        </div>
                     </button>
                  </div>
               </div>

               {/* Desktop Layout */}
               <div className="hidden sm:flex gap-[3.75rem] items-center justify-between w-full relative z-10">
                  {/* Left Column visual box */}
                  <div className="relative h-[24rem] w-[38rem] shrink-0">
                     {/* ON CAMPUS */}
                     <div className="absolute bg-[rgba(255,255,255,0.8)] border border-slate-200/60 h-[7.5625rem] left-[1.25rem] overflow-hidden rounded-[0.75rem] top-[0.25rem] w-[36.625rem]">
                        <div className="absolute -translate-y-1/2 flex flex-col gap-5 items-start justify-center left-[1.5625rem] top-1/2 text-left">
                           <p className="font-bold text-[0.875rem] leading-[1.125rem] text-[rgba(184,77,0,0.8)] tracking-[1.4px] uppercase">ON-CAMPUS — ANNUAL</p>
                           <p className="font-bold text-[1.625rem] leading-[1.875rem] text-[#343434]" style={{ fontFamily: "'Sora', sans-serif" }}>₹4,00,000 - ₹15,00,000+</p>
                        </div>
                        <div className="absolute h-[7.5625rem] left-[15.3125rem] overflow-hidden top-[-1px] w-[21.25rem]">
                           <div className="absolute flex h-[3.8125rem] items-center justify-center left-[4.125rem] top-[0.4375rem] w-[8.5625rem]">
                              <div className="rotate-[9.28deg]">
                                 <div className="bg-white border border-[rgba(255,106,0,0.2)] flex items-center justify-center px-[18.5px] py-[11.6px] rounded-[2.1875rem] shadow-[0px_6.9px_27.8px_0px_rgba(255,106,0,0.1)]">
                                    <p className="font-bold text-[15.3px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Tuition ₹5L</p>
                                 </div>
                              </div>
                           </div>
                           <div className="absolute flex h-[4.125rem] items-center justify-center left-[4.5rem] top-[3.6875rem] w-[8.6875rem]">
                              <div className="rotate-[-11.57deg]">
                                 <div className="bg-white border border-[rgba(255,106,0,0.2)] flex items-center justify-center px-[18.5px] py-[11.6px] rounded-[2.1875rem] shadow-[0px_6.9px_27.8px_0px_rgba(255,106,0,0.1)]">
                                    <p className="font-bold text-[15.3px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Hostel ₹2L</p>
                                 </div>
                              </div>
                           </div>
                           <div className="absolute flex h-[3.4375rem] items-center justify-center left-[12.3125rem] top-[1.3125rem] w-[7.875rem]">
                              <div className="rotate-[7.17deg]">
                                 <div className="bg-white border border-[rgba(255,106,0,0.2)] flex items-center justify-center px-[18.5px] py-[11.6px] rounded-[2.1875rem] shadow-[0px_6.9px_27.8px_0px_rgba(255,106,0,0.1)]">
                                    <p className="font-bold text-[15.3px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Food ₹60K</p>
                                 </div>
                              </div>
                           </div>
                           <div className="absolute flex h-[3.25rem] items-center justify-center left-[12.6875rem] top-[4.375rem] w-[8.3125rem]">
                              <div className="rotate-[-5.34deg]">
                                 <div className="bg-white border border-[rgba(255,106,0,0.2)] flex items-center justify-center px-[18.5px] py-[11.6px] rounded-[2.1875rem] shadow-[0px_6.9px_27.8px_0px_rgba(255,106,0,0.1)]">
                                    <p className="font-bold text-[15.3px] text-[rgba(184,77,0,0.8)] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Travel ₹50K</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* ONLINE */}
                     <div className="absolute bg-[rgba(255,255,255,0.8)] border border-blue-100 h-[7.5625rem] left-[1.25rem] overflow-hidden rounded-[0.75rem] top-[8.875rem] w-[26.5rem]">
                        <div className="absolute -translate-y-1/2 flex flex-col gap-5 items-start justify-center left-[1.5625rem] top-1/2 text-left">
                           <p className="font-bold text-[0.875rem] leading-[1.125rem] text-[#2563eb] tracking-[1.4px] uppercase">ONLINE — Annual</p>
                           <p className="font-bold text-[1.625rem] leading-[1.875rem] text-[#343434]" style={{ fontFamily: "'Sora', sans-serif" }}>₹70,000-2,50,000</p>
                        </div>
                        <div className="absolute h-[7.5625rem] left-[15.4375rem] overflow-hidden top-[-1px] w-[11.3125rem]">
                           <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex h-[3.5625rem] items-center justify-center w-[8.875rem]">
                              <div className="rotate-[9.02deg]">
                                 <div className="bg-white border border-blue-100 flex items-center justify-center px-[14.2px] py-[8.9px] rounded-[1.6875rem] shadow-[0px_5.3px_21.3px_0px_rgba(37,99,235,0.08)]">
                                    <p className="font-bold text-[14.2px] text-[#2563eb] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>Tuition Fee only</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* SAVINGS */}
                     <div className="absolute border border-emerald-100 h-[4.875rem] left-[1.25rem] rounded-[0.75rem] top-[18.5625rem] w-[26.5rem] bg-emerald-50/70">
                        <p className="absolute font-bold left-[1.5625rem] top-1/2 -translate-y-1/2 text-emerald-700" style={{ fontFamily: "'Sora', sans-serif" }}>
                           <span className="text-[1.5rem] leading-none">70–80</span>
                           <span className="text-[1.25rem] leading-none">%</span>
                        </p>
                        <div className="absolute -translate-y-1/2 flex flex-col gap-[0.625rem] items-start left-[8.8125rem] top-1/2 text-left">
                           <p className="font-bold text-[1rem] text-[#181818] whitespace-nowrap" style={{ fontFamily: "'Sora', sans-serif" }}>₹1.5–2L saved annually</p>
                           <p className="font-medium text-[0.875rem] text-emerald-600">EMI from ₹3,000/month</p>
                        </div>
                     </div>

                     {/* ARROW */}
                     <div className="absolute flex h-[4.1875rem] items-center justify-center left-[1.25rem] top-[15.6875rem] w-[2.75rem]">
                        <div className="rotate-[101.96deg]">
                           <div className="relative h-[1.9375rem] w-[3.875rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/ARROW_ICON_same_figma.svg" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right Column text */}
                  <div className="flex flex-col gap-6 items-start w-[23.75rem] text-left">
                     <div className="flex flex-col gap-4 items-start w-full">
                        <h3 className="font-black text-xl md:text-2xl text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                           Reinvest the<br />difference
                        </h3>
                        <p className="font-medium text-[0.875rem] leading-[1.5] text-[#5e5e5e] w-full">
                           The money you save on campus costs is yours to keep. Here's what you can actually do with it.
                        </p>
                        <div className="flex flex-col gap-4 items-start w-full">
                           <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.4)] border border-[rgba(215,215,215,0.2)] flex gap-3 items-center p-3 rounded-lg w-full">
                              <div className="relative shrink-0 w-[1.25rem] h-[1.25rem]">
                                 <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/VERIFIED_same_figma.svg" />
                              </div>
                              <p className="font-medium text-[0.875rem] leading-none text-[#343434] whitespace-nowrap">Add certifications from Google, AWS &amp; more</p>
                           </div>
                           <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.4)] border border-[rgba(215,215,215,0.2)] flex gap-3 items-center p-3 rounded-lg w-full">
                              <div className="relative shrink-0 w-[1.25rem] h-[1.25rem]">
                                 <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/VERIFIED_same_figma.svg" />
                              </div>
                              <p className="font-medium text-[0.875rem] leading-none text-[#343434] whitespace-nowrap">Build a cushion. Graduate debt-free.</p>
                           </div>
                           <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.4)] border border-[rgba(215,215,215,0.2)] flex gap-3 items-center p-3 rounded-lg w-full">
                              <div className="relative shrink-0 w-[1.25rem] h-[1.25rem]">
                                 <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/VERIFIED_same_figma.svg" />
                              </div>
                              <p className="font-medium text-[0.875rem] leading-none text-[#343434] whitespace-nowrap">Travel. Explore. Learn. Live your 20s fully.</p>
                           </div>
                        </div>
                     </div>

                     <button
                        type="button"
                        onClick={() => setShowEnquiry(true)}
                        className="bg-slate-900 hover:bg-blue-600 flex gap-2 items-center justify-center overflow-hidden pl-7 pr-6 py-4 rounded-[2.5rem] text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-95"
                     >
                        <span className="whitespace-nowrap">Still waiting? Start today</span>
                        <div className="relative shrink-0 w-[0.4375rem] h-[0.8125rem] mt-[0.5px] ml-2">
                           <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/ARROW_FWD_same_figma.svg" />
                        </div>
                     </button>
                  </div>
               </div>
            </div>
         </section>
         {/* 5. WHY CHOOSE ANTECHOS STRIP (Image 3) */}
         <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
               <div className="bg-[#051129] rounded-[2rem] py-10 px-6 md:px-12 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 text-center mb-10">
                     <h2 className="text-2xl md:text-3xl font-black text-white font-display">
                        Why Students Choose <span className="text-blue-500">Antechos</span>
                     </h2>
                  </div>

                  <div className="relative z-10 flex flex-nowrap items-center justify-between gap-1 md:gap-4 lg:gap-6">
                     {[
                        { title: "UGC Approved", desc: "100% Recognized Degrees", icon: <ShieldCheck className="w-6 h-6" /> },
                        { title: "Industry-Aligned", desc: "Learn what companies actually need", icon: <BookOpen className="w-6 h-6" /> },
                        { title: "Expert Mentor", desc: "One-on-one guidance at every step", icon: <Users className="w-6 h-6" /> },
                        { title: "Career Outcome", desc: "Focused training for top career outcomes", icon: <Target className="w-6 h-6" /> },
                        { title: "EMI Options", desc: "Flexible payment plans for all", icon: <CreditCard className="w-6 h-6" /> }
                     ].map((item, idx) => (
                        <React.Fragment key={idx}>
                           <div className="flex flex-col lg:flex-row items-center gap-1 md:gap-2 lg:gap-4 group flex-1 min-w-0">
                              <div className="w-5 h-5 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl bg-blue-600/20 flex-shrink-0 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                 {React.cloneElement(item.icon, { className: "w-2.5 h-2.5 md:w-5 md:h-5 lg:w-6 lg:h-6" })}
                              </div>
                              <div className="text-center lg:text-left min-w-0 overflow-hidden">
                                 <h3 className="text-[5px] md:text-[10px] lg:text-sm font-bold text-white leading-tight truncate lg:whitespace-normal">{item.title}</h3>
                                 <p className="hidden xl:block text-[10px] text-slate-400 font-medium leading-tight mt-1">{item.desc}</p>
                              </div>
                           </div>
                           {idx < 4 && <div className="hidden lg:block w-px h-10 bg-white/10 mx-1 shrink-0"></div>}
                        </React.Fragment>
                     ))}
                  </div>
               </div>
            </div>
         </section>




         {/* 8. UNIVERSITY GRID */}
         <section className="py-12 md:py-24 bg-white" id="directory">
            <div className="w-full px-4 md:px-8">
               {/* SECTION HEADER */}
               <div className="flex flex-col justify-start items-start gap-8 mb-16 md:mb-24 max-w-[1400px] mx-auto">
                  <div className="text-left w-full">
                     <SectionLabel icon={Building2}>Institution Archive 2026</SectionLabel>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter w-full max-w-4xl">India's <span className="text-blue-600">Trusted & Prestigious</span> Online University.</h2>
                  </div>

                  <div className="self-center flex overflow-x-auto hide-scrollbar justify-center gap-2 md:gap-3 bg-white p-2 md:p-3 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm w-full mx-auto max-w-2xl">
                     {['All', 'Private', 'Public', 'Deemed'].map(cat => (
                        <button
                           key={cat}
                           onClick={() => setFilterCategory(cat)}
                           className={`flex-1 flex items-center justify-center whitespace-nowrap px-4 md:px-6 py-3 md:py-4 rounded-[1.5rem] md:rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filterCategory === cat
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
                     <div
                        className="relative group/carousel"
                        onMouseEnter={() => setIsUniHovered(true)}
                        onMouseLeave={() => setIsUniHovered(false)}
                     >
                        <div
                           ref={uniScrollRef}
                           className="flex gap-8 overflow-x-auto pb-4 items-stretch hide-scrollbar"
                           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                           {[...filteredUniversities, ...filteredUniversities].map((uni, idx) => (
                              <div
                                 key={`${uni.id}-${idx}`}
                                 className="flex-shrink-0 w-[270px] md:w-[340px] h-auto min-h-[520px] group flex flex-col bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)]"
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

                                 <div className="p-5 md:p-6 flex flex-col flex-grow text-left">
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
                              </div>
                           ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20 px-1 md:px-2">
                           <button
                              onClick={() => scrollUni('left')}
                              className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 cursor-pointer"
                           >
                              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                           </button>
                           <button
                              onClick={() => scrollUni('right')}
                              className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 cursor-pointer"
                           >
                              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-[1600px] mx-auto">
                        {filteredUniversities.map((uni) => (
                           <motion.div
                              key={uni.id}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className="group flex flex-col bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-100 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] h-auto min-h-[580px]"
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

                              <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
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

         {/* ==================== NEW SECTION 3: STUDY WHEN YOUR BRAIN IS READY ==================== */}
         <section className="relative w-full overflow-hidden py-16 md:py-24 bg-slate-50 border-b border-slate-100">
            {/* Tech Grid Pattern */}
            <div className="grid-pattern opacity-60" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 gap-12">
               {/* Left Column: Text & Cards */}
               <div className="flex flex-col gap-6 items-start w-full lg:w-[29.9375rem] text-left">
                  <div className="flex flex-col gap-2 items-start text-center lg:text-left w-full">
                     <SectionLabel icon={Zap}>Flexible Learning</SectionLabel>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tighter" style={{ fontFamily: "'Sora', sans-serif" }}>
                        Study when your <span className="text-blue-600">brain is ready</span>
                     </h2>
                     <p className="font-medium text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl">
                        Degree built around your life. Not a fixed timetable.
                     </p>
                  </div>

                  <div className="flex flex-col gap-3 items-start w-full">
                     <div className="bg-white border border-slate-100 flex gap-4 items-center overflow-hidden p-[0.8125rem] rounded-[0.75rem] w-full">
                        <div className="bg-blue-50/50 flex items-center justify-center rounded-[0.5rem] shrink-0 w-[3.75rem] h-[3.75rem] overflow-hidden">
                           <div className="relative w-[2.25rem] h-[2.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/liveatyourhour.png" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1">
                           <p className="font-black text-base text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Live at your hour</p>
                           <p className="font-normal text-[0.875rem] leading-[1.5] text-[#5e5e5e]">Morning or late-night batches available. Choose the time when you learn best.</p>
                        </div>
                     </div>
                     <div className="bg-white border border-slate-100 flex gap-4 items-center overflow-hidden p-[0.8125rem] rounded-[0.75rem] w-full">
                        <div className="bg-blue-50/50 flex items-center justify-center rounded-[0.5rem] shrink-0 w-[3.75rem] h-[3.75rem] overflow-hidden">
                           <div className="relative w-[2.25rem] h-[2.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/recordedsessions.png" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1">
                           <p className="font-black text-base text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Recorded lectures</p>
                           <p className="font-normal text-[0.875rem] leading-[1.5] text-[#5e5e5e]">Watch again, pause, rewind or learn at your own pace.</p>
                        </div>
                     </div>
                     <div className="bg-white border border-slate-100 flex gap-4 items-center overflow-hidden p-[0.8125rem] rounded-[0.75rem] w-full">
                        <div className="bg-blue-50/50 flex items-center justify-center rounded-[0.5rem] shrink-0 w-[3.75rem] h-[3.75rem] overflow-hidden">
                           <div className="relative w-[2.25rem] h-[2.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/weekendexamwindow.png" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1">
                           <p className="font-black text-base text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Weekend exam windows</p>
                           <p className="font-normal text-[0.875rem] leading-[1.5] text-[#5e5e5e]">Take your exams during windows that fit your week.</p>
                        </div>
                     </div>
                     <div className="bg-white border border-slate-100 flex gap-4 items-center overflow-hidden p-[0.8125rem] rounded-[0.75rem] w-full">
                        <div className="bg-blue-50/50 flex items-center justify-center rounded-[0.5rem] shrink-0 w-[3.75rem] h-[3.75rem] overflow-hidden">
                           <div className="relative w-[2.25rem] h-[2.25rem]">
                              <img alt="" className="w-full h-full object-contain" src="https://fmc-contents.s3.ap-south-1.amazonaws.com/assets/zerocommute.png" />
                           </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start flex-1">
                           <p className="font-black text-base text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Zero commute</p>
                           <p className="font-normal text-[0.875rem] leading-[1.5] text-[#5e5e5e]">Couch, café or commute. Your classroom goes where you go.</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Donut Clock Wheel */}
               <div className="flex-1 w-full flex flex-col items-center justify-center max-w-[28rem] relative py-12">
                  <div className="relative w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] flex items-center justify-center">

                     {/* SVG Segmented Donut Chart */}
                     <svg className="w-full h-full" viewBox="0 0 240 240">
                        <defs>
                           <linearGradient id="nightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#1e293b" />
                              <stop offset="100%" stopColor="#475569" />
                           </linearGradient>
                           <linearGradient id="morningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#38bdf8" />
                              <stop offset="100%" stopColor="#60a5fa" />
                           </linearGradient>
                           <linearGradient id="afternoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#60a5fa" />
                              <stop offset="100%" stopColor="#2563eb" />
                           </linearGradient>
                           <linearGradient id="eveningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#2563eb" />
                              <stop offset="100%" stopColor="#1d4ed8" />
                           </linearGradient>
                        </defs>

                        {/* Center Ring Border */}
                        <circle cx="120" cy="120" r="92" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                        <circle cx="120" cy="120" r="68" fill="none" stroke="#f1f5f9" strokeWidth="1" />

                        {/* Quadrant Segments (Rotated by -90deg so 12 o'clock is start) */}
                        <g transform="rotate(-90 120 120)">
                           {/* 12 AM to 6 AM (Night/Midnight Replay) - Quadrant 1 */}
                           <circle
                              cx="120" cy="120" r="80"
                              fill="none"
                              stroke="url(#nightGrad)"
                              strokeWidth={activeSegment === 'night' ? '28' : '22'}
                              strokeDasharray="125.66 502.65"
                              strokeDashoffset="0"
                              onMouseEnter={() => setActiveSegment('night')}
                              onMouseLeave={() => setActiveSegment(null)}
                              className="transition-all duration-300 cursor-pointer"
                           />

                           {/* 6 AM to 12 PM (Morning Batch) - Quadrant 2 */}
                           <circle
                              cx="120" cy="120" r="80"
                              fill="none"
                              stroke="url(#morningGrad)"
                              strokeWidth={activeSegment === 'morning' ? '28' : '22'}
                              strokeDasharray="125.66 502.65"
                              strokeDashoffset="-125.66"
                              onMouseEnter={() => setActiveSegment('morning')}
                              onMouseLeave={() => setActiveSegment(null)}
                              className="transition-all duration-300 cursor-pointer"
                           />

                           {/* 12 PM to 6 PM (Afternoon Batch) - Quadrant 3 */}
                           <circle
                              cx="120" cy="120" r="80"
                              fill="none"
                              stroke="url(#afternoonGrad)"
                              strokeWidth={activeSegment === 'afternoon' ? '28' : '22'}
                              strokeDasharray="125.66 502.65"
                              strokeDashoffset="-251.32"
                              onMouseEnter={() => setActiveSegment('afternoon')}
                              onMouseLeave={() => setActiveSegment(null)}
                              className="transition-all duration-300 cursor-pointer"
                           />

                           {/* 6 PM to 12 AM (Evening Batch) - Quadrant 4 */}
                           <circle
                              cx="120" cy="120" r="80"
                              fill="none"
                              stroke="url(#eveningGrad)"
                              strokeWidth={activeSegment === 'evening' ? '28' : '22'}
                              strokeDasharray="125.66 502.65"
                              strokeDashoffset="-376.99"
                              onMouseEnter={() => setActiveSegment('evening')}
                              onMouseLeave={() => setActiveSegment(null)}
                              className="transition-all duration-300 cursor-pointer"
                           />
                        </g>
                     </svg>

                     {/* 24/7 Center White Circle with animated text transitions */}
                     <div className="absolute w-[8.5rem] h-[8.5rem] sm:w-[10.5rem] sm:h-[10.5rem] bg-white rounded-full shadow-lg flex flex-col items-center justify-center border border-slate-100/50 overflow-hidden">
                        <AnimatePresence mode="wait">
                           {activeSegment === null && (
                              <motion.div
                                 key="default"
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.2 }}
                                 className="flex flex-col items-center justify-center text-center"
                              >
                                 <p className="font-extrabold text-2xl sm:text-3xl text-blue-600 tracking-tight leading-none mb-1">24/7</p>
                                 <p className="text-[8px] sm:text-[10px] font-black text-slate-400 tracking-widest leading-none">ALWAYS</p>
                                 <p className="text-[8px] sm:text-[10px] font-black text-slate-400 tracking-widest leading-none mt-0.5">ON</p>
                              </motion.div>
                           )}
                           {activeSegment === 'night' && (
                              <motion.div
                                 key="night"
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.2 }}
                                 className="flex flex-col items-center justify-center text-center p-2"
                              >
                                 <p className="font-extrabold text-xs sm:text-[13px] text-slate-900 tracking-tight leading-none mb-2">12 AM - 6 AM</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase">MIDNIGHT</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase mt-1">REPLAY</p>
                              </motion.div>
                           )}
                           {activeSegment === 'morning' && (
                              <motion.div
                                 key="morning"
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.2 }}
                                 className="flex flex-col items-center justify-center text-center p-2"
                              >
                                 <p className="font-extrabold text-xs sm:text-[13px] text-slate-900 tracking-tight leading-none mb-2">6 AM - 12 PM</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase">MORNING</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase mt-1">BATCH</p>
                              </motion.div>
                           )}
                           {activeSegment === 'afternoon' && (
                              <motion.div
                                 key="afternoon"
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.2 }}
                                 className="flex flex-col items-center justify-center text-center p-2"
                              >
                                 <p className="font-extrabold text-xs sm:text-[13px] text-slate-900 tracking-tight leading-none mb-2">12 PM - 6 PM</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase">AFTERNOON</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase mt-1">BATCH</p>
                              </motion.div>
                           )}
                           {activeSegment === 'evening' && (
                              <motion.div
                                 key="evening"
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.2 }}
                                 className="flex flex-col items-center justify-center text-center p-2"
                              >
                                 <p className="font-extrabold text-xs sm:text-[13px] text-slate-900 tracking-tight leading-none mb-2">6 PM - 12 AM</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase">EVENING</p>
                                 <p className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-widest leading-none uppercase mt-1">BATCH</p>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>

                     {/* Static Text Clock Labels around the wheel */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-[10px] font-bold text-slate-400">12 AM</div>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-[10px] font-bold text-slate-400">12 PM</div>
                     <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 text-[10px] font-bold text-slate-400">6 PM</div>

                     {/* Custom Badges with dynamic highlight styles */}
                     <div className={`absolute -right-4 top-[18%] bg-white border rounded-full px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[9px] sm:text-[10px] font-black whitespace-nowrap transition-all duration-300 ${activeSegment === 'night' ? 'scale-110 border-slate-400 text-slate-700 bg-slate-50 shadow-md' : 'border-slate-100 text-slate-500'}`}>
                        Midnight replay
                     </div>
                     <div className={`absolute -right-8 top-[48%] bg-white border rounded-full px-3 py-1 shadow-[0_4px_12px_rgba(37,99,235,0.06)] text-[9px] sm:text-[10px] font-black whitespace-nowrap transition-all duration-300 ${activeSegment === 'morning' ? 'scale-110 border-blue-400 text-blue-700 bg-blue-50 shadow-md' : 'border-blue-100 text-blue-600'}`}>
                        6 AM live batch
                     </div>
                     <div className={`absolute -left-6 bottom-[22%] bg-white border rounded-full px-3 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[9px] sm:text-[10px] font-black whitespace-nowrap transition-all duration-300 ${activeSegment === 'evening' ? 'scale-110 border-blue-500 text-blue-800 bg-blue-50 shadow-md' : 'border-slate-100 text-slate-500'}`}>
                        9 PM batch
                     </div>
                  </div>

                  {/* Legend below the clock */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-gradient-to-r from-sky-400 to-blue-400"></span>
                        <span className="text-xs font-bold text-slate-600">Morning</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-gradient-to-r from-blue-400 to-blue-600"></span>
                        <span className="text-xs font-bold text-slate-600">Afternoon</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-gradient-to-r from-blue-600 to-blue-800"></span>
                        <span className="text-xs font-bold text-slate-600">Evening</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-gradient-to-r from-slate-700 to-slate-500"></span>
                        <span className="text-xs font-bold text-slate-600">Night</span>
                     </div>
                  </div>
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

         {/* 6. CAREER JOURNEY PROCESS (Image 1) */}
         <section className="py-24 bg-slate-50/50 border-y border-slate-200">
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-5 gap-1 md:gap-4 lg:gap-6 relative">
                  {CAREER_JOURNEY_STEPS.map((step, idx) => (
                     <div key={idx} className="relative">
                        {/* Connecting Dashed Arrow (Scales with screen) */}
                        {idx < CAREER_JOURNEY_STEPS.length - 1 && (
                           <div className="absolute top-[20%] md:top-[30%] lg:top-1/3 -right-1 md:-right-4 lg:-right-8 z-20 w-2 md:w-8 lg:w-16 h-px border-t-[1px] md:border-t-2 border-dashed border-blue-200">
                              <div className="absolute right-0 -top-0.5 md:-top-1">
                                 <ChevronRight className="w-1 md:w-3 md:h-3 text-blue-200" />
                              </div>
                           </div>
                        )}

                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           viewport={{ once: true }}
                           className="bg-white rounded-lg md:rounded-3xl p-1.5 md:p-4 lg:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center relative z-10 group h-full"
                        >
                           {/* Step Number Badge */}
                           <div className="absolute top-0.5 left-0.5 md:top-4 md:left-4 w-3.5 h-3.5 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-[5px] md:text-xs font-black shadow-lg z-20">
                              {step.id}
                           </div>

                           <div className="w-5 h-5 md:w-16 md:h-16 lg:w-20 lg:h-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1 md:mb-6 lg:mb-8 border border-blue-100 group-hover:scale-110 transition-transform duration-500">
                              {React.cloneElement(step.icon, { className: "w-2.5 h-2.5 md:w-8 md:h-8 lg:w-10 lg:h-10" })}
                           </div>

                           <h3 className="text-[6px] md:text-[10px] lg:text-xl font-black text-slate-900 leading-tight lg:mb-4">{step.title}</h3>
                           <p className="hidden lg:block text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                        </motion.div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 6. OFFICIAL PROGRAM PORTFOLIOS */}
         <section ref={strategicIntelligenceRef} className="py-12 md:py-24 bg-white relative overflow-hidden" id="strategic-intelligence">
            <div className="w-full px-4 md:px-8">
               <div className="flex flex-col justify-start items-start gap-8 mb-16 md:mb-20 max-w-[1400px] mx-auto">
                  <div className="text-left w-full">
                     <SectionLabel icon={Award}>Curriculum Standards 2026</SectionLabel>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter w-full max-w-4xl">Explore Programs From <span className="text-blue-600">Top Ranked Universities</span></h2>
                  </div>
                  <div className="self-center flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-2 bg-slate-50 p-2 md:p-3 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 w-full mx-auto max-w-5xl mt-4 md:mt-0">
                     {['Integrated Program', 'Certification', 'Masters (PG)', "Bachelor's (UG)", 'Special'].map(tab => (//'All', 
                        <button
                           key={tab}
                           onClick={() => setCourseType(tab)}
                           className={`flex-1 min-w-fit flex items-center justify-center whitespace-nowrap px-4 md:px-6 py-3 md:py-4 rounded-[1.2rem] md:rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${courseType === tab ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
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
                              animate={{ x: -(programIndex * (windowWidth < 768 ? 260 + 24 : 300 + 32)) }}
                              transition={{ type: "spring", damping: 25, stiffness: 120 }}
                              drag="x"
                              dragConstraints={{
                                 right: 0,
                                 left: -((filteredCourses.length - 1) * (windowWidth < 768 ? 260 + 24 : 300 + 32))
                              }}
                              onDragEnd={(e, { offset }) => {
                                 pauseAutoplay();
                                 const swipeThreshold = 50;
                                 if (offset.x < -swipeThreshold) setProgramIndex(prev => Math.min(prev + 1, filteredCourses.length - 1));
                                 if (offset.x > swipeThreshold) setProgramIndex(prev => Math.max(prev - 1, 0));
                              }}
                           >
                              {filteredCourses.map((course, idx) => {
                                 const isImageLink = course.link && typeof course.link === 'string' && course.link.match(/\.(jpg|jpeg|png|webp|gif)$/i);
                                 const showPoster = isImageLink || course.image;
                                 return (
                                    <div
                                       key={idx}
                                       onClick={() => handleUniversityClick(course.link)}
                                       className="flex-shrink-0 w-[260px] md:w-[300px] h-auto min-h-[320px] md:min-h-[360px] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group border border-slate-200"
                                    >
                                       <div className={`relative flex-1 bg-slate-900 flex flex-col items-center justify-center ${showPoster ? 'p-0' : 'p-6'} overflow-hidden`}>
                                          <img src={isImageLink ? course.link : (course.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80")} alt="Background" className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${showPoster ? 'opacity-100 group-hover:scale-105' : 'opacity-30 group-hover:scale-110 group-hover:opacity-40'}`} />

                                          {!showPoster && (
                                             <>
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/80 via-transparent to-transparent"></div>
                                                <div className="relative z-10 text-center flex flex-col items-center">
                                                   <div className="text-white/80 mb-3 scale-150 group-hover:text-blue-400 group-hover:scale-[1.8] transition-all duration-500">
                                                      {course.icon}
                                                   </div>
                                                   <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-xl leading-none text-center">
                                                      {course.name.replace(/Online\s?/i, '')}
                                                   </h3>
                                                </div>
                                             </>
                                          )}
                                       </div>
                                       <div className="bg-[#1a36a8] group-hover:bg-[#152a85] transition-colors h-[64px] md:h-[72px] shrink-0 px-4 flex items-center justify-center">
                                          <span className="text-white font-black text-[13px] md:text-[14px] uppercase tracking-widest text-center line-clamp-2">
                                             {course.name.toUpperCase().includes('ONLINE') ? course.name.toUpperCase() : `${course.name.toUpperCase()} ONLINE`}
                                          </span>
                                       </div>
                                    </div>
                                 );
                              })}
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
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 items-stretch">
                        {filteredCourses.map((course, idx) => {
                           const isImageLink = course.link && typeof course.link === 'string' && course.link.match(/\.(jpg|jpeg|png|webp|gif)$/i);
                           const showPoster = isImageLink || course.image;
                           return (
                              <motion.div
                                 key={idx}
                                 initial={{ opacity: 0, y: 30 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: idx * 0.05 }}
                                 onClick={() => handleUniversityClick(course.link)}
                                 className="rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group border border-slate-200 h-full min-h-[320px] md:min-h-[360px]"
                              >
                                 <div className={`relative flex-1 bg-slate-900 flex flex-col items-center justify-center ${showPoster ? 'p-0' : 'p-6'} overflow-hidden`}>
                                    <img src={isImageLink ? course.link : (course.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80")} alt="Background" className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${showPoster ? 'opacity-100 group-hover:scale-105' : 'opacity-30 group-hover:scale-110 group-hover:opacity-40'}`} />

                                    {!showPoster && (
                                       <>
                                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/80 via-transparent to-transparent"></div>
                                          <div className="relative z-10 text-center flex flex-col items-center">
                                             <div className="text-white/80 mb-3 scale-150 group-hover:text-blue-400 group-hover:scale-[1.8] transition-all duration-500">
                                                {course.icon}
                                             </div>
                                             <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider drop-shadow-xl leading-none text-center">
                                                {course.name.replace(/Online\s?/i, '')}
                                             </h3>
                                          </div>
                                       </>
                                    )}
                                 </div>
                                 <div className="bg-[#1a36a8] group-hover:bg-[#152a85] transition-colors h-[64px] md:h-[72px] shrink-0 px-4 flex items-center justify-center">
                                    <span className="text-white font-black text-[13px] md:text-[14px] uppercase tracking-widest text-center line-clamp-2">
                                       {course.name.toUpperCase().includes('ONLINE') ? course.name.toUpperCase() : `${course.name.toUpperCase()} ONLINE`}
                                    </span>
                                 </div>
                              </motion.div>
                           );
                        })}
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
         </section>





         {/* TRUSTED VOICES / SHORTS SECTION */}
         < section
            className="py-12 md:py-20 bg-slate-50 border-t border-slate-100"
            onMouseEnter={() => setIsShortsHovered(true)}
            onMouseLeave={() => setIsShortsHovered(false)}
         >
            <div className="container mx-auto px-6 max-w-7xl relative">
               <div className="mb-10 text-left">
                  <p className="text-slate-500 font-medium text-lg uppercase tracking-widest mb-2">Trusted Voices</p>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                     <span className="text-blue-600">Hear them</span> out
                  </h2>
               </div>

               {/* Left Arrow */}
               <button
                  onClick={() => scrollShorts('left')}
                  className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:scale-110 transition-all hidden md:flex"
               >
                  <ChevronLeft className="w-6 h-6" />
               </button>

               {/* Right Arrow */}
               <button
                  onClick={() => scrollShorts('right')}
                  className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:scale-110 transition-all hidden md:flex"
               >
                  <ChevronRight className="w-6 h-6" />
               </button>

               <div
                  ref={shortsScrollRef}
                  className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 items-stretch"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
               >
                  {TRUSTED_SHORTS.map((short) => (
                     <div
                        key={short.id}
                        className="snap-start flex-shrink-0 w-[240px] md:w-[280px] h-[400px] md:h-[480px] bg-[#1c1c1c] rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        onClick={() => setSelectedShort(short)}
                     >
                        <img
                           src={short.thumbnail}
                           alt={short.title}
                           className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                        {/* Views Badge */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                           <span className="text-white text-[10px] font-bold">{short.views}</span>
                        </div>

                        {/* Play Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/60 group-hover:scale-110 group-hover:bg-blue-600/80 group-hover:border-blue-400 transition-all duration-300 shadow-2xl">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Modal Overlay via Portal */}
            {
               typeof document !== 'undefined' ? createPortal(
                  <AnimatePresence>
                     {selectedShort && (
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
                           onClick={() => setSelectedShort(null)}
                        >
                           <motion.div
                              initial={{ scale: 0.9, y: 20 }}
                              animate={{ scale: 1, y: 0 }}
                              exit={{ scale: 0.9, y: 20 }}
                              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                              className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl relative flex flex-col"
                              onClick={(e) => e.stopPropagation()}
                           >
                              {/* Header */}
                              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                                 <h3 className="font-bold text-slate-800 line-clamp-1">{selectedShort.title}</h3>
                                 <button
                                    onClick={() => setSelectedShort(null)}
                                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors shrink-0"
                                 >
                                    <X className="w-5 h-5" />
                                 </button>
                              </div>

                              {/* Video Player */}
                              <div className="relative w-full aspect-[9/16] bg-black">
                                 <iframe
                                    src={`https://www.youtube.com/embed/${selectedShort.videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${selectedShort.videoId}`}
                                    title="YouTube Shorts player"
                                    className="absolute top-0 left-0 w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                 ></iframe>
                              </div>
                           </motion.div>
                        </motion.div>
                     )}
                  </AnimatePresence>,
                  document.body
               ) : null
            }
         </section >



         {/* 9. SUCCESS STORIES - Redesigned */}
         < section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" >
            {/* Background decoration */}
            < div className="absolute inset-0 overflow-hidden pointer-events-none" >
               <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
               <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full opacity-50 blur-3xl"></div>
            </div >

            <div className="container mx-auto px-4 md:px-6 relative z-10">
               {/* Section Header */}
               <div className="text-center mb-12 md:mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                     <Users className="w-4 h-4 text-blue-600" />
                     <span className="text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-wider">Student Impact Reports</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight tracking-tight font-display">
                     Pathways to <span className="text-blue-600">Institutional Excellence</span>
                  </h2>
                  <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
                     Hear from graduates who transformed their professional trajectories through our strategic guidance.
                  </p>
               </div>

               {/* Testimonial Carousel */}
               <div className="relative max-w-7xl mx-auto">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={testimonialIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                     >
                        <div className="flex flex-col lg:flex-row">
                           {/* Image Side */}
                           <div className="lg:w-2/5 relative flex items-center justify-center p-8 lg:p-12">
                              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 md:border-[6px] border-white shadow-xl">
                                 <img
                                    src={TESTIMONIALS[testimonialIndex].img}
                                    className="w-full h-full object-cover"
                                    alt={TESTIMONIALS[testimonialIndex].name}
                                    onError={(e) => {
                                       e.target.src = 'https://placehold.co/200x200/f1f5f9/94a3b8?text=Student';
                                    }}
                                 />
                              </div>
                              {/* Overlay badge */}
                              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                 <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                       {[1, 2, 3, 4, 5].map(i => (
                                          <Star key={i} className="w-3 h-3 text-orange-400 fill-current" />
                                       ))}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">5.0</span>
                                 </div>
                              </div>
                           </div>

                           {/* Content Side */}
                           <div className="lg:w-3/5 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                              {/* Quote icon */}
                              <div className="text-blue-100 mb-4">
                                 <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                 </svg>
                              </div>

                              {/* Quote text */}
                              <blockquote className="text-base md:text-xl text-slate-700 leading-relaxed mb-6 md:mb-8 font-medium">
                                 "{TESTIMONIALS[testimonialIndex].text}"
                              </blockquote>

                              {/* Author info */}
                              <div className="flex items-center gap-4">
                                 <div className="flex-1">
                                    <p className="text-lg md:text-xl font-bold text-slate-900">
                                       {TESTIMONIALS[testimonialIndex].name}
                                    </p>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                                       {TESTIMONIALS[testimonialIndex].details}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center gap-3 mt-8 md:mt-10">
                     <button
                        onClick={() => setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                        className="w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                     >
                        <ChevronLeft className="w-5 h-5" />
                     </button>

                     {/* Dots */}
                     <div className="flex items-center gap-2 px-4">
                        {TESTIMONIALS.map((_, i) => (
                           <button
                              key={i}
                              onClick={() => setTestimonialIndex(i)}
                              className={`h-2 rounded-full transition-all duration-300 ${testimonialIndex === i
                                 ? "w-8 bg-blue-600"
                                 : "w-2 bg-slate-300 hover:bg-slate-400"
                                 }`}
                           />
                        ))}
                     </div>

                     <button
                        onClick={() => setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                        className="w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                     >
                        <ChevronRight className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
         </section >



         {/* INSTITUTIONAL PARTNERS / BRANDING SECTION */}
         < section className="py-12 md:py-16 bg-slate-950 relative overflow-hidden border-t border-slate-800" >
            {/* Fade overlays */}
            < div className="absolute top-0 bottom-0 left-0 w-24 md:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" ></div >
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

            <div style={{ transform: 'rotate(-6deg) scale(1.15)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
               {/* Row 1 - Moving Left */}
               <div style={{ display: 'flex', overflow: 'hidden' }}>
                  <div className="animate-marquee hover:[animation-play-state:paused]" style={{ display: 'flex', gap: 16, width: 'max-content', animationDuration: '40s' }}>
                     {[...Array(2)].flatMap(() => [
                        "https://i.ibb.co/Fkch65cW/PHOTO-2026-04-18-14-37-03-5.jpg",
                        "https://i.ibb.co/JjQ57C2S/PHOTO-2026-04-18-14-37-03-8.jpg",
                        "https://i.ibb.co/rKMV3j6c/PHOTO-2026-04-18-14-37-03-9.jpg",
                        "https://i.ibb.co/cXN7zLTC/PHOTO-2026-04-18-22-02-42-1.jpg",
                        "https://i.ibb.co/Z6fhPh62/PHOTO-2026-04-18-22-02-42.jpg",
                        "https://i.ibb.co/HDTJ7jHt/mba.jpg",
                        "https://i.ibb.co/TDdMDsmV/PHOTO-2026-04-18-22-03-54.jpg",
                        "https://i.ibb.co/mVWMrZ7q/PHOTO-2026-04-18-22-05-01-1.jpg",
                        "https://i.ibb.co/KzLb3Shg/PHOTO-2026-04-18-22-05-01.jpg",
                        "https://i.ibb.co/0pSh4MCp/PHOTO-2026-04-18-22-06-18.jpg",
                        "https://i.ibb.co/jvP7ghFL/PHOTO-2026-04-18-22-07-39.jpg",
                        "https://i.ibb.co/0yMMTRp3/PHOTO-2026-04-18-22-07-40.jpg",
                        "https://i.ibb.co/1wL5J95/PHOTO-2026-04-18-22-07-41.jpg",
                        "https://i.ibb.co/n81pj9mc/PHOTO-2026-04-18-22-07-42-1.jpg",
                        "https://i.ibb.co/d0tdbf65/PHOTO-2026-04-18-22-07-42.jpg",
                        "https://i.ibb.co/4wytr26b/PHOTO-2026-04-18-22-07-43-1.jpg",
                        "https://i.ibb.co/tPC0FHdB/PHOTO-2026-04-18-22-07-43.jpg",
                        "https://i.ibb.co/pjMDdXct/PHOTO-2026-04-18-22-09-08.jpg",
                        "https://i.ibb.co/HDyN62wr/PHOTO-2026-04-18-22-09-10-1.jpg",
                     ]).map((src, idx) => (
                        <div key={`row1-${idx}`} className="w-[160px] md:w-[200px] bg-white rounded-[12px] shadow-lg flex flex-col overflow-hidden flex-shrink-0" style={{ boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)' }}>
                           <div className="flex items-center px-2.5 py-2 gap-1.5 border-b border-gray-100 bg-white">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1px]">
                                 <div className="w-full h-full bg-white rounded-full p-[1px]">
                                    <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                                       <img src="/logo.png" alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                    </div>
                                 </div>
                              </div>
                              <span className="text-[10px] font-bold text-gray-900 tracking-tight">antechos.india</span>
                              <div className="ml-auto flex gap-0.5">
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                              </div>
                           </div>
                           <div className="w-full h-[160px] md:h-[200px] bg-gray-100 overflow-hidden relative">
                              <img src={src} alt="Post" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                           </div>
                           <div className="px-2.5 py-2 bg-white flex items-center gap-2 text-gray-800">
                              <svg aria-label="Like" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.297-2.163-1.565-4.663-3.746C4.78 14.023 2.5 12.012 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 1.575 1.175 2.434 0a4.213 4.213 0 0 1 3.475-1.941" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                              <svg aria-label="Comment" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                              <svg aria-label="Share" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                              <svg className="ml-auto" aria-label="Save" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Row 2 - Moving Right */}
               <div style={{ display: 'flex', overflow: 'hidden' }}>
                  <div className="animate-marquee-reverse hover:[animation-play-state:paused]" style={{ display: 'flex', gap: 16, width: 'max-content', animationDuration: '45s' }}>
                     {[...Array(2)].flatMap(() => [
                        "https://i.ibb.co/ynryF6Kh/PHOTO-2026-04-18-22-09-11.jpg",
                        "https://i.ibb.co/zW0kyMjL/PHOTO-2026-04-22-13-43-31-2.jpg",
                        "https://i.ibb.co/3m3GkGVr/PHOTO-2026-04-22-13-43-31.jpg",
                        "https://i.ibb.co/YBmhn0W1/PHOTO-2026-04-22-13-43-32-1.jpg",
                        "https://i.ibb.co/sd1qMvj4/PHOTO-2026-04-22-13-43-32.jpg",
                        "https://i.ibb.co/XxJN2zcv/PHOTO-2026-04-22-13-43-33-1.jpg",
                        "https://i.ibb.co/p6HmNxTx/PHOTO-2026-04-22-13-43-33-2.jpg",
                        "https://i.ibb.co/BHyqVDzb/PHOTO-2026-04-22-13-43-33.jpg",
                        "https://i.ibb.co/JjWCYp7y/PHOTO-2026-04-22-13-45-06.jpg",
                        "https://i.ibb.co/6RYkSJXH/PHOTO-2026-04-22-13-45-07-1.jpg",
                        "https://i.ibb.co/1GmBtvcJ/PHOTO-2026-04-22-13-45-07-2.jpg",
                        "https://i.ibb.co/KcgXL8vZ/PHOTO-2026-04-22-13-45-07.jpg",
                        "https://i.ibb.co/bMFJxZjC/PHOTO-2026-04-22-13-47-35.jpg",
                        "https://i.ibb.co/67mccv0b/PHOTO-2026-04-22-13-47-36-1.jpg",
                        "https://i.ibb.co/CLjCLVH/PHOTO-2026-04-22-13-47-36-2.jpg",
                        "https://i.ibb.co/2pXfMgb/PHOTO-2026-04-22-13-47-37-1.jpg",
                        "https://i.ibb.co/rR3CMYVw/PHOTO-2026-04-22-13-47-37-2.jpg",
                        "https://i.ibb.co/fGTWHq1w/PHOTO-2026-04-22-13-47-37-3.jpg",
                        "https://i.ibb.co/Z6D66xgb/PHOTO-2026-04-22-13-47-37.jpg",
                     ]).map((src, idx) => (
                        <div key={`row2-${idx}`} className="w-[160px] md:w-[200px] bg-white rounded-[12px] shadow-lg flex flex-col overflow-hidden flex-shrink-0" style={{ boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)' }}>
                           <div className="flex items-center px-2.5 py-2 gap-1.5 border-b border-gray-100 bg-white">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1px]">
                                 <div className="w-full h-full bg-white rounded-full p-[1px]">
                                    <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                                       <img src="/logo.png" alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                    </div>
                                 </div>
                              </div>
                              <span className="text-[10px] font-bold text-gray-900 tracking-tight">antechos.india</span>
                              <div className="ml-auto flex gap-0.5">
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                              </div>
                           </div>
                           <div className="w-full h-[160px] md:h-[200px] bg-gray-100 overflow-hidden relative">
                              <img src={src} alt="Post" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                           </div>
                           <div className="px-2.5 py-2 bg-white flex items-center gap-2 text-gray-800">
                              <svg aria-label="Like" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.297-2.163-1.565-4.663-3.746C4.78 14.023 2.5 12.012 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 1.575 1.175 2.434 0a4.213 4.213 0 0 1 3.475-1.941" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                              <svg aria-label="Comment" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                              <svg aria-label="Share" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                              <svg className="ml-auto" aria-label="Save" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Row 3 - Moving Left */}
               <div style={{ display: 'flex', overflow: 'hidden' }}>
                  <div className="animate-marquee hover:[animation-play-state:paused]" style={{ display: 'flex', gap: 16, width: 'max-content', animationDuration: '35s' }}>
                     {[...Array(2)].flatMap(() => [
                        "https://i.ibb.co/s9t8f9cX/PHOTO-2026-04-22-13-48-45-1.jpg",
                        "https://i.ibb.co/j9hn9pwJ/ba.jpg",
                        "https://i.ibb.co/DfFq1wfx/PHOTO-2026-04-22-13-48-46-1.jpg",
                        "https://i.ibb.co/ZsqRTnS/PHOTO-2026-04-22-13-48-46-2.jpg",
                        "https://i.ibb.co/xPWkkjQ/PHOTO-2026-04-22-13-48-46-3.jpg",
                        "https://i.ibb.co/LDw6gbJP/PHOTO-2026-04-22-13-48-46.jpg",
                        "https://i.ibb.co/nsqD37Gm/PHOTO-2026-04-22-13-48-47-1.jpg",
                        "https://i.ibb.co/21ttKj7K/PHOTO-2026-04-22-13-48-47.jpg",
                        "https://i.ibb.co/gbns88pY/PHOTO-2026-04-22-13-50-41-1.jpg",
                        "https://i.ibb.co/JWJWtp5y/PHOTO-2026-04-22-13-50-41.jpg",
                        "https://i.ibb.co/1J6Rzqzw/PHOTO-2026-04-22-13-50-42-1.jpg",
                        "https://i.ibb.co/4RSTzTjy/PHOTO-2026-04-22-13-50-42-2.jpg",
                        "https://i.ibb.co/ZRqW43bG/PHOTO-2026-04-22-13-50-42-3.jpg",
                        "https://i.ibb.co/21BM2pp2/PHOTO-2026-04-22-13-50-42-4.jpg",
                        "https://i.ibb.co/gFVC1j08/PHOTO-2026-04-22-13-50-42-5.jpg",
                        "https://i.ibb.co/TMfJpDtJ/PHOTO-2026-04-22-13-50-42.jpg",
                        "https://i.ibb.co/vvDmy3Zz/PHOTO-2026-04-22-13-50-43-1.jpg",
                        "https://i.ibb.co/VcKDPWGm/PHOTO-2026-04-22-13-50-43.jpg",
                        "https://i.ibb.co/kLHjBXP/bcs.jpg",
                        "https://i.ibb.co/dwk7Cz83/PHOTO-2026-04-22-13-52-09.jpg",
                     ]).map((src, idx) => (
                        <div key={`row3-${idx}`} className="w-[160px] md:w-[200px] bg-white rounded-[12px] shadow-lg flex flex-col overflow-hidden flex-shrink-0" style={{ boxShadow: '0 4px 16px -4px rgba(0,0,0,0.1)' }}>
                           <div className="flex items-center px-2.5 py-2 gap-1.5 border-b border-gray-100 bg-white">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1px]">
                                 <div className="w-full h-full bg-white rounded-full p-[1px]">
                                    <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                                       <img src="/logo.png" alt="avatar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                    </div>
                                 </div>
                              </div>
                              <span className="text-[10px] font-bold text-gray-900 tracking-tight">antechos.india</span>
                              <div className="ml-auto flex gap-0.5">
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                                 <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
                              </div>
                           </div>
                           <div className="w-full h-[160px] md:h-[200px] bg-gray-100 overflow-hidden relative">
                              <img src={src} alt="Post" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                           </div>
                           <div className="px-2.5 py-2 bg-white flex items-center gap-2 text-gray-800">
                              <svg aria-label="Like" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.297-2.163-1.565-4.663-3.746C4.78 14.023 2.5 12.012 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175 1.575 1.175 2.434 0a4.213 4.213 0 0 1 3.475-1.941" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                              <svg aria-label="Comment" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                              <svg aria-label="Share" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                              <svg className="ml-auto" aria-label="Save" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section >

         {/* ==================== NEW SECTION 4: WHAT HAPPENS AFTER GRADUATION? ==================== */}
         < section className="relative w-full overflow-hidden bg-white py-12 sm:py-[3.75rem]" >
            <div className="relative z-10 flex flex-col gap-12 items-center w-full max-w-7xl mx-auto px-6">
               <div className="flex flex-col gap-2 items-center text-center w-full mb-12">
                  <SectionLabel icon={GraduationCap}>Career Outcomes</SectionLabel>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tighter" style={{ fontFamily: "'Sora', sans-serif" }}>
                     What happens <span className="text-blue-600">after graduation?</span>
                  </h2>
                  <p className="font-medium text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl">
                     Based on a survey of 5,000+ graduates.
                  </p>
               </div>

               {/* Grid Stats */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between h-[10rem] text-left hover:shadow-md transition-shadow">
                     <p className="font-black text-[3rem] text-blue-600 leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>87%</p>
                     <p className="font-semibold text-slate-700 text-[0.875rem] leading-snug">got a hike within a year of graduating</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between h-[10rem] text-left hover:shadow-md transition-shadow">
                     <p className="font-black text-[3rem] text-blue-600 leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>9 in 10</p>
                     <p className="font-semibold text-slate-700 text-[0.875rem] leading-snug">said their degree opened many doors</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between h-[10rem] text-left hover:shadow-md transition-shadow">
                     <p className="font-black text-[3rem] text-blue-600 leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>3 in 4</p>
                     <p className="font-semibold text-slate-700 text-[0.875rem] leading-snug">got an offer within a year of graduation</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between h-[10rem] text-left hover:shadow-md transition-shadow">
                     <p className="font-black text-[3rem] text-blue-600 leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>92%</p>
                     <p className="font-semibold text-slate-700 text-[0.875rem] leading-snug">referred a friend or family member</p>
                  </div>
               </div>

               {/* Hiring Strip */}
               <div className="w-full text-center mt-6">
                  <p className="font-extrabold text-[0.8rem] text-slate-400 tracking-[0.15em] mb-8 uppercase">TOP COMPANIES HIRING FROM OUR PARTNER UNIVERSITIES</p>
                  <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75">
                     <div className="text-xl font-black text-blue-600 tracking-tight">ix<span className="text-slate-900">Hero</span></div>
                     <div className="text-xl font-black text-slate-800 tracking-tighter">HEXAWARE</div>
                     <div className="text-xl font-extrabold text-slate-700 tracking-tight">Kellton</div>
                     <div className="text-sm font-black text-slate-800 tracking-[0.2em]">MASTECH DIGITAL</div>
                     <div className="text-xl font-extrabold text-blue-900 tracking-tighter">NIIT</div>
                     <div className="text-xl font-extrabold text-slate-700">Persistent</div>
                     <div className="text-xl font-black text-slate-800 tracking-tight">QUESS</div>
                     <div className="text-lg font-bold text-sky-600 tracking-tight">randstad</div>
                  </div>
               </div>

               {/* Testimonials */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
                  <div className="bg-slate-50/50 border border-slate-100/70 rounded-3xl p-8 flex flex-col gap-6 relative shadow-[0_10px_35px_rgba(0,0,0,0.01)] text-left">
                     <div className="text-blue-200/40 text-[5rem] font-serif leading-none absolute top-2 left-6 pointer-events-none">“</div>
                     <p className="text-slate-700 font-medium text-[0.95rem] relative z-10 leading-relaxed pt-4">
                        Got placed at Deloitte within 3 months of graduating while still working my previous job. The Manipal MBA opened more doors than I expected.
                     </p>
                     <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                           RP
                        </div>
                        <div className="flex flex-col">
                           <p className="font-extrabold text-sm text-slate-900 leading-none">Rahul P.</p>
                           <p className="text-[11px] text-slate-500 font-semibold mt-1">MBA, Manipal Jaipur · Deloitte</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50/50 border border-slate-100/70 rounded-3xl p-8 flex flex-col gap-6 relative shadow-[0_10px_35px_rgba(0,0,0,0.01)] text-left">
                     <div className="text-blue-200/40 text-[5rem] font-serif leading-none absolute top-2 left-6 pointer-events-none">“</div>
                     <p className="text-slate-700 font-medium text-[0.95rem] relative z-10 leading-relaxed pt-4">
                        Finished my BCA while freelancing and saved my family almost 4 lakhs. My parents went from skeptical to proud within a year.
                     </p>
                     <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                           AS
                        </div>
                        <div className="flex flex-col">
                           <p className="font-extrabold text-sm text-slate-900 leading-none">Ananya S.</p>
                           <p className="text-[11px] text-slate-500 font-semibold mt-1">BCA, Amity Online · TCS</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Call to Action */}
               <button
                  type="button"
                  onClick={() => setShowEnquiry(true)}
                  className="bg-slate-900 hover:bg-blue-600 flex gap-2 items-center justify-center overflow-hidden px-8 py-5 rounded-[2.5rem] text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-95"
               >
                  <span className="whitespace-nowrap">Be one of them. Book a free session</span>
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
         </section >

         {/* 2026 TRENDING SPECIALIZATIONS */}
         < section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden" >
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
            </div>

            <div className="w-full relative group/marquee marquee-container py-4 overflow-hidden">
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
                        title: "Artificial Intelligence & ML",
                        img: "https://i.ibb.co/C4Jv9pT/Chat-GPT-Image-Apr-28-2026-06-10-25-PM.png",
                        salary: "15-28 LPA",
                        desc: "Master deep learning, neural networks, and computer vision to build the next generation of intelligent systems."
                     },
                     {
                        title: "FinTech & Digital Finance",
                        img: "https://i.ibb.co/HDbbvTDt/Chat-GPT-Image-Apr-28-2026-06-10-38-PM-2.png",
                        salary: "11-20 LPA",
                        desc: "Explore blockchain, algorithmic trading, and digital payment systems at the intersection of finance and tech."
                     },
                     {
                        title: "Information Technology",
                        img: "https://i.ibb.co/jv6yRPFq/Chat-GPT-Image-Apr-28-2026-06-16-35-PM.png",
                        salary: "10-18 LPA",
                        desc: "Lead digital transformation initiatives and manage complex enterprise infrastructures for the modern cloud era."
                     },
                     {
                        title: "Business Analytics",
                        img: "https://i.ibb.co/VYQMCBZr/Chat-GPT-Image-Apr-28-2026-06-10-54-PM.png",
                        salary: "12-24 LPA",
                        desc: "Translate data into actionable business strategies using advanced statistical modeling and predictive analytics."
                     },
                     {
                        title: "Healthcare & Hospital Mgt.",
                        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
                        salary: "8-15 LPA",
                        desc: "Optimize clinical operations and patient care systems within modern healthcare organizations and global medical hubs."
                     },
                     {
                        title: "Operations Management",
                        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
                        salary: "10-16 LPA",
                        desc: "Streamline organizational efficiency through Lean Six Sigma, quality control, and strategic resource planning."
                     },
                     {
                        title: "Intl. Finance & Account Mgt.",
                        img: "https://i.ibb.co/nqxy8sNC/Chat-GPT-Image-Apr-28-2026-06-11-09-PM.png",
                        salary: "12-22 LPA",
                        desc: "Navigate global markets and cross-border regulatory frameworks with advanced financial reporting and auditing."
                     },
                     {
                        title: "Digital Marketing & Growth",
                        img: "https://i.ibb.co/xqJGVg4R/Chat-GPT-Image-Apr-28-2026-06-11-05-PM.png",
                        salary: "8-16 LPA",
                        desc: "Master SEO, social engineering, and data-driven advertising to scale brands in the hyper-competitive digital space."
                     },
                     {
                        title: "Logistics & Supply Chain",
                        img: "https://i.ibb.co/N6V14nkj/Chat-GPT-Image-Apr-28-2026-06-11-07-PM.png",
                        salary: "9-15 LPA",
                        desc: "Revolutionize global trade routes and inventory systems using automated warehousing and last-mile delivery tech."
                     },
                     {
                        title: "Marketing Management",
                        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
                        salary: "10-18 LPA",
                        desc: "Drive revenue growth and market penetration through consumer psychology and strategic brand positioning."
                     },
                     {
                        title: "Cyber Security & Defense",
                        img: "https://i.ibb.co/pB46p1qY/Chat-GPT-Image-Apr-28-2026-06-11-01-PM.png",
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

                           <button
                              onClick={() => setShowEnquiry(true)}
                              className="flex items-center gap-2 group/link text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all text-left"
                           >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover/link:animate-ping"></div>
                              Explore Intel
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section >

         {/* Promotional Banner Section */}
         < div className="w-full overflow-hidden" >
            <img
               src="/imgggg23.jpeg"
               alt="Promotional Banner"
               className="w-full h-auto object-cover"
               loading="lazy"
            />
         </div >

         {/* 7. CAREER SYSTEM SECTION (Image 2) */}
         < section className="py-24 bg-slate-900" >
            <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                  <div className="lg:col-span-4 text-left">
                     <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight font-display">
                        Not Just a Degree. <br />
                        <span className="text-blue-400">A Career System.</span>
                     </h2>
                     <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        A proven 3-step process that turns your degree into a future-ready career.
                     </p>
                  </div>

                  <div className="lg:col-span-8">
                     <div className="grid grid-cols-3 gap-1 md:gap-6 lg:gap-8 relative">
                        {CAREER_SYSTEM_STEPS.map((step, idx) => (
                           <div key={idx} className="relative">
                              {/* Connecting Arrow */}
                              {idx < CAREER_SYSTEM_STEPS.length - 1 && (
                                 <div className="absolute top-1/2 -right-0.5 md:-right-4 lg:-right-6 -translate-y-1/2 z-20">
                                    <ArrowRight className="w-2 md:w-6 md:h-6 text-blue-200" />
                                 </div>
                              )}
                              <motion.div
                                 initial={{ opacity: 0, y: 20 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 transition={{ delay: idx * 0.1 }}
                                 viewport={{ once: true }}
                                 className="bg-white rounded-lg md:rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col group"
                              >
                                 <div className="p-1.5 md:p-4 lg:p-8">
                                    <div className="flex items-center gap-1 md:gap-4 mb-1.5 md:mb-6">
                                       <div className="w-4 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-[5px] md:text-xs font-black shadow-lg">
                                          {step.id}
                                       </div>
                                       <div className="w-5 h-5 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                          {React.cloneElement(step.icon, { className: "w-2.5 h-2.5 md:w-5 md:h-5 lg:w-6 lg:h-6" })}
                                       </div>
                                    </div>
                                    <h3 className="text-[6px] md:text-sm lg:text-xl font-black text-slate-900 leading-tight lg:mb-3">{step.title}</h3>
                                    <p className="hidden lg:block text-xs text-slate-500 font-medium mb-6">{step.desc}</p>
                                 </div>
                                 <div className="h-8 sm:h-20 md:h-32 lg:h-48 overflow-hidden mt-auto">
                                    <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                 </div>
                              </motion.div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Formula Strip */}
               <div className="bg-[#051129] rounded-xl md:rounded-3xl p-3 sm:p-5 md:p-8 flex flex-nowrap items-center justify-between gap-1.5 sm:gap-4 md:gap-12 shadow-2xl w-full relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-orange-900/20 pointer-events-none hidden md:block"></div>

                  <div className="flex flex-nowrap items-center justify-start gap-1 sm:gap-3 md:gap-8 z-10 shrink min-w-0">
                     {[
                        { label: "DEGREE", desc: "Build Foundation", icon: <GraduationCap className="w-5 h-5 md:w-6 md:h-6" /> },
                        { label: "SKILLS", desc: "Build Edge", icon: <Zap className="w-5 h-5 md:w-6 md:h-6" /> },
                        { label: "PLACEMENT", desc: "Build Future", icon: <Target className="w-5 h-5 md:w-6 md:h-6" /> }
                     ].map((item, idx) => (
                        <React.Fragment key={idx}>
                           <div className="flex items-center gap-1 sm:gap-2 md:gap-4 group shrink min-w-0">
                              <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-14 md:h-14 shrink-0 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                 {React.cloneElement(item.icon, { className: "w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-6 md:h-6" })}
                              </div>
                              <div className="text-left flex flex-col justify-center min-w-0">
                                 <p className="text-[6px] sm:text-[9px] md:text-sm font-black text-white tracking-widest leading-none mb-0.5 md:mb-1.5 uppercase truncate">{item.label}</p>
                                 <p className="hidden md:block text-[9px] md:text-xs text-slate-400 font-medium leading-none uppercase tracking-wider truncate">{item.desc}</p>
                              </div>
                           </div>
                           {idx < 2 && <div className="text-white/30 text-[10px] sm:text-sm md:text-3xl font-black shrink-0">+</div>}
                        </React.Fragment>
                     ))}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-3 md:gap-8 z-10 shrink-0 ml-1">
                     <div className="text-white/30 text-[10px] sm:text-sm md:text-4xl font-black shrink-0">=</div>
                     <div className="text-left border-l border-white/10 pl-1.5 sm:pl-3 md:pl-8 flex flex-col justify-center">
                        <div className="hidden md:inline-flex items-center gap-1.5 mb-1 sm:mb-2">
                           <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 animate-pulse"></span>
                           <p className="text-[10px] sm:text-xs md:text-sm font-black text-orange-400/80 tracking-[0.2em] leading-none uppercase">Guaranteed</p>
                        </div>
                        <p className="md:hidden text-[5px] sm:text-[7px] font-black text-white tracking-widest mb-0.5 sm:mb-1 leading-none uppercase opacity-60">Guaranteed</p>
                        <p className="text-[7px] sm:text-[10px] md:text-3xl lg:text-4xl font-black text-orange-500 tracking-tight leading-none uppercase whitespace-nowrap drop-shadow-lg">Direction</p>
                     </div>
                  </div>
               </div>
            </div>
         </section >



         {/* NEW: CAREER ECOSYSTEM (Image 5) 
         <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
               <div className="mb-16">
                  <SectionLabel icon={Globe}>Strategic Infrastructure</SectionLabel>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tighter">
                     More Than Education. <br />
                     <span className="text-blue-600">A Complete Career Ecosystem.</span>
                  </h2>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {CAREER_ECOSYSTEM_DATA.map((item, idx) => (
                     <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
                     >
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                           {item.icon}
                        </div>
                        <h3 className="text-base font-black text-slate-900 mb-4 font-display uppercase leading-tight">{item.title}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>*/}

         {/* 10. FAQ SECTION */}
         <section className="py-16 md:py-24 bg-white border-t border-slate-100 relative overflow-hidden text-left">
            <div className="container mx-auto px-6 max-w-4xl">
               <button
                  onClick={() => setIsFaqOpen(!isFaqOpen)}
                  className="w-full flex flex-col items-center text-center group cursor-pointer focus:outline-none"
               >
                  <div className="flex items-center justify-center gap-2 mb-2 group-hover:opacity-80 transition-opacity">
                     <div className="section-label !mb-0 flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-105 bg-blue-50 text-blue-600 border px-6 py-3 rounded-full border-blue-200 shadow-md ring-4 ring-blue-50/50">
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <span className="tracking-[0.15em] font-black uppercase text-[10px] md:text-[11px] flex items-center gap-2">
                           FAQs
                           <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-blue-600 transition-transform duration-300 ${isFaqOpen ? 'rotate-180' : ''}`} />
                        </span>
                     </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter font-display uppercase mt-6">
                     You've likely got a <span className="text-blue-600">few questions</span>
                  </h2>
               </button>

               <AnimatePresence>
                  {isFaqOpen && (
                     <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                     >
                        <div className="space-y-8 mt-12 bg-slate-50/50 p-6 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm">
                           {FAQ_DATA.map((faq, index) => (
                              <div key={index} className="border-b border-slate-200 pb-8 last:border-0 last:pb-0 text-left">
                                 <h3 className="font-black text-slate-900 text-lg md:text-xl mb-3">{faq.question}</h3>
                                 <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">{faq.answer}</p>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </section>

         {/* 8. CLARITY CONSULTATION (Image 5) */}
         <EnquirySection />
      </div >
   );
};

// --- ENQUIRY SECTION COMPONENT ---
const Check = () => (
   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
   </svg>
);

const trustBadges = [
   {
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
      ),
      label: "UGC Approved",
      sub: "& Recognized",
   },
   {
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
         </svg>
      ),
      label: "NAAC A+",
      sub: "Universities",
   },
   {
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
         </svg>
      ),
      label: "100% Secure",
      sub: "Admission Process",
   },
   {
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
         </svg>
      ),
      label: "Industry Mentors",
      sub: "& Internship Support",
   },
   {
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.09 6.09l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
         </svg>
      ),
      label: "24/7 Student",
      sub: "Support",
   },
];

const features = [
   {
      label: "1:1 Expert Consultation",
      icon: (
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
         </svg>
      )
   },
   {
      label: "Personalized Career Roadmap",
      icon: (
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
         </svg>
      )
   },
   {
      label: "Right Skills. Right Opportunities.",
      icon: (
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
         </svg>
      )
   },
   {
      label: "100% Free Guidance",
      icon: (
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
         </svg>
      )
   },
];

const interests = [
   "Engineering",
   "MBA",
   "Medical",
   "Law",
   "Design",
   "Data Science",
   "Arts & Humanities",
];

function EnquirySection() {
   const [name, setName] = useState("");
   const [mobile, setMobile] = useState("");
   const [interest, setInterest] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name.trim() || !mobile.trim() || !interest) {
         alert("Please fill in all fields");
         return;
      }
      if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
         alert("Please enter a valid 10-digit mobile number");
         return;
      }

      setLoading(true);
      try {
         const { error } = await submitEnquiry({
            name: name.trim(),
            phone: mobile.trim(),
            course_interest: interest,
            source: 'clarity_consultation_form'
         });

         if (error) throw error;

         alert("Success! Your career consultation slot has been booked. Our expert advisor will contact you shortly.");
         setName("");
         setMobile("");
         setInterest("");
      } catch (err) {
         console.error('Submission Error:', err);
         alert('Security Verification: We encountered a temporary sync issue. Please retry in a moment.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="eq-wrapper">
         <style dangerouslySetInnerHTML={{
            __html: `
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

            .eq-wrapper {
               width: 100%;
               font-family: 'Outfit', system-ui, sans-serif;
               background: #ffffff;
               position: relative;
               overflow: hidden;
               padding: 100px 0 80px 0;
            }

            .eq-bg-pattern {
               position: absolute;
               top: 40px;
               right: 35%;
               width: 140px;
               height: 140px;
               background-image: radial-gradient(#CBD5E1 2px, transparent 2px);
               background-size: 16px 16px;
               opacity: 0.6;
               pointer-events: none;
               z-index: 1;
            }

            .eq-container {
               max-width: 1280px;
               margin: 0 auto;
               padding: 0 40px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               position: relative;
               z-index: 2;
            }

            .eq-left {
               flex: 1;
               max-width: 440px;
            }

            .eq-tag {
               display: inline-flex;
               align-items: center;
               gap: 8px;
               padding: 8px 16px;
               background: #ffffff;
               border: 1px solid #E2E8F0;
               border-radius: 100px;
               color: #2563EB;
               font-size: 12px;
               font-weight: 800;
               letter-spacing: 0.5px;
               text-transform: uppercase;
               margin-bottom: 24px;
               box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
            }

            .eq-tag svg {
               color: #2563EB;
               fill: #2563EB;
            }

            .eq-title {
               font-size: 48px;
               font-weight: 800;
               line-height: 1.1;
               color: #0F172A;
               margin-bottom: 20px;
            }

            .eq-title span {
               color: #EA580C;
            }

            .eq-desc {
               font-size: 16px;
               color: #475569;
               line-height: 1.6;
               margin-bottom: 32px;
               font-weight: 500;
            }

            .eq-features {
               display: flex;
               flex-direction: column;
            }

            .eq-feature {
               display: flex;
               align-items: center;
               gap: 16px;
               padding: 16px 0;
               border-bottom: 1px solid #F1F5F9;
               transition: transform 0.2s ease;
            }

            .eq-feature:last-child {
               border-bottom: none;
            }

            .eq-feature:hover {
               transform: translateX(4px);
            }

            .eq-feature-icon {
               width: 44px;
               height: 44px;
               border-radius: 12px;
               background: #EFF6FF;
               color: #2563EB;
               display: flex;
               align-items: center;
               justify-content: center;
               flex-shrink: 0;
            }

            .eq-feature-text {
               font-size: 15px;
               color: #1E293B;
               font-weight: 700;
            }

            .eq-image-container {
               position: absolute;
               left: 50%;
               bottom: -80px;
               transform: translateX(-50%);
               width: 480px;
               z-index: 3;
               pointer-events: none;
            }

            .eq-image-container img {
               width: 100%;
               height: auto;
               display: block;
               filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
            }

            .eq-right {
               flex: 1;
               max-width: 420px;
               display: flex;
               justify-content: flex-end;
               z-index: 4;
               transform: translateX(80px);
            }


            .eq-form-card {
               width: 100%;
               background: linear-gradient(135deg, #2563EB, #1D4ED8);
               border-radius: 24px;
               padding: 32px 28px;
               box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.25);
               position: relative;
               overflow: hidden;
            }

            .eq-form-top-icon {
               width: 52px;
               height: 52px;
               background: rgba(255, 255, 255, 0.15);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               margin-bottom: 20px;
               color: rgba(255, 255, 255, 0.9);
            }

            .eq-form-header {
               margin-bottom: 24px;
            }

            .eq-form-title {
               font-size: 28px;
               font-weight: 700;
               color: #ffffff;
               margin-bottom: 12px;
               line-height: 1.2;
            }

            .eq-form-subtitle {
               font-size: 14px;
               color: rgba(255, 255, 255, 0.85);
               font-weight: 400;
               display: flex;
               align-items: center;
               gap: 6px;
            }

            .eq-form-subtitle svg {
               color: #FCD34D;
            }

            .eq-form-group {
               margin-bottom: 16px;
               position: relative;
               display: flex;
               align-items: center;
            }

            .eq-input-icon {
               position: absolute;
               left: 16px;
               color: rgba(255, 255, 255, 0.8);
               pointer-events: none;
               width: 20px;
               height: 20px;
               display: flex;
               align-items: center;
               justify-content: center;
            }

            .eq-input {
               width: 100%;
               background: rgba(255, 255, 255, 0.1);
               border: 1px solid rgba(255, 255, 255, 0.2);
               border-radius: 12px;
               padding: 16px 16px 16px 48px;
               font-family: inherit;
               font-size: 15px;
               color: #ffffff;
               transition: all 0.3s ease;
               outline: none;
            }

            .eq-input::placeholder {
               color: rgba(255, 255, 255, 0.8);
               font-weight: 400;
            }

            .eq-input:focus {
               border-color: rgba(255, 255, 255, 0.5);
               background: rgba(255, 255, 255, 0.15);
            }

            .eq-select-wrapper {
               position: relative;
               width: 100%;
            }

            .eq-select {
               appearance: none;
               padding-right: 40px;
               cursor: pointer;
            }

            .eq-select option {
               color: #000;
            }

            .eq-select-arrow {
               position: absolute;
               right: 16px;
               top: 50%;
               transform: translateY(-50%);
               color: rgba(255, 255, 255, 0.8);
               pointer-events: none;
            }

            .eq-submit {
               width: 100%;
               background: #ffffff;
               border: none;
               border-radius: 12px;
               padding: 16px;
               color: #1D4ED8;
               font-family: inherit;
               font-size: 16px;
               font-weight: 800;
               cursor: pointer;
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 10px;
               margin-top: 24px;
               margin-bottom: 24px;
               transition: all 0.3s ease;
               box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
            }

            .eq-submit:hover {
               transform: translateY(-2px);
               box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            }

            .eq-submit:active {
               transform: translateY(0);
            }

            .eq-card-trust {
               display: flex;
               align-items: center;
               justify-content: space-between;
               padding-top: 20px;
               border-top: 1px solid rgba(255, 255, 255, 0.15);
            }

            .eq-card-trust-item {
               display: flex;
               align-items: center;
               gap: 6px;
               color: rgba(255, 255, 255, 0.9);
               font-size: 13px;
               font-weight: 500;
            }

            /* Bottom Trust Bar */
            .eq-trust-wrapper {
               max-width: 1280px;
               margin: 80px auto 0;
               padding: 0 40px;
               position: relative;
               z-index: 2;
            }

            .eq-trust-inner {
               background: #ffffff;
               border: 1px solid #F1F5F9;
               border-radius: 24px;
               padding: 24px 40px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               flex-wrap: wrap;
               gap: 24px;
               box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
            }

            .eq-trust-item {
               display: flex;
               align-items: center;
               gap: 16px;
               flex: 1;
               min-width: 200px;
            }

            .eq-trust-icon {
               width: 48px;
               height: 48px;
               border-radius: 14px;
               background: #EFF6FF;
               border: 1px solid #DBEAFE;
               display: flex;
               align-items: center;
               justify-content: center;
               color: #2563EB;
               flex-shrink: 0;
            }

            .eq-trust-text h4 {
               color: #0F172A;
               font-size: 14px;
               font-weight: 800;
               margin: 0 0 4px 0;
               line-height: 1.2;
            }

            .eq-trust-text p {
               color: #64748B;
               font-size: 13px;
               margin: 0;
               font-weight: 500;
               line-height: 1.2;
            }

            /* --- Responsive Design (Forced Desktop Scaling for Desktop/Tablet) --- */
            @media (max-width: 1300px) { .eq-wrapper { zoom: 0.90; } }
            @media (max-width: 1200px) { .eq-wrapper { zoom: 0.85; } }
            @media (max-width: 1100px) { .eq-wrapper { zoom: 0.78; } }
            @media (max-width: 980px)  { .eq-wrapper { zoom: 0.70; } }
            @media (max-width: 860px)  { .eq-wrapper { zoom: 0.60; } }

            /* --- True Mobile Responsive Design --- */
            @media (max-width: 768px) {
               .eq-wrapper { 
                  zoom: 1 !important; 
                  padding: 60px 0;
               }
               .eq-container {
                  flex-direction: column;
                  padding: 0 20px;
                  gap: 48px;
               }
               .eq-left {
                  max-width: 100%;
                  text-align: center;
               }
               .eq-tag {
                  margin: 0 auto 24px auto;
               }
               .eq-title {
                  font-size: 38px;
                  margin-bottom: 16px;
               }
               .eq-title br {
                  display: none;
               }
               .eq-desc {
                  max-width: 500px;
                  margin: 0 auto 32px auto;
               }
               .eq-features {
                  align-items: center;
               }
               .eq-feature {
                  width: 100%;
                  max-width: 400px;
                  text-align: left;
               }
               .eq-image-container {
                  position: relative;
                  left: auto;
                  bottom: auto;
                  transform: none;
                  width: 100%;
                  max-width: 320px;
                  margin: -20px auto 0 auto;
               }
               .eq-right {
                  max-width: 100%;
                  width: 100%;
                  transform: none;
                  justify-content: center;
               }
               .eq-form-card {
                  max-width: 500px;
                  margin: 0 auto;
                  padding: 32px 24px;
               }
               .eq-trust-wrapper {
                  margin-top: 60px;
                  padding: 0 20px;
               }
               .eq-trust-inner {
                  padding: 24px;
                  flex-direction: column;
                  gap: 20px;
               }
               .eq-trust-item {
                  width: 100%;
                  justify-content: flex-start;
               }
               .eq-bg-pattern {
                  display: none;
               }
            }

            @media (max-width: 480px) {
               .eq-title {
                  font-size: 32px;
               }
               .eq-form-card {
                  padding: 28px 20px;
               }
               .eq-form-title {
                  font-size: 24px;
               }
               .eq-card-trust {
                  flex-direction: column;
                  gap: 12px;
                  align-items: flex-start;
               }
               .eq-card-trust-item {
                  width: 100%;
               }
               .eq-trust-icon {
                  width: 40px;
                  height: 40px;
               }
            }
            ` }} />

         {/* Subtle Background Elements */}
         <div className="eq-bg-pattern"></div>

         <div className="eq-container">
            {/* Left Content */}
            <div className="eq-left">
               <div className="eq-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  100% Free Career Guidance
               </div>

               <h2 className="eq-title">
                  Stop Guessing Your <br />
                  Career Path. <br />
                  Get <span>Clarity</span> Today.
               </h2>

               <p className="eq-desc">
                  Connect with our expert advisors to map out a personalized educational journey that aligns perfectly with your goals.
               </p>

               <div className="eq-features">
                  {features.map((f, i) => (
                     <div className="eq-feature" key={i}>
                        <div className="eq-feature-icon">
                           {f.icon}
                        </div>
                        <span className="eq-feature-text">{f.label}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Middle Image Content */}
            <div className="eq-image-container">
               <img src="https://i.ibb.co/Zz3XNSQt/projects-XBJZo-W-N.png" alt="Career Advisor" />
            </div>

            {/* Right Form Content */}
            <div className="eq-right">
               <div className="eq-form-card">
                  <div className="eq-form-top-icon">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                     </svg>
                  </div>

                  <div className="eq-form-header">
                     <h3 className="eq-form-title">Book Your<br />Consultation</h3>
                     <div className="eq-form-subtitle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        Limited slots per day. Hurry!
                     </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                     <div className="eq-form-group">
                        <div className="eq-input-icon">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                           </svg>
                        </div>
                        <input
                           type="text"
                           placeholder="Your Full Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="eq-input"
                           required
                        />
                     </div>
                     <div className="eq-form-group">
                        <div className="eq-input-icon">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.09 6.09l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                           </svg>
                        </div>
                        <input
                           type="tel"
                           placeholder="Mobile Number"
                           value={mobile}
                           onChange={(e) => setMobile(e.target.value)}
                           maxLength={10}
                           className="eq-input"
                           required
                        />
                     </div>
                     <div className="eq-form-group eq-select-wrapper">
                        <div className="eq-input-icon">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                              <path d="M6 12v5c3 3 9 3 12 0v-5" />
                           </svg>
                        </div>
                        <select
                           value={interest}
                           onChange={(e) => setInterest(e.target.value)}
                           required
                           className="eq-input eq-select"
                           style={{ color: interest ? '#ffffff' : 'rgba(255,255,255,0.8)' }}
                        >
                           <option value="" disabled>Select Your Interest</option>
                           {interests.map((it) => (
                              <option key={it} value={it} style={{ color: '#000' }}>
                                 {it}
                              </option>
                           ))}
                        </select>
                        <svg
                           className="eq-select-arrow"
                           width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                           <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                     </div>

                     <button type="submit" disabled={loading} className="eq-submit">
                        {loading ? "Booking..." : "Book Free Slot Now"}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="5" y1="12" x2="19" y2="12"></line>
                           <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                     </button>
                  </form>

                  <div className="eq-card-trust">
                     <div className="eq-card-trust-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                           <path d="M9 12l2 2 4-4" />
                        </svg>
                        100% Free
                     </div>
                     <div className="eq-card-trust-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                           <path d="M9 12l2 2 4-4" />
                        </svg>
                        No Spam
                     </div>
                     <div className="eq-card-trust-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                           <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Secure
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Trust Bar */}
         <div className="eq-trust-wrapper">
            <div className="eq-trust-inner">
               {trustBadges.map((b, i) => (
                  <div key={i} className="eq-trust-item">
                     <div className="eq-trust-icon">
                        {b.icon}
                     </div>
                     <div className="eq-trust-text">
                        <h4>{b.label}</h4>
                        <p>{b.sub}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}


export default UniversityPageNew;
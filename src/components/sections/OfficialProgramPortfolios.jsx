import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ChevronDown, Briefcase, TrendingUp, Zap, Rocket, GraduationCap, Globe, CreditCard, Activity, ShieldCheck, Lightbulb, Star, Info } from 'lucide-react';

const OFFICIAL_COURSES = [
   { name: "Online MBA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=MBAonine", image: "https://i.ibb.co/HDTJ7jHt/mba.jpg", icon: <Briefcase className="w-5 h-5" />, badge: "UGC Approved" },
   { name: "Online BBA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBBA", image: "https://i.ibb.co/Y4CnR6PZ/bba.jpg", icon: <TrendingUp className="w-5 h-5" />, badge: "Industry Lead" },
   { name: "Online MCA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMCA", image: "https://i.ibb.co/Zk7RHXV/mca.jpg", icon: <Zap className="w-5 h-5" />, badge: "Tech Accredited" },
   { name: "Online BCA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bca?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCA", image: "https://i.ibb.co/x87fDS4F/bca.jpg", icon: <Rocket className="w-5 h-5" />, badge: "Skill Based" },
   { name: "Online MA", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-ma?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMA", image: "https://i.ibb.co/cdq0cy7/ma.jpg", icon: <GraduationCap className="w-5 h-5" />, badge: "Research Led" },
   { name: "Online BA", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-ba?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBA", image: "https://i.ibb.co/j9hn9pwJ/ba.jpg", icon: <Globe className="w-5 h-5" />, badge: "Diverse Curriculum" },
   { name: "Online M.Com", category: "Masters (PG)", link: "https://courses.universityadmission.co.in/online-mcom?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineMCom", image: "https://i.ibb.co/8Lrjf2Xf/mcom.jpg", icon: <CreditCard className="w-5 h-5" />, badge: "Finance Focused" },
   { name: "Online B.Com", category: "Bachelor's (UG)", link: "https://courses.universityadmission.co.in/online-bcom?source_campaign=LAM%20Influencer&campaign_name=4711&ad_group_name=General&ads_name=onlineBCom", image: "https://i.ibb.co/GQw4bbKJ/bcom.jpg", icon: <Activity className="w-5 h-5" />, badge: "Business Foundation" },
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

const SectionLabel = ({ children, icon: Icon }) => (
   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
   </div>
);

const OfficialProgramPortfolios = () => {
   const [courseType, setCourseType] = useState('Integrated Program');
   const [showAllPrograms, setShowAllPrograms] = useState(false);
   const [programIndex, setProgramIndex] = useState(0);
   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
   const strategicIntelligenceRef = useRef(null);

   useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const filteredCourses = courseType === 'All' 
      ? OFFICIAL_COURSES 
      : OFFICIAL_COURSES.filter(c => c.category === courseType);

   useEffect(() => {
      setProgramIndex(0);
   }, [courseType]);

   const pauseAutoplay = () => {
      // Intentionally left blank to match dragEnd requirement
   };

   const handleUniversityClick = (link) => {
      if (link) {
         window.open(link, '_blank');
      }
   };

   const handleNextProgram = () => {
      setProgramIndex(prev => Math.min(prev + 1, Math.max(0, filteredCourses.length - (windowWidth < 768 ? 1 : 3))));
   };

   const handlePrevProgram = () => {
      setProgramIndex(prev => Math.max(prev - 1, 0));
   };

   return (
         <section ref={strategicIntelligenceRef} className="py-12 md:py-24 bg-white relative overflow-hidden" id="strategic-intelligence">
            <div className="container mx-auto px-6">
               <div className="flex flex-col justify-start items-start gap-8 mb-16 md:mb-20">
                  <div className="text-left w-full">
                     <SectionLabel icon={Award}>Curriculum Standards 2026</SectionLabel>
                     <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-0 font-display uppercase tracking-tighter w-full max-w-4xl">Explore Programs From <span className="text-blue-600">Top Ranked Universities</span></h2>
                  </div>
                  <div className="self-center flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-2 bg-slate-50 p-2 md:p-3 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 w-full mx-auto max-w-5xl mt-4 md:mt-0">
                     {['Integrated Program', 'Certification', 'Masters (PG)', "Bachelor's (UG)", 'Special'].map(tab => (
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
   );
};

export default OfficialProgramPortfolios;

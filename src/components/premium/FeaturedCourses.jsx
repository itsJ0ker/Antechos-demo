import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DifficultyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-slate-400">
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
    <line x1="3" y1="12" x2="17" y2="12" strokeLinecap="round" />
    <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BadgeLogo = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 5L4 19h16L12 5z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M12 5L4 19h8V5z" fill="currentColor" />
  </svg>
);

const CardLogo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5L4 19h16L12 5z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M12 5L4 19h8V5z" fill="white" />
  </svg>
);

const FeaturedCourses = ({ courses }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const courseImages = {
    "digital-marketing-mastery": "/digital_marketing_workspace_1778405692841.png",
    "language-mastery-british-express": "/professional_communication_leadership_1778405709095.png"
  };

  const courseAccents = {
    "digital-marketing-mastery": {
      text: "text-[#0284c7]",
      color: "#0284c7",
      badgeText: "text-[#0284c7]"
    },
    "language-mastery-british-express": {
      text: "text-[#38bdf8]",
      color: "#38bdf8",
      badgeText: "text-[#38bdf8]"
    }
  };

  const getAccent = (courseId, idx) => {
    if (courseAccents[courseId]) return courseAccents[courseId];
    const fallbacks = [
      { text: "text-[#0284c7]", color: "#0284c7", badgeText: "text-[#0284c7]" },
      { text: "text-[#38bdf8]", color: "#38bdf8", badgeText: "text-[#38bdf8]" },
      { text: "text-[#0d9488]", color: "#0d9488", badgeText: "text-[#0d9488]" }
    ];
    return fallbacks[idx % fallbacks.length];
  };

  // Repeat courses list to populate the horizontal scrollbar nicely (matching the image)
  const displayCourses = courses.map((c, i) => ({ ...c, uniqueId: `${c.id}-carousel-${i}` }));

  // Repeat displayCourses to ensure a nice long horizontal carousel if list is short
  const carouselItems = courses.length <= 2
    ? [...displayCourses, ...displayCourses, ...displayCourses]
    : displayCourses;

  // In expanded state, we show only the unique original courses (without duplicates)
  const uniqueItems = courses.map((c, i) => ({ ...c, uniqueId: `${c.id}-grid-${i}` }));

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const getGridColsClass = () => {
    if (courses.length === 1) return "grid grid-cols-1 max-w-sm mx-auto gap-8 pt-4";
    if (courses.length === 2) return "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 pt-4 justify-center";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4";
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-sky-50/10 to-white py-24 relative border-y border-[#38bdf8]/10 shadow-sm">
      <div className="absolute inset-0 p-grid-mesh opacity-20 pointer-events-none" />
      <style dangerouslySetInnerHTML={{
        __html: `
            .scrollbar-hide::-webkit-scrollbar {
               display: none;
            }
            .scrollbar-hide {
               -ms-overflow-style: none;
               scrollbar-width: none;
            }
         ` }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 pb-6 border-b border-[#38bdf8]/10">
          <div className="flex items-center gap-4">
            {/* Logo Icon */}
            <div className="w-12 h-12 bg-gradient-to-tr from-sky-600 to-sky-400 rounded-xl flex items-center justify-center shadow-md border border-sky-400/20 flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="#0284c7" />
                <path d="M8 8H16V16H8V8Z" fill="white" opacity="0.15" />
                <path d="M8 8.5C8 8.22386 8.22386 8 8.5 8H12C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16H8.5C8.22386 16 8 15.7761 8 15.5V8.5Z" fill="white" />
                <path d="M10.5 10.5C10.5 10.2239 10.7239 10 11 10H12C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14H11C10.7239 14 10.5 13.7761 10.5 13.5V10.5Z" fill="#0284c7" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#0284c7] uppercase">
                  TOP-RATED PROGRAMS
                </span>
                <div className="h-[1px] bg-sky-500/20 w-16 hidden sm:block" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Master the skills that matter most
              </h2>
            </div>
          </div>

          {/* Carousel navigation & browse button */}
          <div className="flex items-center gap-3">
            {!expanded && (
              <div className="flex items-center gap-2 mr-1">
                <button
                  onClick={scrollLeft}
                  className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80 text-slate-700 flex items-center justify-center transition-all active:scale-90"
                  aria-label="Scroll Left"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80 text-slate-700 flex items-center justify-center transition-all active:scale-90"
                  aria-label="Scroll Right"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-[#0284c7] hover:bg-sky-700 text-white text-xs font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md border border-sky-600/20 active:scale-95 whitespace-nowrap"
            >
              {expanded ? "Collapse Programs" : "Browse Programs"}
            </button>
          </div>
        </div>

        {/* ── CARDS WRAPPER ── */}
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            >
              {carouselItems.map((course, idx) => {
                const accent = getAccent(course.id, idx);
                const imgSrc = courseImages[course.id] || "/digital_marketing_workspace_1778405692841.png";

                return (
                  <motion.div
                    key={course.uniqueId}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`/courses-premium/${course.slug}`)}
                    className="w-[310px] sm:w-[330px] flex-shrink-0 bg-white rounded-[1.5rem] shadow-lg flex flex-col group cursor-pointer overflow-hidden snap-start border border-[#38bdf8]/10 hover:border-[#38bdf8]/35 transition-all duration-300"
                  >
                    {/* Image container with padding */}
                    <div className="p-3.5 pb-0">
                      <div className="w-full h-40 relative rounded-xl overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        {/* Blue overlaid logo square */}
                        <div className="absolute bottom-3 left-3 w-10 h-10 bg-[#0284c7] rounded-lg flex items-center justify-center shadow-md border border-white/10">
                          <CardLogo />
                        </div>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="px-5 pt-4 pb-5 flex-1 flex flex-col">
                      <h3 className={`text-[18px] font-extrabold leading-tight mb-2 tracking-tight ${accent.text} group-hover:opacity-90 transition-opacity min-h-[44px] line-clamp-2`}>
                        {course.title}
                      </h3>

                      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                        {course.shortDescription}
                      </p>

                      {/* Category & Star rating */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5">
                          <BadgeLogo className={accent.text} />
                          <span className={`text-[10px] font-extrabold tracking-wider ${accent.badgeText}`}>
                            {course.category ? `${course.category.toUpperCase()}` : "NANODEGREE PROGRAM"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-extrabold text-[#d97706]">
                          <span className="text-[#d97706] text-sm">★</span>
                          <span>{course.rating || "4.4"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-[#f8fafc] border-t border-slate-100/80 py-3.5 px-5 flex items-center justify-between text-slate-600 text-xs font-semibold rounded-b-[1.5rem]">
                      <div className="flex items-center gap-2">
                        <DifficultyIcon />
                        <span>{course.level || "Intermediate"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClockIcon />
                        <span>{course.duration || "18 hours"}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={getGridColsClass()}
            >
              {uniqueItems.map((course, idx) => {
                const accent = getAccent(course.id, idx);
                const imgSrc = courseImages[course.id] || "/digital_marketing_workspace_1778405692841.png";

                return (
                  <motion.div
                    key={course.uniqueId}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    onClick={() => navigate(`/courses-premium/${course.slug}`)}
                    className="w-full bg-white rounded-[1.5rem] shadow-lg flex flex-col group cursor-pointer overflow-hidden border border-[#38bdf8]/10 hover:border-[#38bdf8]/35 transition-all duration-300"
                  >
                    {/* Image container with padding */}
                    <div className="p-3.5 pb-0">
                      <div className="w-full h-44 relative rounded-xl overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                        {/* Blue overlaid logo square */}
                        <div className="absolute bottom-3 left-3 w-10 h-10 bg-[#0284c7] rounded-lg flex items-center justify-center shadow-md border border-white/10">
                          <CardLogo />
                        </div>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="px-6 pt-4 pb-6 flex-1 flex flex-col">
                      <h3 className={`text-[19px] font-extrabold leading-tight mb-3 tracking-tight ${accent.text} group-hover:opacity-90 transition-opacity min-h-[48px] line-clamp-2`}>
                        {course.title}
                      </h3>

                      <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
                        {course.shortDescription}
                      </p>

                      {/* Category & Star rating */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5">
                          <BadgeLogo className={accent.text} />
                          <span className={`text-[10px] font-extrabold tracking-wider ${accent.badgeText}`}>
                            {course.category ? `${course.category.toUpperCase()}` : "NANODEGREE PROGRAM"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-extrabold text-[#d97706]">
                          <span className="text-[#d97706] text-sm">★</span>
                          <span>{course.rating || "4.4"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-[#f8fafc] border-t border-slate-100/80 py-4 px-6 flex items-center justify-between text-slate-600 text-xs font-semibold rounded-b-[1.5rem]">
                      <div className="flex items-center gap-2">
                        <DifficultyIcon />
                        <span>{course.level || "Intermediate"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClockIcon />
                        <span>{course.duration || "18 hours"}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedCourses;

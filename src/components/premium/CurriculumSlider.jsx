import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { coursesData } from '../../data/coursesData';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const CurriculumSlider = () => {
  const targetRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const tints = ["p-tint-blue", "p-tint-emerald", "p-tint-amber"];
  const phases = coursesData.flatMap(c => c.curriculum.slice(0, 3));

  const scrollLeft = () => {
    if (targetRef.current) {
      targetRef.current.scrollBy({ left: -480, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (targetRef.current) {
      targetRef.current.scrollBy({ left: 480, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (targetRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = targetRef.current;
      const totalPhases = phases.length;
      if (totalPhases <= 1) return;

      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft <= 0) return;

      const percentage = scrollLeft / maxScrollLeft;
      const idx = Math.min(
        Math.round(percentage * (totalPhases - 1)),
        totalPhases - 1
      );
      setActiveIndex(idx);
    }
  };

  return (
    <section className="py-20 md:py-24 overflow-hidden relative">
      <div className="absolute inset-0 p-mesh-blue opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="p-heading-lg mb-4 uppercase tracking-tighter">Curriculum <br /> Deep Dive</h2>
            <p className="p-text-body">Trace the trajectory of your growth across our most intensive modules.</p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 hover:border-black/20 bg-black/[0.02] hover:bg-black/[0.05] text-black flex items-center justify-center transition-all active:scale-95 shadow-sm"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 hover:border-black/20 bg-black/[0.02] hover:bg-black/[0.05] text-black flex items-center justify-center transition-all active:scale-95 shadow-sm"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={targetRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-12 px-4 -mx-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {phases.map((phase, idx) => (
            <motion.div
              key={idx}
              className={`flex-shrink-0 w-[85vw] md:w-[450px] p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-black/5 shadow-sm relative group snap-center ${tints[idx % 3]}`}
            >
              <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5">
                <span className="text-6xl md:text-8xl font-black">{idx + 1}</span>
              </div>
              
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-white rounded-full text-[10px] font-black tracking-widest uppercase text-p-text-muted mb-6 md:mb-8 border border-black/5 shadow-sm">
                  {phase.phase}
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 group-hover:text-p-accent transition-colors tracking-tight uppercase leading-none">{phase.title}</h3>
                <p className="text-sm text-p-text-muted leading-relaxed mb-8 md:mb-10 h-24 overflow-hidden">
                  {phase.description}
                </p>
                
                <div className="space-y-4">
                  {phase.modules.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/40 p-3 rounded-xl border border-black/[0.03]">
                      <span>{m.name}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-black/[0.03] flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-p-accent">Protocol Secure</span>
                  <div className="p-2 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {phases.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full bg-black/10 transition-all duration-500 ${i === activeIndex ? "w-12 bg-p-accent" : "w-4"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSlider;

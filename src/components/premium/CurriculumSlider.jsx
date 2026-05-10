import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { coursesData } from '../../data/coursesData';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CurriculumSlider = () => {
  const targetRef = useRef(null);
  
  const tints = ["p-tint-blue", "p-tint-emerald", "p-tint-amber"];

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute inset-0 p-mesh-blue opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="p-heading-lg mb-4 uppercase tracking-tighter">Curriculum <br /> Deep Dive</h2>
            <p className="p-text-body">Trace the trajectory of your growth across our most intensive modules.</p>
          </div>
        </div>

        <div 
          ref={targetRef}
          className="flex overflow-x-auto gap-8 pb-12 px-4 -mx-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {coursesData.flatMap(c => c.curriculum.slice(0, 3)).map((phase, idx) => (
            <motion.div
              key={idx}
              className={`flex-shrink-0 w-[85vw] md:w-[450px] p-12 rounded-[3.5rem] border border-black/5 shadow-sm relative group snap-center ${tints[idx % 3]}`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="text-8xl font-black">{idx + 1}</span>
              </div>
              
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-white rounded-full text-[10px] font-black tracking-widest uppercase text-p-text-muted mb-8 border border-black/5 shadow-sm">
                  {phase.phase}
                </div>
                <h3 className="text-2xl font-black mb-6 group-hover:text-p-accent transition-colors tracking-tight uppercase leading-none">{phase.title}</h3>
                <p className="text-sm text-p-text-muted leading-relaxed mb-10 h-24 overflow-hidden">
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

                <div className="mt-12 pt-8 border-t border-black/[0.03] flex items-center justify-between">
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
        <div className="flex justify-center gap-2 mt-12">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-1.5 rounded-full bg-black/10 transition-all duration-500 ${i === 1 ? "w-12 bg-p-accent" : "w-4"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSlider;

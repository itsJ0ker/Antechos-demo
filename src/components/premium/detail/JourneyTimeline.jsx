import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Zap, Rocket } from 'lucide-react';

const JourneyTimeline = ({ curriculum }) => {
  return (
    <section className="py-32 border-t border-black/5 relative overflow-hidden">
      <div className="absolute inset-0 p-mesh-blue opacity-5 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="p-heading-lg mb-6 uppercase tracking-tighter leading-none">The Learning <br /> Journey</h2>
          <p className="p-text-body max-w-2xl mx-auto">
            Our curriculum is architected as a series of mission phases. 
            Each phase builds upon the previous, ensuring a progressive 
            evolution of your professional capabilities.
          </p>
        </div>

        <div className="relative">
          {curriculum.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative mb-32 last:mb-0"
            >
              <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-4 py-1 bg-white rounded-full text-[10px] font-black tracking-[0.3em] uppercase text-p-text-muted mb-6 border border-black/5 shadow-sm">
                    {phase.phase}
                  </div>
                  <h3 className="text-4xl font-black mb-8 uppercase tracking-tighter leading-none">{phase.title}</h3>
                  <p className="p-text-body text-lg mb-10 italic leading-relaxed">{phase.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {phase.modules.map((m, i) => (
                      <div key={i} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-p-text-muted bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-black/[0.03]">
                        <ShieldCheck className="w-5 h-5 text-p-accent" />
                        {m.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome Badge */}
                <div className="flex-1 flex justify-center">
                  <div className={`p-16 rounded-[4rem] border border-black/5 shadow-sm relative group hover:shadow-xl transition-all duration-700 ${
                    idx === 0 ? 'p-tint-blue' : idx === curriculum.length - 1 ? 'p-tint-emerald' : 'p-tint-amber'
                  }`}>
                    <div className="absolute inset-0 p-grid-mesh opacity-10" />
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-sm">
                        {idx === 0 ? <Target className="w-10 h-10 text-p-accent" /> : 
                         idx === curriculum.length - 1 ? <Rocket className="w-10 h-10 text-emerald-500" /> : 
                         <Zap className="w-10 h-10 text-amber-500" />}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Phase Goal</div>
                      <p className="text-lg font-black tracking-tight max-w-[240px] leading-tight uppercase">{phase.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';

const PremiumHero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden p-mesh-blue">
      {/* Background Mesh/Grid */}
      <div className="absolute inset-0 p-grid-mesh opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-sm mb-8"
            >
              <span className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                  </div>
                ))}
              </span>
              <span className="text-xs font-semibold tracking-tight text-p-text-muted">
                Joined by <span className="text-black">2,500+</span> elite professionals
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-heading-xl mb-8"
            >
              Architect Your <br />
              <span className="text-p-accent">Future Identity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-text-body max-w-xl mb-12"
            >
              High-performance certification programs designed for the hyper-competitive global landscape. Zero theory, 100% tactical execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button className="p-btn-primary w-full sm:w-auto">
                Explore Curriculums <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-p-text-muted hover:text-black transition-all">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-sm">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                Watch Experience
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] max-h-[500px] w-full max-w-[400px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl p-img-mask">
              <img 
                src="/premium_education_hero_1778405676093.png" 
                alt="Premium Education" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating Info Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 p-8 p-glass rounded-3xl max-w-[240px] shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Protocol Live</span>
              </div>
              <p className="text-sm font-bold text-p-text mb-2">ROI Focused Learning</p>
              <p className="text-[10px] leading-relaxed text-p-text-muted">Direct industry application on multi-million dollar projects.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Cues */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-black" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default PremiumHero;

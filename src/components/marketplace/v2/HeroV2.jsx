import { motion } from 'framer-motion';
import { ArrowRight, Play, Search, Zap, Star, ShieldCheck, TrendingUp, Globe, Users } from 'lucide-react';
import { TalentDashboard } from './TalentDashboard';

const FloatingStat = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="absolute z-20 px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
  >
    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{value}</p>
    </div>
  </motion.div>
);

export const HeroV2 = () => {
  return (
    <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden v2-section">
      <div className="v2-mesh-bg" />

      {/* Dynamic Accent Glows */}
      <div className="v2-accent-glow top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10" />
      <div className="v2-accent-glow bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10" />
      <div className="v2-accent-glow top-[40%] right-[20%] w-[400px] h-[400px] bg-blue-500/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-12 items-center">

          {/* Left Side: Copy */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--v2-accent-subtle)] border border-indigo-100/50 dark:border-indigo-500/20 mb-8 w-fit shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Live: Matching 42 Partners</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="v2-heading text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1] mb-8 tracking-tighter"
            >
              The intelligent way to <br />
              <span className="v2-gradient-text">scale your vision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="v2-subheading text-lg sm:text-xl text-[var(--v2-text-secondary)] max-w-xl mb-10 font-medium"
            >
              Antechos connects high-growth startups with the world's top 3% of talent through an AI-powered neural matchmaking platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="v2-btn v2-btn-accent !bg-indigo-600 !px-10 !py-5 text-base flex items-center gap-2 shadow-2xl shadow-indigo-500/30 group">
                Find Your Expert <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="v2-btn v2-btn-secondary !px-10 !py-5 text-base flex items-center gap-3 bg-[var(--v2-bg)] border-[var(--v2-border)] hover:border-indigo-500 transition-all">
                <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Play size={12} fill="currentColor" />
                </div>
                See Platform Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex items-center gap-10"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[var(--v2-text-main)]">98%</span>
                <span className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-widest">Match Accuracy</span>
              </div>
              <div className="w-px h-8 bg-[var(--v2-border)]" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[var(--v2-text-main)]">48h</span>
                <span className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-widest">Avg. Hiring Time</span>
              </div>
              <div className="w-px h-8 bg-[var(--v2-border)]" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[var(--v2-text-main)]">150+</span>
                <span className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-widest">Vetted Skills</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Dashboard Visualization */}
          <div className="relative lg:ml-auto w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <TalentDashboard />
            </motion.div>


            <div className="absolute bottom-20 -right-8">
              <FloatingStat icon={ShieldCheck} label="Verification" value="Neural-Vetted" delay={1.4} />
            </div>
            <div className="absolute top-1/2 -right-16 -translate-y-1/2">
              <FloatingStat icon={Users} label="Active Teams" value="2,400+" delay={1.6} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

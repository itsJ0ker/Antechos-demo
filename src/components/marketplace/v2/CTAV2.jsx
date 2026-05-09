import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, ShieldCheck } from 'lucide-react';

export const CTAV2 = () => {
  return (
    <section className="py-24 v2-section relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--v2-border)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--v2-accent-subtle)] border border-indigo-100 dark:border-indigo-500/20 mb-10"
        >
          <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Ready to scale?</span>
        </motion.div>

        <h2 className="v2-heading text-4xl sm:text-6xl mb-8 leading-tight text-[var(--v2-text-main)]">
          Find your next <br />
          <span className="v2-gradient-text">world-class partner.</span>
        </h2>
        
        <p className="text-lg sm:text-xl text-[var(--v2-text-secondary)] mb-12 max-w-2xl mx-auto font-medium">
          Join 2,000+ companies hiring top-tier designers, engineers, and product specialists on Antechos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="v2-btn v2-btn-accent !px-12 !py-5 text-lg shadow-xl shadow-indigo-500/20 !bg-indigo-600 border-indigo-600 text-white">
            Post a Project — It's Free
          </button>
          <button className="v2-btn v2-btn-secondary !px-12 !py-5 text-lg bg-[var(--v2-bg)] text-[var(--v2-text-main)] border-[var(--v2-border)]">
            Browse All Talent
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-amber-400" fill="currentColor" />
            <span className="text-sm font-black text-[var(--v2-text-main)]">4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-black text-[var(--v2-text-main)]">Verified Professional Network</span>
          </div>
        </div>
      </div>
    </section>
  );
};

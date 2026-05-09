import { motion } from 'framer-motion';
import { Search, ShieldCheck, Zap, ArrowRight, UserPlus, FileSearch, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Define Needs',
    desc: 'Specify skills, duration, and budget. Our AI identifies the ideal profile persona.',
    icon: FileSearch,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 2,
    title: 'AI Matching',
    desc: 'Neural engine scans 50,000+ vetted profiles to find your top 3 perfect matches.',
    icon: Zap,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    id: 3,
    title: 'Instant Hire',
    desc: 'Review match reports, interview in one click, and start building in under 48 hours.',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
];

export const HowItWorksV2 = () => {
  return (
    <section className="py-24 v2-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--v2-accent-subtle)] border border-indigo-100 dark:border-indigo-500/20 mb-6"
          >
            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Efficiency Protocol</span>
          </motion.div>
          <h2 className="v2-heading text-4xl sm:text-5xl mb-6 text-[var(--v2-text-main)]">Hiring at the <span className="v2-gradient-text">speed of thought.</span></h2>
          <p className="v2-subheading text-[var(--v2-text-secondary)] text-lg font-medium">We've automated the friction out of technical recruiting so you can focus on building.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--v2-border)] to-transparent -z-10" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-8 relative z-10 border border-[var(--v2-border)] group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-xl`}>
                <step.icon size={28} className={step.color} />
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[var(--v2-bg)] border border-[var(--v2-border)] flex items-center justify-center text-[10px] font-black text-[var(--v2-text-main)] shadow-sm">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-black mb-4 text-[var(--v2-text-main)]">{step.title}</h3>
              <p className="text-sm text-[var(--v2-text-secondary)] leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

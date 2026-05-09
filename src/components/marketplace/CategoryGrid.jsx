import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Server, Link2, Palette, Cloud, ShieldCheck, ArrowRight } from 'lucide-react';

const categories = [
  { title: 'Web Development', talents: '12K+', icon: Code, color: '#a78bfa', accent: '#7c3aed' },
  { title: 'Mobile Apps', talents: '8K+', icon: Smartphone, color: '#818cf8', accent: '#6366f1' },
  { title: 'AI Automation', talents: '6K+', icon: Brain, color: '#22d3ee', accent: '#06b6d4' },
  { title: 'DevOps', talents: '5K+', icon: Server, color: '#34d399', accent: '#10b981' },
  { title: 'Blockchain', talents: '3K+', icon: Link2, color: '#fbbf24', accent: '#f59e0b' },
  { title: 'UI/UX', talents: '10K+', icon: Palette, color: '#fb7185', accent: '#f43f5e' },
  { title: 'Cloud Engineering', talents: '7K+', icon: Cloud, color: '#38bdf8', accent: '#0ea5e9' },
  { title: 'Cybersecurity', talents: '4K+', icon: ShieldCheck, color: '#a3e635', accent: '#84cc16' },
];

const CategoryCard = ({ cat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="relative group cursor-pointer rounded-2xl p-[1px] overflow-hidden"
  >
    {/* Border gradient on hover */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, ${cat.color}60, transparent 40%, ${cat.color}30)`,
      }} />

    <div className="relative h-full rounded-2xl p-6 transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
      }}>
      
      {/* Hover glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${cat.color}20, transparent)`, filter: 'blur(25px)' }} />

      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative"
        style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}20` }}
        whileHover={{ rotate: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <cat.icon size={24} style={{ color: cat.color }} />

        {/* Icon shimmer */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ background: `linear-gradient(135deg, transparent 40%, ${cat.color}15 50%, transparent 60%)`, backgroundSize: '200% 200%', animation: 'mp-shimmer 2s ease infinite' }} />
      </motion.div>

      {/* Title */}
      <h3 className="text-base font-bold text-white/85 mb-1 group-hover:text-white transition-colors"
        style={{ fontFamily: 'var(--mp-font-display)' }}>
        {cat.title}
      </h3>

      {/* Talent count */}
      <p className="text-sm mb-4" style={{ color: `${cat.color}99`, fontFamily: 'var(--mp-font-mono)' }}>
        {cat.talents} Talents
      </p>

      {/* Arrow */}
      <div className="flex items-center gap-1.5 text-xs text-white/20 group-hover:text-white/50 transition-colors">
        <span>Explore</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

const CategoryGrid = () => (
  <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'var(--mp-surface-0)' }}>
    {/* Ambient */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 60%)' }} />

    <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div>
          <span className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 block"
            style={{ fontFamily: 'var(--mp-font-mono)' }}>
            Browse Top Categories
          </span>
          <h2 className="mp-heading text-3xl sm:text-4xl lg:text-5xl">
            Work with experts{' '}
            <span className="mp-gradient-text">across every domain</span>
          </h2>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 text-sm text-violet-400/70 hover:text-violet-300 transition-colors self-start sm:self-auto"
          style={{ fontFamily: 'var(--mp-font-display)' }}
        >
          View all categories <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.title} cat={cat} index={i} />
        ))}
      </div>
    </div>

    <div className="mp-section-divider mt-20" />
  </section>
);

export default CategoryGrid;

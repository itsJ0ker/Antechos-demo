import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useInViewObserver } from 'react-intersection-observer';
import { Users, FolderKanban, ThumbsUp, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Talents', value: 50000, suffix: '+', prefix: '', icon: Users, color: '#a78bfa', decimals: 0 },
  { label: 'Projects', value: 25, suffix: 'K+', prefix: '', icon: FolderKanban, color: '#818cf8', decimals: 0 },
  { label: 'Client Satisfaction', value: 98, suffix: '%', prefix: '', icon: ThumbsUp, color: '#34d399', decimals: 0 },
  { label: 'Value Delivered', value: 50, suffix: 'M+', prefix: '₹', icon: TrendingUp, color: '#fbbf24', decimals: 0 },
];

const StatCard = ({ stat, index }) => {
  const [ref, inView] = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative group flex flex-col items-center text-center px-6 py-8"
    >
      {/* Icon */}
      <motion.div
        className="mb-4 relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
          <stat.icon size={24} style={{ color: stat.color }} />
        </div>
        {/* Glow behind icon */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `${stat.color}22`, filter: 'blur(14px)' }} />
      </motion.div>

      {/* Number */}
      <div className="text-3xl sm:text-4xl font-bold mb-1.5"
        style={{ fontFamily: 'var(--mp-font-display)', color: stat.color }}>
        {stat.prefix}
        {inView ? (
          <CountUp
            start={0}
            end={stat.value}
            duration={2.5}
            separator=","
            decimals={stat.decimals}
          />
        ) : '0'}
        {stat.suffix}
      </div>

      {/* Label */}
      <p className="text-sm text-white/40" style={{ fontFamily: 'var(--mp-font-body)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
};

const TrustStats = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--mp-surface-0) 0%, var(--mp-violet-950) 50%, var(--mp-surface-0) 100%)' }}>
      
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative">
              <StatCard stat={stat} index={i} />
              {/* Vertical divider (except last) */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/4 h-1/2 w-px bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mp-section-divider mt-16" />
    </section>
  );
};

export default TrustStats;

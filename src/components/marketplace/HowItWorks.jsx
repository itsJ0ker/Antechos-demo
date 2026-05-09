import { motion } from 'framer-motion';
import { Search, MessageSquare, CheckCircle2, CreditCard } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Find',
    desc: 'Tell us what you need and we find the best matches using our AI engine.',
    icon: Search,
    color: '#a78bfa',
  },
  {
    num: '02',
    title: 'Collaborate',
    desc: 'Work together with clear communication, milestones and real-time visibility.',
    icon: MessageSquare,
    color: '#818cf8',
  },
  {
    num: '03',
    title: 'Deliver',
    desc: 'Track progress and review work with confidence at every stage.',
    icon: CheckCircle2,
    color: '#34d399',
  },
  {
    num: '04',
    title: 'Pay',
    desc: 'Pay securely when you\'re 100% satisfied with the deliverables.',
    icon: CreditCard,
    color: '#fbbf24',
  },
];

const StepCard = ({ step, index, total }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative flex flex-col items-center text-center group"
  >
    {/* Connector Line (except last) */}
    {index < total - 1 && (
      <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px z-0">
        <svg width="100%" height="2" className="overflow-visible">
          <line x1="0" y1="1" x2="100%" y2="1"
            stroke="rgba(124,58,237,0.15)" strokeWidth="2" strokeDasharray="6 6"
            style={{ animation: 'mp-dash-flow 1.5s linear infinite' }} />
        </svg>
        {/* Glowing dot on connector */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: step.color, boxShadow: `0 0 10px ${step.color}`, right: '50%' }}
          animate={{ x: [-20, 20] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: index * 0.5 }}
        />
      </div>
    )}

    {/* Icon Container */}
    <motion.div
      whileHover={{ scale: 1.12, rotate: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-5 cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${step.color}18, ${step.color}08)`,
        border: `1px solid ${step.color}30`,
        boxShadow: `0 4px 30px ${step.color}10`,
      }}
    >
      <step.icon size={28} style={{ color: step.color }} />

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${step.color}12`, filter: 'blur(20px)' }} />

      {/* Step number badge */}
      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
        style={{
          background: 'var(--mp-violet-950)',
          border: `1px solid ${step.color}40`,
          color: step.color,
          fontFamily: 'var(--mp-font-mono)',
        }}>
        {step.num}
      </div>
    </motion.div>

    {/* Title */}
    <h3 className="text-lg font-bold mb-2 text-white/90 group-hover:text-white transition-colors"
      style={{ fontFamily: 'var(--mp-font-display)' }}>
      {step.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-white/35 max-w-[200px] leading-relaxed" style={{ fontFamily: 'var(--mp-font-body)' }}>
      {step.desc}
    </p>
  </motion.div>
);

const HowItWorks = () => (
  <section className="relative py-20 sm:py-28 overflow-hidden"
    style={{ background: 'var(--mp-surface-0)' }}>
    
    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 60%)' }} />

    <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 block"
          style={{ fontFamily: 'var(--mp-font-mono)' }}>
          How it works
        </span>
        <h2 className="mp-heading text-3xl sm:text-4xl lg:text-5xl mb-4">
          Simple steps.{' '}
          <span className="mp-gradient-text">Powerful results.</span>
        </h2>
        <p className="mp-subheading text-base sm:text-lg max-w-lg mx-auto">
          From finding the right talent to delivering great results, we make it effortless.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
        {steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} total={steps.length} />
        ))}
      </div>
    </div>

    {/* Bottom divider */}
    <div className="mp-section-divider mt-20" />
  </section>
);

export default HowItWorks;

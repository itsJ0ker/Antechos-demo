import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Meera Iyer',
    role: 'CTO, NexaFlow',
    text: 'The AI matching was incredible. Found a senior React developer within 24 hours who delivered our MVP in 3 weeks. The platform quality is unmatched.',
    rating: 5,
    avatar: 'MI',
    color: '#a78bfa',
  },
  {
    name: 'Vikram Desai',
    role: 'Founder, CloudSync',
    text: 'We scaled our engineering team from 3 to 15 people using Antechos. The talent quality and cultural fit has been consistently exceptional.',
    rating: 5,
    avatar: 'VD',
    color: '#34d399',
  },
  {
    name: 'Ananya Rao',
    role: 'Product Lead, FinServe',
    text: 'Delivered our mobile banking app 40% under budget. The project management tools and real-time collaboration features are game-changing.',
    rating: 5,
    avatar: 'AR',
    color: '#818cf8',
  },
];

const TestimonialSection = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'var(--mp-surface-0)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-3 block"
            style={{ fontFamily: 'var(--mp-font-mono)' }}>Testimonials</span>
          <h2 className="mp-heading text-3xl sm:text-4xl lg:text-5xl">
            Loved by teams{' '}
            <span className="mp-gradient-text">worldwide</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 left-8 opacity-10">
                <Quote size={48} style={{ color: t.color }} />
              </div>

              {/* Ambient glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${t.color}15, transparent)`, filter: 'blur(30px)' }} />

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}>
                    <Star size={18} fill={t.color} stroke="none" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed italic"
                style={{ fontFamily: 'var(--mp-font-body)' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ background: `${t.color}20`, color: t.color, fontFamily: 'var(--mp-font-display)' }}>
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white/80" style={{ fontFamily: 'var(--mp-font-display)' }}>{t.name}</p>
                  <p className="text-xs text-white/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <ChevronLeft size={18} className="text-white/40" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === active ? testimonials[active].color : 'rgba(255,255,255,0.15)',
                    width: i === active ? '24px' : '8px',
                    boxShadow: i === active ? `0 0 10px ${testimonials[active].color}50` : 'none',
                  }} />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <ChevronRight size={18} className="text-white/40" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mp-section-divider mt-20" />
    </section>
  );
};

export default TestimonialSection;

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      color: ['#a78bfa', '#818cf8', '#22d3ee', '#34d399'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: 'var(--mp-surface-0)' }}>
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-[2rem] overflow-hidden p-8 sm:p-12 lg:p-16"
          style={{
            background: 'linear-gradient(135deg, rgba(45,10,94,0.6), rgba(20,2,40,0.9))',
            border: '1px solid rgba(124,58,237,0.2)',
          }}>

          {/* Background gradient orbs */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 60%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 60%)', filter: 'blur(60px)' }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Floating particles */}
          {particles.map(p => (
            <motion.div key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color }}
              animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <Sparkles size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-violet-300" style={{ fontFamily: 'var(--mp-font-display)' }}>Start Building Today</span>
              </div>

              <h2 className="mp-heading text-3xl sm:text-4xl lg:text-5xl mb-5">
                Ready to build something{' '}
                <span className="mp-gradient-text">amazing together?</span>
              </h2>

              <p className="mp-subheading text-base sm:text-lg mb-10 max-w-lg mx-auto">
                Join thousands of businesses and talents creating impact every day. 
                Your next great project starts here.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mp-btn-primary flex items-center gap-2 !px-8 !py-4 !text-base"
                >
                  Join as a Client <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mp-btn-ghost !px-8 !py-4 !text-base"
                >
                  Join as Talent
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t border-l rounded-tl-xl opacity-10"
            style={{ borderColor: 'var(--mp-violet-400)' }} />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r rounded-br-xl opacity-10"
            style={{ borderColor: 'var(--mp-cyan)' }} />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

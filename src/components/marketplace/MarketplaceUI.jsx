import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/* ── Magnetic Button ── */
export const MagneticButton = ({ children, className = '', onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.35);
    y.set(middleY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`relative transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

/* ── Live Activity Ticker ── */
const activities = [
  "New match: Senior UX Designer matched with NexaFlow",
  "Arjun M. just completed a High-Scale API project",
  "Priya S. received a 5.0★ rating for FinServe Mobile",
  "CloudSync just hired 3 React Developers",
  "AI Match: Culture fit score 98% for Blockchain Lead",
];

export const LiveActivityTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 overflow-hidden h-6">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
      <div className="relative flex-1">
        {activities.map((activity, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={i === index ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute inset-0 whitespace-nowrap text-[10px] sm:text-[11px] text-white/40 font-mono ${i === index ? 'block' : 'hidden'}`}
          >
            {activity}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

/* ── Glass Badge ── */
export const GlassBadge = ({ children, icon: Icon, color = 'var(--mp-violet-400)' }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
    {Icon && <Icon size={12} style={{ color }} />}
    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60" style={{ fontFamily: 'var(--mp-font-mono)' }}>
      {children}
    </span>
  </div>
);

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Search, ArrowRight, Sparkles, Zap, Brain, Shield, Star } from 'lucide-react';
import { MagneticButton } from './MarketplaceUI';

/* ── Floating Profile Card ── */
const FloatingProfileCard = ({ name, role, match, avatar, delay, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setTilt({ x: -y, y: x });
  };

  const matchColor = match >= 90 ? '#34d399' : match >= 80 ? '#818cf8' : '#fbbf24';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6 + delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
        animation: `mp-float ${5 + index}s ease-in-out infinite`,
        animationDelay: `${index * 0.8}s`,
      }}
      className="relative rounded-2xl overflow-hidden p-[1px] cursor-pointer group"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #818cf8, #22d3ee, #7c3aed)', backgroundSize: '300% 300%', animation: 'mp-shimmer 3s ease infinite' }} />

      <div className="relative rounded-2xl p-4 sm:p-5"
        style={{ background: 'rgba(20, 2, 40, 0.85)', backdropFilter: 'blur(24px)' }}>

        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ background: `radial-gradient(circle, ${matchColor}, transparent)`, filter: 'blur(20px)' }} />

        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-violet-500/40 transition-all">
              <div className="w-full h-full flex items-center justify-center text-lg font-bold"
                style={{ background: `linear-gradient(135deg, ${matchColor}33, ${matchColor}11)`, color: matchColor }}>
                {avatar}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#140228]" style={{ background: '#34d399' }} />
          </div>
          <div>
            <p className="font-semibold text-sm text-white/90" style={{ fontFamily: 'var(--mp-font-display)' }}>{name}</p>
            <p className="text-xs text-white/40">{role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${matchColor}, ${matchColor}88)` }}
              initial={{ width: 0 }} animate={{ width: `${match}%` }}
              transition={{ delay: 1.2 + delay, duration: 1.2, ease: 'easeOut' }} />
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: matchColor, fontFamily: 'var(--mp-font-mono)' }}>{match}%</span>
        </div>

        <div className="flex gap-1.5 mt-3 flex-wrap">
          {['React', 'AI/ML', 'Node'].slice(0, 2 + index % 2).map(s => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/5">{s}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Ambient Orb ── */
const GlowOrb = ({ color, size, top, left, delay }) => (
  <motion.div
    className="mp-glow"
    style={{ background: color, width: size, height: size, top, left }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ── Search Pill ── */
const CategoryPill = ({ label, icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all"
    style={{
      background: 'rgba(124, 58, 237, 0.08)',
      border: '1px solid rgba(124, 58, 237, 0.18)',
      color: 'var(--mp-violet-300)',
      fontFamily: 'var(--mp-font-display)',
    }}
  >
    {Icon && <Icon size={13} />}
    {label}
  </motion.button>
);

/* ── Particles ── */
const Particles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 15,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map(p => (
        <div key={p.id} className="mp-particle"
          style={{
            left: p.left, bottom: '-10px',
            width: p.size, height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══ HERO SECTION ═══ */
const HeroSection = () => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(springX, [0, 1], [-20, 20]);
  const bgY = useTransform(springY, [0, 1], [-20, 20]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const profiles = [
    { name: 'Arjun Mehta', role: 'Full Stack Developer', match: 95, avatar: 'AM' },
    { name: 'Priya Sharma', role: 'UI/UX Designer', match: 92, avatar: 'PS' },
    { name: 'Rohit Verma', role: 'AI Engineer', match: 88, avatar: 'RV' },
  ];

  const categories = [
    { label: 'Web Development', icon: Zap },
    { label: 'Mobile Apps', icon: Sparkles },
    { label: 'AI & ML', icon: Brain },
    { label: 'UI/UX Design', icon: Star },
    { label: 'DevOps', icon: Shield },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden mp-noise"
      onMouseMove={handleMouseMove}
    >
      <div className="mp-mesh-bg opacity-40" />

      {/* Ambient Glow Orbs */}
      <GlowOrb color="rgba(124, 58, 237, 0.4)" size="600px" top="-10%" left="5%" delay={0} />
      <GlowOrb color="rgba(129, 140, 248, 0.25)" size="500px" top="40%" left="65%" delay={2} />
      <GlowOrb color="rgba(34, 211, 238, 0.15)" size="400px" top="65%" left="15%" delay={4} />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }} />
      </div>

      <Particles />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-0">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center min-h-[85vh]">

          {/* ── Left Column ── */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 w-fit"
              style={{ background: 'rgba(124, 58, 237, 0.12)', border: '1px solid rgba(124, 58, 237, 0.3)', backdropFilter: 'blur(10px)' }}
            >
              <Sparkles size={14} className="text-violet-400" />
              <span className="text-[11px] font-bold text-violet-300 uppercase tracking-widest" style={{ fontFamily: 'var(--mp-font-mono)' }}>AI-Native Ecosystem</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mp-heading text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-8xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Scale with <br />
              <span className="mp-gradient-text">Elite Talent.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mp-subheading text-base sm:text-lg md:text-xl max-w-xl mb-10 text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              The most intelligent way to hire and collaborate. 
              Our neural matching engine analyzes 50+ dimensions to find your ideal partners in seconds.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="relative max-w-2xl mb-8"
            >
              <div className="flex items-center gap-3 p-2 rounded-2xl mp-glass group"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="pl-4">
                  <Search size={20} className="text-violet-400/50 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Describe your project (e.g. 'Senior React Developer for Fintech')..."
                  className="flex-1 bg-transparent text-base text-white/90 placeholder-white/20 outline-none py-4"
                  style={{ fontFamily: 'var(--mp-font-body)' }}
                />
                <MagneticButton className="mp-btn-primary !py-3.5 !px-8 flex items-center gap-2">
                  <span>Match</span>
                  <ArrowRight size={18} />
                </MagneticButton>
              </div>
            </motion.div>

            {/* Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {categories.map(c => <CategoryPill key={c.label} {...c} />)}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="flex flex-wrap gap-5"
            >
              <MagneticButton className="mp-btn-primary !px-10 !py-4 text-base">
                Get Started
              </MagneticButton>
              <MagneticButton className="mp-btn-ghost !px-10 !py-4 text-base"
                style={{
                  fontFamily: 'var(--mp-font-display)',
                  fontWeight: 600,
                  borderRadius: '16px',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  color: 'var(--mp-violet-300)'
                }}>
                Join as Talent
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── Right Column — Floating Talent Cards ── */}
          <motion.div
            className="relative flex items-center justify-center min-h-[450px] lg:min-h-[550px]"
            style={{ x: bgX, y: bgY }}
          >
            {/* AI Match Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl"
                style={{ background: 'rgba(20,2,40,0.85)', border: '1px solid rgba(124,58,237,0.4)', backdropFilter: 'blur(24px)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <span className="text-[12px] font-bold text-white/80 uppercase tracking-widest" style={{ fontFamily: 'var(--mp-font-mono)' }}>Neural Engine Active</span>
              </div>
            </motion.div>

            {/* Profile Cards */}
            <div className="relative w-full max-w-md">
              {profiles.map((p, i) => (
                <div key={p.name} className="absolute" style={{
                  ...(i === 0 ? { top: '-10px', left: '-20px', zIndex: 3 } : {}),
                  ...(i === 1 ? { top: '-50px', right: '-40px', zIndex: 2 } : {}),
                  ...(i === 2 ? { bottom: '-260px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 } : {}),
                  width: 'min(240px, 100%)',
                }}>
                  <FloatingProfileCard {...p} delay={i * 0.15} index={i} />
                </div>
              ))}
            </div>

            {/* Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <div className="w-[320px] h-[320px] rounded-full border border-violet-500/30 shadow-[0_0_30px_rgba(124,58,237,0.1)]" style={{ animation: 'mp-rotate-slow 40s linear infinite' }} />
              <div className="absolute w-[450px] h-[450px] rounded-full border border-violet-500/15" style={{ animation: 'mp-rotate-slow 60s linear infinite reverse' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

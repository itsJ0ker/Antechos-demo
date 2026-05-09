import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Search, ArrowRight, Sparkles, Zap, Brain, Shield, Star } from 'lucide-react';

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
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #818cf8, #22d3ee, #7c3aed)', backgroundSize: '300% 300%', animation: 'mp-shimmer 3s ease infinite' }} />

      <div className="relative rounded-2xl p-4 sm:p-5"
        style={{ background: 'rgba(20, 2, 40, 0.85)', backdropFilter: 'blur(24px)' }}>

        {/* Glow */}
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ background: `radial-gradient(circle, ${matchColor}, transparent)`, filter: 'blur(20px)' }} />

        {/* Avatar + Info */}
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

        {/* Match Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${matchColor}, ${matchColor}88)` }}
              initial={{ width: 0 }} animate={{ width: `${match}%` }}
              transition={{ delay: 1.2 + delay, duration: 1.2, ease: 'easeOut' }} />
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: matchColor, fontFamily: 'var(--mp-font-mono)' }}>{match}%</span>
        </div>

        {/* Skills chips */}
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(springX, [0, 1], [-15, 15]);
  const bgY = useTransform(springY, [0, 1], [-15, 15]);

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
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1f0640 0%, #0c0117 55%, #08010f 100%)' }}
    >
      {/* Ambient Glow Orbs */}
      <GlowOrb color="rgba(124, 58, 237, 0.35)" size="500px" top="-15%" left="10%" delay={0} />
      <GlowOrb color="rgba(129, 140, 248, 0.2)" size="400px" top="50%" left="70%" delay={2} />
      <GlowOrb color="rgba(34, 211, 238, 0.12)" size="350px" top="70%" left="20%" delay={4} />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <Particles />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-0">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-8 items-center min-h-[85vh]">

          {/* ── Left Column ── */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 w-fit"
              style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.25)' }}
            >
              <Sparkles size={14} className="text-violet-400" />
              <span className="text-xs font-medium text-violet-300" style={{ fontFamily: 'var(--mp-font-display)' }}>AI-Powered Matchmaking</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mp-heading text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Find the right talent.{' '}
              <span className="mp-gradient-text block mt-1">Build the future.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mp-subheading text-base sm:text-lg max-w-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              The most intelligent way to hire, collaborate and grow together. 
              Our AI analyzes 50+ signals to match you with the perfect talent.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="relative max-w-xl mb-6"
            >
              <div className="flex items-center gap-3 p-1.5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                <div className="pl-4">
                  <Search size={18} className="text-violet-400/60" />
                </div>
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/25 outline-none py-3"
                  style={{ fontFamily: 'var(--mp-font-body)' }}
                />
                <button className="mp-btn-primary flex items-center gap-2 !py-3 !px-6 !rounded-xl">
                  <span className="hidden sm:inline">Search</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              <span className="text-xs text-white/25 mr-1 self-center" style={{ fontFamily: 'var(--mp-font-mono)' }}>Popular:</span>
              {categories.map(c => <CategoryPill key={c.label} {...c} />)}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button className="mp-btn-primary flex items-center gap-2">
                Hire Talent <ArrowRight size={16} />
              </button>
              <button className="mp-btn-ghost">Join as Talent</button>
            </motion.div>
          </div>

          {/* ── Right Column — Floating Talent Cards ── */}
          <motion.div
            className="relative flex items-center justify-center min-h-[420px] lg:min-h-[520px]"
            style={{ x: bgX, y: bgY }}
          >
            {/* Central Glow Aura */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] rounded-full" style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'mp-pulse-glow 5s ease-in-out infinite',
              }} />
            </div>

            {/* AI Match Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: 'rgba(20,2,40,0.8)', border: '1px solid rgba(124,58,237,0.3)', backdropFilter: 'blur(20px)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-white/70" style={{ fontFamily: 'var(--mp-font-display)' }}>Top Match for You</span>
              </div>
            </motion.div>

            {/* Profile Cards — stacked with depth */}
            <div className="relative w-full max-w-md space-y-4 sm:space-y-0">
              {profiles.map((p, i) => (
                <div key={p.name} className="sm:absolute" style={{
                  ...(i === 0 ? { top: '60px', left: '0', zIndex: 3 } : {}),
                  ...(i === 1 ? { top: '30px', right: '0', zIndex: 2 } : {}),
                  ...(i === 2 ? { top: '180px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 } : {}),
                  width: 'min(220px, 100%)',
                }}>
                  <FloatingProfileCard {...p} delay={i * 0.15} index={i} />
                </div>
              ))}
            </div>

            {/* Floating AI Engine Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20"
              style={{ animation: 'mp-float-slow 8s ease-in-out infinite' }}
            >
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{ background: 'rgba(20,2,40,0.85)', border: '1px solid rgba(34,211,238,0.25)', backdropFilter: 'blur(20px)' }}>
                <Brain size={16} className="text-cyan-400" />
                <div>
                  <p className="text-[11px] font-semibold text-white/80" style={{ fontFamily: 'var(--mp-font-display)' }}>AI Match Engine</p>
                  <p className="text-[10px] text-cyan-400/60" style={{ fontFamily: 'var(--mp-font-mono)' }}>Analyzing 50+ signals</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[280px] h-[280px] rounded-full border border-violet-500/30" style={{ animation: 'mp-rotate-slow 30s linear infinite' }} />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-violet-500/15" style={{ animation: 'mp-rotate-slow 45s linear infinite reverse' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

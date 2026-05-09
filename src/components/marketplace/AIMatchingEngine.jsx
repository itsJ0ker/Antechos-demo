import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Activity, Zap, BarChart3, Target, Search, Filter } from 'lucide-react';
import { LiveActivityTicker, GlassBadge } from './MarketplaceUI';

/* Animated floating metric card */
const MetricFloat = ({ label, value, icon: Icon, color, delay, position }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className="absolute z-10"
    style={{ ...position, animation: `mp-float ${6 + delay * 2}s ease-in-out infinite` }}
  >
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
      style={{ background: 'rgba(20,2,40,0.85)', border: `1px solid ${color}25`, backdropFilter: 'blur(20px)' }}>
      <Icon size={16} style={{ color }} />
      <div>
        <p className="text-xs font-bold text-white/80" style={{ fontFamily: 'var(--mp-font-mono)' }}>{value}</p>
        <p className="text-[10px] text-white/30">{label}</p>
      </div>
    </div>
  </motion.div>
);

/* SVG Graph Node */
const GraphNode = ({ cx, cy, r, color, delay }) => (
  <motion.g>
    <motion.circle cx={cx} cy={cy} r={r * 2.5} fill={`${color}15`}
      animate={{ r: [r * 2, r * 3, r * 2] }}
      transition={{ duration: 3, repeat: Infinity, delay }} />
    <motion.circle cx={cx} cy={cy} r={r} fill={color}
      initial={{ scale: 0 }} whileInView={{ scale: 1 }}
      transition={{ delay, duration: 0.5 }} viewport={{ once: true }} />
    <circle cx={cx} cy={cy} r={r * 0.4} fill="white" opacity="0.6" />
  </motion.g>
);

const AIMatchingEngine = () => {
  const nodes = useMemo(() => [
    { cx: 100, cy: 80, r: 8, color: '#a78bfa', label: 'Skills' },
    { cx: 250, cy: 50, r: 10, color: '#818cf8', label: 'Experience' },
    { cx: 400, cy: 90, r: 7, color: '#22d3ee', label: 'Culture' },
    { cx: 180, cy: 170, r: 9, color: '#34d399', label: 'Budget' },
    { cx: 320, cy: 160, r: 11, color: '#fbbf24', label: 'Availability' },
    { cx: 450, cy: 180, r: 8, color: '#fb7185', label: 'Rating' },
    { cx: 60, cy: 200, r: 6, color: '#a78bfa', label: 'Domain' },
    { cx: 500, cy: 120, r: 7, color: '#818cf8', label: 'Speed' },
  ], []);

  const connections = useMemo(() => [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [1, 4], [2, 5], [2, 7], [6, 0], [6, 3],
  ], []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden mp-noise"
      style={{ background: 'var(--mp-surface-0)' }}>
      
      <div className="mp-mesh-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GlassBadge icon={Brain}>Precision Matching</GlassBadge>
              <div className="h-px w-8 bg-white/10" />
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest font-mono">Neural V3.0</span>
            </div>

            <h2 className="mp-heading text-4xl sm:text-5xl lg:text-6xl mb-8">
              Neural Precision.<br />
              <span className="mp-gradient-text">Human Intelligence.</span>
            </h2>

            <p className="mp-subheading text-lg sm:text-xl mb-12 max-w-lg text-white/50">
              An ecosystem where AI handles the complexity of selection, so you can focus on the brilliance of execution.
            </p>

            {/* Feature list */}
            <div className="space-y-8 mb-12">
              {[
                { icon: Brain, label: 'Cognitive Matching', desc: 'Predicting success through behavioral & technical alignment.' },
                { icon: Activity, label: 'Real-time Flow', desc: 'Instant availability syncing across 50,000+ talents.' },
                { icon: Target, label: 'Verified Results', desc: '100% project success guarantee with milestone tracking.' },
              ].map((f, i) => (
                <motion.div key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform bg-white/5 border border-white/10 shadow-xl">
                    <f.icon size={20} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white/90 mb-1" style={{ fontFamily: 'var(--mp-font-display)' }}>{f.label}</p>
                    <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Ticker */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-md">
              <LiveActivityTicker />
            </div>
          </motion.div>

          {/* Right — Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Dashboard Window */}
            <div className="relative rounded-[2.5rem] overflow-hidden p-[1px] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/10 animate-pulse" />
              
              <div className="relative rounded-[2.5rem] bg-[#0c0117]/95 backdrop-blur-3xl p-8 sm:p-10 border border-white/10">
                {/* Header Mockup */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
                      <Search size={14} className="text-violet-400" />
                    </div>
                    <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest font-mono">Market Analysis</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/5 flex items-center justify-center">
                      <Filter size={10} className="text-white/20" />
                    </div>
                    <div className="w-16 h-6 rounded-md bg-white/5 border border-white/5" />
                  </div>
                </div>

                {/* SVG Graph */}
                <svg viewBox="0 0 560 260" className="w-full h-auto mb-8" style={{ filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.15))' }}>
                  {connections.map(([a, b], i) => (
                    <motion.line key={i}
                      x1={nodes[a].cx} y1={nodes[a].cy}
                      x2={nodes[b].cx} y2={nodes[b].cy}
                      stroke="rgba(124,58,237,0.2)" strokeWidth="1.5"
                      strokeDasharray="6 6"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      viewport={{ once: true }}
                      style={{ animation: 'mp-dash-flow 3s linear infinite' }}
                    />
                  ))}

                  {nodes.map((node, i) => (
                    <GraphNode key={i} {...node} delay={i * 0.08} />
                  ))}

                  {nodes.map((node, i) => (
                    <text key={`label-${i}`} x={node.cx} y={node.cy + node.r + 20}
                      fill="rgba(255,255,255,0.25)" fontSize="10" textAnchor="middle" fontWeight="500"
                      style={{ fontFamily: 'var(--mp-font-mono)' }}>
                      {node.label}
                    </text>
                  ))}
                </svg>

                {/* Footer Controls */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Uptime', val: '99.99%' },
                    { label: 'Active', val: '24/7' },
                    { label: 'Safety', val: 'AES-256' },
                  ].map(stat => (
                    <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[9px] text-white/20 uppercase tracking-tighter mb-1 font-mono">{stat.label}</p>
                      <p className="text-xs font-bold text-white/60">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating metric cards */}
            <MetricFloat label="Match Success" value="98.4%" icon={BarChart3} color="#34d399"
              delay={0.3} position={{ top: '-10%', right: '5%' }} />
            <MetricFloat label="Processing" value="<80ms" icon={Zap} color="#fbbf24"
              delay={0.6} position={{ bottom: '15%', left: '-15%' }} />
            <MetricFloat label="Intelligence" value="GPT-4o" icon={Cpu} color="#818cf8"
              delay={0.9} position={{ top: '20%', left: '-10%' }} />
          </motion.div>
        </div>
      </div>

      <div className="mp-section-divider mt-24 sm:mt-32" />
    </section>
  );
};

export default AIMatchingEngine;

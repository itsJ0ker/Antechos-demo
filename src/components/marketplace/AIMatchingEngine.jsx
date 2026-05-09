import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Activity, Zap, BarChart3, Target } from 'lucide-react';

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
    <section className="relative py-20 sm:py-28 overflow-hidden mp-noise"
      style={{ background: 'linear-gradient(180deg, var(--mp-surface-0) 0%, var(--mp-violet-950) 50%, var(--mp-surface-0) 100%)' }}>
      
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-medium text-cyan-400/60 uppercase tracking-[0.2em] mb-3 block"
              style={{ fontFamily: 'var(--mp-font-mono)' }}>
              AI Matching Engine
            </span>
            <h2 className="mp-heading text-3xl sm:text-4xl lg:text-5xl mb-6">
              Intelligent matching.{' '}
              <span className="mp-gradient-text">Perfect results.</span>
            </h2>
            <p className="mp-subheading text-base sm:text-lg mb-8 max-w-md">
              Our AI analyzes 50+ data points including skills, experience, cultural fit, availability, and past performance to find your ideal match.
            </p>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { icon: Brain, label: 'Neural matching algorithm', desc: 'Deep learning model trained on millions of successful matches' },
                { icon: Activity, label: 'Real-time optimization', desc: 'Continuously improves based on project outcomes' },
                { icon: Target, label: '95% match accuracy', desc: 'Industry-leading precision in talent-project pairing' },
              ].map((f, i) => (
                <motion.div key={f.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                    <f.icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80 mb-0.5" style={{ fontFamily: 'var(--mp-font-display)' }}>{f.label}</p>
                    <p className="text-xs text-white/30">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Graph visualization container */}
            <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
              
              {/* SVG Graph */}
              <svg viewBox="0 0 560 260" className="w-full h-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(124,58,237,0.1))' }}>
                {/* Connection lines */}
                {connections.map(([a, b], i) => (
                  <motion.line key={i}
                    x1={nodes[a].cx} y1={nodes[a].cy}
                    x2={nodes[b].cx} y2={nodes[b].cy}
                    stroke="rgba(124,58,237,0.15)" strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ animation: 'mp-dash-flow 2s linear infinite' }}
                  />
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                  <GraphNode key={i} {...node} delay={i * 0.1} />
                ))}

                {/* Node labels */}
                {nodes.map((node, i) => (
                  <text key={`label-${i}`} x={node.cx} y={node.cy + node.r + 16}
                    fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle"
                    style={{ fontFamily: 'var(--mp-font-mono)' }}>
                    {node.label}
                  </text>
                ))}
              </svg>

              {/* Status bar */}
              <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-white/40" style={{ fontFamily: 'var(--mp-font-mono)' }}>
                  AI Engine Active — Processing 2,847 matches/min
                </span>
              </div>
            </div>

            {/* Floating metric cards */}
            <MetricFloat label="Match Rate" value="95.2%" icon={BarChart3} color="#34d399"
              delay={0.3} position={{ top: '-20px', right: '-10px' }} />
            <MetricFloat label="Latency" value="<120ms" icon={Zap} color="#fbbf24"
              delay={0.6} position={{ bottom: '-15px', left: '-10px' }} />
            <MetricFloat label="Signals" value="50+" icon={Cpu} color="#818cf8"
              delay={0.9} position={{ top: '40%', left: '-30px' }} />
          </motion.div>
        </div>
      </div>

      <div className="mp-section-divider mt-20" />
    </section>
  );
};

export default AIMatchingEngine;

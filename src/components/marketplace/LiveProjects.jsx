import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, Flame, TrendingUp, Zap } from 'lucide-react';

const projects = [
  {
    title: 'E-commerce Platform Development',
    budget: '₹45,000',
    proposals: 15,
    tag: 'Featured',
    tagColor: '#a78bfa',
    tagIcon: Zap,
    urgency: 'high',
    avatars: ['SR', 'AK', 'PM', 'VK'],
    skills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'AI Chatbot for Customer Support',
    budget: '₹25,000',
    proposals: 10,
    tag: 'Urgent',
    tagColor: '#fb7185',
    tagIcon: Flame,
    urgency: 'critical',
    avatars: ['RM', 'DS', 'NK'],
    skills: ['Python', 'NLP', 'FastAPI'],
  },
  {
    title: 'Mobile Banking Application',
    budget: '₹18,000',
    proposals: 12,
    tag: 'Trending',
    tagColor: '#34d399',
    tagIcon: TrendingUp,
    urgency: 'medium',
    avatars: ['JP', 'AT', 'SG', 'LM'],
    skills: ['Flutter', 'Firebase', 'Stripe'],
  },
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -4 }}
    className="relative group cursor-pointer rounded-2xl overflow-hidden"
    style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(12px)',
    }}
  >
    {/* Top accent bar */}
    <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${project.tagColor}, transparent)` }} />

    <div className="p-5 sm:p-6 flex flex-col h-full">
      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
          style={{ background: `${project.tagColor}15`, color: project.tagColor, fontFamily: 'var(--mp-font-mono)' }}>
          <project.tagIcon size={11} />
          {project.tag}
        </span>
        <div className="flex items-center gap-1 text-xs text-white/20">
          <Clock size={11} />
          <span>2d ago</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-white/85 mb-4 group-hover:text-white transition-colors leading-snug"
        style={{ fontFamily: 'var(--mp-font-display)' }}>
        {project.title}
      </h3>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.skills.map(s => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mp-font-mono)' }}>
            {s}
          </span>
        ))}
      </div>

      {/* Budget & Proposals */}
      <div className="flex items-center justify-between mb-5 pb-4 mt-auto" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'var(--mp-font-mono)' }}>Budget</p>
          <p className="text-base sm:text-lg font-bold" style={{ color: project.tagColor, fontFamily: 'var(--mp-font-display)' }}>{project.budget}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'var(--mp-font-mono)' }}>Proposals</p>
          <p className="text-base sm:text-lg font-bold text-white/70" style={{ fontFamily: 'var(--mp-font-display)' }}>{project.proposals}</p>
        </div>
      </div>

      {/* Footer: Avatars + Action */}
      <div className="flex items-center justify-between">
        {/* Stacked Avatars */}
        <div className="flex -space-x-2">
          {project.avatars.map((av, i) => (
            <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold ring-2"
              style={{
                background: `${project.tagColor}20`,
                color: project.tagColor,
                ringColor: 'var(--mp-surface-0)',
                zIndex: project.avatars.length - i,
                borderColor: 'var(--mp-surface-0)',
              }}>
              {av}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-medium ring-2"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', ringColor: 'var(--mp-surface-0)', borderColor: 'var(--mp-surface-0)' }}>
            +{Math.floor(Math.random() * 5) + 2}
          </div>
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          className="flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: `${project.tagColor}80`, fontFamily: 'var(--mp-font-display)' }}
        >
          View <ArrowRight size={12} />
        </motion.button>
      </div>
    </div>


    {/* Bottom hover glow */}
    <div className="absolute bottom-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      style={{ background: `linear-gradient(to top, ${project.tagColor}08, transparent)` }} />
  </motion.div>
);

const LiveProjects = () => (
  <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden" style={{ background: 'var(--mp-surface-0)' }}>
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(251,113,133,0.05) 0%, transparent 60%)' }} />

    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl">
          <span className="text-xs font-medium text-violet-400/60 uppercase tracking-[0.2em] mb-4 block"
            style={{ fontFamily: 'var(--mp-font-mono)' }}>Live Projects</span>
          <h2 className="mp-heading text-4xl sm:text-5xl lg:text-6xl">
            Exciting opportunities{' '}
            <span className="mp-gradient-text">awaiting talent like you</span>
          </h2>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors self-start sm:self-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10"
          style={{ fontFamily: 'var(--mp-font-display)' }}
        >
          View all projects <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </div>

    <div className="mp-section-divider mt-24 sm:mt-32" />
  </section>
);

export default LiveProjects;

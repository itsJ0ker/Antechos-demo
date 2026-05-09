import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Users, ArrowRight, Flame, TrendingUp, Zap, 
  Briefcase, IndianRupee, Star, ShieldCheck, MapPin, 
  ChevronRight, Calendar, Bookmark, BarChart3
} from 'lucide-react';
import { mockProjects } from '../../../lib/marketplace-v2-data';

const ProjectCardV2 = ({ project, index }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="v2-card p-5 sm:p-7 bg-[var(--v2-bg)] flex flex-col group h-full hover:border-[var(--v2-accent)] relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-6 sm:mb-8 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <Briefcase size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{project.category}</span>
              <div className="w-1 h-1 rounded-full bg-[var(--v2-border)]" />
              <div className="flex items-center gap-1">
                <Star size={10} className="text-amber-400" fill="currentColor" />
                <span className="text-[10px] font-bold text-[var(--v2-text-muted)]">4.9 Client</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-[var(--v2-text-muted)] flex items-center gap-1.5 uppercase tracking-tight">
              <Calendar size={10} /> Posted {project.posted}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className={`p-2.5 rounded-xl border transition-all ${isSaved ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-[var(--v2-bg-subtle)] border-[var(--v2-border)] text-[var(--v2-text-muted)] hover:text-indigo-600'}`}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="text-lg font-black text-[var(--v2-text-main)] mb-4 group-hover:text-indigo-600 transition-colors leading-[1.3]">
        {project.title}
      </h3>
      <p className="text-sm text-[var(--v2-text-secondary)] mb-8 flex-1 line-clamp-3 leading-relaxed font-medium">
        {project.description}
      </p>

      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
         <div className="flex items-center justify-between text-[9px] sm:text-xs font-black uppercase tracking-widest text-[var(--v2-text-muted)]">
            <span className="flex items-center gap-1.5 sm:gap-2"><MapPin size={11} /> {project.location || 'Remote (Global)'}</span>
            <span className="flex items-center gap-1.5 sm:gap-2 text-emerald-500"><TrendingUp size={11} /> {project.urgency} Urgency</span>
         </div>
         
         <div className="grid grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl bg-[var(--v2-bg-subtle)] border border-[var(--v2-border)] group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 transition-colors">
            <div>
              <p className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-[0.1em] mb-1.5 flex items-center gap-1.5">
                <IndianRupee size={10} /> Budget
              </p>
              <p className="text-sm font-black text-[var(--v2-text-main)]">{project.budget}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-[0.1em] mb-1.5 flex items-center gap-1.5">
                <Clock size={10} /> Timeline
              </p>
              <p className="text-sm font-black text-[var(--v2-text-main)]">{project.duration}</p>
            </div>
         </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--v2-border)]">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2.5">
            {[
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
            ].map((url, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[var(--v2-bg)] overflow-hidden ring-1 ring-[var(--v2-border)]">
                <img src={url} alt="Expert" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-[var(--v2-text-main)]">{project.proposals}+ Proposals</span>
            <span className="text-[9px] font-bold text-[var(--v2-text-muted)] uppercase tracking-tighter">Verified Experts</span>
          </div>
        </div>
        <button className="v2-btn-accent !bg-indigo-600 !py-2.5 !px-5 !text-[11px] !rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/10 group/apply">
          Quick Apply <Zap size={12} fill="white" className="group-hover/apply:scale-125 transition-transform" />
        </button>
      </div>

      {/* Hover Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export const LiveProjectsV2 = () => {
  return (
    <section className="py-32 v2-section relative overflow-hidden">
      <div className="v2-mesh-bg opacity-[0.05]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse" />
              <span className="text-xs font-black text-rose-500 uppercase tracking-[0.2em]">Market Activity: High</span>
            </div>
            <h2 className="v2-heading text-3xl sm:text-5xl mb-6 text-[var(--v2-text-main)]">Live Project <span className="v2-gradient-text">Neural Feed.</span></h2>
            <p className="v2-subheading text-base sm:text-lg text-[var(--v2-text-secondary)] max-w-xl font-medium leading-relaxed">
               Discover high-value opportunities from verified global clients. Our AI prioritizes feeds based on your verified skill profile and historical performance.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-wrap gap-3 sm:gap-4"
          >
            <button className="v2-btn v2-btn-secondary !bg-[var(--v2-bg)] !text-[var(--v2-text-main)] !border-[var(--v2-border)] !px-4 sm:!px-8 !py-3 sm:!py-4 flex items-center gap-2 group hover:shadow-xl transition-all">
              Market Analytics <BarChart3 size={16} className="text-indigo-500" />
            </button>
            <button className="v2-btn v2-btn-primary !bg-indigo-600 !border-indigo-600 !text-white !px-4 sm:!px-8 !py-3 sm:!py-4 flex items-center gap-2 shadow-2xl shadow-indigo-500/20 group">
              Post Project <Zap size={16} fill="white" className="group-hover:scale-125 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((p, i) => (
            <ProjectCardV2 key={p.id} project={p} index={i} />
          ))}
        </div>

         <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 sm:mt-20 p-8 sm:p-16 rounded-[2rem] sm:rounded-[3rem] bg-slate-900 dark:bg-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]"
         >
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[100px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[80px] rounded-full" />
           
           <div className="relative z-10 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-4 sm:mb-6">
                <ShieldCheck size={20} className="text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Enterprise Protocol</span>
             </div>
             <h3 className="text-2xl sm:text-5xl font-black mb-4 sm:mb-6 leading-[1.1]">Join the elite <br className="hidden sm:block" /> talent network.</h3>
             <p className="text-indigo-100 text-base sm:text-xl max-w-xl font-medium leading-relaxed mb-0">
                Get priority access to pre-vetted projects and direct invitations from Fortune 500 engineering teams.
             </p>
           </div>
           
           <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
             <button className="v2-btn !bg-white !text-indigo-600 !px-6 sm:!px-12 !py-4 sm:!py-6 !rounded-xl sm:!rounded-2xl shadow-2xl shadow-black/20 font-black text-base sm:text-lg flex items-center justify-center gap-3 group">
               Apply as Talent <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </button>
             <p className="text-[9px] sm:text-[10px] font-black text-indigo-300/60 uppercase tracking-[0.2em] text-center">
                Identity verification required
             </p>
           </div>
         </motion.div>
      </div>
    </section>
  );
};

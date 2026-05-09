import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MoreHorizontal, CheckCircle2, Star, Clock, 
  MapPin, Zap, ArrowRight, ShieldCheck, User, Bookmark, 
  Share2, BarChart2, Info, Activity, Globe, Send,
  Cpu, Award, Briefcase, IndianRupee
} from 'lucide-react';
import { mockTalent } from '../../../lib/marketplace-v2-data';

const TalentCardV2 = ({ talent, isMatching, index }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="v2-card p-4 sm:p-5 mb-4 group relative overflow-hidden bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 w-full"
    >
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex gap-4 min-w-0">
          {/* Avatar Section */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl border border-slate-100 dark:border-slate-700 shadow-inner group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <img src={talent.avatar} alt={talent.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
            {talent.verified && (
              <div className="absolute -bottom-1.5 -left-1.5 bg-indigo-600 text-white p-1 rounded-lg shadow-lg shadow-indigo-500/30">
                <ShieldCheck size={10} />
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors text-sm sm:text-base tracking-tight truncate">
                {talent.name}
              </h4>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[8px] sm:text-[9px] font-black tracking-widest border border-indigo-500/20 uppercase shrink-0">
                <Zap size={8} fill="currentColor" /> Vetted
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">
              <span className="flex items-center gap-1 truncate"><Globe size={12} className="text-slate-400" /> {talent.location}</span>
              <span className="flex items-center gap-1 font-black text-slate-900 dark:text-slate-200">
                <IndianRupee size={10} /> {talent.hourlyRate}/hr
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {talent.skills.slice(0, 3).map(s => (
                <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-[9px] sm:text-[10px] font-black border border-slate-100 dark:border-slate-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-all">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Match Score & Actions */}
        <div className="text-right flex flex-col items-end gap-3 shrink-0">
          <div className="p-2 sm:p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-end group-hover:bg-indigo-500/10 transition-colors">
            <div className="flex items-center gap-1.5 mb-0.5">
              <BarChart2 size={12} className="text-indigo-600" />
              <span className="text-xs sm:text-sm font-black v2-gradient-text">
                {isMatching ? '...' : `${talent.matchScore}%`}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Match</span>
          </div>
          
          <div className="flex gap-1.5">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all duration-300 ${isSaved ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500'}`}
            >
              <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button className="hidden sm:block p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
              <Clock size={12} />
            </div>
            <div>
              <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active</p>
              <p className="text-[10px] sm:text-xs font-black text-slate-700 dark:text-slate-300">{talent.lastActive}</p>
            </div>
          </div>
          <div className="hidden xs:flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <Activity size={12} />
            </div>
            <div>
              <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Success</p>
              <p className="text-[10px] sm:text-xs font-black text-slate-700 dark:text-slate-300">98%</p>
            </div>
          </div>
        </div>
        
        <button className="flex-1 sm:flex-none v2-btn v2-btn-accent !py-2.5 !px-5 sm:!px-6 !text-[10px] !rounded-xl flex items-center justify-center gap-2 group/btn shadow-xl shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest transition-all">
          <Send size={12} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          <span className="whitespace-nowrap">Invite</span>
          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Modern Card Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export const TalentDashboard = () => {
  const [search, setSearch] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [filteredTalent, setFilteredTalent] = useState(mockTalent);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (search || activeTab !== 'all') {
      setIsMatching(true);
      const timer = setTimeout(() => {
        let results = mockTalent;
        if (search) {
          results = results.filter(t => 
            t.name.toLowerCase().includes(search.toLowerCase()) || 
            t.role.toLowerCase().includes(search.toLowerCase()) ||
            t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
          );
        }
        if (activeTab !== 'all') {
          results = results.filter(t => t.role.toLowerCase().includes(activeTab));
        }
        setFilteredTalent(results);
        setIsMatching(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setFilteredTalent(mockTalent);
    }
  }, [search, activeTab]);

  return (
    <div className="v2-dashboard-frame flex flex-col h-[600px] sm:h-[680px] w-full group/dash shadow-2xl">
      {/* Dashboard Header */}
      <div className="px-6 py-5 border-b border-[var(--v2-border)] flex items-center justify-between bg-[var(--v2-bg-subtle)] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
          </div>
          <div className="h-5 w-px bg-[var(--v2-border)] mx-1" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <BarChart2 size={18} />
            </div>
            <div>
              <h3 className="text-xs font-black text-[var(--v2-text-main)] uppercase tracking-[0.1em]">Talent Intelligence</h3>
              <p className="text-[9px] text-[var(--v2-text-muted)] font-mono">CORE_ENGINE_v4.2</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--v2-bg)] border border-[var(--v2-border)] text-[10px] text-[var(--v2-text-muted)] font-black uppercase tracking-widest shadow-sm">
            <Info size={12} className="text-indigo-500" /> Match Logic: Neural
          </div>
          <button className="p-2 text-[var(--v2-text-muted)] hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-[var(--v2-border)]">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:flex w-60 v2-dashboard-sidebar bg-[var(--v2-bg-subtle)] border-r border-[var(--v2-border)] flex-col p-6 shrink-0">
          <div className="mb-8">
            <p className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <Filter size={12} /> Search Filter
            </p>
            <nav className="space-y-1.5">
              {[
                { id: 'all', name: 'Elite Global', icon: Globe },
                { id: 'designer', name: 'Design Directors', icon: Star },
                { id: 'engineer', name: 'Tech Leads', icon: Zap },
                { id: 'product', name: 'Product Growth', icon: CheckCircle2 },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all group ${
                    activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' 
                    : 'text-[var(--v2-text-secondary)] hover:bg-[var(--v2-bg)] hover:text-[var(--v2-text-main)]'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-indigo-500 group-hover:scale-110 transition-transform'} />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto space-y-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <Zap size={12} fill="white" /> Priority Access
              </p>
              <p className="text-xs font-medium text-indigo-100 leading-relaxed mb-4">
                Unlock 24h response time from top creators.
              </p>
              <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-colors">
                Upgrade Now
              </button>
            </div>
            
            <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-bold text-[var(--v2-text-muted)] uppercase tracking-widest">
                42 Partners Active
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-[var(--v2-bg)] relative">
          {/* Search Area */}
          <div className="p-5 sm:p-7 border-b border-[var(--v2-border)] bg-[var(--v2-bg-subtle)] shrink-0">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--v2-text-muted)] group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by specialty, tool, or engineer name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-[var(--v2-bg)] border border-[var(--v2-border)] rounded-2xl v2-search-input text-sm font-bold text-[var(--v2-text-main)] placeholder-[var(--v2-text-muted)] shadow-sm focus:shadow-xl transition-all"
              />
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-[var(--v2-bg)] scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {isMatching ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="v2-card p-6 bg-[var(--v2-bg-subtle)] flex flex-col gap-5 border-dashed border-[var(--v2-border)]">
                      <div className="flex gap-5">
                        <div className="w-14 h-14 rounded-2xl v2-skeleton" />
                        <div className="flex-1 space-y-3">
                          <div className="h-5 w-1/3 v2-skeleton rounded-lg" />
                          <div className="h-4 w-1/2 v2-skeleton rounded-lg" />
                        </div>
                      </div>
                      <div className="h-10 w-full v2-skeleton rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : filteredTalent.length > 0 ? (
                <div className="space-y-4">
                  {filteredTalent.map((t, i) => (
                    <TalentCardV2 key={t.id} talent={t} isMatching={isMatching} index={i} />
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-20 h-20 rounded-full bg-[var(--v2-bg-subtle)] flex items-center justify-center mb-6 text-[var(--v2-text-muted)] border-2 border-dashed border-[var(--v2-border)]">
                    <Search size={40} />
                  </div>
                  <h4 className="text-lg font-black text-[var(--v2-text-main)] mb-2">No matching intelligence found</h4>
                  <p className="text-sm text-[var(--v2-text-secondary)] max-w-xs mx-auto">Try broadening your search or switching categories to discover elite talent.</p>
                  <button onClick={() => { setSearch(''); setActiveTab('all'); }} className="mt-6 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Subtle bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--v2-bg)] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

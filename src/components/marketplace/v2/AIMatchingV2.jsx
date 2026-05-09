import { motion } from 'framer-motion';
import { Brain, Search, Filter, CheckCircle2, TrendingUp, Zap, BarChart3, Activity } from 'lucide-react';

export const AIMatchingV2 = () => {
  return (
    <section className="relative py-24 v2-section overflow-hidden">
      <div className="v2-mesh-bg opacity-10" />
      
      {/* Decorative Glows */}
      <div className="v2-accent-glow bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Visualization */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-indigo-500/10 blur-[120px] rounded-full" />
            
            <div className="v2-dashboard-frame shadow-2xl relative overflow-hidden border-[var(--v2-border)]">
              {/* Dashboard Top */}
              <div className="px-6 py-4 border-b border-[var(--v2-border)] flex items-center justify-between bg-[var(--v2-bg-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-black text-[var(--v2-text-main)] uppercase tracking-[0.2em]">Live Match Analysis</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Match Visualization Content */}
              <div className="p-8">
                <div className="flex items-center justify-center mb-10">
                  <div className="relative">
                    {/* Pulsing rings with colors */}
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-indigo-400/30" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.05, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      className="absolute inset-0 rounded-full border-2 border-purple-400/20" 
                    />
                    
                    <div className="w-32 h-32 rounded-full bg-[var(--v2-bg)] shadow-2xl border border-[var(--v2-border)] flex flex-col items-center justify-center relative z-10">
                      <p className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase mb-1">Match</p>
                      <p className="text-4xl font-black v2-gradient-text">98%</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Technical Fit', value: 96, icon: Zap, color: 'text-indigo-500' },
                    { label: 'Cultural Alignment', value: 92, icon: Activity, color: 'text-purple-500' },
                    { label: 'Availability', value: 100, icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Market Rate', value: 89, icon: TrendingUp, color: 'text-blue-500' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="p-4 rounded-2xl bg-[var(--v2-bg-subtle)] border border-[var(--v2-border)] hover:border-indigo-500 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--v2-bg)] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <stat.icon size={14} className={stat.color} />
                        </div>
                        <p className="text-[10px] font-bold text-[var(--v2-text-secondary)] uppercase tracking-wider leading-tight">{stat.label}</p>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="w-full bg-[var(--v2-bg-muted)] h-1.5 rounded-full mr-3 mb-1 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.value}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className={`h-full ${stat.color.replace('text', 'bg')}`} 
                          />
                        </div>
                        <span className="text-xs font-bold text-[var(--v2-text-main)]">{stat.value}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status Footer */}
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-300" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Verified Match Profile Synced</span>
              </div>
            </div>

            {/* Floating Talent Card Tip */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -right-8 top-1/4 p-4 bg-[var(--v2-bg)] rounded-2xl shadow-xl border border-[var(--v2-border)] max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[var(--v2-bg-subtle)] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Sarah" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold text-[var(--v2-text-main)]">Sarah Chen</p>
              </div>
              <p className="text-[10px] text-[var(--v2-text-secondary)] mb-3">"Perfect alignment with your Fintech requirements."</p>
              <button className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-lg border border-indigo-100 dark:border-indigo-500/20">Invite to Interview</button>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Brain size={20} className="text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Precision Analysis</span>
            </div>
            
            <h2 className="v2-heading text-4xl sm:text-5xl mb-8 leading-tight">
              Data-driven matching. <br />
              <span className="v2-gradient-text">Zero guesswork.</span>
            </h2>
            
            <p className="v2-subheading text-lg text-[var(--v2-text-secondary)] mb-10 max-w-lg">
              Our AI engine doesn't just look at keywords. It analyzes behavioral patterns, project outcomes, and cultural signals to find your perfect partner.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                { title: 'Neural Skill Verification', desc: 'Auto-auditing technical expertise through past project code analysis.' },
                { title: 'Availability Syncing', desc: 'Real-time tracking of talent capacity across 140+ timezones.' },
                { title: 'Outcome Prediction', desc: '94% accuracy in predicting project success based on team dynamics.' },
              ].map(item => (
                <li key={item.title} className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 size={18} className="text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--v2-text-main)] mb-1">{item.title}</h4>
                    <p className="text-sm text-[var(--v2-text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button className="v2-btn v2-btn-primary !px-10 !py-4 text-base">
              Learn about our AI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

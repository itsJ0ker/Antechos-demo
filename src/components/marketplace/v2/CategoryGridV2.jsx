import { motion } from 'framer-motion';
import { 
  Code, Palette, Megaphone, BarChart, Globe, 
  Cpu, Layout, Smartphone, ArrowRight, Zap, TrendingUp, Star
} from 'lucide-react';

const categories = [
  { 
    title: 'Software Engineering', 
    icon: Code, 
    count: '1,240+', 
    color: 'from-blue-500 to-indigo-600', 
    trend: '+12% growth',
    stat: 'Avg. ₹85k/mo',
    trending: true
  },
  { 
    title: 'Product Design', 
    icon: Palette, 
    count: '850+', 
    color: 'from-purple-500 to-pink-600', 
    trend: '+8% growth',
    stat: 'Avg. ₹70k/mo'
  },
  { 
    title: 'Marketing & Growth', 
    icon: Megaphone, 
    count: '620+', 
    color: 'from-orange-500 to-red-600', 
    trend: '+15% growth',
    stat: 'Avg. ₹65k/mo',
    trending: true
  },
  { 
    title: 'Data Science & AI', 
    icon: BarChart, 
    count: '430+', 
    color: 'from-emerald-500 to-teal-600', 
    trend: '+22% growth',
    stat: 'Avg. ₹95k/mo',
    trending: true
  },
  { 
    title: 'Mobile Development', 
    icon: Smartphone, 
    count: '510+', 
    color: 'from-cyan-500 to-blue-600', 
    trend: '+5% growth',
    stat: 'Avg. ₹80k/mo'
  },
  { 
    title: 'DevOps & Cloud', 
    icon: Cpu, 
    count: '320+', 
    color: 'from-slate-600 to-slate-800', 
    trend: '+18% growth',
    stat: 'Avg. ₹100k/mo'
  },
  { 
    title: 'Web3 & Blockchain', 
    icon: Globe, 
    count: '210+', 
    color: 'from-indigo-600 to-purple-800', 
    trend: '+30% growth',
    stat: 'Avg. ₹110k/mo',
    trending: true
  },
  { 
    title: 'UI/UX Research', 
    icon: Layout, 
    count: '290+', 
    color: 'from-rose-500 to-orange-600', 
    trend: '+4% growth',
    stat: 'Avg. ₹60k/mo'
  },
];

export const CategoryGridV2 = () => {
  return (
    <section className="py-32 v2-section-alt relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Zap size={20} fill="white" />
              </div>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Ecosystem Categories</span>
            </div>
            <h2 className="v2-heading text-4xl sm:text-5xl mb-6 text-[var(--v2-text-main)] leading-tight">World-class talent. <br /><span className="v2-gradient-text">Every domain.</span></h2>
            <p className="v2-subheading text-lg text-[var(--v2-text-secondary)] max-w-xl font-medium leading-relaxed">
               Access a globally distributed workforce of elite professionals, meticulously categorized by verified technical outcomes and domain depth.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="v2-btn v2-btn-secondary !px-10 !py-5 !text-base flex items-center gap-3 bg-[var(--v2-bg)] shadow-xl hover:shadow-indigo-500/10 transition-all text-[var(--v2-text-main)] group"
          >
            Explore Ecosystem <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="v2-card p-8 bg-[var(--v2-bg)] group cursor-pointer border-[var(--v2-border)] hover:border-indigo-500 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.15)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-xl shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-500`}>
                    <cat.icon size={28} />
                  </div>
                  {cat.trending && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 animate-pulse">
                      <TrendingUp size={10} /> Trending
                    </div>
                  )}
                </div>

                <h4 className="text-lg font-black text-[var(--v2-text-main)] mb-2 group-hover:text-indigo-600 transition-colors tracking-tight leading-tight">{cat.title}</h4>
                <p className="text-[10px] font-black text-[var(--v2-text-muted)] uppercase tracking-widest mb-6">{cat.count} Elite Profiles</p>
                
                <div className="pt-6 border-t border-[var(--v2-border)] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-500">{cat.trend}</span>
                  <span className="text-[11px] font-black text-[var(--v2-text-main)]">{cat.stat}</span>
                </div>
              </div>

              {/* Hover Decorative Background */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

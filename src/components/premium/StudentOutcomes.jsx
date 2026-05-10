import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Building, Star } from 'lucide-react';

const StudentOutcomes = () => {
  const stats = [
    { label: "Salary Hike", value: "85%", icon: TrendingUp, color: "text-p-accent" },
    { label: "Placements", value: "100%", icon: Building, color: "text-emerald-500" },
    { label: "Active Alumni", value: "25K+", icon: Users, color: "text-p-amber" },
    { label: "Avg Package", value: "₹12L+", icon: DollarSign, color: "text-indigo-500" }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 p-mesh-warm opacity-40 pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-24 items-center relative z-10">
        <div>
          <h2 className="p-heading-lg mb-8 uppercase tracking-tighter">Market <br /> Dominance</h2>
          <p className="p-text-body mb-12 max-w-xl">
            Our graduates don't just find jobs; they redefine market expectations. 
            We track our outcomes meticulously to ensure our protocols remain the 
            gold standard in professional certification.
          </p>
          
          <div className="grid grid-cols-2 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`text-5xl font-black mb-3 tracking-tighter ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-p-text-muted flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-black/10" /> {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Companies Marquee Placeholder */}
          <div className="mt-20 pt-10 border-t border-black/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block">Where our students lead</span>
            <div className="flex flex-wrap gap-8 opacity-30 grayscale items-center">
              {['Google', 'Meta', 'Stripe', 'Framer', 'Linear'].map(c => (
                <span key={c} className="text-lg font-bold tracking-tighter">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl"
          >
            <img 
              src="/student_transformation_success_1778405787410.png" 
              alt="Student Success" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay Metric */}
            <div className="absolute bottom-6 left-6 right-6 p-6 p-glass rounded-2xl">
              <div className="text-[8px] font-black uppercase tracking-widest text-p-accent mb-1">Outcome Secured</div>
              <p className="text-sm font-bold leading-tight">"The transformation was not just professional, but personal."</p>
            </div>
          </motion.div>
          
          {/* Floating Salary Card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-10 -right-10 p-8 bg-white rounded-3xl shadow-2xl border border-black/5 hidden xl:block"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg Hike</div>
                <div className="text-2xl font-black text-emerald-600">85%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentOutcomes;

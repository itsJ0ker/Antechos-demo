import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Building } from 'lucide-react';

const StudentOutcomes = () => {
  const stats = [
    { label: "Salary Hike", value: "85%", icon: TrendingUp, color: "text-[#0284c7]" },
    { label: "Placements", value: "100%", icon: Building, color: "text-emerald-500" },
    { label: "Active Alumni", value: "25K+", icon: Users, color: "text-p-amber" },
    { label: "Avg Package", value: "₹12L+", icon: DollarSign, color: "text-indigo-500" }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 p-mesh-warm opacity-40 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-24 items-center relative z-10">
        <div>
          <h2 className="p-heading-lg mb-6 md:mb-8 uppercase tracking-tighter">Market <br /> Dominance</h2>
          <p className="p-text-body mb-8 md:mb-12 max-w-xl">
            Our graduates don't just find jobs; they redefine market expectations.
            We track our outcomes meticulously to ensure our protocols remain the
            gold standard in professional certification.
          </p>

          <div className="grid grid-cols-2 gap-6 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`text-4xl md:text-5xl font-black mb-2 md:mb-3 tracking-tighter ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-p-text-muted flex items-center gap-2 md:gap-3">
                  <div className="w-6 md:w-8 h-[1px] bg-black/10" /> {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Companies Marquee Placeholder */}
          <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-black/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 block">Where our students lead</span>
            <div className="flex flex-wrap gap-6 md:gap-8 opacity-30 grayscale items-center">
              {['Google', 'Meta', 'Stripe', 'Framer', 'Linear'].map(c => (
                <span key={c} className="text-base md:text-lg font-bold tracking-tighter">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex justify-center mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl"
          >
            <img
              src="/student_transformation_success_1778405787410.png"
              alt="Student Success"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Overlay Metric */}
            <div className="absolute bottom-6 left-6 right-6 p-6 p-glass rounded-2xl">
              <div className="text-[8px] font-black uppercase tracking-widest text-[#0284c7] mb-1">Outcome Secured</div>
              <p className="text-xs md:text-sm font-bold leading-tight">"The transformation was not just professional, but personal."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentOutcomes;

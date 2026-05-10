import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, DollarSign, Globe } from 'lucide-react';

const CareerTransformation = ({ careerData }) => {
  return (
    <section className="py-32 bg-gray-50 border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-20 items-center">
          <div>
            <h2 className="p-heading-lg mb-8 uppercase tracking-tighter">Career <br /> Architecture</h2>
            <p className="p-text-body mb-12">
              We don't just teach skills; we architect your career trajectory. 
              Our graduates are positioned for high-growth roles in the 
              global digital economy, commanding premium valuations.
            </p>
            
            <div className="space-y-6">
              {careerData.roles.map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white border border-black/5 rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-p-accent">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{role.title}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Salary</div>
                    <div className="text-lg font-black text-emerald-600">{role.salary}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Skills & Companies Blocks */}
            <div className="p-10 bg-white border border-black/5 rounded-[3rem] shadow-sm">
              <h3 className="text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-3">
                <Globe className="w-6 h-6 text-p-accent" /> Global Reach
              </h3>
              <div className="flex flex-wrap gap-3">
                {careerData.companies.map((company, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-p-text-muted border border-black/5">
                    {company}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-sm text-p-text-muted leading-relaxed italic">
                Our network extends across Tier-1 agencies and tech unicorns globally.
              </p>
            </div>

            <div className="p-10 bg-black text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 p-grid-mesh opacity-20" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-p-accent" /> Skill Equity
                </h3>
                <div className="space-y-4">
                  {careerData.skills.map((skill, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60">{skill}</span>
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-p-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                  <div className="text-[10px] font-black uppercase tracking-widest text-p-accent mb-2">Growth Potential</div>
                  <p className="text-xs font-bold leading-relaxed">
                    The skills acquired in this protocol have a projected demand increase of 450% by 2030.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTransformation;

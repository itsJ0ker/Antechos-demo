import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Globe } from 'lucide-react';

const CertificationShowcase = ({ certification }) => {
  return (
    <section className="py-24 md:py-32 p-tint-amber rounded-[4rem] border border-black/5 shadow-sm my-24 relative overflow-hidden">
      <div className="absolute inset-0 p-mesh-warm opacity-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1">
            <h2 className="p-heading-lg mb-8 uppercase tracking-tighter leading-none">Global <br /> Recognition</h2>
            <p className="p-text-body mb-10 text-lg leading-relaxed">
              Every successfully completed protocol earns you industry-recognized 
              certifications that command respect across borders.
            </p>
            <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Credential Status</div>
                <div className="font-black text-2xl tracking-tight uppercase leading-none">{certification}</div>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "Industry Verified",
              "Global Standard",
              "Lifetime Access",
              "LinkedIn Integration",
              "ISO Certified",
              "Academy Partner"
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-p-text-muted bg-white/40 p-4 rounded-2xl border border-black/[0.03]"
              >
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                {text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationShowcase;

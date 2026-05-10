import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Globe, Shield } from 'lucide-react';

const SkillsToolsEcosystem = ({ skills }) => {
  return (
    <section className="py-32 overflow-hidden relative">
      <div className="absolute inset-0 p-grid-mesh opacity-10 pointer-events-none" />
      
      <div className="text-center mb-24">
        <h2 className="p-heading-lg mb-6 uppercase tracking-tighter">Tools & <br /> Ecosystem</h2>
        <p className="p-text-body max-w-2xl mx-auto">
          Master the industry-standard tools and technologies that command 
          the highest valuations in the global market.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-6">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, borderColor: 'rgba(0,0,0,0.2)' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="px-8 py-6 bg-white border border-black/5 rounded-2xl shadow-sm flex items-center gap-4 group cursor-default transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-p-accent group-hover:text-white transition-all">
              {i % 4 === 0 ? <Cpu className="w-5 h-5" /> : 
               i % 4 === 1 ? <Zap className="w-5 h-5" /> :
               i % 4 === 2 ? <Globe className="w-5 h-5" /> :
               <Shield className="w-5 h-5" />}
            </div>
            <span className="text-lg font-bold tracking-tight">{skill}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
};

export default SkillsToolsEcosystem;

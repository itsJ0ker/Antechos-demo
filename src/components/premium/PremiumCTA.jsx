import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';

const PremiumCTA = () => {
  return (
    <section className="py-24 md:py-40 relative overflow-hidden bg-white border-t border-[#38bdf8]/10">
      <div className="absolute inset-0 p-grid-mesh opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="p-heading-lg mb-6 md:mb-8 uppercase tracking-tighter">
            Your Future Is <br />
            <span className="text-p-accent">Non-Negotiable</span>
          </h2>
          <p className="p-text-body mb-8 md:mb-12 max-w-2xl mx-auto font-medium">
            The next iteration of your career begins with a single protocol. 
            Join the elite network of Antechos certified professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button className="p-btn-primary w-full sm:w-auto shadow-xl">
              Apply for Admission <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 rounded-xl border border-black/10 font-bold hover:bg-gray-50 transition-all w-full sm:w-auto bg-white">
              Speak with a Mentor
            </button>
          </div>

          <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-p-text-muted">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[#0284c7]" /> 30-Day Guarantee
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[#0284c7]" /> ISO Certified
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Shield className="w-4 h-4 text-[#0284c7]" /> Global Acceptance
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-100/30 rounded-full blur-[80px] md:blur-[100px] -mr-20 -mt-20 md:-mr-40 md:-mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-sky-100/20 rounded-full blur-[80px] md:blur-[100px] -ml-10 -mb-10 md:-ml-20 md:-mb-20 pointer-events-none" />
    </section>
  );
};

export default PremiumCTA;

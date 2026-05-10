import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';

const PremiumCTA = () => {
  return (
    <section className="py-40 relative overflow-hidden bg-white border-t border-black/5">
      <div className="absolute inset-0 p-grid-mesh opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="p-heading-lg mb-8 uppercase tracking-tighter">
            Your Future Is <br />
            <span className="text-p-accent">Non-Negotiable</span>
          </h2>
          <p className="p-text-body mb-12 max-w-2xl mx-auto font-medium">
            The next iteration of your career begins with a single protocol. 
            Join the elite network of Antechos certified professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="p-btn-primary w-full sm:w-auto shadow-2xl">
              Apply for Admission <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 rounded-xl border border-black/10 font-bold hover:bg-gray-50 transition-all w-full sm:w-auto bg-white">
              Speak with a Mentor
            </button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-12 text-p-text-muted">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Shield className="w-4 h-4" /> 30-Day Guarantee
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Shield className="w-4 h-4" /> ISO Certified
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Global Acceptance
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
    </section>
  );
};

export default PremiumCTA;

import React from 'react';
import { motion } from 'framer-motion';

const StoryBasedIntroduction = ({ course }) => {
  return (
    <section className="py-24 md:py-40 relative">
      <div className="absolute inset-0 p-mesh-warm opacity-10 pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-24 items-center relative z-10">
        <div className="order-2 lg:order-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-sm aspect-square rounded-[3rem] overflow-hidden shadow-xl"
          >
            <img 
              src="/aspirational_professional_learning_1778405896213.png" 
              alt="Story Visual" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-p-accent/20 to-transparent" />
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="p-heading-lg mb-12 uppercase tracking-tighter leading-none">
              Why This <br />
              <span className="text-p-accent">Mission</span> Matters
            </h2>
            <div className="space-y-10">
              <p className="text-2xl font-black text-black leading-tight tracking-tighter">
                Traditional education is optimized for the industrial era. 
                This protocol is optimized for the digital one.
              </p>
              <p className="p-text-body text-lg leading-relaxed">
                We don't teach you how to use tools. We teach you how to think, 
                strategize, and lead in high-stakes environments. The skills 
                you acquire here are not just technical—they are architectural.
              </p>
              <div className="grid grid-cols-1 gap-6 pt-6">
                {course.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-white border border-black/5 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center border border-black/5 font-black text-p-accent text-sm">
                      0{i+1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{h.title}</h4>
                      <p className="text-xs text-p-text-muted leading-relaxed">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoryBasedIntroduction;

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Siddharth Mehta",
      role: "Growth Lead @ Fintech Startup",
      quote: "The Digital Marketing Protocol at Antechos was the pivot point of my career. I went from managing small budgets to architecting multi-million dollar acquisition engines within 6 months.",
      image: "https://i.pravatar.cc/150?u=sid"
    },
    {
      name: "Ananya Iyer",
      role: "International Liaison",
      quote: "British Express didn't just teach me English; they taught me the psychology of confidence. I command respect in global forums now, which was unthinkable a year ago.",
      image: "https://i.pravatar.cc/150?u=ana"
    },
    {
      name: "Rohan Varma",
      role: "Performance Marketer",
      quote: "The intensive project-based learning is what sets Antechos apart. I wasn't just learning; I was executing at an enterprise level from week one.",
      image: "https://i.pravatar.cc/150?u=rohan"
    }
  ];

  return (
    <section className="py-20 md:py-32 border-t border-black/5 relative overflow-hidden">
      <div className="absolute inset-0 p-mesh-blue opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="p-heading-lg mb-0 uppercase tracking-tighter leading-none">Voices of <br /> Transformation</h2>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-p-text-muted flex items-center gap-4">
          <div className="w-12 h-[1px] bg-black/10" /> Scroll to explore
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6 md:gap-8 pb-12 px-6 -mx-6 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-[85vw] md:w-[600px] p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] bg-white border border-black/5 shadow-xl relative group overflow-hidden snap-center"
          >
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 scale-110 md:scale-150 rotate-12">
              <Quote className="w-24 h-24 md:w-40 md:h-40 text-p-accent" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black tracking-tight">{t.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-p-text-muted">{t.role}</p>
                </div>
              </div>
              
              <blockquote className="text-lg md:text-2xl font-black leading-tight text-p-text tracking-tighter italic mb-8 md:mb-12 opacity-80">
                "{t.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-black/[0.03]">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                     <div key={star} className="w-2 h-2 rounded-full bg-p-accent" />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">ATH Verified</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

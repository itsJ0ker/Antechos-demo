import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the ‘Protocol’ methodology?",
      answer: "The Protocol is our proprietary educational framework that focuses on high-fidelity simulation of industry challenges. We remove all academic filler and focus exclusively on the tactical skills and mental frameworks used by the top 1% of professionals."
    },
    {
      question: "Are these programs suitable for corporate teams?",
      answer: "Yes, we offer tailored enterprise protocols designed to upskill leadership and technical teams within 4-12 weeks. Our methodology is highly effective for rapid adoption of new technologies and strategic shifts."
    },
    {
      question: "How does the placement guarantee work?",
      answer: "Candidates who successfully complete all mission milestones and pass the final evaluation are guaranteed an internship with our partner network, leading to full-time roles based on performance."
    },
    {
      question: "Can I transition from a non-technical background?",
      answer: "Absolutely. Our foundation phases are designed to bring motivated candidates from zero to industry-readiness through immersive lab work and mentorship."
    }
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="p-heading-lg mb-10 md:mb-16 text-center uppercase tracking-tighter">Common Queries</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="p-card rounded-2xl md:rounded-3xl overflow-hidden border border-[#38bdf8]/15 hover:border-[#38bdf8]/35 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <span className="text-lg md:text-xl font-bold group-hover:text-p-accent transition-colors pr-4">
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full bg-slate-50 transition-transform flex-shrink-0 ${openIndex === i ? "rotate-180" : ""}`}>
                  {openIndex === i ? <Minus className="w-4 h-4 md:w-5 md:h-5 text-slate-600" /> : <Plus className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8 text-p-text-body text-sm md:text-base leading-relaxed border-t border-black/[0.03] pt-4 md:pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

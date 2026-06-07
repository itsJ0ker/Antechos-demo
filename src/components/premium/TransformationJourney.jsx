import React from 'react';
import { motion } from 'framer-motion';
import { UserMinus, UserCheck, TrendingUp } from 'lucide-react';

const TransformationJourney = () => {
  const steps = [
    {
      title: "The Static State",
      status: "Before",
      desc: "Limited career mobility, outdated skill sets, and theoretical knowledge that fails to meet market demands.",
      icon: UserMinus,
      color: "text-slate-400",
      tint: "bg-gray-50/50"
    },
    {
      title: "The Protocol",
      status: "During",
      desc: "Intensive, tactical training on live enterprise projects. Developing the mental frameworks of high-level professionals.",
      icon: TrendingUp,
      color: "text-[#0284c7]",
      tint: "p-tint-blue"
    },
    {
      title: "The Evolution",
      status: "After",
      desc: "Dominate the market with industry-grade certifications, real-world experience, and an elite professional identity.",
      icon: UserCheck,
      color: "text-emerald-500",
      tint: "p-tint-emerald"
    }
  ];

  return (
    <section className="py-20 md:py-32 border-y border-[#38bdf8]/10 relative p-mesh-warm">
      <div className="absolute inset-0 p-grid-mesh opacity-10 pointer-events-none" />
      
      <div className="text-center mb-16 md:mb-24">
        <h2 className="p-heading-lg mb-6 uppercase tracking-tighter">The Transformation</h2>
        <p className="p-text-body max-w-2xl mx-auto italic">
          "Education is not the learning of facts, but the training of the mind to think." 
          We architect your mental and professional evolution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-[#38bdf8]/10 shadow-sm text-center relative group flex flex-col ${step.tint}`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] bg-white flex items-center justify-center mx-auto mb-8 md:mb-10 border border-black/[0.03] group-hover:scale-110 transition-transform shadow-sm ${step.color}`}>
                <step.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-p-text-muted mb-4 md:mb-6">{step.status}</div>
              <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase tracking-tight">{step.title}</h3>
              <p className="text-sm text-p-text-muted leading-relaxed flex-1">{step.desc}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TransformationJourney;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Users, Briefcase } from 'lucide-react';

const LearningExperience = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Live Laboratory",
      desc: "Simulate real-world challenges in our 100% lab-based environment. No theoretical fluff, just execution.",
      icon: Cpu,
      details: ["Enterprise Sandboxes", "Real-time Debugging", "Architecture Sprints"],
      tint: "p-tint-blue"
    },
    {
      title: "Tactical Mentorship",
      desc: "Direct access to practitioners who lead global teams. Learn the unwritten rules of industry dominance.",
      icon: Users,
      details: ["1:1 Coaching", "Boardroom Reviews", "Career Mapping"],
      tint: "p-tint-emerald"
    },
    {
      title: "Project Warfare",
      desc: "Apply your skills to live enterprise projects with real budgets and high stakes.",
      icon: Briefcase,
      details: ["Budget Management", "KPI Reporting", "Stakeholder Reviews"],
      tint: "p-tint-amber"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 p-mesh-blue opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 lg:mb-24">
          <div>
            <h2 className="p-heading-lg mb-6 md:mb-8 uppercase tracking-tighter">The <br /> Ecosystem</h2>
            <p className="p-text-body max-w-xl">
              We provide a high-fidelity simulation of the modern professional landscape, 
              ensuring you're battle-tested before you even enter the room.
            </p>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="w-full max-w-lg aspect-[16/10] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl relative group mx-auto">
              <img 
                src="/modern_collaborative_workspace_1778405824790.png" 
                alt="Workspace" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* Animated Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38bdf8]/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.8fr] gap-8 lg:gap-12">
          <div className="space-y-4">
            {features.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`w-full text-left p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 border ${
                  activeFeature === i 
                  ? "bg-white border-black/10 shadow-lg scale-[1.02]" 
                  : "bg-transparent border-transparent hover:bg-[#38bdf8]/5"
                }`}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all ${
                    activeFeature === i ? "bg-[#0284c7] text-white" : "bg-gray-100 text-slate-400"
                  }`}>
                    <f.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-black tracking-tight ${activeFeature === i ? "text-black" : "text-slate-400"}`}>
                    {f.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          <div className="relative mt-6 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className={`rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 h-full border border-[#38bdf8]/10 shadow-sm relative overflow-hidden ${features[activeFeature].tint}`}
              >
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5">
                  <Cpu className="w-32 h-32 md:w-40 md:h-40" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-8 uppercase tracking-tighter">
                    {features[activeFeature].title}
                  </h3>
                  <p className="p-text-body text-lg md:text-xl mb-8 md:mb-12 leading-relaxed max-w-2xl text-black/80">
                    {features[activeFeature].desc}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {features[activeFeature].details.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-p-text-muted">
                        <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;

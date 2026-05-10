import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Award, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DetailHero = ({ course }) => {
  const navigate = useNavigate();

  const courseImages = {
    "digital-marketing-mastery": "/digital_marketing_workspace_1778405692841.png",
    "language-mastery-british-express": "/professional_communication_leadership_1778405709095.png"
  };

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden p-mesh-blue">
      <div className="absolute inset-0 p-grid-mesh opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.nav 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-p-text-muted mb-16"
        >
          <button onClick={() => navigate('/courses-premium')} className="hover:text-black">Protocols</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{course.category}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-24 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 bg-p-accent/5 rounded-full text-p-accent text-[10px] font-black tracking-[0.3em] uppercase mb-10 border border-p-accent/10"
            >
              Protocol: {course.id.split('-').map(w => w[0].toUpperCase()).join('')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-heading-xl mb-10 tracking-tighter"
            >
              {course.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-text-body text-xl mb-16 max-w-xl leading-relaxed"
            >
              {course.longDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-12"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-black/5 shadow-sm text-p-accent">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Timeframe</div>
                  <div className="text-xl font-black tracking-tight">{course.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-black/5 shadow-sm text-emerald-600">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Accreditation</div>
                  <div className="text-xl font-black tracking-tight">{course.certification}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] max-h-[500px] w-full max-w-[400px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl p-img-mask relative">
              <img 
                src={courseImages[course.id]} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-12 left-10 right-10 p-10 p-glass rounded-[3rem] shadow-2xl">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="text-xs text-slate-400 line-through mb-1 font-bold">{course.originalPrice}</div>
                    <div className="text-4xl font-black tracking-tighter">{course.price}</div>
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black tracking-widest uppercase border border-emerald-100">
                    Admission Active
                  </div>
                </div>
                <button className="p-btn-primary w-full justify-center py-5 text-lg">Apply for Protocol</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetailHero;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Award, ShieldCheck, Zap } from 'lucide-react';

const FeaturedCourses = ({ courses }) => {
  const navigate = useNavigate();

  const courseImages = {
    "digital-marketing-mastery": "/digital_marketing_workspace_1778405692841.png",
    "language-mastery-british-express": "/professional_communication_leadership_1778405709095.png"
  };

  const courseTints = {
    "digital-marketing-mastery": "p-tint-blue",
    "language-mastery-british-express": "p-tint-emerald"
  };

  const courseAccents = {
    "digital-marketing-mastery": "text-p-accent",
    "language-mastery-british-express": "text-emerald-600"
  };

  return (
    <section className="py-24">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="p-heading-lg mb-4 uppercase">Selected Protocols</h2>
          <p className="p-text-body">Our elite certification programs are architected for direct industry impact, focusing on the future of digital workforce requirements.</p>
        </div>
        <div className="text-right text-p-text-muted font-medium italic text-sm">
          Updated: May 2026
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/courses-premium/${course.slug}`)}
            className={`p-card group cursor-pointer overflow-hidden rounded-[2.5rem] flex flex-col ${courseTints[course.id]}`}
          >
            {/* Image/Visual Side */}
            <div className="w-full h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100 group-hover:scale-105 transition-transform duration-1000">
                <img 
                  src={courseImages[course.id]} 
                  alt={course.title} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-black/5">
                  {course.category}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-10 md:p-12 relative">
              <div className="flex items-center gap-4 text-[10px] font-black text-p-text-muted uppercase tracking-[0.3em] mb-8">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-40" /> {course.duration}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 opacity-40" /> {course.certification}</span>
              </div>

              <h3 className={`text-3xl font-black mb-6 leading-tight tracking-tighter transition-colors ${courseAccents[course.id]}`}>
                {course.title}
              </h3>
              <p className="p-text-body text-sm leading-relaxed mb-10 line-clamp-2">
                {course.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {course.outcomes.slice(0, 2).map((outcome, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-p-text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {outcome}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-black/[0.03]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tuition</span>
                  <div className="text-3xl font-black">{course.price}</div>
                </div>
                <div className="p-4 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-all transform group-hover:rotate-45">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;

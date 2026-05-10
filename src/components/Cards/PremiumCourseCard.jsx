import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, GraduationCap, ArrowRight, Zap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PremiumCourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-[#0f172a] rounded-[2rem] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-blue-500/5"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-400/30 transition-all duration-500" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-400/20 transition-all duration-500" />

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white rounded-full text-xs font-bold tracking-wider border border-white/20 shadow-lg shadow-blue-500/20">
            {course.category.toUpperCase()}
          </span>
          {course.id === 'digital-marketing-mastery' && (
            <span className="px-4 py-1.5 bg-amber-500/90 backdrop-blur-md text-black rounded-full text-xs font-black tracking-wider border border-white/20 shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> BEST SELLER
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-1.5 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className="text-white font-bold">{course.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-8 pt-4">
        <div className="flex items-center gap-4 text-blue-400/80 text-xs font-bold mb-4 uppercase tracking-[0.2em]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {course.duration}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" /> {course.skillLevel}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors duration-300">
          {course.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Highlights Mini-Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {course.highlights.slice(0, 2).map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="truncate">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Footer & Price */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div>
            <div className="text-slate-500 text-xs line-through mb-0.5">
              {course.originalPrice}
            </div>
            <div className="text-2xl font-black text-white">
              {course.price}
            </div>
          </div>

          <motion.button
            onClick={() => navigate(`/courses-new/${course.id}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 group/btn transition-all duration-300"
          >
            Explore
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Interactive Overlay for specific vibe */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-[2rem] pointer-events-none transition-all duration-500" />
    </motion.div>
  );
};

export default PremiumCourseCard;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, Clock, GraduationCap, CheckCircle, Zap, Star,
  Award, Target, Users, BookOpen, Rocket, ShieldCheck, 
  ChevronRight, Play, Globe, Laptop, Brain
} from 'lucide-react';
import { premiumCourses } from '../data/premiumCourses';

const PremiumCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const foundCourse = premiumCourses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      navigate('/courses-new');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Immersive Header / Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover grayscale-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/60 to-[#020617]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="group mb-12 flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-600 transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Return to Marketplace</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="px-5 py-2 bg-blue-600 rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-blue-500/20">
                  {course.category}
                </span>
                <span className="flex items-center gap-2 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" /> {course.rating} / 5.0
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                {course.title.split(' ').slice(0, -1).join(' ')} {' '}
                <span className="text-blue-500">{course.title.split(' ').pop()}</span>
              </h1>

              <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl">
                {course.fullDescription}
              </p>

              <div className="flex flex-wrap gap-8 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Duration</div>
                    <div className="text-lg font-black">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Certifications</div>
                    <div className="text-lg font-black">{course.certifications.length} Global</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[3rem] blur-3xl group-hover:bg-blue-500/30 transition-all duration-700" />
              <div className="relative bg-[#0f172a] rounded-[3rem] border border-white/10 p-4 overflow-hidden shadow-2xl">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-full object-cover opacity-60"
                  >
                    <source src={course.videoPreview} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <div className="text-slate-500 line-through text-sm mb-1 font-bold">{course.originalPrice || 'N/A'}</div>
                      <div className="text-4xl font-black text-white">{course.price || 'Free'}</div>
                    </div>
                    {course.originalPrice && course.price && !isNaN(parseInt(course.originalPrice.replace(/\D/g,''))) && (
                      <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-xl text-xs font-black border border-green-500/20">
                        SAVE {Math.round((parseInt(course.originalPrice.replace(/\D/g,'')) - (parseInt(course.price.replace(/\D/g,'')) || 0)) / parseInt(course.originalPrice.replace(/\D/g,'')) * 100)}%
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black tracking-widest uppercase shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all mb-4">
                    INITIATE PROTOCOL
                  </button>
                  <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    30-Day Money Back Guarantee • Instant Access
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights / Features Story */}
      <section className="py-40 px-6 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {course.highlights.map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all group"
                  >
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 leading-tight uppercase tracking-tight">{highlight}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 text-blue-500 font-bold tracking-[0.3em] uppercase mb-6 text-xs">
                <div className="w-12 h-[2px] bg-blue-500" />
                The Competitive Edge
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
                WHY THIS <span className="text-blue-500">MISSION</span> <br />
                MATTERS
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-12">
                Traditional education is obsolete. We provide the tactical tools and 
                strategic intelligence required to dominate in the digital era. 
                Our curriculum is built on real-world warfare, not theoretical models.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Target, title: "Precision Training", desc: "Every module is optimized for direct industry application." },
                  { icon: Brain, title: "Cognitive Mastery", desc: "Learn to think like the top 1% of digital leaders." },
                  { icon: Globe, title: "Global Authority", desc: "Certifications that command respect in any territory." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex-shrink-0 flex items-center justify-center border border-blue-600/20">
                      <item.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Curriculum Roadmap */}
      <section className="py-40 px-6 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
              THE <span className="text-blue-500">OPERATIONAL</span> ROADMAP
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">
              Trace your path from recruit to commander
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-20">
            <div className="w-full lg:w-1/3 space-y-4">
              {course.curriculum.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveModule(idx)}
                  className={`w-full text-left p-8 rounded-[2rem] border transition-all duration-500 group ${
                    activeModule === idx 
                    ? "bg-blue-600 border-blue-500 shadow-2xl shadow-blue-600/20" 
                    : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className={`text-[10px] font-black mb-2 uppercase tracking-[0.2em] ${activeModule === idx ? "text-blue-100" : "text-blue-500"}`}>
                    {phase.phase}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{phase.title}</h3>
                </button>
              ))}
            </div>

            <div className="w-full lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Laptop className="w-64 h-64 text-blue-500" />
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-12 uppercase tracking-tighter">
                      MISSION <span className="text-blue-500">PARAMETERS</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {course.curriculum[activeModule].modules.map((module, idx) => (
                        <div key={idx} className="flex items-center gap-6 group">
                          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-600/30 text-blue-400 font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {idx + 1}
                          </div>
                          <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-tight">{module}</span>
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

      {/* Career Outcomes / Paths */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tighter uppercase">
                TARGET <span className="text-blue-500">OBJECTIVES</span>
              </h2>
              <p className="text-xl text-slate-400">Potential career trajectories upon successful protocol completion.</p>
            </div>
            <Users className="w-32 h-32 text-white opacity-5 hidden lg:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {course.careerPaths.map((career, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] group hover:bg-blue-600 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all">
                  <Laptop className="w-8 h-8 text-blue-400 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tight leading-tight">{career.title}</h4>
                <div className="text-blue-400 font-black text-sm group-hover:text-white/80">{career.salary}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[4rem] overflow-hidden border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2670" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-900/95" />
            
            <div className="relative z-10 p-12 md:p-24 text-center">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">
                YOUR FUTURE IS <br />
                <span className="text-blue-200">NON-NEGOTIABLE</span>
              </h2>
              <p className="text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-sm">
                The next iteration of your career begins now.
              </p>
              <button className="bg-white text-blue-900 px-12 py-6 rounded-2xl font-black tracking-[0.2em] uppercase hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] text-lg">
                ENROLL IN PROTOCOL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Scroll */}
      <div className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-100 transition-opacity">
            {course.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCourseDetail;

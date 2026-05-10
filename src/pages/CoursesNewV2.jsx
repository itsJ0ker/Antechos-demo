import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Search, Filter, Rocket, Star, ShieldCheck } from "lucide-react";
import PremiumCourseCard from "../components/Cards/PremiumCourseCard";
import { premiumCourses } from '../data/premiumCourses';
import heroBg from "../assets/herobg/coursesbg.jpg";

const CoursesNewV2 = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCourses = premiumCourses.filter(course => {
    const matchesTab = activeTab === "all" || course.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const categories = ["all", ...new Set(premiumCourses.map(c => c.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 selection:text-blue-200">
      {/* Immersive Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[0.5]"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/40 to-[#020617]" />
          
          {/* Cyber Patterns */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          
          {/* Glowing Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-sm font-bold tracking-[0.2em] text-blue-200 uppercase">Evolution of Learning</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
          >
            MASTER YOUR <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              FUTURE IDENTITY
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Architect your career with elite certification programs designed for the 
            hyper-competitive global landscape. Zero theory, 100% execution.
          </motion.p>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 bg-white/5 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-blue-500/10"
          >
            <div className="relative flex items-center px-6">
              <Search className="w-6 h-6 text-blue-400 mr-4" />
              <input
                type="text"
                placeholder="Search for your next specialization..."
                className="bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 w-full text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-8 py-4 rounded-[2rem] font-bold transition-all duration-500 uppercase tracking-widest text-xs ${
                    activeTab === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { label: "Active Students", value: "25K+", icon: Rocket },
              { label: "Expert Mentors", value: "150+", icon: Star },
              { label: "Success Rate", value: "98%", icon: Zap },
              { label: "Recognition", value: "Global", icon: ShieldCheck },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex flex-col items-center group"
              >
                <stat.icon className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-125 transition-transform duration-500" />
                <div className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.3em] uppercase mb-4 text-xs">
                <div className="w-12 h-[2px] bg-blue-500" />
                Curated Specializations
              </div>
              <h2 className="text-5xl font-black tracking-tighter">
                CHOOSE YOUR <span className="text-blue-500">PROGRAM</span>
              </h2>
            </div>
            <div className="text-right text-slate-500 font-medium italic">
              Showing {filteredCourses.length} unique career paths
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PremiumCourseCard course={course} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-40 text-center">
              <div className="text-6xl mb-8">🛰️</div>
              <h3 className="text-3xl font-bold mb-4">No Signal Detected</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                We couldn't find any courses matching your search. Try broadening your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(37,99,235,0.2)]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[60px] -ml-20 -mb-20" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
                  READY TO START <br />
                  <span className="text-blue-200">THE PROTOCOL?</span>
                </h2>
                <p className="text-blue-100/80 text-xl mb-12">
                  Join the elite network of Antechos certified professionals. 
                  Early access to new programs and industry insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-blue-900 px-10 py-5 rounded-2xl font-black tracking-widest uppercase hover:scale-105 transition-all shadow-xl">
                    Get Started Now
                  </button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase hover:bg-white/20 transition-all">
                    Speak with Mentors
                  </button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-transparent opacity-30 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2670"
                  alt="Cyberpunk Tech"
                  className="relative z-10 rounded-[2rem] border border-white/20 shadow-2xl grayscale-[0.2]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesNewV2;

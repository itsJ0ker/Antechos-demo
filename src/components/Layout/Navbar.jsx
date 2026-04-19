import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Globe,
  Zap,
  Layout,
  User,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCourses, getUniversities } from "../../lib/supabase";
import { universities as staticUniversities } from "../../data/universities";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState(staticUniversities);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCoursesAndUniversities();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchCoursesAndUniversities = async () => {
    try {
      const { data: coursesData } = await getCourses();
      const { data: universitiesData } = await getUniversities();

      if (coursesData) setCourses(coursesData);

      if (universitiesData && universitiesData.length > 0) {
        setUniversities(prev => {
          const merged = [...prev];
          universitiesData.forEach(uni => {
            if (!merged.find(m => m.name === uni.name)) {
              merged.push(uni);
            }
          });
          return merged;
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses", hasDropdown: true },
    { name: "Universities", path: "/universities", hasDropdown: true },
    // { name: "Marketplace", path: "/marketplace" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleUniversityClick = (university) => {
    if (university.link && (university.link.startsWith('http') || university.link.startsWith('https'))) {
      window.open(university.link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/university/${university.id}`);
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled
          ? "bg-white/95 backdrop-blur-2xl py-2 shadow-xl border-slate-200"
          : "bg-white/70 backdrop-blur-md py-4 border-slate-200/50"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigate("/")}
          >
            <div className="relative">
              <img src={logo} alt="Logo" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900">
                ANTECHOS <span className="text-blue-600">INDIA</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] transform -translate-y-1 text-slate-500">
                XI SERVICES PVT LTD
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${location.pathname === item.path
                      ? "text-blue-600 bg-blue-50/50 shadow-sm"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                  )}
                </button>

                {/* Dropdowns */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[500px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6 overflow-hidden flex flex-col gap-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {item.name === "Courses" && (
                          <>
                            <div className="col-span-1 space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Popular Categories</h4>
                              <div className="flex flex-col gap-1">
                                {Array.from(new Set(courses.map(c => c.category))).slice(0, 4).map(cat => (
                                  <button key={cat} onClick={() => handleNavigate('/courses')} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 transition-colors group text-left">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                      <BookOpen className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{cat}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="col-span-1 bg-slate-50 rounded-2xl p-4 flex flex-col justify-between border border-slate-100">
                              <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Featured Course</h4>
                                <p className="text-sm font-bold text-slate-700 mb-1 leading-tight">Master Professional Leadership</p>
                                <p className="text-xs text-slate-500 font-medium">Kickstart your career with our top-rated executive program.</p>
                              </div>
                              <button onClick={() => handleNavigate('/courses')} className="mt-4 text-blue-600 font-bold text-xs flex items-center gap-1 group/btn">
                                Explore All Courses <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </>
                        )}

                        {item.name === "Universities" && (
                          <>
                            <div className="col-span-2 grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Top Partner Universities</h4>
                                <div className="flex flex-col gap-1">
                                  {universities.slice(0, 4).map(uni => (
                                    <button key={uni.id} onClick={() => handleUniversityClick(uni)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 transition-colors group text-left">
                                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                        <GraduationCap className="w-4 h-4" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-slate-700 line-clamp-1">{uni.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold">{uni.location.split(',')[0]}</p>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white flex flex-col justify-between">
                                <div>
                                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                                    <Globe className="w-5 h-5" />
                                  </div>
                                  <p className="text-lg font-bold leading-tight mb-2">Build Your Future Locally & Globally</p>
                                  <p className="text-xs text-blue-100/80 font-medium">Join 50K+ successful alumni across India's premier campuses.</p>
                                </div>
                                <button onClick={() => handleNavigate('/universities')} className="mt-4 bg-white text-blue-600 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow-lg">
                                  Browse All Institutions
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Premium CTA Button */}
            <button
              onClick={() => handleNavigate("/AuthPage")}
              className="ml-4 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Zap className="w-4 h-4" />
              <span>Join Now</span>
            </button>
          </div>

          {/* User & Mobile Menu Controls */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:flex p-2.5 rounded-xl transition-colors text-slate-500 hover:bg-slate-100"
              onClick={() => handleNavigate("/AuthPage")}
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-slate-900 bg-slate-100" : "text-slate-800 bg-slate-100"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[51]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[320px] bg-white z-[52] shadow-2xl flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-black tracking-tighter text-slate-900">
                  ANTECHOS <span className="text-blue-600">INDIA</span>
                </span>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl bg-slate-100 text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-6 flex-grow overflow-y-auto pr-2">
                {menuItems.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`flex items-center justify-between text-lg font-bold p-2 text-left transition-colors ${location.pathname === item.path ? "text-blue-600" : "text-slate-800"
                        }`}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown size={18} className="text-slate-300" />}
                    </button>
                    {item.hasDropdown && (
                      <div className="ml-4 pl-4 border-l-2 border-slate-100 flex flex-col gap-3 mt-1">
                        {item.name === "Courses" && courses.slice(0, 4).map(c => (
                          <button key={c.id} onClick={() => handleNavigate('/courses')} className="text-sm font-semibold text-slate-500 hover:text-blue-600 text-left">
                            {c.title}
                          </button>
                        ))}
                        {item.name === "Universities" && universities.slice(0, 4).map(u => (
                          <button key={u.id} onClick={() => handleUniversityClick(u)} className="text-sm font-semibold text-slate-500 hover:text-blue-600 text-left">
                            {u.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <button
                  onClick={() => handleNavigate("/AuthPage")}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                >
                  <Zap size={20} />
                  Join the Antechos Network
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

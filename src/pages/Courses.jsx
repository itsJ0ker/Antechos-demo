import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Filter, X, Sparkles, Zap } from "lucide-react";
import CourseCard from "../components/Cards/CourseCard";
import allCourses from '../data/allCourses.js';
import heroBg from "../assets/herobg/coursesbg.jpg";

const Courses = () => {
  const [filters, setFilters] = useState({
    category: [],
    skill: [],
    price: [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Load courses from database
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await allCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setCoursesLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const currentValues = prev[type];
      return {
        ...prev,
        [type]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      skill: [],
      price: [],
    });
  };

  const filteredCourses = courses.filter((course) => {
    const matchCategory =
      filters.category.length === 0 ||
      filters.category.includes(course.category);
    
    const matchSkill =
      filters.skill.length === 0 || 
      filters.skill.includes(course.skill);
    
    const matchPrice = filters.price.length === 0 || 
      filters.price.some(priceFilter => {
        if (priceFilter === "Free") {
          return course.price === "Free" || course.price === "₹0";
        } else if (priceFilter === "Paid") {
          return course.price !== "Free" && course.price !== "₹0";
        }
        return false;
      });
    
    return matchCategory && matchSkill && matchPrice;
  });

  // Enhanced Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7,
      },
    },
  };

  const heroTextVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1.2,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const buttonGlow = {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.5)",
      "0 0 20px rgba(59, 130, 246, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/70 to-indigo-100/80 backdrop-blur-[2px]" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 text-blue-400"
          animate={floatingAnimation}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-orange-400"
          animate={sparkleAnimation}
        >
          <Zap className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 text-purple-400"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={heroTextVariants}
              className="relative"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  Learn, Grow and{" "}
                </span>
                <motion.span 
                  className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent relative"
                  animate={buttonGlow}
                >
                  Get Certified!
                </motion.span>
              </motion.h1>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-800 max-w-5xl mx-auto leading-relaxed"
              variants={heroTextVariants}
            >
              Unlock high-quality courses at{" "}
              <motion.span 
                className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold"
                whileHover={{ scale: 1.05 }}
              >
                no cost
              </motion.span>{" "}
              and earn a certificate to boost your career.
            </motion.p>

            <motion.div
              className="space-y-4 sm:space-y-6 pt-6 sm:pt-8 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {[
                "Explore Expert-Led Courses",
                "Industry-Expert Content & Real-World Insights",
                "Earn a Recognized Certificate upon Completion",
                "Learn at Your Own Pace, Anytime, Anywhere",
                "AI Powered Assessments",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 text-left sm:text-center justify-start sm:justify-center group"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    x: 10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 mt-0.5 group-hover:text-green-500 transition-colors" />
                  </motion.div>
                  <span className="text-gray-700 font-medium text-base sm:text-lg group-hover:text-gray-900 transition-colors">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6 pt-8 sm:pt-12 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <motion.button
                className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 text-white font-bold py-4 px-8 sm:px-10 rounded-2xl shadow-2xl overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={buttonGlow}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                <span className="relative z-10 text-lg">Earn Skill Based Certificate</span>
              </motion.button>
              
              <motion.button
                className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white font-bold py-4 px-8 sm:px-10 rounded-2xl flex items-center justify-center gap-3 shadow-2xl overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-lg">Explore Courses</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <motion.section
        className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-5xl mx-auto relative"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
              Explore Our{" "}
            </span>
            <motion.span 
              className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Courses
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Browse through our extensive catalog of courses designed to help you
            achieve your career goals and unlock new opportunities.
          </motion.p>
          
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Mobile Filters Button */}
            <motion.button
              className="lg:hidden flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-8 rounded-2xl mb-6 w-full sm:w-auto sm:mx-auto shadow-xl"
              onClick={() => setMobileFiltersOpen(true)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Filter size={20} />
              </motion.div>
              <span className="font-semibold">Filter Courses</span>
            </motion.button>

            {/* Mobile Filters Overlay */}
            <AnimatePresence>
              {mobileFiltersOpen && (
                <motion.div
                  className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <motion.div
                    className="absolute left-0 top-0 bg-white w-full max-w-sm h-full overflow-y-auto shadow-2xl"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 25, 
                      stiffness: 200,
                      duration: 0.5
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Filters
                        </h2>
                        <motion.button 
                          onClick={() => setMobileFiltersOpen(false)}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="text-gray-500 hover:text-gray-700" size={24} />
                        </motion.button>
                      </div>
                      <FiltersContent
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        clearFilters={clearFilters}
                        hoveredFilter={hoveredFilter}
                        setHoveredFilter={setHoveredFilter}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Filters Sidebar */}
            <motion.aside 
              className="hidden lg:block w-full lg:w-1/4 flex-shrink-0"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 sticky top-8 border border-white/20"
                whileHover={{ 
                  boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    Filters
                  </motion.h2>
                  {Object.values(filters).some((arr) => arr.length > 0) && (
                    <motion.button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors px-3 py-1 rounded-lg hover:bg-blue-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear all
                    </motion.button>
                  )}
                </div>
                <FiltersContent
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  hoveredFilter={hoveredFilter}
                  setHoveredFilter={setHoveredFilter}
                />
              </motion.div>
            </motion.aside>

            {/* Courses Grid */}
            <main className="w-full lg:w-3/4 min-h-[400px]">
              {filteredCourses.length === 0 ? (
                <motion.div
                  className="text-center py-16 sm:py-20 px-6"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15,
                    duration: 0.8
                  }}
                >
                  <motion.div 
                    className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.1)"
                    }}
                  >
                    <motion.div 
                      className="text-6xl mb-6"
                      animate={{ 
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      🔍
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                      No courses found
                    </h3>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      No courses match your current filters. Try adjusting your search criteria.
                    </p>
                    <motion.button
                      onClick={clearFilters}
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-2xl transition-all font-semibold shadow-xl"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All Filters
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  {/* Results Count */}
                  <motion.div 
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <motion.p 
                      className="text-gray-600 text-lg font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Showing{" "}
                      <motion.span 
                        className="font-bold text-blue-600 text-xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {filteredCourses.length}
                      </motion.span>{" "}
                      course{filteredCourses.length !== 1 ? 's' : ''}
                    </motion.p>
                  </motion.div>

                  {/* Courses Grid */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        variants={itemVariants}
                        whileHover={{ 
                          y: -10, 
                          scale: 1.03,
                          rotateY: 5,
                          transition: { 
                            type: "spring", 
                            stiffness: 300,
                            damping: 20
                          }
                        }}
                        className="h-full transform-gpu"
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <CourseCard course={course} />
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </main>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// Enhanced Filters Component
const FiltersContent = ({ filters, handleFilterChange, clearFilters, hoveredFilter, setHoveredFilter }) => {
  const filterGroups = [
    {
      title: "Categories",
      filterType: "category",
      options: ["Content Creation", "Marketing", "Technology", "Counselling"],
      icon: "🎨",
    },
    {
      title: "Skill Level",
      filterType: "skill",
      options: ["Beginner", "Intermediate", "Expert"],
      icon: "📊",
    },
    {
      title: "Price",
      filterType: "price",
      options: ["Free", "Paid"],
      icon: "💰",
    },
  ];

  return (
    <div className="space-y-8">
      {filterGroups.map((group, groupIndex) => (
        <motion.div 
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          className="relative"
        >
          <motion.h3 
            className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"
            whileHover={{ x: 5 }}
          >
            <span className="text-xl">{group.icon}</span>
            {group.title}
          </motion.h3>
          
          <div className="space-y-3">
            {group.options.map((option, optionIndex) => {
              const isSelected = filters[group.filterType].includes(option);
              const filterKey = `${group.filterType}-${option}`;
              
              return (
                <motion.div 
                  key={option} 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onHoverStart={() => setHoveredFilter && setHoveredFilter(filterKey)}
                  onHoverEnd={() => setHoveredFilter && setHoveredFilter(null)}
                >
                  <motion.div className="relative">
                    <input
                      type="checkbox"
                      id={`${group.filterType}-${option}`}
                      checked={isSelected}
                      onChange={() => handleFilterChange(group.filterType, option)}
                      className="h-5 w-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                    />
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500 rounded-lg"
                        layoutId={`checkbox-${filterKey}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  
                  <motion.label
                    htmlFor={`${group.filterType}-${option}`}
                    className="ml-4 text-gray-700 hover:text-gray-900 cursor-pointer select-none font-medium group-hover:font-semibold transition-all duration-200"
                    whileHover={{ color: "#1f2937" }}
                  >
                    {option}
                  </motion.label>
                  
                  {hoveredFilter === filterKey && (
                    <motion.div
                      className="ml-2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Sparkles className="w-4 h-4 text-blue-500" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
      
      {clearFilters && Object.values(filters).some((arr) => arr.length > 0) && (
        <motion.button
          onClick={clearFilters}
          className="w-full mt-8 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-700 py-4 px-6 rounded-2xl transition-all font-semibold border-2 border-gray-200 hover:border-red-200"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            Clear All Filters
          </motion.span>
        </motion.button>
      )}
    </div>
  );
};

export default Courses;
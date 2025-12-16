import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  Trophy,
  Target,
  Zap,
  Briefcase,
  Play,
  Download,
  Share2,
  Menu,
  X,
} from "lucide-react";

const CourseDetailPage = ({ course }) => {
  const [expandedModule, setExpandedModule] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showMobileFlyer, setShowMobileFlyer] = useState(false);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-sm w-full">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Course Selected</h1>
          <p className="text-gray-600">Please select a course to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile Course Info Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowMobileFlyer(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Hero Section */}
            <motion.section 
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative">
                {/* Category badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {course.category && (
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                  )}
                  {course.subcategory && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.subcategory}
                    </span>
                  )}
                  {(course.skill_level || course.skill) && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.skill_level || course.skill}
                    </span>
                  )}
                  {course.language && course.language !== 'English' && (
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.language}
                    </span>
                  )}
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                  {course.title}
                </h1>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base lg:text-lg">
                  {course.description}
                </p>
                
                {/* Course stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-600">
                  {course.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.skill_level || course.skill || 'Beginner'} Level</span>
                  </div>
                  {course.total_enrollments && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.total_enrollments} students</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Skills Section - Updated for Database */}
            <motion.section
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Skills You'll Gain
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {(() => {
                  try {
                    // Try to get skills from database first, then fallback to static data
                    const skillsData = course.skills 
                      ? (typeof course.skills === 'string' ? JSON.parse(course.skills) : course.skills)
                      : course.skills; // fallback to static data
                    
                    return Array.isArray(skillsData) ? skillsData.map((skill, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center border border-blue-200 cursor-pointer"
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <span className="text-sm font-semibold text-blue-700">{skill}</span>
                      </motion.div>
                    )) : null;
                  } catch (error) {
                    console.warn('Error parsing skills:', error);
                    return null;
                  }
                })()}
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                Tools & Technologies
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {(() => {
                  try {
                    // Try to get tools from database first, then fallback to static data
                    const toolsData = course.tools 
                      ? (typeof course.tools === 'string' ? JSON.parse(course.tools) : course.tools)
                      : course.tools; // fallback to static data
                    
                    return Array.isArray(toolsData) ? toolsData.map((tool, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 border border-gray-300 font-medium cursor-pointer"
                        whileHover={{ 
                          backgroundColor: "#3b82f6",
                          color: "#ffffff",
                          scale: 1.05
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * i }}
                      >
                        {tool}
                      </motion.span>
                    )) : null;
                  } catch (error) {
                    console.warn('Error parsing tools:', error);
                    return null;
                  }
                })()}
              </div>
            </motion.section>

            {/* Modules Section - Updated for Database */}
            <motion.section
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Program Overview & Structure
              </h2>
              
              <div className="space-y-3">
                {(() => {
                  try {
                    // Try to get modules from database first, then fallback to static data
                    const modulesData = course.modules 
                      ? (typeof course.modules === 'string' ? JSON.parse(course.modules) : course.modules)
                      : course.modules; // fallback to static data
                    
                    return Array.isArray(modulesData) ? modulesData.map((module, i) => (
                      <motion.div
                        key={i}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <button
                          onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                          className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                              {i + 1}
                            </div>
                            <span className="text-gray-800 text-sm md:text-base">{module.title}</span>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              expandedModule === i ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>

                        <AnimatePresence>
                          {expandedModule === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-4 pb-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
                            >
                              {module.description && (
                                <p className="text-gray-600 text-sm mb-3 italic">{module.description}</p>
                              )}
                              <ul className="space-y-2">
                                {module.details?.map((detail, j) => (
                                  <li key={j} className="flex items-start gap-2 text-gray-700">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No modules available for this course</p>
                      </div>
                    );
                  } catch (error) {
                    console.warn('Error parsing modules:', error);
                    return (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Unable to load course modules</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </motion.section>

            {/* Certificate Section - Updated */}
            <motion.section
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 shadow-xl border border-purple-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-2 flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  Industry-Recognized Certificate
                </h2>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                {course.certification_details || 
                 "Upon successful completion, you'll receive a verified certificate that demonstrates your expertise. This certificate is recognized by top companies worldwide and can be added to your LinkedIn profile."
                }
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Shareable Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-green-500" />
                  <span className="font-medium">LinkedIn Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Industry Recognized</span>
                </div>
              </div>
            </motion.section>

            {/* Instructor Section - Updated for Database Fields */}
            {course.instructor_name && (
              <motion.section
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                  Meet Your Instructor
                </h2>
                
                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden">
                    {course.instructor_image ? (
                      <img 
                        src={course.instructor_image} 
                        alt={course.instructor_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">
                        {course.instructor_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-2">{course.instructor_name}</h3>
                    {course.instructor_bio && (
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{course.instructor_bio}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{course.rating || 'N/A'}</span>
                      </div>
                      <div className="text-sm text-gray-500">Expert Instructor</div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Course Objectives Section - New */}
            {course.course_objectives && (
              <motion.section
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                  Course Objectives
                </h2>
                
                <div className="grid grid-cols-1 gap-3">
                  {(() => {
                    try {
                      const objectives = typeof course.course_objectives === 'string' 
                        ? JSON.parse(course.course_objectives) 
                        : course.course_objectives;
                      
                      return Array.isArray(objectives) ? objectives.map((objective, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{objective}</p>
                        </motion.div>
                      )) : null;
                    } catch (error) {
                      console.warn('Error parsing course objectives:', error);
                      return null;
                    }
                  })()}
                </div>
              </motion.section>
            )}

            {/* What You'll Learn Section - New */}
            {course.what_you_learn && (
              <motion.section
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                  What You'll Learn
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(() => {
                    try {
                      const learningItems = typeof course.what_you_learn === 'string' 
                        ? JSON.parse(course.what_you_learn) 
                        : course.what_you_learn;
                      
                      return Array.isArray(learningItems) ? learningItems.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{item}</p>
                        </motion.div>
                      )) : null;
                    } catch (error) {
                      console.warn('Error parsing what you learn:', error);
                      return null;
                    }
                  })()}
                </div>
              </motion.section>
            )}

            {/* Course Features Section - New */}
            {course.course_features && (
              <motion.section
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                  Course Features
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    try {
                      const features = typeof course.course_features === 'string' 
                        ? JSON.parse(course.course_features) 
                        : course.course_features;
                      
                      return Array.isArray(features) ? features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-lg transition-shadow"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg flex-shrink-0">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{feature}</p>
                        </motion.div>
                      )) : null;
                    } catch (error) {
                      console.warn('Error parsing course features:', error);
                      return null;
                    }
                  })()}
                </div>
              </motion.section>
            )}

            {/* Target Audience Section - New */}
            {course.target_audience && (
              <motion.section
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                  Who This Course Is For
                </h2>
                
                <div className="grid grid-cols-1 gap-3">
                  {(() => {
                    try {
                      const audience = typeof course.target_audience === 'string' 
                        ? JSON.parse(course.target_audience) 
                        : course.target_audience;
                      
                      return Array.isArray(audience) ? audience.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <Users className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{item}</p>
                        </motion.div>
                      )) : null;
                    } catch (error) {
                      console.warn('Error parsing target audience:', error);
                      return null;
                    }
                  })()}
                </div>
              </motion.section>
            )}

            {/* Benefits Section */}
            <motion.section
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Why Choose This Course
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle, title: "Hands-on Learning", desc: "Build real projects for your portfolio" },
                  { icon: Trophy, title: "Career Advancement", desc: "Boost your professional opportunities" },
                  { icon: Target, title: "Industry-Focused", desc: "Learn skills companies actually need" },
                  { icon: Zap, title: "Immediate Application", desc: "Start using knowledge from day one" }
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FlyerContent course={course} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Flyer Modal */}
      <AnimatePresence>
        {showMobileFlyer && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileFlyer(false)}
          >
            <motion.div
              className="absolute right-0 top-0 bg-white h-full w-full max-w-sm overflow-y-auto shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Course Details</h2>
                  <button 
                    onClick={() => setShowMobileFlyer(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <FlyerContent course={course} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Course Flyer Component
const FlyerContent = ({ course }) => {
  return (
    <div className="bg-gradient-to-b from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-4 right-4 w-20 h-16 bg-black bg-opacity-20 rounded-xl">
        <div className="w-full h-full bg-gradient-to-r from-teal-400 to-blue-400 rounded-xl opacity-80 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Total Modules: {course.modules?.length || 'N/A'}</span>
        </div>
        
        <p className="text-sm opacity-90 leading-relaxed">
          Gain insight into {course.category?.toLowerCase()} and learn the fundamentals.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 opacity-80" />
            <div>
              <div className="font-semibold text-sm">Duration</div>
              <div className="text-xs opacity-80">{course.duration}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1 h-3 bg-white opacity-80 rounded-full"></div>
              <div className="w-1 h-2 bg-white opacity-60 rounded-full ml-0.5"></div>
              <div className="w-1 h-1 bg-white opacity-40 rounded-full ml-0.5"></div>
            </div>
            <div>
              <div className="font-semibold text-sm">Level: {course.skill}</div>
              <div className="text-xs opacity-80">
                {course.skill === "Beginner" ? "No prior experience required" : 
                 course.skill === "Intermediate" ? "Basic knowledge recommended" : 
                 "Advanced level course"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 opacity-80" />
            <div>
              <div className="font-semibold text-sm">Career Support</div>
              <div className="text-xs opacity-80">Job assistance available</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-3 h-2 border border-white opacity-80 rounded-sm"></div>
            </div>
            <div>
              <div className="font-semibold text-sm">
                Fee: {(course.original_price && course.original_price > course.price) && (
                  <span className="line-through opacity-60">₹{course.original_price?.toLocaleString()}</span>
                )}
              </div>
              <div className="text-xl font-bold">
                {course.price ? `₹${course.price.toLocaleString()}` : course.negoprice || 'Free'}
              </div>
            </div>
          </div>
        </div>
        
        <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl text-lg mt-6 hover:bg-yellow-300 transition-colors">
          ENROLL NOW
        </button>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Play className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
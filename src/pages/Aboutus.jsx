import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import { GraduationCap, Building2, X } from "lucide-react";
import heroBg from "../assets/herobg/Aboutusbg.jpeg";
import { FaLinkedin, FaXTwitter, FaGlobe } from "react-icons/fa6";
import { Link } from "react-router-dom";


// Import images for stats
import ExpertsImg from "../assets/USP/experts.png";
import SuccessImg from "../assets/USP/success.png";
import CourseImg from "../assets/USP/course.png";
import StudentsImg from "../assets/USP/students.png";

// Import images for team members
import VishwajeetImg from "../assets/Leaders/vishwajeet.jpg";
import AmalImg from "../assets/Leaders/amal.png";

// Import images for features
import FeatureA1 from "../assets/USP/a1.png";
import FeatureA2 from "../assets/USP/a2.png";
import FeatureA3 from "../assets/USP/a3.png";
import FeatureA4 from "../assets/USP/a4.png";
import FeatureA5 from "../assets/USP/a5.png";
import FeatureA6 from "../assets/USP/a6.png";


const About = () => {
  // Data moved to constants for better organization
  const STATS = [
    {
      value: 25,
      suffix: "+",
      title: "Expert Instructors",
      delay: 0,
      img: ExpertsImg,
    },
    {
      value: 95,
      title: "Success Rate",
      suffix: "%",
      delay: 0.2,
      img: SuccessImg,
    },
    {
      value: 100,
      suffix: "+",
      title: "Courses Available",
      delay: 0.4,
      img: CourseImg,
    },
    {
      value: 15000,
      suffix: "+",
      title: "Students Enrolled",
      delay: 0.6,
      img: StudentsImg,
    },
  ];


  const TEAM_MEMBERS = [
    {
      name: "Vishwajeet Shinde",
      role: "Founder & CEO",
      image: VishwajeetImg,
      linkedin: "https://www.linkedin.com/in/shindevishwajeet",
      twitter: "https://twitter.com/johndoe",
      portfolio: "/portfolio", // ✅ internal navigation
      bio: "Visionary leader with 10+ years of experience in EdTech and business development. Passionate about transforming education through technology.",
    },
    {
      name: "Amal Sharma",
      role: "Co-founder & CSO",
      image: AmalImg,
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      portfolio: "/portfolio", // ✅ same page for now
      bio: "Strategic operations expert focused on scaling educational platforms and building sustainable learning communities.",
    },
  ];


  const FEATURES = [
    {
      icon: FeatureA1,
      title: "Industry-Relevant Courses",
      description:
        "Our curriculum is designed in collaboration with industry experts to ensure you learn skills that are in high demand.",
    },
    {
      icon: FeatureA2,
      title: "Personalized Learning",
      description:
        "We create customized learning paths based on your goals, current skill level, and preferred learning style.",
    },
    {
      icon: FeatureA3,
      title: "Certified Programs",
      description:
        "Earn credentials that are recognized by leading organizations and showcase your expertise to employers.",
    },
    {
      icon: FeatureA4,
      title: "Expert Mentorship",
      description:
        "Get guidance from industry professionals who provide feedback and support throughout your learning journey.",
    },
    {
      icon: FeatureA5,
      title: "Affordable Pricing",
      description:
        "Access quality education at competitive prices with flexible payment options to suit your budget.",
    },
    {
      icon: FeatureA6,
      title: "Innovative Teaching Methods",
      description:
        "Experience engaging content with gamification elements that make learning enjoyable and effective.",
    },
  ];


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };


  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };


  const [selectedMember, setSelectedMember] = useState(null);


  return (
    <div className="relative overflow-x-hidden w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 z-1" />


        <motion.div
          className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 transition-transform duration-300 hover:scale-105 leading-tight"
            variants={itemVariants}
          >
            About{" "}
            <span className="hover:text-white bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 bg-clip-text text-transparent">
              Antechos
            </span>
          </motion.h1>
          <motion.div
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold max-w-4xl mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 backdrop-blur-sm bg-black/20 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg border border-white/20"
            variants={itemVariants}
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Learn
            </motion.span>
            <span className="hidden sm:inline">|</span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Grow
            </motion.span>
            <span className="hidden sm:inline">|</span>
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Lead
            </motion.span>
          </motion.div>
        </motion.div>
      </section>


      {/* Vision & Mission Section */}
      <section className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Empowering Tomorrow's Trailblazers
              </motion.h2>


              <div className="space-y-6 sm:space-y-8 mt-6 max-w-2xl mx-auto lg:mx-0">
                {/* Vision Card */}
                <motion.div
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                      <GraduationCap className="text-blue-600" size={20} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center sm:text-left leading-relaxed">
                    To lead the way in EdTech and SkillTech innovation by
                    fostering a community of learners who grow together, support
                    one another, and achieve success as a united force.
                  </p>
                </motion.div>


                {/* Mission Card */}
                <motion.div
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full flex-shrink-0">
                      <Building2 className="text-blue-600" size={20} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center sm:text-left leading-relaxed">
                    To empower every individual—whether a student starting their
                    journey or a professional seeking growth—with
                    industry-relevant skills, personalized learning paths, and
                    mentorship.
                  </p>
                </motion.div>
              </div>
            </div>


            {/* Right - Stats Grid */}
            <div className="w-full">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <img
                        src={stat.img}
                        alt={stat.title}
                        className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                        loading="lazy"
                      />
                      <div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-600">
                          <CountUp
                            end={stat.value}
                            duration={2.5}
                            separator=","
                            delay={stat.delay}
                          />
                          {stat.suffix && (
                            <span className="text-2xl sm:text-3xl lg:text-4xl">
                              {stat.suffix}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 leading-tight">
                          {stat.title}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 via-black to-indigo-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-blue-900 rounded-full mix-blend-screen opacity-10 filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-900 rounded-full mix-blend-screen opacity-10 filter blur-3xl"></div>
        </div>


        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8 sm:mb-12 lg:mb-16 leading-tight"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 bg-clip-text text-transparent">
              Antechos?
            </span>
          </motion.h2>


          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden p-4 sm:p-6 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 bg-white/10 backdrop-blur-sm hover:border-blue-400/50 min-h-[200px] sm:min-h-[220px]"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Default Content - image & title */}
                <div className="flex flex-col items-center justify-center text-center h-full transition-opacity duration-300 group-hover:opacity-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-3 sm:mb-4 flex items-center justify-center">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-[200%] h-[200%] object-contain"
                      loading="lazy"
                    />
                  </div>


                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-tight">
                    {feature.title}
                  </h3>
                </div>


                {/* Description - only on hover */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Leadership Team */}
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent leading-tight"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
          >
            Our Leadership Team
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Tilt glareEnable glareMaxOpacity={0.1} scale={1.02} transitionSpeed={1500} tiltMaxAngleX={5} tiltMaxAngleY={5} className="rounded-xl">
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-xl group aspect-[3/4] border-2 border-transparent hover:border-blue-500 hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-sm sm:text-base opacity-90">{member.role}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 z-20">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white text-lg sm:text-xl hover:text-blue-300 transition-colors duration-200" onClick={(e) => e.stopPropagation()}>
                          <FaLinkedin />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-white text-lg sm:text-xl hover:text-blue-300 transition-colors duration-200" onClick={(e) => e.stopPropagation()}>
                          <FaXTwitter />
                        </a>
                      )}
                      {member.portfolio && (
                        <Link
                          to={member.portfolio}
                          className="text-white text-lg sm:text-xl hover:text-blue-300 transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGlobe />
                        </Link>
                      )}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= MODAL ================= */}
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-white max-w-md w-full rounded-xl overflow-hidden shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedMember(null)} className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 rounded-full p-1 transition-all duration-200">
                <X size={20} />
              </button>
              <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-64 sm:h-80 object-cover" />
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{selectedMember.name}</h2>
                <p className="text-blue-600 font-medium mb-3 sm:mb-4">{selectedMember.role}</p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{selectedMember.bio}</p>
                <div className="flex gap-4 mt-4 sm:mt-6">
                  {selectedMember.linkedin && (
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xl transition-colors duration-200">
                      <FaLinkedin />
                    </a>
                  )}
                  {selectedMember.twitter && (
                    <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 text-xl transition-colors duration-200">
                      <FaXTwitter />
                    </a>
                  )}
                  {selectedMember.portfolio && (
                    <Link to={selectedMember.portfolio} className="text-green-600 hover:text-green-800 text-xl transition-colors duration-200">
                      <FaGlobe />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </div>
  );
};


export default About;





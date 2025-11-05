// Universities.jsx
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Handshake, Cpu, Play, Star, Users } from "lucide-react";
import UniversityCards from "../components/Cards/unicard";
import DeckTestimonials from "../components/Cards/DeckTestimonials";
import unisecBg from "../assets/unisec.jpg";
import heroBg from "../assets/herobg/universitybg.jpg";
import studentGif from "../assets/online-student.gif";
import placementGif from "../assets/placement.gif";
import expertsGif from "../assets/experts.gif";

const Universities = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  // Counter animation logic
  const useCountUp = (end) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (inView) {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = end / totalSteps;

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }
    }, [inView, end]);

    return count;
  };

  const students = useCountUp(1200);
  const faculty = useCountUp(85);
  const courses = useCountUp(230);

  const PARTNER_BENEFITS = [
    {
      title: "Global Network",
      icon: <Globe className="text-blue-600" size={40} />,
      description: "Connect with professionals and institutions worldwide.",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Trusted Partner",
      icon: <Handshake className="text-blue-600" size={40} />,
      description: "Collaborate with a platform trusted by top educational institutions globally.",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Innovative Platform",
      icon: <Cpu className="text-blue-600" size={40} />,
      description: "Leverage our cutting-edge technology and data-driven insights for growth.",
      color: "from-blue-600 to-blue-800",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-0" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${15 + i * 18}%`,
                top: `${25 + i * 12}%`,
              }}
              animate={{
                y: [-15, 15],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl w-full"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">
              Top University Partnerships
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Partner with Top{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Universities
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed">
            Discover and collaborate with prestigious educational institutions
            from around India and unlock new opportunities.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-blue-500/25 border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              🎓 Explore Services
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border-2 border-white/30 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </motion.button>
          </div> */}

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Users className="w-4 h-4" />
              <span>500+ Partner Universities</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="ml-1 text-gray-300 text-sm">4.8/5 Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <section
        ref={ref}
        className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              { label: "Active Students", value: students, img: studentGif },
              { label: "Best Faculty", value: faculty, img: placementGif },
              { label: "Active Courses", value: courses, img: expertsGif },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center shadow-lg shadow-blue-500/20 p-6 sm:p-8 lg:p-10 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 gap-4 sm:gap-6 lg:gap-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
              >
                <div className="flex-shrink-0">
                  <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain" 
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {item.value}+
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* University Cards Section */}
      <div className="max-w-full overflow-hidden">
        <UniversityCards />
      </div>

      {/* Quote Section */}
      <section
        className="relative min-h-screen bg-fixed bg-cover bg-no-repeat bg-center flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${unisecBg})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-left max-w-4xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl text-orange-400 font-bold mb-4 sm:mb-6 leading-tight">
                Together We Go Far
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-800 dark:text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                Through research and discovery, we are changing the world and shaping the future of education.
              </p>
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-blue-500/25 border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                Watch Video
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-blue-50 relative overflow-hidden max-w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-400 rounded-full mix-blend-overlay opacity-10 filter blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 bg-blue-300 rounded-full mix-blend-overlay opacity-10 filter blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent mb-12 sm:mb-16 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Partner With{" "}
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              Antechos?
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {PARTNER_BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                className="relative group w-full"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-500 group-hover:bg-white min-h-[280px] sm:min-h-[320px]">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Partner With Us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-center bg-gradient-to-b from-blue-50 to-blue-950 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-6xl pb-6 sm:pb-8 font-bold bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our <span className="text-orange-500">Students</span> Say
          </motion.h2>
          <DeckTestimonials />
        </div>
      </section>
    </div>
  );
};

export default Universities;
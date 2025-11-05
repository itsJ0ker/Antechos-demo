import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import heroBg from "../assets/herobg.jpg";
import { Play, Sparkles, ArrowRight } from "lucide-react";
import Slider from "react-slick";
import { FaUserFriends, FaDesktop, FaAward } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import DeckTestimonials from "../components/Cards/DeckTestimonials";
import { useDrag } from "@use-gesture/react";
import { motion, useAnimation } from "framer-motion";
import RoadmapSection from "../components/sections/Roadmap";
import Blog from "../components/sections/blog";
import Contact from "../components/sections/contact";
import Platform from "../components/sections/platform";
import RotatingText from "../components/UI/RotatingText";
import TrainerCard from "../components/Cards/TrainerCard"; // Adjust path as needed
import CourseCard from "../components/Cards/CourseCard"; // adjust the path if needed
import EnquiryPopup from "../components/sections/PopupForm";
import allCourses from "../data/allCourses";
import { getTrainers } from "../data/dataservice";
import usp1 from "../assets/usp/usp1.png";
import usp2 from "../assets/usp/usp2.png";
import usp3 from "../assets/usp/usp3.png";
import usp4 from "../assets/usp/usp4.png";
import usp5 from "../assets/usp/usp5.png";
import usp6 from "../assets/usp/usp6.png";
import instructor from "../assets/instructor.png";
import student from "../assets/student.png";
import banner from "../assets/herobg/absolute.png"
import S1 from "../assets/online-student.gif";
import S2 from "../assets/placement.gif";
import S3 from "../assets/experts.gif";
import S4 from "../assets/partners.gif";

const Home = () => {
  // Your component logic heres
  const [state, setState] = useState(); // Example useState usage
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const navigate = useNavigate();
  const [mocktails, setMocktails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gradientStyle = {
    background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.2), transparent 300px), linear-gradient(to right, #1e3a8a, #93c5fd)`,
  };

  const stats = [
    {
      value: 15000,
      title: "Trained Students",
      delay: 0,
      img: S1,
    },
    {
      value: 92,
      title: "Placement Rate (%)",
      delay: 0.2,
      img: S2,
    },
    {
      value: 300,
      title: "Expert Trainers",
      delay: 0.4,
      img: S3,
    },
    {
      value: 120,
      title: "Corporate Partners",
      delay: 0.6,
      img: S4,
    },
  ];

  const cards = [
    {
      icon: (
        <img
          src={usp1}
          alt="Interactive Sessions"
          className="w-40 h-40 object-contain"
        />
      ),
      title: "Interactive and Engaging Sessions",
      description: "For an immersive learning experience",
    },
    {
      icon: (
        <img
          src={usp2}
          alt="Micro Assessments"
          className="w-40 h-40 object-contain"
        />
      ),
      title: "Micro-level Assessments",
      description: "To get an in-depth understanding of concepts",
    },
    {
      icon: (
        <img
          src={usp3}
          alt="Growth Mindset"
          className="w-40 h-40 object-contain"
        />
      ),
      title: "Growth Mindset Trainings",
      description: "With high performance frameworks",
    },
    {
      icon: (
        <img
          src={usp4}
          alt="Skill Profile"
          className="w-40 h-40 object-contain"
        />
      ),
      title: "Sharable Skill Profile",
      description: "And a strong presence on GitHub, coding platforms etc",
    },
    {
      icon: (
        <img
          src={usp5}
          alt="Elite Community"
          className="w-40 h-40 object-contain"
        />
      ),
      title: "Exclusive Access to 4.0 Tribe",
      description: "India's Most Elite Student Tech Community",
    },
    {
      icon: <img src={usp6} alt="Industry Curriculum" />,
      title: "Reversed Engineered Curriculum",
      description: "Designed for industry relevance",
    },
  ];

  const categories = ["Content Creation", "Marketing", "Technology", "Counselling"];

  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const coursesData = {
    All: courses,
  };

  categories.forEach((cat) => {
    if (cat !== "All") {
      coursesData[cat] = courses.filter((course) => course.category === cat);
    }
  });

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getTrainers().then((data) => setTrainers(data));
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const buttonVariants = {
    hover: {
      y: -5,
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [isHovered, controls]);

  const pauseAnimation = () => controls.stop();

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-110"
          style={{ backgroundImage: `url(${heroBg})` }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating Elements Background */}
        <div className="absolute inset-0 z-15 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-center h-full w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-full overflow-hidden">
          <div className="w-full max-w-5xl">
            {/* Badge/Tag */}
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 max-w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-base text-blue-300 font-medium whitespace-nowrap">
                #1 Placement-Focused Training
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-4 sm:mb-6 md:mb-8 w-full overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 bg-clip-text text-transparent inline-block"
                initial={{ backgroundSize: "100%" }}
                animate={{ backgroundSize: "120%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Supercharge Your <RotatingText />
              </motion.span>
              <br />
              <motion.span
                className="text-white drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                with Industry-Ready Skills
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-medium leading-relaxed mb-6 sm:mb-8 md:mb-10 w-full max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Learn in-demand skills, get mentored by industry experts, and land
              your dream job with our{" "}
              <motion.span
                className="text-orange-400 font-semibold relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                placement-focused
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </motion.span>{" "}
              training programs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.button
                className="group relative w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl 
            shadow-xl hover:shadow-blue-500/25 border-2 border-blue-600 
            transition-all duration-300 ease-in-out overflow-hidden"
                onClick={() => navigate("/Courses")}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    🚀
                  </motion.span>
                  Explore Courses
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </motion.button>

              <motion.button
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 
            bg-white/10 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl 
            border-2 border-white/30 shadow-xl hover:shadow-orange-500/25
            hover:bg-orange-500 hover:border-orange-500
            transition-all duration-300 ease-in-out overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                  Watch Demo
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-6 sm:mt-8 md:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-white/20 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                <div className="flex -space-x-1 sm:-space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="font-medium">10,000+ Students</span>
              </div>

              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.span
                    key={i}
                    className="text-sm sm:text-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + i * 0.1 }}
                  >
                    ⭐
                  </motion.span>
                ))}
                <span className="ml-1 text-gray-300 text-xs sm:text-sm font-medium">
                  4.9/5 Rating
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-medium">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-current rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* STATS SECTION */}
      <section className="relative z-30 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 -mt-4 sm:-mt-8 lg:-mt-16 max-w-full overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {stats.map(({ value, title, delay, img }, index) => (
            <motion.div
              key={index}
              className="text-center p-4 sm:p-6 bg-white shadow-lg sm:shadow-xl rounded-xl sm:rounded-2xl flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src={img}
                  alt={title}
                  className="h-10 sm:h-16 lg:h-20 object-contain"
                />
              </div>
              <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-500 text-transparent bg-clip-text">
                <CountUp end={value} duration={2} separator="," />
                {title.includes("%") || title.includes("Rate") ? "%" : "+"}
              </div>
              <div className="text-xs sm:text-base md:text-lg lg:text-xl font-medium text-blue-900 mt-2 sm:mt-3 leading-tight px-2">
                {title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* USP SECTION */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-900 to-blue-50 max-w-full overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-center mb-8 sm:mb-12 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent leading-tight px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get an Edge in your{" "}
            <span className="font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Dream Career
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {cards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-52 sm:h-64 w-full rounded-lg sm:rounded-xl overflow-hidden bg-blue-50 hover:bg-blue-500 transition-all duration-500 group transform hover:scale-105 shadow-lg sm:shadow-xl shadow-blue-500/20 sm:shadow-blue-500/30"
              >
                {/* FRONT CONTENT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 opacity-100 group-hover:opacity-0 p-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mb-3 sm:mb-4 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-blue-500 text-center leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* BACK CONTENT */}
                <div className="absolute inset-0 flex items-center justify-center text-center p-4 sm:p-6 transition-all duration-500 opacity-0 scale-75 rotate-6 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0">
                  <p className="text-white text-sm sm:text-lg font-semibold leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-white hover:text-orange-500 hover:outline hover:outline-2 hover:outline-orange-500 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-medium">
              Book A Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS/COURSES SECTION */}
      <div className="py-8 sm:py-16 bg-blue-50 space-y-6 sm:space-y-10 px-4 max-w-full overflow-hidden">
        {/* Header */}
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text text-transparent mb-4">
            Explore Our World's{" "}
            <span className="font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Featured Courses
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Check out the most popular courses that are trending right now.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center px-4">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-full">
            <li key="All">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === "All"
                    ? "bg-blue-100 text-blue-800 shadow-md shadow-blue-300"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                All
              </button>
            </li>

            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-800 shadow-md shadow-blue-300"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Course Cards Carousel */}
        <motion.div
          className="max-w-[1440px] mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Slider
            dots={true}
            infinite={false}
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {coursesLoading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading courses...</p>
              </div>
            ) : (
              (selectedCategory === "All"
                ? courses
                : coursesData[selectedCategory]
              )?.map((course, index) => (
              <div key={index} className="p-2 sm:p-4">
                <CourseCard course={course} />
              </div>
            )))}
          </Slider>
        </motion.div>
      </div>

      {/* Instructor Section */}
      <div className="bg-gradient-to-b from-blue-50 to-blue-900 px-4 sm:px-6 py-8 sm:py-12 max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text text-transparent mb-3 sm:mb-4">
            Meet Our Industry{" "}
            <span className="font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <TrainerCard trainers={trainers} />
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="max-w-full overflow-hidden">
        <RoadmapSection />
      </div>

      {/* Platform Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-100 py-8 sm:py-16 px-4 max-w-full overflow-hidden">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text text-transparent mb-6 sm:mb-12 hover:scale-110 transition ease-in-out text-center">
          Platform That <span className="text-orange-500">Support</span> You End
          to End
        </h2>
        <Platform />
      </div>

      {/* Enrollment Section */}
      <section className="py-8 sm:py-16 px-4 bg-gradient-to-b from-blue-100 to-blue-900 max-w-full overflow-hidden">
        <div className="place-items-center text-center gap-4 flex flex-col max-w-6xl mx-auto">
          <div className="bg-blue-800 rounded-full px-4 sm:px-6 py-2 text-white font-semibold shadow-lg shadow-blue-500/50 transition ease-in-out hover:scale-110 text-xs sm:text-base">
            How we Start Journey
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-900 transition ease-in-out hover:scale-110 text-center">
            Start Your Learning Journey Today
          </h1>
          <p className="text-gray-900 text-sm sm:text-lg max-w-2xl transition ease-in-out hover:scale-110 text-center px-4">
            Discover a World of Knowledge and Skills at Your Fingertips – Unlock
            Your Potential and Achieve Your Dreams with Our Comprehensive
            Learning Resources!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto my-6 sm:my-10">
          {[
            {
              icon: <FaUserFriends />,
              title: "Learn with Experts",
              description:
                "Elevate your learning with trusted experts and mentors",
            },
            {
              icon: <FaDesktop />,
              title: "Learn Anything",
              description:
                "Master new skills. Unleash your potential and join our community",
            },
            {
              icon: <FaAward />,
              title: "Get Online Certificate",
              description:
                "Master in Demand Skills with Our Expert-Led Courses",
            },
            {
              icon: <MdEmail />,
              title: "E-mail Marketing",
              description:
                "Grow Your Business with Our Expert Marketing Strategies",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <div className="flex justify-center mb-4 text-4xl sm:text-6xl text-white transition delay-100 duration-300 hover:-translate-y-3 hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-gray-200 text-center text-sm sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="py-6 sm:py-10 px-2">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8 sm:gap-16">
            {/* Instructor Card */}
            <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-xl items-center w-full lg:w-1/2 p-4 sm:p-6 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={student}
                  alt="Instructor"
                  className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 object-cover rounded-lg mx-auto"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  Become an Instructor
                </h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Join our team to inspire students, share your knowledge, and
                  shape the future.
                </p>
                <button className="bg-blue-500 hover:bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-full shadow-md transition-all text-sm sm:text-base">
                  Join Now →
                </button>
              </div>
            </div>

            {/* Student Card */}
            <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-xl items-center w-full lg:w-1/2 p-4 sm:p-6 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={instructor}
                  alt="Students"
                  className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 object-cover rounded-lg mx-auto"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  Become a Student
                </h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Unlock your potential by joining our vibrant learning
                  community.
                </p>
                <button className="bg-blue-500 hover:bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-full shadow-md transition-all text-sm sm:text-base">
                  Join Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col-reverse md:flex-row items-center my-6 sm:my-10 px-4 md:px-10 max-w-full overflow-hidden"
      >
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-blue-500 font-semibold text-center md:text-left w-full md:w-1/2 mb-6 md:mb-0"
        >
          <p className="mb-2 text-base sm:text-lg leading-relaxed">
            If you are wondering <br className="hidden md:block" />
            "Will I be able to do all of this?"
          </p>
          <h2 className="text-orange-500 text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Absolutely yes!
          </h2>
          <p className="text-blue-900 mb-4 text-sm sm:text-base leading-snug">
            Basic high school Mathematics is sufficient to get started smoothly
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-2 px-4 sm:px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg text-sm sm:text-base"
          >
            Request A Demo
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={banner}
            alt="Absolutely Yes"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </motion.div>
      </motion.div>

      {/* Testimonials Section */}
      <div className="text-center bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 p-6 sm:p-10 max-w-full overflow-hidden">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl pb-4 sm:pb-8 font-bold text-white">
          What Our <span className="text-orange-500">Students</span> Say
        </h2>
        <DeckTestimonials />
      </div>

      {/* Blog Section */}
      <div className="max-w-full overflow-hidden">
        <Blog />
      </div>

      {/* Contact Section */}
      <div className="max-w-full overflow-hidden">
        <Contact />
      </div>
    </div>
  );
};

export default Home;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookOpen, Briefcase, Users, Star, ArrowRight } from "lucide-react";
import Tilt from "react-parallax-tilt";
import heroBg from "../assets/herobg/marketherobg.jpeg";
import SpotlightCard from "../components/UI/Spotlight";
import TrainerCard from "../components/Cards/TrainerCard";
import SkilledWorkforce from "../components/Cards/skilledworkfoce";
import DevelopmentTeamsCarousel from "../components/Cards/DevelopmentTeamsCarousel";
import { getTrainers } from "../data/dataservice";
import { Link } from "react-router-dom";

// ✅ All lowercase filenames (recommended for Linux servers)
import G1 from "../assets/usp/portfolio.png";
import G2 from "../assets/usp/skills.png";
import G3 from "../assets/usp/automation.png";

const stats = [
  { value: "95%", title: "Client Satisfaction", delay: 0.1 },
  { value: "180+", title: "Projects Completed", delay: 0.2 },
  { value: "250+", title: "Tech Professionals", delay: 0.3 },
  { value: "4.8", title: "Average Rating", delay: 0.4 },
];

const cards = [
  {
    title: "Why a Good Portfolio Converts More Than an Optimized CV",
    image: G1,
  },
  {
    title: "Skills with Proof of Work Over Regular Degree Program",
    image: G2,
  },
  {
    title: "Why automation is the Future of productivity",
    image: G3,
  },
];

const serviceData = [
  {
    icon: BookOpen,
    title: "Industry Trainers",
    subtitle: "Expert trainers with industry experience",
    points: [
      "Specialized technical training",
      "Customized curriculum",
      "Hands-on workshops",
    ],
    link: "/Industrytrainer",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    subtitle: "Professional developers ready to hire",
    points: [
      "Pre-vetted talent pool",
      "Flexible engagement models",
      "Quick Onboarding process",
    ],
    link: "/SkilledWorkforce",
  },
  {
    icon: Briefcase,
    title: "Full-Stack Teams",
    subtitle: "Complete development teams",
    points: [
      "End-to-end projects delivery",
      "Managed by expert leads",
      "Cross-functional expertise",
    ],
    link: "/FullStackTeams",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechStart India",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    feedback:
      "Working with the team transformed our business completely. Their enterprise solutions are top-notch and delivered on time.",
  },
  {
    name: "Priya Sharma",
    company: "FinEdge Solutions",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    feedback:
      "The professionals at Antechos built our mobile app from scratch. The team was professional, responsive and delivered beyond our expectations.",
  },
];

const Marketplace = () => {
  const [trainers, setTrainers] = useState([]);


  useEffect(() => {
    getTrainers().then((data) => setTrainers(data));

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-indigo-950 overflow-x-hidden w-full">
      {/* Hero Section */}
      <section
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-black/50 to-indigo-950/60 z-0" />

        {/* Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
          
          {/* Hero Content */}
          <motion.div
            className="flex flex-col items-center text-center space-y-8 sm:space-y-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Text Section */}
            <motion.div
              className="w-full max-w-4xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
                Connect with Top Talent to Fuel Your
              </h2>
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-b from-white via-blue-300 to-white bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
                Business <br />
                Growth
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
                Hire skilled professionals, industry trainers, and dedicated dev
                teams for your next big project.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-blue-300 hover:brightness-110 transition-all text-base sm:text-lg shadow-lg"
              >
                Explore Services
              </motion.button>
            </motion.div>

            {/* Trusted Logos */}
            {/* <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <h3 className="text-center text-gray-100 font-semibold text-base sm:text-lg lg:text-xl mb-6 sm:mb-8">
                Trusted by top companies
              </h3>
              <div className="overflow-hidden w-full max-w-4xl mx-auto relative">
                <div className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 flex-wrap">
                  {[
                    "/logos/google.png",
                    "/logos/microsoft.png",
                    "/logos/amazon.png",
                    "/logos/netflix.png",
                  ].map((logo, idx) => (
                    <img
                      key={idx}
                      src={logo}
                      alt={`Logo ${idx}`}
                      className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 flex-shrink-0"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="relative z-10 w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {stats.map(({ value, title, delay }, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text mb-2">
                {value}
              </div>
              <div className="text-sm sm:text-base md:text-lg font-medium text-white">
                {title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Success Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Heading */}
        <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            How We Measure{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            We evaluate our impact by tracking real-world results.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white text-center leading-tight">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marketplace Services Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Tilt
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#93c5fd"
          glarePosition="all"
          transitionSpeed={1500}
          className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 text-white bg-gradient-to-br from-indigo-900/20 to-blue-900/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                Marketplace{" "}
                <span className="font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
                Discover tailored solutions designed to accelerate your project
                success.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {serviceData.map(
                ({ icon: Icon, title, subtitle, points, link }, index) => (
                  <SpotlightCard
                    key={index}
                    spotlightColor="rgba(54, 11, 245, 0.3)"
                  >
                    <div className="flex items-center justify-center mb-4 sm:mb-6 bg-transparent hover:scale-105 transition-transform duration-300">
                      <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
                        <Icon className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white text-center mb-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-6">
                      {subtitle}
                    </p>
                    <ul className="text-left text-gray-300 space-y-2 mb-6 sm:mb-8 text-xs sm:text-sm">
                      {points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <Link to={link}>
                        <button className="text-blue-400 border border-blue-500 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-blue-600 hover:scale-105 hover:text-white transition-all text-sm sm:text-base font-medium">
                          Explore →
                        </button>
                      </Link>
                    </div>
                  </SpotlightCard>
                )
              )}
            </div>
          </div>
        </Tilt>
      </section>

      {/* Featured Professionals Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Featured{" "}
            <span className="font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <TrainerCard trainers={trainers} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Tilt
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#93c5fd"
          glarePosition="all"
          transitionSpeed={1500}
          className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
              >
                {/* Left Content */}
                <motion.div
                  className="w-full lg:w-1/2 text-center lg:text-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-transparent mb-4 lg:mb-6">
                    What Clients Say About Us
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0 mb-4 lg:mb-6">
                    We're proud to have delivered success to dozens of startups
                    and scale-ups.
                  </p>
                  <ul className="text-gray-100 text-sm sm:text-base lg:text-lg space-y-2 lg:space-y-3 text-left max-w-md mx-auto lg:mx-0">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Real-world results, not fluff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Dedicated talent with proof of work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>End-to-end support across your growth journey</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Right Side: Testimonial cards */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6 sm:space-y-8">
                    {testimonials.map((t, index) => (
                      <motion.div
                        key={index}
                        className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-left border border-blue-400/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:border-blue-400/30"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                      >
                        {/* Content */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">{t.name}</h4>
                            <p className="text-gray-400 text-xs sm:text-sm">{t.company}</p>
                          </div>
                        </div>

                        <div className="text-yellow-400 mb-3 sm:mb-4 flex">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill="currentColor"
                              strokeWidth={0}
                            />
                          ))}
                        </div>

                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          "{t.feedback}"
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Tilt>
      </section>

      {/* Industry Trainers Section
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Meet our Skilled{" "}
            <span className="font-bold bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text text-transparent">
              Workforce
            </span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <SkilledWorkforce workforceData={workforceData} />
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Tilt
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#93c5fd"
          glarePosition="all"
          transitionSpeed={1500}
          className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 text-white bg-gradient-to-br from-indigo-900/20 to-blue-900/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Images */}
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <motion.img
                    src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238"
                    alt="Mentor 1"
                    className="rounded-lg sm:rounded-xl object-cover aspect-square shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    loading="lazy"
                  />
                  <motion.img
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                    alt="Mentor 2"
                    className="rounded-lg sm:rounded-xl object-cover aspect-square shadow-xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    loading="lazy"
                  />
                  <motion.img
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                    alt="Mentor 3"
                    className="rounded-lg sm:rounded-xl object-cover aspect-[2/1] shadow-xl col-span-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-blue-800/20 text-blue-300 text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-full tracking-wide uppercase">
                    Why Choose Us
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mt-4 sm:mt-6 leading-tight text-white">
                    Top Industry Experts Teaching You Professionally
                  </h2>
                  <p className="text-gray-300 mt-4 sm:mt-6 leading-relaxed text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0">
                    Explore high-quality courses led by globally renowned
                    professionals. Whether you're starting your career or
                    upskilling, our platform brings you trusted knowledge at your
                    fingertips.
                  </p>

                  {/* Features */}
                  <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0">
                    {[
                      "Top-Rated Global Instructors",
                      "Interactive Learning from Anywhere",
                      "Affordable Course Pricing & Flexibility",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-left">
                        <span className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-sm sm:text-base text-gray-100">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 text-white font-semibold text-sm sm:text-base mx-auto lg:mx-0 shadow-lg hover:shadow-xl">
                    More Info <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </Tilt>
      </section>

      {/* Development Teams Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Development{" "}
            <span className="font-bold bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text text-transparent">
              Teams
            </span>
          </h2>
        </div>
        <div className="w-full">
          <DevelopmentTeamsCarousel />
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
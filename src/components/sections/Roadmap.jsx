import React, { useState } from "react";
import { ChevronRight, BookOpen, Clock, Globe, Code, List, Layers, User, Star, ArrowRight, Play, CheckCircle } from "lucide-react";

// Import all images using relative paths
import webdevImg from "../../assets/roadmap/webdev.png";
import projectsImg from "../../assets/roadmap/projects.png";
import carrerImg from "../../assets/roadmap/carrer.png";
import fullstackImg from "../../assets/roadmap/fullstack.png";
import optimizeprofileImg from "../../assets/roadmap/optimizeprofile.png";
import placementImg from "../../assets/roadmap/placement.png";
import resumeImg from "../../assets/roadmap/resume.png";
import developerbrandImg from "../../assets/roadmap/developerbrand.png";
import jobreadyImg from "../../assets/roadmap/jobready.png";
import roadmap3monthsImg from "../../assets/roadmap/3months.jpg";
import roadmap6monthsImg from "../../assets/roadmap/6months.jpg";
import roadmap9monthsImg from "../../assets/roadmap/9months.jpg";
import illustrationImg from "../../assets/illustrations/I-1.png";

const stepData = {
  "3months": [
    {
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Web Development Foundation",
      duration: "4 weeks",
      description: "Learn the basics of HTML, CSS, and JavaScript to build responsive websites.",
      image: webdevImg,
      list: [
        "HTML & CSS Fundamentals",
        "Basic JavaScript (Variables, Loops, Functions)",
        "Responsive Web Design",
        "Git & GitHub for Version Control",
        "Accessibility & Semantic HTML",
        "Deploying on Netlify/Vercel"
      ],
    },
    {
      icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Build Mini Projects",
      duration: "4 weeks",
      description: "Apply your knowledge by building real-world mini projects.",
      image: projectsImg,
      list: [
        "Landing Page with HTML & CSS",
        "To-do List using JavaScript",
        "Portfolio Website",
        "Weather App using APIs",
        "Project Deployment"
      ],
    },
    {
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Career Readiness with IRC",
      duration: "4 weeks",
      description: "Prepare for your job with career services, mock interviews, and more.",
      image: carrerImg,
      list: [
        "Resume Building",
        "Mock Interviews",
        "Soft Skills & Communication",
        "LinkedIn Optimization",
        "Apply to 10+ Jobs Weekly"
      ],
    },
  ],
  "6months": [
    {
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Learn Programming Fundamentals",
      duration: "12 weeks",
      description: "Master JavaScript, problem-solving, and DOM manipulation.",
      image: webdevImg,
      list: [
        "JavaScript Advanced Topics (ES6+)",
        "DOM Manipulation",
        "Asynchronous JavaScript (Promises, async/await)",
        "Debugging & Browser Dev Tools",
        "Basic DSA (Array, Object, String)"
      ],
    },
    {
      icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Full Stack Development",
      duration: "12 weeks",
      description: "Dive into MERN stack and build dynamic full stack apps.",
      image: fullstackImg,
      backImage: illustrationImg,
      list: [
        "React.js Fundamentals",
        "Express.js + Node.js Basics",
        "MongoDB CRUD",
        "Authentication (JWT)",
        "REST API Creation",
        "Hosting on Render/Vercel"
      ],
    },
    {
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Optimize Your Profile",
      duration: "4 weeks",
      description: "Polish your GitHub, LinkedIn, and resume for hiring managers.",
      image: optimizeprofileImg,
      list: [
        "GitHub Project Readmes",
        "Technical Resume Writing",
        "LinkedIn Posts & Networking",
        "Project Portfolio Creation"
      ],
    },
    {
      icon: <Star className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Build Real-World Projects",
      duration: "4 weeks",
      description: "Work in teams and build scalable applications with clean architecture.",
      image: projectsImg,
      list: [
        "E-Commerce Web App",
        "Blog CMS System",
        "Team Collaboration on Git",
        "Agile Task Management"
      ],
    },
    {
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Crack 12 LPA Jobs with IRC",
      duration: "4 weeks",
      description: "Focus on DSA, advanced system design, and mock interviews.",
      image: placementImg,
      list: [
        "DSA Practice (LeetCode, CodeStudio)",
        "System Design Basics",
        "Mock Technical Interviews",
        "HR Interview Readiness"
      ],
    },
  ],
  "9months": [
    {
      icon: <Code className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Master Web & Programming",
      duration: "12 weeks",
      description: "Deep dive into JS, React, and backend technologies.",
      image: webdevImg,
      list: [
        "Advanced JavaScript & React",
        "Tailwind/Bootstrap UI Libraries",
        "API Integration & Testing",
        "Node.js & Express Backend"
      ],
    },
    {
      icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Full Stack & DevOps",
      duration: "12 weeks",
      description: "Build end-to-end web apps and learn CI/CD basics.",
      image: fullstackImg,
      list: [
        "MERN Stack Mastery",
        "Cloud Deployment (VPS, Docker Basics)",
        "CI/CD with GitHub Actions",
        "Project Hosting & Monitoring"
      ],
    },
    {
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Build a Strong Developer Brand",
      duration: "4 weeks",
      description: "Establish your credibility with a strong digital presence.",
      image: resumeImg,
      list: [
        "Top 3 GitHub Projects",
        "LinkedIn Tech Blogging",
        "Technical Resume",
        "Networking Events/Webinars"
      ],
    },
    {
      icon: <Star className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Specialize in Tech 4.0",
      duration: "4 weeks",
      description: "Pick a niche: AI, Blockchain, Cloud, or Cybersecurity.",
      image: developerbrandImg,
      list: [
        "Choose one specialization",
        "Complete mini-course/certification",
        "Build a domain project"
      ],
    },
    {
      icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Launch Real-World Capstone",
      duration: "4 weeks",
      description: "Create a scalable project that reflects your specialization.",
      image: carrerImg,
      list: [
        "Project Planning",
        "Team Collaboration",
        "End-to-End Feature Integration",
        "Presentation & Deployment"
      ],
    },
    {
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Job-Ready with IRC",
      duration: "4 weeks",
      description: "Land your dream job with final placement support.",
      image: jobreadyImg,
      list: [
        "DSA & System Design Interviews",
        "Behavioral + HR Interviews",
        "Referrals & Job Applications",
        "IRC Final Placement Drive"
      ],
    },
  ],
};

const roadmapImages = {
  "3months": roadmap3monthsImg,
  "6months": roadmap6monthsImg,
  "9months": roadmap9monthsImg,
};

const RoadmapSection = () => {
  const [selected, setSelected] = useState("3months");
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const steps = stepData[selected] || [];
  const activeStep = steps[selectedStepIndex] || {};
  const roadmapOptions = ["3months", "6months", "9months"];

  const getOptionLabel = (key) => {
    switch (key) {
      case "3months": return "3 Months";
      case "6months": return "6 Months";
      case "9months": return "9 Months";
      default: return key;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-600 bg-clip-text text-transparent">
              Elevate Your Career Journey
            </span>
            <br />
            <span className="text-lg sm:text-xl lg:text-2xl font-normal text-slate-600 mt-2 block">
              with <span className="text-orange-500 font-bold">Antechos</span> Structured Learning Path
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Duration Selector */}
        <div className="flex justify-center mb-8 lg:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/50">
            <div className="flex">
              {roadmapOptions.map((key, idx) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelected(key);
                    setSelectedStepIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden ${
                    selected === key
                      ? "text-white shadow-lg"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  {selected === key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl"></div>
                  )}
                  <span className="relative z-10">{getOptionLabel(key)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Steps Navigation - Mobile Horizontal Scroll */}
        <div className="mb-8 lg:mb-12">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide lg:justify-center lg:flex-wrap lg:overflow-visible lg:pb-0">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setSelectedStepIndex(index);
                    setIsFlipped(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 min-w-[140px] sm:min-w-[160px] lg:min-w-[180px] group ${
                    index === selectedStepIndex
                      ? "bg-white shadow-xl scale-105 border-2 border-orange-200"
                      : "bg-white/60 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    index === selectedStepIndex
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                      : "bg-slate-100 text-slate-600 group-hover:bg-orange-100 group-hover:text-orange-600"
                  }`}>
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500">{step.duration}</p>
                  </div>
                </button>
                {index !== steps.length - 1 && (
                  <ChevronRight className="text-orange-400 w-5 h-5 hidden lg:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card with Full Flip */}
        <div 
          className="cursor-pointer"
          style={{ perspective: '1500px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div 
            className={`relative w-full transition-transform duration-800 preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Side - Original Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden backface-hidden">
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl">
                        {activeStep?.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                          {activeStep?.title}
                        </h2>
                        <div className="flex items-center gap-2 text-orange-600 font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{activeStep?.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed">
                      {activeStep?.description}
                    </p>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <List className="w-5 h-5 text-orange-500" />
                        What You'll Learn
                      </h3>
                      <div className="grid gap-2">
                        {activeStep?.list?.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      <Play className="w-4 h-4" />
                      Start Learning Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Section */}
                  <div className="lg:w-1/2">
                    <div className="relative group h-64 sm:h-80 lg:h-96">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-xl p-4">
                        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl overflow-hidden flex items-center justify-center">
                          <img
                            src={activeStep?.image}
                            alt={activeStep?.title || "Learning illustration"}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-6 sm:px-8 lg:px-12 pb-6 sm:pb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">
                    Step {selectedStepIndex + 1} of {steps.length}
                  </span>
                  <span className="text-sm font-medium text-slate-600">
                    {Math.round(((selectedStepIndex + 1) / steps.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((selectedStepIndex + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Flip Indicator */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-medium text-slate-600 hidden sm:inline">Click to view full roadmap</span>
                </div>
              </div>
            </div>

            {/* Back Side - Full Roadmap */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden backface-hidden rotate-y-180">
              <div className="p-6 sm:p-8 lg:p-12 h-full flex flex-col">
                <div className="text-center mb-6">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent mb-2">
                    Complete {getOptionLabel(selected)} Roadmap
                  </h2>
                  <p className="text-slate-600">Your comprehensive learning journey overview</p>
                </div>
                
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden">
                  <img
                    src={roadmapImages[selected]}
                    alt={`Complete roadmap for ${getOptionLabel(selected)}`}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Back Flip Indicator */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-orange-500 rotate-180" />
                  <span className="text-xs font-medium text-slate-600 hidden sm:inline">Click to go back</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setSelectedStepIndex(Math.max(0, selectedStepIndex - 1))}
            disabled={selectedStepIndex === 0}
            className="px-6 py-3 bg-white text-slate-600 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Previous Step
          </button>
          <button
            onClick={() => setSelectedStepIndex(Math.min(steps.length - 1, selectedStepIndex + 1))}
            disabled={selectedStepIndex === steps.length - 1}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;
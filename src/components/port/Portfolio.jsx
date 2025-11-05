import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Trophy, Star, TrendingUp, Users, Target, Briefcase, GraduationCap, Award, Zap, Globe, Calendar, ArrowRight, Download, Menu, X, ExternalLink } from 'lucide-react';
import Profile from '../../assets/Leaders/vishwajeet.jpg';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'about', 'experience', 'skills', 'education', 'achievements', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sections[index]);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    setMobileMenuOpen(false);
  };

  const experiences = [
    {
      period: "2024/03 – 2024/08",
      role: "Sr. Business Development Associate",
      company: "Counsel India",
      location: "Noida, India",
      revenue: "25+ lakhs",
      details: "Revenue Generated: 25+ lakhs in 6 months reaching network of 32 learners, generating additional 12+ lakhs in revenue from team",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30"
    },
    {
      period: "2023/09 – 2024/03", 
      role: "Sr. Business Development Associate",
      company: "Univo Edtech",
      location: "Noida, India",
      revenue: "26+ lakhs",
      details: "Generated 26+ lakhs of revenue from team helping them in closing sales from Maharashtra region",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30"
    },
    {
      period: "2022/06 – 2023/09",
      role: "Business Development Team Lead",
      company: "Byjus The Learning App",
      location: "Noida, India", 
      revenue: "87.6 lakhs",
      details: "Revenue Generated Individually: 87.6 Lakhs in one year on-boarding 93+ Students, handling team of 5 generating revenue of 32.3 Lakhs onboarding 43+ students",
      gradient: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30"
    },
    {
      period: "2021/08 – 2022/01",
      role: "Investment Advisor", 
      company: "S.M. Global (Trade More FX)",
      location: "Sangli, India",
      revenue: "38+ lakhs",
      details: "Revenue Generated: 38+ lakhs in 5 months reaching network of 11 Clients",
      gradient: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30"
    }
  ];

  const skills = [
    { name: "Critical Thinking", level: 95, icon: "🧠", color: "from-blue-400 to-blue-600" },
    { name: "Leadership", level: 92, icon: "👑", color: "from-purple-400 to-purple-600" },
    { name: "Team Management", level: 90, icon: "👥", color: "from-emerald-400 to-emerald-600" },
    { name: "Problem Solving", level: 88, icon: "🔧", color: "from-orange-400 to-orange-600" },
    { name: "Communication", level: 94, icon: "💬", color: "from-cyan-400 to-cyan-600" },
    { name: "Time Management", level: 85, icon: "⏰", color: "from-pink-400 to-pink-600" }
  ];

  const achievements = [
    { year: "2020", title: "Basketball Champions Trophy", org: "Vishwaniketan's iMEET", icon: "🏀" },
    { year: "2019-2020", title: "Best Captain Trophy", org: "Sports Committee", icon: "🏆" },
    { year: "2017", title: "Silver Medal Taekwondo", org: "Maharashtra Sports Board", icon: "🥈" },
    { year: "2016", title: "State Level Football Trophy", org: "Maharashtra Sports Board", icon: "⚽" },
    { year: "2015-2016", title: "Cluster Level Gold Medal", org: "Maharashtra Sports Board", icon: "🥇" }
  ];

  const FloatingParticle = ({ delay = 0 }) => (
    <div 
      className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${4 + Math.random() * 3}s`
      }}
    />
  );

  const ProfessionalCard = ({ children, className = "", delay = 0 }) => (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] hover:border-blue-500/30 group ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease, box-shadow 0.5s ease'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  );

  const AnimatedCounter = ({ end, suffix = "", duration = 2500 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isLoaded) return;
      
      let startTime;
      let animationFrame;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isLoaded]);
    
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Enhanced Background with smoother animations */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.15),transparent_50%)]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} />
        ))}
        
        {/* Interactive Glow with smoother movement */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-60 transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x / 15,
            top: mousePosition.y / 15,
            transform: `translate(-50%, -50%) scale(${1 + scrollY / 8000})`,
            transition: 'left 0.5s cubic-bezier(0.16, 1, 0.3, 1), top 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      {/* Sleek Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-gray-950/80 border-b border-gray-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              Vishwajeet Shinde
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'About', id: 'about' },
                { name: 'Experience', id: 'experience' },
                { name: 'Skills', id: 'skills' },
                { name: 'Education', id: 'education' },
                { name: 'Awards', id: 'achievements' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item.id 
                      ? 'text-blue-400' 
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 ease-out ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-blue-400 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-4 pb-2 border-t border-gray-800/50 mt-4">
              <div className="flex flex-col space-y-3">
                {[
                  { name: 'Home', id: 'hero' },
                  { name: 'About', id: 'about' },
                  { name: 'Experience', id: 'experience' },
                  { name: 'Skills', id: 'skills' },
                  { name: 'Education', id: 'education' },
                  { name: 'Awards', id: 'achievements' },
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.id ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Profile Image */}
          <div className="mb-12 transition-all duration-700 ease-out hover:scale-105">
            <div className="w-56 h-56 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 mb-8 relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin-slow opacity-75" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                <img 
                  src={Profile} 
                  alt="Vishwajeet Shinde" 
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>
          
          {/* Name */}
          <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Vishwajeet
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Shinde
              </span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl mb-4 text-gray-400 font-light">
              Senior Business Development Associate
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Driving revenue growth through strategic partnerships and innovative business solutions
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className={`flex flex-wrap justify-center gap-6 mb-12 transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ProfessionalCard className="px-8 py-4" delay={100}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-emerald-400">₹<AnimatedCounter end={217} />+</div>
                  <div className="text-sm text-gray-400">Lakhs Revenue</div>
                </div>
              </div>
            </ProfessionalCard>
            
            <ProfessionalCard className="px-8 py-4" delay={200}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-blue-400"><AnimatedCounter end={180} />+</div>
                  <div className="text-sm text-gray-400">Students Onboarded</div>
                </div>
              </div>
            </ProfessionalCard>
            
            <ProfessionalCard className="px-8 py-4" delay={300}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-purple-400">Team</div>
                  <div className="text-sm text-gray-400">Leadership Expert</div>
                </div>
              </div>
            </ProfessionalCard>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 ease-out delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download CV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </button>
            
            <button 
              onClick={() => scrollToSection('about')}
              className="px-8 py-4 border border-gray-600 rounded-full font-semibold transition-all duration-300 ease-out hover:bg-gray-800/50 hover:border-blue-400 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
            >
              View Portfolio
            </button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="mt-20 cursor-pointer transition-all duration-300 ease-out hover:scale-110" 
            onClick={() => scrollToSection('about')}
          >
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Summary
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full transition-all duration-500" />
          </div>
          
          <ProfessionalCard className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl leading-relaxed text-gray-300 mb-12">
                Results-driven professional with a proven track record in business development, including extensive experience as a Business 
                Development Executive and Team Lead. Specialized in driving revenue growth through strategic client acquisition, 
                partnership development, and innovative sales strategies with a focus on EdTech and financial services sectors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ease-out group-hover:scale-110 border border-blue-500/20">
                    <Mail className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Email</h3>
                  <p className="text-blue-400 font-medium transition-colors duration-300 group-hover:text-blue-300">5vishu5shinde6@gmail.com</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ease-out group-hover:scale-110 border border-emerald-500/20">
                    <Phone className="w-8 h-8 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Phone</h3>
                  <p className="text-emerald-400 font-medium transition-colors duration-300 group-hover:text-emerald-300">+91 9325581803</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ease-out group-hover:scale-110 border border-purple-500/20">
                    <MapPin className="w-8 h-8 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Location</h3>
                  <p className="text-purple-400 font-medium transition-colors duration-300 group-hover:text-purple-300">Delhi, India</p>
                </div>
              </div>
            </div>
          </ProfessionalCard>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full transition-all duration-500" />
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ProfessionalCard key={index} className={`p-8 ${exp.border}`} delay={index * 100}>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${exp.gradient} border ${exp.border} rounded-xl text-sm font-medium mb-4 transition-all duration-300 hover:scale-105`}>
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                      {exp.location}
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 bg-emerald-500/20 rounded-lg mr-3 transition-transform duration-300 group-hover:scale-110">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-emerald-400 font-bold text-lg">₹{exp.revenue}</div>
                        <div className="text-xs text-gray-500">Revenue Generated</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <h3 className="text-2xl font-bold mb-2 text-white transition-colors duration-300 group-hover:text-blue-300">{exp.role}</h3>
                    <p className="text-blue-400 text-lg font-semibold mb-4 flex items-center transition-colors duration-300 group-hover:text-blue-300">
                      {exp.company}
                      <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:scale-110" />
                    </p>
                    <p className="text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">{exp.details}</p>
                  </div>
                </div>
              </ProfessionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Core Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full transition-all duration-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <ProfessionalCard key={index} className="p-6" delay={index * 100}>
                <div className="flex items-center gap-4">
                  <div className="text-3xl transition-transform duration-300 group-hover:scale-110">{skill.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">{skill.name}</span>
                      <span className="text-blue-400 font-medium transition-colors duration-300 group-hover:text-blue-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: isLoaded ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 200}ms`,
                          transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ProfessionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full transition-all duration-500" />
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <ProfessionalCard className="p-8 border-blue-500/20">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-blue-300">M.B.A Business Analytics</h3>
                  <p className="text-blue-400 font-medium mb-2 transition-colors duration-300 group-hover:text-blue-300">Amity University Online</p>
                  <div className="flex items-center text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    2023 - Present
                    <MapPin className="w-4 h-4 ml-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    NOIDA, India
                  </div>
                </div>
              </div>
            </ProfessionalCard>
            
            <ProfessionalCard className="p-8 border-emerald-500/20">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-emerald-300">B.E. E.X.T.C</h3>
                  <p className="text-emerald-400 font-medium mb-2 transition-colors duration-300 group-hover:text-emerald-300">Vishwaniketan's IMEET</p>
                  <div className="flex items-center text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    2021
                    <MapPin className="w-4 h-4 ml-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Mumbai, India
                  </div>
                </div>
              </div>
            </ProfessionalCard>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
              Awards & Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-400 mx-auto rounded-full transition-all duration-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <ProfessionalCard key={index} className="p-6 text-center transition-all duration-500 ease-out hover:scale-105" delay={index * 100}>
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{achievement.icon}</div>
                <div className="text-yellow-400 font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-yellow-300">{achievement.year}</div>
                <h3 className="text-lg font-bold mb-3 text-white transition-colors duration-300 group-hover:text-blue-300">{achievement.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-300">{achievement.org}</p>
              </ProfessionalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8 transition-all duration-500" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to drive your business growth? Let's discuss opportunities and explore how we can work together.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:5vishu5shinde6@gmail.com"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                Email Me
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </a>
            
            <a 
              href="tel:+919325581803"
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-semibold overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                Call Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/shindevishwajeet?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full font-semibold overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-700/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                LinkedIn
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </a>
          </div>

          {/* Additional Contact Info */}
          <ProfessionalCard className="mt-12 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center group">
                <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30 w-fit mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Globe className="w-6 h-6 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-blue-300">Professional Network</h3>
                <p className="text-gray-400 text-sm transition-colors duration-300 group-hover:text-gray-300">
                  Available for business consultations, partnership discussions, and team leadership opportunities
                </p>
              </div>
              
              <div className="text-center group">
                <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30 w-fit mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Target className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-purple-300">Expertise Areas</h3>
                <p className="text-gray-400 text-sm transition-colors duration-300 group-hover:text-gray-300">
                  Business Development, Team Management, Strategic Planning, Revenue Growth
                </p>
              </div>
            </div>
          </ProfessionalCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50 relative z-10 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 transition-all duration-300 hover:scale-105">
              Vishwajeet Shinde
            </div>
            <p className="text-gray-500 text-sm transition-colors duration-300 hover:text-gray-400">Senior Business Development Associate</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="mailto:5vishu5shinde6@gmail.com" 
              className="text-gray-400 transition-all duration-300 hover:text-blue-400 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="tel:+919325581803" 
              className="text-gray-400 transition-all duration-300 hover:text-emerald-400 hover:scale-110"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/shindevishwajeet?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-all duration-300 hover:text-blue-400 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-gray-500 text-sm transition-colors duration-300 hover:text-gray-400">
            <p>&copy; 2024 Vishwajeet Shinde. Crafted with passion for excellence.</p>
            <p className="mt-2">Transforming businesses through strategic development and innovative solutions.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
            opacity: 0.6;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        /* Performance optimizations */
        * {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .transform {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
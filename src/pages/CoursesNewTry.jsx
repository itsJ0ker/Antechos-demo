import React, { useState, useEffect, useRef } from 'react';

const programData = [
  {
    id: 1,
    title: "Investment Banking",
    category: "Finance",
    duration: "9 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 18v-7"></path><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"></path><path d="M14 18v-7"></path><path d="M18 18v-7"></path><path d="M3 22h18"></path><path d="M6 18v-7"></path></svg>,
    details: { tags: ["Finance", "NSDC"], heading: "Investment Banking", subheading: "Master Financial Modeling", desc: "Comprehensive program covering M&A, LBOs, and advanced Excel modeling. Prepare for top-tier IB roles.", cert: "Industry Partner", mode: "Live Online", learn: ["Financial modeling & corporate valuation", "M&A, LBO, and IPO processes", "1:1 mentorship from IB professionals"], skills: ["Excel", "Financial Modeling", "Valuation", "M&A"], price: "₹1,50,000", originalPrice: "₹1,80,000" }
  },
  {
    id: 2,
    title: "Business Analytics",
    category: "Management",
    duration: "6 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
    details: { tags: ["Management", "Microsoft"], heading: "Business Analytics", subheading: "Drive Decisions with Data", desc: "Learn to translate data into strategic insights. Master tools like SQL, Tableau, and Excel to solve complex business problems.", cert: "Microsoft", mode: "Live Online", learn: ["Data visualization and dashboarding", "Statistical analysis and hypothesis testing", "Real-world business case studies"], skills: ["SQL", "Tableau", "Excel", "Statistics"], price: "₹1,20,000", originalPrice: "₹1,50,000" }
  },
  {
    id: 3,
    title: "Data Analytics",
    category: "Management",
    duration: "6 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>,
    details: { tags: ["Management", "NSDC"], heading: "Data Analytics", subheading: "Master Data Analysis Tools", desc: "Deep dive into data manipulation and analysis. Get hands-on experience with modern data stacks and visualization tools.", cert: "Microsoft", mode: "Live Online", learn: ["Advanced data manipulation techniques", "Building scalable data pipelines", "Interactive dashboard creation"], skills: ["Python", "SQL", "PowerBI", "Tableau"], price: "₹1,20,000", originalPrice: "₹1,50,000" }
  },
  {
    id: 4,
    title: "Data Science AI/ML with Agentic AI",
    category: "Data & AI",
    duration: "9 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M9 13a4.5 4.5 0 0 0 3-4"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M16 8V5a2 2 0 0 1 2-2"></path><circle cx="16" cy="13" r=".5"></circle><circle cx="18" cy="3" r=".5"></circle><circle cx="20" cy="21" r=".5"></circle><circle cx="20" cy="8" r=".5"></circle></svg>,
    details: { tags: ["Data & AI", "Microsoft", "NSDC"], heading: "Data Science AI/ML with Agentic AI", subheading: "Master AI, ML & Agentic AI Systems", desc: "The most comprehensive Data Science program combining traditional ML with the latest Agentic AI frameworks. Build production-ready AI systems used by Fortune 500 companies.", cert: "Microsoft", mode: "Live Online", learn: ["Python, ML, Deep Learning & Agentic AI frameworks", "Real datasets from industry partners", "1:1 mentorship from data scientists at top AI companies"], skills: ["Python", "Machine Learning", "Deep Learning", "Agentic AI", "LLMs"], price: "₹2,10,000", originalPrice: "₹2,40,000", isNew: true }
  },
  {
    id: 5,
    title: "CyberSecurity",
    category: "Security",
    duration: "8 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>,
    details: { tags: ["Security", "Cisco"], heading: "CyberSecurity", subheading: "Protect Digital Infrastructure", desc: "Learn ethical hacking, network security, and threat mitigation. Prepare for top certifications and secure critical systems.", cert: "Cisco", mode: "Live Online", learn: ["Network penetration testing", "Vulnerability assessment", "Incident response & forensics"], skills: ["Ethical Hacking", "Networking", "Linux", "Security+"], price: "₹1,80,000", originalPrice: "₹2,10,000" }
  },
  {
    id: 6,
    title: "Backend Development Engineering",
    category: "Engineering",
    duration: "9 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>,
    details: { tags: ["Engineering", "NSDC"], heading: "Backend Development Engineering", subheading: "Build Scalable Architectures", desc: "Master server-side programming, databases, and API development. Build robust backends for modern web applications.", cert: "Industry Partner", mode: "Live Online", learn: ["Advanced Node.js & system design", "Microservices architecture", "Cloud deployment on AWS/Azure"], skills: ["Node.js", "Express", "MongoDB", "AWS", "System Design"], price: "₹1,90,000", originalPrice: "₹2,20,000" }
  },
  {
    id: 7,
    title: "Data Engineering with Agentic & Gen AI",
    category: "Data & AI",
    duration: "7 Months",
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 15 21.84"></path><path d="M21 5V8"></path><path d="M21 12L18 17H22L19 22"></path><path d="M3 12A9 3 0 0 0 14.59 14.87"></path></svg>,
    details: { tags: ["Data & AI", "Microsoft"], heading: "Data Engineering with Agentic & Gen AI", subheading: "Modern Data Stacks & Pipelines", desc: "Design and manage massive data pipelines powered by Gen AI. Become an expert in Big Data technologies.", cert: "Microsoft", mode: "Live Online", learn: ["Building scalable ETL pipelines", "Apache Spark & Hadoop ecosystems", "Integrating Gen AI in data workflows"], skills: ["Python", "SQL", "Spark", "Airflow", "Cloud Platforms"], price: "₹2,00,000", originalPrice: "₹2,30,000" }
  }
];

const faqData = [
  {
    category: "Program Overview",
    questions: [
      {
        q: "Who is this program designed for?",
        a: "Our programs are designed for fresh graduates, early-career professionals, and anyone looking to transition into the tech industry. Whether you're starting from scratch or upskilling, we have tailored learning paths for you."
      },
      {
        q: "What makes Antechos India different from other online courses?",
        a: "We focus on outcome-based learning with a 100% placement guarantee, hands-on industry projects, and 1-on-1 expert mentorship rather than just recorded videos."
      },
      {
        q: "Do I need prior coding experience to enroll?",
        a: "No prior coding experience is required for most of our foundational programs. We start from the basics and gradually build up to advanced concepts."
      },
      {
        q: "Can I take the program while working full-time?",
        a: "Yes, our programs offer flexible learning schedules. You can learn at your own pace with recorded sessions and attend live doubt-clearing classes on weekends."
      },
      {
        q: "What programs does Antechos India offer?",
        a: "We offer programs in Data Science, Artificial Intelligence, Software Engineering, Cyber Security, Business Analytics, and more."
      },
      {
        q: "How long are the programs?",
        a: "Most programs range from 6 to 9 months, depending on the specialization and the pace of learning you choose."
      },
      {
        q: "Is there an age limit or eligibility criteria?",
        a: "There is no strict age limit. Anyone with a passion for learning and a basic educational background (10+2 or equivalent) can apply."
      }
    ]
  },
  {
    category: "Curriculum & Learning",
    questions: [
      {
        q: "How is the curriculum structured?",
        a: "The curriculum is carefully divided into progressive modules. You'll start with programming fundamentals and move towards advanced concepts and real-world projects."
      },
      {
        q: "Are the classes live or recorded?",
        a: "We use a blended learning approach. You get access to high-quality recorded sessions for self-paced learning, along with regular live interactive sessions with mentors."
      }
    ]
  },
  {
    category: "Mentorship & Support",
    questions: [
      {
        q: "How does the mentorship program work?",
        a: "Every student is assigned a dedicated industry mentor. You can schedule 1-on-1 sessions to clear doubts, discuss career paths, and get feedback on your projects."
      },
      {
        q: "What kind of support is available if I get stuck?",
        a: "We offer 24/7 technical support through our community channels, teaching assistants, and dedicated doubt-clearing sessions."
      }
    ]
  },
  {
    category: "Career & Placements",
    questions: [
      {
        q: "What does the 100% placement guarantee mean?",
        a: "We are committed to your success. If you complete all modules, projects, and career prep milestones, we guarantee placement assistance until you secure a job."
      },
      {
        q: "Do you help with resume building and interviews?",
        a: "Yes, our dedicated career services team will help you optimize your resume, build a strong portfolio, and conduct mock interviews."
      }
    ]
  },
  {
    category: "Payments & Policies",
    questions: [
      {
        q: "Do you offer EMIs or financial assistance?",
        a: "Yes, we provide flexible EMI options and have partnerships with financial institutions to make our programs accessible to everyone."
      },
      {
        q: "What is your refund policy?",
        a: "We offer a 7-day money-back guarantee. If you're not satisfied with the program within the first week, you can request a full refund."
      }
    ]
  }
];

const faqCategories = [
  {
    name: "Program Overview",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers flex-shrink-0" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></svg>
    )
  },
  {
    name: "Curriculum & Learning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open flex-shrink-0" aria-hidden="true"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
    )
  },
  {
    name: "Mentorship & Support",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users flex-shrink-0" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
    )
  },
  {
    name: "Career & Placements",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase flex-shrink-0" aria-hidden="true"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
    )
  },
  {
    name: "Payments & Policies",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text flex-shrink-0" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
    )
  }
];

const ParticleNetworkAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(198, 255, 221, 0.6)';
        ctx.fill();
      }
    }
    
    // Create particles based on screen width
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(198, 255, 221, ${(1 - distance / 120) * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

const CoursesNewTry = () => {
  const [activeProgramIndex, setActiveProgramIndex] = useState(3);
  const activeProgram = programData[activeProgramIndex];
  const [isSimplifiedView, setIsSimplifiedView] = useState(true);
  
  const [activeFaqCategory, setActiveFaqCategory] = useState("Program Overview");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveFaqCategory(category);
    setOpenFaqIndex(null);
  };
  
  const activeFaqs = faqData.find(d => d.category === activeFaqCategory)?.questions || [];
  
  return (
    <div className="pt-24 pb-12 bg-gradient-to-br from-[#F3F6FB] via-[#EAF1FF] to-[#C6FFDD]/20 min-h-screen">
      <div className="px-5 lg:px-10 xl:px-16">
        <div className="relative max-w-[1400px] mx-auto rounded-3xl overflow-hidden" style={{ boxShadow: 'rgba(37, 61, 105, 0.25) 0px 25px 60px -12px, rgba(37, 61, 105, 0.15) 0px 12px 25px -8px, rgba(0, 0, 0, 0.08) 0px 4px 10px -4px' }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ opacity: 1, transform: 'none' }}>
              <img 
                alt="Professional advancing their career" 
                decoding="async" 
                className="object-cover object-[center_30%] sm:object-[65%_center]" 
                sizes="100vw" 
                src="/courses/A9D62AD8-107E-45A4-9B81-83FF7281F255.jpg" 
                style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }} 
              />
            </div>
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#1a2b4c] via-[#1a2b4c]/80 to-transparent"></div>
          <div className="relative z-10 px-10 lg:px-14 xl:px-16 py-20 lg:py-24">
            <div className="max-w-xl lg:max-w-[55%]">
              <div className="text-center md:text-left">
                <div>
                  <span className="inline-block bg-white/[0.12] backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-5 border border-white/20">
                    #1 Choice for Working Professionals
                  </span>
                </div>
                <h1 className="text-[1.75rem] sm:text-[2.5rem] md:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.13] sm:leading-[1.08] mb-5" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                  <span className="inline-block mr-[0.3em]">Advance</span>
                  <span className="inline-block mr-[0.3em]">Your</span>
                  <span className="inline-block mr-[0.3em]">Career</span>
                  <span className="inline-block mr-[0.3em]">with</span>
                  <span className="inline-block mr-[0.3em]">Expert-Led</span>
                  <span className="inline-block mr-[0.3em]">Online</span>
                  <span className="inline-block mr-[0.3em]">
                    <span className="relative inline-block">
                      Upskilling
                      <span className="absolute -bottom-[0.04em] left-0 right-0 h-[0.1em] bg-[#C6FFDD] rounded-full -z-10 origin-left" style={{ transform: 'none' }}></span>
                    </span>
                  </span>
                </h1>
                <p className="text-white/70 text-sm sm:text-base md:text-[1.05rem] leading-relaxed mb-7 max-w-[480px] mx-auto md:mx-0">
                  Master in-demand skills with online courses in Data Science, AI, Software Engineering, Cyber Security, and more. Industry-relevant curriculum, real-world projects, and guaranteed placement support for working professionals across India.
                </p>
              </div>
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-x-3 md:gap-x-4 sm:gap-x-6 gap-y-2.5 md:gap-y-3 mb-6 md:mb-9 max-w-sm sm:max-w-none mx-auto md:mx-0">
                <div className="flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                    <circle cx="9" cy="9" r="9" fill="#C6FFDD" fillOpacity="0.2"></circle>
                    <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#C6FFDD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="text-white text-sm font-medium leading-snug">Small Batch Size</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                    <circle cx="9" cy="9" r="9" fill="#C6FFDD" fillOpacity="0.2"></circle>
                    <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#C6FFDD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="text-white text-sm font-medium leading-snug">Expert Mentorship</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                    <circle cx="9" cy="9" r="9" fill="#C6FFDD" fillOpacity="0.2"></circle>
                    <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#C6FFDD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="text-white text-sm font-medium leading-snug">Microsoft Certified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                    <circle cx="9" cy="9" r="9" fill="#C6FFDD" fillOpacity="0.2"></circle>
                    <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#C6FFDD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="text-white text-sm font-medium leading-snug">100% Placement Assistance</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start md:justify-start justify-center">
                <div className="w-full sm:w-auto md:animate-none" style={{ transform: 'scale(1)' }}>
                  <button className="relative overflow-hidden bg-white text-[#253D69] font-bold px-8 py-3.5 rounded-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all text-base shadow-lg group w-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get in Touch
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                    <span className="absolute inset-0 z-0" style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(198, 255, 221, 0.4) 50%, transparent 60%)', transform: 'translateX(-1.8726%)' }}></span>
                  </button>
                </div>
                <button className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-lg hover:border-white hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all text-base w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                  Explore Programs
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
            
            {/* Tech Icons Floating */}
            <div className="absolute top-[20%] left-[48%] bg-white/15 backdrop-blur-md border border-white/30 p-3 rounded-2xl shadow-xl animate-[bounce_4s_infinite]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6FFDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <div className="absolute bottom-[35%] right-[25%] bg-white/15 backdrop-blur-md border border-white/30 p-3 rounded-2xl shadow-xl animate-[bounce_5s_infinite]" style={{ animationDelay: '1s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6FFDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 15 21.84"></path><path d="M21 5V8"></path><path d="M21 12L18 17H22L19 22"></path><path d="M3 12A9 3 0 0 0 14.59 14.87"></path></svg>
            </div>
            <div className="absolute top-[38%] right-[12%] bg-white/15 backdrop-blur-md border border-white/30 p-3 rounded-2xl shadow-xl animate-[bounce_6s_infinite]" style={{ animationDelay: '2s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6FFDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
            </div>

            {/* 15k+ Learners Widget */}
            <div className="absolute bottom-[18%] left-[45%] xl:left-[43%]">
              <div className="bg-white/95 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 shadow-2xl border border-white/60 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">JD</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">AK</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">SM</div>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-800" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>15k+ Learners</p>
                  <p className="text-[10px] font-bold text-gray-500" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Joined this month</p>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-4 xl:right-8 2xl:right-12" style={{ transform: 'none' }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-white/60 w-[150px]">
                <div className="relative w-[80px] h-[80px] mx-auto mb-2">
                  <svg viewBox="0 0 80 80" className="w-full h-full">
                    <line x1="40" y1="10" x2="40" y2="5" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="45.85270966048385" y1="10.576441587903087" x2="46.82816127056449" y2="5.672515185886937" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="51.4805029709527" y1="12.283614024661397" x2="53.39392013277814" y2="7.664216362104966" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="56.66710699058807" y1="15.055911630923642" x2="59.44495815568608" y2="10.898563569410918" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="61.21320343559643" y1="18.786796564403577" x2="64.74873734152916" y2="15.25126265847084" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="64.94408836907635" y1="23.332893009411933" x2="69.10143643058908" y2="20.555041844313923" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="67.7163859753386" y1="28.519497029047308" x2="72.33578363789503" y2="26.606079867221858" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="69.42355841209691" y1="34.147290339516154" x2="74.32748481411306" y2="33.171838729435514" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="70" y1="40" x2="75" y2="40" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="69.42355841209691" y1="45.852709660483846" x2="74.32748481411306" y2="46.828161270564486" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="67.7163859753386" y1="51.48050297095269" x2="72.33578363789503" y2="53.39392013277814" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="64.94408836907635" y1="56.66710699058807" x2="69.10143643058908" y2="59.44495815568608" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="61.21320343559643" y1="61.21320343559643" x2="64.74873734152916" y2="64.74873734152916" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="56.66710699058807" y1="64.94408836907635" x2="59.44495815568608" y2="69.10143643058908" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="51.4805029709527" y1="67.7163859753386" x2="53.39392013277814" y2="72.33578363789503" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="45.85270966048385" y1="69.42355841209691" x2="46.82816127056449" y2="74.32748481411306" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="40" y1="70" x2="40" y2="75" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="34.14729033951616" y1="69.42355841209692" x2="33.17183872943552" y2="74.32748481411306" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="28.519497029047308" y1="67.7163859753386" x2="26.606079867221858" y2="72.33578363789503" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="23.332893009411933" y1="64.94408836907635" x2="20.55504184431392" y2="69.10143643058908" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="18.786796564403577" y1="61.21320343559643" x2="15.25126265847084" y2="64.74873734152916" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="15.055911630923639" y1="56.66710699058807" x2="10.898563569410914" y2="59.44495815568608" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="12.283614024661397" y1="51.4805029709527" x2="7.664216362104966" y2="53.39392013277815" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="10.576441587903087" y1="45.852709660483846" x2="5.672515185886937" y2="46.828161270564486" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="10" y1="40.00000000000001" x2="5" y2="40.00000000000001" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="10.576441587903084" y1="34.14729033951616" x2="5.67251518588693" y2="33.17183872943552" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="12.28361402466139" y1="28.519497029047322" x2="7.664216362104959" y2="26.60607986722188" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="15.055911630923642" y1="23.332893009411933" x2="10.898563569410918" y2="20.55504184431392" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="18.78679656440357" y1="18.786796564403577" x2="15.251262658470832" y2="15.25126265847084" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="23.33289300941191" y1="15.055911630923656" x2="20.555041844313898" y2="10.898563569410932" strokeWidth="2.5" strokeLinecap="round" stroke="#22c55e"></line>
                    <line x1="28.519497029047315" y1="12.283614024661393" x2="26.606079867221865" y2="7.664216362104959" strokeWidth="2.5" strokeLinecap="round" stroke="#e5e7eb"></line>
                    <line x1="34.14729033951614" y1="10.57644158790309" x2="33.1718387294355" y2="5.672515185886937" strokeWidth="2.5" strokeLinecap="round" stroke="#e5e7eb"></line>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-[#22c55e]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>95%</span>
                </div>
                <p className="text-center text-sm font-bold text-gray-700" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Success Rate</p>
              </div>
            </div>
            <div className="absolute bottom-10 right-2 xl:right-6 2xl:right-10" style={{ transform: 'none' }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-white/60 w-[155px]">
                <p className="text-center text-3xl font-extrabold text-gray-800" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>4.8/5</p>
                <p className="text-center text-sm font-bold text-gray-600 mt-0.5" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Student Rating</p>
                <div className="flex justify-center gap-0.5 mt-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" style={{ opacity: 1, transform: 'none' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" style={{ opacity: 1, transform: 'none' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" style={{ opacity: 1, transform: 'none' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" style={{ opacity: 1, transform: 'none' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24" style={{ opacity: 1, transform: 'none' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#253D69]/10 to-transparent"></div>
      
      {/* Roadmap Section */}
      <div className="py-20 md:py-24 bg-gradient-to-br from-[#F3F6FB] via-[#EAF1FF] to-[#C6FFDD]/20">
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-14 md:mb-16" style={{ opacity: 1, transform: 'none' }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 rounded-full bg-[#0A8F5C]"></span>
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Career Roadmap</span>
              <span className="h-[2px] w-8 rounded-full bg-[#0A8F5C]"></span>
            </div>
            <h2 className="text-[#253D69] font-black text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight mb-4 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Your Career Growth Roadmap</h2>
            <p className="text-[#6B7280] text-base md:text-lg max-w-2xl mx-auto transition-colors duration-300 hover:text-[#253D69]">A proven 4-step framework used by 18,000+ Antechos India alumni to go from upskilling to landing roles at top companies across industries.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-0">
              <div className="flex gap-4 sm:gap-5 relative group" style={{ opacity: 1, transform: 'none' }}>
                <div className="absolute left-[23px] sm:left-[25px] top-[52px] bottom-0 w-[2px] bg-[#C6FFDD]/50"></div>
                <div className="flex-shrink-0 z-10 relative">
                  <div className="relative w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl bg-[#C6FFDD] flex items-center justify-center" style={{ boxShadow: 'rgba(10, 143, 92, 0.2) 0px 4px 16px -4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket text-[#253D69]" aria-hidden="true"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path></svg>
                  </div>
                </div>
                <div className="flex-1 pb-7 sm:pb-8">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-black tracking-[0.18em] uppercase leading-none text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Step 1</span>
                  </div>
                  <h3 className="text-[#253D69] font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Profile Power-Up</h3>
                  <p className="text-[#6B7280] text-[13px] sm:text-sm leading-relaxed">We audit and rebuild your resume, LinkedIn, and GitHub profile to showcase your strengths and attract top recruiters from day one.</p>
                  <div className="mt-5 h-px bg-gradient-to-r from-[#253D69]/6 to-transparent"></div>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-5 relative group" style={{ opacity: 1, transform: 'none' }}>
                <div className="absolute left-[23px] sm:left-[25px] top-[52px] bottom-0 w-[2px] bg-[#C6FFDD]/50"></div>
                <div className="flex-shrink-0 z-10 relative">
                  <div className="relative w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl bg-[#C6FFDD] flex items-center justify-center" style={{ boxShadow: 'rgba(10, 143, 92, 0.2) 0px 4px 16px -4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-[#253D69]" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                  </div>
                </div>
                <div className="flex-1 pb-7 sm:pb-8">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-black tracking-[0.18em] uppercase leading-none text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Step 2</span>
                  </div>
                  <h3 className="text-[#253D69] font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Skill Transformation</h3>
                  <p className="text-[#6B7280] text-[13px] sm:text-sm leading-relaxed">Master in-demand skills through live sessions, hands-on projects, and real-world case studies — guided by industry experts from top companies.</p>
                  <div className="mt-5 h-px bg-gradient-to-r from-[#253D69]/6 to-transparent"></div>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-5 relative group" style={{ opacity: 1, transform: 'none' }}>
                <div className="absolute left-[23px] sm:left-[25px] top-[52px] bottom-0 w-[2px] bg-[#C6FFDD]/50"></div>
                <div className="flex-shrink-0 z-10 relative">
                  <div className="relative w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl bg-[#C6FFDD] flex items-center justify-center" style={{ boxShadow: 'rgba(10, 143, 92, 0.2) 0px 4px 16px -4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target text-[#253D69]" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                  </div>
                </div>
                <div className="flex-1 pb-7 sm:pb-8">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-black tracking-[0.18em] uppercase leading-none text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Step 3</span>
                  </div>
                  <h3 className="text-[#253D69] font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Interview Readiness</h3>
                  <p className="text-[#6B7280] text-[13px] sm:text-sm leading-relaxed">Crack every round with mock interviews conducted by actual hiring managers, targeted practice sessions, and domain-specific interview prep.</p>
                  <div className="mt-5 h-px bg-gradient-to-r from-[#253D69]/6 to-transparent"></div>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-5 relative group" style={{ opacity: 1, transform: 'none' }}>
                <div className="flex-shrink-0 z-10 relative">
                  <div className="relative w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-xl bg-[#C6FFDD] flex items-center justify-center" style={{ boxShadow: 'rgba(10, 143, 92, 0.2) 0px 4px 16px -4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-[#253D69]" aria-hidden="true"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path><path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path><path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path></svg>
                  </div>
                </div>
                <div className="flex-1 pb-7 sm:pb-8">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-black tracking-[0.18em] uppercase leading-none text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Step 4</span>
                  </div>
                  <h3 className="text-[#253D69] font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Opportunity Maximization</h3>
                  <p className="text-[#6B7280] text-[13px] sm:text-sm leading-relaxed">Our placement team activates its 150+ hiring partner network, provides referrals, and negotiates on your behalf to maximise your offer.</p>
                </div>
              </div>
            </div>
            <div style={{ opacity: 1, transform: 'none' }}>
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'rgba(37, 61, 105, 0.2) 0px 25px 60px -12px, rgba(37, 61, 105, 0.1) 0px 12px 25px -8px' }}>
                <div className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-black shadow-2xl ring-4 ring-white">
                  <iframe src="https://www.youtube.com/embed/AUsam9BQipI?enablejsapi=1&amp;rel=0&amp;modestbranding=1&amp;controls=0&amp;showinfo=0&amp;iv_load_policy=3&amp;disablekb=1&amp;fs=0&amp;mute=1&amp;loop=1&amp;playlist=AUsam9BQipI" title="Career Journey Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="absolute inset-0 w-full h-full pointer-events-none scale-[1.34] origin-center" data-gtm-yt-inspected-10="true" id="226263310" data-gtm-yt-inspected-22="true"></iframe>
                  <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10" aria-label="Unmute">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x" aria-hidden="true"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg>
                  </button>
                  <div className="absolute bottom-16 right-0 left-0 flex justify-center pointer-events-none">
                    <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">Tap for sound</span>
                  </div>
                  <div className="absolute inset-0 rounded-lg md:rounded-xl ring-1 ring-white/10 pointer-events-none"></div>
                </div>
              </div>
              <div className="text-center mt-5">
                <p className="text-[#253D69] font-black text-sm" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>See real student transformations</p>
                <p className="text-[#6B7280] text-xs mt-1">From beginner to dream role in months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Programs Section */}
      <div className="py-20 bg-white">
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-14 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 rounded-full bg-[#0A8F5C]"></span>
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Our Programs</span>
              <span className="h-[2px] w-8 rounded-full bg-[#0A8F5C]"></span>
            </div>
            <h2 className="text-[#253D69] font-black text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight mb-4 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Select the Program Designed<br className="hidden sm:block" /> for Your Career Goals</h2>
            <p className="text-[#6B7280] text-base md:text-lg max-w-xl mx-auto mb-6">Choose from comprehensive programs in Data Science, AI, Software Engineering, Cyber Security, Data Engineering, Business Analytics, and Investment Banking — all designed by industry experts with partner certifications from Microsoft and Cisco.</p>
            
            <button 
              onClick={() => setIsSimplifiedView(!isSimplifiedView)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#253D69]/20 text-[#253D69] text-sm font-bold shadow-sm hover:bg-[#F3F6FB] transition-all"
              style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              {isSimplifiedView ? 'Detailed View' : 'Simplified View'}
            </button>
          </div>
          
          {isSimplifiedView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programData.map((prog) => (
                <div key={prog.id} className="rounded-2xl bg-white border border-gray-100 shadow-md shadow-[#253D69]/5 overflow-hidden flex flex-col">
                  <div className="relative px-7 pt-8 pb-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0FA268 0%, #0A8F5C 40%, #057A4A 100%)' }}>
                    <div className="absolute inset-0 opacity-[0.14] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)', backgroundSize: '18px 18px' }}></div>
                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0 1px, transparent 1px 18px)' }}></div>
                    <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#C6FFDD]/25 blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#C6FFDD]/15 blur-2xl pointer-events-none"></div>
                    <div className="absolute -top-6 right-20 w-24 h-24 rounded-full border border-white/10 pointer-events-none"></div>
                    <div className="absolute -top-2 right-24 w-16 h-16 rounded-full border border-white/8 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
                    <div className="relative flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-[10px] font-bold uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FFDD] animate-pulse"></span>Program
                        </span>
                        <h3 className="text-white font-black text-[20px] leading-tight tracking-tight" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{prog.title}</h3>
                      </div>
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg shadow-black/10">
                        <prog.icon className="text-white w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="px-7 pt-8 pb-16 relative flex-1">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#0A8F5C]/30 text-[#0A8F5C] text-xs font-semibold shadow-md whitespace-nowrap" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Beginner to Advance</span>
                    </div>
                    <h2 className="text-left text-[#253D69] font-black text-xl mt-2 mb-5" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{prog.details.heading}</h2>
                    <ul className="space-y-2.5 text-sm text-[#4B5563]">
                      <li className="flex items-center gap-2.5"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>Duration: {prog.duration}</li>
                      <li className="flex items-center gap-2.5"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>100% Placement Assistance</li>
                      <li className="flex items-center gap-2.5"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>1:1 Mentorship</li>
                    </ul>
                  </div>
                  <div className="bg-[#EAF1FF] px-7 pt-0 pb-7 mt-auto border-t border-[#253D69]/8 relative">
                    <div className="bg-white rounded-xl border border-[#253D69]/10 px-5 py-5 mb-5 text-center shadow-md -mt-12 relative z-10">
                      <p className="text-[#6B7280] text-xs font-medium mb-1.5" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Course Investment</p>
                      <p className="text-[#253D69] font-black text-[26px] leading-none" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{prog.details.price}/-</p>
                    </div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="reserve-cta group/cta relative block overflow-hidden rounded-lg mb-2.5 isolate" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                      <span className="absolute inset-0 bg-[#253D69] transition-colors duration-300 group-hover/cta:bg-[#1a2d52]"></span>
                      <span className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(198,255,221,0.18) 50%, transparent 70%)' }}></span>
                      <span className="reserve-cta-shimmer absolute top-0 left-0 h-full w-1/3 pointer-events-none"></span>
                      <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm px-4 py-3.5">
                        <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover/cta:-translate-x-1">Reserve Slot with ₹5,000</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-[#C6FFDD] -ml-1 opacity-0 -translate-x-2 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all duration-300" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      </span>
                    </a>
                    <a className="group/explore relative block rounded-lg border border-[#253D69]/15 bg-white px-4 py-3.5 hover:shadow-md hover:shadow-[#253D69]/10 transition-shadow duration-300" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }} href="#">
                      <span className="relative flex items-center justify-center gap-2 text-[#253D69] font-semibold text-sm">
                        <span className="inline-block transition-[letter-spacing,transform] duration-300 group-hover/explore:tracking-wide group-hover/explore:-translate-x-0.5">Explore the program</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-[#253D69] transition-transform duration-300 ease-out group-hover/explore:translate-x-1" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      </span>
                      <span className="pointer-events-none absolute left-4 right-4 bottom-2 h-[2px] origin-left scale-x-0 group-hover/explore:scale-x-100 bg-[#253D69]/80 transition-transform duration-500 ease-out"></span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <>
          <div className="lg:hidden mb-5">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] font-black tracking-[0.22em] uppercase text-[#253D69]/60" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Select a Program</span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{activeProgramIndex + 1}/{programData.length}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              {programData.map((prog, idx) => (
                <button 
                  key={prog.id}
                  onClick={() => setActiveProgramIndex(idx)}
                  type="button" 
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-300" 
                  style={{
                    backgroundColor: activeProgramIndex === idx ? 'rgb(37, 61, 105)' : 'white',
                    borderColor: activeProgramIndex === idx ? 'rgb(37, 61, 105)' : 'rgba(37, 61, 105, 0.1)',
                    boxShadow: activeProgramIndex === idx ? 'rgba(37, 61, 105, 0.25) 0px 4px 12px -4px' : 'none'
                  }}
                >
                  <prog.icon className={activeProgramIndex === idx ? "text-[#C6FFDD]" : "text-[#253D69]/60"} />
                  <span className="text-[12px] font-bold whitespace-nowrap" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', color: activeProgramIndex === idx ? 'white' : 'rgb(75, 85, 99)' }}>{prog.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            <nav className="hidden lg:flex lg:col-span-5 flex-col gap-1 relative h-full bg-white/60 backdrop-blur-sm rounded-2xl border border-[#253D69]/6 p-2" aria-label="Program selector">
              <div className="px-3 pb-4 mb-1 border-b border-[#253D69]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black tracking-[0.22em] uppercase text-[#253D69]/60" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Index · {programData.length} Programs</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inset-0 rounded-full bg-[#0A8F5C] opacity-70 animate-ping"></span>
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#0A8F5C]"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Hover to view</span>
                  </span>
                </div>
                <div className="relative h-[2px] rounded-full bg-[#253D69]/10 overflow-hidden">
                  <span className="absolute inset-y-0 left-0 rounded-full bg-[#0A8F5C]" style={{ width: `${((activeProgramIndex + 1) / programData.length) * 100}%` }}></span>
                </div>
              </div>
              
              {programData.map((prog, idx) => (
                <button 
                  key={prog.id}
                  onClick={() => setActiveProgramIndex(idx)}
                  type="button" 
                  className="group relative flex-1 min-h-[68px] text-left rounded-xl px-4 py-4 transition-colors duration-300 focus:outline-none hover:bg-[#253D69]/[0.03]" 
                  style={{ backgroundColor: activeProgramIndex === idx ? 'rgba(37, 61, 105, 0.05)' : 'transparent' }}
                >
                  {activeProgramIndex === idx && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#0A8F5C]" style={{ transform: 'none', transformOrigin: '50% 50% 0px', opacity: 1 }}></span>}
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-black tracking-[0.18em] tabular-nums" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', color: activeProgramIndex === idx ? 'rgb(10, 143, 92)' : 'rgba(37, 61, 105, 0.35)', transform: activeProgramIndex === idx ? 'scale(1.1)' : 'none' }}>/0{idx + 1}</span>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ backgroundColor: activeProgramIndex === idx ? 'rgb(37, 61, 105)' : 'rgba(37, 61, 105, 0.08)' }}>
                      <prog.icon className={activeProgramIndex === idx ? "text-[#C6FFDD]" : "text-[#253D69]"} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-[15px] leading-snug truncate transition-colors duration-300" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', color: activeProgramIndex === idx ? 'rgb(37, 61, 105)' : 'rgb(75, 85, 99)' }}>{prog.title}</p>
                      <p className="text-[11px] mt-0.5 truncate transition-colors duration-300" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', color: activeProgramIndex === idx ? 'rgb(10, 143, 92)' : 'rgb(156, 163, 175)' }}>{prog.duration} · {prog.category}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right flex-shrink-0 transition-all duration-300" aria-hidden="true" style={{ opacity: activeProgramIndex === idx ? 1 : 0, color: 'rgb(10, 143, 92)', transform: activeProgramIndex === idx ? 'translate(0px, 0px)' : 'translate(-4px, 4px)' }}>
                      <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
                    </svg>
                  </div>
                </button>
              ))}
              
              <div className="hidden lg:flex items-center justify-center gap-2 pt-4 mt-3 border-t border-[#253D69]/10">
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#9CA3AF]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Use</span>
                <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-white border border-[#253D69]/15 shadow-sm text-[10px] font-bold text-[#253D69]">↑</kbd>
                <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-white border border-[#253D69]/15 shadow-sm text-[10px] font-bold text-[#253D69]">↓</kbd>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#9CA3AF]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>to browse</span>
              </div>
            </nav>
            
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border overflow-hidden lg:min-h-[640px]" style={{ backgroundColor: 'rgb(255, 255, 255)', borderColor: 'rgba(37, 61, 105, 0.08)', boxShadow: 'rgba(37, 61, 105, 0.15) 0px 8px 30px -8px, rgba(0, 0, 0, 0.06) 0px 2px 8px -2px' }}>
                <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgb(10, 143, 92) 30%, rgb(198, 255, 221) 50%, rgb(10, 143, 92) 70%, transparent 100%)' }}></span>
                <div className="absolute -bottom-10 -right-10 pointer-events-none" style={{ transform: 'scale(1.01891)' }}>
                  <activeProgram.icon width="260" height="260" className="text-[#253D69]/10" />
                </div>
                
                <div className="relative p-8 md:p-10 h-full flex flex-col" style={{ opacity: 1, transform: 'none' }}>
                  <div className="flex items-center flex-wrap gap-2 mb-5">
                    {activeProgram.details.tags.map((tag, idx) => (
                       <span key={idx} className={`inline-flex items-center text-[10px] font-bold tracking-[0.15em] uppercase ${idx === 0 ? 'text-[#0A8F5C] font-black tracking-[0.22em]' : idx === 1 ? 'text-[#253D69] bg-[#C6FFDD] px-2 py-0.5 rounded' : 'text-[#0A8F5C] border border-[#0A8F5C]/25 px-2 py-0.5 rounded'}`} style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{tag}</span>
                    ))}
                    <span className="flex-1"></span>
                    {activeProgram.details.isNew && (
                      <span className="inline-flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full border border-[#0A8F5C]/25 bg-[#C6FFDD]/20" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                        <span className="relative flex w-2 h-2">
                          <span className="absolute inset-0 rounded-full bg-[#0A8F5C] opacity-70 animate-ping"></span>
                          <span className="relative inline-flex rounded-full w-2 h-2 bg-[#0A8F5C]"></span>
                        </span>
                        <span className="text-[10px] font-black tracking-[0.18em] uppercase text-[#0A8F5C]">New Cohort · Enrolling</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="relative inline-block mb-3">
                    <h3 className="text-[#253D69] font-black text-2xl md:text-[2rem] leading-[1.08]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{activeProgram.details.heading}</h3>
                    <span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#C6FFDD]" style={{ width: '40%' }}></span>
                  </div>
                  
                  <p className="text-[#4B5563] text-[15px] md:text-base font-medium leading-relaxed mb-4 mt-1">{activeProgram.details.subheading}</p>
                  <p className="text-[#6B7280] text-[14px] leading-[1.75] mb-6">{activeProgram.details.desc}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="rounded-xl border p-3" style={{ backgroundColor: 'rgba(37, 61, 105, 0.03)', borderColor: 'rgba(60, 40, 20, 0.08)' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-[#0A8F5C]" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Duration</span>
                      </div>
                      <div className="text-[12px] font-bold text-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{activeProgram.duration}</div>
                    </div>
                    <div className="rounded-xl border p-3" style={{ backgroundColor: 'rgba(37, 61, 105, 0.03)', borderColor: 'rgba(60, 40, 20, 0.08)' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award text-[#0A8F5C]" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Cert</span>
                      </div>
                      <div className="text-[12px] font-bold text-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{activeProgram.details.cert}</div>
                    </div>
                    <div className="rounded-xl border p-3" style={{ backgroundColor: 'rgba(37, 61, 105, 0.03)', borderColor: 'rgba(60, 40, 20, 0.08)' }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-radio text-[#0A8F5C]" aria-hidden="true"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"></path><path d="M19.075 4.933a10 10 0 0 1 0 14.134"></path><path d="M4.925 19.067a10 10 0 0 1 0-14.134"></path><path d="M7.753 16.239a6 6 0 0 1 0-8.478"></path><circle cx="12" cy="12" r="2"></circle></svg>
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Mode</span>
                      </div>
                      <div className="text-[12px] font-bold text-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{activeProgram.details.mode}</div>
                    </div>
                  </div>
                  
                  <div className="text-[9px] font-black tracking-[0.22em] uppercase text-[#0A8F5C] mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>What you'll learn</div>
                  <ul className="space-y-2 mb-6">
                    {activeProgram.details.learn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[#374151] text-[13.5px] leading-snug">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#C6FFDD]/55 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#0A8F5C]" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {activeProgram.details.skills.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center text-[10px] font-bold tracking-[0.1em] uppercase text-[#253D69]/80 bg-[#EAF1FF] px-2 py-1 rounded-md" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{skill}</span>
                    ))}
                  </div>
                  
                  <div className="flex-1"></div>
                  
                  <div className="pt-5 border-t border-[#253D69]/8 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[9px] font-black tracking-[0.18em] uppercase text-[#0A8F5C] leading-none mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Starts at</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[20px] font-black text-[#253D69] leading-none" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{activeProgram.details.price}</span>
                        <span className="text-[12px] text-[#9CA3AF] line-through">{activeProgram.details.originalPrice}</span>
                      </div>
                    </div>
                    <a className="group/cta inline-flex items-center gap-2 bg-[#253D69] hover:bg-[#1a2d52] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#253D69]/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#253D69]/30" href="#" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                      Explore Program
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {activeProgramIndex < programData.length - 1 && (
                <button 
                  type="button" 
                  onClick={() => setActiveProgramIndex(activeProgramIndex + 1)}
                  className="group/next hidden lg:flex mt-4 w-full items-center justify-between px-5 py-3 rounded-xl border border-[#253D69]/10 bg-white/50 hover:bg-white hover:border-[#0A8F5C]/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap text-[#0A8F5C]" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                      <span className="text-[9px] font-black tracking-[0.22em] uppercase text-[#0A8F5C]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Up Next</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#253D69] truncate" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>{programData[activeProgramIndex + 1].title}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right text-[#0A8F5C] flex-shrink-0 transition-transform duration-300 group-hover/next:translate-x-1" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              )}
            </div>
          </div>
          </>
          )}
        </div>
      </div>
      {/* Certification Section */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(rgb(15, 26, 46) 0%, rgb(22, 37, 68) 50%, rgb(15, 26, 46) 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
        <div className="absolute top-[10%] -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(198, 255, 221, 0.06) 0%, transparent 65%)', filter: 'blur(60px)' }}></div>
        <div className="absolute bottom-[10%] -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37, 61, 105, 0.12) 0%, transparent 65%)', filter: 'blur(60px)' }}></div>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-14 md:mb-16" style={{ opacity: 1, transform: 'none' }}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[2px] w-8 rounded-full bg-[#C6FFDD]"></span>
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#C6FFDD]" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Certification</span>
              <span className="h-[2px] w-8 rounded-full bg-[#C6FFDD]"></span>
            </div>
            <h2 className="text-white font-black text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight mb-4 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Credentials That <span className="text-[#C6FFDD]">Actually Matter</span></h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto transition-colors duration-300 hover:text-white/80">Every Antechos India program comes with an industry-accredited certificate — co-branded with top partners, digitally verifiable, and built to open doors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12">
            <div className="group" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-1">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(rgba(198, 255, 221, 0.1) 0%, transparent 70%)', filter: 'blur(12px)' }}></div>
                <div className="w-12 h-12 rounded-xl bg-[#C6FFDD]/10 border border-[#C6FFDD]/15 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award text-[#C6FFDD]" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                </div>
                <h3 className="text-white font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Industry-Accredited</h3>
                <p className="text-white/45 text-[14px] leading-[1.7]">Certificates co-branded with leading industry partners — Microsoft, Cisco, and more depending on your program.</p>
              </div>
            </div>
            <div className="group" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-1">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(rgba(198, 255, 221, 0.1) 0%, transparent 70%)', filter: 'blur(12px)' }}></div>
                <div className="w-12 h-12 rounded-xl bg-[#C6FFDD]/10 border border-[#C6FFDD]/15 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-[#C6FFDD]" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                </div>
                <h3 className="text-white font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Digitally Verifiable</h3>
                <p className="text-white/45 text-[14px] leading-[1.7]">Every certificate comes with a unique verification ID. Employers can instantly validate your credentials online.</p>
              </div>
            </div>
            <div className="group" style={{ opacity: 1, transform: 'none' }}>
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-1">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(rgba(198, 255, 221, 0.1) 0%, transparent 70%)', filter: 'blur(12px)' }}></div>
                <div className="w-12 h-12 rounded-xl bg-[#C6FFDD]/10 border border-[#C6FFDD]/15 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up text-[#C6FFDD]" aria-hidden="true"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                </div>
                <h3 className="text-white font-black text-[17px] sm:text-lg leading-snug mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Built for Career Impact</h3>
                <p className="text-white/45 text-[14px] leading-[1.7]">Backed by real projects, mentor endorsements, and skills assessments — not just course completion.</p>
              </div>
            </div>
          </div>
          <div className="mb-10" style={{ opacity: 1, transform: 'none' }}>
            <p className="text-center text-[10px] font-black tracking-[0.22em] uppercase text-[#C6FFDD] mb-4" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Every Certificate Includes</p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Digital Verification ID</span>
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Industry Partnership Seal</span>
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Project Portfolio Link</span>
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Skills Assessment Score</span>
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Lifetime Validity</span>
              <span className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-white/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Mentor Endorsement</span>
            </div>
          </div>
          <div className="flex justify-center mb-12" style={{ opacity: 1, transform: 'none' }}>
            <div className="inline-flex items-center bg-white/[0.05] backdrop-blur-sm rounded-2xl border border-white/[0.08] px-2 py-2 gap-1">
              <div className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                <div>
                  <span className="text-[15px] sm:text-[17px] font-black text-white leading-none block" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>5,000+</span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.1em] uppercase text-white/40 leading-none mt-0.5 block" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Certificates Issued</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                <div>
                  <span className="text-[15px] sm:text-[17px] font-black text-white leading-none block" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>100%</span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.1em] uppercase text-white/40 leading-none mt-0.5 block" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Employer Recognition</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                <div>
                  <span className="text-[15px] sm:text-[17px] font-black text-white leading-none block" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Global</span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.1em] uppercase text-white/40 leading-none mt-0.5 block" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Acceptance</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4" style={{ opacity: 1, transform: 'none' }}>
            <button className="group/cta inline-flex items-center gap-2.5 bg-[#C6FFDD] text-[#253D69] font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-[#C6FFDD]/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C6FFDD]/15 transition-all duration-300" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
              View Sample Certificate
            </button>
            <button className="inline-flex items-center gap-2.5 border border-white/20 text-white font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Get in Touch</button>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute top-0 -right-32 w-[520px] h-[520px] rounded-full bg-[#EAF1FF]/70 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -left-32 w-[440px] h-[440px] rounded-full bg-[#C6FFDD]/25 blur-3xl pointer-events-none"></div>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block bg-[#EAF1FF] text-[#253D69] text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Payment options</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-[#253D69] leading-tight mb-3" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>One-shot or easy <span className="text-[#0A8F5C]">0% EMI</span></h2>
            <p className="text-[#6B7280] text-base md:text-lg">We believe finances should never stop talent. Pick the option that lets you focus on learning — not worrying.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="group relative bg-white rounded-3xl border border-[#0A8F5C]/15 p-8 md:p-9 shadow-lg shadow-[#0A8F5C]/5 hover:shadow-2xl hover:shadow-[#0A8F5C]/10 hover:-translate-y-1 transition-all overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#C6FFDD]/30 blur-2xl pointer-events-none"></div>
              <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#0A8F5C] to-transparent"></span>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet text-[#0A8F5C]" aria-hidden="true"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A8F5C] text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-[#0A8F5C]/25" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>Best value
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#253D69] mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Pay once, save big</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">One-time full payment unlocks our best price and gets you straight into the cohort with zero ongoing paperwork.</p>
                <ul className="space-y-2.5 pt-6 border-t border-[#0A8F5C]/10">
                  <li className="flex items-center gap-2.5 text-[#4B5563] text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Locked-in lowest price</li>
                  <li className="flex items-center gap-2.5 text-[#4B5563] text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Instant cohort access</li>
                  <li className="flex items-center gap-2.5 text-[#4B5563] text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>No interest, no paperwork</li>
                </ul>
              </div>
            </div>
            <div className="group relative rounded-3xl border border-transparent p-8 md:p-9 shadow-xl shadow-[#253D69]/15 hover:shadow-2xl hover:shadow-[#253D69]/20 hover:-translate-y-1 transition-all overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #253D69 0%, #1a2d52 100%)' }}>
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#C6FFDD]/10 pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#C6FFDD]/5 pointer-events-none"></div>
              <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C6FFDD] to-transparent"></span>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6FFDD]/15 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-[#C6FFDD]" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C6FFDD] text-[#253D69] text-[10px] font-black uppercase tracking-wider shadow-lg shadow-[#C6FFDD]/20" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>0% interest
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Easy 0% EMI plans</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">Split the fee into monthly instalments for up to <strong className="text-[#C6FFDD]">18 months</strong> — no interest, no surprise charges, fully transparent.</p>
                <ul className="space-y-2.5 pt-6 border-t border-white/10">
                  <li className="flex items-center gap-2.5 text-white/75 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Up to 18-month tenure</li>
                  <li className="flex items-center gap-2.5 text-white/75 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Student-friendly approval</li>
                  <li className="flex items-center gap-2.5 text-white/75 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>No hidden processing charges</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#4B5563]">
            <div className="inline-flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>One-time full payment for the best value</div>
            <div className="inline-flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Flexible 0% EMI plans — student-friendly &amp; stress-free</div>
            <div className="inline-flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>No hidden charges or surprise fees</div>
            <div className="inline-flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#0A8F5C] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>Complete transparency in every transaction</div>
          </div>
        </div>
      </section>

      {/* We Get It Section */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1629 0%, #112240 50%, #0D1E38 100%)' }}>
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(198,255,221,0.08) 0%, transparent 70%)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-[460px] h-[460px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(198,255,221,0.05) 0%, transparent 70%)' }}></div>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '44px 44px', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at center, black 40%, transparent 100%)', maskImage: 'radial-gradient(ellipse 80% 70% at center, black 40%, transparent 100%)' }}></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="h-[3px] w-12 bg-[#C6FFDD] rounded-full mx-auto mb-6"></div>
            <span className="inline-block text-[#C6FFDD] text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>We get it</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Feeling nervous? <span className="text-[#C6FFDD]">Totally normal.</span></h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>You're not paying for videos. You're paying for structure, guidance, accountability, and direction — and a team that has your back from day one to day done.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="group relative rounded-2xl p-7 backdrop-blur-xl border overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6FFDD] to-transparent"></span>
              <div className="w-12 h-12 rounded-xl bg-[#C6FFDD]/15 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones text-[#C6FFDD]" aria-hidden="true"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Post-payment support</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>A dedicated counsellor stays with you through the whole journey — not just until you sign up.</p>
            </div>
            <div className="group relative rounded-2xl p-7 backdrop-blur-xl border overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6FFDD] to-transparent"></span>
              <div className="w-12 h-12 rounded-xl bg-[#C6FFDD]/15 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart text-[#C6FFDD]" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
              </div>
              <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Personal attention</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>Cohorts are capped, mentors are real practitioners, and your questions get real answers — never bot replies.</p>
            </div>
            <div className="group relative rounded-2xl p-7 backdrop-blur-xl border overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6FFDD] to-transparent"></span>
              <div className="w-12 h-12 rounded-xl bg-[#C6FFDD]/15 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-[#C6FFDD]" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <h3 className="text-lg font-black text-white mb-2" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Honest commitments</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>We tell you upfront what we do and don't guarantee — and refund within 7 days if it isn't a fit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F3F4F6] overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-3 mb-12 text-center items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide w-fit bg-[#EAF1FF] text-[#253D69]">FAQ's</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-[#253D69]" style={{ fontFamily: 'var(--font-plus-jakarta), system-ui, sans-serif' }}>Frequently Asked Questions</h2>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl text-[#6B7280] mx-auto">Have questions? We've got answers to help you get the most out of your learning journey.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <div className="md:w-[300px] lg:w-[320px] flex-shrink-0">
                <div className="md:sticky md:top-24">
                  <div className="flex md:hidden flex-wrap justify-center gap-2.5 mb-6">
                    {faqCategories.map((cat, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleCategoryClick(cat.name)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          activeFaqCategory === cat.name 
                            ? "bg-[#253D69] text-white shadow-sm" 
                            : "bg-white text-[#4B5563] border border-gray-200"
                        }`} 
                        style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  <div className="hidden md:block bg-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm p-2 mb-6">
                    <div className="hidden md:flex flex-col gap-1">
                      {faqCategories.map((cat, idx) => {
                        const isActive = activeFaqCategory === cat.name;
                        return (
                          <button 
                            key={idx}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`relative flex items-center gap-3 pl-5 pr-4 py-3.5 rounded-lg text-sm font-medium text-left transition-all duration-200 w-full overflow-hidden ${
                              isActive ? "bg-[#253D69] text-white shadow-sm" : "text-[#4B5563] hover:bg-gray-50"
                            }`} 
                            style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}
                          >
                            {isActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-[#C6FFDD]"></span>
                            )}
                            <div className={isActive ? "text-[#C6FFDD]" : "text-[#6B7280]"}>
                              {cat.icon}
                            </div>
                            {cat.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="hidden md:block bg-[#253D69] rounded-lg md:rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-[#C6FFDD]/10"></div>
                    <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-[#C6FFDD]/10"></div>
                    <h3 className="text-white font-bold text-lg mb-2 relative" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Still have questions?</h3>
                    <p className="text-white/60 text-sm mb-5 relative">Our career advisors are here to help</p>
                    <button className="relative inline-flex items-center gap-2 bg-[#C6FFDD] text-[#253D69] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#C6FFDD]/80 hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                      Talk to Us
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {activeFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    <button 
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50/50 transition-colors"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    >
                      <span className="font-semibold text-[#253D69] text-[15px] pr-4 leading-snug" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                        {faq.q}
                      </span>
                      <div style={{ transform: openFaqIndex === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down flex-shrink-0 text-[#6B7280]" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
                      </div>
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 pb-5 text-[#6B7280] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:hidden mt-8">
              <div>
                <div className="bg-[#253D69] rounded-lg md:rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-[#C6FFDD]/10"></div>
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-[#C6FFDD]/10"></div>
                  <h3 className="text-white font-bold text-lg mb-2 relative" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Still have questions?</h3>
                  <p className="text-white/60 text-sm mb-5 relative">Our career advisors are here to help</p>
                  <button className="relative inline-flex items-center gap-2 bg-[#C6FFDD] text-[#253D69] font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#C6FFDD]/80 hover:-translate-y-0.5 hover:shadow-md transition-all" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                    Talk to Us
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Your Career Section (WebGL Animation Redesign) */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-[#0B1629]">
        <ParticleNetworkAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1629]/80 via-transparent to-[#0B1629]/80 pointer-events-none z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C6FFDD]/5 rounded-full blur-[100px] pointer-events-none z-10"></div>
        
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 z-20">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-block bg-[#C6FFDD]/10 border border-[#C6FFDD]/20 text-[#C6FFDD] text-sm font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-md">Transform Your Career Today</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Ready To Level Up Your Career?</h2>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light transition-colors duration-300 hover:text-white">Join thousands of professionals who've transformed their careers with Antechos India. Start your journey to success today.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#0A8F5C]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#0A8F5C]/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-[#C6FFDD]" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              </div>
              <p className="text-white font-bold text-sm sm:text-base mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Flexible Learning</p>
              <p className="text-white/60 text-xs sm:text-sm">Learn while working</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#0A8F5C]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#0A8F5C]/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-[#C6FFDD]" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
              <p className="text-white font-bold text-sm sm:text-base mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Expert Mentors</p>
              <p className="text-white/60 text-xs sm:text-sm">Industry professionals</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#0A8F5C]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#0A8F5C]/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award text-[#C6FFDD]" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
              </div>
              <p className="text-white font-bold text-sm sm:text-base mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Certified Program</p>
              <p className="text-white/60 text-xs sm:text-sm">Microsoft accredited</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[#0A8F5C]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-[#0A8F5C]/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase text-[#C6FFDD]" aria-hidden="true"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
              </div>
              <p className="text-white font-bold text-sm sm:text-base mb-1" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>100% Placement</p>
              <p className="text-white/60 text-xs sm:text-sm">Guaranteed assistance</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 md:p-8 mb-10 max-w-4xl mx-auto border border-white/10 backdrop-blur-md">
            <h3 className="text-white font-bold text-lg mb-5 text-center" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>Certificate Includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-white/80 text-sm">Free career counseling session</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-white/80 text-sm">Lifetime access to learning materials</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-white/80 text-sm">20% scholarship for early birds</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check text-[#C6FFDD] flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span className="text-white/80 text-sm">Alumni network access</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-14 relative z-20">
            <button className="group relative inline-flex items-center justify-center gap-2 bg-[#0A8F5C] text-white font-bold px-8 py-4 rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(10,143,92,0.3)] hover:shadow-[0_0_50px_rgba(10,143,92,0.5)] hover:-translate-y-1 text-base" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              Start Your Journey
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:divide-x divide-white/20">
            <div className="text-center sm:px-12">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FFDD] to-[#0A8F5C] font-black text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>4.8+</p>
              <p className="text-white/60 text-xs mt-1.5 font-medium tracking-wide uppercase">Average Rating</p>
            </div>
            <div className="text-center sm:px-12">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FFDD] to-[#0A8F5C] font-black text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>18,000+</p>
              <p className="text-white/60 text-xs mt-1.5 font-medium tracking-wide uppercase">Happy Students</p>
            </div>
            <div className="text-center sm:px-12">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FFDD] to-[#0A8F5C] font-black text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>5,000+</p>
              <p className="text-white/60 text-xs mt-1.5 font-medium tracking-wide uppercase">Certificates Issued</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesNewTry;

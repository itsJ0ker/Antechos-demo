// Import trainer photos from src/assets
import gulshanPhoto from "../assets/instructors/gulshan.jpg";
import vishwajeetPhoto from "../assets/instructors/vishwajeet.png";

const trainers = [
  {
    id: 1,
    name: "Gulshan Kumar",
    profile: "Full Stack Developer",
    photo: gulshanPhoto, // ✅ imported variable
    skills: [
      "C",
      "C++",
      "JavaScript",
      "ReactJS",
      "Tailwind CSS",
      "NodeJS",
      "ExpressJS",
      "MySQL",
      "MongoDB",
      "Git",
    ],
    coverPhoto: "coverPhotoURL",
    bio: "Aspiring full stack developer with strong foundations in front-end and back-end technologies. Passionate about building efficient, user-friendly applications and solving real-world problems through technology.",
    expertise: [
      "Frontend Development",
      "Backend Development",
      "Database Management",
      "Web Application Development",
      "Version Control",
    ],
    certifications: [
      "Coursera: JavaScript Programming Essentials",
      "Coursera: Developing Front-End Apps with React",
      "SQL Certification: HackerRank Certified",
      "Atal Workshop: Machine Learning with Python",
    ],
    ratings: 4.7,
    reviews: 12,
    location: "Delhi, India",
    languages: ["English", "Hindi"],
    availability: "Weekdays",
    about:
      "I am a passionate and self-driven developer currently pursuing a Master's in Computer Applications at Bharati Vidyapeeth, Delhi. My interests lie in creating impactful digital solutions, with experience in both frontend and backend. I thrive in collaborative environments and enjoy working on innovative projects that solve societal and business challenges.",
    industry: "Technology",
    experience: "Internship: 3 months (Frontend Development at IBM)",
    fee: "₹800/hour",
    contact: {
      email: "gulshanborwal2206@gmail.com",
      phone: "+91 8920343259",
      website: "GitHub/PortfolioURL",
      linkedin: "LinkedInProfileURL",
    },
    achievements: [
      "Led a 3-member team at IBM Skills Build program to develop a surplus food redistribution platform for restaurants and NGOs",
      "Reduced parking congestion by 40% through AI-based parking slot allocation algorithm",
      "Gold Medalist in Tug of War (Ranbhoomi, IPU)",
      "Event Head at Codefest",
    ],
    projects: [
      {
        title: "Parker Pro (Smart Parking System)",
        description:
          "A MERN stack parking management system with real-time slot availability, secure booking, and payment integration.",
        technologies: [
          "ReactJS",
          "Tailwind CSS",
          "NodeJS",
          "ExpressJS",
          "MongoDB",
        ],
        impact: "Reduced parking congestion by 40%.",
      },
      {
        title: "Build the Bridge (2D Game)",
        description:
          "A 2D game where players build bridges to land on another platform.",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "IBM Surplus Food Redistribution Platform",
        description:
          "Web platform connecting restaurants with surplus food to NGOs for redistribution, supporting UN Sustainable Development Goals.",
        technologies: ["HTML", "CSS", "JavaScript"],
      },
    ],
    courses: [
      {
        title: "JavaScript Programming Essentials",
        description: "Fundamentals of modern JavaScript programming",
        mode: "Online",
        rating: 4.7,
      },
      {
        title: "Developing Front-End Apps with React",
        description: "Building scalable interfaces using ReactJS",
        mode: "Online",
        rating: 4.8,
      },
      {
        title: "Machine Learning with Python",
        description:
          "Introductory workshop on ML concepts and Python implementation",
        mode: "Offline",
        rating: 4.6,
      },
    ],
    testimonials: [
      {
        name: "IBM Mentor",
        position: "Program Lead, IBM Skills Build",
        text: "Gulshan showcased exceptional leadership and technical skills, delivering the project well within the timeline.",
        rating: 5,
      },
    ],
    education: [
      {
        degree: "Master of Computer Applications",
        institution:
          "Bharati Vidyapeeth Institute of Management and Entrepreneurship Development (GGSIPU), Delhi",
        year: "2023-2025",
      },
      {
        degree: "Bachelor of Computer Applications",
        institution: "Integrated Institute of Technology (GGSIPU), Delhi",
        year: "2020-2023",
      },
    ],
    publications: [],
  },
  {
    id: 2,
    name: "Vishwajeet Shinde",
    profile: "Business Development Professional",
    photo: vishwajeetPhoto, // ✅ imported variable
    skills: [
      "Critical Thinking and Problem Solving",
      "Bilingual Communication",
      "Ability to Multitask",
      "People Management",
      "Effective Time Management",
      "Leadership",
      "Fast Learner",
      "Team Management",
    ],
    coverPhoto: "coverPhotoURL",
    bio: "Results-driven professional with extensive experience in business development, sales team leadership, and strategic client acquisition. Proven ability to generate multi-crore revenues and build strong client relationships, with a focus on sustainable growth through data-driven strategies.",
    expertise: [
      "Business Development",
      "Sales Strategy",
      "Team Leadership",
      "Client Acquisition",
      "Partnership Development",
      "Market Analysis",
      "Revenue Growth",
    ],
    certifications: [
      "Excel - Amity University Online",
      "Figma Design & Public Relations and Influence Marketing - Udemy",
      "Artificial Intelligence Using Python - ViMEET",
      "Business Development Training - DBA",
    ],
    ratings: 4.8,
    reviews: 20,
    location: "Delhi, India",
    languages: ["English", "Hindi", "Marathi"],
    availability: "Weekdays",
    about:
      "I am a goal-oriented business development professional with a history of delivering exceptional sales performance and managing high-performing teams. Over the past few years, I have successfully closed large-scale deals, driven regional market expansion, and empowered my teams to exceed revenue targets. I thrive in dynamic, target-driven environments.",
    industry: "Business Development / Sales",
    experience: "3+ years",
    fee: "₹1,500/hour",
    contact: {
      email: "5vishu5shinde6@gmail.com",
      phone: "09325581803",
      website: "",
      linkedin: "www.linkedin.com/in/vishwajeet-shinde-613a08172",
    },
    achievements: [
      "Generated ₹87.6 lakhs individually in one year at Byju's, onboarding 93+ students",
      "Led a business development team of 5 members generating ₹32.3 lakhs in revenue",
      "Generated ₹62+ lakhs in 6 months at S.M. Global (Trade More FX)",
      "Generated ₹26+ lakhs in 6 months at Univo Edtech from Maharashtra region sales",
      "Generated ₹25+ lakhs in 6 months at Counsel India from 32 learners",
      "Generated ₹38+ lakhs in 5 months as an Investment Advisor",
    ],
    projects: [],
    courses: [
      {
        title: "Excel",
        description:
          "Comprehensive Excel training for business analytics and reporting",
        mode: "Online",
        rating: 4.8,
      },
      {
        title: "Figma Design & Public Relation and Influence Marketing",
        description:
          "UI/UX design with Figma and strategies for marketing influence",
        mode: "Online",
        rating: 4.7,
      },
      {
        title: "Artificial Intelligence Using Python",
        description:
          "Introductory training in AI concepts and Python programming",
        mode: "Offline",
        rating: 4.6,
      },
      {
        title: "Business Development Training",
        description:
          "Practical business development skills for client acquisition and growth",
        mode: "Offline",
        rating: 4.8,
      },
    ],
    testimonials: [
      {
        name: "Former Manager at Byju's",
        position: "Regional Sales Head",
        text: "Vishwajeet consistently surpassed targets and inspired his team to perform at their best. His leadership and client handling skills are exceptional.",
        rating: 5,
      },
    ],
    education: [
      {
        degree: "MBA in Business Analytics",
        institution: "Amity University Online",
        year: "2023–Present",
      },
      {
        degree: "B.E. in Electronics & Telecommunication Engineering",
        institution: "Vishwaniketan's IMEET, Mumbai",
        year: "2021",
      },
      {
        degree: "HSC",
        institution: "Rayat's Balwant College, Vita",
        year: "2017",
      },
      {
        degree: "SSC",
        institution: "Govt. Sarvodaya Co-ed School, Delhi",
        year: "2015",
      },
    ],
    publications: [],
    awards: [
      "Basketball Champions Trophy, Mumbai - 2020",
      "Best Captain Trophy - 2019 & 2020",
      "Cluster Level Silver Medal (Taekwondo) - 2017",
      "State Level Football Trophy, Sangli - 2016",
      "Cluster Level Gold Medal (Taekwondo) - 2016",
      "Winner of 2015 & 2016 Cluster Level Taekwondo Competition",
      "Cluster Level Debate Competition Winner, Delhi - 2015",
    ],
  },
];

// Import Supabase functions
import { getTrainers as getTrainersFromSupabase, getTrainerById as getTrainerByIdFromSupabase } from '../lib/supabase';

// ✅ Updated Export Functions to use Supabase
export const getTrainers = async () => {
  try {
    const { data, error } = await getTrainersFromSupabase();
    if (error || !data || data.length === 0) {
      console.log('Supabase trainers data not found, using static data');
      return trainers; // Return static trainers data
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = data.map(trainer => ({
      ...trainer,
      skills: trainer.trainer_skills?.map(s => s.skill_name) || [],
      expertise: trainer.trainer_expertise?.map(e => e.expertise_area) || [],
      certifications: trainer.trainer_certifications?.map(c => c.certification_name) || [],
      achievements: trainer.trainer_achievements?.map(a => a.achievement_text) || [],
      projects: trainer.trainer_projects || [],
      education: trainer.trainer_education || [],
      tools: trainer.trainer_tools?.map(t => t.tool_name) || [],
      contact: {
        email: trainer.email || '',
        phone: trainer.phone || '',
        website: trainer.website || '',
        linkedin: trainer.linkedin || ''
      }
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error in getTrainers:', error);
    return trainers; // Return static trainers data as fallback
  }
};

export const getTrainerById = async (id) => {
  try {
    const { data, error } = await getTrainerByIdFromSupabase(id);
    if (error || !data) {
      console.log('Supabase trainer data not found, using static data');
      // Fallback to static data
      const staticTrainer = trainers.find(trainer => trainer.id === Number(id));
      return staticTrainer || null;
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = {
      ...data,
      skills: data.trainer_skills?.map(s => s.skill_name) || [],
      expertise: data.trainer_expertise?.map(e => e.expertise_area) || [],
      certifications: data.trainer_certifications?.map(c => c.certification_name) || [],
      achievements: data.trainer_achievements?.map(a => a.achievement_text) || [],
      projects: data.trainer_projects || [],
      education: data.trainer_education || [],
      tools: data.trainer_tools?.map(t => t.tool_name) || [],
      contact: {
        email: data.email || '',
        phone: data.phone || '',
        website: data.website || '',
        linkedin: data.linkedin || ''
      }
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error in getTrainerById:', error);
    // Fallback to static data on error
    const staticTrainer = trainers.find(trainer => trainer.id === Number(id));
    return staticTrainer || null;
  }
};

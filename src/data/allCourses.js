// Import Supabase functions
import { getCourses } from '../lib/supabase';

// Import image for static data (kept for reference)
import analyticsImg from "../assets/analytics.jpg";

// Function to get courses from database
export const getCoursesFromDB = async () => {
  try {
    const { data, error } = await getCourses();
    if (error) {
      console.error('Error fetching courses:', error);
      return []; // Return empty array instead of fallback
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = data.map(course => ({
      ...course,
      skills: course.course_skills?.map(s => s.skill_name) || [],
      tools: course.course_tools?.map(t => t.tool_name) || [],
      modules: course.course_modules?.map(module => ({
        title: module.title,
        details: module.course_module_details?.map(detail => detail.detail) || []
      })) || []
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error in getCoursesFromDB:', error);
    return []; // Return empty array instead of fallback
  }
};

// Legacy static data (kept for reference but not used)
const staticCourses = [
  // 1. Content Creation
  {
    id: 1,
    title: "Graphic Design Masterclass",
    rating: 4.6,
    duration: "3 months",
    category: "Content Creation",
    skill: "Intermediate",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Learn professional graphic design techniques and tools",
    skills: ["Photoshop", "Illustrator", "Typography", "Branding", "UI Design"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Canva"],
    modules: [
      {
        title: "Module 1: Basics of Design",
        details: ["Understanding color theory", "Typography principles", "Layout design basics"]
      },
      {
        title: "Module 2: Adobe Photoshop",
        details: ["Image editing techniques", "Creating mockups", "Designing posters"]
      },
      {
        title: "Module 3: Adobe Illustrator",
        details: ["Vector art creation", "Logo design", "Brand identity projects"]
      },
      {
        title: "Module 4: UI Design",
        details: ["Wireframing with Figma", "UI component design", "Responsive interface design"]
      }
    ]
  },
  {
    id: 2,
    title: "Video Editing Pro Course",
    rating: 4.8,
    duration: "3 months",
    category: "Content Creation",
    skill: "Expert",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Master video editing with industry-standard software",
    skills: ["Video Editing", "Transitions", "Color Grading", "Motion Graphics"],
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    modules: [
      {
        title: "Module 1: Basics of Editing",
        details: ["Timeline editing", "Applying cuts", "Using transitions"]
      },
      {
        title: "Module 2: Motion Graphics",
        details: ["Creating text animations", "Lower thirds", "Kinetic typography"]
      },
      {
        title: "Module 3: Color Correction",
        details: ["Color grading techniques", "Using DaVinci Resolve", "Matching scene tones"]
      },
      {
        title: "Module 4: Final Project",
        details: ["Plan a video project", "Edit complete video", "Export for different platforms"]
      }
    ]
  },
  {
    id: 3,
    title: "AI Tools for Content Creation",
    rating: 4.7,
    duration: "3 months",
    category: "Content Creation",
    skill: "Beginner",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Harness AI power for efficient content creation",
    skills: ["AI Writing", "Image Generation", "Video Automation", "SEO Optimization"],
    tools: ["ChatGPT", "MidJourney", "RunwayML", "Copy.ai"],
    modules: [
      {
        title: "Module 1: AI for Writing",
        details: ["Generate blogs", "Social media posts", "Ad copies"]
      },
      {
        title: "Module 2: AI for Images",
        details: ["Create designs using AI tools", "Generate illustrations", "Enhance branding assets"]
      },
      {
        title: "Module 3: AI for Video",
        details: ["Automated video editing", "AI-generated scripts", "Quick promotional videos"]
      },
      {
        title: "Module 4: AI in Marketing",
        details: ["SEO optimization", "AI analytics tools", "Content personalization"]
      }
    ]
  },

  // 2. Marketing
  {
    id: 4,
    title: "SEO Optimization Strategies",
    rating: 4.5,
    duration: "3 months",
    category: "Marketing",
    skill: "Intermediate",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Master search engine optimization techniques",
    skills: ["Keyword Research", "On-Page SEO", "Off-Page SEO", "Analytics"],
    tools: ["Google Analytics", "SEMRush", "Ahrefs", "Yoast SEO"],
    modules: [
      {
        title: "Module 1: SEO Basics",
        details: ["Introduction to SEO", "Understanding SERP", "Core ranking factors"]
      },
      {
        title: "Module 2: On-Page SEO",
        details: ["Optimizing title tags", "Meta descriptions", "Schema markup"]
      },
      {
        title: "Module 3: Off-Page SEO",
        details: ["Building backlinks", "Improving domain authority", "Guest blogging"]
      },
      {
        title: "Module 4: SEO Tools",
        details: ["Using SEMRush", "Ahrefs workflows", "Google Search Console insights"]
      }
    ]
  },
  {
    id: 5,
    title: "Digital Advertising",
    rating: 4.4,
    duration: "3 months",
    category: "Marketing",
    skill: "Expert",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Create effective digital advertising campaigns",
    skills: ["PPC Ads", "Facebook Ads", "Google Ads", "Campaign Optimization"],
    tools: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads"],
    modules: [
      {
        title: "Module 1: Paid Ads",
        details: ["Introduction to PPC", "Google Ads setup", "Bid strategies"]
      },
      {
        title: "Module 2: Social Media Ads",
        details: ["Facebook Ads", "Instagram promotions", "LinkedIn campaigns"]
      },
      {
        title: "Module 3: Retargeting",
        details: ["Remarketing strategies", "Audience segmentation", "Conversion funnels"]
      },
      {
        title: "Module 4: Performance Tracking",
        details: ["Analyzing campaign metrics", "A/B testing", "Improving ROI"]
      }
    ]
  },
  {
    id: 6,
    title: "Consumer Psychology in Marketing",
    rating: 4.6,
    duration: "3 months",
    category: "Marketing",
    skill: "Intermediate",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Understand consumer behavior and decision-making",
    skills: ["Behavioral Psychology", "Neuromarketing", "Brand Perception"],
    tools: ["Survey Tools", "SPSS", "Google Analytics"],
    modules: [
      {
        title: "Module 1: Basics of Consumer Psychology",
        details: ["Buying decisions", "Motivation factors", "Psychological triggers"]
      },
      {
        title: "Module 2: Neuromarketing",
        details: ["Brain-driven marketing", "Emotional branding", "Case studies"]
      },
      {
        title: "Module 3: Case Studies",
        details: ["Real-world examples", "Behavior analysis", "Successful campaigns"]
      }
    ]
  },
  {
    id: 7,
    title: "Marketing Tools & AI Integration",
    rating: 4.8,
    duration: "3 months",
    category: "Marketing",
    skill: "Beginner",
    price: "₹3500",
    negoprice: "₹7500",
    image: analyticsImg,
    description: "Leverage AI tools for marketing automation",
    skills: ["AI Automation", "Email Marketing", "Social Media Growth"],
    tools: ["HubSpot", "Mailchimp", "Zapier", "Hootsuite"],
    modules: [
      {
        title: "Module 1: Marketing Automation Basics",
        details: ["Email sequences", "Trigger setup", "Drip campaigns"]
      },
      {
        title: "Module 2: AI in Social Media",
        details: ["AI post creation", "Scheduling tools", "Growth strategies"]
      },
      {
        title: "Module 3: Workflow Automation",
        details: ["Zapier integrations", "Automating tasks", "Connecting apps"]
      }
    ]
  },

  // 3. Technology
  {
    id: 8,
    title: "Frontend Development",
    rating: 4.7,
    duration: "3 months",
    category: "Technology",
    subcategory: "Front End",
    skill: "Intermediate",
    price: "₹7500",
    negoprice: "₹10000",
    image: analyticsImg,
    description: "Build modern web applications with React",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    tools: ["VS Code", "GitHub", "Figma"],
    modules: [
      {
        title: "Module 1: HTML & CSS",
        details: ["Building static pages", "Responsive design", "Flexbox/Grid"]
      },
      {
        title: "Module 2: JavaScript",
        details: ["Functions & loops", "DOM manipulation", "Working with APIs"]
      },
      {
        title: "Module 3: React Basics",
        details: ["Components & props", "Hooks", "State management"]
      },
      {
        title: "Module 4: Advanced React",
        details: ["Context API", "Routing", "Performance optimization"]
      }
    ]
  },
  {
    id: 9,
    title: "Backend Development",
    rating: 4.6,
    duration: "3 months",
    category: "Technology",
    subcategory: "Back End",
    skill: "Intermediate",
    price: "₹7500",
    negoprice: "₹10000",
    image: analyticsImg,
    description: "Build scalable backend applications with Node.js",
    skills: ["Node.js", "Express.js", "APIs", "Authentication"],
    tools: ["Postman", "MongoDB", "Docker"],
    modules: [
      {
        title: "Module 1: Node.js Basics",
        details: ["Core concepts", "Event loop", "Asynchronous programming"]
      },
      {
        title: "Module 2: Express.js",
        details: ["Routing", "Middleware", "REST APIs"]
      },
      {
        title: "Module 3: Database",
        details: ["MongoDB integration", "CRUD operations", "Mongoose basics"]
      },
      {
        title: "Module 4: Authentication",
        details: ["JWT", "OAuth2", "Session handling"]
      }
    ]
  },
  {
    id: 10,
    title: "Full Stack Web Development",
    rating: 4.9,
    duration: "3 months",
    category: "Technology",
    subcategory: "Full Stack",
    skill: "Expert",
    price: "₹14000",
    negoprice: "₹15000",
    image: analyticsImg,
    description: "Complete web development from frontend to backend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    tools: ["VS Code", "GitHub", "Postman", "Docker"],
    modules: [
      {
        title: "Module 1: Frontend",
        details: ["React fundamentals", "Hooks", "State management"]
      },
      {
        title: "Module 2: Backend",
        details: ["Node.js & Express APIs", "Middleware", "API authentication"]
      },
      {
        title: "Module 3: Database",
        details: ["MongoDB basics", "Mongoose models", "Database relationships"]
      },
      {
        title: "Module 4: Deployment",
        details: ["Docker basics", "CI/CD pipelines", "Cloud deployment"]
      }
    ]
  },

  // 4. Counselling
  {
    id: 11,
    title: "Effective Communication Skills",
    rating: 4.5,
    duration: "3 months",
    category: "Counselling",
    skill: "Beginner",
    price: "₹7500",
    image: analyticsImg,
    description: "Develop strong communication and interpersonal skills",
    skills: ["Verbal Skills", "Listening Skills", "Body Language", "Empathy"],
    tools: ["Roleplay", "Presentation Tools"],
    modules: [
      {
        title: "Module 1: Basics of Communication",
        details: ["Verbal communication", "Non-verbal communication", "Clarity & tone"]
      },
      {
        title: "Module 2: Active Listening",
        details: ["Listening exercises", "Providing feedback", "Avoiding misunderstandings"]
      },
      {
        title: "Module 3: Conflict Resolution",
        details: ["Identifying conflicts", "Mediating effectively", "Maintaining relationships"]
      }
    ]
  },
  {
    id: 12,
    title: "Presentation & Public Speaking",
    rating: 4.7,
    duration: "3 months",
    category: "Counselling",
    skill: "Intermediate",
    price: "₹7500",
    image: analyticsImg,
    description: "Master the art of presentations and public speaking",
    skills: ["Public Speaking", "Stage Confidence", "Storytelling"],
    tools: ["PowerPoint", "Microphone Techniques"],
    modules: [
      {
        title: "Module 1: Overcoming Fear",
        details: ["Confidence building", "Stage presence", "Breathing techniques"]
      },
      {
        title: "Module 2: Storytelling",
        details: ["Narrative building", "Engaging content", "Using emotions effectively"]
      },
      {
        title: "Module 3: Persuasion",
        details: ["Influencing audience", "Power of words", "Call-to-action techniques"]
      }
    ]
  },
  {
    id: 13,
    title: "Relationship Building & Networking",
    rating: 4.6,
    duration: "3 months",
    category: "Counselling",
    skill: "Intermediate",
    price: "₹7500",
    image: analyticsImg,
    description: "Build meaningful professional relationships",
    skills: ["Networking", "Trust Building", "Collaboration"],
    tools: ["LinkedIn", "Event Tools"],
    modules: [
      {
        title: "Module 1: Networking Basics",
        details: ["Professional connections", "First impressions", "Maintaining contacts"]
      },
      {
        title: "Module 2: Building Trust",
        details: ["Trust exercises", "Empathy in communication", "Consistency"]
      },
      {
        title: "Module 3: Professional Growth",
        details: ["Leveraging connections", "Collaboration opportunities", "Career benefits"]
      }
    ]
  },
  {
    id: 14,
    title: "Psychological Counselling Techniques",
    rating: 4.8,
    duration: "3 months",
    category: "Counselling",
    skill: "Expert",
    price: "₹7500",
    image: analyticsImg,
    description: "Learn fundamental counselling and psychological support methods",
    skills: ["Counselling Basics", "Psychological Support", "Case Handling"],
    tools: ["Journaling Tools", "Case Study Methods"],
    modules: [
      {
        title: "Module 1: Basics of Counselling",
        details: ["Types of counselling", "Ethical considerations", "Effective methods"]
      },
      {
        title: "Module 2: Psychological Support",
        details: ["Helping techniques", "Mental health awareness", "Crisis management"]
      },
      {
        title: "Module 3: Case Handling",
        details: ["Real-world counselling cases", "Confidentiality", "Client communication"]
      }
    ]
  }
];

// Import Supabase functions
import { getCourses as getCoursesFromSupabase, getCourseById as getCourseByIdFromSupabase } from '../lib/supabase';

// Helper functions
export const getCoursesByCategory = async (category) => {
  try {
    const { data, error } = await getCoursesFromSupabase({ category });
    if (error) {
      console.error('Error fetching courses by category:', error);
      return allCourses.filter((course) => course.category === category);
    }
    return data || [];
  } catch (error) {
    console.error('Error in getCoursesByCategory:', error);
    return allCourses.filter((course) => course.category === category);
  }
};

export const getCoursesBySubcategory = (subcategory) =>
  allCourses.filter((course) => course.subcategory === subcategory);

export const getCoursesByPriceRange = (minPrice, maxPrice) =>
  allCourses.filter((course) => {
    const price = parseInt(course.price.toString().replace("₹", ""));
    return price >= minPrice && price <= maxPrice;
  });

export const getDomainStats = async () => {
  try {
    const { data, error } = await getCoursesFromSupabase();
    if (error) {
      console.error('Error fetching courses for stats:', error);
      return {
        "Content Creation": getCoursesByCategory("Content Creation").length,
        Marketing: getCoursesByCategory("Marketing").length,
        Technology: getCoursesByCategory("Technology").length,
        Counselling: getCoursesByCategory("Counselling").length,
      };
    }
    
    const stats = {};
    data.forEach(course => {
      stats[course.category] = (stats[course.category] || 0) + 1;
    });
    
    return stats;
  } catch (error) {
    console.error('Error in getDomainStats:', error);
    return {
      "Content Creation": allCourses.filter(c => c.category === "Content Creation").length,
      Marketing: allCourses.filter(c => c.category === "Marketing").length,
      Technology: allCourses.filter(c => c.category === "Technology").length,
      Counselling: allCourses.filter(c => c.category === "Counselling").length,
    };
  }
};

// Function to get all courses from Supabase with fallback
export const getAllCourses = async () => {
  try {
    const { data, error } = await getCoursesFromSupabase();
    if (error) {
      console.error('Error fetching all courses:', error);
      return allCourses;
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = data.map(course => ({
      ...course,
      skills: course.course_skills?.map(s => s.skill_name) || [],
      tools: course.course_tools?.map(t => t.tool_name) || [],
      modules: course.course_modules?.map(m => ({
        title: m.title,
        details: m.course_module_details?.map(d => d.detail) || []
      })) || []
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error in getAllCourses:', error);
    return allCourses;
  }
};

// Function to get course by ID from Supabase with fallback
export const getCourseById = async (id) => {
  try {
    const { data, error } = await getCourseByIdFromSupabase(id);
    if (error) {
      console.error('Error fetching course by ID:', error);
      return allCourses.find(c => c.id === parseInt(id));
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = {
      ...data,
      skills: data.course_skills?.map(s => s.skill_name) || [],
      tools: data.course_tools?.map(t => t.tool_name) || [],
      modules: data.course_modules?.map(m => ({
        title: m.title,
        details: m.course_module_details?.map(d => d.detail) || []
      })) || []
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error in getCourseById:', error);
    return allCourses.find(c => c.id === parseInt(id));
  }
};

// Export the database function as default
export default getCoursesFromDB;

// Also export the static data for reference
export { staticCourses };

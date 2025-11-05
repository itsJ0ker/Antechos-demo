// Your existing trainer data and functions
// ... existing code ...

// Workforce data
const workforceData = [
  {
    id: 3,
    name: "Ritika Gupta",
    profile: "Digital Marketing Specialist",
    photo: "./src/assets/instructors/ritika.jpg",
    skills: [
      "SEO (On-Page, Off-Page, Technical)",
      "Content Marketing",
      "SMO (Social Media Optimization)",
      "SMM (Social Media Marketing)",
      "Keyword Research",
      "Link Building",
      "Content Writing",
      "Competitor Analysis",
    ],
    coverPhoto: "coverPhotoURL",
    bio: "A skilled digital marketer proficient in SEO, SMO, and SMM, with strengths in boosting online visibility and engagement for businesses. Organized and motivated, eager to apply and grow skills while facilitating company growth.",
    expertise: [
      "Search Engine Optimization",
      "Content Marketing",
      "Social Media Optimization",
      "Digital Campaign Management",
      "Keyword Research and Analysis",
      "Competitor Strategy Analysis",
    ],
    certifications: [
      "HubSpot SEO Certification",
      "Google Ads Certification",
      "Content Marketing Certification",
      "Moz SEO Essentials Certification",
      "Google Analytics Individual Qualification",
      "Skillshare Content Writing Classes",
    ],
    ratings: 4.7,
    reviews: 15,
    location: "New Delhi, India",
    languages: ["English", "Hindi"],
    availability: "Weekdays",
    about:
      "Experienced in SEO techniques, content writing, and social media marketing with a proven track record in improving website traffic and engagement. Adept at using tools like Ahrefs, SEMrush, and Google Analytics to optimize campaigns.",
    industry: "Digital Marketing",
    experience: "SEO Executive & Content Writer (Internships & Freelance)",
    fee: "₹700/hour",
    contact: {
      email: "ritikagupta61341@gmail.com",
      phone: "9220919965",
      website: "",
      linkedin: "",
    },
    achievements: [
      "Increased organic traffic by 75% for Reeltor via targeted SEO campaigns.",
      "Boosted product page engagement by 50% for Gulbhahar by optimizing content.",
      "Developed engaging SEO-friendly blogs and email campaigns.",
      "Successfully collaborated with content creators to improve brand reach.",
    ],
    projects: [],
    courses: [],
    testimonials: [],
    education: [
      {
        degree: "B.A. English (Honours)",
        institution: "Delhi University",
        year: "Ongoing",
      },
      {
        degree: "Master in Digital Marketing",
        institution: "Delhi Institute of Digital Marketing",
        year: "Completed",
      },
      {
        degree: "High School & Matric",
        institution: "St. Marks World School, Meera Bagh (CBSE)",
        year: "Completed",
      },
    ],
    publications: [],
    tools: [
      "Google Analytics",
      "Ahrefs",
      "SEMrush",
      "Yoast SEO",
      "Google Keyword Planner",
      "Surfer SEO",
      "Rank Math",
      "Meta Business Suite",
      "Hootsuite",
    ],
  },
  {
    id: 4,
    name: "Mehak Kukreja",
    profile: "BCA Graduate | Aspiring Web Developer",
    photo: "./src/assets/instructors/Mehak.jpg",
    skills: [
      "Web Development",
      "HTML",
      "CSS",
      "Java",
      "MySQL",
      "Digital Marketing",
      "Graphic Design (Canva)",
      "MS Excel",
      "MS Word",
      "Leadership",
      "Management Skills",
    ],
    coverPhoto: "coverPhotoURL",
    bio: "A passionate and motivated BCA graduate eager to apply academic knowledge and develop professional skills in web development, digital marketing, and leadership.",
    expertise: [
      "Frontend Development",
      "Database Management",
      "Event Management",
      "Digital Marketing",
      "Graphic Design",
    ],
    certifications: [
      "IBM - Training and Placement Course",
      "Web Development Fundamentals - IBM",
      "Project-Based Learning and Design Thinking - IBM",
    ],
    ratings: 4.6,
    reviews: 10,
    location: "Delhi, India",
    languages: ["English", "Hindi"],
    availability: "Weekdays",
    about:
      "Seeking an entry-level position in a dynamic organization where I can contribute to projects while growing my skills in web development, data entry, and leadership roles.",
    industry: "Information Technology",
    experience:
      "Internships & Volunteer Roles in Web Development, Event Management, and Tutoring",
    fee: "₹500/hour",
    contact: {
      email: "mehakkukreja40@gmail.com",
      phone: "9311012447",
      website: "",
      linkedin: "",
    },
    achievements: [
      "Organized and managed college TechFest events.",
      "Conducted placement drives connecting students with potential employers.",
      "Tutored multiple students improving their academic performance.",
    ],
    projects: [],
    courses: [],
    testimonials: [],
    education: [
      {
        degree: "Bachelor of Computer Applications",
        institution:
          "Trinity Institute of Professional Studies (IP University)",
        year: "2024",
      },
      {
        degree: "High School",
        institution: "St. Marks World School",
        year: "Completed",
      },
    ],
    publications: [],
    tools: [
      "HTML/CSS",
      "Java",
      "MySQL",
      "Canva",
      "Microsoft Office Suite",
    ],
  },
  {
    id: 5,
    name: "Yukti Gupta",
    profile: "Leader at Antechos India",
    photo: "./src/assets/instructors/yukti.jpg",
    skills: [
      "Leadership",
      "Team Management",
      "Communication",
      "Data Science",
      "Digital Marketing",
      "Problem Solving",
      "Strategic Planning",
    ],
    coverPhoto: "coverPhotoURL",
    bio: "Motivated leader at Antechos India with strong expertise in data science and digital marketing. Skilled at managing teams, driving projects, and implementing strategies that achieve business goals.",
    expertise: [
      "Leadership",
      "Project Management",
      "Data Science",
      "Digital Marketing",
      "Business Strategy",
      "Team Collaboration",
    ],
    certifications: [
      "Data Science Certification",
      "Digital Marketing Certification",
    ],
    ratings: 4.6,
    reviews: 8,
    location: "India",
    languages: ["English", "Hindi"],
    availability: "Weekdays",
    about:
      "BCA graduate from Bhartiya Vidyapeeth Deemed University, currently working as a leader at Antechos India. Passionate about data-driven decision-making, marketing strategies, and empowering teams to perform at their best.",
    industry: "Technology / Business",
    experience: "Leadership role at Antechos India",
    fee: "₹1,200/hour",
    contact: {
      email: "",
      phone: "",
      website: "",
      linkedin: "",
    },
    achievements: [
      "Led multiple projects at Antechos India to successful completion",
      "Implemented data-driven strategies to improve company efficiency",
      "Trained team members in digital marketing and analytics",
    ],
    projects: [],
    courses: [],
    testimonials: [],
    education: [
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Bhartiya Vidyapeeth Deemed University",
        year: "",
      },
    ],
    publications: [],
    tools: [
      "Data Analytics Tools",
      "Digital Marketing Platforms",
      "Project Management Software",
      "Business Intelligence Tools",
    ],
  },
];

// Import Supabase functions
import { getWorkforce as getWorkforceFromSupabase, getWorkforceById as getWorkforceByIdFromSupabase } from '../lib/supabase';

// Workforce functions
export const getWorkforce = async () => {
  try {
    const { data, error } = await getWorkforceFromSupabase();
    if (error) {
      console.error('Error fetching workforce:', error);
      // Fallback to static data if Supabase fails
      return []; // Return empty array instead of fallback
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = data.map(worker => ({
      ...worker,
      skills: worker.workforce_skills?.map(s => s.skill_name) || [],
      expertise: worker.workforce_expertise?.map(e => e.expertise_area) || [],
      certifications: worker.workforce_certifications?.map(c => c.certification_name) || [],
      achievements: worker.workforce_achievements?.map(a => a.achievement_text) || [],
      education: worker.workforce_education || [],
      tools: worker.workforce_tools?.map(t => t.tool_name) || [],
      contact: {
        email: worker.email || '',
        phone: worker.phone || '',
        website: worker.website || '',
        linkedin: worker.linkedin || ''
      }
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error in getWorkforce:', error);
    return []; // Return empty array instead of fallback
  }
};

export const getWorkforceById = async (id) => {
  try {
    const { data, error } = await getWorkforceByIdFromSupabase(id);
    if (error) {
      console.error('Error fetching workforce member:', error);
      // Fallback to static data
      return null; // Return null instead of fallback
    }
    
    // Transform Supabase data to match existing structure
    const transformedData = {
      ...data,
      skills: data.workforce_skills?.map(s => s.skill_name) || [],
      expertise: data.workforce_expertise?.map(e => e.expertise_area) || [],
      certifications: data.workforce_certifications?.map(c => c.certification_name) || [],
      achievements: data.workforce_achievements?.map(a => a.achievement_text) || [],
      education: data.workforce_education || [],
      tools: data.workforce_tools?.map(t => t.tool_name) || [],
      contact: {
        email: data.email || '',
        phone: data.phone || '',
        website: data.website || '',
        linkedin: data.linkedin || ''
      }
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error in getWorkforceById:', error);
    return null; // Return null instead of fallback
  }
};


// src/data/universities.js

// ✅ Import all images from src/assets/universities
import amritaImg from "../assets/universities/Amrita.jpg";
import amuImg from "../assets/universities/AMU.png";
import andhraImg from "../assets/universities/Andhra.jpg";
import amityImg from "../assets/universities/Amity.jpg";
import cuolImg from "../assets/universities/cuol.jpg";
import dpuMumbaiImg from "../assets/universities/dpu.jpg";
import dpuPuneImg from "../assets/universities/dpupune.jpg";
import galgotiasImg from "../assets/universities/galgotias.jpg";
import glaImg from "../assets/universities/gla.jpg";
import jamiaImg from "../assets/universities/jamia.jpg";
import jainImg from "../assets/universities/jain.jpg";
import kukImg from "../assets/universities/kurushetra.jpg";
import lpuImg from "../assets/universities/lpu.jpg";
import maheImg from "../assets/universities/mahe.jpg";
import mujImg from "../assets/universities/muj.jpg";
import mzuImg from "../assets/universities/mzu.png";
import nmimsImg from "../assets/universities/nmims.jpg";
import parulImg from "../assets/universities/parul.jpg";
import shooliniImg from "../assets/universities/shoolini.jpg";
import shardaImg from "../assets/universities/sharda.jpg";
import smuImg from "../assets/universities/smu.jpg";
import srmImg from "../assets/universities/srm.jpg";
import upesImg from "../assets/universities/upes.jpg";
import upgradImg from "../assets/universities/upgrad.png";
import uttranchalImg from "../assets/universities/uttranchal.jpg";
import vguImg from "../assets/universities/VGU.jpg";
import vignanImg from "../assets/universities/vignan.jpg";

// ✅ Import approval logos
import ugcLogo from "../assets/universities/approvals/ugc.png";
import acbspLogo from "../assets/universities/approvals/acbsp.png";
import aicteLogo from "../assets/universities/approvals/aicte.png";
import aiuLogo from "../assets/universities/approvals/aiu.png";
import auapLogo from "../assets/universities/approvals/auap.png";
import nirfLogo from "../assets/universities/approvals/nirf.png";
import nbaLogo from "../assets/universities/approvals/nba.png";
import wesLogo from "../assets/universities/approvals/wes.png";
import naacLogo from "../assets/universities/approvals/naac.png";
import timesLogo from "../assets/universities/approvals/times.png";
import iacbeLogo from "../assets/universities/approvals/iacbe.png";
import bciLogo from "../assets/universities/approvals/bci.png";
import pciLogo from "../assets/universities/approvals/pci.png";
import qciLogo from "../assets/universities/approvals/qci.png";
import qsLogo from "../assets/universities/approvals/qsur.png";

export const universityData = [
  {
    id: 1,
    image: amritaImg,
    name: "Amrita University",
    code: "AMRITA",
    location: "Coimbatore, Tamil Nadu",
    description:
      "NAAC A++ accredited university with focus on value-based education and research.",
    about: "Amrita University is a NAAC A++ accredited multi-disciplinary research university with campuses across India. Known for its commitment to value-based education, the university offers a wide range of undergraduate, postgraduate, and doctoral programs.",
    programs: ["B.Tech", "MBA", "Medical", "Arts"],
    collaborations: ["42 International Universities", "300+ Industry Partners"],
    rating: 4.7,
    keyInfo: {
      established: "1994",
      campusSize: "400+ acres",
      ranking: "NAAC A++",
      fees: "₹2,00,000 - ₹3,50,000 per year",
    },
    approvals: [
      { name: "UGC", logo: ugcLogo },
      { name: "NAAC A++", logo: naacLogo },
      { name: "AICTE", logo: aicteLogo },
    ],
    courses: [
      {
        name: "Bachelor of Technology",
        description: "Comprehensive engineering program with multiple specializations",
        specialization: ["Computer Science", "Electronics", "Mechanical", "Civil"],
        fees: "₹2,50,000",
        duration: "4 years",
      },
      {
        name: "Master of Business Administration",
        description: "Advanced business management program",
        specialization: ["Finance", "Marketing", "HR", "Operations"],
        fees: "₹3,00,000",
        duration: "2 years",
      },
    ],
    faq: [
      {
        q: "Is Amrita University UGC approved?",
        a: "Yes, Amrita University is UGC approved and NAAC A++ accredited.",
      },
      {
        q: "What are the admission requirements?",
        a: "Admission requirements vary by program. Generally, students need to meet minimum academic criteria and may need to appear for entrance exams.",
      },
    ],
  },
  {
    id: 2,
    image: amuImg,
    name: "Aligarh Muslim University (AMU)",
    code: "AMU",
    location: "Aligarh, Uttar Pradesh",
    description:
      "Premier central university with blend of modern and traditional education.",
    about: "Aligarh Muslim University is a premier central university established in 1875. It offers a unique blend of modern and traditional education with a strong emphasis on research and academic excellence.",
    programs: ["BA", "BSc", "B.Tech", "Medical", "Law"],
    collaborations: ["Oxford University", "Cambridge University"],
    rating: 4.5,
    keyInfo: {
      established: "1875",
      campusSize: "467.6 hectares",
      ranking: "NAAC A",
      fees: "₹10,000 - ₹50,000 per year",
    },
    approvals: [
      { name: "UGC", logo: ugcLogo },
      { name: "NAAC A", logo: naacLogo },
      { name: "AIU", logo: aiuLogo },
    ],
    courses: [
      {
        name: "Bachelor of Arts",
        description: "Liberal arts program with diverse subjects",
        specialization: ["English", "History", "Political Science", "Economics"],
        fees: "₹15,000",
        duration: "3 years",
      },
      {
        name: "Bachelor of Technology",
        description: "Engineering program with modern curriculum",
        specialization: ["Computer Science", "Electronics", "Mechanical"],
        fees: "₹45,000",
        duration: "4 years",
      },
    ],
    faq: [
      {
        q: "Is AMU a central university?",
        a: "Yes, Aligarh Muslim University is a central university established by an Act of Parliament.",
      },
      {
        q: "What is the admission process?",
        a: "Admission is through AMU entrance test (AMUEEE) for most programs.",
      },
    ],
  },
  {
    image: amuImg,
    name: "Aligarh Muslim University (AMU)",
    code: "AMU",
    location: "Aligarh, Uttar Pradesh",
    description:
      "Premier central university with blend of modern and traditional education.",
    programs: ["BA", "BSc", "B.Tech", "Medical", "Law"],
    collaborations: ["Oxford University", "Cambridge University"],
    rating: 4.5,
    keyInfo: {
      established: "1875",
      campusSize: "467.6 hectares",
      ranking: "NAAC A",
      fees: "₹10,000 - ₹50,000 per year",
    },
  },
  {
    id: 3,
    image: andhraImg,
    name: "Andhra University",
    code: "AU",
    location: "Visakhapatnam, Andhra Pradesh",
    description:
      "One of the oldest universities with strong research programs.",
    about: "Andhra University, established in 1926, is one of the oldest and most prestigious universities in India. It has been at the forefront of higher education and research for nearly a century.",
    programs: ["Engineering", "Science", "Arts", "Law", "Pharmacy"],
    collaborations: ["International research programs", "Government projects"],
    rating: 4.2,
    keyInfo: {
      established: "1926",
      campusSize: "200 acres",
      ranking: "NAAC A+",
      fees: "₹5,000 - ₹1,00,000 per year",
    },
    approvals: [
      { name: "UGC", logo: ugcLogo },
      { name: "NAAC A+", logo: naacLogo },
      { name: "AICTE", logo: aicteLogo },
    ],
    courses: [
      {
        name: "Bachelor of Engineering",
        description: "Comprehensive engineering education",
        specialization: ["Civil", "Mechanical", "Electronics", "Computer Science"],
        fees: "₹80,000",
        duration: "4 years",
      },
      {
        name: "Master of Science",
        description: "Advanced science programs",
        specialization: ["Physics", "Chemistry", "Mathematics", "Biology"],
        fees: "₹40,000",
        duration: "2 years",
      },
    ],
    faq: [
      {
        q: "What is the university's ranking?",
        a: "Andhra University is NAAC A+ accredited and consistently ranks among top universities in India.",
      },
      {
        q: "Are there research opportunities?",
        a: "Yes, the university has strong research programs across various disciplines with excellent facilities.",
      },
    ],
  },
  {
    image: amityImg,
    id: "amity-university",
    name: "Amity University Online",
    code: "AMITY-ONLINE",
    location: "Online",
    description:
      "Leading private university offering UGC-entitled online degrees",
    about:
      "Amity University Online is the digital education initiative of Amity University, one of India's leading private universities known for its strong industry connections and focus on employability. Amity Online is designed to deliver high-quality, UGC-entitled degrees through a flexible and interactive digital platform, making education accessible to students and working professionals across the globe.",
    programs: ["BBA", "BCA", "MBA", "B.Com", "M.Com"],
    collaborations: ["Global Industry Partners", "International Universities"],
    rating: 4.4,
    keyInfo: {
      established: "2005",
      campusSize: "Virtual",
      ranking: "NAAC A+",
      fees: "₹1,20,000 - ₹1,95,000 total program",
    },
    approvals: [
      { name: "UGC-DEB", logo: ugcLogo },
      { name: "AICTE (For MBA, MCA)", logo: aicteLogo },
      { name: "WES", logo: wesLogo },
      { name: "NAAC A+", logo: naacLogo },
      { name: "ACBSP - Global Accreditation", logo: acbspLogo },
      { name: "QS World University Rankings", logo: qsLogo },
    ],
    courses: [
      {
        name: "Online B.Com",
        specialization: ["General"],
        fees: "₹99,000 ",
        duration: "3 years",
      },
      {
        name: "Online M.Com",
        specialization: ["General"],
        fees: "₹1,20,000 ",
        duration: "2 years",
      },
      {
        name: "Online BBA",
        specialization: [
          "General",
          "Finance",
          "Marketing",
          "Human Resource Management",
          "International Business",
          "Digital Marketing",
          "Retail Management",
          "Entrepreneurship",
        ],
        fees: "₹1,65,000 ",
        duration: "3 years",
      },
      {
        name: "Online BCA",
        specialization: [
          "General",
          "Data Science & Big Data Analytics",
          "Cloud Computing & Cybersecurity",
        ],
        fees: "₹1,20,000 ",
        duration: "3 years",
      },
      {
        name: "Online MBA",
        specialization: [
          "Finance",
          "Marketing",
          "Human Resource Management",
          "International Business",
          "Information Technology",
          "Operations Management",
          "Digital Marketing",
          "Retail Management",
          "Banking & Financial Services",
          "Business Analytics",
          "Supply Chain & Logistics Management",
          "Hospital & Healthcare Management",
          "Entrepreneurship",
        ],
        fees: "₹1,99,000 ",
        duration: "2 years",
      },
    ],
    feeStructure:
      "Fees vary by program. Example: Online MBA - ₹1,95,000 total; BBA - ₹1,20,000 total (approx).",
    faq: [
      {
        q: "Is Amity Online degree valid?",
        a: "Yes, Amity Online is UGC-DEB approved and globally recognized.",
      },
      {
        q: "Does Amity provide placement support?",
        a: "Yes, Amity offers AI-powered career support, job tools, and internship opportunities.",
      },
      {
        q: "Are there live classes?",
        a: "Yes, Amity Online provides both live and recorded sessions.",
      },
    ],
  },
  {
    image: cuolImg,
    name: "Chandigarh University (CUOL)",
    code: "CUOL",
    location: "Mohali, Punjab",
    description: "Dynamic university with focus on innovation and placements.",
    programs: [
      "Engineering",
      "Pharmacy",
      "Management",
      "Architecture",
      "Hotel Management",
    ],
    collaborations: ["Google", "Microsoft", "IBM"],
    rating: 4.4,
    keyInfo: {
      established: "2012",
      campusSize: "200 acres",
      ranking: "NAAC A+",
      fees: "₹1,00,000 - ₹2,50,000 per year",
    },
  },
  {
    image: dpuMumbaiImg,
    name: "D Y Patel Mumbai (DPU)",
    code: "DPU-MUM",
    location: "Mumbai, Maharashtra",
    description: "Professional education with strong industry connections.",
    programs: ["Engineering", "Management", "Pharmacy", "Architecture"],
    collaborations: ["Industry-driven curriculum", "International internships"],
    rating: 4.1,
    keyInfo: {
      established: "2014",
      campusSize: "25 acres",
      ranking: "NAAC A",
      fees: "₹80,000 - ₹1,50,000 per year",
    },
  },
  {
    image: dpuPuneImg,
    name: "D Y Patel Pune (DPU)",
    code: "DPU-PUN",
    location: "Pune, Maharashtra",
    description: "Technical education hub with modern infrastructure.",
    programs: ["Engineering", "MBA", "Computer Applications", "Design"],
    collaborations: ["German Academic Exchange", "Industry projects"],
    rating: 4.0,
    keyInfo: {
      established: "2015",
      campusSize: "30 acres",
      ranking: "NAAC A",
      fees: "₹75,000 - ₹1,40,000 per year",
    },
  },
  {
    image: galgotiasImg,
    name: "Galgotias University",
    code: "GAL",
    location: "Greater Noida, Uttar Pradesh",
    description: "Known for technical and management education.",
    programs: ["Engineering", "Law", "MBA", "Media Studies"],
    collaborations: ["Infosys", "Wipro", "International tie-ups"],
    rating: 4.1,
    keyInfo: {
      established: "2011",
      campusSize: "52 acres",
      ranking: "NAAC A",
      fees: "₹90,000 - ₹1,80,000 per year",
    },
  },
  {
    image: glaImg,
    name: "GLA University",
    code: "GLA",
    location: "Mathura, Uttar Pradesh",
    description: "Strong emphasis on research and innovation.",
    programs: ["Engineering", "Pharmacy", "Management", "Science"],
    collaborations: ["Industry projects", "Government programs"],
    rating: 4.0,
    keyInfo: {
      established: "1998",
      campusSize: "110 acres",
      ranking: "NAAC A",
      fees: "₹80,000 - ₹1,50,000 per year",
    },
  },
  {
    image: jamiaImg,
    name: "Jamia Hamdard University",
    code: "JAMIA",
    location: "New Delhi",
    description: "Renowned for medical, pharmacy and IT programs.",
    programs: ["Medical", "Pharmacy", "IT", "Management"],
    collaborations: ["WHO", "Government research programs"],
    rating: 4.4,
    keyInfo: {
      established: "1989",
      campusSize: "100 acres",
      ranking: "NAAC A",
      fees: "₹70,000 - ₹1,60,000 per year",
    },
  },
  {
    image: jainImg,
    id: "jain-online",
    name: "Jain University Online",
    code: "JAIN-ONLINE",
    location: "Bengaluru, Karnataka",
    description: "UGC-approved online programs with global recognition",
    about:
      "Jain Online is the e-learning platform of the prestigious Jain Deemed To Be University located in Bengaluru. The Jain Group has 30 years of experience and credibility in providing quality education. The university excels not just in education but also in research and entrepreneurship.",
    programs: ["BBA", "BCA", "MBA", "B.Com", "M.Com", "MA", "MCA"],
    collaborations: ["2000+ Hiring Partners", "International Universities"],
    rating: 4.5,
    keyInfo: {
      established: "1990",
      campusSize: "Virtual",
      ranking: "NAAC A++",
      fees: "₹80,000 - ₹1,50,000 per year",
    },
    approvals: [
      { name: "UGC", logo: ugcLogo },
      { name: "AICTE", logo: aicteLogo },
      { name: "AIU", logo: aiuLogo },
      { name: "NIRF", logo: nirfLogo },
      { name: "WES", logo: wesLogo },
      { name: "NAAC A++", logo: naacLogo },
      { name: "QS WORLD UNIVERSITY", logo: qsLogo },
      { name: "AUAP", logo: auapLogo },
    ],
    courses: [
      {
        name: "Online MA",
        description:
          "The Online MA program at Jain University offers flexible enrollment with strong academic engagement.",
        specialization: [
          "Journalism and Mass Communication",
          "Economics",
          "English",
          "Public Policy & Administration",
        ],
        fees: "₹90,000 ",
        duration: "2 years",
      },
      {
        name: "Online M.Com",
        description:
          "Jain Online offers an M.Com degree in three specializations.",
        specialization: [
          "Accounting & Finance",
          "International Finance",
          "Professional Accounting & Finance",
        ],
        fees: "₹1,10,000 ",
        duration: "2 years",
      },
      {
        name: "Online B.Com",
        description:
          "Jain University offers Online B.Com in specializations such as Accounting & Finance.",
        specialization: [
          "Accounting & Finance",
          "International Finance",
          "General",
          "Corporate Accounting",
        ],
        fees: "₹90,000 ",
        duration: "3 years",
      },
      {
        name: "Online MCA",
        description:
          "Jain Online's MCA program offers eight specialization areas.",
        specialization: [
          "Computer Science",
          "Data Analytics",
          "Cyber Security",
          "Data Science",
          "Artificial Intelligence",
          "Cloud Computing",
          "Full Stack Development",
          "NLP & LLM Development",
          "DevOps",
        ],
        fees: "₹1,60,000 ",
        duration: "2 years",
      },
      {
        name: "Online BBA",
        description:
          "The Online BBA from Jain University is designed for accessibility and industry relevance.",
        specialization: [
          "Engineering and Project Management",
          "General Management",
          "Data Science and Analytics",
          "HRM",
          "Finance",
          "Digital Marketing",
          "Healthcare Management",
        ],
        fees: "₹1,50,000 ",
        duration: "3 years",
      },
    ],
    feeStructure:
      "Fee structure varies by program and specialization. Jain Online offers affordable fees with flexible payment options.",
    faq: [
      {
        q: "Is Jain University Online approved by UGC?",
        a: "Yes, Jain University Online is approved by the UGC-DEB to offer online degree programs.",
      },
      {
        q: "Are Jain Online degrees valid for government jobs?",
        a: "Yes, all Jain Online degrees are UGC-entitled and valid for higher studies and government employment.",
      },
      {
        q: "Does Jain Online offer placement assistance?",
        a: "Yes, Jain Online provides placement support through its career services.",
      },
    ],
  },
  {
    image: kukImg,
    name: "Kurukshetra University",
    code: "KUK",
    location: "Kurukshetra, Haryana",
    description: "Oldest universities in Haryana with diverse programs.",
    programs: ["Arts", "Science", "Law", "Management"],
    collaborations: ["Research projects", "Industry collaborations"],
    rating: 4.1,
    keyInfo: {
      established: "1956",
      campusSize: "473 acres",
      ranking: "NAAC A+",
      fees: "₹20,000 - ₹1,00,000 per year",
    },
  },
  {
    image: lpuImg,
    name: "Lovely Professional University (LPU)",
    code: "LPU",
    location: "Phagwara, Punjab",
    description: "Largest private university in India with global exposure.",
    programs: ["Engineering", "Management", "Law", "Design"],
    collaborations: ["200+ International collaborations"],
    rating: 4.3,
    keyInfo: {
      established: "2005",
      campusSize: "600 acres",
      ranking: "NAAC A++",
      fees: "₹1,20,000 - ₹2,50,000 per year",
    },
  },
  {
    image: maheImg,
    name: "Manipal Academy of Higher Education (MAHE)",
    code: "MAHE",
    location: "Manipal, Karnataka",
    description: "Deemed university with focus on global education.",
    programs: ["Medical", "Engineering", "Pharmacy", "Law"],
    collaborations: ["International medical colleges", "Research tie-ups"],
    rating: 4.6,
    keyInfo: {
      established: "1953",
      campusSize: "600 acres",
      ranking: "NAAC A++",
      fees: "₹2,50,000 - ₹5,00,000 per year",
    },
  },
  {
    image: mujImg,
    id: "manipal-university-Jaipur",
    name: "Manipal University Jaipur",
    code: "MUJ-ONLINE",
    location: "Jaipur, Rajasthan",
    description:
      "UGC-entitled online programs with industry-aligned curriculum",
    about:
      "Manipal University Online (MU Online) is the digital arm of the prestigious Manipal University Jaipur (MUJ). Established in 2021, the university offers UGC-entitled undergraduate and postgraduate programs.",
    programs: ["BBA", "BCA", "MBA", "B.Com", "M.Com", "MA", "MCA", "B.Tech"],
    collaborations: ["Industry Partners", "Global Universities"],
    rating: 4.7,
    keyInfo: {
      established: "2021",
      campusSize: "Virtual",
      ranking: "NAAC A+",
      fees: "₹80,000 - ₹1,80,000 per year",
    },
    approvals: [
      { name: "UGC", logo: ugcLogo },
      { name: "AICTE", logo: aicteLogo },
      { name: "NIRF", logo: nirfLogo },
      { name: "WES", logo: wesLogo },
      { name: "NAAC A+", logo: naacLogo },
      { name: "QS World University", logo: qsLogo },
      { name: "NBA", logo: nbaLogo },
    ],
    courses: [
      {
        name: "Online B.Com",
        description:
          "A UGC-DEB-approved 3-year undergraduate course in commerce.",
        specialization: ["General"],
        fees: "₹99,000 ",
        duration: "3 years",
      },
      {
        name: "Online M.Com",
        description:
          "A 2-year postgraduate degree focusing on global financial systems.",
        specialization: ["General"],
        fees: "₹1,08,000 ",
        duration: "2 years",
      },
      {
        name: "Online BBA",
        description:
          "A 3-year undergraduate business program approved by UGC-DEB and AICTE.",
        specialization: [
          "General Management",
          "Human Resource Management",
          "Marketing",
          "Finance & Accounting",
          "Digital Marketing",
        ],
        fees: "₹1,35,000 ",
        duration: "3 years",
      },
    ],
    feeStructure:
      "Manipal University Online offers flexible fee options with EMI and scholarships.",
    faq: [
      {
        q: "Is Manipal University Online approved by UGC?",
        a: "Yes, it is UGC-entitled and AICTE-approved.",
      },
      {
        q: "Does Online Manipal provide placement support?",
        a: "Yes, students receive placement training and interview preparation.",
      },
    ],
  },
  {
    image: mzuImg,
    name: "Mizoram University",
    code: "MZU",
    location: "Aizawl, Mizoram",
    description: "Central university in Mizoram.",
    programs: ["Science", "Arts", "Engineering", "Law"],
    collaborations: ["Research centers", "Government projects"],
    rating: 4.0,
    keyInfo: {
      established: "2001",
      campusSize: "978 acres",
      ranking: "NAAC A",
      fees: "₹15,000 - ₹60,000 per year",
    },
  },
  {
    image: nmimsImg,
    name: "NMIMS University",
    code: "NMIMS",
    location: "Mumbai, Maharashtra",
    description: "Leading management and multidisciplinary university.",
    programs: ["MBA", "Engineering", "Law", "Design"],
    collaborations: ["Harvard Business School", "Global tie-ups"],
    rating: 4.5,
    keyInfo: {
      established: "1981",
      campusSize: "90 acres",
      ranking: "NAAC A+",
      fees: "₹2,00,000 - ₹4,00,000 per year",
    },
  },
  {
    image: parulImg,
    name: "Parul University",
    code: "PARUL",
    location: "Vadodara, Gujarat",
    description: "Emerging university with strong academic focus.",
    programs: ["Engineering", "Law", "MBA", "Medical"],
    collaborations: ["Industry tie-ups", "Global partnerships"],
    rating: 4.2,
    keyInfo: {
      established: "2015",
      campusSize: "150 acres",
      ranking: "NAAC A",
      fees: "₹80,000 - ₹1,80,000 per year",
    },
  },
  {
    image: shooliniImg,
    name: "Shoolini University",
    code: "SHOOLINI",
    location: "Solan, Himachal Pradesh",
    description: "Research-focused private university.",
    programs: ["Biotech", "Pharmacy", "MBA", "Engineering"],
    collaborations: ["Research centers", "International universities"],
    rating: 4.3,
    keyInfo: {
      established: "2009",
      campusSize: "20 acres",
      ranking: "NAAC A",
      fees: "₹90,000 - ₹2,20,000 per year",
    },
  },
  {
    image: shardaImg,
    name: "Sharda University",
    code: "SHARDA",
    location: "Greater Noida, Uttar Pradesh",
    description: "Multidisciplinary private university with global exposure.",
    programs: ["Engineering", "Medical", "Law", "MBA"],
    collaborations: ["200+ international partnerships"],
    rating: 4.1,
    keyInfo: {
      established: "2009",
      campusSize: "63 acres",
      ranking: "NAAC A",
      fees: "₹1,00,000 - ₹2,50,000 per year",
    },
  },
  {
    image: smuImg,
    name: "Sikkim Manipal University (SMU)",
    code: "SMU",
    location: "Gangtok, Sikkim",
    description: "Blend of conventional and distance education.",
    programs: ["Engineering", "MBA", "Medical", "IT"],
    collaborations: ["Manipal Group", "Global universities"],
    rating: 4.0,
    keyInfo: {
      established: "1995",
      campusSize: "200 acres",
      ranking: "NAAC A",
      fees: "₹70,000 - ₹1,60,000 per year",
    },
  },
  {
    image: srmImg,
    name: "SRM University",
    code: "SRM",
    location: "Chennai, Tamil Nadu",
    description:
      "Top private university with focus on innovation and placements.",
    programs: ["Engineering", "Medical", "Law", "MBA"],
    collaborations: ["MIT", "Stanford", "Harvard"],
    rating: 4.6,
    keyInfo: {
      established: "1985",
      campusSize: "600 acres",
      ranking: "NAAC A++",
      fees: "₹2,00,000 - ₹3,50,000 per year",
    },
  },
  {
    image: upesImg,
    id: "upes-online",
    name: "UPES Online",
    code: "UPES-ONLINE",
    location: "Dehradun, Uttarakhand",
    description: "Industry-focused online programs with global rankings",
    about:
      "UPES Online is the digital learning vertical of UPES, aimed at empowering professionals, students, and lifelong learners with flexible, industry-relevant education.",
    programs: ["BBA", "BCA", "MBA", "MCA", "PG Diploma"],
    collaborations: ["Global Industry Partners", "International Universities"],
    rating: 4.6,
    keyInfo: {
      established: "2003",
      campusSize: "Virtual",
      ranking: "NAAC A",
      fees: "₹1,00,000 - ₹1,50,000 total program",
    },
    approvals: [
      { name: "UGC-DEB", logo: ugcLogo },
      { name: "NIRF", logo: nirfLogo },
      { name: "NAAC A", logo: naacLogo },
      { name: "QS World University Rankings", logo: qsLogo },
      { name: "WES Recognized", logo: wesLogo },
    ],
    courses: [
      {
        name: "UPES Online BBA",
        description:
          "The Online BBA program at UPES Online provides students with essential managerial and business skills.",
        specialization: [
          "Finance Management",
          "HR Management",
          "Marketing Management",
          "Operations Management",
        ],
      },
      {
        name: "Online MBA",
        description:
          "The flagship Online MBA program from UPES Online focuses on strategic thinking and leadership.",
        specialization: [
          "Logistics & Supply Chain Management",
          "International Business",
          "Business Analytics",
          "Digital Business",
        ],
      },
    ],
    feeStructure:
      "UPES Online offers flexible and transparent fee structures depending on the course and specialization.",
    faq: [
      {
        q: "Is UPES Online approved by UGC?",
        a: "Yes, UPES Online is UGC-DEB entitled and offers degrees that are globally recognized.",
      },
      {
        q: "Does UPES Online offer placement assistance?",
        a: "Yes, UPES Online provides strong placement support through career services.",
      },
    ],
  },
  {
    image: upgradImg,
    name: "UpGrad Institute",
    code: "UPGRAD",
    location: "Online",
    description: "Leading online education platform.",
    programs: ["MBA", "Data Science", "AI", "Engineering"],
    collaborations: ["Deakin University", "Liverpool", "IITs"],
    rating: 4.4,
    keyInfo: {
      established: "2015",
      campusSize: "Virtual",
      ranking: "NA",
      fees: "₹50,000 - ₹3,00,000 per year",
    },
  },
  {
    image: uttranchalImg,
    id: "uttaranchal-university-online",
    name: "Uttaranchal University Online",
    code: "UU-ONLINE",
    location: "Dehradun, Uttarakhand",
    description: "NAAC A+ accredited online programs with flexible learning",
    about:
      "Uttaranchal University Online (Online UU) is a UGC-entitled institution offering flexible, career-focused degree programs through a robust digital platform.",
    programs: ["BBA", "BCA", "BA", "MCA", "M.Com", "Diploma"],
    collaborations: ["ACCA", "CMA", "IBM", "Industry Partners"],
    rating: 4.3,
    keyInfo: {
      established: "2013",
      campusSize: "Virtual",
      ranking: "NAAC A+",
      fees: "₹80,000 - ₹1,20,000 total program",
    },
    approvals: [
      { name: "UGC", logo: ugcLogo },
      { name: "NAAC A+", logo: naacLogo },
      { name: "AICTE", logo: aicteLogo },
      { name: "AIU", logo: aiuLogo },
    ],
    courses: [
      {
        name: "Online BCA",
        description:
          "A 3-year undergraduate program focusing on programming and emerging technologies.",
        specialization: [
          "Artificial Intelligence",
          "Data Science",
          "Cyber Security",
          "Cloud Computing",
        ],
      },
      {
        name: "Online BBA",
        description:
          "A 3-year undergraduate business program designed to develop leadership and management skills.",
        specialization: [
          "Marketing",
          "Finance",
          "Human Resource Management",
          "International Business",
        ],
      },
    ],
    feeStructure:
      "Online UU offers competitive and transparent fee structures with easy installment options.",
    faq: [
      {
        q: "Is Uttaranchal University Online approved by UGC?",
        a: "Yes, it is UGC-entitled and offers degrees equivalent to on-campus programs.",
      },
      {
        q: "Does Online UU provide placement assistance?",
        a: "Yes, it offers CV-building workshops and virtual placement drives.",
      },
    ],
  },
  {
    image: vguImg,
    name: "Vivekananda Global University (VGU)",
    code: "VGU",
    location: "Jaipur, Rajasthan",
    description: "Focus on multidisciplinary education and innovation.",
    programs: ["Engineering", "Law", "Design", "Management"],
    collaborations: ["Industry partnerships", "Research programs"],
    rating: 4.2,
    keyInfo: {
      established: "2012",
      campusSize: "30 acres",
      ranking: "NAAC A",
      fees: "₹1,00,000 - ₹2,20,000 per year",
    },
  },
  {
    image: vignanImg,
    name: "Vignan's University",
    code: "VIGNAN",
    location: "Guntur, Andhra Pradesh",
    description: "Technical university with strong industry connections.",
    programs: ["Engineering", "Pharmacy", "Science", "Management"],
    collaborations: ["International research", "Industry projects"],
    rating: 4.0,
    keyInfo: {
      established: "2008",
      campusSize: "30 acres",
      ranking: "NAAC A",
      fees: "₹90,000 - ₹1,80,000 per year",
    },
  },
];

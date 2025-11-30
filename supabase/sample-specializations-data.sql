-- Sample Specializations Data
-- This file contains sample data for testing the enhanced specializations feature
-- IMPORTANT: Replace {UNIVERSITY_ID} and {COURSE_ID} with actual IDs from your database

-- First, find your university and course IDs:
-- SELECT id, name FROM universities;
-- SELECT id, course_name FROM university_courses WHERE university_id = {YOUR_UNIVERSITY_ID};

-- Example: MBA Specializations
-- Replace 1 with your actual university_id and course_id

-- MBA in Finance
INSERT INTO course_specializations (
  university_id,
  parent_course_id,
  name,
  description,
  duration,
  fees,
  eligibility,
  image_url,
  program_overview,
  industry_insight_title,
  industry_insight_content,
  industry_insight_stats,
  program_highlights,
  curriculum,
  career_paths,
  career_support,
  alumni_network,
  entry_level_info,
  mid_level_info,
  senior_level_info,
  booking_enabled,
  booking_cta_text,
  is_active,
  display_order
) VALUES (
  1, -- Replace with your university_id
  1, -- Replace with your course_id
  'MBA in Finance',
  'Comprehensive finance program designed to prepare students for leadership roles in the financial sector',
  '2 Years',
  '₹5,00,000',
  'Bachelor''s degree with 50% marks from a recognized university',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  'The MBA in Finance program is designed to provide students with a comprehensive understanding of financial management, investment strategies, and corporate finance. This program combines theoretical knowledge with practical applications, preparing graduates for successful careers in the dynamic world of finance.

Our curriculum is carefully crafted to cover all aspects of modern finance, from traditional financial analysis to cutting-edge fintech innovations. Students will learn from industry experts and gain hands-on experience through real-world projects and case studies.',
  'Finance Industry Outlook',
  'The finance industry is experiencing unprecedented growth, driven by digital transformation and increasing global interconnectedness. With the rise of fintech, blockchain, and AI in finance, professionals with strong analytical and technological skills are in high demand.

According to industry reports, the financial services sector is expected to grow by 25% over the next five years, creating thousands of new job opportunities for qualified professionals.',
  '[
    {"label": "Industry Growth", "value": "25%"},
    {"label": "Average Salary", "value": "₹12 LPA"},
    {"label": "Companies Hiring", "value": "500+"},
    {"label": "Placement Rate", "value": "95%"}
  ]'::jsonb,
  '[
    {
      "title": "Industry-Relevant Curriculum",
      "description": "Learn from real-world case studies and industry best practices used by top financial institutions"
    },
    {
      "title": "Expert Faculty",
      "description": "Learn from experienced professionals with 15+ years in investment banking, corporate finance, and financial consulting"
    },
    {
      "title": "Hands-on Projects",
      "description": "Work on live financial modeling projects, portfolio management simulations, and investment analysis"
    },
    {
      "title": "Placement Support",
      "description": "Dedicated placement cell with connections to top banks, investment firms, and financial institutions"
    },
    {
      "title": "Global Exposure",
      "description": "International study tours and guest lectures from global finance leaders"
    },
    {
      "title": "Certification Programs",
      "description": "Integrated preparation for CFA, FRM, and other professional certifications"
    }
  ]'::jsonb,
  '[
    {
      "semester": "SEM 1",
      "description": "Foundation courses in business and finance fundamentals",
      "subjects": [
        "Financial Accounting",
        "Managerial Economics",
        "Business Statistics",
        "Marketing Management",
        "Organizational Behavior",
        "Business Communication"
      ]
    },
    {
      "semester": "SEM 2",
      "description": "Core finance specialization courses",
      "subjects": [
        "Corporate Finance",
        "Investment Analysis",
        "Financial Markets & Institutions",
        "Risk Management",
        "Financial Modeling",
        "Business Law"
      ]
    },
    {
      "semester": "SEM 3",
      "description": "Advanced finance topics and electives",
      "subjects": [
        "Mergers & Acquisitions",
        "Portfolio Management",
        "Derivatives & Options Trading",
        "International Finance",
        "Financial Analytics",
        "Behavioral Finance"
      ]
    },
    {
      "semester": "SEM 4",
      "description": "Capstone projects and industry internship",
      "subjects": [
        "Strategic Financial Management",
        "FinTech & Innovation",
        "Private Equity & Venture Capital",
        "Capstone Project",
        "Industry Internship",
        "Thesis/Dissertation"
      ]
    }
  ]'::jsonb,
  '[
    {
      "title": "Financial Analyst",
      "description": "Analyze financial data, create detailed reports, and provide investment recommendations to businesses and individual clients",
      "salary_range": "₹6-12 LPA"
    },
    {
      "title": "Investment Banker",
      "description": "Facilitate mergers, acquisitions, IPOs, and capital raising for corporations and governments",
      "salary_range": "₹10-20 LPA"
    },
    {
      "title": "Portfolio Manager",
      "description": "Manage investment portfolios for individuals, institutions, and mutual funds to maximize returns while managing risk",
      "salary_range": "₹12-25 LPA"
    },
    {
      "title": "Risk Manager",
      "description": "Identify, assess, and mitigate financial risks for banks, insurance companies, and corporations",
      "salary_range": "₹8-15 LPA"
    },
    {
      "title": "Financial Consultant",
      "description": "Provide strategic financial advice to businesses on investments, tax planning, and financial restructuring",
      "salary_range": "₹7-14 LPA"
    }
  ]'::jsonb,
  'Our dedicated career support team provides comprehensive assistance throughout your job search journey. Services include:

• Resume building and LinkedIn profile optimization
• Mock interviews with industry professionals
• One-on-one career counseling sessions
• Access to exclusive job postings from partner companies
• Networking events with alumni and industry leaders
• Internship placement assistance
• Soft skills and communication training',
  'Join a network of over 10,000 successful alumni working in leading financial institutions worldwide. Our alumni community provides:

• Mentorship programs connecting students with experienced professionals
• Regular networking events and alumni meetups
• Access to exclusive job opportunities through alumni referrals
• Industry insights and career guidance
• Collaborative projects and business opportunities
• Annual alumni conferences and reunions',
  'Entry-level positions (0-2 years experience):
• Financial Analyst
• Junior Investment Analyst
• Credit Analyst
• Treasury Analyst
• Financial Planning Analyst

Expected salary range: ₹4-8 LPA

Focus on building strong analytical skills, learning financial software tools, and gaining industry certifications.',
  'Mid-level positions (3-7 years experience):
• Senior Financial Analyst
• Portfolio Manager
• Investment Manager
• Risk Manager
• Financial Controller

Expected salary range: ₹10-18 LPA

Focus on leadership development, strategic thinking, and building a professional network.',
  'Senior-level positions (8+ years experience):
• Chief Financial Officer (CFO)
• Director of Finance
• Investment Director
• Head of Risk Management
• VP of Corporate Finance

Expected salary range: ₹20-50+ LPA

Focus on strategic decision-making, team leadership, and driving organizational growth.',
  true,
  'Book Your Seat Today - Limited Seats Available!',
  true,
  1
);

-- MBA in Marketing
INSERT INTO course_specializations (
  university_id,
  parent_course_id,
  name,
  description,
  duration,
  fees,
  eligibility,
  image_url,
  program_overview,
  industry_insight_title,
  industry_insight_content,
  industry_insight_stats,
  program_highlights,
  curriculum,
  career_paths,
  career_support,
  alumni_network,
  entry_level_info,
  mid_level_info,
  senior_level_info,
  booking_enabled,
  booking_cta_text,
  is_active,
  display_order
) VALUES (
  1, -- Replace with your university_id
  1, -- Replace with your course_id
  'MBA in Marketing',
  'Comprehensive marketing program focusing on digital marketing, brand management, and consumer behavior',
  '2 Years',
  '₹5,00,000',
  'Bachelor''s degree with 50% marks from a recognized university',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
  'The MBA in Marketing program prepares students to become strategic marketing leaders in the digital age. Our curriculum combines traditional marketing principles with cutting-edge digital strategies, data analytics, and consumer psychology.

Students will learn to create compelling brand narratives, develop data-driven marketing campaigns, and leverage emerging technologies to reach and engage target audiences effectively.',
  'Marketing Industry Trends',
  'The marketing landscape is rapidly evolving with digital transformation at its core. Companies are investing heavily in digital marketing, with spending expected to reach $786 billion globally by 2026.

Marketing professionals who can blend creativity with data analytics are in high demand across industries.',
  '[
    {"label": "Digital Marketing Growth", "value": "30%"},
    {"label": "Average Salary", "value": "₹10 LPA"},
    {"label": "Job Openings", "value": "1000+"},
    {"label": "Placement Rate", "value": "92%"}
  ]'::jsonb,
  '[
    {
      "title": "Digital Marketing Focus",
      "description": "Master SEO, SEM, social media marketing, content marketing, and marketing automation"
    },
    {
      "title": "Brand Management",
      "description": "Learn to build, manage, and grow powerful brands in competitive markets"
    },
    {
      "title": "Data-Driven Approach",
      "description": "Use analytics and AI tools to make informed marketing decisions"
    },
    {
      "title": "Industry Projects",
      "description": "Work on real marketing campaigns for leading brands"
    },
    {
      "title": "Creative Workshops",
      "description": "Develop creative thinking and storytelling skills"
    },
    {
      "title": "Global Certifications",
      "description": "Google Ads, Facebook Blueprint, HubSpot certifications included"
    }
  ]'::jsonb,
  '[
    {
      "semester": "SEM 1",
      "description": "Marketing fundamentals and business foundation",
      "subjects": [
        "Principles of Marketing",
        "Consumer Behavior",
        "Marketing Research",
        "Business Statistics",
        "Managerial Economics",
        "Business Communication"
      ]
    },
    {
      "semester": "SEM 2",
      "description": "Digital marketing and brand management",
      "subjects": [
        "Digital Marketing",
        "Brand Management",
        "Social Media Marketing",
        "Content Marketing",
        "Marketing Analytics",
        "Sales Management"
      ]
    },
    {
      "semester": "SEM 3",
      "description": "Advanced marketing strategies",
      "subjects": [
        "Strategic Marketing",
        "Product Management",
        "Integrated Marketing Communications",
        "E-commerce Marketing",
        "Marketing Automation",
        "Influencer Marketing"
      ]
    },
    {
      "semester": "SEM 4",
      "description": "Specialization and capstone",
      "subjects": [
        "Global Marketing",
        "Marketing Strategy",
        "Growth Hacking",
        "Capstone Project",
        "Industry Internship",
        "Entrepreneurial Marketing"
      ]
    }
  ]'::jsonb,
  '[
    {
      "title": "Digital Marketing Manager",
      "description": "Plan and execute digital marketing campaigns across multiple channels",
      "salary_range": "₹7-14 LPA"
    },
    {
      "title": "Brand Manager",
      "description": "Develop and maintain brand identity, positioning, and marketing strategies",
      "salary_range": "₹8-16 LPA"
    },
    {
      "title": "Marketing Analytics Manager",
      "description": "Analyze marketing data and provide insights to optimize campaigns",
      "salary_range": "₹9-18 LPA"
    },
    {
      "title": "Product Marketing Manager",
      "description": "Drive product positioning, messaging, and go-to-market strategies",
      "salary_range": "₹10-20 LPA"
    },
    {
      "title": "Growth Marketing Manager",
      "description": "Focus on customer acquisition, retention, and revenue growth",
      "salary_range": "₹12-22 LPA"
    }
  ]'::jsonb,
  'Comprehensive career support including resume workshops, interview preparation, portfolio development, and direct connections with hiring managers at top companies.',
  'Connect with 8,000+ marketing professionals working at Google, Amazon, Unilever, P&G, and leading startups worldwide.',
  'Entry-level: Marketing Executive, Digital Marketing Specialist, Social Media Manager (₹4-7 LPA)',
  'Mid-level: Marketing Manager, Brand Manager, Digital Marketing Manager (₹10-16 LPA)',
  'Senior-level: Chief Marketing Officer, VP Marketing, Marketing Director (₹20-40+ LPA)',
  true,
  'Start Your Marketing Career Today!',
  true,
  2
);

-- MBA in Human Resources
INSERT INTO course_specializations (
  university_id,
  parent_course_id,
  name,
  description,
  duration,
  fees,
  eligibility,
  image_url,
  program_overview,
  industry_insight_title,
  industry_insight_content,
  industry_insight_stats,
  program_highlights,
  curriculum,
  career_paths,
  career_support,
  alumni_network,
  entry_level_info,
  mid_level_info,
  senior_level_info,
  booking_enabled,
  booking_cta_text,
  is_active,
  display_order
) VALUES (
  1, -- Replace with your university_id
  1, -- Replace with your course_id
  'MBA in Human Resources',
  'Comprehensive HR program focusing on talent management, organizational behavior, and HR analytics',
  '2 Years',
  '₹5,00,000',
  'Bachelor''s degree with 50% marks from a recognized university',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
  'The MBA in Human Resources program prepares students to become strategic HR leaders who can drive organizational success through effective people management. Our curriculum covers all aspects of modern HR, from talent acquisition to employee engagement and HR analytics.',
  'HR Industry Evolution',
  'The HR function is evolving from administrative support to strategic business partner. Organizations are investing in HR technology, analytics, and employee experience to attract and retain top talent.',
  '[
    {"label": "HR Tech Growth", "value": "20%"},
    {"label": "Average Salary", "value": "₹9 LPA"},
    {"label": "Job Opportunities", "value": "800+"},
    {"label": "Placement Rate", "value": "90%"}
  ]'::jsonb,
  '[
    {
      "title": "Strategic HR Management",
      "description": "Learn to align HR strategies with business objectives"
    },
    {
      "title": "HR Analytics",
      "description": "Use data to make informed people decisions"
    },
    {
      "title": "Talent Management",
      "description": "Master recruitment, development, and retention strategies"
    },
    {
      "title": "Employee Engagement",
      "description": "Create positive workplace cultures and experiences"
    }
  ]'::jsonb,
  '[
    {
      "semester": "SEM 1",
      "subjects": ["Organizational Behavior", "HR Management", "Business Communication", "Labor Laws"]
    },
    {
      "semester": "SEM 2",
      "subjects": ["Talent Acquisition", "Performance Management", "Compensation Management", "HR Analytics"]
    },
    {
      "semester": "SEM 3",
      "subjects": ["Strategic HRM", "Leadership Development", "Change Management", "Employee Relations"]
    },
    {
      "semester": "SEM 4",
      "subjects": ["HR Technology", "Global HR", "Capstone Project", "Industry Internship"]
    }
  ]'::jsonb,
  '[
    {
      "title": "HR Manager",
      "description": "Oversee all HR functions and drive people strategies",
      "salary_range": "₹7-14 LPA"
    },
    {
      "title": "Talent Acquisition Manager",
      "description": "Lead recruitment and employer branding initiatives",
      "salary_range": "₹6-12 LPA"
    },
    {
      "title": "HR Business Partner",
      "description": "Partner with business leaders on people strategies",
      "salary_range": "₹8-16 LPA"
    }
  ]'::jsonb,
  'Career support with HR-specific resume building, interview coaching, and connections to top employers.',
  'Join 6,000+ HR professionals at leading companies worldwide.',
  'Entry-level: HR Executive, Recruiter (₹3-6 LPA)',
  'Mid-level: HR Manager, HRBP (₹8-14 LPA)',
  'Senior-level: CHRO, VP HR (₹18-35+ LPA)',
  true,
  'Join the HR Leaders Program!',
  true,
  3
);

-- Note: Remember to replace university_id and course_id with actual values from your database!
-- You can find these by running:
-- SELECT id, name FROM universities;
-- SELECT id, course_name FROM university_courses;

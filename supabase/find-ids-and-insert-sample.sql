-- Helper Script: Find Your IDs and Insert Sample Specializations
-- This script helps you find the correct university and course IDs, then insert sample data

-- STEP 1: Find your universities
SELECT 
  id as university_id,
  name as university_name
FROM universities
ORDER BY id;

-- STEP 2: Find your courses (replace {UNIVERSITY_ID} with actual ID from step 1)
-- Example: If university_id = 5, replace {UNIVERSITY_ID} with 5
SELECT 
  id as course_id,
  course_name,
  university_id
FROM university_courses
WHERE university_id = {UNIVERSITY_ID}  -- REPLACE THIS
ORDER BY id;

-- STEP 3: After finding your IDs, use this template to insert a specialization
-- Replace {UNIVERSITY_ID} and {COURSE_ID} with actual values

/*
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
  {UNIVERSITY_ID},  -- Replace with your university_id
  {COURSE_ID},      -- Replace with your course_id
  'MBA in Finance',
  'Comprehensive finance program designed to prepare students for leadership roles in the financial sector',
  '2 Years',
  '₹5,00,000',
  'Bachelor''s degree with 50% marks from a recognized university',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  'The MBA in Finance program is designed to provide students with a comprehensive understanding of financial management, investment strategies, and corporate finance.',
  'Finance Industry Outlook',
  'The finance industry is experiencing unprecedented growth, driven by digital transformation and increasing global interconnectedness.',
  '[
    {"label": "Industry Growth", "value": "25%"},
    {"label": "Average Salary", "value": "₹12 LPA"},
    {"label": "Companies Hiring", "value": "500+"},
    {"label": "Placement Rate", "value": "95%"}
  ]'::jsonb,
  '[
    {
      "title": "Industry-Relevant Curriculum",
      "description": "Learn from real-world case studies and industry best practices"
    },
    {
      "title": "Expert Faculty",
      "description": "Learn from experienced professionals with 15+ years in the industry"
    },
    {
      "title": "Hands-on Projects",
      "description": "Work on live financial modeling projects and portfolio management"
    },
    {
      "title": "Placement Support",
      "description": "Dedicated placement cell with connections to top financial institutions"
    }
  ]'::jsonb,
  '[
    {
      "semester": "SEM 1",
      "description": "Foundation courses in business and finance",
      "subjects": ["Financial Accounting", "Managerial Economics", "Business Statistics", "Marketing Management"]
    },
    {
      "semester": "SEM 2",
      "description": "Core finance specialization courses",
      "subjects": ["Corporate Finance", "Investment Analysis", "Financial Markets", "Risk Management"]
    },
    {
      "semester": "SEM 3",
      "description": "Advanced finance topics",
      "subjects": ["Mergers & Acquisitions", "Portfolio Management", "Derivatives & Options", "International Finance"]
    },
    {
      "semester": "SEM 4",
      "description": "Capstone projects and internship",
      "subjects": ["Strategic Financial Management", "FinTech & Innovation", "Capstone Project", "Industry Internship"]
    }
  ]'::jsonb,
  '[
    {
      "title": "Financial Analyst",
      "description": "Analyze financial data and provide investment recommendations",
      "salary_range": "₹6-12 LPA"
    },
    {
      "title": "Investment Banker",
      "description": "Facilitate mergers, acquisitions, and capital raising",
      "salary_range": "₹10-20 LPA"
    },
    {
      "title": "Portfolio Manager",
      "description": "Manage investment portfolios to maximize returns",
      "salary_range": "₹12-25 LPA"
    }
  ]'::jsonb,
  'Our dedicated career support team provides comprehensive assistance including resume building, mock interviews, and access to exclusive job postings.',
  'Join a network of over 10,000 successful alumni working in leading financial institutions worldwide.',
  'Entry-level positions: Financial Analyst, Junior Investment Analyst. Expected salary: ₹4-8 LPA',
  'Mid-level positions: Senior Financial Analyst, Portfolio Manager. Expected salary: ₹10-18 LPA',
  'Senior-level positions: CFO, Director of Finance. Expected salary: ₹20-50+ LPA',
  true,
  'Book Your Seat Today - Limited Seats Available!',
  true,
  1
);
*/

-- STEP 4: Verify the insert worked
SELECT 
  id,
  name,
  university_id,
  parent_course_id,
  duration,
  fees
FROM course_specializations
ORDER BY id DESC
LIMIT 5;

-- Add Skills, Tools, and Modules columns to courses table
-- Run this SQL in Supabase to add the missing fields

-- Add new columns to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tools JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS modules JSONB DEFAULT '[]'::jsonb;

-- Update existing courses to have empty arrays for new fields
UPDATE courses 
SET 
  skills = COALESCE(skills, '[]'::jsonb),
  tools = COALESCE(tools, '[]'::jsonb),
  modules = COALESCE(modules, '[]'::jsonb)
WHERE 
  skills IS NULL 
  OR tools IS NULL 
  OR modules IS NULL;

-- Add some sample data for testing
UPDATE courses 
SET 
  skills = '["JavaScript", "React", "Node.js", "HTML/CSS", "Git"]'::jsonb,
  tools = '["VS Code", "GitHub", "Chrome DevTools", "Postman", "MongoDB Compass"]'::jsonb,
  modules = '[
    {
      "title": "Introduction to Web Development",
      "description": "Get started with the basics of web development",
      "details": [
        "Understanding how the web works",
        "Setting up development environment",
        "Introduction to HTML, CSS, and JavaScript"
      ]
    },
    {
      "title": "Frontend Development",
      "description": "Learn to build user interfaces",
      "details": [
        "HTML5 semantic elements",
        "CSS3 styling and animations",
        "Responsive design principles",
        "JavaScript DOM manipulation"
      ]
    },
    {
      "title": "Backend Development",
      "description": "Server-side programming with Node.js",
      "details": [
        "Node.js fundamentals",
        "Express.js framework",
        "Database integration",
        "API development"
      ]
    }
  ]'::jsonb
WHERE title = 'Complete Web Development Bootcamp';

-- Add sample data for Data Science course
UPDATE courses 
SET 
  skills = '["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "SQL"]'::jsonb,
  tools = '["Jupyter Notebook", "Python", "Anaconda", "Git", "Tableau", "Excel"]'::jsonb,
  modules = '[
    {
      "title": "Python Fundamentals",
      "description": "Learn Python programming basics for data science",
      "details": [
        "Python syntax and data types",
        "Control structures and functions",
        "Object-oriented programming",
        "Working with libraries"
      ]
    },
    {
      "title": "Data Analysis with Pandas",
      "description": "Master data manipulation and analysis",
      "details": [
        "DataFrames and Series",
        "Data cleaning techniques",
        "Grouping and aggregation",
        "Merging and joining datasets"
      ]
    },
    {
      "title": "Machine Learning Basics",
      "description": "Introduction to ML algorithms",
      "details": [
        "Supervised vs unsupervised learning",
        "Linear and logistic regression",
        "Decision trees and random forests",
        "Model evaluation metrics"
      ]
    }
  ]'::jsonb
WHERE title = 'Data Science with Python';

-- Add sample data for Digital Marketing course
UPDATE courses 
SET 
  skills = '["SEO", "Google Ads", "Facebook Ads", "Content Marketing", "Analytics", "Social Media"]'::jsonb,
  tools = '["Google Analytics", "Google Ads", "Facebook Ads Manager", "Canva", "Hootsuite", "SEMrush"]'::jsonb,
  modules = '[
    {
      "title": "Digital Marketing Fundamentals",
      "description": "Understanding the digital marketing landscape",
      "details": [
        "Digital marketing channels overview",
        "Customer journey mapping",
        "Marketing funnel concepts",
        "ROI and KPI measurement"
      ]
    },
    {
      "title": "Search Engine Optimization",
      "description": "Improve website visibility in search results",
      "details": [
        "Keyword research techniques",
        "On-page optimization",
        "Link building strategies",
        "Technical SEO basics"
      ]
    },
    {
      "title": "Paid Advertising",
      "description": "Google Ads and social media advertising",
      "details": [
        "Google Ads campaign setup",
        "Facebook and Instagram ads",
        "Ad copywriting best practices",
        "Campaign optimization techniques"
      ]
    }
  ]'::jsonb
WHERE title = 'Digital Marketing Mastery';

-- Create indexes for better performance on JSON fields
CREATE INDEX IF NOT EXISTS idx_courses_skills ON courses USING GIN (skills);
CREATE INDEX IF NOT EXISTS idx_courses_tools ON courses USING GIN (tools);
CREATE INDEX IF NOT EXISTS idx_courses_modules ON courses USING GIN (modules);

-- Success message
SELECT 'Skills, Tools, and Modules columns added successfully!' as status;
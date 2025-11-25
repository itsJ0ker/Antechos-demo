-- Course Specializations Schema
-- Allows universities to have main courses with multiple specializations

-- Create course_specializations table
CREATE TABLE IF NOT EXISTS course_specializations (
  id SERIAL PRIMARY KEY,
  university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
  parent_course_id INTEGER REFERENCES university_courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  fees TEXT,
  eligibility TEXT,
  curriculum TEXT,
  career_prospects TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_course_specializations_university ON course_specializations(university_id);
CREATE INDEX IF NOT EXISTS idx_course_specializations_parent ON course_specializations(parent_course_id);
CREATE INDEX IF NOT EXISTS idx_course_specializations_active ON course_specializations(is_active, display_order);

-- Row Level Security
ALTER TABLE course_specializations ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public can view active specializations" 
  ON course_specializations FOR SELECT 
  USING (is_active = true);

-- Admin write policy
CREATE POLICY "Authenticated can manage specializations" 
  ON course_specializations FOR ALL 
  USING (auth.role() = 'authenticated');

-- Sample Data
-- IMPORTANT: Do NOT run the INSERT statements below directly!
-- The sample data uses placeholder IDs (1, 1) which may not exist in your database.
-- Instead, add specializations through the Admin Panel after:
-- 1. Creating this table structure
-- 2. Having actual universities and courses in your database

-- Example data structure for reference:
-- INSERT INTO course_specializations (university_id, parent_course_id, name, description, duration, fees, eligibility, display_order) VALUES
-- (YOUR_UNIVERSITY_ID, YOUR_COURSE_ID, 'MBA in Finance', 'Specialization in Financial Management, Investment Banking, and Corporate Finance', '2 Years', '₹5,00,000', 'Bachelor''s degree with 50% marks', 1),
-- (YOUR_UNIVERSITY_ID, YOUR_COURSE_ID, 'MBA in Marketing', 'Specialization in Digital Marketing, Brand Management, and Consumer Behavior', '2 Years', '₹5,00,000', 'Bachelor''s degree with 50% marks', 2),
-- (YOUR_UNIVERSITY_ID, YOUR_COURSE_ID, 'MBA in Human Resources', 'Specialization in Talent Management, Organizational Behavior, and HR Analytics', '2 Years', '₹5,00,000', 'Bachelor''s degree with 50% marks', 3);

COMMENT ON TABLE course_specializations IS 'Specializations/sub-courses under main university courses';

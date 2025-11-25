-- Course Specializations Table
-- Run this SQL to create the table structure only (no sample data)

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

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_specializations_university ON course_specializations(university_id);
CREATE INDEX IF NOT EXISTS idx_course_specializations_parent ON course_specializations(parent_course_id);
CREATE INDEX IF NOT EXISTS idx_course_specializations_active ON course_specializations(is_active, display_order);

-- Enable Row Level Security
ALTER TABLE course_specializations ENABLE ROW LEVEL SECURITY;

-- Public can view active specializations
CREATE POLICY "Public can view active specializations" 
  ON course_specializations FOR SELECT 
  USING (is_active = true);

-- Authenticated users can manage all specializations
CREATE POLICY "Authenticated can manage specializations" 
  ON course_specializations FOR ALL 
  USING (auth.role() = 'authenticated');

-- Add comment
COMMENT ON TABLE course_specializations IS 'Specializations/sub-courses under main university courses';

-- Success message
DO $$ 
BEGIN 
  RAISE NOTICE 'Course specializations table created successfully!';
  RAISE NOTICE 'You can now add specializations through the Admin Panel.';
END $$;

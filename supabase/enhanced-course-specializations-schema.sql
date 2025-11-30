-- Enhanced Course Specializations Schema
-- Based on University Course Page Design with full admin editability

-- Drop existing table if you want to recreate (CAREFUL!)
-- DROP TABLE IF EXISTS course_specializations CASCADE;

-- Enhanced course_specializations table with all sections from the design
CREATE TABLE IF NOT EXISTS course_specializations (
  id SERIAL PRIMARY KEY,
  university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
  parent_course_id INTEGER REFERENCES university_courses(id) ON DELETE CASCADE,
  
  -- Basic Info
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  
  -- Program Details
  duration TEXT,
  fees TEXT,
  eligibility TEXT,
  
  -- Program Overview Section
  program_overview TEXT,
  
  -- Industry Insight Section
  industry_insight_title TEXT DEFAULT 'Industry Insight',
  industry_insight_content TEXT,
  industry_insight_stats JSONB, -- [{label: "Stat 1", value: "90%"}, ...]
  
  -- Program Highlights Section
  program_highlights JSONB, -- [{title: "Highlight", description: "...", icon: "..."}]
  
  -- Course Curriculum (Semester-wise)
  curriculum JSONB, -- [{semester: "SEM 1", subjects: ["Sub1", "Sub2", ...], description: "..."}]
  
  -- Specialization Details (shown when selected)
  specialization_details TEXT,
  core_subjects JSONB, -- ["Subject 1", "Subject 2", ...]
  elective_subjects JSONB, -- ["Elective 1", "Elective 2", ...]
  
  -- Career Paths Section
  career_paths JSONB, -- [{title: "Career Path", description: "...", salary_range: "..."}]
  
  -- Support & Alumni Section
  career_support TEXT,
  alumni_network TEXT,
  
  -- Entry/Mid/Senior Level Information
  entry_level_info TEXT,
  mid_level_info TEXT,
  senior_level_info TEXT,
  
  -- Book Your Seat Section
  booking_enabled BOOLEAN DEFAULT true,
  booking_cta_text TEXT DEFAULT 'Book Your Seat Today',
  
  -- Meta
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_course_spec_university ON course_specializations(university_id);
CREATE INDEX IF NOT EXISTS idx_course_spec_parent ON course_specializations(parent_course_id);
CREATE INDEX IF NOT EXISTS idx_course_spec_active ON course_specializations(is_active, display_order);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_course_specializations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_course_specializations_timestamp ON course_specializations;
CREATE TRIGGER update_course_specializations_timestamp
  BEFORE UPDATE ON course_specializations
  FOR EACH ROW
  EXECUTE FUNCTION update_course_specializations_updated_at();

-- Row Level Security
ALTER TABLE course_specializations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view active specializations" ON course_specializations;
DROP POLICY IF EXISTS "Authenticated can manage specializations" ON course_specializations;

-- Public read policy
CREATE POLICY "Public can view active specializations" 
  ON course_specializations FOR SELECT 
  USING (is_active = true);

-- Admin write policy
CREATE POLICY "Authenticated can manage specializations" 
  ON course_specializations FOR ALL 
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE course_specializations IS 'Enhanced specializations with full page sections - program overview, industry insights, curriculum, career paths, etc.';

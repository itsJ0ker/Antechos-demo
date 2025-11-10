-- Enhanced University Schema for Full Admin Control
-- This schema allows admins to manage every aspect of university pages

-- Drop existing tables if they exist (be careful in production!)
-- DROP TABLE IF EXISTS university_benefits CASCADE;
-- DROP TABLE IF EXISTS university_admission_steps CASCADE;
-- DROP TABLE IF EXISTS university_career_stats CASCADE;
-- DROP TABLE IF EXISTS university_hiring_partners CASCADE;
-- DROP TABLE IF EXISTS university_campus_images CASCADE;

-- Add new columns to universities table
ALTER TABLE universities ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS nirf_rank INTEGER;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS video_description TEXT;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS placement_rate INTEGER DEFAULT 90;
ALTER TABLE universities ADD COLUMN IF NOT EXISTS average_package TEXT DEFAULT '₹8L+';
ALTER TABLE universities ADD COLUMN IF NOT EXISTS top_recruiters_count INTEGER DEFAULT 500;

-- University Campus Images
CREATE TABLE IF NOT EXISTS university_campus_images (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University Benefits
CREATE TABLE IF NOT EXISTS university_benefits (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  benefit_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University Admission Steps
CREATE TABLE IF NOT EXISTS university_admission_steps (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University Career Statistics
CREATE TABLE IF NOT EXISTS university_career_stats (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  stat_label TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University Hiring Partners
CREATE TABLE IF NOT EXISTS university_hiring_partners (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  partner_name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campus_images_university ON university_campus_images(university_id);
CREATE INDEX IF NOT EXISTS idx_benefits_university ON university_benefits(university_id);
CREATE INDEX IF NOT EXISTS idx_admission_steps_university ON university_admission_steps(university_id);
CREATE INDEX IF NOT EXISTS idx_career_stats_university ON university_career_stats(university_id);
CREATE INDEX IF NOT EXISTS idx_hiring_partners_university ON university_hiring_partners(university_id);

-- Enable Row Level Security
ALTER TABLE university_campus_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_admission_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_career_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_hiring_partners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can view campus images" ON university_campus_images FOR SELECT USING (true);
CREATE POLICY "Public can view benefits" ON university_benefits FOR SELECT USING (true);
CREATE POLICY "Public can view admission steps" ON university_admission_steps FOR SELECT USING (true);
CREATE POLICY "Public can view career stats" ON university_career_stats FOR SELECT USING (true);
CREATE POLICY "Public can view hiring partners" ON university_hiring_partners FOR SELECT USING (true);

-- RLS Policies for admin write access (you'll need to adjust based on your auth setup)
CREATE POLICY "Admins can manage campus images" ON university_campus_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage benefits" ON university_benefits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage admission steps" ON university_admission_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage career stats" ON university_career_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage hiring partners" ON university_hiring_partners FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for testing
-- Benefits
INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 1, 'Flexible Learning', 'Study at your own pace', 1 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 2, 'Expert Faculty', 'Learn from industry experts', 2 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 3, 'Global Recognition', 'Internationally accepted degrees', 3 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 4, 'Career Support', 'Placement assistance', 4 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 5, 'Industry Projects', 'Hands-on experience', 5 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 6, 'Networking', 'Connect with professionals', 6 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 7, 'Affordable Fees', 'EMI options available', 7 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_benefits (university_id, benefit_number, title, description, display_order)
SELECT id, 8, 'Lifetime Access', 'Learning resources forever', 8 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

-- Admission Steps
INSERT INTO university_admission_steps (university_id, step_number, title, subtitle, description, display_order)
SELECT id, 1, 'Registration', 'Why?', 'Complete the online registration form', 1 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_admission_steps (university_id, step_number, title, subtitle, description, display_order)
SELECT id, 2, 'Choose', 'Program', 'Select your desired program', 2 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_admission_steps (university_id, step_number, title, subtitle, description, display_order)
SELECT id, 3, 'Documentation', '', 'Upload required documents', 3 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_admission_steps (university_id, step_number, title, subtitle, description, display_order)
SELECT id, 4, 'Us?', '', 'Application review', 4 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_admission_steps (university_id, step_number, title, subtitle, description, display_order)
SELECT id, 5, 'Enrollment', 'Verification', 'Complete enrollment process', 5 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_admission_steps (university_id, step_number, title, subtitle, description, display_order)
SELECT id, 6, 'Start Learning', '', 'Begin your academic journey', 6 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

-- Career Stats
INSERT INTO university_career_stats (university_id, stat_label, stat_value, display_order)
SELECT id, 'Placement Rate', '90%+', 1 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_career_stats (university_id, stat_label, stat_value, display_order)
SELECT id, 'Average Package', '₹8L+', 2 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO university_career_stats (university_id, stat_label, stat_value, display_order)
SELECT id, 'Top Recruiters', '500+ Companies', 3 FROM universities LIMIT 1
ON CONFLICT DO NOTHING;

COMMENT ON TABLE university_campus_images IS 'Stores campus images for university detail pages';
COMMENT ON TABLE university_benefits IS 'Stores benefits/features for each university';
COMMENT ON TABLE university_admission_steps IS 'Stores admission process steps for each university';
COMMENT ON TABLE university_career_stats IS 'Stores career and placement statistics';
COMMENT ON TABLE university_hiring_partners IS 'Stores hiring partner companies and their logos';

-- Add Industry Professionals Section to Marketplace

CREATE TABLE IF NOT EXISTS marketplace_professionals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  expertise TEXT[], -- Array of expertise areas
  years_experience INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_professionals_active ON marketplace_professionals(is_active, display_order);

-- Row Level Security
ALTER TABLE marketplace_professionals ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public can view active professionals" ON marketplace_professionals FOR SELECT USING (is_active = true);

-- Admin write policy
CREATE POLICY "Authenticated can manage professionals" ON marketplace_professionals FOR ALL USING (auth.role() = 'authenticated');

-- Sample Data
INSERT INTO marketplace_professionals (name, title, company, bio, expertise, years_experience, display_order, is_active) VALUES
('Dr. Rajesh Kumar', 'Chief Data Scientist', 'Tech Innovations Ltd', 'Leading expert in AI and Machine Learning with 15+ years of experience in building scalable data solutions.', ARRAY['AI', 'Machine Learning', 'Data Science'], 15, 1, true),
('Priya Sharma', 'Senior Marketing Director', 'Digital Growth Co', 'Award-winning digital marketing strategist specializing in growth hacking and brand building.', ARRAY['Digital Marketing', 'SEO', 'Brand Strategy'], 12, 2, true),
('Amit Patel', 'VP of Engineering', 'CloudTech Solutions', 'Full-stack architect with expertise in building enterprise-scale applications and leading engineering teams.', ARRAY['Full Stack', 'Cloud Architecture', 'DevOps'], 18, 3, true),
('Sneha Reddy', 'Financial Analytics Lead', 'FinServe Global', 'Expert in financial modeling, risk analytics, and investment strategies with Big 4 experience.', ARRAY['Financial Analytics', 'Risk Management', 'Investment Banking'], 10, 4, true);

COMMENT ON TABLE marketplace_professionals IS 'Industry professionals/instructors featured on marketplace';

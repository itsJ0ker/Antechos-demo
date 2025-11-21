-- Marketplace Page Schema (Imarticus-style)
-- Complete educational platform homepage

-- ============================================
-- HERO SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_hero (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_primary_text TEXT DEFAULT 'Explore Programs',
  cta_primary_link TEXT,
  cta_secondary_text TEXT DEFAULT 'Talk to Counselor',
  cta_secondary_link TEXT,
  background_image TEXT,
  hero_image TEXT,
  video_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Stats/Highlights
CREATE TABLE IF NOT EXISTS marketplace_hero_stats (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER REFERENCES marketplace_hero(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PROGRAMS/COURSES SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_programs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  short_description TEXT,
  description TEXT,
  category TEXT,
  duration TEXT,
  level TEXT, -- Beginner, Intermediate, Advanced
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  image_url TEXT,
  icon TEXT,
  rating DECIMAL(3,2),
  students_enrolled INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Program Features
CREATE TABLE IF NOT EXISTS marketplace_program_features (
  id SERIAL PRIMARY KEY,
  program_id INTEGER REFERENCES marketplace_programs(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

-- ============================================
-- STATS/ACHIEVEMENTS SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_stats (
  id SERIAL PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT 'blue',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FEATURES/BENEFITS SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_features (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  color TEXT DEFAULT 'blue',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  video_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PARTNERS/COMPANIES SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FAQ SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CTA SECTIONS
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_cta_sections (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  background_color TEXT DEFAULT '#3B82F6',
  background_image TEXT,
  section_type TEXT DEFAULT 'default', -- 'default', 'counseling', 'download'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_marketplace_hero_active ON marketplace_hero(is_active);
CREATE INDEX IF NOT EXISTS idx_marketplace_programs_active ON marketplace_programs(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_marketplace_programs_featured ON marketplace_programs(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_marketplace_programs_slug ON marketplace_programs(slug);
CREATE INDEX IF NOT EXISTS idx_marketplace_testimonials_active ON marketplace_testimonials(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_marketplace_partners_active ON marketplace_partners(is_active, display_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE marketplace_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_hero_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_program_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_cta_sections ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view active hero" ON marketplace_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view hero stats" ON marketplace_hero_stats FOR SELECT USING (true);
CREATE POLICY "Public can view active programs" ON marketplace_programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view program features" ON marketplace_program_features FOR SELECT USING (true);
CREATE POLICY "Public can view active stats" ON marketplace_stats FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active features" ON marketplace_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active testimonials" ON marketplace_testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active partners" ON marketplace_partners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active faqs" ON marketplace_faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active cta sections" ON marketplace_cta_sections FOR SELECT USING (is_active = true);

-- Admin write policies
CREATE POLICY "Authenticated can manage hero" ON marketplace_hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage hero stats" ON marketplace_hero_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage programs" ON marketplace_programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage program features" ON marketplace_program_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage stats" ON marketplace_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage features" ON marketplace_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage testimonials" ON marketplace_testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage partners" ON marketplace_partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage faqs" ON marketplace_faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage cta sections" ON marketplace_cta_sections FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Hero
INSERT INTO marketplace_hero (title, subtitle, description, cta_primary_text, cta_secondary_text, is_active) VALUES
('Transform Your Career with Industry-Leading Programs', 
 'Learn from Experts, Get Certified, Land Your Dream Job',
 'Join thousands of professionals who have upskilled and transformed their careers with our industry-recognized certification programs',
 'Explore Programs',
 'Talk to Counselor',
 true);

-- Hero Stats
INSERT INTO marketplace_hero_stats (hero_id, value, label, display_order) VALUES
(1, '50,000+', 'Students Trained', 1),
(1, '95%', 'Placement Rate', 2),
(1, '500+', 'Hiring Partners', 3),
(1, '4.8/5', 'Average Rating', 4);

-- Programs
INSERT INTO marketplace_programs (title, slug, short_description, category, duration, level, price, original_price, rating, is_featured, display_order) VALUES
('Data Science & AI', 'data-science-ai', 'Master data science, machine learning, and AI with hands-on projects', 'Technology', '6 Months', 'Intermediate', 99999, 149999, 4.8, true, 1),
('Digital Marketing', 'digital-marketing', 'Become a certified digital marketing expert', 'Marketing', '4 Months', 'Beginner', 49999, 79999, 4.7, true, 2),
('Full Stack Development', 'full-stack-development', 'Learn MERN stack and build real-world applications', 'Technology', '6 Months', 'Intermediate', 89999, 129999, 4.9, true, 3),
('Financial Analytics', 'financial-analytics', 'Master financial modeling and analytics', 'Finance', '5 Months', 'Advanced', 79999, 119999, 4.6, false, 4);

-- Stats
INSERT INTO marketplace_stats (value, label, description, display_order) VALUES
('50,000+', 'Students Trained', 'Professionals upskilled across India', 1),
('95%', 'Placement Rate', 'Students placed in top companies', 2),
('500+', 'Hiring Partners', 'Leading companies trust us', 3),
('₹12 LPA', 'Average Salary', 'Post-course average package', 4);

-- Features
INSERT INTO marketplace_features (title, description, icon, display_order) VALUES
('Industry Expert Faculty', 'Learn from professionals with 10+ years of experience', '👨‍🏫', 1),
('100% Placement Support', 'Dedicated placement team to help you land your dream job', '💼', 2),
('Hands-on Projects', 'Work on real-world projects and build your portfolio', '🚀', 3),
('Lifetime Access', 'Access course materials and updates forever', '♾️', 4);

-- Testimonials
INSERT INTO marketplace_testimonials (name, role, company, content, rating, display_order) VALUES
('Rahul Sharma', 'Data Scientist', 'Google', 'The program completely transformed my career. The hands-on approach and expert mentorship helped me land my dream job at Google.', 5, 1),
('Priya Patel', 'Digital Marketing Manager', 'Amazon', 'Best investment I made in my career. The curriculum is industry-relevant and the placement support is exceptional.', 5, 2),
('Amit Kumar', 'Full Stack Developer', 'Microsoft', 'From zero coding knowledge to landing a job at Microsoft - this program made it possible. Highly recommended!', 5, 3);

COMMENT ON TABLE marketplace_hero IS 'Main hero section for marketplace/homepage';
COMMENT ON TABLE marketplace_programs IS 'Educational programs/courses offered';
COMMENT ON TABLE marketplace_testimonials IS 'Student success stories and reviews';

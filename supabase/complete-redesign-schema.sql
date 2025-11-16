-- Complete Website Redesign Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- HOME PAGE TABLES
-- ============================================

-- Hero Section
CREATE TABLE IF NOT EXISTS home_hero (
  id SERIAL PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  background_image TEXT,
  video_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Banners (Offers/Announcements)
CREATE TABLE IF NOT EXISTS home_banners (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  button_text TEXT,
  banner_type TEXT DEFAULT 'offer', -- 'offer', 'announcement', 'event'
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dynamic Sections
CREATE TABLE IF NOT EXISTS home_sections (
  id SERIAL PRIMARY KEY,
  section_type TEXT NOT NULL, -- 'features', 'stats', 'testimonials', 'cta', 'partners'
  title TEXT,
  subtitle TEXT,
  content JSONB,
  layout_type TEXT DEFAULT 'grid', -- 'grid', 'carousel', 'list'
  background_color TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Section Items
CREATE TABLE IF NOT EXISTS home_section_items (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES home_sections(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  link_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ABOUT US PAGE TABLES
-- ============================================

-- About Hero
CREATE TABLE IF NOT EXISTS about_hero (
  id SERIAL PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mission, Vision, Values
CREATE TABLE IF NOT EXISTS about_values (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- 'mission', 'vision', 'values'
  title TEXT,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS about_team (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline/Milestones
CREATE TABLE IF NOT EXISTS about_timeline (
  id SERIAL PRIMARY KEY,
  year TEXT,
  title TEXT,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statistics
CREATE TABLE IF NOT EXISTS about_stats (
  id SERIAL PRIMARY KEY,
  label TEXT,
  value TEXT,
  icon TEXT,
  suffix TEXT, -- '+', '%', 'K', 'M'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MARKETPLACE TABLES
-- ============================================

-- Marketplace Services
CREATE TABLE IF NOT EXISTS marketplace_services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  image_url TEXT,
  price_starting DECIMAL(10,2),
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Categories
CREATE TABLE IF NOT EXISTS marketplace_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service-Category Mapping
CREATE TABLE IF NOT EXISTS marketplace_service_categories (
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES marketplace_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

-- Service Features
CREATE TABLE IF NOT EXISTS marketplace_service_features (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE CASCADE,
  feature_text TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

-- Service Pricing Plans
CREATE TABLE IF NOT EXISTS marketplace_pricing_plans (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE CASCADE,
  plan_name TEXT,
  price DECIMAL(10,2),
  billing_period TEXT DEFAULT 'monthly', -- 'monthly', 'yearly', 'one-time'
  features JSONB,
  is_popular BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- ============================================
-- COURSE ENHANCEMENTS
-- ============================================

-- Course Pricing Tiers
CREATE TABLE IF NOT EXISTS course_pricing_tiers (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  tier_name TEXT NOT NULL,
  price DECIMAL(10,2),
  duration TEXT,
  features JSONB,
  is_popular BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Course Features
CREATE TABLE IF NOT EXISTS course_features (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  feature_text TEXT,
  is_included BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- ============================================
-- UNIVERSITY ENHANCEMENTS
-- ============================================

-- Add columns to existing tables
ALTER TABLE university_career_stats 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS background_image TEXT;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_home_banners_active ON home_banners(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_home_sections_active ON home_sections(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_marketplace_services_active ON marketplace_services(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_marketplace_services_slug ON marketplace_services(slug);
CREATE INDEX IF NOT EXISTS idx_about_team_active ON about_team(is_active, display_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE home_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_section_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_features ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view active home hero" ON home_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active banners" ON home_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active sections" ON home_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view section items" ON home_section_items FOR SELECT USING (true);
CREATE POLICY "Public can view about hero" ON about_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view about values" ON about_values FOR SELECT USING (true);
CREATE POLICY "Public can view active team" ON about_team FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view timeline" ON about_timeline FOR SELECT USING (true);
CREATE POLICY "Public can view about stats" ON about_stats FOR SELECT USING (true);
CREATE POLICY "Public can view active services" ON marketplace_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view categories" ON marketplace_categories FOR SELECT USING (true);
CREATE POLICY "Public can view service features" ON marketplace_service_features FOR SELECT USING (true);
CREATE POLICY "Public can view pricing plans" ON marketplace_pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public can view course tiers" ON course_pricing_tiers FOR SELECT USING (true);
CREATE POLICY "Public can view course features" ON course_features FOR SELECT USING (true);

-- Admin write policies
CREATE POLICY "Authenticated can manage home hero" ON home_hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage banners" ON home_banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage sections" ON home_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage section items" ON home_section_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage about hero" ON about_hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage about values" ON about_values FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage team" ON about_team FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage timeline" ON about_timeline FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage about stats" ON about_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage services" ON marketplace_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage categories" ON marketplace_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage service features" ON marketplace_service_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage pricing plans" ON marketplace_pricing_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage course tiers" ON course_pricing_tiers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage course features" ON course_features FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert sample marketplace services
INSERT INTO marketplace_services (name, slug, short_description, icon, price_starting, is_active, display_order) VALUES
('Web Development', 'web-development', 'Custom websites and web applications', '🌐', 50000, true, 1),
('AI Automation', 'ai-automation', 'Intelligent automation solutions', '🤖', 75000, true, 2),
('Portfolio Development', 'portfolio-development', 'Professional portfolio websites', '💼', 25000, true, 3),
('Social Media Management', 'social-media-management', 'Complete social media solutions', '📱', 30000, true, 4),
('AI Advertisement', 'ai-advertisement', 'AI-powered advertising campaigns', '📢', 40000, true, 5),
('Placement Portal', 'placement-portal', 'Job placement platform', '🎯', 100000, true, 6),
('CV Builder', 'cv-builder', 'Professional resume builder', '📄', 5000, true, 7),
('Community', 'community', 'Online community platform', '👥', 60000, true, 8)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample about values
INSERT INTO about_values (type, title, description, display_order) VALUES
('mission', 'Our Mission', 'To empower individuals with quality education and skills for the digital age', 1),
('vision', 'Our Vision', 'To be the leading platform for online education and career development', 2),
('values', 'Our Values', 'Excellence, Innovation, Integrity, and Student Success', 3)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE home_hero IS 'Landing page hero section content';
COMMENT ON TABLE home_banners IS 'Promotional banners and announcements';
COMMENT ON TABLE home_sections IS 'Dynamic sections for home page';
COMMENT ON TABLE marketplace_services IS 'Services offered in marketplace';
COMMENT ON TABLE about_team IS 'Team members for about us page';

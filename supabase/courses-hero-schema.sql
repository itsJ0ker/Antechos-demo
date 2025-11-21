-- Courses Page Hero Section Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- COURSES HERO SECTION
-- ============================================

-- Main Hero Content
CREATE TABLE IF NOT EXISTS courses_hero (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT DEFAULT 'Get a Callback',
  cta_link TEXT,
  background_color TEXT DEFAULT '#93B5F1',
  background_image TEXT,
  hero_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Features (checkmark items)
CREATE TABLE IF NOT EXISTS courses_hero_features (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER REFERENCES courses_hero(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  icon TEXT DEFAULT '✓',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Stats (400+, 100%, 1:1)
CREATE TABLE IF NOT EXISTS courses_hero_stats (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER REFERENCES courses_hero(id) ON DELETE CASCADE,
  value TEXT NOT NULL, -- '400+', '100%', '1:1'
  label TEXT NOT NULL, -- 'Hiring Partners', 'Placement Assistance', 'Mentorship'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_courses_hero_active ON courses_hero(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_hero_features_order ON courses_hero_features(hero_id, display_order);
CREATE INDEX IF NOT EXISTS idx_courses_hero_stats_order ON courses_hero_stats(hero_id, display_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE courses_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses_hero_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses_hero_stats ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view active courses hero" 
  ON courses_hero FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Public can view courses hero features" 
  ON courses_hero_features FOR SELECT 
  USING (true);

CREATE POLICY "Public can view courses hero stats" 
  ON courses_hero_stats FOR SELECT 
  USING (true);

-- Admin write policies
CREATE POLICY "Authenticated can manage courses hero" 
  ON courses_hero FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage courses hero features" 
  ON courses_hero_features FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage courses hero stats" 
  ON courses_hero_stats FOR ALL 
  USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert default hero content
INSERT INTO courses_hero (
  title,
  subtitle,
  description,
  cta_text,
  cta_link,
  background_color,
  hero_image,
  is_active
) VALUES (
  'Secure Payments',
  'Made Simple',
  'Process transactions with confidence. Enterprise-grade security meets effortless user experience.',
  'Get a Callback',
  '/contact',
  '#93B5F1',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500',
  true
);

-- Insert default features
INSERT INTO courses_hero_features (hero_id, feature_text, display_order) VALUES
(1, 'Instant processing', 1),
(1, 'No-Cost EMI', 2),
(1, 'No Hidden Fees', 3);

-- Insert default stats
INSERT INTO courses_hero_stats (hero_id, value, label, display_order) VALUES
(1, '400+', 'Hiring Partners', 1),
(1, '100%', 'Placement Assistance', 2),
(1, '1:1', 'Mentorship', 3);

COMMENT ON TABLE courses_hero IS 'Courses page hero section content';
COMMENT ON TABLE courses_hero_features IS 'Feature list items with checkmarks';
COMMENT ON TABLE courses_hero_stats IS 'Statistics displayed in hero section';

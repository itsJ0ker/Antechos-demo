-- Complete Marketplace Page Schema
-- Fully editable from admin panel

-- ============================================
-- MARKETPLACE HERO SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_hero (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_primary_text TEXT DEFAULT 'Get Started',
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  background_color TEXT DEFAULT '#4F46E5',
  background_image TEXT,
  hero_image TEXT,
  video_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Features/Highlights
CREATE TABLE IF NOT EXISTS marketplace_hero_features (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER REFERENCES marketplace_hero(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  icon TEXT DEFAULT '✓',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Stats
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
-- MARKETPLACE SERVICES/OFFERINGS
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  short_description TEXT,
  full_description TEXT,
  icon TEXT,
  image_url TEXT,
  category TEXT,
  price_starting DECIMAL(10,2),
  price_text TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Features
CREATE TABLE IF NOT EXISTS marketplace_service_features (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  is_included BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- Service Benefits
CREATE TABLE IF NOT EXISTS marketplace_service_benefits (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE CASCADE,
  benefit_title TEXT NOT NULL,
  benefit_description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0
);

-- ============================================
-- MARKETPLACE CATEGORIES
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  color TEXT DEFAULT '#3B82F6',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRICING PLANS
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_pricing_plans (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  plan_description TEXT,
  price DECIMAL(10,2),
  price_period TEXT DEFAULT 'month',
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing Plan Features
CREATE TABLE IF NOT EXISTS marketplace_pricing_features (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER REFERENCES marketplace_pricing_plans(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  is_included BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0
);

-- ============================================
-- MARKETPLACE FEATURES SECTION
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_features (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MARKETPLACE TESTIMONIALS
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_testimonials (
  id SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_position TEXT,
  client_company TEXT,
  client_image TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  service_id INTEGER REFERENCES marketplace_services(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MARKETPLACE CTA SECTIONS
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_cta_sections (
  id SERIAL PRIMARY KEY,
  section_type TEXT DEFAULT 'default',
  title TEXT NOT NULL,
  description TEXT,
  button_text TEXT,
  button_link TEXT,
  background_color TEXT DEFAULT '#4F46E5',
  background_image TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MARKETPLACE FAQ
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_faq (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MARKETPLACE PROCESS/STEPS
-- ============================================

CREATE TABLE IF NOT EXISTS marketplace_process_steps (
  id SERIAL PRIMARY KEY,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_marketplace_services_active ON marketplace_services(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_marketplace_services_slug ON marketplace_services(slug);
CREATE INDEX IF NOT EXISTS idx_marketplace_services_featured ON marketplace_services(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_marketplace_categories_active ON marketplace_categories(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_marketplace_testimonials_active ON marketplace_testimonials(is_active, display_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE marketplace_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_hero_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_hero_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_service_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_pricing_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_cta_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_process_steps ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view active marketplace hero" ON marketplace_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view marketplace hero features" ON marketplace_hero_features FOR SELECT USING (true);
CREATE POLICY "Public can view marketplace hero stats" ON marketplace_hero_stats FOR SELECT USING (true);
CREATE POLICY "Public can view active services" ON marketplace_services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view service features" ON marketplace_service_features FOR SELECT USING (true);
CREATE POLICY "Public can view service benefits" ON marketplace_service_benefits FOR SELECT USING (true);
CREATE POLICY "Public can view active categories" ON marketplace_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active pricing plans" ON marketplace_pricing_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view pricing features" ON marketplace_pricing_features FOR SELECT USING (true);
CREATE POLICY "Public can view active features" ON marketplace_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active testimonials" ON marketplace_testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active cta sections" ON marketplace_cta_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active faq" ON marketplace_faq FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view process steps" ON marketplace_process_steps FOR SELECT USING (true);

-- Admin write policies
CREATE POLICY "Authenticated can manage marketplace hero" ON marketplace_hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage hero features" ON marketplace_hero_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage hero stats" ON marketplace_hero_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage services" ON marketplace_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage service features" ON marketplace_service_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage service benefits" ON marketplace_service_benefits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage categories" ON marketplace_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage pricing plans" ON marketplace_pricing_plans FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage pricing features" ON marketplace_pricing_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage features" ON marketplace_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage testimonials" ON marketplace_testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage cta sections" ON marketplace_cta_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage faq" ON marketplace_faq FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage process steps" ON marketplace_process_steps FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert sample hero
INSERT INTO marketplace_hero (title, subtitle, description, cta_primary_text, cta_primary_link, background_color, is_active) VALUES
('Transform Your Business', 'with Professional Services', 'Comprehensive solutions designed to accelerate your growth and success', 'Get Started', '/contact', '#4F46E5', true)
ON CONFLICT DO NOTHING;

-- Insert sample hero features
INSERT INTO marketplace_hero_features (hero_id, feature_text, icon, display_order) VALUES
(1, 'Expert Consultation', '🎯', 1),
(1, '24/7 Support', '💬', 2),
(1, 'Money-back Guarantee', '✅', 3)
ON CONFLICT DO NOTHING;

-- Insert sample hero stats
INSERT INTO marketplace_hero_stats (hero_id, value, label, display_order) VALUES
(1, '500+', 'Happy Clients', 1),
(1, '98%', 'Success Rate', 2),
(1, '24/7', 'Support', 3)
ON CONFLICT DO NOTHING;

-- Insert sample categories
INSERT INTO marketplace_categories (name, slug, description, icon, color, display_order) VALUES
('Development', 'development', 'Web & Mobile Development Services', '💻', '#3B82F6', 1),
('Design', 'design', 'UI/UX & Graphic Design', '🎨', '#8B5CF6', 2),
('Marketing', 'marketing', 'Digital Marketing Solutions', '📱', '#EC4899', 3),
('Consulting', 'consulting', 'Business Consulting Services', '💼', '#10B981', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample services
INSERT INTO marketplace_services (name, slug, short_description, category, price_starting, is_featured, display_order) VALUES
('Web Development', 'web-development', 'Custom websites and web applications', 'Development', 50000, true, 1),
('Mobile App Development', 'mobile-app', 'iOS and Android applications', 'Development', 75000, true, 2),
('UI/UX Design', 'ui-ux-design', 'User interface and experience design', 'Design', 30000, false, 3),
('Digital Marketing', 'digital-marketing', 'SEO, SEM, and social media marketing', 'Marketing', 25000, false, 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample features
INSERT INTO marketplace_features (title, description, icon, display_order) VALUES
('Expert Team', 'Work with industry professionals', '👥', 1),
('Quality Assurance', 'Rigorous testing and quality checks', '✓', 2),
('Timely Delivery', 'On-time project completion', '⏰', 3),
('Ongoing Support', '24/7 customer support', '💬', 4)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE marketplace_hero IS 'Marketplace page hero section';
COMMENT ON TABLE marketplace_services IS 'Services offered in marketplace';
COMMENT ON TABLE marketplace_testimonials IS 'Client testimonials';

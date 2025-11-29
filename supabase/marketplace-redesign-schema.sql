-- =====================================================
-- MARKETPLACE REDESIGN - COMPLETE SCHEMA
-- All tables for the fully editable marketplace page
-- =====================================================

-- Drop existing tables if they exist (for clean reinstall)
DROP TABLE IF EXISTS marketplace_teams CASCADE;
DROP TABLE IF EXISTS marketplace_solutions CASCADE;
DROP TABLE IF EXISTS marketplace_testimonials CASCADE;
DROP TABLE IF EXISTS marketplace_professionals CASCADE;
DROP TABLE IF EXISTS marketplace_hire_blocks CASCADE;
DROP TABLE IF EXISTS marketplace_business_deserves CASCADE;
DROP TABLE IF EXISTS marketplace_resources CASCADE;
DROP TABLE IF EXISTS marketplace_metrics CASCADE;
DROP TABLE IF EXISTS marketplace_slides CASCADE;
DROP TABLE IF EXISTS marketplace_features CASCADE;
DROP TABLE IF EXISTS marketplace_banner CASCADE;
DROP TABLE IF EXISTS marketplace_partners CASCADE;
DROP TABLE IF EXISTS marketplace_hero CASCADE;

-- Hero Section
CREATE TABLE marketplace_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  bullet_points JSONB DEFAULT '[]'::jsonb,
  left_image_url TEXT,
  right_image_url TEXT,
  background_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners Section
CREATE TABLE marketplace_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Banner Section
CREATE TABLE marketplace_banner (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Features (4-column section)
CREATE TABLE marketplace_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Slider/Carousel Section
CREATE TABLE marketplace_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL,
  body TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Metrics (Donut Charts)
CREATE TABLE marketplace_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  primary_percentage INTEGER NOT NULL,
  secondary_percentage INTEGER DEFAULT 0,
  color TEXT DEFAULT '#3b82f6',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resources Section (with download)
CREATE TABLE marketplace_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL,
  description TEXT,
  image_url_9_16 TEXT,
  download_url TEXT,
  button_text TEXT DEFAULT 'Download',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business Deserves Section
CREATE TABLE marketplace_business_deserves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  main_heading TEXT NOT NULL,
  sub_heading TEXT,
  center_image_url_9_16 TEXT,
  right_heading TEXT,
  right_subheading TEXT,
  left_points JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hire Blocks (Industry Trainers, Skilled Workforce, Full Stack Teams)
CREATE TABLE marketplace_hire_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name TEXT NOT NULL,
  image_position TEXT CHECK (image_position IN ('left', 'right')) DEFAULT 'left',
  image_url TEXT,
  description_title TEXT,
  bullet_points JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Featured Professionals
CREATE TABLE marketplace_professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  image_url TEXT,
  short_bio TEXT,
  website_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE marketplace_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  company TEXT,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comprehensive Solutions
CREATE TABLE marketplace_solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon_url TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_visible_initially BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams Section
CREATE TABLE marketplace_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE marketplace_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_banner ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_business_deserves ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_hire_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_teams ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read marketplace_hero" ON marketplace_hero FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_partners" ON marketplace_partners FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_banner" ON marketplace_banner FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_features" ON marketplace_features FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_slides" ON marketplace_slides FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_metrics" ON marketplace_metrics FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_resources" ON marketplace_resources FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_business_deserves" ON marketplace_business_deserves FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_hire_blocks" ON marketplace_hire_blocks FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_professionals" ON marketplace_professionals FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_testimonials" ON marketplace_testimonials FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_solutions" ON marketplace_solutions FOR SELECT USING (true);
CREATE POLICY "Public read marketplace_teams" ON marketplace_teams FOR SELECT USING (true);

-- Admin full access (checks profiles table directly - more reliable)
CREATE POLICY "Admin full access" ON marketplace_hero FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_partners FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_banner FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_features FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_slides FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_metrics FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_resources FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_business_deserves FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_hire_blocks FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_professionals FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_solutions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);
CREATE POLICY "Admin full access" ON marketplace_teams FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Hero Section
INSERT INTO marketplace_hero (title, subtitle, bullet_points, background_image_url) VALUES
('Connect with top resources to boost your', 'Marketplace', 
 '["Business Growth", "Transformation Journey"]'::jsonb,
 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop');

-- Partners
INSERT INTO marketplace_partners (name, logo_url, order_index) VALUES
('Partner 1', 'https://via.placeholder.com/150x60?text=Partner+1', 1),
('Partner 2', 'https://via.placeholder.com/150x60?text=Partner+2', 2),
('Partner 3', 'https://via.placeholder.com/150x60?text=Partner+3', 3),
('Partner 4', 'https://via.placeholder.com/150x60?text=Partner+4', 4),
('Partner 5', 'https://via.placeholder.com/150x60?text=Partner+5', 5);

-- Banner
INSERT INTO marketplace_banner (image_url, order_index) VALUES
('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=400&fit=crop', 1);

-- Features
INSERT INTO marketplace_features (title, description, icon_url, order_index) VALUES
('Innovation', 'Drive innovation with cutting-edge solutions', 'https://via.placeholder.com/80?text=💡', 1),
('Growth', 'Scale your business exponentially', 'https://via.placeholder.com/80?text=📈', 2),
('Quality', 'Deliver excellence in every project', 'https://via.placeholder.com/80?text=⭐', 3),
('Support', '24/7 dedicated customer support', 'https://via.placeholder.com/80?text=🤝', 4);

-- Slides
INSERT INTO marketplace_slides (heading, body, image_url, order_index) VALUES
('Transform Your Business', 'We provide comprehensive solutions to help you achieve your business goals with cutting-edge technology and expert guidance.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 1),
('Expert Team', 'Our team of professionals brings years of experience and expertise to deliver outstanding results for your projects.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 2);

-- Metrics
INSERT INTO marketplace_metrics (label, primary_percentage, color, order_index) VALUES
('Client Satisfaction', 20, '#3b82f6', 1),
('Project Success', 30, '#10b981', 2),
('Team Growth', 45, '#f59e0b', 3),
('Market Reach', 25, '#8b5cf6', 4),
('Innovation Index', 76, '#ef4444', 5);

-- Resources
INSERT INTO marketplace_resources (heading, description, image_url_9_16, download_url, button_text) VALUES
('Download Our Brochure', 'Get detailed information about our services and solutions', 
 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=700&fit=crop',
 '#', 'Download Now');

-- Business Deserves
INSERT INTO marketplace_business_deserves (main_heading, sub_heading, center_image_url_9_16, right_heading, right_subheading, left_points) VALUES
('Your Business Deserves Best', 'Excellence in every aspect',
 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=700&fit=crop',
 'Why Choose Us', 'We deliver results that matter',
 '["Proven track record", "Expert team", "Innovative solutions", "24/7 support", "Competitive pricing"]'::jsonb);

-- Hire Blocks
INSERT INTO marketplace_hire_blocks (category_name, image_position, image_url, description_title, bullet_points, order_index) VALUES
('Industry Trainers', 'left', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
 'Expert Industry Trainers', '["10+ years experience", "Industry certified", "Hands-on training"]'::jsonb, 1),
('Skilled Workforce', 'right', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
 'Skilled Workforce', '["Pre-vetted professionals", "Ready to deploy", "Flexible engagement"]'::jsonb, 2),
('Full Stack Teams', 'left', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
 'Full Stack Development Teams', '["End-to-end solutions", "Agile methodology", "Scalable architecture"]'::jsonb, 3);

-- Professionals
INSERT INTO marketplace_professionals (name, role, image_url, short_bio, order_index) VALUES
('John Doe', 'Senior Developer', 'https://i.pravatar.cc/300?img=12', 'Full-stack developer with 10+ years experience', 1),
('Jane Smith', 'UI/UX Designer', 'https://i.pravatar.cc/300?img=5', 'Award-winning designer specializing in user experience', 2),
('Mike Johnson', 'Data Scientist', 'https://i.pravatar.cc/300?img=33', 'AI/ML expert with proven track record', 3),
('Sarah Williams', 'Project Manager', 'https://i.pravatar.cc/300?img=9', 'Certified PMP with 15+ years experience', 4);

-- Testimonials
INSERT INTO marketplace_testimonials (client_name, company, quote, avatar_url, order_index) VALUES
('Robert Chen', 'Tech Corp', 'Outstanding service and exceptional results. Highly recommended!', 'https://i.pravatar.cc/150?img=15', 1),
('Emily Davis', 'StartUp Inc', 'They transformed our business with innovative solutions.', 'https://i.pravatar.cc/150?img=20', 2),
('David Wilson', 'Enterprise Ltd', 'Professional team that delivers on promises.', 'https://i.pravatar.cc/150?img=25', 3),
('Lisa Anderson', 'Global Solutions', 'Best decision we made for our digital transformation.', 'https://i.pravatar.cc/150?img=30', 4);

-- Solutions
INSERT INTO marketplace_solutions (title, icon_url, description, order_index, is_visible_initially) VALUES
('Web Development', 'https://via.placeholder.com/60?text=🌐', 'Custom web applications', 1, true),
('Mobile Apps', 'https://via.placeholder.com/60?text=📱', 'iOS and Android development', 2, true),
('Cloud Services', 'https://via.placeholder.com/60?text=☁️', 'Scalable cloud infrastructure', 3, true),
('AI/ML', 'https://via.placeholder.com/60?text=🤖', 'Artificial intelligence solutions', 4, true),
('Data Analytics', 'https://via.placeholder.com/60?text=📊', 'Business intelligence', 5, false),
('Cybersecurity', 'https://via.placeholder.com/60?text=🔒', 'Security solutions', 6, false);

-- Teams
INSERT INTO marketplace_teams (name, role, image_url, order_index) VALUES
('Alex Turner', 'CEO', 'https://i.pravatar.cc/200?img=60', 1),
('Maria Garcia', 'CTO', 'https://i.pravatar.cc/200?img=45', 2),
('James Brown', 'Lead Developer', 'https://i.pravatar.cc/200?img=51', 3),
('Sophie Martin', 'Design Lead', 'https://i.pravatar.cc/200?img=47', 4);


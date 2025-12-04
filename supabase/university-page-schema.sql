-- University Page Schema - Simplified
-- Uses existing universities and university_courses tables directly
-- Only creates tables for page-specific content

-- Note: If you get "already exists" errors, run university-page-cleanup.sql first

-- 1. Hero Section
DROP TABLE IF EXISTS university_page_hero CASCADE;
CREATE TABLE university_page_hero (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  background_image TEXT,
  background_video TEXT,
  overlay_opacity DECIMAL(3,2) DEFAULT 0.5,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Hero Navigation Tabs (now below hero)
DROP TABLE IF EXISTS university_page_tabs CASCADE;
CREATE TABLE university_page_tabs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tab_name TEXT NOT NULL,
  tab_link TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2b. Stats Section (below hero)
DROP TABLE IF EXISTS university_page_stats CASCADE;
CREATE TABLE university_page_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stat_number TEXT NOT NULL,
  stat_label TEXT NOT NULL,
  icon_type TEXT DEFAULT 'students', -- students, faculty, courses
  background_color TEXT DEFAULT '#EFF6FF',
  text_color TEXT DEFAULT '#2563EB',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Section Settings for "Universities to Explore"
DROP TABLE IF EXISTS university_page_explore_section CASCADE;
CREATE TABLE university_page_explore_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT DEFAULT 'Universities to Explore',
  section_subtitle TEXT,
  show_section BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Section Settings for "Discover Our Courses"
DROP TABLE IF EXISTS university_page_discover_section CASCADE;
CREATE TABLE university_page_discover_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT DEFAULT 'Discover Our Courses',
  section_subtitle TEXT,
  show_section BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Real Stories / Testimonials Section
DROP TABLE IF EXISTS university_page_stories_section CASCADE;
CREATE TABLE university_page_stories_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT DEFAULT 'Real Stories, Inspiring Journey',
  section_subtitle TEXT,
  show_section BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TABLE IF EXISTS university_page_testimonials CASCADE;
CREATE TABLE university_page_testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  before_image TEXT,
  after_image TEXT,
  before_title TEXT,
  after_title TEXT,
  story TEXT NOT NULL,
  course_name TEXT,
  university_name TEXT,
  rating DECIMAL(2,1),
  video_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Talk to Expert CTA Section
DROP TABLE IF EXISTS university_page_expert_cta CASCADE;
CREATE TABLE university_page_expert_cta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT DEFAULT 'Talk to Expert',
  subtitle TEXT,
  button_text TEXT DEFAULT 'Talk to Expert',
  button_link TEXT,
  background_color TEXT DEFAULT '#1e40af',
  text_color TEXT DEFAULT '#ffffff',
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Blogs Section
DROP TABLE IF EXISTS university_page_blogs_section CASCADE;
CREATE TABLE university_page_blogs_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_title TEXT DEFAULT 'Blogs',
  section_subtitle TEXT,
  show_section BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TABLE IF EXISTS university_page_blogs CASCADE;
CREATE TABLE university_page_blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_name TEXT,
  author_image TEXT,
  publish_date DATE,
  read_time TEXT,
  category TEXT,
  link TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE university_page_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_explore_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_discover_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_stories_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_expert_cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_blogs_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE university_page_blogs ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can view hero" ON university_page_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view tabs" ON university_page_tabs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view stats" ON university_page_stats FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view explore section" ON university_page_explore_section FOR SELECT USING (show_section = true);
CREATE POLICY "Public can view discover section" ON university_page_discover_section FOR SELECT USING (show_section = true);
CREATE POLICY "Public can view stories section" ON university_page_stories_section FOR SELECT USING (show_section = true);
CREATE POLICY "Public can view testimonials" ON university_page_testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view expert cta" ON university_page_expert_cta FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view blogs section" ON university_page_blogs_section FOR SELECT USING (show_section = true);
CREATE POLICY "Public can view blogs" ON university_page_blogs FOR SELECT USING (is_active = true);

-- Admin full access (authenticated users)
CREATE POLICY "Authenticated can manage hero" ON university_page_hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage tabs" ON university_page_tabs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage stats" ON university_page_stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage explore section" ON university_page_explore_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage discover section" ON university_page_discover_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage stories section" ON university_page_stories_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage testimonials" ON university_page_testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage expert cta" ON university_page_expert_cta FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage blogs section" ON university_page_blogs_section FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage blogs" ON university_page_blogs FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX idx_page_tabs_order ON university_page_tabs(display_order);
CREATE INDEX idx_page_stats_order ON university_page_stats(display_order);
CREATE INDEX idx_page_testimonials_order ON university_page_testimonials(display_order);
CREATE INDEX idx_page_blogs_order ON university_page_blogs(display_order);

-- Note: This schema uses existing tables directly:
-- - universities (for Universities to Explore section)
-- - university_courses (for Featured Courses and Discover Courses sections)
-- The page will query these tables directly without any linking tables

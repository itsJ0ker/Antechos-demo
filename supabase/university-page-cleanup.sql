-- Cleanup script for University Page
-- Run this FIRST if you need to reset the university page tables

-- Drop policies first
DROP POLICY IF EXISTS "Public can view hero" ON university_page_hero;
DROP POLICY IF EXISTS "Public can view tabs" ON university_page_tabs;
DROP POLICY IF EXISTS "Public can view explore section" ON university_page_explore_section;
DROP POLICY IF EXISTS "Public can view discover section" ON university_page_discover_section;
DROP POLICY IF EXISTS "Public can view stories section" ON university_page_stories_section;
DROP POLICY IF EXISTS "Public can view testimonials" ON university_page_testimonials;
DROP POLICY IF EXISTS "Public can view expert cta" ON university_page_expert_cta;
DROP POLICY IF EXISTS "Public can view blogs section" ON university_page_blogs_section;
DROP POLICY IF EXISTS "Public can view blogs" ON university_page_blogs;

DROP POLICY IF EXISTS "Authenticated can manage hero" ON university_page_hero;
DROP POLICY IF EXISTS "Authenticated can manage tabs" ON university_page_tabs;
DROP POLICY IF EXISTS "Authenticated can manage explore section" ON university_page_explore_section;
DROP POLICY IF EXISTS "Authenticated can manage discover section" ON university_page_discover_section;
DROP POLICY IF EXISTS "Authenticated can manage stories section" ON university_page_stories_section;
DROP POLICY IF EXISTS "Authenticated can manage testimonials" ON university_page_testimonials;
DROP POLICY IF EXISTS "Authenticated can manage expert cta" ON university_page_expert_cta;
DROP POLICY IF EXISTS "Authenticated can manage blogs section" ON university_page_blogs_section;
DROP POLICY IF EXISTS "Authenticated can manage blogs" ON university_page_blogs;

-- Drop tables
DROP TABLE IF EXISTS university_page_blogs CASCADE;
DROP TABLE IF EXISTS university_page_blogs_section CASCADE;
DROP TABLE IF EXISTS university_page_expert_cta CASCADE;
DROP TABLE IF EXISTS university_page_testimonials CASCADE;
DROP TABLE IF EXISTS university_page_stories_section CASCADE;
DROP TABLE IF EXISTS university_page_discover_section CASCADE;
DROP TABLE IF EXISTS university_page_explore_section CASCADE;
DROP TABLE IF EXISTS university_page_tabs CASCADE;
DROP TABLE IF EXISTS university_page_hero CASCADE;

-- Also clean up old tables if they exist
DROP TABLE IF EXISTS university_hero CASCADE;
DROP TABLE IF EXISTS university_hero_tabs CASCADE;
DROP TABLE IF EXISTS university_featured_courses CASCADE;
DROP TABLE IF EXISTS university_explore_section CASCADE;
DROP TABLE IF EXISTS university_explore_cards CASCADE;
DROP TABLE IF EXISTS university_discover_section CASCADE;
DROP TABLE IF EXISTS university_course_categories CASCADE;
DROP TABLE IF EXISTS university_course_cards CASCADE;
DROP TABLE IF EXISTS university_stories_section CASCADE;
DROP TABLE IF EXISTS university_testimonials CASCADE;
DROP TABLE IF EXISTS university_expert_cta CASCADE;
DROP TABLE IF EXISTS university_blogs_section CASCADE;
DROP TABLE IF EXISTS university_blogs CASCADE;
DROP TABLE IF EXISTS university_page_featured CASCADE;
DROP TABLE IF EXISTS university_page_featured_unis CASCADE;
DROP TABLE IF EXISTS university_page_course_categories CASCADE;
DROP TABLE IF EXISTS university_page_category_courses CASCADE;

-- Success message
SELECT 'University page tables cleaned up successfully!' as message;

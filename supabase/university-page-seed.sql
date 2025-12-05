-- Sample data for University Page
-- This uses existing universities and university_courses data

-- Hero Section
INSERT INTO university_page_hero (title, subtitle, background_image, is_active) VALUES
('Discover Your Future with Top Universities', 'Explore world-class programs and transform your career', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920', true);

-- Hero Tabs (now below hero)
INSERT INTO university_page_tabs (tab_name, tab_link, display_order) VALUES
('XX Courses', '#/courses', 1),
('Alumni', '#/alumni', 2),
('Universities', '#/universities', 3),
('Travel Excella', '#/travel', 4);

-- Stats Section
INSERT INTO university_page_stats (stat_number, stat_label, icon_type, background_color, text_color, display_order) VALUES
('1200+', 'Active Students', 'students', '#EFF6FF', '#2563EB', 1),
('85+', 'Best Faculty', 'faculty', '#F3E8FF', '#9333EA', 2),
('230+', 'Active Courses', 'courses', '#DCFCE7', '#16A34A', 3);

-- Featured Courses - Link to existing university_courses
-- First, let's get some course IDs (you'll need to adjust these based on your actual data)
-- Example: SELECT id FROM university_courses LIMIT 5;
-- Then insert like this:
-- INSERT INTO university_page_featured (university_course_id, background_color, text_color, badge_text, display_order) VALUES
-- (1, '#3b82f6', '#ffffff', 'Popular', 1),
-- (2, '#8b5cf6', '#ffffff', 'New', 2),
-- (3, '#ec4899', '#ffffff', 'In-demand', 3);

-- Universities to Explore Section
INSERT INTO university_page_explore_section (section_title, section_subtitle) VALUES
('Universities to Explore', 'Discover top-ranked institutions offering world-class education');

-- Featured Universities - Link to existing universities
-- Example: SELECT id FROM universities WHERE is_active = true LIMIT 4;
-- Then insert like this:
-- INSERT INTO university_page_featured_unis (university_id, display_order) VALUES
-- (1, 1),
-- (2, 2),
-- (3, 3),
-- (4, 4);

-- Discover Our Courses Section
INSERT INTO university_page_discover_section (section_title, section_subtitle) VALUES
('Discover Our Courses', 'Find the perfect program to match your career goals');

-- Course Categories
INSERT INTO university_page_course_categories (category_name, category_type, display_order) VALUES
('Online MBA', 'MBA/MCA', 1),
('Online MCA', 'MBA/MCA', 2),
('Online BBA', 'BBA/BCA', 3),
('Online BCA', 'BBA/BCA', 4);

-- Link courses to categories - Link to existing university_courses
-- Example: Get category and course IDs, then:
-- INSERT INTO university_page_category_courses (category_id, university_course_id, display_order) VALUES
-- ((SELECT id FROM university_page_course_categories WHERE category_name = 'Online MBA'), 1, 1),
-- ((SELECT id FROM university_page_course_categories WHERE category_name = 'Online MBA'), 2, 2);

-- Real Stories Section
INSERT INTO university_page_stories_section (section_title, section_subtitle) VALUES
('Real Stories, Inspiring Journey', 'Hear from our successful alumni who transformed their careers');

INSERT INTO university_page_testimonials (student_name, before_title, after_title, story, rating, display_order) VALUES
('Rahul Sharma', 'Sales Executive', 'Business Manager', 'The MBA program completely transformed my career. I gained practical skills and industry connections that helped me advance rapidly.', 5.0, 1),
('Priya Patel', 'Junior Developer', 'Tech Lead', 'The BCA program gave me the technical foundation and confidence to lead development teams.', 4.8, 2),
('Amit Kumar', 'Assistant Manager', 'Director of Operations', 'This program opened doors I never thought possible. The faculty and curriculum were exceptional.', 5.0, 3);

-- Talk to Expert CTA
INSERT INTO university_page_expert_cta (title, subtitle, button_text, button_link) VALUES
('Talk to Expert', 'Get personalized guidance for your educational journey', 'Talk to Expert', '#/contact-expert');

-- Blogs Section
INSERT INTO university_page_blogs_section (section_title, section_subtitle) VALUES
('Blogs', 'Stay updated with the latest insights and trends in education');

INSERT INTO university_page_blogs (title, excerpt, image_url, author_name, publish_date, read_time, category, link, display_order) VALUES
('Top 10 MBA Specializations in 2024', 'Discover the most in-demand MBA specializations that can boost your career prospects', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', 'Dr. Anjali Mehta', '2024-01-15', '5 min read', 'MBA', '#/blog/mba-specializations', 1),
('The Future of Online Education', 'How technology is reshaping the way we learn and grow', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400', 'Prof. Rajesh Kumar', '2024-01-10', '7 min read', 'Education', '#/blog/future-online-education', 2),
('Career Transition: From IT to Management', 'A comprehensive guide for tech professionals looking to move into management roles', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400', 'Sneha Gupta', '2024-01-05', '6 min read', 'Career', '#/blog/it-to-management', 3),
('Choosing the Right University: A Complete Guide', 'Key factors to consider when selecting your educational institution', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', 'Dr. Vikram Singh', '2024-01-01', '8 min read', 'Admissions', '#/blog/choosing-university', 4);

-- Helper query to link existing data:
-- Run these queries to see your existing data and then manually link them:

-- See all universities:
-- SELECT id, name FROM universities WHERE is_active = true ORDER BY name;

-- See all courses:
-- SELECT uc.id, u.name as university, uc.course_name 
-- FROM university_courses uc 
-- JOIN universities u ON uc.university_id = u.id 
-- ORDER BY u.name, uc.course_name;

-- Then use the IDs to populate:
-- university_page_featured (for featured courses carousel)
-- university_page_featured_unis (for universities to explore)
-- university_page_category_courses (for discover courses section)

-- Seed data for Antechos Platform
-- This file populates the database with initial data from the existing website

-- Insert initial statistics
INSERT INTO statistics (metric_name, metric_value, metric_type, display_order) VALUES
('Trained Students', 15000, 'students', 1),
('Placement Rate', 92, 'placement_rate', 2),
('Expert Trainers', 300, 'trainers', 3),
('Corporate Partners', 120, 'partners', 4);

-- Insert courses from the existing data
INSERT INTO courses (title, description, category, skill_level, price, original_price, duration, rating, image_url) VALUES
-- Content Creation Courses
('Graphic Design Masterclass', 'Learn professional graphic design techniques and tools', 'Content Creation', 'Intermediate', 3500, 7500, '3 months', 4.6, '/assets/analytics.jpg'),
('Video Editing Pro Course', 'Master video editing with industry-standard software', 'Content Creation', 'Expert', 3500, 7500, '3 months', 4.8, '/assets/analytics.jpg'),
('AI Tools for Content Creation', 'Harness AI power for efficient content creation', 'Content Creation', 'Beginner', 3500, 7500, '3 months', 4.7, '/assets/analytics.jpg'),

-- Marketing Courses
('SEO Optimization Strategies', 'Master search engine optimization techniques', 'Marketing', 'Intermediate', 3500, 7500, '3 months', 4.5, '/assets/analytics.jpg'),
('Digital Advertising', 'Create effective digital advertising campaigns', 'Marketing', 'Expert', 3500, 7500, '3 months', 4.4, '/assets/analytics.jpg'),
('Consumer Psychology in Marketing', 'Understand consumer behavior and decision-making', 'Marketing', 'Intermediate', 3500, 7500, '3 months', 4.6, '/assets/analytics.jpg'),
('Marketing Tools & AI Integration', 'Leverage AI tools for marketing automation', 'Marketing', 'Beginner', 3500, 7500, '3 months', 4.8, '/assets/analytics.jpg'),

-- Technology Courses
('Frontend Development', 'Build modern web applications with React', 'Technology', 'Intermediate', 7500, 10000, '3 months', 4.7, '/assets/analytics.jpg'),
('Backend Development', 'Build scalable backend applications with Node.js', 'Technology', 'Intermediate', 7500, 10000, '3 months', 4.6, '/assets/analytics.jpg'),
('Full Stack Web Development', 'Complete web development from frontend to backend', 'Technology', 'Expert', 14000, 15000, '3 months', 4.9, '/assets/analytics.jpg'),

-- Counselling Courses
('Effective Communication Skills', 'Develop strong communication and interpersonal skills', 'Counselling', 'Beginner', 7500, 0, '3 months', 4.5, '/assets/analytics.jpg'),
('Presentation & Public Speaking', 'Master the art of presentations and public speaking', 'Counselling', 'Intermediate', 7500, 0, '3 months', 4.7, '/assets/analytics.jpg'),
('Relationship Building & Networking', 'Build meaningful professional relationships', 'Counselling', 'Intermediate', 7500, 0, '3 months', 4.6, '/assets/analytics.jpg'),
('Psychological Counselling Techniques', 'Learn fundamental counselling and psychological support methods', 'Counselling', 'Expert', 7500, 0, '3 months', 4.8, '/assets/analytics.jpg');

-- Insert course modules for Graphic Design Masterclass (course_id = 1)
INSERT INTO course_modules (course_id, title, description, order_index) VALUES
(1, 'Module 1: Basics of Design', 'Understanding fundamental design principles', 1),
(1, 'Module 2: Adobe Photoshop', 'Master image editing and manipulation', 2),
(1, 'Module 3: Adobe Illustrator', 'Create vector graphics and logos', 3),
(1, 'Module 4: UI Design', 'Design user interfaces with Figma', 4);

-- Insert course module details for Module 1
INSERT INTO course_module_details (module_id, detail, order_index) VALUES
(1, 'Understanding color theory', 1),
(1, 'Typography principles', 2),
(1, 'Layout design basics', 3);

-- Insert course module details for Module 2
INSERT INTO course_module_details (module_id, detail, order_index) VALUES
(2, 'Image editing techniques', 1),
(2, 'Creating mockups', 2),
(2, 'Designing posters', 3);

-- Insert course skills for Graphic Design
INSERT INTO course_skills (course_id, skill_name) VALUES
(1, 'Photoshop'),
(1, 'Illustrator'),
(1, 'Typography'),
(1, 'Branding'),
(1, 'UI Design');

-- Insert course tools for Graphic Design
INSERT INTO course_tools (course_id, tool_name) VALUES
(1, 'Adobe Photoshop'),
(1, 'Adobe Illustrator'),
(1, 'Figma'),
(1, 'Canva');

-- Insert universities
INSERT INTO universities (name, code, location, description, image_url, rating, established, campus_size, ranking, fees) VALUES
('Amrita University', 'AMRITA', 'Coimbatore, Tamil Nadu', 'NAAC A++ accredited university with focus on value-based education and research.', '/assets/universities/Amrita.jpg', 4.7, '1994', '400+ acres', 'NAAC A++', '₹2,00,000 - ₹3,50,000 per year'),
('Aligarh Muslim University (AMU)', 'AMU', 'Aligarh, Uttar Pradesh', 'Premier central university with blend of modern and traditional education.', '/assets/universities/AMU.png', 4.5, '1875', '467.6 hectares', 'NAAC A', '₹10,000 - ₹50,000 per year'),
('Amity University Online', 'AMITY-ONLINE', 'Online', 'Leading private university offering UGC-entitled online degrees', '/assets/universities/Amity.jpg', 4.4, '2005', 'Virtual', 'NAAC A+', '₹1,20,000 - ₹1,95,000 total program'),
('Jain University Online', 'JAIN-ONLINE', 'Bengaluru, Karnataka', 'UGC-approved online programs with global recognition', '/assets/universities/jain.jpg', 4.5, '1990', 'Virtual', 'NAAC A++', '₹80,000 - ₹1,50,000 per year'),
('UPES Online', 'UPES-ONLINE', 'Dehradun, Uttarakhand', 'Industry-focused online programs with global rankings', '/assets/universities/upes.jpg', 4.6, '2003', 'Virtual', 'NAAC A', '₹1,00,000 - ₹1,50,000 total program');

-- Insert university programs
INSERT INTO university_programs (university_id, program_name) VALUES
(1, 'B.Tech'), (1, 'MBA'), (1, 'Medical'), (1, 'Arts'),
(2, 'BA'), (2, 'BSc'), (2, 'B.Tech'), (2, 'Medical'), (2, 'Law'),
(3, 'BBA'), (3, 'BCA'), (3, 'MBA'), (3, 'B.Com'), (3, 'M.Com'),
(4, 'BBA'), (4, 'BCA'), (4, 'MBA'), (4, 'B.Com'), (4, 'M.Com'), (4, 'MA'), (4, 'MCA'),
(5, 'BBA'), (5, 'BCA'), (5, 'MBA'), (5, 'MCA'), (5, 'PG Diploma');

-- Insert university collaborations
INSERT INTO university_collaborations (university_id, collaboration_name) VALUES
(1, '42 International Universities'), (1, '300+ Industry Partners'),
(2, 'Oxford University'), (2, 'Cambridge University'),
(3, 'Global Industry Partners'), (3, 'International Universities'),
(4, '2000+ Hiring Partners'), (4, 'International Universities'),
(5, 'Global Industry Partners'), (5, 'International Universities');

-- Insert trainers
INSERT INTO trainers (name, profile_title, photo_url, bio, industry, experience, location, languages, hourly_fee, rating, total_reviews) VALUES
('Gulshan Kumar', 'Full Stack Developer', '/assets/instructors/gulshan.jpg', 'Aspiring full stack developer with strong foundations in front-end and back-end technologies. Passionate about building efficient, user-friendly applications and solving real-world problems through technology.', 'Technology', 'Internship: 3 months (Frontend Development at IBM)', 'Delhi, India', ARRAY['English', 'Hindi'], 800, 4.7, 12),
('Vishwajeet Shinde', 'Business Development Professional', '/assets/instructors/vishwajeet.png', 'Results-driven professional with extensive experience in business development, sales team leadership, and strategic client acquisition. Proven ability to generate multi-crore revenues and build strong client relationships.', 'Business Development / Sales', '3+ years', 'Delhi, India', ARRAY['English', 'Hindi', 'Marathi'], 1500, 4.8, 20);

-- Insert trainer skills
INSERT INTO trainer_skills (trainer_id, skill_name) VALUES
(1, 'C'), (1, 'C++'), (1, 'JavaScript'), (1, 'ReactJS'), (1, 'Tailwind CSS'), (1, 'NodeJS'), (1, 'ExpressJS'), (1, 'MySQL'), (1, 'MongoDB'), (1, 'Git'),
(2, 'Critical Thinking and Problem Solving'), (2, 'Bilingual Communication'), (2, 'People Management'), (2, 'Leadership'), (2, 'Team Management');

-- Insert trainer expertise
INSERT INTO trainer_expertise (trainer_id, expertise_area) VALUES
(1, 'Frontend Development'), (1, 'Backend Development'), (1, 'Database Management'), (1, 'Web Application Development'), (1, 'Version Control'),
(2, 'Business Development'), (2, 'Sales Strategy'), (2, 'Team Leadership'), (2, 'Client Acquisition'), (2, 'Partnership Development');

-- Insert trainer certifications
INSERT INTO trainer_certifications (trainer_id, certification_name, issuing_organization) VALUES
(1, 'JavaScript Programming Essentials', 'Coursera'),
(1, 'Developing Front-End Apps with React', 'Coursera'),
(1, 'SQL Certification', 'HackerRank'),
(2, 'Excel', 'Amity University Online'),
(2, 'Business Development Training', 'DBA');

-- Insert workforce
INSERT INTO workforce (name, profile_title, photo_url, bio, industry, experience, location, languages, hourly_fee, rating, total_reviews) VALUES
('Ritika Gupta', 'Digital Marketing Specialist', '/assets/instructors/ritika.jpg', 'A skilled digital marketer proficient in SEO, SMO, and SMM, with strengths in boosting online visibility and engagement for businesses.', 'Digital Marketing', 'SEO Executive & Content Writer (Internships & Freelance)', 'New Delhi, India', ARRAY['English', 'Hindi'], 700, 4.7, 15),
('Mehak Kukreja', 'BCA Graduate | Aspiring Web Developer', '/assets/instructors/Mehak.jpg', 'A passionate and motivated BCA graduate eager to apply academic knowledge and develop professional skills in web development, digital marketing, and leadership.', 'Information Technology', 'Internships & Volunteer Roles in Web Development, Event Management, and Tutoring', 'Delhi, India', ARRAY['English', 'Hindi'], 500, 4.6, 10),
('Yukti Gupta', 'Leader at Antechos India', '/assets/instructors/yukti.jpg', 'Motivated leader at Antechos India with strong expertise in data science and digital marketing. Skilled at managing teams, driving projects, and implementing strategies.', 'Technology / Business', 'Leadership role at Antechos India', 'India', ARRAY['English', 'Hindi'], 1200, 4.6, 8);

-- Insert workforce skills
INSERT INTO workforce_skills (workforce_id, skill_name) VALUES
(1, 'SEO (On-Page, Off-Page, Technical)'), (1, 'Content Marketing'), (1, 'SMO (Social Media Optimization)'), (1, 'SMM (Social Media Marketing)'),
(2, 'Web Development'), (2, 'HTML'), (2, 'CSS'), (2, 'Java'), (2, 'MySQL'), (2, 'Digital Marketing'),
(3, 'Leadership'), (3, 'Team Management'), (3, 'Data Science'), (3, 'Digital Marketing'), (3, 'Strategic Planning');

-- Insert testimonials
INSERT INTO testimonials (name, position, company, image_url, rating, feedback, is_featured) VALUES
('Rajesh Kumar', 'CEO', 'TechStart India', 'https://randomuser.me/api/portraits/men/32.jpg', 5, 'Working with the team transformed our business completely. Their enterprise solutions are top-notch and delivered on time.', true),
('Priya Sharma', 'CTO', 'FinEdge Solutions', 'https://randomuser.me/api/portraits/women/44.jpg', 5, 'The professionals at Antechos built our mobile app from scratch. The team was professional, responsive and delivered beyond our expectations.', true),
('IBM Mentor', 'Program Lead', 'IBM Skills Build', null, 5, 'Gulshan showcased exceptional leadership and technical skills, delivering the project well within the timeline.', false),
('Former Manager at Byjus', 'Regional Sales Head', 'Byjus', null, 5, 'Vishwajeet consistently surpassed targets and inspired his team to perform at their best. His leadership and client handling skills are exceptional.', false);

-- Insert sample enquiries
INSERT INTO enquiries (name, email, phone, course_interest, country, message, status) VALUES
('John Doe', 'john.doe@example.com', '+91-9876543210', 'Full Stack Development', 'India', 'Interested in learning full stack development', 'new'),
('Jane Smith', 'jane.smith@example.com', '+91-9876543211', 'Digital Marketing', 'India', 'Want to enhance my digital marketing skills', 'contacted'),
('Mike Johnson', 'mike.johnson@example.com', '+1-555-0123', 'Graphic Design', 'USA', 'Looking for comprehensive graphic design course', 'new');

-- Insert blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, tags, is_published, published_at) VALUES
('Why a Good Portfolio Converts More Than an Optimized CV', 'portfolio-vs-cv', 'In today''s competitive job market, having a strong portfolio can make all the difference...', 'Learn why portfolios are more effective than traditional CVs in landing your dream job.', 'Career', ARRAY['portfolio', 'career', 'job-search'], true, NOW()),
('Skills with Proof of Work Over Regular Degree Program', 'skills-vs-degree', 'The traditional education system is being challenged by skill-based learning...', 'Discover why practical skills with proof of work are becoming more valuable than degrees.', 'Education', ARRAY['skills', 'education', 'career'], true, NOW()),
('Why Automation is the Future of Productivity', 'automation-productivity', 'Automation is revolutionizing how we work and increasing productivity across industries...', 'Explore how automation tools can transform your workflow and boost productivity.', 'Technology', ARRAY['automation', 'productivity', 'technology'], true, NOW());

-- Insert settings
INSERT INTO settings (key, value, description) VALUES
('site_name', '"Antechos"', 'Website name'),
('site_description', '"Supercharge Your Career with Industry-Ready Skills"', 'Website description'),
('contact_email', '"info@antechos.com"', 'Contact email address'),
('contact_phone', '"+91-XXXXXXXXXX"', 'Contact phone number'),
('social_media', '{"facebook": "", "twitter": "", "linkedin": "", "instagram": ""}', 'Social media links'),
('hero_stats', '{"students": 15000, "placement_rate": 92, "trainers": 300, "partners": 120}', 'Hero section statistics'),
('popup_settings', '{"enabled": true, "delay": 30000, "show_for_logged_out": true}', 'Enquiry popup settings');

-- Insert university FAQs for Amity Online
INSERT INTO university_faqs (university_id, question, answer, order_index) VALUES
(3, 'Is Amity Online degree valid?', 'Yes, Amity Online is UGC-DEB approved and globally recognized.', 1),
(3, 'Does Amity provide placement support?', 'Yes, Amity offers AI-powered career support, job tools, and internship opportunities.', 2),
(3, 'Are there live classes?', 'Yes, Amity Online provides both live and recorded sessions.', 3);

-- Insert university courses for Amity Online
INSERT INTO university_courses (university_id, course_name, description, specializations, fees, duration) VALUES
(3, 'Online B.Com', 'Comprehensive commerce program', ARRAY['General'], '₹99,000', '3 years'),
(3, 'Online M.Com', 'Advanced commerce studies', ARRAY['General'], '₹1,20,000', '2 years'),
(3, 'Online BBA', 'Business administration program', ARRAY['General', 'Finance', 'Marketing', 'Human Resource Management', 'International Business', 'Digital Marketing'], '₹1,65,000', '3 years'),
(3, 'Online BCA', 'Computer applications program', ARRAY['General', 'Data Science & Big Data Analytics', 'Cloud Computing & Cybersecurity'], '₹1,20,000', '3 years'),
(3, 'Online MBA', 'Master of Business Administration', ARRAY['Finance', 'Marketing', 'Human Resource Management', 'International Business', 'Information Technology'], '₹1,99,000', '2 years');
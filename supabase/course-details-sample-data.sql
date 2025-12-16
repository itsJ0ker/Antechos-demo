-- Sample Data for Course Details
-- Run this AFTER the schema setup is complete

-- Insert sample courses with detailed information
INSERT INTO courses (
    title, 
    description, 
    category, 
    skill_level, 
    price, 
    original_price, 
    duration, 
    instructor_name,
    instructor_bio,
    course_objectives,
    what_you_learn,
    course_features,
    target_audience,
    certification_details,
    language,
    is_active
) VALUES 
(
    'Complete Web Development Bootcamp',
    'Learn full-stack web development from scratch with hands-on projects and real-world applications.',
    'Technology',
    'Beginner',
    29999,
    49999,
    '12 weeks',
    'John Smith',
    'Senior Full Stack Developer with 8+ years of experience at top tech companies.',
    '["Master HTML, CSS, and JavaScript fundamentals", "Build responsive web applications", "Learn modern frameworks like React and Node.js", "Deploy applications to production"]',
    '["HTML5 and CSS3 mastery", "JavaScript ES6+ features", "React.js framework", "Node.js and Express.js", "Database design with MongoDB", "RESTful API development", "Git version control", "Deployment strategies"]',
    '["Lifetime access to course materials", "24/7 instructor support", "Real-world projects portfolio", "Industry-recognized certificate", "Job placement assistance", "Money-back guarantee"]',
    '["Complete beginners to programming", "Career changers looking to enter tech", "Students wanting to build web applications", "Professionals seeking to upskill"]',
    'Upon successful completion, you will receive an industry-recognized certificate that demonstrates your proficiency in full-stack web development.',
    'English',
    true
),
(
    'Data Science with Python',
    'Master data science concepts and tools using Python for data analysis, visualization, and machine learning.',
    'Technology',
    'Intermediate',
    39999,
    59999,
    '16 weeks',
    'Dr. Sarah Johnson',
    'PhD in Data Science with 10+ years of experience in machine learning and analytics.',
    '["Understand data science fundamentals", "Master Python for data analysis", "Learn machine learning algorithms", "Build predictive models"]',
    '["Python programming for data science", "Pandas and NumPy libraries", "Data visualization with Matplotlib and Seaborn", "Machine learning with Scikit-learn", "Statistical analysis techniques", "SQL for data manipulation", "Big data tools introduction"]',
    '["Hands-on projects with real datasets", "Industry mentorship program", "Career guidance and job placement", "Access to premium tools and software", "Peer learning community", "Capstone project"]',
    '["Working professionals in analytics", "Students with basic programming knowledge", "Business analysts seeking technical skills", "Anyone interested in data-driven decision making"]',
    'Earn a professional certificate in Data Science that is recognized by leading tech companies and can help advance your career.',
    'English',
    true
),
(
    'Digital Marketing Mastery',
    'Comprehensive digital marketing course covering SEO, social media, PPC, and content marketing strategies.',
    'Marketing',
    'Beginner',
    19999,
    29999,
    '8 weeks',
    'Maria Rodriguez',
    'Digital Marketing Expert with 12+ years helping brands grow online presence and drive conversions.',
    '["Master digital marketing fundamentals", "Create effective marketing campaigns", "Understand analytics and ROI", "Build brand presence online"]',
    '["SEO and keyword research", "Social media marketing", "Google Ads and PPC campaigns", "Content marketing strategies", "Email marketing automation", "Analytics and reporting", "Conversion optimization"]',
    '["Real campaign case studies", "Marketing tools access", "Personal mentorship", "Industry networking opportunities", "Portfolio development", "Certification preparation"]',
    '["Marketing professionals", "Business owners", "Entrepreneurs", "Students entering marketing field", "Anyone wanting to grow online presence"]',
    'Receive a comprehensive digital marketing certificate recognized by major marketing platforms and agencies.',
    'English',
    true
) ON CONFLICT (title) DO NOTHING;

-- Get the course IDs for sample data
DO $$
DECLARE
    web_dev_id INTEGER;
    data_science_id INTEGER;
    marketing_id INTEGER;
BEGIN
    -- Get course IDs
    SELECT id INTO web_dev_id FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1;
    SELECT id INTO data_science_id FROM courses WHERE title = 'Data Science with Python' LIMIT 1;
    SELECT id INTO marketing_id FROM courses WHERE title = 'Digital Marketing Mastery' LIMIT 1;
    
    -- Add modules for Web Development course
    IF web_dev_id IS NOT NULL THEN
        INSERT INTO course_modules (course_id, title, description, order_index, duration) VALUES
        (web_dev_id, 'Introduction to Web Development', 'Get started with the basics of web development', 1, '1 week'),
        (web_dev_id, 'HTML and CSS Fundamentals', 'Learn the building blocks of web pages', 2, '2 weeks'),
        (web_dev_id, 'JavaScript Essentials', 'Master JavaScript programming concepts', 3, '3 weeks'),
        (web_dev_id, 'React.js Framework', 'Build dynamic user interfaces with React', 4, '2 weeks'),
        (web_dev_id, 'Backend Development with Node.js', 'Create server-side applications', 5, '2 weeks'),
        (web_dev_id, 'Database Integration', 'Work with databases and data persistence', 6, '1 week'),
        (web_dev_id, 'Deployment and Production', 'Deploy your applications to the web', 7, '1 week')
        ON CONFLICT DO NOTHING;
        
        -- Add skills for Web Development course
        INSERT INTO course_skills (course_id, skill_name, skill_level) VALUES
        (web_dev_id, 'HTML5', 'Advanced'),
        (web_dev_id, 'CSS3', 'Advanced'),
        (web_dev_id, 'JavaScript', 'Advanced'),
        (web_dev_id, 'React.js', 'Intermediate'),
        (web_dev_id, 'Node.js', 'Intermediate'),
        (web_dev_id, 'MongoDB', 'Beginner'),
        (web_dev_id, 'Git', 'Intermediate')
        ON CONFLICT DO NOTHING;
        
        -- Add tools for Web Development course
        INSERT INTO course_tools (course_id, tool_name, tool_description) VALUES
        (web_dev_id, 'Visual Studio Code', 'Modern code editor with excellent web development support'),
        (web_dev_id, 'Chrome DevTools', 'Browser developer tools for debugging and testing'),
        (web_dev_id, 'Git & GitHub', 'Version control system for code management'),
        (web_dev_id, 'Postman', 'API testing and development tool'),
        (web_dev_id, 'MongoDB Compass', 'GUI for MongoDB database management'),
        (web_dev_id, 'Heroku', 'Cloud platform for application deployment')
        ON CONFLICT DO NOTHING;
        
        -- Add reviews for Web Development course
        INSERT INTO course_reviews (course_id, student_name, rating, review_text, is_verified, is_featured) VALUES
        (web_dev_id, 'Alex Kumar', 5, 'Excellent course! The instructor explains everything clearly and the projects are very practical.', true, true),
        (web_dev_id, 'Priya Sharma', 4, 'Great content and well-structured. Helped me land my first developer job!', true, false),
        (web_dev_id, 'Michael Chen', 5, 'Best investment I made for my career. The support from instructors is amazing.', true, true),
        (web_dev_id, 'Ravi Patel', 4, 'Comprehensive course covering all essential topics. Highly recommended!', true, false)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Add modules for Data Science course
    IF data_science_id IS NOT NULL THEN
        INSERT INTO course_modules (course_id, title, description, order_index, duration) VALUES
        (data_science_id, 'Python Fundamentals', 'Learn Python programming basics for data science', 1, '2 weeks'),
        (data_science_id, 'Data Analysis with Pandas', 'Master data manipulation and analysis', 2, '3 weeks'),
        (data_science_id, 'Data Visualization', 'Create compelling charts and graphs', 3, '2 weeks'),
        (data_science_id, 'Statistical Analysis', 'Understand statistical concepts and methods', 4, '3 weeks'),
        (data_science_id, 'Machine Learning Basics', 'Introduction to ML algorithms', 5, '4 weeks'),
        (data_science_id, 'Advanced ML Techniques', 'Deep learning and advanced algorithms', 6, '2 weeks')
        ON CONFLICT DO NOTHING;
        
        -- Add skills for Data Science course
        INSERT INTO course_skills (course_id, skill_name, skill_level) VALUES
        (data_science_id, 'Python', 'Advanced'),
        (data_science_id, 'Pandas', 'Advanced'),
        (data_science_id, 'NumPy', 'Advanced'),
        (data_science_id, 'Matplotlib', 'Intermediate'),
        (data_science_id, 'Scikit-learn', 'Intermediate'),
        (data_science_id, 'SQL', 'Intermediate'),
        (data_science_id, 'Statistics', 'Advanced')
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Add modules for Marketing course
    IF marketing_id IS NOT NULL THEN
        INSERT INTO course_modules (course_id, title, description, order_index, duration) VALUES
        (marketing_id, 'Digital Marketing Fundamentals', 'Understanding the digital marketing landscape', 1, '1 week'),
        (marketing_id, 'SEO and Content Marketing', 'Search engine optimization and content strategies', 2, '2 weeks'),
        (marketing_id, 'Social Media Marketing', 'Leveraging social platforms for business growth', 3, '2 weeks'),
        (marketing_id, 'PPC and Paid Advertising', 'Google Ads and Facebook advertising', 4, '2 weeks'),
        (marketing_id, 'Analytics and Optimization', 'Measuring and improving campaign performance', 5, '1 week')
        ON CONFLICT DO NOTHING;
        
        -- Add skills for Marketing course
        INSERT INTO course_skills (course_id, skill_name, skill_level) VALUES
        (marketing_id, 'SEO', 'Advanced'),
        (marketing_id, 'Google Ads', 'Intermediate'),
        (marketing_id, 'Facebook Ads', 'Intermediate'),
        (marketing_id, 'Content Marketing', 'Advanced'),
        (marketing_id, 'Analytics', 'Intermediate'),
        (marketing_id, 'Social Media', 'Advanced')
        ON CONFLICT DO NOTHING;
    END IF;
    
END $$;

-- Update course ratings based on reviews
UPDATE courses 
SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 2)
    FROM course_reviews 
    WHERE course_id = courses.id 
    AND is_active = true
)
WHERE id IN (
    SELECT DISTINCT course_id FROM course_reviews
);

-- Add some sample enrollments
INSERT INTO course_enrollments (course_id, student_name, student_email, completion_status, progress_percentage)
SELECT 
    c.id,
    enrollment_data.student_name,
    enrollment_data.student_email,
    enrollment_data.completion_status,
    enrollment_data.progress_percentage
FROM courses c,
(VALUES 
    ('John Doe', 'john.doe@email.com', 'completed', 100),
    ('Jane Smith', 'jane.smith@email.com', 'in_progress', 75),
    ('Bob Johnson', 'bob.johnson@email.com', 'enrolled', 25),
    ('Alice Brown', 'alice.brown@email.com', 'completed', 100),
    ('Charlie Wilson', 'charlie.wilson@email.com', 'in_progress', 50)
) AS enrollment_data(student_name, student_email, completion_status, progress_percentage)
WHERE c.title IN ('Complete Web Development Bootcamp', 'Data Science with Python', 'Digital Marketing Mastery')
ON CONFLICT DO NOTHING;

-- Update enrollment counts
UPDATE courses 
SET total_enrollments = (
    SELECT COUNT(*)
    FROM course_enrollments 
    WHERE course_id = courses.id
);

SELECT 'Sample course data inserted successfully!' as status;
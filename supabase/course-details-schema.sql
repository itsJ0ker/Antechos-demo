-- Enhanced Course Details Schema
-- This adds additional columns to the existing courses table for detailed course management

-- Add new columns to courses table if they don't exist
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS instructor_name TEXT,
ADD COLUMN IF NOT EXISTS instructor_bio TEXT,
ADD COLUMN IF NOT EXISTS instructor_image TEXT,
ADD COLUMN IF NOT EXISTS course_objectives JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS prerequisites JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS what_you_learn JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS course_features JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS target_audience JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS certification_details TEXT,
ADD COLUMN IF NOT EXISTS course_level TEXT DEFAULT 'Beginner',
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English',
ADD COLUMN IF NOT EXISTS last_updated DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_enrollments INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_skill_level ON courses(skill_level);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_rating ON courses(rating);
CREATE INDEX IF NOT EXISTS idx_courses_price ON courses(price);

-- Create course modules table for structured course content
CREATE TABLE IF NOT EXISTS course_modules (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    duration TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES course_modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    video_url TEXT,
    duration TEXT,
    order_index INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course skills table
CREATE TABLE IF NOT EXISTS course_skills (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    skill_level TEXT DEFAULT 'Beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course tools table
CREATE TABLE IF NOT EXISTS course_tools (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    tool_description TEXT,
    tool_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course reviews table
CREATE TABLE IF NOT EXISTS course_reviews (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_email TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completion_status TEXT DEFAULT 'enrolled', -- enrolled, in_progress, completed, dropped
    progress_percentage INTEGER DEFAULT 0,
    certificate_issued BOOLEAN DEFAULT false,
    payment_status TEXT DEFAULT 'pending', -- pending, paid, refunded
    amount_paid DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course certificates table
CREATE TABLE IF NOT EXISTS course_certificates (
    id SERIAL PRIMARY KEY,
    enrollment_id INTEGER REFERENCES course_enrollments(id) ON DELETE CASCADE,
    certificate_number TEXT UNIQUE NOT NULL,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_module_id ON course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_course_skills_course_id ON course_skills(course_id);
CREATE INDEX IF NOT EXISTS idx_course_tools_course_id ON course_tools(course_id);
CREATE INDEX IF NOT EXISTS idx_course_reviews_course_id ON course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_email ON course_enrollments(student_email);
CREATE INDEX IF NOT EXISTS idx_course_certificates_enrollment_id ON course_certificates(enrollment_id);

-- Add RLS policies
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_certificates ENABLE ROW LEVEL SECURITY;

-- Allow public read access to course-related data
CREATE POLICY "Allow public read access to course modules" ON course_modules FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course lessons" ON course_lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course skills" ON course_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course tools" ON course_tools FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course reviews" ON course_reviews FOR SELECT USING (is_active = true);

-- Allow authenticated users to manage course data
CREATE POLICY "Allow authenticated users to manage course modules" ON course_modules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course lessons" ON course_lessons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course skills" ON course_skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course tools" ON course_tools FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course reviews" ON course_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course enrollments" ON course_enrollments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course certificates" ON course_certificates FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update course rating based on reviews
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses 
    SET rating = (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM course_reviews 
        WHERE course_id = COALESCE(NEW.course_id, OLD.course_id) 
        AND is_active = true
    )
    WHERE id = COALESCE(NEW.course_id, OLD.course_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update course rating
DROP TRIGGER IF EXISTS trigger_update_course_rating ON course_reviews;
CREATE TRIGGER trigger_update_course_rating
    AFTER INSERT OR UPDATE OR DELETE ON course_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_course_rating();

-- Create function to update course enrollment count
CREATE OR REPLACE FUNCTION update_course_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses 
    SET total_enrollments = (
        SELECT COUNT(*)
        FROM course_enrollments 
        WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    )
    WHERE id = COALESCE(NEW.course_id, OLD.course_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update enrollment count
DROP TRIGGER IF EXISTS trigger_update_course_enrollment_count ON course_enrollments;
CREATE TRIGGER trigger_update_course_enrollment_count
    AFTER INSERT OR DELETE ON course_enrollments
    FOR EACH ROW
    EXECUTE FUNCTION update_course_enrollment_count();

-- Insert sample data for testing
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
) ON CONFLICT DO NOTHING;

-- Add some sample course modules (only if the sample course exists)
DO $$
DECLARE
    course_record RECORD;
BEGIN
    -- Check if the sample course exists
    SELECT id INTO course_record FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1;
    
    IF FOUND THEN
        INSERT INTO course_modules (course_id, title, description, order_index, duration) VALUES
        (course_record.id, 'Introduction to Web Development', 'Get started with the basics of web development', 1, '1 week'),
        (course_record.id, 'HTML and CSS Fundamentals', 'Learn the building blocks of web pages', 2, '2 weeks'),
        (course_record.id, 'JavaScript Essentials', 'Master JavaScript programming concepts', 3, '3 weeks'),
        (course_record.id, 'React.js Framework', 'Build dynamic user interfaces with React', 4, '2 weeks'),
        (course_record.id, 'Backend Development with Node.js', 'Create server-side applications', 5, '2 weeks'),
        (course_record.id, 'Database Integration', 'Work with databases and data persistence', 6, '1 week'),
        (course_record.id, 'Deployment and Production', 'Deploy your applications to the web', 7, '1 week')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Add some sample course skills (only if the sample course exists)
DO $$
DECLARE
    course_record RECORD;
BEGIN
    SELECT id INTO course_record FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1;
    
    IF FOUND THEN
        INSERT INTO course_skills (course_id, skill_name, skill_level) VALUES
        (course_record.id, 'HTML5', 'Advanced'),
        (course_record.id, 'CSS3', 'Advanced'),
        (course_record.id, 'JavaScript', 'Advanced'),
        (course_record.id, 'React.js', 'Intermediate'),
        (course_record.id, 'Node.js', 'Intermediate'),
        (course_record.id, 'MongoDB', 'Beginner'),
        (course_record.id, 'Git', 'Intermediate')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Add some sample course tools (only if the sample course exists)
DO $$
DECLARE
    course_record RECORD;
BEGIN
    SELECT id INTO course_record FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1;
    
    IF FOUND THEN
        INSERT INTO course_tools (course_id, tool_name, tool_description) VALUES
        (course_record.id, 'Visual Studio Code', 'Modern code editor with excellent web development support'),
        (course_record.id, 'Chrome DevTools', 'Browser developer tools for debugging and testing'),
        (course_record.id, 'Git & GitHub', 'Version control system for code management'),
        (course_record.id, 'Postman', 'API testing and development tool'),
        (course_record.id, 'MongoDB Compass', 'GUI for MongoDB database management'),
        (course_record.id, 'Heroku', 'Cloud platform for application deployment')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Add some sample reviews (only if the sample course exists)
DO $$
DECLARE
    course_record RECORD;
BEGIN
    SELECT id INTO course_record FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1;
    
    IF FOUND THEN
        INSERT INTO course_reviews (course_id, student_name, rating, review_text, is_verified, is_featured) VALUES
        (course_record.id, 'Alex Kumar', 5, 'Excellent course! The instructor explains everything clearly and the projects are very practical.', true, true),
        (course_record.id, 'Priya Sharma', 4, 'Great content and well-structured. Helped me land my first developer job!', true, false),
        (course_record.id, 'Michael Chen', 5, 'Best investment I made for my career. The support from instructors is amazing.', true, true),
        (course_record.id, 'Ravi Patel', 4, 'Comprehensive course covering all essential topics. Highly recommended!', true, false)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

COMMENT ON TABLE courses IS 'Enhanced courses table with detailed information for course management';
COMMENT ON TABLE course_modules IS 'Course modules for structured learning paths';
COMMENT ON TABLE course_lessons IS 'Individual lessons within course modules';
COMMENT ON TABLE course_skills IS 'Skills that students will learn in each course';
COMMENT ON TABLE course_tools IS 'Tools and technologies used in each course';
COMMENT ON TABLE course_reviews IS 'Student reviews and ratings for courses';
COMMENT ON TABLE course_enrollments IS 'Student enrollment tracking';
COMMENT ON TABLE course_certificates IS 'Course completion certificates';
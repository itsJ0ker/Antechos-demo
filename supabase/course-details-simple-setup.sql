-- Simple Course Details Setup
-- Run this step by step to avoid conflicts

-- Step 1: Add new columns to courses table
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

-- Step 2: Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_skill_level ON courses(skill_level);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_rating ON courses(rating);
CREATE INDEX IF NOT EXISTS idx_courses_price ON courses(price);

-- Step 3: Create course modules table
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

-- Step 4: Create course lessons table
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

-- Step 5: Create course skills table
CREATE TABLE IF NOT EXISTS course_skills (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    skill_level TEXT DEFAULT 'Beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create course tools table
CREATE TABLE IF NOT EXISTS course_tools (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    tool_description TEXT,
    tool_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Create course reviews table
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

-- Step 8: Create course enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    student_phone TEXT,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completion_status TEXT DEFAULT 'enrolled',
    progress_percentage INTEGER DEFAULT 0,
    certificate_issued BOOLEAN DEFAULT false,
    payment_status TEXT DEFAULT 'pending',
    amount_paid DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 9: Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_module_id ON course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_course_skills_course_id ON course_skills(course_id);
CREATE INDEX IF NOT EXISTS idx_course_tools_course_id ON course_tools(course_id);
CREATE INDEX IF NOT EXISTS idx_course_reviews_course_id ON course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON course_enrollments(course_id);

-- Step 10: Enable RLS
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Step 11: Create RLS policies
CREATE POLICY "Allow public read access to course modules" ON course_modules FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course lessons" ON course_lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course skills" ON course_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course tools" ON course_tools FOR SELECT USING (true);
CREATE POLICY "Allow public read access to course reviews" ON course_reviews FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage course modules" ON course_modules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course lessons" ON course_lessons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course skills" ON course_skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course tools" ON course_tools FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course reviews" ON course_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage course enrollments" ON course_enrollments FOR ALL USING (auth.role() = 'authenticated');

-- Success message
SELECT 'Course Details schema setup completed successfully!' as status;
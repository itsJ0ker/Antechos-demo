-- Supabase Database Schema for Antechos Platform
-- This schema covers all data entities found in the website

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE course_skill_level AS ENUM ('Beginner', 'Intermediate', 'Expert');
CREATE TYPE course_category AS ENUM ('Content Creation', 'Marketing', 'Technology', 'Counselling');
CREATE TYPE enquiry_status AS ENUM ('new', 'contacted', 'converted', 'closed');
CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student', 'workforce');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    phone TEXT,
    bio TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE public.courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category course_category NOT NULL,
    subcategory TEXT,
    skill_level course_skill_level DEFAULT 'Beginner',
    price DECIMAL(10,2) DEFAULT 0,
    original_price DECIMAL(10,2),
    duration TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course modules
CREATE TABLE public.course_modules (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course module details
CREATE TABLE public.course_module_details (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES course_modules(id) ON DELETE CASCADE,
    detail TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course skills
CREATE TABLE public.course_skills (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course tools
CREATE TABLE public.course_tools (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Universities table
CREATE TABLE public.universities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE,
    location TEXT,
    description TEXT,
    about TEXT,
    image_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    established TEXT,
    campus_size TEXT,
    ranking TEXT,
    fees TEXT,
    fee_structure TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University programs
CREATE TABLE public.university_programs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    program_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University collaborations
CREATE TABLE public.university_collaborations (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    collaboration_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University approvals
CREATE TABLE public.university_approvals (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    approval_name TEXT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University courses
CREATE TABLE public.university_courses (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    course_name TEXT NOT NULL,
    description TEXT,
    specializations TEXT[], -- Array of specializations
    fees TEXT,
    duration TEXT,
    image_url TEXT, -- Course image/thumbnail URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- University FAQs
CREATE TABLE public.university_faqs (
    id SERIAL PRIMARY KEY,
    university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainers/Instructors table
CREATE TABLE public.trainers (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    name TEXT NOT NULL,
    profile_title TEXT,
    photo_url TEXT,
    cover_photo_url TEXT,
    bio TEXT,
    about TEXT,
    industry TEXT,
    experience TEXT,
    location TEXT,
    languages TEXT[],
    availability TEXT,
    hourly_fee DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer skills
CREATE TABLE public.trainer_skills (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer expertise
CREATE TABLE public.trainer_expertise (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    expertise_area TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer certifications
CREATE TABLE public.trainer_certifications (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    certification_name TEXT NOT NULL,
    issuing_organization TEXT,
    date_obtained DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer achievements
CREATE TABLE public.trainer_achievements (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    achievement_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer projects
CREATE TABLE public.trainer_projects (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[],
    impact TEXT,
    project_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer education
CREATE TABLE public.trainer_education (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    year TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainer tools
CREATE TABLE public.trainer_tools (
    id SERIAL PRIMARY KEY,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce table (skilled professionals for hire)
CREATE TABLE public.workforce (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    name TEXT NOT NULL,
    profile_title TEXT,
    photo_url TEXT,
    cover_photo_url TEXT,
    bio TEXT,
    about TEXT,
    industry TEXT,
    experience TEXT,
    location TEXT,
    languages TEXT[],
    availability TEXT,
    hourly_fee DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce skills
CREATE TABLE public.workforce_skills (
    id SERIAL PRIMARY KEY,
    workforce_id INTEGER REFERENCES workforce(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce expertise
CREATE TABLE public.workforce_expertise (
    id SERIAL PRIMARY KEY,
    workforce_id INTEGER REFERENCES workforce(id) ON DELETE CASCADE,
    expertise_area TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce certifications
CREATE TABLE public.workforce_certifications (
    id SERIAL PRIMARY KEY,
    workforce_id INTEGER REFERENCES workforce(id) ON DELETE CASCADE,
    certification_name TEXT NOT NULL,
    issuing_organization TEXT,
    date_obtained DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce achievements
CREATE TABLE public.workforce_achievements (
    id SERIAL PRIMARY KEY,
    workforce_id INTEGER REFERENCES workforce(id) ON DELETE CASCADE,
    achievement_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce education
CREATE TABLE public.workforce_education (
    id SERIAL PRIMARY KEY,
    workforce_id INTEGER REFERENCES workforce(id) ON DELETE CASCADE,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    year TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workforce tools
CREATE TABLE public.workforce_tools (
    id SERIAL PRIMARY KEY,
    workforce_id INTEGER REFERENCES workforce(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE public.testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    company TEXT,
    image_url TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE public.enquiries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_interest TEXT,
    country TEXT,
    message TEXT,
    status enquiry_status DEFAULT 'new',
    source TEXT DEFAULT 'website',
    assigned_to UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image_url TEXT,
    author_id UUID REFERENCES profiles(id),
    category TEXT,
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table for admin configuration
CREATE TABLE public.settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statistics table for dashboard
CREATE TABLE public.statistics (
    id SERIAL PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value INTEGER NOT NULL,
    metric_type TEXT, -- 'students', 'placement_rate', 'trainers', 'partners'
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_courses_category ON courses(category);
CREATE INDEX idx_courses_skill_level ON courses(skill_level);
CREATE INDEX idx_courses_active ON courses(is_active);
CREATE INDEX idx_universities_active ON universities(is_active);
CREATE INDEX idx_trainers_active ON trainers(is_active);
CREATE INDEX idx_workforce_active ON workforce(is_active);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trainers_updated_at BEFORE UPDATE ON trainers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workforce_updated_at BEFORE UPDATE ON workforce FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_statistics_updated_at BEFORE UPDATE ON statistics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE workforce ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Public read access for most content
CREATE POLICY "Public read access" ON courses FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON universities FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON trainers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON workforce FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access" ON statistics FOR SELECT USING (is_active = true);

-- Admin full access
CREATE POLICY "Admin full access" ON profiles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON courses FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON universities FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON trainers FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON workforce FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON testimonials FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON enquiries FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON settings FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin full access" ON statistics FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Allow public to insert enquiries
CREATE POLICY "Public can insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
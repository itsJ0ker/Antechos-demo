-- Fix Row Level Security policies to allow admin operations
-- Run this in your Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON universities;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON universities;
DROP POLICY IF EXISTS "Enable update for users based on email" ON universities;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON universities;

DROP POLICY IF EXISTS "Enable read access for all users" ON courses;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON courses;
DROP POLICY IF EXISTS "Enable update for users based on email" ON courses;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON courses;

-- Create simple policies that allow all operations for authenticated users
-- Universities policies
CREATE POLICY "Allow all operations for authenticated users" ON universities
    FOR ALL USING (auth.role() = 'authenticated');

-- Courses policies  
CREATE POLICY "Allow all operations for authenticated users" ON courses
    FOR ALL USING (auth.role() = 'authenticated');

-- Course modules policies
CREATE POLICY "Allow all operations for authenticated users" ON course_modules
    FOR ALL USING (auth.role() = 'authenticated');

-- Course skills policies
CREATE POLICY "Allow all operations for authenticated users" ON course_skills
    FOR ALL USING (auth.role() = 'authenticated');

-- Course tools policies
CREATE POLICY "Allow all operations for authenticated users" ON course_tools
    FOR ALL USING (auth.role() = 'authenticated');

-- University programs policies
CREATE POLICY "Allow all operations for authenticated users" ON university_programs
    FOR ALL USING (auth.role() = 'authenticated');

-- University collaborations policies
CREATE POLICY "Allow all operations for authenticated users" ON university_collaborations
    FOR ALL USING (auth.role() = 'authenticated');

-- University approvals policies
CREATE POLICY "Allow all operations for authenticated users" ON university_approvals
    FOR ALL USING (auth.role() = 'authenticated');

-- University courses policies
CREATE POLICY "Allow all operations for authenticated users" ON university_courses
    FOR ALL USING (auth.role() = 'authenticated');

-- University FAQs policies
CREATE POLICY "Allow all operations for authenticated users" ON university_faqs
    FOR ALL USING (auth.role() = 'authenticated');

-- Trainers policies
CREATE POLICY "Allow all operations for authenticated users" ON trainers
    FOR ALL USING (auth.role() = 'authenticated');

-- Workforce policies
CREATE POLICY "Allow all operations for authenticated users" ON workforce
    FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials policies
CREATE POLICY "Allow all operations for authenticated users" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

-- Enquiries policies
CREATE POLICY "Allow all operations for authenticated users" ON enquiries
    FOR ALL USING (auth.role() = 'authenticated');

-- Statistics policies
CREATE POLICY "Allow all operations for authenticated users" ON statistics
    FOR ALL USING (auth.role() = 'authenticated');

-- Settings policies
CREATE POLICY "Allow all operations for authenticated users" ON settings
    FOR ALL USING (auth.role() = 'authenticated');
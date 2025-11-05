-- Add sample data to test the admin panel
-- Run this in your Supabase SQL Editor after running the fix-database-policies.sql

-- Insert sample courses
INSERT INTO courses (title, description, category, skill_level, duration, price, original_price, image_url, rating, is_active) VALUES
('React Development Masterclass', 'Learn React from basics to advanced concepts', 'Web Development', 'Intermediate', '3 months', 2999, 5999, 'https://via.placeholder.com/400x300', 4.8, true),
('Python for Data Science', 'Complete Python course for data analysis and machine learning', 'Data Science', 'Beginner', '4 months', 3499, 6999, 'https://via.placeholder.com/400x300', 4.7, true),
('Digital Marketing Pro', 'Master digital marketing strategies and tools', 'Marketing', 'Intermediate', '2 months', 2499, 4999, 'https://via.placeholder.com/400x300', 4.6, true);

-- Insert sample universities
INSERT INTO universities (name, description, location, website, logo_url, is_active) VALUES
('Tech University', 'Leading technology university with excellent programs', 'Delhi, India', 'https://techuni.edu', 'https://via.placeholder.com/200x200', true),
('Business School', 'Premier business education institution', 'Mumbai, India', 'https://bizschool.edu', 'https://via.placeholder.com/200x200', true);

-- Insert sample trainers
INSERT INTO trainers (name, profile_title, bio, email, phone, location, hourly_rate, rating, experience_years, is_active) VALUES
('John Doe', 'Full Stack Developer', 'Experienced developer with 5+ years in web development', 'john@example.com', '+91-9876543210', 'Bangalore, India', 1500, 4.8, 5, true),
('Jane Smith', 'Data Scientist', 'Expert in machine learning and data analysis', 'jane@example.com', '+91-9876543211', 'Hyderabad, India', 2000, 4.9, 7, true);

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, content, rating, is_featured, is_active) VALUES
('Alice Johnson', 'Software Engineer', 'Google', 'Excellent courses that helped me land my dream job!', 5, true, true),
('Bob Wilson', 'Data Analyst', 'Microsoft', 'The instructors are amazing and very knowledgeable.', 5, true, true);

-- Insert sample enquiries
INSERT INTO enquiries (name, email, phone, course_interest, message, status) VALUES
('Test User 1', 'test1@example.com', '+91-9876543212', 'React Development', 'Interested in learning React', 'new'),
('Test User 2', 'test2@example.com', '+91-9876543213', 'Python for Data Science', 'Want to know more about the course', 'contacted');
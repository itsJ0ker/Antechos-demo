-- Sample Testimonials Data with Images
-- Use this to test the new testimonials design

-- First, ensure the new columns exist
ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS student_image_url TEXT,
ADD COLUMN IF NOT EXISTS before_company_logo TEXT,
ADD COLUMN IF NOT EXISTS after_company_logo TEXT,
ADD COLUMN IF NOT EXISTS salary_hike TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT;

-- Insert sample testimonial 1
INSERT INTO university_page_testimonials (
  student_name,
  student_image_url,
  before_company_logo,
  before_title,
  after_company_logo,
  after_title,
  salary_hike,
  story,
  course_name,
  university_name,
  rating,
  linkedin_url,
  is_active,
  display_order
) VALUES (
  'Akriti Gupta',
  'https://i.pravatar.cc/400?img=47',
  'https://logo.clearbit.com/accenture.com',
  'Associate, Human Resource',
  'https://logo.clearbit.com/deloitte.com',
  'Senior Associate, Human Resource',
  '30% HIKE',
  'Navigating the MBA landscape was daunting – a maze of countless programs, complex applications, and uncertain career paths. Edukyu became my compass, expertly guiding me through the confusion. Their personalized recommendations, insightful course information, aligned my aspirations with the perfect program. Today, I confidently lead in my new role, forever grateful to Edukyu. They didn''t just help me choose an MBA program; they empowered me to chart the right career path.',
  'MBA',
  'Amity University',
  5.0,
  'https://linkedin.com/in/akriti-gupta',
  true,
  0
);

-- Insert sample testimonial 2
INSERT INTO university_page_testimonials (
  student_name,
  student_image_url,
  before_company_logo,
  before_title,
  after_company_logo,
  after_title,
  salary_hike,
  story,
  course_name,
  university_name,
  rating,
  linkedin_url,
  is_active,
  display_order
) VALUES (
  'Rahul Sharma',
  'https://i.pravatar.cc/400?img=12',
  'https://logo.clearbit.com/infosys.com',
  'Software Developer',
  'https://logo.clearbit.com/google.com',
  'Senior Software Engineer',
  '50% HIKE',
  'The MBA program completely transformed my career trajectory. From a developer role to leading technical teams, the journey has been incredible. The curriculum was perfectly aligned with industry needs, and the faculty brought real-world experience to every class. The networking opportunities opened doors I never knew existed.',
  'MBA in Technology Management',
  'Manipal University',
  4.8,
  'https://linkedin.com/in/rahul-sharma',
  true,
  1
);

-- Insert sample testimonial 3
INSERT INTO university_page_testimonials (
  student_name,
  student_image_url,
  before_company_logo,
  before_title,
  after_company_logo,
  after_title,
  salary_hike,
  '2x SALARY',
  story,
  course_name,
  university_name,
  rating,
  linkedin_url,
  is_active,
  display_order
) VALUES (
  'Priya Patel',
  'https://i.pravatar.cc/400?img=32',
  'https://logo.clearbit.com/tcs.com',
  'Business Analyst',
  'https://logo.clearbit.com/amazon.com',
  'Product Manager',
  '2x SALARY',
  'Switching from a technical role to product management seemed impossible until I found the right MBA program. The specialized courses in product strategy and user experience design gave me the skills I needed. Today, I lead product initiatives at a Fortune 500 company, and it all started with making the right educational choice.',
  'MBA in Product Management',
  'NMIMS University',
  5.0,
  'https://linkedin.com/in/priya-patel',
  true,
  2
);

-- Insert sample testimonial 4
INSERT INTO university_page_testimonials (
  student_name,
  student_image_url,
  before_company_logo,
  before_title,
  after_company_logo,
  after_title,
  salary_hike,
  story,
  course_name,
  university_name,
  rating,
  is_active,
  display_order
) VALUES (
  'Amit Kumar',
  'https://i.pravatar.cc/400?img=68',
  'https://logo.clearbit.com/wipro.com',
  'Marketing Executive',
  'https://logo.clearbit.com/unilever.com',
  'Brand Manager',
  '40% HIKE',
  'The MBA in Marketing opened up a world of opportunities I never imagined. The practical approach to learning, combined with industry internships, prepared me for real-world challenges. The career services team was instrumental in helping me land my dream job. This program didn''t just teach me marketing; it taught me how to think strategically.',
  'MBA in Marketing',
  'Symbiosis University',
  4.9,
  true,
  3
);

-- Verify the data
SELECT 
  student_name,
  before_title,
  after_title,
  salary_hike,
  course_name,
  university_name,
  rating
FROM university_page_testimonials
WHERE is_active = true
ORDER BY display_order;

-- Note: The image URLs used here are placeholders
-- Replace them with actual images when deploying to production
-- 
-- Image sources:
-- - Student photos: https://i.pravatar.cc (placeholder service)
-- - Company logos: https://logo.clearbit.com (free logo API)
-- 
-- For production, use:
-- - Supabase Storage for student photos
-- - Official company websites for logos
-- - Ensure all images are properly licensed

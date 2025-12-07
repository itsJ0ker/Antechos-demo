-- Add image fields to university_page_testimonials table

-- Add student_image_url column
ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS student_image_url TEXT;

-- Add before_company_logo column
ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS before_company_logo TEXT;

-- Add after_company_logo column
ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS after_company_logo TEXT;

-- Add salary_hike column (optional, for displaying percentage)
ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS salary_hike TEXT;

-- Add linkedin_url column (optional, for LinkedIn profile link)
ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT;

-- Update existing records with placeholder values (optional)
-- UPDATE university_page_testimonials 
-- SET student_image_url = 'https://via.placeholder.com/150'
-- WHERE student_image_url IS NULL;

COMMENT ON COLUMN university_page_testimonials.student_image_url IS 'URL to student profile image';
COMMENT ON COLUMN university_page_testimonials.before_company_logo IS 'URL to before company logo';
COMMENT ON COLUMN university_page_testimonials.after_company_logo IS 'URL to after company logo';
COMMENT ON COLUMN university_page_testimonials.salary_hike IS 'Salary hike percentage or text (e.g., "30% HIKE")';
COMMENT ON COLUMN university_page_testimonials.linkedin_url IS 'LinkedIn profile URL';

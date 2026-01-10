-- ============================================
-- TESTIMONIALS REDESIGN - DATABASE MIGRATION
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Estimated time: < 1 minute
-- ============================================

-- Step 1: Add new columns to testimonials table
-- These columns support the new image-based design

ALTER TABLE university_page_testimonials 
ADD COLUMN IF NOT EXISTS student_image_url TEXT,
ADD COLUMN IF NOT EXISTS before_company_logo TEXT,
ADD COLUMN IF NOT EXISTS after_company_logo TEXT,
ADD COLUMN IF NOT EXISTS salary_hike TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT;

-- Step 2: Add helpful comments to columns
COMMENT ON COLUMN university_page_testimonials.student_image_url IS 'URL to student profile image (circular display, 400x400px recommended)';
COMMENT ON COLUMN university_page_testimonials.before_company_logo IS 'URL to company logo before career change (PNG preferred, 200x80px)';
COMMENT ON COLUMN university_page_testimonials.after_company_logo IS 'URL to company logo after career change (PNG preferred, 200x80px)';
COMMENT ON COLUMN university_page_testimonials.salary_hike IS 'Salary increase text displayed as badge (e.g., "30% HIKE", "2x SALARY")';
COMMENT ON COLUMN university_page_testimonials.linkedin_url IS 'LinkedIn profile URL for credibility (optional)';

-- Step 3: Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'university_page_testimonials'
AND column_name IN (
    'student_image_url',
    'before_company_logo', 
    'after_company_logo',
    'salary_hike',
    'linkedin_url'
)
ORDER BY column_name;

-- ============================================
-- EXPECTED OUTPUT:
-- ============================================
-- You should see 5 rows with these columns:
-- - student_image_url (text, nullable)
-- - before_company_logo (text, nullable)
-- - after_company_logo (text, nullable)
-- - salary_hike (text, nullable)
-- - linkedin_url (text, nullable)
-- ============================================

-- ============================================
-- NEXT STEPS:
-- ============================================
-- 1. ✅ Verify output shows 5 new columns
-- 2. 🔄 Refresh your application
-- 3. 👀 Check University Page for new design
-- 4. ⚙️ Go to Admin Panel → University Page Manager → Testimonials
-- 5. ➕ Add or edit testimonials with images
-- 6. 📱 Test on mobile devices
-- ============================================

-- ============================================
-- OPTIONAL: Add sample data for testing
-- ============================================
-- Uncomment the section below to add test data

/*
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
  'Navigating the MBA landscape was daunting – a maze of countless programs, complex applications, and uncertain career paths. Edukyu became my compass, expertly guiding me through the confusion. Their personalized recommendations, insightful course information, aligned my aspirations with the perfect program. Today, I confidently lead in my new role, forever grateful to Edukyu.',
  'MBA',
  'Amity University',
  5.0,
  'https://linkedin.com/in/akriti-gupta',
  true,
  0
);
*/

-- ============================================
-- TROUBLESHOOTING:
-- ============================================
-- Error: "column already exists"
--   → This is OK! It means columns were already added
--   → Continue to next steps
--
-- Error: "relation does not exist"
--   → Check table name: university_page_testimonials
--   → Verify you're in the correct database
--
-- Error: "permission denied"
--   → Ensure you're logged in as admin
--   → Check RLS policies
-- ============================================

-- ============================================
-- ROLLBACK (if needed):
-- ============================================
-- Only run this if you need to undo changes

/*
ALTER TABLE university_page_testimonials 
DROP COLUMN IF EXISTS student_image_url,
DROP COLUMN IF EXISTS before_company_logo,
DROP COLUMN IF EXISTS after_company_logo,
DROP COLUMN IF EXISTS salary_hike,
DROP COLUMN IF EXISTS linkedin_url;
*/

-- ============================================
-- MIGRATION COMPLETE! 🎉
-- ============================================
-- Your database is now ready for the new
-- testimonials design with images.
--
-- Check the documentation:
-- - TESTIMONIALS_QUICK_SETUP.md (5-min guide)
-- - TESTIMONIALS_ADMIN_GUIDE.md (admin help)
-- - TESTIMONIALS_REDESIGN_GUIDE.md (full docs)
-- ============================================

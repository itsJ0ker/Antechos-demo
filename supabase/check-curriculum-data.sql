-- Check if curriculum data is saved in the database
-- Run this in Supabase SQL Editor to verify your data

-- Check the specialization with id=3 (from your console log)
SELECT 
  id,
  name,
  curriculum,
  jsonb_pretty(curriculum) as curriculum_formatted
FROM course_specializations
WHERE id = 3;

-- Check all specializations for university 3, course 7
SELECT 
  id,
  name,
  curriculum IS NOT NULL as has_curriculum,
  jsonb_array_length(curriculum) as num_semesters
FROM course_specializations
WHERE university_id = 3 AND parent_course_id = 7;

-- If curriculum is there but not showing, check the structure
SELECT 
  id,
  name,
  curriculum
FROM course_specializations
WHERE university_id = 3 AND parent_course_id = 7
  AND curriculum IS NOT NULL;

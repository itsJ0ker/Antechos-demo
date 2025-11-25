-- Quick Test Queries for Course Specializations
-- Run these in Supabase SQL Editor to verify everything is working

-- 1. Check if table exists
SELECT COUNT(*) as table_exists 
FROM information_schema.tables 
WHERE table_name = 'course_specializations';
-- Expected: 1

-- 2. Check all specializations with course and university names
SELECT 
  cs.id,
  cs.name as specialization_name,
  cs.description,
  cs.duration,
  cs.fees,
  cs.is_active,
  uc.course_name,
  u.name as university_name
FROM course_specializations cs
LEFT JOIN university_courses uc ON cs.parent_course_id = uc.id
LEFT JOIN universities u ON cs.university_id = u.id
ORDER BY u.name, uc.course_name, cs.display_order;

-- 3. Count specializations per course
SELECT 
  uc.id as course_id,
  uc.course_name,
  u.name as university_name,
  COUNT(cs.id) as specialization_count
FROM university_courses uc
LEFT JOIN universities u ON uc.university_id = u.id
LEFT JOIN course_specializations cs ON cs.parent_course_id = uc.id AND cs.is_active = true
GROUP BY uc.id, uc.course_name, u.name
ORDER BY u.name, uc.course_name;

-- 4. Find courses WITH specializations
SELECT 
  uc.id,
  uc.course_name,
  u.name as university_name,
  COUNT(cs.id) as spec_count
FROM university_courses uc
JOIN universities u ON uc.university_id = u.id
LEFT JOIN course_specializations cs ON cs.parent_course_id = uc.id AND cs.is_active = true
GROUP BY uc.id, uc.course_name, u.name
HAVING COUNT(cs.id) > 0;

-- 5. Check a specific course (replace IDs with your actual IDs)
-- SELECT * FROM course_specializations 
-- WHERE parent_course_id = YOUR_COURSE_ID 
-- AND is_active = true;

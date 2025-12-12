-- Test if foundation_curriculum column exists and can be updated

-- 1. Check if column exists
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'university_courses' 
AND column_name = 'foundation_curriculum';

-- 2. Check current data in a sample course
SELECT id, course_name, foundation_curriculum 
FROM university_courses 
LIMIT 3;

-- 3. Test update (replace ID with an actual course ID from your database)
-- UPDATE university_courses 
-- SET foundation_curriculum = '[
--   {
--     "semester": "SEM 1",
--     "description": "Foundation Semester 1", 
--     "subjects": ["Test Subject 1", "Test Subject 2"]
--   },
--   {
--     "semester": "SEM 2",
--     "description": "Foundation Semester 2",
--     "subjects": ["Test Subject 3", "Test Subject 4"]
--   }
-- ]'::jsonb
-- WHERE id = 1; -- Replace with actual course ID

-- 4. Verify the update worked
-- SELECT id, course_name, foundation_curriculum 
-- FROM university_courses 
-- WHERE id = 1; -- Replace with actual course ID
-- Check if foundation_curriculum column exists in university_courses table

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public'
  AND table_name = 'university_courses' 
  AND column_name = 'foundation_curriculum';

-- If the above query returns no rows, the column doesn't exist and migration is needed
-- If it returns a row, the column exists and you can proceed with enabling it in the code
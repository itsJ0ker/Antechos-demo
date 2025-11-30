-- Fix: Convert curriculum column from TEXT to JSONB
-- This will allow proper JSON storage and retrieval

-- First, check current column type
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'course_specializations' 
  AND column_name IN ('curriculum', 'program_highlights', 'career_paths', 'industry_insight_stats');

-- First, clean up empty strings (replace with NULL)
UPDATE course_specializations SET curriculum = NULL WHERE curriculum = '';
UPDATE course_specializations SET program_highlights = NULL WHERE program_highlights = '';
UPDATE course_specializations SET career_paths = NULL WHERE career_paths = '';
UPDATE course_specializations SET industry_insight_stats = NULL WHERE industry_insight_stats = '';

-- Convert curriculum from TEXT to JSONB
ALTER TABLE course_specializations 
ALTER COLUMN curriculum TYPE JSONB USING 
  CASE 
    WHEN curriculum IS NULL OR curriculum = '' THEN NULL
    ELSE curriculum::jsonb 
  END;

-- Also ensure other JSON columns are JSONB (not TEXT)
ALTER TABLE course_specializations 
ALTER COLUMN program_highlights TYPE JSONB USING 
  CASE 
    WHEN program_highlights IS NULL OR program_highlights = '' THEN NULL
    ELSE program_highlights::jsonb 
  END;

ALTER TABLE course_specializations 
ALTER COLUMN career_paths TYPE JSONB USING 
  CASE 
    WHEN career_paths IS NULL OR career_paths = '' THEN NULL
    ELSE career_paths::jsonb 
  END;

ALTER TABLE course_specializations 
ALTER COLUMN industry_insight_stats TYPE JSONB USING 
  CASE 
    WHEN industry_insight_stats IS NULL OR industry_insight_stats = '' THEN NULL
    ELSE industry_insight_stats::jsonb 
  END;

-- Verify the changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'course_specializations' 
  AND column_name IN ('curriculum', 'program_highlights', 'career_paths', 'industry_insight_stats');

-- Now check your data
SELECT 
  id,
  name,
  curriculum,
  jsonb_array_length(curriculum) as num_semesters
FROM course_specializations
WHERE id = 3;

-- Add foundation_curriculum column to university_courses table
-- This will store Semester 1 & 2 curriculum that's common across all specializations

ALTER TABLE university_courses 
ADD COLUMN foundation_curriculum JSONB DEFAULT '[]'::jsonb;

-- Add a comment to explain the column purpose
COMMENT ON COLUMN university_courses.foundation_curriculum IS 'Foundation curriculum for Semester 1 & 2 - common across all specializations of this course';

-- Update existing courses to have default foundation curriculum structure
UPDATE university_courses 
SET foundation_curriculum = '[
  {
    "semester": "SEM 1",
    "description": "Foundation Semester 1",
    "subjects": []
  },
  {
    "semester": "SEM 2", 
    "description": "Foundation Semester 2",
    "subjects": []
  }
]'::jsonb
WHERE foundation_curriculum IS NULL OR foundation_curriculum = '[]'::jsonb;

-- Verify the update
SELECT 
  id,
  course_name,
  foundation_curriculum
FROM university_courses
LIMIT 5;
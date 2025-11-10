-- Add image_url column to university_courses table
-- This allows each course to have its own image

ALTER TABLE university_courses 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add a comment to document the column
COMMENT ON COLUMN university_courses.image_url IS 'URL for the course image/thumbnail';

-- Update existing courses with a default placeholder if needed (optional)
-- UPDATE university_courses SET image_url = 'https://via.placeholder.com/400x300?text=Course' WHERE image_url IS NULL;

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'university_courses'
ORDER BY ordinal_position;

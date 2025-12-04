-- Add program_highlights column to university_courses table
-- This will store course-level highlights (degree images, certifications, etc.)

ALTER TABLE university_courses 
ADD COLUMN IF NOT EXISTS program_highlights JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN university_courses.program_highlights IS 'Array of program highlights with title, description, and optional image_url';

-- Example structure:
-- [
--   {
--     "title": "UGC Approved Degree",
--     "description": "Recognized by University Grants Commission",
--     "image_url": "https://example.com/ugc-logo.png"
--   },
--   {
--     "title": "Industry Certifications",
--     "description": "Get certified by leading industry partners",
--     "image_url": "https://example.com/cert-logo.png"
--   }
-- ]

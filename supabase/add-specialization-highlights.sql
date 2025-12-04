-- Add specialization_program_highlights column to course_specializations table
-- This will store specialization-level highlights with images (certifications, badges, etc.)

ALTER TABLE course_specializations 
ADD COLUMN IF NOT EXISTS specialization_program_highlights JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN course_specializations.specialization_program_highlights IS 'Array of specialization-specific program highlights with title, description, and image_url';

-- Example structure:
-- [
--   {
--     "title": "CFA Level 1 Prep",
--     "description": "Preparation for Chartered Financial Analyst certification",
--     "image_url": "https://example.com/cfa-logo.png"
--   },
--   {
--     "title": "Bloomberg Terminal Access",
--     "description": "Hands-on experience with industry-standard tools",
--     "image_url": "https://example.com/bloomberg-logo.png"
--   }
-- ]

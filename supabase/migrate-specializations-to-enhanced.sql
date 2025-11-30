-- Migration Script: Add Enhanced Columns to Existing course_specializations Table
-- This script safely adds new columns without dropping existing data

-- Add new text columns
ALTER TABLE course_specializations 
ADD COLUMN IF NOT EXISTS program_overview TEXT,
ADD COLUMN IF NOT EXISTS industry_insight_title TEXT DEFAULT 'Industry Insight',
ADD COLUMN IF NOT EXISTS industry_insight_content TEXT,
ADD COLUMN IF NOT EXISTS specialization_details TEXT,
ADD COLUMN IF NOT EXISTS career_support TEXT,
ADD COLUMN IF NOT EXISTS alumni_network TEXT,
ADD COLUMN IF NOT EXISTS entry_level_info TEXT,
ADD COLUMN IF NOT EXISTS mid_level_info TEXT,
ADD COLUMN IF NOT EXISTS senior_level_info TEXT,
ADD COLUMN IF NOT EXISTS booking_cta_text TEXT DEFAULT 'Book Your Seat Today';

-- Add new JSONB columns
ALTER TABLE course_specializations 
ADD COLUMN IF NOT EXISTS industry_insight_stats JSONB,
ADD COLUMN IF NOT EXISTS program_highlights JSONB,
ADD COLUMN IF NOT EXISTS curriculum JSONB,
ADD COLUMN IF NOT EXISTS core_subjects JSONB,
ADD COLUMN IF NOT EXISTS elective_subjects JSONB,
ADD COLUMN IF NOT EXISTS career_paths JSONB;

-- Add new boolean column
ALTER TABLE course_specializations 
ADD COLUMN IF NOT EXISTS booking_enabled BOOLEAN DEFAULT true;

-- Update existing records to have default values
UPDATE course_specializations 
SET 
  industry_insight_title = COALESCE(industry_insight_title, 'Industry Insight'),
  booking_cta_text = COALESCE(booking_cta_text, 'Book Your Seat Today'),
  booking_enabled = COALESCE(booking_enabled, true)
WHERE industry_insight_title IS NULL 
   OR booking_cta_text IS NULL 
   OR booking_enabled IS NULL;

-- Verify the migration
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'course_specializations'
ORDER BY ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully! All new columns added to course_specializations table.';
END $$;

-- Update marketplace_solutions table to support service card design
-- Add new columns for pricing, ratings, categories, and images

ALTER TABLE marketplace_solutions
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1),
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Update existing description column to be more detailed if needed
COMMENT ON COLUMN marketplace_solutions.description IS 'Detailed description of the service';
COMMENT ON COLUMN marketplace_solutions.short_description IS 'Brief description shown on card';
COMMENT ON COLUMN marketplace_solutions.image_url IS 'Service card image URL';
COMMENT ON COLUMN marketplace_solutions.category IS 'Service category badge';
COMMENT ON COLUMN marketplace_solutions.rating IS 'Service rating (0-5)';
COMMENT ON COLUMN marketplace_solutions.price IS 'Current price';
COMMENT ON COLUMN marketplace_solutions.original_price IS 'Original price (for discount calculation)';
COMMENT ON COLUMN marketplace_solutions.is_featured IS 'Show as featured/most popular';

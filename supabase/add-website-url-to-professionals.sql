-- Add website_url column to marketplace_professionals table

ALTER TABLE marketplace_professionals 
ADD COLUMN IF NOT EXISTS website_url TEXT;

COMMENT ON COLUMN marketplace_professionals.website_url IS 'Professional or company website URL';

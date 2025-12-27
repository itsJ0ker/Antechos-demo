-- Add author name and email fields to blog_posts table
-- This allows for simpler blog management without requiring profile relationships

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS author_name TEXT,
ADD COLUMN IF NOT EXISTS author_email TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Update existing records to have default author info if needed
UPDATE blog_posts 
SET author_name = 'Admin User', 
    author_email = 'admin@example.com',
    is_featured = false
WHERE author_name IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_name);

-- Update the RLS policies to work with the new structure
-- (The existing policies should still work fine)
-- Fix marketplace_resources table and RLS policies
-- Run this in your Supabase SQL editor

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'marketplace_resources'
);

-- If the table doesn't exist, create it
CREATE TABLE IF NOT EXISTS marketplace_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL,
  description TEXT,
  image_url_9_16 TEXT,
  download_url TEXT,
  button_text TEXT DEFAULT 'Download',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE marketplace_resources ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read marketplace_resources" ON marketplace_resources;
DROP POLICY IF EXISTS "Admin full access" ON marketplace_resources;

-- Create public read policy
CREATE POLICY "Public read marketplace_resources" ON marketplace_resources FOR SELECT USING (true);

-- Create admin policy (assuming you have a profiles table with role column)
CREATE POLICY "Admin full access marketplace_resources" ON marketplace_resources FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role)
);

-- Insert sample data if table is empty
INSERT INTO marketplace_resources (heading, description, image_url_9_16, download_url, button_text)
SELECT 'Download Our Brochure', 'Get detailed information about our services and solutions', 
       'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=700&fit=crop',
       '#', 'Download Now'
WHERE NOT EXISTS (SELECT 1 FROM marketplace_resources);

-- Verify the fix
SELECT * FROM marketplace_resources WHERE is_active = true;
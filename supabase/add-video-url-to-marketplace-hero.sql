-- Add video_url field to marketplace_hero table
ALTER TABLE marketplace_hero ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update the existing hero record with a sample YouTube video URL
UPDATE marketplace_hero 
SET video_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
WHERE id = (SELECT id FROM marketplace_hero LIMIT 1);

-- If no hero record exists, insert one with video
INSERT INTO marketplace_hero (title, subtitle, bullet_points, background_image_url, video_url)
SELECT 
  'Connect with top resources to boost your',
  'Marketplace',
  '["Business Growth", "Transformation Journey"]'::jsonb,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
WHERE NOT EXISTS (SELECT 1 FROM marketplace_hero);
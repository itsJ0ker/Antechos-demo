-- About Us Gallery Schema
-- Stores gallery images for the About Us page

-- Create gallery table
CREATE TABLE IF NOT EXISTS about_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'general', -- team, office, events, awards, etc.
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_about_gallery_active ON about_gallery(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_about_gallery_category ON about_gallery(category);

-- Enable RLS
ALTER TABLE about_gallery ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access to active gallery images"
  ON about_gallery
  FOR SELECT
  USING (is_active = true);

-- Admin full access
CREATE POLICY "Allow admin full access to gallery"
  ON about_gallery
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Sample gallery data
INSERT INTO about_gallery (image_url, caption, category, display_order) VALUES
  ('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', 'Team Collaboration', 'team', 1),
  ('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', 'Innovation Hub', 'office', 2),
  ('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 'Strategic Planning', 'team', 3),
  ('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', 'Workshop Session', 'events', 4),
  ('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', 'Creative Space', 'office', 5),
  ('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', 'Team Meeting', 'team', 6),
  ('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', 'Brainstorming', 'team', 7),
  ('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', 'Learning Together', 'events', 8);

COMMENT ON TABLE about_gallery IS 'Gallery images for the About Us page';

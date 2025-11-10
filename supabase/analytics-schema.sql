-- Analytics table for tracking website visitors
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_url TEXT,
  referrer TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  user_agent TEXT,
  screen_resolution TEXT,
  viewport_size TEXT,
  language TEXT,
  timezone TEXT,
  duration INTEGER DEFAULT 0,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table for custom event tracking
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_data JSONB,
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_visited_at ON analytics(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics(country);
CREATE INDEX IF NOT EXISTS idx_analytics_ip ON analytics(ip_address);
CREATE INDEX IF NOT EXISTS idx_analytics_device ON analytics(device);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name);

-- Enable Row Level Security
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON analytics
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous event inserts" ON analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all analytics
CREATE POLICY "Allow authenticated read" ON analytics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated event read" ON analytics_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role full access
CREATE POLICY "Allow service role full access" ON analytics
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full event access" ON analytics_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to clean old analytics data (optional - keeps last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS void AS $$
BEGIN
  DELETE FROM analytics 
  WHERE visited_at < NOW() - INTERVAL '90 days';
  
  DELETE FROM analytics_events 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run cleanup weekly (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-analytics', '0 0 * * 0', 'SELECT cleanup_old_analytics()');

COMMENT ON TABLE analytics IS 'Stores website visitor analytics data';
COMMENT ON TABLE analytics_events IS 'Stores custom event tracking data';

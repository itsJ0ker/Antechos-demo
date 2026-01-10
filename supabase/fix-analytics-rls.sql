-- Fix Analytics RLS Policy
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON analytics;
DROP POLICY IF EXISTS "Allow authenticated read" ON analytics;
DROP POLICY IF EXISTS "Allow service role full access" ON analytics;

-- Recreate policies with correct permissions
CREATE POLICY "Enable insert for anon users" ON analytics
  FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON analytics
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON analytics
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Enable all for service role" ON analytics
  FOR ALL 
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'analytics';

-- Test insert (should work now)
INSERT INTO analytics (page_path, device, browser, visited_at)
VALUES ('/test-rls-fix', 'Desktop', 'Chrome', NOW());

-- Verify insert
SELECT * FROM analytics ORDER BY visited_at DESC LIMIT 1;

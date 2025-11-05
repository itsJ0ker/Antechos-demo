-- Create a simple admin user for testing
-- Run this in your Supabase SQL editor

-- First, create the user in auth.users (this is usually done via Supabase Auth)
-- You'll need to sign up with this email/password through the Supabase Auth UI first
-- Then run this to make them admin:

-- Update: Let's create a simple way to test
-- Go to your Supabase dashboard > Authentication > Users
-- Click "Add user" and create:
-- Email: admin@test.com
-- Password: admin123

-- Then run this SQL to make sure they have admin access:
INSERT INTO profiles (id, email, role, created_at, updated_at)
VALUES (
  -- You'll need to replace this with the actual user ID from auth.users
  'replace-with-user-id-from-auth-users',
  'admin@test.com',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = NOW();
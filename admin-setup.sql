-- Admin Setup Script for Antechos Platform
-- Run this in Supabase SQL Editor after creating your admin user account

-- 1. First, create your admin user via Supabase Auth Dashboard or API
-- Go to Authentication > Users > Add User
-- Enter email: admin@antechos.com (or your preferred admin email)
-- Enter a secure password
-- Copy the User ID (UUID) that gets generated

-- 2. Replace 'YOUR_ADMIN_USER_ID_HERE' with the actual UUID from step 1
-- Example: '12345678-1234-1234-1234-123456789012'

-- Create admin profile
INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
) VALUES (
    'YOUR_ADMIN_USER_ID_HERE'::uuid,  -- Replace with actual UUID
    'admin@antechos.com',             -- Replace with your admin email
    'Admin User',                     -- Replace with admin name
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET 
    role = 'admin',
    updated_at = NOW();

-- 3. Verify admin user was created
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.role,
    p.created_at,
    au.email_confirmed_at
FROM public.profiles p
LEFT JOIN auth.users au ON p.id = au.id
WHERE p.role = 'admin';

-- 4. Optional: Create additional admin users
-- Repeat the INSERT statement above with different UUIDs and emails

-- 5. Test admin access
-- Go to your website at /admin/login
-- Login with the admin credentials
-- You should be redirected to /admin/dashboard

-- Troubleshooting:
-- If you get "Access Denied", check:
-- 1. The user ID matches exactly between auth.users and profiles
-- 2. The role is set to 'admin' in profiles table
-- 3. Your VITE_ADMIN_EMAIL environment variable matches the email
-- 4. The user account is confirmed (email_confirmed_at is not null)

-- To check auth.users table (if you have service role access):
-- SELECT id, email, email_confirmed_at FROM auth.users WHERE email = 'admin@antechos.com';

-- To update an existing user to admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- To check RLS policies are working:
-- SELECT * FROM public.profiles WHERE role = 'admin';

-- Success! Your admin panel should now be functional.
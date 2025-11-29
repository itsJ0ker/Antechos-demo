-- =====================================================
-- FIX ADMIN ACCESS FOR MARKETPLACE REDESIGN
-- =====================================================
-- This script sets the admin role for your user
-- Run this AFTER running marketplace-redesign-schema.sql

-- Replace 'your-admin-email@example.com' with your actual admin email
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';

-- Verify the update
SELECT id, email, role, full_name 
FROM profiles 
WHERE role = 'admin';

-- If you need to set admin by user ID instead:
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE id = 'your-user-uuid-here';

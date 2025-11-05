# Create Test User for Login

## Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** > **Users**
4. Click **"Add user"**
5. Fill in:
   - **Email**: `test@example.com`
   - **Password**: `test123456`
   - **Email Confirm**: Check this box
6. Click **"Create user"**

## Method 2: Using SQL (Alternative)

Run this in your Supabase SQL Editor:

```sql
-- This creates a user directly in the auth system
-- Note: This is for testing only, normally users sign up through the UI

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@example.com',
  crypt('test123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

## Test the Login

1. Go to your website: http://localhost:5173/
2. Click **"Login"** in the navbar
3. Use credentials:
   - **Email**: `test@example.com`
   - **Password**: `test123456`
4. You should be logged in and see your email in the navbar
5. You can logout using the "Logout" button

## Admin Access

For admin access to the simple dashboard:
1. Go to: http://localhost:5173/#/simple-login
2. Use the same credentials
3. You'll see the admin dashboard with courses from your database
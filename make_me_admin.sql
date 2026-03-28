-- RUN THIS IN SUPABASE SQL EDITOR TO GIVE YOURSELF ADMIN ACCESS
-- Replace 'YOUR_USER_ID' with your actual user UID from the 'auth.users' table.

-- 1. Ensure the profiles table exists (if you haven't run the previous script)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert or Update your user to be an Admin
-- Use this if you know your ID
INSERT INTO public.profiles (id, email, role, full_name)
VALUES ('YOUR_USER_ID_HERE', 'YOUR_EMAIL_HERE', 'admin', 'Super Admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin', email = EXCLUDED.email;

-- 3. If you don't know your ID, you can make ALL users admins (ONLY FOR TESTING!)
-- UPDATE public.profiles SET role = 'admin';

-- 4. Verify RLS is enabled for security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

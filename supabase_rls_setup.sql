-- 1. SETUP CORE TABLES & RLS
-- This script secures your Supabase database using Row Level Security (RLS) policies.
-- It follows a "Public Read, Admin Manage" pattern for maximum security.

-- PROFILES & ROLES (Core security table)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- UNIVERSITIES (Main listing table)
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  image_url TEXT,
  rating DECIMAL(3,2),
  link_url TEXT,
  established INTEGER,
  category TEXT CHECK (category IN ('Private', 'Public', 'Deemed')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- 3. SECURITY FUNCTIONS
-- This function allows us to verify if a user has the 'admin' role securely.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. DEFINE POLICIES

-- PROFILES: Everyone can view limited info, only users update themselves.
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- UNIVERSITIES: View for all if active, Admins control everything.
CREATE POLICY "Universities are viewable by everyone when active." 
ON public.universities FOR SELECT 
USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins have full access to universities." 
ON public.universities FOR ALL 
TO authenticated 
USING (public.is_admin());

-- 5. BATCH SECURE ALL REMAINING TABLES
-- Automatically applies RLS and Read/Admin policies to your other tables.
DO $$
DECLARE
  table_name_var text;
  tables_to_secure text[] := ARRAY[
    'courses', 'course_skills', 'course_tools', 'course_modules', 
    'university_programs', 'university_approvals', 'university_faqs',
    'trainers', 'workforce', 'blog_posts', 'statistics', 'settings', 'testimonials',
    'enquiries'
  ];
BEGIN
  FOREACH table_name_var IN ARRAY tables_to_secure
  LOOP
    -- Enable RLS
    EXECUTE 'ALTER TABLE public.' || table_name_var || ' ENABLE ROW LEVEL SECURITY;';
    
    -- Drop existing policies for idempotency
    EXECUTE 'DROP POLICY IF EXISTS "Public Read" ON public.' || table_name_var || ';';
    EXECUTE 'DROP POLICY IF EXISTS "Admin All" ON public.' || table_name_var || ';';
    
    -- Add Public Read Policy
    -- Note: for 'enquiries', only allow INSERT for public (anon & authenticated).
    IF table_name_var = 'enquiries' THEN
        EXECUTE 'CREATE POLICY "Anyone can submit an enquiry." ON public.' || table_name_var || 
                ' FOR INSERT TO anon, authenticated WITH CHECK (true);';
    ELSE
        EXECUTE 'CREATE POLICY "Public Read" ON public.' || table_name_var || 
                ' FOR SELECT USING (true);';
    END IF;
            
    -- Add Admin Full Access Policy
    EXECUTE 'CREATE POLICY "Admin All" ON public.' || table_name_var || 
            ' FOR ALL TO authenticated USING (public.is_admin());';
  END LOOP;
END $$;

-- =====================================================
-- FIX JWT ROLE CLAIM FOR MARKETPLACE ADMIN ACCESS
-- =====================================================
-- This ensures the JWT token includes the user's role

-- Create or replace function to add role to JWT claims
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
  user_role text;
BEGIN
  -- Get the user's role from profiles table
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = (event->>'user_id')::uuid;

  -- Get existing claims
  claims := event->'claims';

  -- Add role to claims if it exists
  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{role}', to_jsonb(user_role));
  ELSE
    claims := jsonb_set(claims, '{role}', '"student"');
  END IF;

  -- Update the event with new claims
  event := jsonb_set(event, '{claims}', claims);

  RETURN event;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO postgres;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO anon;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO authenticated;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO service_role;

-- Note: After running this, you need to configure the hook in Supabase Dashboard:
-- 1. Go to Authentication > Hooks
-- 2. Enable "Custom Access Token" hook
-- 3. Select the function: public.custom_access_token_hook
-- 4. Save

-- OR you can set it via SQL (if you have the right permissions):
-- This requires superuser access, so it might not work in Supabase cloud
-- ALTER DATABASE postgres SET "app.settings.jwt_hook_function" TO 'public.custom_access_token_hook';

-- Verify the function exists
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'custom_access_token_hook';

-- Fixed Admin User Management Policies
-- This file fixes the RLS policy issue with views

-- Drop the problematic view if it exists
DROP VIEW IF EXISTS admin_user_overview;

-- First, let's create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- You can customize this logic based on how you identify admin users
  -- For now, we'll check if the user email contains 'admin' or is in a specific list
  RETURN EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = user_id 
    AND (
      email LIKE '%admin%' 
      OR email IN ('admin@antechos.com', 'admin@example.com')
      OR raw_user_meta_data->>'role' = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for user_profiles
DROP POLICY IF EXISTS "Admins can view all user profiles" ON user_profiles;
CREATE POLICY "Admins can view all user profiles" ON user_profiles
    FOR SELECT USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update all user profiles" ON user_profiles;
CREATE POLICY "Admins can update all user profiles" ON user_profiles
    FOR UPDATE USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete user profiles" ON user_profiles;
CREATE POLICY "Admins can delete user profiles" ON user_profiles
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_course_enrollments
DROP POLICY IF EXISTS "Admins can view all enrollments" ON user_course_enrollments;
CREATE POLICY "Admins can view all enrollments" ON user_course_enrollments
    FOR SELECT USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update all enrollments" ON user_course_enrollments;
CREATE POLICY "Admins can update all enrollments" ON user_course_enrollments
    FOR UPDATE USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete enrollments" ON user_course_enrollments;
CREATE POLICY "Admins can delete enrollments" ON user_course_enrollments
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_achievements
DROP POLICY IF EXISTS "Admins can view all achievements" ON user_achievements;
CREATE POLICY "Admins can view all achievements" ON user_achievements
    FOR SELECT USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can insert achievements" ON user_achievements;
CREATE POLICY "Admins can insert achievements" ON user_achievements
    FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update achievements" ON user_achievements;
CREATE POLICY "Admins can update achievements" ON user_achievements
    FOR UPDATE USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete achievements" ON user_achievements;
CREATE POLICY "Admins can delete achievements" ON user_achievements
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_sessions
DROP POLICY IF EXISTS "Admins can view all sessions" ON user_sessions;
CREATE POLICY "Admins can view all sessions" ON user_sessions
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Admin policies for user_notifications
DROP POLICY IF EXISTS "Admins can view all notifications" ON user_notifications;
CREATE POLICY "Admins can view all notifications" ON user_notifications
    FOR SELECT USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can insert notifications" ON user_notifications;
CREATE POLICY "Admins can insert notifications" ON user_notifications
    FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update notifications" ON user_notifications;
CREATE POLICY "Admins can update notifications" ON user_notifications
    FOR UPDATE USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete notifications" ON user_notifications;
CREATE POLICY "Admins can delete notifications" ON user_notifications
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_bookmarks
DROP POLICY IF EXISTS "Admins can view all bookmarks" ON user_bookmarks;
CREATE POLICY "Admins can view all bookmarks" ON user_bookmarks
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Admin policies for user_learning_paths
DROP POLICY IF EXISTS "Admins can view all learning paths" ON user_learning_paths;
CREATE POLICY "Admins can view all learning paths" ON user_learning_paths
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Create function to get user statistics for admin dashboard
CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Check if user is admin
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;

    SELECT json_build_object(
        'total_users', (SELECT COUNT(*) FROM user_profiles),
        'active_users', (SELECT COUNT(*) FROM user_profiles WHERE is_active = true),
        'verified_users', (SELECT COUNT(*) FROM user_profiles WHERE is_verified = true),
        'new_users_this_month', (
            SELECT COUNT(*) FROM user_profiles 
            WHERE created_at >= date_trunc('month', CURRENT_DATE)
        ),
        'users_with_enrollments', (
            SELECT COUNT(DISTINCT user_id) FROM user_course_enrollments
        ),
        'total_enrollments', (SELECT COUNT(*) FROM user_course_enrollments),
        'completed_courses', (
            SELECT COUNT(*) FROM user_course_enrollments WHERE status = 'completed'
        ),
        'total_achievements', (SELECT COUNT(*) FROM user_achievements),
        'total_sessions', (SELECT COUNT(*) FROM user_sessions)
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_user_stats() TO authenticated;

-- Create function to update user status (for admin use)
CREATE OR REPLACE FUNCTION public.admin_update_user_status(
    target_user_id UUID,
    new_active_status BOOLEAN DEFAULT NULL,
    new_verified_status BOOLEAN DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if user is admin
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;

    -- Update user profile
    UPDATE user_profiles 
    SET 
        is_active = COALESCE(new_active_status, is_active),
        is_verified = COALESCE(new_verified_status, is_verified),
        updated_at = NOW()
    WHERE user_id = target_user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.admin_update_user_status(UUID, BOOLEAN, BOOLEAN) TO authenticated;

-- Comments for documentation
COMMENT ON FUNCTION public.is_admin(UUID) IS 'Check if a user has admin privileges';
COMMENT ON FUNCTION public.get_user_stats() IS 'Get comprehensive user statistics for admin dashboard';
COMMENT ON FUNCTION public.admin_update_user_status(UUID, BOOLEAN, BOOLEAN) IS 'Update user status (admin only)';
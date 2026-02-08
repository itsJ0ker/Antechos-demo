-- Admin User Management Policies
-- This file adds policies to allow admin users to manage all user data

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
CREATE POLICY "Admins can view all user profiles" ON user_profiles
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all user profiles" ON user_profiles
    FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete user profiles" ON user_profiles
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_course_enrollments
CREATE POLICY "Admins can view all enrollments" ON user_course_enrollments
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all enrollments" ON user_course_enrollments
    FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete enrollments" ON user_course_enrollments
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_achievements
CREATE POLICY "Admins can view all achievements" ON user_achievements
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert achievements" ON user_achievements
    FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update achievements" ON user_achievements
    FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete achievements" ON user_achievements
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_sessions
CREATE POLICY "Admins can view all sessions" ON user_sessions
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Admin policies for user_notifications
CREATE POLICY "Admins can view all notifications" ON user_notifications
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert notifications" ON user_notifications
    FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update notifications" ON user_notifications
    FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete notifications" ON user_notifications
    FOR DELETE USING (public.is_admin(auth.uid()));

-- Admin policies for user_bookmarks
CREATE POLICY "Admins can view all bookmarks" ON user_bookmarks
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Admin policies for user_learning_paths
CREATE POLICY "Admins can view all learning paths" ON user_learning_paths
    FOR SELECT USING (public.is_admin(auth.uid()));

-- Create a view for admin user management with aggregated data
CREATE OR REPLACE VIEW admin_user_overview AS
SELECT 
    up.id,
    up.user_id,
    up.email,
    up.full_name,
    up.phone,
    up.location,
    up.occupation,
    up.is_active,
    up.is_verified,
    up.created_at,
    up.updated_at,
    au.last_sign_in_at,
    au.email_confirmed_at,
    au.phone_confirmed_at,
    COUNT(DISTINCT uce.id) as total_enrollments,
    COUNT(DISTINCT CASE WHEN uce.status = 'completed' THEN uce.id END) as completed_courses,
    COUNT(DISTINCT CASE WHEN uce.status = 'active' THEN uce.id END) as active_courses,
    COUNT(DISTINCT ua.id) as total_achievements,
    COALESCE(SUM(ua.points), 0) as total_points,
    COUNT(DISTINCT ub.id) as total_bookmarks,
    COUNT(DISTINCT us.id) as total_sessions,
    MAX(us.session_start) as last_activity
FROM user_profiles up
LEFT JOIN auth.users au ON up.user_id = au.id
LEFT JOIN user_course_enrollments uce ON up.user_id = uce.user_id
LEFT JOIN user_achievements ua ON up.user_id = ua.user_id
LEFT JOIN user_bookmarks ub ON up.user_id = ub.user_id
LEFT JOIN user_sessions us ON up.user_id = us.user_id
GROUP BY 
    up.id, up.user_id, up.email, up.full_name, up.phone, up.location, 
    up.occupation, up.is_active, up.is_verified, up.created_at, up.updated_at,
    au.last_sign_in_at, au.email_confirmed_at, au.phone_confirmed_at;

-- Grant access to the admin view
GRANT SELECT ON admin_user_overview TO authenticated;

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
COMMENT ON VIEW admin_user_overview IS 'Comprehensive user data view for admin management';
-- User Authentication Schema Only (No Sample Data)
-- This file creates the schema without sample data to avoid foreign key issues

-- ============================================================================
-- USER AUTHENTICATION SCHEMA
-- ============================================================================

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    bio TEXT,
    avatar_url TEXT,
    date_of_birth DATE,
    location VARCHAR(255),
    occupation VARCHAR(255),
    education_level VARCHAR(100),
    interests TEXT[],
    learning_goals TEXT,
    preferred_language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50),
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
    privacy_settings JSONB DEFAULT '{"profile_visibility": "public", "contact_visibility": "private"}',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_course_enrollments table
CREATE TABLE IF NOT EXISTS user_course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id INTEGER NOT NULL, -- No foreign key constraint to avoid dependency issues
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    completion_date TIMESTAMP WITH TIME ZONE,
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_url TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_time_spent INTEGER DEFAULT 0, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Create user_bookmarks table
CREATE TABLE IF NOT EXISTS user_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id INTEGER, -- No foreign key constraint
    university_id INTEGER, -- No foreign key constraint
    bookmark_type VARCHAR(20) NOT NULL CHECK (bookmark_type IN ('course', 'university', 'trainer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    achievement_type VARCHAR(50) NOT NULL,
    achievement_name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    points INTEGER DEFAULT 0,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_learning_paths table
CREATE TABLE IF NOT EXISTS user_learning_paths (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    path_name VARCHAR(255) NOT NULL,
    description TEXT,
    course_ids INTEGER[],
    current_course_index INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    target_completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_notifications table
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error', 'course', 'achievement', 'system')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    metadata JSONB,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table for tracking user activity
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    pages_visited TEXT[],
    courses_accessed INTEGER[],
    device_info JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_course_enrollments_user_id ON user_course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_course_enrollments_course_id ON user_course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_user_course_enrollments_status ON user_course_enrollments(status);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_user_id ON user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notifications_user_id ON user_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notifications_is_read ON user_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- User Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Course Enrollments Policies
DROP POLICY IF EXISTS "Users can view their own enrollments" ON user_course_enrollments;
CREATE POLICY "Users can view their own enrollments" ON user_course_enrollments
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own enrollments" ON user_course_enrollments;
CREATE POLICY "Users can insert their own enrollments" ON user_course_enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own enrollments" ON user_course_enrollments;
CREATE POLICY "Users can update their own enrollments" ON user_course_enrollments
    FOR UPDATE USING (auth.uid() = user_id);

-- Bookmarks Policies
DROP POLICY IF EXISTS "Users can manage their own bookmarks" ON user_bookmarks;
CREATE POLICY "Users can manage their own bookmarks" ON user_bookmarks
    FOR ALL USING (auth.uid() = user_id);

-- Achievements Policies
DROP POLICY IF EXISTS "Users can view their own achievements" ON user_achievements;
CREATE POLICY "Users can view their own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert achievements" ON user_achievements;
CREATE POLICY "System can insert achievements" ON user_achievements
    FOR INSERT WITH CHECK (true); -- Allow system to award achievements

-- Learning Paths Policies
DROP POLICY IF EXISTS "Users can manage their own learning paths" ON user_learning_paths;
CREATE POLICY "Users can manage their own learning paths" ON user_learning_paths
    FOR ALL USING (auth.uid() = user_id);

-- Notifications Policies
DROP POLICY IF EXISTS "Users can manage their own notifications" ON user_notifications;
CREATE POLICY "Users can manage their own notifications" ON user_notifications
    FOR ALL USING (auth.uid() = user_id);

-- Sessions Policies
DROP POLICY IF EXISTS "Users can view their own sessions" ON user_sessions;
CREATE POLICY "Users can view their own sessions" ON user_sessions
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own sessions" ON user_sessions;
CREATE POLICY "Users can insert their own sessions" ON user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_course_enrollments_updated_at ON user_course_enrollments;
CREATE TRIGGER update_user_course_enrollments_updated_at
    BEFORE UPDATE ON user_course_enrollments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_learning_paths_updated_at ON user_learning_paths;
CREATE TRIGGER update_user_learning_paths_updated_at
    BEFORE UPDATE ON user_learning_paths
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create view for user dashboard stats
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
    u.id as user_id,
    COUNT(DISTINCT uce.course_id) as total_courses,
    COUNT(DISTINCT CASE WHEN uce.status = 'completed' THEN uce.course_id END) as completed_courses,
    COUNT(DISTINCT CASE WHEN uce.status = 'active' THEN uce.course_id END) as active_courses,
    COUNT(DISTINCT ua.id) as total_achievements,
    COALESCE(SUM(ua.points), 0) as total_points,
    COUNT(DISTINCT ub.id) as total_bookmarks
FROM auth.users u
LEFT JOIN user_course_enrollments uce ON u.id = uce.user_id
LEFT JOIN user_achievements ua ON u.id = ua.user_id
LEFT JOIN user_bookmarks ub ON u.id = ub.user_id
GROUP BY u.id;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Comments for documentation
COMMENT ON TABLE user_profiles IS 'Extended user profile information';
COMMENT ON TABLE user_course_enrollments IS 'User course enrollment and progress tracking';
COMMENT ON TABLE user_bookmarks IS 'User bookmarks for courses, universities, etc.';
COMMENT ON TABLE user_achievements IS 'User achievements and badges';
COMMENT ON TABLE user_learning_paths IS 'Custom learning paths created by users';
COMMENT ON TABLE user_notifications IS 'User notifications and messages';
COMMENT ON TABLE user_sessions IS 'User session tracking for analytics';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ User authentication schema created successfully!';
    RAISE NOTICE '📋 Tables created: user_profiles, user_course_enrollments, user_bookmarks, user_achievements, user_learning_paths, user_notifications, user_sessions';
    RAISE NOTICE '🔒 RLS policies enabled for security';
    RAISE NOTICE '⚡ Triggers created for automatic profile creation';
    RAISE NOTICE '🎯 Ready for user registration and authentication!';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Next steps:';
    RAISE NOTICE '1. Test user registration through your app';
    RAISE NOTICE '2. User profiles will be created automatically';
    RAISE NOTICE '3. Users can enroll in courses and track progress';
END $$;
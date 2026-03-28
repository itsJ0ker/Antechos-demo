import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, signIn, signUp, signOut } from '../lib/supabase';

const UserAuthContext = createContext();

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within UserAuthProvider');
  }
  return context;
};

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const getSession = async () => {
      try {
        if (!supabase) {
          console.log('Supabase not configured - user auth disabled');
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_, session) => {
          if (session?.user) {
            setUser(session.user);
            await fetchUserProfile(session.user.id);
          } else {
            setUser(null);
            setProfile(null);
          }
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!supabase) {
        return { success: false, error: 'Authentication not configured' };
      }

      const { data, error } = await signIn(email, password);
      
      if (error) throw error;
      
      setUser(data.user);
      await fetchUserProfile(data.user.id);
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, userData = {}) => {
    setLoading(true);
    try {
      if (!supabase) {
        return { success: false, error: 'Authentication not configured' };
      }

      const { data, error } = await signUp(email, password, userData);
      
      if (error) throw error;
      
      // Create user profile
      if (data.user) {
        await createUserProfile(data.user.id, {
          email: data.user.email,
          full_name: userData.full_name,
          phone: userData.phone,
        });
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (userId, profileData) => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          email: profileData.email,
          full_name: profileData.full_name,
          role: 'user', // Default Role
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      return { success: true, profile: data };
    } catch (error) {
      console.error('Profile creation error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!supabase || !user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      return { success: true, profile: data };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (!supabase) {
        setUser(null);
        setProfile(null);
        return;
      }

      await signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Authentication not configured' };
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Authentication not configured' };
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      console.error('Password update error:', error);
      return { success: false, error: error.message };
    }
  };

  // Course enrollment functions
  const enrollInCourse = async (courseId) => {
    try {
      if (!supabase || !user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('user_course_enrollments')
        .insert([{
          user_id: user.id,
          course_id: courseId,
          enrolled_at: new Date().toISOString(),
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;
      
      return { success: true, enrollment: data };
    } catch (error) {
      console.error('Course enrollment error:', error);
      return { success: false, error: error.message };
    }
  };

  const getUserCourses = async () => {
    try {
      if (!supabase || !user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('user_course_enrollments')
        .select(`
          *,
          courses (
            id,
            title,
            description,
            category,
            duration,
            skill_level,
            image_url,
            instructor_name
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      
      return { success: true, courses: data };
    } catch (error) {
      console.error('Get user courses error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateCourseProgress = async (courseId, progress) => {
    try {
      if (!supabase || !user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('user_course_enrollments')
        .update({
          progress: progress,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .select()
        .single();

      if (error) throw error;
      
      return { success: true, enrollment: data };
    } catch (error) {
      console.error('Course progress update error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    updatePassword,
    enrollInCourse,
    getUserCourses,
    updateCourseProgress,
    isAuthenticated: !!user
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
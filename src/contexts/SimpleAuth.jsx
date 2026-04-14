import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const getSession = async () => {
      try {
        // Check if supabase is available
        if (!supabase) {
          console.log('Supabase not configured - auth disabled');
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes only if supabase is available
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      );

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Check if supabase is available
      if (!supabase) {
        return { success: false, error: 'Authentication not configured' };
      }

      // First try Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // If Supabase auth fails, check against hardcoded credentials (fallback)
        console.warn('Supabase auth failed, trying local fallback:', error.message);
        
        const adminCredentials = {
          'admin@antechos.com': 'admin123',
          'admin@example.com': 'password',
          'test@admin.com': 'test123'
        };

        if (adminCredentials[email] && adminCredentials[email] === password) {
          // Create a mock user object for local auth
          const mockUser = { id: 'local-admin-id', email: email };
          localStorage.setItem('adminLoggedIn', 'true');
          localStorage.setItem('adminEmail', email);
          localStorage.setItem('adminLoginTime', new Date().toISOString());
          setUser(mockUser);
          return { success: true };
        } else {
          throw error;
        }
      }
      
      setUser(data.user);
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminEmail', data.user.email);
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Check if supabase is available
      if (!supabase) {
        setUser(null);
        return;
      }

      await supabase.auth.signOut();
      setUser(null);
      
      // Clear local admin session
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminLoginTime');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
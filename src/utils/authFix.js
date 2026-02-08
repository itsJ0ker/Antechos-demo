// Authentication and loading fixes
import { supabase } from '../lib/supabase';

// Add timeout wrapper for database queries
export const withTimeout = (promise, timeoutMs = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout')), timeoutMs)
    )
  ]);
};

// Safe auth check with timeout
export const safeAuthCheck = async () => {
  try {
    if (!supabase) {
      return { data: { user: null }, error: 'Supabase not configured' };
    }

    const result = await withTimeout(
      supabase.auth.getUser(),
      5000 // 5 second timeout
    );

    return result;
  } catch (error) {
    console.error('Auth check failed:', error);
    return { data: { user: null }, error: error.message };
  }
};

// Safe stats loading with individual query timeouts
export const safeLoadStats = async () => {
  const defaultStats = {
    courses: 0,
    universities: 0,
    trainers: 0,
    enquiries: 0,
    testimonials: 0,
    users: 0,
  };

  try {
    if (!supabase) {
      return defaultStats;
    }

    // Load each stat individually with timeout
    const results = await Promise.allSettled([
      withTimeout(supabase.from('courses').select('id', { count: 'exact', head: true }), 3000),
      withTimeout(supabase.from('universities').select('id', { count: 'exact', head: true }), 3000),
      withTimeout(supabase.from('trainers').select('id', { count: 'exact', head: true }), 3000),
      withTimeout(supabase.from('enquiries').select('id', { count: 'exact', head: true }), 3000),
      withTimeout(supabase.from('testimonials').select('id', { count: 'exact', head: true }), 3000),
      withTimeout(supabase.from('user_profiles').select('id', { count: 'exact', head: true }), 3000),
    ]);

    return {
      courses: results[0].status === 'fulfilled' ? (results[0].value.count || 0) : 0,
      universities: results[1].status === 'fulfilled' ? (results[1].value.count || 0) : 0,
      trainers: results[2].status === 'fulfilled' ? (results[2].value.count || 0) : 0,
      enquiries: results[3].status === 'fulfilled' ? (results[3].value.count || 0) : 0,
      testimonials: results[4].status === 'fulfilled' ? (results[4].value.count || 0) : 0,
      users: results[5].status === 'fulfilled' ? (results[5].value.count || 0) : 0,
    };
  } catch (error) {
    console.error('Stats loading failed:', error);
    return defaultStats;
  }
};

// Clear any stuck auth state
export const clearAuthState = () => {
  try {
    // Clear localStorage auth items
    const authKeys = Object.keys(localStorage).filter(key => 
      key.includes('supabase') || key.includes('auth')
    );
    authKeys.forEach(key => localStorage.removeItem(key));
    
    // Clear sessionStorage auth items
    const sessionAuthKeys = Object.keys(sessionStorage).filter(key => 
      key.includes('supabase') || key.includes('auth')
    );
    sessionAuthKeys.forEach(key => sessionStorage.removeItem(key));
    
    console.log('Auth state cleared');
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};

// Force refresh auth session
export const refreshAuthSession = async () => {
  try {
    if (!supabase) return null;
    
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    
    console.log('Auth session refreshed');
    return data;
  } catch (error) {
    console.error('Error refreshing auth session:', error);
    return null;
  }
};
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

    // Use getSession instead of getUser (faster, doesn't require network for cached session)
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.warn('Auth session error:', error.message);
      return { data: { user: null }, error: error.message };
    }
    
    // Return the user from the session
    return { data: { user: data?.session?.user || null }, error: null };
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

    // Load each stat individually with timeout - use Promise.allSettled for resilience
    const results = await Promise.allSettled([
      withTimeout(supabase.from('courses').select('id', { count: 'exact', head: true }), 5000),
      withTimeout(supabase.from('universities').select('id', { count: 'exact', head: true }), 5000),
      withTimeout(supabase.from('trainers').select('id', { count: 'exact', head: true }), 5000),
      withTimeout(supabase.from('enquiries').select('id', { count: 'exact', head: true }), 5000),
      withTimeout(supabase.from('testimonials').select('id', { count: 'exact', head: true }), 5000),
      withTimeout(supabase.from('profiles').select('id', { count: 'exact', head: true }), 5000),
    ]);

    // Extract counts from results, using 0 for failed queries
    const counts = results.map(r => {
      if (r.status === 'fulfilled' && r.value?.count !== undefined) {
        return r.value.count;
      }
      return 0;
    });

    return {
      courses: counts[0],
      universities: counts[1],
      trainers: counts[2],
      enquiries: counts[3],
      testimonials: counts[4],
      users: counts[5],
    };
  } catch (error) {
    console.warn('Stats loading failed (using defaults):', error.message);
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
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AdminAuthContext = createContext();

// Admin credentials config
const ADMIN_CREDENTIALS = {
  'admin@antechos.com': 'admin123',
};

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@antechos.com';

// Session expiry in hours
const SESSION_EXPIRY_HOURS = 24;

// ---- Synchronous localStorage helpers (no async, no waiting) ----
const saveLocalSession = (email, id) => {
  localStorage.setItem('adminLoggedIn', 'true');
  localStorage.setItem('adminEmail', email);
  localStorage.setItem('adminId', id || 'local-admin');
  localStorage.setItem('adminLoginTime', new Date().toISOString());
};

const getLocalSession = () => {
  try {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    const email = localStorage.getItem('adminEmail');
    const loginTime = localStorage.getItem('adminLoginTime');
    const id = localStorage.getItem('adminId');

    if (loggedIn !== 'true' || !email || !loginTime) return null;

    // Check session expiry
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursDiff = (now - loginDate) / (1000 * 60 * 60);

    if (hoursDiff >= SESSION_EXPIRY_HOURS) {
      clearLocalSession();
      return null;
    }

    return { email, id };
  } catch {
    return null;
  }
};

const clearLocalSession = () => {
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('adminId');
  localStorage.removeItem('adminLoginTime');
  localStorage.removeItem('mockUser');
};

// ---- Hook ----
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

// ---- Provider ----
export const AdminAuthProvider = ({ children }) => {
  // KEY FIX: Initialize state *synchronously* from localStorage.
  // This means if we have a valid local session, loading starts as false
  // and the dashboard renders IMMEDIATELY — no async wait, no spinner.
  const savedSession = getLocalSession();

  const [user, setUser] = useState(
    savedSession ? { email: savedSession.email, id: savedSession.id || 'local-admin' } : null
  );
  const [isAdmin, setIsAdmin] = useState(!!savedSession);
  const [loading, setLoading] = useState(!savedSession); // false if session exists

  // Track whether we've already resolved auth, to avoid Supabase
  // onAuthStateChange overwriting our localStorage-based session.
  const hasResolved = useRef(!!savedSession);

  useEffect(() => {
    // If we already initialized from localStorage, skip the async flow.
    // Just try to quietly sync with Supabase in the background (non-blocking).
    if (hasResolved.current) {
      backgroundSupabaseSync();
      return;
    }

    // No localStorage session → try Supabase as primary (with timeout)
    restoreFromSupabase();
  }, []);

  // ---- Background sync: silently refresh Supabase session without blocking UI ----
  const backgroundSupabaseSync = async () => {
    try {
      if (!supabase) return;

      // Race the getSession call against a 5s timeout.
      // If Supabase hangs (stale token, network issues), we just bail —
      // the admin is already authenticated via localStorage.
      const sessionResult = await Promise.race([
        supabase.auth.getSession(),
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { session: null }, error: 'timeout' }), 5000)
        ),
      ]);

      const session = sessionResult?.data?.session;

      if (session?.user) {
        // Supabase session is alive — update our state with the real user object
        // (gives us proper JWT for RLS-protected queries)
        setUser(session.user);
        saveLocalSession(session.user.email, session.user.id);
      }
      // If no Supabase session, that's fine — admin stays logged in via localStorage.
      // Queries using anon key will still work for most tables.
    } catch (error) {
      // Swallow silently — don't disrupt the admin session
      console.warn('Background Supabase sync failed (non-critical):', error?.message || error);
    }
  };

  // ---- Primary restore: for when there's no localStorage session ----
  const restoreFromSupabase = async () => {
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }

      // Try Supabase with a hard 8s timeout
      const sessionResult = await Promise.race([
        supabase.auth.getSession(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Supabase session check timed out')), 8000)
        ),
      ]);

      const session = sessionResult?.data?.session;

      if (session?.user) {
        const isAdminUser = await checkIsAdmin(session.user);
        if (isAdminUser) {
          setUser(session.user);
          setIsAdmin(true);
          saveLocalSession(session.user.email, session.user.id);
          hasResolved.current = true;
        }
      }
    } catch (error) {
      console.warn('Supabase session restore failed:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  const checkIsAdmin = async (supabaseUser) => {
    if (supabaseUser.email === ADMIN_EMAIL) return true;

    try {
      if (!supabase) return false;

      const result = await Promise.race([
        supabase.from('profiles').select('role').eq('id', supabaseUser.id).single(),
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: null, error: 'timeout' }), 5000)
        ),
      ]);

      if (result?.data?.role === 'admin') return true;
    } catch (e) {
      console.warn('Admin role check failed:', e);
    }

    return false;
  };

  // ---- Login ----
  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Try Supabase auth first (with timeout so it doesn't hang)
      if (supabase) {
        try {
          const authResult = await Promise.race([
            supabase.auth.signInWithPassword({ email, password }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Login request timed out')), 10000)
            ),
          ]);

          const { data, error } = authResult;
          if (!error && data?.user) {
            const isAdminUser = await checkIsAdmin(data.user);
            if (isAdminUser) {
              setUser(data.user);
              setIsAdmin(true);
              hasResolved.current = true;
              saveLocalSession(data.user.email, data.user.id);
              return { success: true };
            } else {
              await supabase.auth.signOut();
              return { success: false, error: 'Access denied. You do not have admin privileges.' };
            }
          }
          console.warn('Supabase auth failed:', error?.message);
        } catch (e) {
          console.warn('Supabase auth error:', e?.message || e);
        }
      }

      // 2. Fallback: local admin credentials
      if (ADMIN_CREDENTIALS[email] && ADMIN_CREDENTIALS[email] === password) {
        const mockUser = { id: 'local-admin', email };
        setUser(mockUser);
        setIsAdmin(true);
        hasResolved.current = true;
        saveLocalSession(email, 'local-admin');
        return { success: true };
      }

      return { success: false, error: 'Invalid email or password.' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // ---- Logout ----
  const logout = async () => {
    try {
      if (supabase) {
        // Don't await — fire and forget so we don't hang on signOut
        supabase.auth.signOut().catch(() => {});
      }
    } catch (e) {
      // Swallow
    }
    clearLocalSession();
    setUser(null);
    setIsAdmin(false);
    hasResolved.current = false;
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AuthStateDebug = () => {
  const [authState, setAuthState] = useState({
    user: null,
    session: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        if (!supabase) {
          setAuthState(prev => ({
            ...prev,
            loading: false,
            error: 'Supabase not configured'
          }));
          return;
        }

        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (sessionError) {
          setAuthState(prev => ({
            ...prev,
            loading: false,
            error: sessionError.message
          }));
          return;
        }

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (!mounted) return;

        setAuthState({
          user,
          session,
          loading: false,
          error: userError?.message || null
        });

      } catch (error) {
        if (mounted) {
          setAuthState(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }));
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange?.(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        if (mounted) {
          setAuthState(prev => ({
            ...prev,
            user: session?.user || null,
            session,
            error: null
          }));
        }
      }
    ) || { data: { subscription: null } };

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  const testAuthOperations = async () => {
    if (!supabase) {
      alert('Supabase not configured');
      return;
    }

    try {
      // Test getting user
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('Current user test:', { user: user?.email, error });
      
      // Test a simple query
      const { data, error: queryError } = await supabase
        .from('courses')
        .select('id')
        .limit(1);
      console.log('Simple query test:', { data, error: queryError });
      
    } catch (error) {
      console.error('Test error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Authentication State Debug</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Current State:</h3>
          <div className="text-sm space-y-1">
            <div>Loading: {authState.loading ? 'Yes' : 'No'}</div>
            <div>User: {authState.user?.email || 'None'}</div>
            <div>Session: {authState.session ? 'Active' : 'None'}</div>
            <div>Error: {authState.error || 'None'}</div>
          </div>
        </div>

        <button
          onClick={testAuthOperations}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Auth Operations
        </button>

        <div className="p-4 bg-yellow-50 rounded">
          <h3 className="font-medium mb-2">Troubleshooting:</h3>
          <ul className="text-sm space-y-1">
            <li>• Check browser console for auth state changes</li>
            <li>• Verify Supabase URL and keys in .env</li>
            <li>• Check if user is properly authenticated</li>
            <li>• Look for RLS policy issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthStateDebug;
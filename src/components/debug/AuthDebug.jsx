import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useUserAuth } from '../../contexts/UserAuthContext';

const AuthDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useUserAuth();

  useEffect(() => {
    const runDebug = async () => {
      const info = {
        timestamp: new Date().toISOString(),
        supabaseConfigured: !!supabase,
        authLoading,
        user: user ? { id: user.id, email: user.email } : null,
        envVars: {
          supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
          supabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
        }
      };

      if (supabase) {
        try {
          // Test basic connection
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          info.session = session ? { user: session.user?.email } : null;
          info.sessionError = sessionError?.message;

          // Test database connection
          const { data: testData, error: dbError } = await supabase
            .from('courses')
            .select('id')
            .limit(1);
          
          info.dbConnection = !dbError;
          info.dbError = dbError?.message;
          info.testDataCount = testData?.length || 0;
        } catch (error) {
          info.connectionError = error.message;
        }
      }

      setDebugInfo(info);
      setLoading(false);
    };

    runDebug();
  }, [user, authLoading]);

  if (loading) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p>Running authentication debug...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Authentication Debug Info</h3>
      <pre className="text-sm bg-white p-3 rounded border overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      
      <div className="mt-4 space-y-2">
        <div className={`p-2 rounded ${debugInfo.supabaseConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Supabase: {debugInfo.supabaseConfigured ? 'Configured' : 'Not Configured'}
        </div>
        
        <div className={`p-2 rounded ${debugInfo.dbConnection ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Database: {debugInfo.dbConnection ? 'Connected' : 'Connection Failed'}
          {debugInfo.dbError && <div className="text-sm mt-1">Error: {debugInfo.dbError}</div>}
        </div>
        
        <div className={`p-2 rounded ${debugInfo.user ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          User: {debugInfo.user ? `Logged in as ${debugInfo.user.email}` : 'Not logged in'}
        </div>
        
        <div className={`p-2 rounded ${!debugInfo.authLoading ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          Auth Loading: {debugInfo.authLoading ? 'Still loading...' : 'Complete'}
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
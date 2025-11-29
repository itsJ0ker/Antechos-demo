import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

const AdminDebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setDebugInfo({ error: 'No session found - user not logged in' });
        setLoading(false);
        return;
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // Try to read from marketplace_hero
      const { data: heroData, error: heroError } = await supabase
        .from('marketplace_hero')
        .select('*')
        .single();

      // Try to update marketplace_hero
      const { error: updateError } = await supabase
        .from('marketplace_hero')
        .update({ title: 'Test' })
        .eq('id', heroData?.id);

      setDebugInfo({
        session: {
          userId: session.user.id,
          email: session.user.email,
          role: session.user.role,
          jwtRole: session.user.app_metadata?.role || 'not set'
        },
        profile: profile || { error: profileError?.message },
        canRead: !heroError,
        canWrite: !updateError,
        readError: heroError?.message,
        writeError: updateError?.message
      });
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 bg-gray-100 rounded">Loading debug info...</div>;

  return (
    <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg mb-6">
      <h4 className="font-bold text-lg mb-3">🔍 Admin Debug Info</h4>
      <pre className="text-xs bg-white p-3 rounded overflow-auto max-h-96">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      <div className="mt-3 space-y-2">
        <div className={`p-2 rounded ${debugInfo?.canRead ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {debugInfo?.canRead ? '✅ Can READ from marketplace tables' : '❌ Cannot READ from marketplace tables'}
        </div>
        <div className={`p-2 rounded ${debugInfo?.canWrite ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {debugInfo?.canWrite ? '✅ Can WRITE to marketplace tables' : '❌ Cannot WRITE to marketplace tables'}
        </div>
        {debugInfo?.profile && (
          <div className="p-2 bg-blue-100 text-blue-800 rounded">
            Profile Role: <strong>{debugInfo.profile.role || 'not set'}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDebugInfo;

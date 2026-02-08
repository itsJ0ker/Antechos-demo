import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyAdminAccess = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBypassAccess = () => {
    setLoading(true);
    // Simulate a brief loading period
    setTimeout(() => {
      navigate('/admin/bypass');
    }, 1000);
  };

  const handleRetryAuth = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Timeout</h2>
          <p className="text-gray-600 mb-6">
            The admin dashboard is experiencing authentication issues. This might be due to database connectivity problems or RLS policy conflicts.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleBypassAccess}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Accessing...' : 'Access Admin Dashboard (Bypass Mode)'}
            </button>

            <button
              onClick={handleRetryAuth}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retry Authentication
            </button>

            <button
              onClick={() => navigate('/admin/login')}
              className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
            >
              Back to Login
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-left">
            <h3 className="font-medium text-yellow-800 mb-2">Troubleshooting:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Check Supabase connection status</li>
              <li>• Verify RLS policies are not blocking admin access</li>
              <li>• Clear browser cache and cookies</li>
              <li>• Check network connectivity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAdminAccess;
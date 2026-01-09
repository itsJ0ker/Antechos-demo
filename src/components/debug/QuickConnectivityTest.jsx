import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const QuickConnectivityTest = () => {
  const [result, setResult] = useState({
    status: 'testing',
    message: 'Testing connection...',
    details: null,
    recommendations: []
  });

  const testConnection = async () => {
    setResult({
      status: 'testing',
      message: 'Testing connection...',
      details: null,
      recommendations: []
    });

    try {
      // Quick environment check
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setResult({
          status: 'error',
          message: 'Environment variables missing',
          details: {
            url: supabaseUrl ? 'Set' : 'Missing',
            key: supabaseKey ? 'Set' : 'Missing'
          },
          recommendations: [
            'Check your .env file in the project root',
            'Ensure variables start with VITE_',
            'Restart your development server after changes'
          ]
        });
        return;
      }

      if (!supabase) {
        setResult({
          status: 'error',
          message: 'Supabase client not initialized',
          details: 'Client creation failed',
          recommendations: [
            'Check browser console for initialization errors',
            'Verify environment variables are correct',
            'Try refreshing the page'
          ]
        });
        return;
      }

      // Quick ping test with short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        // Simple auth check (fastest test)
        const { data, error } = await supabase.auth.getSession();
        clearTimeout(timeoutId);

        if (error && error.message.includes('fetch')) {
          setResult({
            status: 'error',
            message: 'Network connectivity issue',
            details: error.message,
            recommendations: [
              'Check your internet connection',
              'Verify Supabase project is active',
              'Check if your IP is blocked by firewall',
              'Try accessing https://supabase.com directly'
            ]
          });
          return;
        }

        // Connection successful
        setResult({
          status: 'success',
          message: 'Database connection successful',
          details: {
            url: supabaseUrl.substring(0, 30) + '...',
            authWorking: true,
            hasSession: !!data.session,
            user: data.session?.user?.email || 'No user logged in'
          },
          recommendations: [
            'Connection is working properly',
            'You can now test user registration',
            'Run the user auth schema if needed'
          ]
        });

      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          setResult({
            status: 'error',
            message: 'Connection timeout (5 seconds)',
            details: 'Supabase server not responding',
            recommendations: [
              'Check if Supabase project is paused (free tier)',
              'Verify your internet connection',
              'Try again in a few minutes',
              'Check Supabase status page'
            ]
          });
        } else {
          setResult({
            status: 'error',
            message: 'Network error',
            details: fetchError.message,
            recommendations: [
              'Check your internet connection',
              'Verify Supabase URL is correct',
              'Check browser network tab for blocked requests'
            ]
          });
        }
      }

    } catch (error) {
      setResult({
        status: 'error',
        message: 'Unexpected error',
        details: error.message,
        recommendations: [
          'Check browser console for detailed errors',
          'Try refreshing the page',
          'Verify all environment variables'
        ]
      });
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusColor = () => {
    switch (result.status) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'testing': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'testing': return '⏳';
      default: return '❓';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Connectivity Test</h2>
        <p className="text-gray-600">Fast diagnosis of your Supabase connection.</p>
      </div>

      <div className="mb-4">
        <button
          onClick={testConnection}
          disabled={result.status === 'testing'}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {result.status === 'testing' ? 'Testing...' : 'Test Again'}
        </button>
      </div>

      <div className={`p-4 rounded-lg border-2 ${getStatusColor()}`}>
        <div className="flex items-start space-x-3">
          <span className="text-2xl">{getStatusIcon()}</span>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{result.message}</h3>
            
            {result.details && (
              <div className="mt-2">
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">View Details</summary>
                  <pre className="mt-2 p-2 bg-white bg-opacity-50 rounded text-xs overflow-auto">
                    {typeof result.details === 'string' 
                      ? result.details 
                      : JSON.stringify(result.details, null, 2)
                    }
                  </pre>
                </details>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-sm mb-2">Recommendations:</h4>
                <ul className="text-sm space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {result.status === 'success' && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Next Steps:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Try the login button in your navbar</li>
            <li>• Create a test user account</li>
            <li>• Run user auth schema if tables are missing</li>
            <li>• Test the user dashboard functionality</li>
          </ul>
        </div>
      )}

      {result.status === 'error' && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Common Solutions:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Check Supabase project status in dashboard</li>
            <li>• Verify .env file is in project root</li>
            <li>• Restart development server (npm run dev)</li>
            <li>• Clear browser cache and try again</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuickConnectivityTest;
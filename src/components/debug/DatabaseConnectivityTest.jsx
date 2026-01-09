import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const DatabaseConnectivityTest = () => {
  const [tests, setTests] = useState({
    envVars: { status: 'pending', message: '', details: null },
    clientInit: { status: 'pending', message: '', details: null },
    basicConnection: { status: 'pending', message: '', details: null },
    authConnection: { status: 'pending', message: '', details: null },
    tableAccess: { status: 'pending', message: '', details: null },
    userTables: { status: 'pending', message: '', details: null }
  });

  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (testName, status, message, details = null) => {
    setTests(prev => ({
      ...prev,
      [testName]: { status, message, details }
    }));
  };

  const runTests = async () => {
    setIsRunning(true);
    
    // Reset all tests
    Object.keys(tests).forEach(testName => {
      updateTest(testName, 'pending', 'Running...');
    });

    // Test 1: Environment Variables
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        updateTest('envVars', 'error', 'Missing environment variables', {
          url: supabaseUrl ? 'Set' : 'Missing',
          key: supabaseKey ? 'Set' : 'Missing'
        });
      } else {
        updateTest('envVars', 'success', 'Environment variables configured', {
          url: supabaseUrl.substring(0, 30) + '...',
          key: 'Set (hidden for security)'
        });
      }
    } catch (error) {
      updateTest('envVars', 'error', 'Error checking environment variables', error.message);
    }

    // Test 2: Client Initialization
    try {
      if (supabase) {
        updateTest('clientInit', 'success', 'Supabase client initialized successfully');
      } else {
        updateTest('clientInit', 'error', 'Supabase client not initialized');
      }
    } catch (error) {
      updateTest('clientInit', 'error', 'Error initializing Supabase client', error.message);
    }

    // Test 3: Basic Connection
    try {
      if (!supabase) {
        updateTest('basicConnection', 'error', 'No Supabase client available');
      } else {
        // Try a simple query to test connection with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
        );
        
        const queryPromise = supabase
          .from('information_schema.tables')
          .select('table_name')
          .limit(1);
        
        const { data, error } = await Promise.race([queryPromise, timeoutPromise]);
        
        if (error) {
          updateTest('basicConnection', 'error', 'Database connection failed', error.message);
        } else {
          updateTest('basicConnection', 'success', 'Database connection successful');
        }
      }
    } catch (error) {
      updateTest('basicConnection', 'error', 'Connection test failed', error.message);
    }

    // Test 4: Auth Connection
    try {
      if (!supabase) {
        updateTest('authConnection', 'error', 'No Supabase client available');
      } else {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth timeout after 8 seconds')), 8000)
        );
        
        const authPromise = supabase.auth.getSession();
        
        const { data, error } = await Promise.race([authPromise, timeoutPromise]);
        
        if (error) {
          updateTest('authConnection', 'warning', 'Auth connection issue', error.message);
        } else {
          updateTest('authConnection', 'success', 'Auth system accessible', {
            hasSession: !!data.session,
            user: data.session?.user?.email || 'No user logged in'
          });
        }
      }
    } catch (error) {
      updateTest('authConnection', 'error', 'Auth test failed', error.message);
    }

    // Test 5: Table Access (existing tables)
    try {
      if (!supabase) {
        updateTest('tableAccess', 'error', 'No Supabase client available');
      } else {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Table access timeout after 8 seconds')), 8000)
        );
        
        // Try to access a common table
        const queryPromise = supabase
          .from('courses')
          .select('id')
          .limit(1);
        
        const { data, error } = await Promise.race([queryPromise, timeoutPromise]);
        
        if (error) {
          updateTest('tableAccess', 'warning', 'Existing tables not accessible', error.message);
        } else {
          updateTest('tableAccess', 'success', 'Existing tables accessible', {
            coursesFound: data?.length || 0
          });
        }
      }
    } catch (error) {
      updateTest('tableAccess', 'error', 'Table access test failed', error.message);
    }

    // Test 6: User Authentication Tables
    try {
      if (!supabase) {
        updateTest('userTables', 'error', 'No Supabase client available');
      } else {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('User tables timeout after 8 seconds')), 8000)
        );
        
        // Check if user authentication tables exist
        const queryPromise = supabase
          .from('user_profiles')
          .select('id')
          .limit(1);
        
        const { data, error } = await Promise.race([queryPromise, timeoutPromise]);
        
        if (error) {
          if (error.code === '42P01') {
            updateTest('userTables', 'warning', 'User authentication tables not created yet', 'Run the user-auth-schema-only.sql file');
          } else {
            updateTest('userTables', 'error', 'User tables access error', error.message);
          }
        } else {
          updateTest('userTables', 'success', 'User authentication tables accessible', {
            profilesFound: data?.length || 0
          });
        }
      }
    } catch (error) {
      updateTest('userTables', 'error', 'User tables test failed', error.message);
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Connectivity Test</h2>
        <p className="text-gray-600">Comprehensive test of your Supabase database connection and authentication system.</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Running Tests...' : 'Run Tests Again'}
        </button>
        
        {isRunning && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Testing connection...</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(tests).map(([testName, test]) => (
          <div key={testName} className={`p-4 rounded-lg border ${getStatusColor(test.status)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getStatusIcon(test.status)}</span>
                <div>
                  <h3 className="font-semibold capitalize">
                    {testName.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-sm">{test.message}</p>
                </div>
              </div>
            </div>
            
            {test.details && (
              <div className="mt-3 ml-8">
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">View Details</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                    {typeof test.details === 'string' 
                      ? test.details 
                      : JSON.stringify(test.details, null, 2)
                    }
                  </pre>
                </details>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Quick Fixes:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• If environment variables are missing, check your .env file</li>
          <li>• If connection fails, verify your Supabase URL and key</li>
          <li>• If user tables are missing, run the user-auth-schema-only.sql file</li>
          <li>• If existing tables fail, check your database permissions</li>
          <li>• Restart your development server after changing .env files</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Current Configuration:</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? 'Configured' : 'Missing'}</p>
          <p>• Supabase Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configured' : 'Missing'}</p>
          <p>• Client Status: {supabase ? 'Initialized' : 'Not Initialized'}</p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConnectivityTest;
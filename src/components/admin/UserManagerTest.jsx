import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const UserManagerTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = [];

    // Test 1: Check if user_profiles table exists and is accessible
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, email, full_name, is_active, is_verified')
        .limit(5);
      
      if (error) {
        results.push({
          test: 'User Profiles Access',
          status: 'FAIL',
          message: error.message
        });
      } else {
        results.push({
          test: 'User Profiles Access',
          status: 'PASS',
          message: `Found ${data?.length || 0} user profiles`
        });
      }
    } catch (error) {
      results.push({
        test: 'User Profiles Access',
        status: 'ERROR',
        message: error.message
      });
    }

    // Test 2: Check user_course_enrollments
    try {
      const { data, error } = await supabase
        .from('user_course_enrollments')
        .select('id, user_id, course_id, status')
        .limit(5);
      
      if (error) {
        results.push({
          test: 'Course Enrollments Access',
          status: 'FAIL',
          message: error.message
        });
      } else {
        results.push({
          test: 'Course Enrollments Access',
          status: 'PASS',
          message: `Found ${data?.length || 0} enrollments`
        });
      }
    } catch (error) {
      results.push({
        test: 'Course Enrollments Access',
        status: 'ERROR',
        message: error.message
      });
    }

    // Test 3: Check user_achievements
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('id, user_id, achievement_name, points')
        .limit(5);
      
      if (error) {
        results.push({
          test: 'User Achievements Access',
          status: 'FAIL',
          message: error.message
        });
      } else {
        results.push({
          test: 'User Achievements Access',
          status: 'PASS',
          message: `Found ${data?.length || 0} achievements`
        });
      }
    } catch (error) {
      results.push({
        test: 'User Achievements Access',
        status: 'ERROR',
        message: error.message
      });
    }

    // Test 4: Check user_sessions
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select('id, user_id, session_start')
        .limit(5);
      
      if (error) {
        results.push({
          test: 'User Sessions Access',
          status: 'FAIL',
          message: error.message
        });
      } else {
        results.push({
          test: 'User Sessions Access',
          status: 'PASS',
          message: `Found ${data?.length || 0} sessions`
        });
      }
    } catch (error) {
      results.push({
        test: 'User Sessions Access',
        status: 'ERROR',
        message: error.message
      });
    }

    // Test 5: Check admin function
    try {
      const { data, error } = await supabase.rpc('get_user_stats');
      
      if (error) {
        results.push({
          test: 'Admin Function Access',
          status: 'FAIL',
          message: error.message
        });
      } else {
        results.push({
          test: 'Admin Function Access',
          status: 'PASS',
          message: `Stats retrieved: ${JSON.stringify(data)}`
        });
      }
    } catch (error) {
      results.push({
        test: 'Admin Function Access',
        status: 'ERROR',
        message: error.message
      });
    }

    // Test 6: Check current user auth
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        results.push({
          test: 'Current User Auth',
          status: 'FAIL',
          message: error.message
        });
      } else {
        results.push({
          test: 'Current User Auth',
          status: user ? 'PASS' : 'FAIL',
          message: user ? `Logged in as: ${user.email}` : 'No user logged in'
        });
      }
    } catch (error) {
      results.push({
        test: 'Current User Auth',
        status: 'ERROR',
        message: error.message
      });
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Manager Test</h2>
          <p className="text-gray-600 mt-1">Testing database connectivity and permissions</p>
        </div>
        <button
          onClick={runTests}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Test Results</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {testResults.map((result, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    result.status === 'PASS' ? 'bg-green-500' :
                    result.status === 'FAIL' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{result.test}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  result.status === 'PASS' ? 'bg-green-100 text-green-800' :
                  result.status === 'FAIL' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{result.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Setup Instructions</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>1. Run the user authentication schema: <code>supabase/user-auth-schema.sql</code></p>
          <p>2. Run the fixed admin policies: <code>supabase/fix-admin-user-policies.sql</code></p>
          <p>3. Update the <code>is_admin()</code> function to include your admin email</p>
          <p>4. Make sure you're logged in as an admin user</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagerTest;
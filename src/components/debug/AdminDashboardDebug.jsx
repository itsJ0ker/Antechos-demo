import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminDashboardDebug = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testQueries = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test 1: Check current user
      console.log('Testing current user...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      testResults.currentUser = { 
        success: !userError, 
        data: user?.email || 'No user', 
        error: userError?.message 
      };

      // Test 2: Test courses count
      console.log('Testing courses count...');
      const { count: coursesCount, error: coursesError } = await supabase
        .from('courses')
        .select('id', { count: 'exact', head: true });
      testResults.coursesCount = { 
        success: !coursesError, 
        data: coursesCount, 
        error: coursesError?.message 
      };

      // Test 3: Test universities count
      console.log('Testing universities count...');
      const { count: universitiesCount, error: universitiesError } = await supabase
        .from('universities')
        .select('id', { count: 'exact', head: true });
      testResults.universitiesCount = { 
        success: !universitiesError, 
        data: universitiesCount, 
        error: universitiesError?.message 
      };

      // Test 4: Test user_profiles count (this might be the problematic one)
      console.log('Testing user_profiles count...');
      const { count: usersCount, error: usersError } = await supabase
        .from('user_profiles')
        .select('id', { count: 'exact', head: true });
      testResults.usersCount = { 
        success: !usersError, 
        data: usersCount, 
        error: usersError?.message 
      };

      // Test 5: Test trainers count
      console.log('Testing trainers count...');
      const { count: trainersCount, error: trainersError } = await supabase
        .from('trainers')
        .select('id', { count: 'exact', head: true });
      testResults.trainersCount = { 
        success: !trainersError, 
        data: trainersCount, 
        error: trainersError?.message 
      };

      // Test 6: Test enquiries count
      console.log('Testing enquiries count...');
      const { count: enquiriesCount, error: enquiriesError } = await supabase
        .from('enquiries')
        .select('id', { count: 'exact', head: true });
      testResults.enquiriesCount = { 
        success: !enquiriesError, 
        data: enquiriesCount, 
        error: enquiriesError?.message 
      };

      // Test 7: Test testimonials count
      console.log('Testing testimonials count...');
      const { count: testimonialsCount, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('id', { count: 'exact', head: true });
      testResults.testimonialsCount = { 
        success: !testimonialsError, 
        data: testimonialsCount, 
        error: testimonialsError?.message 
      };

    } catch (error) {
      console.error('Test error:', error);
      testResults.generalError = { success: false, error: error.message };
    }

    setResults(testResults);
    setLoading(false);
  };

  useEffect(() => {
    testQueries();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard Debug</h2>
      
      <button 
        onClick={testQueries}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Run Tests'}
      </button>

      <div className="space-y-3">
        {Object.entries(results).map(([key, result]) => (
          <div key={key} className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <span className="font-medium">{key}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.success ? 'SUCCESS' : 'FAILED'}
              </span>
            </div>
            {result.data !== undefined && (
              <div className="mt-1 text-sm text-gray-600">
                Data: {JSON.stringify(result.data)}
              </div>
            )}
            {result.error && (
              <div className="mt-1 text-sm text-red-600">
                Error: {result.error}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Troubleshooting Tips:</h3>
        <ul className="text-sm space-y-1">
          <li>• If user_profiles fails, check RLS policies</li>
          <li>• If all queries fail, check Supabase connection</li>
          <li>• If specific tables fail, check table existence</li>
          <li>• Check browser console for additional errors</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardDebug;
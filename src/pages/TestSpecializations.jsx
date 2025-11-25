import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Simple test page to verify specializations are fetching
// Navigate to: /test-specializations

const TestSpecializations = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testFetch();
  }, []);

  const testFetch = async () => {
    try {
      console.log('Testing specializations fetch...');
      
      // Test 1: Fetch all specializations
      const { data: allData, error: allError } = await supabase
        .from('course_specializations')
        .select('*');

      console.log('All specializations:', allData);
      console.log('Error:', allError);

      if (allError) {
        setError(allError.message);
      } else {
        setData(allData);
      }

      // Test 2: Fetch with join
      const { data: joinData, error: joinError } = await supabase
        .from('course_specializations')
        .select(`
          *,
          university_courses(course_name),
          universities(name)
        `);

      console.log('With joins:', joinData);
      console.log('Join error:', joinError);

    } catch (err) {
      console.error('Catch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Specializations Test Page</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
            <h2 className="font-bold text-red-900 mb-2">Error:</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Results:</h2>
          <p className="mb-2">
            <strong>Total Found:</strong> {data ? data.length : 0}
          </p>
          <p className="mb-4">
            <strong>Supabase Connected:</strong> {supabase ? '✅ Yes' : '❌ No'}
          </p>
        </div>

        {data && data.length > 0 && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Specializations:</h2>
            <div className="space-y-4">
              {data.map((spec) => (
                <div key={spec.id} className="border-b pb-4">
                  <h3 className="font-bold">{spec.name}</h3>
                  <p className="text-sm text-gray-600">ID: {spec.id}</p>
                  <p className="text-sm text-gray-600">Course ID: {spec.parent_course_id}</p>
                  <p className="text-sm text-gray-600">University ID: {spec.university_id}</p>
                  <p className="text-sm text-gray-600">Active: {spec.is_active ? '✅' : '❌'}</p>
                  <p className="text-sm text-gray-600">Description: {spec.description}</p>
                  <p className="text-sm text-gray-600">Duration: {spec.duration}</p>
                  <p className="text-sm text-gray-600">Fees: {spec.fees}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="text-yellow-900">
              No specializations found in database. Add some through the Admin Panel.
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-bold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Check the browser console (F12) for detailed logs</li>
            <li>If no data, add specializations via Admin Panel</li>
            <li>If error, check Supabase configuration</li>
            <li>Verify RLS policies allow public read access</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestSpecializations;

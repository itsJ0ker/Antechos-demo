import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const CourseDetailTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    const results = {};
    
    try {
      // Test 1: Check if courses table exists and has data
      console.log('Testing courses table...');
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .limit(5);
      
      results.coursesTable = {
        success: !coursesError,
        error: coursesError?.message,
        data: courses,
        count: courses?.length || 0
      };

      // Test 2: Check if we can insert a test course
      console.log('Testing course insertion...');
      const testCourse = {
        title: 'Test Course ' + Date.now(),
        description: 'This is a test course',
        category: 'Technology',
        skill_level: 'Beginner',
        price: 1000,
        is_active: true
      };

      const { data: insertData, error: insertError } = await supabase
        .from('courses')
        .insert([testCourse])
        .select()
        .single();

      results.courseInsertion = {
        success: !insertError,
        error: insertError?.message,
        data: insertData
      };

      // Test 3: Check if we can update the test course
      if (insertData) {
        console.log('Testing course update...');
        const { error: updateError } = await supabase
          .from('courses')
          .update({ title: 'Updated Test Course' })
          .eq('id', insertData.id);

        results.courseUpdate = {
          success: !updateError,
          error: updateError?.message
        };

        // Clean up - delete the test course
        await supabase
          .from('courses')
          .delete()
          .eq('id', insertData.id);
      }

      // Test 4: Check table structure
      console.log('Checking table structure...');
      const { data: tableInfo, error: tableError } = await supabase
        .rpc('get_table_columns', { table_name: 'courses' })
        .catch(() => {
          // Fallback: try to get a single record to see the structure
          return supabase
            .from('courses')
            .select('*')
            .limit(1)
            .single();
        });

      results.tableStructure = {
        success: !tableError,
        error: tableError?.message,
        columns: tableInfo ? Object.keys(tableInfo) : []
      };

    } catch (error) {
      console.error('Test error:', error);
      results.generalError = error.message;
    }

    setTestResults(results);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Running Course Detail Tests...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Course Detail Manager Tests</h2>
      
      {/* Test Results */}
      <div className="space-y-4">
        {Object.entries(testResults).map(([testName, result]) => (
          <div key={testName} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <h3 className="font-semibold capitalize">{testName.replace(/([A-Z])/g, ' $1')}</h3>
            </div>
            
            {result.error && (
              <div className="text-red-600 text-sm mb-2">
                Error: {result.error}
              </div>
            )}
            
            {result.data && (
              <div className="text-sm text-gray-600">
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
            
            {result.count !== undefined && (
              <div className="text-sm text-gray-600">
                Records found: {result.count}
              </div>
            )}
            
            {result.columns && result.columns.length > 0 && (
              <div className="text-sm text-gray-600">
                Columns: {result.columns.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Manual Test Buttons */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Manual Tests</h3>
        <div className="flex gap-4">
          <button
            onClick={() => {
              console.log('Manual test button clicked');
              alert('Button click works!');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Test Button Click
          </button>
          
          <button
            onClick={runTests}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Re-run Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailTest;
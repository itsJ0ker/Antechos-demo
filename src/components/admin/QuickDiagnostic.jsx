import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const QuickDiagnostic = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    const diagnostics = {};

    // Test 1: Check environment variables
    diagnostics.envVars = {
      supabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
      supabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      urlValue: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing'
    };

    // Test 2: Check Supabase client
    diagnostics.supabaseClient = !!supabase;

    if (supabase) {
      try {
        // Test 3: Check if courses table exists
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('count')
          .limit(1);

        diagnostics.coursesTable = {
          exists: !coursesError,
          error: coursesError?.message,
          canRead: !coursesError
        };

        // Test 4: Try to get actual courses
        const { data: allCourses, error: allCoursesError } = await supabase
          .from('courses')
          .select('*')
          .limit(5);

        diagnostics.coursesData = {
          success: !allCoursesError,
          count: allCourses?.length || 0,
          error: allCoursesError?.message,
          sampleCourse: allCourses?.[0] || null
        };

        // Test 5: Check active courses specifically
        const { data: activeCourses, error: activeError } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .limit(5);

        diagnostics.activeCourses = {
          success: !activeError,
          count: activeCourses?.length || 0,
          error: activeError?.message,
          courses: activeCourses || []
        };

      } catch (error) {
        diagnostics.connectionError = error.message;
      }
    }

    setResults(diagnostics);
    setLoading(false);
  };

  const addTestCourse = async () => {
    if (!supabase) {
      alert('Supabase not configured');
      return;
    }

    try {
      const testCourse = {
        title: 'Test Course ' + Date.now(),
        description: 'This is a test course to verify database connection',
        category: 'Technology',
        skill_level: 'Beginner',
        price: 1000,
        original_price: 2000,
        duration: '4 weeks',
        is_active: true,
        instructor_name: 'Test Instructor',
        rating: 4.5,
        image_url: 'https://via.placeholder.com/400x300'
      };

      const { data, error } = await supabase
        .from('courses')
        .insert([testCourse])
        .select()
        .single();

      if (error) {
        alert('Error adding course: ' + error.message);
      } else {
        alert('Test course added successfully!');
        runDiagnostics(); // Refresh diagnostics
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Running Diagnostics...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quick Diagnostic</h2>
        <button
          onClick={runDiagnostics}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Environment Variables */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${results.envVars?.supabaseUrl && results.envVars?.supabaseKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
          Environment Variables
        </h3>
        <div className="text-sm space-y-1">
          <div>Supabase URL: {results.envVars?.supabaseUrl ? '✅ Set' : '❌ Missing'}</div>
          <div>Supabase Key: {results.envVars?.supabaseKey ? '✅ Set' : '❌ Missing'}</div>
          <div className="text-gray-500">URL: {results.envVars?.urlValue}</div>
        </div>
      </div>

      {/* Supabase Client */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${results.supabaseClient ? 'bg-green-500' : 'bg-red-500'}`}></div>
          Supabase Client
        </h3>
        <div className="text-sm">
          Status: {results.supabaseClient ? '✅ Initialized' : '❌ Not initialized'}
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${results.coursesTable?.exists ? 'bg-green-500' : 'bg-red-500'}`}></div>
          Courses Table
        </h3>
        <div className="text-sm space-y-1">
          <div>Exists: {results.coursesTable?.exists ? '✅ Yes' : '❌ No'}</div>
          <div>Can Read: {results.coursesTable?.canRead ? '✅ Yes' : '❌ No'}</div>
          {results.coursesTable?.error && (
            <div className="text-red-600">Error: {results.coursesTable.error}</div>
          )}
        </div>
      </div>

      {/* Courses Data */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${results.coursesData?.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
          Courses Data
        </h3>
        <div className="text-sm space-y-1">
          <div>Total Courses: {results.coursesData?.count || 0}</div>
          <div>Query Success: {results.coursesData?.success ? '✅ Yes' : '❌ No'}</div>
          {results.coursesData?.error && (
            <div className="text-red-600">Error: {results.coursesData.error}</div>
          )}
          {results.coursesData?.sampleCourse && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
              <div>Sample Course: {results.coursesData.sampleCourse.title}</div>
              <div>ID: {results.coursesData.sampleCourse.id}</div>
            </div>
          )}
        </div>
      </div>

      {/* Active Courses */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${results.activeCourses?.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
          Active Courses (Frontend Query)
        </h3>
        <div className="text-sm space-y-1">
          <div>Active Courses: {results.activeCourses?.count || 0}</div>
          <div>Query Success: {results.activeCourses?.success ? '✅ Yes' : '❌ No'}</div>
          {results.activeCourses?.error && (
            <div className="text-red-600">Error: {results.activeCourses.error}</div>
          )}
          {results.activeCourses?.courses && results.activeCourses.courses.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="font-medium">Active Courses:</div>
              {results.activeCourses.courses.map(course => (
                <div key={course.id} className="p-2 bg-gray-50 rounded text-xs">
                  <div>• {course.title}</div>
                  <div className="text-gray-500">Price: ₹{course.price} | Category: {course.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Actions</h3>
        <div className="space-y-2">
          <button
            onClick={addTestCourse}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-2"
          >
            Add Test Course
          </button>
          <div className="text-sm text-gray-600 mt-2">
            This will add a test course to verify database write permissions.
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Next Steps</h3>
        <div className="text-sm space-y-1">
          {!results.envVars?.supabaseUrl && (
            <div>1. ❌ Set up VITE_SUPABASE_URL in your .env file</div>
          )}
          {!results.envVars?.supabaseKey && (
            <div>2. ❌ Set up VITE_SUPABASE_ANON_KEY in your .env file</div>
          )}
          {!results.coursesTable?.exists && (
            <div>3. ❌ Run the database schema: supabase/course-details-simple-setup.sql</div>
          )}
          {results.coursesData?.count === 0 && (
            <div>4. ❌ Add some courses using the admin panel or sample data SQL</div>
          )}
          {results.activeCourses?.count === 0 && results.coursesData?.count > 0 && (
            <div>5. ❌ Make sure courses have is_active = true</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickDiagnostic;
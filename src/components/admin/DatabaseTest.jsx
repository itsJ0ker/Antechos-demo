import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const DatabaseTest = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testDatabase();
  }, []);

  const testDatabase = async () => {
    try {
      console.log('Testing database connection...');
      
      // Test 1: Check if we can connect to Supabase
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(10);
      
      if (error) {
        console.error('Database error:', error);
        setError(error.message);
      } else {
        console.log('Database connection successful. Courses found:', data);
        setCourses(data || []);
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTestCourse = async () => {
    try {
      const testCourse = {
        title: 'Test Course ' + Date.now(),
        description: 'This is a test course created from the frontend',
        category: 'Technology',
        skill_level: 'Beginner',
        price: 1000,
        original_price: 2000,
        duration: '4 weeks',
        is_active: true,
        instructor_name: 'Test Instructor',
        rating: 4.5
      };

      const { data, error } = await supabase
        .from('courses')
        .insert([testCourse])
        .select()
        .single();

      if (error) {
        console.error('Insert error:', error);
        alert('Error adding course: ' + error.message);
      } else {
        console.log('Course added successfully:', data);
        alert('Course added successfully!');
        testDatabase(); // Refresh the list
      }
    } catch (err) {
      console.error('Insert error:', err);
      alert('Error: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Testing Database Connection...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Database Connection Test</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Database Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Courses in Database</h3>
          <button
            onClick={addTestCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Test Course
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">Found {courses.length} courses</p>
        
        {courses.length > 0 ? (
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Category: {course.category}</span>
                      <span>Price: ₹{course.price}</span>
                      <span>Status: {course.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">ID: {course.id}</div>
                    <div className="text-sm text-gray-500">
                      Created: {new Date(course.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No courses found in database
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions</h3>
        <ol className="text-blue-700 text-sm space-y-1">
          <li>1. If you see courses above, the database connection is working</li>
          <li>2. If you see an error, check your Supabase configuration</li>
          <li>3. Try adding a test course to verify write permissions</li>
          <li>4. Check the browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  );
};

export default DatabaseTest;
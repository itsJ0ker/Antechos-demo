import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  DollarSign,
  BookOpen,
  Clock,
  GraduationCap,
} from 'lucide-react';

const UniversityCoursesManager = ({ universityId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    course_name: '',
    description: '',
    duration: '',
    fees: '',
    specializations: [],
    image_url: '',
  });

  useEffect(() => {
    if (universityId) {
      fetchCourses();
    }
  }, [universityId]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('university_courses')
        .select('*')
        .eq('university_id', universityId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      course_name: '',
      description: '',
      duration: '',
      fees: '',
      specializations: [],
      image_url: '',
    });
    setEditingId(null);
  };

  const handleEdit = (course) => {
    setFormData({
      course_name: course.course_name,
      description: course.description || '',
      duration: course.duration || '',
      fees: course.fees || '',
      specializations: course.specializations || [],
      image_url: course.image_url || '',
    });
    setEditingId(course.id);
  };

  const handleSave = async () => {
    if (!formData.course_name.trim()) {
      alert('Course name is required');
      return;
    }

    if (!universityId) {
      alert('Please select a university first');
      return;
    }

    setSaving(true);
    try {
      const courseData = {
        university_id: universityId,
        course_name: formData.course_name,
        description: formData.description || null,
        duration: formData.duration || null,
        fees: formData.fees || null,
        specializations: formData.specializations || [],
        image_url: formData.image_url || null,
      };

      console.log('Saving course data:', courseData);

      if (editingId) {
        const { data, error } = await supabase
          .from('university_courses')
          .update(courseData)
          .eq('id', editingId)
          .select();
        
        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        console.log('Course updated:', data);
        alert('Course updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('university_courses')
          .insert([courseData])
          .select();
        
        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Course created:', data);
        alert('Course created successfully!');
      }
      
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert(`Error saving course: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const { error } = await supabase
        .from('university_courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      alert('Course deleted successfully!');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course');
    }
  };

  const addSpecialization = () => {
    const spec = prompt('Enter specialization name:');
    if (spec && spec.trim()) {
      setFormData({
        ...formData,
        specializations: [...(formData.specializations || []), spec.trim()]
      });
    }
  };

  const removeSpecialization = (index) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Courses & Fee Structure</h3>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">
              {editingId ? 'Edit Course' : 'Add New Course'}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={formData.course_name}
                  onChange={(e) => setFormData({...formData, course_name: e.target.value})}
                  placeholder="e.g., MBA, B.Tech CSE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  placeholder="Course description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g., 2 years, 4 years"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fees
                </label>
                <input
                  type="text"
                  value={formData.fees}
                  onChange={(e) => setFormData({...formData, fees: e.target.value})}
                  placeholder="e.g., ₹2,00,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations
                </label>
                <button
                  onClick={addSpecialization}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  + Add Specialization
                </button>
                {formData.specializations && formData.specializations.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.specializations.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700">{spec}</span>
                        <button
                          onClick={() => removeSpecialization(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {courses.length === 0 ? (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                <p className="text-gray-600">Add your first course to get started</p>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{course.course_name}</h4>
                      {course.description && (
                        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {course.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{course.duration}</span>
                          </div>
                        )}
                        {course.fees && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{course.fees}</span>
                          </div>
                        )}
                      </div>

                      {course.specializations && course.specializations.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-2">Specializations:</p>
                          <div className="flex flex-wrap gap-2">
                            {course.specializations.map((spec, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(course)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityCoursesManager;
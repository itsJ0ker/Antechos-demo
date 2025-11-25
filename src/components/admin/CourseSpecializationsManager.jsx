import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const CourseSpecializationsManager = () => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingSpec, setEditingSpec] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetchCourses(selectedUniversity);
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedCourse) {
      fetchSpecializations(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchUniversities = async () => {
    const { data } = await supabase
      .from('universities')
      .select('id, name')
      .eq('is_active', true)
      .order('name');
    setUniversities(data || []);
  };

  const fetchCourses = async (universityId) => {
    const { data } = await supabase
      .from('university_courses')
      .select('id, course_name')
      .eq('university_id', universityId)
      .order('created_at');
    setCourses(data || []);
    setSelectedCourse('');
    setSpecializations([]);
  };

  const fetchSpecializations = async (courseId) => {
    const { data } = await supabase
      .from('course_specializations')
      .select('*')
      .eq('parent_course_id', courseId)
      .order('display_order');
    setSpecializations(data || []);
  };

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSave = async () => {
    if (!editingSpec.name || !selectedCourse || !selectedUniversity) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const specData = {
        name: editingSpec.name,
        description: editingSpec.description || null,
        duration: editingSpec.duration || null,
        fees: editingSpec.fees || null,
        eligibility: editingSpec.eligibility || null,
        curriculum: editingSpec.curriculum || null,
        career_prospects: editingSpec.career_prospects || null,
        image_url: editingSpec.image_url || null,
        is_active: editingSpec.is_active !== undefined ? editingSpec.is_active : true,
        display_order: editingSpec.display_order || 0,
        university_id: parseInt(selectedUniversity),
        parent_course_id: parseInt(selectedCourse)
      };

      if (editingSpec.id) {
        const { data, error } = await supabase
          .from('course_specializations')
          .update(specData)
          .eq('id', editingSpec.id)
          .select();
        
        if (error) throw error;
        showMessage('Specialization updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('course_specializations')
          .insert([specData])
          .select();
        
        if (error) throw error;
        showMessage('Specialization added successfully!');
      }

      setEditingSpec(null);
      fetchSpecializations(selectedCourse);
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error saving specialization', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this specialization?')) return;

    try {
      await supabase
        .from('course_specializations')
        .delete()
        .eq('id', id);
      showMessage('Specialization deleted successfully!');
      fetchSpecializations(selectedCourse);
    } catch (error) {
      showMessage('Error deleting specialization', 'error');
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await supabase
        .from('course_specializations')
        .update({ is_active: !isActive })
        .eq('id', id);
      fetchSpecializations(selectedCourse);
    } catch (error) {
      showMessage('Error updating status', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Course Specializations Manager</h2>
        <p className="text-gray-600 mt-1">Manage specializations for university courses</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select University *
            </label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a university</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course *
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={!selectedUniversity}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Choose a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add New Button */}
      {selectedCourse && !editingSpec && (
        <button
          onClick={() => setEditingSpec({
            name: '',
            description: '',
            duration: '',
            fees: '',
            eligibility: '',
            curriculum: '',
            career_prospects: '',
            image_url: '',
            is_active: true,
            display_order: specializations.length
          })}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add New Specialization
        </button>
      )}

      {/* Edit Form */}
      {editingSpec && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingSpec.id ? 'Edit Specialization' : 'New Specialization'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization Name *
              </label>
              <input
                type="text"
                value={editingSpec.name}
                onChange={(e) => setEditingSpec({ ...editingSpec, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., MBA in Finance"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={editingSpec.description || ''}
                onChange={(e) => setEditingSpec({ ...editingSpec, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Brief description of the specialization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={editingSpec.duration || ''}
                onChange={(e) => setEditingSpec({ ...editingSpec, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., 2 Years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fees</label>
              <input
                type="text"
                value={editingSpec.fees || ''}
                onChange={(e) => setEditingSpec({ ...editingSpec, fees: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., ₹5,00,000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
              <input
                type="text"
                value={editingSpec.eligibility || ''}
                onChange={(e) => setEditingSpec({ ...editingSpec, eligibility: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Bachelor's degree with 50% marks"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={editingSpec.image_url || ''}
                onChange={(e) => setEditingSpec({ ...editingSpec, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                value={editingSpec.display_order || 0}
                onChange={(e) => setEditingSpec({ ...editingSpec, display_order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingSpec.is_active}
                  onChange={(e) => setEditingSpec({ ...editingSpec, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Specialization
            </button>
            <button
              onClick={() => setEditingSpec(null)}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Specializations List */}
      {selectedCourse && !editingSpec && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Specializations ({specializations.length})
          </h3>

          {specializations.length > 0 ? (
            <div className="space-y-3">
              {specializations.map((spec) => (
                <div
                  key={spec.id}
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{spec.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      {spec.duration && <span>Duration: {spec.duration}</span>}
                      {spec.fees && <span>Fees: {spec.fees}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(spec.id, spec.is_active)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        spec.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {spec.is_active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => setEditingSpec(spec)}
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(spec.id)}
                      className="p-2 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No specializations added yet. Click "Add New Specialization" to get started.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSpecializationsManager;

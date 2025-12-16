import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Eye,
  Search,
  Target,
  CheckCircle,
  DollarSign,
  Zap
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CourseDetailManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    totalEnrollments: 0,
    averageRating: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    skill_level: 'Beginner',
    price: 0,
    original_price: 0,
    duration: '',
    image_url: '',
    is_active: true,
    rating: 0,
    total_enrollments: 0,
    instructor_name: '',
    instructor_bio: '',
    instructor_image: '',
    course_objectives: [],
    prerequisites: [],
    what_you_learn: [],
    course_features: [],
    target_audience: [],
    skills: [],
    tools: [],
    modules: [],
    certification_details: '',
    course_level: 'Beginner',
    language: 'English',
    last_updated: new Date().toISOString().split('T')[0]
  });

  const categories = ['Technology', 'Business', 'Design', 'Marketing', 'Finance', 'Healthcare', 'Education'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German'];

  useEffect(() => {
    loadCourses();
    loadStats();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('Loaded courses:', data);
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
      alert('Error loading courses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data: coursesData } = await supabase
        .from('courses')
        .select('id, is_active, total_enrollments, rating');
      
      if (coursesData) {
        const totalCourses = coursesData.length;
        const activeCourses = coursesData.filter(c => c.is_active).length;
        const totalEnrollments = coursesData.reduce((sum, c) => sum + (c.total_enrollments || 0), 0);
        const averageRating = coursesData.reduce((sum, c) => sum + (c.rating || 0), 0) / totalCourses;
        
        setStats({
          totalCourses,
          activeCourses,
          totalEnrollments,
          averageRating: averageRating.toFixed(1)
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        course_objectives: JSON.stringify(formData.course_objectives),
        prerequisites: JSON.stringify(formData.prerequisites),
        what_you_learn: JSON.stringify(formData.what_you_learn),
        course_features: JSON.stringify(formData.course_features),
        target_audience: JSON.stringify(formData.target_audience),
        skills: JSON.stringify(formData.skills),
        tools: JSON.stringify(formData.tools),
        modules: JSON.stringify(formData.modules)
      };

      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingCourse.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([courseData]);
        
        if (error) throw error;
      }

      await loadCourses();
      await loadStats();
      resetForm();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);
      
      if (error) throw error;
      
      await loadCourses();
      await loadStats();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    console.log('Editing course:', course); // Debug log
    setEditingCourse(course);
    
    // Safely parse JSON fields
    const parseJsonField = (field) => {
      try {
        if (!field) return [];
        if (typeof field === 'string') {
          return JSON.parse(field);
        }
        if (Array.isArray(field)) {
          return field;
        }
        return [];
      } catch (error) {
        console.warn('Error parsing JSON field:', field, error);
        return [];
      }
    };

    setFormData({
      ...course,
      course_objectives: parseJsonField(course.course_objectives),
      prerequisites: parseJsonField(course.prerequisites),
      what_you_learn: parseJsonField(course.what_you_learn),
      course_features: parseJsonField(course.course_features),
      target_audience: parseJsonField(course.target_audience),
      skills: parseJsonField(course.skills),
      tools: parseJsonField(course.tools),
      modules: parseJsonField(course.modules)
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Technology',
      skill_level: 'Beginner',
      price: 0,
      original_price: 0,
      duration: '',
      image_url: '',
      is_active: true,
      rating: 0,
      total_enrollments: 0,
      instructor_name: '',
      instructor_bio: '',
      instructor_image: '',
      course_objectives: [],
      prerequisites: [],
      what_you_learn: [],
      course_features: [],
      target_audience: [],
      skills: [],
      tools: [],
      modules: [],
      certification_details: '',
      course_level: 'Beginner',
      language: 'English',
      last_updated: new Date().toISOString().split('T')[0]
    });
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleArrayFieldChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field, defaultValue = '') => {
    if (field === 'modules') {
      const newModule = defaultValue || { title: '', description: '', details: [''] };
      setFormData({ ...formData, [field]: [...formData[field], newModule] });
    } else {
      setFormData({ ...formData, [field]: [...formData[field], defaultValue || ''] });
    }
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && course.is_active) ||
                         (filterStatus === 'inactive' && !course.is_active);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const viewCourseDetails = (course) => {
    console.log('viewCourseDetails called with:', course);
    try {
      setSelectedCourse(course);
      setShowDetails(true);
    } catch (error) {
      console.error('Error in viewCourseDetails:', error);
      alert('Error viewing course details: ' + error.message);
    }
  };

  if (loading && courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Course Detail Management
          </h2>
          <p className="text-gray-600 mt-1">Manage course details, content, and settings</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Courses</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalCourses}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Active Courses</p>
              <p className="text-2xl font-bold text-green-900">{stats.activeCourses}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Enrollments</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalEnrollments}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Average Rating</p>
              <p className="text-2xl font-bold text-amber-900">{stats.averageRating}</p>
            </div>
            <Star className="w-8 h-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Course</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Enrollments</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Rating</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        {course.image_url ? (
                          <img src={course.image_url} alt={course.title} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{course.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">₹{course.price?.toLocaleString() || 'Free'}</div>
                      {course.original_price && course.original_price > course.price && (
                        <div className="text-gray-500 line-through">₹{course.original_price.toLocaleString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{course.total_enrollments || 0}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-gray-900">{course.rating || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('View button clicked for course:', course.id);
                          viewCourseDetails(course);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Edit button clicked for course:', course.id);
                          handleEdit(course);
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No courses found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Course Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Pricing and Details */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 8 weeks"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                  <select
                    value={formData.skill_level}
                    onChange={(e) => setFormData({ ...formData, skill_level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {skillLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Instructor Information */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Instructor Information</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Name</label>
                    <input
                      type="text"
                      value={formData.instructor_name}
                      onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Image URL</label>
                    <input
                      type="url"
                      value={formData.instructor_image}
                      onChange={(e) => setFormData({ ...formData, instructor_image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Bio</label>
                  <textarea
                    value={formData.instructor_bio}
                    onChange={(e) => setFormData({ ...formData, instructor_bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Course Objectives */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Objectives</h4>
                {formData.course_objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => handleArrayFieldChange('course_objectives', index, e.target.value)}
                      placeholder="Enter course objective"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('course_objectives', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('course_objectives')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Objective
                </button>
              </div>

              {/* What You'll Learn */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h4>
                {formData.what_you_learn.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayFieldChange('what_you_learn', index, e.target.value)}
                      placeholder="Enter learning outcome"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('what_you_learn', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('what_you_learn')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Learning Outcome
                </button>
              </div>

              {/* Course Features */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Features</h4>
                {formData.course_features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayFieldChange('course_features', index, e.target.value)}
                      placeholder="Enter course feature (e.g., Hands-on projects, Live sessions)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('course_features', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('course_features')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Feature
                </button>
              </div>

              {/* Target Audience */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Who This Course Is For</h4>
                {formData.target_audience.map((audience, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={audience}
                      onChange={(e) => handleArrayFieldChange('target_audience', index, e.target.value)}
                      placeholder="Enter target audience (e.g., Beginners in programming, Career changers)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('target_audience', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('target_audience')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Target Audience
                </button>
              </div>

              {/* Skills You'll Gain */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Skills You'll Gain</h4>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayFieldChange('skills', index, e.target.value)}
                      placeholder="Enter skill (e.g., JavaScript, React, Node.js)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('skills', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('skills')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Skill
                </button>
              </div>

              {/* Tools & Technologies */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Tools & Technologies</h4>
                {formData.tools.map((tool, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tool}
                      onChange={(e) => handleArrayFieldChange('tools', index, e.target.value)}
                      placeholder="Enter tool or technology (e.g., VS Code, GitHub, Docker)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayField('tools', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('tools')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Tool
                </button>
              </div>

              {/* Course Modules */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Modules</h4>
                {formData.modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900">Module {index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeArrayField('modules', index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                        <input
                          type="text"
                          value={module.title || ''}
                          onChange={(e) => {
                            const newModules = [...formData.modules];
                            newModules[index] = { ...newModules[index], title: e.target.value };
                            setFormData({ ...formData, modules: newModules });
                          }}
                          placeholder="Enter module title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Description</label>
                        <textarea
                          value={module.description || ''}
                          onChange={(e) => {
                            const newModules = [...formData.modules];
                            newModules[index] = { ...newModules[index], description: e.target.value };
                            setFormData({ ...formData, modules: newModules });
                          }}
                          placeholder="Enter module description"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Module Details</label>
                        {(module.details || []).map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={detail}
                              onChange={(e) => {
                                const newModules = [...formData.modules];
                                const newDetails = [...(newModules[index].details || [])];
                                newDetails[detailIndex] = e.target.value;
                                newModules[index] = { ...newModules[index], details: newDetails };
                                setFormData({ ...formData, modules: newModules });
                              }}
                              placeholder="Enter module detail"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newModules = [...formData.modules];
                                const newDetails = (newModules[index].details || []).filter((_, i) => i !== detailIndex);
                                newModules[index] = { ...newModules[index], details: newDetails };
                                setFormData({ ...formData, modules: newModules });
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newModules = [...formData.modules];
                            const newDetails = [...(newModules[index].details || []), ''];
                            newModules[index] = { ...newModules[index], details: newDetails };
                            setFormData({ ...formData, modules: newModules });
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          + Add Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('modules', { title: '', description: '', details: [''] })}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Module
                </button>
              </div>

              {/* Additional Settings */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Active Course</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {showDetails && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Course Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Course Header */}
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {selectedCourse.image_url ? (
                    <img src={selectedCourse.image_url} alt={selectedCourse.title} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <BookOpen className="w-16 h-16 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {selectedCourse.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {selectedCourse.skill_level}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCourse.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedCourse.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Price</span>
                  </div>
                  <p className="text-xl font-bold text-blue-900">₹{selectedCourse.price?.toLocaleString() || 'Free'}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Enrollments</span>
                  </div>
                  <p className="text-xl font-bold text-green-900">{selectedCourse.total_enrollments || 0}</p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-medium text-amber-600">Rating</span>
                  </div>
                  <p className="text-xl font-bold text-amber-900">{selectedCourse.rating || 'N/A'}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Duration</span>
                  </div>
                  <p className="text-xl font-bold text-purple-900">{selectedCourse.duration || 'N/A'}</p>
                </div>
              </div>

              {/* Instructor Info */}
              {selectedCourse.instructor_name && (
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      {selectedCourse.instructor_image ? (
                        <img src={selectedCourse.instructor_image} alt={selectedCourse.instructor_name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <Users className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{selectedCourse.instructor_name}</h5>
                      {selectedCourse.instructor_bio && (
                        <p className="text-gray-600 text-sm mt-1">{selectedCourse.instructor_bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Course Objectives */}
              {selectedCourse.course_objectives && (() => {
                try {
                  const objectives = typeof selectedCourse.course_objectives === 'string' 
                    ? JSON.parse(selectedCourse.course_objectives) 
                    : selectedCourse.course_objectives;
                  
                  if (Array.isArray(objectives) && objectives.length > 0) {
                    return (
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Objectives</h4>
                        <ul className="space-y-2">
                          {objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                } catch (error) {
                  console.warn('Error parsing course objectives:', error);
                }
                return null;
              })()}

              {/* What You'll Learn */}
              {selectedCourse.what_you_learn && (() => {
                try {
                  const learningItems = typeof selectedCourse.what_you_learn === 'string' 
                    ? JSON.parse(selectedCourse.what_you_learn) 
                    : selectedCourse.what_you_learn;
                  
                  if (Array.isArray(learningItems) && learningItems.length > 0) {
                    return (
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h4>
                        <ul className="space-y-2">
                          {learningItems.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                } catch (error) {
                  console.warn('Error parsing what you learn:', error);
                }
                return null;
              })()}

              {/* Course Features */}
              {selectedCourse.course_features && (() => {
                try {
                  const features = typeof selectedCourse.course_features === 'string' 
                    ? JSON.parse(selectedCourse.course_features) 
                    : selectedCourse.course_features;
                  
                  if (Array.isArray(features) && features.length > 0) {
                    return (
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Features</h4>
                        <ul className="space-y-2">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                } catch (error) {
                  console.warn('Error parsing course features:', error);
                }
                return null;
              })()}

              {/* Target Audience */}
              {selectedCourse.target_audience && (() => {
                try {
                  const audience = typeof selectedCourse.target_audience === 'string' 
                    ? JSON.parse(selectedCourse.target_audience) 
                    : selectedCourse.target_audience;
                  
                  if (Array.isArray(audience) && audience.length > 0) {
                    return (
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Who This Course Is For</h4>
                        <ul className="space-y-2">
                          {audience.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Users className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                } catch (error) {
                  console.warn('Error parsing target audience:', error);
                }
                return null;
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailManager;
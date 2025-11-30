import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const SimpleCourseSpecializationsManager = () => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingSpec, setEditingSpec] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    overview: false,
    industry: false,
    highlights: false,
    curriculum: false,
    career: false,
    support: false,
    levels: false
  });
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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
        image_url: editingSpec.image_url || null,
        duration: editingSpec.duration || null,
        fees: editingSpec.fees || null,
        eligibility: editingSpec.eligibility || null,
        program_overview: editingSpec.program_overview || null,
        industry_insight_title: editingSpec.industry_insight_title || 'Industry Insight',
        industry_insight_content: editingSpec.industry_insight_content || null,
        industry_insight_stats: editingSpec.industry_insight_stats || null,
        program_highlights: editingSpec.program_highlights || null,
        curriculum: editingSpec.curriculum || null,
        career_paths: editingSpec.career_paths || null,
        career_support: editingSpec.career_support || null,
        alumni_network: editingSpec.alumni_network || null,
        entry_level_info: editingSpec.entry_level_info || null,
        mid_level_info: editingSpec.mid_level_info || null,
        senior_level_info: editingSpec.senior_level_info || null,
        booking_enabled: editingSpec.booking_enabled !== undefined ? editingSpec.booking_enabled : true,
        booking_cta_text: editingSpec.booking_cta_text || 'Book Your Seat Today',
        is_active: editingSpec.is_active !== undefined ? editingSpec.is_active : true,
        display_order: editingSpec.display_order || 0,
        university_id: parseInt(selectedUniversity),
        parent_course_id: parseInt(selectedCourse)
      };

      if (editingSpec.id) {
        const { error } = await supabase
          .from('course_specializations')
          .update(specData)
          .eq('id', editingSpec.id);
        
        if (error) throw error;
        showMessage('Specialization updated successfully!');
      } else {
        const { error } = await supabase
          .from('course_specializations')
          .insert([specData]);
        
        if (error) throw error;
        showMessage('Specialization added successfully!');
      }

      setEditingSpec(null);
      fetchSpecializations(selectedCourse);
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error saving specialization: ' + error.message, 'error');
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

  // Helper functions for managing arrays
  const addStat = () => {
    const stats = editingSpec.industry_insight_stats || [];
    setEditingSpec({
      ...editingSpec,
      industry_insight_stats: [...stats, { label: '', value: '' }]
    });
  };

  const updateStat = (index, field, value) => {
    const stats = [...(editingSpec.industry_insight_stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    setEditingSpec({ ...editingSpec, industry_insight_stats: stats });
  };

  const removeStat = (index) => {
    const stats = [...(editingSpec.industry_insight_stats || [])];
    stats.splice(index, 1);
    setEditingSpec({ ...editingSpec, industry_insight_stats: stats });
  };

  const addHighlight = () => {
    const highlights = editingSpec.program_highlights || [];
    setEditingSpec({
      ...editingSpec,
      program_highlights: [...highlights, { title: '', description: '' }]
    });
  };

  const updateHighlight = (index, field, value) => {
    const highlights = [...(editingSpec.program_highlights || [])];
    highlights[index] = { ...highlights[index], [field]: value };
    setEditingSpec({ ...editingSpec, program_highlights: highlights });
  };

  const removeHighlight = (index) => {
    const highlights = [...(editingSpec.program_highlights || [])];
    highlights.splice(index, 1);
    setEditingSpec({ ...editingSpec, program_highlights: highlights });
  };

  const addSemester = () => {
    const curriculum = editingSpec.curriculum || [];
    setEditingSpec({
      ...editingSpec,
      curriculum: [...curriculum, { semester: '', description: '', subjects: [''] }]
    });
  };

  const updateSemester = (index, field, value) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum[index] = { ...curriculum[index], [field]: value };
    setEditingSpec({ ...editingSpec, curriculum });
  };

  const removeSemester = (index) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum.splice(index, 1);
    setEditingSpec({ ...editingSpec, curriculum });
  };

  const addSubject = (semIndex) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum[semIndex].subjects = [...(curriculum[semIndex].subjects || []), ''];
    setEditingSpec({ ...editingSpec, curriculum });
  };

  const updateSubject = (semIndex, subIndex, value) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum[semIndex].subjects[subIndex] = value;
    setEditingSpec({ ...editingSpec, curriculum });
  };

  const removeSubject = (semIndex, subIndex) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum[semIndex].subjects.splice(subIndex, 1);
    setEditingSpec({ ...editingSpec, curriculum });
  };

  const addCareerPath = () => {
    const paths = editingSpec.career_paths || [];
    setEditingSpec({
      ...editingSpec,
      career_paths: [...paths, { title: '', description: '', salary_range: '' }]
    });
  };

  const updateCareerPath = (index, field, value) => {
    const paths = [...(editingSpec.career_paths || [])];
    paths[index] = { ...paths[index], [field]: value };
    setEditingSpec({ ...editingSpec, career_paths: paths });
  };

  const removeCareerPath = (index) => {
    const paths = [...(editingSpec.career_paths || [])];
    paths.splice(index, 1);
    setEditingSpec({ ...editingSpec, career_paths: paths });
  };

  const SectionHeader = ({ title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 rounded-lg"
    >
      <h4 className="font-semibold text-gray-900">{title}</h4>
      {expandedSections[section] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Course Specializations Manager</h2>
        <p className="text-gray-600 mt-1">Simple interface - no JSON editing required!</p>
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
            image_url: '',
            duration: '',
            fees: '',
            eligibility: '',
            program_overview: '',
            industry_insight_title: 'Industry Insight',
            industry_insight_content: '',
            industry_insight_stats: [],
            program_highlights: [],
            curriculum: [],
            career_paths: [],
            career_support: '',
            alumni_network: '',
            entry_level_info: '',
            mid_level_info: '',
            senior_level_info: '',
            booking_enabled: true,
            booking_cta_text: 'Book Your Seat Today',
            is_active: true,
            display_order: specializations.length
          })}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add New Specialization
        </button>
      )}

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const EnhancedCourseSpecializationsManager = () => {
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editingSpec, setEditingSpec] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    overview: true,
    industry: true,
    highlights: true,
    curriculum: true,
    career: true,
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
    setSelectedCourse('');
    setSpecializations([]);
  };

  const fetchSpecializations = async (courseId) => {
    const { data, error } = await supabase
      .from('course_specializations')
      .select('*')
      .eq('parent_course_id', courseId)
      .order('display_order');
    
    console.log('Fetched specializations:', data);
    console.log('Fetch error:', error);
    
    if (data && data.length > 0) {
      console.log('First spec curriculum:', data[0].curriculum);
    }
    
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
      // Clean up curriculum - remove empty subjects
      const cleanedCurriculum = Array.isArray(editingSpec.curriculum) 
        ? editingSpec.curriculum
            .filter(sem => sem.semester && sem.semester.trim()) // Only keep semesters with names
            .map(sem => ({
              ...sem,
              subjects: Array.isArray(sem.subjects) 
                ? sem.subjects.filter(sub => sub && sub.trim()) // Remove empty subjects
                : []
            }))
        : null;

      console.log('Saving curriculum:', cleanedCurriculum); // Debug log

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
        curriculum: cleanedCurriculum,
        specialization_details: editingSpec.specialization_details || null,
        core_subjects: editingSpec.core_subjects || null,
        elective_subjects: editingSpec.elective_subjects || null,
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
        const { data, error } = await supabase
          .from('course_specializations')
          .update(specData)
          .eq('id', editingSpec.id)
          .select();
        
        if (error) throw error;
        console.log('Updated data:', data); // Debug log
        showMessage('Specialization updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('course_specializations')
          .insert([specData])
          .select();
        
        if (error) throw error;
        console.log('Inserted data:', data); // Debug log
        showMessage('Specialization added successfully!');
      }

      setEditingSpec(null);
      fetchSpecializations(selectedCourse);
    } catch (error) {
      console.error('Error saving:', error);
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

  const addArrayItem = (field, defaultValue = '') => {
    const current = editingSpec[field] || [];
    setEditingSpec({
      ...editingSpec,
      [field]: [...current, defaultValue]
    });
  };

  const updateArrayItem = (field, index, value) => {
    const current = [...(editingSpec[field] || [])];
    current[index] = value;
    setEditingSpec({ ...editingSpec, [field]: current });
  };

  const removeArrayItem = (field, index) => {
    const current = [...(editingSpec[field] || [])];
    current.splice(index, 1);
    setEditingSpec({ ...editingSpec, [field]: current });
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
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Enhanced Course Specializations Manager</h2>
        <p className="text-gray-600 mt-1">Manage all sections of specialization pages</p>
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
            specialization_details: '',
            core_subjects: [],
            elective_subjects: [],
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

      {/* Edit Form */}
      {editingSpec && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">
            {editingSpec.id ? 'Edit Specialization' : 'New Specialization'}
          </h3>

          {/* Basic Information */}
          <div className="space-y-4">
            <SectionHeader title="Basic Information" section="basic" />
            {expandedSections.basic && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingSpec.description || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Brief description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={editingSpec.display_order || 0}
                      onChange={(e) => setEditingSpec({ ...editingSpec, display_order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                  <input
                    type="text"
                    value={editingSpec.eligibility || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, eligibility: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Bachelor's degree with 50% marks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingSpec.image_url || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSpec.is_active}
                      onChange={(e) => setEditingSpec({ ...editingSpec, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSpec.booking_enabled}
                      onChange={(e) => setEditingSpec({ ...editingSpec, booking_enabled: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Booking Enabled</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Program Overview */}
          <div className="space-y-4">
            <SectionHeader title="Program Overview" section="overview" />
            {expandedSections.overview && (
              <div className="bg-white p-4 rounded-lg">
                <textarea
                  value={editingSpec.program_overview || ''}
                  onChange={(e) => setEditingSpec({ ...editingSpec, program_overview: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Detailed program overview..."
                />
              </div>
            )}
          </div>

          {/* Industry Insight */}
          <div className="space-y-4">
            <SectionHeader title="Industry Insight" section="industry" />
            {expandedSections.industry && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={editingSpec.industry_insight_title || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, industry_insight_title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Industry Insight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={editingSpec.industry_insight_content || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, industry_insight_content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Industry insight content..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Statistics</label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('industry_insight_stats', { label: '', value: '' })}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Add Stat
                    </button>
                  </div>
                  {(Array.isArray(editingSpec.industry_insight_stats) ? editingSpec.industry_insight_stats : []).map((stat, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={stat.label || ''}
                        onChange={(e) => {
                          const stats = [...(editingSpec.industry_insight_stats || [])];
                          stats[idx] = { ...stats[idx], label: e.target.value };
                          setEditingSpec({ ...editingSpec, industry_insight_stats: stats });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                        placeholder="Label (e.g., Growth Rate)"
                      />
                      <input
                        type="text"
                        value={stat.value || ''}
                        onChange={(e) => {
                          const stats = [...(editingSpec.industry_insight_stats || [])];
                          stats[idx] = { ...stats[idx], value: e.target.value };
                          setEditingSpec({ ...editingSpec, industry_insight_stats: stats });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                        placeholder="Value (e.g., 25%)"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('industry_insight_stats', idx)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Program Highlights */}
          <div className="space-y-4">
            <SectionHeader title="Program Highlights" section="highlights" />
            {expandedSections.highlights && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Highlights</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('program_highlights', { title: '', description: '' })}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Highlight
                  </button>
                </div>
                {(Array.isArray(editingSpec.program_highlights) ? editingSpec.program_highlights : []).map((highlight, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Highlight {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('program_highlights', idx)}
                        className="text-red-600 hover:bg-red-50 rounded p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={highlight.title || ''}
                      onChange={(e) => {
                        const highlights = [...(editingSpec.program_highlights || [])];
                        highlights[idx] = { ...highlights[idx], title: e.target.value };
                        setEditingSpec({ ...editingSpec, program_highlights: highlights });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Title (e.g., Industry-Relevant Curriculum)"
                    />
                    <textarea
                      value={highlight.description || ''}
                      onChange={(e) => {
                        const highlights = [...(editingSpec.program_highlights || [])];
                        highlights[idx] = { ...highlights[idx], description: e.target.value };
                        setEditingSpec({ ...editingSpec, program_highlights: highlights });
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Curriculum */}
          <div className="space-y-4">
            <SectionHeader title="Course Curriculum (Semester-wise)" section="curriculum" />
            {expandedSections.curriculum && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                  <p className="text-sm text-blue-800 font-semibold mb-2">
                    📚 Curriculum Structure:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                    <li><strong>Semester 1 & 2:</strong> Common foundation courses (same for all specializations)</li>
                    <li><strong>Semester 3 & 4+:</strong> Specialization-specific advanced courses</li>
                    <li>Add Semester 1 & 2 to ALL specializations with the SAME subjects</li>
                    <li>Add Semester 3 & 4+ with subjects specific to THIS specialization</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Semesters</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('curriculum', { semester: '', description: '', subjects: [''] })}
                    className="flex items-center gap-1 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Semester
                  </button>
                </div>
                {(Array.isArray(editingSpec.curriculum) ? editingSpec.curriculum : []).map((sem, semIdx) => (
                  <div key={semIdx} className="border border-gray-300 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">Semester {semIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('curriculum', semIdx)}
                        className="text-red-600 hover:bg-red-50 rounded p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={sem.semester || ''}
                      onChange={(e) => {
                        const curriculum = [...(editingSpec.curriculum || [])];
                        curriculum[semIdx] = { ...curriculum[semIdx], semester: e.target.value };
                        setEditingSpec({ ...editingSpec, curriculum });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Semester Name (e.g., SEM 1)"
                    />
                    <textarea
                      value={sem.description || ''}
                      onChange={(e) => {
                        const curriculum = [...(editingSpec.curriculum || [])];
                        curriculum[semIdx] = { ...curriculum[semIdx], description: e.target.value };
                        setEditingSpec({ ...editingSpec, curriculum });
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Description (optional)"
                    />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium text-gray-600">Subjects</label>
                        <button
                          type="button"
                          onClick={() => {
                            const curriculum = [...(editingSpec.curriculum || [])];
                            curriculum[semIdx].subjects = [...(curriculum[semIdx].subjects || []), ''];
                            setEditingSpec({ ...editingSpec, curriculum });
                          }}
                          className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          <Plus className="w-3 h-3" />
                          Add Subject
                        </button>
                      </div>
                      {(Array.isArray(sem.subjects) ? sem.subjects : []).map((subject, subIdx) => (
                        <div key={subIdx} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={subject || ''}
                            onChange={(e) => {
                              const curriculum = [...(editingSpec.curriculum || [])];
                              curriculum[semIdx].subjects[subIdx] = e.target.value;
                              setEditingSpec({ ...editingSpec, curriculum });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                            placeholder={`Subject ${subIdx + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const curriculum = [...(editingSpec.curriculum || [])];
                              curriculum[semIdx].subjects.splice(subIdx, 1);
                              setEditingSpec({ ...editingSpec, curriculum });
                            }}
                            className="px-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Paths */}
          <div className="space-y-4">
            <SectionHeader title="Career Paths" section="career" />
            {expandedSections.career && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Career Options</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('career_paths', { title: '', description: '', salary_range: '' })}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Career Path
                  </button>
                </div>
                {(Array.isArray(editingSpec.career_paths) ? editingSpec.career_paths : []).map((career, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Career {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('career_paths', idx)}
                        className="text-red-600 hover:bg-red-50 rounded p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={career.title || ''}
                      onChange={(e) => {
                        const paths = [...(editingSpec.career_paths || [])];
                        paths[idx] = { ...paths[idx], title: e.target.value };
                        setEditingSpec({ ...editingSpec, career_paths: paths });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Job Title (e.g., Financial Analyst)"
                    />
                    <textarea
                      value={career.description || ''}
                      onChange={(e) => {
                        const paths = [...(editingSpec.career_paths || [])];
                        paths[idx] = { ...paths[idx], description: e.target.value };
                        setEditingSpec({ ...editingSpec, career_paths: paths });
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Job Description"
                    />
                    <input
                      type="text"
                      value={career.salary_range || ''}
                      onChange={(e) => {
                        const paths = [...(editingSpec.career_paths || [])];
                        paths[idx] = { ...paths[idx], salary_range: e.target.value };
                        setEditingSpec({ ...editingSpec, career_paths: paths });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Salary Range (e.g., ₹6-12 LPA)"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Support & Alumni */}
          <div className="space-y-4">
            <SectionHeader title="Support & Alumni" section="support" />
            {expandedSections.support && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Career Support</label>
                  <textarea
                    value={editingSpec.career_support || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, career_support: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Career support information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alumni Network</label>
                  <textarea
                    value={editingSpec.alumni_network || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, alumni_network: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Alumni network information..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Entry/Mid/Senior Levels */}
          <div className="space-y-4">
            <SectionHeader title="Career Level Information" section="levels" />
            {expandedSections.levels && (
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entry Level</label>
                  <textarea
                    value={editingSpec.entry_level_info || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, entry_level_info: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Entry level career information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mid Level</label>
                  <textarea
                    value={editingSpec.mid_level_info || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, mid_level_info: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Mid level career information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senior Level</label>
                  <textarea
                    value={editingSpec.senior_level_info || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, senior_level_info: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Senior level career information..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Specialization'}
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
                      onClick={() => {
                        // Parse JSON strings if needed
                        const parseCurriculum = (curr) => {
                          if (typeof curr === 'string') {
                            try {
                              return JSON.parse(curr);
                            } catch {
                              return [];
                            }
                          }
                          return curr;
                        };

                        const parseField = (field) => {
                          if (typeof field === 'string') {
                            try {
                              return JSON.parse(field);
                            } catch {
                              return [];
                            }
                          }
                          return field;
                        };

                        // Normalize data - ensure arrays are arrays and have proper structure
                        const normalizedSpec = {
                          ...spec,
                          industry_insight_stats: Array.isArray(parseField(spec.industry_insight_stats)) ? parseField(spec.industry_insight_stats) : [],
                          program_highlights: Array.isArray(parseField(spec.program_highlights)) ? parseField(spec.program_highlights) : [],
                          curriculum: Array.isArray(parseCurriculum(spec.curriculum)) 
                            ? parseCurriculum(spec.curriculum).map(sem => ({
                                semester: sem.semester || '',
                                description: sem.description || '',
                                subjects: Array.isArray(sem.subjects) ? sem.subjects : []
                              }))
                            : [],
                          career_paths: Array.isArray(parseField(spec.career_paths)) ? parseField(spec.career_paths) : []
                        };
                        console.log('Loading for edit:', normalizedSpec.curriculum); // Debug
                        setEditingSpec(normalizedSpec);
                      }}
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

export default EnhancedCourseSpecializationsManager;

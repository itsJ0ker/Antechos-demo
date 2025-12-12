import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp, 
  Building, BookOpen, Award, Users, Briefcase, HelpCircle,
  Search, Filter, Eye, EyeOff, Copy, ExternalLink, Image as ImageIcon
} from 'lucide-react';

const UnifiedUniversitySpecializationsManager = () => {
  // State management
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [activeTab, setActiveTab] = useState('university');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');

  // University editing states
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universityForm, setUniversityForm] = useState({});

  // Specialization editing states
  const [editingSpec, setEditingSpec] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    overview: true,
    industry: true,
    programHighlights: true,
    highlights: true,
    curriculum: true,
    career: true,
    support: false,
    levels: false
  });

  // Accreditations and hiring partners
  const [allAccreditations, setAllAccreditations] = useState([]);
  const [selectedAccreditations, setSelectedAccreditations] = useState([]);
  const [allHiringPartners, setAllHiringPartners] = useState([]);
  const [selectedHiringPartners, setSelectedHiringPartners] = useState([]);

  // University additional data
  const [campusImages, setCampusImages] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [careerStats, setCareerStats] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Add University Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUniversity, setNewUniversity] = useState({
    name: '',
    code: '',
    location: '',
    description: '',
    about: '',
    image_url: '',
    hero_image: '',
    established: '',
    campus_size: '',
    ranking: '',
    nirf_rank: '',
    fees: '',
    rating: 0,
    video_url: '',
    placement_rate: '',
    is_active: true
  });

  useEffect(() => {
    fetchUniversities();
    fetchAllAccreditations();
    fetchAllHiringPartners();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetchCourses(selectedUniversity.id);
      fetchUniversityDetails(selectedUniversity.id);
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedCourse) {
      fetchSpecializations(selectedCourse);
    }
  }, [selectedCourse]);
  // Fetch functions
  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setUniversities(data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
      showMessage('Error fetching universities', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (universityId) => {
    try {
      const { data } = await supabase
        .from('university_courses')
        .select('id, course_name, description, duration')
        .eq('university_id', universityId)
        .order('created_at');
      setCourses(data || []);
      setSelectedCourse('');
      setSpecializations([]);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSpecializations = async (courseId) => {
    try {
      const { data, error } = await supabase
        .from('course_specializations')
        .select('*')
        .eq('parent_course_id', courseId)
        .order('display_order');
      
      if (error) throw error;
      setSpecializations(data || []);
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  const fetchAllAccreditations = async () => {
    try {
      const { data, error } = await supabase
        .from('accreditations')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (!error) setAllAccreditations(data || []);
    } catch (error) {
      console.error('Error fetching accreditations:', error);
    }
  };

  const fetchAllHiringPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('hiring_partners')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (!error) setAllHiringPartners(data || []);
    } catch (error) {
      console.error('Error fetching hiring partners:', error);
    }
  };
  const fetchUniversityAccreditations = async (universityId) => {
    try {
      const { data } = await supabase
        .from('university_accreditations')
        .select(`
          id,
          accreditation_id,
          display_order,
          accreditation:accreditations(
            id,
            name,
            full_name,
            logo_url,
            description
          )
        `)
        .eq('university_id', universityId)
        .order('display_order');
      setSelectedAccreditations(data || []);
    } catch (error) {
      console.error('Error fetching university accreditations:', error);
    }
  };

  const fetchUniversityDetails = async (universityId) => {
    try {
      // Fetch university accreditations
      const { data: accreditationsData } = await supabase
        .from('university_accreditations')
        .select(`
          id,
          accreditation_id,
          display_order,
          accreditation:accreditations(
            id,
            name,
            full_name,
            logo_url,
            description
          )
        `)
        .eq('university_id', universityId)
        .order('display_order');
      setSelectedAccreditations(accreditationsData || []);

      // Fetch university hiring partners (new system)
      const { data: hiringPartnersData } = await supabase
        .from('university_hiring_partners_new')
        .select(`
          id,
          hiring_partner_id,
          display_order,
          hiring_partner:hiring_partners(
            id,
            name,
            logo_url,
            website_url,
            industry,
            description
          )
        `)
        .eq('university_id', universityId)
        .order('display_order');
      setSelectedHiringPartners(hiringPartnersData || []);

      // Fetch campus images
      const { data: images } = await supabase
        .from('university_campus_images')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setCampusImages(images || []);

      // Fetch benefits
      const { data: benefitsData } = await supabase
        .from('university_benefits')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setBenefits(benefitsData || []);

      // Fetch admission steps
      const { data: stepsData } = await supabase
        .from('university_admission_steps')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setAdmissionSteps(stepsData || []);

      // Fetch career stats
      const { data: statsData } = await supabase
        .from('university_career_stats')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setCareerStats(statsData || []);

      // Fetch FAQs
      const { data: faqsData } = await supabase
        .from('university_faqs')
        .select('*')
        .eq('university_id', universityId)
        .order('order_index', { ascending: true });
      setFaqs(faqsData || []);

    } catch (error) {
      console.error('Error fetching university details:', error);
    }
  };

  // Utility functions
  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter functions
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && uni.is_active) ||
                         (filterActive === 'inactive' && !uni.is_active);
    return matchesSearch && matchesFilter;
  });

  // University management functions
  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setUniversityForm(university);
    setActiveTab('university');
  };

  const saveUniversityBasicInfo = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('universities')
        .update(universityForm)
        .eq('id', selectedUniversity.id);
      
      if (error) throw error;
      showMessage('University information updated successfully!');
      setSelectedUniversity(universityForm);
      fetchUniversities();
    } catch (error) {
      console.error('Error updating university:', error);
      showMessage('Error updating university information', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteUniversity = async () => {
    if (!selectedUniversity) return;
    
    const universityName = selectedUniversity.name;
    const userInput = prompt(
      `⚠️ DANGER: You are about to permanently delete "${universityName}"\n\n` +
      `This will delete:\n` +
      `• The university\n` +
      `• All courses (${courses.length})\n` +
      `• All specializations (${specializations.length})\n` +
      `• All accreditations, FAQs, and related data\n\n` +
      `This action CANNOT be undone!\n\n` +
      `Type "${universityName}" to confirm deletion:`
    );
    
    if (userInput !== universityName) {
      if (userInput !== null) {
        alert('University name does not match. Deletion cancelled.');
      }
      return;
    }

    setSaving(true);
    try {
      // Delete in order due to foreign key constraints
      // 1. Delete specializations first
      await supabase
        .from('course_specializations')
        .delete()
        .eq('university_id', selectedUniversity.id);

      // 2. Delete courses
      await supabase
        .from('university_courses')
        .delete()
        .eq('university_id', selectedUniversity.id);

      // 3. Delete all university-related data
      await Promise.all([
        supabase.from('university_faqs').delete().eq('university_id', selectedUniversity.id),
        supabase.from('university_accreditations').delete().eq('university_id', selectedUniversity.id),
        supabase.from('university_hiring_partners_new').delete().eq('university_id', selectedUniversity.id),
        supabase.from('university_campus_images').delete().eq('university_id', selectedUniversity.id),
        supabase.from('university_benefits').delete().eq('university_id', selectedUniversity.id),
        supabase.from('university_admission_steps').delete().eq('university_id', selectedUniversity.id),
        supabase.from('university_career_stats').delete().eq('university_id', selectedUniversity.id),
      ]);

      // 4. Finally delete the university
      const { error } = await supabase
        .from('universities')
        .delete()
        .eq('id', selectedUniversity.id);
      
      if (error) throw error;
      
      showMessage('University deleted successfully!');
      setSelectedUniversity(null);
      setUniversityForm({});
      setEditingUniversity(false);
      fetchUniversities();
    } catch (error) {
      console.error('Error deleting university:', error);
      showMessage('Error deleting university: ' + error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveAccreditations = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_accreditations').delete().eq('university_id', selectedUniversity.id);
      if (selectedAccreditations.length > 0) {
        const { error } = await supabase.from('university_accreditations')
          .insert(selectedAccreditations.map((item, index) => ({
            university_id: selectedUniversity.id,
            accreditation_id: item.accreditation_id || item.accreditation?.id,
            display_order: index + 1
          })));
        if (error) throw error;
      }
      showMessage('Accreditations updated successfully!');
    } catch (error) {
      console.error('Error updating accreditations:', error);
      showMessage('Error updating accreditations', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveSelectedHiringPartners = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_hiring_partners_new').delete().eq('university_id', selectedUniversity.id);
      if (selectedHiringPartners.length > 0) {
        const { error } = await supabase.from('university_hiring_partners_new')
          .insert(selectedHiringPartners.map((item, index) => ({
            university_id: selectedUniversity.id,
            hiring_partner_id: item.hiring_partner_id || item.hiring_partner?.id,
            display_order: index + 1
          })));
        if (error) throw error;
      }
      showMessage('Hiring partners updated successfully!');
    } catch (error) {
      console.error('Error updating hiring partners:', error);
      showMessage('Error updating hiring partners', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveCampusImages = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_campus_images').delete().eq('university_id', selectedUniversity.id);
      if (campusImages.length > 0) {
        const { error } = await supabase.from('university_campus_images')
          .insert(campusImages.map(img => ({ ...img, university_id: selectedUniversity.id })));
        if (error) throw error;
      }
      showMessage('Campus images updated successfully!');
    } catch (error) {
      console.error('Error updating campus images:', error);
      showMessage('Error updating campus images', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveBenefits = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_benefits').delete().eq('university_id', selectedUniversity.id);
      if (benefits.length > 0) {
        const { error } = await supabase.from('university_benefits')
          .insert(benefits.map(b => ({ ...b, university_id: selectedUniversity.id })));
        if (error) throw error;
      }
      showMessage('Benefits updated successfully!');
    } catch (error) {
      console.error('Error updating benefits:', error);
      showMessage('Error updating benefits', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveAdmissionSteps = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_admission_steps').delete().eq('university_id', selectedUniversity.id);
      if (admissionSteps.length > 0) {
        const { error } = await supabase.from('university_admission_steps')
          .insert(admissionSteps.map(s => ({ ...s, university_id: selectedUniversity.id })));
        if (error) throw error;
      }
      showMessage('Admission steps updated successfully!');
    } catch (error) {
      console.error('Error updating admission steps:', error);
      showMessage('Error updating admission steps', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveCareerStats = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_career_stats').delete().eq('university_id', selectedUniversity.id);
      if (careerStats.length > 0) {
        const { error } = await supabase.from('university_career_stats')
          .insert(careerStats.map(s => ({ ...s, university_id: selectedUniversity.id })));
        if (error) throw error;
      }
      showMessage('Career stats updated successfully!');
    } catch (error) {
      console.error('Error updating career stats:', error);
      showMessage('Error updating career stats', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveFaqs = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      // Delete existing FAQs
      await supabase.from('university_faqs').delete().eq('university_id', selectedUniversity.id);
      
      // Insert new FAQs
      if (faqs.length > 0) {
        const faqsToInsert = faqs.map((f, index) => ({
          university_id: selectedUniversity.id,
          question: f.question || '',
          answer: f.answer || '',
          order_index: f.order_index || index + 1
        }));
        
        const { error } = await supabase.from('university_faqs').insert(faqsToInsert);
        if (error) throw error;
      }
      showMessage('FAQs updated successfully!');
    } catch (error) {
      console.error('Error updating FAQs:', error);
      showMessage('Error updating FAQs', 'error');
    } finally {
      setSaving(false);
    }
  };
  // Specialization management functions
  const handleSaveSpecialization = async () => {
    if (!editingSpec.name || !selectedCourse || !selectedUniversity) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    setSaving(true);
    try {
      const cleanedCurriculum = Array.isArray(editingSpec.curriculum) 
        ? editingSpec.curriculum
            .filter(sem => sem.semester && sem.semester.trim())
            .map(sem => ({
              ...sem,
              subjects: Array.isArray(sem.subjects) 
                ? sem.subjects.filter(sub => sub && sub.trim())
                : []
            }))
        : null;

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
        specialization_program_highlights: editingSpec.specialization_program_highlights || null,
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
        university_id: parseInt(selectedUniversity.id),
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
      console.error('Error saving specialization:', error);
      showMessage('Error saving specialization: ' + error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSpecialization = async (id) => {
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
  // Array manipulation helpers for specializations
  const addArrayItem = (field, defaultValue = '') => {
    const current = editingSpec[field] || [];
    setEditingSpec({
      ...editingSpec,
      [field]: [...current, defaultValue]
    });
  };

  const removeArrayItem = (field, index) => {
    const current = [...(editingSpec[field] || [])];
    current.splice(index, 1);
    setEditingSpec({ ...editingSpec, [field]: current });
  };

  // University data manipulation helpers
  const addCampusImage = () => {
    setCampusImages([...campusImages, { image_url: '', caption: '', display_order: campusImages.length + 1 }]);
  };

  const addBenefit = () => {
    setBenefits([...benefits, { benefit_number: benefits.length + 1, title: '', description: '', display_order: benefits.length + 1 }]);
  };

  const addAdmissionStep = () => {
    setAdmissionSteps([...admissionSteps, { step_number: admissionSteps.length + 1, title: '', subtitle: '', description: '', display_order: admissionSteps.length + 1 }]);
  };

  const addCareerStat = () => {
    setCareerStats([...careerStats, { stat_label: '', stat_value: '', display_order: careerStats.length + 1 }]);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '', order_index: faqs.length + 1 }]);
  };

  const handleAddUniversity = async () => {
    if (!newUniversity.name || !newUniversity.location) {
      showMessage('Name and location are required', 'error');
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('universities')
        .insert([{
          name: newUniversity.name,
          code: newUniversity.code || null,
          location: newUniversity.location,
          description: newUniversity.description || null,
          about: newUniversity.about || null,
          image_url: newUniversity.image_url || null,
          hero_image: newUniversity.hero_image || null,
          established: newUniversity.established || null,
          campus_size: newUniversity.campus_size || null,
          ranking: newUniversity.ranking || null,
          nirf_rank: newUniversity.nirf_rank ? parseInt(newUniversity.nirf_rank) : null,
          fees: newUniversity.fees || null,
          rating: newUniversity.rating || 0,
          video_url: newUniversity.video_url || null,
          placement_rate: newUniversity.placement_rate ? parseInt(newUniversity.placement_rate) : null,
          is_active: newUniversity.is_active
        }])
        .select()
        .single();

      if (error) throw error;

      showMessage('University added successfully!');
      setShowAddModal(false);
      setNewUniversity({
        name: '',
        code: '',
        location: '',
        description: '',
        about: '',
        image_url: '',
        hero_image: '',
        established: '',
        campus_size: '',
        ranking: '',
        nirf_rank: '',
        fees: '',
        rating: 0,
        video_url: '',
        placement_rate: '',
        is_active: true
      });
      fetchUniversities();
      
      // Auto-select the newly created university
      if (data) {
        handleUniversitySelect(data);
      }
    } catch (error) {
      console.error('Error adding university:', error);
      showMessage('Error adding university: ' + error.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Component helpers
  const SectionHeader = ({ title, section, count }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 transition-all"
    >
      <div className="flex items-center gap-3">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {count !== undefined && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      {expandedSections[section] ? 
        <ChevronUp className="w-5 h-5 text-blue-600" /> : 
        <ChevronDown className="w-5 h-5 text-blue-600" />
      }
    </button>
  );

  const QuickActionButton = ({ onClick, icon: Icon, label, variant = 'primary', disabled = false }) => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-700 hover:border-red-800',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700'
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );
  };

  const tabs = [
    { id: 'university', label: 'Basic Info', icon: Building },
    { id: 'accreditations', label: 'Accreditations', icon: Award },
    { id: 'hiring-partners', label: 'Hiring Partners', icon: Briefcase },
    { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
    { id: 'campus-images', label: 'Campus Images', icon: ImageIcon },
    { id: 'benefits', label: 'Benefits', icon: Award },
    { id: 'admission', label: 'Admission', icon: Users },
    { id: 'career-stats', label: 'Career Stats', icon: Briefcase },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'specializations', label: 'Specializations', icon: BookOpen },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              University & Specializations Manager
            </h1>
            <p className="text-gray-600 mt-1">
              Unified management for universities and their course specializations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              Add University
            </button>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mx-6 mt-4 p-4 rounded-lg ${
          message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex h-full">
        {/* Sidebar - Universities List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Universities</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {filteredUniversities.length} of {universities.length}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              Click on a university to manage its details and specializations
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((university) => (
                <div
                  key={university.id}
                  onClick={() => handleUniversitySelect(university)}
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                    selectedUniversity?.id === university.id ? 'bg-blue-100 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 text-sm">{university.name}</h4>
                        {selectedUniversity?.id === university.id && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{university.location}</p>
                      {university.established && (
                        <p className="text-xs text-gray-500">Est. {university.established}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          university.is_active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {university.is_active ? 'Active' : 'Inactive'}
                        </span>
                        {university.rating && (
                          <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                            ⭐ {university.rating}
                          </span>
                        )}
                        {university.nirf_rank && (
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            NIRF #{university.nirf_rank}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No universities found</p>
                <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedUniversity ? (
            <>
              {/* University Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedUniversity.image_url && (
                      <img 
                        src={selectedUniversity.image_url} 
                        alt={selectedUniversity.name}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedUniversity.name}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{selectedUniversity.location}</span>
                        {selectedUniversity.established && <span>Est. {selectedUniversity.established}</span>}
                        {selectedUniversity.rating && (
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            {selectedUniversity.rating}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <QuickActionButton
                      onClick={() => window.open(`/#/university/${selectedUniversity.id}`, '_blank')}
                      icon={ExternalLink}
                      label="View Live"
                      variant="secondary"
                    />
                    <QuickActionButton
                      onClick={() => setEditingUniversity(!editingUniversity)}
                      icon={editingUniversity ? X : Edit2}
                      label={editingUniversity ? 'Cancel' : 'Edit'}
                      variant={editingUniversity ? 'danger' : 'primary'}
                    />
                    <QuickActionButton
                      onClick={deleteUniversity}
                      icon={Trash2}
                      label="Delete University"
                      variant="danger"
                      disabled={saving}
                    />
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-blue-600 font-medium">Courses</div>
                    <div className="text-lg font-bold text-blue-900">{courses.length}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-green-600 font-medium">Specializations</div>
                    <div className="text-lg font-bold text-green-900">{specializations.length}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-xs text-purple-600 font-medium">Accreditations</div>
                    <div className="text-lg font-bold text-purple-900">{selectedAccreditations.length}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xs text-orange-600 font-medium">Status</div>
                    <div className={`text-sm font-bold ${selectedUniversity.is_active ? 'text-green-700' : 'text-red-700'}`}>
                      {selectedUniversity.is_active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white border-b border-gray-200">
                <nav className="flex flex-wrap gap-2 px-6 py-2" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        {tab.id === 'specializations' && courses.length > 0 && (
                          <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full ml-1">
                            {specializations.length}
                          </span>
                        )}
                        {tab.id === 'courses' && courses.length > 0 && (
                          <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full ml-1">
                            {courses.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-6">
                  {activeTab === 'university' && (
                    <UniversityInfoTab 
                      university={selectedUniversity}
                      universityForm={universityForm}
                      setUniversityForm={setUniversityForm}
                      editingUniversity={editingUniversity}
                      saving={saving}
                      onSave={saveUniversityBasicInfo}
                    />
                  )}

                  {activeTab === 'accreditations' && (
                    <AccreditationsTab
                      allAccreditations={allAccreditations}
                      selectedAccreditations={selectedAccreditations}
                      setSelectedAccreditations={setSelectedAccreditations}
                      saving={saving}
                      onSave={saveAccreditations}
                    />
                  )}

                  {activeTab === 'hiring-partners' && (
                    <HiringPartnersTab
                      allHiringPartners={allHiringPartners}
                      selectedHiringPartners={selectedHiringPartners}
                      setSelectedHiringPartners={setSelectedHiringPartners}
                      saving={saving}
                      onSave={saveSelectedHiringPartners}
                    />
                  )}

                  {activeTab === 'courses' && selectedUniversity && (
                    <CoursesTab universityId={selectedUniversity.id} />
                  )}

                  {activeTab === 'campus-images' && (
                    <CampusImagesTab
                      campusImages={campusImages}
                      setCampusImages={setCampusImages}
                      addCampusImage={addCampusImage}
                      saving={saving}
                      onSave={saveCampusImages}
                    />
                  )}

                  {activeTab === 'benefits' && (
                    <BenefitsTab
                      benefits={benefits}
                      setBenefits={setBenefits}
                      addBenefit={addBenefit}
                      saving={saving}
                      onSave={saveBenefits}
                    />
                  )}

                  {activeTab === 'admission' && (
                    <AdmissionTab
                      admissionSteps={admissionSteps}
                      setAdmissionSteps={setAdmissionSteps}
                      addAdmissionStep={addAdmissionStep}
                      saving={saving}
                      onSave={saveAdmissionSteps}
                    />
                  )}

                  {activeTab === 'career-stats' && (
                    <CareerStatsTab
                      careerStats={careerStats}
                      setCareerStats={setCareerStats}
                      addCareerStat={addCareerStat}
                      saving={saving}
                      onSave={saveCareerStats}
                    />
                  )}

                  {activeTab === 'faqs' && (
                    <FAQsTab
                      faqs={faqs}
                      setFaqs={setFaqs}
                      addFaq={addFaq}
                      saving={saving}
                      onSave={saveFaqs}
                    />
                  )}

                  {activeTab === 'specializations' && (
                    <SpecializationsTab
                      courses={courses}
                      selectedCourse={selectedCourse}
                      setSelectedCourse={setSelectedCourse}
                      specializations={specializations}
                      editingSpec={editingSpec}
                      setEditingSpec={setEditingSpec}
                      expandedSections={expandedSections}
                      toggleSection={toggleSection}
                      onSave={handleSaveSpecialization}
                      onDelete={handleDeleteSpecialization}
                      saving={saving}
                      addArrayItem={addArrayItem}
                      removeArrayItem={removeArrayItem}
                      SectionHeader={SectionHeader}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a University</h3>
                <p className="text-gray-600">Choose a university from the sidebar to manage its details and specializations</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add University Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Add New University</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University Name *
                    </label>
                    <input
                      type="text"
                      value={newUniversity.name}
                      onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Harvard University"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University Code
                    </label>
                    <input
                      type="text"
                      value={newUniversity.code}
                      onChange={(e) => setNewUniversity({ ...newUniversity, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., HARV"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={newUniversity.location}
                      onChange={(e) => setNewUniversity({ ...newUniversity, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Cambridge, MA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Established Year
                    </label>
                    <input
                      type="text"
                      value={newUniversity.established}
                      onChange={(e) => setNewUniversity({ ...newUniversity, established: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 1636"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campus Size
                    </label>
                    <input
                      type="text"
                      value={newUniversity.campus_size}
                      onChange={(e) => setNewUniversity({ ...newUniversity, campus_size: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 200 acres"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ranking
                    </label>
                    <input
                      type="text"
                      value={newUniversity.ranking}
                      onChange={(e) => setNewUniversity({ ...newUniversity, ranking: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., #1 in USA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIRF Rank
                    </label>
                    <input
                      type="number"
                      value={newUniversity.nirf_rank}
                      onChange={(e) => setNewUniversity({ ...newUniversity, nirf_rank: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fees
                    </label>
                    <input
                      type="text"
                      value={newUniversity.fees}
                      onChange={(e) => setNewUniversity({ ...newUniversity, fees: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., ₹2,50,000/year"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placement Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newUniversity.placement_rate}
                      onChange={(e) => setNewUniversity({ ...newUniversity, placement_rate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 95"
                    />
                  </div>
                </div>
              </div>

              {/* Images & Media */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Images & Media</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University Logo/Image
                    </label>
                    <input
                      type="url"
                      value={newUniversity.image_url}
                      onChange={(e) => setNewUniversity({ ...newUniversity, image_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Main university image/logo URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Banner Image
                    </label>
                    <input
                      type="url"
                      value={newUniversity.hero_image}
                      onChange={(e) => setNewUniversity({ ...newUniversity, hero_image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Large banner image URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={newUniversity.video_url}
                      onChange={(e) => setNewUniversity({ ...newUniversity, video_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="University video URL"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Rating</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newUniversity.rating}
                    onChange={(e) => setNewUniversity({ ...newUniversity, rating: parseFloat(e.target.value) || 0 })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewUniversity({ ...newUniversity, rating: star })}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-6 h-6 ${
                            star <= (newUniversity.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {(newUniversity.rating || 0).toFixed(1)} / 5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Descriptions</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description
                    </label>
                    <textarea
                      value={newUniversity.description}
                      onChange={(e) => setNewUniversity({ ...newUniversity, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description for cards and listings"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About University
                    </label>
                    <textarea
                      value={newUniversity.about}
                      onChange={(e) => setNewUniversity({ ...newUniversity, about: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Detailed information about the university"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={newUniversity.is_active}
                  onChange={(e) => setNewUniversity({ ...newUniversity, is_active: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleAddUniversity}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 font-medium shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Adding University...' : 'Add University'}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// University Info Tab Component
const UniversityInfoTab = ({ university, universityForm, setUniversityForm, editingUniversity, saving, onSave }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Complete University Information</h3>
        {editingUniversity && (
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University Name *</label>
          <input
            type="text"
            value={universityForm.name || ''}
            onChange={(e) => setUniversityForm({...universityForm, name: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., Harvard University"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">University Code</label>
          <input
            type="text"
            value={universityForm.code || ''}
            onChange={(e) => setUniversityForm({...universityForm, code: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., HARV"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            value={universityForm.location || ''}
            onChange={(e) => setUniversityForm({...universityForm, location: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., Cambridge, MA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
          <input
            type="text"
            value={universityForm.established || ''}
            onChange={(e) => setUniversityForm({...universityForm, established: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., 1636"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campus Size</label>
          <input
            type="text"
            value={universityForm.campus_size || ''}
            onChange={(e) => setUniversityForm({...universityForm, campus_size: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., 200 acres"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ranking</label>
          <input
            type="text"
            value={universityForm.ranking || ''}
            onChange={(e) => setUniversityForm({...universityForm, ranking: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., #1 in USA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NIRF Rank</label>
          <input
            type="number"
            value={universityForm.nirf_rank || ''}
            onChange={(e) => setUniversityForm({...universityForm, nirf_rank: parseInt(e.target.value) || null})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., 15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fees</label>
          <input
            type="text"
            value={universityForm.fees || ''}
            onChange={(e) => setUniversityForm({...universityForm, fees: e.target.value})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., ₹2,50,000/year"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Placement Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={universityForm.placement_rate || ''}
            onChange={(e) => setUniversityForm({...universityForm, placement_rate: parseInt(e.target.value) || null})}
            disabled={!editingUniversity}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            placeholder="e.g., 95"
          />
        </div>

        {/* Images */}
        <div className="lg:col-span-3">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Images & Media</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University Logo/Image</label>
              <input
                type="url"
                value={universityForm.image_url || ''}
                onChange={(e) => setUniversityForm({...universityForm, image_url: e.target.value})}
                disabled={!editingUniversity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Main university image/logo URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Banner Image</label>
              <input
                type="url"
                value={universityForm.hero_image || ''}
                onChange={(e) => setUniversityForm({...universityForm, hero_image: e.target.value})}
                disabled={!editingUniversity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Large banner image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
              <input
                type="url"
                value={universityForm.video_url || ''}
                onChange={(e) => setUniversityForm({...universityForm, video_url: e.target.value})}
                disabled={!editingUniversity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="University video URL"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="lg:col-span-3">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Rating</h4>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={universityForm.rating || 0}
              onChange={(e) => setUniversityForm({...universityForm, rating: parseFloat(e.target.value) || 0})}
              disabled={!editingUniversity}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => editingUniversity && setUniversityForm({...universityForm, rating: star})}
                  disabled={!editingUniversity}
                  className="focus:outline-none disabled:cursor-not-allowed"
                >
                  <svg
                    className={`w-6 h-6 ${
                      star <= (universityForm.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {(universityForm.rating || 0).toFixed(1)} / 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="lg:col-span-3">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Descriptions</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              <textarea
                value={universityForm.description || ''}
                onChange={(e) => setUniversityForm({...universityForm, description: e.target.value})}
                disabled={!editingUniversity}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Brief description for cards and listings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About University</label>
              <textarea
                value={universityForm.about || ''}
                onChange={(e) => setUniversityForm({...universityForm, about: e.target.value})}
                disabled={!editingUniversity}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Detailed information about the university"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="lg:col-span-3 flex items-center gap-4 pt-4 border-t border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={universityForm.is_active || false}
              onChange={(e) => setUniversityForm({...universityForm, is_active: e.target.checked})}
              disabled={!editingUniversity}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <span className="text-sm font-medium text-gray-700">Active (visible on website)</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);
// Specializations Tab Component
const SpecializationsTab = ({ 
  courses, selectedCourse, setSelectedCourse, specializations, 
  editingSpec, setEditingSpec, expandedSections, toggleSection,
  onSave, onDelete, saving, addArrayItem, removeArrayItem, SectionHeader 
}) => (
  <div className="space-y-6">
    {/* Course Selection */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Course</h3>
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                selectedCourse === course.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-sm mb-1">{course.course_name}</div>
              {course.description && (
                <div className="text-xs text-gray-500 line-clamp-2">
                  {course.description}
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  {course.duration || 'Duration not set'}
                </span>
                {selectedCourse === course.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No courses available for this university</p>
        </div>
      )}

      {selectedCourse && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">
              Selected: {courses.find(c => c.id === selectedCourse)?.course_name}
            </span>
          </div>
        </div>
      )}
    </div>

    {/* Add New Specialization Button */}
    {selectedCourse && !editingSpec && (
      <div className="flex justify-end">
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
            specialization_program_highlights: [],
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
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Specialization
        </button>
      </div>
    )}

    {/* Specialization Form */}
    {editingSpec && (
      <SpecializationForm 
        editingSpec={editingSpec}
        setEditingSpec={setEditingSpec}
        expandedSections={expandedSections}
        SectionHeader={SectionHeader}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        onSave={onSave}
        saving={saving}
      />
    )}

    {/* Specializations List */}
    {selectedCourse && !editingSpec && (
      <SpecializationsList 
        specializations={specializations}
        onEdit={setEditingSpec}
        onDelete={onDelete}
      />
    )}
  </div>
);
// Specialization Form Component
const SpecializationForm = ({ 
  editingSpec, setEditingSpec, expandedSections, SectionHeader, 
  addArrayItem, removeArrayItem, onSave, saving 
}) => {
  const [activeSection, setActiveSection] = React.useState('basic');

  const menuItems = [
    { id: 'basic', label: 'Basic Information', icon: '📝' },
    { id: 'overview', label: 'Program Overview', icon: '📋' },
    { id: 'industry', label: 'Industry Insight', icon: '📊' },
    { id: 'programHighlights', label: 'Program Highlights', icon: '🏆' },
    { id: 'highlights', label: 'Core Features', icon: '⭐' },
    { id: 'curriculum', label: 'Course Curriculum', icon: '📚' },
    { id: 'career', label: 'Career Paths', icon: '🚀' },
    { id: 'support', label: 'Support & Alumni', icon: '🤝' },
    { id: 'levels', label: 'Career Levels', icon: '📈' }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {editingSpec.id ? 'Edit Specialization' : 'New Specialization'}
          </h3>
          <div className="flex gap-3">
            <button
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 shadow-lg"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Specialization'}
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
      </div>

      {/* Main Content Area */}
      <div className="flex min-h-[600px]">
        {/* Sidebar Menu */}
        <div className="w-64 bg-white border-r border-blue-200 p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto max-h-[600px]">

          {/* Basic Information */}
          {activeSection === 'basic' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📝 Basic Information
              </h4>
              <div className="bg-white p-6 rounded-lg space-y-4 shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization Name *
                    </label>
                    <input
                      type="text"
                      value={editingSpec.name}
                      onChange={(e) => setEditingSpec({ ...editingSpec, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., MBA in Finance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={editingSpec.duration || ''}
                      onChange={(e) => setEditingSpec({ ...editingSpec, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2 Years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fees</label>
                    <input
                      type="text"
                      value={editingSpec.fees || ''}
                      onChange={(e) => setEditingSpec({ ...editingSpec, fees: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., ₹5,00,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={editingSpec.display_order || 0}
                      onChange={(e) => setEditingSpec({ ...editingSpec, display_order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingSpec.description || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                  <input
                    type="text"
                    value={editingSpec.eligibility || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, eligibility: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor's degree with 50% marks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingSpec.image_url || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-6">
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
            </div>
          )}

          {/* Program Overview */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📋 Program Overview
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <textarea
                  value={editingSpec.program_overview || ''}
                  onChange={(e) => setEditingSpec({ ...editingSpec, program_overview: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed program overview..."
                />
              </div>
            </div>
          )}

          {/* Industry Insight */}
          {activeSection === 'industry' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📊 Industry Insight
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={editingSpec.industry_insight_title || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, industry_insight_title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Industry Insight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={editingSpec.industry_insight_content || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, industry_insight_content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Industry insight content..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Statistics</label>
                    <button
                      type="button"
                      onClick={() => addArrayItem('industry_insight_stats', { label: '', value: '' })}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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
            </div>
          )}

          {/* Program Highlights with Images */}
          {activeSection === 'programHighlights' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                🏆 Program Highlights (With Images)
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    💡 Add specialization-specific highlights with images (certifications, tools, partnerships, etc.)
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Highlights with Images</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('specialization_program_highlights', { title: '', description: '', image_url: '' })}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    + Add Highlight
                  </button>
                </div>
                {(Array.isArray(editingSpec.specialization_program_highlights) ? editingSpec.specialization_program_highlights : []).map((highlight, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Highlight {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('specialization_program_highlights', idx)}
                        className="text-red-600 hover:bg-red-50 rounded p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={highlight.title || ''}
                      onChange={(e) => {
                        const highlights = [...(editingSpec.specialization_program_highlights || [])];
                        highlights[idx] = { ...highlights[idx], title: e.target.value };
                        setEditingSpec({ ...editingSpec, specialization_program_highlights: highlights });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Title (e.g., CFA Level 1 Prep)"
                    />
                    <textarea
                      value={highlight.description || ''}
                      onChange={(e) => {
                        const highlights = [...(editingSpec.specialization_program_highlights || [])];
                        highlights[idx] = { ...highlights[idx], description: e.target.value };
                        setEditingSpec({ ...editingSpec, specialization_program_highlights: highlights });
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Description"
                    />
                    <input
                      type="url"
                      value={highlight.image_url || ''}
                      onChange={(e) => {
                        const highlights = [...(editingSpec.specialization_program_highlights || [])];
                        highlights[idx] = { ...highlights[idx], image_url: e.target.value };
                        setEditingSpec({ ...editingSpec, specialization_program_highlights: highlights });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Image URL (logo/badge)"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core of Specialization */}
          {activeSection === 'highlights' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                ⭐ Core Features
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Core Features</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('program_highlights', { title: '', description: '' })}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    + Add Core Feature
                  </button>
                </div>
                {(Array.isArray(editingSpec.program_highlights) ? editingSpec.program_highlights : []).map((highlight, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Core Feature {idx + 1}</span>
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
                      placeholder="Title (e.g., Advanced Financial Modeling)"
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
            </div>
          )}

          {/* Curriculum Section */}
          {activeSection === 'curriculum' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📚 Course Curriculum ({editingSpec.curriculum?.length || 0} semesters)
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                  <p className="text-sm text-blue-800 font-semibold mb-2">
                    📚 Specialization Curriculum (Semester 3+):
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                    <li><strong>Foundation (Semester 1 & 2):</strong> Already defined at course level - same for all specializations</li>
                    <li><strong>Specialization (Semester 3+):</strong> Add advanced courses specific to THIS specialization</li>
                    <li>Start numbering from Semester 3 since foundation semesters are handled at course level</li>
                    <li>Focus on specialization-specific subjects, electives, and advanced topics</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Semesters</label>
                  <button
                    type="button"
                    onClick={() => {
                      const currentCount = editingSpec.curriculum?.length || 0;
                      const semesterNumber = currentCount + 3; // Start from semester 3
                      addArrayItem('curriculum', { 
                        semester: `SEM ${semesterNumber}`, 
                        description: `Specialization Semester ${semesterNumber}`, 
                        subjects: [] 
                      });
                    }}
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
                      placeholder="Semester Name (e.g., SEM 3, SEM 4)"
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
            </div>
          )}

          {/* Career Paths */}
          {activeSection === 'career' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                🚀 Career Paths
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Career Options</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('career_paths', { title: '', description: '', salary_range: '' })}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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
            </div>
          )}

          {/* Support & Alumni */}
          {activeSection === 'support' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                🤝 Support & Alumni
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Career Support</label>
                  <textarea
                    value={editingSpec.career_support || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, career_support: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Career support information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alumni Network</label>
                  <textarea
                    value={editingSpec.alumni_network || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, alumni_network: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Alumni network information..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Career Level Information */}
          {activeSection === 'levels' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📈 Career Level Information
              </h4>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 border">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entry Level</label>
                  <textarea
                    value={editingSpec.entry_level_info || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, entry_level_info: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Entry level career information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mid Level</label>
                  <textarea
                    value={editingSpec.mid_level_info || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, mid_level_info: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Mid level career information..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senior Level</label>
                  <textarea
                    value={editingSpec.senior_level_info || ''}
                    onChange={(e) => setEditingSpec({ ...editingSpec, senior_level_info: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Senior level career information..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// Specializations List Component
const SpecializationsList = ({ specializations, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold mb-4">
      Specializations ({specializations.length})
    </h3>

    {specializations.length > 0 ? (
      <div className="space-y-3">
        {specializations.map((spec) => (
          <div
            key={spec.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-gray-900">{spec.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  spec.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {spec.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                {spec.duration && <span>Duration: {spec.duration}</span>}
                {spec.fees && <span>Fees: {spec.fees}</span>}
                <span>Order: {spec.display_order}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
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

                  const normalizedSpec = {
                    ...spec,
                    industry_insight_stats: Array.isArray(parseField(spec.industry_insight_stats)) ? parseField(spec.industry_insight_stats) : [],
                    specialization_program_highlights: Array.isArray(parseField(spec.specialization_program_highlights)) ? parseField(spec.specialization_program_highlights) : [],
                    program_highlights: Array.isArray(parseField(spec.program_highlights)) ? parseField(spec.program_highlights) : [],
                    curriculum: Array.isArray(parseField(spec.curriculum)) 
                      ? parseField(spec.curriculum).map(sem => ({
                          semester: sem.semester || '',
                          description: sem.description || '',
                          subjects: Array.isArray(sem.subjects) ? sem.subjects : []
                        }))
                      : [],
                    career_paths: Array.isArray(parseField(spec.career_paths)) ? parseField(spec.career_paths) : [],
                    core_subjects: Array.isArray(parseField(spec.core_subjects)) ? parseField(spec.core_subjects) : [],
                    elective_subjects: Array.isArray(parseField(spec.elective_subjects)) ? parseField(spec.elective_subjects) : []
                  };
                  onEdit(normalizedSpec);
                }}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => onDelete(spec.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No specializations added yet. Click "Add New Specialization" to get started.</p>
      </div>
    )}
  </div>
);
// Accreditations Tab Component
const AccreditationsTab = ({ allAccreditations, selectedAccreditations, setSelectedAccreditations, saving, onSave }) => {
  const toggleAccreditation = (accreditation) => {
    const isSelected = selectedAccreditations.some(item => 
      (item.accreditation_id || item.accreditation?.id) === accreditation.id
    );
    
    if (isSelected) {
      setSelectedAccreditations(selectedAccreditations.filter(item => 
        (item.accreditation_id || item.accreditation?.id) !== accreditation.id
      ));
    } else {
      setSelectedAccreditations([...selectedAccreditations, {
        accreditation_id: accreditation.id,
        accreditation: accreditation,
        display_order: selectedAccreditations.length + 1
      }]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">University Accreditations</h3>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Available Accreditations</h4>
          <p className="text-sm text-gray-600 mb-4">Select the accreditations that this university has:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allAccreditations.map((accreditation) => {
              const isSelected = selectedAccreditations.some(item => 
                (item.accreditation_id || item.accreditation?.id) === accreditation.id
              );
              
              return (
                <div
                  key={accreditation.id}
                  onClick={() => toggleAccreditation(accreditation)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{accreditation.name}</p>
                      {accreditation.full_name && (
                        <p className="text-xs text-gray-600">{accreditation.full_name}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {selectedAccreditations.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Selected Accreditations ({selectedAccreditations.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedAccreditations.map((item, index) => {
                const accreditation = item.accreditation || allAccreditations.find(a => a.id === item.accreditation_id);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded border flex items-center justify-center">
                        {accreditation?.logo_url ? (
                          <img 
                            src={accreditation.logo_url} 
                            alt={accreditation.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-600">
                            {accreditation?.name?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{accreditation?.name}</p>
                        {accreditation?.full_name && (
                          <p className="text-xs text-gray-600">{accreditation.full_name}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAccreditation(accreditation)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Hiring Partners Tab Component
const HiringPartnersTab = ({ allHiringPartners, selectedHiringPartners, setSelectedHiringPartners, saving, onSave }) => {
  const toggleHiringPartner = (partner) => {
    const isSelected = selectedHiringPartners.some(item => 
      (item.hiring_partner_id || item.hiring_partner?.id) === partner.id
    );
    
    if (isSelected) {
      setSelectedHiringPartners(selectedHiringPartners.filter(item => 
        (item.hiring_partner_id || item.hiring_partner?.id) !== partner.id
      ));
    } else {
      setSelectedHiringPartners([...selectedHiringPartners, {
        hiring_partner_id: partner.id,
        hiring_partner: partner,
        display_order: selectedHiringPartners.length + 1
      }]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Hiring Partners</h3>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Available Hiring Partners</h4>
          <p className="text-sm text-gray-600 mb-4">Select the companies that hire from this university:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allHiringPartners.map((partner) => {
              const isSelected = selectedHiringPartners.some(item => 
                (item.hiring_partner_id || item.hiring_partner?.id) === partner.id
              );
              
              return (
                <div
                  key={partner.id}
                  onClick={() => toggleHiringPartner(partner)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{partner.name}</p>
                      {partner.industry && (
                        <p className="text-xs text-gray-600">{partner.industry}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {selectedHiringPartners.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Selected Hiring Partners ({selectedHiringPartners.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedHiringPartners.map((item, index) => {
                const partner = item.hiring_partner || allHiringPartners.find(p => p.id === item.hiring_partner_id);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded border flex items-center justify-center">
                        {partner?.logo_url ? (
                          <img 
                            src={partner.logo_url} 
                            alt={partner.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-600">
                            {partner?.name?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{partner?.name}</p>
                        {partner?.industry && (
                          <p className="text-xs text-gray-600">{partner.industry}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleHiringPartner(partner)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedUniversitySpecializationsManager;
// Courses Tab Component - Full Course Management
const CoursesTab = ({ universityId }) => {
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
    program_highlights: [],
    foundation_curriculum: [
      { semester: 'SEM 1', description: 'Foundation Semester 1', subjects: [] },
      { semester: 'SEM 2', description: 'Foundation Semester 2', subjects: [] }
    ]
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
      program_highlights: [],
      foundation_curriculum: [
        { semester: 'SEM 1', description: 'Foundation Semester 1', subjects: [] },
        { semester: 'SEM 2', description: 'Foundation Semester 2', subjects: [] }
      ]
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
      program_highlights: course.program_highlights || [],
      foundation_curriculum: course.foundation_curriculum || [
        { semester: 'SEM 1', description: 'Foundation Semester 1', subjects: [] },
        { semester: 'SEM 2', description: 'Foundation Semester 2', subjects: [] }
      ]
    });
    setEditingId(course.id);
  };

  const handleSave = async () => {
    if (!formData.course_name.trim()) {
      alert('Course name is required');
      return;
    }

    // Debug: Log foundation curriculum data
    console.log('Foundation Curriculum Data:', formData.foundation_curriculum);

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
        program_highlights: formData.program_highlights || [],
        foundation_curriculum: formData.foundation_curriculum || []
      };

      // Debug: Log the complete courseData being saved
      console.log('Complete Course Data being saved:', courseData);

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
        console.log('Updated course data:', data);
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
        console.log('Inserted course data:', data);
        alert('Course added successfully!');
      }

      resetForm();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course: ' + error.message);
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

  const addHighlight = () => {
    setFormData({
      ...formData,
      program_highlights: [...formData.program_highlights, '']
    });
  };

  const updateHighlight = (index, value) => {
    const highlights = [...formData.program_highlights];
    highlights[index] = value;
    setFormData({ ...formData, program_highlights: highlights });
  };

  const removeHighlight = (index) => {
    const highlights = formData.program_highlights.filter((_, i) => i !== index);
    setFormData({ ...formData, program_highlights: highlights });
  };

  // Foundation Curriculum Management Functions
  const addSubjectToFoundationSemester = (semesterIndex) => {
    const curriculum = [...formData.foundation_curriculum];
    curriculum[semesterIndex].subjects = [...curriculum[semesterIndex].subjects, ''];
    setFormData({ ...formData, foundation_curriculum: curriculum });
  };

  const updateFoundationSubject = (semesterIndex, subjectIndex, value) => {
    const curriculum = [...formData.foundation_curriculum];
    curriculum[semesterIndex].subjects[subjectIndex] = value;
    setFormData({ ...formData, foundation_curriculum: curriculum });
  };

  const removeFoundationSubject = (semesterIndex, subjectIndex) => {
    const curriculum = [...formData.foundation_curriculum];
    curriculum[semesterIndex].subjects.splice(subjectIndex, 1);
    setFormData({ ...formData, foundation_curriculum: curriculum });
  };

  const updateFoundationSemesterDescription = (semesterIndex, description) => {
    const curriculum = [...formData.foundation_curriculum];
    curriculum[semesterIndex].description = description;
    setFormData({ ...formData, foundation_curriculum: curriculum });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingId ? 'Edit Course' : 'Add New Course'}
          </h3>
          <div className="flex gap-2">
            {editingId && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : (editingId ? 'Update' : 'Add Course')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
            <input
              type="text"
              value={formData.course_name}
              onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., MBA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2 Years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fees</label>
            <input
              type="text"
              value={formData.fees}
              onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., ₹5,00,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Course image URL"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Course description"
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Program Highlights</label>
              <button
                type="button"
                onClick={addHighlight}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add Highlight
              </button>
            </div>
            {formData.program_highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                  placeholder={`Highlight ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Foundation Curriculum (Semester 1 & 2) */}
          <div className="md:col-span-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                📚 Foundation Curriculum (Semester 1 & 2)
              </h4>
              <p className="text-sm text-blue-700">
                These foundation semesters will be the same for ALL specializations of this course. 
                Specialization-specific curriculum starts from Semester 3.
              </p>
            </div>

            {formData.foundation_curriculum.map((semester, semesterIndex) => (
              <div key={semesterIndex} className="border border-gray-300 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-900">{semester.semester}</h5>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={semester.description}
                    onChange={(e) => updateFoundationSemesterDescription(semesterIndex, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Semester description"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Subjects</label>
                    <button
                      type="button"
                      onClick={() => addSubjectToFoundationSemester(semesterIndex)}
                      className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      <Plus className="w-3 h-3" />
                      Add Subject
                    </button>
                  </div>
                  
                  {semester.subjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => updateFoundationSubject(semesterIndex, subjectIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                        placeholder={`Subject ${subjectIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFoundationSubject(semesterIndex, subjectIndex)}
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
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          University Courses ({courses.length})
        </h3>

        {courses.length > 0 ? (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{course.course_name}</h4>
                    {course.description && (
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    )}
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      {course.duration && <span>Duration: {course.duration}</span>}
                      {course.fees && <span>Fees: {course.fees}</span>}
                    </div>
                    {course.program_highlights && course.program_highlights.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Highlights: </span>
                        <span className="text-xs text-gray-600">
                          {course.program_highlights.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No courses added yet. Add your first course above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Campus Images Tab Component
const CampusImagesTab = ({ campusImages, setCampusImages, addCampusImage, saving, onSave }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Campus Images</h3>
        <div className="flex gap-2">
          <button
            onClick={addCampusImage}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {campusImages.map((image, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={image.image_url}
                  onChange={(e) => {
                    const newImages = [...campusImages];
                    newImages[index].image_url = e.target.value;
                    setCampusImages(newImages);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <input
                  type="text"
                  value={image.caption}
                  onChange={(e) => {
                    const newImages = [...campusImages];
                    newImages[index].caption = e.target.value;
                    setCampusImages(newImages);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const newImages = campusImages.filter((_, i) => i !== index);
                    setCampusImages(newImages);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Benefits Tab Component
const BenefitsTab = ({ benefits, setBenefits, addBenefit, saving, onSave }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">University Benefits</h3>
        <div className="flex gap-2">
          <button
            onClick={addBenefit}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Benefit
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
                <input
                  type="number"
                  value={benefit.benefit_number}
                  onChange={(e) => {
                    const newBenefits = [...benefits];
                    newBenefits[index].benefit_number = parseInt(e.target.value);
                    setBenefits(newBenefits);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={benefit.title}
                  onChange={(e) => {
                    const newBenefits = [...benefits];
                    newBenefits[index].title = e.target.value;
                    setBenefits(newBenefits);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={benefit.description}
                  onChange={(e) => {
                    const newBenefits = [...benefits];
                    newBenefits[index].description = e.target.value;
                    setBenefits(newBenefits);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const newBenefits = benefits.filter((_, i) => i !== index);
                    setBenefits(newBenefits);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
// Admission Tab Component
const AdmissionTab = ({ admissionSteps, setAdmissionSteps, addAdmissionStep, saving, onSave }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Admission Process</h3>
        <div className="flex gap-2">
          <button
            onClick={addAdmissionStep}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Step
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {admissionSteps.map((step, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Step #</label>
                <input
                  type="number"
                  value={step.step_number}
                  onChange={(e) => {
                    const newSteps = [...admissionSteps];
                    newSteps[index].step_number = parseInt(e.target.value);
                    setAdmissionSteps(newSteps);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const newSteps = [...admissionSteps];
                    newSteps[index].title = e.target.value;
                    setAdmissionSteps(newSteps);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={step.subtitle || ''}
                  onChange={(e) => {
                    const newSteps = [...admissionSteps];
                    newSteps[index].subtitle = e.target.value;
                    setAdmissionSteps(newSteps);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={step.description || ''}
                  onChange={(e) => {
                    const newSteps = [...admissionSteps];
                    newSteps[index].description = e.target.value;
                    setAdmissionSteps(newSteps);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const newSteps = admissionSteps.filter((_, i) => i !== index);
                    setAdmissionSteps(newSteps);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Career Stats Tab Component
const CareerStatsTab = ({ careerStats, setCareerStats, addCareerStat, saving, onSave }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Career & Placement Stats</h3>
        <div className="flex gap-2">
          <button
            onClick={addCareerStat}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add Stat
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {careerStats.map((stat, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                <input
                  type="text"
                  value={stat.stat_label}
                  onChange={(e) => {
                    const newStats = [...careerStats];
                    newStats[index].stat_label = e.target.value;
                    setCareerStats(newStats);
                  }}
                  placeholder="e.g., Placement Rate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                <input
                  type="text"
                  value={stat.stat_value}
                  onChange={(e) => {
                    const newStats = [...careerStats];
                    newStats[index].stat_value = e.target.value;
                    setCareerStats(newStats);
                  }}
                  placeholder="e.g., 90%+"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const newStats = careerStats.filter((_, i) => i !== index);
                    setCareerStats(newStats);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
// FAQs Tab Component - Full FAQ Management
const FAQsTab = ({ faqs, setFaqs, addFaq, saving, onSave }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">University FAQs</h3>
          <p className="text-sm text-gray-600">Manage frequently asked questions for this university</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addFaq}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save FAQs'}
          </button>
        </div>
      </div>
      
      {faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">FAQ {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newFaqs = faqs.filter((_, i) => i !== index);
                      setFaqs(newFaqs);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <input
                    type="text"
                    value={faq.question || ''}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index] = { ...newFaqs[index], question: e.target.value };
                      setFaqs(newFaqs);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the frequently asked question"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                  <textarea
                    value={faq.answer || ''}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index] = { ...newFaqs[index], answer: e.target.value };
                      setFaqs(newFaqs);
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the answer to this question"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Index</label>
                  <input
                    type="number"
                    value={faq.order_index || index + 1}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index] = { ...newFaqs[index], order_index: parseInt(e.target.value) || index + 1 };
                      setFaqs(newFaqs);
                    }}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No FAQs added yet. Click "Add FAQ" to get started.</p>
        </div>
      )}
    </div>
  </div>
);
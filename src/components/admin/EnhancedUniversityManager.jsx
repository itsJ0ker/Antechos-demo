import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Video,
  Award,
  Users,
  Briefcase,
  HelpCircle,
  MapPin,
  Building,
  BookOpen,
} from 'lucide-react';
import UniversityCoursesManager from './UniversityCoursesManager';
import UniversityFAQManager from './UniversityFAQManager';

const EnhancedUniversityManager = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add University Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUniversity, setNewUniversity] = useState({
    name: '',
    code: '',
    location: '',
    description: '',
    about: '',
    image_url: '',
    established: '',
    campus_size: '',
    ranking: '',
    fees: '',
    is_active: true
  });

  // Form states for different sections
  const [basicInfo, setBasicInfo] = useState({});
  const [campusImages, setCampusImages] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [careerStats, setCareerStats] = useState([]);
  const [hiringPartners, setHiringPartners] = useState([]);
  const [selectedAccreditations, setSelectedAccreditations] = useState([]);
  const [allAccreditations, setAllAccreditations] = useState([]);

  useEffect(() => {
    fetchUniversities();
    fetchAllAccreditations();
  }, []);

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

  const fetchUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setUniversities(data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversityDetails = async (universityId) => {
    try {
      const { data: university, error: uniError } = await supabase
        .from('universities')
        .select('*')
        .eq('id', universityId)
        .single();
      
      if (uniError) throw uniError;
      setBasicInfo(university);

      const { data: images } = await supabase
        .from('university_campus_images')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setCampusImages(images || []);

      const { data: benefitsData } = await supabase
        .from('university_benefits')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setBenefits(benefitsData || []);

      const { data: stepsData } = await supabase
        .from('university_admission_steps')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setAdmissionSteps(stepsData || []);

      const { data: statsData } = await supabase
        .from('university_career_stats')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setCareerStats(statsData || []);

      const { data: partnersData } = await supabase
        .from('university_hiring_partners')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order');
      setHiringPartners(partnersData || []);

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

    } catch (error) {
      console.error('Error fetching university details:', error);
    }
  };

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    fetchUniversityDetails(university.id);
  };

  const saveBasicInfo = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('universities')
        .update(basicInfo)
        .eq('id', selectedUniversity.id);
      
      if (error) throw error;
      alert('Basic information updated successfully!');
    } catch (error) {
      console.error('Error updating basic info:', error);
      alert('Error updating basic information');
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
      alert('Campus images updated successfully!');
    } catch (error) {
      console.error('Error updating campus images:', error);
      alert('Error updating campus images');
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
      alert('Benefits updated successfully!');
    } catch (error) {
      console.error('Error updating benefits:', error);
      alert('Error updating benefits');
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
      alert('Admission steps updated successfully!');
    } catch (error) {
      console.error('Error updating admission steps:', error);
      alert('Error updating admission steps');
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
      alert('Career stats updated successfully!');
    } catch (error) {
      console.error('Error updating career stats:', error);
      alert('Error updating career stats');
    } finally {
      setSaving(false);
    }
  };

  const saveHiringPartners = async () => {
    if (!selectedUniversity) return;
    setSaving(true);
    try {
      await supabase.from('university_hiring_partners').delete().eq('university_id', selectedUniversity.id);
      if (hiringPartners.length > 0) {
        const { error } = await supabase.from('university_hiring_partners')
          .insert(hiringPartners.map(p => ({ ...p, university_id: selectedUniversity.id })));
        if (error) throw error;
      }
      alert('Hiring partners updated successfully!');
    } catch (error) {
      console.error('Error updating hiring partners:', error);
      alert('Error updating hiring partners');
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
      alert('Accreditations updated successfully!');
    } catch (error) {
      console.error('Error updating accreditations:', error);
      alert('Error updating accreditations');
    } finally {
      setSaving(false);
    }
  };

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

  const addHiringPartner = () => {
    setHiringPartners([...hiringPartners, { partner_name: '', logo_url: '', website_url: '', display_order: hiringPartners.length + 1 }]);
  };

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

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Building },
    { id: 'accreditations', label: 'Accreditations', icon: Award },
    { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
    { id: 'images', label: 'Campus Images', icon: ImageIcon },
    { id: 'benefits', label: 'Benefits', icon: Award },
    { id: 'admission', label: 'Admission', icon: Users },
    { id: 'career', label: 'Career Stats', icon: Briefcase },
    { id: 'partners', label: 'Partners', icon: Building },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const handleAddUniversity = async () => {
    if (!newUniversity.name || !newUniversity.location) {
      alert('Name and location are required');
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('universities')
        .insert([newUniversity])
        .select()
        .single();

      if (error) throw error;

      alert('University added successfully!');
      setShowAddModal(false);
      setNewUniversity({
        name: '',
        code: '',
        location: '',
        description: '',
        about: '',
        image_url: '',
        established: '',
        campus_size: '',
        ranking: '',
        fees: '',
        is_active: true
      });
      fetchUniversities();
      setSelectedUniversity(data);
      fetchUniversityDetails(data.id);
    } catch (error) {
      console.error('Error adding university:', error);
      alert('Error adding university: ' + error.message);
    } finally {
      setSaving(false);
    }
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
        <h2 className="text-2xl font-bold text-gray-900">Enhanced University Manager</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add University
        </button>
      </div>

      {/* Add University Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Add New University</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newUniversity.image_url}
                    onChange={(e) => setNewUniversity({ ...newUniversity, image_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  value={newUniversity.description}
                  onChange={(e) => setNewUniversity({ ...newUniversity, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description..."
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
                  placeholder="Detailed information about the university..."
                />
              </div>

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

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddUniversity}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 font-medium shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Adding...' : 'Add University'}
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Universities</h3>
              <span className="text-xs text-gray-500">{universities.length} total</span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {universities.map((university) => (
                <div
                  key={university.id}
                  onClick={() => handleUniversitySelect(university)}
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                    selectedUniversity?.id === university.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <h4 className="font-medium text-gray-900 text-sm">{university.name}</h4>
                  <p className="text-xs text-gray-600">{university.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {selectedUniversity ? (
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                      <button
                        onClick={saveBasicInfo}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                        <input
                          type="text"
                          value={basicInfo.name || ''}
                          onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={basicInfo.location || ''}
                          onChange={(e) => setBasicInfo({...basicInfo, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                        <input
                          type="url"
                          value={basicInfo.hero_image || ''}
                          onChange={(e) => setBasicInfo({...basicInfo, hero_image: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">NIRF Rank</label>
                        <input
                          type="number"
                          value={basicInfo.nirf_rank || ''}
                          onChange={(e) => setBasicInfo({...basicInfo, nirf_rank: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                        <input
                          type="url"
                          value={basicInfo.video_url || ''}
                          onChange={(e) => setBasicInfo({...basicInfo, video_url: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Placement Rate (%)</label>
                        <input
                          type="number"
                          value={basicInfo.placement_rate || ''}
                          onChange={(e) => setBasicInfo({...basicInfo, placement_rate: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">About University</label>
                      <textarea
                        value={basicInfo.about || ''}
                        onChange={(e) => setBasicInfo({...basicInfo, about: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'accreditations' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">University Accreditations</h3>
                      <button
                        onClick={saveAccreditations}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
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
                )}

                {activeTab === 'courses' && selectedUniversity && (
                  <UniversityCoursesManager universityId={selectedUniversity.id} />
                )}

                {activeTab === 'images' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
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
                          onClick={saveCampusImages}
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
                )}

                {activeTab === 'benefits' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
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
                          onClick={saveBenefits}
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
                )}

                {activeTab === 'admission' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
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
                          onClick={saveAdmissionSteps}
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
                )}

                {activeTab === 'career' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
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
                          onClick={saveCareerStats}
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
                )}

                {activeTab === 'partners' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Hiring Partners</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={addHiringPartner}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Plus className="w-4 h-4" />
                          Add Partner
                        </button>
                        <button
                          onClick={saveHiringPartners}
                          disabled={saving}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {hiringPartners.map((partner, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
                              <input
                                type="text"
                                value={partner.partner_name}
                                onChange={(e) => {
                                  const newPartners = [...hiringPartners];
                                  newPartners[index].partner_name = e.target.value;
                                  setHiringPartners(newPartners);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                              <input
                                type="url"
                                value={partner.logo_url}
                                onChange={(e) => {
                                  const newPartners = [...hiringPartners];
                                  newPartners[index].logo_url = e.target.value;
                                  setHiringPartners(newPartners);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                              <input
                                type="url"
                                value={partner.website_url || ''}
                                onChange={(e) => {
                                  const newPartners = [...hiringPartners];
                                  newPartners[index].website_url = e.target.value;
                                  setHiringPartners(newPartners);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="flex items-end">
                              <button
                                onClick={() => {
                                  const newPartners = hiringPartners.filter((_, i) => i !== index);
                                  setHiringPartners(newPartners);
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
                )}

                {activeTab === 'faqs' && selectedUniversity && (
                  <UniversityFAQManager universityId={selectedUniversity.id} />
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a University</h3>
              <p className="text-gray-600">Choose a university from the list to manage its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedUniversityManager;

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2, Edit2, MoveUp, MoveDown } from 'lucide-react';

const UniversityPageManager = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const tabs_list = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Stats Section' },
    { id: 'tabs', label: 'Navigation Tabs' },
    { id: 'featured', label: 'Featured Courses' },
    { id: 'explore', label: 'Universities to Explore' },
    { id: 'discover', label: 'Discover Courses' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'cta', label: 'Talk to Expert' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'info', label: 'Info' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">University Page Manager</h2>

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs_list.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'hero' && <HeroSection showMessage={showMessage} />}
        {activeTab === 'stats' && <StatsSection showMessage={showMessage} />}
        {activeTab === 'tabs' && <TabsSection showMessage={showMessage} />}
        {activeTab === 'featured' && <FeaturedCoursesSection showMessage={showMessage} />}
        {activeTab === 'explore' && <ExploreSection showMessage={showMessage} />}
        {activeTab === 'discover' && <DiscoverSection showMessage={showMessage} />}
        {activeTab === 'testimonials' && <TestimonialsSection showMessage={showMessage} />}
        {activeTab === 'cta' && <CTASection showMessage={showMessage} />}
        {activeTab === 'blogs' && <BlogsSection showMessage={showMessage} />}
        {activeTab === 'info' && <InfoSection />}
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ showMessage }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_hero').select('*').maybeSingle();
    setFormData(data || { is_active: true, overlay_opacity: 0.5 });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        const { error } = await supabase.from('university_page_hero').update(formData).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('university_page_hero').insert([formData]);
        if (error) throw error;
      }
      showMessage('success', 'Hero section saved!');
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Hero Section</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Discover Your Future with Top Universities"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Subtitle</label>
        <textarea
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full p-2 border rounded"
          rows="2"
          placeholder="Explore world-class programs and transform your career"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Background Image URL</label>
        <input
          type="text"
          value={formData.background_image || ''}
          onChange={(e) => setFormData({ ...formData, background_image: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CTA Button Text</label>
        <input
          type="text"
          value={formData.cta_text || ''}
          onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Explore Programs"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CTA Button Link</label>
        <input
          type="text"
          value={formData.cta_link || ''}
          onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="/courses"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Hero Section'}
      </button>
    </div>
  );
};

// Stats Section Component
const StatsSection = ({ showMessage }) => {
  const [stats, setStats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_stats').select('*').order('display_order');
    setStats(data || []);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await supabase.from('university_page_stats').update(formData).eq('id', editingItem.id);
      } else {
        await supabase.from('university_page_stats').insert([{ ...formData, display_order: stats.length }]);
      }
      showMessage('success', 'Stat saved!');
      setShowForm(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this stat?')) return;
    await supabase.from('university_page_stats').delete().eq('id', id);
    showMessage('success', 'Stat deleted!');
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Stats Section (Below Hero)</h3>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            setFormData({ is_active: true, icon_type: 'students', background_color: '#EFF6FF', text_color: '#2563EB' });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Stat
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Stat Number</label>
              <input
                type="text"
                value={formData.stat_number || ''}
                onChange={(e) => setFormData({ ...formData, stat_number: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="1200+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stat Label</label>
              <input
                type="text"
                value={formData.stat_label || ''}
                onChange={(e) => setFormData({ ...formData, stat_label: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Active Students"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Icon Type</label>
              <select
                value={formData.icon_type || 'students'}
                onChange={(e) => setFormData({ ...formData, icon_type: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="students">Students</option>
                <option value="faculty">Faculty</option>
                <option value="courses">Courses</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <input
                type="color"
                value={formData.background_color || '#EFF6FF'}
                onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Text Color</label>
              <input
                type="color"
                value={formData.text_color || '#2563EB'}
                onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2 flex gap-2">
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item) => (
          <div 
            key={item.id} 
            className="p-4 border rounded-lg"
            style={{ backgroundColor: item.background_color + '20' }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-3xl font-bold" style={{ color: item.text_color }}>{item.stat_number}</p>
                <p className="text-sm text-gray-600">{item.stat_label}</p>
                <p className="text-xs text-gray-500 mt-1">Icon: {item.icon_type}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setFormData(item);
                    setShowForm(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tabs Section Component
const TabsSection = ({ showMessage }) => {
  const [tabs, setTabs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_tabs').select('*').order('display_order');
    setTabs(data || []);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await supabase.from('university_page_tabs').update(formData).eq('id', editingItem.id);
      } else {
        await supabase.from('university_page_tabs').insert([{ ...formData, display_order: tabs.length }]);
      }
      showMessage('success', 'Tab saved!');
      setShowForm(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this tab?')) return;
    await supabase.from('university_page_tabs').delete().eq('id', id);
    showMessage('success', 'Tab deleted!');
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Navigation Tabs</h3>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingItem(null);
            setFormData({ is_active: true });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Tab
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tab Name</label>
              <input
                type="text"
                value={formData.tab_name || ''}
                onChange={(e) => setFormData({ ...formData, tab_name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="XX Courses"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tab Link</label>
              <input
                type="text"
                value={formData.tab_link || ''}
                onChange={(e) => setFormData({ ...formData, tab_link: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="/courses"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {tabs.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold">{item.tab_name}</p>
              <p className="text-sm text-gray-600">{item.tab_link}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setFormData(item);
                  setShowForm(true);
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Testimonials Section Component
const TestimonialsSection = ({ showMessage }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [sectionSettings, setSectionSettings] = useState({});
  const [showSectionSettings, setShowSectionSettings] = useState(false);

  useEffect(() => {
    fetchData();
    fetchSectionSettings();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_testimonials').select('*').order('display_order');
    setTestimonials(data || []);
  };

  const fetchSectionSettings = async () => {
    const { data } = await supabase.from('university_page_stories_section').select('*').maybeSingle();
    setSectionSettings(data || { section_title: 'Real Stories, Inspiring Journey', show_section: true });
  };

  const handleSaveSectionSettings = async () => {
    try {
      if (sectionSettings.id) {
        await supabase.from('university_page_stories_section').update(sectionSettings).eq('id', sectionSettings.id);
      } else {
        await supabase.from('university_page_stories_section').insert([sectionSettings]);
      }
      showMessage('success', 'Section settings saved!');
      fetchSectionSettings();
      setShowSectionSettings(false);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await supabase.from('university_page_testimonials').update(formData).eq('id', editingItem.id);
      } else {
        await supabase.from('university_page_testimonials').insert([{ ...formData, display_order: testimonials.length }]);
      }
      showMessage('success', 'Testimonial saved!');
      setShowForm(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('university_page_testimonials').delete().eq('id', id);
    showMessage('success', 'Testimonial deleted!');
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Real Stories / Testimonials</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSectionSettings(!showSectionSettings)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Section Settings
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
              setFormData({ is_active: true, rating: 5.0 });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
      </div>

      {showSectionSettings && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-4">Section Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={sectionSettings.section_title || ''}
                onChange={(e) => setSectionSettings({ ...sectionSettings, section_title: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Real Stories, Inspiring Journey"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Section Subtitle (Optional)</label>
              <input
                type="text"
                value={sectionSettings.section_subtitle || ''}
                onChange={(e) => setSectionSettings({ ...sectionSettings, section_subtitle: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="See how our students transformed their careers"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show_stories"
                checked={sectionSettings.show_section !== false}
                onChange={(e) => setSectionSettings({ ...sectionSettings, show_section: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="show_stories" className="text-sm font-medium">Show this section on the page</label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveSectionSettings} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Settings
              </button>
              <button onClick={() => setShowSectionSettings(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Student Name</label>
              <input
                type="text"
                value={formData.student_name || ''}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Rahul Sharma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Before Title</label>
              <input
                type="text"
                value={formData.before_title || ''}
                onChange={(e) => setFormData({ ...formData, before_title: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Sales Executive"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">After Title</label>
              <input
                type="text"
                value={formData.after_title || ''}
                onChange={(e) => setFormData({ ...formData, after_title: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Business Manager"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Story</label>
              <textarea
                value={formData.story || ''}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="The MBA program completely transformed my career..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Course Name</label>
              <input
                type="text"
                value={formData.course_name || ''}
                onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="MBA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">University Name</label>
              <input
                type="text"
                value={formData.university_name || ''}
                onChange={(e) => setFormData({ ...formData, university_name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Amity University"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating || 5.0}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2 flex gap-2">
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {testimonials.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-bold text-lg">{item.student_name}</p>
                <p className="text-sm text-gray-600">{item.before_title} → {item.after_title}</p>
                <p className="text-sm mt-2 text-gray-700">{item.story?.substring(0, 150)}...</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  {item.course_name && <span>Course: {item.course_name}</span>}
                  {item.university_name && <span>University: {item.university_name}</span>}
                  {item.rating && <span>Rating: {item.rating}⭐</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setFormData(item);
                    setShowForm(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CTA Section Component
const CTASection = ({ showMessage }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_expert_cta').select('*').maybeSingle();
    setFormData(data || { is_active: true, background_color: '#1e40af', text_color: '#ffffff' });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        const { error } = await supabase.from('university_page_expert_cta').update(formData).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('university_page_expert_cta').insert([formData]);
        if (error) throw error;
      }
      showMessage('success', 'CTA section saved!');
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Talk to Expert CTA</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Talk to Expert"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Subtitle</label>
        <input
          type="text"
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Get personalized guidance for your educational journey"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Button Text</label>
        <input
          type="text"
          value={formData.button_text || ''}
          onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Talk to Expert"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Button Link</label>
        <input
          type="text"
          value={formData.button_link || ''}
          onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="/contact-expert"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <input
            type="color"
            value={formData.background_color || '#1e40af'}
            onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Text Color</label>
          <input
            type="color"
            value={formData.text_color || '#ffffff'}
            onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save CTA Section'}
      </button>
    </div>
  );
};

// Blogs Section Component
const BlogsSection = ({ showMessage }) => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [sectionSettings, setSectionSettings] = useState({});
  const [showSectionSettings, setShowSectionSettings] = useState(false);

  useEffect(() => {
    fetchData();
    fetchSectionSettings();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_blogs').select('*').order('display_order');
    setBlogs(data || []);
  };

  const fetchSectionSettings = async () => {
    const { data } = await supabase.from('university_page_blogs_section').select('*').maybeSingle();
    setSectionSettings(data || { section_title: 'Blogs', show_section: true });
  };

  const handleSaveSectionSettings = async () => {
    try {
      if (sectionSettings.id) {
        await supabase.from('university_page_blogs_section').update(sectionSettings).eq('id', sectionSettings.id);
      } else {
        await supabase.from('university_page_blogs_section').insert([sectionSettings]);
      }
      showMessage('success', 'Section settings saved!');
      fetchSectionSettings();
      setShowSectionSettings(false);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await supabase.from('university_page_blogs').update(formData).eq('id', editingItem.id);
      } else {
        await supabase.from('university_page_blogs').insert([{ ...formData, display_order: blogs.length }]);
      }
      showMessage('success', 'Blog saved!');
      setShowForm(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    await supabase.from('university_page_blogs').delete().eq('id', id);
    showMessage('success', 'Blog deleted!');
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Blog Posts</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSectionSettings(!showSectionSettings)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Section Settings
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
              setFormData({ is_active: true, publish_date: new Date().toISOString().split('T')[0] });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Blog
          </button>
        </div>
      </div>

      {showSectionSettings && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold mb-4">Section Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={sectionSettings.section_title || ''}
                onChange={(e) => setSectionSettings({ ...sectionSettings, section_title: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Blogs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Section Subtitle (Optional)</label>
              <input
                type="text"
                value={sectionSettings.section_subtitle || ''}
                onChange={(e) => setSectionSettings({ ...sectionSettings, section_subtitle: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Latest insights and updates"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show_blogs"
                checked={sectionSettings.show_section !== false}
                onChange={(e) => setSectionSettings({ ...sectionSettings, show_section: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="show_blogs" className="text-sm font-medium">Show this section on the page</label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveSectionSettings} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Settings
              </button>
              <button onClick={() => setShowSectionSettings(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Top 10 MBA Specializations in 2024"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-2 border rounded"
                rows="2"
                placeholder="Discover the most in-demand MBA specializations..."
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Author Name</label>
              <input
                type="text"
                value={formData.author_name || ''}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Dr. Anjali Mehta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="MBA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Read Time</label>
              <input
                type="text"
                value={formData.read_time || ''}
                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="5 min read"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link</label>
              <input
                type="text"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="/blog/mba-specializations"
              />
            </div>
            <div className="col-span-2 flex gap-2">
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">{item.excerpt?.substring(0, 100)}...</p>
                <div className="flex gap-2 mt-2 text-xs text-gray-500">
                  <span>{item.author_name}</span>
                  <span>•</span>
                  <span>{item.read_time}</span>
                  {item.category && <><span>•</span><span>{item.category}</span></>}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setFormData(item);
                    setShowForm(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Featured Courses Section (Info Only)
const FeaturedCoursesSection = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold mb-4">Featured Courses Section</h3>
    
    <div className="bg-blue-50 p-6 rounded-lg">
      <h4 className="font-bold mb-3 text-lg">📚 Auto-Populated Section</h4>
      <p className="text-gray-700 mb-4">
        This section automatically displays the first 5 courses from your <code className="bg-white px-2 py-1 rounded">university_courses</code> table.
      </p>
      
      <div className="bg-white p-4 rounded border-l-4 border-blue-500">
        <p className="font-semibold mb-2">How to manage Featured Courses:</p>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Go to <strong>"Courses & Fees"</strong> admin panel</li>
          <li>Add or edit courses there</li>
          <li>The first 5 courses will automatically appear in this section</li>
          <li>To change which courses appear, reorder them in the Courses panel</li>
        </ol>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> The section title "In demand - Featured courses" is currently hardcoded. 
          If you need to change it, contact your developer.
        </p>
      </div>
    </div>
  </div>
);

// Explore Section Component
const ExploreSection = ({ showMessage }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_explore_section').select('*').maybeSingle();
    setFormData(data || { section_title: 'Universities to Explore', show_section: true });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        const { error } = await supabase.from('university_page_explore_section').update(formData).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('university_page_explore_section').insert([formData]);
        if (error) throw error;
      }
      showMessage('success', 'Explore section settings saved!');
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Universities to Explore Section</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-2">📚 Auto-Populated Content</h4>
        <p className="text-sm text-gray-700">
          This section automatically displays the first 8 universities from your <code className="bg-white px-2 py-1 rounded">universities</code> table.
          To manage universities, go to the <strong>"Universities"</strong> admin panel.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Section Title</label>
        <input
          type="text"
          value={formData.section_title || ''}
          onChange={(e) => setFormData({ ...formData, section_title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Universities to Explore"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Section Subtitle (Optional)</label>
        <input
          type="text"
          value={formData.section_subtitle || ''}
          onChange={(e) => setFormData({ ...formData, section_subtitle: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Discover top-ranked institutions"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show_explore"
          checked={formData.show_section !== false}
          onChange={(e) => setFormData({ ...formData, show_section: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="show_explore" className="text-sm font-medium">Show this section on the page</label>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Section Settings'}
      </button>
    </div>
  );
};

// Discover Section Component
const DiscoverSection = ({ showMessage }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from('university_page_discover_section').select('*').maybeSingle();
    setFormData(data || { section_title: 'Discover Our Courses', show_section: true });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (formData.id) {
        const { error } = await supabase.from('university_page_discover_section').update(formData).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('university_page_discover_section').insert([formData]);
        if (error) throw error;
      }
      showMessage('success', 'Discover section settings saved!');
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Discover Our Courses Section</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-2">📚 Auto-Populated Content</h4>
        <p className="text-sm text-gray-700 mb-2">
          This section automatically displays all courses from your <code className="bg-white px-2 py-1 rounded">university_courses</code> table,
          organized into two categories:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
          <li><strong>MBA / MCA Programs:</strong> Courses with "MBA" or "MCA" in the name</li>
          <li><strong>BBA / BCA Programs:</strong> Courses with "BBA" or "BCA" in the name</li>
        </ul>
        <p className="text-sm text-gray-700 mt-2">
          To manage courses, go to the <strong>"Courses & Fees"</strong> admin panel.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Section Title</label>
        <input
          type="text"
          value={formData.section_title || ''}
          onChange={(e) => setFormData({ ...formData, section_title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Discover Our Courses"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Section Subtitle (Optional)</label>
        <input
          type="text"
          value={formData.section_subtitle || ''}
          onChange={(e) => setFormData({ ...formData, section_subtitle: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Find the perfect program for your career goals"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="show_discover"
          checked={formData.show_section !== false}
          onChange={(e) => setFormData({ ...formData, show_section: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="show_discover" className="text-sm font-medium">Show this section on the page</label>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save Section Settings'}
      </button>
    </div>
  );
};

const InfoSection = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold mb-4">Page Information</h3>
    
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-bold mb-2">✅ Editable from This Panel</h4>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Hero Section:</strong> Background image, title, subtitle, CTA button</li>
        <li><strong>Stats Section:</strong> Numbers, labels, icons, colors</li>
        <li><strong>Navigation Tabs:</strong> Tab names and links</li>
        <li><strong>Testimonials:</strong> Student stories, before/after, ratings</li>
        <li><strong>Talk to Expert CTA:</strong> Title, button text, colors</li>
        <li><strong>Blogs:</strong> Blog posts, images, authors</li>
      </ul>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="font-bold mb-2">🔄 Auto-Populated Sections</h4>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Featured Courses:</strong> First 5 courses from <code>university_courses</code> table</li>
        <li><strong>Universities to Explore:</strong> First 8 universities from <code>universities</code> table</li>
        <li><strong>Discover Courses:</strong> All courses from <code>university_courses</code> table (auto-categorized)</li>
      </ul>
      <p className="text-xs mt-2 text-gray-600">
        These sections update automatically when you add/edit universities or courses from their respective admin panels.
      </p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-lg">
      <h4 className="font-bold mb-2">📝 How to Edit Auto-Populated Content</h4>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Universities:</strong> Go to "Universities" admin panel</li>
        <li><strong>Courses:</strong> Go to "Courses & Fees" admin panel</li>
        <li>Changes will appear on this page automatically</li>
      </ul>
    </div>

    <div className="bg-purple-50 p-4 rounded-lg">
      <h4 className="font-bold mb-2">🎨 Section Titles</h4>
      <p className="text-sm mb-2">You can edit section titles for:</p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>Universities to Explore</li>
        <li>Discover Our Courses</li>
        <li>Real Stories</li>
        <li>Blogs</li>
      </ul>
      <p className="text-xs mt-2 text-gray-600">
        (Currently these use default titles, but you can add title editors if needed)
      </p>
    </div>
  </div>
);

export default UniversityPageManager;

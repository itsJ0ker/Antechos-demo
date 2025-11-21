import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';

const MarketplaceImarticusManager = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Hero State
  const [hero, setHero] = useState(null);
  const [heroStats, setHeroStats] = useState([]);

  // Programs State
  const [programs, setPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);

  // Stats State
  const [stats, setStats] = useState([]);

  // Features State
  const [features, setFeatures] = useState([]);

  // Testimonials State
  const [testimonials, setTestimonials] = useState([]);

  // Partners State
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'hero') {
        await fetchHero();
      } else if (activeTab === 'programs') {
        await fetchPrograms();
      } else if (activeTab === 'stats') {
        await fetchStats();
      } else if (activeTab === 'features') {
        await fetchFeatures();
      } else if (activeTab === 'testimonials') {
        await fetchTestimonials();
      } else if (activeTab === 'partners') {
        await fetchPartners();
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchHero = async () => {
    const { data: heroData } = await supabase
      .from('marketplace_hero')
      .select('*')
      .eq('is_active', true)
      .single();
    
    if (heroData) {
      setHero(heroData);
      const { data: statsData } = await supabase
        .from('marketplace_hero_stats')
        .select('*')
        .eq('hero_id', heroData.id)
        .order('display_order');
      setHeroStats(statsData || []);
    } else {
      setHero({
        title: '',
        subtitle: '',
        description: '',
        cta_primary_text: 'Explore Programs',
        cta_secondary_text: 'Talk to Counselor',
        cta_primary_link: '#programs',
        cta_secondary_link: '#contact'
      });
      setHeroStats([]);
    }
  };

  const fetchPrograms = async () => {
    const { data } = await supabase
      .from('marketplace_programs')
      .select('*')
      .order('display_order');
    setPrograms(data || []);
  };

  const fetchStats = async () => {
    const { data } = await supabase
      .from('marketplace_stats')
      .select('*')
      .order('display_order');
    setStats(data || []);
  };

  const fetchFeatures = async () => {
    const { data } = await supabase
      .from('marketplace_features')
      .select('*')
      .order('display_order');
    setFeatures(data || []);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('marketplace_testimonials')
      .select('*')
      .order('display_order');
    setTestimonials(data || []);
  };

  const fetchPartners = async () => {
    const { data } = await supabase
      .from('marketplace_partners')
      .select('*')
      .order('display_order');
    setPartners(data || []);
  };

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const saveHero = async () => {
    try {
      setLoading(true);
      
      let heroId = hero?.id;

      if (heroId) {
        await supabase
          .from('marketplace_hero')
          .update({ ...hero, updated_at: new Date().toISOString() })
          .eq('id', heroId);
      } else {
        const { data } = await supabase
          .from('marketplace_hero')
          .insert([{ ...hero, is_active: true }])
          .select()
          .single();
        heroId = data.id;
        setHero(data);
      }

      // Save hero stats
      await supabase.from('marketplace_hero_stats').delete().eq('hero_id', heroId);
      if (heroStats.length > 0) {
        await supabase.from('marketplace_hero_stats').insert(
          heroStats.map((s, idx) => ({
            hero_id: heroId,
            value: s.value,
            label: s.label,
            display_order: idx
          }))
        );
      }

      showMessage('Hero section saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error saving hero section', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveProgram = async (program) => {
    try {
      if (program.id) {
        await supabase
          .from('marketplace_programs')
          .update(program)
          .eq('id', program.id);
      } else {
        await supabase
          .from('marketplace_programs')
          .insert([program]);
      }
      await fetchPrograms();
      setEditingProgram(null);
      showMessage('Program saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error saving program', 'error');
    }
  };

  const deleteProgram = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from('marketplace_programs').delete().eq('id', id);
      await fetchPrograms();
      showMessage('Program deleted successfully!');
    } catch (error) {
      showMessage('Error deleting program', 'error');
    }
  };

  const toggleProgramActive = async (id, isActive) => {
    try {
      await supabase
        .from('marketplace_programs')
        .update({ is_active: !isActive })
        .eq('id', id);
      await fetchPrograms();
    } catch (error) {
      showMessage('Error updating program', 'error');
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'programs', label: 'Programs' },
    { id: 'stats', label: 'Stats' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'partners', label: 'Partners' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketplace Manager</h2>
          <p className="text-gray-600 mt-1">Manage your Imarticus-style marketplace page</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={hero?.title || ''}
                      onChange={(e) => setHero({ ...hero, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Transform Your Career..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={hero?.subtitle || ''}
                      onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={hero?.description || ''}
                      onChange={(e) => setHero({ ...hero, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                      <input
                        type="text"
                        value={hero?.cta_primary_text || ''}
                        onChange={(e) => setHero({ ...hero, cta_primary_text: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Link</label>
                      <input
                        type="text"
                        value={hero?.cta_primary_link || ''}
                        onChange={(e) => setHero({ ...hero, cta_primary_link: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                    <input
                      type="text"
                      value={hero?.hero_image || ''}
                      onChange={(e) => setHero({ ...hero, hero_image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Hero Stats */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Hero Stats</h3>
                    <button
                      onClick={() => setHeroStats([...heroStats, { value: '', label: '' }])}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Stat
                    </button>
                  </div>

                  <div className="space-y-3">
                    {heroStats.map((stat, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...heroStats];
                            updated[index].value = e.target.value;
                            setHeroStats(updated);
                          }}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="50,000+"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...heroStats];
                            updated[index].label = e.target.value;
                            setHeroStats(updated);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Students Trained"
                        />
                        <button
                          onClick={() => setHeroStats(heroStats.filter((_, i) => i !== index))}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={saveHero}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  Save Hero Section
                </button>
              </div>
            )}

            {/* Programs Tab */}
            {activeTab === 'programs' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Programs ({programs.length})</h3>
                  <button
                    onClick={() => setEditingProgram({
                      title: '',
                      short_description: '',
                      category: '',
                      duration: '',
                      level: 'Beginner',
                      price: 0,
                      is_active: true
                    })}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Program
                  </button>
                </div>

                {editingProgram ? (
                  <div className="border border-gray-300 rounded-lg p-6 space-y-4">
                    <h4 className="font-semibold text-lg">
                      {editingProgram.id ? 'Edit Program' : 'New Program'}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={editingProgram.title}
                          onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">Short Description</label>
                        <textarea
                          value={editingProgram.short_description}
                          onChange={(e) => setEditingProgram({ ...editingProgram, short_description: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <input
                          type="text"
                          value={editingProgram.category}
                          onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Duration</label>
                        <input
                          type="text"
                          value={editingProgram.duration}
                          onChange={(e) => setEditingProgram({ ...editingProgram, duration: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="6 Months"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Price</label>
                        <input
                          type="number"
                          value={editingProgram.price}
                          onChange={(e) => setEditingProgram({ ...editingProgram, price: parseFloat(e.target.value) })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Original Price</label>
                        <input
                          type="number"
                          value={editingProgram.original_price || ''}
                          onChange={(e) => setEditingProgram({ ...editingProgram, original_price: parseFloat(e.target.value) })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => saveProgram(editingProgram)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProgram(null)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {programs.map((program) => (
                      <div key={program.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <h4 className="font-semibold">{program.title}</h4>
                          <p className="text-sm text-gray-600">{program.category} • {program.duration}</p>
                          <p className="text-sm font-bold text-green-600">₹{program.price?.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleProgramActive(program.id, program.is_active)}
                            className="p-2 hover:bg-gray-200 rounded"
                          >
                            {program.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => setEditingProgram(program)}
                            className="p-2 hover:bg-gray-200 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProgram(program.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Stats Bar ({stats.length})</h3>
                  <button
                    onClick={async () => {
                      await supabase.from('marketplace_stats').insert([{
                        value: '0+',
                        label: 'New Stat',
                        is_active: true
                      }]);
                      fetchStats();
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Stat
                  </button>
                </div>

                <div className="space-y-3">
                  {stats.map((stat) => (
                    <div key={stat.id} className="flex items-center gap-3 p-4 border rounded-lg">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_stats')
                            .update({ value: e.target.value })
                            .eq('id', stat.id);
                          fetchStats();
                        }}
                        className="w-32 px-3 py-2 border rounded-lg font-bold"
                        placeholder="50,000+"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_stats')
                            .update({ label: e.target.value })
                            .eq('id', stat.id);
                          fetchStats();
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg"
                        placeholder="Students Trained"
                      />
                      <input
                        type="text"
                        value={stat.description || ''}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_stats')
                            .update({ description: e.target.value })
                            .eq('id', stat.id);
                          fetchStats();
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg"
                        placeholder="Description (optional)"
                      />
                      <button
                        onClick={async () => {
                          if (confirm('Delete this stat?')) {
                            await supabase.from('marketplace_stats').delete().eq('id', stat.id);
                            fetchStats();
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Features ({features.length})</h3>
                  <button
                    onClick={async () => {
                      await supabase.from('marketplace_features').insert([{
                        title: 'New Feature',
                        description: '',
                        icon: '✨',
                        is_active: true
                      }]);
                      fetchFeatures();
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature) => (
                    <div key={feature.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={feature.icon}
                          onChange={async (e) => {
                            await supabase
                              .from('marketplace_features')
                              .update({ icon: e.target.value })
                              .eq('id', feature.id);
                            fetchFeatures();
                          }}
                          className="w-16 px-3 py-2 border rounded-lg text-center text-2xl"
                        />
                        <button
                          onClick={async () => {
                            if (confirm('Delete this feature?')) {
                              await supabase.from('marketplace_features').delete().eq('id', feature.id);
                              fetchFeatures();
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_features')
                            .update({ title: e.target.value })
                            .eq('id', feature.id);
                          fetchFeatures();
                        }}
                        className="w-full px-3 py-2 border rounded-lg font-semibold"
                        placeholder="Feature Title"
                      />
                      <textarea
                        value={feature.description}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_features')
                            .update({ description: e.target.value })
                            .eq('id', feature.id);
                          fetchFeatures();
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Feature description"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Testimonials ({testimonials.length})</h3>
                  <button
                    onClick={async () => {
                      await supabase.from('marketplace_testimonials').insert([{
                        name: 'Student Name',
                        role: 'Role',
                        content: 'Testimonial content...',
                        rating: 5,
                        is_active: true
                      }]);
                      fetchTestimonials();
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                  </button>
                </div>

                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={testimonial.name}
                            onChange={async (e) => {
                              await supabase
                                .from('marketplace_testimonials')
                                .update({ name: e.target.value })
                                .eq('id', testimonial.id);
                              fetchTestimonials();
                            }}
                            className="px-3 py-2 border rounded-lg font-semibold"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            value={testimonial.role}
                            onChange={async (e) => {
                              await supabase
                                .from('marketplace_testimonials')
                                .update({ role: e.target.value })
                                .eq('id', testimonial.id);
                              fetchTestimonials();
                            }}
                            className="px-3 py-2 border rounded-lg"
                            placeholder="Role"
                          />
                          <input
                            type="text"
                            value={testimonial.company || ''}
                            onChange={async (e) => {
                              await supabase
                                .from('marketplace_testimonials')
                                .update({ company: e.target.value })
                                .eq('id', testimonial.id);
                              fetchTestimonials();
                            }}
                            className="px-3 py-2 border rounded-lg"
                            placeholder="Company"
                          />
                          <input
                            type="text"
                            value={testimonial.image_url || ''}
                            onChange={async (e) => {
                              await supabase
                                .from('marketplace_testimonials')
                                .update({ image_url: e.target.value })
                                .eq('id', testimonial.id);
                              fetchTestimonials();
                            }}
                            className="px-3 py-2 border rounded-lg text-sm"
                            placeholder="Image URL"
                          />
                        </div>
                        <button
                          onClick={async () => {
                            if (confirm('Delete this testimonial?')) {
                              await supabase.from('marketplace_testimonials').delete().eq('id', testimonial.id);
                              fetchTestimonials();
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={testimonial.content}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_testimonials')
                            .update({ content: e.target.value })
                            .eq('id', testimonial.id);
                          fetchTestimonials();
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Testimonial content"
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Rating:</label>
                        <select
                          value={testimonial.rating}
                          onChange={async (e) => {
                            await supabase
                              .from('marketplace_testimonials')
                              .update({ rating: parseInt(e.target.value) })
                              .eq('id', testimonial.id);
                            fetchTestimonials();
                          }}
                          className="px-3 py-1 border rounded-lg"
                        >
                          {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} Stars</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Partners Tab */}
            {activeTab === 'partners' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Partners ({partners.length})</h3>
                  <button
                    onClick={async () => {
                      await supabase.from('marketplace_partners').insert([{
                        name: 'Company Name',
                        logo_url: '',
                        is_active: true
                      }]);
                      fetchPartners();
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Partner
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {partners.map((partner) => (
                    <div key={partner.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <input
                          type="text"
                          value={partner.name}
                          onChange={async (e) => {
                            await supabase
                              .from('marketplace_partners')
                              .update({ name: e.target.value })
                              .eq('id', partner.id);
                            fetchPartners();
                          }}
                          className="flex-1 px-3 py-2 border rounded-lg font-semibold"
                          placeholder="Company Name"
                        />
                        <button
                          onClick={async () => {
                            if (confirm('Delete this partner?')) {
                              await supabase.from('marketplace_partners').delete().eq('id', partner.id);
                              fetchPartners();
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={partner.logo_url || ''}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_partners')
                            .update({ logo_url: e.target.value })
                            .eq('id', partner.id);
                          fetchPartners();
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Logo URL"
                      />
                      <input
                        type="text"
                        value={partner.website_url || ''}
                        onChange={async (e) => {
                          await supabase
                            .from('marketplace_partners')
                            .update({ website_url: e.target.value })
                            .eq('id', partner.id);
                          fetchPartners();
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder="Website URL"
                      />
                      {partner.logo_url && (
                        <img src={partner.logo_url} alt={partner.name} className="w-full h-16 object-contain" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarketplaceImarticusManager;

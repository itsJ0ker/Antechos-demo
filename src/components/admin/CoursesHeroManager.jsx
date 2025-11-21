import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2, MoveUp, MoveDown, Image as ImageIcon } from 'lucide-react';

const CoursesHeroManager = () => {
  const [hero, setHero] = useState(null);
  const [features, setFeatures] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      
      // Fetch hero content
      const { data: heroData, error: heroError } = await supabase
        .from('courses_hero')
        .select('*')
        .eq('is_active', true)
        .single();

      if (heroError && heroError.code !== 'PGRST116') throw heroError;

      if (heroData) {
        setHero(heroData);

        // Fetch features
        const { data: featuresData, error: featuresError } = await supabase
          .from('courses_hero_features')
          .select('*')
          .eq('hero_id', heroData.id)
          .order('display_order');

        if (featuresError) throw featuresError;
        setFeatures(featuresData || []);

        // Fetch stats
        const { data: statsData, error: statsError } = await supabase
          .from('courses_hero_stats')
          .select('*')
          .eq('hero_id', heroData.id)
          .order('display_order');

        if (statsError) throw statsError;
        setStats(statsData || []);
      } else {
        // Initialize with default values
        setHero({
          title: 'Secure Payments',
          subtitle: 'Made Simple',
          description: 'Process transactions with confidence.',
          cta_text: 'Get a Callback',
          cta_link: '/contact',
          background_color: '#93B5F1',
          hero_image: '',
          background_image: ''
        });
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setMessage('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const saveHero = async () => {
    try {
      setSaving(true);
      
      let heroId = hero?.id;

      if (heroId) {
        // Update existing
        const { error } = await supabase
          .from('courses_hero')
          .update({
            ...hero,
            updated_at: new Date().toISOString()
          })
          .eq('id', heroId);

        if (error) throw error;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('courses_hero')
          .insert([{ ...hero, is_active: true }])
          .select()
          .single();

        if (error) throw error;
        heroId = data.id;
        setHero(data);
      }

      // Save features
      await saveFeatures(heroId);
      
      // Save stats
      await saveStats(heroId);

      setMessage('✓ Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving:', error);
      setMessage('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const saveFeatures = async (heroId) => {
    // Delete existing features
    await supabase
      .from('courses_hero_features')
      .delete()
      .eq('hero_id', heroId);

    // Insert new features
    if (features.length > 0) {
      const { error } = await supabase
        .from('courses_hero_features')
        .insert(
          features.map((f, idx) => ({
            hero_id: heroId,
            feature_text: f.feature_text,
            icon: f.icon || '✓',
            display_order: idx
          }))
        );

      if (error) throw error;
    }
  };

  const saveStats = async (heroId) => {
    // Delete existing stats
    await supabase
      .from('courses_hero_stats')
      .delete()
      .eq('hero_id', heroId);

    // Insert new stats
    if (stats.length > 0) {
      const { error } = await supabase
        .from('courses_hero_stats')
        .insert(
          stats.map((s, idx) => ({
            hero_id: heroId,
            value: s.value,
            label: s.label,
            display_order: idx
          }))
        );

      if (error) throw error;
    }
  };

  const addFeature = () => {
    setFeatures([...features, { feature_text: '', icon: '✓' }]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index, field, value) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    setFeatures(updated);
  };

  const moveFeature = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= features.length) return;
    
    const updated = [...features];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFeatures(updated);
  };

  const addStat = () => {
    setStats([...stats, { value: '', label: '' }]);
  };

  const removeStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const updateStat = (index, field, value) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const moveStat = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= stats.length) return;
    
    const updated = [...stats];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setStats(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Courses Hero Section</h2>
          <p className="text-gray-600 mt-1">Manage the hero section on courses page</p>
        </div>
        <button
          onClick={saveHero}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (Blue Text)
            </label>
            <input
              type="text"
              value={hero?.title || ''}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Secure Payments"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle (Dark Text)
            </label>
            <input
              type="text"
              value={hero?.subtitle || ''}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Made Simple"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={hero?.description || ''}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Process transactions with confidence..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CTA Button Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={hero?.cta_text || ''}
              onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Get a Callback"
            />
          </div>

          {/* CTA Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={hero?.cta_link || ''}
              onChange={(e) => setHero({ ...hero, cta_link: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="/contact"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={hero?.background_color || '#93B5F1'}
                onChange={(e) => setHero({ ...hero, background_color: e.target.value })}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <input
                type="text"
                value={hero?.background_color || ''}
                onChange={(e) => setHero({ ...hero, background_color: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#93B5F1"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image URL (Person/Product)
            </label>
            <input
              type="text"
              value={hero?.hero_image || ''}
              onChange={(e) => setHero({ ...hero, hero_image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image URL (Optional)
          </label>
          <input
            type="text"
            value={hero?.background_image || ''}
            onChange={(e) => setHero({ ...hero, background_image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Features (Checkmarks)</h3>
          <button
            onClick={addFeature}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
                placeholder="✓"
              />
              <input
                type="text"
                value={feature.feature_text}
                onChange={(e) => updateFeature(index, 'feature_text', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Feature text"
              />
              <div className="flex gap-1">
                <button
                  onClick={() => moveFeature(index, 'up')}
                  disabled={index === 0}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveFeature(index, 'down')}
                  disabled={index === features.length - 1}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
          <button
            onClick={addStat}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Stat
          </button>
        </div>

        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(index, 'value', e.target.value)}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="400+"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, 'label', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Hiring Partners"
              />
              <div className="flex gap-1">
                <button
                  onClick={() => moveStat(index, 'up')}
                  disabled={index === 0}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveStat(index, 'down')}
                  disabled={index === stats.length - 1}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeStat(index)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div 
          className="rounded-lg p-8 text-white"
          style={{ backgroundColor: hero?.background_color || '#93B5F1' }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-blue-600">{hero?.title || 'Title'}</span>
              <br />
              <span className="text-gray-900">{hero?.subtitle || 'Subtitle'}</span>
            </h1>
            <p className="text-gray-700 mb-4">{hero?.description || 'Description'}</p>
            
            <div className="space-y-2 mb-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-600">{f.icon}</span>
                  <span className="text-gray-900">{f.feature_text}</span>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-6">
              {hero?.cta_text || 'Button'}
            </button>

            <div className="flex gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-700">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesHeroManager;

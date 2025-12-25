import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save } from 'lucide-react';
import AdminDebugInfo from './AdminDebugInfo';

const HeroManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', bullet_points: [], left_image_url: '', right_image_url: '', background_image_url: '', video_url: ''
  });
  const [bulletInput, setBulletInput] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('marketplace_hero').select('*').single();
      if (data) setFormData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase.from('marketplace_hero').select('id').single();
      if (existing) {
        await supabase.from('marketplace_hero').update(formData).eq('id', existing.id);
      } else {
        await supabase.from('marketplace_hero').insert([formData]);
      }
      alert('Saved!');
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const addBullet = () => {
    if (bulletInput.trim()) {
      setFormData({ ...formData, bullet_points: [...formData.bullet_points, bulletInput.trim()] });
      setBulletInput('');
    }
  };

  const removeBullet = (idx) => {
    setFormData({ ...formData, bullet_points: formData.bullet_points.filter((_, i) => i !== idx) });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <AdminDebugInfo />
      <h3 className="text-xl font-bold">Hero Section</h3>
      <div className="grid gap-4">
        <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="text" placeholder="Subtitle" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="url" placeholder="Background Image URL" value={formData.background_image_url} onChange={(e) => setFormData({ ...formData, background_image_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="url" placeholder="YouTube Video URL (e.g., https://www.youtube.com/embed/VIDEO_ID)" value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="url" placeholder="Left Image URL" value={formData.left_image_url} onChange={(e) => setFormData({ ...formData, left_image_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="url" placeholder="Right Image URL" value={formData.right_image_url} onChange={(e) => setFormData({ ...formData, right_image_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        
        <div className="border-2 rounded-lg p-4">
          <label className="font-semibold mb-2 block">Bullet Points</label>
          <div className="flex gap-2 mb-3">
            <input type="text" placeholder="Add bullet point" value={bulletInput} onChange={(e) => setBulletInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addBullet()} className="flex-1 px-4 py-2 border-2 rounded-lg" />
            <button onClick={addBullet} className="px-4 py-2 bg-green-600 text-white rounded-lg">Add</button>
          </div>
          <ul className="space-y-2">
            {formData.bullet_points.map((point, idx) => (
              <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{point}</span>
                <button onClick={() => removeBullet(idx)} className="text-red-600 hover:text-red-800">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleSave} disabled={saving} className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save Hero'}
        </button>
      </div>
    </div>
  );
};

export default HeroManager;

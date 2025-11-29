import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save } from 'lucide-react';

const ResourcesManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ heading: '', description: '', image_url_9_16: '', download_url: '', button_text: 'Download', is_active: true });

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    const { data } = await supabase.from('marketplace_resources').select('*').single();
    if (data) setFormData(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase.from('marketplace_resources').select('id').single();
      if (existing) { await supabase.from('marketplace_resources').update(formData).eq('id', existing.id); }
      else { await supabase.from('marketplace_resources').insert([formData]); }
      alert('Saved!'); fetchData();
    } finally { setSaving(false); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Resources Section (with Download)</h3>
      <div className="grid gap-4">
        <input type="text" placeholder="Heading *" value={formData.heading} onChange={(e) => setFormData({ ...formData, heading: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="px-4 py-2 border-2 rounded-lg" rows={3} />
        <input type="url" placeholder="Image URL (9:16 ratio)" value={formData.image_url_9_16} onChange={(e) => setFormData({ ...formData, image_url_9_16: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="url" placeholder="Download URL" value={formData.download_url} onChange={(e) => setFormData({ ...formData, download_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="text" placeholder="Button Text" value={formData.button_text} onChange={(e) => setFormData({ ...formData, button_text: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />Active</label>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg"><Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  );
};

export default ResourcesManager;

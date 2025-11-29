import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save } from 'lucide-react';

const BusinessDeservesManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ main_heading: '', sub_heading: '', center_image_url_9_16: '', right_heading: '', right_subheading: '', left_points: [], is_active: true });
  const [pointInput, setPointInput] = useState('');

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    const { data } = await supabase.from('marketplace_business_deserves').select('*').single();
    if (data) setFormData(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase.from('marketplace_business_deserves').select('id').single();
      if (existing) { await supabase.from('marketplace_business_deserves').update(formData).eq('id', existing.id); }
      else { await supabase.from('marketplace_business_deserves').insert([formData]); }
      alert('Saved!'); fetchData();
    } finally { setSaving(false); }
  };

  const addPoint = () => {
    if (pointInput.trim()) {
      setFormData({ ...formData, left_points: [...formData.left_points, pointInput.trim()] });
      setPointInput('');
    }
  };

  const removePoint = (idx) => {
    setFormData({ ...formData, left_points: formData.left_points.filter((_, i) => i !== idx) });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Your Business Deserves Best</h3>
      <div className="grid gap-4">
        <input type="text" placeholder="Main Heading *" value={formData.main_heading} onChange={(e) => setFormData({ ...formData, main_heading: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="text" placeholder="Sub Heading" value={formData.sub_heading} onChange={(e) => setFormData({ ...formData, sub_heading: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="url" placeholder="Center Image URL (9:16)" value={formData.center_image_url_9_16} onChange={(e) => setFormData({ ...formData, center_image_url_9_16: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="text" placeholder="Right Heading" value={formData.right_heading} onChange={(e) => setFormData({ ...formData, right_heading: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        <input type="text" placeholder="Right Subheading" value={formData.right_subheading} onChange={(e) => setFormData({ ...formData, right_subheading: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
        
        <div className="border-2 rounded-lg p-4">
          <label className="font-semibold mb-2 block">Left Points (Numbered List)</label>
          <div className="flex gap-2 mb-3">
            <input type="text" placeholder="Add point" value={pointInput} onChange={(e) => setPointInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addPoint()} className="flex-1 px-4 py-2 border-2 rounded-lg" />
            <button onClick={addPoint} className="px-4 py-2 bg-green-600 text-white rounded-lg">Add</button>
          </div>
          <ul className="space-y-2">
            {formData.left_points.map((point, idx) => (
              <li key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span>{idx + 1}. {point}</span>
                <button onClick={() => removePoint(idx)} className="text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />Active</label>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg"><Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  );
};

export default BusinessDeservesManager;

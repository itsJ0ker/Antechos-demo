import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Edit, Trash2, Save, X } from 'lucide-react';

const HireBlocksManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ category_name: '', image_position: 'left', image_url: '', description_title: '', bullet_points: [], order_index: 0, is_active: true });
  const [bulletInput, setBulletInput] = useState('');

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => { const { data } = await supabase.from('marketplace_hire_blocks').select('*').order('order_index'); setItems(data || []); setLoading(false); };
  const resetForm = () => { setFormData({ category_name: '', image_position: 'left', image_url: '', description_title: '', bullet_points: [], order_index: items.length, is_active: true }); setEditingId(null); setBulletInput(''); };
  
  const handleSave = async () => {
    if (!formData.category_name.trim()) { alert('Category name required'); return; }
    setSaving(true);
    try {
      if (editingId) { await supabase.from('marketplace_hire_blocks').update(formData).eq('id', editingId); }
      else { await supabase.from('marketplace_hire_blocks').insert([formData]); }
      alert('Saved!'); resetForm(); fetchData();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; await supabase.from('marketplace_hire_blocks').delete().eq('id', id); fetchData(); };
  const addBullet = () => { if (bulletInput.trim()) { setFormData({ ...formData, bullet_points: [...formData.bullet_points, bulletInput.trim()] }); setBulletInput(''); } };
  const removeBullet = (idx) => { setFormData({ ...formData, bullet_points: formData.bullet_points.filter((_, i) => i !== idx) }); };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Hire Blocks (Industry Trainers, Workforce, Teams)</h3>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Hire Block</h4>
        <div className="grid gap-4">
          <input type="text" placeholder="Category Name *" value={formData.category_name} onChange={(e) => setFormData({ ...formData, category_name: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="text" placeholder="Description Title" value={formData.description_title} onChange={(e) => setFormData({ ...formData, description_title: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="url" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <select value={formData.image_position} onChange={(e) => setFormData({ ...formData, image_position: e.target.value })} className="px-4 py-2 border-2 rounded-lg">
            <option value="left">Image Left</option>
            <option value="right">Image Right</option>
          </select>
          <input type="number" placeholder="Order" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} className="px-4 py-2 border-2 rounded-lg" />
          
          <div className="border-2 rounded-lg p-4">
            <label className="font-semibold mb-2 block">Bullet Points</label>
            <div className="flex gap-2 mb-3">
              <input type="text" placeholder="Add bullet" value={bulletInput} onChange={(e) => setBulletInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addBullet()} className="flex-1 px-4 py-2 border-2 rounded-lg" />
              <button onClick={addBullet} className="px-4 py-2 bg-green-600 text-white rounded-lg">Add</button>
            </div>
            <ul className="space-y-2">
              {formData.bullet_points.map((point, idx) => (
                <li key={idx} className="flex justify-between bg-gray-50 p-2 rounded">
                  <span>{point}</span>
                  <button onClick={() => removeBullet(idx)} className="text-red-600">Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />Active</label>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg"><Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}</button>
          {editingId && <button onClick={resetForm} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
        </div>
      </div>
      <div className="bg-white rounded-xl border divide-y">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex justify-between hover:bg-gray-50">
            <div><h5 className="font-bold">{item.category_name}</h5><p className="text-sm text-gray-600">{item.description_title}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData(item); setEditingId(item.id); }} className="p-2 text-blue-600"><Edit className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HireBlocksManager;

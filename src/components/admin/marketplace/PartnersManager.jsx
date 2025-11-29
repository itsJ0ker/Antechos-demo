import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const PartnersManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', logo_url: '', order_index: 0, is_active: true });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await supabase.from('marketplace_partners').select('*').order('order_index');
      setItems(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', logo_url: '', order_index: items.length, is_active: true });
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) { alert('Name required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await supabase.from('marketplace_partners').update(formData).eq('id', editingId);
      } else {
        await supabase.from('marketplace_partners').insert([formData]);
      }
      alert('Saved!');
      resetForm();
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await supabase.from('marketplace_partners').delete().eq('id', id);
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Partners</h3>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Partner</h4>
        <div className="grid gap-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="url" placeholder="Logo URL *" value={formData.logo_url} onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="number" placeholder="Order" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} className="px-4 py-2 border-2 rounded-lg" />
          <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />Active</label>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"><Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}</button>
          {editingId && <button onClick={resetForm} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
        </div>
      </div>
      <div className="bg-white rounded-xl border divide-y">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <img src={item.logo_url} alt={item.name} className="h-12 w-24 object-contain" />
              <div>
                <h5 className="font-bold">{item.name}</h5>
                <span className={`text-xs px-2 py-1 rounded ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData(item); setEditingId(item.id); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersManager;

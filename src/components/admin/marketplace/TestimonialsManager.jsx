import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Edit, Trash2, Save, X } from 'lucide-react';

const TestimonialsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ client_name: '', company: '', quote: '', avatar_url: '', order_index: 0, is_active: true });

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => { const { data } = await supabase.from('marketplace_testimonials').select('*').order('order_index'); setItems(data || []); setLoading(false); };
  const resetForm = () => { setFormData({ client_name: '', company: '', quote: '', avatar_url: '', order_index: items.length, is_active: true }); setEditingId(null); };
  
  const handleSave = async () => {
    if (!formData.client_name.trim() || !formData.quote.trim()) { alert('Name and quote required'); return; }
    setSaving(true);
    try {
      if (editingId) { await supabase.from('marketplace_testimonials').update(formData).eq('id', editingId); }
      else { await supabase.from('marketplace_testimonials').insert([formData]); }
      alert('Saved!'); resetForm(); fetchData();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; await supabase.from('marketplace_testimonials').delete().eq('id', id); fetchData(); };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Testimonials</h3>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Testimonial</h4>
        <div className="grid gap-4">
          <input type="text" placeholder="Client Name *" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <textarea placeholder="Quote *" value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} className="px-4 py-2 border-2 rounded-lg" rows={3} />
          <input type="url" placeholder="Avatar URL" value={formData.avatar_url} onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="number" placeholder="Order" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} className="px-4 py-2 border-2 rounded-lg" />
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
            <div className="flex items-center gap-4">
              <img src={item.avatar_url} alt={item.client_name} className="w-12 h-12 rounded-full object-cover" />
              <div><h5 className="font-bold">{item.client_name}</h5><p className="text-sm text-gray-600">{item.company}</p><p className="text-sm italic">"{item.quote.substring(0, 60)}..."</p></div>
            </div>
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

export default TestimonialsManager;

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X, DollarSign } from 'lucide-react';

const MarketplaceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', slug: '', short_description: '', description: '', icon: '', image_url: '', price_starting: 0, is_active: true, display_order: 0
  });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('marketplace_services').select('*').order('display_order');
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', short_description: '', description: '', icon: '', image_url: '', price_starting: 0, is_active: true, display_order: services.length });
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) { alert('Name required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('marketplace_services').update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('marketplace_services').insert([formData]);
        if (error) throw error;
      }
      alert('Saved!');
      resetForm();
      fetchServices();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      const { error } = await supabase.from('marketplace_services').delete().eq('id', id);
      if (error) throw error;
      fetchServices();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Marketplace Services</h3>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Service</h4>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="text" placeholder="Slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="text" placeholder="Icon (emoji)" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="number" placeholder="Starting Price" value={formData.price_starting} onChange={(e) => setFormData({ ...formData, price_starting: parseFloat(e.target.value) })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="url" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" />
          <textarea placeholder="Short Description" value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" rows={2} />
          <textarea placeholder="Full Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" rows={3} />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
            <label>Active</label>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            <Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}
          </button>
          {editingId && <button onClick={resetForm} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
        </div>
      </div>
      <div className="bg-white rounded-xl border">
        <div className="px-6 py-4 border-b"><h4 className="font-bold">Services ({services.length})</h4></div>
        <div className="divide-y">
          {services.map((s) => (
            <div key={s.id} className="p-6 hover:bg-gray-50 flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <h5 className="font-bold">{s.name}</h5>
                  <span className={`px-2 py-1 text-xs rounded ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <p className="text-sm text-gray-600">{s.short_description}</p>
                <p className="text-sm text-green-600 mt-1">Starting at ₹{s.price_starting?.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setFormData(s); setEditingId(s.id); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5" /></button>
                <button onClick={() => handleDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceManager;

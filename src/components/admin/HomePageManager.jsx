import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const HomePageManager = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    section_type: 'features', title: '', subtitle: '', layout_type: 'grid', background_color: '#ffffff', is_active: true, display_order: 0
  });

  useEffect(() => { fetchSections(); }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase.from('home_sections').select('*').order('display_order');
      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ section_type: 'features', title: '', subtitle: '', layout_type: 'grid', background_color: '#ffffff', is_active: true, display_order: sections.length });
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) { alert('Title required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('home_sections').update(formData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('home_sections').insert([formData]);
        if (error) throw error;
      }
      alert('Saved!');
      resetForm();
      fetchSections();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      const { error } = await supabase.from('home_sections').delete().eq('id', id);
      if (error) throw error;
      fetchSections();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Home Page Sections</h3>
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Section</h4>
        <div className="grid grid-cols-2 gap-4">
          <select value={formData.section_type} onChange={(e) => setFormData({ ...formData, section_type: e.target.value })} className="px-4 py-2 border-2 rounded-lg">
            <option value="features">Features</option>
            <option value="stats">Statistics</option>
            <option value="testimonials">Testimonials</option>
            <option value="cta">Call to Action</option>
            <option value="partners">Partners</option>
          </select>
          <select value={formData.layout_type} onChange={(e) => setFormData({ ...formData, layout_type: e.target.value })} className="px-4 py-2 border-2 rounded-lg">
            <option value="grid">Grid</option>
            <option value="carousel">Carousel</option>
            <option value="list">List</option>
          </select>
          <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" />
          <input type="text" placeholder="Subtitle" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" />
          <input type="color" value={formData.background_color} onChange={(e) => setFormData({ ...formData, background_color: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
            <label>Active</label>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
            <Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}
          </button>
          {editingId && <button onClick={resetForm} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
        </div>
      </div>
      <div className="bg-white rounded-xl border">
        <div className="px-6 py-4 border-b"><h4 className="font-bold">Sections ({sections.length})</h4></div>
        <div className="divide-y">
          {sections.map((s) => (
            <div key={s.id} className="p-6 hover:bg-gray-50 flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="font-bold">{s.title}</h5>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">{s.section_type}</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">{s.layout_type}</span>
                  <span className={`px-2 py-1 text-xs rounded ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                {s.subtitle && <p className="text-sm text-gray-600">{s.subtitle}</p>}
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

export default HomePageManager;

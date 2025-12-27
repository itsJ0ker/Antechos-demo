import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Edit, Trash2, Save, X } from 'lucide-react';

const TeamsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bulkUpdateMode, setBulkUpdateMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkCategory, setBulkCategory] = useState('General');
  const [formData, setFormData] = useState({ name: '', role: '', category: 'General', image_url: '', order_index: 0, is_active: true });
  
  // Predefined categories
  const categories = ['General', 'Leadership', 'Engineering', 'Design', 'Marketing', 'Operations'];

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => { const { data } = await supabase.from('marketplace_teams').select('*').order('order_index'); setItems(data || []); setLoading(false); };
  const resetForm = () => { setFormData({ name: '', role: '', category: 'General', image_url: '', order_index: items.length, is_active: true }); setEditingId(null); };
  
  const handleSave = async () => {
    if (!formData.name.trim()) { alert('Name required'); return; }
    setSaving(true);
    try {
      if (editingId) { await supabase.from('marketplace_teams').update(formData).eq('id', editingId); }
      else { await supabase.from('marketplace_teams').insert([formData]); }
      alert('Saved!'); resetForm(); fetchData();
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => { if (!confirm('Delete?')) return; await supabase.from('marketplace_teams').delete().eq('id', id); fetchData(); };

  const handleBulkCategoryUpdate = async () => {
    if (selectedItems.length === 0) {
      alert('Please select items to update');
      return;
    }
    
    if (!confirm(`Update ${selectedItems.length} items to category "${bulkCategory}"?`)) return;
    
    setSaving(true);
    try {
      await supabase
        .from('marketplace_teams')
        .update({ category: bulkCategory })
        .in('id', selectedItems);
      
      alert('Categories updated successfully!');
      setSelectedItems([]);
      setBulkUpdateMode(false);
      fetchData();
    } catch (error) {
      alert('Error updating categories');
    } finally {
      setSaving(false);
    }
  };

  const toggleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredItems = items.filter(item => 
      selectedCategory === 'All' || (item.category || 'General') === selectedCategory
    );
    
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Teams</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setBulkUpdateMode(!bulkUpdateMode)}
            className={`px-3 py-1 rounded-lg text-sm ${
              bulkUpdateMode 
                ? 'bg-orange-100 text-orange-800 border border-orange-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            {bulkUpdateMode ? 'Exit Bulk Mode' : 'Bulk Update'}
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="All">All Categories ({items.length})</option>
              {categories.map(category => {
                const count = items.filter(item => (item.category || 'General') === category).length;
                return (
                  <option key={category} value={category}>
                    {category} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {bulkUpdateMode && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSelectAll}
                className="px-3 py-1 bg-orange-600 text-white rounded text-sm"
              >
                {selectedItems.length === items.filter(item => 
                  selectedCategory === 'All' || (item.category || 'General') === selectedCategory
                ).length ? 'Deselect All' : 'Select All'}
              </button>
              <span className="text-sm text-gray-600">
                {selectedItems.length} items selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button
                onClick={handleBulkCategoryUpdate}
                disabled={saving || selectedItems.length === 0}
                className="px-4 py-1 bg-orange-600 text-white rounded text-sm disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Update Categories'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Team Member</h4>
        <div className="grid gap-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="text" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <select 
            value={formData.category} 
            onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input type="url" placeholder="Image URL" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
          <input type="number" placeholder="Order" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} className="px-4 py-2 border-2 rounded-lg" />
          <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />Active</label>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg"><Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}</button>
          {editingId && <button onClick={resetForm} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
        </div>
      </div>
      <div className="bg-white rounded-xl border divide-y">
        {items
          .filter(item => selectedCategory === 'All' || (item.category || 'General') === selectedCategory)
          .map((item) => (
          <div key={item.id} className="p-4 flex justify-between hover:bg-gray-50">
            <div className="flex items-center gap-4">
              {bulkUpdateMode && (
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                  className="w-4 h-4"
                />
              )}
              <img src={item.image_url || `https://i.pravatar.cc/200?img=${item.order_index}`} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h5 className="font-bold">{item.name}</h5>
                <p className="text-sm text-gray-600">{item.role}</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                  {item.category || 'General'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData(item); setEditingId(item.id); }} className="p-2 text-blue-600"><Edit className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
        {items.filter(item => selectedCategory === 'All' || (item.category || 'General') === selectedCategory).length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No team members found in the "{selectedCategory}" category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsManager;

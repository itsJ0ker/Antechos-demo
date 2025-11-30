import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Edit, Trash2, Save, X, Star } from 'lucide-react';

const SolutionsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    icon_url: '', 
    image_url: '',
    category: '',
    rating: 0,
    price: 0,
    original_price: 0,
    short_description: '',
    description: '', 
    order_index: 0, 
    is_visible_initially: true,
    is_featured: false,
    is_active: true 
  });

  useEffect(() => { fetchData(); }, []);
  
  const fetchData = async () => { 
    const { data } = await supabase.from('marketplace_solutions').select('*').order('order_index'); 
    setItems(data || []); 
    setLoading(false); 
  };
  
  const resetForm = () => { 
    setFormData({ 
      title: '', 
      icon_url: '', 
      image_url: '',
      category: '',
      rating: 0,
      price: 0,
      original_price: 0,
      short_description: '',
      description: '', 
      order_index: items.length, 
      is_visible_initially: true,
      is_featured: false,
      is_active: true 
    }); 
    setEditingId(null); 
  };
  
  const handleSave = async () => {
    if (!formData.title.trim()) { alert('Title required'); return; }
    setSaving(true);
    try {
      if (editingId) { 
        await supabase.from('marketplace_solutions').update(formData).eq('id', editingId); 
      } else { 
        await supabase.from('marketplace_solutions').insert([formData]); 
      }
      alert('Saved!'); 
      resetForm(); 
      fetchData();
    } finally { 
      setSaving(false); 
    }
  };

  const handleDelete = async (id) => { 
    if (!confirm('Delete?')) return; 
    await supabase.from('marketplace_solutions').delete().eq('id', id); 
    fetchData(); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Comprehensive Solutions / Services</h3>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Service</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Title *" 
            value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="text" 
            placeholder="Category (e.g., Development, Design)" 
            value={formData.category} 
            onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="url" 
            placeholder="Card Image URL" 
            value={formData.image_url} 
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="url" 
            placeholder="Icon URL (optional)" 
            value={formData.icon_url} 
            onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="number" 
            step="0.1"
            min="0"
            max="5"
            placeholder="Rating (0-5)" 
            value={formData.rating} 
            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="number" 
            placeholder="Price (₹)" 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="number" 
            placeholder="Original Price (₹) - for discount" 
            value={formData.original_price} 
            onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <input 
            type="number" 
            placeholder="Order" 
            value={formData.order_index} 
            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })} 
            className="px-4 py-2 border-2 rounded-lg" 
          />
          <textarea 
            placeholder="Short Description (for card)" 
            value={formData.short_description} 
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg md:col-span-2" 
            rows={2} 
          />
          <textarea 
            placeholder="Full Description (for details page)" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            className="px-4 py-2 border-2 rounded-lg md:col-span-2" 
            rows={3} 
          />
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={formData.is_visible_initially} 
              onChange={(e) => setFormData({ ...formData, is_visible_initially: e.target.checked })} 
            />
            Visible Initially (before "More" button)
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={formData.is_featured} 
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} 
            />
            Featured / Most Popular
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={formData.is_active} 
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} 
            />
            Active
          </label>
        </div>
        <div className="flex gap-3 mt-4">
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save'}
          </button>
          {editingId && (
            <button 
              onClick={resetForm} 
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl border divide-y">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex justify-between hover:bg-gray-50">
            <div className="flex items-center gap-4">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-24 h-16 object-cover rounded" />
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-bold">{item.title}</h5>
                  {item.is_featured && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                {item.category && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded mr-2">
                    {item.category}
                  </span>
                )}
                {item.rating > 0 && (
                  <span className="text-xs flex items-center gap-1 inline-flex">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {item.rating}
                  </span>
                )}
                <p className="text-sm text-gray-600 mt-1">{item.short_description}</p>
                {item.price > 0 && (
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    ₹{item.price.toLocaleString()}
                    {item.original_price > item.price && (
                      <span className="text-xs text-gray-400 line-through ml-2">
                        ₹{item.original_price.toLocaleString()}
                      </span>
                    )}
                  </p>
                )}
                <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${item.is_visible_initially ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                  {item.is_visible_initially ? 'Initially Visible' : 'Hidden (More)'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setFormData(item); setEditingId(item.id); }} 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsManager;

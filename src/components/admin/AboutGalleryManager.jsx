import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Upload } from 'lucide-react';

const AboutGalleryManager = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    image_url: '',
    caption: '',
    category: 'general',
    is_active: true,
    display_order: 0
  });

  const categories = ['general', 'team', 'office', 'events', 'awards', 'culture'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('about_gallery')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      setGallery(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async () => {
    if (!form.image_url.trim()) {
      alert('Image URL is required');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('about_gallery')
          .update(form)
          .eq('id', editingId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_gallery')
          .insert([form]);
        
        if (error) throw error;
      }

      alert('Saved successfully!');
      resetForm();
      fetchGallery();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this image?')) return;

    try {
      const { error } = await supabase
        .from('about_gallery')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchGallery();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const editItem = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const resetForm = () => {
    setForm({
      image_url: '',
      caption: '',
      category: 'general',
      is_active: true,
      display_order: 0
    });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">About Us Gallery Manager</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ImageIcon className="w-5 h-5" />
          <span>{gallery.length} images</span>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
        <h4 className="text-xl font-bold mb-6 text-purple-900">
          {editingId ? 'Edit Image' : 'Add New Image'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              placeholder="Team Collaboration"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">
              Active
            </label>
          </div>
        </div>

        {/* Preview */}
        {form.image_url && (
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preview
            </label>
            <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border-2 border-gray-300">
              <img
                src={form.image_url}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/800x600/f3f4f6/9ca3af?text=Invalid+Image+URL';
                }}
              />
              {form.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-semibold">{form.caption}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={saveItem}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Image'}
          </button>
          
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold transition-all"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-gray-200 bg-gray-50">
          <h4 className="font-bold text-lg text-gray-900">
            Gallery Images ({gallery.length})
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.caption || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x400/f3f4f6/9ca3af?text=Image+Not+Found';
                  }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 line-clamp-2">
                      {item.caption || 'No caption'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                        {item.category}
                      </span>
                      {!item.is_active && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => editItem(item)}
                    className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No gallery images yet. Add your first image above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutGalleryManager;

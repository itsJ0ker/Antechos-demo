import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Award,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';

const AccreditationManager = () => {
  const [accreditations, setAccreditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    logo_url: '',
    description: '',
    website_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchAccreditations();
  }, []);

  const fetchAccreditations = async () => {
    try {
      const { data, error } = await supabase
        .from('accreditations')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      setAccreditations(data || []);
    } catch (error) {
      console.error('Error fetching accreditations:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      full_name: '',
      logo_url: '',
      description: '',
      website_url: '',
      display_order: accreditations.length + 1,
      is_active: true
    });
    setEditingId(null);
  };

  const handleEdit = (accreditation) => {
    setFormData(accreditation);
    setEditingId(accreditation.id);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('accreditations')
          .update(formData)
          .eq('id', editingId);
        
        if (error) throw error;
        alert('Accreditation updated successfully!');
      } else {
        // Create new
        const { error } = await supabase
          .from('accreditations')
          .insert([formData]);
        
        if (error) throw error;
        alert('Accreditation created successfully!');
      }
      
      resetForm();
      fetchAccreditations();
    } catch (error) {
      console.error('Error saving accreditation:', error);
      alert('Error saving accreditation');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this accreditation?')) return;
    
    try {
      const { error } = await supabase
        .from('accreditations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      alert('Accreditation deleted successfully!');
      fetchAccreditations();
    } catch (error) {
      console.error('Error deleting accreditation:', error);
      alert('Error deleting accreditation');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('accreditations')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchAccreditations();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Accreditation Manager</h2>
        <button
          onClick={resetForm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add New Accreditation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingId ? 'Edit Accreditation' : 'Add New Accreditation'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name (Short) *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., UGC, AICTE, NAAC"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="e.g., University Grants Commission"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  placeholder="Brief description of the accreditation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">All Accreditations ({accreditations.length})</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {accreditations.map((accreditation) => (
                <div key={accreditation.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {accreditation.logo_url ? (
                          <img
                            src={accreditation.logo_url}
                            alt={accreditation.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<span class="text-xs font-bold text-gray-600">${accreditation.name.charAt(0)}</span>`;
                            }}
                          />
                        ) : (
                          <Award className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{accreditation.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            accreditation.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {accreditation.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        {accreditation.full_name && (
                          <p className="text-sm text-gray-600 mt-1">{accreditation.full_name}</p>
                        )}
                        {accreditation.description && (
                          <p className="text-sm text-gray-500 mt-1">{accreditation.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Order: {accreditation.display_order}</span>
                          {accreditation.website_url && (
                            <a
                              href={accreditation.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStatus(accreditation.id, accreditation.is_active)}
                        className="p-1 text-orange-600 hover:text-orange-800 rounded"
                        title={accreditation.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {accreditation.is_active ? '⏸️' : '▶️'}
                      </button>
                      <button
                        onClick={() => handleEdit(accreditation)}
                        className="p-1 text-blue-600 hover:text-blue-800 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(accreditation.id)}
                        className="p-1 text-red-600 hover:text-red-800 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccreditationManager;
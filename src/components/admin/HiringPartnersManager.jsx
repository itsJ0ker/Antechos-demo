import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, Edit2, X, Building2, ExternalLink } from 'lucide-react';

const HiringPartnersManager = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPartner, setNewPartner] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    industry: '',
    description: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('hiring_partners')
        .select('*')
        .order('name');

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching hiring partners:', error);
      alert('Error loading hiring partners');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newPartner.name.trim()) {
      alert('Partner name is required');
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('hiring_partners')
        .insert([newPartner])
        .select();

      if (error) throw error;

      setPartners([...partners, ...data]);
      setNewPartner({
        name: '',
        logo_url: '',
        website_url: '',
        industry: '',
        description: ''
      });
      alert('Hiring partner added successfully!');
    } catch (error) {
      console.error('Error adding hiring partner:', error);
      alert('Error adding hiring partner: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id, updates) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('hiring_partners')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setPartners(partners.map(p => p.id === id ? { ...p, ...updates } : p));
      setEditingId(null);
      alert('Hiring partner updated successfully!');
    } catch (error) {
      console.error('Error updating hiring partner:', error);
      alert('Error updating hiring partner');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hiring partner?')) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('hiring_partners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPartners(partners.filter(p => p.id !== id));
      alert('Hiring partner deleted successfully!');
    } catch (error) {
      console.error('Error deleting hiring partner:', error);
      alert('Error deleting hiring partner');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    await handleUpdate(id, { is_active: !currentStatus });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          Hiring Partners Management
        </h2>

        {/* Add New Partner Form */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Add New Hiring Partner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Partner Name *"
              value={newPartner.name}
              onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Logo URL"
              value={newPartner.logo_url}
              onChange={(e) => setNewPartner({ ...newPartner, logo_url: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Website URL"
              value={newPartner.website_url}
              onChange={(e) => setNewPartner({ ...newPartner, website_url: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Industry (e.g., Technology, Finance)"
              value={newPartner.industry}
              onChange={(e) => setNewPartner({ ...newPartner, industry: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={newPartner.description}
              onChange={(e) => setNewPartner({ ...newPartner, description: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2"
              rows="2"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={saving}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Hiring Partner
          </button>
        </div>

        {/* Partners List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            All Hiring Partners ({partners.length})
          </h3>
          
          {partners.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hiring partners yet. Add your first one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className={`border rounded-lg p-4 ${
                    partner.is_active ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  {editingId === partner.id ? (
                    <EditPartnerForm
                      partner={partner}
                      onSave={(updates) => handleUpdate(partner.id, updates)}
                      onCancel={() => setEditingId(null)}
                      saving={saving}
                    />
                  ) : (
                    <div className="flex items-start gap-4">
                      {/* Logo Preview */}
                      <div className="flex-shrink-0 w-20 h-20 border-2 border-gray-200 rounded-lg flex items-center justify-center p-2 bg-white">
                        {partner.logo_url ? (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Building2 className="w-8 h-8 text-gray-400" />
                        )}
                      </div>

                      {/* Partner Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                              {partner.name}
                              {partner.website_url && (
                                <a
                                  href={partner.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </h4>
                            {partner.industry && (
                              <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {partner.industry}
                              </span>
                            )}
                            {partner.description && (
                              <p className="text-sm text-gray-600 mt-2">{partner.description}</p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleActive(partner.id, partner.is_active)}
                              className={`px-3 py-1 rounded text-sm font-medium ${
                                partner.is_active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {partner.is_active ? 'Active' : 'Inactive'}
                            </button>
                            <button
                              onClick={() => setEditingId(partner.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(partner.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditPartnerForm = ({ partner, onSave, onCancel, saving }) => {
  const [formData, setFormData] = useState(partner);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Partner Name"
        />
        <input
          type="text"
          value={formData.logo_url || ''}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Logo URL"
        />
        <input
          type="text"
          value={formData.website_url || ''}
          onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Website URL"
        />
        <input
          type="text"
          value={formData.industry || ''}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Industry"
        />
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2"
          placeholder="Description"
          rows="2"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onSave(formData)}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HiringPartnersManager;

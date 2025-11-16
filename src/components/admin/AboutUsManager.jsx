import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Users } from 'lucide-react';

const AboutUsManager = () => {
  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('team');
  const [editingId, setEditingId] = useState(null);
  const [teamForm, setTeamForm] = useState({ name: '', position: '', bio: '', image_url: '', linkedin_url: '', email: '', is_active: true, display_order: 0 });
  const [valueForm, setValueForm] = useState({ type: 'mission', title: '', description: '', icon: '', display_order: 0 });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [teamRes, valuesRes] = await Promise.all([
        supabase.from('about_team').select('*').order('display_order'),
        supabase.from('about_values').select('*').order('display_order')
      ]);
      setTeam(teamRes.data || []);
      setValues(valuesRes.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTeam = async () => {
    if (!teamForm.name.trim()) { alert('Name required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await supabase.from('about_team').update(teamForm).eq('id', editingId);
      } else {
        await supabase.from('about_team').insert([teamForm]);
      }
      alert('Saved!');
      setTeamForm({ name: '', position: '', bio: '', image_url: '', linkedin_url: '', email: '', is_active: true, display_order: 0 });
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const saveValue = async () => {
    if (!valueForm.title.trim()) { alert('Title required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await supabase.from('about_values').update(valueForm).eq('id', editingId);
      } else {
        await supabase.from('about_values').insert([valueForm]);
      }
      alert('Saved!');
      setValueForm({ type: 'mission', title: '', description: '', icon: '', display_order: 0 });
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (table, id) => {
    if (!confirm('Delete?')) return;
    try {
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">About Us Manager</h3>
      <div className="flex gap-2 border-b">
        <button onClick={() => setActiveTab('team')} className={`px-4 py-2 ${activeTab === 'team' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Team</button>
        <button onClick={() => setActiveTab('values')} className={`px-4 py-2 ${activeTab === 'values' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}>Values</button>
      </div>

      {activeTab === 'team' && (
        <>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Team Member</h4>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name *" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
              <input type="text" placeholder="Position" value={teamForm.position} onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
              <input type="url" placeholder="Image URL" value={teamForm.image_url} onChange={(e) => setTeamForm({ ...teamForm, image_url: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" />
              <input type="url" placeholder="LinkedIn" value={teamForm.linkedin_url} onChange={(e) => setTeamForm({ ...teamForm, linkedin_url: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
              <input type="email" placeholder="Email" value={teamForm.email} onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
              <textarea placeholder="Bio" value={teamForm.bio} onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" rows={3} />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={teamForm.is_active} onChange={(e) => setTeamForm({ ...teamForm, is_active: e.target.checked })} />
                <label>Active</label>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={saveTeam} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                <Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}
              </button>
              {editingId && <button onClick={() => { setEditingId(null); setTeamForm({ name: '', position: '', bio: '', image_url: '', linkedin_url: '', email: '', is_active: true, display_order: 0 }); }} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
            </div>
          </div>
          <div className="bg-white rounded-xl border">
            <div className="px-6 py-4 border-b"><h4 className="font-bold">Team Members ({team.length})</h4></div>
            <div className="divide-y">
              {team.map((t) => (
                <div key={t.id} className="p-6 hover:bg-gray-50 flex justify-between">
                  <div className="flex gap-4">
                    {t.image_url && <img src={t.image_url} alt={t.name} className="w-16 h-16 rounded-full object-cover" />}
                    <div>
                      <h5 className="font-bold">{t.name}</h5>
                      <p className="text-sm text-gray-600">{t.position}</p>
                      {t.email && <p className="text-xs text-gray-500">{t.email}</p>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setTeamForm(t); setEditingId(t.id); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => deleteItem('about_team', t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'values' && (
        <>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Value</h4>
            <div className="grid grid-cols-2 gap-4">
              <select value={valueForm.type} onChange={(e) => setValueForm({ ...valueForm, type: e.target.value })} className="px-4 py-2 border-2 rounded-lg">
                <option value="mission">Mission</option>
                <option value="vision">Vision</option>
                <option value="values">Values</option>
              </select>
              <input type="text" placeholder="Icon (emoji)" value={valueForm.icon} onChange={(e) => setValueForm({ ...valueForm, icon: e.target.value })} className="px-4 py-2 border-2 rounded-lg" />
              <input type="text" placeholder="Title *" value={valueForm.title} onChange={(e) => setValueForm({ ...valueForm, title: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" />
              <textarea placeholder="Description" value={valueForm.description} onChange={(e) => setValueForm({ ...valueForm, description: e.target.value })} className="col-span-2 px-4 py-2 border-2 rounded-lg" rows={3} />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={saveValue} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50">
                <Save className="w-5 h-5" />{saving ? 'Saving...' : 'Save'}
              </button>
              {editingId && <button onClick={() => { setEditingId(null); setValueForm({ type: 'mission', title: '', description: '', icon: '', display_order: 0 }); }} className="px-6 py-3 bg-gray-200 rounded-lg"><X className="w-5 h-5" /></button>}
            </div>
          </div>
          <div className="bg-white rounded-xl border">
            <div className="px-6 py-4 border-b"><h4 className="font-bold">Values ({values.length})</h4></div>
            <div className="divide-y">
              {values.map((v) => (
                <div key={v.id} className="p-6 hover:bg-gray-50 flex justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {v.icon && <span className="text-2xl">{v.icon}</span>}
                      <h5 className="font-bold">{v.title}</h5>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">{v.type}</span>
                    </div>
                    <p className="text-sm text-gray-600">{v.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setValueForm(v); setEditingId(v.id); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => deleteItem('about_values', v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutUsManager;

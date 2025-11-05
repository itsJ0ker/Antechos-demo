import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase, getUniversities } from '../../lib/supabase';

const UniversityManager = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    description: '',
    about: '',
    image_url: '',
    rating: 0,
    established: '',
    campus_size: '',
    ranking: '',
    fees: '',
    fee_structure: '',
    is_active: true
  });
  const [programs, setPrograms] = useState(['']);
  const [collaborations, setCollaborations] = useState(['']);
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    setLoading(true);
    const { data, error } = await getUniversities();
    if (data) setUniversities(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUniversity) {
        // Update existing university
        const { error } = await supabase
          .from('universities')
          .update(formData)
          .eq('id', editingUniversity.id);
        
        if (error) throw error;
      } else {
        // Create new university
        const { data, error } = await supabase
          .from('universities')
          .insert([formData])
          .select()
          .single();
        
        if (error) throw error;
        
        const universityId = data.id;
        
        // Insert programs
        if (programs.filter(p => p.trim()).length > 0) {
          await supabase
            .from('university_programs')
            .insert(programs.filter(p => p.trim()).map(program => ({
              university_id: universityId,
              program_name: program.trim()
            })));
        }
        
        // Insert collaborations
        if (collaborations.filter(c => c.trim()).length > 0) {
          await supabase
            .from('university_collaborations')
            .insert(collaborations.filter(c => c.trim()).map(collaboration => ({
              university_id: universityId,
              collaboration_name: collaboration.trim()
            })));
        }
        
        // Insert FAQs
        if (faqs.filter(f => f.question.trim() && f.answer.trim()).length > 0) {
          await supabase
            .from('university_faqs')
            .insert(faqs.filter(f => f.question.trim() && f.answer.trim()).map((faq, index) => ({
              university_id: universityId,
              question: faq.question.trim(),
              answer: faq.answer.trim(),
              order_index: index + 1
            })));
        }
      }
      
      await loadUniversities();
      resetForm();
    } catch (error) {
      console.error('Error saving university:', error);
      alert('Error saving university: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData({
      name: university.name,
      code: university.code,
      location: university.location,
      description: university.description,
      about: university.about,
      image_url: university.image_url,
      rating: university.rating,
      established: university.established,
      campus_size: university.campus_size,
      ranking: university.ranking,
      fees: university.fees,
      fee_structure: university.fee_structure,
      is_active: university.is_active
    });
    
    setPrograms(university.university_programs?.map(p => p.program_name) || ['']);
    setCollaborations(university.university_collaborations?.map(c => c.collaboration_name) || ['']);
    setFaqs(university.university_faqs?.map(f => ({ question: f.question, answer: f.answer })) || [{ question: '', answer: '' }]);
    
    setShowForm(true);
  };

  const handleDelete = async (universityId) => {
    if (confirm('Are you sure you want to delete this university?')) {
      const { error } = await supabase
        .from('universities')
        .delete()
        .eq('id', universityId);
      
      if (!error) {
        await loadUniversities();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      location: '',
      description: '',
      about: '',
      image_url: '',
      rating: 0,
      established: '',
      campus_size: '',
      ranking: '',
      fees: '',
      fee_structure: '',
      is_active: true
    });
    setPrograms(['']);
    setCollaborations(['']);
    setFaqs([{ question: '', answer: '' }]);
    setEditingUniversity(null);
    setShowForm(false);
  };

  const addProgram = () => setPrograms([...programs, '']);
  const removeProgram = (index) => setPrograms(programs.filter((_, i) => i !== index));
  const updateProgram = (index, value) => {
    const newPrograms = [...programs];
    newPrograms[index] = value;
    setPrograms(newPrograms);
  };

  const addCollaboration = () => setCollaborations([...collaborations, '']);
  const removeCollaboration = (index) => setCollaborations(collaborations.filter((_, i) => i !== index));
  const updateCollaboration = (index, value) => {
    const newCollaborations = [...collaborations];
    newCollaborations[index] = value;
    setCollaborations(newCollaborations);
  };

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  if (loading && !showForm) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">University Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New University
        </button>
      </div>

      {/* University Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingUniversity ? 'Edit University' : 'Add New University'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University Code
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., AMITY-ONLINE"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Established
                    </label>
                    <input
                      type="text"
                      value={formData.established}
                      onChange={(e) => setFormData({...formData, established: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 1994"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campus Size
                    </label>
                    <input
                      type="text"
                      value={formData.campus_size}
                      onChange={(e) => setFormData({...formData, campus_size: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 400+ acres"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ranking
                    </label>
                    <input
                      type="text"
                      value={formData.ranking}
                      onChange={(e) => setFormData({...formData, ranking: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., NAAC A++"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fees Range
                    </label>
                    <input
                      type="text"
                      value={formData.fees}
                      onChange={(e) => setFormData({...formData, fees: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., ₹1,20,000 - ₹1,95,000 per year"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About (Detailed Description)
                  </label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({...formData, about: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/university-logo.jpg"
                  />
                </div>

                {/* Programs Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programs Offered
                  </label>
                  {programs.map((program, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={program}
                        onChange={(e) => updateProgram(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter program name"
                      />
                      <button
                        type="button"
                        onClick={() => removeProgram(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addProgram}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Program
                  </button>
                </div>

                {/* Collaborations Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collaborations
                  </label>
                  {collaborations.map((collaboration, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={collaboration}
                        onChange={(e) => updateCollaboration(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter collaboration"
                      />
                      <button
                        type="button"
                        onClick={() => removeCollaboration(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCollaboration}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Collaboration
                  </button>
                </div>

                {/* FAQs Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequently Asked Questions
                  </label>
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">FAQ {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, 'question', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter question"
                        />
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter answer"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFaq}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add FAQ
                  </button>
                </div>

                {/* Active Status */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
                    Active University
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : 'Save University'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Universities List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {universities.map((university) => (
                <tr key={university.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={university.image_url || '/placeholder-university.jpg'}
                        alt={university.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {university.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {university.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {university.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {university.rating}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      university.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {university.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(university)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(university.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UniversityManager;
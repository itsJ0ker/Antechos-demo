import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';

const UniversityFAQManager = ({ universityId }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order_index: 0,
  });

  useEffect(() => {
    if (universityId) {
      fetchFAQs();
    }
  }, [universityId]);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('university_faqs')
        .select('*')
        .eq('university_id', universityId)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      order_index: faqs.length,
    });
    setEditingId(null);
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order_index: faq.order_index,
    });
    setEditingId(faq.id);
  };

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Question and answer are required');
      return;
    }

    if (!universityId) {
      alert('Please select a university first');
      return;
    }

    setSaving(true);
    try {
      const faqData = {
        university_id: universityId,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        order_index: formData.order_index,
      };

      if (editingId) {
        // Update existing FAQ
        const { error } = await supabase
          .from('university_faqs')
          .update(faqData)
          .eq('id', editingId);

        if (error) throw error;
        alert('FAQ updated successfully!');
      } else {
        // Insert new FAQ
        const { error } = await supabase
          .from('university_faqs')
          .insert([faqData]);

        if (error) throw error;
        alert('FAQ added successfully!');
      }

      resetForm();
      fetchFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Error saving FAQ: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const { error } = await supabase
        .from('university_faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('FAQ deleted successfully!');
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Error deleting FAQ: ' + error.message);
    }
  };

  const moveUp = async (faq, index) => {
    if (index === 0) return;
    
    const prevFaq = faqs[index - 1];
    
    try {
      await supabase
        .from('university_faqs')
        .update({ order_index: prevFaq.order_index })
        .eq('id', faq.id);
      
      await supabase
        .from('university_faqs')
        .update({ order_index: faq.order_index })
        .eq('id', prevFaq.id);
      
      fetchFAQs();
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const moveDown = async (faq, index) => {
    if (index === faqs.length - 1) return;
    
    const nextFaq = faqs[index + 1];
    
    try {
      await supabase
        .from('university_faqs')
        .update({ order_index: nextFaq.order_index })
        .eq('id', faq.id);
      
      await supabase
        .from('university_faqs')
        .update({ order_index: faq.order_index })
        .eq('id', nextFaq.id);
      
      fetchFAQs();
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  if (!universityId) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
        <p className="text-yellow-800 font-medium">Please select a university first</p>
        <p className="text-yellow-600 text-sm mt-2">Choose a university from the list to manage its FAQs</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">FAQ Management</h3>
            <p className="text-sm text-gray-600">Add and manage frequently asked questions</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Total FAQs: <span className="font-bold text-gray-900">{faqs.length}</span>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          {editingId ? (
            <>
              <Edit className="w-5 h-5 text-purple-600" />
              Edit FAQ
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-purple-600" />
              Add New FAQ
            </>
          )}
        </h4>

        <div className="space-y-4">
          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question *
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g., What is the admission process?"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer *
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Provide a detailed answer..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Order Index */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
              min="0"
              className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 font-medium shadow-lg hover:shadow-xl"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Add FAQ'}
            </button>
            
            {editingId && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h4 className="text-lg font-bold text-white">Current FAQs</h4>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No FAQs added yet</p>
            <p className="text-gray-400 text-sm mt-2">Add your first FAQ using the form above</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Order Controls */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(faq, index)}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-xs text-gray-500 text-center">{index + 1}</span>
                    <button
                      onClick={() => moveDown(faq, index)}
                      disabled={index === faqs.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* FAQ Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <h5 className="text-lg font-bold text-gray-900">{faq.question}</h5>
                    </div>
                    <p className="text-gray-600 ml-8 whitespace-pre-wrap">{faq.answer}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-900 mb-2">💡 Tips for Great FAQs</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep questions clear and concise</li>
          <li>• Provide detailed, helpful answers</li>
          <li>• Use simple language that's easy to understand</li>
          <li>• Order FAQs from most to least common</li>
          <li>• Update regularly based on student queries</li>
        </ul>
      </div>
    </div>
  );
};

export default UniversityFAQManager;

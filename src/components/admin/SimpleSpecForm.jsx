import { Plus, Trash2, Save, X } from 'lucide-react';

const SimpleSpecForm = ({ editingSpec, setEditingSpec, onSave, onCancel, loading }) => {
  
  // Stats helpers
  const addStat = () => {
    const stats = editingSpec.industry_insight_stats || [];
    setEditingSpec({
      ...editingSpec,
      industry_insight_stats: [...stats, { label: '', value: '' }]
    });
  };

  const updateStat = (index, field, value) => {
    const stats = [...(editingSpec.industry_insight_stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    setEditingSpec({ ...editingSpec, industry_insight_stats: stats });
  };

  const removeStat = (index) => {
    const stats = [...(editingSpec.industry_insight_stats || [])];
    stats.splice(index, 1);
    setEditingSpec({ ...editingSpec, industry_insight_stats: stats });
  };

  // Highlights helpers
  const addHighlight = () => {
    const highlights = editingSpec.program_highlights || [];
    setEditingSpec({
      ...editingSpec,
      program_highlights: [...highlights, { title: '', description: '' }]
    });
  };

  const updateHighlight = (index, field, value) => {
    const highlights = [...(editingSpec.program_highlights || [])];
    highlights[index] = { ...highlights[index], [field]: value };
    setEditingSpec({ ...editingSpec, program_highlights: highlights });
  };

  const removeHighlight = (index) => {
    const highlights = [...(editingSpec.program_highlights || [])];
    highlights.splice(index, 1);
    setEditingSpec({ ...editingSpec, program_highlights: highlights });
  };

  // Semester helpers
  const addSemester = () => {
    const curriculum = editingSpec.curriculum || [];
    setEditingSpec({
      ...editingSpec,
      curriculum: [...curriculum, { semester: '', description: '', subjects: [''] }]
    });
  };

  const updateSemester = (index, field, value) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum[index] = { ...curriculum[index], [field]: value };
    setEditingSpec({ ...editingSpec, curriculum });
  };

  const removeSemester = (index) => {
    const curriculum = [...(editingSpec.curriculum || [])];
    curriculum.splice(index, 1);
    setEditingSpec({ ...editingSpec, curriculum });
  };

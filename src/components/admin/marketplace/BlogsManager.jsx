import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Edit, Trash2, Save, X, Calendar, User, Tag, Eye } from 'lucide-react';

const BlogsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    author_name: '',
    author_email: '',
    featured_image_url: '',
    is_published: true,
    is_featured: false,
    published_at: new Date().toISOString().split('T')[0]
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: '',
      tags: [],
      author_name: '',
      author_email: '',
      featured_image_url: '',
      is_published: true,
      is_featured: false,
      published_at: new Date().toISOString().split('T')[0]
    });
    setEditingId(null);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: editingId ? formData.slug : generateSlug(title)
    });
  };

  const handleTagsChange = (tagsString) => {
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags: tagsArray });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        published_at: formData.is_published ? formData.published_at : null
      };

      if (editingId) {
        await supabase
          .from('blog_posts')
          .update(dataToSave)
          .eq('id', editingId);
      } else {
        await supabase
          .from('blog_posts')
          .insert([dataToSave]);
      }
      
      alert('Blog post saved successfully!');
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await supabase.from('blog_posts').delete().eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post');
    }
  };

  const togglePublished = async (id, currentStatus) => {
    try {
      await supabase
        .from('blog_posts')
        .update({ is_published: !currentStatus })
        .eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error updating publish status:', error);
    }
  };

  if (loading) return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Blog Posts</h3>
        <div className="text-sm text-gray-600">
          Total: {items.length} | Published: {items.filter(item => item.is_published).length}
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Blog Post</h4>
        
        <div className="grid gap-4">
          {/* Title and Slug */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                placeholder="Blog post title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                placeholder="url-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea
              placeholder="Brief description of the blog post"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              rows={2}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Content *</label>
            <textarea
              placeholder="Blog post content (supports HTML)"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              rows={8}
            />
          </div>

          {/* Category and Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                placeholder="e.g., Technology, Education, Career"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="tag1, tag2, tag3"
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Author Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Author Name</label>
              <input
                type="text"
                placeholder="Author name"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author Email</label>
              <input
                type="email"
                placeholder="author@example.com"
                value={formData.author_email}
                onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Featured Image and Publish Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.featured_image_url}
                onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publish Date</label>
              <input
                type="date"
                value={formData.published_at}
                onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                className="w-full px-4 py-2 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Featured</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save'}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white rounded-xl border divide-y">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No blog posts found. Create your first blog post above.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-bold text-lg">{item.title}</h5>
                    {item.is_featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.is_published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  {item.excerpt && (
                    <p className="text-gray-600 text-sm mb-2">{item.excerpt}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {item.author_name && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.author_name}
                      </span>
                    )}
                    {item.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.published_at).toLocaleDateString()}
                      </span>
                    )}
                    {item.category && (
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {item.category}
                      </span>
                    )}
                  </div>
                  
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured Image */}
                {item.featured_image_url && (
                  <img
                    src={item.featured_image_url}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => togglePublished(item.id, item.is_published)}
                    className={`p-2 rounded ${
                      item.is_published 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    title={item.is_published ? 'Unpublish' : 'Publish'}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setFormData({
                        ...item,
                        published_at: item.published_at ? item.published_at.split('T')[0] : new Date().toISOString().split('T')[0]
                      });
                      setEditingId(item.id);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogsManager;
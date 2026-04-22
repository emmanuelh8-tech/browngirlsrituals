import { useState } from 'react';
import { useData } from '../DataContext';
import ImageUpload from '../components/ImageUpload';
import { Save, Eye, Plus, Trash2, GripVertical } from 'lucide-react';

const BlogEditor = () => {
  const { blogConfig, updateBlogConfig } = useData();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState(blogConfig);

  const handleSave = () => {
    updateBlogConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addPost = () => {
    const newId = Math.max(...formData.posts.map(p => p.id), 0) + 1;
    setFormData({
      ...formData,
      posts: [
        ...formData.posts,
        {
          id: newId,
          title: 'New Blog Post',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          image: '/images/blog-1.jpg',
          excerpt: 'Enter your blog post excerpt here...'
        }
      ]
    });
  };

  const updatePost = (index: number, field: string, value: any) => {
    const newPosts = [...formData.posts];
    newPosts[index] = { ...newPosts[index], [field]: value };
    setFormData({ ...formData, posts: newPosts });
  };

  const removePost = (index: number) => {
    const newPosts = formData.posts.filter((_, i) => i !== index);
    setFormData({ ...formData, posts: newPosts });
  };

  const movePost = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.posts.length - 1) return;
    
    const newPosts = [...formData.posts];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newPosts[index], newPosts[newIndex]] = [newPosts[newIndex], newPosts[index]];
    setFormData({ ...formData, posts: newPosts });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Edit Journal/Blog</h2>
        <div className="flex gap-3">
          <a
            href="/#blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[#8b6d4b] border border-[#8b6d4b] rounded-lg hover:bg-[#8b6d4b] hover:text-white transition-colors"
          >
            <Eye size={18} />
            Preview
          </a>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639] transition-colors"
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Section Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Section Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">"View All" Text</label>
            <input
              type="text"
              value={formData.viewAllText}
              onChange={(e) => setFormData({ ...formData, viewAllText: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">"Read More" Text</label>
          <input
            type="text"
            value={formData.readMoreText}
            onChange={(e) => setFormData({ ...formData, readMoreText: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>
      </div>

      {/* Posts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Blog Posts ({formData.posts.length})</h3>
          <button
            onClick={addPost}
            className="flex items-center gap-2 px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639]"
          >
            <Plus size={18} />
            Add Post
          </button>
        </div>

        <div className="space-y-6">
          {formData.posts.map((post, index) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => movePost(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <GripVertical className="text-gray-300" size={20} />
                  <button
                    onClick={() => movePost(index, 'down')}
                    disabled={index === formData.posts.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => updatePost(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                      <input
                        type="text"
                        value={post.date}
                        onChange={(e) => updatePost(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <ImageUpload
                    label="Featured Image"
                    value={post.image}
                    onChange={(val) => updatePost(index, 'image', val)}
                    previewHeight="150px"
                  />

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Excerpt</label>
                    <textarea
                      value={post.excerpt}
                      onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => removePost(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {formData.posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No blog posts yet. Click "Add Post" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;

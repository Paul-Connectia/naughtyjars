
import React, { useState } from 'react';
import { type Blog } from "@/types/api"

const INITIAL_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'How to brew the perfect V60',
    description: 'A deep dive into water temperatures, grind sizes and technique for the perfect pour-over.',
    image: 'https://picsum.photos/800/400?coffee=10',
    tags: ['Guide', 'Coffee'],
    date: '2023-10-15',
    createdAt: new Date().toISOString()
  }
];

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(INITIAL_BLOGS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState<Partial<Blog>>({
    title: '',
    description: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    image: 'https://picsum.photos/800/400?random=' + Math.random()
  });

  const handleOpenModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData(blog);
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        description: '',
        tags: [],
        date: new Date().toISOString().split('T')[0],
        image: 'https://picsum.photos/800/400?random=' + Math.random()
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...formData } as Blog : b));
    } else {
      const newBlog: Blog = {
        ...formData as Blog,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      setBlogs([...blogs, newBlog]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          + Create New Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute top-4 left-4 flex gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{blog.title}</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(blog)} className="text-blue-500 hover:text-blue-700">✏️</button>
                  <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
              </div>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4">{blog.description}</p>
              <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                <span>By Admin</span>
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingBlog ? 'Edit Post' : 'Create New Post'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="The Ultimate Coffee Guide"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags?.join(', ')}
                  onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Guide, Brewing, Espresso"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]"
                  placeholder="Post content summary..."
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
                {editingBlog ? 'Update Post' : 'Publish Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;

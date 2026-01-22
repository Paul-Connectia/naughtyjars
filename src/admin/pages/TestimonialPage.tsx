
import React, { useState } from 'react';
import { type Testimonial } from "@/types/api"

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    content: 'The coffee is incredible. Freshly roasted and perfect every time!',
    rating: 5,
    date: '2023-11-20',
    createdAt: new Date().toISOString()
  }
];

const TestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    content: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0]
  });

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData(testimonial);
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        content: '',
        rating: 5,
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...formData } as Testimonial : t));
    } else {
      const newTestimonial: Testimonial = {
        ...formData as Testimonial,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      setTestimonials([...testimonials, newTestimonial]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Customer Testimonials</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          + Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1 text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < t.rating ? 'opacity-100' : 'opacity-20'}>★</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(t)} className="text-blue-500">✏️</button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-500">🗑️</button>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.content}"</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{t.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input 
                  required
                  type="number" 
                  min="1" 
                  max="5"
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea 
                  required
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                  placeholder="What did they say?"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all mt-4">
                {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;

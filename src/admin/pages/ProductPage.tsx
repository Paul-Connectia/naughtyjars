import React, { useState, useEffect } from 'react';
import { type product } from "@/types/products"; // Use 'product' type, not 'Product'
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "@/api/products";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]); // Use 'product[]'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<product | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Partial<product>>({
    name: '',
    price: 0,
    weight: '',
    description: '',
    type: '',
    slug: '',
    images: ['']
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        weight: '',
        description: '',
        type: '',
        slug: '',
        images: ['']
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      const updated = await updateProduct(editingProduct._id, formData);
      if (updated) {
        setProducts(products.map(p => p._id === editingProduct._id ? updated : p));
      }
    } else {
      // Create new product - adjust based on your API requirements
      const newProduct: Omit<product, "_id" | "__v" | "createdAt" | "updatedAt"> = {
        name: formData.name || '',
        price: formData.price || 0,
        weight: formData.weight || '',
        description: formData.description || '',
        type: formData.type || '',
        slug: formData.slug || formData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || '',
        images: formData.images || [''],
      };
      
      const created = await addProduct(newProduct);
      if (created) {
        setProducts([...products, created]);
      }
    }
    setIsModalOpen(false);
    fetchProducts(); // Refresh the list
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);
      if (success) {
        setProducts(products.filter(p => p._id !== id));
      }
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products Inventory</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          + Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Weight</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Slug</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0] || "/placeholder.jpg"} className="w-12 h-12 rounded-lg object-cover" alt={product.name} />
                    <div>
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">
                    {product.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.weight}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">AED {product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{product.slug}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                    <button onClick={() => handleDelete(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({
                    ...formData, 
                    name: e.target.value,
                    slug: generateSlug(e.target.value)
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Classic Tiramisu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. classic-tiramisu"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (AED)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input 
                    required
                    type="text" 
                    value={formData.weight}
                    onChange={e => setFormData({...formData, weight: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 250 ml"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  required
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="large">Large (250ml)</option>
                  <option value="small">Small (150ml)</option>
                  <option value="box">Box</option>
                  <option value="casserole">Casserole</option>
                  <option value="minis">Minis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (comma separated URLs)</label>
                <input 
                  type="text" 
                  value={formData.images?.join(',')}
                  onChange={e => setFormData({
                    ...formData, 
                    images: e.target.value.split(',').map(img => img.trim())
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. /image1.jpg, /image2.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all mt-4">
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
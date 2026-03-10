import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Package, ShoppingCart, DollarSign, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order } from '../types';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price)
      })
    });
    if (res.ok) {
      setIsAddModalOpen(false);
      setNewProduct({ name: '', description: '', price: '', image_url: '', category: '' });
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-brand-dark/60">Manage your products and orders</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all ${activeTab === 'products' ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark border border-brand-gold/20'}`}
            >
              PRODUCTS
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest transition-all ${activeTab === 'orders' ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark border border-brand-gold/20'}`}
            >
              ORDERS
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm flex items-center space-x-6">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
              <Package size={32} />
            </div>
            <div>
              <p className="text-brand-dark/40 uppercase tracking-widest text-xs font-bold">Total Products</p>
              <p className="text-3xl font-serif font-bold">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm flex items-center space-x-6">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <ShoppingCart size={32} />
            </div>
            <div>
              <p className="text-brand-dark/40 uppercase tracking-widest text-xs font-bold">Total Orders</p>
              <p className="text-3xl font-serif font-bold">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm flex items-center space-x-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <DollarSign size={32} />
            </div>
            <div>
              <p className="text-brand-dark/40 uppercase tracking-widest text-xs font-bold">Revenue</p>
              <p className="text-3xl font-serif font-bold">Rs. {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="bg-white rounded-3xl border border-brand-gold/10 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-brand-gold/10 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Product Catalog</h2>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-brand-dark text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-brand-gold transition-colors"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-brand-dark/40 uppercase tracking-widest text-xs font-bold">
                  <tr>
                    <th className="px-8 py-4">Product</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={product.image_url} alt={product.name} className="w-12 h-16 object-cover rounded-lg" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-bold">{product.name}</p>
                            <p className="text-xs text-brand-dark/40 truncate max-w-xs">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-brand-cream border border-brand-gold/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-bold text-brand-gold">Rs. {product.price.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-brand-dark/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-brand-gold/10 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-brand-gold/10">
              <h2 className="text-2xl font-serif font-bold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-brand-dark/40 uppercase tracking-widest text-xs font-bold">
                  <tr>
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Payment</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold">#ORD-{order.id}</td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold">{order.customer_name}</p>
                          <p className="text-xs text-brand-dark/40">{order.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-brand-gold">Rs. {order.total_amount.toLocaleString()}</td>
                      <td className="px-8 py-6 uppercase tracking-widest text-[10px] font-bold">{order.payment_method}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit bg-white rounded-3xl shadow-2xl z-[110] overflow-hidden"
            >
              <div className="p-8 border-b border-brand-gold/10 flex justify-between items-center">
                <h2 className="text-3xl font-serif font-bold">Add New Dress</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Category</label>
                    <input 
                      required
                      type="text" 
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Price (Rs.)</label>
                    <input 
                      required
                      type="number" 
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Image URL</label>
                    <input 
                      required
                      type="url" 
                      value={newProduct.image_url}
                      onChange={e => setNewProduct({...newProduct, image_url: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold tracking-widest hover:bg-brand-gold transition-colors"
                >
                  SAVE PRODUCT
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

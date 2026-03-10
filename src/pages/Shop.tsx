import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Search } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function Shop({ products, onAddToCart }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            Browse through our exquisite range of handcrafted dresses, from everyday essentials to bridal masterpieces.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border-b border-brand-gold/10 pb-2">Categories</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left text-xs uppercase tracking-widest transition-colors ${
                      selectedCategory === category ? 'text-brand-gold font-bold' : 'text-brand-dark/60 hover:text-brand-gold'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-dark/40" size={16} />
              <input
                type="text"
                placeholder="SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-[10px] uppercase tracking-widest bg-transparent border-b border-brand-gold/20 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-white rounded-3xl border border-dashed border-brand-gold/30">
                <p className="text-brand-dark/40 font-serif italic text-xl">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

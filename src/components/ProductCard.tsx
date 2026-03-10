import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: number | string;
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-white text-brand-dark py-3 text-[10px] font-bold tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-brand-dark hover:text-white"
          >
            ADD TO BAG
          </button>
        </div>
      </div>
      <div className="text-left">
        <h3 className="text-xs uppercase tracking-widest text-brand-dark/80 mb-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
        <p className="text-sm font-bold text-brand-dark">Rs. {product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}

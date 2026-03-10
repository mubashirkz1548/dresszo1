import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onShopNow: () => void;
}

export default function Home({ products, onAddToCart, onShopNow }: HomeProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Model" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-brand-gold font-serif italic text-xl mb-4 tracking-widest">SUMMER COLLECTION 2026</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight">
              ELEGANCE IN EVERY STITCH
            </h1>
            <button 
              onClick={onShopNow}
              className="bg-white text-brand-dark px-12 py-4 text-[10px] font-bold tracking-[0.3em] hover:bg-brand-gold hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              SHOP THE COLLECTION
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-[0.5em] uppercase"
        >
          Scroll to Discover
        </motion.div>
      </section>

      {/* Categories Grid - Sapphire Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
              onClick={onShopNow}
            >
              <img 
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000" 
                alt="Ready To Wear" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4">
                <h3 className="text-white text-3xl font-serif font-bold mb-4 drop-shadow-lg">READY TO WEAR</h3>
                <button className="bg-white text-brand-dark px-8 py-3 text-[10px] font-bold tracking-widest hover:bg-brand-gold hover:text-white transition-all">
                  SHOP NOW
                </button>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
              onClick={onShopNow}
            >
              <img 
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=1000" 
                alt="Unstitched" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4">
                <h3 className="text-white text-3xl font-serif font-bold mb-4 drop-shadow-lg">UNSTITCHED</h3>
                <button className="bg-white text-brand-dark px-8 py-3 text-[10px] font-bold tracking-widest hover:bg-brand-gold hover:text-white transition-all">
                  SHOP NOW
                </button>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
              onClick={onShopNow}
            >
              <img 
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000" 
                alt="West" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4">
                <h3 className="text-white text-3xl font-serif font-bold mb-4 drop-shadow-lg">WEST</h3>
                <button className="bg-white text-brand-dark px-8 py-3 text-[10px] font-bold tracking-widest hover:bg-brand-gold hover:text-white transition-all">
                  SHOP NOW
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-4">Trending Now</h2>
            <h3 className="text-4xl font-serif font-bold">THE LATEST FAVORITES</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-brand-gold/30">
                <p className="text-brand-dark/40 font-serif italic">New collection coming soon...</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={onShopNow}
              className="border-b border-brand-dark text-brand-dark text-[10px] font-bold tracking-[0.3em] pb-1 hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      </section>

      {/* World of Inspiration - Sapphire Style */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-4">World of Inspiration</h2>
            <h3 className="text-4xl font-serif font-bold">CRAFTED FOR YOU</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square overflow-hidden">
              <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600" alt="Inspire 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=600" alt="Inspire 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600" alt="Inspire 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600" alt="Inspire 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold rounded-full flex items-center justify-center p-8 text-center animate-pulse">
                <p className="font-serif italic text-xl">Crafted with love in Pakistan</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-brand-gold font-serif italic text-2xl">Our Story</h2>
              <h3 className="text-5xl font-serif font-bold leading-tight">Preserving Heritage Through Modern Design</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                Dresszo was born from a passion for Pakistan's rich textile heritage. We believe that every dress tells a story of tradition, craftsmanship, and elegance. Our designs blend the intricate artistry of traditional embroidery with contemporary silhouettes, creating pieces that are both timeless and modern.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <p className="text-4xl font-serif font-bold text-brand-gold mb-2">10k+</p>
                  <p className="text-white/50 uppercase tracking-widest text-xs">Happy Customers</p>
                </div>
                <div>
                  <p className="text-4xl font-serif font-bold text-brand-gold mb-2">500+</p>
                  <p className="text-white/50 uppercase tracking-widest text-xs">Unique Designs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Join the Dresszo Circle</h2>
          <p className="text-brand-dark/60 mb-10">Subscribe to receive updates on new arrivals, exclusive offers, and styling tips.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-8 py-4 rounded-full bg-white border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
            />
            <button className="bg-brand-dark text-white px-10 py-4 rounded-full font-bold tracking-widest hover:bg-brand-gold transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col mb-6">
                <span className="text-3xl font-serif font-bold tracking-[0.3em] text-brand-dark leading-none">DRESSZO</span>
                <span className="text-[8px] uppercase tracking-[0.5em] text-brand-gold mt-1">Couture Pakistan</span>
              </div>
              <p className="text-brand-dark/60 max-w-md mb-8">
                Premium women's clothing brand from Pakistan. We bring you the finest fabrics and most exquisite designs for every occasion.
              </p>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/dresszo/?hl=en" target="_blank" rel="noopener noreferrer" className="text-brand-dark hover:text-brand-gold transition-colors">Instagram</a>
                <a href="#" className="text-brand-dark hover:text-brand-gold transition-colors">Facebook</a>
                <a href="#" className="text-brand-dark hover:text-brand-gold transition-colors">Pinterest</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
              <ul className="space-y-4 text-brand-dark/60">
                <li><button onClick={onShopNow} className="hover:text-brand-gold transition-colors">Shop All</button></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Support</h4>
              <ul className="space-y-4 text-brand-dark/60">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-brand-dark/40 text-sm border-t border-brand-gold/10 pt-10">
            © 2026 DRESSZO. All rights reserved. Designed for the modern woman.
          </div>
        </div>
      </footer>
    </div>
  );
}

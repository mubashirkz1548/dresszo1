import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onCheckout: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ cart, onRemoveFromCart, onCheckout, currentPage, setCurrentPage }: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-brand-dark">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-serif font-bold tracking-[0.2em] text-brand-dark leading-none">DRESSZO</span>
              <span className="text-[7px] uppercase tracking-[0.4em] text-brand-gold mt-1">Couture Pakistan</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${currentPage === 'home' ? 'text-brand-gold font-bold' : 'text-brand-dark hover:text-brand-gold'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${currentPage === 'shop' ? 'text-brand-gold font-bold' : 'text-brand-dark hover:text-brand-gold'}`}
            >
              New In
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-[10px] uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold transition-colors"
            >
              Ready To Wear
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-[10px] uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold transition-colors"
            >
              Unstitched
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-[10px] uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold transition-colors"
            >
              West
            </button>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-[10px] uppercase tracking-[0.2em] text-brand-dark hover:text-brand-gold transition-colors"
            >
              Modest Wear
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-brand-dark hover:text-brand-gold transition-colors">
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden bg-brand-cream border-b border-brand-gold/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-brand-dark hover:text-brand-gold"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentPage('shop'); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-brand-dark hover:text-brand-gold"
              >
                Shop
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-brand-gold/20 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-brand-gold/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag size={48} className="mx-auto text-brand-gold/30 mb-4" />
                    <p className="text-brand-dark/60 font-serif italic text-lg">Your bag is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                        <p className="text-brand-dark/60 text-sm mb-2">Qty: {item.quantity}</p>
                        <p className="font-medium text-brand-gold">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-brand-dark/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-brand-gold/20 bg-white/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-serif">Subtotal</span>
                    <span className="text-xl font-bold text-brand-gold">Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); onCheckout(); }}
                    className="w-full bg-brand-dark text-white py-4 rounded-full font-bold tracking-widest hover:bg-brand-gold transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

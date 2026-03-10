import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import { Product, CartItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchProducts();
    // Simple routing for admin
    if (window.location.pathname === '/admin') {
      setCurrentPage('admin');
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleOrderComplete = () => {
    setCart([]);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home products={products} onAddToCart={handleAddToCart} onShopNow={() => setCurrentPage('shop')} />;
      case 'shop':
        return <Shop products={products} onAddToCart={handleAddToCart} />;
      case 'admin':
        return <Admin />;
      case 'checkout':
        return <Checkout cart={cart} onOrderComplete={handleOrderComplete} />;
      default:
        return <Home products={products} onAddToCart={handleAddToCart} onShopNow={() => setCurrentPage('shop')} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart} 
        onCheckout={() => setCurrentPage('checkout')}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

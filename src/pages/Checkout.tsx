import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, CreditCard, Smartphone, Building2, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onOrderComplete: () => void;
}

export default function Checkout({ cart, onOrderComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
    payment_method: 'easypaisa'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: total,
          items: cart
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onOrderComplete();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl border border-brand-gold/20 shadow-xl text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4">Order Placed!</h2>
          <p className="text-brand-dark/60 mb-8">
            Thank you for shopping with Dresszo. We've received your order and will contact you shortly for confirmation.
          </p>
          <div className="bg-brand-cream p-6 rounded-2xl border border-brand-gold/10 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Next Steps</p>
            <p className="text-sm text-brand-dark/80">
              {formData.payment_method === 'cod' ? (
                "Your order will be delivered to your doorstep. Please have the exact amount ready for the delivery person."
              ) : (
                <>
                  Please transfer <strong>Rs. {total.toLocaleString()}</strong> to our {formData.payment_method === 'easypaisa' ? 'EasyPaisa' : formData.payment_method === 'jazzcash' ? 'JazzCash' : 'Bank'} account:
                  <br /><br />
                  <strong>Account:</strong> 0300-1234567<br />
                  <strong>Name:</strong> Dresszo Official
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold mb-12 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm">
              <h2 className="text-2xl font-serif font-bold mb-8">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.customer_name}
                    onChange={e => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.customer_email}
                      onChange={e => setFormData({...formData, customer_email: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.customer_phone}
                      onChange={e => setFormData({...formData, customer_phone: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">Shipping Address</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-brand-gold/20 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-serif font-bold mb-6">Payment Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, payment_method: 'easypaisa'})}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                        formData.payment_method === 'easypaisa' ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-brand-gold/20 text-brand-dark/40'
                      }`}
                    >
                      <Smartphone size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">EasyPaisa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, payment_method: 'jazzcash'})}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                        formData.payment_method === 'jazzcash' ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-brand-gold/20 text-brand-dark/40'
                      }`}
                    >
                      <Smartphone size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">JazzCash</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, payment_method: 'bank'})}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                        formData.payment_method === 'bank' ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-brand-gold/20 text-brand-dark/40'
                      }`}
                    >
                      <Building2 size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Bank</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, payment_method: 'cod'})}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
                        formData.payment_method === 'cod' ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' : 'border-brand-gold/20 text-brand-dark/40'
                      }`}
                    >
                      <Truck size={24} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">COD (Payment after Shipment)</span>
                    </button>
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-brand-dark text-white py-5 rounded-full font-bold tracking-widest hover:bg-brand-gold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-brand-gold/10 shadow-sm sticky top-32">
              <h2 className="text-2xl font-serif font-bold mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-brand-dark/40">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-gold/10 pt-6 space-y-4">
                <div className="flex justify-between text-brand-dark/60">
                  <span>Subtotal</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-brand-dark/60">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-2xl font-serif font-bold pt-4">
                  <span>Total</span>
                  <span className="text-brand-gold">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-brand-cream rounded-2xl border border-brand-gold/10 flex items-center space-x-4">
                <Truck className="text-brand-gold" size={24} />
                <p className="text-xs text-brand-dark/60">Estimated delivery: 3-5 business days across Pakistan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";

const CartPage = () => {
  // Mock data - Replace with your Redux or Context state later
  const cartItems = [
    {
      id: 1,
      name: "Ethereal Gold Band",
      category: "Jewelry",
      price: 1200,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3f416?auto=format&fit=crop&q=80&w=400",
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        
        {/* --- Header --- */}
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light tracking-tighter mb-4"
          >
            Your Selection
          </motion.h1>
          <div className="w-12 h-[1px] bg-yellow-600"></div>
        </header>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* --- Items List --- */}
            <div className="lg:col-span-8 space-y-8">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-white/5"
                  >
                    {/* Product Image */}
                    <div className="w-full md:w-40 h-48 bg-zinc-900 overflow-hidden rounded-sm">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-600/80 font-medium">
                        {item.category}
                      </p>
                      <h3 className="text-xl font-light tracking-tight">{item.name}</h3>
                      <p className="text-zinc-500 font-mono text-sm">${item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-6 border border-white/10 px-4 py-2 rounded-full">
                      <button className="opacity-40 hover:opacity-100 transition-opacity"><Minus size={14} /></button>
                      <span className="text-sm font-mono">{item.quantity}</span>
                      <button className="opacity-40 hover:opacity-100 transition-opacity"><Plus size={14} /></button>
                    </div>

                    {/* Total & Delete */}
                    <div className="flex flex-col items-center md:items-end gap-4 min-w-[100px]">
                      <p className="font-mono text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                      <button className="text-zinc-600 hover:text-red-400 transition-colors">
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- Summary Sidebar --- */}
            <div className="lg:col-span-4">
              <div className="bg-zinc-900/30 backdrop-blur-md border border-white/5 p-8 rounded-sm sticky top-32">
                <h3 className="text-xs uppercase tracking-[0.4em] mb-8 text-zinc-400">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-zinc-500 tracking-wide">Subtotal</span>
                    <span className="font-mono">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span className="text-zinc-500 tracking-wide">Shipping</span>
                    <span className="text-xs uppercase tracking-widest text-yellow-600/80">Complimentary</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-10 flex justify-between items-end">
                  <span className="text-sm tracking-[0.2em] uppercase">Total</span>
                  <span className="text-2xl font-light tracking-tighter text-yellow-500">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <Link 
                  to="/checkout"
                  className="group w-full bg-white text-black py-5 flex items-center justify-center gap-3 tracking-[0.3em] uppercase text-[10px] font-bold hover:bg-yellow-500 transition-colors duration-500"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="mt-6 text-[9px] text-zinc-600 text-center uppercase tracking-widest leading-loose">
                  Secure worldwide delivery <br /> In-house quality inspection included
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* --- Empty Cart State --- */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-20 text-center"
          >
            <p className="text-zinc-500 font-light italic mb-10">Your collection is currently empty.</p>
            <Link to="/shop" className="text-[10px] tracking-[0.5em] uppercase border-b border-yellow-600 pb-2 hover:text-yellow-500 transition-colors">
              Begin Exploring
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
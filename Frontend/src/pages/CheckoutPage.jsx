import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Lock, CreditCard, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 flex flex-col lg:flex-row">
      
      {/* --- Left Side: Information Flow --- */}
      <div className="flex-1 px-6 md:px-20 py-16 lg:border-r border-white/5">
        <div className="max-w-xl ml-auto">
          {/* Header */}
          <div className="mb-12">
            {/* <h1 className="text-2xl font-light tracking-[0.4em] text-white uppercase mb-2">
              Luxe<span className="italic font-serif font-normal text-zinc-500">&</span>Loom
            </h1> */}
            <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-500">
              <Link to="/cart" className="hover:text-yellow-400 transition-colors">Cart</Link>
              <ChevronLeft size={10} className="rotate-180" />
              <span className="text-white">Information</span>
              <ChevronLeft size={10} className="rotate-180" />
              <span>Shipping</span>
              <ChevronLeft size={10} className="rotate-180" />
              <span>Payment</span>
            </nav>
          </div>

          <form className="space-y-10">
            {/* Contact Section */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Contact</h2>
                <button type="button" className="text-[10px] text-yellow-400 underline tracking-widest uppercase">Log in</button>
              </div>
              <input 
                type="text" 
                placeholder="Email or mobile phone number" 
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-600 rounded-sm"
              />
            </section>

            {/* Delivery Section */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <select className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm">
                    <option>Pakistan</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                  </select>
                </div>
                <input type="text" placeholder="First name" className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm" />
                <input type="text" placeholder="Last name" className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm" />
                <input type="text" placeholder="Address" className="col-span-2 bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm" />
                <input type="text" placeholder="City" className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm" />
                <input type="text" placeholder="Postal code" className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-yellow-400 outline-none rounded-sm" />
              </div>
            </section>

            {/* Payment Section - Mapped to the image style but premium */}
            <section className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={18} className="text-yellow-400" />
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">Payment Method</h2>
              </div>
              <div className="flex items-center justify-between p-4 border border-yellow-400/50 bg-yellow-400/5 rounded-sm">
                <span className="text-sm">Cash on Delivery (COD)</span>
                <div className="w-4 h-4 rounded-full border-4 border-yellow-400 bg-black" />
              </div>    
            </section>

            <button className="w-full bg-white text-black py-5 text-xs font-bold tracking-[0.3em] uppercase hover:bg-yellow-400 transition-colors duration-500 flex items-center justify-center gap-2 group">
              Complete Order
              <ChevronLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex gap-6 text-[9px] tracking-widest text-zinc-600 uppercase">
            <span>Refund Policy</span>
            <span>Shipping Policy</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* --- Right Side: Order Summary --- */}
      <div className="w-full lg:w-[450px] bg-zinc-900/30 backdrop-blur-3xl px-6 md:px-12 py-16">
        <div className="max-w-sm mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white mb-8">Order Summary</h2>
          
          {/* Cart Item */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-20 bg-zinc-800 rounded-sm overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=200" alt="product" className="w-full h-full object-cover grayscale" />
              </div>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-700 text-[10px] text-white flex items-center justify-center rounded-full border border-black">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">Heritage Automatic / Matte Black</h3>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">42mm / Steel</p>
            </div>
            <span className="text-xs font-mono text-white">Rs 1,500.00</span>
          </div>

          {/* Discount Code */}
          <div className="flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder="Discount code" 
              className="flex-1 bg-transparent border border-white/10 px-4 py-2.5 text-xs focus:border-yellow-400 outline-none transition-all rounded-sm"
            />
            <button className="px-6 py-2.5 bg-zinc-800 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-zinc-700 transition-colors rounded-sm">Apply</button>
          </div>

          {/* Totals */}
          <div className="space-y-3 pt-6 border-t border-white/5">
            <div className="flex justify-between text-xs tracking-widest uppercase">
              <span className="text-zinc-500">Subtotal</span>
              <span className="text-white">Rs 1,500.00</span>
            </div>
            <div className="flex justify-between text-xs tracking-widest uppercase">
              <span className="text-zinc-500">Shipping</span>
              <span className="text-white">Rs 99.00</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">Total</span>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 mr-2 uppercase">PKR</span>
                <span className="text-xl font-mono text-yellow-400">Rs 1,599.00</span>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 border border-white/5 bg-white/[0.01] flex items-center gap-4">
             <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-full">
                <Lock size={16} className="text-zinc-500" />
             </div>
             <div>
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Secure Checkout</p>
                <p className="text-[9px] text-zinc-500 leading-tight">All transactions are encrypted and secure.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
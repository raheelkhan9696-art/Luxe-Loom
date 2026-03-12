import React from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, ArrowUpRight, Search } from "lucide-react";

const OrderHistory = () => {
  const orders = [
    {
      id: "LX-99281",
      name: "Women Zip-Front Relaxed Fit Jacket",
      price: 78.00,
      quantity: 1,
      size: "S",
      date: "Thu Mar 12 2026",
      status: "Order Placed",
      payment: "COD",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300"
    },
    {
      id: "LX-98442",
      name: "Men Round Neck Pure Cotton T-shirt",
      price: 64.00,
      quantity: 2,
      size: "XXL",
      date: "Tue Mar 10 2026",
      status: "Packing",
      payment: "COD",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-white uppercase tracking-tighter mb-4">
              My <span className="italic font-serif">Orders</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">
              Track your curated collection and history
            </p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-0 bottom-3 w-4 h-4 text-zinc-600 group-focus-within:text-gold transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH ORDER ID" 
              className="w-full bg-transparent border-b border-white/10 pl-8 py-2 text-[10px] tracking-widest outline-none focus:border-gold transition-colors"
            />
          </div>
        </header>

        {/* --- Orders List --- */}
        <div className="space-y-12">
          {orders.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-sm hover:border-white/10 transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-10">
                
                {/* Product Preview */}
                <div className="flex gap-8 flex-1">
                  <div className="w-24 h-32 bg-zinc-900 overflow-hidden border border-white/5 shrink-0">
                    <img src={order.image} alt={order.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] tracking-[0.2em] text-gold font-bold uppercase">{order.id}</p>
                    <h3 className="text-sm md:text-base font-light text-white uppercase tracking-wider">{order.name}</h3>
                    
                    <div className="flex gap-6 text-[10px] tracking-widest text-zinc-500 uppercase pt-2">
                      <span>Qty: {order.quantity}</span>
                      <span>Size: {order.size}</span>
                    </div>
                    
                    <div className="flex gap-6 text-[10px] tracking-widest text-zinc-400 uppercase">
                      <span>Date: {order.date}</span>
                      <span>Payment: {order.payment}</span>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="flex-1 flex items-center justify-between lg:justify-center gap-12 border-y lg:border-y-0 lg:border-x border-white/5 py-6 lg:py-0">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {order.status === "Order Placed" ? (
                        <CheckCircle size={18} className="text-gold" />
                      ) : (
                        <Clock size={18} className="text-zinc-600" />
                      )}
                      <div className="absolute top-1/2 left-full w-8 h-[1px] bg-white/5 ml-2 hidden md:block"></div>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-1">Status</p>
                      <p className={`text-xs uppercase tracking-widest ${order.status === "Order Placed" ? "text-white" : "text-zinc-400 italic"}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>

                  <div className="text-right lg:text-left">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-1">Total</p>
                    <p className="text-lg font-mono text-white">${order.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col justify-between items-center lg:justify-center gap-4">
                  <button className="flex-1 lg:w-40 py-3 border border-white/10 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
                    Track Order
                  </button>
                  <button className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-zinc-600 hover:text-gold transition-colors">
                    DETAILS <ArrowUpRight size={12} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Empty State / Support Footer --- */}
        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <div className="flex items-center gap-3">
            <Package size={16} strokeWidth={1.2} />
            <span className="text-[10px] tracking-widest uppercase text-zinc-400">Secure Delivery via Premium Courier</span>
          </div>
          <p className="text-[9px] tracking-widest uppercase">Issues with an order? Contact Concierge</p>
        </footer>

      </div>
    </div>
  );
};

export default OrderHistory;
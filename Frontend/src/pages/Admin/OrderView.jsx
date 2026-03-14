import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Printer, Truck, MapPin, CreditCard, Mail, Phone } from "lucide-react";

const OrdersView = ({ orderId = "LX-99281", onBack }) => {
  // Mock data based on your order history and checkout structure
  const orderData = {
    id: orderId,
    date: "March 12, 2026",
    status: "Processing",
    customer: {
      name: "Urooj S.",
      email: "urooj.s@example.com",
      phone: "+92 300 1234567",
      address: "House 42, Street 5, Sector F-7/2, Islamabad, Pakistan"
    },
    items: [
      { name: "Cosmograph Daytona", sku: "LL-WAT-001", price: 1599.00, qty: 1, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200" },
      { name: "Heritage yellow-400 Ring", sku: "LL-JWL-042", price: 850.00, qty: 1, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200" }
    ],
    payment: {
      method: "Cash on Delivery (COD)",
      subtotal: 2449.00,
      shipping: 99.00,
      total: 2548.00
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-10"
    >
      {/* --- Action Bar --- */}
      <div className="flex justify-between items-center pb-8 border-b border-white/5">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Orders
        </button>
        <div className="flex gap-4">
          <button className="p-3 border border-white/10 hover:bg-white/5 transition-all text-zinc-400">
            <Printer size={16} />
          </button>
          <button className="bg-white text-black px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-yellow-400 transition-colors">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- Left Column: Items & Timeline --- */}
        <div className="lg:col-span-2 space-y-10">
          {/* Order Items */}
          <section className="bg-white/[0.02] border border-white/5 p-8 rounded-sm">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-yellow-400 mb-8 font-bold">Consignment Details</h3>
            <div className="space-y-6">
              {orderData.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                  <div className="flex gap-6 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover grayscale opacity-60 rounded-sm" />
                    <div>
                      <p className="text-sm text-white uppercase tracking-wider font-light">{item.name}</p>
                      <p className="text-[9px] text-zinc-600 tracking-widest uppercase mt-1">SKU: {item.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400">Qty: {item.qty}</p>
                    <p className="text-sm font-mono text-white mt-1">Rs {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Order Timeline */}
          <section className="bg-white/[0.02] border border-white/5 p-8 rounded-sm">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-yellow-400 mb-8 font-bold">Lifecycle</h3>
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              <div className="relative flex flex-col gap-1">
                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                </div>
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">Order Placed</p>
                <p className="text-[9px] text-zinc-600 uppercase">March 12, 2026 — 10:45 AM</p>
              </div>
              <div className="relative flex flex-col gap-1 opacity-40">
                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>
                <p className="text-[10px] text-white font-bold uppercase tracking-widest">Awaiting Logistics</p>
                <p className="text-[9px] text-zinc-600 uppercase">Pending Verification</p>
              </div>
            </div>
          </section>
        </div>

        {/* --- Right Column: Customer & Payment --- */}
        <div className="space-y-10">
          {/* Customer Info */}
          <section className="bg-white/[0.02] border border-white/5 p-8 rounded-sm space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-yellow-400 font-bold">Client Profile</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-sm"><Mail size={14} className="text-zinc-500" /></div>
                <div>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xs text-white underline cursor-pointer">{orderData.customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-sm"><Phone size={14} className="text-zinc-500" /></div>
                <div>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-xs text-white">{orderData.customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-sm"><MapPin size={14} className="text-zinc-500" /></div>
                <div>
                  <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Shipping Destination</p>
                  <p className="text-xs text-white leading-relaxed">{orderData.customer.address}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Summary */}
          <section className="bg-white/[0.02] border border-white/5 p-8 rounded-sm space-y-6">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-yellow-400 font-bold">Financial Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 uppercase tracking-widest">Subtotal</span>
                <span className="font-mono text-white">Rs {orderData.payment.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500 uppercase tracking-widest">Shipping</span>
                <span className="font-mono text-white">Rs {orderData.payment.shipping.toLocaleString()}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-white/5 flex justify-between">
                <span className="text-[10px] text-white font-bold uppercase tracking-widest">Total</span>
                <span className="text-lg font-mono text-yellow-400 font-bold underline decoration-double">Rs {orderData.payment.total.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 p-4 border border-white/5 bg-white/[0.01] flex items-center gap-3">
              <CreditCard size={16} className="text-zinc-600" />
              <p className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">{orderData.payment.method}</p>
            </div>
          </section>
        </div>

      </div>
    </motion.div>
  );
};

export default OrdersView;
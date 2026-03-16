import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Search,
  Loader2,
  XCircle,
  Truck
} from "lucide-react";
import axios from "axios";

const BASE_URL =import.meta.env.VITE_API_URL ;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your order history.");
        setLoading(false);
        return;
      }

      // Hits the /myorders endpoint
      const response = await axios.get(`${BASE_URL}/api/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      setError(err.response?.status === 401 ? "Session expired." : "Unable to retrieve acquisitions.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems?.[0]?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status Helper Function
  const getStatusDetails = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "text-green-500", icon: <CheckCircle size={18} />, label: "Delivered" };
      case "Shipped":
        return { color: "text-blue-400", icon: <Truck size={18} className="animate-bounce" />, label: "In Transit" };
      case "Cancelled":
        return { color: "text-red-500", icon: <XCircle size={18} />, label: "Cancelled" };
      default:
        return { color: "text-yellow-400", icon: <Clock size={18} className="animate-pulse" />, label: "Processing" };
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-white uppercase tracking-tighter mb-4">
              My <span className="italic font-serif text-yellow-500/80">Acquisitions</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">
              The Ledger of your curated collection
            </p>
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-0 bottom-3 w-4 h-4 text-zinc-600 group-focus-within:text-yellow-400 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH BY ID OR ITEM"
              className="w-full bg-transparent border-b border-white/10 pl-8 py-2 text-[10px] tracking-widest outline-none focus:border-yellow-400 transition-colors uppercase"
            />
          </div>
        </header>

        <div className="space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
              <Loader2 className="animate-spin text-yellow-400" size={32} />
              <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-zinc-400">Synchronizing Vault</p>
            </div>
          ) : error ? (
            <div className="py-20 border border-red-500/10 bg-red-500/5 text-center rounded-sm">
              <p className="text-[10px] tracking-widest uppercase text-red-400">{error}</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 border border-white/5 text-center rounded-sm bg-white/[0.01]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 italic">No historical records found</p>
            </div>
          ) : (
            filteredOrders.map((order, index) => {
              const status = getStatusDetails(order.status);
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-sm hover:border-white/10 hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Item Preview */}
                    <div className="flex gap-8 flex-1">
                      <div className="w-24 h-32 bg-zinc-900 overflow-hidden border border-white/5 shrink-0 relative">
                        <img
                          src={order.orderItems?.[0]?.image || "https://placehold.co/200x300?text=Luxe"}
                          alt="Product"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        {order.orderItems?.length > 1 && (
                          <div className="absolute bottom-0 right-0 bg-yellow-500 text-black text-[8px] font-bold px-1.5 py-0.5">
                            +{order.orderItems.length - 1}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <p className="text-[9px] tracking-[0.3em] text-yellow-500/60 font-bold uppercase">
                          ARCHIVE ID: {order._id.slice(-12).toUpperCase()}
                        </p>
                        <h3 className="text-sm md:text-lg font-light text-white uppercase tracking-wider leading-tight">
                          {order.orderItems?.[0]?.name || "Bespoke Selection"}
                        </h3>
                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                          <span className="flex items-center gap-1.5"><Package size={10} /> {order.orderItems?.length} Unit(s)</span>
                          <span>Method: {order.paymentMethod}</span>
                          <span className="text-zinc-400">Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Tracker */}
                    <div className="flex-1 flex items-center justify-between lg:justify-center gap-12 border-y lg:border-y-0 lg:border-x border-white/5 py-8 lg:py-0">
                      <div className="flex items-center gap-4">
                        <div className={`${status.color} bg-white/[0.03] p-3 rounded-full border border-current/10`}>
                          {status.icon}
                        </div>
                        <div>
                          <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-600 mb-1">Status</p>
                          <p className={`text-xs uppercase tracking-widest font-bold ${status.color}`}>
                            {status.label}
                          </p>
                        </div>
                      </div>

                      <div className="text-right lg:text-left">
                        <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-600 mb-1">Total Value</p>
                        <p className="text-xl font-mono text-white tracking-tighter">
                          Rs {order.totalPrice?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex lg:flex-col justify-between items-center lg:justify-center gap-4">
                      <button 
                        disabled={order.status === "Cancelled"}
                        className={`flex-1 lg:w-44 py-3.5 border border-white/10 text-[9px] tracking-[0.4em] uppercase transition-all
                          ${order.status === "Cancelled" ? "opacity-20 cursor-not-allowed" : "hover:bg-white hover:text-black hover:border-white shadow-lg hover:shadow-white/5"}`}
                      >
                        {order.status === "Delivered" ? "Review Item" : "Track Order"}
                      </button>
                      <button className="flex items-center gap-2 text-[8px] tracking-[0.3em] uppercase text-zinc-500 hover:text-yellow-400 transition-colors group/btn">
                        Manifest Details <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <div className="flex items-center gap-3">
            <Package size={14} />
            <span className="text-[9px] tracking-widest uppercase">Concierge-Verified Packaging</span>
          </div>
          <p className="text-[8px] tracking-widest uppercase">Luxe & Loom — Timeless Precision</p>
        </footer>
      </div>
    </div>
  );
};

export default OrderHistory;
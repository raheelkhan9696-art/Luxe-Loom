import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Search,
  Loader2,
  XCircle,
  Truck,
  ChevronLeft
} from "lucide-react";
// Import your existing axiosInstance for consistent auth headers
import axiosInstance from "../utils/axiosInstance";
import apiPath from "../utils/apiPath";

const OrderHistory = () => {
  const navigate = useNavigate();
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
      // Using axiosInstance automatically handles the Bearer token if you set it up there
      // Otherwise, the header is added below as a fallback
      const response = await axiosInstance.get(apiPath.ORDERS.MY_ORDERS || "/api/orders/myorders");
      
      const data = response.data;
      // Handle different possible response structures
      const ordersList = Array.isArray(data) ? data : data.orders || [];
      setOrders(ordersList);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(
        err.response?.status === 401 
          ? "Session expired. Please log in again." 
          : "Unable to retrieve acquisitions at this time."
      );
    } finally {
      setLoading(false);
    }
  };

  // Improved filtering: search through Order ID, Order Number, and all item names
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesId = order._id.toLowerCase().includes(searchLower);
    const matchesNumber = order.orderNumber?.toLowerCase().includes(searchLower);
    const matchesItems = order.orderItems?.some(item => 
      item.name.toLowerCase().includes(searchLower)
    );
    return matchesId || matchesNumber || matchesItems;
  });

  const getStatusDetails = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "text-green-500", icon: <CheckCircle size={18} />, label: "Delivered" };
      case "Shipped":
        return { color: "text-blue-400", icon: <Truck size={18} className="animate-pulse" />, label: "In Transit" };
      case "Cancelled":
        return { color: "text-red-500", icon: <XCircle size={18} />, label: "Cancelled" };
      default:
        return { color: "text-yellow-400", icon: <Clock size={18} className="animate-pulse" />, label: "Processing" };
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-600 mb-6">
              <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              <ChevronLeft size={10} className="rotate-180 opacity-30" />
              <span className="text-white font-bold tracking-[0.2em]">Ledger</span>
            </nav>
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
              placeholder="SEARCH BY ORDER # OR ITEM"
              className="w-full bg-transparent border-b border-white/10 pl-8 py-2 text-[10px] tracking-widest outline-none focus:border-yellow-400 transition-colors uppercase"
            />
          </div>
        </header>

        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
              <Loader2 className="animate-spin text-yellow-400" size={32} />
              <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-zinc-400">Synchronizing Vault</p>
            </div>
          ) : error ? (
            <div className="py-20 border border-red-500/10 bg-red-500/5 text-center rounded-sm">
              <p className="text-[10px] tracking-widest uppercase text-red-400 mb-4">{error}</p>
              <Link to="/login" className="text-[10px] text-white underline underline-offset-4 uppercase tracking-widest">Re-authenticate</Link>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 border border-white/5 text-center rounded-sm bg-white/[0.01]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 italic">No historical records found</p>
              <Link to="/collection" className="mt-6 inline-block text-[10px] text-yellow-500 uppercase tracking-[0.2em] border border-yellow-500/20 px-6 py-3 hover:bg-yellow-500 hover:text-black transition-all">Explore Collection</Link>
            </div>
          ) : (
            filteredOrders.map((order, index) => {
              const status = getStatusDetails(order.status);
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white/[0.02] border border-white/5 p-5 md:p-8 rounded-sm hover:border-white/10 hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
                    {/* Item Preview */}
                    <div className="flex gap-6 flex-1">
                      <div className="w-20 h-28 md:w-24 md:h-32 bg-zinc-900 overflow-hidden border border-white/5 shrink-0 relative">
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

                      <div className="space-y-2">
                        <p className="text-[9px] tracking-[0.3em] text-yellow-500/60 font-bold uppercase">
                          {order.orderNumber || `ARCHIVE ID: ${order._id.slice(-8).toUpperCase()}`}
                        </p>
                        <h3 className="text-sm md:text-base font-light text-white uppercase tracking-wider leading-tight">
                          {order.orderItems?.[0]?.name || "Bespoke Selection"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6 text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                          <span className="flex items-center gap-1.5"><Package size={10} /> {order.orderItems?.reduce((acc, item) => acc + item.qty, 0)} Unit(s)</span>
                          <span>{order.paymentMethod}</span>
                          <span className="text-zinc-400">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Price */}
                    <div className="flex flex-row lg:flex-row items-center justify-between lg:justify-end gap-10 lg:gap-16 border-y lg:border-y-0 py-6 lg:py-0 border-white/5">
                      <div className="flex items-center gap-4">
                        <div className={`${status.color} bg-white/[0.02] p-2.5 rounded-full border border-current/10`}>
                          {status.icon}
                        </div>
                        <div>
                          <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 mb-0.5">Status</p>
                          <p className={`text-[10px] uppercase tracking-widest font-bold ${status.color}`}>
                            {status.label}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 mb-0.5">Value</p>
                        <p className="text-lg font-mono text-white tracking-tighter">
                          Rs {order.totalPrice?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col items-center gap-4">
                      <button 
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className={`w-full lg:w-40 py-3 border border-white/10 text-[9px] tracking-[0.4em] uppercase transition-all
                          ${order.status === "Cancelled" ? "opacity-20 cursor-not-allowed" : "hover:bg-white hover:text-black shadow-lg shadow-white/0 hover:shadow-white/5"}`}
                      >
                        {order.status === "Delivered" ? "Review" : "Track"}
                      </button>
                      <button 
                        onClick={() => navigate(`/orders/${order._id}`)}
                        className="hidden lg:flex items-center gap-2 text-[8px] tracking-[0.3em] uppercase text-zinc-500 hover:text-yellow-400 transition-colors group/btn"
                      >
                        Manifest <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
            <ShieldCheck size={14} className="text-yellow-500" />
            <span className="text-[9px] tracking-widest uppercase">Verified Secure Registry</span>
          </div>
          <p className="text-[8px] tracking-widest uppercase">Luxe & Loom — Timeless Precision</p>
        </footer>
      </div>
    </div>
  );
};

// Simple icon replacement for missing ShieldCheck in imports
const ShieldCheck = ({ size, className }) => (
  <svg size={size} className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default OrderHistory;
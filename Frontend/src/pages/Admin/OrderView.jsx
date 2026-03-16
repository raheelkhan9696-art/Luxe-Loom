import React, { useState, useEffect } from "react";
// 1. IMPORT CUSTOM INSTANCE
import axiosInstance from "../../utils/axiosInstance";
import apiPath from "../../utils/apiPath";
import { 
  Loader2, 
  Eye, 
  RefreshCcw, 
  ArrowLeft, 
  Package, 
  User, 
  MapPin, 
  CreditCard,
  Hash,
  Truck
} from "lucide-react";
import { toast } from "react-hot-toast";

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // 2. USE AXIOS INSTANCE (Token handled automatically)
      const { data } = await axiosInstance.get(apiPath.ORDERS.GET_ALL);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err || "Archive connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleViewDetails = async (id) => {
    try {
      setDetailsLoading(true);
      const { data } = await axiosInstance.get(apiPath.ORDERS.GET_BY_ID(id));
      setSelectedOrder(data);
    } catch (err) {
      toast.error(err || "Failed to retrieve manifest details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await axiosInstance.patch(apiPath.ADMIN.UPDATE_ORDER_STATUS(orderId), 
        { status: newStatus }
      );
      
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
      
      toast.success(`Registry updated to ${newStatus}`);
    } catch (err) {
      toast.error(err || "Status transition failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading || detailsLoading) return (
    <div className="py-40 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-yellow-400" size={30} />
      <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-bold">Accessing Secure Vault</p>
    </div>
  );

  // --- DETAIL VIEW ---
  if (selectedOrder) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
          <button 
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-zinc-500 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Registry
          </button>
          <div className="w-full md:w-auto flex justify-between md:block items-center">
            <p className="text-[9px] uppercase text-zinc-600 tracking-widest mb-1 md:text-right">Status Protocol</p>
            <span className={`px-3 py-1 text-[10px] uppercase font-bold border ${
              selectedOrder.status === 'Delivered' ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-400'
            }`}>
              {selectedOrder.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-sm">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-8 flex items-center gap-2">
                <Package size={14} /> Item Manifest
              </h2>
              <div className="space-y-6">
                {selectedOrder.orderItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-white/5 last:border-0">
                    <div className="w-full sm:w-20 h-40 sm:h-24 bg-zinc-900 border border-white/5 overflow-hidden">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-white uppercase tracking-wider font-light">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase">Quantity: {item.qty}</p>
                    </div>
                    <div className="w-full sm:w-auto flex justify-between sm:block border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                      <p className="text-[9px] text-zinc-600 uppercase mb-1 sm:text-right">Unit Price</p>
                      <p className="font-mono text-white text-xs sm:text-right">Rs {item.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 p-6 md:p-8 rounded-sm space-y-4 shadow-2xl">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-yellow-500 font-bold mb-4">Financial Details</h3>
              <div className="flex justify-between items-end text-[10px] uppercase text-zinc-500">
                <span>Registry Total</span>
                <span className="text-xl font-mono text-white italic">Rs {selectedOrder.totalPrice?.toLocaleString()}</span>
              </div>
              <p className="text-[8px] text-zinc-600 uppercase pt-4 border-t border-white/5 flex items-center gap-2">
                <CreditCard size={10} /> Method: {selectedOrder.paymentMethod}
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-sm space-y-8">
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2"><User size={12}/> Client Profile</p>
                <p className="text-sm text-zinc-300 uppercase tracking-tighter">{selectedOrder.user?.name || selectedOrder.shippingAddress?.name}</p>
                <p className="text-[10px] text-zinc-500 lowercase font-mono break-all">{selectedOrder.user?.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2"><MapPin size={12}/> Delivery Coordinates</p>
                <p className="text-[10px] text-zinc-400 uppercase leading-relaxed font-light">
                  {selectedOrder.shippingAddress?.address}<br/>
                  {selectedOrder.shippingAddress?.phoneno && `Contact: ${selectedOrder.shippingAddress.phoneno}`}<br/>
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="space-y-4">
      <div className="hidden md:block border border-white/5 bg-white/[0.01] rounded-sm overflow-hidden animate-in fade-in duration-1000">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-zinc-500">
            <tr>
              <th className="p-5 font-bold">ID</th>
              <th className="p-5 font-bold">Client</th>
              <th className="p-5 font-bold text-center">Valuation</th>
              <th className="p-5 font-bold">Status Update</th>
              <th className="p-5 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="p-5 font-mono text-white">
                  <span className="text-zinc-700 font-bold">#</span>{order._id.slice(-6).toUpperCase()}
                </td>
                <td className="p-5 text-zinc-400 uppercase tracking-tighter">
                  {order.user?.name || "Private Client"}
                </td>
                <td className="p-5 text-yellow-400 font-mono italic text-center">
                  Rs {order.totalPrice?.toLocaleString()}
                </td>
                <td className="p-5">
                  {updatingId === order._id ? (
                      <div className="flex items-center gap-2 text-[9px] text-yellow-400 px-3 py-1.5 animate-pulse font-bold tracking-widest border border-yellow-500/20 bg-yellow-500/5">
                          <RefreshCcw size={10} className="animate-spin" /> SYNCING
                      </div>
                  ) : (
                      <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`bg-black border border-white/10 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-sm outline-none cursor-pointer transition-all hover:border-yellow-400/50 ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-400'}`}
                      >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                      </select>
                  )}
                </td>
                <td className="p-5 text-right">
                  <button onClick={() => handleViewDetails(order._id)} className="p-2.5 border border-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all rounded-sm inline-flex items-center gap-2 group-hover:border-white/20">
                    <Eye size={14} />
                    <span className="text-[9px] uppercase tracking-widest">Manifest</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white/[0.02] border border-white/5 p-5 rounded-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] text-zinc-600 flex items-center gap-1 uppercase tracking-tighter mb-1">
                  <Hash size={10} /> Record ID
                </p>
                <p className="font-mono text-white text-sm">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <button 
                onClick={() => handleViewDetails(order._id)}
                className="p-3 bg-white/5 border border-white/10 rounded-sm text-zinc-400"
              >
                <Eye size={16} />
              </button>
            </div>

            <div className="flex justify-between items-center bg-black/40 p-3 rounded-sm border border-white/5">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase text-zinc-500 mb-1">Client</span>
                <span className="text-[10px] text-zinc-300 uppercase truncate max-w-[120px]">
                  {order.user?.name || "Guest"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[8px] uppercase text-zinc-500 mb-1 block">Total Valuation</span>
                <span className="text-xs text-yellow-400 font-mono">Rs {order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[8px] uppercase text-zinc-600 mb-2 flex items-center gap-1">
                <Truck size={10}/> Registry Status
              </p>
              {updatingId === order._id ? (
                <div className="w-full py-3 bg-yellow-500/5 text-yellow-400 text-[10px] font-bold text-center animate-pulse tracking-[0.3em]">
                  UPDATING VAULT...
                </div>
              ) : (
                <select 
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`w-full bg-black border border-white/10 text-[10px] uppercase font-bold tracking-[0.2em] py-3 px-4 rounded-sm outline-none ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-400'}`}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="py-20 text-center border border-dashed border-white/5 rounded-sm">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest italic opacity-50">Secure Registry is Empty</p>
        </div>
      )}
    </div>
  );
};

export default OrderView;
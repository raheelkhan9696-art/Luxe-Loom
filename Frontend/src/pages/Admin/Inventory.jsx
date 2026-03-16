import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Loader2, Search, Trash2, Edit3, X, Check, Package, Layers } from "lucide-react";
// 1. IMPORT YOUR CUSTOM INSTANCE
import axiosInstance from "../../utils/axiosInstance";
import apiPath from "../../utils/apiPath";
import { toast } from "react-hot-toast";

const InventoryView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionId, setActionId] = useState(null);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: 0, countInStock: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      // 2. SIMPLIFIED GET REQUEST
      const response = await axiosInstance.get(apiPath.PRODUCT.GET_ALL);
      const data = response.data.products || response.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err || "Failed to synchronize with Vault");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Purge this asset from the Registry?")) return;
    try {
      // 3. SECURE DELETE REQUEST
      await axiosInstance.delete(apiPath.ADMIN.DELETE_PRODUCT(id));
      toast.success("Asset removed");
      setProducts(prev => prev.filter(item => item._id !== id));
      setActionId(null);
    } catch (err) {
      toast.error(err || "De-acquisition failed");
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditForm({ price: item.price, countInStock: item.countInStock });
    setActionId(null);
  };

  const handleUpdate = async (id) => {
    try {
      // 4. SECURE PUT REQUEST
      await axiosInstance.put(apiPath.ADMIN.UPDATE_PRODUCT(id), editForm);
      toast.success("Archive updated");
      setProducts(prev => prev.map(p => p._id === id ? { ...p, ...editForm } : p));
      setEditingId(null);
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  const filteredProducts = products.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item._id.includes(searchTerm)
  );

  if (loading) return (
    <div className="py-40 flex flex-col items-center justify-center gap-4 opacity-40">
      <Loader2 className="animate-spin text-yellow-400" />
      <p className="text-[10px] tracking-[0.5em] text-white font-bold uppercase">Opening Vault</p>
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Search Header */}
      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm">
        <div className="flex items-center gap-4 px-2 w-full max-w-md">
          <Search size={14} className="text-zinc-600" />
          <input 
            type="text" 
            placeholder="SEARCH ARCHIVE..." 
            className="bg-transparent text-[10px] uppercase tracking-widest text-white focus:outline-none w-full" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white/[0.02] border border-white/5 rounded-sm overflow-visible">
        <table className="w-full text-left">
          <thead className="border-b border-white/5 bg-white/[0.01]">
            <tr className="text-[9px] tracking-[0.3em] uppercase text-zinc-500">
              <th className="px-8 py-5">Product</th>
              <th className="px-8 py-5">Quantity</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {filteredProducts.map((item) => (
              <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={item.mainImage} className="w-10 h-10 object-cover border border-white/5 grayscale" alt="" />
                    <div className="flex flex-col">
                      <span className="text-white uppercase tracking-wider">{item.name}</span>
                      <span className="text-[8px] text-zinc-600">{item.category}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  {editingId === item._id ? (
                    <input 
                      type="number" 
                      className="bg-black border border-white/20 text-yellow-400 w-16 p-1 rounded-sm outline-none"
                      value={editForm.countInStock}
                      onChange={(e) => setEditForm({...editForm, countInStock: e.target.value})}
                    />
                  ) : (
                    <span className={item.countInStock < 5 ? "text-yellow-400 font-bold" : "text-zinc-400"}>
                      {item.countInStock}
                    </span>
                  )}
                </td>
                <td className="px-8 py-6 font-mono text-white">
                  {editingId === item._id ? (
                    <input 
                      type="number" 
                      className="bg-black border border-white/20 text-yellow-400 w-24 p-1 rounded-sm outline-none"
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    />
                  ) : (
                    `Rs ${item.price?.toLocaleString()}`
                  )}
                </td>
                <td className="px-8 py-6 text-right relative">
                  {editingId === item._id ? (
                    <div className="flex justify-end gap-3">
                      <button onClick={() => handleUpdate(item._id)} className="text-green-500 hover:scale-110 transition-transform"><Check size={18} /></button>
                      <button onClick={() => setEditingId(null)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
                    </div>
                  ) : (
                    <div className="flex justify-end items-center gap-4">
                       <button onClick={() => setActionId(actionId === item._id ? null : item._id)} className="text-zinc-600 hover:text-white">
                        <MoreHorizontal size={18} />
                      </button>
                      {actionId === item._id && (
                        <div className="absolute right-16 top-1/2 -translate-y-1/2 z-50 flex gap-2 bg-black border border-white/10 p-2 rounded-sm shadow-2xl animate-in fade-in zoom-in duration-200">
                          <button onClick={() => startEditing(item)} className="text-[9px] flex items-center gap-1 px-2 py-1 text-zinc-300 hover:bg-white/5">
                            <Edit3 size={12} className="text-blue-400" /> EDIT
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="text-[9px] flex items-center gap-1 px-2 py-1 text-zinc-300 hover:bg-white/5">
                            <Trash2 size={12} className="text-red-500" /> DELETE
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredProducts.map((item) => (
          <div key={item._id} className="bg-white/[0.02] border border-white/5 p-5 rounded-sm space-y-4">
            <div className="flex items-center gap-4">
              <img src={item.mainImage} className="w-14 h-14 object-cover border border-white/5 grayscale" alt="" />
              <div className="flex-1">
                <h4 className="text-[11px] text-white uppercase tracking-widest">{item.name}</h4>
                <p className="text-[9px] text-zinc-600 uppercase mt-1">{item.category}</p>
              </div>
              <button 
                onClick={() => setActionId(actionId === item._id ? null : item._id)}
                className="p-2 text-zinc-500"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Package size={10} /> Stock
                </p>
                {editingId === item._id ? (
                  <input 
                    type="number" 
                    className="bg-black border border-white/20 text-yellow-400 w-full p-1 text-xs rounded-sm"
                    value={editForm.countInStock}
                    onChange={(e) => setEditForm({...editForm, countInStock: e.target.value})}
                  />
                ) : (
                  <p className={`text-xs ${item.countInStock < 5 ? "text-yellow-400 font-bold" : "text-white"}`}>
                    {item.countInStock} Units
                  </p>
                )}
              </div>
              <div>
                <p className="text-[8px] text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Layers size={10} /> Valuation
                </p>
                {editingId === item._id ? (
                  <input 
                    type="number" 
                    className="bg-black border border-white/20 text-yellow-400 w-full p-1 text-xs rounded-sm"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                  />
                ) : (
                  <p className="text-xs text-white font-mono">Rs {item.price?.toLocaleString()}</p>
                )}
              </div>
            </div>

            {/* Mobile Actions Drawer */}
            {editingId === item._id ? (
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => handleUpdate(item._id)} 
                  className="flex-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 py-2 text-[10px] uppercase font-bold tracking-widest"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setEditingId(null)} 
                  className="px-4 border border-white/10 text-zinc-500 py-2"
                >
                  <X size={16} />
                </button>
              </div>
            ) : actionId === item._id && (
              <div className="flex gap-2 pt-2 animate-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => startEditing(item)} 
                  className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-zinc-300 py-3 text-[9px] uppercase tracking-widest hover:bg-white/5"
                >
                  <Edit3 size={14} className="text-blue-400" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-zinc-300 py-3 text-[9px] uppercase tracking-widest hover:bg-white/5"
                >
                  <Trash2 size={14} className="text-red-500" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center border border-dashed border-white/5">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">No assets found in registry</p>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
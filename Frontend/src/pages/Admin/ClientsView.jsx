import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Shield, ExternalLink, Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import apiPath from "../../utils/apiPath";

// Assuming your apiPath.js exports an object with an AUTH property
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ClientsView = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Clients");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // FIXED: Using your exact apiPath structure
      // Note: We prepend BASE_URL if apiPath doesn't already include it
      const url = apiPath.AUTH.ALL_USERS.startsWith('http') 
                  ? apiPath.AUTH.ALL_USERS 
                  : `${BASE_URL}${apiPath.AUTH.ALL_USERS}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setClients(response.data.users);
      }
    } catch (err) {
      console.error("Luxe & Loom Registry Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (isAdmin) => {
    return isAdmin 
      ? "border-yellow-400/50 text-yellow-400 bg-yellow-400/5" 
      : "border-white/10 text-zinc-500 bg-transparent";
  };

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "??";
  };

  const filteredClients = clients.filter(client => {
    if (filter === "Privileged") return client.isAdmin;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex gap-4">
          {["All Clients", "Privileged"].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`text-[9px] tracking-[0.3em] uppercase px-4 py-2 border rounded-sm transition-all ${
                filter === f ? "border-white text-white" : "border-white/5 text-zinc-600 hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="text-[10px] tracking-widest text-zinc-600 uppercase">Total Collectors: {clients.length}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center opacity-20 gap-4">
            <Loader2 className="animate-spin text-yellow-400" size={32} />
            <p className="text-[10px] tracking-[0.4em] uppercase">Consulting Ledger</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredClients.map((client, index) => (
              <motion.div 
                key={client._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: index * 0.03 }}
                className="group flex flex-col lg:flex-row items-center justify-between p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all rounded-sm"
              >
                <div className="flex items-center gap-6 w-full lg:w-1/3">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] tracking-tighter text-zinc-400 group-hover:border-yellow-400/50 group-hover:text-yellow-400 transition-colors">
                    {getInitials(client.name)}
                  </div>
                  <div>
                    <h4 className="text-sm text-white uppercase tracking-wider font-light">{client.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail size={10} className="text-zinc-600" />
                      <span className="text-[10px] text-zinc-600 lowercase">{client.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full lg:w-2/3 mt-6 lg:mt-0 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0">
                  <div className="text-center lg:text-left">
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Status</p>
                    <span className={`text-[8px] px-3 py-1 border rounded-full uppercase tracking-tighter ${getStatusStyle(client.isAdmin)}`}>
                      {client.isAdmin ? "Privileged" : "Collector"}
                    </span>
                  </div>

                  <div className="text-center lg:text-left">
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Archive ID</p>
                    <p className="text-[10px] font-mono text-zinc-400">{client._id.slice(-6).toUpperCase()}</p>
                  </div>

                  <div className="text-center lg:text-left hidden md:block">
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Registered</p>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-3 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all text-zinc-500 hover:text-white">
                      <ExternalLink size={14} />
                    </button>
                    <button className="p-3 border border-white/5 hover:border-red-500/20 hover:bg-red-500/5 transition-all text-zinc-500 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="mt-12 p-8 border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center space-y-4">
        <Shield size={24} className="text-zinc-800" strokeWidth={1} />
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">Administrative Encryption Active</p>
        <button className="text-[9px] tracking-widest text-yellow-400 uppercase underline decoration-yellow-400/30 underline-offset-4">Generate Private CSV Report</button>
      </div>
    </div>
  );
};

export default ClientsView;
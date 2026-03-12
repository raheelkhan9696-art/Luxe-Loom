import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, MoreVertical, ExternalLink } from "lucide-react";

const ClientsView = () => {
  const clients = [
    {
      name: "Urooj S.",
      email: "urooj.s@example.com",
      status: "Privileged",
      totalSpent: "Rs 4.2M",
      lastOrder: "Mar 12, 2026",
      initials: "US"
    },
    {
      name: "Khizar M.",
      email: "khizar.m@outlook.com",
      status: "Heritage",
      totalSpent: "Rs 12.8M",
      lastOrder: "Feb 28, 2026",
      initials: "KM"
    },
    {
      name: "Zainab A.",
      email: "z.ahmed@gmail.com",
      status: "Archival",
      totalSpent: "Rs 850K",
      lastOrder: "Jan 15, 2026",
      initials: "ZA"
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Privileged": return "border-gold/50 text-gold bg-gold/5";
      case "Heritage": return "border-white/40 text-white bg-white/5";
      default: return "border-zinc-800 text-zinc-500 bg-transparent";
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Filter Bar --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex gap-4">
          {["All Clients", "Privileged", "Recent"].map((filter, i) => (
            <button 
              key={i} 
              className={`text-[9px] tracking-[0.3em] uppercase px-4 py-2 border rounded-sm transition-all ${
                i === 0 ? "border-white text-white" : "border-white/5 text-zinc-600 hover:border-white/20"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="text-[10px] tracking-widest text-zinc-600 uppercase">Total Collectors: {clients.length}</p>
      </div>

      {/* --- Client Cards --- */}
      <div className="grid grid-cols-1 gap-4">
        {clients.map((client, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col lg:flex-row items-center justify-between p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all rounded-sm"
          >
            <div className="flex items-center gap-6 w-full lg:w-1/3">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] tracking-tighter text-zinc-400 group-hover:border-gold/50 group-hover:text-gold transition-colors">
                {client.initials}
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
                <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Membership</p>
                <span className={`text-[8px] px-3 py-1 border rounded-full uppercase tracking-tighter ${getStatusStyle(client.status)}`}>
                  {client.status}
                </span>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Total LTV</p>
                <p className="text-sm font-mono text-white">{client.totalSpent}</p>
              </div>

              <div className="text-center lg:text-left hidden md:block">
                <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Last Interaction</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{client.lastOrder}</p>
              </div>

              <div className="flex gap-2">
                <button className="p-3 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all">
                  <ExternalLink size={14} className="text-zinc-500" />
                </button>
                <button className="p-3 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all">
                  <MoreVertical size={14} className="text-zinc-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Footer CTA --- */}
      <div className="mt-12 p-8 border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center space-y-4">
        <Shield size={24} className="text-zinc-800" strokeWidth={1} />
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">Secure Client Data Encryption Active</p>
        <button className="text-[9px] tracking-widest text-gold uppercase underline decoration-gold/30 underline-offset-4">Export Private Ledger (CSV)</button>
      </div>
    </div>
  );
};

export default ClientsView;
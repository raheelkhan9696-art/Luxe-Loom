import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Lock, 
  Bell, 
  CreditCard, 
  Database, 
  ShieldCheck, 
  Save,
  RefreshCw
} from "lucide-react";

const SettingsView = () => {
  const [activeSection, setActiveSection] = useState("General");

  const sections = [
    { name: "General", icon: <Globe size={16} /> },
    { name: "Security", icon: <Lock size={16} /> },
    { name: "Notifications", icon: <Bell size={16} /> },
    { name: "Payments", icon: <CreditCard size={16} /> },
    { name: "Advanced", icon: <Database size={16} /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* --- Internal Settings Navigation --- */}
      <aside className="w-full lg:w-48 space-y-2">
        {sections.map((sec) => (
          <button
            key={sec.name}
            onClick={() => setActiveSection(sec.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] uppercase transition-all rounded-sm ${
              activeSection === sec.name 
              ? "bg-white/10 text-white border-l-2 border-yellow-400" 
              : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
            }`}
          >
            {sec.icon}
            {sec.name}
          </button>
        ))}
      </aside>

      {/* --- Settings Content Area --- */}
      <div className="flex-1 max-w-2xl space-y-12">
        
        {/* General Shop Settings */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="pb-4 border-b border-white/5">
            <h3 className="text-sm text-white uppercase tracking-widest font-bold">Store Identity</h3>
            <p className="text-[10px] text-zinc-600 uppercase mt-1">Configure public-facing brand information</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] tracking-widest uppercase text-zinc-500 font-bold">Store Name</label>
              <input 
                type="text" 
                defaultValue="Luxe & Loom Heritage"
                className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-xs text-white focus:border-yellow-400 outline-none transition-all rounded-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] tracking-widest uppercase text-zinc-500 font-bold">Support Email</label>
              <input 
                type="email" 
                defaultValue="concierge@luxeandloom.com"
                className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-xs text-white focus:border-yellow-400 outline-none transition-all rounded-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] tracking-widest uppercase text-zinc-500 font-bold">Base Currency</label>
              <select className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-xs text-white focus:border-yellow-400 outline-none appearance-none rounded-sm uppercase tracking-widest">
                <option className="bg-black">PKR (Rs)</option>
                <option className="bg-black">USD ($)</option>
                <option className="bg-black">EUR (€)</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* System & Security Status */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 bg-yellow-400/[0.02] border border-yellow-400/10 rounded-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheck className="text-yellow-400" size={20} />
            <div>
              <h3 className="text-[10px] text-white font-bold uppercase tracking-[0.3em]">System Integrity</h3>
              <p className="text-[9px] text-yellow-400/60 uppercase">Last security audit: March 10, 2026</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-sm">
            <div className="flex items-center gap-3">
              <RefreshCw size={14} className="text-zinc-600" />
              <span className="text-[9px] tracking-widest uppercase text-zinc-400">API Connection Status</span>
            </div>
            <span className="text-[8px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full uppercase font-bold">Active</span>
          </div>
        </motion.section>

        {/* Save Controls */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center gap-6">
          <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-yellow-400 transition-all duration-500 rounded-sm">
            <Save size={14} /> Update Configuration
          </button>
          <button className="text-[9px] tracking-widest text-zinc-600 uppercase hover:text-white transition-colors">
            Discard Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
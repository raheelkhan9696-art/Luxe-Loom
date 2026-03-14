import React from "react";
import { Search, Plus, Bell, Calendar } from "lucide-react";

const AdminHeader = ({ activeTab, onAction }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
      {/* --- Page Title & Context --- */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-yellow-400 text-[10px] tracking-[0.5em] uppercase">Management</p>
          <div className="h-px w-8 bg-yellow-400/30" />
        </div>
        <h2 className="text-4xl font-light text-white uppercase tracking-tighter">
          {activeTab}
        </h2>
      </div>

      {/* --- Action Controls --- */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
        {/* Search Bar matching Product Editor Style */}
        <div className="relative w-full md:w-64 group">
          <Search className="absolute left-0 bottom-3 w-4 h-4 text-zinc-600 group-focus-within:text-yellow-400 transition-colors" />
          <input 
            type="text" 
            placeholder={`SEARCH ${activeTab.toUpperCase()}`} 
            className="w-full bg-transparent border-b border-white/10 pl-8 py-2 text-[10px] tracking-widest outline-none focus:border-yellow-400 transition-colors placeholder:text-zinc-800"
          />
        </div>

        {/* Global Utilities */}
        <div className="flex items-center gap-6 border-x border-white/5 px-8 hidden lg:flex">
          <div className="flex items-center gap-2 text-zinc-500">
            <Calendar size={14} />
            <span className="text-[10px] tracking-widest uppercase">March 12, 2026</span>
          </div>
          <div className="relative cursor-pointer text-zinc-500 hover:text-white transition-colors">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-[#050505]" />
          </div>
        </div>

        {/* Primary Action Button */}
        <button 
          onClick={onAction}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-yellow-400 transition-all duration-500 rounded-sm shadow-xl shadow-yellow-400/5"
        >
          <Plus size={14} /> New Entry
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
import React from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, X } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Inventory", icon: <Package size={18} /> },
    { name: "Orders", icon: <ShoppingBag size={18} /> },
    { name: "Clients", icon: <Users size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className={`
      w-72 md:w-64 fixed h-full z-[60] p-8 flex flex-col bg-[#050505] border-r border-white/5
      transition-transform duration-500 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}>
      
      {/* <button 
        onClick={() => setIsOpen && setIsOpen(false)} // Added safety check
        className="lg:hidden absolute top-8 right-6 text-zinc-500 hover:text-white"
      >
        <X size={20} />
      </button> */}

      <div className="mb-12">
        <h1 className="text-lg font-light tracking-[0.4em] text-white">
          L&L <span className="italic font-serif text-zinc-500">Admin</span>
        </h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
              if (setIsOpen) setIsOpen(false); // Safety check here as well
            }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
              activeTab === item.name 
              ? "bg-white text-black font-bold shadow-lg shadow-white/5" 
              : "hover:bg-white/5 text-zinc-500 hover:text-white"
            }`}
          >
            <span className={activeTab === item.name ? "text-black" : "text-inherit"}>
              {item.icon}
            </span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="pt-8 border-t border-white/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-[10px] text-yellow-400 font-bold">
          A
        </div>
        <div>
          <p className="text-[10px] text-white font-bold uppercase tracking-widest leading-none">
            Abdullah
          </p>
          <p className="text-[8px] text-zinc-600 uppercase mt-1 tracking-wider">
            Super Admin
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
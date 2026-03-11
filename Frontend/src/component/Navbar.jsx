import React, { useState } from "react";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 
    bg-gradient-to-r from-black via-[#1a1a1a] to-black 
    border-b border-[#C9A227]/40 shadow-[0_5px_30px_rgba(201,162,39,0.25)]">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-semibold tracking-[4px] text-[#FFD700]">
          LUXE&LOOM
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-10 text-sm tracking-[2px] text-gray-200">

          <li className="relative group cursor-pointer hover:text-[#FFD700]">
            COLLECTIONS
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li className="relative group cursor-pointer hover:text-[#FFD700]">
            BESPOKE
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li className="relative group cursor-pointer hover:text-[#FFD700]">
            JOURNALS
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li className="relative group cursor-pointer hover:text-[#FFD700]">
            ABOUT
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li className="relative group cursor-pointer hover:text-[#FFD700]">
            CONTACT
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
          </li>

        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 text-gray-200">
          <Search className="cursor-pointer hover:text-[#FFD700] transition" size={20}/>
          <ShoppingBag className="cursor-pointer hover:text-[#FFD700] transition" size={20}/>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden text-white">
          {open ? (
            <X size={28} onClick={() => setOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setOpen(true)} />
          )}
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-[#C9A227]/40">

          <div className="flex flex-col items-center py-10 space-y-8 text-lg tracking-[2px] text-gray-200">

            <p className="hover:text-[#FFD700] cursor-pointer">COLLECTIONS</p>
            <p className="hover:text-[#FFD700] cursor-pointer">BESPOKE</p>
            <p className="hover:text-[#FFD700] cursor-pointer">JOURNALS</p>
            <p className="hover:text-[#FFD700] cursor-pointer">ABOUT</p>
            <p className="hover:text-[#FFD700] cursor-pointer">CONTACT</p>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;
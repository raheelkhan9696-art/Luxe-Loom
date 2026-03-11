import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Collections", "Bespoke", "Journals", "About"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/5" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* --- Logo: Clean & Editorial --- */}
        <div className="flex-1">
          <div className="text-xl md:text-2xl font-light tracking-[0.4em] text-white cursor-pointer group">
            LUXE<span className="italic font-serif font-normal text-zinc-500 group-hover:text-gold transition-colors">&</span>LOOM
          </div>
        </div>

        {/* --- Desktop Links --- */}
        <ul className="hidden md:flex items-center space-x-12">
          {navLinks.map((item) => (
            <li key={item} className="relative group">
              <a
                href={`#${item.toLowerCase()}`}
                className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
              <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
            </li>
          ))}
        </ul>

        {/* --- Icons & Actions --- */}
        <div className="flex-1 flex justify-end items-center space-x-6 md:space-x-8 text-white">
          <Search className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" strokeWidth={1.2} />
          <div className="relative group cursor-pointer">
            <ShoppingBag className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.2} />
            <span className="absolute -top-1 -right-2 text-[8px] bg-gold text-black w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </div>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X strokeWidth={1.2} /> : <Menu strokeWidth={1.2} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Full-Screen Overlay --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 h-screen bg-black z-[-1] flex flex-col justify-center px-12"
          >
            <div className="space-y-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-4xl font-light tracking-tighter hover:italic hover:text-gold transition-all"
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 pt-10 border-t border-white/10">
              <p className="text-[10px] tracking-[0.5em] uppercase text-zinc-500">
                Experience the collection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
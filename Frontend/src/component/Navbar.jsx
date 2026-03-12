import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Orders", path: "/orders" },
    { name: "Login", path: "/auth/login" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-black/90 backdrop-blur-xl border-b border-white/5" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-[101]">
        
        {/* --- Logo --- */}
        <div className="flex-1">
          <Link to="/home" className="text-xl md:text-2xl font-light tracking-[0.4em] text-white group block w-fit">
            LUXE<span className="italic font-serif font-normal text-zinc-500 group-hover:text-gold transition-colors">&</span>LOOM
          </Link>
        </div>

        {/* --- Desktop Links --- */}
        <ul className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <Link
                to={link.path}
                className={`text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                  location.pathname === link.path ? "text-yellow-400" : "text-white hover:text-white"
                }`}
              >
                {link.name}
              </Link>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ${
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </li>
          ))}
        </ul>

        {/* --- Icons --- */}
        <div className="flex-1 flex justify-end items-center space-x-6 md:space-x-8 text-white">
          <Search className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity" strokeWidth={1.2} />
          
          <Link to="/cart" className="relative group">
            <ShoppingBag className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.2} />
            <span className="absolute -top-1 -right-2 text-[8px] bg-gold text-black w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </Link>
          
          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden p-2 relative z-[102] text-white" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Full-Screen Overlay --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-[#0a0a0a] z-[99] flex flex-col justify-center px-12"
          >
            {/* Background decorative text or watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif italic text-white/[0.01] pointer-events-none select-none">
              Luxe &amp; Loom
            </div>

            <div className="space-y-10 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className={`text-5xl font-light tracking-tighter transition-all block ${
                      location.pathname === link.path 
                        ? "italic text-white translate-x-4" 
                        : "text-white/60 hover:text-yellow-400 hover:translate-x-4"
                    } transition-transform duration-500`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-12 right-12 pt-8 border-t border-white/5 flex justify-between items-center"
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">
                Luxe & Loom / 2026
              </p>
              <div className="flex gap-4 opacity-40">
                <span className="text-[10px] uppercase tracking-widest">IG</span>
                <span className="text-[10px] uppercase tracking-widest">TW</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
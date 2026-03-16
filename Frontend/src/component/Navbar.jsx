import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/cartContext"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  
  // Cart Logic
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const lastCartCount = useRef(totalItems);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Orders", path: "/orders" },
    { name: "Login", path: "/auth/login" },
  ];

  // Trigger popup only when items are added (not removed)
  useEffect(() => {
    if (totalItems > lastCartCount.current && location.pathname !== '/cart') {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
    lastCartCount.current = totalItems;
  }, [totalItems, location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      scrolled 
        ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/5" 
        : "py-8 bg-transparent"
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-[101]">
        
        {/* --- Logo --- */}
        <div className="flex-1">
          <Link to="/home" className="text-xl md:text-2xl font-light tracking-[0.4em] text-white group block w-fit">
            LUXE<span className="italic font-serif font-normal text-zinc-500 group-hover:text-yellow-500 transition-colors">&</span>LOOM
          </Link>
        </div>

        {/* --- Desktop Links --- */}
        <ul className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <li key={link.path} className="relative group">
              <Link 
                to={link.path} 
                className={`text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 ${
                  location.pathname === link.path ? "text-yellow-400" : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-yellow-600 transition-all duration-500 ${
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </li>
          ))}
        </ul>

        {/* --- Action Icons --- */}
        <div className="flex-1 flex justify-end items-center space-x-5 md:space-x-8 text-white relative">
          <button className="hidden sm:block opacity-60 hover:opacity-100 transition-opacity">
            <Search className="w-5 h-5" strokeWidth={1.2} />
          </button>

          <Link to="/cart" className="relative group p-1">
            <ShoppingBag className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.2} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  exit={{ scale: 0 }}
                  key={totalItems}
                  className="absolute -top-1 -right-1 text-[8px] bg-yellow-600 text-black w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-1 relative z-[110] text-white hover:text-yellow-500 transition-colors" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>

          {/* --- Added to Cart Notification --- */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-16 right-0 w-[280px] sm:w-72 bg-zinc-900 border border-white/10 p-5 shadow-2xl backdrop-blur-2xl z-[120] rounded-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500/10 p-2 rounded-full shrink-0">
                    <Check size={16} className="text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-white font-bold mb-1">Added to Cart</p>
                    <p className="text-[10px] text-zinc-400 leading-relaxed mb-4">A new treasure has been added to your collection.</p>
                    <Link 
                      to="/cart" 
                      onClick={() => setShowPopup(false)}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-yellow-500 font-bold hover:text-white transition-colors"
                    >
                      View Selection <ArrowRight size={12} />
                    </Link>
                  </div>
                  <button onClick={() => setShowPopup(false)} className="text-zinc-600 hover:text-white shrink-0">
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Full-Screen Mobile Menu --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-[#0a0a0a] z-[105] flex flex-col justify-center px-8 md:px-20 overflow-hidden"
          >
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif italic text-white/[0.02] pointer-events-none select-none whitespace-nowrap">
              Luxe &amp; Loom
            </div>

            <div className="space-y-6 md:space-y-10 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className={`text-5xl sm:text-6xl md:text-8xl font-light tracking-tighter transition-all block w-fit ${
                      location.pathname === link.path
                        ? "italic text-yellow-500 translate-x-4"
                        : "text-white/40 hover:text-white hover:translate-x-4"
                    } transition-transform duration-500`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-8 right-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
              <div className="space-y-1">
                <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-500">
                  Premium Jewelry & Watches
                </p>
                <p className="text-[8px] tracking-[0.2em] uppercase text-zinc-700 font-mono">
                  © 2026 LUXE & LOOM GLOBAL
                </p>
              </div>
              
              <div className="flex gap-6">
                {["Instagram", "Twitter"].map((social) => (
                  <span 
                    key={social} 
                    className="text-[9px] uppercase tracking-[0.3em] text-white/30 hover:text-yellow-500 cursor-pointer transition-colors"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
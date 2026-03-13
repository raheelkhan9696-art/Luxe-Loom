import React from "react";
import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden">
      
      {/* --- Visual Side (Left) --- */}
      <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen bg-[#0a0a0a]">
        {/* Top Branding */}


        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200" 
          alt="Luxury Watch" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black" />
      </div>

      {/* --- Form Side (Right) --- */}
      <div className="flex-1 bg-black flex flex-col justify-center px-8 md:px-20 lg:px-32 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Section Header matching your screenshot */}
          <header className="mb-16">
            <h2 className="text-white text-4xl font-light tracking-tighter uppercase mb-2">
              {title}
            </h2>
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">
              {subtitle}
            </p>
          </header>

          {/* This renders your LoginPage or SignupPage components */}
          <div className="auth-form-container">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
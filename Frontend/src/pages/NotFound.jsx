import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- Background Decorative Elements --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Faded Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif italic text-white/[0.02] whitespace-nowrap">
          404 Error
        </div>
        {/* Soft Golden Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-900/10 blur-[120px] rounded-full" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Animated 404 Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-8xl md:text-9xl font-light tracking-tighter text-white mb-4"
        >
          404
        </motion.h1>

        {/* Elegant Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-sm md:text-base text-yellow-500/80 tracking-[0.5em] uppercase mb-8 font-light">
            The Piece You Seek is Not Here
          </h2>
          
          <div className="w-[1px] h-20 bg-gradient-to-b from-yellow-600/50 to-transparent mb-12"></div>

          <p className="text-zinc-500 max-w-md text-sm leading-relaxed tracking-wide mb-12 font-light italic">
            Perhaps the path has changed, or the collection has evolved. 
            Allow us to guide you back to the sanctuary.
          </p>
        </motion.div>

        {/* Luxurious CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link 
            to="/home"
            className="group relative px-10 py-4 border border-white/10 overflow-hidden inline-block"
          >
            {/* Hover Background Slide */}
            <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
            
            {/* Button Text */}
            <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors duration-500 font-medium">
              Return to Collection
            </span>
          </Link>
        </motion.div>
      </div>

      {/* --- Footer Branding --- */}
      <div className="absolute bottom-10 w-full flex justify-center text-[10px] tracking-[0.3em] uppercase text-zinc-700">
        Luxe <span className="mx-2 text-zinc-800">&</span> Loom / Global Registry
      </div>

    </div>
  );
};

export default NotFound;
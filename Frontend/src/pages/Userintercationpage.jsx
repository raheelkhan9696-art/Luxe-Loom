import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import uservideo from "../assets/uservideo.mp4";
import poster from "../assets/poster.png";

const UserInteractionPage = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  const promoLines = [
    "Precision in every second.",
    "A legacy of timeless design.",
    "The summit of horological art.",
    "Crafted for the extraordinary."
  ];

  /* -------- CINEMATIC CURSOR -------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      
      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", moveCursor);
      return () => window.removeEventListener("mousemove", moveCursor);
    });
    return () => ctx.revert();
  }, []);

  /* -------- TEXT LOOP -------- */
  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % promoLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [started]);

  /* -------- INTERACTION HANDLER -------- */
  const handleStart = async () => {
    setStarted(true);
    const video = videoRef.current;

    if (video) {
      video.muted = false;
      video.play().catch(err => console.log("Autoplay prevented", err));
    }

    // Zoom out video effect for cinematic reveal
    gsap.fromTo(video, { scale: 1.2 }, { scale: 1, duration: 2.5, ease: "expo.out" });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505] text-white">
      
      {/* Premium Cursor Glow */}
      <div
        ref={cursorRef}
        className="fixed w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Video Layer */}
      <video
        ref={videoRef}
        onEnded={() => navigate("/home")}
        playsInline
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${started ? 'opacity-60' : 'opacity-0'}`}
      >
        <source src={uservideo} type="video/mp4" />
      </video>

      {/* --- ENTRY OVERLAY --- */}
    <AnimatePresence>
        {!started && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            
            {/* --- NEW: Background Image Layer --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={poster} // Assuming 'poster' is imported. Use a high-quality, muted image.
                alt="Experience Background" 
                className="w-full h-full object-cover scale-110 opacity-30 group-hover:opacity-40 transition-opacity duration-1000"
              />
              {/* Refined Vignette Overlay: Ensures legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
            </div>

            {/* --- Interactable Content (Now z-10) --- */}
            <div 
              onClick={handleStart}
              className="group cursor-pointer flex flex-col items-center z-10"
            >
              <div className="overflow-hidden mb-4">
                <motion.h2 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: "expo.out" }}
                  className="text-[10px] tracking-[0.8em] uppercase text-yellow-400 opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  Enter the Experience
                </motion.h2>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 border border-white/10 rounded-full bg-black/40 backdrop-blur-sm"
              >
                <div className="absolute inset-0 border border-yellow-500 rounded-full animate-ping opacity-20" />
                <span className="text-xs tracking-[0.3em] uppercase font-light">Explore</span>
              </motion.div>
            </div>
            
            <p className="absolute bottom-12 text-[9px] tracking-[0.4em] text-zinc-600 uppercase z-10">
              Sound Recommended
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- REVEALED CONTENT --- */}
      {started && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 flex flex-col justify-between p-10 md:p-20 z-10 pointer-events-none"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <h1 className="text-xl md:text-2xl font-light tracking-[0.5em] uppercase italic font-serif">
                Luxe<span className="text-yellow-400">&</span>Loom
              </h1>
              <div className="text-[10px] tracking-widest uppercase text-right">
                <p>Volume / 01</p>
                <p className="text-zinc-500">2026 Edition</p>
              </div>
            </div>

            {/* Centered Promo Line */}
            <div className="text-center self-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={lineIndex}
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
                  transition={{ duration: 1.2, ease: "power2.out" }}
                  className="text-2xl md:text-5xl font-extralight tracking-tight"
                >
                  {promoLines[lineIndex]}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full flex items-center gap-6">
              <span className="text-[10px] font-mono opacity-50">01</span>
              <div className="relative flex-1 h-[1px] bg-white/10 overflow-hidden">
                <motion.div 
                   initial={{ x: "-100%" }}
                   animate={{ x: "0%" }}
                   transition={{ duration: 15, ease: "linear" }}
                   className="absolute inset-0 bg-yellow-400"
                />
              </div>



              <span className="text-[10px] font-mono opacity-50">SKIP</span>


              
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default UserInteractionPage;
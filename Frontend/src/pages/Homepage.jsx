import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import watchhero from "../assets/watchheros.png";
import { motion } from "framer-motion";

import Collectionpage from "./Collectionpage";
import { Link } from "react-router-dom";
import AboutUs from "./AboutUs";

const HomePage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sophisticated entrance for text
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5,
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        duration: 2,
        delay: 1,
        ease: "power2.out",
      });

      // Subtle zoom on background
      gsap.from(".hero-bg", {
        scale: 1.1,
        duration: 3,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-black">
      <div className="relative w-full h-screen text-white overflow-hidden">
        {/* --- Background Image with refined overlay --- */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={watchhero}
            alt="Luxury Jewelry"
            className="hero-bg w-full h-full object-cover object-center opacity-70 md:opacity-100"
          />
          {/* Multi-layered gradient for better text legibility on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black md:bg-gradient-to-r md:from-black/90 md:via-black/40 md:to-transparent"></div>
        </div>

        {/* --- Hero Content --- */}
        <div className="relative z-10 flex items-center h-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
          <div className="max-w-3xl">
            {/* Minimal Label */}
            <span className="hero-sub text-yellow-400 text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6 block">
              The Art of horology
            </span>

            {/* Heading - Responsive sizing */}
            <h1 className="hero-title font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8">
              UNVEIL
              <span className="italic text-gray-200 font-serif">TIMELESS</span> <br />
              ELEGANCE
            </h1>

            {/* Description */}
            <p className="hero-sub text-zinc-400 text-sm md:text-lg max-w-md leading-relaxed mb-10 font-light">
              Explore our collection of handcrafted, exquisite jewelry designed
              to celebrate life’s most precious moments with unmatched beauty.
            </p>

            {/* Refined Button - Removed the heavy gradient for a cleaner look */}
            <div className="hero-sub flex flex-col sm:flex-row gap-4">
              <button className="group relative px-10 py-4 bg-white text-black text-[10px] tracking-[0.3em] font-bold uppercase overflow-hidden transition-all duration-300">
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-yellow-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <Link to="/about">
                <button className="px-10 py-4 xs:py-10 border border-yellow-500 text-white text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                  Our Story
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* --- Bottom Scroll Indicator --- */}

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          {/* The Animated Line - Intensified Lighting */}
          <div className="relative w-[1.5px] h-20 bg-white/10 overflow-hidden rounded-full">
            {/* Moving Beam */}
            <motion.div
              initial={{ top: "-100%" }}
              animate={{ top: "100%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-yellow-400 to-transparent shadow-[0_0_15px_#fbbf24,0_0_30px_#f59e0b]"
            />
          </div>

          {/* The Text - Radiant Breathing Effect */}
          <div className="relative">
            {/* Secondary Glow Layer behind text */}
            <motion.span
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 text-[10px] text-yellow-500 blur-[4px] tracking-[0.6em] uppercase text-center select-none"
            >
              Scroll
            </motion.span>

            {/* Primary Text */}
            <motion.span
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                textShadow: [
                  "0 0 0px #fbbf24",
                  "0 0 12px #fbbf24",
                  "0 0 0px #fbbf24",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative text-[10px] text-yellow-100 tracking-[0.6em] uppercase font-medium"
            >
              Scroll
            </motion.span>
          </div>

          {/* Bottom Lightning Aura */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 w-16 h-8 bg-yellow-500/20 blur-[30px] rounded-[100%]"
          />
        </div>
      </div>

      <Collectionpage />
      <AboutUs />
    </div>
  );
};

export default HomePage;

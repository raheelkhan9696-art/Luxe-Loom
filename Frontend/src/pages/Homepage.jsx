import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import watchhero from "../assets/watchheros.png";

import Navbar from "../component/Navbar";
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
        delay: 0.5
      });
      
      gsap.from(".hero-sub", {
        opacity: 0,
        duration: 2,
        delay: 1,
        ease: "power2.out"
      });

      // Subtle zoom on background
      gsap.from(".hero-bg", {
        scale: 1.1,
        duration: 3,
        ease: "power2.out"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-black">
      <div className="relative w-full h-screen text-white overflow-hidden">
        <Navbar />

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
            <span className="hero-sub text-gold text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6 block">
              The Art of horology
            </span>

            {/* Heading - Responsive sizing */}
            <h1 className="hero-title font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8">
              UNVEIL 
              <span className="italic  font-serif">TIMELESS</span> <br />
              ELEGANCE
            </h1>

            {/* Description */}
            <p className="hero-sub text-zinc-400 text-sm md:text-lg max-w-md leading-relaxed mb-10 font-light">
              Explore our collection of handcrafted, exquisite jewelry designed to 
              celebrate life’s most precious moments with unmatched beauty.
            </p>

            {/* Refined Button - Removed the heavy gradient for a cleaner look */}
            <div className="hero-sub flex flex-col sm:flex-row gap-4">
              <button className="group relative px-10 py-4 bg-white text-black text-[10px] tracking-[0.3em] font-bold uppercase overflow-hidden transition-all duration-300">
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
           <Link to="/about">
              <button className="px-10 py-4 xs:py-10 border border-zinc-700 text-white text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                Our Story
              </button>
           </Link>
            </div>
          </div>
        </div>

        {/* --- Bottom Scroll Indicator --- */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-12 bg-white/50"></div>
          <span className="text-[8px] tracking-[0.5em] uppercase">Scroll</span>
        </div>
      </div>

      <Collectionpage />
    </div>
  );
};

export default HomePage;
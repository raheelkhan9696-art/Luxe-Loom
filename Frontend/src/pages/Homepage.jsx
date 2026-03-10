import React, { useState } from "react";
import watchhero from "../assets/watchheros.png";

import Navbar from "../component/Navbar";

// Home Page
const HomePage = () => {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <Navbar />

      {/* Background Image */}
      <img
        src={watchhero}
        alt="Luxury Jewelry"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6 md:px-14">
        <div className="max-w-2xl space-y-4">
          {/* Heading */}
          <h1 className="font-Inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-wide">
            UNVEIL TIMELESS <br />
            ELEGANCE
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg max-w-lg leading-relaxed">
            Explore our collection of handcrafted, exquisite jewelry designed to
            celebrate life’s most precious moments with timeless beauty.
          </p>

          {/* Button */}
          <button
            className="mt-4 
bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#E6C200] 
text-black 
px-8 py-4 
rounded-full 
text-sm tracking-wider font-semibold 
hover:scale-105 
transition-all duration-300 
shadow-[0_10px_30px_rgba(255,215,0,0.35)]"
          >
            SHOP THE COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import collection1 from "../assets/collection1.jpg";
import collection2 from "../assets/collection2.jpg";
import collection3 from "../assets/collection3.jpg";
import collection4 from "../assets/collection4.jpg";

gsap.registerPlugin(ScrollTrigger);

const LuxuryCollection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".lux-card");

    // Scroll reveal animation
    gsap.from(cards, {
      y: 150,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Mouse depth effect
    const moveHandler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;

      gsap.to(".lux-card", {
        x: (i) => x * (i + 1) * 0.2,
        y: (i) => y * (i + 1) * 0.2,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] bg-black flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Typography */}
      <div className="text-center">
       

        <p className="text-gray-400 mt-4 max-w-md sm:max-w-lg md:max-w-xl mx-auto text-sm sm:text-base">
          A curated collection designed for elegance, crafted with precision and timeless luxury.
        </p>

        {/* Magnetic Button */}
        <button className="magnetic-btn mt-6 sm:mt-8 border border-white/30 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-white hover:text-black transition">
          Explore Collection
        </button>
      </div>

      {/* Floating Images */}
      <div className="relative w-full max-w-6xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Card 1 */}
        <div className="lux-card absolute left-0 top-8 sm:top-12 md:top-16 w-[140px] sm:w-[200px] md:w-[260px] lg:w-[300px]">
          <img
            src={collection1}
            className="rounded-2xl shadow-[0_20px_60px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)] transition duration-500 hover:scale-110"
          />
        </div>

        {/* Card 2 */}
        <div className="lux-card absolute right-0 top-16 sm:top-20 md:top-28 w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]">
          <img
            src={collection2}
            className="rounded-2xl shadow-[0_20px_60px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)] transition duration-500 hover:scale-110"
          />
        </div>

        {/* Card 3 */}
        <div className="lux-card absolute left-1/3 bottom-4 sm:bottom-8 md:bottom-12 w-[160px] sm:w-[220px] md:w-[280px] lg:w-[320px]">
          <img
            src={collection3}
            className="rounded-2xl shadow-[0_20px_60px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)] transition duration-500 hover:scale-110"
          />
        </div>

        {/* Card 4 */}
        <div className="lux-card absolute right-1/4 bottom-12 sm:bottom-16 md:bottom-20 w-[140px] sm:w-[200px] md:w-[260px] lg:w-[300px]">
          <img
            src={collection4}
            className="rounded-2xl shadow-[0_20px_60px_rgba(255,255,255,0.08)] hover:shadow-[0_20px_80px_rgba(255,255,255,0.25)] transition duration-500 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
};

export default LuxuryCollection;
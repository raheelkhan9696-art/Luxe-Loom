import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import collection1 from "../assets/collection1.jpg";
import collection2 from "../assets/collection2.jpg";
import collection3 from "../assets/collection3.jpg";
import collection4 from "../assets/collection4.jpg";
import collection5 from "../assets/collection5.jpg";
import collection6 from "../assets/collection6.jpg";
import LuxuryCollection from "../component/LuxuryCollection";

gsap.registerPlugin(ScrollTrigger);

const images1 = [collection1, collection2, collection3, collection4, collection5, collection6];
const images2 = [collection6, collection5, collection4, collection3, collection2, collection1];

const CollectionPage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth reveal for the main heading
      gsap.from(".heading-text", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });

      // Parallax effect for the entire section
      gsap.to(".parallax-scroll", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Infinite Marquee Animation (Pure CSS is often smoother, but GSAP gives more control)
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });

      gsap.to(".marquee-inner-reverse", {
        xPercent: 0,
        repeat: -1,
        duration: 30,
        ease: "none",
        startAt: { xPercent: -50 }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white overflow-hidden selection:bg-white selection:text-black">
      <div ref={sectionRef} className="parallax-scroll min-h-screen">
        
        {/* --- Premium Header --- */}
        <div className="text-center py-20 md:py-32 px-4 relative">
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-zinc-500 mb-4 block heading-text">
            Autumn / Winter 2026
          </span>
          <h1 className="heading-text text-5xl md:text-8xl font-extralight tracking-tighter leading-none mb-6">
            COLLE<span className="italic font-serif">C</span>TIONS
          </h1>
          <div className="w-12 h-[1px] bg-zinc-700 mx-auto mt-8 heading-text"></div>
        </div>

        {/* --- Marquee Row 1 (Forward) --- */}
        <div className="relative overflow-hidden py-4 border-y border-zinc-900/50">
          <div className="marquee-inner flex whitespace-nowrap gap-4 px-2">
            {[...images1, ...images1].map((img, i) => (
              <div
                key={i}
                className="relative w-[280px] h-[380px] md:w-[400px] md:h-[550px] flex-shrink-0 overflow-hidden group"
              >
                <img
                  src={img}
                  alt="Luxury Item"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <p className="text-xs tracking-widest uppercase text-white/80">Ref. 00{i + 1}</p>
                  <h3 className="text-xl font-light">Limited Edition</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Middle Spacer / Text --- */}
        <div className="py-20 flex justify-center items-center px-6">
          <p className="max-w-xl text-center text-zinc-500 text-sm md:text-base font-light leading-relaxed">
            A curation of timeless pieces where modern silhouettes meet traditional craftsmanship. Each item is a testament to our commitment to <span className="text-zinc-200">uncompromising quality</span>.
          </p>
        </div>

        {/* --- Marquee Row 2 (Reverse) --- */}
        <div className="relative overflow-hidden py-4 border-y border-zinc-900/50">
          <div className="marquee-inner-reverse flex whitespace-nowrap gap-4 px-2">
            {[...images2, ...images2].map((img, i) => (
              <div
                key={i}
                className="relative w-[280px] h-[380px] md:w-[400px] md:h-[550px] flex-shrink-0 overflow-hidden group"
              >
                <img
                  src={img}
                  alt="Luxury Item"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 m-4 transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Luxury Collection Component --- */}
        <div className="bg-white text-black">
          <LuxuryCollection />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
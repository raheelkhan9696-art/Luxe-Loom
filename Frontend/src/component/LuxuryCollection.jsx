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
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".lux-card");

      // Entrance Animation
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Mouse Parallax (Deep Depth Effect)
      const moveHandler = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        cards.forEach((card, i) => {
          const depth = (i + 1) * 15; // Different depth for each card
          gsap.to(card, {
            x: xPos * depth,
            y: yPos * depth,
            duration: 1.5,
            ease: "power3.out",
          });
        });
      };

      window.addEventListener("mousemove", moveHandler);
      return () => window.removeEventListener("mousemove", moveHandler);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-24 px-6"
    >
      <div ref={containerRef} className="relative w-full max-w-7xl h-[700px] flex items-center justify-center">
        
        {/* --- Central Typography --- */}
        <div className="z-20 text-center mix-blend-difference pointer-events-none">
          <h2 className="text-white text-5xl md:text-8xl font-extralight tracking-[0.2em] uppercase leading-none">
            Selected <br />
            <span className="italic font-serif tracking-normal lowercase opacity-80">works</span>
          </h2>
          <p className="text-zinc-400 mt-8 max-w-xs mx-auto text-xs md:text-sm tracking-[0.2em] uppercase leading-loose">
            A curated fusion of raw texture and refined form.
          </p>
          
          <div className="mt-10 pointer-events-auto">
             <button className="px-10 py-3 border border-zinc-800 text-zinc-400 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-500 rounded-full">
                View Archive
             </button>
          </div>
        </div>

        {/* --- Floating Asymmetric Cards --- */}
        
        {/* Top Left */}
        <div className="lux-card absolute top-[5%] left-[5%] w-[180px] md:w-[280px] z-10">
          <div className="relative group overflow-hidden rounded-sm border border-zinc-900">
            <img src={collection1} alt="c1" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
            <div className="absolute top-4 left-4 text-[10px] text-white/50 font-mono">01/04</div>
          </div>
        </div>

        {/* Top Right */}
        <div className="lux-card absolute top-[10%] right-[8%] w-[150px] md:w-[240px] z-0">
          <div className="relative group overflow-hidden rounded-sm border border-zinc-900">
            <img src={collection2} alt="c2" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
          </div>
        </div>

        {/* Bottom Left */}
        <div className="lux-card absolute bottom-[10%] left-[10%] w-[160px] md:w-[260px] z-0">
          <div className="relative group overflow-hidden rounded-sm border border-zinc-900">
            <img src={collection3} alt="c3" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
          </div>
        </div>

        {/* Bottom Right */}
        <div className="lux-card absolute bottom-[5%] right-[5%] w-[200px] md:w-[320px] z-10">
          <div className="relative group overflow-hidden rounded-sm border border-zinc-900 shadow-2xl">
            <img src={collection4} alt="c4" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
            <div className="absolute bottom-4 right-4 text-[10px] text-white/50 font-mono italic">Autumn '26</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LuxuryCollection;
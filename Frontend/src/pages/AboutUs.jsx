import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assets (Using your existing imports)
import collection1 from "../assets/collection1.jpg";
import collection2 from "../assets/collection2.jpg";
import collection3 from "../assets/collection3.jpg";
import collection4 from "../assets/collection4.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in sections on scroll
      gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-zinc-950 text-slate-200 font-sans antialiased">
      
      {/* --- Minimal Hero --- */}
      <section className="relative h-[60vh] flex items-center justify-center px-6 border-b border-zinc-800">
        <div className="z-10 text-center">
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Est. 2024</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
            Our <span className="italic font-serif">Legacy</span>
          </h1>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Redefining the standards of modern luxury through intentional design and unmatched craftsmanship.
          </p>
        </div>
      </section>

      {/* --- Our Story (Split Layout) --- */}
      <section className="reveal grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="p-12 md:p-24 border-r border-zinc-800">
          <h2 className="text-3xl font-semibold text-gold mb-6">The Narrative</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Founded on the principle that true luxury isn't loud; it's felt. We started as a small collective of artisans and have grown into a global benchmark for quality.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Every piece we create tells a story of precision, from the initial sketch to the final polish.
          </p>
        </div>
        <div className="h-full min-h-[400px]">
          <img src={collection4} alt="Craftsmanship" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
      </section>

      {/* --- Features (Tight Grid) --- */}
      <section className="reveal py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { img: collection1, title: "Precision", desc: "Attention to every stitch." },
            { img: collection2, title: "Heritage", desc: "Classic techniques, modern vision." },
            { img: collection3, title: "Ethics", desc: "Sustainably sourced materials." }
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 p-4">
              <div className="overflow-hidden mb-4">
                <img src={item.img} alt={item.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-medium text-gold mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Compact Team Section --- */}
      <section className="reveal py-20 bg-zinc-900/50 border-y border-zinc-800">
        <div className="px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-12 italic">The Visionaries</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="group">
                <div className="aspect-square bg-zinc-800 mb-4 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all">
                   <img src={collection1} className="w-full h-full object-cover" alt="team" />
                </div>
                <h4 className="text-sm font-bold tracking-wider">MARCUS REED</h4>
                <p className="text-xs text-zinc-500 uppercase">Director</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA (Clean & Direct) --- */}
      <section className="reveal py-24 text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-8 italic">Ready to experience excellence?</h2>
        <button className="px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 text-sm tracking-widest uppercase">
          Get in Touch
        </button>
      </section>

    </div>
  );
};

export default AboutUs;
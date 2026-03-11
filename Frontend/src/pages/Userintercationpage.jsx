import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import uservideo from "../assets/uservideo.mp4";
import poster from "../assets/poster.png";  // optional poster image for the video

const Userintercationpage = () => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  const promoLines = [
    "Premium Quality Crafted For You",
    "Exclusive Deals & Limited Offers",
    "Luxury Fashion Designed To Impress",
    "24/7 Dedicated Customer Support",
    "Experience Style. Experience Luxe & Loom."
  ];

  /* -------- CURSOR EFFECT (Desktop Only) -------- */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const cursor = cursorRef.current;

    gsap.set(cursor, {
      scale: 2.8,
      opacity: 0.25,
      backgroundColor: "rgba(255, 215, 0, 0.15)",
      boxShadow: "0 0 25px 10px rgba(255, 215, 0, 0.3)",
    });

    let lastTime = 0;

    const moveCursor = (e) => {
      const now = performance.now();
      if (now - lastTime < 16) return;
      lastTime = now;

      gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    const shineAnim = gsap.to(cursor, {
      scale: 1.1,
      opacity: 0.35,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut",
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      shineAnim.kill();
    };
  }, []);

  /* -------- PROMO TEXT LOOP -------- */
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % promoLines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [started]);

  /* -------- START VIDEO -------- */
  const handleStart = async () => {
    setStarted(true);

    const video = videoRef.current;

    if (video) {
      try {
        video.muted = false;
        await video.play();
      } catch (err) {
        console.log("Video play blocked:", err);
      }
    }

    gsap.to(overlayRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: "power3.out",
    });

    gsap.fromTo(
      video,
      { scale: 1.05 },
      { scale: 1, duration: 1.5, ease: "power3.out" }
    );
  };

  const handleVideoEnd = () => navigate("/home");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* Cursor Glow */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-32 h-32 rounded-full pointer-events-none blur-2xl mix-blend-overlay z-40"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Background Video */}
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        preload="none"
        playsInline
        muted
        poster={poster}   // optional preview image
        className="absolute w-full h-full object-cover will-change-transform"
      >
        <source src={uservideo} type="video/mp4" />
      </video>

      {/* Brand Title */}
      {started && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-10 w-full text-center px-4 z-50"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            LUXE&LOOM
          </h1>

          <p className="text-xs sm:text-sm md:text-base mt-2 text-white/90 tracking-widest">
            Redefining Modern Fashion
          </p>
        </motion.div>
      )}

      {/* Promotional Text */}
      {started && (
        <div className="absolute bottom-24 w-full flex justify-center px-6 text-center z-50">
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl tracking-wider text-white/90 max-w-xl"
            >
              {promoLines[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {/* START Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-center justify-center z-50"
        style={{ willChange: "opacity, transform" }}
      >
        {!started && (
          <motion.div
            onClick={handleStart}
            className="cursor-pointer text-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
            >
              START
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-[2px] bg-white mt-4 mx-auto"
            />
          </motion.div>
        )}
      </div>

      {/* Bottom Luxury Line */}
      {started && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4 }}
          className="absolute bottom-0 left-0 h-[2px] bg-white/40 z-50"
        />
      )}
    </div>
  );
};

export default Userintercationpage;
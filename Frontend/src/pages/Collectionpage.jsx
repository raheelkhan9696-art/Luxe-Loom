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

const images1 = [
  collection1,
  collection2,
  collection3,
  collection4,
  collection5,
  collection6,
];

const images2 = [
  collection6,
  collection5,
  collection4,
  collection3,
  collection2,
  collection1,
];

const CollectionPage = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.to(".parallax-bg", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
    <div
      ref={sectionRef}
      className="bg-black text-white overflow-hidden min-h-screen"
    >
      {/* Heading */}
      <div className="text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-widest">
          COLLECTIONS
        </h1>

        <p className="mt-4 sm:mt-6 text-gray-400 text-sm sm:text-base md:text-lg">
          Discover luxury crafted designs
        </p>
      </div>

      {/* Marquee Row 1 */}
      <div className="overflow-hidden">
        <div className="marquee flex gap-2 sm:gap-6 md:gap-4 lg:gap-6 py-6 sm:py-8 md:py-10">
          {[...images1, ...images1].map((img, i) => (
            <div
              key={i}
              className="
                min-w-[180px] h-[220px]
                sm:min-w-[220px] sm:h-[260px]
                md:min-w-[260px] md:h-[320px]
                lg:min-w-[320px] lg:h-[420px]
                xl:min-w-[350px] xl:h-[450px]
                rounded-xl lg:rounded-xl
                overflow-hidden group
              "
            >
              <img
                src={img}
                alt="collection"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="overflow-hidden">
        <div className="marquee2 flex gap-4 sm:gap-6 md:gap-4 lg:gap-6 py-6 sm:py-8 md:py-10">
          {[...images2, ...images2].map((img, i) => (
            <div
              key={i}
              className="
                min-w-[180px] h-[220px]
                sm:min-w-[220px] sm:h-[260px]
                md:min-w-[260px] md:h-[320px]
                lg:min-w-[320px] lg:h-[420px]
                xl:min-w-[350px] xl:h-[450px]
                rounded-xl lg:rounded-xl
                overflow-hidden group
              "
            >
              <img
                src={img}
                alt="collection"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
          <LuxuryCollection />
      </div>

     
    </div>
    </>
  );
};

export default CollectionPage;
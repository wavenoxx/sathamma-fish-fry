"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HearthEmbersCanvas } from "@/components/canvas/HearthEmbersCanvas";
import { useIntro } from "@/context/IntroContext";

export function Hero() {
  const { isIntroFinished } = useIntro();
  const [mountEmbers, setMountEmbers] = useState(false);

  useEffect(() => {
    if (isIntroFinished) {
      // Defer Three.js initialization until after the hero reveal (90ms)
      const timer = setTimeout(() => {
        setMountEmbers(true);
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [isIntroFinished]);

  return (
    <section
      id="hero"
      aria-label="Sathamma Fish Fry Hero Stage"
      className="relative w-full h-screen min-h-[100svh] overflow-hidden flex flex-col justify-between items-center select-none"
    >
      {/* 1. ABSOLUTE FULL-SCREEN BACKGROUND COVER (100vw, 100vh) - ZERO LATENCY NEXT.JS OPTIMIZED IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Desktop View */}
        <div className="hidden sm:block absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-desktop.png"
            alt="Fresh river fish fry at Sathamma Fish Fry, Devarakonda"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </div>
        {/* Mobile View */}
        <div className="block sm:hidden absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-mobile.png"
            alt="Fresh river fish fry at Sathamma Fish Fry, Devarakonda"
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </div>

        {/* Minimalist ambient vignette for floating header readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/45 pointer-events-none" />
      </div>

      {/* 2. THREE.JS WEBGL EMBERS - MOUNTED ONLY AFTER HERO IS REVEALED */}
      {mountEmbers && <HearthEmbersCanvas />}

      {/* 3. Top Spacing spacer for floating header */}
      <div className="w-full h-[120px] pointer-events-none z-10" />

      {/* 3. Center: Clean, Noise-Free Canvas (Zero Big H1, Photography is 100% the Hero) */}
      <div className="flex-1 w-full pointer-events-none z-10" />

      {/* 4. Bottom Subtle Indicator (Delicate Scroll Cue) */}
      <div className="w-full pb-10 sm:pb-14 px-6 sm:px-12 flex flex-col items-center justify-center z-10 select-none">
        <a
          href="#specials"
          data-cursor="button"
          className="font-ui text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1.5 py-2"
        >
          <span>THE DISHES ↓</span>
        </a>
      </div>
    </section>
  );
}

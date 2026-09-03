"use client";

import React, { useState } from "react";
import Image from "next/image";

export function Hero() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      id="hero"
      aria-label="Sathamma Fish Fry Hero Stage"
      className="relative w-full h-screen min-h-[100svh] overflow-hidden flex flex-col justify-between items-center select-none"
    >
      {/* 1. ABSOLUTE FULL-SCREEN BACKGROUND COVER (100vw, 100vh) - 100% ORIGINAL CLARITY */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Desktop View */}
        <Image
          src="/images/hero-desktop.png"
          alt="Sathamma Authentic Woodfire Fish Fry"
          fill
          priority
          unoptimized // Zero compression, zero blur - 100% original photographic clarity
          sizes="100vw"
          className="hidden sm:block object-cover object-center"
        />
        {/* Mobile View */}
        <Image
          src="/images/hero-mobile.png"
          alt="Sathamma Authentic Woodfire Fish Fry"
          fill
          priority
          unoptimized // Zero compression on mobile
          sizes="100vw"
          className="block sm:hidden object-cover object-center"
        />

        {/* Minimalist ambient vignette for floating header readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/45 pointer-events-none" />
      </div>

      {/* 2. Top Spacing spacer for floating header */}
      <div className="w-full h-[120px] pointer-events-none z-10" />

      {/* 3. Center: Clean, Noise-Free Canvas (Zero Big H1, Photography is 100% the Hero) */}
      <div className="flex-1 w-full pointer-events-none z-10" />

      {/* 4. Bottom Subtle Indicator (Patrizia Garganti Breathing Pagination & Scroll Cue) */}
      <div className="w-full pb-8 sm:pb-12 px-6 sm:px-12 flex flex-col items-center justify-center gap-3 z-10 select-none">
        {/* Breathing Pagination Dots */}
        <div
          className="flex items-center gap-3"
          aria-label="Carousel pagination"
        >
          {[0, 1, 2, 3].map((dot) => {
            const isActive = dot === activeDot;
            return (
              <button
                key={dot}
                type="button"
                data-cursor="button"
                onClick={() => setActiveDot(dot)}
                className="relative p-2 flex items-center justify-center bg-transparent border-0 cursor-pointer focus:outline-none"
                aria-label={`Slide ${dot + 1}`}
              >
                {isActive ? (
                  <div className="relative flex items-center justify-center w-[16px] h-[16px]">
                    <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-40" />
                    <span className="w-[12px] h-[12px] rounded-full border border-white flex items-center justify-center">
                      <span className="w-[3px] h-[3px] rounded-full bg-white" />
                    </span>
                  </div>
                ) : (
                  <span className="w-[3px] h-[3px] rounded-full bg-white/50 hover:bg-white transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        {/* Delicate Scroll Cue */}
        <a
          href="#specials"
          data-cursor="button"
          className="font-ui text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1.5 pt-1"
        >
          <span>EXPLORE THE HEARTH ↓</span>
        </a>
      </div>
    </section>
  );
}

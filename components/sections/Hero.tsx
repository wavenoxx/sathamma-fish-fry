"use client";

import React from "react";
import Image from "next/image";
import { HearthEmbersCanvas } from "@/components/canvas/HearthEmbersCanvas";

export function Hero() {
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
          alt="Fresh river fish fry at Sathamma Fish Fry, Devarakonda"
          fill
          priority
          unoptimized // Zero compression, zero blur - 100% original photographic clarity
          sizes="100vw"
          className="hidden sm:block object-cover object-center"
        />
        {/* Mobile View */}
        <Image
          src="/images/hero-mobile.png"
          alt="Fresh river fish fry at Sathamma Fish Fry, Devarakonda"
          fill
          priority
          unoptimized // Zero compression on mobile
          sizes="100vw"
          className="block sm:hidden object-cover object-center"
        />

        {/* Minimalist ambient vignette for floating header readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/45 pointer-events-none" />
      </div>

      {/* 2. THREE.JS WEBGL 3D ATMOSPHERIC FLOATING EMBERS & PARALLAX CANVAS */}
      <HearthEmbersCanvas />

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

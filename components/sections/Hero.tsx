"use client";

import React from "react";
import Image from "next/image";
import { restaurant } from "@/data/restaurant";
import { StarIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/OpenStatus";
import { SketchedButton } from "@/components/ui/SketchedButton";

export function Hero() {
  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.plusCode
    )}`;

  return (
    <section
      id="hero"
      aria-label="Sathamma Fish Fry Hero"
      className="relative w-full pt-[130px] sm:pt-[150px] md:pt-[170px] pb-16 md:pb-24 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
        {/* 1. Hallmark Eyebrow & Geographic Coordinates */}
        <div className="flex items-center gap-3 select-none mb-6">
          <span className="font-ui font-medium text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)]">
            DEVARAKONDA · TELANGANA
          </span>
          <span className="text-[var(--text-secondary)] opacity-40">/</span>
          <span className="font-ui font-normal text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-[var(--text-secondary)] opacity-80">
            16°42′ N, 78°55′ E
          </span>
        </div>

        {/* 2. Regal Centered Display Heading (Patrizia Garganti Style - 100% Solid, Zero Jank) */}
        <h1 className="font-display font-light text-[46px] sm:text-[68px] md:text-[88px] lg:text-[104px] uppercase tracking-[0.03em] leading-[0.96] text-[var(--text-primary)] max-w-5xl [text-wrap:balance]">
          HERITAGE <br className="hidden sm:inline" />
          <span>BY THE WATER</span>
        </h1>

        {/* 3. Editorial Storyline */}
        <p className="mt-6 md:mt-8 font-display font-light text-[17px] sm:text-[20px] md:text-[23px] text-[var(--text-secondary)] max-w-[38ch] leading-[1.5] [text-wrap:balance]">
          Fresh river catch from the Krishna backwaters, cooked over open woodfire the way it was born in 1998.
        </p>

        {/* 4. Patrizia Garganti Architectural Arched Window Portal */}
        <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[620px] aspect-[4/3] sm:aspect-[16/10] mt-10 md:mt-14 mb-10 md:mb-12 arch-portal border border-[var(--border-hairline)] shadow-2xl bg-black/40">
          <Image
            src="/images/hero-desktop.png"
            alt="Sathamma Fresh Fish Fry Woodfire Preparation"
            fill
            priority
            sizes="(min-width: 1024px) 620px, (min-width: 640px) 480px, 340px"
            className="object-cover object-center transform scale-[1.02] hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Arch Base Caption */}
          <div className="absolute bottom-4 left-0 right-0 text-center select-none">
            <span className="font-ui text-[9px] uppercase tracking-[0.24em] text-white/90 drop-shadow">
              HEARTH WOODFIRE & RIVER WATERS
            </span>
          </div>
        </div>

        {/* 5. Patrizia Garganti Hand-Drawn Sketched Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Sketched Button 1: Call Kitchen */}
          <SketchedButton
            line1="ORDER FRESH CATCH"
            line2="CALL KITCHEN DIRECT"
            href={`tel:${restaurant.phone}`}
          />

          {/* Sketched Button 2: Directions */}
          <SketchedButton
            line1="GET DIRECTIONS"
            line2="VIZAG COLONY BOATING POINT"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>

        {/* 6. Trust Plaque & Kitchen Status */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-ui text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] select-none">
          {/* Google Rating */}
          <div className="flex items-center gap-2">
            <StarIcon className="w-[13px] h-[13px] text-turmeric shrink-0" />
            <span className="font-medium text-[var(--text-primary)]">
              {restaurant.rating}
            </span>
            <span>RATED ON GOOGLE</span>
          </div>

          <span className="hidden sm:inline-block opacity-30">•</span>

          {/* Operating Status */}
          <div className="flex items-center gap-2">
            <OpenStatus />
          </div>

          <span className="hidden sm:inline-block opacity-30">•</span>

          {/* Catch Note */}
          <span className="opacity-80">
            COOKED TO ORDER · ZERO REHEATING
          </span>
        </div>
      </div>
    </section>
  );
}

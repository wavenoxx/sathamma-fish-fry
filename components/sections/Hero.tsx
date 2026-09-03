"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { restaurant } from "@/data/restaurant";
import { StarIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/OpenStatus";
import { SketchedButton } from "@/components/ui/SketchedButton";

const heroSlides = [
  {
    id: 0,
    src: "/images/hero-desktop.png",
    caption: "HEARTH WOODFIRE & RIVER WATERS",
    alt: "Sathamma Fresh Fish Fry Woodfire Preparation",
  },
  {
    id: 1,
    src: "/images/hero-mobile.png",
    caption: "CRISPED STRICTLY UPON ORDER",
    alt: "Sathamma Crisp River Fish Slices",
  },
  {
    id: 2,
    src: "/images/hero-desktop.png",
    caption: "KRISHNA RIVER ROHTEE & MURREL",
    alt: "Fresh Catch from Vizag Colony",
  },
  {
    id: 3,
    src: "/images/hero-mobile.png",
    caption: "HAND-GROUND STONE MORTAR SPICES",
    alt: "Artisanal Spice Blend",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.plusCode
    )}`;

  // Pointer drag event handlers for buttery smooth swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    const threshold = 40;

    if (diff > threshold) {
      // Prev slide
      setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    } else if (diff < -threshold) {
      // Next slide
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

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

        {/* 2. Regal Centered Display Heading (100% Solid & Stable) */}
        <h1 className="font-display font-light text-[46px] sm:text-[68px] md:text-[88px] lg:text-[104px] uppercase tracking-[0.03em] leading-[0.96] text-[var(--text-primary)] max-w-5xl [text-wrap:balance]">
          HERITAGE <br className="hidden sm:inline" />
          <span>BY THE WATER</span>
        </h1>

        {/* 3. Editorial Storyline */}
        <p className="mt-6 md:mt-8 font-display font-light text-[17px] sm:text-[20px] md:text-[23px] text-[var(--text-secondary)] max-w-[38ch] leading-[1.5] [text-wrap:balance]">
          Fresh river catch from the Krishna backwaters, cooked over open woodfire the way it was born in 1998.
        </p>

        {/* 4. Patrizia Garganti Interactive Arched Window Portal Carousel */}
        <div className="flex flex-col items-center w-full mt-10 md:mt-14 mb-10 md:mb-12">
          <div
            data-cursor="drag"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[620px] aspect-[4/3] sm:aspect-[16/10] arch-portal border border-[var(--border-hairline)] shadow-2xl bg-black/40 cursor-grab active:cursor-grabbing select-none touch-pan-y"
          >
            {/* Slide Track */}
            <div
              className={`relative w-full h-full ${
                isDragging ? "transition-none" : "transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
              }`}
              style={{
                transform: `translate3d(${dragOffset * 0.4}px, 0, 0)`,
              }}
            >
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="(min-width: 1024px) 620px, (min-width: 640px) 480px, 340px"
                    className="object-cover object-center transform scale-[1.02] hover:scale-105 transition-transform duration-1000 ease-out"
                    draggable={false}
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Arch Base Caption */}
                  <div className="absolute bottom-4 left-0 right-0 text-center select-none">
                    <span className="font-ui text-[9px] uppercase tracking-[0.24em] text-white/90 drop-shadow">
                      {slide.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patrizia Garganti Live Breathing Pagination Indicator: (•) • • • */}
          <div className="flex items-center gap-3 mt-5 select-none" aria-label="Hero Slide Pagination">
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  data-cursor="button"
                  onClick={() => setCurrentSlide(idx)}
                  className="relative p-2 flex items-center justify-center bg-transparent border-0 cursor-pointer focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {/* Outer Breathing Ring for Active Dot */}
                  {isActive ? (
                    <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                      <span className="absolute inset-0 rounded-full border border-[var(--text-primary)] animate-ping opacity-30" />
                      <span className="w-[14px] h-[14px] rounded-full border border-[var(--text-primary)] flex items-center justify-center">
                        <span className="w-[4px] h-[4px] rounded-full bg-[var(--text-primary)]" />
                      </span>
                    </div>
                  ) : (
                    <span className="w-[4px] h-[4px] rounded-full bg-[var(--text-secondary)] opacity-40 hover:opacity-80 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Patrizia Garganti Hand-Drawn Sketched Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <SketchedButton
            line1="ORDER FRESH CATCH"
            line2="CALL KITCHEN DIRECT"
            href={`tel:${restaurant.phone}`}
          />

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

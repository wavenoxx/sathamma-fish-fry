"use client";

import React, { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PhoneIcon, DirectionsIcon, StarIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/OpenStatus";
import { fadeUp, fadeOnly, imageScale } from "@/lib/motion";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // 1. Art-directed responsive image props via Next.js getImageProps
  const desktopImageProps = getImageProps({
    src: "/images/hero-desktop.jpg",
    alt: "Freshly fried river fish on wooden board with lemon and spices",
    fill: true,
    priority: true,
    quality: 88,
    sizes: "100vw",
    placeholder: "blur",
    blurDataURL:
      "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoQAAkABUB8JZgC7AELhzic64AA/vQp/qlRrAD8w060anXh3OHE29NxZN/igLAAAAA=",
  });

  const mobileImageProps = getImageProps({
    src: "/images/hero-mobile.jpg",
    alt: "Freshly fried river fish on wooden board with lemon and spices",
    fill: true,
    priority: true,
    quality: 88,
    sizes: "100vw",
    placeholder: "blur",
    blurDataURL:
      "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoJABAABUB8JYgAAudYMznsQAD+8pXpmUar4ahbyXAkj2f2iqIccyX57nbEAAAA",
  });

  // Content entrance variants
  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.11,
      },
    },
  };

  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;

  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${restaurant.address.line1}, ${restaurant.address.line2}, ${restaurant.address.plusCode}`
    )}`;

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden bg-ink"
    >
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <picture className="absolute inset-0 w-full h-full">
          <source
            media="(min-width: 768px)"
            srcSet={desktopImageProps.props.srcSet}
          />
          <img
            {...mobileImageProps.props}
            alt="Freshly fried river fish on wooden board with lemon and spices"
            className="w-full h-full object-cover object-bottom md:object-center"
          />
        </picture>
      </div>

      {/* OVERLAY LAYERS */}
      {/* 1. Desktop gradient to the right: ink 82% -> ink 55% at 45% width -> transparent at 75% */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,rgba(20,16,13,0.82)_0%,rgba(20,16,13,0.55)_45%,transparent_75%)] pointer-events-none"
      />

      {/* 2. Mobile refined cinematic overlay: text contrast at top, warm food visibility in center, gentle fade at bottom */}
      <div
        aria-hidden="true"
        className="block md:hidden absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,16,13,0.92)_0%,rgba(20,16,13,0.72)_36%,rgba(20,16,13,0.20)_65%,rgba(20,16,13,0.88)_100%)] pointer-events-none"
      />

      {/* 3. Subtle full-frame ink wash at 15% opacity to unify image with page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/15 pointer-events-none"
      />

      {/* CONTENT LAYER */}
      <Container wide className="relative z-10 w-full h-full flex flex-col justify-start md:justify-center">
        {/* Mobile container: poised top padding (pt-28), natural breathing room, balanced max-widths */}
        <div className="w-full text-left pt-28 sm:pt-32 md:pt-0 md:max-w-[40ch] lg:max-w-[54ch]">
          <div className="flex flex-col items-start">
            {/* 1. Hallmark Eyebrow with Spatial Coordinates */}
            <div className="curtain-mask mb-4 md:mb-6">
              <div className="animate-curtain-eyebrow flex items-center gap-3">
                <SectionLabel>
                  Devarakonda · Telangana
                </SectionLabel>
                <span className="font-ui text-[10px] tracking-[0.2em] text-cream-dim/50 uppercase select-none hidden sm:inline-block">
                  [ 16°42′ N · 78°55′ E ]
                </span>
              </div>
            </div>

            {/* 2. H1: Majestic, Staged Florentine Curtain Reveal (Line 1 then Line 2) */}
            <div className="w-full">
              <h1 className="font-display font-light text-[40px] sm:text-[46px] md:text-hero text-cream leading-[1.06] tracking-[-0.02em] [text-wrap:balance]">
                <span className="curtain-mask">
                  <span className="animate-curtain-title-1 block">Sathamma</span>
                </span>
                <span className="curtain-mask mt-1 md:mt-2">
                  <span className="animate-curtain-title-2 block">Fish Fry</span>
                </span>
              </h1>
            </div>

            {/* 3. Tagline: Poetic measure, Curtain Reveal */}
            <div className="curtain-mask mt-4 md:mt-6">
              <p className="animate-curtain-tagline font-display font-light text-[15px] sm:text-[17px] md:text-body text-cream-dim max-w-[28ch] sm:max-w-[34ch] md:max-w-[44ch] leading-[1.65] [text-wrap:balance]">
                Fresh river fish from the Krishna backwaters, cooked the way it always has been.
              </p>
            </div>

            {/* 4. White Desert Inspired Exclusivity / Trust Metric Plaque */}
            <div className="animate-curtain-meta mt-7 md:mt-8 flex flex-col items-start w-full">
              {/* Subtle hairline anchor on mobile */}
              <div className="w-10 h-px bg-line mb-5 block md:hidden" />

              {/* Factual Metrics Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 select-none">
                {/* Rating Badge */}
                <div className="inline-flex items-center gap-2">
                  <StarIcon className="w-[12px] h-[12px] md:w-[13px] md:h-[13px] text-turmeric shrink-0" />
                  <span className="font-ui font-medium text-[12px] md:text-[13px] text-cream leading-none">
                    {restaurant.rating}
                  </span>
                  <span className="font-ui font-medium text-micro uppercase tracking-[0.16em] text-cream-dim leading-none">
                    Rated on Google
                  </span>
                </div>

                <span className="hidden sm:inline-block text-cream-dim/30 select-none">/</span>

                {/* Sourcing Badge */}
                <span className="font-ui font-normal text-micro uppercase tracking-[0.18em] text-cream-dim/70">
                  Daily Fresh Catch · Woodfire Hearth
                </span>
              </div>

              {/* Open Status on mobile directly follows rating */}
              <div className="mt-3 block md:hidden">
                <OpenStatus />
              </div>
            </div>

            {/* 5. Desktop CTA Row with ApeChain Rolling Text Interactions */}
            <div className="animate-curtain-cta hidden md:flex mt-10 w-auto">
              <div className="flex items-center gap-4 w-auto">
                {/* Primary CTA (Ember Pill with Rolling Text) */}
                <a
                  href={`tel:${restaurant.phone}`}
                  className="rollover-btn group rounded-full px-7 py-3.5 bg-ember text-cream hover:bg-[#b04b23] transition-all duration-300 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink shadow-[0_8px_24px_-6px_rgba(180,70,26,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(180,70,26,0.5)]"
                >
                  <PhoneIcon className="w-[15px] h-[15px] text-cream shrink-0 mr-2.5" />
                  <span className="rollover-text">
                    <span className="rollover-main">Call Kitchen</span>
                    <span className="rollover-clone">Call Kitchen</span>
                  </span>
                </a>

                {/* Secondary CTA (Ghost Hairline with Rolling Text) */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rollover-btn group rounded-full px-7 py-3.5 border border-line/80 bg-transparent text-cream hover:bg-ink-soft hover:border-cream/40 transition-all duration-300 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <DirectionsIcon className="w-[15px] h-[15px] text-cream shrink-0 mr-2.5" />
                  <span className="rollover-text">
                    <span className="rollover-main">Get Directions</span>
                    <span className="rollover-clone">Get Directions</span>
                  </span>
                </a>
              </div>
            </div>

            {/* 6. Desktop Open Status (Follows CTA row with md:mt-8) */}
            <div className="animate-curtain-cta hidden md:block md:mt-8">
              <OpenStatus />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

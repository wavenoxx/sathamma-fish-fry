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
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transform-gpu">
        <motion.div
          variants={shouldReduceMotion ? fadeOnly : imageScale}
          initial="hidden"
          animate="visible"
          className="relative w-full h-full"
        >
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
        </motion.div>
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
      <Container className="relative z-10 w-full h-full flex flex-col justify-start md:justify-center">
        {/* Mobile container: poised top padding (pt-28), natural breathing room, balanced max-widths */}
        <div className="w-full text-left pt-28 sm:pt-32 md:pt-0 md:max-w-[40ch] lg:max-w-[52ch]">
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* 1. Hallmark Eyebrow */}
            <motion.div variants={childVariants}>
              <SectionLabel className="mb-4 md:mb-6">
                Devarakonda · Telangana
              </SectionLabel>
            </motion.div>

            {/* 2. H1: Majestic, confident, unhurried */}
            <motion.div variants={childVariants} className="w-full">
              <h1 className="font-display font-light text-[38px] sm:text-[44px] md:text-hero text-cream leading-[1.08] tracking-[-0.02em] [text-wrap:balance] lg:whitespace-nowrap">
                Sathamma <br className="block lg:hidden" />
                <span>Fish Fry</span>
              </h1>
            </motion.div>

            {/* 3. Tagline: Poetic measure, generous line height */}
            <motion.div variants={childVariants}>
              <p className="mt-4 md:mt-6 font-display font-light text-[15px] sm:text-[16px] md:text-body text-cream-dim max-w-[28ch] sm:max-w-[32ch] md:max-w-[42ch] leading-[1.65] [text-wrap:balance]">
                Fresh river fish, cooked the way it always has been.
              </p>
            </motion.div>

            {/* 4. Trust & Status Block (Anchored with delicate luxury hairline on mobile) */}
            <motion.div variants={childVariants} className="mt-7 md:mt-8 flex flex-col items-start">
              {/* Subtle hairline anchor on mobile */}
              <div className="w-10 h-px bg-line mb-5 block md:hidden" />

              {/* Rating row */}
              <div className="inline-flex items-center gap-2 select-none">
                <StarIcon className="w-[12px] h-[12px] md:w-[13px] md:h-[13px] text-turmeric shrink-0" />
                <span className="font-ui font-medium text-[12px] md:text-[13px] text-cream leading-none">
                  {restaurant.rating}
                </span>
                <svg
                  className="w-[3px] h-[3px] text-cream-dim/50 shrink-0"
                  viewBox="0 0 6 6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span className="font-ui font-medium text-micro uppercase tracking-[0.16em] md:tracking-[0.18em] text-cream-dim leading-none">
                  Rated on Google
                </span>
              </div>

              {/* Open Status on mobile directly follows rating */}
              <div className="mt-3 block md:hidden">
                <OpenStatus />
              </div>
            </motion.div>

            {/* 5. Desktop CTA Row (ABSENT on mobile below md) */}
            <motion.div
              variants={childVariants}
              className="hidden md:flex mt-10 w-auto"
            >
              <div className="flex items-center gap-3 w-auto">
                {/* Primary CTA (Single permitted ember element on desktop) */}
                <a
                  href={`tel:${restaurant.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 bg-ember text-cream hover:bg-[#b04b23] transition-colors duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink shadow-none"
                >
                  <PhoneIcon className="w-[16px] h-[16px] text-cream shrink-0" />
                  <span>Call Now</span>
                </a>

                {/* Secondary CTA */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <DirectionsIcon className="w-[16px] h-[16px] text-cream shrink-0" />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>

            {/* 6. Desktop Open Status (Follows CTA row with md:mt-8) */}
            <motion.div variants={childVariants} className="hidden md:block md:mt-8">
              <OpenStatus />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

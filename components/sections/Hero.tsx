"use client";

import React, { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PhoneIcon, DirectionsIcon, StarIcon } from "@/components/ui/icons";
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

  // 2. Parallax: IMAGE ONLY translates y from 0 to 48px as hero scrolls out
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawYParallax = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const translateY = shouldReduceMotion ? 0 : rawYParallax;

  // 3. Open Status: computed strictly client-side after mount in Asia/Kolkata timezone
  const [openStatus, setOpenStatus] = useState<{
    isOpen: boolean;
    text: string;
  } | null>(null);

  useEffect(() => {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      const parts = formatter.formatToParts(new Date());
      const hour = parseInt(
        parts.find((p) => p.type === "hour")?.value || "0",
        10
      );
      const minute = parseInt(
        parts.find((p) => p.type === "minute")?.value || "0",
        10
      );
      const currentMinutes = hour * 60 + minute;

      // Hours: 06:00 (360m) - 22:00 (1320m)
      const isOpen = currentMinutes >= 360 && currentMinutes < 1320;
      setOpenStatus({
        isOpen,
        text: isOpen ? "Open now · Closes 10 PM" : "Closed · Opens 6 AM",
      });
    } catch {
      setOpenStatus({
        isOpen: true,
        text: "Open now · Closes 10 PM",
      });
    }
  }, []);

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
      className="relative w-full min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden pt-16 sm:pt-20 md:pt-0 pb-32 md:pb-0 bg-ink"
    >
      {/* BACKGROUND IMAGE LAYER WITH PARALLAX */}
      <motion.div
        style={{ y: translateY }}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      >
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
      </motion.div>

      {/* OVERLAY LAYERS */}
      {/* 1. Desktop gradient to the right: ink 82% -> ink 55% at 45% width -> transparent at 75% */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,rgba(20,16,13,0.82)_0%,rgba(20,16,13,0.55)_45%,transparent_75%)] pointer-events-none"
      />

      {/* 2. Mobile gradient to the top: ink 20% at bottom -> ink 55% at 45% -> ink 85% at top */}
      <div
        aria-hidden="true"
        className="block md:hidden absolute inset-0 bg-[linear-gradient(to_top,rgba(20,16,13,0.20)_0%,rgba(20,16,13,0.55)_45%,rgba(20,16,13,0.85)_100%)] pointer-events-none"
      />

      {/* 3. Subtle full-frame ink wash at 15% opacity to unify image with page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/15 pointer-events-none"
      />

      {/* CONTENT LAYER */}
      <Container className="relative z-10 w-full">
        <div className="max-w-[46ch] w-full text-left">
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* 1. Eyebrow */}
            <motion.div variants={childVariants}>
              <SectionLabel className="mb-1.5 sm:mb-2 md:mb-6">
                Devarakonda · Telangana
              </SectionLabel>
            </motion.div>

            {/* 2. H1 */}
            <motion.div variants={childVariants}>
              <h1 className="font-display font-light text-hero text-cream leading-[1.05] tracking-[-0.015em]">
                Sathamma <br className="block sm:hidden" />
                Fish Fry
              </h1>
            </motion.div>

            {/* 3. Tagline */}
            <motion.div variants={childVariants}>
              <p className="mt-2 sm:mt-3 md:mt-6 font-display font-light text-body text-cream-dim max-w-[42ch] leading-[1.6]">
                Fresh river fish, cooked the way it always has been.
              </p>
            </motion.div>

            {/* 4. Rating */}
            <motion.div variants={childVariants} className="mt-3 sm:mt-4 md:mt-8">
              <div className="inline-flex items-center gap-2 select-none">
                <StarIcon className="w-[13px] h-[13px] text-turmeric shrink-0" />
                <span className="font-ui font-medium text-[13px] text-cream leading-none">
                  {restaurant.rating}
                </span>
                <svg
                  className="w-[3px] h-[3px] text-cream-dim/60 shrink-0"
                  viewBox="0 0 6 6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim leading-none">
                  Rated on Google
                </span>
              </div>
            </motion.div>

            {/* 5. CTA Row */}
            <motion.div
              variants={childVariants}
              className="mt-4 sm:mt-6 md:mt-10 w-full md:w-auto"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 w-full md:w-auto">
                {/* Primary CTA (Single permitted ember element in hero) */}
                <a
                  href={`tel:${restaurant.phone}`}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-7 py-2.5 sm:py-3 md:py-3.5 bg-ember text-cream hover:bg-[#b04b23] transition-colors duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream shadow-none w-full md:w-auto"
                >
                  <PhoneIcon className="w-[16px] h-[16px] text-cream shrink-0" />
                  <span>Call Now</span>
                </a>

                {/* Secondary CTA */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-7 py-2.5 sm:py-3 md:py-3.5 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40 w-full md:w-auto"
                >
                  <DirectionsIcon className="w-[16px] h-[16px] text-cream shrink-0" />
                  <span>Get Directions</span>
                </a>
              </div>
            </motion.div>

            {/* 6. Open Status (Computed strictly client-side after mount) */}
            {openStatus && (
              <motion.div variants={childVariants} className="mt-3 sm:mt-4 md:mt-8">
                <div className="inline-flex items-center gap-2 select-none">
                  <svg
                    className={`w-[5px] h-[5px] shrink-0 ${
                      openStatus.isOpen ? "text-[#6B8F71]" : "text-cream-dim/70"
                    }`}
                    viewBox="0 0 10 10"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="5" cy="5" r="5" />
                  </svg>
                  <span className="font-ui font-normal text-[12px] text-cream-dim leading-none">
                    {openStatus.text}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

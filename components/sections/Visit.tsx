"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PhoneIcon, DirectionsIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/OpenStatus";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { fadeUp, fadeOnly, stagger } from "@/lib/motion";

export function Visit() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;
  const mapVariants = fadeOnly;
  const containerVariants = shouldReduceMotion ? fadeOnly : stagger;

  const hasCoords =
    Boolean(
      restaurant.coords &&
        (restaurant.coords.lat !== 0 || restaurant.coords.lng !== 0)
    );
  const hasPlusCode = Boolean(restaurant.plusCode);
  const mapQuery = hasCoords
    ? `${restaurant.coords.lat},${restaurant.coords.lng}`
    : hasPlusCode
    ? restaurant.plusCode
    : null;

  const mapSrc = mapQuery
    ? `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`
    : null;

  if (!mapSrc && typeof window === "undefined") {
    console.warn(
      "[Visit] Coordinates and plusCode absent. Rendering visit-exterior ImageSlot placeholder."
    );
  }

  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.plusCode
    )}`;

  return (
    <section
      id="visit"
      aria-label="Visit Sathamma Fish Fry"
      className="relative w-full border-b border-line section-spacing bg-ink text-cream"
    >
      <Container>
        {/* HEADER: SectionLabel, then heading directly beneath, left-aligned */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start w-full min-w-0"
        >
          <SectionLabel className="mb-4">Visit</SectionLabel>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            Finding us
          </h2>
        </motion.div>

        {/* CONTENT GRID: Desktop 2-column (5 of 12 details, 7 of 12 map), Mobile stacked */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="spacing-block grid grid-cols-1 lg:grid-cols-12 lg:gap-20 gap-y-12 items-start w-full min-w-0"
        >
          {/* LEFT COLUMN: DETAILS BLOCK (5 of 12) */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-5 flex flex-col w-full min-w-0"
          >
            {/* 1. ADDRESS */}
            <div className="pt-0 flex flex-col items-start">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-3 select-none">
                Address
              </span>
              <p className="font-display font-light text-body text-cream leading-[1.6]">
                {restaurant.address.line1}
                <br />
                {restaurant.address.line2}
                <br />
                {restaurant.address.state} {restaurant.address.pincode}
              </p>
              <span className="mt-2 font-ui font-normal text-[12px] text-cream-dim">
                {restaurant.plusCode}
              </span>
            </div>

            {/* 2. HOURS */}
            <div className="mt-8 pt-8 border-t border-line flex flex-col items-start">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-3 select-none">
                Hours
              </span>
              <p className="font-display font-light text-body text-cream leading-[1.6]">
                6:00 AM — 10:00 PM
              </p>
              <span className="mt-1 font-ui font-normal text-[12px] text-cream-dim">
                Open every day
              </span>
              <OpenStatus className="mt-3" />
            </div>

            {/* 3. PHONE */}
            <div className="mt-8 pt-8 border-t border-line flex flex-col items-start">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-3 select-none">
                Phone
              </span>
              <a
                href={`tel:${restaurant.phone}`}
                className="font-display font-light text-body text-cream hover:underline underline-offset-4 decoration-cream/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
              >
                {restaurant.phoneDisplay}
              </a>
            </div>

            {/* 4. BEFORE YOU COME */}
            <div className="mt-8 pt-8 border-t border-line flex flex-col items-start">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-3 select-none">
                Before You Come
              </span>
              <p className="font-display font-light text-body text-cream-dim max-w-[40ch] leading-[1.6]">
                Fish depends on the day&apos;s catch. A call ahead saves a wasted drive.
              </p>
            </div>

            {/* ACTION BUTTONS (2.5rem gap) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center">
              {/* Call button: Ember on desktop (single permitted ember), GHOST on mobile (< md) */}
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-ui font-medium text-[14px] leading-none transition-all duration-200 border border-line md:border-transparent bg-transparent md:bg-ember text-cream hover:bg-ink-soft md:hover:bg-[#b04b23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink shadow-none"
              >
                <PhoneIcon className="w-[16px] h-[16px] text-cream shrink-0" />
                <span>Call</span>
              </a>

              {/* Directions button: Ghost */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <DirectionsIcon className="w-[16px] h-[16px] text-cream shrink-0" />
                <span>Directions</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: MAP CONTAINER (7 of 12) */}
          <motion.div
            variants={mapVariants}
            className="lg:col-span-7 w-full min-w-0"
          >
            <div className="relative w-full aspect-square lg:aspect-[4/3] border border-line rounded-[2px] overflow-hidden bg-ink-soft">
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  title="Location of Sathamma Fish Fry"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0 [filter:grayscale(0.35)_contrast(0.9)_brightness(0.85)]"
                />
              ) : (
                <ImageSlot id="visit-exterior" />
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PhoneIcon, DirectionsIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/OpenStatus";
import { fadeUp, fadeOnly, stagger } from "@/lib/motion";

export function Visit() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;
  const containerVariants = shouldReduceMotion ? fadeOnly : stagger;

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
        {/* SECTION HEADER: Restrained, quiet, left-aligned */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start max-w-[64ch] w-full min-w-0"
        >
          <SectionLabel className="mb-4">Visit</SectionLabel>
          <h2 className="font-display font-light text-h2 md:text-h1 text-cream leading-[1.15] tracking-[-0.015em]">
            Finding us
          </h2>
          <p className="mt-4 font-display font-light text-body text-cream-dim leading-[1.6]">
            A family kitchen near the water at Vizag Colony. Fresh catch arrives
            each morning, and we cook only to order.
          </p>
        </motion.div>

        {/* 3-COLUMN EDITORIAL DETAILS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="spacing-block pt-8 md:pt-12 border-t border-line grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start w-full min-w-0"
        >
          {/* COLUMN 1: LOCATION & ADDRESS */}
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start w-full min-w-0"
          >
            <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-4 select-none">
              Location
            </span>
            <p className="font-display font-light text-[17px] md:text-[18px] text-cream leading-[1.6]">
              {restaurant.address.line1}
              <br />
              {restaurant.address.line2}
              <br />
              {restaurant.address.state} {restaurant.address.pincode}
            </p>
            <span className="mt-3 block font-ui font-normal text-[12px] text-cream-dim tracking-wide">
              {restaurant.plusCode}
            </span>
            <div className="mt-8">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${restaurant.name}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[13px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink cursor-pointer"
              >
                <DirectionsIcon className="w-[15px] h-[15px] text-cream shrink-0" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: HOURS & STATUS */}
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start w-full min-w-0"
          >
            <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-4 select-none">
              Kitchen Hours
            </span>
            <p className="font-display font-light text-[17px] md:text-[18px] text-cream leading-[1.6]">
              6:00 AM — 10:00 PM
            </p>
            <span className="mt-1 block font-ui font-normal text-[12px] text-cream-dim">
              Open every day of the week
            </span>
            <div className="mt-4">
              <OpenStatus />
            </div>
            <p className="mt-6 font-ui font-normal text-[12px] text-cream-dim leading-relaxed max-w-[32ch]">
              Fish depends on the day&apos;s catch. Calling ahead ensures your
              order is ready when you arrive.
            </p>
          </motion.div>

          {/* COLUMN 3: ENQUIRIES & CALL */}
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start w-full min-w-0 md:col-span-2 lg:col-span-1"
          >
            <span className="font-ui font-medium text-micro uppercase tracking-[0.18em] text-cream-dim mb-4 select-none">
              Phone & Enquiries
            </span>
            <a
              href={`tel:${restaurant.phone}`}
              aria-label={`Call ${restaurant.name} at ${restaurant.phoneDisplay}`}
              className="font-display font-light text-[22px] md:text-[24px] text-cream hover:underline underline-offset-4 decoration-cream/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            >
              {restaurant.phoneDisplay}
            </a>
            <p className="mt-2 font-ui font-normal text-[12px] text-cream-dim leading-relaxed max-w-[32ch]">
              Direct line to the kitchen. Call before making the drive to check
              the morning&apos;s catch.
            </p>
            <div className="mt-8">
              <a
                href={`tel:${restaurant.phone}`}
                aria-label={`Call ${restaurant.name}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 font-ui font-medium text-[13px] leading-none transition-all duration-200 border border-line md:border-transparent bg-transparent md:bg-ember text-cream hover:bg-ink-soft md:hover:bg-[#b04b23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink shadow-none cursor-pointer"
              >
                <PhoneIcon className="w-[15px] h-[15px] text-cream shrink-0" />
                <span>Call Kitchen</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

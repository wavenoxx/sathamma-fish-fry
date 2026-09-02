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
        {/* SECTION HEADER: White Desert Inspired Destination Framing */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start max-w-[68ch] w-full min-w-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <SectionLabel>Visit</SectionLabel>
            <span className="font-ui text-[10px] tracking-[0.2em] text-cream-dim/40 uppercase select-none hidden sm:inline-block">
              [ 03 / DESTINATION & CONCIERGE ]
            </span>
          </div>
          <h2 className="font-display font-light text-h2 md:text-h1 text-cream leading-[1.12] tracking-[-0.015em]">
            Finding the kitchen
          </h2>
          <p className="mt-4 font-display font-light text-body text-cream-dim leading-[1.6]">
            Beside the water at Vizag Colony, Devarakonda. Fresh catch arrives at
            sunrise, and we cook only to order over open hearth fire.
          </p>
        </motion.div>

        {/* 3-COLUMN EDITORIAL DETAILS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="spacing-block pt-8 md:pt-12 border-t border-line/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start w-full min-w-0"
        >
          {/* COLUMN 1: LOCATION & APPROACH */}
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start w-full min-w-0"
          >
            <div className="flex items-center justify-between w-full pb-2 mb-4 border-b border-line/30 select-none">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.2em] text-cream-dim/60">
                Location & Approach
              </span>
              <span className="font-ui text-[9px] tracking-widest text-cream-dim/40">
                16°42′ N
              </span>
            </div>
            <p className="font-display font-light text-[17px] md:text-[18px] text-cream leading-[1.6]">
              {restaurant.address.line1}
              <br />
              {restaurant.address.line2}
              <br />
              {restaurant.address.state} {restaurant.address.pincode}
            </p>
            <span className="mt-3 block font-ui font-normal text-[12px] text-cream-dim/80 tracking-wide">
              {restaurant.plusCode}
            </span>
            <p className="mt-4 font-ui text-[12px] text-cream-dim/60 leading-relaxed">
              Approx. 140 km from Hyderabad via Nagarjuna Sagar Highway. Turn
              toward Vizag Colony boating point.
            </p>
            <div className="mt-7">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${restaurant.name}`}
                className="rollover-btn group rounded-full px-6 py-3 border border-line/80 bg-transparent text-cream hover:bg-ink-soft hover:border-cream/40 transition-all duration-300 font-ui font-medium text-[13px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink cursor-pointer"
              >
                <DirectionsIcon className="w-[14px] h-[14px] text-cream shrink-0 mr-2" />
                <span className="rollover-text">
                  <span className="rollover-main">Get Directions</span>
                  <span className="rollover-clone">Get Directions</span>
                </span>
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: HOURS & LIVE STATUS */}
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start w-full min-w-0"
          >
            <div className="flex items-center justify-between w-full pb-2 mb-4 border-b border-line/30 select-none">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.2em] text-cream-dim/60">
                Kitchen Operating Hours
              </span>
              <span className="font-ui text-[9px] tracking-widest text-cream-dim/40">
                DAILY
              </span>
            </div>
            <p className="font-display font-light text-[17px] md:text-[18px] text-cream leading-[1.6]">
              6:00 AM — 10:00 PM
            </p>
            <span className="mt-1 block font-ui font-normal text-[12px] text-cream-dim">
              Open all 7 days of the week
            </span>
            <div className="mt-4">
              <OpenStatus />
            </div>
            <p className="mt-6 font-ui font-normal text-[12px] text-cream-dim leading-relaxed max-w-[32ch]">
              Every dish depends on the river catch. Calling before you start your drive guarantees your fish is reserved and prepared fresh.
            </p>
          </motion.div>

          {/* COLUMN 3: DIRECT CONCIERGE CALL */}
          <motion.div
            variants={childVariants}
            className="flex flex-col items-start w-full min-w-0 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between w-full pb-2 mb-4 border-b border-line/30 select-none">
              <span className="font-ui font-medium text-micro uppercase tracking-[0.2em] text-cream-dim/60">
                Kitchen Direct Line
              </span>
              <span className="font-ui text-[9px] tracking-widest text-cream-dim/40">
                VOICE
              </span>
            </div>
            <a
              href={`tel:${restaurant.phone}`}
              aria-label={`Call ${restaurant.name} at ${restaurant.phoneDisplay}`}
              className="font-display font-light text-[22px] md:text-[25px] text-cream hover:text-cream/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            >
              {restaurant.phoneDisplay}
            </a>
            <p className="mt-2 font-ui font-normal text-[12px] text-cream-dim leading-relaxed max-w-[32ch]">
              Direct connection to the hearth. Call to enquire about today&apos;s catch of freshwater murrel and rohtee.
            </p>
            <div className="mt-7">
              <a
                href={`tel:${restaurant.phone}`}
                aria-label={`Call ${restaurant.name}`}
                className="rollover-btn group rounded-full px-6 py-3 font-ui font-medium text-[13px] leading-none transition-all duration-300 bg-ember text-cream hover:bg-[#b04b23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink shadow-[0_6px_20px_-4px_rgba(180,70,26,0.3)] cursor-pointer"
              >
                <PhoneIcon className="w-[14px] h-[14px] text-cream shrink-0 mr-2" />
                <span className="rollover-text">
                  <span className="rollover-main">Call Kitchen</span>
                  <span className="rollover-clone">Call Kitchen</span>
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

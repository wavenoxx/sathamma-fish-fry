"use client";

import React from "react";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { OpenStatus } from "@/components/OpenStatus";
import { SketchedButton } from "@/components/ui/SketchedButton";

export function Visit() {
  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.plusCode
    )}`;

  return (
    <section
      id="visit"
      aria-label="Visit Sathamma Fish Fry"
      className="relative w-full pb-20 md:pb-32 flex flex-col items-center"
    >
      {/* Hairline Divider */}
      <HairlineDivider
        category="DESTINATION & CONCIERGE"
        subtitle="DEVARAKONDA · 16°42′ N"
      />

      <Container>
        {/* Centered Heading */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-light text-[38px] sm:text-[54px] md:text-[68px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            THE DESTINATION
          </h2>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[19px] md:text-[21px] text-[var(--text-secondary)] leading-[1.5] max-w-[42ch]">
            Beside the water at Vizag Colony. The journey from Hyderabad takes you through the scenic hills of Devarakonda.
          </p>
        </div>

        {/* 3-Column Architectural Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 items-start w-full border-t border-[var(--border-hairline)] pt-12">
          {/* Column 1: Location & Approach */}
          <div className="flex flex-col items-start w-full">
            <div className="w-full pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
              <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                01 / LOCATION & APPROACH
              </span>
              <span className="font-ui text-[9px] tracking-widest text-[var(--text-secondary)] opacity-60">
                16°42′ N
              </span>
            </div>

            <p className="font-display font-light text-[20px] text-[var(--text-primary)] leading-[1.5]">
              {restaurant.address.line1}
              <br />
              {restaurant.address.line2}
              <br />
              {restaurant.address.state} {restaurant.address.pincode}
            </p>

            <span className="mt-4 block font-ui text-[11px] text-[var(--text-secondary)] tracking-wider">
              PLUS CODE: {restaurant.plusCode}
            </span>

            <p className="mt-4 font-ui text-[12px] text-[var(--text-secondary)] leading-relaxed opacity-85">
              Located near the Vizag Colony boating point along the Krishna river backwaters in Devarakonda.
            </p>
          </div>

          {/* Column 2: Kitchen Operating Hours */}
          <div className="flex flex-col items-start w-full">
            <div className="w-full pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
              <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                02 / OPERATING HOURS
              </span>
              <span className="font-ui text-[9px] tracking-widest text-[var(--text-secondary)] opacity-60">
                DAILY
              </span>
            </div>

            <p className="font-display font-light text-[20px] text-[var(--text-primary)] leading-[1.5]">
              6:00 AM — 10:00 PM
            </p>

            <span className="mt-1 block font-ui text-[11px] text-[var(--text-secondary)] tracking-wide">
              Open all 7 days of the week
            </span>

            <div className="mt-5">
              <OpenStatus />
            </div>

            <p className="mt-5 font-ui text-[12px] text-[var(--text-secondary)] leading-relaxed opacity-85">
              Fish availability depends on the daily catch. Calling ahead lets you confirm what is available and have it cooked fresh when you arrive.
            </p>
          </div>

          {/* Column 3: Direct Contact Line */}
          <div className="flex flex-col items-start w-full">
            <div className="w-full pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
              <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                03 / DIRECT CONTACT LINE
              </span>
              <span className="font-ui text-[9px] tracking-widest text-[var(--text-secondary)] opacity-60">
                VOICE
              </span>
            </div>

            <a
              href={`tel:${restaurant.phone}`}
              className="font-display font-light text-[24px] sm:text-[26px] text-[var(--text-primary)] hover:opacity-80 transition-opacity"
            >
              {restaurant.phoneDisplay}
            </a>

            <p className="mt-3 font-ui text-[12px] text-[var(--text-secondary)] leading-relaxed opacity-85">
              Direct connection to the kitchen. Inquire about the day’s freshwater catch or country chicken.
            </p>

            <a
              href={`tel:${restaurant.phone}`}
              className="mt-6 inline-flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.22em] text-ember hover:underline underline-offset-4"
            >
              <span>CALL BEFORE YOU VISIT →</span>
            </a>
          </div>
        </div>

        {/* Sketched Button for Directions */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <SketchedButton
            line1="GET DRIVING DIRECTIONS"
            line2="OPEN GOOGLE MAPS ROUTE"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </Container>
    </section>
  );
}

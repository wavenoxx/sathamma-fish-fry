"use client";

import React from "react";
import { specials } from "@/data/specials";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";

export function Specials() {
  const [plate1, plate2, plate3, plate4] = specials;

  return (
    <section
      id="specials"
      aria-label="Specialities"
      className="relative w-full pb-24 md:pb-36 flex flex-col items-center"
    >
      {/* Hairline Divider with Floating Centered Label */}
      <HairlineDivider
        category="ARTISAN CATCH"
        subtitle="RIVER SPECIALITIES"
      />

      <Container>
        {/* Section Heading: Centered Regal Serif (Patrizia Garganti Style) */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-light text-[38px] sm:text-[54px] md:text-[68px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            COLLECTIONS
          </h2>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[19px] md:text-[21px] text-[var(--text-secondary)] leading-[1.5] max-w-[44ch]">
            Four signature dishes prepared strictly upon order.
          </p>
        </div>

        {/* ASYMMETRICAL ARCHITECTURAL MONOLITH LAYOUT */}
        <div className="flex flex-col space-y-16 md:space-y-24 w-full">
          
          {/* =================================================================
              PLATE 01: HEROIC FEATURE MONOLITH (Cinematic Panoramic Presence)
              ================================================================= */}
          <article
            className="group relative w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-6 sm:p-10 lg:p-12 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50"
          >
            {/* Architectural Plaque Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--border-hairline)] gap-2 select-none">
              <div className="flex items-center gap-3">
                <span className="font-ui font-semibold text-[10px] uppercase tracking-[0.26em] text-ember">
                  NO. 01
                </span>
                <span className="opacity-30">/</span>
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  SIGNATURE FRESH FRY
                </span>
              </div>
              <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] opacity-70">
                DAILY RIVER SELECTION
              </span>
            </div>

            {/* Panoramic Visual Frame with 1800ms Hypnotic Lens Drift */}
            <div
              data-cursor="view"
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black/20"
            >
              <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                <ImageSlot
                  id={plate1.imageSlotId}
                  sizes="(min-width: 1200px) 80vw, 100vw"
                />
              </div>
            </div>

            {/* Editorial Monolith Details */}
            <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="font-display font-light text-[28px] sm:text-[36px] md:text-[42px] uppercase tracking-[0.02em] text-[var(--text-primary)] leading-tight">
                  {plate1.name}
                </h3>
                <p className="mt-3 font-ui font-normal text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {plate1.description} Cut thick from fresh freshwater catch, seasoned with traditional spices, and fried strictly to order.
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between md:justify-end shrink-0 border-t md:border-t-0 border-[var(--border-hairline)] pt-4 md:pt-0">
                <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  STANDARD PORTION
                </span>
                <span className="font-ui font-medium text-[22px] sm:text-[26px] text-[var(--text-primary)] tabular-nums mt-1">
                  ₹{plate1.price}
                </span>
              </div>
            </div>
          </article>


          {/* =================================================================
              PLATES 02 & 03: ASYMMETRIC JUXTAPOSED ARCHITECTURAL DUO
              ================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start w-full">
            
            {/* PLATE 02: Tall Florentine Arch Ratio (Fresh Fish Curry) */}
            <article className="lg:col-span-6 group relative w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-6 sm:p-8 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border-hairline)] select-none">
                <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  NO. 02 / FRESH FISH CURRY
                </span>
                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  LOCAL SPECIALITY
                </span>
              </div>

              {/* Tall Arched Visual Window */}
              <div
                data-cursor="view"
                className="relative w-full aspect-[4/5] overflow-hidden bg-black/20"
              >
                <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                  <ImageSlot
                    id={plate2.imageSlotId}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-baseline justify-between gap-4">
                <h3 className="font-display font-light text-[22px] sm:text-[26px] uppercase tracking-[0.02em] text-[var(--text-primary)]">
                  {plate2.name}
                </h3>
                <span className="font-ui font-medium text-[18px] text-[var(--text-primary)] tabular-nums shrink-0">
                  ₹{plate2.price}
                </span>
              </div>

              <p className="mt-3 font-ui font-normal text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {plate2.description} Slow-cooked with tamarind and traditional spices, prepared fresh when you order.
              </p>
            </article>

            {/* PLATE 03: Balanced Landscape Frame (Chepala Pulusu) */}
            <article className="lg:col-span-6 group relative w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-6 sm:p-8 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border-hairline)] select-none">
                <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  NO. 03 / HERITAGE SIMMER
                </span>
                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  TRADITIONAL RECIPE
                </span>
              </div>

              {/* Expansive Landscape Visual Window */}
              <div
                data-cursor="view"
                className="relative w-full aspect-[4/5] sm:aspect-[16/11] overflow-hidden bg-black/20"
              >
                <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                  <ImageSlot
                    id={plate3.imageSlotId}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-baseline justify-between gap-4">
                <h3 className="font-display font-light text-[22px] sm:text-[26px] uppercase tracking-[0.02em] text-[var(--text-primary)]">
                  {plate3.name}
                </h3>
                <span className="font-ui font-medium text-[18px] text-[var(--text-primary)] tabular-nums shrink-0">
                  ₹{plate3.price}
                </span>
              </div>

              <p className="mt-3 font-ui font-normal text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {plate3.description} Prepared with tamarind and coriander, yielding a rich, tangy broth cooked fresh for each guest.
              </p>
            </article>
          </div>


          {/* =================================================================
              PLATE 04: GRAND ARTISANAL ANCHOR MONOLITH (Natu Kodi Pulusu)
              ================================================================= */}
          <article
            className="group relative w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-6 sm:p-10 lg:p-12 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[var(--border-hairline)] gap-2 select-none">
              <div className="flex items-center gap-3">
                <span className="font-ui font-semibold text-[10px] uppercase tracking-[0.26em] text-ember">
                  NO. 04
                </span>
                <span className="opacity-30">/</span>
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  COUNTRY SPECIALITY
                </span>
              </div>
              <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] opacity-70">
                TRADITIONAL VILLAGE BONE-IN
              </span>
            </div>

            {/* Cinematic Frame */}
            <div
              data-cursor="view"
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black/20"
            >
              <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                <ImageSlot
                  id={plate4.imageSlotId}
                  sizes="(min-width: 1200px) 80vw, 100vw"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="font-display font-light text-[28px] sm:text-[36px] md:text-[42px] uppercase tracking-[0.02em] text-[var(--text-primary)] leading-tight">
                  {plate4.name}
                </h3>
                <p className="mt-3 font-ui font-normal text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                  {plate4.description}
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between md:justify-end shrink-0 border-t md:border-t-0 border-[var(--border-hairline)] pt-4 md:pt-0">
                <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  SERVED HOT WITH RICE
                </span>
                <span className="font-ui font-medium text-[22px] sm:text-[26px] text-[var(--text-primary)] tabular-nums mt-1">
                  ₹{plate4.price}
                </span>
              </div>
            </div>
          </article>

        </div>

        {/* Section Bottom Sketched Action */}
        <div className="mt-20 md:mt-28 flex justify-center">
          <SketchedButton
            line1="EXPLORE ENTIRE MENU"
            line2="FRESHWATER & COUNTRY SPECIALS"
            href="#menu"
          />
        </div>
      </Container>
    </section>
  );
}

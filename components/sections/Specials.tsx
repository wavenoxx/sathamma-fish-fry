"use client";

import React from "react";
import { specials } from "@/data/specials";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";

export function Specials() {
  return (
    <section
      id="specials"
      aria-label="Specialities"
      className="relative w-full pb-20 md:pb-32 flex flex-col items-center"
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
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[19px] md:text-[21px] text-[var(--text-secondary)] leading-[1.5] max-w-[42ch]">
            Four signature dishes prepared strictly upon order over open hearth and woodfire.
          </p>
        </div>

        {/* 2x2 Architectural Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start w-full">
          {specials.map((special, index) => {
            const itemNumber = `NO. 0${index + 1}`;
            return (
              <article
                key={special.id}
                className="group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-[var(--text-primary)]"
              >
                {/* Catalog Identification Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] select-none">
                  <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                    {itemNumber}
                  </span>
                  <span className="font-ui font-medium text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] opacity-80">
                    WOODFIRE PREPARATION
                  </span>
                </div>

                {/* Image Frame with Gentle Scale */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-black/20">
                  <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <ImageSlot
                      id={special.imageSlotId}
                      sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>

                {/* Name and Price Bar */}
                <div className="mt-6 flex items-baseline justify-between gap-4 w-full border-b border-[var(--border-hairline)] pb-4">
                  <h3 className="font-display font-light text-[24px] sm:text-[28px] uppercase tracking-[0.02em] text-[var(--text-primary)] group-hover:opacity-90 transition-opacity">
                    {special.name}
                  </h3>
                  <span className="font-ui font-medium text-[16px] text-[var(--text-primary)] tabular-nums shrink-0">
                    ₹{special.price}
                  </span>
                </div>

                {/* Editorial Description */}
                <p className="mt-4 font-ui font-normal text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  {special.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Section Bottom Sketched Action */}
        <div className="mt-16 md:mt-24 flex justify-center">
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

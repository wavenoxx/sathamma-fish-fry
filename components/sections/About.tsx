"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";
import { CinematicLightFrame } from "@/components/ui/CinematicLightFrame";

export function About() {
  return (
    <section
      id="about"
      aria-label="About Sathamma Fish Fry"
      className="relative w-full pb-20 md:pb-32 flex flex-col items-center"
    >
      {/* Hairline Divider */}
      <HairlineDivider
        category="OUR STORY"
        subtitle="DEVARAKONDA"
      />

      <Container>
        {/* Section Heading: Centered Regal Serif (Patrizia Garganti Style) */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-display font-light text-[38px] sm:text-[54px] md:text-[68px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            COOKED TO ORDER
          </h2>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[20px] text-[var(--text-secondary)] leading-[1.6] max-w-[44ch]">
            A family kitchen near the boating point at Vizag Colony, where the morning catch dictates the day’s menu.
          </p>
        </div>

        {/* 2-Column Editorial & Portrait Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full mb-16 md:mb-24">
          {/* Left: Framed Portrait / Kitchen Image */}
          <div className="lg:col-span-6 w-full">
            <div
              data-cursor="view"
              className="group relative w-full aspect-[4/5] border border-[var(--border-hairline)] bg-[var(--card-bg)] p-4 sm:p-6 backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--text-primary)]/40 cursor-pointer"
            >
              <CinematicLightFrame className="w-full h-full bg-black/20">
                <ImageSlot
                  id="about-portrait"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </CinematicLightFrame>
            </div>
          </div>

          {/* Right: Unhurried Editorial Storytelling */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            <div className="pb-3 border-b border-[var(--border-hairline)] select-none">
              <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                ORIGINS & PHILOSOPHY
              </span>
            </div>

            <p className="font-display font-light text-[18px] sm:text-[20px] text-[var(--text-secondary)] leading-[1.65]">
              Sathamma Fish Fry is not a restaurant in the conventional sense. It is an artisanal home kitchen beside the river backwaters in Devarakonda.
            </p>

            <p className="font-ui text-[13px] text-[var(--text-secondary)] leading-relaxed opacity-90">
              The fish comes directly from the freshwater nearby. What arrives in the morning determines what is prepared in the kitchen that afternoon. Everything is seasoned fresh for your order, and nothing is ever cooked in advance or reheated.
            </p>

            <p className="font-ui text-[13px] text-[var(--text-secondary)] leading-relaxed opacity-90">
              When you arrive, your fish is seasoned and fried strictly upon order. It takes patience, but as our guests from across Telangana have always appreciated, fresh food prepared to order cannot be rushed.
            </p>

            {/* Sketched Button */}
            <div className="pt-6">
              <SketchedButton
                line1="DISCOVER OUR STORY"
                line2="CALL BEFORE YOU COME"
                href="#visit"
              />
            </div>
          </div>
        </div>

        {/* Wide Architectural River Landscape Monograph with Living Cinematic Light Drift */}
        <div
          data-cursor="view"
          className="group w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-4 sm:p-6 backdrop-blur-sm transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--text-primary)]/40 cursor-pointer"
        >
          <CinematicLightFrame className="w-full aspect-[16/9] sm:aspect-[21/9] bg-black/20">
            <ImageSlot
              id="about-wide"
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </CinematicLightFrame>
          <div className="mt-3 flex items-center justify-between font-ui text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] select-none">
            <span>THE KRISHNA RIVER EDGE · NEAR VIZAG COLONY</span>
            <span>SOURCE OF FRESH RIVER CATCH</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

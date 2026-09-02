"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { specials } from "@/data/specials";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { fadeUp, fadeOnly, stagger } from "@/lib/motion";

export function Specials() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;
  const containerVariants = shouldReduceMotion ? fadeOnly : stagger;

  return (
    <section
      id="specials"
      aria-label="Specialities"
      className="relative w-full border-b border-line section-spacing bg-ink text-cream"
    >
      <Container>
        {/* SECTION HEADER: Patrizia Garganti & White Desert Framing */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start w-full min-w-0"
        >
          <div className="flex items-center gap-3 mb-2 md:mb-6">
            <SectionLabel>Specialities</SectionLabel>
            <span className="font-ui text-[10px] tracking-[0.2em] text-cream-dim/40 uppercase select-none hidden sm:inline-block">
              [ 01 / FOUR SIGNATURE PLATES ]
            </span>
          </div>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.12] tracking-[-0.015em]">
            What people travel for
          </h2>
          <p className="mt-3 font-display font-light text-body text-cream-dim max-w-[46ch] leading-[1.6]">
            Four dishes cooked strictly to order over open hearth and woodfire.
          </p>
        </motion.div>

        {/* SPECIALS GRID: ApeChain Inspired Tactile Cards with Staggered Height */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="spacing-block grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-16 lg:gap-y-24 lg:pb-20 items-start w-full min-w-0"
        >
          {specials.map((special, index) => {
            const isRightColumn = index % 2 === 1;
            const itemNumber = `0${index + 1}`;
            return (
              <motion.article
                key={special.id}
                variants={childVariants}
                className={`luxury-card group flex flex-col w-full min-w-0 p-5 md:p-6 rounded-[3px] border border-line/40 bg-ink-soft/40 backdrop-blur-sm transition-all duration-500 ease-out ${
                  isRightColumn ? "lg:translate-y-20" : ""
                }`}
              >
                {/* Visual Header Tag */}
                <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-line/40 select-none">
                  <span className="font-display font-light text-[14px] text-cream-dim/50 tracking-wider">
                    {itemNumber}
                  </span>
                  <span className="font-ui font-medium text-[9px] uppercase tracking-[0.2em] text-cream-dim/60">
                    SIGNATURE PREPARATION
                  </span>
                </div>

                {/* 4/5 Aspect Ratio Image with Gentle Scale */}
                <div className="relative w-full overflow-hidden bg-ink rounded-[2px]">
                  <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
                    <ImageSlot
                      id={special.imageSlotId}
                      sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>

                {/* Name and Price on same baseline */}
                <div className="mt-6 flex items-baseline justify-between gap-4 w-full min-w-0">
                  <h3 className="font-display font-normal text-h3 text-cream leading-snug group-hover:text-cream/90 transition-colors">
                    {special.name}
                  </h3>
                  <span className="font-ui font-medium text-body text-cream tabular-nums shrink-0 text-right">
                    ₹{special.price}
                  </span>
                </div>

                {/* Description */}
                <p className="font-ui font-normal text-[13px] text-cream-dim max-w-[38ch] mt-3 leading-relaxed">
                  {special.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

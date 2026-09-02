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
        {/* SECTION HEADER */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start w-full min-w-0"
        >
          <SectionLabel className="mb-2 md:mb-6">Specialities</SectionLabel>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            What people come for
          </h2>
          <p className="mt-3 font-display font-light text-body text-cream-dim max-w-[46ch] leading-[1.6]">
            Four dishes we are known for.
          </p>
        </motion.div>

        {/* SPECIALS GRID: SINGLE-COLUMN BELOW LG (0-1023px), OFFSET TWO-COLUMN AT LG (1024px+) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="spacing-block grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-16 lg:gap-y-24 lg:pb-20 items-start w-full min-w-0"
        >
          {specials.map((special, index) => {
            const isRightColumn = index % 2 === 1; // Cards 2 and 4 (indices 1 and 3)
            return (
              <motion.article
                key={special.id}
                variants={childVariants}
                className={`group flex flex-col w-full min-w-0 ${
                  isRightColumn ? "lg:translate-y-20" : ""
                }`}
              >
                {/* 4/5 Aspect Ratio Image with Desktop Scale Hover */}
                <div className="relative w-full overflow-hidden bg-ink-soft">
                  <div className="w-full h-full transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                    <ImageSlot
                      id={special.imageSlotId}
                      sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>

                {/* Name and Price on same baseline */}
                <div className="mt-6 flex items-baseline justify-between gap-4 w-full min-w-0">
                  <h3 className="font-display font-normal text-h3 text-cream leading-snug">
                    {special.name}
                  </h3>
                  <span className="font-ui font-medium text-body text-cream tabular-nums shrink-0 text-right">
                    ₹{special.price}
                  </span>
                </div>

                {/* Description */}
                <p className="font-ui font-normal text-[13px] text-cream-dim max-w-[36ch] mt-3 leading-relaxed">
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

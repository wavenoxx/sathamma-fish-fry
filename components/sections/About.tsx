"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { fadeUp, fadeOnly, imageScale, stagger } from "@/lib/motion";

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;
  const scaleVariants = shouldReduceMotion ? fadeOnly : imageScale;
  const containerVariants = shouldReduceMotion ? fadeOnly : stagger;

  return (
    <section
      id="about"
      aria-label="About Sathamma Fish Fry"
      className="relative w-full border-b border-line section-spacing bg-ink text-cream"
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col w-full min-w-0"
        >
          {/* ROW 1: SECTION LABEL (COLS 1-3) & H2 (COLS 4-10) */}
          <motion.div
            variants={childVariants}
            className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start w-full min-w-0"
          >
            <div className="lg:col-span-3">
              <SectionLabel className="mb-3 lg:mb-0">Our Story</SectionLabel>
            </div>
            <div className="lg:col-start-4 lg:col-span-7">
              <h2 className="font-display font-light text-h1 text-cream leading-[1.12] tracking-[-0.015em]">
                A kitchen, and a river behind it
              </h2>
            </div>
          </motion.div>

          {/* ROW 2: PORTRAIT IMAGE (COLS 1-5) & BODY COPY (COLS 7-11) */}
          <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start w-full min-w-0">
            {/* PORTRAIT IMAGE */}
            <motion.div
              variants={childVariants}
              className="lg:col-span-5 w-full min-w-0"
            >
              <div className="relative w-full overflow-hidden bg-ink-soft">
                <ImageSlot
                  id="about-portrait"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </motion.div>

            {/* BODY COPY (3 PARAGRAPHS, FIRST LINE LEVEL WITH UPPER THIRD OF PORTRAIT) */}
            <motion.div
              variants={childVariants}
              className="mt-12 lg:mt-0 lg:col-start-7 lg:col-span-5 lg:pt-44 flex flex-col space-y-6 w-full min-w-0"
            >
              <p className="font-display font-light text-body text-cream-dim max-w-[54ch] leading-[1.6]">
                Sathamma Fish Fry is not a restaurant in the way that word is
                usually meant. It is a house near the boating point at
                Devarakonda, with a kitchen at the back and a few tables set out
                in front of it.
              </p>
              <p className="font-display font-light text-body text-cream-dim max-w-[54ch] leading-[1.6]">
                The fish comes from the water nearby. What arrives in the morning
                decides what is cooked that day, which is why the same dish is
                never quite the same twice, and why we would rather you called
                before making the drive.
              </p>
              <p className="font-display font-light text-body text-cream-dim max-w-[54ch] leading-[1.6]">
                Nothing here is prepared in advance. You order, and then it is
                cooked. That takes longer than you might be used to. Most people
                seem to think it is worth the wait.
              </p>
            </motion.div>
          </div>

          {/* ROW 3: WIDE IMAGE (COLS 3-11, INSET FROM BOTH EDGES) & CAPTION */}
          <motion.div
            variants={childVariants}
            className="mt-12 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start w-full min-w-0"
          >
            <div className="lg:col-start-3 lg:col-span-9 w-full min-w-0">
              <motion.div
                variants={scaleVariants}
                className="relative w-full overflow-hidden bg-ink-soft"
              >
                <ImageSlot
                  id="about-wide"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                />
              </motion.div>
              <p className="mt-3 font-ui font-normal text-[11px] text-cream-dim text-left select-none">
                The river, a short walk from the kitchen.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

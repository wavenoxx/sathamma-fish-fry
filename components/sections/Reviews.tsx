"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { reviews } from "@/data/reviews";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, fadeOnly, stagger } from "@/lib/motion";

export function Reviews() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;
  const containerVariants = shouldReduceMotion ? fadeOnly : stagger;

  const hasGoogleProfile = Boolean(restaurant.googleProfileUrl);

  if (!hasGoogleProfile && typeof window === "undefined") {
    console.warn(
      "[Reviews] restaurant.googleProfileUrl is empty. Rendering link disabled."
    );
  }

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews"
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
          <SectionLabel className="mb-4">What people say</SectionLabel>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            Rated 4.9 on Google
          </h2>
          <p className="mt-3 font-display font-light text-body text-cream-dim leading-[1.6]">
            From people who made the drive.
          </p>
        </motion.div>

        {/* REVIEWS GRID: 1-col mobile/tablet, 2-col desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="spacing-block grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 lg:gap-y-16 items-start w-full min-w-0"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.id}
              variants={childVariants}
              className="pt-8 border-t border-line flex flex-col w-full min-w-0"
            >
              {/* Review Text */}
              <p className="font-display font-light text-body text-cream max-w-[46ch] leading-relaxed whitespace-pre-line">
                {review.text}
              </p>

              {/* Reviewer Name */}
              <span className="mt-5 font-ui font-medium text-[12px] uppercase tracking-[0.16em] text-cream-dim">
                {review.name}
              </span>
            </motion.article>
          ))}
        </motion.div>

        {/* LINK OUT BUTTON */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 flex justify-start"
        >
          {hasGoogleProfile ? (
            <a
              href={restaurant.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40"
            >
              Read reviews on Google
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 border border-line bg-transparent text-cream/40 opacity-40 cursor-not-allowed font-ui font-medium text-[14px] leading-none"
            >
              Read reviews on Google
            </span>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

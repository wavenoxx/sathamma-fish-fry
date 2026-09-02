"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { fadeUp, fadeOnly, stagger } from "@/lib/motion";

const galleryItems = [
  {
    id: "gallery-1",
    aspect: "4 / 5",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
    desktopClass: "lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:translate-y-0",
    tabletClass: "md:col-start-1 md:row-start-1 md:translate-y-0",
  },
  {
    id: "gallery-2",
    aspect: "3 / 4",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
    desktopClass: "lg:col-start-7 lg:col-span-4 lg:row-start-1 lg:translate-y-24", // offset down 6rem
    tabletClass: "md:col-start-2 md:row-start-1 md:translate-y-12", // offset down 3rem
  },
  {
    id: "gallery-3",
    aspect: "4 / 5",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
    desktopClass: "lg:col-start-2 lg:col-span-5 lg:row-start-2 lg:translate-y-0",
    tabletClass: "md:col-start-1 md:row-start-2 md:translate-y-12", // offset down 3rem (alternating)
  },
  {
    id: "gallery-4",
    aspect: "3 / 4",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
    desktopClass: "lg:col-start-8 lg:col-span-5 lg:row-start-2 lg:translate-y-16", // offset down 4rem
    tabletClass: "md:col-start-2 md:row-start-2 md:translate-y-0",
  },
  {
    id: "gallery-5",
    aspect: "4 / 5",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
    desktopClass: "lg:col-start-1 lg:col-span-4 lg:row-start-3 lg:translate-y-0",
    tabletClass: "md:col-start-1 md:row-start-3 md:translate-y-0",
  },
  {
    id: "gallery-6",
    aspect: "3 / 4",
    sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw",
    desktopClass: "lg:col-start-6 lg:col-span-6 lg:row-start-3 lg:translate-y-0",
    tabletClass: "md:col-start-2 md:row-start-3 md:translate-y-12", // offset down 3rem
  },
];

export function Gallery() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;
  const containerVariants = shouldReduceMotion ? fadeOnly : stagger;

  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="relative w-full border-b border-line section-spacing bg-ink text-cream"
    >
      <Container>
        {/* HEADER: Label then heading directly beneath, left-aligned */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start w-full min-w-0"
        >
          <SectionLabel className="mb-4">The Place</SectionLabel>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            A few things worth seeing
          </h2>
        </motion.div>

        {/* GALLERY GRID: 1-col mobile, 2-col tablet, 12-col asymmetric desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="spacing-block grid grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:pb-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-24 lg:pb-24 gap-y-12 items-start w-full min-w-0"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={childVariants}
              className={`group flex flex-col w-full min-w-0 ${item.tabletClass} ${item.desktopClass}`}
            >
              {/* ImageSlot with Desktop Hover Scale */}
              <div className="relative w-full overflow-hidden bg-ink-soft">
                <div className="w-full h-full transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                  <ImageSlot id={item.id} sizes={item.sizes} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

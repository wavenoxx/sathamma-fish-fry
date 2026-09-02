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
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-2",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-3",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-4",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-5",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-6",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
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
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start w-full min-w-0"
        >
          <SectionLabel className="mb-4">The Place</SectionLabel>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            A few things worth seeing
          </h2>
        </motion.div>

        {/* GALLERY GRID: Symmetrical, calm, ultra-luxurious 3-column layout */}
        <div className="spacing-block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start w-full min-w-0">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col w-full min-w-0"
            >
              {/* ImageSlot with gentle luxury hover scale */}
              <div className="relative w-full overflow-hidden bg-ink-soft rounded-[2px]">
                <div className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
                  <ImageSlot id={item.id} sizes={item.sizes} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

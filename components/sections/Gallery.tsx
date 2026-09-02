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
    label: "PLATE 01",
    tag: "RIVER CATCH",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-2",
    label: "PLATE 02",
    tag: "WOODFIRE HEARTH",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-3",
    label: "PLATE 03",
    tag: "STONE MORTAR",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-4",
    label: "PLATE 04",
    tag: "CLAY VESSELS",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-5",
    label: "PLATE 05",
    tag: "BRASS SERVICE",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-6",
    label: "PLATE 06",
    tag: "TWILIGHT WATERS",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
];

export function Gallery() {
  const shouldReduceMotion = useReducedMotion();
  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;

  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="relative w-full border-b border-line section-spacing bg-ink text-cream"
    >
      <Container>
        {/* HEADER: White Desert Spatial Exhibition Header */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-start w-full min-w-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <SectionLabel>The Place</SectionLabel>
            <span className="font-ui text-[10px] tracking-[0.2em] text-cream-dim/40 uppercase select-none hidden sm:inline-block">
              [ ARCHIVAL MONOGRAPH · 06 PLATES ]
            </span>
          </div>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            A few things worth seeing
          </h2>
          <p className="mt-3 font-display font-light text-body text-cream-dim max-w-[46ch] leading-[1.6]">
            The water, the kitchen, and the rhythm of the riverbank.
          </p>
        </motion.div>

        {/* GALLERY GRID: Symmetrical, calm, archival 3-column exhibition layout */}
        <div className="spacing-block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start w-full min-w-0">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="luxury-card group flex flex-col w-full min-w-0 p-4 rounded-[3px] border border-line/40 bg-ink-soft/30 backdrop-blur-sm transition-all duration-500 ease-out"
            >
              {/* Archival Monograph Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-line/30 select-none">
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.22em] text-cream-dim/50">
                  {item.label}
                </span>
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.22em] text-cream-dim/70">
                  {item.tag}
                </span>
              </div>

              {/* ImageSlot with gentle luxury hover scale */}
              <div className="relative w-full overflow-hidden bg-ink rounded-[2px]">
                <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
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

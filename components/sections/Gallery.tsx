"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";

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
  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="relative w-full pb-20 md:pb-32 flex flex-col items-center"
    >
      {/* Hairline Divider */}
      <HairlineDivider
        category="VISUAL MONOGRAPH"
        subtitle="THE PLACE & THE WATER"
      />

      <Container>
        {/* Centered Heading */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-light text-[38px] sm:text-[54px] md:text-[68px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            THE ARCHIVES
          </h2>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[19px] md:text-[21px] text-[var(--text-secondary)] leading-[1.5] max-w-[42ch]">
            Six visual monographs capturing the water, the fire, and the kitchen in Vizag Colony.
          </p>
        </div>

        {/* 3-Column Architectural Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-start w-full">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-5 rounded-[2px] backdrop-blur-sm transition-all duration-500 hover:border-[var(--text-primary)]"
            >
              {/* Monograph Plate Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-hairline)] select-none">
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  {item.label}
                </span>
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] opacity-80">
                  {item.tag}
                </span>
              </div>

              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/20">
                <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <ImageSlot id={item.id} sizes={item.sizes} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sketched Button */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <SketchedButton
            line1="VISIT THE SANCTUARY"
            line2="DEVARAKONDA · VIZAG COLONY"
            href="#visit"
          />
        </div>
      </Container>
    </section>
  );
}

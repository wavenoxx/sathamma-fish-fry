"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";

const galleryItems = [
  {
    id: "gallery-1",
    label: "PLATE 01",
    tag: "RIVER CATCH",
    title: "Fresh River Fish",
    desc: "Sourced each dawn from the Krishna river backwaters, cleaned with turmeric and rock salt.",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-2",
    label: "PLATE 02",
    tag: "WOODFIRE HEARTH",
    title: "The Woodfire Hearth",
    desc: "Open firewood stove maintained continuously since 1998, giving food its authentic aroma.",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-3",
    label: "PLATE 03",
    tag: "STONE MORTAR",
    title: "Stone Mortar Spices",
    desc: "Dry red chilies, coriander seeds, garlic, and ginger crushed fresh by hand for each order.",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-4",
    label: "PLATE 04",
    tag: "CLAY VESSELS",
    title: "Simmering Clay Pots",
    desc: "Traditional earthenware pots used for Chepala Pulusu to infuse natural earthen sweetness.",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-5",
    label: "PLATE 05",
    tag: "BRASS SERVICE",
    title: "Brass Service",
    desc: "Hot fish served straight from the fire onto traditional plates with fresh lime and onions.",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    id: "gallery-6",
    label: "PLATE 06",
    tag: "TWILIGHT WATERS",
    title: "Krishna Backwaters",
    desc: "The tranquil reservoir at Vizag Colony, where the boats dock every evening at sunset.",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
];

export function Gallery() {
  const [activePlate, setActivePlate] = useState<(typeof galleryItems)[0] | null>(null);

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
              data-cursor="view"
              onClick={() => setActivePlate(item)}
              className="group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-5 rounded-[2px] backdrop-blur-sm transition-all duration-500 hover:border-[var(--text-primary)] cursor-pointer"
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

              {/* Plate Footer Note */}
              <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                <span>{item.title}</span>
                <span className="text-ember opacity-0 group-hover:opacity-100 transition-opacity">INSPECT ↗</span>
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

      {/* Museum Monograph Lightbox Inspection Modal */}
      {activePlate && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePlate(null)}
        >
          <div
            className="relative max-w-2xl w-full border border-white/20 bg-[#0d0d0d] p-6 sm:p-10 flex flex-col items-start text-left shadow-2xl text-[#edece7]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-white/15 select-none">
              <span className="font-ui text-[10px] uppercase tracking-[0.26em] text-neutral-400">
                MONOGRAPH ARCHIVE · {activePlate.label}
              </span>
              <button
                type="button"
                data-cursor="button"
                onClick={() => setActivePlate(null)}
                className="font-ui text-[11px] uppercase tracking-[0.22em] text-white hover:text-ember transition-colors bg-transparent border-0 cursor-pointer"
              >
                CLOSE [ × ]
              </button>
            </div>

            {/* Display Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-white/10 bg-black mb-6">
              <ImageSlot id={activePlate.id} sizes="600px" />
            </div>

            {/* Details */}
            <h3 className="font-display font-light text-[26px] sm:text-[32px] uppercase tracking-[0.02em] text-white">
              {activePlate.title}
            </h3>
            <p className="mt-3 font-ui text-[13px] sm:text-[14px] text-neutral-300 leading-relaxed">
              {activePlate.desc}
            </p>

            {/* Provenance */}
            <div className="w-full mt-6 pt-4 border-t border-white/15 flex items-center justify-between font-ui text-[9px] uppercase tracking-[0.24em] text-neutral-400 select-none">
              <span>LOCATION: VIZAG COLONY BOATING POINT</span>
              <span>16°42′ N, 78°55′ E</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

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
    sizes: "(min-width: 1024px) 60vw, 100vw",
  },
  {
    id: "gallery-2",
    label: "PLATE 02",
    tag: "WOODFIRE HEARTH",
    title: "The Woodfire Hearth",
    desc: "Open firewood stove maintained continuously since 1998, giving food its authentic aroma.",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  {
    id: "gallery-3",
    label: "PLATE 03",
    tag: "STONE MORTAR",
    title: "Stone Mortar Spices",
    desc: "Dry red chilies, coriander seeds, garlic, and ginger crushed fresh by hand for each order.",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    id: "gallery-4",
    label: "PLATE 04",
    tag: "CLAY VESSELS",
    title: "Simmering Clay Pots",
    desc: "Traditional earthenware pots used for Chepala Pulusu to infuse natural earthen sweetness.",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    id: "gallery-5",
    label: "PLATE 05",
    tag: "BRASS SERVICE",
    title: "Brass Service",
    desc: "Hot fish served straight from the fire onto traditional plates with fresh lime and onions.",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    id: "gallery-6",
    label: "PLATE 06",
    tag: "TWILIGHT WATERS",
    title: "Krishna Backwaters",
    desc: "The tranquil reservoir at Vizag Colony, where the boats dock every evening at sunset.",
    sizes: "(min-width: 1200px) 85vw, 100vw",
  },
];

export function Gallery() {
  const [activePlate, setActivePlate] = useState<(typeof galleryItems)[0] | null>(null);

  const [item1, item2, item3, item4, item5, item6] = galleryItems;

  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="relative w-full pb-24 md:pb-36 flex flex-col items-center"
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

        {/* ARCHITECTURAL EXHIBITION LAYOUT */}
        <div className="flex flex-col space-y-10 md:space-y-14 w-full">
          
          {/* TIER 1: ASYMMETRICAL DUO (Wide River Catch Panorama + Tall Hearth Window) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
            {/* Plate 01: Panorama (7 cols) */}
            <div
              data-cursor="view"
              onClick={() => setActivePlate(item1)}
              className="lg:col-span-7 group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-5 sm:p-7 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50 cursor-pointer"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] select-none">
                <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  {item1.label} / {item1.tag}
                </span>
                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  DAWN CATCH
                </span>
              </div>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/20">
                <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                  <ImageSlot id={item1.id} sizes={item1.sizes} />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                <span>{item1.title}</span>
                <span className="text-ember font-medium opacity-0 group-hover:opacity-100 transition-opacity">INSPECT ↗</span>
              </div>
            </div>

            {/* Plate 02: Tall Hearth Monograph (5 cols) */}
            <div
              data-cursor="view"
              onClick={() => setActivePlate(item2)}
              className="lg:col-span-5 group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-5 sm:p-7 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50 cursor-pointer"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] select-none">
                <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  {item2.label} / {item2.tag}
                </span>
                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  OPEN HEARTH
                </span>
              </div>
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/20">
                <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                  <ImageSlot id={item2.id} sizes={item2.sizes} />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                <span>{item2.title}</span>
                <span className="text-ember font-medium opacity-0 group-hover:opacity-100 transition-opacity">INSPECT ↗</span>
              </div>
            </div>
          </div>


          {/* TIER 2: MUSEUM TRIPTYCH (Stone Mortar, Clay Pots, Brass Service) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch w-full">
            {[item3, item4, item5].map((item) => (
              <div
                key={item.id}
                data-cursor="view"
                onClick={() => setActivePlate(item)}
                className="group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-5 sm:p-6 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50 cursor-pointer"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] select-none">
                  <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                    {item.label}
                  </span>
                  <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-70">
                    {item.tag}
                  </span>
                </div>
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/20">
                  <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                    <ImageSlot id={item.id} sizes={item.sizes} />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  <span>{item.title}</span>
                  <span className="text-ember font-medium opacity-0 group-hover:opacity-100 transition-opacity">INSPECT ↗</span>
                </div>
              </div>
            ))}
          </div>


          {/* TIER 3: GRAND PANORAMA MONOLITH (Krishna Twilight Backwaters) */}
          <div
            data-cursor="view"
            onClick={() => setActivePlate(item6)}
            className="group flex flex-col w-full border border-[var(--border-hairline)] bg-[var(--card-bg)] p-6 sm:p-8 backdrop-blur-sm transition-colors duration-700 hover:border-[var(--text-primary)]/50 cursor-pointer"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-hairline)] select-none">
              <span className="font-ui font-semibold text-[9px] uppercase tracking-[0.24em] text-ember">
                {item6.label} / {item6.tag}
              </span>
              <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                VIZAG COLONY RESERVOIR
              </span>
            </div>
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black/20">
              <div className="w-full h-full transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025] group-hover:brightness-[1.03]">
                <ImageSlot id={item6.id} sizes={item6.sizes} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              <span>{item6.title} · SUNSET DOCKING POINT</span>
              <span className="text-ember font-medium opacity-0 group-hover:opacity-100 transition-opacity">INSPECT ↗</span>
            </div>
          </div>

        </div>

        {/* Sketched Button */}
        <div className="mt-20 md:mt-28 flex justify-center">
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

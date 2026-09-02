import React from "react";
import Image from "next/image";
import { imageSlots } from "@/data/images";
import existingImages from "@/data/existing-images.json";

interface ImageSlotProps {
  id: string;
  className?: string;
  sizes?: string;
}

const slotEditorialMetadata: Record<string, { number: string; title: string }> = {
  "gallery-1": { number: "01", title: "Fresh River Catch" },
  "gallery-2": { number: "02", title: "The Woodfire Hearth" },
  "gallery-3": { number: "03", title: "Stone Mortar Spices" },
  "gallery-4": { number: "04", title: "Simmering Clay Pots" },
  "gallery-5": { number: "05", title: "Brass Plate Service" },
  "gallery-6": { number: "06", title: "Twilight at the Water" },
  "about-portrait": { number: "01", title: "The Family Kitchen" },
  "about-wide": { number: "02", title: "Riverside at Dusk" },
  "visit-exterior": { number: "01", title: "Vizag Colony" },
  "special-1": { number: "01", title: "Sathamma Fish Fry" },
  "special-2": { number: "02", title: "Natu Style Fish Curry" },
  "special-3": { number: "03", title: "Chepala Pulusu" },
  "special-4": { number: "04", title: "Natu Kodi Pulusu" },
};

export function ImageSlot({
  id,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImageSlotProps) {
  const slot = imageSlots[id];

  if (!slot) {
    return null;
  }

  // Existence detection resolved at build time from existingImages manifest
  const fileExists =
    existingImages.includes(slot.file) ||
    existingImages.includes(slot.file.replace(/^\//, ""));

  const meta = slotEditorialMetadata[slot.id];

  return (
    <div
      className={`relative w-full overflow-hidden bg-ink-soft ${className}`}
      style={{ aspectRatio: slot.aspect }}
      data-slot-id={slot.id}
    >
      {fileExists ? (
        <Image
          src={slot.file}
          alt={slot.intent}
          fill
          className="object-cover"
          quality={88}
          priority={slot.priority}
          sizes={sizes}
        />
      ) : (
        <div className="absolute inset-0 border border-line/40 bg-[#161210] flex flex-col items-center justify-center p-6 select-none text-center">
          <span className="font-display font-light text-[22px] text-cream-dim/35 tracking-wider">
            {meta?.number || "—"}
          </span>
          <span className="font-ui font-medium text-[10px] tracking-[0.2em] uppercase text-cream-dim/60 mt-2 max-w-[24ch] leading-relaxed">
            {meta?.title || slot.intent}
          </span>
          <span className="font-ui font-normal text-[9px] tracking-wider text-cream-dim/30 mt-1">
            {slot.aspect}
          </span>
        </div>
      )}
    </div>
  );
}

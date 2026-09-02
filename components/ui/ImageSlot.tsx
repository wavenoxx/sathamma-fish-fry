import React from "react";
import Image from "next/image";
import { imageSlots } from "@/data/images";
import existingImages from "@/data/existing-images.json";

interface ImageSlotProps {
  id: string;
  className?: string;
  sizes?: string;
}

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
        <div className="absolute inset-0 border border-line flex flex-col items-center justify-center p-4 select-none text-center">
          <span className="font-ui font-normal text-[11px] text-cream-dim leading-tight">
            {slot.id}
          </span>
          <span className="font-ui font-normal text-[11px] text-cream-dim/60 leading-tight mt-1">
            {slot.aspect}
          </span>
        </div>
      )}
    </div>
  );
}

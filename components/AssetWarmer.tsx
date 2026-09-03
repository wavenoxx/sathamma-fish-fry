"use client";

import { useEffect } from "react";
import { imageSlots } from "@/data/images";

export function AssetWarmer() {
  useEffect(() => {
    // Only execute on client during idle time
    if (typeof window === "undefined") return;

    const warmAssets = () => {
      // Exclude hero images since hero is already mounted above the fold with media-aware loading
      const urls = Object.values(imageSlots)
        .filter((slot) => !slot.id.startsWith("hero-"))
        .map((slot) => slot.file);
      urls.forEach((url) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = url;
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(warmAssets, { timeout: 2000 });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(warmAssets, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}

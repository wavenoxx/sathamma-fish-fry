"use client";

import { useEffect } from "react";
import { imageSlots } from "@/data/images";
import { useIntro } from "@/context/IntroContext";

export function AssetWarmer() {
  const { isIntroFinished } = useIntro();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // RULE 1: Never start during intro! Wait until hero is fully revealed.
    if (!isIntroFinished) return;

    // RULE 2: Honor navigator.connection.saveData and connection speed
    const nav = navigator as unknown as {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };
    const connection = nav.connection;

    // If user requested Data Saver or is on 2G/slow-2G, skip warming completely!
    if (
      connection?.saveData ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g"
    ) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const isConstrained = connection?.effectiveType === "3g";

    // RULE 3: Allow hero to settle before any secondary warming begins
    // Desktop: 2000ms after intro completion
    // Mobile: 3500ms after intro completion
    const settleDelay = isMobile ? 3500 : 2000;

    let cancelled = false;
    let idleHandle: number | null = null;
    let timerHandle: NodeJS.Timeout | null = null;

    timerHandle = setTimeout(() => {
      if (cancelled) return;

      // Filter out hero visuals (already on-screen above the fold)
      let candidateSlots = Object.values(imageSlots).filter(
        (slot) => !slot.id.startsWith("hero-")
      );

      // On mobile or 3G, only warm the immediate next section (Specials plates 01 & 02)
      if (isMobile || isConstrained) {
        candidateSlots = candidateSlots.filter(
          (slot) => slot.id === "special-1" || slot.id === "special-2"
        );
      }

      const urls = candidateSlots.map((slot) => slot.file);
      let index = 0;

      // RULE 4: Stagger warmup one image at a time during idle periods
      const warmNext = () => {
        if (cancelled || index >= urls.length) return;

        const url = urls[index++];
        const img = new window.Image();
        img.decoding = "async";
        img.src = url;

        // Warm next image after a polite idle pause
        if (index < urls.length) {
          if ("requestIdleCallback" in window) {
            idleHandle = (
              window as unknown as {
                requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
              }
            ).requestIdleCallback(
              () => {
                setTimeout(warmNext, isMobile ? 1200 : 400);
              },
              { timeout: 3000 }
            );
          } else {
            setTimeout(warmNext, isMobile ? 1200 : 500);
          }
        }
      };

      if ("requestIdleCallback" in window) {
        idleHandle = (
          window as unknown as {
            requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
          }
        ).requestIdleCallback(warmNext, { timeout: 4000 });
      } else {
        warmNext();
      }
    }, settleDelay);

    return () => {
      cancelled = true;
      if (timerHandle) clearTimeout(timerHandle);
      if (idleHandle && "cancelIdleCallback" in window) {
        (
          window as unknown as { cancelIdleCallback: (h: number) => void }
        ).cancelIdleCallback(idleHandle);
      }
    };
  }, [isIntroFinished]);

  return null;
}

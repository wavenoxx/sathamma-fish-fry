"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useIntro } from "@/context/IntroContext";

export function IntroPortalReveal() {
  const pathname = usePathname();
  const { isIntroFinished, finishIntro } = useIntro();

  useEffect(() => {
    if (pathname !== "/") {
      finishIntro();
      return;
    }

    // Safety timeout: Guarantees overlay unmount even if onAnimationEnd is somehow dropped
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 1300);

    return () => clearTimeout(safetyTimer);
  }, [finishIntro, pathname]);

  // Non-homepage or already finished during current session: completely unmounted
  if (isIntroFinished || pathname !== "/") {
    return null;
  }

  return (
    <div
      id="intro-portal-container"
      onClick={finishIntro}
      onAnimationEnd={(e) => {
        // Complete intro and unmount when outermost sequence finishes
        if (e.target === e.currentTarget || e.animationName === "introOverlaySequence") {
          finishIntro();
        }
      }}
      className="intro-portal-overlay"
      aria-label="Intro Portal Reveal (click or tap to enter)"
    >
      {/* 100% Native SVG Mask Layer with Hardware-Accelerated CSS Transform Aperture */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="portal-svg-mask">
            {/* White covers entire viewport (solid cream) */}
            <rect width="1000" height="1000" fill="white" />
            {/* Black cutout creates the expanding aperture window revealing the hero */}
            <g className="intro-portal-aperture">
              <ellipse cx="0" cy="0" rx="450" ry="410" fill="black" />
            </g>
          </mask>
        </defs>

        {/* The Cream Overlay cut out by the mask */}
        <rect
          width="1000"
          height="1000"
          fill="#edece7"
          mask="url(#portal-svg-mask)"
        />
      </svg>

      {/* Centered Serif Preloader Typography (CSS-Animated) */}
      <div className="intro-typography-container absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
        <span className="font-ui font-medium text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-[#6e6d69] mb-3">
          DEVARAKONDA · TELANGANA
        </span>
        <h2 className="font-display font-light text-[52px] sm:text-[76px] md:text-[96px] uppercase tracking-[0.04em] leading-none text-[#0d0d0d]">
          Sathamma
        </h2>
        <span className="font-ui font-normal text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#6e6d69] mt-3">
          HERITAGE BY THE WATER
        </span>
      </div>
    </div>
  );
}

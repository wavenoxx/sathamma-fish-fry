"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useIntro } from "@/context/IntroContext";

export function IntroPortalReveal() {
  const pathname = usePathname();
  const { isIntroFinished, finishIntro } = useIntro();
  const svgRef = useRef<SVGSVGElement>(null);
  const portalCircleRef = useRef<SVGEllipseElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      finishIntro();
      return;
    }

    if (isIntroFinished) return;

    const ellipse = portalCircleRef.current;
    const text = textRef.current;
    const svg = svgRef.current;
    if (!ellipse || !text || !svg) return;

    // Initial state: Start cutout collapsed at bottom center (100% solid cream cover)
    gsap.set(ellipse, {
      attr: { cx: 500, cy: 1000, rx: 0, ry: 0 },
    });
    gsap.set(text, {
      opacity: 0,
      y: 12,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        finishIntro();
      },
    });
    timelineRef.current = tl;

    // Step 1: Preloader Typography (Crisp serif centered on solid cream)
    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    })
      .to(text, {
        opacity: 0,
        y: -16,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.5, // Elegant unhurried hold
      })

      // Step 2 & 3: GPU-Accelerated Portal Expansion Transition
      // SVG geometry interpolation directly in Blink/WebKit engine (ZERO string recalculations)
      .to(
        ellipse,
        {
          attr: { cy: 500, rx: 340, ry: 310 },
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.15"
      )

      // Step 4 Settle & Fade Out: Smoothly fades out the overlay, revealing the full site
      .to(
        svg,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "+=0.1"
      );

    return () => {
      tl.kill();
    };
  }, [isIntroFinished, finishIntro, pathname]);

  if (isIntroFinished || pathname !== "/") return null;

  return (
    <div
      onClick={() => {
        if (timelineRef.current) timelineRef.current.progress(1);
      }}
      className="fixed inset-0 z-[90] pointer-events-auto select-none cursor-pointer"
      aria-label="Intro Portal Reveal"
    >
      {/* 100% Native SVG Mask Layer (Butter-Smooth 120 FPS Native Geometry) */}
      <svg
        ref={svgRef}
        className="fixed inset-0 w-full h-full pointer-events-none will-change-[opacity]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="portal-svg-mask">
            {/* White covers entire viewport (renders solid cream) */}
            <rect width="1000" height="1000" fill="white" />
            {/* Black cutout creates the transparent window revealing the hero underneath */}
            <ellipse
              ref={portalCircleRef}
              cx="500"
              cy="1000"
              rx="0"
              ry="0"
              fill="black"
            />
          </mask>
        </defs>

        {/* The Cream Overlay layer cut out by the mask */}
        <rect
          width="1000"
          height="1000"
          fill="#edece7"
          mask="url(#portal-svg-mask)"
        />
      </svg>

      {/* Step 1 Typography: Minimalist Centered Serif Preloader */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
      >
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

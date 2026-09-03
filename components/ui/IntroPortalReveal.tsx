"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useIntro } from "@/context/IntroContext";

export function IntroPortalReveal() {
  const pathname = usePathname();
  const { isIntroFinished, finishIntro } = useIntro();
  const containerRef = useRef<HTMLDivElement>(null);
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

    // Accessibility: Instant finish for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    const container = containerRef.current;
    const ellipse = portalCircleRef.current;
    const text = textRef.current;
    const svg = svgRef.current;
    if (!container || !ellipse || !text || !svg) return;

    // Initial state: Cutout collapsed at bottom center (100% solid cream cover)
    gsap.set(ellipse, {
      attr: { cx: 500, cy: 1000, rx: 0, ry: 0 },
    });
    gsap.set(text, {
      opacity: 0,
      y: 10,
    });
    gsap.set(container, {
      opacity: 1,
    });

    // SIGNATURE OVERLAPPING REVEAL CHOREOGRAPHY (Total elapsed: ~1.22s)
    const tl = gsap.timeline({
      onComplete: () => {
        finishIntro();
      },
    });
    timelineRef.current = tl;

    // Phase 1: Typography resolves rapidly and elegantly (0.04s -> 0.28s)
    tl.to(
      text,
      {
        opacity: 1,
        y: 0,
        duration: 0.24,
        ease: "power2.out",
      },
      0.04
    );

    // Phase 2: Portal reveal starts expanding ALREADY at 0.20s without waiting for typography
    // Expands past viewport edges with museum architectural aperture easing
    tl.to(
      ellipse,
      {
        attr: { cy: 500, rx: 450, ry: 410 },
        duration: 0.85,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      0.20
    );

    // Phase 3: Typography dissolves cleanly while portal is actively expanding (0.32s -> 0.62s)
    tl.to(
      text,
      {
        opacity: 0,
        y: -10,
        duration: 0.30,
        ease: "power2.in",
      },
      0.32
    );

    // Phase 4: Settle & overlay fadeout (0.94s -> 1.22s)
    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.28,
        ease: "power2.out",
      },
      0.94
    );

    return () => {
      tl.kill();
    };
  }, [isIntroFinished, finishIntro, pathname]);

  if (isIntroFinished || pathname !== "/") return null;

  return (
    <div
      id="intro-portal-container"
      ref={containerRef}
      onClick={() => {
        if (timelineRef.current) timelineRef.current.progress(1);
      }}
      className="intro-portal-overlay fixed inset-0 z-[90] pointer-events-auto select-none cursor-pointer will-change-[opacity]"
      aria-label="Intro Portal Reveal (click to enter)"
    >
      {/* 100% Native SVG Mask Layer */}
      <svg
        ref={svgRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="portal-svg-mask">
            {/* White covers entire viewport (solid cream) */}
            <rect width="1000" height="1000" fill="white" />
            {/* Black cutout creates the transparent window revealing the hero */}
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

        {/* The Cream Overlay cut out by the mask */}
        <rect
          width="1000"
          height="1000"
          fill="#edece7"
          mask="url(#portal-svg-mask)"
        />
      </svg>

      {/* Centered Serif Preloader Typography */}
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

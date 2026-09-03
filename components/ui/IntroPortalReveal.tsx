"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useIntro } from "@/context/IntroContext";

export function IntroPortalReveal() {
  const { isIntroFinished, finishIntro } = useIntro();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isIntroFinished) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Start with cutout collapsed at bottom center (scale 0)
    const maskState = { y: 100, rx: 0, ry: 0 };
    overlay.style.maskImage = `radial-gradient(ellipse 0px 0px at 50% 100%, transparent 99%, black 100%)`;
    overlay.style.webkitMaskImage = `radial-gradient(ellipse 0px 0px at 50% 100%, transparent 99%, black 100%)`;

    gsap.set(textRef.current, {
      opacity: 0,
      y: 16,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        finishIntro();
      },
    });
    timelineRef.current = tl;

    // Step 1: Preloader Typography (Elegant serif centered on solid cream)
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
    })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.in",
        delay: 0.7, // Minimalist hold
      })

      // Step 2 & 3: Mask Expansion Transition ('Portal Reveal')
      // Arch cutout originates from bottom-center, expands upwards and outwards,
      // scaling until it transforms into a large perfectly centered circular window,
      // seamlessly acting as a window revealing the hero content underneath!
      .to(
        maskState,
        {
          y: 50,
          rx: 340,
          ry: 320,
          duration: 1.4,
          ease: "expo.inOut",
          onUpdate: () => {
            const val = `radial-gradient(ellipse ${maskState.rx}px ${maskState.ry}px at 50% ${maskState.y}%, transparent 99%, black 100%)`;
            overlay.style.maskImage = val;
            overlay.style.webkitMaskImage = val;
          },
        },
        "-=0.1"
      )

      // Step 4 Settle & Fade Out: Smoothly fades out the overlay, revealing the full site,
      // which triggers Header & Cursor fade-in via onComplete!
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "+=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [isIntroFinished, finishIntro]);

  if (isIntroFinished) return null;

  return (
    <div
      onClick={() => {
        if (timelineRef.current) timelineRef.current.progress(1);
      }}
      className="fixed inset-0 z-[90] pointer-events-auto select-none cursor-pointer"
      aria-label="Intro Portal Reveal"
    >
      {/* Cream Overlay with the GSAP animated Cutout Mask */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#edece7] pointer-events-none"
      />

      {/* Step 1 Typography: Minimalist Centered Serif Preloader */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
      >
        <span className="font-ui font-medium text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-[#6e6d69] mb-3">
          ESTABLISHED IN DEVARAKONDA · 1998
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

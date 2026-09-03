"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIntro } from "@/context/IntroContext";
import { useTheme } from "@/context/ThemeContext";

type CursorMode = "default" | "button" | "drag" | "view";

export function CustomCursor() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { isIntroFinished } = useIntro();
  const isCursorVisible = isIntroFinished || pathname !== "/";

  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  // Dual-tier refs: precision spark dot + trailing liquid aura ring
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop mouse/trackpad pointers
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);
    let isMoving = false;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isMoving) {
        isMoving = true;
        animFrame.current = requestAnimationFrame(render);
      }

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr === "drag") {
        setMode("drag");
      } else if (cursorAttr === "view") {
        setMode("view");
      } else if (
        cursorAttr === "button" ||
        target.closest("a, button, [role='button'], .sketched-btn-wrap, [class*='cursor-pointer']")
      ) {
        setMode("button");
      } else {
        setMode("default");
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // 120 FPS Dual-tier Physics Loop
    const render = () => {
      // 1. Dot moves with high responsiveness (lerp 0.75)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.75;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.75;

      // 2. Trailing Aura Ring moves with fluid momentum (lerp 0.16)
      const ringDx = mousePos.current.x - ringPos.current.x;
      const ringDy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += ringDx * 0.16;
      ringPos.current.y += ringDy * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Idle pause check: stop loop when at rest to save 100% CPU
      if (Math.abs(ringDx) > 0.15 || Math.abs(ringDy) > 0.15) {
        animFrame.current = requestAnimationFrame(render);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (!isVisible) return null;

  // Ring dimension and styling based on mode
  let ringClasses = "w-[28px] h-[28px] -ml-[14px] -mt-[14px] border border-[var(--text-primary)]/40 bg-transparent";
  let ringLabel = "";

  if (mode === "button") {
    ringClasses = "w-[48px] h-[48px] -ml-[24px] -mt-[24px] border border-ember/70 bg-ember/10 shadow-[0_0_20px_rgba(180,70,26,0.25)]";
  } else if (mode === "view") {
    ringClasses = "w-[88px] h-[88px] -ml-[44px] -mt-[44px] border border-[var(--text-primary)]/50 bg-[var(--card-bg)]/60 backdrop-blur-[6px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]";
    ringLabel = "INSPECT ↗";
  } else if (mode === "drag") {
    ringClasses = "w-[76px] h-[76px] -ml-[38px] -mt-[38px] border border-[var(--text-primary)]/50 bg-[var(--card-bg)]/60 backdrop-blur-[6px]";
    ringLabel = "← DRAG →";
  }

  const dotGlowColor = theme === "dark" ? "bg-[#FF7A30] shadow-[0_0_10px_#FF7A30]" : "bg-[#B4461A] shadow-[0_0_8px_rgba(180,70,26,0.5)]";

  return (
    <div
      className={`fixed top-0 left-0 z-[100] pointer-events-none will-change-transform hidden md:block transition-opacity duration-700 ease-out ${
        isCursorVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* TIER 2: Liquid Trailing Aura Ring (Fluid Momentum & Context Morphing) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`rounded-full grid place-items-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] select-none text-[var(--text-primary)] ${ringClasses}`}
        >
          {ringLabel && (
            <span className="font-ui font-medium text-[8px] tracking-[0.28em] uppercase select-none leading-none opacity-90 animate-fade-in">
              {ringLabel}
            </span>
          )}
        </div>
      </div>

      {/* TIER 1: Precision Hearth Spark Dot (Zero-Lag Center Anchor) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          className={`w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full transition-transform duration-300 select-none ${dotGlowColor} ${
            mode === "view" ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </div>
    </div>
  );
}

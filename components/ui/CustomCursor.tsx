"use client";

import React, { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "button" | "drag" | "view";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (desktop mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;

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

    // Smooth Lerp animation loop (60-120fps GPU compositor)
    const render = () => {
      pos.current.currentX += (pos.current.targetX - pos.current.currentX) * 0.2;
      pos.current.currentY += (pos.current.targetY - pos.current.currentY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.currentX}px, ${pos.current.currentY}px, 0)`;
      }

      animFrame.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (!isVisible) return null;

  // Size and label based on mode
  let size = "w-[14px] h-[14px] -ml-[7px] -mt-[7px]";
  let label = "";

  if (mode === "button") {
    size = "w-[44px] h-[44px] -ml-[22px] -mt-[22px]";
  } else if (mode === "drag") {
    size = "w-[72px] h-[72px] -ml-[36px] -mt-[36px]";
    label = "DRAG";
  } else if (mode === "view") {
    size = "w-[72px] h-[72px] -ml-[36px] -mt-[36px]";
    label = "VIEW";
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference will-change-transform hidden md:block"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        className={`rounded-full grid place-items-center overflow-hidden transition-all duration-300 ease-out bg-white text-black font-ui font-bold text-[9px] tracking-[0.22em] select-none ${size}`}
      >
        {label && <span className="leading-none select-none">{label}</span>}
      </div>
    </div>
  );
}

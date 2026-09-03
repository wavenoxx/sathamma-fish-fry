"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function AmbientGlow() {
  const { theme } = useTheme();
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ currentX: 500, currentY: 300, targetX: 500, targetY: 300 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let animId: number;
    let isMoving = false;

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        animId = requestAnimationFrame(render);
      }
    };

    const render = () => {
      const dx = pos.current.targetX - pos.current.currentX;
      const dy = pos.current.targetY - pos.current.currentY;

      pos.current.currentX += dx * 0.08;
      pos.current.currentY += dy * 0.08;

      if (glowRef.current) {
        // GPU Composited translate3d (ZERO CPU repaints!)
        glowRef.current.style.transform = `translate3d(${pos.current.currentX - 300}px, ${pos.current.currentY - 300}px, 0)`;
      }

      // Stop loop when close enough to save 100% idle CPU
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        animId = requestAnimationFrame(render);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={glowRef}
      className={`pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-[140px] will-change-transform z-0 transition-opacity duration-1000 hidden md:block ${
        theme === "dark" ? "bg-ember/10" : "bg-turmeric/10"
      }`}
      style={{
        transform: "translate3d(200px, 100px, 0)",
      }}
    />
  );
}

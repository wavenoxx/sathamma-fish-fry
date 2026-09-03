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

    const onMouseMove = (e: MouseEvent) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
    };

    let animId: number;
    const render = () => {
      pos.current.currentX += (pos.current.targetX - pos.current.currentX) * 0.08;
      pos.current.currentY += (pos.current.targetY - pos.current.currentY) * 0.08;

      if (glowRef.current) {
        const glowColor =
          theme === "dark"
            ? "rgba(180, 70, 26, 0.08)"
            : "rgba(217, 154, 43, 0.05)";

        glowRef.current.style.background = `radial-gradient(650px circle at ${pos.current.currentX}px ${pos.current.currentY}px, ${glowColor}, transparent 75%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  if (!mounted) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 hidden md:block"
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(650px circle at 50% 30%, rgba(180, 70, 26, 0.08), transparent 75%)"
            : "radial-gradient(650px circle at 50% 30%, rgba(217, 154, 43, 0.05), transparent 75%)",
      }}
    />
  );
}

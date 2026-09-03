"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface CinematicLightFrameProps {
  children: React.ReactNode;
  className?: string;
  dataCursor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function CinematicLightFrame({
  children,
  className = "",
  dataCursor,
  onClick,
  style,
}: CinematicLightFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const isSupportedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);

  useEffect(() => {
    // Only execute on devices with fine pointer and hover support, respecting reduced motion
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isSupportedRef.current = hasFinePointer && !prefersReducedMotion;
  }, []);

  const updateLight = useCallback(() => {
    if (!lightRef.current) return;

    // Smooth weighted interpolation (lerp)
    const factor = 0.075;
    currentXRef.current += (targetXRef.current - currentXRef.current) * factor;
    currentYRef.current += (targetYRef.current - currentYRef.current) * factor;

    const x = Math.round(currentXRef.current);
    const y = Math.round(currentYRef.current);

    // Warm-neutral ambient museum glass illumination field
    lightRef.current.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(255, 248, 238, 0.08) 0%, rgba(255, 242, 224, 0.025) 38%, transparent 72%)`;

    const dx = Math.abs(targetXRef.current - currentXRef.current);
    const dy = Math.abs(targetYRef.current - currentYRef.current);

    if (isHoveredRef.current || dx > 0.5 || dy > 0.5) {
      rafIdRef.current = requestAnimationFrame(updateLight);
    } else {
      rafIdRef.current = null;
    }
  }, []);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isSupportedRef.current || !containerRef.current || !lightRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const initialX = e.clientX - rect.left;
      const initialY = e.clientY - rect.top;

      targetXRef.current = initialX;
      targetYRef.current = initialY;
      currentXRef.current = initialX;
      currentYRef.current = initialY;

      isHoveredRef.current = true;
      lightRef.current.style.opacity = "1";

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateLight);
      }
    },
    [updateLight]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isSupportedRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    targetXRef.current = e.clientX - rect.left;
    targetYRef.current = e.clientY - rect.top;

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(updateLight);
    }
  }, [updateLight]);

  const handlePointerLeave = useCallback(() => {
    if (!isSupportedRef.current || !lightRef.current) return;

    isHoveredRef.current = false;
    // Dissolve smoothly over 400ms without snapping coordinates back to center
    lightRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      data-cursor={dataCursor}
      onClick={onClick}
      style={style}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Underlying photography is completely stable: scale-1, no transform */}
      {children}

      {/* Living Atmospheric Illumination Layer (zero click interception) */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      />
    </div>
  );
}

"use client";

import React from "react";

interface SketchedButtonProps {
  line1: string;
  line2?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
}

export function SketchedButton({
  line1,
  line2,
  href,
  onClick,
  target,
  rel,
  className = "",
}: SketchedButtonProps) {
  const content = (
    <div className="relative inline-flex items-center justify-center py-6 px-10 group cursor-pointer select-none">
      {/* Centered Uppercase Text with Rollover */}
      <div className="flex flex-col items-center justify-center text-center z-10">
        <div className="rollover-text">
          <span className="rollover-main font-ui text-[11px] sm:text-[12px] uppercase font-medium tracking-[0.22em]">
            {line1}
          </span>
          <span className="rollover-clone font-ui text-[11px] sm:text-[12px] uppercase font-medium tracking-[0.22em] text-ember">
            {line1}
          </span>
        </div>
        {line2 && (
          <div className="rollover-text mt-0.5">
            <span className="rollover-main font-ui text-[10px] sm:text-[11px] uppercase font-normal tracking-[0.2em] opacity-70">
              {line2}
            </span>
            <span className="rollover-clone font-ui text-[10px] sm:text-[11px] uppercase font-normal tracking-[0.2em] text-ember">
              {line2}
            </span>
          </div>
        )}
      </div>

      {/* Patrizia Garganti Exact Hand-Drawn Pencil-Loop SVG Oval */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center min-w-[220px] sm:min-w-[260px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 210.05 95.82"
          fill="none"
          className="w-full h-full scale-[1.08] sm:scale-[1.14] overflow-visible transition-transform duration-500 ease-out group-hover:scale-[1.18]"
        >
          {/* Base hand-sketched ring */}
          <path
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-40 transition-opacity duration-300 group-hover:opacity-90"
            d="M33.28,24.27a186.31,186.31,0,0,1,119-11.69c6.43,1.51,13,3.51,17.87,8,6.14,5.65,8.51,14.67,7.25,22.91-1.54,10.09-8,19-16.11,25.16s-17.81,10-27.58,12.91a198.35,198.35,0,0,1-68.8,8c-14.06-.84-28.13-3.21-41.27-8.3C13.53,77.36,3.16,70.73.58,60.21-1.34,52.35,1.69,43.9,6.87,37.69S19.15,27.18,26.35,23.5C57.08,7.78,91.87,1.34,126.37,0"
          />
          {/* Accent drawing stroke on hover */}
          <path
            stroke="var(--color-ember, #B4461A)"
            strokeWidth="1.25"
            strokeDasharray="400"
            strokeDashoffset="400"
            className="transition-all duration-700 ease-out group-hover:stroke-dashoffset-0 opacity-0 group-hover:opacity-100"
            d="M33.28,24.27a186.31,186.31,0,0,1,119-11.69c6.43,1.51,13,3.51,17.87,8,6.14,5.65,8.51,14.67,7.25,22.91-1.54,10.09-8,19-16.11,25.16s-17.81,10-27.58,12.91a198.35,198.35,0,0,1-68.8,8c-14.06-.84-28.13-3.21-41.27-8.3C13.53,77.36,3.16,70.73.58,60.21-1.34,52.35,1.69,43.9,6.87,37.69S19.15,27.18,26.35,23.5C57.08,7.78,91.87,1.34,126.37,0"
          />
        </svg>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-block bg-transparent border-0 p-0 ${className}`}
    >
      {content}
    </button>
  );
}

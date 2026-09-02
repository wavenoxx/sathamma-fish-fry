import React from "react";

interface HairlineDividerProps {
  category: string;
  subtitle?: string;
  className?: string;
}

export function HairlineDivider({
  category,
  subtitle,
  className = "",
}: HairlineDividerProps) {
  return (
    <div
      className={`relative w-full flex items-center justify-center my-12 md:my-20 ${className}`}
    >
      {/* Left Hairline */}
      <div className="flex-1 h-px bg-[var(--border-hairline)]" />

      {/* Floating Centered Category Tag */}
      <div className="px-6 md:px-10 flex flex-col items-center justify-center text-center select-none shrink-0">
        <span className="font-ui font-medium text-[9px] md:text-[10px] uppercase tracking-[0.26em] text-[var(--text-secondary)]">
          {category}
        </span>
        {subtitle && (
          <span className="font-ui font-normal text-[8px] md:text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] opacity-75 mt-0.5">
            {subtitle}
          </span>
        )}
      </div>

      {/* Right Hairline */}
      <div className="flex-1 h-px bg-[var(--border-hairline)]" />
    </div>
  );
}

import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`block font-ui text-[length:var(--text-micro,0.6875rem)] uppercase tracking-[0.18em] font-medium text-cream-dim select-none mb-6 ${className}`}
    >
      {children}
    </div>
  );
}

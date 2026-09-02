import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-cream-dim text-[length:var(--text-micro,0.75rem)] uppercase tracking-[0.14em] font-medium select-none ${className}`}
    >
      <span
        className="w-6 h-[1px] bg-ember shrink-0 inline-block"
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}

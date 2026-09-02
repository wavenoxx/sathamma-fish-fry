import React from "react";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-ui font-medium transition-colors duration-200 cursor-pointer select-none rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none min-h-[48px] min-w-[48px]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ember text-cream hover:bg-[#b04b23] border border-transparent shadow-none",
  ghost:
    "bg-transparent text-cream border border-line hover:bg-ink-soft hover:border-cream/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[12px] uppercase tracking-[0.14em] px-4 py-2",
  md: "text-[13px] uppercase tracking-[0.14em] px-6 py-3",
  lg: "text-[14px] uppercase tracking-[0.14em] px-8 py-4",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

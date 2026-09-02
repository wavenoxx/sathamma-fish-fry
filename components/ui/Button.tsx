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
  "inline-flex items-center justify-center font-medium transition-colors duration-200 cursor-pointer select-none rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none min-h-[48px] min-w-[48px]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ember text-cream hover:bg-[#b04b23] border border-transparent shadow-none",
  ghost:
    "bg-transparent text-cream border border-line hover:bg-ink-soft hover:border-cream-dim/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-small px-4 py-2 text-sm",
  md: "text-body px-6 py-3 text-base",
  lg: "text-h3 px-8 py-4 text-lg font-semibold",
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

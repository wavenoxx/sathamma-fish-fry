import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  wide?: boolean;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  wide = false,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full ${
        wide
          ? "max-w-[1360px] px-6 md:px-10 lg:px-12"
          : "max-w-[1160px] px-6 md:px-12 lg:px-16"
      } mx-auto ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

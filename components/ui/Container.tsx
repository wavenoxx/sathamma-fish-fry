import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`w-full max-w-[1280px] mx-auto px-6 md:px-10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

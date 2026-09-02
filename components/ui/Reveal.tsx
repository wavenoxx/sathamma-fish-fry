"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, fadeOnly, defaultViewport } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  variants,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const selectedVariants =
    variants || (shouldReduceMotion ? fadeOnly : fadeUp);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={selectedVariants}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

import type { Variants } from "framer-motion";

export const defaultEase = [0.22, 1, 0.36, 1] as const;

export const defaultViewport = {
  once: true,
  margin: "-60px",
} as const;

/**
 * Calm, ultra-luxury fade — pure opacity, zero vertical position shifting
 * to prevent any jitter, jumping, or shaking during kinetic scrolling.
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const stagger: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Hero entrance image — pure tranquil opacity, zero scale/zoom shift
 * to ensure the page opens completely rock-solid and calm upon entering.
 */
export const imageScale: Variants = {
  hidden: {
    opacity: 0.6,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/**
 * Reduced-motion variants fallback
 */
export const fadeOnly: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

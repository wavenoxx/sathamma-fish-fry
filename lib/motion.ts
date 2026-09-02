import type { Variants, Transition } from "framer-motion";

export const defaultEase = [0.22, 1, 0.36, 1] as const;

export const defaultViewport = {
  once: true,
  margin: "-80px",
} as const;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: defaultEase,
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

export const revealMask: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: defaultEase,
    },
  },
};

export const imageScale: Variants = {
  hidden: {
    scale: 1.08,
    opacity: 0.8,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: defaultEase,
    },
  },
};

/**
 * Reduced-motion variants fallback (disables transforms, keeps opacity only)
 */
export const fadeOnly: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

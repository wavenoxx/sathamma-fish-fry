"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface IntroContextType {
  isIntroActive: boolean;
  isIntroFinished: boolean;
  finishIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  isIntroActive: true,
  isIntroFinished: false,
  finishIntro: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro during this browser session or prefers reduced motion
    try {
      const alreadySeen = typeof sessionStorage !== "undefined" && sessionStorage.getItem("sathamma-intro-seen-v1");
      const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (alreadySeen || prefersReducedMotion) {
        setIsIntroActive(false);
        setIsIntroFinished(true);
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing restriction)
    }
  }, []);

  const finishIntro = () => {
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("sathamma-intro-seen-v1", "true");
      }
    } catch {
      // Ignore storage errors
    }
    setIsIntroActive(false);
    setIsIntroFinished(true);
  };

  return (
    <IntroContext.Provider
      value={{
        isIntroActive,
        isIntroFinished,
        finishIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}

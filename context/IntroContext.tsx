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

  const finishIntro = () => {
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

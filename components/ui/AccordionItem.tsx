"use client";

import React, { useState } from "react";

interface AccordionItemProps {
  number: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({
  number,
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full border-b border-[var(--border-hairline)] transition-colors duration-300">
      <button
        type="button"
        data-cursor="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-6 sm:py-8 flex items-baseline justify-between gap-6 text-left bg-transparent border-0 cursor-pointer select-none group focus:outline-none"
      >
        <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
          <span className="font-ui font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)] shrink-0">
            {number}
          </span>
          <h3 className="font-display font-light text-[20px] sm:text-[24px] md:text-[28px] text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
            {question}
          </h3>
        </div>

        {/* Minimalist Rotating Plus/Cross Glyph */}
        <div className="relative w-5 h-5 flex items-center justify-center shrink-0 text-[var(--text-primary)]">
          <span
            className={`block absolute w-3.5 h-[1px] bg-current transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          />
          <span
            className={`block absolute w-3.5 h-[1px] bg-current transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-90"
            }`}
          />
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-[500px] opacity-100 pb-6 sm:pb-8" : "max-h-0 opacity-0 pb-0"
        }`}
      >
        <div className="pl-8 sm:pl-12 pr-4 sm:pr-8">
          <p className="font-ui font-normal text-[13px] sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] max-w-3xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

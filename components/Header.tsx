"use client";

import React, { useEffect, useState } from "react";
import { restaurant } from "@/data/restaurant";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { label: "SPECIALITIES", href: "#specials", sub: "SIGNATURE RIVER CATCH" },
  { label: "MENU", href: "#menu", sub: "DAILY WOODFIRE HEARTH" },
  { label: "OUR STORY", href: "#about", sub: "DEVARAKONDA SINCE 1998" },
  { label: "THE ARCHIVES", href: "#gallery", sub: "PHOTOGRAPHIC MONOGRAPH" },
  { label: "THE DESTINATION", href: "#visit", sub: "VIZAG COLONY & DIRECTIONS" },
];

export function Header() {
  const { theme, toggleTheme, isMenuOpen, setIsMenuOpen } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. TOP UTILITY BAR (Patrizia Garganti Top Bar) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[32px] md:h-[36px] bg-[var(--bg-page)] border-b border-[var(--border-hairline)] px-4 sm:px-8 flex items-center justify-between font-ui text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] select-none transition-colors duration-500">
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="font-medium text-[var(--text-primary)]">
            RESERVATIONS
          </span>
          <span className="hidden sm:inline-block opacity-40">/</span>
          <span className="hidden sm:inline-block opacity-75">
            DEVARAKONDA · 16°42′ N
          </span>
        </div>

        <a
          href={`tel:${restaurant.phone}`}
          className="hover:text-[var(--text-primary)] transition-colors shrink-0 flex items-center gap-2"
        >
          <span>TEL: {restaurant.phoneDisplay}</span>
        </a>
      </div>

      {/* 2. MAIN STICKY FLORENTINE HEADER */}
      <header
        className={`fixed top-[32px] md:top-[36px] left-0 right-0 z-40 h-[64px] md:h-[72px] px-4 sm:px-8 flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-hairline)] shadow-sm"
            : "bg-transparent border-b border-[var(--border-hairline)] backdrop-blur-none"
        }`}
      >
        {/* Left: Double Hairline Hamburger + MENU */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-3 py-2 bg-transparent border-0 cursor-pointer select-none text-[var(--text-primary)] focus-visible:outline-none"
          aria-label="Open Navigation Menu"
        >
          {/* Two parallel hairline strokes */}
          <div className="flex flex-col justify-center gap-1.5 w-[24px]">
            <span className="block w-full h-[1px] bg-current transition-transform duration-300 group-hover:scale-x-110" />
            <span className="block w-[75%] h-[1px] bg-current transition-transform duration-300 group-hover:w-full" />
          </div>
          <span className="font-ui text-[11px] md:text-[12px] uppercase font-medium tracking-[0.24em] group-hover:opacity-80">
            MENU
          </span>
        </button>

        {/* Center: Monogram Crest & Hairline Bridge */}
        <a
          href="#hero"
          className="flex flex-col items-center justify-center text-center select-none group"
        >
          <div className="flex items-center gap-2">
            <span className="font-display font-light text-[22px] md:text-[26px] tracking-[0.02em] leading-none uppercase text-[var(--text-primary)]">
              Sathamma
            </span>
          </div>
          <span className="font-ui text-[8px] md:text-[9px] uppercase tracking-[0.28em] text-[var(--text-secondary)] mt-1">
            DEVARAKONDA 1998
          </span>
        </a>

        {/* Right: The Patrizia Garganti Light Switch Toggle */}
        <div className="flex items-center gap-2 select-none">
          <span className="hidden sm:inline-block font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            HEARTH
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 py-1.5 px-2.5 rounded-full border border-[var(--border-hairline)] bg-transparent hover:border-[var(--text-primary)] transition-all duration-300 cursor-pointer text-[var(--text-primary)] focus-visible:outline-none"
            aria-label="Toggle Light / Dark Ambient Hearth"
          >
            <span
              className={`font-ui text-[9px] uppercase tracking-widest transition-opacity ${
                theme === "light" ? "font-bold opacity-100" : "opacity-40"
              }`}
            >
              DAY
            </span>

            {/* Pill Track */}
            <div className="relative w-[34px] h-[18px] rounded-full bg-[var(--switch-track)] p-[2px] transition-colors duration-400">
              <div
                className={`w-[14px] h-[14px] rounded-full bg-[var(--switch-thumb)] shadow-sm transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-[16px]" : "translate-x-0"
                }`}
              />
            </div>

            <span
              className={`font-ui text-[9px] uppercase tracking-widest transition-opacity ${
                theme === "dark" ? "font-bold opacity-100" : "opacity-40"
              }`}
            >
              NIGHT
            </span>
          </button>
        </div>
      </header>

      {/* 3. FULL-SCREEN SLIDE-DOWN NAVIGATION DRAWER (Patrizia Garganti Menu) */}
      <div
        className={`menu-drawer ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16">
          {/* Drawer Top Bar */}
          <div className="w-full flex items-center justify-between pb-8 border-b border-[var(--border-hairline)]">
            <div className="flex items-center gap-3">
              <span className="font-display font-light text-[22px] uppercase">
                SATHAMMA
              </span>
              <span className="font-ui text-[9px] uppercase tracking-widest text-[var(--text-secondary)]">
                EST. 1998
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 font-ui text-[11px] uppercase tracking-[0.24em] text-[var(--text-primary)] hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0"
            >
              <span>CLOSE</span>
              <span className="text-[18px] leading-none">×</span>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav
            className="flex-1 flex flex-col justify-center py-12 space-y-8 md:space-y-10 max-w-2xl mx-auto w-full text-center"
            aria-label="Full Navigation"
          >
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group flex flex-col items-center justify-center py-2"
              >
                <div className="rollover-text">
                  <span className="rollover-main font-display font-light text-[32px] sm:text-[44px] md:text-[54px] uppercase tracking-[0.02em] text-[var(--text-primary)]">
                    {item.label}
                  </span>
                  <span className="rollover-clone font-display font-light text-[32px] sm:text-[44px] md:text-[54px] uppercase tracking-[0.02em] text-ember">
                    {item.label}
                  </span>
                </div>
                <span className="font-ui text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-[var(--text-secondary)] mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.sub}
                </span>
              </a>
            ))}
          </nav>

          {/* Drawer Bottom Coordinates & Direct Call */}
          <div className="w-full pt-8 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] select-none">
            <span>DEVARAKONDA · VIZAG COLONY · 16°42′ N</span>
            <a
              href={`tel:${restaurant.phone}`}
              className="text-[var(--text-primary)] hover:underline underline-offset-4"
            >
              DIRECT KITCHEN: {restaurant.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

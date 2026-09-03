"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { restaurant } from "@/data/restaurant";
import { useTheme } from "@/context/ThemeContext";
import { useIntro } from "@/context/IntroContext";

const navItems = [
  { label: "SPECIALITIES", href: "/#specials", sub: "SIGNATURE RIVER CATCH" },
  { label: "MENU", href: "/#menu", sub: "DAILY FRESH CATCH" },
  { label: "OUR STORY", href: "/#about", sub: "DEVARAKONDA · TELANGANA" },
  { label: "THE ARCHIVES", href: "/#gallery", sub: "PHOTOGRAPHIC MONOGRAPH" },
  { label: "THE DESTINATION", href: "/#visit", sub: "VIZAG COLONY & DIRECTIONS" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, isMenuOpen, setIsMenuOpen } = useTheme();
  const { isIntroFinished } = useIntro();
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeString, setTimeString] = useState<string>("");

  const isHeaderVisible = isIntroFinished || pathname !== "/";
  const isHomeTransparent = pathname === "/" && !isScrolled;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      {/* 1. TOP UTILITY BAR (Patrizia Garganti Top Bar with Live Local Clock) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-[32px] md:h-[36px] px-4 sm:px-8 flex items-center justify-between font-ui text-[9px] sm:text-[10px] uppercase tracking-[0.22em] select-none transition-all duration-700 ease-out ${
          isHeaderVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } ${
          isHomeTransparent
            ? "bg-transparent border-b border-white/10 text-white/80"
            : "bg-[var(--bg-page)] border-b border-[var(--border-hairline)] text-[var(--text-secondary)]"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className={`font-medium ${isHomeTransparent ? "text-white" : "text-[var(--text-primary)]"}`}>
            CALL AHEAD & ORDERS
          </span>
          <span className="hidden sm:inline-block opacity-40">/</span>
          <span className="hidden md:inline-block opacity-80 font-mono tracking-widest text-[9px]">
            {timeString ? `LOCAL TIME IST: ${timeString}` : "DEVARAKONDA · 16°42′ N"}
          </span>
          <span className="hidden sm:inline-block md:hidden opacity-75">
            16°42′ N · TELANGANA
          </span>
        </div>

        <a
          href={`tel:${restaurant.phone}`}
          data-cursor="button"
          className={`hover:opacity-80 transition-opacity shrink-0 flex items-center gap-2 ${
            isHomeTransparent ? "text-white" : "text-[var(--text-primary)]"
          }`}
        >
          <span>TEL: {restaurant.phoneDisplay}</span>
        </a>
      </div>

      {/* 2. MAIN STICKY FLORENTINE HEADER */}
      <header
        className={`fixed top-[32px] md:top-[36px] left-0 right-0 z-40 h-[64px] md:h-[72px] px-4 sm:px-8 flex items-center justify-between transition-all duration-700 ease-out ${
          isHeaderVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        } ${
          isHomeTransparent
            ? "bg-transparent border-b border-white/10 text-white"
            : "bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-hairline)] shadow-sm text-[var(--text-primary)]"
        }`}
      >
        {/* Left: Double Hairline Hamburger + MENU */}
        <div className="flex-1 flex items-center justify-start">
          <button
            type="button"
            data-cursor="button"
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-3 py-2 bg-transparent border-0 cursor-pointer select-none text-current focus-visible:outline-none"
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
        </div>

        {/* Center: Monogram Wordmark - EXACT 50% VIEWPORT HORIZONTAL MIDPOINT */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
          <Link
            href="/"
            data-cursor="button"
            className="flex items-center justify-center text-center select-none group py-1"
          >
            <span className="font-display font-light text-[18px] sm:text-[22px] md:text-[26px] tracking-[0.02em] leading-none uppercase text-current">
              Sathamma
            </span>
          </Link>
        </div>

        {/* Right: The Patrizia Garganti Light Switch Toggle */}
        <div className="flex-1 flex items-center justify-end">
          <div className="flex items-center gap-1.5 sm:gap-2 select-none">
            <span
              className={`hidden sm:inline-block font-ui text-[9px] uppercase tracking-[0.2em] ${
                isHomeTransparent ? "text-white/70" : "text-[var(--text-secondary)]"
              }`}
            >
              AMBIENCE
            </span>

            <button
              type="button"
              data-cursor="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-full border bg-transparent transition-all duration-300 cursor-pointer text-current focus-visible:outline-none ${
                isHomeTransparent
                  ? "border-white/20 hover:border-white"
                  : "border-[var(--border-hairline)] hover:border-[var(--text-primary)]"
              }`}
              aria-label="Toggle Light / Dark Theme"
            >
              <span
                className={`font-ui text-[8px] sm:text-[9px] uppercase tracking-widest transition-opacity ${
                  theme === "light" ? "font-bold opacity-100" : "opacity-40"
                }`}
              >
                DAY
              </span>

              {/* Pill Track */}
              <div className="relative w-[28px] sm:w-[34px] h-[16px] sm:h-[18px] rounded-full bg-[var(--switch-track)] p-[2px] transition-colors duration-400">
                <div
                  className={`w-[12px] sm:w-[14px] h-[12px] sm:h-[14px] rounded-full bg-[var(--switch-thumb)] shadow-sm transform transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-[12px] sm:translate-x-[16px]" : "translate-x-0"
                  }`}
                />
              </div>

              <span
                className={`font-ui text-[8px] sm:text-[9px] uppercase tracking-widest transition-opacity ${
                  theme === "dark" ? "font-bold opacity-100" : "opacity-40"
                }`}
              >
                NIGHT
              </span>
            </button>
          </div>
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
                DEVARAKONDA
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

          {/* Drawer Institutional Charter Links */}
          <div className="w-full py-4 border-t border-[var(--border-hairline)] flex items-center justify-center gap-4 sm:gap-6 font-ui text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] select-none">
            <Link
              href="/faq"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              FAQ
            </Link>
            <span className="opacity-30">/</span>
            <Link
              href="/terms"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              TERMS
            </Link>
            <span className="opacity-30">/</span>
            <Link
              href="/privacy"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              PRIVACY
            </Link>
            <span className="opacity-30">/</span>
            <Link
              href="/directory"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              DIRECTORY
            </Link>
          </div>

          {/* Drawer Bottom Coordinates & Direct Call */}
          <div className="w-full pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] select-none">
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

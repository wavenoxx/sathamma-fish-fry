"use client";

import React, { useEffect, useState } from "react";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";

const navLinks = [
  { label: "Specials", href: "#specials" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit", href: "#visit" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[76px] transform-gpu transition-[background-color,border-color,backdrop-filter] duration-400 ${
        isScrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-line/60"
          : "bg-transparent border-b border-transparent backdrop-blur-none"
      }`}
    >
      <Container wide className="h-full flex items-center justify-between">
        {/* Left: Restrained Wordmark with White Desert Spatial Coordinate Mark */}
        <a
          href="#hero"
          className="inline-flex items-baseline gap-[12px] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink py-1"
        >
          <span className="font-display font-light text-[20px] md:text-[22px] text-cream leading-none tracking-[-0.015em] group-hover:text-cream/90 transition-colors">
            Sathamma
          </span>
          <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-cream-dim leading-none">
            FISH FRY
          </span>
          <span className="hidden xl:inline-block font-ui text-[9px] tracking-[0.2em] text-cream-dim/40 pl-2 border-l border-line/40 select-none">
            16°42′ N · 78°55′ E
          </span>
        </a>

        {/* Desktop Right: Anchor Nav with ApeChain / Patrizia Garganti Rolling Hover */}
        <div className="hidden md:flex items-center gap-9">
          <nav className="flex items-center gap-[38px]" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-cream-dim hover:text-cream py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="rollover-text">
                  <span className="rollover-main">{link.label}</span>
                  <span className="rollover-clone text-cream">{link.label}</span>
                </span>
              </a>
            ))}
          </nav>

          {/* Desktop Call button with Rolling Label Micro-Interaction */}
          <a
            href={`tel:${restaurant.phone}`}
            className="rollover-btn group rounded-full px-5 py-2.5 border border-line/70 bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-300 ease-out font-ui text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink cursor-pointer"
          >
            <PhoneIcon className="w-[14px] h-[14px] text-cream shrink-0 mr-2" />
            <span className="rollover-text">
              <span className="rollover-main">Call</span>
              <span className="rollover-clone">Call</span>
            </span>
          </a>
        </div>

        {/* Mobile Right: 40px tactile circular call button */}
        <div className="flex md:hidden items-center">
          <a
            href={`tel:${restaurant.phone}`}
            aria-label={`Call ${restaurant.name}`}
            className="w-[40px] h-[40px] rounded-full bg-transparent border border-line flex items-center justify-center text-cream active:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink transition-colors shrink-0"
          >
            <PhoneIcon className="w-[16px] h-[16px] text-cream" />
          </a>
        </div>
      </Container>
    </header>
  );
}

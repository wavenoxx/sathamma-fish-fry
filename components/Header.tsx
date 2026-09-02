"use client";

import React, { useEffect, useState } from "react";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";

const navLinks = [
  { label: "Specials", href: "#specials" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[76px] transition-colors duration-300 ${
        isScrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-line shadow-none"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        {/* Left: Restrained Wordmark */}
        <a
          href="#hero"
          className="inline-flex items-baseline gap-[12px] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink py-1"
        >
          <span className="font-display font-normal text-[19px] md:text-[21px] text-cream leading-none tracking-[-0.015em]">
            Sathamma
          </span>
          <span className="font-ui font-medium text-[9px] uppercase tracking-[0.22em] text-cream-dim leading-none">
            FISH FRY
          </span>
        </a>

        {/* Desktop Right: Anchor Nav & Ghost Call CTA */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-[44px]" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-ui text-[12px] font-medium uppercase tracking-[0.16em] text-cream-dim hover:text-cream transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Call button: rounded-full ghost -> ink-soft hover (NO ember fill) */}
          <a
            href={`tel:${restaurant.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 ease-out font-ui text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink cursor-pointer"
          >
            <PhoneIcon className="w-[15px] h-[15px] text-cream shrink-0" />
            <span>Call</span>
          </a>
        </div>

        {/* Mobile Right: 40px circle, transparent bg, 1px border-line, 16px cream icon (Monochrome, Zero Ember) */}
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

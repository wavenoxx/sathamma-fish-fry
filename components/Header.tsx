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
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[72px] transition-colors duration-300 ${
        isScrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-line shadow-none"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        {/* Left: Compact Wordmark */}
        <a
          href="#hero"
          className="inline-flex items-baseline gap-[10px] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember py-1"
        >
          <span className="font-display font-normal text-[20px] md:text-[22px] text-cream leading-none group-hover:text-cream/90 transition-colors">
            Sathamma
          </span>
          <span className="font-body font-medium text-[10px] uppercase tracking-[0.2em] text-cream-dim leading-none">
            FISH FRY
          </span>
        </a>

        {/* Desktop Right: Anchor Nav & Call CTA */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-[40px]" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative group text-[13px] font-medium uppercase tracking-[0.14em] text-cream-dim hover:text-cream transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                <span>{link.label}</span>
                <span
                  className="absolute left-0 bottom-0 w-full h-[1px] bg-ember origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          {/* Desktop Call button: rounded-full ghost -> ember hover */}
          <a
            href={`tel:${restaurant.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 border border-line bg-transparent text-cream hover:bg-ember hover:border-ember transition-all duration-250 ease-out text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember cursor-pointer"
          >
            <PhoneIcon className="w-4 h-4 text-cream shrink-0" />
            <span>Call {restaurant.phoneDisplay}</span>
          </a>
        </div>

        {/* Mobile Right: 44px solid ember circle call button */}
        <div className="flex md:hidden items-center">
          <a
            href={`tel:${restaurant.phone}`}
            aria-label={`Call ${restaurant.name}`}
            className="w-[44px] h-[44px] rounded-full bg-ember flex items-center justify-center text-cream border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream active:scale-95 transition-transform shrink-0"
          >
            <PhoneIcon className="w-[18px] h-[18px] text-cream" />
          </a>
        </div>
      </Container>
    </header>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-line shadow-none"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="h-20 flex items-center justify-between">
        {/* Left: Wordmark */}
        <a
          href="#hero"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-none p-1 -m-1"
        >
          <span className="font-display text-h3 md:text-h2 font-bold tracking-tight text-cream group-hover:text-cream/90 transition-colors leading-none">
            {restaurant.name}
          </span>
          <span className="font-telugu text-[length:var(--text-micro,0.75rem)] text-cream-dim tracking-[0.14em] uppercase mt-1 leading-none">
            {restaurant.nameTelugu}
          </span>
        </a>

        {/* Desktop Right: Anchor Nav & Call CTA */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[length:var(--text-small,0.875rem)] uppercase tracking-[0.1em] text-cream-dim hover:text-cream transition-colors duration-200 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            href={`tel:${restaurant.phone}`}
            variant="primary"
            size="sm"
            className="gap-2"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>Call {restaurant.phoneDisplay}</span>
          </Button>
        </div>

        {/* Mobile Right: Single Call Button (min 48px tap target) */}
        <div className="flex md:hidden items-center">
          <a
            href={`tel:${restaurant.phone}`}
            aria-label={`Call ${restaurant.name}`}
            className="min-w-[48px] min-h-[48px] flex items-center justify-center text-cream bg-ink-soft border border-line hover:border-cream-dim/40 active:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember transition-colors"
          >
            <PhoneIcon className="w-5 h-5 text-ember" />
          </a>
        </div>
      </Container>
    </header>
  );
}

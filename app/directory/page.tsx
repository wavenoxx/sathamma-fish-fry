import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Site Directory & Architectural Index | Sathamma Fish Fry",
  description:
    "Comprehensive site directory and architectural index for Sathamma Fish Fry: menus, culinary archives, destination guides, and legal charters.",
};

const directoryGroups = [
  {
    num: "01",
    category: "THE HEARTH & CARTE",
    subtitle: "CULINARY REPERTOIRE",
    links: [
      { label: "Home Stage & Overview", href: "/" },
      { label: "Artisan Collections (Specials)", href: "/#specials" },
      { label: "Daily Woodfire Carte (Full Menu)", href: "/#menu" },
      { label: "Sathamma Special Fish Fry (Signature)", href: "/#specials" },
      { label: "Natu Style Chepala Pulusu (Clay Pot)", href: "/#specials" },
      { label: "Telangana Natu Kodi Pulusu (Country Fowl)", href: "/#specials" },
      { label: "Ragi Sankati & Steamed Rice", href: "/#menu" },
    ],
  },
  {
    num: "02",
    category: "THE ARCHIVES & HERITAGE",
    subtitle: "VISUAL MONOGRAPHS",
    links: [
      { label: "The Visual Archives (Gallery)", href: "/#gallery" },
      { label: "Monograph 01 — Fresh River Catch", href: "/#gallery" },
      { label: "Monograph 02 — Woodfire Open Hearth", href: "/#gallery" },
      { label: "Monograph 03 — Stone Mortar Spices", href: "/#gallery" },
      { label: "Monograph 04 — Simmering Clay Pots", href: "/#gallery" },
      { label: "Monograph 05 — Traditional Brass Service", href: "/#gallery" },
      { label: "Monograph 06 — Krishna Twilight Waters", href: "/#gallery" },
      { label: "Our Story & Hearth Roots Since 1998", href: "/#about" },
    ],
  },
  {
    num: "03",
    category: "THE DESTINATION",
    subtitle: "CONCIERGE & APPROACH",
    links: [
      { label: "Destination & Arrival Details", href: "/#visit" },
      { label: "Vizag Colony Boating Point Pier", href: "/#visit" },
      { label: "Hyderabad Highway Route (140 km)", href: "/#visit" },
      { label: "Operating Timings (6 AM — 10 PM)", href: "/#visit" },
      { label: "Direct Voice Kitchen Line", href: `tel:${restaurant.phone}` },
      { label: "WhatsApp Kitchen Concierge", href: `https://wa.me/${restaurant.whatsapp}` },
      { label: "Google Maps Route Coordinates", href: restaurant.mapsUrl, external: true },
    ],
  },
  {
    num: "04",
    category: "INSTITUTIONAL & LEGAL",
    subtitle: "GOVERNANCE & CHARTERS",
    links: [
      { label: "Frequently Asked Questions (FAQ)", href: "/faq" },
      { label: "Terms & Dining Conditions", href: "/terms" },
      { label: "Privacy & Cookie Policy", href: "/privacy" },
      { label: "Site Architectural Directory", href: "/directory" },
      { label: "XML Search Engine Index", href: "/sitemap.xml", external: true },
      { label: "Robots Crawler Policy", href: "/robots.txt", external: true },
    ],
  },
];

export default function DirectoryPage() {
  return (
    <main className="w-full pt-[130px] sm:pt-[150px] pb-24 md:pb-32 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      <HairlineDivider
        category="ARCHITECTURAL INDEX"
        subtitle="COMPLETE SITEMAP & DIRECTORY"
      />

      <Container>
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-ui font-medium text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)] mb-3">
            SITEMAP CATALOG
          </span>
          <h1 className="font-display font-light text-[42px] sm:text-[56px] md:text-[72px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            SITE DIRECTORY
          </h1>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[20px] text-[var(--text-secondary)] leading-[1.5] max-w-[44ch]">
            An architectural index of every room, visual monograph, culinary carte, and institutional charter.
          </p>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start w-full border-t border-[var(--border-hairline)] pt-12">
          {directoryGroups.map((group) => (
            <div
              key={group.num}
              className="flex flex-col items-start p-6 border border-[var(--border-hairline)] bg-[var(--card-bg)] rounded-[2px] transition-all duration-300 hover:border-[var(--text-primary)] w-full"
            >
              {/* Group Header */}
              <div className="w-full pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-ember">
                  {group.num} / {group.category}
                </span>
                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  INDEX
                </span>
              </div>

              {/* Links List */}
              <ul className="flex flex-col space-y-3 w-full">
                {group.links.map((link) => (
                  <li key={link.label} className="w-full">
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      data-cursor="button"
                      className="font-ui text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors block py-0.5"
                    >
                      {link.label} {link.external && <span className="opacity-50 text-[10px]">↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <SketchedButton
            line1="RETURN TO HEARTH"
            line2="SATHAMMA HOME STAGE"
            href="/"
          />

          <SketchedButton
            line1="CALL KITCHEN DIRECT"
            line2={`PHONE: ${restaurant.phoneDisplay}`}
            href={`tel:${restaurant.phone}`}
          />
        </div>
      </Container>
    </main>
  );
}

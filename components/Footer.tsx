import React from "react";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Specials", href: "#specials" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-line pt-20 md:pt-28 pb-24 md:pb-12 bg-ink text-cream">
      <Container>
        {/* THREE COLUMNS ON DESKTOP, SINGLE COLUMN ON MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start w-full min-w-0">
          {/* COLUMN 1: WORDMARK & LOCATION */}
          <div className="md:col-span-4 flex flex-col items-start">
            <a
              href="#hero"
              className="inline-flex items-baseline gap-[12px] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <span className="font-display font-normal text-[20px] text-cream leading-none tracking-[-0.015em]">
                Sathamma
              </span>
              <span className="font-ui font-medium text-[9px] uppercase tracking-[0.22em] text-cream-dim leading-none">
                FISH FRY
              </span>
            </a>
            <span className="mt-3 font-ui font-normal text-[12px] text-cream-dim">
              Devarakonda, Telangana
            </span>
          </div>

          {/* COLUMN 2: STACKED NAV ANCHORS */}
          <nav
            aria-label="Footer Navigation"
            className="md:col-span-4 flex flex-col md:items-center space-y-3"
          >
            <div className="flex flex-col space-y-3 items-start md:items-start">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-ui font-medium text-[12px] uppercase tracking-[0.16em] text-cream-dim hover:text-cream transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* COLUMN 3: CONTACT & HOURS (RIGHT-ALIGNED ON DESKTOP) */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end space-y-2 md:text-right font-ui font-normal text-[12px] text-cream-dim leading-relaxed">
            <a
              href={`tel:${restaurant.phone}`}
              className="hover:text-cream transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm"
            >
              {restaurant.phoneDisplay}
            </a>
            <p>
              {restaurant.address.line1}
              <br />
              {restaurant.address.line2}, {restaurant.address.pincode}
            </p>
            <p>6:00 AM — 10:00 PM · All days</p>
          </div>
        </div>

        {/* BOTTOM ROW: HAIRLINE & COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-line flex items-center justify-between w-full min-w-0">
          <span className="font-ui font-normal text-[11px] text-cream-dim">
            © 2026 Sathamma Fish Fry
          </span>
          <div aria-hidden="true" />
        </div>
      </Container>
    </footer>
  );
}

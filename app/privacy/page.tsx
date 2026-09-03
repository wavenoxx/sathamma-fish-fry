import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | Sathamma Fish Fry",
  description:
    "Privacy and data stewardship charter at Sathamma Fish Fry, Devarakonda. Zero tracking, no third-party ad pixels, and strict guest confidentiality.",
};

const privacySections = [
  {
    num: "SECTION 01",
    title: "Zero Tracking & No Ad Networks",
    content:
      "Sathamma Fish Fry does not deploy invasive tracking pixels (such as Meta/Facebook Pixel, TikTok trackers, or third-party ad networks). We believe in absolute respect for your digital sovereignty. We do not profile your browsing habits, sell user data, or monetize personal information.",
  },
  {
    num: "SECTION 02",
    title: "Telephone & Contact Details Privacy",
    content:
      "When you call or WhatsApp our kitchen to inquire about the daily catch or request directions, your phone number and name are used solely for answering your inquiry and confirming your order. We never share, sell, or disclose customer contact details to third-party telemarketers.",
  },
  {
    num: "SECTION 03",
    title: "Minimal Cookies & Local Storage Usage",
    content:
      "Our website uses minimal, strictly essential client-side storage (`localStorage`) exclusively to remember your preferred ambient lighting mode (DAY vs NIGHT theme). We do not use third-party marketing cookies, cross-site trackers, or persistent identifier beacons.",
  },
  {
    num: "SECTION 04",
    title: "External Navigation Links",
    content:
      "When you click 'GET DRIVING DIRECTIONS' to open Google Maps, you transition directly to Google's navigation interface. We pass no identifying information to external mapping services beyond standard geographic coordinates for Vizag Colony.",
  },
  {
    num: "SECTION 05",
    title: "Your Rights & Contacting Us",
    content:
      "If you have any questions regarding how your contact details are handled, or wish to request immediate removal of your phone number from our kitchen call logs, please call us directly at 093473 36310. We will gladly honor your request immediately.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="w-full pt-[130px] sm:pt-[150px] pb-24 md:pb-32 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      <HairlineDivider
        category="DATA STEWARDSHIP"
        subtitle="PRIVACY & COOKIES CHARTER"
      />

      <Container>
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-ui font-medium text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)] mb-3">
            DATA ETHICS
          </span>
          <h1 className="font-display font-light text-[42px] sm:text-[56px] md:text-[72px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            PRIVACY & COOKIES
          </h1>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[20px] text-[var(--text-secondary)] leading-[1.5] max-w-[44ch]">
            A simple, honest commitment: we cook fresh river fish, not harvest personal data.
          </p>
        </div>

        {/* Structured Privacy Articles */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-4xl mx-auto border-t border-[var(--border-hairline)] pt-12">
          {privacySections.map((section) => (
            <div
              key={section.num}
              className="flex flex-col items-start p-6 sm:p-8 border border-[var(--border-hairline)] bg-[var(--card-bg)] rounded-[2px] transition-all duration-300 hover:border-[var(--text-primary)]"
            >
              <div className="w-full pb-3 mb-3 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-ember">
                  {section.num}
                </span>
                <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  GUEST CONFIDENTIALITY
                </span>
              </div>

              <h2 className="font-display font-light text-[22px] sm:text-[26px] text-[var(--text-primary)] leading-tight mb-3">
                {section.title}
              </h2>

              <p className="font-ui font-normal text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <SketchedButton
            line1="RETURN TO HOME"
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

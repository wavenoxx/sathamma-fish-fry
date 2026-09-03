import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Terms & Conditions — Dining Charter | Sathamma Fish Fry",
  description:
    "Dining terms, order-to-cook principles, and catch availability guidelines at Sathamma Fish Fry, Devarakonda.",
};

const termsSections = [
  {
    num: "ARTICLE 01",
    title: "Order-to-Cook Commitment",
    content:
      "Sathamma Fish Fry operates on a freshly prepared, order-to-cook model. We do not prepare food in advance or reheat pre-cooked batches. Every dish is seasoned and cooked only after your order is placed. Guests are kindly requested to allow adequate time for their selection to be prepared.",
  },
  {
    num: "ARTICLE 02",
    title: "Seasonal Catch & Availability",
    content:
      "Because our freshwater river fish is sourced locally from the Krishna river backwaters near Nagarjuna Sagar, daily availability of specific varieties (such as Rohu, Bocha, or Korameenu) is subject to the day's catch. We will gladly share what is available when you arrive or call ahead.",
  },
  {
    num: "ARTICLE 03",
    title: "Call-Ahead Advisory",
    content:
      "We operate on a first-come, first-served basis and do not hold tables in advance. We advise guests to call ahead before travelling to confirm what fish varieties and preparations are available on that day.",
  },
  {
    num: "ARTICLE 04",
    title: "Preparation & Dining Notice",
    content:
      "Our river fish and country chicken dishes are prepared using traditional Telangana recipes. Fish is served bone-in. Spices typically include garlic, ginger, turmeric, coriander, and red chilies. Guests with specific dietary requirements are welcome to check with the kitchen before ordering.",
  },
  {
    num: "ARTICLE 05",
    title: "Pricing & Payment",
    content:
      "Prices on our menu reflect fresh river catch and country poultry. Fish prices vary depending on the day's catch. All billing is settled directly via UPI or cash.",
  },
];

export default function TermsPage() {
  return (
    <main className="w-full pt-[130px] sm:pt-[150px] pb-24 md:pb-32 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      <HairlineDivider
        category="INSTITUTIONAL CHARTER"
        subtitle="DINING CONDITIONS · DEVARAKONDA"
      />

      <Container>
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-ui font-medium text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)] mb-3">
            GUEST CHARTER
          </span>
          <h1 className="font-display font-light text-[42px] sm:text-[56px] md:text-[72px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            TERMS & CONDITIONS
          </h1>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[20px] text-[var(--text-secondary)] leading-[1.5] max-w-[44ch]">
            The order-to-cook principles and dining guidelines governing Sathamma Fish Fry.
          </p>
        </div>

        {/* Grid of Architectural Charter Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl mx-auto border-t border-[var(--border-hairline)] pt-12">
          {termsSections.map((section, idx) => (
            <div
              key={section.num}
              className={`flex flex-col items-start p-6 sm:p-8 border border-[var(--border-hairline)] bg-[var(--card-bg)] rounded-[2px] transition-all duration-300 hover:border-[var(--text-primary)] ${
                idx === termsSections.length - 1 && termsSections.length % 2 === 1
                  ? "md:col-span-2 md:max-w-xl md:mx-auto w-full"
                  : ""
              }`}
            >
              <div className="w-full pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-ember">
                  {section.num}
                </span>
                <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  DEVARAKONDA
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

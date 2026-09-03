import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Terms & Conditions — Dining Charter | Sathamma Fish Fry",
  description:
    "Dining terms, order-to-cook principles, catch availability guidelines, and environmental stewardship at Sathamma Fish Fry, Devarakonda.",
};

const termsSections = [
  {
    num: "ARTICLE 01",
    title: "Order-to-Cook Commitment",
    content:
      "Sathamma Fish Fry operates exclusively on a freshly prepared, order-to-cook model. We maintain no pre-fried batches or holding cabinets. Every guest order is freshly cut, hand-marinated in freshly ground spices, and cooked over firewood only after arrival. Guests are kindly requested to allow 15 to 25 minutes for their selection to be prepared with artisanal care.",
  },
  {
    num: "ARTICLE 02",
    title: "Seasonal Catch & Natural Sourcing",
    content:
      "Because our fish is sourced directly from the Krishna river reservoir nets each morning, daily availability of specific varieties (such as Korrameenu / Murrel, Rohu, or Catla) and specific sizes is subject to daily river conditions and water levels. We reserve the right to recommend the freshest available alternatives when a specific variety is exhausted.",
  },
  {
    num: "ARTICLE 03",
    title: "Advance Reservations & Table Holds",
    content:
      "We warmly accept call-ahead reservations to set aside preferred fish catches before guests depart from Hyderabad. Reserved selections are held for up to 45 minutes beyond the estimated arrival time. If travel delays occur, guests are encouraged to notify the kitchen directly by phone to maintain their reservation.",
  },
  {
    num: "ARTICLE 04",
    title: "Allergen & Traditional Preparation Notice",
    content:
      "All dishes are prepared using traditional Telangana village culinary methods. Freshwater fish is cut bone-in to preserve natural juices. Our house spice blends include ground dry red chilies, garlic, ginger, turmeric, coriander, and curry leaves cooked in pure vegetable oils. Guests with specific allergies must inform our kitchen team prior to ordering.",
  },
  {
    num: "ARTICLE 05",
    title: "Backwater & Ecological Stewardship",
    content:
      "Vizag Colony and the Krishna river backwaters are pristine natural habitats. We maintain a zero-litter policy and request all our guests to refrain from discarding single-use plastic bottles, packets, or debris in the water or along the boating pier. Let us preserve the sacred river that feeds our hearth.",
  },
  {
    num: "ARTICLE 06",
    title: "Pricing Transparency & Daily Rates",
    content:
      "Prices displayed on our carte reflect current market rates for fresh river fish and rural poultry. For exceptionally large whole-fish catches, prices are calculated transparently by weight and communicated clearly before preparation begins. All billing is settled directly via cash or authorized UPI QR codes.",
  },
];

export default function TermsPage() {
  return (
    <main className="w-full pt-[130px] sm:pt-[150px] pb-24 md:pb-32 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      <HairlineDivider
        category="INSTITUTIONAL CHARTER"
        subtitle="DINING CONDITIONS · EST. 1998"
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
            The artisanal standards, order-to-cook principles, and dining etiquette governing Sathamma Fish Fry.
          </p>
        </div>

        {/* 2x3 Grid of Architectural Charter Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl mx-auto border-t border-[var(--border-hairline)] pt-12">
          {termsSections.map((section) => (
            <div
              key={section.num}
              className="flex flex-col items-start p-6 sm:p-8 border border-[var(--border-hairline)] bg-[var(--card-bg)] rounded-[2px] transition-all duration-300 hover:border-[var(--text-primary)]"
            >
              <div className="w-full pb-3 mb-4 border-b border-[var(--border-hairline)] flex items-center justify-between select-none">
                <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-ember">
                  {section.num}
                </span>
                <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
                  TELANGANA HEARTH
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

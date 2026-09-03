import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { SketchedButton } from "@/components/ui/SketchedButton";
import { restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Guest Advice | Sathamma Fish Fry",
  description:
    "Everything to know before visiting Sathamma Fish Fry in Devarakonda: daily river catch sourcing, ordering, timings, and payment options.",
};

const faqs = [
  {
    number: "01",
    question: "How fresh is the fish served each day?",
    answer:
      "Our fish is freshwater river fish sourced locally from the backwaters nearby. Every selection is cooked fresh to order, with nothing prepared in advance or reheated.",
    defaultOpen: true,
  },
  {
    number: "02",
    question: "What are your operating hours?",
    answer:
      "We are open from 6:00 AM to 10:00 PM every day of the week. Calling ahead is a good idea, since what is available depends on the day's catch.",
  },
  {
    number: "03",
    question: "Why does the food take time to prepare?",
    answer:
      "Every dish is cooked fresh only after you place your order. Taking the time to cook each portion fresh ensures the best taste and texture.",
  },
  {
    number: "04",
    question: "What fish varieties do you serve?",
    answer:
      "We serve freshwater fish varieties from the local backwaters, primarily Rohu, Bocha, and Korameenu. Availability varies with the day's catch.",
  },
  {
    number: "05",
    question: "Do you serve anything other than fish?",
    answer:
      "Yes, we also serve country chicken dishes, including authentic Natu Kodi Pulusu and dry fry. All chicken preparations are cooked fresh to order.",
  },
  {
    number: "06",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major UPI applications as well as cash. We recommend carrying some cash with you when travelling.",
  },
];

export default function FaqPage() {
  return (
    <main className="w-full pt-[130px] sm:pt-[150px] pb-24 md:pb-32 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      <HairlineDivider
        category="CONCIERGE & ADVICE"
        subtitle="FREQUENT INQUIRIES · VIZAG COLONY"
      />

      <Container>
        {/* Page Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="font-ui font-medium text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)] mb-3">
            GUEST CONCIERGE
          </span>
          <h1 className="font-display font-light text-[42px] sm:text-[56px] md:text-[72px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            QUESTIONS & ADVICE
          </h1>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[20px] text-[var(--text-secondary)] leading-[1.5] max-w-[44ch]">
            Everything you need to know before visiting Vizag Colony — from our fresh catch to opening hours.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full max-w-4xl mx-auto border-t border-[var(--border-hairline)]">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.number}
              number={faq.number}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={faq.defaultOpen}
            />
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

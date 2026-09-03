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
    "Everything to know before visiting Sathamma Fish Fry in Devarakonda: daily river catch sourcing, woodfire cooking times, directions from Hyderabad, and reservations.",
};

const faqs = [
  {
    number: "01",
    question: "How fresh is the fish served each day?",
    answer:
      "All fish is sourced each dawn from local fishermen casting nets in the Krishna river reservoir at Vizag Colony. The catch is brought directly to the kitchen, cleaned with rock salt and freshly ground turmeric, and fried strictly to order. We do not use commercial cold storage, deep-freezers, or pre-fried batches.",
    defaultOpen: true,
  },
  {
    number: "02",
    question: "What are your operating hours and peak times?",
    answer:
      "We operate daily from 6:00 AM to 10:00 PM across all seven days of the week. The fresh morning catch arrives and is prepped by 7:30 AM. Peak lunch rush runs from 12:30 PM to 3:30 PM on weekends. Calling 45 to 60 minutes before your arrival is recommended so we can reserve your preferred catch.",
  },
  {
    number: "03",
    question: "Why does cooking over open woodfire take 15 to 25 minutes?",
    answer:
      "Because nothing sits waiting under warmers. When you order, fresh fish slices are hand-tossed in stone-ground ginger, garlic, coriander, and dry chili, then placed directly onto cast-iron pans over open firewood. This patient, unhurried method caramelizes the crust while keeping the freshwater meat succulent.",
  },
  {
    number: "04",
    question: "What fish varieties are available throughout the year?",
    answer:
      "Our core catch includes freshwater Korrameenu (Murrel / Snakehead), Rohu (Rohtee), Catla, and seasonal small river varieties. Catch variety and sizes vary depending on the water level and morning harvest from the backwaters.",
  },
  {
    number: "05",
    question: "Do you serve non-fish preparations?",
    answer:
      "Yes. For guests desiring country poultry, we prepare authentic Telangana Natu Kodi Pulusu (Free-Range Country Chicken Curry) and dry fry, cooked in traditional earthenware pots over firewood, served with hot rice or Ragi Sankati.",
  },
  {
    number: "06",
    question: "How do we reach Sathamma from Hyderabad?",
    answer:
      "The distance is approximately 140 km. Take the Nagarjuna Sagar Highway (NH 565) from Hyderabad through Ibrahimpatnam and Devarakonda town. Near Devarakonda, follow the scenic road toward the Vizag Colony backwaters boating point. Ample parking is available on site.",
  },
  {
    number: "07",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major UPI applications (Google Pay, PhonePe, Paytm, BHIM) as well as cash. Due to rural backwater network conditions, having UPI ready or carrying some cash is recommended.",
  },
  {
    number: "08",
    question: "Can we get parcel packing for travel back to Hyderabad?",
    answer:
      "Yes. We provide specialized thermal and leaf parcel packing designed to retain crispness and aroma for the 2.5-hour drive back to Hyderabad. Inform the kitchen staff upon arrival if you wish to carry parcels home.",
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
            Everything you need to know before traveling to Vizag Colony — from the morning river catch to woodfire wait times.
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

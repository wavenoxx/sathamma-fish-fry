"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { menuCategories, menuNote } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, fadeOnly } from "@/lib/motion";

export function Menu() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(menuCategories[0].id);

  // Active Category Observer for Desktop Sticky Column
  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 130; // 76px header + 3rem + safety margin
      const categoryElements = menuCategories.map((cat) => ({
        id: cat.id,
        el: document.getElementById(`category-${cat.id}`),
      }));

      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const item = categoryElements[i];
        if (item.el) {
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveId(item.id);
            return;
          }
        }
      }

      if (categoryElements[0]?.id) {
        setActiveId(categoryElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const childVariants = shouldReduceMotion ? fadeOnly : fadeUp;

  return (
    <section
      id="menu"
      aria-label="Menu"
      className="relative w-full section-spacing bg-ink text-cream"
    >
      <Container>
        {/* SECTION HEADER */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start"
        >
          <SectionLabel className="mb-2 md:mb-6">The Menu</SectionLabel>
          <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
            What we cook
          </h2>
          <p className="mt-3 font-display font-light text-body text-cream-dim max-w-[46ch] leading-[1.6]">
            Everything is cooked fresh to order. Nothing sits waiting.
          </p>
        </motion.div>

        {/* SECTION BODY: 1/4 STICKY NAV (LG+) + 3/4 MENU LIST */}
        <div className="spacing-block flex flex-col lg:flex-row lg:gap-16 items-start relative w-full min-w-0">
          {/* DESKTOP STICKY CATEGORY NAV (LG AND UP ONLY) */}
          <aside className="hidden lg:block lg:w-1/4 shrink-0 min-w-0 sticky top-[calc(76px+3rem)] self-start z-10">
            <nav className="flex flex-col gap-5" aria-label="Menu Category Navigation">
              {menuCategories.map((category) => {
                const isActive = activeId === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#category-${category.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(
                        `category-${category.id}`
                      );
                      if (target) {
                        const top =
                          target.getBoundingClientRect().top +
                          window.pageYOffset -
                          115;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className={`font-ui font-medium text-[12px] uppercase tracking-[0.16em] text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40 py-0.5 ${
                      isActive
                        ? "text-cream"
                        : "text-cream-dim hover:text-cream"
                    }`}
                  >
                    {category.title}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* MENU LIST (3/4 ON DESKTOP, FULL WIDTH ON MOBILE/TABLET) */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col space-y-[clamp(3.5rem,7vw,5rem)] relative z-0">
            {menuCategories.map((category) => (
              <motion.div
                key={category.id}
                id={`category-${category.id}`}
                variants={childVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="w-full min-w-0"
              >
                {/* Full-width hairline + 2.5rem space + category title in Newsreader 400 at text-h3 */}
                <div className="border-t border-line pt-10 mb-8 w-full min-w-0">
                  <h3 className="font-display font-normal text-h3 text-cream leading-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Semantic Items List */}
                <ul className="flex flex-col w-full min-w-0">
                  {category.items.map((item) => (
                    <li key={item.name} className="group py-3.5 w-full min-w-0">
                      <div className="w-full min-w-0 flex flex-wrap md:flex-nowrap items-baseline justify-between gap-x-3 gap-y-1">
                        {/* Name + Unfilled 4px Turmeric Diamond */}
                        <div className="flex items-baseline gap-2 min-w-0">
                          <span className="font-display font-normal text-body text-cream">
                            {item.name}
                          </span>
                          {item.signature && (
                            <span
                              className="text-turmeric text-[11px] select-none shrink-0"
                              aria-hidden="true"
                            >
                              ◇
                            </span>
                          )}
                        </div>

                        {/* Leader line on desktop and non-wrapping layouts */}
                        <div
                          className="hidden md:block flex-1 min-w-4 border-b border-line group-hover:border-cream/18 transition-colors duration-200 mb-[5px]"
                          aria-hidden="true"
                        />

                        {/* Price formatted with ₹ and no decimals */}
                        <div className="font-ui font-medium text-body text-cream tabular-nums shrink-0 text-right ml-auto md:ml-0">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Optional Note */}
                      {item.note && (
                        <p className="font-ui font-normal text-[12px] text-cream-dim mt-1 max-w-[38ch] leading-snug">
                          {item.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* SIGNATURE LEGEND */}
            <div className="pt-2 flex items-center gap-2 font-ui font-normal text-[11px] text-cream-dim select-none">
              <span className="text-turmeric">◇</span>
              <span>House specialities</span>
            </div>

            {/* PRICE NOTE & CONFIRMATION GHOST BUTTON */}
            <div className="pt-10 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="font-display italic font-light text-small text-cream-dim max-w-[44ch] leading-relaxed">
                {menuNote}
              </p>
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[13px] leading-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40 self-start sm:self-auto shrink-0 cursor-pointer"
              >
                Call to confirm today&apos;s rates
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

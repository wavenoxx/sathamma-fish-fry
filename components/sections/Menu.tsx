"use client";

import React, { useEffect, useState } from "react";
import { menuCategories, menuNote } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { SketchedButton } from "@/components/ui/SketchedButton";

export function Menu() {
  const [activeId, setActiveId] = useState<string>(menuCategories[0].id);

  // Active Category Observer for Desktop Sticky Column
  useEffect(() => {
    let ticking = false;

    const updateActiveCategory = () => {
      const headerOffset = 140;
      for (let i = menuCategories.length - 1; i >= 0; i--) {
        const cat = menuCategories[i];
        const el = document.getElementById(`category-${cat.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveId(cat.id);
            return;
          }
        }
      }
      if (menuCategories[0]?.id) {
        setActiveId(menuCategories[0].id);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveCategory();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveCategory();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="menu"
      aria-label="Menu"
      className="relative w-full pb-20 md:pb-32 flex flex-col items-center"
    >
      {/* Hairline Divider */}
      <HairlineDivider
        category="DAILY CARTE"
        subtitle="FRESHWATER & COUNTRY"
      />

      <Container>
        {/* Section Heading: Centered Regal Serif */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display font-light text-[38px] sm:text-[54px] md:text-[68px] uppercase tracking-[0.03em] leading-none text-[var(--text-primary)]">
            THE MENU
          </h2>
          <p className="mt-4 md:mt-6 font-display font-light text-[17px] sm:text-[19px] md:text-[21px] text-[var(--text-secondary)] leading-[1.5] max-w-[42ch]">
            Everything is prepared fresh to order. Nothing sits waiting.
          </p>
        </div>

        {/* SECTION BODY: 1/4 STICKY NAV (LG+) + 3/4 MENU LIST */}
        <div className="flex flex-col lg:flex-row lg:gap-16 items-start relative w-full min-w-0">
          {/* DESKTOP STICKY CATEGORY NAV */}
          <aside className="hidden lg:block lg:w-1/4 shrink-0 min-w-0 sticky top-[calc(76px+3rem)] self-start z-10">
            <nav className="flex flex-col gap-5 border-l border-[var(--border-hairline)] pl-5" aria-label="Menu Category Navigation">
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
                          120;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className={`font-ui text-[11px] uppercase tracking-[0.2em] text-left transition-colors duration-300 py-1 ${
                      isActive
                        ? "text-[var(--text-primary)] font-semibold border-l-2 border-ember -ml-[21px] pl-4"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {category.title}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* MENU LIST (100% Solid Text Rendering, Zero Jank) */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col space-y-12 md:space-y-16">
            {menuCategories.map((category) => (
              <div
                key={category.id}
                id={`category-${category.id}`}
                className="w-full min-w-0 border-t border-[var(--border-hairline)] pt-8"
              >
                {/* Category Title */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-hairline)] select-none">
                  <h3 className="font-display font-light text-[24px] sm:text-[28px] uppercase tracking-[0.02em] text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                  <span className="font-ui text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                    ORDER TO COOK
                  </span>
                </div>

                {/* Items List */}
                <ul className="flex flex-col w-full min-w-0 space-y-4">
                  {category.items.map((item) => (
                    <li key={item.name} className="py-2 w-full min-w-0 border-b border-[var(--border-hairline)]/50 pb-4">
                      <div className="w-full flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display font-normal text-[17px] sm:text-[19px] text-[var(--text-primary)]">
                            {item.name}
                          </span>
                          {item.signature && (
                            <span
                              className="text-turmeric text-[12px] select-none"
                              title="Signature Dish"
                            >
                              ◇
                            </span>
                          )}
                        </div>

                        {/* Leader line on desktop */}
                        <div
                          className="hidden md:block flex-1 border-b border-[var(--border-hairline)] mb-[4px]"
                          aria-hidden="true"
                        />

                        {/* Price */}
                        <div className="font-ui font-medium text-[15px] sm:text-[16px] text-[var(--text-primary)] tabular-nums shrink-0">
                          ₹{item.price}
                        </div>
                      </div>

                      {item.note && (
                        <p className="font-ui text-[12px] text-[var(--text-secondary)] mt-1.5 max-w-md leading-relaxed">
                          {item.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Note & Sketched Call Button */}
            <div className="pt-8 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="font-display italic text-[14px] sm:text-[15px] text-[var(--text-secondary)] max-w-[42ch]">
                {menuNote}
              </p>
              <SketchedButton
                line1="CONFIRM DAILY RATES"
                line2="CALL THE KITCHEN"
                href={`tel:${restaurant.phone}`}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

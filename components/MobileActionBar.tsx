"use client";

import React from "react";
import { restaurant } from "@/data/restaurant";
import { PhoneIcon, WhatsAppIcon, DirectionsIcon } from "@/components/ui/icons";

export function MobileActionBar() {
  const whatsappMessage = encodeURIComponent(
    "Hi, I'd like to know about today's fresh fish catch at Sathamma Fish Fry"
  );
  const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${whatsappMessage}`;

  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.plusCode
    )}`;

  const actions = [
    {
      label: "Call",
      ariaLabel: `Call ${restaurant.name}`,
      href: `tel:${restaurant.phone}`,
      icon: PhoneIcon,
      target: undefined,
    },
    {
      label: "WhatsApp",
      ariaLabel: `Message ${restaurant.name} on WhatsApp`,
      href: whatsappUrl,
      icon: WhatsAppIcon,
      target: "_blank",
    },
    {
      label: "Directions",
      ariaLabel: `Get directions to ${restaurant.name}`,
      href: directionsUrl,
      icon: DirectionsIcon,
      target: "_blank",
    },
  ];

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--header-bg)] backdrop-blur-md border-t border-[var(--border-hairline)] pb-[env(safe-area-inset-bottom)] transition-colors duration-500"
    >
      <div className="grid grid-cols-3 divide-x divide-[var(--border-hairline)] h-[58px]">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              target={action.target}
              rel={action.target ? "noopener noreferrer" : undefined}
              aria-label={action.ariaLabel}
              className="group h-[58px] flex flex-col items-center justify-center gap-1 text-[var(--text-primary)] active:opacity-70 transition-opacity duration-150 focus-visible:outline-none cursor-pointer"
            >
              <Icon className="w-[18px] h-[18px] text-[var(--text-primary)]" />
              <span className="font-ui text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)] leading-none">
                {action.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}

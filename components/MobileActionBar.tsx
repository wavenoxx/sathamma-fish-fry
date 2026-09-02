"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { restaurant } from "@/data/restaurant";
import { PhoneIcon, WhatsAppIcon, DirectionsIcon } from "@/components/ui/icons";
import { defaultEase } from "@/lib/motion";

export function MobileActionBar() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hi, I'd like to know about today's fish"
  );
  const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${whatsappMessage}`;

  const directionsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${restaurant.address.line1}, ${restaurant.address.line2}, ${restaurant.address.plusCode}`
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

  const variants = {
    hidden: mounted && shouldReduceMotion ? { opacity: 0 } : { y: "100%" },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: defaultEase,
      },
    },
  };

  return (
    <motion.aside
      aria-label="Quick Actions"
      initial="hidden"
      animate="visible"
      variants={variants}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ink/94 backdrop-blur-lg border-t border-line pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-3 divide-x divide-line h-[58px]">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              target={action.target}
              rel={action.target ? "noopener noreferrer" : undefined}
              aria-label={action.ariaLabel}
              className="group h-[58px] flex flex-col items-center justify-center gap-1 text-cream active:bg-ink-soft transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink cursor-pointer"
            >
              <Icon className="w-[19px] h-[19px] text-cream" />
              <span className="font-ui text-[9px] font-medium uppercase tracking-[0.14em] text-cream-dim leading-none">
                {action.label}
              </span>
            </a>
          );
        })}
      </div>
    </motion.aside>
  );
}

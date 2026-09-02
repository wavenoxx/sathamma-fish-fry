"use client";

import React, { useEffect, useState } from "react";

type OpenStatusProps = {
  className?: string;
  dotClassName?: string;
  textClassName?: string;
};

export function OpenStatus({
  className = "",
  dotClassName = "",
  textClassName = "",
}: OpenStatusProps) {
  const [openStatus, setOpenStatus] = useState<{
    isOpen: boolean;
    text: string;
  } | null>(null);

  useEffect(() => {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      const parts = formatter.formatToParts(new Date());
      const hour = parseInt(
        parts.find((p) => p.type === "hour")?.value || "0",
        10
      );
      const minute = parseInt(
        parts.find((p) => p.type === "minute")?.value || "0",
        10
      );
      const currentMinutes = hour * 60 + minute;

      // Hours: 06:00 (360m) - 22:00 (1320m)
      const isOpen = currentMinutes >= 360 && currentMinutes < 1320;
      setOpenStatus({
        isOpen,
        text: isOpen ? "Open now · Closes 10 PM" : "Closed · Opens 6 AM",
      });
    } catch {
      setOpenStatus({
        isOpen: true,
        text: "Open now · Closes 10 PM",
      });
    }
  }, []);

  if (!openStatus) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 select-none ${className}`}
      aria-label={`Restaurant status: ${openStatus.text}`}
    >
      <svg
        className={`w-[5px] h-[5px] shrink-0 ${
          openStatus.isOpen ? "text-[#6B8F71]" : "text-cream-dim/70"
        } ${dotClassName}`}
        viewBox="0 0 10 10"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="5" cy="5" r="5" />
      </svg>
      <span
        className={`font-ui font-normal text-[11px] md:text-[12px] text-cream-dim leading-none ${textClassName}`}
      >
        {openStatus.text}
      </span>
    </div>
  );
}

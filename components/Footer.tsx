import React from "react";
import Link from "next/link";
import { restaurant } from "@/data/restaurant";

export const dynamic = "force-static";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-hairline)] bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      {/* TIER 1: RESERVATIONS & DIRECT CONCIERGE BAR */}
      <div className="w-full border-b border-[var(--border-hairline)] grid grid-cols-1 md:grid-cols-12 select-none">
        {/* Col 1: RESERVATIONS LABEL */}
        <div className="md:col-span-3 py-6 px-6 sm:px-10 border-b md:border-b-0 md:border-r border-[var(--border-hairline)] flex items-center">
          <span className="font-ui font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-[var(--text-primary)]">
            RESERVATIONS & ADVICE
          </span>
        </div>

        {/* Col 2: INVITATION BANNER */}
        <div className="md:col-span-6 py-6 px-6 sm:px-10 border-b md:border-b-0 md:border-r border-[var(--border-hairline)] flex items-center justify-center text-center">
          <span className="font-display font-light text-[15px] sm:text-[17px] text-[var(--text-secondary)] uppercase tracking-[0.05em]">
            CALL BEFORE YOU TRAVEL · FRESH RIVER CATCH PRESERVED STRICTLY ON ORDER
          </span>
        </div>

        {/* Col 3: DIRECT TELEPHONE ACTION */}
        <div className="md:col-span-3 py-6 px-6 sm:px-10 flex items-center justify-start md:justify-end">
          <a
            href={`tel:${restaurant.phone}`}
            data-cursor="button"
            className="font-ui font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-ember hover:underline underline-offset-4 flex items-center gap-1.5 transition-all"
          >
            <span>CALL {restaurant.phoneDisplay}</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* TIER 2: 4-COLUMN ARCHITECTURAL ITALIAN PLAQUE GRID */}
      <div className="w-full border-b border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 select-none">
        {/* COLUMN 1: KITCHEN & CARTE */}
        <div className="py-10 px-6 sm:px-10 border-b sm:border-b-0 sm:border-r border-[var(--border-hairline)] flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
            <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              01 / KITCHEN & CARTE
            </span>
            <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
              HEARTH
            </span>
          </div>

          <div className="flex flex-col space-y-2.5 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <Link href="/#specials" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Sathamma Special Fish Fry
            </Link>
            <Link href="/#specials" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Natu Style Chepala Pulusu
            </Link>
            <Link href="/#specials" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Telangana Natu Kodi Pulusu
            </Link>
            <Link href="/#menu" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Full Woodfire Carte
            </Link>
            <Link href="/#menu" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Ragi Sankati & Steamed Rice
            </Link>
          </div>
        </div>

        {/* COLUMN 2: THE DESTINATION */}
        <div className="py-10 px-6 sm:px-10 border-b sm:border-b-0 lg:border-r border-[var(--border-hairline)] flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
            <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              02 / THE DESTINATION
            </span>
            <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
              APPROACH
            </span>
          </div>

          <div className="flex flex-col space-y-2.5 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <Link href="/#visit" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Vizag Colony Boating Point
            </Link>
            <Link href="/#visit" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
              Hyderabad Highway (140 km)
            </Link>
            <span className="text-[var(--text-primary)] font-normal">
              6:00 AM — 10:00 PM Daily
            </span>
            <span className="opacity-80">
              Open All 7 Days
            </span>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="text-ember hover:underline underline-offset-4 text-[13px] pt-1 block"
            >
              Open Google Maps ↗
            </a>
          </div>
        </div>

        {/* COLUMN 3: INSTITUTIONAL & LEGAL (DEDICATED PAGES) */}
        <div className="py-10 px-6 sm:px-10 border-b sm:border-b-0 sm:border-r border-[var(--border-hairline)] flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
            <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              03 / INSTITUTIONAL
            </span>
            <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
              CHARTERS
            </span>
          </div>

          <div className="flex flex-col space-y-2.5 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <Link
              href="/faq"
              data-cursor="button"
              className="hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-200"
            >
              FAQ & Guest Advice
            </Link>
            <Link
              href="/terms"
              data-cursor="button"
              className="hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-200"
            >
              Terms & Dining Conditions
            </Link>
            <Link
              href="/privacy"
              data-cursor="button"
              className="hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-200"
            >
              Privacy & Cookies Charter
            </Link>
            <Link
              href="/directory"
              data-cursor="button"
              className="hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-200"
            >
              Site Architectural Directory
            </Link>
            <Link
              href="/#about"
              data-cursor="button"
              className="hover:text-[var(--text-primary)] hover:translate-x-1 transition-all duration-200 text-[13px] opacity-80"
            >
              Hearth Heritage & Story Since 1998
            </Link>
          </div>
        </div>

        {/* COLUMN 4: CRAFT & HERITAGE */}
        <div className="py-10 px-6 sm:px-10 flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-hairline)]">
            <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
              04 / CRAFT & HERITAGE
            </span>
            <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
              PEDIGREE
            </span>
          </div>

          <div className="flex flex-col space-y-2.5 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <span>Woodfire Open Hearth</span>
            <span>Hand-Ground Stone Mortar</span>
            <span>Zero Reheating Guarantee</span>
            <span className="text-[var(--text-primary)] font-normal">
              4.9★ Rated on Google
            </span>
            <span className="text-[12px] opacity-75 font-ui">
              Devarakonda, Telangana 1998
            </span>
          </div>
        </div>
      </div>

      {/* TIER 3: CONCIERGE WHATSAPP DIRECT BAR */}
      <div className="w-full py-4 px-6 sm:px-10 border-b border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>KITCHEN HEARTH ACTIVE · ORDERS WELCOME</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={`https://wa.me/${restaurant.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="button"
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <span>WHATSAPP CONCIERGE</span>
            <span>↗</span>
          </a>
          <span>•</span>
          <a
            href={`tel:${restaurant.phone}`}
            data-cursor="button"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            DIRECT: {restaurant.phoneDisplay}
          </a>
        </div>
      </div>

      {/* TIER 4: COPYRIGHT, LOCATION, AND QUICK LEGAL HYPERLINKS */}
      <div className="w-full py-6 px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4 font-ui text-[9px] uppercase tracking-[0.22em] text-[var(--text-secondary)] select-none">
        <div>
          <span>© 2026 SATHAMMA FISH FRY</span>
          <span className="hidden sm:inline opacity-50"> · ALL RIGHTS RESERVED</span>
        </div>

        <div className="text-center opacity-70">
          DEVARAKONDA · 16°42′ N, 78°55′ E · TELANGANA
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[9px]">
          <Link href="/faq" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
            FAQ
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/terms" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
            TERMS
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/privacy" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
            PRIVACY
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/directory" data-cursor="button" className="hover:text-[var(--text-primary)] transition-colors">
            DIRECTORY
          </Link>
        </div>
      </div>
    </footer>
  );
}

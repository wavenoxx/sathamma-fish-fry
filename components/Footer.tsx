import React from "react";
import { restaurant } from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-hairline)] bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-500">
      {/* ROW 1: RESERVATIONS & DIRECT ENQUIRY BAR (Patrizia Garganti Row 1) */}
      <div className="w-full border-b border-[var(--border-hairline)] grid grid-cols-1 md:grid-cols-12 select-none">
        {/* Col 1: RESERVATIONS */}
        <div className="md:col-span-3 py-6 px-6 sm:px-10 border-b md:border-b-0 md:border-r border-[var(--border-hairline)] flex items-center">
          <span className="font-ui font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-[var(--text-primary)]">
            RESERVATIONS
          </span>
        </div>

        {/* Col 2: PROMPT / INVITATION */}
        <div className="md:col-span-6 py-6 px-6 sm:px-10 border-b md:border-b-0 md:border-r border-[var(--border-hairline)] flex items-center justify-center text-center">
          <span className="font-display font-light text-[15px] sm:text-[17px] text-[var(--text-secondary)] uppercase tracking-[0.05em]">
            CALL BEFORE YOU DRIVE · ENSURE FRESH CATCH
          </span>
        </div>

        {/* Col 3: DIRECT ACTION */}
        <div className="md:col-span-3 py-6 px-6 sm:px-10 flex items-center justify-start md:justify-end">
          <a
            href={`tel:${restaurant.phone}`}
            className="font-ui font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.24em] text-ember hover:underline underline-offset-4"
          >
            CALL {restaurant.phoneDisplay} →
          </a>
        </div>
      </div>

      {/* ROW 2: 4-COLUMN ARCHITECTURAL GRID (Patrizia Garganti 4-Column Grid) */}
      <div className="w-full border-b border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 select-none">
        {/* COLUMN 1: KITCHEN */}
        <div className="py-10 px-6 sm:px-10 border-b sm:border-b-0 sm:border-r border-[var(--border-hairline)] flex flex-col space-y-4">
          <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] pb-2 border-b border-[var(--border-hairline)]">
            KITCHEN
          </span>
          <div className="flex flex-col space-y-2 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <a href="#specials" className="hover:text-[var(--text-primary)] transition-colors">
              Sathamma Special Fish Fry
            </a>
            <a href="#specials" className="hover:text-[var(--text-primary)] transition-colors">
              Natu Style Fish Curry
            </a>
            <a href="#specials" className="hover:text-[var(--text-primary)] transition-colors">
              Chepala Pulusu
            </a>
            <a href="#specials" className="hover:text-[var(--text-primary)] transition-colors">
              Natu Kodi Pulusu
            </a>
          </div>
        </div>

        {/* COLUMN 2: CRAFT */}
        <div className="py-10 px-6 sm:px-10 border-b sm:border-b-0 lg:border-r border-[var(--border-hairline)] flex flex-col space-y-4">
          <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] pb-2 border-b border-[var(--border-hairline)]">
            CRAFT
          </span>
          <div className="flex flex-col space-y-2 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <span>Woodfire Open Hearth</span>
            <span>Hand-Ground Stone Mortar</span>
            <span>Zero Reheated Food</span>
            <span>Strictly Cooked to Order</span>
          </div>
        </div>

        {/* COLUMN 3: COORDINATES */}
        <div className="py-10 px-6 sm:px-10 border-b sm:border-b-0 sm:border-r border-[var(--border-hairline)] flex flex-col space-y-4">
          <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] pb-2 border-b border-[var(--border-hairline)]">
            COORDINATES
          </span>
          <div className="flex flex-col space-y-2 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <span>16°42′ N, 78°55′ E</span>
            <span>Vizag Colony Boating Point</span>
            <span>Devarakonda, Telangana</span>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember hover:underline underline-offset-4 text-[13px] pt-1"
            >
              Open Google Maps →
            </a>
          </div>
        </div>

        {/* COLUMN 4: HOURS & PEDIGREE */}
        <div className="py-10 px-6 sm:px-10 flex flex-col space-y-4">
          <span className="font-ui font-medium text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] pb-2 border-b border-[var(--border-hairline)]">
            HOURS & SERVICE
          </span>
          <div className="flex flex-col space-y-2 font-display font-light text-[15px] text-[var(--text-secondary)]">
            <span>6:00 AM — 10:00 PM</span>
            <span>All 7 Days of the Week</span>
            <span>Fresh Catch Daily Morning</span>
            <span>Google Rating: 4.9 Stars</span>
          </div>
        </div>
      </div>

      {/* ROW 3: COPYRIGHT & ARTISANAL PEDIGREE (Patrizia Garganti Row 3) */}
      <div className="w-full py-6 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] select-none">
        <span>© 2026 SATHAMMA FISH FRY</span>
        <span className="opacity-70">ESTABLISHED IN DEVARAKONDA · TELANGANA 1998</span>
        <span>HERITAGE BY THE WATER</span>
      </div>
    </footer>
  );
}

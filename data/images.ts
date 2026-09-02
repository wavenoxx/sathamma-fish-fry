export type ImageSlot = {
  id: string;
  file: string; // path under /public/images/
  aspect: string; // CSS aspect-ratio value, e.g. "4 / 5"
  intent: string; // what the photo must show — used later for prompting
  priority?: boolean; // true only for above-the-fold images
};

export const imageSlots: Record<string, ImageSlot> = {
  // HERO (already shipped, registered for completeness)
  "hero-desktop": {
    id: "hero-desktop",
    file: "/images/hero-desktop.jpg",
    aspect: "16 / 9",
    intent: "Hero desktop view, 16:9 landscape with empty dark left area",
    priority: true,
  },
  "hero-mobile": {
    id: "hero-mobile",
    file: "/images/hero-mobile.jpg",
    aspect: "9 / 16",
    intent: "Hero mobile view, 9:16 portrait with empty dark upper area",
    priority: true,
  },

  // SPECIALS (Step 4)
  "special-1": {
    id: "special-1",
    file: "/images/special-fish-fry.jpg",
    aspect: "4 / 5",
    intent: "Sathamma Special Fish Fry, close, hero-lit",
  },
  "special-2": {
    id: "special-2",
    file: "/images/special-fish-curry.jpg",
    aspect: "4 / 5",
    intent: "Natu Style Fish Curry in a dark clay vessel",
  },
  "special-3": {
    id: "special-3",
    file: "/images/special-pulusu.jpg",
    aspect: "4 / 5",
    intent: "Chepala Pulusu, tamarind base, steam",
  },
  "special-4": {
    id: "special-4",
    file: "/images/special-natu-kodi.jpg",
    aspect: "4 / 5",
    intent: "Natu Kodi Pulusu, country chicken",
  },

  // ABOUT (Step 4)
  "about-portrait": {
    id: "about-portrait",
    file: "/images/about-kitchen.jpg",
    aspect: "3 / 4",
    intent: "The kitchen, warm and quiet, no people",
  },
  "about-wide": {
    id: "about-wide",
    file: "/images/about-river.jpg",
    aspect: "3 / 2",
    intent: "The riverside setting at dusk",
  },

  // GALLERY (Step 5) - Alternating aspects: 4/5, 3/4, 4/5, 3/4, 4/5, 3/4
  "gallery-1": {
    id: "gallery-1",
    file: "/images/gallery-1.jpg",
    aspect: "4 / 5",
    intent: "A plate of fresh fish fry with lime and onion",
  },
  "gallery-2": {
    id: "gallery-2",
    file: "/images/gallery-2.jpg",
    aspect: "3 / 4",
    intent: "Woodfire cooking hearth and bubbling curry",
  },
  "gallery-3": {
    id: "gallery-3",
    file: "/images/gallery-3.jpg",
    aspect: "4 / 5",
    intent: "Traditional spice preparation on stone mortar",
  },
  "gallery-4": {
    id: "gallery-4",
    file: "/images/gallery-4.jpg",
    aspect: "3 / 4",
    intent: "Clay pots simmering beside the open kitchen",
  },
  "gallery-5": {
    id: "gallery-5",
    file: "/images/gallery-5.jpg",
    aspect: "4 / 5",
    intent: "Steaming fish pulusu served hot on brass plate",
  },
  "gallery-6": {
    id: "gallery-6",
    file: "/images/gallery-6.jpg",
    aspect: "3 / 4",
    intent: "Quiet riverbank landscape at twilight",
  },

  // VISIT (Step 5)
  "visit-exterior": {
    id: "visit-exterior",
    file: "/images/visit-exterior.jpg",
    aspect: "16 / 9",
    intent: "The approach to the place, daylight",
  },

  // OPEN GRAPH SHARE CARD (Step 6)
  "og-share": {
    id: "og-share",
    file: "/images/og.jpg",
    aspect: "1200 / 630",
    intent:
      "Wide hero-style fish fry shot with room at the left for nothing — this is a share card, no text overlay.",
  },
};

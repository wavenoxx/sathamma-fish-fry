export type ImageSlot = {
  id: string;
  file: string; // path under /public/images/
  aspect: string; // CSS aspect-ratio value, e.g. "4 / 5", "21 / 9", "16 / 10"
  intent: string; // what the photo must show — composition, framing, negative space
  priority?: boolean; // true only for above-the-fold images
};

export const imageSlots: Record<string, ImageSlot> = {
  // HERO (Above the fold, full viewport hero background)
  "hero-desktop": {
    id: "hero-desktop",
    file: "/images/hero-desktop.png",
    aspect: "16 / 9",
    intent:
      "16:9 cinematic landscape. The plate of fresh golden-brown river fish fry sits in the lower right third of the frame, surrounded by deep, moody, textured black negative space on the left and upper areas with faint rising steam.",
    priority: true,
  },
  "hero-mobile": {
    id: "hero-mobile",
    file: "/images/hero-mobile.png",
    aspect: "9 / 16",
    intent:
      "9:16 vertical portrait. Fresh seasoned fried fish steaks rest in the lower half of the composition, while the upper half remains dark and clean to give room for header typography and floating ember particles.",
    priority: true,
  },

  // SPECIALS
  "special-1": {
    id: "special-1",
    file: "/images/01-special-fish-fry.png",
    aspect: "21 / 9",
    intent:
      "Ultra-wide 21:9 cinematic panorama. Thick-cut river fish fry seasoned with local spices sits centered in the frame within the middle 16:9 safe zone, while the outer horizontal margins remain deep, textured, and dark for seamless 16:9 mobile crop.",
    priority: true,
  },
  "special-2": {
    id: "special-2",
    file: "/images/02-special-fish-curry.png",
    aspect: "4 / 5",
    intent:
      "Tall 4:5 portrait frame. A shallow dark vessel of fresh fish curry in rich tamarind gravy. The pot occupies the lower two-thirds of the frame against dark slate, with aromatic steam rising into negative space above.",
    priority: true,
  },
  "special-3": {
    id: "special-3",
    file: "/images/04-special-pulusu-wide.png",
    aspect: "16 / 11",
    intent:
      "Desktop 16:11 landscape frame. Traditional Chepala Pulusu in artisanal serving ware positioned in the right two-thirds of the frame, with moody dark surface and soft shadows filling the left.",
  },
  "special-3-portrait": {
    id: "special-3-portrait",
    file: "/images/03-special-pulusu-portrait.png",
    aspect: "4 / 5",
    intent:
      "Mobile-directed 4:5 portrait frame. Traditional Chepala Pulusu with tender river fish steaks submerged in tangy tamarind broth, shot top-down at a slight angle with gentle overhead rim lighting and dark margins.",
  },
  "special-3-wide": {
    id: "special-3-wide",
    file: "/images/04-special-pulusu-wide.png",
    aspect: "16 / 11",
    intent:
      "Desktop-directed 16:11 landscape frame. Traditional Chepala Pulusu in artisanal serving ware positioned in the right two-thirds of the frame, with moody dark surface and soft shadows filling the left.",
  },
  "special-4": {
    id: "special-4",
    file: "/images/05-special-natu-kodi.png",
    aspect: "21 / 9",
    intent:
      "Ultra-wide 21:9 cinematic panorama. Traditional village bone-in Natu Kodi country chicken curry centered within the middle 16:9 safe zone, flanked by dark textured negative space on both sides for mobile cropping.",
  },

  // ABOUT
  "about-portrait": {
    id: "about-portrait",
    file: "/images/06-about-kitchen.png",
    aspect: "4 / 5",
    intent:
      "Tall 4:5 framed architectural portrait. The quiet preparation table of the artisanal kitchen, raw spices and fresh ingredients neatly arranged in warm, unhurried light with no people in the frame.",
  },
  "about-wide": {
    id: "about-wide",
    file: "/images/07-about-river.png",
    aspect: "21 / 9",
    intent:
      "Ultra-wide 21:9 panoramic landscape. The tranquil waters of the Krishna river backwaters near Vizag Colony at twilight. The shoreline occupies the lower third, with twilight sky and calm reflective water stretching across, centered for 16:9 mobile crop.",
  },

  // GALLERY
  "gallery-1": {
    id: "gallery-1",
    file: "/images/08-gallery-river-catch.png",
    aspect: "16 / 10",
    intent:
      "Wide 16:10 exhibition format. Freshly caught river fish resting on a damp, dark wooden surface before seasoning, accompanied by fresh green chillies and halved local lime.",
  },
  "gallery-2": {
    id: "gallery-2",
    file: "/images/09-gallery-kitchen-fire.png",
    aspect: "4 / 5",
    intent:
      "Tall 4:5 vertical monograph window. The kitchen cooking fire in soft ambient focus with a hot skillet simmering fresh fish, embers glowing softly against deep shadows.",
  },
  "gallery-3": {
    id: "gallery-3",
    file: "/images/10-gallery-spice-blend.png",
    aspect: "4 / 5",
    intent:
      "Tall 4:5 monograph frame. Vibrant red chili powder, crushed coriander, turmeric, and local aromatics arranged on a dark surface in close tactile focus.",
  },
  "gallery-4": {
    id: "gallery-4",
    file: "/images/11-gallery-simmering-curry.png",
    aspect: "4 / 5",
    intent:
      "Tall 4:5 vertical monograph frame. Fragrant fish curry gently simmering, red oil glistening on the surface of the tangy tamarind gravy, steam drifting upward into darkness.",
  },
  "gallery-5": {
    id: "gallery-5",
    file: "/images/12-gallery-table-service.png",
    aspect: "4 / 5",
    intent:
      "Tall 4:5 vertical monograph frame. Steaming hot fish fry and pulusu served on a traditional brass plate alongside fresh onion rings and lime wedge.",
  },
  "gallery-6": {
    id: "gallery-6",
    file: "/images/13-gallery-twilight-waters.png",
    aspect: "21 / 9",
    intent:
      "Grand 21:9 panoramic monolith. Sunset over the Krishna river backwaters near the Vizag Colony boat docking point. Serene water, silhouetted country boats, and warm amber twilight centered for 16:9 mobile crop.",
  },

  // OPEN GRAPH SHARE CARD
  "og-share": {
    id: "og-share",
    file: "/images/og.jpg",
    aspect: "1200 / 630",
    intent:
      "1200x630 social card. Golden-brown seasoned fish fry positioned in the right half of the frame with deep dark negative space on the left suitable for preview cards without text.",
  },
};

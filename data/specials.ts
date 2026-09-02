export type Special = {
  id: string;
  name: string;
  imageSlotId: string;
  description: string; // one sentence, max ~90 chars
  price: number;
};

export const specials: Special[] = [
  {
    id: "sathamma-special",
    name: "Sathamma Special Fish Fry",
    imageSlotId: "special-1",
    description: "Cut thick, rubbed in our own masala, fried only when you order it.",
    price: 150,
  },
  {
    id: "natu-fish-curry",
    name: "Natu Style Fish Curry",
    imageSlotId: "special-2",
    description: "The everyday curry of this house, made the way it has always been made.",
    price: 130,
  },
  {
    id: "chepala-pulusu",
    name: "Chepala Pulusu",
    imageSlotId: "special-3",
    description: "Tamarind, slow heat, and time. Nothing else to it.",
    price: 140,
  },
  {
    id: "natu-kodi",
    name: "Natu Kodi Pulusu",
    imageSlotId: "special-4",
    description: "Country chicken, cooked long enough that it needs no introduction.",
    price: 220,
  },
];

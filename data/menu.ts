export type MenuItem = {
  name: string;
  price: number;
  note?: string;
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "fish-fry",
    title: "Fish Fry",
    items: [
      {
        name: "Sathamma Special Fish Fry",
        price: 150,
        signature: true,
        note: "Our house masala, fried to order",
      },
      {
        name: "Rohu Fish Fry",
        price: 120,
      },
      {
        name: "Bocha Fish Fry",
        price: 130,
      },
      {
        name: "Fish Tawa Fry",
        price: 160,
      },
      {
        name: "Korameenu Fry",
        price: 260,
        note: "Seasonal, subject to the day's catch",
      },
    ],
  },
  {
    id: "fish-curry",
    title: "Fish Curry & Pulusu",
    items: [
      {
        name: "Natu Style Fish Curry",
        price: 130,
        signature: true,
      },
      {
        name: "Chepala Pulusu",
        price: 140,
        note: "Slow-cooked, tamarind base",
      },
      {
        name: "Fish Iguru",
        price: 150,
      },
      {
        name: "Korameenu Curry",
        price: 280,
        note: "Seasonal",
      },
    ],
  },
  {
    id: "fish-specials",
    title: "Fish Specials",
    items: [
      {
        name: "Chepala Pachadi",
        price: 110,
      },
      {
        name: "Fish 65",
        price: 150,
      },
      {
        name: "Fish Vepudu",
        price: 150,
      },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    items: [
      {
        name: "Chicken Fry",
        price: 140,
      },
      {
        name: "Chicken Curry",
        price: 130,
      },
      {
        name: "Chicken 65",
        price: 140,
      },
      {
        name: "Natu Kodi Pulusu",
        price: 220,
        signature: true,
        note: "Country chicken, cooked slow",
      },
    ],
  },
  {
    id: "rice-breads",
    title: "Rice & Breads",
    items: [
      {
        name: "Fish Biryani",
        price: 180,
      },
      {
        name: "Chicken Biryani",
        price: 150,
      },
      {
        name: "Bagara Rice",
        price: 70,
        note: "Fragrant, served with any curry",
      },
      {
        name: "Ghee Rice",
        price: 60,
      },
      {
        name: "Plain Rice",
        price: 40,
      },
      {
        name: "Ragi Sangati",
        price: 50,
      },
      {
        name: "Chapathi",
        price: 15,
        note: "Per piece",
      },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      {
        name: "Onion Salad",
        price: 20,
      },
    ],
  },
];

export const menuNote =
  "Fish prices vary with the day's catch. Please call to confirm.";

export type Review = {
  id: string;
  name: string; // first name only
  text: string; // the review, trimmed to ~200 chars max
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Bharath",
    text: `TODO: Sathamma Fish Fry is a must-visit spot for anyone who loves fresh and authentic fish. The taste is amazing, with perfectly cooked fish that feels truly fresh and full of flavor.

The best part is the local style of cooking — simple, spicy, and very satisfying. You can really feel the homemade touch in every bite.

The place has a nice, natural vibe near the water, which makes the whole experience even better. It’s not fancy, but that’s exactly what makes it special and real.

Highly recommended for fish lovers who want to enjoy fresh, tasty food in a peaceful setting.`,
  },
  {
    id: "r2",
    name: "Anil",
    text: "TODO: Good place to visit...the people are very polite to talk with anyone....the food was awesome...never forgot to visit the place. Great experience I had at this place. The Shop name was sathamma general store.. providing a great service to the customer.. the preparation was good and explaining about the process was nice... Overall the food was very tasty",
  },
  {
    id: "r3",
    name: "Vinay",
    text: "TODO: Visit this shop for nice dining and take out from here fresh fishes were there . Very pleasant people receiving with friendly nature.",
  },
  {
    id: "r4",
    name: "Nani",
    text: "TODO: Very much enjoyed the food and atmosphere here . Especially fish dishes are very good at taste must try.",
  },
];

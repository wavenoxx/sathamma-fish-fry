import React from "react";
import { restaurant, SITE_URL } from "@/data/restaurant";
import { menuCategories } from "@/data/menu";

export function StructuredData() {
  const hasCoords =
    Boolean(
      restaurant.coords &&
        (restaurant.coords.lat !== 0 || restaurant.coords.lng !== 0)
    );

  const hasGoogleProfile = Boolean(restaurant.googleProfileUrl);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    url: SITE_URL,
    name: restaurant.name,
    ...(restaurant.nameTelugu ? { alternateName: restaurant.nameTelugu } : {}),
    description:
      "Family kitchen beside the Krishna river backwaters in Devarakonda, serving fresh catch prepared and fried to order.",
    telephone: restaurant.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${restaurant.address.line1}, ${restaurant.address.line2}`,
      addressLocality: "Devarakonda",
      addressRegion: restaurant.address.state,
      postalCode: restaurant.address.pincode,
      addressCountry: "IN",
    },
    ...(hasCoords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: restaurant.coords.lat,
            longitude: restaurant.coords.lng,
          },
        }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "22:00",
      },
    ],
    servesCuisine: ["South Indian", "Telugu", "Seafood"],
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
    },
    ...(hasGoogleProfile ? { sameAs: [restaurant.googleProfileUrl] } : {}),
    hasMenu: {
      "@type": "Menu",
      name: `${restaurant.name} Menu`,
      hasMenuSection: menuCategories.map((category) => ({
        "@type": "MenuSection",
        name: category.title,
        hasMenuItem: category.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.note ? { description: item.note } : {}),
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "INR",
          },
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

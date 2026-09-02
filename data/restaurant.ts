export const restaurant = {
  name: "Sathamma Fish Fry",
  nameTelugu: "సతమ్మ ఫిష్ ఫ్రై",
  tagline: "Fresh river fish, cooked the way it always has been",
  phone: "+919347336310",
  phoneDisplay: "093473 36310",
  whatsapp: "919347336310",
  rating: 4.9,
  address: {
    line1: "Near Vizag Colony Boating and Fishing",
    line2: "Devarakonda, Nalgonda District",
    state: "Telangana",
    pincode: "508248",
    plusCode: "H476+38 Bachapoor",
  },
  hours: {
    open: "06:00",
    close: "22:00",
    days: "All days",
  },
  mapsUrl: "https://maps.app.goo.gl/U7KC7MN64waQrwx87",
  plusCode: "H476+38 Bachapoor",
  googleProfileUrl: "https://maps.app.goo.gl/U7KC7MN64waQrwx87",
  coords: {
    lat: 16.5626373,
    lng: 79.1108342,
  } as { lat: number; lng: number },
} as const;

export type Restaurant = typeof restaurant;

// TODO: Replace with live production domain when configured
export const SITE_URL = "https://sathammafishfry.com";

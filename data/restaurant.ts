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
  mapsUrl: "", // TODO: https://maps.app.goo.gl/JVUzCwp9rxsBR79X8
  plusCode: "H476+38 Bachapoor",
  googleProfileUrl: "https://maps.app.goo.gl/WZviYyWhJoZZwReu8",
  coords: {
    lat: 0,
    lng: 0,
  }, // TODO
} as const;

export type Restaurant = typeof restaurant;

// TODO: Replace with live production domain when configured
export const SITE_URL = "https://sathammafishfry.com";

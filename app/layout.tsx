import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { restaurant } from "@/data/restaurant";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: `${restaurant.name} | Fresh River Fish in Devarakonda`,
  description: `${restaurant.tagline}. Located near Vizag Colony Boating and Fishing, Devarakonda, Telangana.`,
  keywords: [
    "Sathamma Fish Fry",
    "Devarakonda fish fry",
    "Telangana river fish",
    "Vizag colony fish",
    "Bachapoor restaurant",
  ],
  authors: [{ name: restaurant.name }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#14100D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-ink text-cream antialiased selection:bg-ember selection:text-cream flex flex-col font-sans">
        {/* Subtle SVG Grain Overlay */}
        <NoiseOverlay />

        {/* Global Fixed Header */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Mobile Action Bar (Fixed Bottom, md:hidden) */}
        <MobileActionBar />
      </body>
    </html>
  );
}

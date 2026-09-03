import type { Metadata, Viewport } from "next";
import { Newsreader, Geist } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { StructuredData } from "@/components/StructuredData";
import { SITE_URL } from "@/data/restaurant";
import { ThemeProvider } from "@/context/ThemeContext";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "block",
  preload: true,
  axes: ["opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "block",
  preload: true,
});

const siteDescription =
  "Family kitchen beside the Krishna river backwaters in Devarakonda, serving fresh catch prepared and fried to order.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sathamma Fish Fry — Fresh River Fish in Devarakonda",
    template: "%s · Sathamma Fish Fry",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Sathamma Fish Fry",
    title: "Sathamma Fish Fry — Fresh River Fish in Devarakonda",
    description: siteDescription,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sathamma Fish Fry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathamma Fish Fry — Fresh River Fish in Devarakonda",
    description: siteDescription,
    images: ["/images/og.jpg"],
  },
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
      className={`${newsreader.variable} ${geist.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased flex flex-col font-serif">
        <ThemeProvider>
          {/* Patrizia Garganti Inverting Dynamic Cursor */}
          <CustomCursor />

          {/* Living Ambient Hearth Illumination */}
          <AmbientGlow />

          {/* Skip to Content accessible navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-cream focus:border focus:border-line focus:rounded-full focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 font-ui text-[13px] font-medium"
          >
            Skip to content
          </a>

          {/* JSON-LD Structured Data */}
          <StructuredData />

          {/* Subtle SVG Grain Overlay */}
          <NoiseOverlay />

          {/* Global Florentine Fixed Header */}
          <Header />

          {/* Main Content */}
          <div className="flex-1 flex flex-col relative z-10" id="main-content">
            {children}
          </div>

          {/* Mobile Action Bar */}
          <MobileActionBar />
        </ThemeProvider>
      </body>
    </html>
  );
}

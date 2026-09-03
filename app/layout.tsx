import type { Metadata, Viewport } from "next";
import { Newsreader, Geist } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { StructuredData } from "@/components/StructuredData";
import { SITE_URL } from "@/data/restaurant";
import { ThemeProvider } from "@/context/ThemeContext";
import { IntroProvider } from "@/context/IntroContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { IntroPortalReveal } from "@/components/ui/IntroPortalReveal";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sathamma Fish Fry | Authentic Woodfire River Fish in Devarakonda",
  description:
    "Authentic woodfire river fish fry and curry in Devarakonda, Telangana since 1998. Fresh catch from Krishna river backwaters at Vizag Colony.",
  keywords: [
    "Sathamma Fish Fry",
    "Devarakonda fish fry",
    "Vizag Colony boating point food",
    "Telangana river fish fry",
    "authentic woodfire fish fry",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sathamma Fish Fry | Authentic Woodfire River Fish in Devarakonda",
    description:
      "Authentic woodfire river fish fry and curry in Devarakonda, Telangana since 1998. Fresh catch from Krishna river backwaters.",
    url: SITE_URL,
    siteName: "Sathamma Fish Fry",
    images: [
      {
        url: "/images/hero-desktop.png",
        width: 1200,
        height: 630,
        alt: "Sathamma Fish Fry Woodfire Preparation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathamma Fish Fry | Authentic Woodfire River Fish in Devarakonda",
    description:
      "Authentic woodfire river fish fry and curry in Devarakonda, Telangana since 1998.",
    images: ["/images/hero-desktop.png"],
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined") {
                if ("serviceWorker" in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var i = 0; i < regs.length; i++) {
                      regs[i].unregister();
                    }
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased flex flex-col font-serif">
        <ThemeProvider>
          <IntroProvider>
            <SmoothScrollProvider>
              {/* Step 1 to 4 GSAP Portal Reveal */}
              <IntroPortalReveal />

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
            </SmoothScrollProvider>
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

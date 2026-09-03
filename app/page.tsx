import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Specials } from "@/components/sections/Specials";
import { Menu } from "@/components/sections/Menu";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Visit } from "@/components/sections/Visit";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
      <h1 className="sr-only">Sathamma Fish Fry — Fresh River Fish in Devarakonda</h1>
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. SPECIALS SECTION */}
      <Specials />

      {/* 3. MENU SECTION */}
      <Menu />

      {/* 4. ABOUT SECTION */}
      <About />

      {/* 5. GALLERY SECTION */}
      <Gallery />

      {/* 6. VISIT SECTION */}
      <Visit />

      {/* 7. FOOTER */}
      <Footer />
    </main>
  );
}

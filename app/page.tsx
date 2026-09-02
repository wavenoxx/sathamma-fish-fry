import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { restaurant } from "@/data/restaurant";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      {/* 1. HERO SECTION STUB */}
      <section
        id="hero"
        className="min-h-[100svh] flex items-center justify-center pt-20 pb-16 border-b border-line relative"
      >
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <SectionLabel>Hero</SectionLabel>
              <h1 className="text-hero font-display text-cream">
                Hero
              </h1>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. SPECIALS SECTION STUB */}
      <section
        id="specials"
        className="min-h-[60vh] flex items-center border-b border-line section-spacing"
      >
        <Container>
          <Reveal>
            <div className="space-y-4">
              <SectionLabel>Specials</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                Specials
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. MENU SECTION STUB */}
      <section
        id="menu"
        className="min-h-[60vh] flex items-center border-b border-line section-spacing"
      >
        <Container>
          <Reveal>
            <div className="space-y-4">
              <SectionLabel>Menu</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                Menu
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4. ABOUT SECTION STUB */}
      <section
        id="about"
        className="min-h-[60vh] flex items-center border-b border-line section-spacing"
      >
        <Container>
          <Reveal>
            <div className="space-y-4">
              <SectionLabel>About</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                About
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5. GALLERY SECTION STUB */}
      <section
        id="gallery"
        className="min-h-[60vh] flex items-center border-b border-line section-spacing"
      >
        <Container>
          <Reveal>
            <div className="space-y-4">
              <SectionLabel>Gallery</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                Gallery
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. REVIEWS SECTION STUB */}
      <section
        id="reviews"
        className="min-h-[60vh] flex items-center border-b border-line section-spacing"
      >
        <Container>
          <Reveal>
            <div className="space-y-4">
              <SectionLabel>Reviews</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                Reviews
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 7. VISIT SECTION STUB */}
      <section
        id="visit"
        className="min-h-[60vh] flex items-center border-b border-line section-spacing pb-28 md:pb-24"
      >
        <Container>
          <Reveal>
            <div className="space-y-4">
              <SectionLabel>Visit</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                Visit
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER SHELL */}
      <footer className="border-t border-line py-12 bg-ink-soft/40 pb-28 md:pb-12">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-6 text-cream-dim text-small">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-h3 text-cream">
              {restaurant.name}
            </span>
          </div>

          <div className="text-center md:text-right text-micro tracking-[0.08em] text-cream-dim/70">
            <p>
              &copy; {new Date().getFullYear()} {restaurant.name}. All rights
              reserved.
            </p>
            <p className="mt-1">
              Devarakonda, Nalgonda District, Telangana {restaurant.address.pincode}
            </p>
          </div>
        </Container>
      </footer>
    </main>
  );
}

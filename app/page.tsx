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
        className="min-h-[100svh] flex items-center justify-center pt-24 pb-16 border-b border-line relative"
      >
        <Container>
          <Reveal>
            <div className="max-w-2xl">
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
              <SectionLabel>Visit</SectionLabel>
              <h2 className="text-h1 font-display text-cream">
                Visit
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER SHELL */}
      <footer className="border-t border-line py-16 bg-ink-soft/40 pb-28 md:pb-16">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-8 text-cream-dim">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-h3 text-cream font-normal">
              {restaurant.name}
            </span>
          </div>

          <div className="text-center md:text-right font-ui text-micro tracking-[0.18em] text-cream-dim/60">
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

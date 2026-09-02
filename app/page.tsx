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
        className="min-h-screen flex items-center justify-center pt-24 pb-16 border-b border-line relative"
      >
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <SectionLabel>River & Flame</SectionLabel>
              <h1 className="text-hero font-display font-bold text-cream">
                {restaurant.name}
              </h1>
              <p className="text-body text-cream-dim font-telugu text-h3 mt-2">
                {restaurant.nameTelugu}
              </p>
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
              <SectionLabel>Daily Catch</SectionLabel>
              <h2 className="text-h1 font-display font-bold text-cream">
                Today&apos;s Fresh Specials
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
              <SectionLabel>Offerings</SectionLabel>
              <h2 className="text-h1 font-display font-bold text-cream">
                Traditional River Menu
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
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="text-h1 font-display font-bold text-cream">
                Born by the Riverbed
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
              <SectionLabel>Moments</SectionLabel>
              <h2 className="text-h1 font-display font-bold text-cream">
                The Riverside Experience
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
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-h1 font-display font-bold text-cream">
                Words from Our Guests
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
              <SectionLabel>Location & Hours</SectionLabel>
              <h2 className="text-h1 font-display font-bold text-cream">
                Visit Sathamma Fish Fry
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER SHELL */}
      <footer className="border-t border-line py-12 bg-ink-soft/40 pb-28 md:pb-12">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-6 text-cream-dim text-small">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-h3 text-cream font-semibold">
              {restaurant.name}
            </span>
            <span className="font-telugu text-micro text-cream-dim">
              {restaurant.nameTelugu}
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

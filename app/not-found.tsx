import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 flex flex-col justify-between w-full min-h-[calc(100vh-76px)] pt-28 md:pt-36 outline-none"
    >
      <div className="flex-1 flex items-center py-16 md:py-24">
        <Container>
          <div className="max-w-[480px] flex flex-col items-start">
            <SectionLabel className="mb-4">404</SectionLabel>
            <h2 className="font-display font-light text-h2 text-cream leading-[1.15] tracking-[-0.015em]">
              This page isn&apos;t here
            </h2>
            <p className="mt-4 font-display font-light text-body text-cream-dim leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 border border-line bg-transparent text-cream hover:bg-ink-soft hover:border-cream/30 transition-all duration-200 font-ui font-medium text-[14px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </main>
  );
}

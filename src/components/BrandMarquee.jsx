import React from "react";

// Curated brands — add more wordmarks here as the catalog grows.
const BRANDS = ["Versace"];

// Repeat the set enough times that a single group comfortably overflows the
// viewport, so the seamless -50% loop never shows an empty gap — even with
// a single brand in the set.
const GROUP = Array.from({ length: 6 }, () => BRANDS).flat();

export default function BrandMarquee() {
  return (
    <section className="border-y border-border overflow-hidden py-12 md:py-16">
      <p className="text-center text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
        Brands We Curate
      </p>
      <div className="relative">
        <div className="flex w-max animate-marquee will-change-transform">
          {[0, 1].map((g) => (
            <div
              key={g}
              aria-hidden={g === 1}
              className="flex shrink-0 gap-16 md:gap-24 pr-16 md:pr-24"
            >
              {GROUP.map((brand, i) => (
                <span
                  key={i}
                  className="font-heading text-2xl md:text-4xl tracking-[0.35em] uppercase text-muted-foreground/80 whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
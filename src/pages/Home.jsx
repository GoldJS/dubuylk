import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Package, Heart } from "lucide-react";
import { Product } from "@/lib/localProducts";
import { Image } from "@/components/ui/image";
import ProductCard from "@/components/ProductCard";
import BrandMarquee from "@/components/BrandMarquee";

const HERO_IMG = "https://media.base44.com/images/public/6a8c6629d5f08afd80fbbda0/be918a6e8_generated_00df284b.png";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Product.list("-created_date", 50)
      .then(setProducts)
      .catch(() => {});
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 3);
  const display = featured.length ? featured : products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src={HERO_IMG}
          alt="Luxury perfume bottle on marble with golden Dubai skyline bokeh"
          className="absolute inset-0 w-full h-full"
          fittingType="fill"
        />
        {/* Permanent site rule: hero image never gets a light/white overlay — dark gradient only, identical in both modes. */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-5 md:px-10 pb-14 md:pb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Dubai → Sri Lanka
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-ink-foreground max-w-2xl leading-[1.05]">
              Curated luxury,<br />delivered to your door.
            </h1>
            <p className="mt-6 text-base md:text-lg text-ink-foreground/80 max-w-md leading-relaxed">
              A small family-run shop sourcing authentic luxury goods from Dubai
              and shipping them, with care, to homes across Sri Lanka.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-gold text-gold-foreground px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
              >
                Shop the Collection
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-ink-foreground/40 text-ink-foreground px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-ink-foreground/10 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-gold/15 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20 grid gap-10 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Authenticity Guaranteed", text: "Every item is sourced directly and verified before it leaves Dubai." },
            { icon: Package, title: "Direct Delivery", text: "Shipped from Dubai to your doorstep anywhere in Sri Lanka." },
            { icon: Heart, title: "Family-Run", text: "A personal, honest service — not a faceless marketplace." },
          ].map((v) => (
            <div key={v.title} className="text-center md:text-left bg-ink border border-gold/20 p-8">
              <v.icon className="h-6 w-6 text-gold mx-auto md:mx-0" />
              <h3 className="mt-4 text-sm tracking-[0.15em] uppercase text-ink-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-foreground/80 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-2">Featured</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">The Collection</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground border-b border-border pb-1">
            View All →
          </Link>
        </div>

        {display.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[3/4] bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:gap-10 md:grid-cols-3">
            {display.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}

        <div className="mt-10 md:hidden">
          <Link to="/shop" className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground border-b border-border pb-1">
            View All →
          </Link>
        </div>
      </section>

      {/* Origin band */}
      <section className="bg-ink border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">The Journey</p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-ink-foreground max-w-2xl mx-auto leading-snug">
            From the boutiques of Dubai to the doorsteps of Sri Lanka.
          </h2>
          <p className="mt-6 text-ink-foreground/70 max-w-xl mx-auto leading-relaxed">
            We hand-pick each item, verify its authenticity, and ship it directly.
            No middlemen, no surprises — just genuine luxury, delivered with care.
          </p>
          <Link
            to="/shipping"
            className="mt-8 inline-flex text-[11px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-1"
          >
            How Shipping Works →
          </Link>
        </div>
      </section>

      {/* Brand marquee */}
      <BrandMarquee />
    </div>
  );
}
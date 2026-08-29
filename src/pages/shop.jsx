import React, { useState, useEffect } from "react";
import { Product } from "@/lib/localProducts";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Product.list("-created_date", 50)
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
      <div className="mb-16 max-w-2xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">The Collection</p>
        <h1 className="font-heading text-4xl md:text-5xl font-light leading-tight text-foreground">
          A small, curated selection.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Each piece is chosen with intention. We begin with a selection of
          Versace fragrances — the catalog will grow as we find more worth sharing.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:gap-10 sm:grid-cols-2 md:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[3/4] bg-secondary animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground">No products available yet. Please check back soon.</p>
      ) : (
        <div className="grid gap-6 md:gap-10 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
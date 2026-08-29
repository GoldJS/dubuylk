import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { formatLKR, formatAED, aedToLkr } from "@/lib/currency";

export default function ProductCard({ product, index }) {
  // Loose grid: alternate vertical offset for boutique feel
  const offset = index % 2 === 1 ? "md:mt-12" : "";

  return (
    <Link to={`/product/${product.id}`} className={`group block ${offset}`}>
      <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
        <Image
          src={product.image_url}
          alt={`${product.name} — ${product.brand} perfume bottle`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          fittingType="fill"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-foreground">Sold Out</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-start gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{product.brand}</p>
          <h3 className="mt-1 text-base font-medium text-foreground leading-snug">{product.name}</h3>
          {product.size_ml && (
            <p className="text-xs text-muted-foreground mt-0.5">{product.size_ml}ml</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-semibold text-foreground">Rs {formatLKR(aedToLkr(product.price_aed))}</p>
          <p className="text-[11px] text-muted-foreground">AED {formatAED(product.price_aed)}</p>
        </div>
      </div>
      <div className="mt-3 inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-gold transition-colors">
        View
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
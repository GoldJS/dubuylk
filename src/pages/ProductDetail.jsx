import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Package, Heart, ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/localProducts";
import { Image } from "@/components/ui/image";
import { useCart } from "@/lib/cartContext";
import { formatLKR, formatAED, aedToLkr } from "@/lib/currency";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    Product.get(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background text-foreground min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <p>Product not found.</p>
        <Link to="/shop" className="text-gold text-sm border-b border-gold pb-1">Back to Shop</Link>
      </div>
    );
  }

  const lkr = aedToLkr(product.price_aed);

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to Collection
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16 grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Sticky image */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="aspect-[3/4] overflow-hidden bg-secondary">
            <Image
              src={product.image_url}
              alt={`${product.name} — ${product.brand} perfume bottle`}
              className="w-full h-full object-cover"
              fittingType="fill"
            />
          </div>
        </div>

        {/* Details */}
        <div className="max-w-md">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold">{product.brand}</p>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-light leading-tight">
            {product.name}
          </h1>
          {product.size_ml && (
            <p className="mt-2 text-muted-foreground text-sm">{product.size_ml}ml Eau de Parfum</p>
          )}

          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-3xl font-light text-gold">Rs {formatLKR(lkr)}</span>
            <span className="text-sm text-muted-foreground">AED {formatAED(product.price_aed)}</span>
          </div>

          <div className="mt-4">
            {product.in_stock ? (
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> In Stock
              </span>
            ) : (
              <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">Currently Sold Out</span>
            )}
          </div>

          {product.description && (
            <p className="mt-8 text-foreground/80 leading-relaxed">{product.description}</p>
          )}

          {product.story && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">The Story of the Scent</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{product.story}</p>
            </div>
          )}

          {product.notes && (
            <div className="mt-6">
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Fragrance Notes</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{product.notes}</p>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-3 hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 text-base">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-3 hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-gold text-gold px-6 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.in_stock}
              className="flex-1 inline-flex items-center justify-center bg-gold text-gold-foreground px-6 py-4 text-[12px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          {/* Trust stack */}
          <div className="mt-10 bg-ink border border-gold/20 p-6 space-y-3">
            {[
              { icon: Package, text: "Direct shipping from Dubai" },
              { icon: ShieldCheck, text: "Authenticity verified" },
              { icon: Heart, text: "Family-owned & trusted" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-3 text-sm text-ink-foreground/80">
                <t.icon className="h-4 w-4 text-gold" />
                {t.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
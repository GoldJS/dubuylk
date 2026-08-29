import React from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { formatLKR, formatAED, aedToLkr } from "@/lib/currency";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();

  const subtotalLkr = items.reduce((sum, i) => sum + aedToLkr(i.price_aed) * i.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-sm tracking-[0.2em] uppercase">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60%] text-center px-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/60" />
            <p className="mt-4 text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="mt-6 text-[11px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-1"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100%-65px)]">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-secondary"
                  />
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{item.brand}</p>
                    <p className="text-sm font-medium leading-snug text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.size_ml}ml</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-secondary"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-sm text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-secondary"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        Rs {formatLKR(aedToLkr(item.price_aed) * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive text-xs self-start"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">Rs {formatLKR(subtotalLkr)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Shipping calculated at checkout. Delivery to Sri Lanka only.</p>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gold text-gold-foreground py-4 text-[12px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
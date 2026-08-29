import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Shop", path: "/shop" },
    { label: "Our Story", path: "/about" },
    { label: "Shipping", path: "/shipping" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl tracking-[0.3em] font-light text-foreground">
          DUBUY
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="text-[12px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-foreground hover:text-gold transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 text-sm tracking-[0.15em] uppercase text-muted-foreground border-b border-border"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
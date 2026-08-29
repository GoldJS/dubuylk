import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground/80 mt-20 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-heading text-2xl tracking-[0.3em] text-ink-foreground">DUBUY</div>
          <p className="mt-4 text-sm leading-relaxed max-w-sm text-ink-foreground/60">
            A small family-run shop sourcing authentic luxury goods from Dubai and
            delivering them with care to homes across Sri Lanka.
          </p>
          <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-gold">
            Dubai → Sri Lanka
          </p>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase text-ink-foreground/50 mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="hover:text-gold transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link to="/shipping" className="hover:text-gold transition-colors">Shipping & Delivery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase text-ink-foreground/50 mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://wa.me/971500000000" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:hello@dubuy.shop" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="h-4 w-4" /> hello@dubuy.shop
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                <Instagram className="h-4 w-4" /> @dubuy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-ink-foreground/40 tracking-wider">
          <span>© {new Date().getFullYear()} Dubuy. All rights reserved.</span>
          <span>Hand-selected in Dubai · Delivered to Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}
import React from "react";
import { MessageCircle, Mail, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 py-16 md:py-24">
      <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">Our Story</p>
      <h1 className="font-heading text-4xl md:text-5xl font-light leading-tight text-foreground">
        A family bringing Dubai's luxury to Sri Lanka.
      </h1>

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed text-lg">
        <p>
          Dubai has been home for our family for years. We've spent countless
          evenings walking its malls and little boutiques — the ones where the
          staff know the notes of every fragrance by heart — and over time the
          city became part of how we understand luxury: unhurried, precise, and
          quietly confident.
        </p>
        <p>
          The idea for Dubuy started simply, with family. Relatives in Colombo
          would ask us to bring back a particular Versace fragrance, a bottle for
          a wedding, a gift that was impossible to find at a fair price back home.
          One request became ten, ten became a hundred, and somewhere along the
          way we realised we weren't just running errands — we were building a
          bridge between two places we love.
        </p>
        <p>
          Everything we sell is chosen by hand. We don't carry a warehouse of
          stock or chase trends; we carry a small, deliberate selection of pieces
          we genuinely believe in. Each fragrance is sourced from authorised
          Dubai retailers, checked for authenticity, and only listed once we've
          held it, read the box, and confirmed it's the real thing.
        </p>
        <p>
          Because our family travels between Dubai and Colombo regularly, your
          order travels with that same rhythm. It's packed by us, not a
          fulfilment centre, and labelled with the same care whether it's a
          single bottle or a wedding order. No middlemen, no grey-market
          surprises — the item that leaves Dubai is exactly the item that
          arrives at your door.
        </p>
        <p>
          Trust is the whole of this business. We're a family, not a
          marketplace, so our name is on every parcel. If something isn't right,
          we'll make it right — and we'd rather be reachable and honest than
          polished and distant. Message us on WhatsApp and you'll be talking to
          the person who packed your order, not a chatbot.
        </p>
        <p>
          We'll never be the biggest store, and that's the point. We'd rather
          know every product, every customer, and every story behind an order.
          If there's something specific you're looking for that isn't here yet,
          ask us — sourcing on request is how this whole thing started.
        </p>
      </div>

      <div className="mt-14 border-t border-border pt-10">
        <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">Get in touch</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <a
            href="https://wa.me/971500000000"
            className="border border-gold/20 bg-ink p-6 hover:border-gold transition-colors group"
          >
            <MessageCircle className="h-6 w-6 text-gold" />
            <p className="mt-3 text-sm font-medium text-ink-foreground">WhatsApp</p>
            <p className="text-sm text-ink-foreground/80 mt-1 group-hover:text-gold">+971 50 000 0000</p>
            <p className="text-xs text-ink-foreground/60 mt-1">Fastest way to reach us</p>
          </a>
          <a
            href="mailto:hello@dubuy.shop"
            className="border border-gold/20 bg-ink p-6 hover:border-gold transition-colors group"
          >
            <Mail className="h-6 w-6 text-gold" />
            <p className="mt-3 text-sm font-medium text-ink-foreground">Email</p>
            <p className="text-sm text-ink-foreground/80 mt-1 group-hover:text-gold">hello@dubuy.shop</p>
            <p className="text-xs text-ink-foreground/60 mt-1">For order enquiries</p>
          </a>
        </div>
      </div>

      <div className="mt-10 bg-ink border border-gold/20 p-8 flex items-start gap-4">
        <Heart className="h-6 w-6 text-gold shrink-0 mt-1" />
        <p className="text-sm text-ink-foreground/80 leading-relaxed">
          We're a small team, so we answer every message personally. If you're
          looking for something specific that isn't in our shop yet, ask us —
          we're always happy to source items on request.
        </p>
      </div>
    </div>
  );
}
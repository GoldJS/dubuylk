import React from "react";
import { Plane, Clock, Package, ShieldCheck, FileText } from "lucide-react";

export default function Shipping() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 py-16 md:py-24">
      <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">Shipping & Delivery</p>
      <h1 className="font-heading text-4xl md:text-5xl font-light leading-tight text-foreground">
        From Dubai to your doorstep in Sri Lanka.
      </h1>
      <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
        Here's exactly how your order travels — and what to expect along the way.
      </p>

      <div className="mt-14 space-y-10">
        <Step
          icon={Plane}
          title="Sourced & shipped from Dubai"
          text="Every order is hand-selected and packed in Dubai, then shipped directly to Sri Lanka. There are no middlemen — your item comes straight from us to you."
        />
        <Step
          icon={Clock}
          title="Delivery time: 7–14 days"
          text="Most orders arrive within 7 to 14 days of being placed. We'll keep you updated by WhatsApp at each stage — packing, dispatch, and arrival."
        />
        <Step
          icon={Package}
          title="Island-wide delivery"
          text="We deliver anywhere in Sri Lanka — Colombo, Kandy, Galle, Jaffna, and everywhere in between. A flat shipping fee of Rs 2,500 applies to all orders."
        />
        <Step
          icon={ShieldCheck}
          title="Authenticity guaranteed"
          text="Every product is genuine and verified before it leaves Dubai. If something isn't right when it arrives, contact us and we'll make it right."
        />
        <Step
          icon={FileText}
          title="Customs & duties"
          text="Orders are shipped as personal gifts to keep the process simple. In rare cases, Sri Lankan customs may apply a small fee on higher-value items — we'll let you know beforehand if this is likely."
        />
      </div>

      <div className="mt-14 bg-ink border border-gold/20 p-8 md:p-10">
        <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">A note from us</p>
        <p className="leading-relaxed text-ink-foreground/80">
          Because we're a small family business, every order matters to us. If
          you have any questions about your delivery — or want to check on
          something before you buy — just message us on WhatsApp. We're always
          happy to help.
        </p>
      </div>
    </div>
  );
}

function Step({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-5 border-b border-border pb-8">
      <Icon className="h-7 w-7 text-gold shrink-0" />
      <div>
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
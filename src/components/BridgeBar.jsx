import React from "react";
import { Plane } from "lucide-react";

export default function BridgeBar() {
  return (
    <div className="bg-ink text-ink-foreground text-center py-2 px-4 text-[11px] tracking-[0.25em] uppercase border-b border-gold/20">
      <span className="inline-flex items-center gap-2">
        <Plane className="h-3 w-3 text-gold" />
        Hand-selected in Dubai
        <span className="text-gold">·</span>
        Delivered exclusively to Sri Lanka
      </span>
    </div>
  );
}
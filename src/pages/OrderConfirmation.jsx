import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CheckCircle, MessageCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { formatLKR } from "@/lib/currency";

export default function OrderConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);

  const stateData = location.state || {};

  useEffect(() => {
    if (id) {
      base44.entities.Order.get(id).then(setOrder).catch(() => {});
    }
  }, [id]);

  const paymentLabel = {
    card: "Online Card Payment",
    bank_transfer: "Bank Transfer",
    cod: "Cash on Delivery",
  }[stateData.payment_method || order?.payment_method] || "Your selected method";

  const total = stateData.total_lkr ?? order?.total_lkr ?? 0;
  const orderNumber = stateData.order_number || order?.order_number || id;

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-10 py-20 text-center">
      <CheckCircle className="h-14 w-14 text-gold mx-auto" />
      <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-gold">Order Confirmed</p>
      <h1 className="mt-3 font-heading text-3xl md:text-4xl font-light text-foreground">Thank you for your order</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        We've received your order and sent a confirmation to your email.
        Our team will reach out on WhatsApp shortly to coordinate your delivery.
      </p>

      <div className="mt-10 border border-border p-6 text-left space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order number</span>
          <span className="font-medium text-foreground">{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment method</span>
          <span className="font-medium text-foreground">{paymentLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-medium text-foreground">Rs {formatLKR(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="font-medium text-foreground">7–14 days · Dubai → Sri Lanka</span>
        </div>
      </div>

      <div className="mt-6 bg-secondary px-5 py-4 text-left text-sm text-muted-foreground leading-relaxed">
        {stateData.payment_method === "cod" || order?.payment_method === "cod"
          ? "Keep Rs " + formatLKR(total) + " ready in cash for when your order arrives."
          : stateData.payment_method === "bank_transfer" || order?.payment_method === "bank_transfer"
          ? "We'll send bank transfer details by email shortly to reserve your order."
          : "We'll send a secure payment link to your email shortly."}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://wa.me/971500000000"
          className="inline-flex items-center justify-center gap-2 border border-foreground text-foreground px-6 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
        >
          <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
        </a>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-1"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
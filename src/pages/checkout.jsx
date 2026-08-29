import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cartContext";
import { base44 } from "@/api/base44Client";
import { CreditCard, Landmark, Banknote, ArrowRight, MapPin } from "lucide-react";
import { formatLKR, formatAED, aedToLkr } from "@/lib/currency";

const SHIPPING_LKR = 2500;

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    city: "Colombo",
    payment_method: "cod",
  });

  const subtotalLkr = items.reduce((sum, i) => sum + aedToLkr(i.price_aed) * i.quantity, 0);
  const totalLkr = subtotalLkr + SHIPPING_LKR;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const orderNumber = "DBY-" + Date.now().toString().slice(-8);
      const order = await base44.entities.Order.create({
        ...form,
        order_number: orderNumber,
        items: items.map((i) => ({
          name: i.name,
          price_aed: i.price_aed,
          price_lkr: aedToLkr(i.price_aed),
          quantity: i.quantity,
        })),
        subtotal_lkr: subtotalLkr,
        shipping_lkr: SHIPPING_LKR,
        total_lkr: totalLkr,
        status: "pending",
      });

      // Send confirmation email
      const paymentLabel = {
        card: "Online card payment",
        bank_transfer: "Bank transfer",
        cod: "Cash on delivery",
      }[form.payment_method];

      const itemLines = items
        .map((i) => `• ${i.name} (x${i.quantity}) — Rs ${formatLKR(aedToLkr(i.price_aed) * i.quantity)}`)
        .join("\n");

      try {
        await base44.integrations.Core.SendEmail({
          to: form.email,
          subject: `Order confirmed — ${orderNumber}`,
          body: `Dear ${form.customer_name},\n\nThank you for your order with Dubuy.\n\nOrder number: ${orderNumber}\n\nItems:\n${itemLines}\n\nSubtotal: Rs ${formatLKR(subtotalLkr)}\nShipping: Rs ${formatLKR(SHIPPING_LKR)}\nTotal: Rs ${formatLKR(totalLkr)}\n\nPayment method: ${paymentLabel}\nDelivery to: ${form.address}, ${form.city}, Sri Lanka\n\n${
            form.payment_method === "cod"
              ? "Pay Rs " + formatLKR(totalLkr) + " in cash when your order arrives."
              : form.payment_method === "bank_transfer"
              ? "We will send you bank transfer details shortly to reserve your order."
              : "We will send you a secure payment link shortly."
          }\n\nExpected delivery: 7–14 days from Dubai to Sri Lanka.\n\nWarm regards,\nThe Dubuy Family`,
        });
      } catch (err) {
        // email failure shouldn't block the order
      }

      clearCart();
      navigate(`/order-confirmation/${order.id}`, {
        state: { order_number: orderNumber, payment_method: form.payment_method, total_lkr: totalLkr },
      });
    } catch (err) {
      alert("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-24 text-center">
        <h1 className="font-heading text-3xl font-light text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add something from the collection to begin checkout.</p>
        <a href="/shop" className="mt-6 inline-flex text-[11px] tracking-[0.2em] uppercase text-gold border-b border-gold pb-1">
          Browse the Collection →
        </a>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "cod",
      icon: Banknote,
      title: "Cash on Delivery",
      desc: "Pay in LKR (Rs) in cash when your order arrives at your doorstep. Available island-wide in Sri Lanka.",
    },
    {
      id: "bank_transfer",
      icon: Landmark,
      title: "Bank Transfer",
      desc: "Reserve your order now and transfer via a local Sri Lankan bank. We'll send details by email or WhatsApp.",
    },
    {
      id: "card",
      icon: CreditCard,
      title: "Online Card Payment",
      desc: "Pay securely by card. We'll send you a secure payment link by email to complete the transaction.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 md:py-20">
      <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">Checkout</p>
      <h1 className="font-heading text-3xl md:text-4xl font-light mb-12 text-foreground">Complete your order</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-12">
        {/* Left: details + payment */}
        <div className="lg:col-span-3 space-y-12">
          {/* Shipping destination notice */}
          <div className="border border-gold/40 bg-gold/5 px-5 py-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Shipping to Sri Lanka only</p>
              <p className="text-xs text-muted-foreground mt-1">
                Orders are shipped from Dubai. Expected delivery: 7–14 days. Island-wide delivery available.
              </p>
            </div>
          </div>

          {/* Contact + address */}
          <section>
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-5">1. Delivery Details</h2>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required value={form.customer_name} onChange={(v) => set("customer_name", v)} />
                <Field label="Phone (WhatsApp)" required value={form.phone} onChange={(v) => set("phone", v)} />
              </div>
              <Field label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} />
              <Field label="Delivery Address" required value={form.address} onChange={(v) => set("address", v)} />
              <Field label="City" required value={form.city} onChange={(v) => set("city", v)} />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-5">2. Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <label
                  key={m.id}
                  className={`block border p-5 cursor-pointer transition-colors ${
                    form.payment_method === m.id ? "border-gold bg-gold/5" : "border-border hover:border-muted-foreground/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="payment"
                      checked={form.payment_method === m.id}
                      onChange={() => set("payment_method", m.id)}
                      className="mt-1 accent-[#C5A059]"
                    />
                    <m.icon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-2">
          <div className="border border-border p-6 lg:sticky lg:top-24 bg-card">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-5">Order Summary</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <img src={i.image_url} alt={i.name} className="w-14 h-16 object-cover bg-secondary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug text-foreground">{i.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.quantity} · {i.size_ml}ml</p>
                    <p className="text-sm mt-1 text-foreground">Rs {formatLKR(aedToLkr(i.price_aed) * i.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border mt-5 pt-5 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>Rs {formatLKR(subtotalLkr)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping (Dubai → Sri Lanka)</span>
                <span>Rs {formatLKR(SHIPPING_LKR)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border text-foreground">
                <span>Total</span>
                <span>Rs {formatLKR(totalLkr)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1">≈ AED {formatAED(items.reduce((s, i) => s + i.price_aed * i.quantity, 0) + SHIPPING_LKR / 88)}</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gold text-gold-foreground py-4 text-[12px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Placing order..." : <>Place Order <ArrowRight className="h-4 w-4" /></>}
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground text-center">
              No account needed. We'll confirm by email and WhatsApp.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none"
      />
    </label>
  );
}
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrderStore } from "@/stores/order";
import type { CartItem } from "@/types/product";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  PackageCheck,
  RefreshCcw,
  RotateCcw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const SUPPORT_EMAIL = "brangelbusiness@gmail.com";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function addBusinessDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function OrderItemRow({ item, index }: { item: CartItem; index: number }) {
  const variantLabel = item.variant.selectedOptions
    .map((o) => o.value)
    .join(" · ");

  return (
    <motion.div
      data-ocid={`order.item.${index + 1}`}
      className="flex items-start gap-4 py-4"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.55 + index * 0.08 }}
    >
      <div className="w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0 border border-border">
        {item.product.images?.[0] ? (
          <img
            src={item.product.images[0].src}
            alt={item.product.images[0].alt || item.product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={18} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground text-sm truncate">
          {item.product.title}
        </p>
        {variantLabel && (
          <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide">
            {variantLabel}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Qty: {item.quantity}
        </p>
      </div>
      <p className="font-mono text-sm text-foreground flex-shrink-0">
        {formatCurrency(item.variant.price * item.quantity)}
      </p>
    </motion.div>
  );
}

function PolicyCard() {
  return (
    <motion.div
      className="rounded-sm border border-border overflow-hidden mb-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
      data-ocid="order-confirmation.delivery_info"
    >
      {/* Delivery — green accent row */}
      <div className="flex items-start gap-4 p-5 bg-success/5 border-b border-success/20">
        <div className="flex-shrink-0 w-9 h-9 rounded-sm bg-success/10 flex items-center justify-center mt-0.5">
          <Truck size={18} className="text-success" />
        </div>
        <div>
          <p className="text-uppercase-tight text-success mb-0.5">
            Estimated Delivery
          </p>
          <p className="text-foreground text-sm font-semibold">
            5–7 Business Days from Order Date
          </p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <CalendarDays size={18} className="text-success/50 mt-1" />
        </div>
      </div>

      {/* Policy rows */}
      <div className="divide-y divide-border bg-card">
        <div className="flex items-start gap-4 p-5">
          <div className="flex-shrink-0 w-9 h-9 rounded-sm bg-muted flex items-center justify-center mt-0.5">
            <RefreshCcw size={16} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-uppercase-tight text-muted-foreground mb-0.5">
              Return Window
            </p>
            <p className="text-foreground text-sm">
              Returns and exchanges accepted within 7 days of delivery. Return
              shipping charges are borne by the customer.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5">
          <div className="flex-shrink-0 w-9 h-9 rounded-sm bg-muted flex items-center justify-center mt-0.5">
            <PackageCheck size={16} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-uppercase-tight text-muted-foreground mb-0.5">
              Refund &amp; Exchange
            </p>
            <p className="text-foreground text-sm">
              Refunds and exchanges processed only after the returned item is
              received.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5">
          <div className="flex-shrink-0 w-9 h-9 rounded-sm bg-muted flex items-center justify-center mt-0.5">
            <RotateCcw size={16} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-uppercase-tight text-muted-foreground mb-0.5">
              How to Return
            </p>
            <p className="text-foreground text-sm">
              Email{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-primary underline underline-offset-2 hover:opacity-80 transition-fast"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              with your order number to initiate a return.
            </p>
          </div>
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/20">
          <Link
            to="/policies"
            className="text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-fast"
            data-ocid="order-confirmation.view_policies.link"
          >
            View our full policies →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { order } = useOrderStore();

  /* ──────────────────────────────────────────────────────────────
     NULL STATE — user arrived directly from Shopify checkout
  ────────────────────────────────────────────────────────────── */
  if (!order) {
    return (
      <div
        data-ocid="order-confirmation.page"
        className="min-h-screen bg-background py-12 px-4"
      >
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 border border-success/30 mb-6"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <CheckCircle2
                size={40}
                className="text-success"
                strokeWidth={1.5}
              />
            </motion.div>

            <div
              data-ocid="order-confirmation.success_state"
              className="status-badge mx-auto mb-5"
            >
              <CheckCircle2 size={12} />
              Order Placed Successfully
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 uppercase tracking-widest">
              ORDER CONFIRMED
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
              Thank you for your purchase. Your order is confirmed.
            </p>
          </motion.div>

          <PolicyCard />

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              data-ocid="order-confirmation.shop_button"
              className="btn-luxury flex-1"
              onClick={() => navigate({ to: "/" })}
            >
              <ShoppingBag size={16} className="mr-2" />
              Continue Shopping
            </Button>
            <Button
              data-ocid="order-confirmation.contact_button"
              variant="outline"
              className="flex-1 outline-btn"
              onClick={() => navigate({ to: "/contact" })}
            >
              <Mail size={16} className="mr-2" />
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────
     FULL ORDER VIEW
  ────────────────────────────────────────────────────────────── */
  const addr = order.shippingAddress;
  const deliveryDate = addBusinessDays(order.createdAt, 5);

  return (
    <div
      data-ocid="order-confirmation.page"
      className="min-h-screen bg-background py-12 px-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* ── 1. SUCCESS HEADER ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 border border-success/30 mb-6"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <CheckCircle2
              size={40}
              className="text-success"
              strokeWidth={1.5}
            />
          </motion.div>

          <div
            data-ocid="order-confirmation.success_state"
            className="status-badge mx-auto mb-5"
          >
            <CheckCircle2 size={12} />
            Order Placed Successfully
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 uppercase tracking-widest">
            ORDER CONFIRMED
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
            Thank you for your purchase. Your order is confirmed.
          </p>
        </motion.div>

        {/* ── 2. ORDER DETAILS CARD ── */}
        <motion.div
          className="order-summary-card mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          data-ocid="order-confirmation.order_details"
        >
          {/* Order # — gold accent */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-uppercase-tight text-muted-foreground mb-1">
                Order Number
              </p>
              <p
                data-ocid="order-confirmation.order_number"
                className="font-mono text-primary font-bold text-lg tracking-wider"
              >
                #{order.orderNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-uppercase-tight text-muted-foreground mb-1">
                Order Date
              </p>
              <p className="text-foreground text-sm font-semibold">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Delivery estimate — highlighted */}
          <div className="flex items-center gap-3 bg-success/5 border border-success/20 rounded-sm px-4 py-3 mb-5">
            <CalendarDays size={16} className="text-success flex-shrink-0" />
            <div>
              <p className="text-uppercase-tight text-success leading-none mb-0.5">
                Estimated Delivery
              </p>
              <p className="text-foreground text-sm font-semibold">
                Estimated by {deliveryDate}
              </p>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-uppercase-tight text-muted-foreground mb-1">
                Customer Name
              </p>
              <p className="text-foreground text-sm font-semibold">
                {addr.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-uppercase-tight text-muted-foreground mb-1">
                Phone
              </p>
              <p className="text-foreground text-sm font-semibold">
                {addr.phone || "—"}
              </p>
            </div>
          </div>

          {/* Shipping address */}
          <div>
            <p className="text-uppercase-tight text-muted-foreground mb-1">
              Shipping Address
            </p>
            <div
              className="text-sm text-muted-foreground space-y-0.5"
              data-ocid="order-confirmation.shipping_address"
            >
              <p>{addr.address}</p>
              <p>
                {addr.city}, {addr.state} – {addr.pincode}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 3. ORDER SUMMARY ── */}
        <motion.div
          className="order-summary-card mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          data-ocid="order-confirmation.order_summary"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground text-base">
              Order Summary
            </h2>
            <Badge variant="outline" className="font-mono text-xs">
              {order.items.reduce((s, i) => s + i.quantity, 0)} item
              {order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}
            </Badge>
          </div>

          <Separator className="mb-1" />

          <div
            data-ocid="order-confirmation.list"
            className="divide-y divide-border"
          >
            {order.items.map((item, idx) => (
              <OrderItemRow
                key={`${item.product.id}-${item.variant.id}`}
                item={item}
                index={idx}
              />
            ))}
          </div>

          <Separator className="mt-1 mb-4" />

          <div className="flex items-center justify-between">
            <span className="text-uppercase-tight text-muted-foreground">
              Total Paid
            </span>
            <span className="font-mono text-xl font-bold text-foreground">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
        </motion.div>

        {/* ── 4. POLICY CARD ── */}
        <PolicyCard />

        {/* ── 5. ACTION BUTTONS ── */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            data-ocid="order-confirmation.shop_button"
            className="btn-luxury flex-1"
            onClick={() => navigate({ to: "/" })}
          >
            <ShoppingBag size={16} className="mr-2" />
            Continue Shopping
          </Button>
          <Button
            data-ocid="order-confirmation.contact_button"
            variant="outline"
            className="flex-1 outline-btn"
            onClick={() => navigate({ to: "/contact" })}
          >
            <Mail size={16} className="mr-2" />
            Contact Support
          </Button>
        </motion.div>

        {/* Footer tagline */}
        <motion.div
          className="text-center pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-muted-foreground text-xs uppercase tracking-widest">
            Every piece is crafted for those who move with purpose.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

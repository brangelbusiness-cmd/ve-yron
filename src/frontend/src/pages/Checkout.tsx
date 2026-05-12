import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAddressStore } from "@/stores/address";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useOrderStore } from "@/stores/order";
import type { CartItem, ShippingAddress } from "@/types/product";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookmarkCheck,
  ChevronRight,
  CreditCard,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { BuyerIdentity } from "../lib/shopify";
import { createShopifyCart } from "../lib/shopify";

// ─── Constants ────────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
];

// Extended form that includes fields beyond the ShippingAddress type
interface CheckoutForm extends ShippingAddress {
  email: string;
  address2: string;
  country: string;
}

type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function validateForm(form: CheckoutForm): FormErrors {
  const errs: FormErrors = {};
  if (!form.name.trim()) errs.name = "Full name is required";
  if (!/^\d{10}$/.test(form.phone))
    errs.phone = "Enter a valid 10-digit mobile number";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = "Enter a valid email address";
  if (!form.address.trim()) errs.address = "Address is required";
  if (!form.city.trim()) errs.city = "City is required";
  if (!form.state) errs.state = "Please select a state";
  if (!/^\d{6}$/.test(form.pincode))
    errs.pincode = "Enter a valid 6-digit pincode";
  return errs;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrderItemRow({ item, idx }: { item: CartItem; idx: number }) {
  const img = item.product.images?.[0];
  const size = item.variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "size",
  )?.value;
  const color = item.variant.selectedOptions.find(
    (o) =>
      o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour",
  )?.value;

  return (
    <div
      className="flex items-center gap-3 py-3 border-b border-border last:border-0"
      data-ocid={`checkout.item.${idx + 1}`}
    >
      <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0 border border-border">
        {img ? (
          <img
            src={img.src}
            alt={img.alt ?? item.product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {item.product.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {[size, color].filter(Boolean).join(" · ")} &times; {item.quantity}
        </p>
      </div>
      <span className="font-mono text-sm font-semibold text-foreground flex-shrink-0">
        {formatINR(item.variant.price * item.quantity)}
      </span>
    </div>
  );
}

// ─── Field Component ──────────────────────────────────────────────────────────

function FieldError({ msg, id }: { msg?: string; id: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="text-destructive text-xs mt-1.5">
      {msg}
    </p>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const authPhone = useAuthStore((s) => s.phone);
  const authEmail = useAuthStore((s) => s.email);
  const savedAddress = useAddressStore((s) => s.savedAddress);
  const saveAddressFn = useAddressStore((s) => s.saveAddress);
  const clearAddressFn = useAddressStore((s) => s.clearAddress);
  const setOrder = useOrderStore((s) => s.setOrder);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/login", search: { returnUrl: "/checkout" } });
    }
  }, [isLoggedIn, navigate]);

  const initialSaved = useRef(savedAddress).current;

  const buildInitialForm = (): CheckoutForm => ({
    name: initialSaved?.name ?? "",
    phone: initialSaved?.phone ?? authPhone ?? "",
    email: authEmail ?? "",
    address: initialSaved?.address ?? "",
    address2: "",
    city: initialSaved?.city ?? "",
    state: initialSaved?.state ?? "",
    pincode: initialSaved?.pincode ?? "",
    country: "India",
  });

  const [form, setForm] = useState<CheckoutForm>(buildInitialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [placing, setPlacing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [saveForNext, setSaveForNext] = useState(false);

  const update = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function handleBlur(field: keyof CheckoutForm) {
    const validation = validateForm(form);
    if (validation[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation[field] }));
    }
  }

  function handleClearSaved() {
    clearAddressFn();
    setForm({
      ...buildInitialForm(),
      phone: authPhone ?? "",
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setSaveForNext(false);
  }

  async function handlePlaceOrder() {
    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstKey = Object.keys(validation)[0] as keyof CheckoutForm;
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    if (saveForNext) {
      saveAddressFn({
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      });
    }

    setPlacing(true);
    setCheckoutError(null);

    try {
      const lines = items.map((item) => ({
        merchandiseId: item.variant.id,
        quantity: item.quantity,
      }));

      const { firstName, lastName } = splitName(form.name);
      const phoneWithCode = `+91${form.phone}`;
      const fullAddress = form.address2
        ? `${form.address}, ${form.address2}`
        : form.address;

      const buyerIdentity: BuyerIdentity = {
        phone: phoneWithCode,
        deliveryAddressPreferences: [
          {
            deliveryAddress: {
              firstName,
              lastName,
              address1: fullAddress,
              city: form.city,
              province: form.state,
              zip: form.pincode,
              country: "IN",
              phone: phoneWithCode,
            },
          },
        ],
      };

      // Store order details for confirmation page
      setOrder({
        orderNumber: `VY-${Date.now()}`,
        items,
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          address: fullAddress,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        totalAmount: totalPrice,
        createdAt: new Date().toISOString(),
      });

      const { checkoutUrl } = await createShopifyCart(lines, buyerIdentity);
      clearCart();
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("[Checkout] Shopify cart creation failed:", err);
      setCheckoutError(
        "Unable to create checkout session. Please check your details and try again.",
      );
      setPlacing(false);
    }
  }

  // Don't render checkout content for unauthenticated users
  if (!isLoggedIn) return null;

  if (items.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-background"
        data-ocid="checkout.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Add items to your cart before checking out.
          </p>
        </div>
        <Link to="/shop">
          <Button
            className="btn-luxury gap-2"
            data-ocid="checkout.back_to_shop_button"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse Collection
          </Button>
        </Link>
      </div>
    );
  }

  const isPlacing = placing;

  return (
    <div className="min-h-screen bg-background" data-ocid="checkout.page">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <nav
            aria-label="Checkout steps"
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link
              to="/shop"
              className="hover:text-foreground transition-colors"
              data-ocid="checkout.cart_breadcrumb"
            >
              Cart
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Checkout</span>
            <ChevronRight className="w-3 h-3" />
            <span>Payment</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-start">
          {/* ── ORDER SUMMARY (top on mobile, right on desktop) ── */}
          <motion.aside
            className="lg:w-[380px] flex-shrink-0 lg:sticky lg:top-24 order-1 lg:order-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            data-ocid="checkout.order_summary"
          >
            <div className="order-summary-card">
              <h2 className="text-uppercase-tight text-muted-foreground mb-4">
                ORDER SUMMARY ({items.length} item
                {items.length !== 1 ? "s" : ""})
              </h2>

              <div data-ocid="checkout.items_list">
                {items.map((item, idx) => (
                  <OrderItemRow
                    key={`${item.variant.id}-${idx}`}
                    item={item}
                    idx={idx}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatINR(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-success font-semibold uppercase tracking-wide text-xs">
                    FREE
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-baseline">
                <span className="text-uppercase-tight text-muted-foreground">
                  TOTAL
                </span>
                <span className="font-mono text-xl font-bold text-foreground">
                  {formatINR(totalPrice)}
                </span>
              </div>

              {/* Policy Box */}
              <div
                className="mt-5 border border-primary/30 bg-primary/5 rounded-sm p-4 space-y-3"
                data-ocid="checkout.policy_box"
              >
                <div className="flex items-start gap-3">
                  <Package className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5">
                      Estimated Delivery
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      5–7 business days from order date
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5">
                      Return &amp; Exchange Window
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      7 days from delivery. Exchange accepted within the same
                      window. Return shipping charges are borne by the customer.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5">
                      Refund Policy
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Processed after returned product is received and
                      inspected.
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <Link
                    to="/policies"
                    className="text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-fast"
                    data-ocid="checkout.view_policies.link"
                  >
                    View full policies →
                  </Link>
                </div>
              </div>

              {/* Error (desktop) */}
              {checkoutError && (
                <div
                  className="mt-4 p-3 border border-destructive/30 bg-destructive/10 text-destructive text-xs rounded-sm"
                  data-ocid="checkout.error_state"
                >
                  {checkoutError}
                </div>
              )}

              {/* Desktop CTA */}
              <Button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="btn-luxury w-full h-12 text-base tracking-wide mt-5 hidden lg:flex items-center justify-center gap-2"
                data-ocid="checkout.place_order_button"
              >
                {isPlacing ? (
                  <>
                    <span
                      className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin"
                      data-ocid="checkout.loading_state"
                    />
                    Redirecting to payment…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    PLACE ORDER
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secure checkout powered by Shopify
              </p>
            </div>
          </motion.aside>

          {/* ── SHIPPING FORM (below summary on mobile, left on desktop) ── */}
          <motion.div
            className="flex-1 min-w-0 order-2 lg:order-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
                SHIPPING DETAILS
              </h1>
              {savedAddress && (
                <button
                  type="button"
                  onClick={handleClearSaved}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
                  data-ocid="checkout.clear_saved_address_button"
                >
                  <Trash2 className="w-3 h-3" />
                  Use different address
                </button>
              )}
            </div>

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
              className="space-y-0"
              data-ocid="checkout.shipping_form"
            >
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-widest">
                  Contact & Address
                </h2>

                {/* Name */}
                <div>
                  <label htmlFor="field-name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="field-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="Arjun Sharma"
                    className={`form-input w-full h-12${
                      errors.name
                        ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                        : ""
                    }`}
                    data-ocid="checkout.name_input"
                  />
                  <FieldError msg={errors.name} id="err-name" />
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="field-phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      id="field-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) =>
                        update(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      onBlur={() => handleBlur("phone")}
                      placeholder="9876543210"
                      maxLength={10}
                      className={`form-input w-full h-12${
                        errors.phone
                          ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                          : ""
                      }`}
                      data-ocid="checkout.phone_input"
                    />
                    <FieldError msg={errors.phone} id="err-phone" />
                  </div>
                  <div>
                    <label htmlFor="field-email" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="field-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="arjun@example.com"
                      className={`form-input w-full h-12${
                        errors.email
                          ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                          : ""
                      }`}
                      data-ocid="checkout.email_input"
                    />
                    <FieldError msg={errors.email} id="err-email" />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label htmlFor="field-address" className="form-label">
                    Address Line 1
                  </label>
                  <input
                    id="field-address"
                    type="text"
                    autoComplete="address-line1"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    onBlur={() => handleBlur("address")}
                    placeholder="Flat 4B, Suncity Towers, MG Road"
                    className={`form-input w-full h-12${
                      errors.address
                        ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                        : ""
                    }`}
                    data-ocid="checkout.address_input"
                  />
                  <FieldError msg={errors.address} id="err-address" />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label htmlFor="field-address2" className="form-label">
                    Address Line 2{" "}
                    <span className="text-muted-foreground/60 normal-case font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="field-address2"
                    type="text"
                    autoComplete="address-line2"
                    value={form.address2}
                    onChange={(e) => update("address2", e.target.value)}
                    placeholder="Landmark, Near..."
                    className="form-input w-full h-12"
                    data-ocid="checkout.address2_input"
                  />
                </div>

                {/* City + Pincode */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="field-city" className="form-label">
                      City
                    </label>
                    <input
                      id="field-city"
                      type="text"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      onBlur={() => handleBlur("city")}
                      placeholder="Mumbai"
                      className={`form-input w-full h-12${
                        errors.city
                          ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                          : ""
                      }`}
                      data-ocid="checkout.city_input"
                    />
                    <FieldError msg={errors.city} id="err-city" />
                  </div>
                  <div>
                    <label htmlFor="field-pincode" className="form-label">
                      Postal Code
                    </label>
                    <input
                      id="field-pincode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={form.pincode}
                      onChange={(e) =>
                        update(
                          "pincode",
                          e.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      onBlur={() => handleBlur("pincode")}
                      placeholder="400001"
                      maxLength={6}
                      className={`form-input w-full h-12${
                        errors.pincode
                          ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                          : ""
                      }`}
                      data-ocid="checkout.pincode_input"
                    />
                    <FieldError msg={errors.pincode} id="err-pincode" />
                  </div>
                </div>

                {/* State + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="field-state" className="form-label">
                      State
                    </label>
                    <select
                      id="field-state"
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      onBlur={() => handleBlur("state")}
                      className={`form-input w-full h-12 bg-card${
                        errors.state
                          ? " ring-2 ring-destructive ring-offset-1 ring-offset-background"
                          : ""
                      }`}
                      data-ocid="checkout.state_select"
                    >
                      <option value="">Select State / UT</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={errors.state} id="err-state" />
                  </div>
                  <div>
                    <label htmlFor="field-country" className="form-label">
                      Country
                    </label>
                    <select
                      id="field-country"
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                      className="form-input w-full h-12 bg-card"
                      data-ocid="checkout.country_select"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>

                {/* Save address checkbox */}
                <label
                  className="flex items-center gap-3 cursor-pointer group mt-1"
                  data-ocid="checkout.save_address_checkbox"
                >
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={saveForNext}
                      onChange={(e) => setSaveForNext(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                        saveForNext
                          ? "bg-primary border-primary"
                          : "border-border bg-card group-hover:border-primary/60"
                      }`}
                    >
                      {saveForNext && (
                        <BookmarkCheck className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    Save address for future orders
                  </span>
                </label>
              </div>

              {/* Error message */}
              {checkoutError && (
                <div
                  className="mt-4 p-4 border border-destructive/30 bg-destructive/10 text-destructive text-sm rounded-sm"
                  data-ocid="checkout.error_state"
                >
                  Unable to create checkout. Please try again.
                </div>
              )}

              {/* Mobile CTA */}
              <div className="lg:hidden pt-5">
                <Button
                  type="submit"
                  disabled={isPlacing}
                  className="btn-luxury w-full h-12 text-base tracking-wide gap-2"
                  data-ocid="checkout.submit_button"
                >
                  {isPlacing ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin"
                        data-ocid="checkout.loading_state"
                      />
                      Redirecting to payment…
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      PLACE ORDER · {formatINR(totalPrice)}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { c as createLucideIcon, A as create, D as persist, a as useNavigate, d as useCartStore, E as useAuthStore, r as reactExports, j as jsxRuntimeExports, e as ShoppingBag, L as Link, B as Button, F as Separator, T as Trash2 } from "./index-CWjEpYzx.js";
import { u as useOrderStore } from "./order-DQZ1rpXm.js";
import { c as createShopifyCart } from "./shopify-DQa9Hudt.js";
import { C as ChevronRight } from "./chevron-right-DnhQPKec.js";
import { m as motion } from "./proxy-DcnNbM1P.js";
import { P as Package } from "./package-DEJ62Ln1.js";
import { R as RotateCcw } from "./rotate-ccw-CNybCQv1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const useAddressStore = create()(
  persist(
    (set) => ({
      savedAddress: null,
      saveAddress: (address) => set({ savedAddress: address }),
      clearAddress: () => set({ savedAddress: null })
    }),
    { name: "veyron-address" }
  )
);
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
  "Puducherry"
];
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function validateForm(form) {
  const errs = {};
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
function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}
function OrderItemRow({ item, idx }) {
  var _a, _b, _c;
  const img = (_a = item.product.images) == null ? void 0 : _a[0];
  const size = (_b = item.variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "size"
  )) == null ? void 0 : _b.value;
  const color = (_c = item.variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour"
  )) == null ? void 0 : _c.value;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 py-3 border-b border-border last:border-0",
      "data-ocid": `checkout.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0 border border-border", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: img.src,
            alt: img.alt ?? item.product.title,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: item.product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            [size, color].filter(Boolean).join(" · "),
            " × ",
            item.quantity
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground flex-shrink-0", children: formatINR(item.variant.price * item.quantity) })
      ]
    }
  );
}
function FieldError({ msg, id }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id, className: "text-destructive text-xs mt-1.5", children: msg });
}
function Checkout() {
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
  reactExports.useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/login", search: { returnUrl: "/checkout" } });
    }
  }, [isLoggedIn, navigate]);
  const initialSaved = reactExports.useRef(savedAddress).current;
  const buildInitialForm = () => ({
    name: (initialSaved == null ? void 0 : initialSaved.name) ?? "",
    phone: (initialSaved == null ? void 0 : initialSaved.phone) ?? authPhone ?? "",
    email: authEmail ?? "",
    address: (initialSaved == null ? void 0 : initialSaved.address) ?? "",
    address2: "",
    city: (initialSaved == null ? void 0 : initialSaved.city) ?? "",
    state: (initialSaved == null ? void 0 : initialSaved.state) ?? "",
    pincode: (initialSaved == null ? void 0 : initialSaved.pincode) ?? "",
    country: "India"
  });
  const [form, setForm] = reactExports.useState(buildInitialForm);
  const [errors, setErrors] = reactExports.useState({});
  const [placing, setPlacing] = reactExports.useState(false);
  const [redirecting, setRedirecting] = reactExports.useState(false);
  const [checkoutError, setCheckoutError] = reactExports.useState(null);
  const [saveForNext, setSaveForNext] = reactExports.useState(false);
  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  };
  function handleBlur(field) {
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
      pincode: ""
    });
    setSaveForNext(false);
  }
  async function handlePlaceOrder() {
    var _a;
    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstKey = Object.keys(validation)[0];
      (_a = document.getElementById(`field-${firstKey}`)) == null ? void 0 : _a.focus();
      return;
    }
    if (saveForNext) {
      saveAddressFn({
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode
      });
    }
    setPlacing(true);
    setCheckoutError(null);
    try {
      const lines = items.map((item) => ({
        merchandiseId: item.variant.id,
        quantity: item.quantity
      }));
      const { firstName, lastName } = splitName(form.name);
      const phoneWithCode = `+91${form.phone}`;
      const fullAddress = form.address2 ? `${form.address}, ${form.address2}` : form.address;
      const buyerIdentity = {
        phone: phoneWithCode,
        email: form.email || void 0,
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
              phone: phoneWithCode
            }
          }
        ]
      };
      setOrder({
        orderNumber: `VY-${Date.now()}`,
        items,
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          address: fullAddress,
          city: form.city,
          state: form.state,
          pincode: form.pincode
        },
        totalAmount: totalPrice,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      const { checkoutUrl } = await createShopifyCart(lines, buyerIdentity);
      clearCart();
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 1600);
    } catch (err) {
      console.error("[Checkout] Shopify cart creation failed:", err);
      setCheckoutError(
        "Unable to create checkout session. Please check your details and try again."
      );
      setPlacing(false);
    }
  }
  if (!isLoggedIn) return null;
  if (redirecting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6",
        "data-ocid": "checkout.redirect_overlay",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-xl tracking-[0.25em] text-primary", children: "VY" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground tracking-widest uppercase mb-2", children: "Securing Your Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Redirecting to secure payment gateway…" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 bg-primary rounded-full animate-bounce",
                style: { animationDelay: `${i * 0.15}s` }
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/50 uppercase tracking-widest", children: "256-bit SSL encrypted" })
        ]
      }
    );
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-background",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Your Cart is Empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Add items to your cart before checking out." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "btn-luxury gap-2",
              "data-ocid": "checkout.back_to_shop_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                "Browse Collection"
              ]
            }
          ) })
        ]
      }
    );
  }
  const isPlacing = placing || redirecting;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        "aria-label": "Checkout steps",
        className: "flex items-center gap-2 text-xs text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/shop",
              className: "hover:text-foreground transition-colors",
              "data-ocid": "checkout.cart_breadcrumb",
              children: "Cart"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8 lg:gap-10 lg:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.aside,
        {
          className: "lg:w-[380px] flex-shrink-0 lg:sticky lg:top-24 order-1 lg:order-2",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          "data-ocid": "checkout.order_summary",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-summary-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-uppercase-tight text-muted-foreground mb-4", children: [
              "ORDER SUMMARY (",
              items.length,
              " item",
              items.length !== 1 ? "s" : "",
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "checkout.items_list", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrderItemRow,
              {
                item,
                idx
              },
              `${item.variant.id}-${idx}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatINR(totalPrice) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success font-semibold uppercase tracking-wide text-xs", children: "FREE" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-uppercase-tight text-muted-foreground", children: "TOTAL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-foreground", children: formatINR(totalPrice) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-5 border border-primary/30 bg-primary/5 rounded-sm p-4 space-y-3",
                "data-ocid": "checkout.policy_box",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5", children: "Estimated Delivery" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "5–7 business days from order date" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5", children: "Return & Exchange Window" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "7 days from delivery. Exchange accepted within the same window. Return shipping charges are borne by the customer." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-wider mb-0.5", children: "Refund Policy" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Processed after returned product is received and inspected." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/policies",
                      className: "text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-fast",
                      "data-ocid": "checkout.view_policies.link",
                      children: "View full policies →"
                    }
                  ) })
                ]
              }
            ),
            checkoutError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-4 p-3 border border-destructive/30 bg-destructive/10 text-destructive text-xs rounded-sm",
                "data-ocid": "checkout.error_state",
                children: checkoutError
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handlePlaceOrder,
                disabled: isPlacing,
                className: "btn-luxury w-full h-12 text-base tracking-wide mt-5 hidden lg:flex items-center justify-center gap-2",
                "data-ocid": "checkout.place_order_button",
                children: isPlacing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin",
                      "data-ocid": "checkout.loading_state"
                    }
                  ),
                  "Redirecting to payment…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                  "PLACE ORDER"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
              "Secure & encrypted payment"
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex-1 min-w-0 order-2 lg:order-1",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground tracking-tight", children: "SHIPPING DETAILS" }),
              savedAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleClearSaved,
                  className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors",
                  "data-ocid": "checkout.clear_saved_address_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
                    "Use different address"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                noValidate: true,
                onSubmit: (e) => {
                  e.preventDefault();
                  handlePlaceOrder();
                },
                className: "space-y-0",
                "data-ocid": "checkout.shipping_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 sm:p-6 space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground uppercase tracking-widest", children: "Contact & Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-name", className: "form-label", children: "Full Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "field-name",
                          type: "text",
                          autoComplete: "name",
                          value: form.name,
                          onChange: (e) => update("name", e.target.value),
                          onBlur: () => handleBlur("name"),
                          placeholder: "Arjun Sharma",
                          className: `form-input w-full h-12${errors.name ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                          "data-ocid": "checkout.name_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.name, id: "err-name" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-phone", className: "form-label", children: "Phone Number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "field-phone",
                            type: "tel",
                            inputMode: "numeric",
                            autoComplete: "tel",
                            value: form.phone,
                            onChange: (e) => update(
                              "phone",
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            ),
                            onBlur: () => handleBlur("phone"),
                            placeholder: "9876543210",
                            maxLength: 10,
                            className: `form-input w-full h-12${errors.phone ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                            "data-ocid": "checkout.phone_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.phone, id: "err-phone" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-email", className: "form-label", children: "Email Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "field-email",
                            type: "email",
                            autoComplete: "email",
                            value: form.email,
                            onChange: (e) => update("email", e.target.value),
                            onBlur: () => handleBlur("email"),
                            placeholder: "arjun@example.com",
                            className: `form-input w-full h-12${errors.email ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                            "data-ocid": "checkout.email_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.email, id: "err-email" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-address", className: "form-label", children: "Address Line 1" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "field-address",
                          type: "text",
                          autoComplete: "address-line1",
                          value: form.address,
                          onChange: (e) => update("address", e.target.value),
                          onBlur: () => handleBlur("address"),
                          placeholder: "Flat 4B, Suncity Towers, MG Road",
                          className: `form-input w-full h-12${errors.address ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                          "data-ocid": "checkout.address_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.address, id: "err-address" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "field-address2", className: "form-label", children: [
                        "Address Line 2",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 normal-case font-normal", children: "(optional)" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "field-address2",
                          type: "text",
                          autoComplete: "address-line2",
                          value: form.address2,
                          onChange: (e) => update("address2", e.target.value),
                          placeholder: "Landmark, Near...",
                          className: "form-input w-full h-12",
                          "data-ocid": "checkout.address2_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-city", className: "form-label", children: "City" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "field-city",
                            type: "text",
                            autoComplete: "address-level2",
                            value: form.city,
                            onChange: (e) => update("city", e.target.value),
                            onBlur: () => handleBlur("city"),
                            placeholder: "Mumbai",
                            className: `form-input w-full h-12${errors.city ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                            "data-ocid": "checkout.city_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.city, id: "err-city" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-pincode", className: "form-label", children: "Postal Code" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "field-pincode",
                            type: "text",
                            inputMode: "numeric",
                            autoComplete: "postal-code",
                            value: form.pincode,
                            onChange: (e) => update(
                              "pincode",
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            ),
                            onBlur: () => handleBlur("pincode"),
                            placeholder: "400001",
                            maxLength: 6,
                            className: `form-input w-full h-12${errors.pincode ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                            "data-ocid": "checkout.pincode_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.pincode, id: "err-pincode" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-state", className: "form-label", children: "State" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "select",
                          {
                            id: "field-state",
                            value: form.state,
                            onChange: (e) => update("state", e.target.value),
                            onBlur: () => handleBlur("state"),
                            className: `form-input w-full h-12 bg-card${errors.state ? " ring-2 ring-destructive ring-offset-1 ring-offset-background" : ""}`,
                            "data-ocid": "checkout.state_select",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select State / UT" }),
                              INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.state, id: "err-state" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-country", className: "form-label", children: "Country" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            id: "field-country",
                            value: form.country,
                            onChange: (e) => update("country", e.target.value),
                            className: "form-input w-full h-12 bg-card",
                            "data-ocid": "checkout.country_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "India", children: "India" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "flex items-center gap-3 cursor-pointer group mt-1",
                        "data-ocid": "checkout.save_address_checkbox",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                type: "checkbox",
                                checked: saveForNext,
                                onChange: (e) => setSaveForNext(e.target.checked),
                                className: "sr-only"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${saveForNext ? "bg-primary border-primary" : "border-border bg-card group-hover:border-primary/60"}`,
                                children: saveForNext && /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-3 h-3 text-primary-foreground" })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground group-hover:text-foreground transition-colors", children: "Save address for future orders" })
                        ]
                      }
                    )
                  ] }),
                  checkoutError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mt-4 p-4 border border-destructive/30 bg-destructive/10 text-destructive text-sm rounded-sm",
                      "data-ocid": "checkout.error_state",
                      children: "Unable to create checkout. Please try again."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: isPlacing,
                      className: "btn-luxury w-full h-12 text-base tracking-wide gap-2",
                      "data-ocid": "checkout.submit_button",
                      children: isPlacing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin",
                            "data-ocid": "checkout.loading_state"
                          }
                        ),
                        "Redirecting to payment…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                        "PLACE ORDER · ",
                        formatINR(totalPrice)
                      ] })
                    }
                  ) })
                ]
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  Checkout as default
};

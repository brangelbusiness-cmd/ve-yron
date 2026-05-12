import { c as createLucideIcon, a as useNavigate, j as jsxRuntimeExports, B as Button, e as ShoppingBag, H as Mail, F as Separator, L as Link } from "./index-DctbPH3p.js";
import { B as Badge } from "./badge-e9PJl5DX.js";
import { u as useOrderStore } from "./order-U0ESaZ9M.js";
import { m as motion } from "./proxy-Cno1h6QO.js";
import { T as Truck } from "./truck-C-LscQoT.js";
import { R as RefreshCcw } from "./refresh-ccw-BH02fKlv.js";
import { R as RotateCcw } from "./rotate-ccw-CMWWrYJL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode);
const SUPPORT_EMAIL = "brangelbusiness@gmail.com";
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function addBusinessDays(dateStr, days) {
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
    year: "numeric"
  });
}
function OrderItemRow({ item, index }) {
  var _a;
  const variantLabel = item.variant.selectedOptions.map((o) => o.value).join(" · ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `order.item.${index + 1}`,
      className: "flex items-start gap-4 py-4",
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.55 + index * 0.08 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-sm overflow-hidden flex-shrink-0 border border-border", children: ((_a = item.product.images) == null ? void 0 : _a[0]) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.product.images[0].src,
            alt: item.product.images[0].alt || item.product.title,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, className: "text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm truncate", children: item.product.title }),
          variantLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 uppercase tracking-wide", children: variantLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Qty: ",
            item.quantity
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground flex-shrink-0", children: formatCurrency(item.variant.price * item.quantity) })
      ]
    }
  );
}
function PolicyCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "rounded-sm border border-border overflow-hidden mb-8",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.35, duration: 0.45 },
      "data-ocid": "order-confirmation.delivery_info",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5 bg-success/5 border-b border-success/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-sm bg-success/10 flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 18, className: "text-success" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-success mb-0.5", children: "Estimated Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold", children: "5–7 Business Days from Order Date" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 18, className: "text-success/50 mt-1" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-sm bg-muted flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { size: 16, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-0.5", children: "Return Window" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm", children: "Returns and exchanges accepted within 7 days of delivery. Return shipping charges are borne by the customer." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-sm bg-muted flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { size: 16, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-0.5", children: "Refund & Exchange" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm", children: "Refunds and exchanges processed only after the returned item is received." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-sm bg-muted flex items-center justify-center mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-0.5", children: "How to Return" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-sm", children: [
                "Email",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `mailto:${SUPPORT_EMAIL}`,
                    className: "text-primary underline underline-offset-2 hover:opacity-80 transition-fast",
                    children: SUPPORT_EMAIL
                  }
                ),
                " ",
                "with your order number to initiate a return."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 border-t border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/policies",
              className: "text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-fast",
              "data-ocid": "order-confirmation.view_policies.link",
              children: "View our full policies →"
            }
          ) })
        ] })
      ]
    }
  );
}
function OrderConfirmation() {
  const navigate = useNavigate();
  const { order } = useOrderStore();
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "order-confirmation.page",
        className: "min-h-screen bg-background py-12 px-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-10",
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 border border-success/30 mb-6",
                    initial: { scale: 0.6, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    transition: { duration: 0.4, delay: 0.15 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheck,
                      {
                        size: 40,
                        className: "text-success",
                        strokeWidth: 1.5
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "order-confirmation.success_state",
                    className: "status-badge mx-auto mb-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                      "Order Placed Successfully"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3 uppercase tracking-widest", children: "ORDER CONFIRMED" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed", children: "Thank you for your purchase. Your order is confirmed." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolicyCard, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col sm:flex-row gap-3 mb-12",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "order-confirmation.shop_button",
                    className: "btn-luxury flex-1",
                    onClick: () => navigate({ to: "/" }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16, className: "mr-2" }),
                      "Continue Shopping"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "order-confirmation.contact_button",
                    variant: "outline",
                    className: "flex-1 outline-btn",
                    onClick: () => navigate({ to: "/contact" }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "mr-2" }),
                      "Contact Support"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      }
    );
  }
  const addr = order.shippingAddress;
  const deliveryDate = addBusinessDays(order.createdAt, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "order-confirmation.page",
      className: "min-h-screen bg-background py-12 px-4",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-10",
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 border border-success/30 mb-6",
                  initial: { scale: 0.6, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { duration: 0.4, delay: 0.15 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 40,
                      className: "text-success",
                      strokeWidth: 1.5
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "order-confirmation.success_state",
                  className: "status-badge mx-auto mb-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12 }),
                    "Order Placed Successfully"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3 uppercase tracking-widest", children: "ORDER CONFIRMED" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed", children: "Thank you for your purchase. Your order is confirmed." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "order-summary-card mb-6",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.25, duration: 0.45 },
            "data-ocid": "order-confirmation.order_details",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-1", children: "Order Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      "data-ocid": "order-confirmation.order_number",
                      className: "font-mono text-primary font-bold text-lg tracking-wider",
                      children: [
                        "#",
                        order.orderNumber
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-1", children: "Order Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold", children: formatDate(order.createdAt) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-success/5 border border-success/20 rounded-sm px-4 py-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 16, className: "text-success flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-success leading-none mb-0.5", children: "Estimated Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-sm font-semibold", children: [
                    "Estimated by ",
                    deliveryDate
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-1", children: "Customer Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold", children: addr.name || "—" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-1", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-semibold", children: addr.phone || "—" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-uppercase-tight text-muted-foreground mb-1", children: "Shipping Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-sm text-muted-foreground space-y-0.5",
                    "data-ocid": "order-confirmation.shipping_address",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.address }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                        addr.city,
                        ", ",
                        addr.state,
                        " – ",
                        addr.pincode
                      ] })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "order-summary-card mb-6",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.35, duration: 0.45 },
            "data-ocid": "order-confirmation.order_summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-xs", children: [
                  order.items.reduce((s, i) => s + i.quantity, 0),
                  " item",
                  order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "order-confirmation.list",
                  className: "divide-y divide-border",
                  children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    OrderItemRow,
                    {
                      item,
                      index: idx
                    },
                    `${item.product.id}-${item.variant.id}`
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mt-1 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-uppercase-tight text-muted-foreground", children: "Total Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-bold text-foreground", children: formatCurrency(order.totalAmount) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolicyCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col sm:flex-row gap-3 mb-12",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "order-confirmation.shop_button",
                  className: "btn-luxury flex-1",
                  onClick: () => navigate({ to: "/" }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16, className: "mr-2" }),
                    "Continue Shopping"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "order-confirmation.contact_button",
                  variant: "outline",
                  className: "flex-1 outline-btn",
                  onClick: () => navigate({ to: "/contact" }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "mr-2" }),
                    "Contact Support"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "text-center pb-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.7 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-widest", children: "Every piece is crafted for those who move with purpose." })
          }
        )
      ] })
    }
  );
}
export {
  OrderConfirmation as default
};

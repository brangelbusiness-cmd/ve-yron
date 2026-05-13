import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, H as Mail, B as Button, L as Link, e as ShoppingBag, C as ChevronDown, F as Separator } from "./index-CWjEpYzx.js";
import { m as motion } from "./proxy-DcnNbM1P.js";
import { P as Package } from "./package-DEJ62Ln1.js";
import { R as RefreshCw } from "./refresh-cw-DTNeoaO7.js";
import { T as Truck } from "./truck-eT-LpoM9.js";
import { A as ArrowRight } from "./arrow-right-D1fLCdgL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const SUPPORT_EMAIL = "brangelbusiness@gmail.com";
const HELP_SECTIONS = [
  {
    id: "order-help",
    icon: Package,
    title: "ORDER HELP",
    ocid: "contact.order.card",
    items: [
      "Track your shipment status",
      "Modify or cancel an order (before dispatch)",
      "Issues with payment or checkout",
      "Report a missing or damaged item"
    ]
  },
  {
    id: "returns",
    icon: RefreshCw,
    title: "RETURNS & EXCHANGES",
    ocid: "contact.returns.card",
    items: [
      "Returns accepted within 7 days of delivery",
      "Email us with your order number to initiate",
      "Refund processed after item is received & inspected",
      "Exchanges follow the same 7-day window"
    ]
  },
  {
    id: "delivery",
    icon: Truck,
    title: "DELIVERY INFO",
    ocid: "contact.delivery.card",
    items: [
      "Delivery in 5–7 business days from order date",
      "Shipping available across India",
      "Orders dispatched within 1–2 business days",
      "Free shipping on all orders"
    ]
  }
];
const POLICIES = [
  {
    icon: Clock,
    label: "Delivery Policy",
    detail: "All orders delivered within 5–7 business days from order placement. Dispatch typically happens within 1–2 business days. Tracking link sent via email once dispatched."
  },
  {
    icon: RefreshCw,
    label: "Return Policy",
    detail: "Raise a return request within 7 days of delivery. Email brangelbusiness@gmail.com with your order number. Return shipping charges are borne by the customer."
  },
  {
    icon: Package,
    label: "Refund Policy",
    detail: "Refunds are processed after the returned item is received and inspected. Credit within 5–7 business days to your original payment method."
  },
  {
    icon: ArrowRight,
    label: "Exchange Policy",
    detail: "Exchanges within 7 days of delivery, processed once the original item is received. Size and colour swaps both supported. Return shipping charges apply."
  }
];
function HelpCard({
  section,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  const Icon = section.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-sm overflow-hidden",
      "data-ocid": section.ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
            onClick: () => setOpen((v) => !v),
            "aria-expanded": open,
            "data-ocid": `${section.ocid}.toggle`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, strokeWidth: 1.5 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground", children: section.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  size: 16,
                  className: `text-muted-foreground flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.25 },
            className: "px-6 pb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: section.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-3 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" }),
                    item
                  ]
                },
                item
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(section.title)}`,
                  className: "mt-5 inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all duration-200",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 12 }),
                    " Email Us About This"
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Contact() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    document.title = "Contact Us | VE YRON";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 lg:py-32 px-6 lg:px-12 bg-card border-b border-border overflow-hidden",
        "data-ocid": "contact.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              "aria-hidden": "true",
              style: {
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(var(--primary) / 0.09) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto relative z-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-[11px] font-bold uppercase tracking-[0.35em] text-primary mb-4",
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                children: "Customer Care"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                className: "font-display font-bold text-5xl md:text-7xl tracking-tight uppercase mb-6",
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.45, delay: 0.08 },
                children: "CONTACT US"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                className: "text-muted-foreground text-lg max-w-md mx-auto leading-relaxed",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.2 },
                children: "We're here to help with your order, returns, or any questions about VE YRON."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-6 lg:px-12",
        "data-ocid": "contact.email.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "bg-card border border-border rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8",
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.45 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2", children: "Get in Touch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl tracking-tight mb-2", children: "Our Support Team" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-xs", children: "We respond within 24 hours, Monday–Saturday. Include your order number for faster help." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `mailto:${SUPPORT_EMAIL}`,
                    "data-ocid": "contact.email.link",
                    className: "group flex items-center gap-3 text-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, strokeWidth: 1.5, className: "flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base tracking-wide underline underline-offset-4 decoration-primary/40 group-hover:decoration-primary transition-colors duration-200", children: SUPPORT_EMAIL })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "contact.email.button",
                    className: "btn-luxury inline-flex items-center gap-2 w-full md:w-auto",
                    onClick: () => {
                      window.location.href = `mailto:${SUPPORT_EMAIL}`;
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, strokeWidth: 1.5 }),
                      "Email Us"
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 lg:px-12 pb-4", "data-ocid": "contact.hours.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 py-4 px-6 bg-primary/5 border border-primary/20 rounded-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-primary flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
        "We respond within 24 hours,",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: "Monday–Saturday" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-6 lg:px-12 bg-muted/20 border-y border-border",
        "data-ocid": "contact.help.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              className: "mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2", children: "How We Help" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl tracking-tight", children: "What Can We Assist With?" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: HELP_SECTIONS.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1, duration: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCard, { section, defaultOpen: i === 0 })
            },
            section.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-6 lg:px-12",
        "data-ocid": "contact.policies.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              className: "mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2", children: "Good To Know" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl tracking-tight", children: "Delivery & Returns At a Glance" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: POLICIES.map((policy, i) => {
            const Icon = policy.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-card border border-border rounded-sm p-6",
                "data-ocid": `contact.policy.${i + 1}.card`,
                initial: { opacity: 0, y: 12 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.08, duration: 0.4 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, strokeWidth: 1.5 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm uppercase tracking-widest text-foreground", children: policy.label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: policy.detail })
                ]
              },
              policy.label
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "mt-6 text-center",
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { delay: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/policies",
                  "data-ocid": "contact.full_policies.link",
                  className: "inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-80 transition-all duration-200",
                  children: "Read Full Policies →"
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 px-6 lg:px-12 bg-card border-t border-border",
        "data-ocid": "contact.cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl tracking-tight mb-2", children: "Still need help?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Email us at",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `mailto:${SUPPORT_EMAIL}`,
                  className: "text-primary underline underline-offset-2 hover:opacity-80 transition-all duration-200",
                  children: SUPPORT_EMAIL
                }
              ),
              " ",
              "and we'll get back to you within 24 hours."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                "data-ocid": "contact.cta.email_button",
                className: "btn-luxury inline-flex items-center gap-2",
                onClick: () => {
                  window.location.href = `mailto:${SUPPORT_EMAIL}`;
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15, strokeWidth: 1.5 }),
                  "Email Support"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                "data-ocid": "contact.cta.shop_button",
                variant: "ghost",
                className: "text-muted-foreground hover:text-foreground flex items-center gap-1",
                onClick: () => navigate({ to: "/" }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 15 }),
                  "Shop Now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Contact as default
};

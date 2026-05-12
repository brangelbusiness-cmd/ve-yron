import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  Package,
  RefreshCw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SUPPORT_EMAIL = "brangelbusiness@gmail.com";

/* ─── DATA ───────────────────────────────────────────── */
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
      "Report a missing or damaged item",
    ],
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
      "Exchanges follow the same 7-day window",
    ],
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
      "Free shipping on all orders",
    ],
  },
];

const POLICIES = [
  {
    icon: Clock,
    label: "Delivery Policy",
    detail:
      "All orders delivered within 5–7 business days from order placement. Dispatch typically happens within 1–2 business days. Tracking link sent via email once dispatched.",
  },
  {
    icon: RefreshCw,
    label: "Return Policy",
    detail:
      "Raise a return request within 7 days of delivery. Email brangelbusiness@gmail.com with your order number. Return shipping charges are borne by the customer.",
  },
  {
    icon: Package,
    label: "Refund Policy",
    detail:
      "Refunds are processed after the returned item is received and inspected. Credit within 5–7 business days to your original payment method.",
  },
  {
    icon: ArrowRight,
    label: "Exchange Policy",
    detail:
      "Exchanges within 7 days of delivery, processed once the original item is received. Size and colour swaps both supported. Return shipping charges apply.",
  },
];

/* ─── ACCORDION HELP CARD ────────────────────────────── */
function HelpCard({
  section,
  defaultOpen = false,
}: {
  section: (typeof HELP_SECTIONS)[0];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = section.icon;

  return (
    <div
      className="bg-card border border-border rounded-sm overflow-hidden"
      data-ocid={section.ocid}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid={`${section.ocid}.toggle`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
            <Icon size={18} strokeWidth={1.5} />
          </div>
          <span className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
            {section.title}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="px-6 pb-6"
        >
          <Separator className="mb-4" />
          <ul className="space-y-3">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(section.title)}`}
            className="mt-5 inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all duration-200"
          >
            <Mail size={12} /> Email Us About This
          </a>
        </motion.div>
      )}
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────── */
export default function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Contact Us | VE YRON";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── 1. PAGE HEADER ── */}
      <section
        className="relative py-20 lg:py-32 px-6 lg:px-12 bg-card border-b border-border overflow-hidden"
        data-ocid="contact.hero.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(var(--primary) / 0.09) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Customer Care
          </motion.p>
          <motion.h1
            className="font-display font-bold text-5xl md:text-7xl tracking-tight uppercase mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            CONTACT US
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We're here to help with your order, returns, or any questions about
            VE YRON.
          </motion.p>
        </div>
      </section>

      {/* ── 2. SUPPORT EMAIL CARD ── */}
      <section
        className="py-16 px-6 lg:px-12"
        data-ocid="contact.email.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-card border border-border rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                Get in Touch
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-2">
                Our Support Team
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                We respond within 24 hours, Monday–Saturday. Include your order
                number for faster help.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                data-ocid="contact.email.link"
                className="group flex items-center gap-3 text-primary"
              >
                <Mail size={18} strokeWidth={1.5} className="flex-shrink-0" />
                <span className="font-display font-semibold text-base tracking-wide underline underline-offset-4 decoration-primary/40 group-hover:decoration-primary transition-colors duration-200">
                  {SUPPORT_EMAIL}
                </span>
              </a>
              <Button
                type="button"
                data-ocid="contact.email.button"
                className="btn-luxury inline-flex items-center gap-2 w-full md:w-auto"
                onClick={() => {
                  window.location.href = `mailto:${SUPPORT_EMAIL}`;
                }}
              >
                <Mail size={15} strokeWidth={1.5} />
                Email Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. HOURS BANNER ── */}
      <section className="px-6 lg:px-12 pb-4" data-ocid="contact.hours.section">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/5 border border-primary/20 rounded-sm">
            <Clock size={16} className="text-primary flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">
              We respond within 24 hours,{" "}
              <span className="text-primary font-bold">Monday–Saturday</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. THREE HELP CARDS (accordion) ── */}
      <section
        className="py-16 px-6 lg:px-12 bg-muted/20 border-y border-border"
        data-ocid="contact.help.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
              How We Help
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              What Can We Assist With?
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {HELP_SECTIONS.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <HelpCard section={section} defaultOpen={i === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. POLICIES CARDS ── */}
      <section
        className="py-16 px-6 lg:px-12"
        data-ocid="contact.policies.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
              Good To Know
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Delivery &amp; Returns At a Glance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POLICIES.map((policy, i) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.label}
                  className="bg-card border border-border rounded-sm p-6"
                  data-ocid={`contact.policy.${i + 1}.card`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon size={15} strokeWidth={1.5} />
                    </div>
                    <p className="font-display font-bold text-sm uppercase tracking-widest text-foreground">
                      {policy.label}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {policy.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <Link
              to="/policies"
              data-ocid="contact.full_policies.link"
              className="inline-flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-80 transition-all duration-200"
            >
              Read Full Policies →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FOOTER CTA ── */}
      <section
        className="py-16 px-6 lg:px-12 bg-card border-t border-border"
        data-ocid="contact.cta.section"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display font-bold text-2xl tracking-tight mb-2">
              Still need help?
            </h3>
            <p className="text-muted-foreground text-sm">
              Email us at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-primary underline underline-offset-2 hover:opacity-80 transition-all duration-200"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              and we'll get back to you within 24 hours.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              type="button"
              data-ocid="contact.cta.email_button"
              className="btn-luxury inline-flex items-center gap-2"
              onClick={() => {
                window.location.href = `mailto:${SUPPORT_EMAIL}`;
              }}
            >
              <Mail size={15} strokeWidth={1.5} />
              Email Support
            </Button>
            <Button
              type="button"
              data-ocid="contact.cta.shop_button"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              onClick={() => navigate({ to: "/" })}
            >
              <ShoppingBag size={15} />
              Shop Now
              <ArrowRight size={13} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

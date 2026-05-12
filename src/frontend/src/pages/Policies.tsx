import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Ban,
  ChevronRight,
  Mail,
  Package,
  RefreshCcw,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import SEO from "../components/SEO";

interface PolicySection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const sections: PolicySection[] = [
  {
    id: "shipping",
    icon: <Truck size={22} strokeWidth={1.5} />,
    title: "Shipping Policy",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          VE YRON delivers across India. All orders are dispatched within{" "}
          <strong className="text-foreground">1–2 business days</strong> of
          payment confirmation. We currently offer{" "}
          <strong className="text-foreground">free standard shipping</strong> on
          all orders.
        </p>
        <p>
          Standard delivery takes{" "}
          <strong className="text-foreground">5–7 business days</strong> from
          the date of dispatch, depending on your location.
        </p>
        <ul className="space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <ChevronRight size={14} className="mt-0.5 text-primary shrink-0" />
            <span>
              Metro cities (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad,
              Kolkata): 3–5 business days
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight size={14} className="mt-0.5 text-primary shrink-0" />
            <span>Tier-2 &amp; Tier-3 cities: 5–7 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight size={14} className="mt-0.5 text-primary shrink-0" />
            <span>Remote &amp; Northeast India: 7–10 business days</span>
          </li>
        </ul>
        <p className="mt-3">
          You will receive a tracking link via email once your order is
          dispatched.
        </p>
      </div>
    ),
  },
  {
    id: "returns",
    icon: <RotateCcw size={22} strokeWidth={1.5} />,
    title: "Return Policy",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          We accept returns within a{" "}
          <strong className="text-foreground">7-day window</strong> from the
          date of delivery. Items must meet the following conditions:
        </p>
        <ul className="space-y-2 mt-2">
          {[
            "Unused and unworn",
            "Unwashed and in original condition",
            "All original tags attached and intact",
            "Original packaging included",
            "No signs of damage, stains, or odour",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <BadgeCheck size={14} className="mt-0.5 text-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          To initiate a return, contact us at{" "}
          <a
            href="mailto:brangelbusiness@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            brangelbusiness@gmail.com
          </a>{" "}
          within 7 days of delivery. Include your order number and reason for
          return.
        </p>
      </div>
    ),
  },
  {
    id: "return-shipping",
    icon: <AlertTriangle size={22} strokeWidth={1.5} />,
    title: "Return Shipping Charges",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <div className="bg-muted/60 border border-border rounded-sm px-4 py-3">
          <p className="text-foreground font-medium">
            Return shipping charges are borne by the customer.
          </p>
        </div>
        <p>
          Once your return request is raised, our team will guide you through
          the return process and arrange pickup. Please ensure the item is
          securely packed before handover.
        </p>
        <p>
          Once we receive and inspect the returned product, your refund or
          exchange will be processed promptly.
        </p>
      </div>
    ),
  },
  {
    id: "refunds",
    icon: <RefreshCcw size={22} strokeWidth={1.5} />,
    title: "Refund Policy",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          Refunds are processed only after the returned product has been
          received and inspected. Once approved, the refund will be credited to
          your{" "}
          <strong className="text-foreground">original payment method</strong>{" "}
          within <strong className="text-foreground">5–7 business days</strong>.
        </p>
        <ul className="space-y-2">
          {[
            "Products must pass quality inspection before a refund is approved",
            "Shipping charges (if any) are non-refundable",
            "Return shipping costs are not reimbursed",
            "Refund timelines may vary depending on your bank or payment provider",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ChevronRight
                size={14}
                className="mt-0.5 text-primary shrink-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "exchanges",
    icon: <Package size={22} strokeWidth={1.5} />,
    title: "Exchange Policy",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          We offer exchanges for a different size or colour within{" "}
          <strong className="text-foreground">7 days of delivery</strong>,
          subject to stock availability. Exchanges follow the same eligibility
          criteria as returns.
        </p>
        <p>
          The replacement product will be dispatched after we receive and verify
          the returned item.
        </p>
        <p>
          To request an exchange, write to{" "}
          <a
            href="mailto:brangelbusiness@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            brangelbusiness@gmail.com
          </a>{" "}
          with your order number, item details, and the size or colour you'd
          prefer.
        </p>
      </div>
    ),
  },
  {
    id: "cancellation",
    icon: <Ban size={22} strokeWidth={1.5} />,
    title: "Cancellation Policy",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          Orders can be cancelled{" "}
          <strong className="text-foreground">before dispatch only</strong>.
          Contact us immediately at{" "}
          <a
            href="mailto:brangelbusiness@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            brangelbusiness@gmail.com
          </a>{" "}
          or reply to your order confirmation email.
        </p>
        <div className="bg-muted/60 border border-border rounded-sm px-4 py-3">
          <p className="text-foreground font-medium">
            Once an order has been dispatched, cancellation is not possible.
          </p>
        </div>
        <p>
          If your order has already shipped, you may initiate a return once
          delivered, subject to our Return Policy above.
        </p>
      </div>
    ),
  },
  {
    id: "privacy",
    icon: <Shield size={22} strokeWidth={1.5} />,
    title: "Privacy Policy",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          VE YRON collects personal information — including your name, email,
          phone number, and delivery address — solely for the purpose of
          processing and fulfilling your order.
        </p>
        <ul className="space-y-2">
          {[
            "Your data is used exclusively for order processing and delivery",
            "We share your details with Shopify only to facilitate payment and fulfilment",
            "Your information is never sold or shared with any third party for marketing",
            "We do not store payment or card details — all transactions are handled by Shopify",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <BadgeCheck size={14} className="mt-0.5 text-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          By placing an order, you consent to the collection and use of your
          information as described. For privacy concerns, contact{" "}
          <a
            href="mailto:brangelbusiness@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            brangelbusiness@gmail.com
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    icon: <Mail size={22} strokeWidth={1.5} />,
    title: "Contact & Support",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          For all queries — orders, returns, exchanges, refunds, or general
          support — reach us at:
        </p>
        <a
          href="mailto:brangelbusiness@gmail.com"
          data-ocid="policies.support_email.link"
          className="inline-flex items-center gap-2 mt-1 px-4 py-3 bg-card border border-border rounded-sm text-foreground font-medium text-sm hover:border-primary transition-colors duration-200"
        >
          <Mail size={16} strokeWidth={1.5} className="text-primary" />
          brangelbusiness@gmail.com
        </a>
        <p>
          We aim to respond to all enquiries within{" "}
          <strong className="text-foreground">24 hours</strong>,
          Monday–Saturday. Please include your order number for faster
          assistance.
        </p>
      </div>
    ),
  },
];

export default function Policies() {
  <SEO
    title="Shipping & Return Policy | VE YRON"
    description="VE YRON's shipping, returns, refunds, and exchange policies. Free delivery across India. 7-day return window."
  />;
  return (
    <div data-ocid="policies.page" className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <Link
            to="/"
            data-ocid="policies.back.link"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 mb-10"
          >
            <ArrowLeft size={12} />
            Home
          </Link>
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-primary mb-3">
            VE YRON
          </p>
          <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight text-foreground leading-none">
            Our
            <br />
            Policies
          </h1>
          <p className="mt-6 max-w-lg text-sm text-muted-foreground leading-relaxed">
            Transparency is part of our standard. Everything you need to know
            about shipping, returns, refunds, and your privacy — clearly stated,
            no fine print.
          </p>
          <p className="mt-3 text-[11px] text-muted-foreground/60">
            Last updated: May 2026
          </p>
        </div>
      </section>

      {/* Quick-jump nav */}
      <section className="sticky top-[60px] md:top-[72px] z-30 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-ocid={`policies.${s.id}.nav`}
                className="shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors duration-200 whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Policy sections */}
      <section className="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div
              key={section.id}
              id={section.id}
              data-ocid={`policies.${section.id}.section`}
              className={`rounded-sm border border-border p-6 md:p-8 ${
                i % 2 === 0 ? "bg-card" : "bg-background"
              } scroll-mt-28`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                  {section.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight text-foreground mt-0.5">
                    {section.title}
                  </h2>
                </div>
              </div>
              <div className="pl-0 md:pl-14">{section.content}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-ocid="policies.cta.section"
          className="mt-12 bg-card border border-border rounded-sm p-8 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
            Still have questions?
          </p>
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
            We're here to help
          </h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
            Our support team responds within 24 hours, Monday–Saturday.
          </p>
          <a
            href="mailto:brangelbusiness@gmail.com"
            data-ocid="policies.cta.email.link"
            className="btn-luxury inline-flex items-center gap-2 mt-6"
          >
            <Mail size={14} strokeWidth={2} />
            brangelbusiness@gmail.com
          </a>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              to="/shop"
              data-ocid="policies.cta.shop.link"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Shop Now
            </Link>
            <span className="text-border">·</span>
            <Link
              to="/contact"
              data-ocid="policies.cta.contact.link"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

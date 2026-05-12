import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Mail, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import {
  type GenderCategory,
  NAV_CATEGORIES,
  type NavCategory,
  type SubCategory,
} from "../types/product";
import CartDrawer from "./CartDrawer";

// ─── Mapping helpers: translate nav types → Shop URL params ──
// Shop.tsx uses SubKey ('trackpants'|'shorts'|'plus-trackpants'|'plus-shorts')
// and TabKey ('mens'|'womens'|'plus') in URL params.
function subCategoryToSubKey(sub: SubCategory): string {
  if (sub.includes("plus-trackpants")) return "plus-trackpants";
  if (sub.includes("plus-shorts")) return "plus-shorts";
  if (sub.includes("trackpants")) return "trackpants";
  if (sub.includes("shorts")) return "shorts";
  return "trackpants";
}
function genderCategoryToTabKey(gc: GenderCategory): string {
  if (gc === "plus-mens" || gc === "plus-womens") return "plus";
  return gc; // 'mens' | 'womens' pass through unchanged
}

// ─── Desktop dropdown item ─────────────────────────────────────────────────────

function NavDropdown({
  cat,
  onClose,
}: { cat: NavCategory; onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[100]">
      <div className="bg-card border border-border shadow-xl rounded-sm min-w-[240px] py-2">
        {cat.sub.map((item) => (
          <Link
            key={item.subCategory}
            to="/shop"
            search={
              {
                sub: subCategoryToSubKey(item.subCategory),
                gender: genderCategoryToTabKey(item.genderCategory),
              } as never
            }
            onClick={onClose}
            data-ocid={`nav.dropdown.${item.subCategory}.link`}
            className="block px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main Layout ───────────────────────────────────────────────────────────────

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((s) =>
    s.items.reduce((a, i) => a + i.quantity, 0),
  );
  const openCart = useCartStore((s) => s.openCart);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouterState();
  const isHome = router.location.pathname === "/";

  // Sticky header scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerBg =
    scrolled || !isHome
      ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
      : "bg-transparent border-b border-transparent";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[72px]">
            {/* Desktop nav left */}
            <nav
              ref={dropdownRef}
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_CATEGORIES.map((cat) => (
                <div key={cat.label} className="relative">
                  <button
                    type="button"
                    data-ocid={`nav.${cat.genderCategory}.toggle`}
                    onMouseEnter={() => setActiveDropdown(cat.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() =>
                      setActiveDropdown((a) =>
                        a === cat.label ? null : cat.label,
                      )
                    }
                    className={`flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 rounded-sm ${
                      activeDropdown === cat.label
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.label}
                    <ChevronDown
                      size={10}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${
                        activeDropdown === cat.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === cat.label && (
                    <div
                      onMouseEnter={() => setActiveDropdown(cat.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <NavDropdown
                        cat={cat}
                        onClose={() => setActiveDropdown(null)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo centered */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/" data-ocid="nav.logo.link" aria-label="VE YRON Home">
                <span className="font-display font-black text-xl md:text-2xl tracking-[0.35em] uppercase text-foreground">
                  VE YRON
                </span>
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={logout}
                  aria-label="Log out"
                  data-ocid="nav.logout.button"
                  className="hidden md:flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-[11px] font-bold uppercase tracking-widest"
                >
                  <User size={16} strokeWidth={1.5} />
                  Account
                </button>
              ) : (
                <Link
                  to="/login"
                  data-ocid="nav.login.link"
                  className="hidden md:flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-[11px] font-bold uppercase tracking-widest"
                >
                  <User size={16} strokeWidth={1.5} />
                  Login
                </Link>
              )}

              <button
                type="button"
                onClick={openCart}
                aria-label="Open cart"
                data-ocid="nav.cart.button"
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-black rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* Premium hamburger button */}
              <button
                type="button"
                className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                data-ocid="nav.mobile_menu.toggle"
              >
                {mobileOpen ? (
                  <X size={20} strokeWidth={1.5} />
                ) : (
                  <div className="flex flex-col gap-[5px] w-5">
                    <span
                      className="block h-[2px] w-full rounded-full transition-all duration-300 group-hover:bg-primary"
                      style={{ backgroundColor: "currentColor" }}
                    />
                    <span
                      className="block h-[2px] rounded-full transition-all duration-300 group-hover:bg-primary"
                      style={{ backgroundColor: "currentColor", width: "70%" }}
                    />
                    <span
                      className="block h-[2px] w-full rounded-full transition-all duration-300 group-hover:bg-primary"
                      style={{ backgroundColor: "currentColor" }}
                    />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile slide-in drawer */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 z-[35] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
              role="presentation"
              aria-hidden="true"
            />
            {/* Side drawer */}
            <div
              className="md:hidden fixed inset-y-0 left-0 z-40 flex flex-col overflow-hidden"
              style={{
                width: "min(85vw, 380px)",
                background: "#080808",
                borderRight: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "4px 0 32px rgba(0,0,0,0.7)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5 shrink-0"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
              >
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile_drawer.logo.link"
                  aria-label="VE YRON Home"
                >
                  <span
                    className="font-display font-black text-xl tracking-[0.35em] uppercase"
                    style={{ color: "#fff" }}
                  >
                    VE YRON
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  data-ocid="nav.mobile_drawer.close_button"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-muted"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav items */}
              <nav
                className="flex-1 overflow-y-auto px-4 py-4"
                aria-label="Mobile navigation"
              >
                {NAV_CATEGORIES.map((cat) => (
                  <div
                    key={cat.label}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <button
                      type="button"
                      data-ocid={`nav.mobile.${cat.genderCategory}.toggle`}
                      className="w-full flex items-center justify-between py-4 text-xl font-display font-black uppercase tracking-widest transition-colors duration-200"
                      style={{
                        color:
                          expandedMobile === cat.label
                            ? "#d4af37"
                            : "rgba(255,255,255,0.85)",
                      }}
                      onClick={() =>
                        setExpandedMobile((e) =>
                          e === cat.label ? null : cat.label,
                        )
                      }
                    >
                      {cat.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMobile === cat.label ? "rotate-180" : ""
                        }`}
                        style={{ color: "rgba(212,175,55,0.7)" }}
                      />
                    </button>
                    {expandedMobile === cat.label && (
                      <div className="pb-3 pl-2 flex flex-col gap-0.5">
                        {cat.sub.map((item) => (
                          <Link
                            key={item.subCategory}
                            to="/shop"
                            search={
                              {
                                sub: subCategoryToSubKey(item.subCategory),
                                gender: genderCategoryToTabKey(
                                  item.genderCategory,
                                ),
                              } as never
                            }
                            onClick={() => {
                              setMobileOpen(false);
                              setExpandedMobile(null);
                            }}
                            data-ocid={`nav.mobile.${item.subCategory}.link`}
                            className="flex items-center gap-2.5 py-2.5 px-3 text-[13px] font-semibold uppercase tracking-widest transition-colors duration-200 rounded-sm group"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            <span
                              className="w-[3px] h-4 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{ backgroundColor: "#d4af37" }}
                            />
                            <span className="group-hover:text-[#d4af37] transition-colors duration-200">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  to="/shop"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile.all.link"
                  className="block py-4 text-xl font-display font-black uppercase tracking-widest transition-colors duration-200"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  All Products
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile.contact.link"
                  className="block py-4 text-xl font-display font-black uppercase tracking-widest transition-colors duration-200"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  Contact
                </Link>
              </nav>

              {/* Drawer bottom */}
              <div
                className="shrink-0 px-5 py-5"
                style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
              >
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    data-ocid="nav.mobile.logout.button"
                    className="w-full border text-xs font-bold uppercase tracking-widest py-3 rounded-sm transition-colors duration-200"
                    style={{
                      borderColor: "rgba(212,175,55,0.3)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.mobile.login.link"
                    className="block w-full text-center text-xs font-bold uppercase tracking-widest py-3.5 rounded-sm transition-opacity duration-200 hover:opacity-90"
                    style={{
                      backgroundColor: "#d4af37",
                      color: "#0a0a0a",
                    }}
                  >
                    Sign In
                  </Link>
                )}
                <p
                  className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: "rgba(212,175,55,0.35)" }}
                >
                  VE YRON &mdash; Built for Excellence
                </p>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-[#888]">
        {/* Brand banner */}
        <div className="border-b border-[#1e1e1e]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-14 md:py-20">
            <p className="font-display font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.1] max-w-3xl">
              Built for excellence.
              <br />
              <span style={{ color: "#d4af37" }}>Owned by few.</span>
            </p>
            <p
              className="mt-6 text-sm md:text-base leading-relaxed max-w-xl"
              style={{ color: "#666" }}
            >
              VE YRON was crafted for the elite. For top athletes, champions,
              and those who refuse to be ordinary. Every piece is engineered for
              those who push beyond limits and demand nothing less than
              excellence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                data-ocid="footer.shop_cta.link"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: "#d4af37", color: "#0a0a0a" }}
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                data-ocid="footer.contact_cta.link"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm border transition-colors duration-200"
                style={{ borderColor: "rgba(212,175,55,0.35)", color: "#aaa" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-1 space-y-5">
              <span className="font-display font-black text-2xl tracking-[0.3em] uppercase text-white block">
                VE YRON
              </span>
              <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
                Premium unisex activewear. Built for performance. Designed for
                life. Made in India.
              </p>
            </div>

            {/* Shop col */}
            <div>
              <h3
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                style={{ color: "#d4af37" }}
              >
                Shop
              </h3>
              <ul className="space-y-3 text-xs">
                {[
                  {
                    label: "Men's Trackpants",
                    sub: "trackpants",
                    gender: "mens",
                  },
                  { label: "Men's Shorts", sub: "shorts", gender: "mens" },
                  {
                    label: "Women's Trackpants",
                    sub: "trackpants",
                    gender: "womens",
                  },
                  {
                    label: "Women's Shorts",
                    sub: "shorts",
                    gender: "womens",
                  },
                  {
                    label: "Plus Size",
                    sub: "plus-trackpants",
                    gender: "plus",
                  },
                ].map((item) => (
                  <li key={item.sub}>
                    <Link
                      to="/shop"
                      search={{ sub: item.sub, gender: item.gender } as never}
                      data-ocid={`footer.${item.sub}.link`}
                      className="transition-colors duration-200 hover:text-white"
                      style={{ color: "#555" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help col */}
            <div>
              <h3
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                style={{ color: "#d4af37" }}
              >
                Help
              </h3>
              <ul className="space-y-3 text-xs">
                {[
                  { label: "Shipping Info", to: "/policies" },
                  { label: "Returns & Exchanges", to: "/policies" },
                  { label: "Size Guide", to: "/shop" },
                  { label: "Contact Us", to: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to as "/policies" | "/shop" | "/contact"}
                      data-ocid={`footer.help.${item.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                      className="transition-colors duration-200 hover:text-white"
                      style={{ color: "#555" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal col */}
            <div>
              <h3
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                style={{ color: "#d4af37" }}
              >
                Legal
              </h3>
              <ul className="space-y-3 text-xs">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Refund Policy",
                  "Cookie Policy",
                ].map((label) => (
                  <li key={label}>
                    <Link
                      to="/policies"
                      data-ocid={`footer.legal.${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
                      className="transition-colors duration-200 hover:text-white"
                      style={{ color: "#555" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t" style={{ borderColor: "#141414" }}>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <div
              className="flex flex-col md:flex-row items-center gap-4 text-[11px]"
              style={{ color: "#333" }}
            >
              <span>
                &copy; {new Date().getFullYear()} VE YRON. All rights reserved.
              </span>
              <span className="hidden md:inline" style={{ color: "#222" }}>
                |
              </span>
              <a
                href="mailto:brangelbusiness@gmail.com"
                data-ocid="footer.support_email.link"
                className="flex items-center gap-1.5 hover:text-[#888] transition-colors duration-200"
              >
                <Mail size={11} strokeWidth={1.5} /> brangelbusiness@gmail.com
              </a>
              <span className="hidden md:inline" style={{ color: "#222" }}>
                |
              </span>
              <span>
                Manufacturing and marketed by Brangel Conglomerate, India
              </span>
            </div>
            <p className="text-[11px]" style={{ color: "#2a2a2a" }}>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#666] transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}

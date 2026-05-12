import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AlertCircle, ChevronDown, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { formatPrice, getProductPrice } from "../data/products";
import { useAllProducts } from "../hooks/useShopifyProducts";
import type {
  GenderCategory,
  Product,
  ProductCategory,
} from "../types/product";

// ─── Constants ───────────────────────────────────────────────────────────────

type TabKey = "mens" | "womens" | "plus";
type SubKey = "trackpants" | "plus-trackpants" | "shorts" | "plus-shorts";
type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

interface SubPillDef {
  label: string;
  subKey: SubKey;
  // The exact genderCategory values this sub maps to
  genderCategories: GenderCategory[];
  // productCategory filter
  productCategory: ProductCategory;
}

// Sub-pills for each top-level tab
const MENS_SUBS: SubPillDef[] = [
  {
    label: "Trackpants",
    subKey: "trackpants",
    genderCategories: ["mens"],
    productCategory: "trackpants",
  },
  {
    label: "Shorts",
    subKey: "shorts",
    genderCategories: ["mens"],
    productCategory: "shorts",
  },
  {
    label: "Plus Size Trackpants",
    subKey: "plus-trackpants",
    genderCategories: ["plus-mens"],
    productCategory: "trackpants",
  },
  {
    label: "Plus Size Shorts",
    subKey: "plus-shorts",
    genderCategories: ["plus-mens"],
    productCategory: "shorts",
  },
];

const WOMENS_SUBS: SubPillDef[] = [
  {
    label: "Trackpants",
    subKey: "trackpants",
    genderCategories: ["womens"],
    productCategory: "trackpants",
  },
  {
    label: "Shorts",
    subKey: "shorts",
    genderCategories: ["womens"],
    productCategory: "shorts",
  },
  {
    label: "Plus Size Trackpants",
    subKey: "plus-trackpants",
    genderCategories: ["plus-womens"],
    productCategory: "trackpants",
  },
  {
    label: "Plus Size Shorts",
    subKey: "plus-shorts",
    genderCategories: ["plus-womens"],
    productCategory: "shorts",
  },
];

// PLUS SIZE tab: shows all plus-size products split by gender+category
// Uses a special 'all-plus' sub to show everything, or filtered by gender
type PlusSubKey = SubKey | "all-plus-mens" | "all-plus-womens";
const PLUS_SUBS: SubPillDef[] = [
  {
    label: "Men's Trackpants",
    subKey: "trackpants",
    genderCategories: ["plus-mens"],
    productCategory: "trackpants",
  },
  {
    label: "Men's Shorts",
    subKey: "shorts",
    genderCategories: ["plus-mens"],
    productCategory: "shorts",
  },
  {
    label: "Women's Trackpants",
    subKey: "plus-trackpants",
    genderCategories: ["plus-womens"],
    productCategory: "trackpants",
  },
  {
    label: "Women's Shorts",
    subKey: "plus-shorts",
    genderCategories: ["plus-womens"],
    productCategory: "shorts",
  },
];
// Suppress unused type warning
type _PlusSubKey = PlusSubKey;

// ─── Cross-sell Section ────────────────────────────────────────────────────────

const ATHLETE_QUOTES = [
  { text: "Train harder than your excuses.", attr: "VE YRON" },
  {
    text: "Excellence is not a skill. It is an attitude.",
    attr: "Ralph Marston",
  },
  { text: "Champions are not born. They are built.", attr: "VE YRON" },
  {
    text: "Your only competition is who you were yesterday.",
    attr: "VE YRON",
  },
];

function CrossSellSection({
  activeTab,
  activeSubDef,
  allProducts,
}: {
  activeTab: TabKey;
  activeSubDef: SubPillDef;
  allProducts: Product[];
}) {
  // Show 4 products from the OTHER category (same gender tab)
  // If viewing trackpants → show shorts; if viewing shorts → show trackpants
  const oppositeCategory: ProductCategory =
    activeSubDef.productCategory === "trackpants" ? "shorts" : "trackpants";

  const crossSellProducts = allProducts
    .filter((p) => {
      // For plus tab: show opposite category from both plus-mens and plus-womens
      if (activeTab === "plus") {
        return (
          (p.genderCategory === "plus-mens" ||
            p.genderCategory === "plus-womens") &&
          p.category === oppositeCategory
        );
      }
      // For mens/womens: same gender, opposite category (including plus)
      const genders: GenderCategory[] =
        activeTab === "mens"
          ? ["mens", "plus-mens"]
          : ["womens", "plus-womens"];
      return (
        genders.includes(p.genderCategory) && p.category === oppositeCategory
      );
    })
    .slice(0, 4);

  if (crossSellProducts.length === 0) return null;

  const categoryLabel =
    oppositeCategory === "trackpants" ? "TRACKPANTS" : "SHORTS";
  // Pick 2 quotes deterministically
  const quote1 = ATHLETE_QUOTES[0];
  const quote2 = ATHLETE_QUOTES[2];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65 }}
      className="mt-16 md:mt-24"
      data-ocid="shop.crosssell.section"
    >
      {/* Quotes block */}
      <div
        className="relative overflow-hidden rounded-sm py-16 px-6 md:px-12 mb-12"
        style={{
          background:
            "linear-gradient(160deg, #080808 0%, #0e0e0e 50%, #080808 100%)",
          border: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto flex flex-col gap-10">
          {[quote1, quote2].map((q, i) => (
            <motion.blockquote
              key={q.text}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.18 }}
              className="text-center"
            >
              <p
                className="font-display font-black uppercase leading-tight text-white mb-3"
                style={{ fontSize: "clamp(1.15rem, 2.8vw, 2rem)" }}
              >
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-3">
                <span
                  className="h-px w-6"
                  style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
                />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.35em]"
                  style={{ color: "rgba(212,175,55,0.7)" }}
                >
                  {q.attr}
                </span>
                <span
                  className="h-px w-6"
                  style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
                />
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>

      {/* Cross-sell products */}
      <div className="mb-6 flex items-baseline gap-3">
        <h2 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
          Complete the Look
        </h2>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
          {categoryLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {crossSellProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
            data-ocid={`shop.crosssell.item.${idx + 1}`}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

const TABS: { label: string; key: TabKey }[] = [
  { label: "Men's", key: "mens" },
  { label: "Women's", key: "womens" },
  { label: "Plus Size", key: "plus" },
];

const TAB_SUBS: Record<TabKey, SubPillDef[]> = {
  mens: MENS_SUBS,
  womens: WOMENS_SUBS,
  plus: PLUS_SUBS,
};

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isTabKey(v: unknown): v is TabKey {
  return v === "mens" || v === "womens" || v === "plus";
}

function isSubKey(v: unknown): v is SubKey {
  return (
    v === "trackpants" ||
    v === "plus-trackpants" ||
    v === "shorts" ||
    v === "plus-shorts"
  );
}

function getMinPrice(p: Product): number {
  return getProductPrice(p);
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const arr = [...products];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => getMinPrice(a) - getMinPrice(b));
    case "price-desc":
      return arr.sort((a, b) => getMinPrice(b) - getMinPrice(a));
    case "newest":
      return arr.reverse();
    default:
      return arr;
  }
}

/**
 * Core filter: given a tab + sub pill definition, filter products.
 * Uses genderCategory AND category (ProductCategory) — NEVER subCategory string.
 * This ensures women products never bleed into men tab.
 */
function filterProducts(
  allProducts: Product[],
  _tab: TabKey,
  subDef: SubPillDef,
): Product[] {
  return allProducts.filter((p) => {
    const genderMatch = subDef.genderCategories.includes(p.genderCategory);
    const categoryMatch = p.category === subDef.productCategory;
    return genderMatch && categoryMatch;
  });
}

function getHeading(tab: TabKey, subDef: SubPillDef): string {
  if (tab === "plus") {
    return `Plus Size · ${subDef.label}`.toUpperCase();
  }
  const tabLabel = tab === "mens" ? "Men's" : "Women's";
  return `${tabLabel} ${subDef.label}`.toUpperCase();
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────

function SortDropdown({
  value,
  onChange,
}: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const label =
    SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Featured";

  return (
    <div className="relative">
      <button
        type="button"
        data-ocid="shop.sort.select"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-widest border border-border bg-card text-foreground hover:border-primary transition-colors duration-200 rounded-sm"
      >
        {label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            role="presentation"
          />
          <div
            className="absolute right-0 top-full mt-1 z-20 bg-card border border-border shadow-lg min-w-[190px] rounded-sm"
            data-ocid="shop.sort.dropdown_menu"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                data-ocid={`shop.sort.${opt.value}.button`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 ${
                  value === opt.value
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
        <div key={i} className="space-y-3" data-ocid="shop.loading_state">
          <Skeleton
            className="w-full bg-muted rounded-none"
            style={{ aspectRatio: "1/1" }}
          />
          <Skeleton className="h-3.5 w-4/5 bg-muted rounded-none" />
          <Skeleton className="h-3.5 w-1/2 bg-muted rounded-none" />
        </div>
      ))}
    </div>
  );
}

// ─── Product Card (inline) ────────────────────────────────────────────────────

function ShopProductCard({
  product,
  index,
}: { product: Product; index: number }) {
  const img = product.images[0];
  const img2 = product.images[1];
  const isAvailable = product.variants.some((v) => v.available);
  const price = getMinPrice(product);

  return (
    <Link
      to="/products/$handle"
      params={{ handle: product.handle }}
      data-ocid={`shop.item.${index + 1}`}
      className="group block bg-card border border-border hover:border-primary transition-all duration-300 rounded-sm overflow-hidden"
    >
      <div
        className="relative w-full overflow-hidden bg-muted"
        style={{ aspectRatio: "1/1" }}
      >
        {img ? (
          <>
            <img
              src={img.src}
              alt={img.alt || product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                img2 ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
              }`}
              loading="lazy"
            />
            {img2 && (
              <img
                src={img2.src}
                alt={img2.alt}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              No Image
            </span>
          </div>
        )}

        {!isAvailable && (
          <div className="absolute inset-0 bg-background/65 flex items-end justify-start p-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Sold Out
            </span>
          </div>
        )}

        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant="secondary"
              className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-none"
            >
              {product.badge === "new-arrival"
                ? "NEW"
                : product.badge === "limited-edition"
                  ? "LIMITED"
                  : "BESTSELLER"}
            </Badge>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/15 transition-colors duration-300 flex items-end justify-center pb-4">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-foreground bg-card/90 px-3 py-1.5">
            View
          </span>
        </div>
      </div>

      <div className="px-3 pt-3 pb-4">
        <h3
          className="text-sm font-semibold leading-snug text-foreground"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </h3>
        <p className="mt-1.5 text-base font-bold">
          {price > 0 ? (
            <>
              <span style={{ color: "#d4af37" }}>{formatPrice(price)}</span>
              {product.compareAtPrice && product.compareAtPrice > price && (
                <span className="ml-2 text-xs font-normal text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground text-xs">
              Price unavailable
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

// ─── Main Shop Page ───────────────────────────────────────────────────────────

export default function Shop() {
  const rawSearch = useSearch({ from: "/shop" }) as {
    gender?: string;
    sub?: string;
  };
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOption>("featured");

  // Resolve active tab — default to "mens"
  const activeTab: TabKey = isTabKey(rawSearch.gender)
    ? rawSearch.gender
    : "mens";

  // Sub pills for the active tab
  const subPills = TAB_SUBS[activeTab];

  // Resolve active sub pill — default to first pill of the active tab
  const defaultSubKey = subPills[0].subKey;
  const activeSubKey: SubKey = isSubKey(rawSearch.sub)
    ? rawSearch.sub
    : defaultSubKey;

  // Find the matching SubPillDef for the active sub within the current tab's pills
  const activeSubDef =
    subPills.find((p) => p.subKey === activeSubKey) ?? subPills[0];

  const { products: allProducts, isLoading, error } = useAllProducts();

  // ── CRITICAL filter: use genderCategory + category, NEVER subCategory string ──
  const filteredProducts = useMemo(
    () => filterProducts(allProducts, activeTab, activeSubDef),
    [allProducts, activeTab, activeSubDef],
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort],
  );

  // Breadcrumb JSON-LD for SEO
  useEffect(() => {
    for (const s of document.querySelectorAll("script[data-veyron-shop-ld]"))
      s.remove();
    const tabLabels: Record<TabKey, string> = {
      mens: "Men's",
      womens: "Women's",
      plus: "Plus Size",
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://veyron.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tabLabels[activeTab],
          item: `https://veyron.in/shop?gender=${activeTab}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: activeSubDef.label,
          item: `https://veyron.in/shop?gender=${activeTab}&sub=${activeSubDef.subKey}`,
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-veyron-shop-ld", "true");
    script.textContent = JSON.stringify(breadcrumb);
    document.head.appendChild(script);
    return () => {
      for (const s of document.querySelectorAll("script[data-veyron-shop-ld]"))
        s.remove();
    };
  }, [activeTab, activeSubDef]);

  // Navigation helpers
  function handleTabClick(tab: TabKey) {
    const firstSub = TAB_SUBS[tab][0].subKey;
    navigate({ to: "/shop", search: { gender: tab, sub: firstSub } });
  }

  function handleSubClick(subKey: SubKey) {
    navigate({ to: "/shop", search: { gender: activeTab, sub: subKey } });
  }

  const heading = getHeading(activeTab, activeSubDef);

  return (
    <div className="bg-background min-h-screen" data-ocid="shop.page">
      <SEO
        title={
          activeTab === "mens"
            ? "Men's Activewear | Trackpants & Shorts | VE YRON"
            : activeTab === "womens"
              ? "Women's Activewear | Trackpants & Shorts | VE YRON"
              : "Plus Size Activewear | VE YRON"
        }
        description={
          activeTab === "mens"
            ? "Shop VE YRON men's premium trackpants and shorts. Luxury activewear built for performance."
            : activeTab === "womens"
              ? "Shop VE YRON women's premium trackpants and shorts. Luxury activewear built for performance."
              : "Shop VE YRON plus size trackpants and shorts for men and women. Sizes 2XL–5XL."
        }
      />
      {/* ── Top gender tabs (sticky below site header) ── */}
      <div className="sticky top-[60px] md:top-[72px] z-30 bg-card border-b border-border shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <nav
            className="flex overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Gender categories"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-ocid={`shop.${tab.key}.tab`}
                  onClick={() => handleTabClick(tab.key)}
                  className={`flex-shrink-0 flex items-center px-5 md:px-8 h-12 text-[11px] font-black uppercase tracking-[0.18em] border-b-2 transition-all duration-200 ${
                    isActive
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Subcategory pills ── */}
      <div className="border-b border-border bg-background">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div
            className="flex overflow-x-auto gap-2 py-3 no-scrollbar"
            role="tablist"
            aria-label="Subcategories"
          >
            {subPills.map((pill) => {
              const isActive = activeSubKey === pill.subKey;
              const count = allProducts.filter(
                (p) =>
                  pill.genderCategories.includes(p.genderCategory) &&
                  p.category === pill.productCategory,
              ).length;
              return (
                <button
                  key={`${activeTab}-${pill.subKey}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  data-ocid={`shop.sub.${activeTab}-${pill.subKey}.tab`}
                  onClick={() => handleSubClick(pill.subKey)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 h-8 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 rounded-full ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pill.label}
                  {count > 0 && (
                    <span
                      className={`text-[9px] font-bold tabular-nums ${
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-7 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-2">
                VE YRON
              </p>
              <h1
                className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-foreground"
                data-ocid="shop.heading"
              >
                {heading}
              </h1>
              {!isLoading && (
                <p className="mt-2 text-xs text-muted-foreground tracking-widest">
                  {sortedProducts.length} Product
                  {sortedProducts.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-10">
        {isLoading ? (
          <SkeletonGrid />
        ) : error ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center gap-4"
            data-ocid="shop.error_state"
          >
            <AlertCircle
              size={32}
              className="text-muted-foreground"
              strokeWidth={1.5}
            />
            <p className="text-base font-display font-black uppercase tracking-tight text-foreground">
              Unable to Load Products
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Something went wrong connecting to the store. Please try again.
            </p>
            <Button
              variant="outline"
              size="sm"
              data-ocid="shop.retry.button"
              onClick={() => window.location.reload()}
              className="mt-2 gap-2 uppercase text-[10px] tracking-widest font-bold rounded-none"
            >
              <RefreshCw size={12} /> Retry
            </Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center gap-0"
            data-ocid="shop.empty_state"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            {/* Premium launching soon banner */}
            <div
              className="w-full max-w-2xl mx-auto relative overflow-hidden rounded-sm py-20 px-8"
              style={{
                background:
                  "linear-gradient(160deg, #080808 0%, #0e0e0e 50%, #080808 100%)",
                border: "1px solid rgba(212,175,55,0.12)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Gold ornament */}
                <div className="flex items-center gap-4">
                  <span
                    className="h-px w-10"
                    style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
                  />
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.4em]"
                    style={{ color: "rgba(212,175,55,0.7)" }}
                  >
                    VE YRON
                  </span>
                  <span
                    className="h-px w-10"
                    style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
                  />
                </div>

                <h2
                  className="font-display font-black uppercase leading-none text-white"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                >
                  LAUNCHING SOON
                </h2>

                <p
                  className="text-sm max-w-sm mx-auto leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Something extraordinary is on its way.
                  <br />
                  Be the first to know.
                </p>

                <Link
                  to="/contact"
                  data-ocid="shop.empty.notify_me.link"
                  className="mt-2 inline-flex items-center gap-2 px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-200"
                  style={{
                    border: "1px solid rgba(212,175,55,0.4)",
                    color: "rgba(212,175,55,0.9)",
                  }}
                >
                  NOTIFY ME
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {sortedProducts.map((product, idx) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                />
              ))}
            </div>

            {/* ── "More Coming" banner — shows when 4 or fewer products ── */}
            {sortedProducts.length <= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="mt-12 relative overflow-hidden rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
                  border: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%)",
                  }}
                />
                <div className="relative px-8 py-14 text-center">
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
                    />
                    <span
                      className="text-[10px] font-black uppercase tracking-[0.4em]"
                      style={{ color: "rgba(212,175,55,0.7)" }}
                    >
                      VE YRON
                    </span>
                    <span
                      className="h-px w-8"
                      style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
                    />
                  </div>
                  <h3
                    className="font-display font-black uppercase text-white leading-tight mb-3"
                    style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)" }}
                  >
                    More Styles Dropping Soon
                  </h3>
                  <p
                    className="text-sm max-w-md mx-auto leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    New arrivals are added to the collection regularly. Follow
                    the craft — excellence in every drop.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <span
                      className="h-px w-6"
                      style={{ backgroundColor: "rgba(212,175,55,0.3)" }}
                    />
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.35em]"
                      style={{ color: "rgba(212,175,55,0.5)" }}
                    >
                      New Collection 2026
                    </span>
                    <span
                      className="h-px w-6"
                      style={{ backgroundColor: "rgba(212,175,55,0.3)" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Quotes + cross-sell section ── */}
            <CrossSellSection
              activeTab={activeTab}
              activeSubDef={activeSubDef}
              allProducts={allProducts}
            />
          </>
        )}
      </div>
    </div>
  );
}

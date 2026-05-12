import { c as createLucideIcon, u as useSearch, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, C as ChevronDown, S as Skeleton, f as formatPrice, g as getProductPrice } from "./index-DctbPH3p.js";
import { B as Badge } from "./badge-e9PJl5DX.js";
import { c as useAllProducts, S as SEO, P as ProductCard } from "./useShopifyProducts-DA3f9_pN.js";
import { R as RefreshCw } from "./refresh-cw-teI1veyr.js";
import { m as motion } from "./proxy-Cno1h6QO.js";
import "./shopify-CzRTDa7w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
const MENS_SUBS = [
  {
    label: "Trackpants",
    subKey: "trackpants",
    genderCategories: ["mens"],
    productCategory: "trackpants"
  },
  {
    label: "Shorts",
    subKey: "shorts",
    genderCategories: ["mens"],
    productCategory: "shorts"
  },
  {
    label: "Plus Size Trackpants",
    subKey: "plus-trackpants",
    genderCategories: ["plus-mens"],
    productCategory: "trackpants"
  },
  {
    label: "Plus Size Shorts",
    subKey: "plus-shorts",
    genderCategories: ["plus-mens"],
    productCategory: "shorts"
  }
];
const WOMENS_SUBS = [
  {
    label: "Trackpants",
    subKey: "trackpants",
    genderCategories: ["womens"],
    productCategory: "trackpants"
  },
  {
    label: "Shorts",
    subKey: "shorts",
    genderCategories: ["womens"],
    productCategory: "shorts"
  },
  {
    label: "Plus Size Trackpants",
    subKey: "plus-trackpants",
    genderCategories: ["plus-womens"],
    productCategory: "trackpants"
  },
  {
    label: "Plus Size Shorts",
    subKey: "plus-shorts",
    genderCategories: ["plus-womens"],
    productCategory: "shorts"
  }
];
const PLUS_SUBS = [
  {
    label: "Men's Trackpants",
    subKey: "trackpants",
    genderCategories: ["plus-mens"],
    productCategory: "trackpants"
  },
  {
    label: "Men's Shorts",
    subKey: "shorts",
    genderCategories: ["plus-mens"],
    productCategory: "shorts"
  },
  {
    label: "Women's Trackpants",
    subKey: "plus-trackpants",
    genderCategories: ["plus-womens"],
    productCategory: "trackpants"
  },
  {
    label: "Women's Shorts",
    subKey: "plus-shorts",
    genderCategories: ["plus-womens"],
    productCategory: "shorts"
  }
];
const ATHLETE_QUOTES = [
  { text: "Train harder than your excuses.", attr: "VE YRON" },
  {
    text: "Excellence is not a skill. It is an attitude.",
    attr: "Ralph Marston"
  },
  { text: "Champions are not born. They are built.", attr: "VE YRON" },
  {
    text: "Your only competition is who you were yesterday.",
    attr: "VE YRON"
  }
];
function CrossSellSection({
  activeTab,
  activeSubDef,
  allProducts
}) {
  const oppositeCategory = activeSubDef.productCategory === "trackpants" ? "shorts" : "trackpants";
  const crossSellProducts = allProducts.filter((p) => {
    if (activeTab === "plus") {
      return (p.genderCategory === "plus-mens" || p.genderCategory === "plus-womens") && p.category === oppositeCategory;
    }
    const genders = activeTab === "mens" ? ["mens", "plus-mens"] : ["womens", "plus-womens"];
    return genders.includes(p.genderCategory) && p.category === oppositeCategory;
  }).slice(0, 4);
  if (crossSellProducts.length === 0) return null;
  const categoryLabel = oppositeCategory === "trackpants" ? "TRACKPANTS" : "SHORTS";
  const quote1 = ATHLETE_QUOTES[0];
  const quote2 = ATHLETE_QUOTES[2];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.65 },
      className: "mt-16 md:mt-24",
      "data-ocid": "shop.crosssell.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden rounded-sm py-16 px-6 md:px-12 mb-12",
            style: {
              background: "linear-gradient(160deg, #080808 0%, #0e0e0e 50%, #080808 100%)",
              border: "1px solid rgba(212,175,55,0.1)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 65%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-3xl mx-auto flex flex-col gap-10", children: [quote1, quote2].map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.blockquote,
                {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.55, delay: i * 0.18 },
                  className: "text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-display font-black uppercase leading-tight text-white mb-3",
                        style: { fontSize: "clamp(1.15rem, 2.8vw, 2rem)" },
                        children: [
                          "“",
                          q.text,
                          "”"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex items-center justify-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "h-px w-6",
                          style: { backgroundColor: "rgba(212,175,55,0.4)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[9px] font-bold uppercase tracking-[0.35em]",
                          style: { color: "rgba(212,175,55,0.7)" },
                          children: q.attr
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "h-px w-6",
                          style: { backgroundColor: "rgba(212,175,55,0.4)" }
                        }
                      )
                    ] })
                  ]
                },
                q.text
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-xl uppercase tracking-tight text-foreground", children: "Complete the Look" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: categoryLabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4", children: crossSellProducts.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.4, delay: idx * 0.07 },
            "data-ocid": `shop.crosssell.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
          },
          product.id
        )) })
      ]
    }
  );
}
const TABS = [
  { label: "Men's", key: "mens" },
  { label: "Women's", key: "womens" },
  { label: "Plus Size", key: "plus" }
];
const TAB_SUBS = {
  mens: MENS_SUBS,
  womens: WOMENS_SUBS,
  plus: PLUS_SUBS
};
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" }
];
function isTabKey(v) {
  return v === "mens" || v === "womens" || v === "plus";
}
function isSubKey(v) {
  return v === "trackpants" || v === "plus-trackpants" || v === "shorts" || v === "plus-shorts";
}
function getMinPrice(p) {
  return getProductPrice(p);
}
function sortProducts(products, sort) {
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
function filterProducts(allProducts, _tab, subDef) {
  return allProducts.filter((p) => {
    const genderMatch = subDef.genderCategories.includes(p.genderCategory);
    const categoryMatch = p.category === subDef.productCategory;
    return genderMatch && categoryMatch;
  });
}
function getHeading(tab, subDef) {
  if (tab === "plus") {
    return `Plus Size · ${subDef.label}`.toUpperCase();
  }
  const tabLabel = tab === "mens" ? "Men's" : "Women's";
  return `${tabLabel} ${subDef.label}`.toUpperCase();
}
function SortDropdown({
  value,
  onChange
}) {
  var _a;
  const [open, setOpen] = reactExports.useState(false);
  const label = ((_a = SORT_OPTIONS.find((o) => o.value === value)) == null ? void 0 : _a.label) ?? "Featured";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "shop.sort.select",
        onClick: () => setOpen((o) => !o),
        className: "flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-widest border border-border bg-card text-foreground hover:border-primary transition-colors duration-200 rounded-sm",
        children: [
          label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 12,
              className: `transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 z-10",
          onClick: () => setOpen(false),
          onKeyDown: (e) => e.key === "Escape" && setOpen(false),
          role: "presentation"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute right-0 top-full mt-1 z-20 bg-card border border-border shadow-lg min-w-[190px] rounded-sm",
          "data-ocid": "shop.sort.dropdown_menu",
          children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `shop.sort.${opt.value}.button`,
              onClick: () => {
                onChange(opt.value);
                setOpen(false);
              },
              className: `w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 ${value === opt.value ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
              children: opt.label
            },
            opt.value
          ))
        }
      )
    ] })
  ] });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4", children: Array.from({ length: 12 }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "shop.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "w-full bg-muted rounded-none",
          style: { aspectRatio: "1/1" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-4/5 bg-muted rounded-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-1/2 bg-muted rounded-none" })
    ] }, i)
  )) });
}
function ShopProductCard({
  product,
  index
}) {
  const img = product.images[0];
  const img2 = product.images[1];
  const isAvailable = product.variants.some((v) => v.available);
  const price = getMinPrice(product);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/products/$handle",
      params: { handle: product.handle },
      "data-ocid": `shop.item.${index + 1}`,
      className: "group block bg-card border border-border hover:border-primary transition-all duration-300 rounded-sm overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full overflow-hidden bg-muted",
            style: { aspectRatio: "1/1" },
            children: [
              img ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img.src,
                    alt: img.alt || product.title,
                    className: `absolute inset-0 w-full h-full object-cover transition-all duration-500 ${img2 ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"}`,
                    loading: "lazy"
                  }
                ),
                img2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img2.src,
                    alt: img2.alt,
                    className: "absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    loading: "lazy"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "No Image" }) }),
              !isAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/65 flex items-end justify-start p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground", children: "Sold Out" }) }),
              product.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-none",
                  children: product.badge === "new-arrival" ? "NEW" : product.badge === "limited-edition" ? "LIMITED" : "BESTSELLER"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/0 group-hover:bg-background/15 transition-colors duration-300 flex items-end justify-center pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-foreground bg-card/90 px-3 py-1.5", children: "View" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pt-3 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-sm font-semibold leading-snug text-foreground",
              style: {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              },
              children: product.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-base font-bold", children: price > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#d4af37" }, children: formatPrice(price) }),
            product.compareAtPrice && product.compareAtPrice > price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-normal text-muted-foreground line-through", children: formatPrice(product.compareAtPrice) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Price unavailable" }) })
        ] })
      ]
    }
  );
}
function Shop() {
  const rawSearch = useSearch({ from: "/shop" });
  const navigate = useNavigate();
  const [sort, setSort] = reactExports.useState("featured");
  const activeTab = isTabKey(rawSearch.gender) ? rawSearch.gender : "mens";
  const subPills = TAB_SUBS[activeTab];
  const defaultSubKey = subPills[0].subKey;
  const activeSubKey = isSubKey(rawSearch.sub) ? rawSearch.sub : defaultSubKey;
  const activeSubDef = subPills.find((p) => p.subKey === activeSubKey) ?? subPills[0];
  const { products: allProducts, isLoading, error } = useAllProducts();
  const filteredProducts = reactExports.useMemo(
    () => filterProducts(allProducts, activeTab, activeSubDef),
    [allProducts, activeTab, activeSubDef]
  );
  const sortedProducts = reactExports.useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort]
  );
  reactExports.useEffect(() => {
    for (const s of document.querySelectorAll("script[data-veyron-shop-ld]"))
      s.remove();
    const tabLabels = {
      mens: "Men's",
      womens: "Women's",
      plus: "Plus Size"
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://veyron.in"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: tabLabels[activeTab],
          item: `https://veyron.in/shop?gender=${activeTab}`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: activeSubDef.label,
          item: `https://veyron.in/shop?gender=${activeTab}&sub=${activeSubDef.subKey}`
        }
      ]
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
  function handleTabClick(tab) {
    const firstSub = TAB_SUBS[tab][0].subKey;
    navigate({ to: "/shop", search: { gender: tab, sub: firstSub } });
  }
  function handleSubClick(subKey) {
    navigate({ to: "/shop", search: { gender: activeTab, sub: subKey } });
  }
  const heading = getHeading(activeTab, activeSubDef);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "shop.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: activeTab === "mens" ? "Men's Activewear | Trackpants & Shorts | VE YRON" : activeTab === "womens" ? "Women's Activewear | Trackpants & Shorts | VE YRON" : "Plus Size Activewear | VE YRON",
        description: activeTab === "mens" ? "Shop VE YRON men's premium trackpants and shorts. Luxury activewear built for performance." : activeTab === "womens" ? "Shop VE YRON women's premium trackpants and shorts. Luxury activewear built for performance." : "Shop VE YRON plus size trackpants and shorts for men and women. Sizes 2XL–5XL."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[60px] md:top-[72px] z-30 bg-card border-b border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1440px] mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "flex overflow-x-auto no-scrollbar",
        role: "tablist",
        "aria-label": "Gender categories",
        children: TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": isActive,
              "data-ocid": `shop.${tab.key}.tab`,
              onClick: () => handleTabClick(tab.key),
              className: `flex-shrink-0 flex items-center px-5 md:px-8 h-12 text-[11px] font-black uppercase tracking-[0.18em] border-b-2 transition-all duration-200 ${isActive ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"}`,
              children: tab.label
            },
            tab.key
          );
        })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1440px] mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex overflow-x-auto gap-2 py-3 no-scrollbar",
        role: "tablist",
        "aria-label": "Subcategories",
        children: subPills.map((pill) => {
          const isActive = activeSubKey === pill.subKey;
          const count = allProducts.filter(
            (p) => pill.genderCategories.includes(p.genderCategory) && p.category === pill.productCategory
          ).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": isActive,
              "data-ocid": `shop.sub.${activeTab}-${pill.subKey}.tab`,
              onClick: () => handleSubClick(pill.subKey),
              className: `flex-shrink-0 inline-flex items-center gap-1.5 px-4 h-8 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 rounded-full ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
              children: [
                pill.label,
                count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[9px] font-bold tabular-nums ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`,
                    children: count
                  }
                )
              ]
            },
            `${activeTab}-${pill.subKey}`
          );
        })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1440px] mx-auto px-4 md:px-8 py-7 md:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-2", children: "VE YRON" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-black text-3xl md:text-5xl uppercase tracking-tight text-foreground",
            "data-ocid": "shop.heading",
            children: heading
          }
        ),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground tracking-widest", children: [
          sortedProducts.length,
          " Product",
          sortedProducts.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SortDropdown, { value: sort, onChange: setSort })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center gap-4",
        "data-ocid": "shop.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              size: 32,
              className: "text-muted-foreground",
              strokeWidth: 1.5
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-black uppercase tracking-tight text-foreground", children: "Unable to Load Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Something went wrong connecting to the store. Please try again." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "shop.retry.button",
              onClick: () => window.location.reload(),
              className: "mt-2 gap-2 uppercase text-[10px] tracking-widest font-bold rounded-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 }),
                " Retry"
              ]
            }
          )
        ]
      }
    ) : sortedProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "flex flex-col items-center justify-center py-24 text-center gap-0",
        "data-ocid": "shop.empty_state",
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-2xl mx-auto relative overflow-hidden rounded-sm py-20 px-8",
            style: {
              background: "linear-gradient(160deg, #080808 0%, #0e0e0e 50%, #080808 100%)",
              border: "1px solid rgba(212,175,55,0.12)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)"
                  },
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-px w-10",
                      style: { backgroundColor: "rgba(212,175,55,0.4)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[9px] font-black uppercase tracking-[0.4em]",
                      style: { color: "rgba(212,175,55,0.7)" },
                      children: "VE YRON"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-px w-10",
                      style: { backgroundColor: "rgba(212,175,55,0.4)" }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-black uppercase leading-none text-white",
                    style: { fontSize: "clamp(2.5rem, 6vw, 4.5rem)" },
                    children: "LAUNCHING SOON"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm max-w-sm mx-auto leading-relaxed",
                    style: { color: "rgba(255,255,255,0.45)" },
                    children: [
                      "Something extraordinary is on its way.",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "Be the first to know."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/contact",
                    "data-ocid": "shop.empty.notify_me.link",
                    className: "mt-2 inline-flex items-center gap-2 px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-200",
                    style: {
                      border: "1px solid rgba(212,175,55,0.4)",
                      color: "rgba(212,175,55,0.9)"
                    },
                    children: "NOTIFY ME"
                  }
                )
              ] })
            ]
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4", children: sortedProducts.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShopProductCard,
        {
          product,
          index: idx
        },
        product.id
      )) }),
      sortedProducts.length <= 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.65 },
          className: "mt-12 relative overflow-hidden rounded-sm",
          style: {
            background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
            border: "1px solid rgba(212,175,55,0.12)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 pointer-events-none",
                style: {
                  background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-14 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-px w-8",
                    style: { backgroundColor: "rgba(212,175,55,0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-black uppercase tracking-[0.4em]",
                    style: { color: "rgba(212,175,55,0.7)" },
                    children: "VE YRON"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-px w-8",
                    style: { backgroundColor: "rgba(212,175,55,0.4)" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display font-black uppercase text-white leading-tight mb-3",
                  style: { fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)" },
                  children: "More Styles Dropping Soon"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm max-w-md mx-auto leading-relaxed",
                  style: { color: "rgba(255,255,255,0.45)" },
                  children: "New arrivals are added to the collection regularly. Follow the craft — excellence in every drop."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-px w-6",
                    style: { backgroundColor: "rgba(212,175,55,0.3)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[9px] font-bold uppercase tracking-[0.35em]",
                    style: { color: "rgba(212,175,55,0.5)" },
                    children: "New Collection 2026"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-px w-6",
                    style: { backgroundColor: "rgba(212,175,55,0.3)" }
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CrossSellSection,
        {
          activeTab,
          activeSubDef,
          allProducts
        }
      )
    ] }) })
  ] });
}
export {
  Shop as default
};

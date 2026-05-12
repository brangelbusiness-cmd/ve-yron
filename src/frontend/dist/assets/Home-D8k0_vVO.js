import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-DctbPH3p.js";
import { u as useMensProducts, a as useWomensProducts, b as usePlusMensProducts, S as SEO, P as ProductCard } from "./useShopifyProducts-DA3f9_pN.js";
import { m as motion } from "./proxy-Cno1h6QO.js";
import { A as ArrowRight } from "./arrow-right-DKWrA92a.js";
import "./shopify-CzRTDa7w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode);
function SkeletonGrid({ count = 4 }) {
  const keys = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3 bg-muted" })
  ] }, keys[i])) });
}
function ComingSoonGrid({ count = 4 }) {
  const keys = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative aspect-square overflow-hidden rounded-sm",
      style: {
        background: "linear-gradient(145deg, #0d0d0d 0%, #111 60%, #0a0a0a 100%)",
        border: "1px solid rgba(212,175,55,0.1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.05) 0%, transparent 65%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col items-center justify-center gap-3 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-display font-black uppercase tracking-[0.05em] leading-none",
              style: {
                fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
                color: "rgba(212,175,55,0.12)"
              },
              children: [
                "VE",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "YRON"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display font-black uppercase text-[9px] tracking-[0.35em]",
              style: { color: "rgba(212,175,55,0.55)" },
              children: "LAUNCHING SOON"
            }
          )
        ] })
      ]
    },
    keys[i]
  )) });
}
function MarqueeStrip() {
  const items = [
    "VE YRON",
    "LUXURY ACTIVEWEAR",
    "BUILT FOR EXCELLENCE",
    "TRACKPANTS",
    "SHORTS",
    "PREMIUM QUALITY"
  ];
  const repeated = [...items, ...items, ...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "overflow-hidden bg-card border-y border-border py-3.5 select-none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex whitespace-nowrap",
          style: {
            animation: "marquee 28s linear infinite",
            width: "max-content"
          },
          children: repeated.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground",
              children: [
                item,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-4 text-primary", children: "•" })
              ]
            },
            `${item}-${i}`
          ))
        }
      )
    }
  );
}
function SectionHeading({
  pre,
  title,
  href,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-7 md:mb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-[10px] font-black uppercase tracking-[0.35em] mb-2", children: pre }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black uppercase text-2xl md:text-3xl lg:text-4xl text-foreground tracking-tight leading-none", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: href,
        className: "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200",
        "data-ocid": ocid,
        children: [
          "VIEW ALL ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
        ]
      }
    )
  ] });
}
function DropSection({
  pre,
  title,
  viewAllHref,
  viewAllOcid,
  products,
  isLoading,
  startIndex,
  bg = "bg-background"
}) {
  const displayed = products.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: `${bg} py-14 md:py-20 px-4 md:px-8 lg:px-16`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1440px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            pre,
            title,
            href: viewAllHref,
            ocid: viewAllOcid
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ComingSoonGrid, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6", children: displayed.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: {
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1]
            },
            "data-ocid": `${title.toLowerCase().includes("men") && !title.toLowerCase().includes("women") ? "mens" : "womens"}.drop.item.${startIndex + i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p })
          },
          p.id
        )) })
      ]
    }
  ) }) });
}
function CategoryTiles({
  mensImage,
  womensImage,
  plusImage
}) {
  const tiles = [
    {
      label: "MEN'S",
      sublabel: "Trackpants & Shorts",
      image: mensImage,
      href: "/shop",
      search: { sub: "trackpants", gender: "mens" },
      ocid: "category.mens.tile",
      gradient: "from-black/70 via-black/40 to-black/10"
    },
    {
      label: "WOMEN'S",
      sublabel: "Trackpants & Shorts",
      image: womensImage,
      href: "/shop",
      search: { sub: "trackpants", gender: "womens" },
      ocid: "category.womens.tile",
      gradient: "from-black/70 via-black/40 to-black/10"
    },
    {
      label: "PLUS SIZE",
      sublabel: "Sizes 2XL–5XL · Built for All Bodies",
      image: plusImage,
      href: "/shop",
      search: { sub: "plus-trackpants", gender: "plus" },
      ocid: "category.plus_size.tile",
      gradient: "from-black/80 via-black/50 to-black/20"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "grid grid-cols-1 md:grid-cols-3 gap-px bg-border",
      "data-ocid": "home.category_tiles.section",
      children: tiles.map((tile, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: {
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1]
          },
          className: "relative overflow-hidden group cursor-pointer",
          style: { minHeight: "clamp(340px, 48vw, 600px)" },
          "data-ocid": tile.ocid,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: tile.href,
              search: tile.search,
              className: "block absolute inset-0",
              "aria-label": `Shop ${tile.label}`,
              children: [
                tile.label === "PLUS SIZE" && !tile.image ? (
                  // Premium typographic fallback for Plus Size
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "absolute inset-0 flex flex-col items-center justify-center",
                      style: {
                        background: "linear-gradient(145deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute inset-0 pointer-events-none",
                            style: {
                              background: "radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.08) 0%, transparent 65%)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-display font-black uppercase tracking-[0.08em] text-center leading-none select-none pointer-events-none",
                            style: {
                              fontSize: "clamp(3.5rem, 10vw, 7rem)",
                              color: "rgba(212,175,55,0.12)"
                            },
                            children: [
                              "PLUS",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                              "SIZE"
                            ]
                          }
                        )
                      ]
                    }
                  )
                ) : tile.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: tile.image,
                    alt: `VE YRON ${tile.label}`,
                    className: "absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]",
                    loading: "lazy"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0",
                    style: {
                      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `absolute inset-0 bg-gradient-to-t ${tile.gradient} transition-opacity duration-300 group-hover:opacity-90`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-7 md:p-9", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2", children: tile.sublabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black uppercase text-white text-3xl md:text-4xl lg:text-5xl leading-none mb-5", children: tile.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/70 group-hover:text-primary transition-colors duration-300", children: [
                    "SHOP NOW ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                  ] })
                ] })
              ]
            }
          )
        },
        tile.label
      ))
    }
  );
}
function BrandManifesto() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative bg-card border-y border-border py-24 md:py-36 px-6 text-center overflow-hidden",
      "data-ocid": "home.manifesto.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-black uppercase tracking-[0.5em]",
                style: {
                  fontSize: "clamp(6rem, 20vw, 18rem)",
                  color: "rgba(212,175,55,0.025)",
                  lineHeight: 1
                },
                children: "VE YRON"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 max-w-4xl mx-auto",
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-[10px] font-black uppercase tracking-[0.35em] mb-8", children: "The VE YRON Philosophy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "blockquote",
                {
                  className: "font-display font-black uppercase text-foreground leading-[1.1] mb-8",
                  style: { fontSize: "clamp(1.8rem, 4.5vw, 4rem)" },
                  children: [
                    '"PERFORMANCE WEARS',
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          background: "linear-gradient(90deg, #ffffff 0%, #d4af37 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text"
                        },
                        children: "MANY FACES."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    'EXCELLENCE WEARS ONE."'
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-px w-10",
                    style: { backgroundColor: "rgba(212,175,55,0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-[10px] font-black uppercase tracking-[0.4em]", children: "VE YRON" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-px w-10",
                    style: { backgroundColor: "rgba(212,175,55,0.4)" }
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Home() {
  var _a, _b, _c, _d, _e, _f;
  const { products: mensProducts, isLoading: mensLoading } = useMensProducts();
  const { products: womensProducts, isLoading: womensLoading } = useWomensProducts();
  const { products: plusMensProducts } = usePlusMensProducts();
  const heroRef = reactExports.useRef(null);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToCategories = () => {
    var _a2;
    (_a2 = document.getElementById("categories")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  };
  const mensHeroImage = ((_b = (_a = mensProducts[0]) == null ? void 0 : _a.images[0]) == null ? void 0 : _b.src) ?? null;
  const womensHeroImage = ((_d = (_c = womensProducts[0]) == null ? void 0 : _c.images[0]) == null ? void 0 : _d.src) ?? null;
  const plusHeroImage = ((_f = (_e = plusMensProducts[0]) == null ? void 0 : _e.images[0]) == null ? void 0 : _f.src) ?? mensHeroImage;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full overflow-x-hidden", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "VE YRON | Luxury Unisex Activewear India",
        description: "Discover VE YRON's exclusive luxury activewear collection. Premium trackpants and shorts for men, women, and plus sizes. Free delivery across India."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative w-full flex items-center justify-center overflow-hidden",
        style: { minHeight: "100svh" },
        "data-ocid": "home.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hero-gradient-bg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 pointer-events-none overflow-hidden",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-8 right-8 w-20 h-20 border-t border-r",
                    style: { borderColor: "rgba(212,175,55,0.18)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-8 left-8 w-20 h-20 border-b border-l",
                    style: { borderColor: "rgba(212,175,55,0.18)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    style: {
                      width: "80vw",
                      height: "80vh",
                      background: "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 65%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute left-0 right-0",
                    style: {
                      top: "15%",
                      height: "1px",
                      background: "linear-gradient(to right, transparent, rgba(212,175,55,0.08), transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute left-0 right-0",
                    style: {
                      bottom: "15%",
                      height: "1px",
                      background: "linear-gradient(to right, transparent, rgba(212,175,55,0.08), transparent)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                className: "inline-flex items-center gap-2 mb-7 md:mb-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-px w-6",
                      style: { backgroundColor: "rgba(212,175,55,0.6)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-[10px] font-black uppercase tracking-[0.45em]", children: "New Collection 2026" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-px w-6",
                      style: { backgroundColor: "rgba(212,175,55,0.6)" }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                className: "font-display font-black uppercase tracking-tight leading-none mb-6 md:mb-8",
                style: {
                  fontSize: "clamp(4.5rem, 18vw, 13rem)",
                  background: "linear-gradient(135deg, #ffffff 0%, #e8e0d0 60%, #d4af37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                },
                children: "VE YRON"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.8, delay: 0.45 },
                className: "text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.35em] mb-10 md:mb-14",
                style: { color: "rgba(255,255,255,0.45)" },
                children: "Built for Excellence.  Owned by Few."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.6 },
                className: "flex flex-col sm:flex-row items-center gap-3 sm:gap-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/shop",
                      search: { sub: "trackpants", gender: "mens" },
                      className: "btn-luxury min-w-[160px] inline-flex items-center justify-center gap-2",
                      "data-ocid": "hero.shop_mens_button",
                      children: [
                        "SHOP MEN ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/shop",
                      search: { sub: "trackpants", gender: "womens" },
                      className: "hero-btn-secondary px-6 py-4 font-bold uppercase tracking-widest text-xs transition-smooth hover:opacity-90 active:scale-95 inline-flex items-center justify-center gap-2 min-w-[160px]",
                      "data-ocid": "hero.shop_womens_button",
                      children: [
                        "SHOP WOMEN ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              onClick: scrollToCategories,
              className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-300",
              animate: { opacity: scrolled ? 0 : 0.55 },
              "aria-label": "Scroll to categories",
              "data-ocid": "hero.scroll_down_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[9px] font-bold uppercase tracking-[0.25em]",
                    style: { color: "rgba(255,255,255,0.5)" },
                    children: "SCROLL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { y: [0, 7, 0] },
                    transition: {
                      duration: 1.6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 16, style: { color: "rgba(255,255,255,0.5)" } })
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "categories", "data-ocid": "home.shop_category.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryTiles,
      {
        mensImage: mensHeroImage,
        womensImage: womensHeroImage,
        plusImage: plusHeroImage
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "bg-card border-b border-border",
        "aria-label": "Category tabs",
        "data-ocid": "home.category_tabs.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1440px] mx-auto flex", children: [
          { label: "ALL", sub: null, gender: null },
          { label: "MEN'S", sub: "trackpants", gender: "mens" },
          { label: "WOMEN'S", sub: "trackpants", gender: "womens" },
          {
            label: "PLUS SIZE",
            sub: "plus-trackpants",
            gender: "plus"
          }
        ].map(({ label, sub, gender }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/shop",
            search: sub ? { sub, gender } : {},
            className: "flex-1 py-4 md:py-5 text-center font-black uppercase tracking-[0.18em] text-[11px] md:text-xs text-muted-foreground border-r last:border-r-0 border-border transition-smooth hover:bg-muted hover:text-foreground",
            "data-ocid": `home.tab.${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`,
            children: label
          },
          label
        )) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropSection,
      {
        pre: "Latest Drop · Men's",
        title: "MEN'S LATEST DROP",
        viewAllHref: "/shop",
        viewAllOcid: "mens.drop.view_all.link",
        products: mensProducts,
        isLoading: mensLoading,
        startIndex: 0,
        bg: "bg-background"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropSection,
      {
        pre: "Latest Drop · Women's",
        title: "WOMEN'S LATEST DROP",
        viewAllHref: "/shop",
        viewAllOcid: "womens.drop.view_all.link",
        products: womensProducts,
        isLoading: womensLoading,
        startIndex: 4,
        bg: "bg-muted/20"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandManifesto, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden py-20 md:py-28 px-6 text-center",
        style: {
          background: "linear-gradient(160deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)"
        },
        "data-ocid": "home.cta_banner.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 60%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "relative z-10 max-w-2xl mx-auto",
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.65 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-5", children: "Premium Activewear · India" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    className: "font-display font-black uppercase leading-tight text-white mb-6",
                    style: { fontSize: "clamp(2rem, 5vw, 3.5rem)" },
                    children: [
                      "TRACKPANTS & SHORTS",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      "FOR EVERY BODY."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mb-10 max-w-md mx-auto leading-relaxed",
                    style: { color: "rgba(255,255,255,0.5)" },
                    children: "Premium performance wear engineered for those who move with intention. Men's, Women's, and Plus Sizes available."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/shop",
                      className: "btn-luxury inline-flex items-center gap-2 min-w-[160px] justify-center",
                      "data-ocid": "cta_banner.shop_all_button",
                      children: [
                        "SHOP ALL ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "mailto:brangelbusiness@gmail.com",
                      className: "hero-btn-secondary px-6 py-4 font-bold uppercase tracking-widest text-xs transition-smooth inline-flex items-center gap-2 min-w-[160px] justify-center",
                      "data-ocid": "cta_banner.contact_button",
                      children: "CONTACT US"
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  Home as default
};

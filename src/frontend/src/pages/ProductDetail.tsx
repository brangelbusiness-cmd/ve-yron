import { Link, useParams } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  Ruler,
  Shield,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { formatPrice, getProductPrice } from "../data/products";
import { useAllProducts, useShopifyProduct } from "../hooks/useShopifyProducts";
import { useCartStore } from "../stores/cart";
import type {
  GenderCategory,
  ProductCategory,
  ProductImage,
  ProductVariant,
} from "../types/product";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// formatPrice now imported from ../data/products — local declaration removed

const isColorOption = (name: string) =>
  /colou?r|shade|tint|hue|finish/i.test(name.trim());
const isSizeOption = (name: string) => /^sizes?$/i.test(name.trim());

function isValidCssColor(value: string): boolean {
  if (!value) return false;
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) return true;
  if (/^(rgb|hsl)a?\(/.test(value)) return true;
  const namedColors = [
    "red",
    "blue",
    "green",
    "black",
    "white",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "grey",
    "navy",
    "teal",
    "olive",
    "maroon",
    "beige",
    "coral",
    "cyan",
    "magenta",
    "silver",
    "gold",
  ];
  return namedColors.includes(value.toLowerCase());
}

const BADGE_LABELS: Record<string, string> = {
  "new-arrival": "New Arrival",
  "limited-edition": "Limited Edition",
  bestseller: "Bestseller",
};

const SIZE_ORDER = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
];

// ─── Size Chart Data ──────────────────────────────────────────────────────────

type SizeRow = Record<string, string>;

interface SizeChart {
  title: string;
  subtitle: string;
  columns: string[];
  rows: SizeRow[];
  fitNote: string;
  howToMeasure?: string;
}

// Key format: `${genderCategory}-${category}`
// genderCategory: 'mens' | 'womens' | 'plus-mens' | 'plus-womens'
// category: 'trackpants' | 'shorts'
const SIZE_CHARTS: Record<string, SizeChart> = {
  // ── MEN'S TRACKPANTS ──
  "mens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S TRACKPANTS",
    columns: ["Size", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      {
        Size: "S",
        "Waist (in)": "28–30",
        "Hip (in)": "36–38",
        "Length (in)": "40",
      },
      {
        Size: "M",
        "Waist (in)": "30–32",
        "Hip (in)": "38–40",
        "Length (in)": "41",
      },
      {
        Size: "L",
        "Waist (in)": "32–34",
        "Hip (in)": "40–42",
        "Length (in)": "42",
      },
      {
        Size: "XL",
        "Waist (in)": "34–36",
        "Hip (in)": "42–44",
        "Length (in)": "43",
      },
      {
        Size: "XXL",
        "Waist (in)": "36–38",
        "Hip (in)": "44–46",
        "Length (in)": "44",
      },
    ],
    fitNote: "Relaxed straight fit. Model is 6'0\" wearing size M.",
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the widest point of your hips.",
  },

  // ── MEN'S SHORTS ──
  "mens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S SHORTS",
    columns: [
      "Size",
      "Waist Relaxed",
      "Waist Stretch",
      "Hip",
      "Length",
      "Leg Opening",
    ],
    rows: [
      {
        Size: "S",
        "Waist Relaxed": "28",
        "Waist Stretch": "32",
        Hip: "36",
        Length: "18",
        "Leg Opening": "22",
      },
      {
        Size: "M",
        "Waist Relaxed": "30",
        "Waist Stretch": "34",
        Hip: "38",
        Length: "18.5",
        "Leg Opening": "23",
      },
      {
        Size: "L",
        "Waist Relaxed": "32",
        "Waist Stretch": "36",
        Hip: "40",
        Length: "19",
        "Leg Opening": "24",
      },
      {
        Size: "XL",
        "Waist Relaxed": "34",
        "Waist Stretch": "38",
        Hip: "42",
        Length: "19.5",
        "Leg Opening": "25",
      },
      {
        Size: "XXL",
        "Waist Relaxed": "36",
        "Waist Stretch": "40",
        Hip: "44",
        Length: "20",
        "Leg Opening": "26",
      },
    ],
    fitNote: 'Relaxed fit. Inseam length: 7". Model is 5\'11" wearing size M.',
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the widest point of your hips.",
  },

  // ── MEN'S PLUS SIZE TRACKPANTS (same chart as mens-trackpants extended) ──
  "plus-mens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S PLUS SIZE TRACKPANTS",
    columns: ["Size", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      {
        Size: "XL",
        "Waist (in)": "34–36",
        "Hip (in)": "42–44",
        "Length (in)": "43",
      },
      {
        Size: "XXL",
        "Waist (in)": "36–38",
        "Hip (in)": "44–46",
        "Length (in)": "44",
      },
      {
        Size: "2XL",
        "Waist (in)": "38–40",
        "Hip (in)": "46–48",
        "Length (in)": "45",
      },
      {
        Size: "3XL",
        "Waist (in)": "40–42",
        "Hip (in)": "48–50",
        "Length (in)": "46",
      },
      {
        Size: "4XL",
        "Waist (in)": "42–44",
        "Hip (in)": "50–52",
        "Length (in)": "47",
      },
      {
        Size: "5XL",
        "Waist (in)": "44–46",
        "Hip (in)": "52–54",
        "Length (in)": "48",
      },
    ],
    fitNote: "Relaxed straight fit.",
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the widest point of your hips.",
  },

  // ── MEN'S PLUS SIZE SHORTS ──
  "plus-mens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "MEN'S PLUS SIZE SHORTS",
    columns: [
      "Size",
      "Waist Relaxed",
      "Waist Stretch",
      "Hip",
      "Length",
      "Leg Opening",
    ],
    rows: [
      {
        Size: "XL",
        "Waist Relaxed": "34",
        "Waist Stretch": "38",
        Hip: "42",
        Length: "19.5",
        "Leg Opening": "25",
      },
      {
        Size: "XXL",
        "Waist Relaxed": "36",
        "Waist Stretch": "40",
        Hip: "44",
        Length: "20",
        "Leg Opening": "26",
      },
      {
        Size: "2XL",
        "Waist Relaxed": "38",
        "Waist Stretch": "42",
        Hip: "46",
        Length: "20.5",
        "Leg Opening": "27",
      },
      {
        Size: "3XL",
        "Waist Relaxed": "40",
        "Waist Stretch": "44",
        Hip: "48",
        Length: "21",
        "Leg Opening": "28",
      },
      {
        Size: "4XL",
        "Waist Relaxed": "42",
        "Waist Stretch": "46",
        Hip: "50",
        Length: "21.5",
        "Leg Opening": "29",
      },
      {
        Size: "5XL",
        "Waist Relaxed": "44",
        "Waist Stretch": "48",
        Hip: "52",
        Length: "22",
        "Leg Opening": "30",
      },
    ],
    fitNote: 'Relaxed fit. Inseam length: 7".',
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the widest point of your hips.",
  },

  // ── WOMEN'S TRACKPANTS ──
  "womens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S TRACKPANTS",
    columns: [
      "Size",
      "Waist (in)",
      "Hip (in)",
      "Outer Length (in)",
      "Leg Opening (in)",
    ],
    rows: [
      {
        Size: "S",
        "Waist (in)": "26–27",
        "Hip (in)": "35–36",
        "Outer Length (in)": "39",
        "Leg Opening (in)": "14",
      },
      {
        Size: "M",
        "Waist (in)": "28–29",
        "Hip (in)": "37–38",
        "Outer Length (in)": "40",
        "Leg Opening (in)": "14.5",
      },
      {
        Size: "L",
        "Waist (in)": "30–31",
        "Hip (in)": "39–40",
        "Outer Length (in)": "41",
        "Leg Opening (in)": "15",
      },
      {
        Size: "XL",
        "Waist (in)": "32–33",
        "Hip (in)": "41–42",
        "Outer Length (in)": "42",
        "Leg Opening (in)": "15.5",
      },
      {
        Size: "XXL",
        "Waist (in)": "34–35",
        "Hip (in)": "43–44",
        "Outer Length (in)": "43",
        "Leg Opening (in)": "16",
      },
    ],
    fitNote: "Relaxed straight fit. Model is 5'7\" wearing size S.",
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the fullest part of your hips.",
  },

  // ── WOMEN'S SHORTS ──
  "womens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S SHORTS",
    columns: [],
    rows: [],
    fitNote: "",
    howToMeasure: undefined,
  },

  // ── WOMEN'S PLUS SIZE TRACKPANTS ──
  "plus-womens-trackpants": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S PLUS SIZE TRACKPANTS",
    columns: [
      "Size",
      "Waist (in)",
      "Hip (in)",
      "Outer Length (in)",
      "Leg Opening (in)",
    ],
    rows: [
      {
        Size: "XL",
        "Waist (in)": "32–33",
        "Hip (in)": "41–42",
        "Outer Length (in)": "42",
        "Leg Opening (in)": "15.5",
      },
      {
        Size: "XXL",
        "Waist (in)": "34–35",
        "Hip (in)": "43–44",
        "Outer Length (in)": "43",
        "Leg Opening (in)": "16",
      },
      {
        Size: "2XL",
        "Waist (in)": "36–38",
        "Hip (in)": "46–48",
        "Outer Length (in)": "44",
        "Leg Opening (in)": "16.5",
      },
      {
        Size: "3XL",
        "Waist (in)": "38–40",
        "Hip (in)": "48–50",
        "Outer Length (in)": "45",
        "Leg Opening (in)": "17",
      },
      {
        Size: "4XL",
        "Waist (in)": "40–42",
        "Hip (in)": "50–52",
        "Outer Length (in)": "46",
        "Leg Opening (in)": "17.5",
      },
      {
        Size: "5XL",
        "Waist (in)": "42–44",
        "Hip (in)": "52–54",
        "Outer Length (in)": "47",
        "Leg Opening (in)": "18",
      },
    ],
    fitNote: "Relaxed straight fit. Model is 5'5\" wearing size 4XL.",
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the fullest part of your hips.",
  },

  // ── WOMEN'S PLUS SIZE SHORTS ──
  "plus-womens-shorts": {
    title: "SIZE GUIDE",
    subtitle: "WOMEN'S PLUS SIZE SHORTS",
    columns: ["Size", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      {
        Size: "2XL",
        "Waist (in)": "38–40",
        "Hip (in)": "46–48",
        "Length (in)": "18",
      },
      {
        Size: "3XL",
        "Waist (in)": "40–42",
        "Hip (in)": "48–50",
        "Length (in)": "18.5",
      },
      {
        Size: "4XL",
        "Waist (in)": "42–44",
        "Hip (in)": "50–52",
        "Length (in)": "19",
      },
      {
        Size: "5XL",
        "Waist (in)": "44–46",
        "Hip (in)": "52–54",
        "Length (in)": "19.5",
      },
    ],
    fitNote: "Relaxed fit. Model is 5'5\" wearing size 4XL.",
    howToMeasure:
      "Waist: measure around your natural waist. Hip: measure at the fullest part of your hips.",
  },
};

// Womens shorts has no chart yet — returns null → fallback message
function getSizeChart(
  genderCategory: GenderCategory | undefined,
  category: ProductCategory,
): SizeChart | null {
  if (!genderCategory) return null;
  const key = `${genderCategory}-${category}`;
  return SIZE_CHARTS[key] ?? null;
}

// ─── Size Guide Modal ─────────────────────────────────────────────────────────

function SizeGuideModal({
  open,
  onClose,
  genderCategory,
  category,
}: {
  open: boolean;
  onClose: () => void;
  genderCategory: GenderCategory | undefined;
  category: ProductCategory;
}) {
  const chart = getSizeChart(genderCategory, category);
  const [activeTab, setActiveTab] = useState<"chart" | "image">("chart");

  // Derive the size guide image path
  const sizeGuideImage = (() => {
    if (!genderCategory) return null;
    const map: Record<string, string> = {
      "mens-trackpants": "/size-guide-mens-trackpants.jpg",
      "mens-shorts": "/size-guide-mens-shorts.jpg",
      "womens-trackpants": "/size-guide-womens-trackpants.jpg",
      "plus-womens-shorts": "/size-guide-womens-plus-shorts.jpg",
    };
    const key = `${genderCategory}-${category}`;
    return map[key] ?? null;
  })();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset tab on open
  useEffect(() => {
    if (open) setActiveTab("chart");
  }, [open]);

  if (!open) return null;

  const isWomensShortsFallback =
    genderCategory === "womens" && category === "shorts";
  const hasChart = !!chart && chart.columns.length > 0;
  const showTabs = sizeGuideImage !== null;

  return (
    // biome-ignore lint/a11y/useSemanticElements: dialog cannot be used here due to layout constraints
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Size Guide"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      data-ocid="product_detail.size_guide.dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
        role="presentation"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative z-10 w-full sm:max-w-2xl rounded-t-2xl sm:rounded-xl overflow-hidden flex flex-col bg-background border border-border"
        style={{ maxHeight: "92vh" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 sm:px-7 py-5 shrink-0 border-b border-border">
          <div className="flex flex-col gap-1">
            <p className="text-[9px] uppercase tracking-[0.35em] font-black text-primary">
              VE YRON
            </p>
            <h2 className="font-display font-bold text-base md:text-lg text-foreground tracking-wide uppercase">
              {chart ? chart.subtitle : "SIZE GUIDE"}
            </h2>
            <p className="text-[10px] mt-0.5 text-muted-foreground">
              All measurements in inches
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="product_detail.size_guide.close_button"
            aria-label="Close size guide"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 shrink-0 ml-4 hover:text-foreground hover:bg-muted"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Tabs (if image available) */}
        {showTabs && (
          <div className="flex shrink-0 border-b border-border">
            <button
              type="button"
              onClick={() => setActiveTab("chart")}
              data-ocid="product_detail.size_guide.chart_tab"
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                activeTab === "chart"
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Size Chart
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("image")}
              data-ocid="product_detail.size_guide.image_tab"
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                activeTab === "image"
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Size Guide Image
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto overscroll-contain">
          {/* Image tab */}
          {showTabs && activeTab === "image" && sizeGuideImage && (
            <div className="px-5 sm:px-7 py-6">
              <img
                src={sizeGuideImage}
                alt="Size guide"
                className="w-full h-auto rounded-sm"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Chart tab (or default when no image) */}
          {/* Chart tab (or default when no image) */}
          {(!showTabs || activeTab === "chart") &&
            (isWomensShortsFallback ? (
              <div className="px-5 sm:px-7 py-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-muted">
                  <Ruler size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold mb-2 text-foreground">
                  Women&apos;s Shorts
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-xs mx-auto">
                  Women&apos;s Shorts size guide will be available soon. For
                  size assistance, please contact us at{" "}
                  <a
                    href="mailto:brangelbusiness@gmail.com"
                    className="text-primary underline underline-offset-2"
                  >
                    brangelbusiness@gmail.com
                  </a>
                </p>
              </div>
            ) : hasChart ? (
              <div className="px-5 sm:px-7 py-6">
                <div className="overflow-x-auto -mx-1 px-1">
                  <table
                    className="w-full"
                    style={{ borderCollapse: "collapse" }}
                  >
                    <thead>
                      <tr className="bg-muted">
                        {chart.columns.map((col) => (
                          <th
                            key={col}
                            className="text-left px-4 py-3 text-muted-foreground border-b border-border"
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chart.rows.map((row, idx) => (
                        <tr
                          key={row.Size}
                          className={
                            idx % 2 === 0 ? "bg-background" : "bg-muted/40"
                          }
                        >
                          {chart.columns.map((col, ci) => (
                            <td
                              key={col}
                              className="px-4 py-3 text-sm"
                              style={{
                                fontWeight: ci === 0 ? 700 : 400,
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span
                                className={
                                  ci === 0
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }
                              >
                                {row[col]}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs italic mt-5 text-muted-foreground">
                  {chart.fitNote}
                </p>
                {chart.howToMeasure && (
                  <div className="mt-5 p-4 rounded-lg bg-muted border border-border">
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-2 text-primary">
                      How to Measure
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {chart.howToMeasure}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-5 sm:px-7 py-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-muted">
                  <Ruler size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold mb-2 text-foreground">
                  Size guide coming soon
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  For sizing help, contact us at{" "}
                  <a
                    href="mailto:brangelbusiness@gmail.com"
                    className="underline underline-offset-2 text-primary"
                  >
                    brangelbusiness@gmail.com
                  </a>
                </p>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Sort sizes ───────────────────────────────────────────────────────────────

function sortSizes(sizes: string[]): string[] {
  return [...sizes].sort((a, b) => {
    const ai = SIZE_ORDER.indexOf(a.toUpperCase());
    const bi = SIZE_ORDER.indexOf(b.toUpperCase());
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function AddedToast({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 24,
        scale: visible ? 1 : 0.96,
      }}
      transition={{ duration: 0.22 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 px-5 py-3 bg-card border border-border shadow-lg text-foreground text-xs uppercase tracking-widest font-semibold">
        <ShoppingBag size={14} className="text-primary" />
        Added to bag
      </div>
    </motion.div>
  );
}

// ─── Image Gallery ─────────────────────────────────────────────────────────────

interface ImageGalleryProps {
  images: ProductImage[];
  badge?: string;
}

function ImageGallery({ images, badge }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    // Ensure carousel starts at slide 0 fully centered
    emblaApi.scrollTo(0, true);
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      if (thumbStripRef.current) {
        const thumbs =
          thumbStripRef.current.querySelectorAll<HTMLButtonElement>("button");
        thumbs[idx]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const canScrollPrev = selectedIndex > 0;
  const canScrollNext = selectedIndex < images.length - 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Main carousel — TRUE aspect-square so images never crop/cut */}
      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden w-full"
          style={{
            background: "oklch(97% 0 0)",
            border: "1px solid oklch(var(--border))",
            borderRadius: "4px",
          }}
          data-ocid="product_detail.image_carousel"
        >
          <div className="flex" style={{ willChange: "transform" }}>
            {images.map((img, idx) => (
              <div
                key={img.src || `slide-${idx}`}
                style={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  position: "relative",
                  paddingBottom: "100%",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Product image ${idx + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    padding: "16px",
                    display: "block",
                  }}
                  loading={idx === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              data-ocid="product_detail.gallery_prev.button"
              aria-label="Previous image"
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground transition-smooth ${
                canScrollPrev
                  ? "opacity-100 hover:bg-card hover:border-foreground/40"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              data-ocid="product_detail.gallery_next.button"
              aria-label="Next image"
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border text-foreground transition-smooth ${
                canScrollNext
                  ? "opacity-100 hover:bg-card hover:border-foreground/40"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>

            {/* Image counter */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-widest text-white/80 font-mono rounded-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-primary text-primary-foreground">
              {BADGE_LABELS[badge] ?? badge}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          ref={thumbStripRef}
          className="flex gap-2 overflow-x-auto scrollbar-none pb-1"
          aria-label="Image thumbnails"
        >
          {images.map((img, idx) => (
            <button
              key={img.src || `thumb-${idx}`}
              type="button"
              onClick={() => scrollTo(idx)}
              data-ocid={`product_detail.gallery_thumb.${idx + 1}`}
              aria-label={`View image ${idx + 1}`}
              className={`shrink-0 w-[68px] h-[68px] overflow-hidden transition-smooth ${
                selectedIndex === idx
                  ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                  : "opacity-55 hover:opacity-100 ring-1 ring-border"
              }`}
              style={{ background: "oklch(97% 0 0)", borderRadius: "2px" }}
            >
              <img
                src={img.src}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                className="w-full h-full"
                style={{ objectFit: "contain", padding: "4px" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Collapsible Section ───────────────────────────────────────────────────────

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  ocid,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  ocid?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-ocid={ocid}
        className="w-full flex items-center justify-between py-4 text-xs uppercase tracking-widest font-semibold text-foreground hover:text-primary transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-5">{children}</div>
      </motion.div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <div className="border-b border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-4">
          <div className="h-3 bg-muted/50 rounded-sm w-32 animate-pulse" />
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-16">
        <div className="grid md:grid-cols-[55fr_45fr] gap-8 md:gap-16 animate-pulse">
          <div>
            <div className="aspect-square w-full bg-muted/30 rounded-sm" />
            <div className="flex gap-2 mt-3">
              {[1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="w-[68px] h-[68px] bg-muted/30 rounded-sm shrink-0"
                />
              ))}
            </div>
          </div>
          <div className="space-y-5 pt-2">
            <div className="h-3 bg-muted/30 rounded-sm w-16" />
            <div className="h-8 bg-muted/40 rounded-sm w-3/4" />
            <div className="h-6 bg-primary/20 rounded-sm w-20" />
            <div className="space-y-2 pt-2">
              {[1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="h-3 bg-muted/20 rounded-sm"
                  style={{ width: `${100 - k * 10}%` }}
                />
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              {[1, 2, 3, 4].map((k) => (
                <div key={k} className="h-11 w-12 bg-muted/30 rounded-sm" />
              ))}
            </div>
            <div className="h-14 bg-primary/20 rounded-sm w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Category Badge Label ─────────────────────────────────────────────────────

function getCategoryLabel(
  genderCategory: GenderCategory,
  category: ProductCategory,
): string {
  const gcMap: Record<GenderCategory, string> = {
    mens: "MEN'S",
    womens: "WOMEN'S",
    "plus-mens": "MEN'S PLUS SIZE",
    "plus-womens": "WOMEN'S PLUS SIZE",
  };
  const catMap: Record<ProductCategory, string> = {
    trackpants: "TRACKPANTS",
    shorts: "SHORTS",
  };
  return `${gcMap[genderCategory]} ${catMap[category]}`;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const { handle } = useParams({ from: "/products/$handle" });
  const { product, isLoading } = useShopifyProduct(handle);
  const { products: allProducts } = useAllProducts();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined,
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);

  // ── Derived options ────────────────────────────────────────────────────────

  const sizeOptions = product
    ? sortSizes([
        ...new Set(
          product.variants
            .flatMap((v) =>
              v.selectedOptions
                .filter((o) => isSizeOption(o.name))
                .map((o) => o.value),
            )
            .filter((v): v is string => typeof v === "string" && v.length > 0),
        ),
      ])
    : [];

  const colorOptions = product
    ? [
        ...new Set(
          product.variants
            .flatMap((v) =>
              v.selectedOptions
                .filter((o) => isColorOption(o.name))
                .map((o) => o.value),
            )
            .filter((v): v is string => typeof v === "string" && v.length > 0),
        ),
      ]
    : [];

  // Resolve selected variant
  const resolvedVariant: ProductVariant | undefined = (() => {
    if (!product) return undefined;
    const variants = product.variants;
    if (!variants.length) return undefined;
    const matches = variants.filter((v) => {
      const sizeMatch =
        !sizeOptions.length ||
        !selectedSize ||
        v.selectedOptions.some(
          (o) => isSizeOption(o.name) && o.value === selectedSize,
        );
      const colorMatch =
        !colorOptions.length ||
        !selectedColor ||
        v.selectedOptions.some(
          (o) => isColorOption(o.name) && o.value === selectedColor,
        );
      return sizeMatch && colorMatch;
    });
    return (
      matches.find((v) => v.available) ??
      matches[0] ??
      variants.find((v) => v.available) ??
      variants[0]
    );
  })();

  // Init selections on product change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — only run on product id
  useEffect(() => {
    if (!product?.variants.length) return;
    const first =
      product.variants.find((v) => v.available) ?? product.variants[0];
    if (sizeOptions.length) {
      setSelectedSize(
        first.selectedOptions.find((o) => isSizeOption(o.name))?.value,
      );
    }
    if (colorOptions.length) {
      setSelectedColor(
        first.selectedOptions.find((o) => isColorOption(o.name))?.value,
      );
    }
    setQuantity(1);
  }, [product?.id]);

  function showToast() {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastVisible(true);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 2200);
  }

  function handleAddToCart() {
    if (!resolvedVariant || !product || !resolvedVariant.available) return;
    addItem(product, resolvedVariant, quantity);
    showToast();
  }

  // ── Related products — SAME genderCategory AND same category ──────────────
  // This is the critical fix: filter by BOTH genderCategory AND category
  const relatedProducts = product
    ? allProducts
        .filter(
          (p) =>
            p.id !== product.id &&
            p.genderCategory === product.genderCategory &&
            p.category === product.category,
        )
        .slice(0, 4)
    : [];

  // ── SEO: product structured data + breadcrumb ─────────────────────────────
  useEffect(() => {
    if (!product) return;

    // Remove old ld+json scripts injected by this page
    for (const s of document.querySelectorAll("script[data-veyron-ld]"))
      s.remove();

    // Product schema
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description:
        product.description || `Premium ${product.category} by VE YRON`,
      brand: { "@type": "Brand", name: "VE YRON" },
      image: product.images[0]?.src ?? "",
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: product.variants.some((v) => v.available)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: { "@type": "Organization", name: "VE YRON" },
      },
    };

    // Breadcrumb schema
    const gcMap: Record<string, string> = {
      mens: "Men's",
      womens: "Women's",
      "plus-mens": "Plus Size Men's",
      "plus-womens": "Plus Size Women's",
    };
    const catMap: Record<string, string> = {
      trackpants: "Trackpants",
      shorts: "Shorts",
    };
    const breadcrumbSchema = {
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
          name: gcMap[product.genderCategory] ?? "Shop",
          item: `https://veyron.in/shop?gender=${product.genderCategory}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: catMap[product.category] ?? product.category,
          item: `https://veyron.in/shop?gender=${product.genderCategory}&sub=${product.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: product.title,
          item: `https://veyron.in/products/${product.handle}`,
        },
      ],
    };

    for (const schema of [productSchema, breadcrumbSchema]) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-veyron-ld", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      for (const s of document.querySelectorAll("script[data-veyron-ld]"))
        s.remove();
    };
  }, [product]);

  // ── Loading / not found ────────────────────────────────────────────────────

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div
        data-ocid="product_detail.not_found.section"
        className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-background px-6"
      >
        <h1 className="font-display text-3xl font-bold text-foreground text-center">
          Product Not Found
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          This piece is no longer available.
        </p>
        <Link
          to="/shop"
          data-ocid="product_detail.back_to_shop.link"
          className="text-xs text-primary border border-primary/30 px-6 py-3 hover:bg-primary/10 transition-colors duration-200 uppercase tracking-widest"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // ── Product-level data ─────────────────────────────────────────────────────

  const galleryImages =
    product.images.length > 0
      ? product.images
      : [{ src: "", alt: product.title }];

  // Use resolved variant price if valid; fall back to getProductPrice (shared utility)
  const priceToShow = (() => {
    if (
      resolvedVariant &&
      Number.isFinite(resolvedVariant.price) &&
      resolvedVariant.price > 0
    ) {
      return resolvedVariant.price;
    }
    return getProductPrice(product);
  })();

  const shortDesc =
    product.description.length > 160
      ? `${product.description.slice(0, 160).trim()}…`
      : product.description;
  const descIsTruncated = product.description.length > 160;

  const variantLabel =
    resolvedVariant?.title && resolvedVariant.title !== "Default Title"
      ? resolvedVariant.title
      : null;

  const categoryLabel = getCategoryLabel(
    product.genderCategory,
    product.category,
  );
  const hasSizeGuide =
    product.genderCategory === "womens" && product.category === "shorts"
      ? true // show guide button — will show contact note
      : !!getSizeChart(product.genderCategory, product.category);

  return (
    <>
      <SEO
        title={product ? `${product.title} | VE YRON` : "Product | VE YRON"}
        description={
          product
            ? `Shop ${product.title} — premium ${product.category} by VE YRON. Free delivery across India.`
            : "Premium activewear by VE YRON."
        }
      />
      <AddedToast visible={toastVisible} />

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={closeSizeGuide}
        genderCategory={product.genderCategory}
        category={product.category}
      />

      <div className="bg-background min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-3.5 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
            <Link
              to="/"
              data-ocid="product_detail.breadcrumb_home.link"
              className="hover:text-foreground transition-colors duration-200"
            >
              Home
            </Link>
            <span className="opacity-30">/</span>
            <Link
              to="/shop"
              data-ocid="product_detail.breadcrumb_shop.link"
              className="hover:text-foreground transition-colors duration-200"
            >
              Shop
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-foreground/70 truncate max-w-[140px] md:max-w-xs">
              {product.title}
            </span>
          </div>
        </div>

        <div
          data-ocid="product_detail.section"
          className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-6 md:py-14"
        >
          <div className="grid md:grid-cols-[55fr_45fr] gap-6 md:gap-12 lg:gap-18">
            {/* ── LEFT: Image Gallery ── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery images={galleryImages} badge={product.badge} />
            </motion.div>

            {/* ── RIGHT: Product Info ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex flex-col gap-5"
            >
              {/* Mobile back */}
              <Link
                to="/shop"
                data-ocid="product_detail.back.link"
                className="md:hidden flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors w-fit"
              >
                <ChevronLeft size={13} /> Back
              </Link>

              {/* Brand + category badge */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-bold">
                  VE YRON
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-muted text-muted-foreground">
                  {categoryLabel}
                </span>
                {product.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary">
                    {BADGE_LABELS[product.badge] ?? product.badge}
                  </span>
                )}
              </div>

              {/* Title + Price */}
              <div className="space-y-2">
                <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-[2rem] text-foreground tracking-tight leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-3 pt-1">
                  <span
                    data-ocid="product_detail.price"
                    className="font-display font-bold text-2xl md:text-3xl text-primary"
                  >
                    {formatPrice(priceToShow)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-muted-foreground line-through text-base">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Short description */}
              {shortDesc && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {shortDesc}
                </p>
              )}

              {/* ── COLOR SELECTOR ── */}
              {colorOptions.length > 0 && (
                <div data-ocid="product_detail.color_selector">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3">
                    COLOR
                    {selectedColor && (
                      <span className="ml-2 text-foreground">
                        {selectedColor}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => {
                      const variantsForColor = product.variants.filter((v) =>
                        v.selectedOptions.some(
                          (o) => isColorOption(o.name) && o.value === color,
                        ),
                      );
                      const isSelected = selectedColor === color;
                      const hasAvailable = variantsForColor.some(
                        (v) => v.available,
                      );
                      const isCssColor = isValidCssColor(color);

                      return (
                        <button
                          type="button"
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          data-ocid={`product_detail.color.${color.toLowerCase().replace(/\s+/g, "-")}.button`}
                          disabled={!hasAvailable}
                          title={color}
                          className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider border transition-smooth ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : hasAvailable
                                ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                : "border-border/30 text-muted-foreground/30 cursor-not-allowed opacity-40"
                          }`}
                        >
                          {isCssColor && (
                            <span
                              className="w-3 h-3 rounded-full border border-border/50 shrink-0"
                              style={{ backgroundColor: color }}
                            />
                          )}
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── SIZE SELECTOR ── */}
              {sizeOptions.length > 0 && (
                <div data-ocid="product_detail.size_selector">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                      SIZE
                      {selectedSize && (
                        <span className="ml-2 text-foreground font-bold">
                          {selectedSize}
                        </span>
                      )}
                    </p>
                    {/* SIZE GUIDE link — inline next to SIZE label */}
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      data-ocid="product_detail.size_guide.toggle"
                      className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-primary hover:opacity-75 transition-opacity"
                    >
                      <Ruler size={11} strokeWidth={2} />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => {
                      const variantsForSize = product.variants.filter((v) =>
                        v.selectedOptions.some(
                          (o) => isSizeOption(o.name) && o.value === size,
                        ),
                      );
                      const isSelected = selectedSize === size;
                      const hasAvailable = variantsForSize.some(
                        (v) => v.available,
                      );

                      return (
                        <button
                          type="button"
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          data-ocid={`product_detail.size.${size.toLowerCase()}.button`}
                          disabled={!hasAvailable}
                          className={`relative min-w-[48px] h-11 px-3 text-xs uppercase tracking-wider border transition-smooth ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary font-bold"
                              : hasAvailable
                                ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                : "border-border/30 text-muted-foreground/30 cursor-not-allowed"
                          }`}
                        >
                          {!hasAvailable && (
                            <span
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              aria-hidden="true"
                            >
                              <span
                                className="w-full h-px bg-border/40 absolute"
                                style={{ transform: "rotate(-20deg)" }}
                              />
                            </span>
                          )}
                          <span
                            className={
                              !hasAvailable ? "line-through opacity-40" : ""
                            }
                          >
                            {size}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Size fallback hint */}
                  {!hasSizeGuide && (
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      Need help with sizing?{" "}
                      <a
                        href="mailto:brangelbusiness@gmail.com"
                        className="text-primary underline underline-offset-2"
                      >
                        Contact us
                      </a>
                    </p>
                  )}
                </div>
              )}

              {/* Selected variant label */}
              {variantLabel && (
                <p className="-mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">
                  Selected:{" "}
                  <span className="text-foreground">{variantLabel}</span>
                </p>
              )}

              {/* ── QUANTITY ── */}
              <div data-ocid="product_detail.quantity_selector">
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground mb-3">
                  QUANTITY
                </p>
                <div className="inline-flex items-center border border-border">
                  <button
                    type="button"
                    data-ocid="product_detail.quantity_decrease.button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors duration-200 border-r border-border"
                  >
                    <Minus size={13} />
                  </button>
                  <span
                    data-ocid="product_detail.quantity_display"
                    className="w-12 h-11 flex items-center justify-center text-sm font-semibold text-foreground font-mono select-none"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    data-ocid="product_detail.quantity_increase.button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors duration-200 border-l border-border"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* ── ADD TO BAG ── */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!resolvedVariant?.available}
                data-ocid="product_detail.add_to_cart.primary_button"
                className={`w-full h-[54px] flex items-center justify-center gap-3 font-bold text-xs tracking-[0.2em] uppercase transition-smooth ${
                  !resolvedVariant?.available
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]"
                }`}
              >
                {!resolvedVariant?.available ? (
                  "SOLD OUT"
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    ADD TO BAG
                  </>
                )}
              </button>

              {/* ── PERKS strip ── */}
              <div className="grid grid-cols-3 gap-3 py-4 border-t border-border">
                {[
                  { icon: Shield, text: "100% Authentic" },
                  { icon: Truck, text: "5–7 Day Delivery" },
                  { icon: RotateCcw, text: "7-Day Returns" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <Icon
                      size={14}
                      className="text-primary"
                      strokeWidth={1.5}
                    />
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider leading-tight">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── COLLAPSIBLE SECTIONS ── */}
              <CollapsibleSection
                title="Product Details"
                ocid="product_detail.details.toggle"
                icon={<Shield size={12} strokeWidth={2} />}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description
                    ? descIsTruncated && !descExpanded
                      ? shortDesc
                      : product.description
                    : "Premium activewear crafted for performance and style. Designed for the modern athlete who demands excellence in every movement."}
                </p>
                {descIsTruncated && (
                  <button
                    type="button"
                    onClick={() => setDescExpanded((v) => !v)}
                    data-ocid="product_detail.description.expand_button"
                    className="mt-2 text-xs text-primary uppercase tracking-widest hover:underline"
                  >
                    {descExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </CollapsibleSection>

              <CollapsibleSection
                title="Delivery & Shipping"
                ocid="product_detail.delivery.toggle"
                icon={<Truck size={12} strokeWidth={2} />}
                defaultOpen
              >
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Truck
                      size={13}
                      className="text-primary mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    Free delivery across India. Estimated 5–7 business days.
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield
                      size={13}
                      className="text-primary mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    Secure packaging. Handled with care.
                  </li>
                </ul>
              </CollapsibleSection>

              <CollapsibleSection
                title="Returns & Exchanges"
                ocid="product_detail.returns.toggle"
                icon={<RotateCcw size={12} strokeWidth={2} />}
              >
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <RotateCcw
                      size={13}
                      className="text-primary mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    Easy returns within 7 days of delivery.
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield
                      size={13}
                      className="text-primary mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    Return shipping charges are borne by the customer.
                  </li>
                  <li className="flex items-start gap-2">
                    <RotateCcw
                      size={13}
                      className="text-primary mt-0.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    Refund or exchange processed after item is received and
                    inspected.
                  </li>
                </ul>
                <Link
                  to="/policies"
                  data-ocid="product_detail.view_policies.link"
                  className="mt-4 inline-flex items-center gap-1 text-[10px] text-primary uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  View full policies →
                </Link>
              </CollapsibleSection>
            </motion.div>
          </div>

          {/* ── YOU MAY ALSO LIKE — SAME genderCategory + category only ── */}
          {relatedProducts.length > 0 && (
            <section
              data-ocid="product_detail.related.section"
              className="mt-16 lg:mt-24"
            >
              <div className="border-t border-border pt-10">
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="font-display font-bold text-xl lg:text-2xl text-foreground tracking-tight">
                    You May Also Like
                  </h2>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    {categoryLabel}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {relatedProducts.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      data-ocid={`product_detail.related.item.${i + 1}`}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import {
  useMensProducts,
  usePlusMensProducts,
  useWomensProducts,
} from "../hooks/useShopifyProducts";
import type { Product } from "../types/product";

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonGrid({ count = 4 }: { count?: number }) {
  const keys = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={keys[i]} className="space-y-2">
          <Skeleton className="aspect-square w-full bg-muted" />
          <Skeleton className="h-4 w-3/4 bg-muted" />
          <Skeleton className="h-4 w-1/3 bg-muted" />
        </div>
      ))}
    </div>
  );
}

// ─── Coming Soon Placeholder Cards ────────────────────────────────────────────
function ComingSoonGrid({ count = 4 }: { count?: number }) {
  const keys = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={keys[i]}
          className="relative aspect-square overflow-hidden rounded-sm"
          style={{
            background:
              "linear-gradient(145deg, #0d0d0d 0%, #111 60%, #0a0a0a 100%)",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.05) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />
          <div className="relative h-full flex flex-col items-center justify-center gap-3 p-4 text-center">
            <span
              className="font-display font-black uppercase tracking-[0.05em] leading-none"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
                color: "rgba(212,175,55,0.12)",
              }}
            >
              VE
              <br />
              YRON
            </span>
            <span
              className="font-display font-black uppercase text-[9px] tracking-[0.35em]"
              style={{ color: "rgba(212,175,55,0.55)" }}
            >
              LAUNCHING SOON
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Marquee Strip ─────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = [
    "VE YRON",
    "LUXURY ACTIVEWEAR",
    "BUILT FOR EXCELLENCE",
    "TRACKPANTS",
    "SHORTS",
    "PREMIUM QUALITY",
  ];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden bg-card border-y border-border py-3.5 select-none"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {repeated.map((item, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static marquee items repeat deterministically
            key={`${item}-${i}`}
            className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground"
          >
            {item}
            <span className="mx-4 text-primary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Section heading ────────────────────────────────────────────────────────
function SectionHeading({
  pre,
  title,
  href,
  ocid,
}: {
  pre: string;
  title: string;
  href: string;
  ocid: string;
}) {
  return (
    <div className="flex items-end justify-between mb-7 md:mb-10">
      <div>
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.35em] mb-2">
          {pre}
        </p>
        <h2 className="font-display font-black uppercase text-2xl md:text-3xl lg:text-4xl text-foreground tracking-tight leading-none">
          {title}
        </h2>
      </div>
      <Link
        to={href as "/shop"}
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
        data-ocid={ocid}
      >
        VIEW ALL <ArrowRight size={12} />
      </Link>
    </div>
  );
}

// ─── Drop Section ──────────────────────────────────────────────────────────────
function DropSection({
  pre,
  title,
  viewAllHref,
  viewAllOcid,
  products,
  isLoading,
  startIndex,
  bg = "bg-background",
}: {
  pre: string;
  title: string;
  viewAllHref: string;
  viewAllOcid: string;
  products: Product[];
  isLoading: boolean;
  startIndex: number;
  bg?: string;
}) {
  const displayed = products.slice(0, 4);
  return (
    <section className={`${bg} py-14 md:py-20 px-4 md:px-8 lg:px-16`}>
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            pre={pre}
            title={title}
            href={viewAllHref}
            ocid={viewAllOcid}
          />
          {isLoading ? (
            <SkeletonGrid />
          ) : displayed.length === 0 ? (
            <ComingSoonGrid />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {displayed.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  data-ocid={`${title.toLowerCase().includes("men") && !title.toLowerCase().includes("women") ? "mens" : "womens"}.drop.item.${startIndex + i + 1}`}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Category Tiles ────────────────────────────────────────────────────────────
function CategoryTiles({
  mensImage,
  womensImage,
  plusImage,
}: {
  mensImage: string | null;
  womensImage: string | null;
  plusImage: string | null;
}) {
  const tiles = [
    {
      label: "MEN'S",
      sublabel: "Trackpants & Shorts",
      image: mensImage,
      href: "/shop",
      search: { sub: "trackpants", gender: "mens" },
      ocid: "category.mens.tile",
      gradient: "from-black/70 via-black/40 to-black/10",
    },
    {
      label: "WOMEN'S",
      sublabel: "Trackpants & Shorts",
      image: womensImage,
      href: "/shop",
      search: { sub: "trackpants", gender: "womens" },
      ocid: "category.womens.tile",
      gradient: "from-black/70 via-black/40 to-black/10",
    },
    {
      label: "PLUS SIZE",
      sublabel: "Sizes 2XL–5XL · Built for All Bodies",
      image: plusImage,
      href: "/shop",
      search: { sub: "plus-trackpants", gender: "plus" },
      ocid: "category.plus_size.tile",
      gradient: "from-black/80 via-black/50 to-black/20",
    },
  ] as const;

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border"
      data-ocid="home.category_tiles.section"
    >
      {tiles.map((tile, i) => (
        <motion.div
          key={tile.label}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden group cursor-pointer"
          style={{ minHeight: "clamp(340px, 48vw, 600px)" }}
          data-ocid={tile.ocid}
        >
          <Link
            to={tile.href as "/shop"}
            search={tile.search as never}
            className="block absolute inset-0"
            aria-label={`Shop ${tile.label}`}
          >
            {/* Background */}
            {tile.label === "PLUS SIZE" && !tile.image ? (
              // Premium typographic fallback for Plus Size
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background:
                    "linear-gradient(145deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.08) 0%, transparent 65%)",
                  }}
                />
                <span
                  className="font-display font-black uppercase tracking-[0.08em] text-center leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 7rem)",
                    color: "rgba(212,175,55,0.12)",
                  }}
                >
                  PLUS
                  <br />
                  SIZE
                </span>
              </div>
            ) : tile.image ? (
              <img
                src={tile.image}
                alt={`VE YRON ${tile.label}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)",
                }}
              />
            )}
            {/* Dark gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${tile.gradient} transition-opacity duration-300 group-hover:opacity-90`}
            />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                {tile.sublabel}
              </p>
              <h3 className="font-display font-black uppercase text-white text-3xl md:text-4xl lg:text-5xl leading-none mb-5">
                {tile.label}
              </h3>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/70 group-hover:text-primary transition-colors duration-300">
                SHOP NOW <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}

// ─── Brand Manifesto ──────────────────────────────────────────────────────────
function BrandManifesto() {
  return (
    <section
      className="relative bg-card border-y border-border py-24 md:py-36 px-6 text-center overflow-hidden"
      data-ocid="home.manifesto.section"
    >
      {/* Decorative faint brand mark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-black uppercase tracking-[0.5em]"
          style={{
            fontSize: "clamp(6rem, 20vw, 18rem)",
            color: "rgba(212,175,55,0.025)",
            lineHeight: 1,
          }}
        >
          VE YRON
        </span>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.35em] mb-8">
          The VE YRON Philosophy
        </p>
        <blockquote
          className="font-display font-black uppercase text-foreground leading-[1.1] mb-8"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)" }}
        >
          "PERFORMANCE WEARS
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MANY FACES.
          </span>
          <br />
          EXCELLENCE WEARS ONE."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <span
            className="h-px w-10"
            style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
          />
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">
            VE YRON
          </span>
          <span
            className="h-px w-10"
            style={{ backgroundColor: "rgba(212,175,55,0.4)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { products: mensProducts, isLoading: mensLoading } = useMensProducts();
  const { products: womensProducts, isLoading: womensLoading } =
    useWomensProducts();
  const { products: plusMensProducts } = usePlusMensProducts();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCategories = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const mensHeroImage = mensProducts[0]?.images[0]?.src ?? null;
  const womensHeroImage = womensProducts[0]?.images[0]?.src ?? null;
  const plusHeroImage = plusMensProducts[0]?.images[0]?.src ?? mensHeroImage;

  return (
    <div className="w-full overflow-x-hidden" data-ocid="home.page">
      <SEO
        title="VE YRON | Luxury Unisex Activewear India"
        description="Discover VE YRON's exclusive luxury activewear collection. Premium trackpants and shorts for men, women, and plus sizes. Free delivery across India."
      />
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
        data-ocid="home.hero.section"
      >
        {/* Pure dark gradient background */}
        <div className="absolute inset-0 hero-gradient-bg" />

        {/* Gold geometric accents */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-8 right-8 w-20 h-20 border-t border-r"
            style={{ borderColor: "rgba(212,175,55,0.18)" }}
          />
          <div
            className="absolute bottom-8 left-8 w-20 h-20 border-b border-l"
            style={{ borderColor: "rgba(212,175,55,0.18)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "80vw",
              height: "80vh",
              background:
                "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 65%)",
            }}
          />
          {/* Thin horizontal accent lines */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "15%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.08), transparent)",
            }}
          />
          <div
            className="absolute left-0 right-0"
            style={{
              bottom: "15%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.08), transparent)",
            }}
          />
        </div>

        {/* Hero content — centered */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-8">
          {/* New collection badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-7 md:mb-10"
          >
            <span
              className="h-px w-6"
              style={{ backgroundColor: "rgba(212,175,55,0.6)" }}
            />
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.45em]">
              New Collection 2026
            </span>
            <span
              className="h-px w-6"
              style={{ backgroundColor: "rgba(212,175,55,0.6)" }}
            />
          </motion.div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black uppercase tracking-tight leading-none mb-6 md:mb-8"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 13rem)",
              background:
                "linear-gradient(135deg, #ffffff 0%, #e8e0d0 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            VE YRON
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.35em] mb-10 md:mb-14"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Built for Excellence.&nbsp;&nbsp;Owned by Few.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Link
              to="/shop"
              search={{ sub: "trackpants", gender: "mens" } as never}
              className="btn-luxury min-w-[160px] inline-flex items-center justify-center gap-2"
              data-ocid="hero.shop_mens_button"
            >
              SHOP MEN <ArrowRight size={13} />
            </Link>
            <Link
              to="/shop"
              search={{ sub: "trackpants", gender: "womens" } as never}
              className="hero-btn-secondary px-6 py-4 font-bold uppercase tracking-widest text-xs transition-smooth hover:opacity-90 active:scale-95 inline-flex items-center justify-center gap-2 min-w-[160px]"
              data-ocid="hero.shop_womens_button"
            >
              SHOP WOMEN <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          onClick={scrollToCategories}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-300"
          animate={{ opacity: scrolled ? 0 : 0.55 }}
          aria-label="Scroll to categories"
          data-ocid="hero.scroll_down_button"
        >
          <span
            className="text-[9px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
          </motion.div>
        </motion.button>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── SHOP BY GENDER TILES ──────────────────────────────────────── */}
      <section id="categories" data-ocid="home.shop_category.section">
        <CategoryTiles
          mensImage={mensHeroImage}
          womensImage={womensHeroImage}
          plusImage={plusHeroImage}
        />
      </section>

      {/* ── QUICK NAV TABS ─────────────────────────────────────────────── */}
      <nav
        className="bg-card border-b border-border"
        aria-label="Category tabs"
        data-ocid="home.category_tabs.section"
      >
        <div className="max-w-[1440px] mx-auto flex">
          {(
            [
              { label: "ALL", sub: null, gender: null },
              { label: "MEN'S", sub: "trackpants", gender: "mens" },
              { label: "WOMEN'S", sub: "trackpants", gender: "womens" },
              {
                label: "PLUS SIZE",
                sub: "plus-trackpants",
                gender: "plus",
              },
            ] as const
          ).map(({ label, sub, gender }) => (
            <Link
              key={label}
              to="/shop"
              search={(sub ? { sub, gender } : {}) as never}
              className="flex-1 py-4 md:py-5 text-center font-black uppercase tracking-[0.18em] text-[11px] md:text-xs text-muted-foreground border-r last:border-r-0 border-border transition-smooth hover:bg-muted hover:text-foreground"
              data-ocid={`home.tab.${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.link`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── MEN'S LATEST DROP ─────────────────────────────────────────── */}
      <DropSection
        pre="Latest Drop · Men's"
        title="MEN'S LATEST DROP"
        viewAllHref="/shop"
        viewAllOcid="mens.drop.view_all.link"
        products={mensProducts}
        isLoading={mensLoading}
        startIndex={0}
        bg="bg-background"
      />

      {/* ── WOMEN'S LATEST DROP ───────────────────────────────────────── */}
      <DropSection
        pre="Latest Drop · Women's"
        title="WOMEN'S LATEST DROP"
        viewAllHref="/shop"
        viewAllOcid="womens.drop.view_all.link"
        products={womensProducts}
        isLoading={womensLoading}
        startIndex={4}
        bg="bg-muted/20"
      />

      {/* ── BRAND MANIFESTO ───────────────────────────────────────────── */}
      <BrandManifesto />

      {/* ── FULL-WIDTH CTA BANNER ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-28 px-6 text-center"
        style={{
          background:
            "linear-gradient(160deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
        }}
        data-ocid="home.cta_banner.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-5">
            Premium Activewear · India
          </p>
          <h2
            className="font-display font-black uppercase leading-tight text-white mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            TRACKPANTS &amp; SHORTS
            <br />
            FOR EVERY BODY.
          </h2>
          <p
            className="text-sm mb-10 max-w-md mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Premium performance wear engineered for those who move with
            intention. Men's, Women's, and Plus Sizes available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/shop"
              className="btn-luxury inline-flex items-center gap-2 min-w-[160px] justify-center"
              data-ocid="cta_banner.shop_all_button"
            >
              SHOP ALL <ArrowRight size={13} />
            </Link>
            <a
              href="mailto:brangelbusiness@gmail.com"
              className="hero-btn-secondary px-6 py-4 font-bold uppercase tracking-widest text-xs transition-smooth inline-flex items-center gap-2 min-w-[160px] justify-center"
              data-ocid="cta_banner.contact_button"
            >
              CONTACT US
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

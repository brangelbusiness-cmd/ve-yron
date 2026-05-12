import { Link } from "@tanstack/react-router";
import { formatPrice, getProductPrice } from "../data/products";
import type { Product } from "../types/product";

const BADGE_STYLES: Record<string, string> = {
  "new-arrival": "bg-success/10 text-success",
  "limited-edition": "bg-primary/10 text-primary",
  bestseller: "bg-accent/10 text-accent-foreground",
};

const BADGE_LABELS: Record<string, string> = {
  "new-arrival": "New",
  "limited-edition": "Limited",
  bestseller: "Bestseller",
};

const GENDER_LABELS: Record<string, string> = {
  mens: "Men's",
  womens: "Women's",
  "plus-mens": "Men's Plus",
  "plus-womens": "Women's Plus",
};

interface ProductCardProps {
  product: Product;
  showGenderBadge?: boolean;
}

export default function ProductCard({
  product,
  showGenderBadge = false,
}: ProductCardProps) {
  const primaryImage = product.images[0];
  const hoverImage = product.images[1];
  const isAvailable = product.variants.some((v) => v.available);
  const displayPrice = getProductPrice(product);

  return (
    <Link
      to="/products/$handle"
      params={{ handle: product.handle }}
      className="group block bg-card border border-border rounded-sm overflow-hidden hover:border-primary transition-all duration-300"
      data-ocid={`product.${product.handle}.card`}
    >
      {/* Image — strict 1:1, object-cover */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {primaryImage ? (
          <>
            <img
              src={primaryImage.src}
              alt={primaryImage.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                hoverImage
                  ? "group-hover:opacity-0 opacity-100"
                  : "group-hover:scale-105"
              }`}
              loading="lazy"
            />
            {hoverImage && (
              <img
                src={hoverImage.src}
                alt={hoverImage.alt}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              No Image
            </span>
          </div>
        )}

        {/* Hover overlay with VIEW text */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-end justify-center pb-4">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-black uppercase tracking-[0.2em] text-foreground bg-card/90 px-3 py-1.5">
            View
          </span>
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
              BADGE_STYLES[product.badge] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {BADGE_LABELS[product.badge] ?? product.badge}
          </span>
        )}

        {/* Sold out overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-background/60 flex items-end justify-center pb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-card/80 px-3 py-1">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 md:p-4">
        {showGenderBadge && (
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-1">
            {GENDER_LABELS[product.genderCategory]} \u00b7 {product.category}
          </p>
        )}
        <h3
          className="text-sm md:text-[15px] font-semibold text-foreground leading-snug"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </h3>
        <p
          className="mt-2 text-base font-bold"
          style={{ color: displayPrice > 0 ? "#d4af37" : undefined }}
        >
          {displayPrice > 0 ? (
            formatPrice(displayPrice)
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

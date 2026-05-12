import type { Collection, Product } from "../types/product";

// Static products removed — all products now come from Shopify Storefront API.
// This file holds shared price utilities and COLLECTIONS data.

export const COLLECTIONS: Collection[] = [
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "Fresh drops — the latest Trackpants and Shorts from VE YRON.",
    imageUrl: "",
    productCount: 0,
  },
  {
    handle: "bestsellers",
    title: "Bestsellers",
    description: "The pieces the elite keep coming back for.",
    imageUrl: "",
    productCount: 0,
  },
];

/**
 * Safe numeric price parser.
 * Accepts string | number | null | undefined.
 * Returns a positive integer (rounded) or 0.
 */
export function safeParsePrice(
  val: string | number | null | undefined,
): number {
  if (val === null || val === undefined || val === "") return 0;
  const n = typeof val === "number" ? val : Number.parseFloat(String(val));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
}

/**
 * Format a price number as ₹ in Indian locale.
 * If price is 0 or invalid, returns 'Price unavailable'.
 */
export function formatPrice(price: number | string | null | undefined): string {
  const n = safeParsePrice(price);
  if (n <= 0) return "Price unavailable";
  return `\u20B9${n.toLocaleString("en-IN")}`;
}

/**
 * Get the best display price for a product.
 * Tries the lowest valid variant price first; falls back to product.price.
 */
export function getProductPrice(product: Product): number {
  if (product.variants && product.variants.length > 0) {
    const prices = product.variants
      .map((v) => safeParsePrice(v.price))
      .filter((p) => p > 0);
    if (prices.length > 0) return Math.min(...prices);
  }
  return safeParsePrice(product.price);
}

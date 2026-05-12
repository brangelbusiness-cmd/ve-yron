import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchProductByHandle,
  fetchProductsByGender,
  fetchProductsBySubCategory,
} from "../lib/shopify";
import type { GenderCategory, Product, SubCategory } from "../types/product";

const STALE = 60_000;
const GC = 300_000;

function safe<T>(fn: () => Promise<T>, fallback: T): () => Promise<T> {
  return async () => {
    try {
      return await fn();
    } catch (e) {
      console.error("[Shopify]", e);
      return fallback;
    }
  };
}

/** All products from Shopify */
export function useAllProducts() {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", "all"],
    queryFn: safe(fetchAllProducts, []),
    staleTime: STALE,
    gcTime: GC,
  });
  return {
    products: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error as Error | null,
  };
}

/** Men's only (excludes plus) */
export function useMensProducts() {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", "mens"],
    queryFn: safe(() => fetchProductsByGender("mens"), []),
    staleTime: STALE,
    gcTime: GC,
  });
  return { products: q.data ?? [], isLoading: q.isLoading };
}

/** Women's only (excludes plus) */
export function useWomensProducts() {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", "womens"],
    queryFn: safe(() => fetchProductsByGender("womens"), []),
    staleTime: STALE,
    gcTime: GC,
  });
  return { products: q.data ?? [], isLoading: q.isLoading };
}

/** Men's Plus Size only */
export function usePlusMensProducts() {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", "plus-mens"],
    queryFn: safe(() => fetchProductsByGender("plus-mens"), []),
    staleTime: STALE,
    gcTime: GC,
  });
  return { products: q.data ?? [], isLoading: q.isLoading };
}

/** Women's Plus Size only */
export function usePlusWomensProducts() {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", "plus-womens"],
    queryFn: safe(() => fetchProductsByGender("plus-womens"), []),
    staleTime: STALE,
    gcTime: GC,
  });
  return { products: q.data ?? [], isLoading: q.isLoading };
}

/** Newest 8 products (homepage featured) */
export function useFeaturedProducts() {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products-featured"],
    queryFn: safe(async () => {
      const all = await fetchAllProducts();
      return all.slice(0, 8);
    }, []),
    staleTime: STALE,
    gcTime: GC,
  });
  return {
    products: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error as Error | null,
  };
}

/** Products by exact sub-category */
export function useSubCategoryProducts(sub: SubCategory | undefined) {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products-sub", sub],
    queryFn: safe(() => fetchProductsBySubCategory(sub!), []),
    staleTime: STALE,
    gcTime: GC,
    enabled: !!sub,
  });
  return { products: q.data ?? [], isLoading: q.isLoading };
}

/** Products filtered by gender (all sub-types included) */
export function useGenderProducts(gender: GenderCategory | undefined) {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", gender],
    queryFn: safe(() => fetchProductsByGender(gender!), []),
    staleTime: STALE,
    gcTime: GC,
    enabled: !!gender,
  });
  return { products: q.data ?? [], isLoading: q.isLoading };
}

/** Legacy compatible */
export function useShopifyProducts(gender?: GenderCategory) {
  const q = useQuery<Product[]>({
    queryKey: ["shopify-products", gender ?? "all"],
    queryFn: safe(
      async () => (gender ? fetchProductsByGender(gender) : fetchAllProducts()),
      [],
    ),
    staleTime: STALE,
    gcTime: GC,
  });
  return {
    products: q.data ?? [],
    isLoading: q.isLoading,
    error: q.error as Error | null,
  };
}

/** Single product by handle */
export function useShopifyProduct(handle: string) {
  const q = useQuery<Product | null>({
    queryKey: ["shopify-product", handle],
    queryFn: safe(() => fetchProductByHandle(handle), null),
    staleTime: STALE,
    gcTime: GC,
    enabled: !!handle,
  });
  return {
    product: q.data,
    isLoading: q.isLoading,
    error: q.error as Error | null,
  };
}

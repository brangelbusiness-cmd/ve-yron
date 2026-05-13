import { safeParsePrice } from "../data/products";
import type {
  GenderCategory,
  Product,
  ProductCategory,
  ProductImage,
  ProductVariant,
  SubCategory,
} from "../types/product";

// ─── Config ────────────────────────────────────────────────────────────────────

const STORE_DOMAIN = "veyron-9282.myshopify.com";
const STOREFRONT_TOKEN = "f4fba62fd890ac32c648e6fe38b0dee7";
const API_VERSION = "2024-01";
const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

// ─── GraphQL ───────────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  tags
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 20) {
    edges { node { url altText } }
  }
  variants(first: 20) {
    edges {
      node {
        id title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  collections(first: 5) {
    edges { node { handle title } }
  }
`;

const GET_PRODUCTS = `
  query GetProducts {
    products(first: 50, sortKey: CREATED_AT, reverse: true) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

const CREATE_CART = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id quantity
              merchandise {
                ... on ProductVariant {
                  id title
                  product { title }
                }
              }
            }
          }
        }
      }
      userErrors { field message }
    }
  }
`;

// ─── Shopify API Types ─────────────────────────────────────────────────────────

interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}
interface ShopifyImage {
  url: string;
  altText: string | null;
}
interface ShopifySelectedOption {
  name: string;
  value: string;
}
interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  availableForSale: boolean;
  selectedOptions: ShopifySelectedOption[];
}
interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  priceRange: { minVariantPrice: ShopifyMoneyV2 };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  collections: { edges: { node: { handle: string; title: string } }[] };
}

export interface DeliveryAddress {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}

export interface BuyerIdentity {
  phone?: string;
  email?: string;
  deliveryAddressPreferences?: { deliveryAddress: DeliveryAddress }[];
}

// ─── GraphQL Client ────────────────────────────────────────────────────────────

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = (await res.json()) as {
    data: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length)
    throw new Error(
      `Shopify GraphQL: ${json.errors.map((e) => e.message).join(", ")}`,
    );
  return json.data;
}

// ─── CRITICAL: Bullet-proof product categorization ───────────────────────────
// Rules:
//  1. Check women FIRST ("womens" contains "men" — must not match men)
//  2. Check plus SEPARATELY — plus products get plus-mens or plus-womens
//  3. Check shorts BEFORE trackpants in the title
//  4. Every product gets a definitive subCategory + genderCategory

function categorizeProduct(title: string): {
  genderCategory: GenderCategory;
  category: ProductCategory;
  subCategory: SubCategory;
} {
  const t = title.toLowerCase();

  // Category: shorts vs trackpants
  const isShorts = t.includes("short");
  const category: ProductCategory = isShorts ? "shorts" : "trackpants";

  // Gender: women MUST be checked before men
  const isWomens = t.includes("women") || t.includes("women's");
  // Only match men if no women keyword found
  const isMens = !isWomens && (t.includes("men's") || /\bmens?\b/.test(t));
  const isPlus = t.includes("plus");

  let genderCategory: GenderCategory;
  if (isWomens && isPlus) genderCategory = "plus-womens";
  else if (isMens && isPlus) genderCategory = "plus-mens";
  else if (isWomens) genderCategory = "womens";
  else if (isMens) genderCategory = "mens";
  else if (isPlus) genderCategory = "plus-mens";
  else genderCategory = "mens";

  // Derive subCategory
  let subCategory: SubCategory;
  if (genderCategory === "plus-mens" && category === "trackpants")
    subCategory = "mens-plus-trackpants";
  else if (genderCategory === "plus-mens" && category === "shorts")
    subCategory = "mens-plus-shorts";
  else if (genderCategory === "plus-womens" && category === "trackpants")
    subCategory = "womens-plus-trackpants";
  else if (genderCategory === "plus-womens" && category === "shorts")
    subCategory = "womens-plus-shorts";
  else if (genderCategory === "womens" && category === "trackpants")
    subCategory = "womens-trackpants";
  else if (genderCategory === "womens" && category === "shorts")
    subCategory = "womens-shorts";
  else if (category === "shorts") subCategory = "mens-shorts";
  else subCategory = "mens-trackpants";

  return { genderCategory, category, subCategory };
}

// ─── Transformer ───────────────────────────────────────────────────────────────

function transformShopifyProduct(p: ShopifyProduct): Product {
  const images: ProductImage[] = p.images.edges.map(({ node }) => ({
    src: node.url,
    alt: node.altText ?? p.title,
  }));

  const variants: ProductVariant[] = p.variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    sku: node.id,
    // safeParsePrice handles the string '2999.00' → 2999 correctly
    price: safeParsePrice(node.price?.amount),
    available: node.availableForSale,
    selectedOptions: node.selectedOptions,
  }));

  const collections = p.collections.edges.map(({ node }) => node.handle);

  // Derive best price: try variants first (most accurate), then priceRange fallback
  const variantPrices = variants.map((v) => v.price).filter((pr) => pr > 0);
  const priceRangePrice = safeParsePrice(p.priceRange?.minVariantPrice?.amount);
  const minPrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : priceRangePrice;

  // Derive compareAtPrice: take min compareAtPrice across variants that have it
  const compareAtPrices = p.variants.edges
    .map(({ node }) => safeParsePrice(node.compareAtPrice?.amount))
    .filter((pr) => pr > 0);
  const compareAtPrice =
    compareAtPrices.length > 0 ? Math.min(...compareAtPrices) : undefined;

  const { genderCategory, category, subCategory } = categorizeProduct(p.title);

  const lowerTags = p.tags.map((t) => t.toLowerCase());
  let badge: Product["badge"];
  if (lowerTags.some((t) => t.includes("limited"))) badge = "limited-edition";
  else if (lowerTags.some((t) => t.includes("bestseller")))
    badge = "bestseller";
  else if (
    lowerTags.some(
      (t) => t.includes("new-arrival") || t.includes("new arrival"),
    )
  )
    badge = "new-arrival";

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    price: minPrice,
    compareAtPrice:
      compareAtPrice && compareAtPrice > minPrice ? compareAtPrice : undefined,
    category,
    genderCategory,
    subCategory,
    collections,
    tags: p.tags,
    images,
    variants,
    badge,
  };
}

// ─── Public API ────────────────────────────────────────────────────────────────

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(GET_PRODUCTS);
  return data.products.edges.map(({ node }) => transformShopifyProduct(node));
}

export async function fetchProductsByGender(
  gender: GenderCategory,
): Promise<Product[]> {
  const all = await fetchAllProducts();
  return all.filter((p) => p.genderCategory === gender);
}

export async function fetchProductsBySubCategory(
  sub: SubCategory,
): Promise<Product[]> {
  const all = await fetchAllProducts();
  return all.filter((p) => p.subCategory === sub);
}

export async function fetchProductByHandle(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle },
  );
  if (!data.product) return null;
  return transformShopifyProduct(data.product);
}

export async function createShopifyCart(
  lines: { merchandiseId: string; quantity: number }[],
  buyerIdentity?: BuyerIdentity,
): Promise<{ checkoutUrl: string }> {
  const input: Record<string, unknown> = { lines };
  if (buyerIdentity) input.buyerIdentity = buyerIdentity;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CREATE_CART, { input });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      `Cart error: ${data.cartCreate.userErrors.map((e) => e.message).join(", ")}`,
    );
  }
  if (!data.cartCreate.cart) throw new Error("Cart creation failed");
  return { checkoutUrl: data.cartCreate.cart.checkoutUrl };
}

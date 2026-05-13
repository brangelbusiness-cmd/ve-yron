import { G as safeParsePrice } from "./index-CWjEpYzx.js";
const STORE_DOMAIN = "veyron-9282.myshopify.com";
const STOREFRONT_TOKEN = "f4fba62fd890ac32c648e6fe38b0dee7";
const API_VERSION = "2024-01";
const ENDPOINT = `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;
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
async function shopifyFetch(query, variables) {
  var _a;
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if ((_a = json.errors) == null ? void 0 : _a.length)
    throw new Error(
      `Shopify GraphQL: ${json.errors.map((e) => e.message).join(", ")}`
    );
  return json.data;
}
function categorizeProduct(title) {
  const t = title.toLowerCase();
  const isShorts = t.includes("short");
  const category = isShorts ? "shorts" : "trackpants";
  const isWomens = t.includes("women") || t.includes("women's");
  const isMens = !isWomens && (t.includes("men's") || /\bmens?\b/.test(t));
  const isPlus = t.includes("plus");
  let genderCategory;
  if (isWomens && isPlus) genderCategory = "plus-womens";
  else if (isMens && isPlus) genderCategory = "plus-mens";
  else if (isWomens) genderCategory = "womens";
  else if (isMens) genderCategory = "mens";
  else if (isPlus) genderCategory = "plus-mens";
  else genderCategory = "mens";
  let subCategory;
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
function transformShopifyProduct(p) {
  var _a, _b;
  const images = p.images.edges.map(({ node }) => ({
    src: node.url,
    alt: node.altText ?? p.title
  }));
  const variants = p.variants.edges.map(({ node }) => {
    var _a2;
    return {
      id: node.id,
      title: node.title,
      sku: node.id,
      // safeParsePrice handles the string '2999.00' → 2999 correctly
      price: safeParsePrice((_a2 = node.price) == null ? void 0 : _a2.amount),
      available: node.availableForSale,
      selectedOptions: node.selectedOptions
    };
  });
  const collections = p.collections.edges.map(({ node }) => node.handle);
  const variantPrices = variants.map((v) => v.price).filter((pr) => pr > 0);
  const priceRangePrice = safeParsePrice((_b = (_a = p.priceRange) == null ? void 0 : _a.minVariantPrice) == null ? void 0 : _b.amount);
  const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : priceRangePrice;
  const compareAtPrices = p.variants.edges.map(({ node }) => {
    var _a2;
    return safeParsePrice((_a2 = node.compareAtPrice) == null ? void 0 : _a2.amount);
  }).filter((pr) => pr > 0);
  const compareAtPrice = compareAtPrices.length > 0 ? Math.min(...compareAtPrices) : void 0;
  const { genderCategory, category, subCategory } = categorizeProduct(p.title);
  const lowerTags = p.tags.map((t) => t.toLowerCase());
  let badge;
  if (lowerTags.some((t) => t.includes("limited"))) badge = "limited-edition";
  else if (lowerTags.some((t) => t.includes("bestseller")))
    badge = "bestseller";
  else if (lowerTags.some(
    (t) => t.includes("new-arrival") || t.includes("new arrival")
  ))
    badge = "new-arrival";
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    price: minPrice,
    compareAtPrice: compareAtPrice && compareAtPrice > minPrice ? compareAtPrice : void 0,
    category,
    genderCategory,
    subCategory,
    collections,
    tags: p.tags,
    images,
    variants,
    badge
  };
}
async function fetchAllProducts() {
  const data = await shopifyFetch(GET_PRODUCTS);
  return data.products.edges.map(({ node }) => transformShopifyProduct(node));
}
async function fetchProductsByGender(gender) {
  const all = await fetchAllProducts();
  return all.filter((p) => p.genderCategory === gender);
}
async function fetchProductByHandle(handle) {
  const data = await shopifyFetch(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
  if (!data.product) return null;
  return transformShopifyProduct(data.product);
}
async function createShopifyCart(lines, buyerIdentity) {
  const input = { lines };
  if (buyerIdentity) input.buyerIdentity = buyerIdentity;
  const data = await shopifyFetch(CREATE_CART, { input });
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      `Cart error: ${data.cartCreate.userErrors.map((e) => e.message).join(", ")}`
    );
  }
  if (!data.cartCreate.cart) throw new Error("Cart creation failed");
  return { checkoutUrl: data.cartCreate.cart.checkoutUrl };
}
export {
  fetchProductsByGender as a,
  fetchProductByHandle as b,
  createShopifyCart as c,
  fetchAllProducts as f
};

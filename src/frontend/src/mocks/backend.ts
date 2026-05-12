import type { backendInterface } from "../backend";

const mockProducts = [
  {
    id: "prod-001",
    title: "VE YRON Mens Trackpants - Apex Edition",
    handle: "mens-trackpants-apex",
    description: "Engineered for elite performance. Ultra-lightweight fabric with moisture-wicking technology. Perfect fit for men who demand excellence.",
    tags: ["mens", "trackpants"],
    collections: ["mens"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
      altText: "VE YRON Mens Trackpants Apex Edition",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
        altText: "VE YRON Mens Trackpants Apex Edition",
      },
    ],
    variants: [
      { id: "var-001-s", title: "Black / S", color: "Black", size: "S", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
      { id: "var-001-m", title: "Black / M", color: "Black", size: "M", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
      { id: "var-001-l", title: "Black / L", color: "Black", size: "L", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
      { id: "var-001-xl", title: "Black / XL", color: "Black", size: "XL", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
    ],
  },
  {
    id: "prod-002",
    title: "VE YRON Mens Shorts - Titan Series",
    handle: "mens-shorts-titan",
    description: "Premium four-way stretch fabric. Engineered ventilation zones. Crafted for high-performance training.",
    tags: ["mens", "shorts"],
    collections: ["mens"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
      altText: "VE YRON Mens Shorts Titan Series",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80",
        altText: "VE YRON Mens Shorts Titan Series",
      },
    ],
    variants: [
      { id: "var-002-s", title: "Midnight / S", color: "Midnight", size: "S", price: { currencyCode: "INR", amount: "1799" }, availableForSale: true },
      { id: "var-002-m", title: "Midnight / M", color: "Midnight", size: "M", price: { currencyCode: "INR", amount: "1799" }, availableForSale: true },
      { id: "var-002-l", title: "Midnight / L", color: "Midnight", size: "L", price: { currencyCode: "INR", amount: "1799" }, availableForSale: true },
    ],
  },
  {
    id: "prod-003",
    title: "VE YRON Mens Plus Size Trackpants",
    handle: "mens-plus-trackpants",
    description: "Luxury plus-size trackpants engineered for comfort and performance. Extended range with the same premium VE YRON quality.",
    tags: ["mens", "plus", "trackpants"],
    collections: ["plus"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      altText: "VE YRON Mens Plus Size Trackpants",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
        altText: "VE YRON Mens Plus Size Trackpants",
      },
    ],
    variants: [
      { id: "var-003-2xl", title: "Black / 2XL", color: "Black", size: "2XL", price: { currencyCode: "INR", amount: "2699" }, availableForSale: true },
      { id: "var-003-3xl", title: "Black / 3XL", color: "Black", size: "3XL", price: { currencyCode: "INR", amount: "2699" }, availableForSale: true },
      { id: "var-003-4xl", title: "Black / 4XL", color: "Black", size: "4XL", price: { currencyCode: "INR", amount: "2699" }, availableForSale: true },
    ],
  },
  {
    id: "prod-004",
    title: "VE YRON Mens Plus Size Shorts",
    handle: "mens-plus-shorts",
    description: "Plus size athletic shorts with superior stretch and premium build. Built for men who move with power.",
    tags: ["mens", "plus", "shorts"],
    collections: ["plus"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      altText: "VE YRON Mens Plus Size Shorts",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        altText: "VE YRON Mens Plus Size Shorts",
      },
    ],
    variants: [
      { id: "var-004-2xl", title: "Charcoal / 2XL", color: "Charcoal", size: "2XL", price: { currencyCode: "INR", amount: "1999" }, availableForSale: true },
      { id: "var-004-3xl", title: "Charcoal / 3XL", color: "Charcoal", size: "3XL", price: { currencyCode: "INR", amount: "1999" }, availableForSale: true },
    ],
  },
  {
    id: "prod-005",
    title: "VE YRON Womens Trackpants - Phantom Series",
    handle: "womens-trackpants-phantom",
    description: "Second-skin fit technology. Sculpted panelling with UV protection. Reserved for women who demand luxury performance.",
    tags: ["womens", "trackpants"],
    collections: ["womens"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      altText: "VE YRON Womens Trackpants Phantom Series",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
        altText: "VE YRON Womens Trackpants Phantom Series",
      },
    ],
    variants: [
      { id: "var-005-xs", title: "Onyx / XS", color: "Onyx", size: "XS", price: { currencyCode: "INR", amount: "2299" }, availableForSale: true },
      { id: "var-005-s", title: "Onyx / S", color: "Onyx", size: "S", price: { currencyCode: "INR", amount: "2299" }, availableForSale: true },
      { id: "var-005-m", title: "Onyx / M", color: "Onyx", size: "M", price: { currencyCode: "INR", amount: "2299" }, availableForSale: true },
      { id: "var-005-l", title: "Onyx / L", color: "Onyx", size: "L", price: { currencyCode: "INR", amount: "2299" }, availableForSale: true },
    ],
  },
  {
    id: "prod-006",
    title: "VE YRON Womens Shorts - Obsidian Cut",
    handle: "womens-shorts-obsidian",
    description: "Premium athletic shorts engineered for women. High-waist design with compression lining. The pinnacle of feminine sportswear.",
    tags: ["womens", "shorts"],
    collections: ["womens"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80",
      altText: "VE YRON Womens Shorts Obsidian Cut",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80",
        altText: "VE YRON Womens Shorts Obsidian Cut",
      },
    ],
    variants: [
      { id: "var-006-xs", title: "Black / XS", color: "Black", size: "XS", price: { currencyCode: "INR", amount: "1699" }, availableForSale: true },
      { id: "var-006-s", title: "Black / S", color: "Black", size: "S", price: { currencyCode: "INR", amount: "1699" }, availableForSale: true },
      { id: "var-006-m", title: "Black / M", color: "Black", size: "M", price: { currencyCode: "INR", amount: "1699" }, availableForSale: true },
    ],
  },
  {
    id: "prod-007",
    title: "VE YRON Womens Plus Size Trackpants",
    handle: "womens-plus-trackpants",
    description: "Extended-size luxury trackpants for women. Designed with comfort and premium style. Full VE YRON quality in every size.",
    tags: ["womens", "plus", "trackpants"],
    collections: ["plus"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      altText: "VE YRON Womens Plus Size Trackpants",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
        altText: "VE YRON Womens Plus Size Trackpants",
      },
    ],
    variants: [
      { id: "var-007-2xl", title: "Navy / 2XL", color: "Navy", size: "2XL", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
      { id: "var-007-3xl", title: "Navy / 3XL", color: "Navy", size: "3XL", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
      { id: "var-007-4xl", title: "Navy / 4XL", color: "Navy", size: "4XL", price: { currencyCode: "INR", amount: "2499" }, availableForSale: true },
    ],
  },
  {
    id: "prod-008",
    title: "VE YRON Womens Plus Size Shorts",
    handle: "womens-plus-shorts",
    description: "Luxury plus-size shorts for women. Breathable performance fabric with premium finish. Exclusively VE YRON.",
    tags: ["womens", "plus", "shorts"],
    collections: ["plus"],
    featuredImage: {
      url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
      altText: "VE YRON Womens Plus Size Shorts",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
        altText: "VE YRON Womens Plus Size Shorts",
      },
    ],
    variants: [
      { id: "var-008-2xl", title: "Slate / 2XL", color: "Slate", size: "2XL", price: { currencyCode: "INR", amount: "1899" }, availableForSale: true },
      { id: "var-008-3xl", title: "Slate / 3XL", color: "Slate", size: "3XL", price: { currencyCode: "INR", amount: "1899" }, availableForSale: true },
    ],
  },
];

export const mockBackend: backendInterface = {
  getProducts: async () => mockProducts,

  getProductsByCollection: async (collection: string) =>
    mockProducts.filter((p) => p.collections.includes(collection)),

  getProductByHandle: async (handle: string) =>
    mockProducts.find((p) => p.handle === handle) ?? null,

  buildCheckoutUrl: async (_cartItems) =>
    "https://veyron-9282.myshopify.com/cart/mock-checkout",

  createOrder: async (_order) => Promise.resolve("VY" + Date.now()),

  getOrders: async () => Promise.resolve([]),
};

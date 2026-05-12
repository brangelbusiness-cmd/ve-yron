// ─── Gender & Category Types ──────────────────────────────────────────────────

/**
 * GenderCategory drives which tab a product appears in.
 * 'plus-mens' = Men's Plus Size, 'plus-womens' = Women's Plus Size
 */
export type GenderCategory = "mens" | "womens" | "plus-mens" | "plus-womens";

export type ProductCategory = "trackpants" | "shorts";

export type SubCategory =
  | "mens-trackpants"
  | "mens-shorts"
  | "mens-plus-trackpants"
  | "mens-plus-shorts"
  | "womens-trackpants"
  | "womens-shorts"
  | "womens-plus-trackpants"
  | "womens-plus-shorts";

// ─── Product Types ─────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  price: number;
  available: boolean;
  selectedOptions: { name: string; value: string }[];
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  genderCategory: GenderCategory;
  subCategory: SubCategory;
  collections: string[];
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  badge?: "new-arrival" | "limited-edition" | "bestseller";
}

// ─── Cart Types ────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

// ─── Address & Order ───────────────────────────────────────────────────────────

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderDetails {
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  createdAt: string;
}

// ─── Collection ────────────────────────────────────────────────────────────────

export interface Collection {
  handle: string;
  title: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

// ─── Nav helpers ───────────────────────────────────────────────────────────────

export interface NavSubItem {
  label: string;
  subCategory: SubCategory;
  genderCategory: GenderCategory;
}

export interface NavCategory {
  label: string;
  genderCategory: GenderCategory;
  sub: NavSubItem[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: "MEN'S",
    genderCategory: "mens",
    sub: [
      {
        label: "Men's Trackpants",
        subCategory: "mens-trackpants",
        genderCategory: "mens",
      },
      {
        label: "Men's Shorts",
        subCategory: "mens-shorts",
        genderCategory: "mens",
      },
      {
        label: "Men's Plus Size Trackpants",
        subCategory: "mens-plus-trackpants",
        genderCategory: "plus-mens",
      },
      {
        label: "Men's Plus Size Shorts",
        subCategory: "mens-plus-shorts",
        genderCategory: "plus-mens",
      },
    ],
  },
  {
    label: "WOMEN'S",
    genderCategory: "womens",
    sub: [
      {
        label: "Women's Trackpants",
        subCategory: "womens-trackpants",
        genderCategory: "womens",
      },
      {
        label: "Women's Shorts",
        subCategory: "womens-shorts",
        genderCategory: "womens",
      },
      {
        label: "Women's Plus Size Trackpants",
        subCategory: "womens-plus-trackpants",
        genderCategory: "plus-womens",
      },
      {
        label: "Women's Plus Size Shorts",
        subCategory: "womens-plus-shorts",
        genderCategory: "plus-womens",
      },
    ],
  },
  {
    label: "PLUS SIZE",
    genderCategory: "plus-mens",
    sub: [
      {
        label: "Men's Plus Size Trackpants",
        subCategory: "mens-plus-trackpants",
        genderCategory: "plus-mens",
      },
      {
        label: "Men's Plus Size Shorts",
        subCategory: "mens-plus-shorts",
        genderCategory: "plus-mens",
      },
      {
        label: "Women's Plus Size Trackpants",
        subCategory: "womens-plus-trackpants",
        genderCategory: "plus-womens",
      },
      {
        label: "Women's Plus Size Shorts",
        subCategory: "womens-plus-shorts",
        genderCategory: "plus-womens",
      },
    ],
  },
];

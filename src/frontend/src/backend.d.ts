import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ShippingAddress {
    city: string;
    name: string;
    state: string;
    address: string;
    phone: string;
    pincode: string;
}
export interface ProductImage {
    url: string;
    altText: string;
}
export interface OrderDetails {
    totalAmount: number;
    shippingAddress: ShippingAddress;
    items: Array<CartItem>;
    orderNumber: string;
}
export interface MoneyV2 {
    currencyCode: string;
    amount: string;
}
export interface CartItem {
    productId: string;
    variantId: string;
    quantity: bigint;
    price: MoneyV2;
}
export interface ProductVariant {
    id: string;
    title: string;
    color: string;
    size: string;
    price: MoneyV2;
    availableForSale: boolean;
}
export interface Product {
    id: string;
    title: string;
    featuredImage: ProductImage;
    tags: Array<string>;
    description: string;
    collections: Array<string>;
    variants: Array<ProductVariant>;
    handle: string;
    images: Array<ProductImage>;
}
export interface backendInterface {
    buildCheckoutUrl(cartItems: Array<CartItem>): Promise<string>;
    createOrder(order: OrderDetails): Promise<string>;
    getOrders(): Promise<Array<OrderDetails>>;
    getProductByHandle(handle: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCollection(collection: string): Promise<Array<Product>>;
}

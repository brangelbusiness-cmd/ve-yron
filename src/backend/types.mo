module {
  // --- Product Catalog Types (Shopify Storefront API compatible) ---

  public type ProductImage = {
    url : Text;
    altText : Text;
  };

  public type MoneyV2 = {
    amount : Text; // e.g. "12000.00"
    currencyCode : Text; // "INR"
  };

  public type ProductVariant = {
    id : Text;
    title : Text; // e.g. "S / Black"
    size : Text;
    color : Text;
    price : MoneyV2;
    availableForSale : Bool;
  };

  public type Product = {
    id : Text;
    handle : Text;
    title : Text;
    description : Text;
    collections : [Text]; // e.g. ["new-arrivals", "bestsellers"]
    tags : [Text];
    variants : [ProductVariant];
    images : [ProductImage];
    featuredImage : ProductImage;
  };

  // --- Cart Types ---

  public type CartItem = {
    productId : Text;
    variantId : Text;
    quantity : Nat;
    price : MoneyV2;
  };

  // --- Order Types ---

  public type ShippingAddress = {
    name : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    pincode : Text;
  };

  public type OrderDetails = {
    orderNumber : Text;
    items : [CartItem];
    shippingAddress : ShippingAddress;
    totalAmount : Float;
  };
}

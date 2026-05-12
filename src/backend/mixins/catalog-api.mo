import Types "../types";
import CatalogLib "../lib/catalog";
import List "mo:core/List";
import Nat "mo:core/Nat";

mixin (orders : List.List<Types.OrderDetails>) {

  public query func getProducts() : async [Types.Product] {
    CatalogLib.getProducts()
  };

  public query func getProductByHandle(handle : Text) : async ?Types.Product {
    CatalogLib.getProductByHandle(handle)
  };

  public query func getProductsByCollection(collection : Text) : async [Types.Product] {
    CatalogLib.getProductsByCollection(collection)
  };

  public query func buildCheckoutUrl(cartItems : [Types.CartItem]) : async Text {
    CatalogLib.buildCheckoutUrl(cartItems)
  };

  // Stores the order and returns its order number.
  // Delivery: 5–7 days. Returns accepted within 7 days of delivery.
  // Refund is processed only after the returned product is received.
  public func createOrder(order : Types.OrderDetails) : async Text {
    orders.add(order);
    order.orderNumber
  };

  public query func getOrders() : async [Types.OrderDetails] {
    orders.toArray()
  };
};

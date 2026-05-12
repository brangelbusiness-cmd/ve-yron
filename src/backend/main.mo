import CatalogMixin "mixins/catalog-api";
import Types "types";
import List "mo:core/List";

actor {
  let orders = List.empty<Types.OrderDetails>();
  include CatalogMixin(orders);
};

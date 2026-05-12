import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { formatPrice, safeParsePrice } from "../data/products";
import { useCartStore } from "../stores/cart";

// formatPrice imported from ../data/products — local declaration removed

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) =>
    s.items.reduce(
      (acc, i) => acc + safeParsePrice(i.variant.price) * i.quantity,
      0,
    ),
  );
  const navigate = useNavigate();

  function handleCheckout() {
    closeCart();
    navigate({ to: "/checkout" });
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-background/70 backdrop-blur-sm"
          onClick={closeCart}
          onKeyDown={(e) => e.key === "Escape" && closeCart()}
          role="presentation"
        />
      )}

      <div
        data-ocid="cart.sheet"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[210] h-full w-full max-w-[420px] bg-card border-l border-border flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display font-semibold text-base tracking-wider uppercase text-foreground">
            Your Cart
          </h2>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                data-ocid="cart.clear_button"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-wider"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={closeCart}
              data-ocid="cart.close_button"
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Items */}
        <ScrollArea className="flex-1">
          {items.length === 0 ? (
            <div
              data-ocid="cart.empty_state"
              className="flex flex-col items-center justify-center h-64 gap-4 text-center px-8"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">🛍</span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Discover our curated collection of luxury activewear.
                </p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border/50">
              {items.map((item, idx) => (
                <li
                  key={item.variant.id}
                  data-ocid={`cart.item.${idx + 1}`}
                  className="flex gap-4 p-5"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-muted rounded-sm">
                    {item.product.images?.[0] && (
                      <img
                        src={item.product.images[0].src}
                        alt={item.product.images[0].alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-foreground truncate">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.variant.selectedOptions
                        .map((o) => o.value)
                        .join(" · ")}
                    </p>
                    <p className="font-semibold text-sm text-foreground mt-1">
                      {formatPrice(safeParsePrice(item.variant.price))}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variant.id, item.quantity - 1)
                          }
                          data-ocid={`cart.decrease_qty.${idx + 1}`}
                          className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variant.id, item.quantity + 1)
                          }
                          data-ocid={`cart.increase_qty.${idx + 1}`}
                          className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.variant.id)}
                        data-ocid={`cart.remove.${idx + 1}`}
                        className="text-muted-foreground hover:text-destructive transition-colors duration-200"
                        aria-label={`Remove ${item.product.title}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-display font-semibold text-lg text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Taxes and shipping calculated at checkout. Delivered within 5–7
              business days.
            </p>
            <Separator className="bg-border/50" />
            <Button
              type="button"
              onClick={handleCheckout}
              data-ocid="cart.checkout_button"
              className="w-full bg-primary text-primary-foreground font-bold tracking-widest uppercase text-xs py-4 h-auto hover:opacity-90 active:scale-[0.99] transition-smooth rounded-none"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

import { create } from "zustand";
import type { OrderDetails } from "../types/product";

interface OrderStore {
  order: OrderDetails | null;
  setOrder: (order: OrderDetails) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderStore>()((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null }),
}));

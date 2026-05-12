import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShippingAddress } from "../types/product";

interface AddressStore {
  savedAddress: ShippingAddress | null;
  saveAddress: (address: ShippingAddress) => void;
  clearAddress: () => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      savedAddress: null,
      saveAddress: (address) => set({ savedAddress: address }),
      clearAddress: () => set({ savedAddress: null }),
    }),
    { name: "veyron-address" },
  ),
);

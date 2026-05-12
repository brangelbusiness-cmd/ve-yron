import { A as create } from "./index-DctbPH3p.js";
const useOrderStore = create()((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null })
}));
export {
  useOrderStore as u
};

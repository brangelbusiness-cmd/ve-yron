import { A as create } from "./index-CWjEpYzx.js";
const useOrderStore = create()((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
  clearOrder: () => set({ order: null })
}));
export {
  useOrderStore as u
};

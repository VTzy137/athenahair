import { create } from "zustand";

/** Placeholder commerce state — extend when you add products and checkout */
type MarketStore = {
  cartItemCount: number;
};

export const useMarketStore = create<MarketStore>(() => ({
  cartItemCount: 0,
}));

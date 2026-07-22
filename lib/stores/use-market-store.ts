import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  LOCAL_STORAGE,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../system/storage";

export interface MarketState {
  cartItemCount: number;
}

export interface MarketActions {
  setCartItemCount: (count: number) => void;
  incrementCartItemCount: (step?: number) => void;
  decrementCartItemCount: (step?: number) => void;
  clearCart: () => void;
}

export type MarketStore = MarketState & MarketActions;

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      cartItemCount: 0,
      setCartItemCount: (count: number) =>
        set({ cartItemCount: Math.max(0, count) }),
      incrementCartItemCount: (step = 1) =>
        set((state) => ({ cartItemCount: state.cartItemCount + step })),
      decrementCartItemCount: (step = 1) =>
        set((state) => ({
          cartItemCount: Math.max(0, state.cartItemCount - step),
        })),
      clearCart: () => set({ cartItemCount: 0 }),
    }),
    {
      name: LOCAL_STORAGE.CART,
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const value = getLocalStorage<number>(key as LOCAL_STORAGE, 0);
          return JSON.stringify({ state: { cartItemCount: value } });
        },
        setItem: (key, value) => {
          try {
            const parsed = JSON.parse(value);
            if (parsed?.state?.cartItemCount !== undefined) {
              setLocalStorage(key as LOCAL_STORAGE, parsed.state.cartItemCount);
            }
          } catch {
            // fallback if JSON parse fails
          }
        },
        removeItem: (key) => {
          removeLocalStorage(key as LOCAL_STORAGE);
        },
      })),
    }
  )
);


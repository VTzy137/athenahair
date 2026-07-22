"use client";

import { useMarketStore } from "@/lib/stores/use-market-store";

export function CartEmptyState() {
  const count = useMarketStore((s) => s.cartItemCount);

  if (count > 0) {
    return (
      <p className="mt-2 text-foreground/70">
        Cart has {count} item{count === 1 ? "" : "s"} (placeholder).
      </p>
    );
  }

  return (
    <p className="mt-2 text-foreground/70">
      Your cart is empty. Zustand store is wired — add actions when you have
      products.
    </p>
  );
}

import { CartEmptyState } from "./cart-empty-state";

export default function CartPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      <h1 className="text-2xl font-semibold">Cart</h1>
      <CartEmptyState />
    </main>
  );
}

import { CartEmptyState } from "./cart-empty-state";
import { PageWrapper } from "@/components/Layout";

export default function CartPage() {
  return (
    <PageWrapper className="flex w-full flex-1 flex-col py-16">
      <h1 className="text-2xl font-semibold">Cart</h1>
      <CartEmptyState />
    </PageWrapper>
  );
}

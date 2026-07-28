import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/services/products";
import { PageWrapper } from "@/components/Layout";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <PageWrapper className="flex w-full flex-1 flex-col py-16">
      <h1 className="text-2xl font-semibold">Shop</h1>
      <p className="mt-2 max-w-xl text-foreground/70">
        Loaded on the server via{" "}
        <code className="text-sm">lib/services/products</code> — swap for a
        database or API when you&apos;re ready.
      </p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}

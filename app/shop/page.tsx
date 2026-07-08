import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/services/products";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      <h1 className="text-2xl font-semibold">Shop</h1>
      <p className="mt-2 max-w-xl text-foreground/70">
        Loaded on the server via <code className="text-sm">lib/services/products</code>{" "}
        — swap for a database or API when you&apos;re ready.
      </p>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}

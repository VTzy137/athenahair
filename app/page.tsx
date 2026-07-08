import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SITE_NAME } from "@/lib/constants/site";
import { getProducts } from "@/lib/services/products";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 2);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{SITE_NAME} market</h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/70">
        Featured products from this repo service layer. Click any product to open
        its detail page.
      </p>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2">
        {featuredProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <Link
        href="/shop"
        className="mt-8 inline-flex w-fit text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        View all products in shop →
      </Link>
    </main>
  );
}

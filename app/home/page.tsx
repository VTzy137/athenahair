import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SITE_NAME } from "@/lib/constants/site";
import { getProducts } from "@/lib/services/products";
import { PageWrapper } from "@/components/Layout";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 2);

  return (
    <PageWrapper className="flex w-full flex-1 flex-col py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-pink-400">
        {SITE_NAME} market
      </h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/70">
        Featured products from this repo service layer. Click any product to
        open its detail page.
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
    </PageWrapper>
  );
}

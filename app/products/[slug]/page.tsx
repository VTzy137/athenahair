import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatUsdFromCents } from "@/lib/utils/currency";
import { getProductBySlug, getProducts } from "@/lib/services/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product" };
  }
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <Link
        href="/shop"
        className="text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        ← Back to shop
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/10">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg font-medium tabular-nums text-foreground">
            {formatUsdFromCents(product.priceCents)}
          </p>
          <p className="mt-4 text-foreground/80">{product.summary}</p>
          <p className="mt-6 text-sm leading-relaxed text-foreground/70">
            {product.description}
          </p>
          <p className="mt-8 text-xs text-foreground/50">
            Sample data from{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
              getProductBySlug(&quot;{slug}&quot;)
            </code>{" "}
            in this repo.
          </p>
        </div>
      </div>
    </main>
  );
}

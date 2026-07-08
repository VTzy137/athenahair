import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatUsdFromCents } from "@/lib/utils/currency";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="overflow-hidden rounded-lg border border-black/10 transition-colors hover:border-foreground/25 dark:border-white/10">
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
      >
        <div className="relative aspect-[4/3] w-full bg-black/5 dark:bg-white/10">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>
        <div className="p-4">
          <h2 className="font-medium leading-snug">{product.name}</h2>
          <p className="mt-1 text-sm text-foreground/70">{product.summary}</p>
          <p className="mt-3 text-sm font-medium tabular-nums">
            {formatUsdFromCents(product.priceCents)}
          </p>
          <p className="mt-2 text-xs text-foreground/60">View details →</p>
        </div>
      </Link>
    </article>
  );
}

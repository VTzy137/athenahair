import { slugify } from "@/lib/utils";
import type { Product } from "@/lib/types/product";

type ProductRow = Omit<Product, "slug">;

const CATALOG: ProductRow[] = [
  {
    id: "ph-bundles-natural",
    name: "Virgin bundles — natural wave",
    summary: "Placeholder listing for full-stack wiring (swap for real inventory).",
    description:
      "Three matching bundles in 18\" / 20\" / 22\". Cuticle-aligned, double-weft construction. " +
      "Color is natural 1B; can be lifted and toned by a professional. Ships in a satin storage bag.",
    priceCents: 15900,
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
  },
  {
    id: "ph-frontal-body",
    name: "HD lace frontal",
    summary: "Example product row with remote image hosting.",
    description:
      "13x4 HD lace with light bleached knots (lace type sample). Body-wave texture pairs with our bundle sets. " +
      "Adjustable elastic band and combs included. Patch test recommended before install.",
    priceCents: 8900,
    imageUrl:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&q=80",
  },
  {
    id: "ph-closure-deep",
    name: "Deep wave closure",
    summary: "Served via server component + service layer pattern.",
    description:
      "5x5 closure for middle or side parting. Deep wave matches our deep-wave bundles. " +
      "Pre-plucked hairline (sample). Store on a mannequin head or in the included net between wears.",
    priceCents: 7200,
    imageUrl:
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200&q=80",
  },
];

function withSlug(row: ProductRow): Product {
  return { ...row, slug: slugify(row.name) };
}

/** Mock catalog — replace with DB (Prisma, Drizzle), CMS, or external API calls. */
export async function getProducts(): Promise<Product[]> {
  return CATALOG.map(withSlug);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

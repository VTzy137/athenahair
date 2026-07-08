export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Short line for cards and meta */
  summary: string;
  /** Longer copy for the product page */
  description: string;
  priceCents: number;
  imageUrl: string;
};

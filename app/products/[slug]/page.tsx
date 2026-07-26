import { ProductPage } from "./Products";

export type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPageRoute({ params }: ProductPageProps) {
  return <ProductPage params={params} />;
}

import { PageWrapper } from "@/components/Layout";

export default function Loading() {
  return (
    <PageWrapper className="flex w-full flex-1 flex-col py-16">
      <p className="text-foreground/70">Loading…</p>
    </PageWrapper>
  );
}

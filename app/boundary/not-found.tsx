import Link from "next/link";
import { PageWrapper } from "@/components/Layout";

export default function NotFound() {
  return (
    <PageWrapper className="flex w-full flex-1 flex-col py-16">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <Link
        href="/home"
        className="mt-4 text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        ← Home
      </Link>
    </PageWrapper>
  );
}

// information about shop
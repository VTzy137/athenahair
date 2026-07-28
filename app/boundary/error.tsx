"use client";

import { PageWrapper } from "@/components/Layout";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageWrapper className="flex w-full flex-1 flex-col py-16">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="mt-4 w-fit text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        Try again
      </button>
    </PageWrapper>
  );
}

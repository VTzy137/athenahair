"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="mt-4 w-fit text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        Try again
      </button>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <Link
        href="/home"
        className="mt-4 text-sm text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        ← Home
      </Link>
    </main>
  );
}

// information about shop
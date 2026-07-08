"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants/site";
import { useMarketStore } from "@/stores/use-market-store";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const cartItemCount = useMarketStore((s) => s.cartItemCount);

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-4 py-4">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {nav.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : href === "/shop"
                  ? pathname === "/shop" || pathname.startsWith("/products")
                  : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? "font-medium text-foreground underline decoration-foreground/40 underline-offset-4"
                    : "text-foreground/70 transition-colors hover:text-foreground"
                }
              >
                {label === "Cart" && cartItemCount > 0
                  ? `${label} (${cartItemCount})`
                  : label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

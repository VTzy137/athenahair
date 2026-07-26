"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants/site";
import { useMarketStore } from "@/lib/stores/use-market-store";
import { localeString, type LocaleKey } from "@/lib/utils/locale";

const NAV_ITEMS: { href: string; key: LocaleKey }[] = [
  { href: "/shop", key: "shop" },
  { href: "/about", key: "about" },
  { href: "/cart", key: "cart" },
  { href: "/settings", key: "settings" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const cartItemCount = useMarketStore((s) => s.cartItemCount);

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-6 px-4 py-4">
        <Link
          href="/home"
          className="font-semibold tracking-tight text-foreground"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {NAV_ITEMS.map(({ href, key }) => {
            const label = localeString(key);
            const active =
              href === "/home"
                ? pathname === "/" || pathname === "/home"
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
                {key === "cart" && cartItemCount > 0
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

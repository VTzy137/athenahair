const DEFAULT_LOCALE = "en-US";

export function formatUsdFromCents(
  cents: number,
  locale: string = DEFAULT_LOCALE
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
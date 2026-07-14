# App Router structure + store stubs

Date: 2026-07-09  
Status: approved

## Goal

Align project with Next.js App Router `src/` layout. Drop Pages Router. Add bare store-critical route files only.

## Decisions

- Pure App Router under `src/app/`
- Delete `src/pages/` (no hybrid)
- Keep `components/`, `lib/`, `stores/`, `types/` at project root
- No route groups, no moving shared folders under `src/`

## Target tree

```
src/app/
  layout.tsx
  page.tsx
  globals.css
  favicon.ico
  not-found.tsx
  error.tsx
  loading.tsx
  about/page.tsx
  shop/page.tsx
  cart/page.tsx
  products/[slug]/page.tsx
components/
lib/
stores/
types/
public/
```

## Stubs

| File | Behavior |
|------|----------|
| `about/page.tsx` | Heading "About" only |
| `not-found.tsx` | Simple 404 + link to `/` |
| `error.tsx` | Client error boundary + reset button |
| `loading.tsx` | Plain "Loading…" |

## Nav

Add `{ href: "/about", label: "About" }` to `SiteHeader` nav.

## Out of scope

Product/shop/cart logic, i18n, stores, path alias changes, design polish.

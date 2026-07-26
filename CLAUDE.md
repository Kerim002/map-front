# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server on :3000, proxies /api to backend (see vite.config.ts)
npm run build:dev     # tsc -b && vite build --mode staging
npm run build:prod    # tsc -b && vite build --mode production
npm run build:inside  # tsc -b && vite build --mode inside
npm run lint          # eslint .
npm run preview       # preview a production build
```

There is no test runner configured in this repo (no test script, no test files).

Type-check without emitting: `tsc -b` (also runs as part of every `build:*` script — it will fail the build on type errors).

## Architecture

React 19 + TypeScript + Vite app using **Feature-Sliced Design (FSD)**. Layers, top to bottom:

```
app → pages → widgets → features → entities → shared
```

Higher layers may import from lower layers, never the reverse. Path alias `@/*` maps to `src/*`.

- `src/app` — router setup (`routes/main.routes.tsx`, `routes/map.routes.tsx`), layouts (`ProtectedLayout` for role-gated routes, `SidebarLayout`), providers (`tanstack-provider`, `theme-provider`, `navbar-provider`), global CSS.
- `src/pages` — route-level composition, one folder per domain (facility, building, region, employee, etc.).
- `src/widgets` — large composed sections (sidebar, navbar, per-domain tables/maps).
- `src/features` — user-facing interactions with business value: forms, hooks (mutations wrapped in `useMutation`), sheets (slide-over panels), map markers/popups.
- `src/entities` — core domain model per business object (facility, building, region, city, district, authority, performance, ownership, specialization, employee, user, folders, trash). Each entity typically has:
  - `api/dto/*-dto.ts` — raw API response shape (snake_case)
  - `api/mapper/map-*.ts` — DTO → domain model mapping (snake_case → camelCase)
  - `api/query/*.ts` — fetch functions using `apiInstance`
  - `api/mutations/*.ts` — create/update/delete functions using `apiInstance`
  - `api/query-type/*.ts` — TS types for query params
  - `api/<entity>.api.ts` — a `queryOptions`/`infiniteQueryOptions` object (e.g. `facilityApi`) grouping all query keys/fns for the entity, consumed by `useQuery`/`useInfiniteQuery` in features
  - `contract/*.contract.ts` — Zod schemas used by `react-hook-form` via `@hookform/resolvers`
  - `model/*.ts` — domain TypeScript types
  - `index.ts` — public exports (may be empty if the entity is only consumed via deep imports)
  - `entities/store/*` — Zustand stores (`use-map-store.ts`, `use-map-filters-store.ts`) for cross-cutting map state
- `src/shared` — framework-agnostic reusable code:
  - `shared/api/interceptor.ts` — `apiInstance<T>()`, the single fetch wrapper for the whole app. Adds `Authorization: Bearer <token>` from `localStorage`, `Accept-Language` from `i18next`, JSON-serializes `init.json`, builds query strings from `init.params`, redirects to `/login` on 401, throws `ApiError` (with `.response` and `.data`) on non-OK responses.
  - `shared/config/url.ts` — reads `VITE_API_URL` / `VITE_API_VERSION` env vars.
  - `shared/ui/*` — shadcn/ui-style primitives (Radix-based, `class-variance-authority` + `tailwind-merge`). Configured via `components.json` (`new-york` style, aliases point into `@/shared/*`). Add new shadcn components through the shadcn CLI so they land in the right FSD slice.
  - `shared/lang/i18n.ts` + `shared/lang/locales/{en,ru,tk}.json` — i18next setup; 3 locales must stay in sync when adding UI strings.
  - `shared/lib/*` — small framework-agnostic helpers (date formatting, cropped image extraction, permission checks, storage URL building, `cn()` in `utils.ts`).

## Conventions worth knowing

- **API layer naming**: DTOs and wire payloads use `snake_case` (matches backend), everything past the mapper uses `camelCase`. When adding a field, update the DTO, the mapper, the domain model, the mutation payload builder, and the Zod contract — all four live in different files per entity.
- **Mutations** are plain async functions in `entities/<x>/api/mutations/`, wrapped by a `useMutation` hook in `features/<x>/hook/`. The hook handles `queryClient.invalidateQueries` (keyed off `<entity>Api.all`) and toast success/error via `sonner` + `i18next`.
- **Forms** use `react-hook-form` + `zodResolver` against the entity's `contract/*.contract.ts` schema; individual field components live in `features/<entity>/form/`.
- **Map**: Leaflet via `react-leaflet` + `react-leaflet-cluster`. Map-specific routes are split out into `app/routes/map.routes.tsx`. Map viewport state and filters live in Zustand stores under `entities/store/`.
- **Auth/roles**: `ProtectedLayout` gates routes by `allowedRoles` (checked against `useProfileQuery()`'s user role); `superadmin` is always implicitly allowed. Unauthorized access redirects to `/forbidden`.
- **Environment**: `.env.development` / `.env.staging` / `.env.production` / `.env.inside` correspond to the four build modes. `VITE_API_URL`, `VITE_API_VERSION`, `VITE_MAP_URL` are the required vars (see `.env.example`).
- **Deployment**: Docker-based (see `Dockerfile`, `nginx.conf`, README's Docker section) — build the app, build the image, `docker save` to a tar, `scp` to server, `docker load` + `docker run`.

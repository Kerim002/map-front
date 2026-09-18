# Change Request Analysis & Plan

The two lists overlap. Deduplicated into 7 items (A–G) below. Each is marked
**Frontend-only**, **Frontend + backend needed**, or **Needs clarification /
data**.

| # | Item | Verdict | Status |
|---|------|---------|--------|
| A | Viewer can see employees | Frontend-only | ✅ Done |
| B | Org list inside an authority / building type | Frontend + backend (authority) | ⬜ Not started |
| C | Search filter — full name | Needs clarification | ⬜ Blocked |
| D | "Show on map" (`view-on-map`) is broken | Frontend-only | ✅ Done |
| E | Rename "Удобства" → "Подведомственные предприятия" | Frontend-only | ✅ Done |
| F | Tokay Hojalyk — item stuck in rent | Data / backend | ⬜ Blocked |
| G | Rental visibility | Frontend + backend | ⬜ Not started |

---

## A. Viewer can see the employee list — Frontend-only ✅ DONE

**Cause:** In `src/shared/lib/has-permission.ts` the `viewer` role had an empty
permission array (`viewer: []`). Any employee UI gated by
`hasPermission(role, "view:employee")` was hidden for viewers. The routes in
`app/routes/map.routes.tsx` already allow `viewer`, so it was purely the
permission map.

**Done:** Added `"view:employee"`, `"view:employee-files"`, `"view:files"` to the
`viewer` array in `PERMISSIONS` (`src/shared/lib/has-permission.ts`).
`edit/create/delete:employee` remain absent, so viewers stay read-only.

---

## B. List of organizations inside an authority (ведомство) and inside a building type — Frontend + backend (partial) ⚠️

**Goal:** Clicking an authority row (and a building-type row) opens a list of
the facilities that belong to it.

**What exists:** `facilityApi.facilityList` → `/location/search` already accepts
`building_id`, `region_id`, `parent_id`, `rental` (see
`entities/facility/api/query-type/facility-query.ts` → `FacilitySearchQuery`).

- **Building type list → Frontend-only.** `building_id` is already supported.
  Add a route/page that renders `FacilityTable` filtered by `building_id`, wired
  from `widgets/building/building-table.tsx`.
- **Authority list → needs backend.** `authority_id` is **not** in
  `FacilitySearchQuery`, so `/location/search` likely does not filter by it yet.
  Confirm the backend supports `authority_id`; if yes, this becomes frontend-only
  (add the field to the type + a filtered table). The bound/zoom queries already
  carry `authority_id`, so backend support is plausible — verify first.

**Change (frontend part):**
- Extend `FacilitySearchQuery` with `authority_id?` (pending backend).
- Reuse `FacilityTable` with the relevant filter; add a nav action from the
  authority/building table rows.

---

## C. Search filter — "full name" — Needs clarification ❓

The map search box (`widgets/map-navbar/map-search-box.tsx`) already shows the
full `item.name` untruncated. Two possible meanings:
- **"Display the full name"** → already the case; nothing to do, or trivially
  ensure no CSS clamp is added.
- **"Match the full/exact name in results"** → this is backend search behaviour
  on `/location/search?q=`. Not fixable on the frontend.

**Action:** Ask the requester which behaviour they mean before coding.

---

## D. "Show on map" (`view-on-map`) works incorrectly — Frontend-only ✅ DONE

**Cause:** In `pages/facility/ui/facility-workers.tsx` the button just did
`navigate("/map")` — it opened the map but never centered on the facility.

**Done:** Fetch the facility detail (has `geom`) via `facilityApi.detail`, then on
click call `setSelectedFacility(facility)` before `navigate("/map")`. The existing
`SearchResultController` in `entities/facility/ui/map-view.tsx` picks up the
selected facility and flies to it + opens its popup. Files:
`pages/facility/ui/facility-workers.tsx`.

---

## E. Rename "Удобства" → "Подведомственные предприятия" — Frontend-only ✅ DONE

The `facilities` key is used in exactly one place: the quick-action button in
`facility-workers.tsx`.

**Done:** Updated the `facilities` value in all three locales:
- `ru.json`: "Подведомственные предприятия"
- `en.json`: "Subordinate enterprises"
- `tk.json`: "Garamagyndaky kärhanalar"

---

## F. Tokay Hojalyk — something stuck "in rent" — Data / backend ❓

This names a specific facility record whose rental state looks wrong. That's a
data/backend issue, not a frontend code change. Depends on G's outcome.

**Action:** Confirm with requester what the expected state is; fix likely lives
in data or backend, or is resolved by G.

---

## G. Change rental visibility — Frontend + backend (partial) ⚠️

**What exists:** A `visibility` boolean + `rental` boolean on `Facility`. The
update form (`features/facility/form/update-facility-from.tsx`) already renders a
`visibility` switch and sets `rental` automatically from the `/rentals` route.
The map bound query filters what's shown; visibility handling of rentals is
backend-side.

Meaning is ambiguous — either:
- **Add a visibility toggle for rental items** → frontend, small (the switch
  component already exists; surface it on the rental edit path).
- **Rentals should/shouldn't appear on the map by visibility** → backend must
  honour `visibility` (and possibly `rental`) in `/location/bound`.

**Action:** Clarify the exact rule, then split into the frontend toggle (easy)
and any backend filtering (their side).

---

## Status

**Done (this pass):** A, D, E — typecheck (`tsc -b`) passes.

**Next up (frontend-only):** B (building-type half) — add a `FacilityTable`
filtered by `building_id`, wired from the building table.

**Blocked on backend/clarification:** B (authority half), C, F, G.

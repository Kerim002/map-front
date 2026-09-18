import { lazy } from "react";

export const FacilityPage = lazy(() =>
  import("./ui/facility-page").then((page) => ({ default: page.FacilityPage }))
);

export const FacilityChildListPage = lazy(() => import("./ui/facility-child-list-page").then((page) => ({default:page.FacilityChildListPage})))

export const FacilityRentalListPage = lazy(() => import("./ui/facility-rental-list-page").then((page)=> ({default:page.FacilityRentalListPage})))

export const LocationsByFilterPage = lazy(() => import("./ui/locations-by-filter-page").then((page) => ({ default: page.LocationsByFilterPage })))
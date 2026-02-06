import { lazy } from "react";

export const FacilityPage = lazy(() =>
  import("./ui/facility-page").then((page) => ({ default: page.FacilityPage }))
);

export const FacilityChildListPage = lazy(() => import("./ui/facility-child-list-page").then((page) => ({default:page.FacilityChildListPage})))
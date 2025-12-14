import { lazy } from "react";

export const FacilityPage = lazy(() =>
  import("./ui/facility-page").then((page) => ({ default: page.FacilityPage }))
);

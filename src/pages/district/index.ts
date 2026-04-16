import { lazy } from "react";

export const DistrictPage = lazy(() => import("./ui/district-page").then((page) => ({default:page.DistrictPage})))
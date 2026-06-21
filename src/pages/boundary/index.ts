import { lazy } from "react";

export const ForbiddenPage = lazy(() => import("./ui/forbidden-page").then((page) => ({default:page.ForbiddenPage})))
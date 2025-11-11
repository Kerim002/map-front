import { lazy } from "react";

export const Building = lazy(() =>
  import("./ui/building").then((mod) => ({ default: mod.Building }))
);

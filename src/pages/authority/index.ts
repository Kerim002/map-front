import { lazy } from "react";

export const Authority = lazy(() =>
  import("./ui/authority").then((mod) => ({ default: mod.Authority }))
);

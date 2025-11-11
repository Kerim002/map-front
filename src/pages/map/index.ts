import { lazy } from "react";

export const Map = lazy(() =>
  import("./ui/map").then((mod) => ({ default: mod.Map }))
);

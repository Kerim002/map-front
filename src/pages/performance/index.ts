import { lazy } from "react";

export const Performance = lazy(() =>
  import("./ui/performance").then((mod) => ({ default: mod.Performance }))
);

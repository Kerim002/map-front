import { lazy } from "react";

export const Ownership = lazy(() =>
  import("./ui/ownership").then((mod) => ({ default: mod.Ownership }))
);

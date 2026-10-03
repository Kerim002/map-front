import { lazy } from "react";

export const MinisterPage = lazy(() =>
  import("./ui/minister").then((mod) => ({ default: mod.Minister }))
);

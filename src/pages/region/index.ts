import { lazy } from "react";

export const Region = lazy(() =>
  import("./ui/region").then((file) => ({ default: file.Region }))
);

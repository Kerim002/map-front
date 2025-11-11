import { lazy } from "react";

export const Company = lazy(() =>
  import("./ui/company").then((mod) => ({ default: mod.Company }))
);

import { lazy } from "react";

export const Home = lazy(() =>
  import("@/pages/home/ui/home").then((page) => ({ default: page.Home }))
);

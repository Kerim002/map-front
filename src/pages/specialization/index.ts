import { lazy } from "react";

export const Specialization = lazy(() => import("./ui/spec-page").then((module) => ({ default: module.Region })));
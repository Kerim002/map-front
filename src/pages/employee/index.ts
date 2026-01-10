import { lazy } from "react";

export const EmployeePage = lazy(() => import("./ui/employee-page").then((page) => ({ default: page.EmployeePage })))
import { lazy } from "react";

export const EmployeePage = lazy(() => import("./ui/employee-page").then((page) => ({ default: page.EmployeePage })))

export const DocumentsPage = lazy(() => import("./ui/documents-page").then((page) => ({default:page.DocumentsPage})))
import { lazy } from "react";

export const EmployeePage = lazy(() => import("./ui/employee-page").then((page) => ({ default: page.EmployeePage })))

export const DocumentsPage = lazy(() => import("./ui/documents-page").then((page) => ({ default: page.DocumentsPage })))

export const EmployeeFilesPage = lazy(() => import("./ui/employee-files-page").then((page) => ({ default: page.EmployeeFilesPage })))

export const EmployeeDetailPage = lazy(() => import("./ui/employee-detail-page").then((page) => ({ default: page.EmployeeDetailPage })))
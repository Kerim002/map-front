import { lazy } from "react";

export const UsersPage = lazy(() => import("./ui/users-page").then(page => ({default:page.UsersPage})))
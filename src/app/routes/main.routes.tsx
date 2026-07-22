import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavbarProvider } from "../provider/navbar-provider";
import { Region } from "@/pages/region";
import { Home } from "@/pages/home";
import { TestPage } from "@/pages/test/ui/test-page";
import { Authority } from "@/pages/authority";
import { Performance } from "@/pages/performance";
import { Ownership } from "@/pages/ownership";
import { Building } from "@/pages/building";
import { SidebarLayout } from "../layouts/sidebar-layout";
import { Specialization } from "@/pages/specialization";
import { mapRoutes } from "./map.routes";
import { CityPage } from "@/pages/city";
import { DistrictPage } from "@/pages/district";
import { UsersPage } from "@/pages/user";
import { LoginPage } from "@/pages/login";
import { ForbiddenPage } from "@/pages/boundary";
import { ProtectedLayout } from "../layouts/protected-layout";
import { TrashPage } from "@/pages/trash";

const mainRoutes = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      ...mapRoutes,
      {
        element: <NavbarProvider />,
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "region",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Region />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "authority",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Authority />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "performance",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Performance />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "ownership",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Ownership />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "building",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Building />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/specialization",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <Specialization />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/city",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <CityPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/district",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin", "moderator"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <DistrictPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/trash",
            element: <ProtectedLayout allowedRoles={["superadmin"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <TrashPage />
                  </Suspense>
                ),
              },
            ],
          },

          {
            path: "/users",
            element: <ProtectedLayout allowedRoles={["admin", "superadmin"]} />,
            children: [
              {
                path: ":currentPage",
                element: (
                  <Suspense>
                    <UsersPage />
                  </Suspense>
                ),
              },
            ],
          },

          {
            path: "/test",
            element: <TestPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/forbidden",
    element: (
      <Suspense>
        <ForbiddenPage />
      </Suspense>
    ),
  },
]);

const AppRouter = () => <RouterProvider router={mainRoutes} />;

export default AppRouter;
